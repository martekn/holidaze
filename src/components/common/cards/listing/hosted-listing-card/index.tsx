import React from "react";
import { format, differenceInDays, isSameMonth, isSameYear } from "date-fns";
import Link from "next/link";
import { Card, CardImage, CardTitle } from "@/components/ui/card";
import { TBaseListing } from "@/lib/schema";

const getFormattedDate = (date: Date) => {
  const currentDate = new Date();

  const isOverAYearAgo = differenceInDays(currentDate, date) > 365;
  const isSameMonthLastYear = isSameMonth(currentDate, date) && !isSameYear(currentDate, date);

  const includeYear = isOverAYearAgo || isSameMonthLastYear;

  return includeYear ? format(date, "MMMM do, yyyy") : format(date, "MMMM do");
};

type HostedListingCardProps = {
  listing: TBaseListing;
};

const HostedListingCard = ({ listing, ...props }: HostedListingCardProps) => {
  const { id, media, name, updated } = listing;

  const formattedDate = getFormattedDate(new Date(updated));

  return (
    <Card className="relative cursor-pointer space-y-12" {...props}>
      <CardImage ratio={5 / 3} src={media[0].url} alt={media[0].alt} scaleOnHover />
      <div className="space-y-4">
        <span className="text-sm text-muted-foreground">Last updated {formattedDate}</span>
        <CardTitle asChild ellipse fullCardLink hoverEffect>
          <Link href={`/listings/${id}`}>{name}</Link>
        </CardTitle>
      </div>
    </Card>
  );
};

export default HostedListingCard;
