import * as React from "react";

import {
  Carousel as CarouselContainer,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import ListingCard from "@/components/common/cards/listing/listing-card";
import { TBaseListing } from "@/lib/schema";

export function Carousel({ listings }: { listings: TBaseListing[] }) {
  return (
    <CarouselContainer
      opts={{
        align: "start"
      }}
      className="w-full"
    >
      <CarouselContent className="md:-ml-24">
        {listings.map((listing, index) => (
          <CarouselItem key={index} className="md:basis-1/2 md:pl-24 lg:basis-1/3">
            <ListingCard listing={listing} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </CarouselContainer>
  );
}
