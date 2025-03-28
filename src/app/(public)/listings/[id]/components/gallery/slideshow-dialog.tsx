"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription } from "@/components/ui/dialog";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { TBaseListing } from "@/lib/schema";
import { DialogTitle } from "@radix-ui/react-dialog";
import { IconChevronLeft, IconX } from "@tabler/icons-react";
import React, { useCallback, useEffect, useState } from "react";
import {
  CarouselApi,
  Carousel as CarouselContainer,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import Container from "@/components/ui/container";

interface SlideshowDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  images: TBaseListing["media"];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  onBackToGallery: () => void;
  onClose: () => void;
  galleryOpen: boolean;
}

const SlideshowDialog = ({
  open,
  onOpenChange,
  images,
  currentIndex,
  setCurrentIndex,
  onBackToGallery,
  galleryOpen,
  onClose
}: SlideshowDialogProps) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(currentIndex + 1);

  const goToPrevious = useCallback(() => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  }, [images.length, currentIndex, setCurrentIndex]);

  const goToNext = useCallback(() => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  }, [images.length, currentIndex, setCurrentIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (open) {
        if (e.key === "ArrowLeft") {
          goToPrevious();
        } else if (e.key === "ArrowRight") {
          goToNext();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, currentIndex, goToNext, goToPrevious]);

  useEffect(() => {
    if (!carouselApi) return;

    const handleSelect = () => {
      setCurrentSlide(carouselApi.selectedScrollSnap() + 1);
    };

    setCurrentSlide(currentIndex + 1);

    carouselApi.on("select", handleSelect);
    return () => {
      carouselApi.off("select", handleSelect);
    };
  }, [carouselApi, currentIndex]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTitle className="sr-only">Slideshow</DialogTitle>
      <DialogDescription className="sr-only">Slide through listing images</DialogDescription>
      <DialogContent
        hideCloseButton
        className="sm:rounded-none flex h-screen max-h-[100vh] max-w-[100vw] flex-col gap-0 border-none bg-neutral-700 p-0 text-neutral-100"
        onEscapeKeyDown={() => {
          if (galleryOpen) {
            onBackToGallery();
          } else {
            onOpenChange(false);
          }
        }}
      >
        <Container variant={"3xl"} className="flex w-full justify-between pt-12">
          <Button
            onClick={onBackToGallery}
            variant="ghostInverted"
            className="flex items-center gap-8 p-8"
            aria-label="Back to gallery"
          >
            <IconChevronLeft className="h-16 w-16" />
            Back to gallery
          </Button>

          <Button
            onClick={onClose}
            variant="ghostInverted"
            className="p-8"
            aria-label="Close slideshow"
          >
            <IconX className="h-24 w-24" />
          </Button>
        </Container>

        <Container variant={"3xl"} className="relative h-full w-full py-24">
          <div className="absolute bottom-8 left-1/2 z-50 my-24 -translate-x-1/2 transform rounded-md bg-neutral-700/75 px-8 py-4">
            {currentSlide} / {images.length} <span className="sr-only"> images</span>
          </div>

          <CarouselContainer
            setApi={setCarouselApi}
            className="h-full"
            opts={{ loop: true, align: "center", startIndex: currentIndex }}
          >
            <CarouselContent className="flex h-full items-center align-middle">
              {images.map((image, index) => (
                <CarouselItem key={index} className="relative h-full">
                  <ImageWithFallback
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="h-full w-full object-contain"
                    priority
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious variant={"ghostInverted"} className="bg-neutral-700/75" />
            <CarouselNext variant={"ghostInverted"} className="bg-neutral-700/75" />
          </CarouselContainer>
        </Container>
      </DialogContent>
    </Dialog>
  );
};

export default SlideshowDialog;
