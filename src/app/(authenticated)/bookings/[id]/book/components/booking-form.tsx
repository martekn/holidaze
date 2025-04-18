"use client";

import { DateRangePicker } from "@/components/common/date-range-picker";
import GuestCountInput from "@/components/common/guest-count-input";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import Price from "@/components/ui/price";
import { toast } from "@/components/ui/sonner";
import { createBooking } from "@/lib/api/bookings";
import { TBaseError, TListingWithBookings } from "@/lib/schema";
import { getBookingFormSchema, TBookingFormData } from "@/lib/schema/forms/booking";
import { headingStyles } from "@/lib/styles/heading-styles";
import { calculateBookingDetails } from "@/lib/utils/calculate-booking-details";
import { getBookedDates } from "@/lib/utils/get-booked-dates";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconChevronLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import { useForm } from "react-hook-form";
import { revalidateBookingForm } from "../actions";
import { LISTING_NAME_PLACEHOLDER } from "@/lib/constants";

const generateGoBackHref = (id: string, from?: Date, to?: Date, guests?: number) => {
  const params = new URLSearchParams();

  if (from) params.set("from", from.toISOString());
  if (to) params.set("to", to.toISOString());
  if (guests) params.set("guests", guests.toString());

  const queryString = params.toString();
  const query = queryString ? `?${queryString}` : "";

  const href = `/listings/${id}${query}`;

  return href;
};

const BookingForm = ({
  listing,
  formPresets
}: {
  listing: TListingWithBookings;
  formPresets: {
    dateTo: string | undefined;
    dateFrom: string | undefined;
    guests: string | undefined;
  };
}) => {
  const [errors, setErrors] = useState<TBaseError["errors"]>([]);
  const router = useRouter();
  const bookedDates = getBookedDates(listing.bookings);
  const bookingFormSchema = getBookingFormSchema(listing.maxGuests);

  const form = useForm<TBookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      dateRange: {
        from: formPresets.dateFrom ? new Date(formPresets.dateFrom) : undefined,
        to: formPresets.dateTo ? new Date(formPresets.dateTo) : undefined
      },
      guestCount: formPresets.guests ? Number(formPresets.guests) : 1
    },
    mode: "onTouched"
  });

  const onSubmit = async (data: TBookingFormData) => {
    setErrors([]);
    if (!data.dateRange.from || !data.dateRange.to) {
      setErrors([{ message: "Check in and checkout dates are required" }]);
      return;
    }

    try {
      const formattedData = {
        dateFrom: data.dateRange.from,
        dateTo: data.dateRange.to,
        guests: data.guestCount,
        venueId: listing.id
      };

      const response = await createBooking(formattedData);

      if (!("data" in response)) {
        if (!(response.status === "Conflict")) {
          throw response;
        }
        setErrors([
          {
            message:
              "The selected dates overlap with an existing booking for this stay. Please select new dates"
          }
        ]);
        revalidateBookingForm(listing.id);
        form.setValue("dateRange", { from: undefined, to: undefined });
        return;
      }

      toast({
        title: "Booking successful",
        variant: "success",
        children: "The stay has been booked and reserved"
      });
      router.push(`/bookings/${response.data.id}/success`);
    } catch (error) {
      console.error(error);
      setErrors([{ message: "Unexpected error occurred, please try again" }]);
    }
  };

  const dateRange = form.watch("dateRange");
  const guests = form.watch("guestCount");
  const { totalPrice, isValidRange } = calculateBookingDetails(dateRange, listing.price);

  return (
    <div className="space-y-48">
      <Link
        href={generateGoBackHref(listing.id, dateRange.from, dateRange.to, guests)}
        variant={"link"}
        size={"custom"}
      >
        <IconChevronLeft /> Go back
      </Link>
      <div className="space-y-24">
        <div className="space-y-8">
          <Heading tag="h1" variant={"heading2"}>
            Book {listing.name || LISTING_NAME_PLACEHOLDER}
          </Heading>
          <p className="text-muted-foreground">
            Please fill out the form to make your reservation and pay for the stay
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-24">
            <div className="space-y-24 border-y py-24">
              {errors.length > 0 && (
                <Alert variant="error" title="Unable to book stay">
                  <ul className={errors.length > 1 ? "list-inside list-disc" : ""}>
                    {errors.map((error, index) => {
                      return <li key={index}>{error.message}</li>;
                    })}
                  </ul>
                </Alert>
              )}
              <Heading tag="h2" variant={"heading5"}>
                Booking details
              </Heading>
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
            </div>
            <div className="grid grid-cols-2 items-center gap-24 text-sm text-muted-foreground">
              <div className="space-y-4">
                {isValidRange && (
                  <>
                    <div>Total price</div>
                    <div className={headingStyles({ variant: "heading3" })}>${totalPrice}</div>
                  </>
                )}
                {!isValidRange && (
                  <>
                    <div>Price</div>
                    <Price price={listing.price} />
                  </>
                )}
              </div>
              <Button
                type="submit"
                className="justify-self-end"
                disabled={!dateRange.to || !dateRange.from}
              >
                Confirm booking
              </Button>
              <p className="col-span-full">
                By clicking confirm booking, you agree to our terms and conditions.{" "}
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default BookingForm;
