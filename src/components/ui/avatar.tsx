"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils/shadcn-utils";
import { IconUserFilled } from "@tabler/icons-react";
import { API_AVATAR_PLACEHOLDER } from "@/lib/constants";

interface AvatarProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  alt?: string;
  src?: string;
}

const Avatar = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Root>, AvatarProps>(
  ({ alt, src, className, ...props }, ref) => {
    const isPlaceholder = src === API_AVATAR_PLACEHOLDER;

    return (
      <AvatarPrimitive.Root
        ref={ref}
        className={cn("relative flex h-40 w-40 shrink-0 overflow-hidden rounded-md", className)}
        {...props}
      >
        <AvatarPrimitive.Image
          className={"aspect-square h-full w-full"}
          src={isPlaceholder ? "/images/avatar-placeholder.jpg" : src}
          alt={isPlaceholder ? "" : alt}
        />
        <AvatarPrimitive.Fallback
          ref={ref}
          className="flex h-full w-full items-center justify-center rounded-md bg-secondary-100"
        >
          <IconUserFilled className="h-1/2 w-1/2 text-secondary-300" />
        </AvatarPrimitive.Fallback>
        <div className="absolute inset-0 h-full w-full rounded-md border border-neutral-800/10"></div>
      </AvatarPrimitive.Root>
    );
  }
);
Avatar.displayName = AvatarPrimitive.Root.displayName;

export { Avatar };
