import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import Container from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import Rating from "@/components/ui/rating";
import Section from "@/components/ui/section";
import { Metadata } from "next";
import React from "react";
import Gallery from "./components/gallery";
import Amenities from "@/components/ui/amenities";
import { TLocation } from "@/lib/schema";
import BookingForm from "./components/booking-form";
import Banner from "@/components/common/banner";
import { notFound } from "next/navigation";
import { getListingById, isListingResponse } from "@/lib/api/listings";

export const generateMetadata = async ({
  params
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const response = await getListingById(params.id);
  if (!isListingResponse(response)) {
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

const ListingPage = async ({
  params,
  searchParams
}: {
  params: { id: string };
  searchParams: { to?: string; from?: string; guests?: string };
}) => {
  const listingId = params.id;
  const response = await getListingById(listingId);

  if (!isListingResponse(response)) {
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
          />
        </main>
      </Container>
    );
  }

  const listing = response.data;
  const { name, media, rating, description, maxGuests, meta, location, owner } = listing;

  return (
    <Container asChild>
      <main className="mb-128 space-y-24 pt-32 md:pt-64">
        <Heading tag="h1" variant={"heading2"}>
          {name}
        </Heading>
        <div className="grid lg:grid-cols-[2fr_1fr] lg:gap-48">
          {/* Left side */}
          <div>
            <Gallery images={media} />
            <Section className="mt-24 space-y-24">
              <Rating rating={rating} />
              <div className="space-y-y lg:space-y-24">
                <Heading tag="h2" variant={"heading4"}>
                  About this stay
                </Heading>
                <div className="space-y-16">
                  <p className="leading-7">{description}</p>
                  <p>
                    This stay allows for a maximum of{" "}
                    {`${maxGuests} guest${maxGuests === 1 ? "" : "s"}`}
                  </p>
                </div>
              </div>
            </Section>
            <Section className="space-y-8 lg:space-y-24">
              <Heading tag="h2" variant={"heading4"}>
                Amenities
              </Heading>
              <Amenities amenitiesMeta={meta} />
            </Section>
            <Section className="space-y-8 lg:space-y-24">
              <Heading tag="h2" variant={"heading4"}>
                Location
              </Heading>
              <p>{formatListingLocation(location)}</p>
            </Section>
          </div>
          {/* Right side */}
          <div className="space-y-24">
            <BookingForm
              listing={listing}
              to={searchParams.to}
              from={searchParams.from}
              guests={searchParams.guests}
            />
            <Card variant={"outline"} padding={"lg"}>
              <Heading tag="h2" variant={"heading5"}>
                Hosted by
              </Heading>
              <div className="mt-8 flex items-center gap-16">
                <Avatar src={owner.avatar.url} alt={owner.avatar.alt} />
                <div>
                  <div>{owner.name}</div>
                  <div className="text-sm text-muted-foreground">{owner.email}</div>
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
