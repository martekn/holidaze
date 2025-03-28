"use client";

import { Button } from "@/components/ui/button";
import { TBaseListing } from "@/lib/schema";
import { cn } from "@/lib/utils/shadcn-utils";
import React from "react";
import { GalleryDisplayImage } from "./gallery-display-image";

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
      {images.length === 0 && <GalleryDisplayImage className="col-span-full row-span-full" />}

      {images.length > 0 && (
        <>
          <GalleryDisplayImage
            src={images[0]?.url}
            alt={images[0]?.alt}
            className={cn(
              "col-start-1 row-start-1",
              isSingleImage ? "col-span-full row-span-full" : "row-span-2 md:col-span-2"
            )}
            isButton
            onImageClick={onImageClick}
            imageIndex={0}
          />

          {!isSingleImage && (
            <GalleryDisplayImage
              src={images[1]?.url}
              alt={images[1]?.alt}
              className={!isMaxImages ? "row-span-full" : ""}
              isButton
              onImageClick={onImageClick}
              imageIndex={1}
            />
          )}

          {isMaxImages && (
            <GalleryDisplayImage
              src={images[2]?.url}
              alt={images[2]?.alt}
              isButton
              onImageClick={onImageClick}
              imageIndex={2}
            />
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
            View gallery
          </Button>
        </>
      )}
    </div>
  );
};

export default GalleryDisplay;
