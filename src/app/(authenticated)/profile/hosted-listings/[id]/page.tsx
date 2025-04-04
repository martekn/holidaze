import Banner from "@/components/common/banner";
import BookingInfoCard from "@/components/common/cards/booking/booked-info-card";
import IconTitleCard from "@/components/common/cards/generic/icon-title-card";
import Container from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import Section from "@/components/ui/section";
import { getListingById, isListingResponse } from "@/lib/api/listings";
import { getUserData } from "@/lib/cookies/server";
import { headingStyles } from "@/lib/styles/heading-styles";
import { calculateBookingDetails } from "@/lib/utils/calculate-booking-details";
import { getFormattedDate } from "@/lib/utils/get-formatted-date";
import { IconCalendar, IconChevronLeft, IconCurrencyDollar, IconUsers } from "@tabler/icons-react";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { format, parseISO } from "date-fns";

export const metadata: Metadata = {
  title: "Manage Bookings | Holidaze",
  description: "Track reservations for your Holidaze listings."
};

const HostedListingDetailPage = async ({ params }: { params: { id: string } }) => {
  const listingID = params.id;
  const response = await getListingById(listingID);
  const user = await getUserData();
  if (!user) {
    redirect("/login");
  }

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
  const { name, price, bookings, updated, owner } = listing;

  if (owner.name !== user.name) notFound();

  const formattedDate = getFormattedDate(new Date(updated));
  const totalBookings = bookings.length;
  let totalGuests = 0;
  let totalRevenue = 0;

  for (const booking of bookings) {
    totalGuests += booking.guests;
    const { totalPrice } = calculateBookingDetails(
      { from: new Date(booking.dateFrom), to: new Date(booking.dateTo) },
      price
    );
    totalRevenue += totalPrice;
  }
  return (
    <div className="space-y-64">
      <Link href="/profile/hosted-listings" variant={"link"} size={"custom"}>
        <IconChevronLeft /> Back to listings
      </Link>
      <div className="grid gap-24 md:grid-cols-[1fr_auto]">
        <div>
          <Heading tag="h1" variant={"heading2"}>
            {name}
          </Heading>
          <p className="text-sm text-muted-foreground">Last updated {formattedDate}</p>
        </div>
        <div className="flex gap-16">
          <Link href={`/listings/${listingID}`} variant={"outline"}>
            View listing
          </Link>
          <Link href={`/listings/${listingID}/edit`}>Edit listing</Link>
        </div>
      </div>
      <ul className="grid gap-24 md:grid-cols-3">
        <li>
          <IconTitleCard title="Total bookings" icon={IconCalendar} size="sm">
            <div className={headingStyles({ variant: "heading4" })}>{totalBookings}</div>
          </IconTitleCard>
        </li>
        <li>
          <IconTitleCard title="Total guests" icon={IconUsers} size="sm">
            <div className={headingStyles({ variant: "heading4" })}>{totalGuests}</div>
          </IconTitleCard>
        </li>
        <li>
          <IconTitleCard title="Total Revenue" icon={IconCurrencyDollar} size="sm">
            <div className={headingStyles({ variant: "heading4" })}>${totalRevenue}</div>
          </IconTitleCard>
        </li>
      </ul>
      <Section className="space-y-24">
        <div className="space-y-8">
          <Heading tag="h1" variant={"heading3"}>
            Booking history
          </Heading>
          <p className="text-sm text-muted-foreground">View all bookings, past and upcoming</p>
        </div>
        {bookings.length > 0 && (
          <>
            <div className="md:hidden">
              <ul className="space-y-24">
                {bookings.map((booking) => {
                  return (
                    <li key={booking.id}>
                      <BookingInfoCard
                        booking={booking}
                        listing={listing}
                        customer={booking.customer}
                        variant="host-view"
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="rounded-lg border max-md:hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Guest</TableHead>
                    <TableHead>Check in</TableHead>
                    <TableHead>Check out</TableHead>
                    <TableHead>Guests</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map(({ dateFrom, dateTo, guests, customer, id }) => {
                    const { totalPrice } = calculateBookingDetails(
                      { from: new Date(dateFrom), to: new Date(dateTo) },
                      listing.price
                    );
                    return (
                      <TableRow key={id}>
                        <TableCell className="font-medium">
                          <div>{customer.name}</div>
                          <div className="text-muted-foreground/85">{customer.email}</div>
                        </TableCell>
                        <TableCell>{format(parseISO(dateFrom), "dd-MM-yyyy")}</TableCell>
                        <TableCell>{format(parseISO(dateTo), "dd-MM-yyyy")}</TableCell>
                        <TableCell>{guests}</TableCell>
                        <TableCell className="text-right">${totalPrice}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </>
        )}
        {bookings.length === 0 && (
          <Banner
            type={"minimal"}
            sectionInnerSpacing={"sm"}
            isSection
            title="No Bookings Yet"
            body="Your listing is ready for guests! Once bookings start coming in, they'll appear here. In the meantime, you might want to enhance your listing's visibility with great photos or competitive pricing"
          />
        )}
      </Section>
    </div>
  );
};

export default HostedListingDetailPage;
