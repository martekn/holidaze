import React, { useEffect, useState } from "react";

import Link from "next/link";
import { Card, CardImage, CardTitle } from "@/components/ui/card";
import Rating from "@/components/ui/rating";
import Price from "@/components/ui/price";
import { cn } from "@/lib/utils/shadcn-utils";
import { IconParking, IconPaw, IconSoup, IconWifi } from "@tabler/icons-react";
import { TAmenity, TBaseListing } from "@/lib/schema";
import { getFormattedAddress } from "@/lib/utils/getFormattedAddress";

const AMENITIES = {
  parking: {
    icon: IconParking,
    title: "Parking"
  },
  breakfast: {
    icon: IconSoup,
    title: "Breakfast"
  },
  wifi: {
    icon: IconWifi,
    title: "Wi-Fi"
  },
  pets: {
    icon: IconPaw,
    title: "Pet friendly"
  }
};

type AmenityKey = keyof typeof AMENITIES;

const getFilteredAmenities = (meta: TAmenity): AmenityKey[] => {
  const supportedAmenities = Object.entries(meta).filter(([key]) => {
    return Object.keys(AMENITIES).includes(key);
  });

  const includedAmenities = supportedAmenities
    .filter(([, value]) => value)
    .map(([key]) => key as AmenityKey);
  return includedAmenities;
};

type DetailedListingCardProps = {
  listing: TBaseListing;
  className: string;
};
const DetailedListingCard = ({ listing, className }: DetailedListingCardProps) => {
  const { location, name, media, price, rating, id, meta } = listing;

  const [filteredAmenities, setFilteredAmenities] = useState<AmenityKey[]>([]);

  const address = getFormattedAddress(location);

  useEffect(() => {
    setFilteredAmenities(getFilteredAmenities(meta));
  }, [meta]);

  return (
    <Card
      variant={"outline"}
      className={cn(
        "relative grid cursor-pointer grid-cols-3 overflow-hidden @container/card",
        className
      )}
    >
      <div className="relative col-span-full w-full pb-[66%] @lg/card:col-span-1">
        <CardImage
          src={media[0].url}
          alt={media[0].alt}
          scaleOnHover
          rounded={"none"}
          className="absolute inset-0"
        />
      </div>
      <div className="col-span-full flex h-full flex-col justify-between p-24 @container/card-body @lg/card:col-span-2">
        <div>
          <div className="mb-16 flex justify-between gap-16">
            <div>
              <CardTitle asChild ellipse fullCardLink hoverEffect>
                <Link href={`/listings/${id}`}>{name}</Link>
              </CardTitle>
              <span className="text-sm text-muted-foreground">{address}</span>
            </div>
            <Rating
              rating={rating}
              textPosition={"reverse"}
              className="self-start"
              textClassName="@md/card-body:block hidden"
            />
          </div>
          <ul className="flex flex-wrap items-center gap-8">
            {filteredAmenities.map((amenity, index) => {
              const Icon = AMENITIES[amenity].icon;
              const title = AMENITIES[amenity].title;
              return (
                <li className="flex items-center gap-8" key={index}>
                  <div className="flex items-center gap-4">
                    <Icon className="h-20 w-20 stroke-[1.3]" />
                    <span>{title}</span>
                  </div>

                  {index !== filteredAmenities.length - 1 && (
                    <div aria-hidden className="h-[2px] w-[2px] rounded-full bg-muted-foreground" />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="mt-24 w-full border-t border-neutral-200 pt-24">
          <Price price={price} />
        </div>
      </div>
    </Card>
  );
};

export default DetailedListingCard;
