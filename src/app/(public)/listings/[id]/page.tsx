import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import Container from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import Rating from "@/components/ui/rating";
import Section from "@/components/ui/section";
import { apiFetch } from "@/lib/utils/api";
import { Metadata } from "next";
import React from "react";
import Gallery from "./components/gallery";
import Amenities from "@/components/ui/amenitites";
import {
  baseApiResponseSchema,
  baseErrorSchema,
  listingWithBookingsAndOwnerSchema,
  TBaseError,
  TLocation
} from "@/lib/schema";
import BookingForm from "./components/booking-form";
import Banner from "@/components/common/banner";
import { z } from "zod";
import { notFound } from "next/navigation";

const apiListingSchema = baseApiResponseSchema.extend({ data: listingWithBookingsAndOwnerSchema });
type TApiListingData = z.infer<typeof apiListingSchema>;

export const fetchListing = async (id: string) => {
  try {
    const response = await apiFetch(`/holidaze/venues/${id}`, {
      query: { _bookings: true, _owner: true }
    });
    const validated = apiListingSchema.safeParse(response);
    if (validated.success) return validated.data;
    return { errors: [{ message: "Invalid schema" }] };
  } catch (error) {
    const validated = baseErrorSchema.safeParse(error);
    if (validated.success) return validated.data;
    return { errors: [{ message: "Unexpected error" }] };
  }
};

const isSuccessfulResponse = (
  response: TApiListingData | TBaseError
): response is TApiListingData => {
  return "data" in response;
};

export const generateMetadata = async ({
  params
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const response = await fetchListing(params.id);

  if (!isSuccessfulResponse(response)) {
    return {
      title: "Listing Details | Holidaze",
      description:
        "Discover this unique accommodation on Holidaze. Book your perfect getaway today."
    };
  }

  const listing = response.data;

  return {
    title: `${listing.name} | Holidaze`,
    description: listing.description
  };
};

function formatListingLocation(location: TLocation): string {
  const { address, zip, city, country, continent } = location;
  if (!address && !zip && !city && !country && !continent) return "Unknown location";

  const localParts = [address, zip && city ? `${zip} ${city}` : zip || city].filter(Boolean);

  const geographicParts = [country, continent].filter(Boolean);

  return [localParts.join(", "), geographicParts.join(", ")].filter(Boolean).join(", ");
}

const ListingPage = async ({ params }: { params: { id: string } }) => {
  const listingId = params.id;
  const response = await fetchListing(listingId);

  if (!isSuccessfulResponse(response)) {
    if (response.errors[0]?.code === "invalid_string") {
      notFound();
    }

    return (
      <Container asChild>
        <main className="mb-128 space-y-24 pt-32 md:pt-64">
          <Banner
            type={"minimal"}
            title="Oops something went wrong"
            body={response.errors[0]?.message || "Failed to load listing details"}
          ></Banner>
        </main>
      </Container>
    );
  }

  const listing = response.data;

  return (
    <Container asChild>
      <main className="mb-128 space-y-24 pt-32 md:pt-64">
        <Heading tag="h1" variant={"heading2"}>
          {listing.name}
        </Heading>
        <div className="grid lg:grid-cols-[2fr_1fr] lg:gap-48">
          {/* Left side */}
          <div>
            <Gallery images={listing.media} />
            <Section className="mt-24 space-y-24">
              <Rating rating={listing.rating} />
              <div className="space-y-y lg:space-y-24">
                <Heading tag="h2" variant={"heading4"}>
                  About this stay
                </Heading>
                <div className="space-y-16">
                  <p className="leading-7">{listing.description}</p>
                  <p>
                    This stay allows for a maximum of{" "}
                    {`${listing.maxGuests} guest${listing.maxGuests === 1 ? "" : "s"}`}
                  </p>
                </div>
              </div>
            </Section>
            <Section className="space-y-8 lg:space-y-24">
              <Heading tag="h2" variant={"heading4"}>
                Amenities
              </Heading>
              <Amenities amenitiesMeta={listing.meta} />
            </Section>
            <Section className="space-y-8 lg:space-y-24">
              <Heading tag="h2" variant={"heading4"}>
                Location
              </Heading>
              <p>{formatListingLocation(listing.location)}</p>
            </Section>
          </div>
          {/* Right side */}
          <div className="space-y-24">
            <BookingForm listing={listing} />
            <Card variant={"outline"} padding={"lg"}>
              <Heading tag="h2" variant={"heading5"}>
                Hosted by
              </Heading>
              <div className="mt-8 flex items-center gap-16">
                <Avatar src={listing.owner.avatar.url} alt={listing.owner.avatar.alt} />
                <div>
                  <div>{listing.owner.name}</div>
                  <div className="text-sm text-muted-foreground">{listing.owner.email}</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </Container>
  );
};

export default ListingPage;
