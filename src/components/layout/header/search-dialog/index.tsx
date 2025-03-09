"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

import SearchButton from "./search-button";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FloatingLabelInput } from "@/components/common/floating-label-input";
import { DateRangePicker } from "@/components/common/date-range-picker";
import { DateRange } from "react-day-picker";
import { IconMapPin } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import GuestCountInput from "@/components/common/guest-count-input";

const searchFormSchema = z.object({
  destination: z.string().optional(),
  dateRange: z
    .object({
      from: z.date().optional(), // Make from optional in the schema
      to: z.date().optional()
    })
    .nullable()
    .optional()
    .transform((data) => {
      // If dateRange is null/undefined, return null
      if (!data) return null;

      // If from is undefined, this handles the "no date selected" case
      // while still matching the required shadcn DateRange type
      return {
        from: data.from || undefined,
        to: data.to
      };
    })
    .refine(
      (data) => {
        // Skip validation if no data
        if (!data) return true;

        // If both dates exist, check their order
        if (data.from && data.to) {
          return data.from <= data.to;
        }

        return true;
      },
      {
        message: "End date cannot be before start date"
      }
    ),
  guestCount: z.number().optional()
});

type FormData = z.infer<typeof searchFormSchema>;

type SearchDialogProps = { className: string };

const SearchDialog = ({ className }: SearchDialogProps) => {
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      destination: "",
      dateRange: { from: undefined, to: undefined },
      guestCount: undefined
    },
    mode: "onTouched"
  });

  const onSubmit = (data: FormData) => {
    const params = new URLSearchParams();

    if (data.destination) params.set("destination", data.destination);
    if (data.dateRange?.from) params.set("from", data.dateRange.from.toISOString());
    if (data.dateRange?.to) params.set("to", data.dateRange.to.toISOString());
    if (data.guestCount) params.set("guests", data.guestCount.toString());

    const queryString = params.toString();
    const query = queryString ? `?${queryString}` : "";

    router.push(`/explore${query}`);
  };

  return (
    <div className={className}>
      <Dialog>
        <DialogTrigger asChild>
          <SearchButton />
        </DialogTrigger>
        <DialogContent className="space-y-16 sm:max-w-screen-md">
          <DialogHeader>
            <DialogTitle>Where do you want to go?</DialogTitle>
          </DialogHeader>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-x-16 gap-y-24 sm:grid-cols-2 md:grid-cols-[1fr_1fr_auto]"
              >
                <FormField
                  control={form.control}
                  name="destination"
                  render={({ field }) => (
                    <FormItem className="col-span-full">
                      <FloatingLabelInput
                        {...field}
                        icon={IconMapPin}
                        id="destination"
                        label="Destination"
                        placeholder="Where to?"
                      />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dateRange"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <DateRangePicker
                          label="Check in - Check out"
                          value={field.value}
                          placeholder="Where to?"
                          isFloating
                          onChange={(date: DateRange | undefined) => {
                            field.onChange(date || null);
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  control={form.control}
                  name="guestCount"
                  render={({ field }) => (
                    <FormItem>
                      <GuestCountInput {...field} isFloating id="test" label="Guests" />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="col-span-full h-full min-h-40 md:col-span-1">
                  Search
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchDialog;
