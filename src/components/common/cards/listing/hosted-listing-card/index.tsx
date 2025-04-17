import React from "react";
import Link from "next/link";
import { Card, CardImage, CardTitle } from "@/components/ui/card";
import { TBaseListing } from "@/lib/schema";
import { getFormattedDate } from "@/lib/utils/get-formatted-date";
import { LISTING_NAME_PLACEHOLDER } from "@/lib/constants";

type HostedListingCardProps = {
  listing: TBaseListing;
};

const HostedListingCard = ({ listing, ...props }: HostedListingCardProps) => {
  const { id, media, name, updated } = listing;

  const formattedDate = getFormattedDate(new Date(updated));

  return (
    <Card className="relative cursor-pointer space-y-12" {...props}>
      <CardImage ratio={5 / 3} src={media[0]?.url} alt={media[0]?.alt} scaleOnHover />
      <div className="space-y-4">
        <span className="text-sm text-muted-foreground">Last updated {formattedDate}</span>
        <CardTitle asChild ellipse fullCardLink hoverEffect>
          <Link href={`/profile/hosted-listings/${id}`} className="max-xs:break-all">
            {name || LISTING_NAME_PLACEHOLDER}
          </Link>
        </CardTitle>
      </div>
    </Card>
  );
};

export default HostedListingCard;
