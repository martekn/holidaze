"use client";

import { AMENITIES } from "@/lib/constants";
import { TAmenity, TBaseListing } from "@/lib/schema";
import { cn } from "@/lib/utils/shadcn-utils";
import { cva, VariantProps } from "class-variance-authority";
import React, { useEffect, useState } from "react";

type AmenityKey = keyof typeof AMENITIES;

export const amenitiesStyles = cva("[&_svg]:stroke-[1.3]", {
  variants: {
    variant: {
      default: "[&_svg]:h-32 [&_svg]:w-32",
      small: "text-sm [&_svg]:h-20 [&_svg]:w-20"
    },
    layout: {
      default: "grid xs:grid-cols-[auto_1fr] gap-y-12 gap-x-48 sm:gap-x-128 lg:gap-y-24",
      rowSpacer: "flex flex-wrap items-center gap-8"
    }
  },
  defaultVariants: {
    variant: "default",
    layout: "default"
  }
});

export type AmenitiesStyleProps = VariantProps<typeof amenitiesStyles>;

const getAmenitiesArray = (meta: TAmenity): AmenityKey[] => {
  const supportedAmenities = Object.entries(meta).filter(([key]) => {
    return Object.keys(AMENITIES).includes(key);
  });

  const includedAmenities = supportedAmenities
    .filter(([, value]) => value)
    .map(([key]) => key as AmenityKey);
  return includedAmenities;
};

type AmenitiesProps = AmenitiesStyleProps & {
  amenitiesMeta: TBaseListing["meta"];
  className?: string;
};

export const Amenities = ({ amenitiesMeta, variant, layout, className }: AmenitiesProps) => {
  const isRowSpacerLayout = layout === "rowSpacer";
  const [amenities, setAmenities] = useState<AmenityKey[]>([]);

  useEffect(() => {
    setAmenities(getAmenitiesArray(amenitiesMeta));
  }, [amenitiesMeta]);

  return (
    <ul className={cn(amenitiesStyles({ variant, layout }), "", className)}>
      {amenities.map((amenity, index) => {
        const Icon = AMENITIES[amenity].icon;
        const title = AMENITIES[amenity].title;
        return (
          <li className="flex items-center gap-8" key={index}>
            <div className={cn("flex items-center", isRowSpacerLayout ? "gap-4" : "gap-12")}>
              <Icon />
              <span className="">{title}</span>
            </div>

            {index !== amenities.length - 1 && isRowSpacerLayout && (
              <div aria-hidden className="h-[2px] w-[2px] rounded-full bg-muted-foreground" />
            )}
          </li>
        );
      })}
    </ul>
  );
};
export default Amenities;
