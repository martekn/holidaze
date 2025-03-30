import Banner from "@/components/common/banner";
import BookingInfoCard from "@/components/common/cards/booking/booked-info-card";
import Container from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import Section from "@/components/ui/section";
import { getBookingById } from "@/lib/api/bookings";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import { notFound } from "next/navigation";
import React from "react";

const BookingSuccessPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const response = await getBookingById(id);
  if (!("data" in response)) {
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

  const booking = response.data;

  return (
    <Container asChild>
      <main>
        <Section className="mx-auto max-w-prose space-y-16 text-center" variant={"lg"}>
          <Heading tag="h1" variant={"heading1"} className="flex items-center justify-center gap-8">
            <span>Booking confirmed</span>{" "}
            <IconCircleCheckFilled className="h-32 w-32 text-alert-success" />
          </Heading>
          <p>
            Thank you for your booking. We are thrilled to confirm your reservation to{" "}
            {booking.venue.name}. A detailed confirmation email with check-in instructions will
            arrive in your inbox shortly.
          </p>
        </Section>
        <Section variant={"lg"}>
          <BookingInfoCard booking={booking} className={""} />
        </Section>
      </main>
    </Container>
  );
};

export default BookingSuccessPage;
