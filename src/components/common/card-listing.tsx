import React from "react";

import Link from "next/link";
import { Card, CardImage, CardTitle } from "@/components/ui/card";
import Rating from "@/components/ui/rating";
import Price from "@/components/ui/price";
import { TBaseListing } from "@/lib/schema";
import { getFormattedAddress } from "@/lib/utils/get-formatted-address";
import { LISTING_NAME_PLACEHOLDER } from "@/lib/constants";

type ListingCardProps = {
  listing: TBaseListing;
};

const CardListing = ({ listing, ...props }: ListingCardProps) => {
  const { location, media, rating, id, name, price } = listing;

  const address = getFormattedAddress(location);

  return (
    <Card className="relative cursor-pointer space-y-12 @container" {...props}>
      <CardImage ratio={5 / 3} src={media[0]?.url} alt={media[0]?.alt} scaleOnHover />
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="line-clamp-1 text-ellipsis text-sm text-muted-foreground">
            {address}
          </span>
          <Rating rating={rating} textPosition={"reverse"} textClassName="hidden @xs:block" />
        </div>
        <CardTitle asChild ellipse hoverEffect fullCardLink>
          <Link href={`/listings/${id}`}>{name || LISTING_NAME_PLACEHOLDER}</Link>
        </CardTitle>
        <Price price={price} />
      </div>
    </Card>
  );
};

export default CardListing;
