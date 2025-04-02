import Banner from "@/components/common/banner";
import BookingInfoCard from "@/components/common/cards/booking/booked-info-card";
import Paginator from "@/components/common/paginator";
import Container from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { getUserData } from "@/lib/cookies/server";
import {
  baseErrorSchema,
  bookingWithListingSchema,
  paginatedApiResponseSchema
} from "@/lib/schema";
import { apiFetch } from "@/lib/utils/api";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import React from "react";
import { z } from "zod";

export const metadata: Metadata = {
  title: "Booking history | Holidaze",
  description:
    "View and manage all your Holidaze bookings in one place. Access booking details, check-in dates, and property information for your upcoming and past vacations."
};

const apiBookingSchema = paginatedApiResponseSchema.extend({
  data: z.array(bookingWithListingSchema)
});
export type TApiBookingData = z.infer<typeof apiBookingSchema>;

const fetchBookings = async (username: string, currentPage: number) => {
  try {
    const response = await apiFetch(`/holidaze/profiles/${username}/bookings`, {
      query: { _venue: true, limit: 5, page: currentPage, sortBy: "created" },
      requireAuth: true
    });
    const validated = apiBookingSchema.safeParse(response);
    if (validated.success) {
      return validated.data;
    }
    return { errors: [{ message: "Invalid schema" }] };
  } catch (error) {
    const validated = baseErrorSchema.safeParse(error);
    if (validated.success) return validated.data;
    return { errors: [{ message: "Unexpected error" }] };
  }
};

const BookingsPage = async ({ searchParams }: { searchParams: { page: string } }) => {
  const user = await getUserData();

  if (!user) {
    notFound();
  }

  const currentPage = Number(searchParams?.page) || 1;

  const response = await fetchBookings(user.name, currentPage);
  if (!("data" in response)) {
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

  const bookings = response.data;
  const totalPages = response.meta.pageCount;
  if (bookings.length === 0 && currentPage > totalPages && totalPages !== 0) {
    redirect(`/profile/bookings?page=${totalPages}`);
  }

  return (
    <div className="space-y-24">
      <div className="space-y-8">
        <Heading tag="h1" variant={"heading2"}>
          Booking history
        </Heading>
        <p className="text-sm text-muted-foreground">Get an overview over all your bookings</p>
      </div>

      <div className="space-y-48">
        {bookings.length > 0 && (
          <ul className="space-y-24">
            {bookings.map((booking) => (
              <li key={booking.id}>
                <BookingInfoCard booking={booking} />
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
        {totalPages > 1 && bookings.length > 0 && (
          <Paginator currentPage={currentPage} totalPages={totalPages} />
        )}
      </div>
    </div>
  );
};

export default BookingsPage;
