"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { updateUser } from "@/lib/api/user";
import { API_AVATAR_PLACEHOLDER } from "@/lib/constants";
import { TUserWithVenueManager } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const avatarSchema = z.object({
  url: z.string().url().optional()
});

export type avatarFormData = z.infer<typeof avatarSchema>;

const isValidUrl = (url: string | null | undefined): boolean => {
  if (!url) return false;

  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

type AvatarFormProps = {
  user: TUserWithVenueManager | null;
};

const AvatarForm = ({ user }: AvatarFormProps) => {
  const isApiPlaceholder = user?.avatar.url === API_AVATAR_PLACEHOLDER;
  const initialAvatar = isApiPlaceholder ? "" : user?.avatar.url;
  const [avatar, setAvatar] = useState(initialAvatar);
  const form = useForm<avatarFormData>({
    resolver: zodResolver(avatarSchema),
    defaultValues: {
      url: initialAvatar
    },
    mode: "onTouched"
  });

  const url = form.watch("url");

  const onSubmit = async (data: avatarFormData) => {
    try {
      await updateUser({
        avatar: { url: data.url || API_AVATAR_PLACEHOLDER, alt: "" }
      });
      toast({
        title: "Avatar updated",
        variant: "success",
        children: "Avatar was successfully updated"
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Avatar update failed",
        variant: "error",
        children: "Please double check the image url and try again."
      });
    }
  };

  useEffect(() => {
    if (isValidUrl(url)) {
      setAvatar(url ?? "/images/avatar-placeholder.jpg");
    } else {
      setAvatar("/images/avatar-placeholder.jpg");
    }
  }, [url]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image url</FormLabel>
              <div className="flex gap-8 max-sm:flex-col">
                <div className="relative flex-1">
                  <Input
                    placeholder="Paste image URL here.."
                    type="url"
                    {...field}
                    className="pr-64"
                  />
                  <div className="absolute inset-y-4 right-4 w-40 overflow-hidden rounded-md">
                    <ImageWithFallback
                      src={avatar || "/images/avatar-placeholder.jpg"}
                      alt=""
                      fill
                      className="object-cover"
                      fallbackSrc="/images/avatar-placeholder.jpg"
                    />
                  </div>
                </div>
                <FormMessage className="sm:hidden" />
                <Button
                  className="h-full"
                  disabled={(!!url && !isValidUrl(url)) || url === user?.avatar.url}
                >
                  Update
                </Button>
              </div>
              <FormMessage className="max-sm:hidden" />

              <FormDescription>
                Paste the URL of an online image to update your profile picture. Ensure the link
                ends with .jpg, .png, etc. If you no longer want an avatar, remove the url.
              </FormDescription>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default AvatarForm;
