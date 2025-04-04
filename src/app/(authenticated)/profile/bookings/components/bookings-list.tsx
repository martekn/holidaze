import Banner from "@/components/common/banner";
import Paginator from "@/components/common/paginator";
import { getUserData } from "@/lib/cookies/server";
import { notFound, redirect } from "next/navigation";
import React from "react";
import BookingInfoCard from "@/components/common/cards/booking/booked-info-card";
import { Link } from "@/components/ui/link";
import { getBookingsByUser } from "@/lib/api/bookings";

const BookingsList = async ({ listingID }: { listingID: number }) => {
  const user = await getUserData();
  if (!user) {
    notFound();
  }

  const currentPage = listingID || 1;
  const response = await getBookingsByUser(user.name, currentPage, 5);

  if (!("data" in response)) {
    if (response.errors[0]?.code === "invalid_string") {
      notFound();
    }

    return (
      <Banner
        type={"minimal"}
        title="Oops something went wrong"
        body={response.errors[0]?.message || "Failed to load bookings"}
      />
    );
  }

  const bookings = response.data;
  const totalPages = response.meta.pageCount;
  if (bookings.length === 0 && currentPage > totalPages && totalPages !== 0) {
    redirect(`/profile/bookings?page=${totalPages}`);
  }

  return (
    <div className="space-y-48">
      <div className="space-y-48">
        {bookings.length > 0 && (
          <ul className="space-y-24">
            {bookings.map((booking) => (
              <li key={booking.id}>
                <BookingInfoCard variant="guest-view" booking={booking} listing={booking.venue} />
              </li>
            ))}
          </ul>
        )}
        {bookings.length === 0 && (
          <Banner
            type={"minimal"}
            sectionInnerSpacing={"sm"}
            isSection
            title="No Bookings Yet"
            body="Looks like you haven’t made any bookings yet. When you do, they’ll show up here. Start exploring and book your next experience today"
          >
            <Link href="/explore">Explore stays</Link>
          </Banner>
        )}
      </div>
      {totalPages > 1 && bookings.length > 0 && (
        <Paginator currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  );
};

export default BookingsList;
