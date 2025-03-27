"use client";

import React, { useState } from "react";
import GalleryDisplay from "./gallery-display";
import GalleryDialog from "./gallery-dialog";
import SlideshowDialog from "./slideshow-dialog";
import { TBaseListing } from "@/lib/schema";

const Gallery = ({ images }: { images: TBaseListing["media"] }) => {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [slideshowOpen, setSlideshowOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openGallery = () => {
    setGalleryOpen(true);
    setSlideshowOpen(false);
  };

  const openSlideshow = (index: number) => {
    setCurrentImageIndex(index);
    setSlideshowOpen(true);
  };

  const backToGallery = () => {
    setSlideshowOpen(false);
    setGalleryOpen(true);
  };

  const closeAll = () => {
    setGalleryOpen(false);
    setSlideshowOpen(false);
  };

  return (
    <div>
      <GalleryDisplay images={images} onImageClick={openSlideshow} onButtonClick={openGallery} />

      <GalleryDialog
        images={images}
        open={galleryOpen}
        onOpenChange={setGalleryOpen}
        onImageClick={openSlideshow}
        onClose={closeAll}
      />

      <SlideshowDialog
        images={images}
        onOpenChange={setSlideshowOpen}
        open={slideshowOpen}
        currentIndex={currentImageIndex}
        setCurrentIndex={setCurrentImageIndex}
        onBackToGallery={backToGallery}
        galleryOpen={galleryOpen}
        onClose={closeAll}
      />
    </div>
  );
};

export default Gallery;
