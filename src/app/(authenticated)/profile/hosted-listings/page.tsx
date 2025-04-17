import Banner from "@/components/common/banner";
import HostedListingCard from "@/components/common/cards/listing/hosted-listing-card";
import Paginator from "@/components/common/paginator";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { getListingsByProfile } from "@/lib/api/listings";
import { getUserData } from "@/lib/cookies/server";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "My Listings | Holidaze",
  description:
    "Manage your Holidaze listings. Edit, and track performance of your hosted properties."
};

const HostedListingsPage = async ({ searchParams }: { searchParams: { page: string } }) => {
  const user = await getUserData();

  if (!user) {
    notFound();
  }

  const currentPage = Number(searchParams?.page) || 1;

  const response = await getListingsByProfile(user.name, currentPage);
  if (!("data" in response)) {
    if (response.errors[0]?.code === "invalid_string") {
      notFound();
    }

    return (
      <div className="grid gap-24 xs:grid-cols-[1fr_auto]">
        <Heading tag="h1" variant={"heading2"}>
          Hosted listings
        </Heading>
        <Link href="/listings/create/form">Create listing</Link>
        <Banner
          className="col-span-full"
          type={"minimal"}
          title="Oops something went wrong"
          body={response.errors[0]?.message || "Failed to load listing details"}
        />
      </div>
    );
  }

  const listings = response.data;
  const totalPages = response.meta.pageCount;
  if (totalPages === 0 && searchParams.page) redirect("/profile/hosted-listings");

  if (listings.length === 0 && currentPage > totalPages && totalPages !== 0) {
    redirect(`/profile/hosted-listings?page=${totalPages}`);
  }

  return (
    <div className="grid gap-24 xs:grid-cols-[1fr_auto]">
      <Heading tag="h1" variant={"heading2"}>
        Hosted listings
      </Heading>
      {listings.length > 0 && user.venueManager && (
        <Link href="/listings/create/form">Create listing</Link>
      )}
      <div className="space-y-48 xs:col-span-full">
        {listings.length > 0 && (
          <ul className="grid gap-16 xs:grid-cols-2 md:grid-cols-3 md:gap-24">
            {listings.map((listing) => (
              <li key={listing.id}>
                <HostedListingCard listing={listing} />
              </li>
            ))}
          </ul>
        )}

        {listings.length === 0 && (
          <Banner
            type={"minimal"}
            sectionInnerSpacing={"sm"}
            isSection
            title="No Listings Yet"
            body={
              user.venueManager
                ? "You haven’t created any listings yet. Start hosting travelers and turn your space into an income opportunity."
                : "If you want to create listings, please read more about becoming a host by clicking the button below"
            }
          >
            {user.venueManager ? (
              <Link href="/listings/create/form">Create listing</Link>
            ) : (
              <Link href="/become-a-host">Become a host</Link>
            )}
          </Banner>
        )}

        {totalPages > 1 && listings.length > 0 && (
          <Paginator currentPage={currentPage} totalPages={totalPages} />
        )}
      </div>
    </div>
  );
};

export default HostedListingsPage;
