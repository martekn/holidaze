import Paginator from "@/components/common/paginator";
import Container from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import React from "react";
import ListingCard from "@/components/common/cards/listing/listing-card";
import { getListings, getListingsSearch } from "@/lib/api/listings";
import { TListingWithBookings } from "@/lib/schema";
import Banner from "@/components/common/banner";
import { Metadata } from "next";

export async function generateMetadata({
  searchParams
}: {
  searchParams: { search?: string };
}): Promise<Metadata> {
  const searchQuery = searchParams.search;

  if (!searchQuery) {
    return {
      title: "Explore stays | Holidaze",
      description: "Discover unique stays for your next getaway."
    };
  }

  return {
    title: `"${searchQuery}" Search Results | Holidaze`,
    description: `Find vacation rentals matching "${searchQuery}". Browse available properties and book your perfect stay.`
  };
}

const ExplorePage = async ({
  searchParams
}: {
  searchParams: { search?: string; page?: string };
}) => {
  const currentPage = Number(searchParams.page) || 1;
  const isSearch = !!searchParams.search;
  let totalPages = 10;
  let totalResults = 100;
  let listings: TListingWithBookings[] = [];
  let error = false;
  let response;

  if (isSearch) {
    response = await getListingsSearch(currentPage, searchParams.search ?? "");
  } else {
    response = await getListings(currentPage);
  }

  if ("data" in response) {
    listings = response.data;
    totalPages = response.meta.pageCount;
    totalResults = response.meta.totalCount;
  } else {
    error = true;
  }

  return (
    <Container>
      <main className="mb-64 pt-48 lg:mb-128 lg:pt-64">
        <Heading tag="h1" variant={"heading2"} className="mb-24">
          {isSearch ? `Found ${totalResults} stays` : "Explore stays"}
        </Heading>
        {(error || listings.length === 0) && (
          <Banner
            className="col-span-full"
            isSection
            type={"minimal"}
            title={error ? "Oops something went wrong" : "No listings founds"}
            body={
              error
                ? "Failed to load listing details"
                : `Try adjusting your search to find what you’re looking for`
            }
          />
        )}
        <ul className="grid gap-x-16 gap-y-32 xs:grid-cols-2 md:grid-cols-4">
          {listings.map((listing) => (
            <li key={listing.id}>
              <ListingCard listing={listing} />
            </li>
          ))}
        </ul>
        {totalPages > 1 && (
          <div className="mt-24 md:mt-64">
            <Paginator currentPage={currentPage} totalPages={totalPages} />
          </div>
        )}
      </main>
    </Container>
  );
};

export default ExplorePage;
