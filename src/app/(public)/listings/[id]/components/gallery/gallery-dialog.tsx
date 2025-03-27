import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { TBaseListing } from "@/lib/schema";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { IconX } from "@tabler/icons-react";
import React from "react";

interface GalleryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  images: TBaseListing["media"];
  onImageClick: (index: number) => void;
  onClose: () => void;
}

const GalleryDialog = ({
  open,
  onOpenChange,
  images,
  onImageClick,
  onClose
}: GalleryDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        hideCloseButton
        className="sm:rounded-none h-screen max-h-[100vh] w-screen max-w-[100vw] overflow-y-auto px-0 py-24"
        onEscapeKeyDown={() => onOpenChange(false)}
      >
        <Container className="space-y-24">
          <DialogHeader className="flex-row items-center justify-between space-y-0">
            <DialogTitle>Image gallery</DialogTitle>
            <DialogDescription className="sr-only">Browse all property images</DialogDescription>
            <DialogClose asChild>
              <Button
                onClick={onClose}
                variant="outline"
                className="items-center gap-8 p-8"
                aria-label="Close slideshow"
              >
                <span>Close</span> <IconX className="h-24 w-24" />
              </Button>
            </DialogClose>
          </DialogHeader>

          <div className="grid grid-cols-1 gap-16 sm:grid-cols-2">
            {images.map((image, index) => (
              <AspectRatio ratio={5 / 3} key={index}>
                <Button
                  key={index}
                  variant="ghost"
                  className="relative aspect-[4/3] h-full w-full overflow-hidden rounded-md p-0"
                  onClick={() => onImageClick(index)}
                >
                  <ImageWithFallback
                    src={image?.url}
                    alt={image?.alt}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                  <span className="sr-only">View {image?.alt}</span>
                </Button>
              </AspectRatio>
            ))}
          </div>
        </Container>
      </DialogContent>
    </Dialog>
  );
};

export default GalleryDialog;
