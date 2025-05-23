import { Card, CardTitle } from "@/components/ui/card";
import { LISTING_NAME_PLACEHOLDER } from "@/lib/constants";
import { TBaseBooking, TBaseListing, TBaseUser } from "@/lib/schema";
import { headingStyles } from "@/lib/styles/heading-styles";
import { calculateBookingDetails } from "@/lib/utils/calculate-booking-details";
import { getFormattedAddress } from "@/lib/utils/get-formatted-address";
import { cn } from "@/lib/utils/shadcn-utils";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import React from "react";

type BookingInfoCardProps = {
  booking: TBaseBooking;
  listing: TBaseListing;
  customer?: TBaseUser;
  variant: "guest-view" | "host-view";
  className?: string;
};

const CardBookingInfo = ({
  booking,
  listing,
  customer,
  variant = "guest-view",
  className,
  ...props
}: BookingInfoCardProps) => {
  const { dateFrom, dateTo, guests, created } = booking;
  const { location, name, price } = listing;
  const bookingID = booking.id;
  const listingID = listing.id;

  const dateFromParsed = parseISO(dateFrom);
  const dateToParsed = parseISO(dateTo);
  const createdDateParsed = parseISO(created);

  const formatStyle = "dd-MM-yyyy";
  const formattedDateFrom = format(dateFromParsed, formatStyle);
  const formattedDateTo = format(dateToParsed, formatStyle);
  const formattedCreatedDate = format(createdDateParsed, formatStyle);

  const { totalPrice } = calculateBookingDetails(
    {
      from: new Date(dateFromParsed),
      to: new Date(dateToParsed)
    },
    price
  );

  return (
    <Card variant="outline" padding={"lg"} asChild>
      <article {...props} className={cn("@container", className)}>
        {variant === "guest-view" && (
          <header>
            <CardTitle asChild hoverEffect>
              <Link className="break-text" href={`/listings/${listingID}`}>
                {name || LISTING_NAME_PLACEHOLDER}
              </Link>
            </CardTitle>
            <address className="break-text font-normal not-italic">
              {getFormattedAddress(location)}
            </address>
          </header>
        )}
        {variant === "host-view" && (
          <header>
            <CardTitle>{customer?.name || name || LISTING_NAME_PLACEHOLDER}</CardTitle>
            {customer?.email && <p className="font-normal not-italic">{customer.email}</p>}
          </header>
        )}
        <dl className="mt-24 grid gap-x-48 gap-y-16 @xs:grid-cols-2 @md:grid-cols-3 @2xl:grid-cols-5">
          <div className="@xs:col-start-1 @md:col-start-auto">
            <dt className={cn(headingStyles({ variant: "heading6" }))}>Date of Booking</dt>
            <dd>{formattedCreatedDate}</dd>
          </div>
          <div className="@xs:col-start-1 @md:col-start-auto">
            <dt className={cn(headingStyles({ variant: "heading6" }))}>Check in</dt>
            <dd>{formattedDateFrom}</dd>
          </div>
          <div className="@xs:col-start-1 @md:col-start-auto">
            <dt className={cn(headingStyles({ variant: "heading6" }))}>Check out</dt>
            <dd>{formattedDateTo}</dd>
          </div>
          <div className="@xs:col-start-2 @xs:row-start-1 @md:col-start-auto @md:row-start-auto">
            <dt className={cn(headingStyles({ variant: "heading6" }))}>Guests</dt>
            <dd>
              {guests} {guests === 1 ? "person" : "people"}
            </dd>
          </div>
          <div className="@xs:col-start-2 @xs:row-start-2 @md:col-start-auto @md:row-start-auto">
            <dt className={cn(headingStyles({ variant: "heading6" }))}>Total</dt>
            <dd>${totalPrice}</dd>
          </div>
        </dl>
        {variant === "guest-view" && (
          <small className="mt-64 block text-sm text-muted-foreground">
            Booking id: {bookingID}
          </small>
        )}
      </article>
    </Card>
  );
};

export default CardBookingInfo;
