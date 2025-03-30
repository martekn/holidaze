import Container from "@/components/ui/container";
import { getListingById, isListingResponse } from "@/lib/api/listings";
import React from "react";
import { notFound } from "next/navigation";
import Banner from "@/components/common/banner";
import BookingForm from "./components/booking-form";
import { isValidDateRange } from "@/lib/utils/is-valid-date-range";

const BookingPage = async ({
  params,
  searchParams
}: {
  params: { id: string };
  searchParams: { to: string; from: string; guests: string };
}) => {
  const { id } = params;
  const { from, to, guests } = searchParams;

  const response = await getListingById(id);
  if (!isListingResponse(response)) {
    if (response.errors[0]?.code === "invalid_string") {
      notFound();
    }

    return (
      <Container className="mb-128 space-y-24 pt-32 md:pt-64">
        <Banner
          type={"minimal"}
          title="Oops something went wrong"
          body={response.errors[0]?.message || "Failed to load booking"}
        />
      </Container>
    );
  }

  const listing = response.data;
  const bookedDates = listing.bookings.map(({ dateTo, dateFrom }) => {
    return { dateFrom: new Date(dateFrom), dateTo: new Date(dateTo) };
  });

  const dateRange = {
    from: from ? new Date(from) : undefined,
    to: to && from ? new Date(to) : undefined
  };

  const dateRangePreset = isValidDateRange(dateRange, bookedDates)
    ? { dateTo: to, dateFrom: from }
    : { dateTo: undefined, dateFrom: undefined };
  const formPresets = {
    ...dateRangePreset,
    guests: Number(guests) > 0 && Number(guests) <= listing.maxGuests ? guests : undefined
  };

  return (
    <Container variant={"sm"}>
      <BookingForm listing={listing} formPresets={formPresets} />
    </Container>
  );
};

export default BookingPage;
