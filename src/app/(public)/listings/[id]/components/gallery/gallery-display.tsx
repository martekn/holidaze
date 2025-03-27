"use client";

import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { TBaseListing } from "@/lib/schema";
import { cn } from "@/lib/utils/shadcn-utils";
import React from "react";

interface GalleryDisplayProps {
  images: TBaseListing["media"];
  onImageClick: (index: number) => void;
  onButtonClick: () => void;
}

const GalleryDisplay = ({ images, onImageClick, onButtonClick }: GalleryDisplayProps) => {
  const isSingleImage = images.length <= 1;
  const isMaxImages = images.length >= 3;

  return (
    <div className="relative grid h-[250px] grid-cols-2 grid-rows-2 gap-8 xs:h-[350px] md:h-[550px] md:grid-cols-3">
      <Button
        variant="ghost"
        className={cn(
          "relative col-start-1 row-start-1 h-full overflow-hidden rounded-lg p-0",
          isSingleImage ? "col-span-full row-span-full" : "row-span-2 md:col-span-2"
        )}
        onClick={() => onImageClick(0)}
      >
        <ImageWithFallback
          src={images[0]?.url}
          alt={images[0]?.alt}
          fill
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <span className="sr-only">View image</span>
      </Button>

      {!isSingleImage && (
        <Button
          variant="ghost"
          className={cn(
            "relative h-full overflow-hidden rounded-lg p-0",
            !isMaxImages && "row-span-full"
          )}
          onClick={() => onImageClick(1)}
        >
          <ImageWithFallback
            src={images[1]?.url}
            alt={images[1]?.alt}
            fill
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
          />
          <span className="sr-only">View image</span>
        </Button>
      )}

      {isMaxImages && (
        <Button
          variant="ghost"
          className="relative h-full w-full overflow-hidden rounded-lg p-0"
          onClick={() => onImageClick(2)}
        >
          <ImageWithFallback
            src={images[2]?.url}
            alt={images[2]?.alt}
            fill
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
          />
          <span className="sr-only">View image</span>
        </Button>
      )}

      <Button
        onClick={(e) => {
          e.stopPropagation();
          onButtonClick();
        }}
        variant={"outline"}
        className="absolute bottom-8 right-8 p-8 md:bottom-16 md:right-16"
        aria-label="See all images"
      >
        See all images
      </Button>
    </div>
  );
};

export default GalleryDisplay;
