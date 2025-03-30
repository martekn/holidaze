import React from "react";

import Link from "next/link";
import { Card, CardImage, CardTitle } from "@/components/ui/card";
import Rating from "@/components/ui/rating";
import Price from "@/components/ui/price";
import { cn } from "@/lib/utils/shadcn-utils";
import { TBaseListing } from "@/lib/schema";
import { getFormattedAddress } from "@/lib/utils/get-formatted-address";
import Amenities from "@/components/ui/amenities";

type DetailedListingCardProps = {
  listing: TBaseListing;
  className: string;
};
const DetailedListingCard = ({ listing, className }: DetailedListingCardProps) => {
  const { location, name, media, price, rating, id, meta } = listing;

  const address = getFormattedAddress(location);

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
          <Amenities amenitiesMeta={meta} variant={"small"} layout={"rowSpacer"} />
        </div>
        <div className="mt-24 w-full border-t border-neutral-200 pt-24">
          <Price price={price} />
        </div>
      </div>
    </Card>
  );
};

export default DetailedListingCard;
