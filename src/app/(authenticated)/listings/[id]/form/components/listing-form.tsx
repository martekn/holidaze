"use client";
import { Link } from "@/components/ui/link";
import { TBaseError, TBaseListing } from "@/lib/schema";
import { IconChevronLeft, IconTrash } from "@tabler/icons-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Heading } from "@/components/ui/heading";
import { Fieldset } from "@/components/ui/fieldset";
import { headingStyles } from "@/lib/styles/heading-styles";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils/shadcn-utils";
import { createListing, deleteListing, updateListing } from "@/lib/api/listings";
import SortableMediaList from "./sortable-media-list";
import { API_MAX_IMAGES } from "@/lib/constants";
import { isValidUrl } from "@/lib/utils/is-valid-url";
import { useRouter } from "next/navigation";
import { revalidatePage } from "./actions";
import { toast } from "@/components/ui/sonner";
import { Alert } from "@/components/ui/alert";
import { nanoid } from "@/lib/utils/nanoid";

const mediaSchema = z.object({ url: z.string().url(), alt: z.string(), id: z.string() });
export type MediaData = z.infer<typeof mediaSchema>;
const listingFormSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().max(10000, "The price cannot exceed $10000"),
  maxGuests: z.number().max(100, "A listing cannot have more than 100 guests"),
  wifi: z.boolean(),
  parking: z.boolean(),
  breakfast: z.boolean(),
  pets: z.boolean(),
  address: z.string(),
  city: z.string(),
  zip: z.string(),
  country: z.string(),
  media: z.array(mediaSchema)
});

export type ListingFormData = z.infer<typeof listingFormSchema>;
type ListingFormProps = { listing?: TBaseListing; variant: "edit" | "create" };

const ListingForm = ({ listing, variant }: ListingFormProps) => {
  const router = useRouter();

  const [errors, setErrors] = useState<TBaseError["errors"]>([]);
  const isEditForm = variant === "edit";

  const cancelLink = `/profile/hosted-listings${isEditForm ? `/${listing?.id}` : ""}`;

  let defaultValues: ListingFormData = {
    name: "",
    description: "",
    price: 0,
    maxGuests: 1,
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
    address: "",
    city: "",
    zip: "",
    country: "",
    media: []
  };

  if (isEditForm) {
    const media = listing?.media.map((image) => {
      return { ...image, id: nanoid() };
    });
    defaultValues = {
      name: listing?.name ?? "",
      description: listing?.description ?? "",
      price: listing?.price ?? 0,
      maxGuests: listing?.maxGuests ?? 1,
      wifi: listing?.meta.wifi ?? false,
      parking: listing?.meta.parking ?? false,
      breakfast: listing?.meta.breakfast ?? false,
      pets: listing?.meta.pets ?? false,
      address: listing?.location.address || "",
      city: listing?.location.city || "",
      zip: listing?.location.zip || "",
      country: listing?.location.country || "",
      media: media ?? []
    };
  }

  const form = useForm<ListingFormData>({
    resolver: zodResolver(listingFormSchema),
    defaultValues: defaultValues,
    mode: "onTouched"
  });

  const media = form.watch("media");

  const onSubmit = async (data: ListingFormData) => {
    setErrors([]);

    const formattedData = {
      name: data.name,
      description: data.description,
      price: data.price,
      maxGuests: data.maxGuests,
      meta: { wifi: data.wifi, parking: data.parking, breakfast: data.breakfast, pets: data.pets },
      media: data.media,
      location: {
        address: data.address,
        city: data.city,
        zip: data.zip,
        country: data.country
      }
    };

    let response;
    if (listing) {
      response = await updateListing(listing.id, formattedData);
    } else {
      response = await createListing(formattedData);
    }

    if ("data" in response) {
      toast({
        title: listing ? "Listing updated" : "Listing published",
        variant: "success",
        children: `The listing has been successfully ${listing ? "updated" : "created"}`
      });
      router.push(`/profile/hosted-listings/${response.data.id}`);
      return;
    }

    if ("errors" in response) {
      setErrors(response.errors);
    } else {
      setErrors([
        {
          message: `Unexpected error happened while trying ${listing ? "update" : "create"} the listing. Try again later or contact support`
        }
      ]);
    }
  };

  const [imageUrl, setImageUrl] = useState("");
  const [urlError, setUrlError] = React.useState("");

  const handleAddImage = () => {
    if (!imageUrl) {
      setUrlError("Please enter an image URL");
      return;
    }

    if (media.length >= API_MAX_IMAGES) {
      setUrlError("Max images reached, please remove an image before adding a new one");
      return;
    }
    if (!isValidUrl(imageUrl)) {
      setUrlError("Please enter a valid URL");
      return;
    }

    setUrlError("");

    const newImage = { url: imageUrl, alt: "", id: nanoid() };
    const newValue = [newImage, ...media];
    form.setValue("media", newValue);

    setImageUrl("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddImage();
    }
  };

  const updateMedia = (media: ListingFormData["media"]) => {
    form.setValue("media", media);
  };

  const deleteMedia = (id: string) => {
    const newValue = media.filter((image) => image.id !== id);
    form.setValue("media", newValue);
  };

  const handleDeleteListing = async () => {
    if (!isEditForm || (listing && !("id" in listing)) || !listing) {
      return;
    }

    const response = await deleteListing(listing.id);
    if (!response) {
      toast({
        title: "Deletion successful",
        variant: "success",
        children: "The listing has been deleted"
      });
      revalidatePage();
      router.push("/profile/hosted-listings");
      return;
    }

    toast({
      title: "Deletion failed",
      variant: "error",
      children: "Failed to delete listing, please try again"
    });
  };

  return (
    <div className="space-y-16 md:space-y-48">
      <Link variant={"link"} size={"custom"} href={cancelLink}>
        <IconChevronLeft /> Go back
      </Link>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="[&_fieldset]:mt-32 [&_fieldset]:border-b [&_fieldset]:pb-32"
        >
          <header className="flex justify-between gap-24">
            <div>
              <Heading tag="h1" variant={"heading2"}>
                {isEditForm ? "Edit listing" : "Create listing"}
              </Heading>
              <p className="text-muted-foreground">
                {listing
                  ? "Edit your listing below"
                  : "Please fill out the form to create your listing"}
              </p>
            </div>
            {isEditForm && (
              <Button size={"icon"} variant={"outline"} type="button" onClick={handleDeleteListing}>
                <IconTrash />
                <span className="sr-only">Delete</span>
              </Button>
            )}
          </header>
          {errors.length > 0 && (
            <Alert
              variant="error"
              title={`Unable to ${listing ? "update" : "create"} listing`}
              className="my-32"
            >
              <ul className={errors.length > 1 ? "list-inside list-disc" : ""}>
                {errors.map((error, index) => {
                  return <li key={index}>{error.message}</li>;
                })}
              </ul>
            </Alert>
          )}
          <Fieldset className="grid gap-24 sm:grid-cols-2">
            <legend className={cn(headingStyles({ variant: "heading4" }), "col-span-full mb-16")}>
              Listing details
            </legend>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="col-span-full">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="col-span-full">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="min-h-[10rem]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price per night, in dollars</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(+e.target.value)}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxGuests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max guests</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(+e.target.value)}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Fieldset>

          <Fieldset className="grid gap-24 xs:grid-cols-2">
            <legend className={cn(headingStyles({ variant: "heading4" }), "col-span-full mb-16")}>
              Amenities
            </legend>

            <FormField
              control={form.control}
              name="wifi"
              render={({ field }) => (
                <FormItem variant={"checkbox"}>
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel size={"sm"}>Wifi</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pets"
              render={({ field }) => (
                <FormItem variant={"checkbox"}>
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel size={"sm"}>Pet friendly</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="parking"
              render={({ field }) => (
                <FormItem variant={"checkbox"}>
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel size={"sm"}>Parking</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="breakfast"
              render={({ field }) => (
                <FormItem variant={"checkbox"}>
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel size={"sm"}>Breakfast</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Fieldset>

          <Fieldset className="grid gap-24 sm:grid-cols-2 md:grid-cols-3">
            <legend className={cn(headingStyles({ variant: "heading4" }), "col-span-full mb-16")}>
              Location
            </legend>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="col-span-full">
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip / Postal</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="max-md:col-span-full">
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Fieldset>

          <Fieldset className="grid gap-24">
            <legend className={cn(headingStyles({ variant: "heading4" }), "col-span-full mb-16")}>
              Gallery
            </legend>

            <FormItem>
              <FormLabel>Image url</FormLabel>
              <div className="flex gap-16">
                <FormControl>
                  <Input
                    className="flex-1"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>
                <Button
                  variant={"outline"}
                  className="h-full"
                  onClick={handleAddImage}
                  type="button"
                >
                  Add
                </Button>
              </div>
              <FormMessage>{urlError}</FormMessage>
            </FormItem>
            <div className="space-y-24">
              <div className="space-y-8">
                <Heading tag="h3" variant={"heading5"}>
                  Images ({media.length}/{API_MAX_IMAGES})
                </Heading>
                <p className="text-muted-foreground">
                  Sort the images using the button, the images will be displayed on the page in this
                  order
                </p>
              </div>

              <SortableMediaList media={media} onChange={updateMedia} onDelete={deleteMedia} />
            </div>
          </Fieldset>
          <div className="mt-32 flex justify-end gap-16">
            <Link href={cancelLink} variant={"outline"}>
              Cancel
            </Link>
            <Button>Publish</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ListingForm;
