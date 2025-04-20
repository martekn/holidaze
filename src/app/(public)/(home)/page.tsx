import React from "react";
import { Heading } from "@/components/ui/heading";
import SearchForm from "../../../components/common/search-form";
import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
import { Carousel } from "./components/carousel";
import { Link } from "@/components/ui/link";
import { IconArrowRight } from "@tabler/icons-react";
import AmenityCard from "@/components/common/amenity-card";
import CardListing from "@/components/common/card-listing";
import Banner from "@/components/common/banner";
import { apiFetch } from "@/lib/utils/api";
import { baseListingSchema, paginatedApiResponseSchema, TBaseListing } from "@/lib/schema";
import { z } from "zod";

const apiListingSchema = paginatedApiResponseSchema.extend({
  data: z.array(baseListingSchema)
});

const HomePage = async () => {
  let topRatedListings: TBaseListing[] = [];
  let budgetFriendlyListings: TBaseListing[] = [];
  let error = null;

  try {
    const response = await apiFetch("/holidaze/venues", {
      method: "GET",
      query: { limit: 100, sort: "rating" }
    });

    const validatedResponse = apiListingSchema.safeParse(response);
    if (validatedResponse.success) {
      const listings = validatedResponse.data.data;
      topRatedListings = listings.slice(0, 6);
      const remainingListings = listings.slice(6);
      const sortedByPrice = remainingListings.sort((a, b) => a.price - b.price);
      budgetFriendlyListings = sortedByPrice.slice(0, 8);
    } else {
      error = validatedResponse.error;
    }
  } catch (err) {
    error = err;
  }

  return (
    <main>
      <h1 className="sr-only">Holidaze</h1>
      <Container>
        <Section
          variant="sm"
          innerSpacing={"lg"}
          className="relative flex min-h-[60vh] flex-col items-center justify-center gap-48 rounded-lg bg-[url(/images/hero-bg.jpg)] bg-cover bg-left-bottom bg-no-repeat px-24 text-center text-neutral-200"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-700/50 via-45% to-transparent"></div>

          <div className="z-10 max-w-prose space-y-8">
            <Heading tag="h2" variant="heading1" className="text-neutral-100">
              Explore your dream stay
            </Heading>
            <p>
              Discover handpicked stays for every taste, whether you seek a rustic retreat, a
              beachside bungalow, or a stylish city apartment
            </p>
          </div>
          <div className="z-10 grid w-full max-w-prose gap-4">
            <SearchForm className="w-full" />
            <Link
              href="/explore"
              variant={"linkInverted"}
              size="custom"
              className="place-self-start self-start text-sm"
            >
              Explore all stays
            </Link>
          </div>
        </Section>
      </Container>
      <Container asChild>
        <Section variant="lg" className="space-y-24">
          <Heading tag="h2" variant="heading3">
            Guest favorites
          </Heading>
          {!error && <Carousel listings={topRatedListings} />}
          {!!error && (
            <Banner
              type="minimal"
              isSection
              title="Oops! Something went wrong."
              body="We're having trouble loading the guest favorites listings. Please try again later."
              sectionInnerSpacing={"lg"}
            />
          )}
        </Section>
      </Container>
      <Container variant="fullBleed" className="bg-secondary-100">
        <Container asChild>
          <Section
            className="flex flex-col gap-32 lg:flex-row lg:gap-96"
            innerSpacing={"lg"}
            variant="lg"
          >
            <div>
              <Heading tag="h2" variant="heading1">
                Find your perfect stay
              </Heading>
              <p className="mt-8 leading-9">
                Discover the ideal accommodation tailored to your needs. Find the perfect stay for
                your next trip with ease.
              </p>
              <Link href="/explore" variant="link" size={"custom"} className="mt-32 space-x-8">
                <span>Explore stays</span> <IconArrowRight />
              </Link>
            </div>
            <ul className="flex flex-col gap-24 md:flex-row">
              <li>
                <AmenityCard
                  title="Travelling with Pets"
                  image={{
                    src: "/images/amenity-pet.jpg",
                    alt: "A happy black and white dog with its head out of a car window, mouth open in a joyful expression against a blue sky background."
                  }}
                  id="pet-friendly"
                  description="Pet-friendly stays for you and your furry companion."
                  amenity="pet-friendly"
                />
              </li>
              <li>
                <AmenityCard
                  title="Breakfast Included"
                  image={{
                    src: "/images/amenity-breakfast.jpg",
                    alt: "A hotel breakfast buffet display featuring various cold cuts, cheeses, and condiments arranged under clear protective covers on a white tablecloth."
                  }}
                  id="breakfast"
                  description="Enjoy mornings with a delicious breakfast included."
                  amenity="breakfast"
                />
              </li>
              <li>
                <AmenityCard
                  title="WiFi available"
                  image={{
                    src: "/images/amenity-wifi.jpg",
                    alt: "A modern lounge area with floor-to-ceiling windows overlooking mountain views. A person sits on a dark sofa using a device, with a wooden coffee table and designer lamp nearby."
                  }}
                  id="wifi"
                  description="Stay connected with reliable WIFI wherever you go."
                  amenity="wifi"
                />
              </li>
            </ul>
          </Section>
        </Container>
      </Container>
      <Container asChild>
        <Section variant="lg" className="space-y-24">
          <Heading tag="h2" variant="heading3">
            Budget friendly stays
          </Heading>
          {!error && (
            <ul className="grid gap-x-16 gap-y-32 xs:grid-cols-2 md:grid-cols-4">
              {budgetFriendlyListings.map((listing) => (
                <li key={listing.id}>
                  <CardListing listing={listing} />
                </li>
              ))}
            </ul>
          )}
          {!!error && (
            <Banner
              type="minimal"
              title="Oops! Something went wrong."
              body="We're having trouble loading the budget friendly listings. Please try again later."
              sectionInnerSpacing={"lg"}
              isSection
            />
          )}
        </Section>
      </Container>
      <Container asChild>
        <Section variant="lg">
          <Banner
            isSection
            sectionInnerSpacing={"lg"}
            title="Want to become a host?"
            body="Join our community and turn your space into a dream destination for travelers! Whether it's a cozy cabin, a chic city apartment, or a beachfront villa, we make it easy to share your space and start earning."
          >
            <Link href="/become-a-host">Get started</Link>
          </Banner>
        </Section>
      </Container>
    </main>
  );
};

export default HomePage;
