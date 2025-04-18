"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/shadcn-utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const searchFormSchema = z.object({
  search: z.string().optional()
});

type FormData = z.infer<typeof searchFormSchema>;

const SearchForm = ({
  variant = "default",
  className
}: {
  variant?: "default" | "minimal";
  className: string;
}) => {
  const router = useRouter();
  const isDefault = variant === "default";
  const form = useForm<FormData>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      search: ""
    },
    mode: "onTouched"
  });

  const onSubmit = (data: FormData) => {
    const params = new URLSearchParams();

    if (data.search) params.set("search", data.search);

    const queryString = params.toString();
    const query = queryString ? `?${queryString}` : "";

    router.push(`/explore${query}`);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("text-foreground", isDefault ? "flex gap-8" : "relative", className)}
      >
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="flex-1 space-y-0">
              <FormLabel className="sr-only">Search stays</FormLabel>
              <FormControl>
                <Input
                  borderStyle={"light"}
                  {...field}
                  placeholder="Search.."
                  className={cn(isDefault ? "h-48" : "h-40 pr-40")}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant={isDefault ? "default" : "ghost"}
          size="icon"
          className={cn(
            isDefault
              ? "h-48 w-48"
              : "absolute inset-y-0 right-0 h-40 w-40 hover:border-neutral-700"
          )}
        >
          <IconSearch />
          <span className="sr-only">Search</span>
        </Button>
      </form>
    </Form>
  );
};

export default SearchForm;
