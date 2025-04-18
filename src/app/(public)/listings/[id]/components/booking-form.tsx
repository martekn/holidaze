"use client";

import { DateRangePicker } from "@/components/common/date-range-picker";
import GuestCountInput from "@/components/common/guest-count-input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import Price from "@/components/ui/price";
import { TListingWithBookings } from "@/lib/schema";
import { getBookingFormSchema, TBookingFormData } from "@/lib/schema/forms/booking";
import { headingStyles } from "@/lib/styles/heading-styles";
import { calculateBookingDetails } from "@/lib/utils/calculate-booking-details";
import { getBookedDates } from "@/lib/utils/get-booked-dates";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { DateRange } from "react-day-picker";
import { useForm } from "react-hook-form";

const BookingForm = ({
  listing,
  to,
  from,
  guests
}: {
  listing: TListingWithBookings;
  to?: string;
  from?: string;
  guests?: string;
}) => {
  const router = useRouter();
  const bookedDates = getBookedDates(listing.bookings);
  const bookingFormSchema = getBookingFormSchema(listing.maxGuests);

  const form = useForm<TBookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      dateRange: { from: from ? new Date(from) : undefined, to: to ? new Date(to) : undefined },
      guestCount: guests ? Number(guests) : 1
    },
    mode: "onTouched"
  });

  const onSubmit = (data: TBookingFormData) => {
    const params = new URLSearchParams();
    if (data.dateRange.from) params.set("from", data.dateRange.from.toISOString());
    if (data.dateRange.to) params.set("to", data.dateRange.to.toISOString());
    if (data.guestCount) params.set("guests", data.guestCount.toString());
    const queryString = params.toString();
    const query = queryString ? `?${queryString}` : "";
    router.push(`/bookings/${listing.id}/book/${query}`);
  };

  const dateRange = form.watch("dateRange");
  const { nights, totalPrice, isValidRange } = calculateBookingDetails(dateRange, listing.price);
  const formRef = useRef<HTMLDivElement>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const ref = formRef.current;
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFormVisible(entry.isIntersecting);
      },
      { root: null, rootMargin: "0px", threshold: 0.1 }
    );

    observer.observe(ref);

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, []);

  const onButtonScroll = () => {
    if (formRef.current)
      formRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center"
      });
  };

  return (
    <>
      {!isFormVisible && (
        <div className="fixed inset-x-0 bottom-0 z-10 flex w-full items-center justify-between border-t bg-neutral-100 p-16 shadow-md">
          <Price price={listing.price} variant={"lg"} />
          <Button onClick={onButtonScroll}>Book</Button>
        </div>
      )}
      <Card variant={"outline"} padding={"lg"} className="space-y-24" ref={formRef}>
        <Price price={listing.price} variant={"lg"} />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-24">
            <FormField
              control={form.control}
              name="dateRange"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DateRangePicker
                      borderStyle={"light"}
                      label="Check in - Check out"
                      value={field.value}
                      placeholder="Select dates"
                      onChange={(date: DateRange | undefined) => {
                        field.onChange(date ?? { from: undefined, to: undefined });
                      }}
                      bookedDates={bookedDates}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="guestCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Guests</FormLabel>
                  <FormControl>
                    <GuestCountInput
                      {...field}
                      borderStyle={"light"}
                      maxGuests={listing.maxGuests}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {isValidRange && (
              <div className="flex items-center justify-between border-t pt-24">
                <span>
                  Total price for {nights} night{nights > 1 ? "s" : null}
                </span>
                <span className={headingStyles({ variant: "heading5" })}>${totalPrice}</span>
              </div>
            )}

            <Button type="submit" className="w-full">
              Continue to booking
            </Button>
          </form>
        </Form>
      </Card>
    </>
  );
};

export default BookingForm;
