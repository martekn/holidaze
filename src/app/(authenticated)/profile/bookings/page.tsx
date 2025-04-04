import React from "react";
import { Heading } from "@/components/ui/heading";
import BookingsList from "./components/bookings-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking history | Holidaze",
  description:
    "View and manage all your Holidaze bookings in one place. Access booking details, check-in dates, and property information for your upcoming and past vacations."
};

const BookingsPage = async ({ searchParams }: { searchParams: { page: string } }) => {
  return (
    <div className="space-y-24">
      <div className="space-y-8">
        <Heading tag="h1" variant={"heading2"}>
          Booking history
        </Heading>
        <p className="text-sm text-muted-foreground">Get an overview over all your bookings</p>
      </div>
      <BookingsList listingID={Number(searchParams.page)} />
    </div>
  );
};

export default BookingsPage;
