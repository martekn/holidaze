import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { cn } from "@/lib/utils/shadcn-utils";

type GalleryDisplayImageProps = {
  isButton?: boolean;
  alt?: string;
  src?: string;
  onImageClick?: (index: number) => void;
  imageIndex?: number;
  className?: string;
};

export const GalleryDisplayImage = ({
  isButton = false,
  alt,
  src,
  onImageClick,
  imageIndex,
  className
}: GalleryDisplayImageProps) => {
  const image = (
    <ImageWithFallback
      src={src ?? "/images/placeholder.jpg"}
      alt={alt ?? ""}
      fill
      className={cn(
        "h-full w-full object-cover",
        isButton && "transition-transform duration-300 hover:scale-110"
      )}
    />
  );

  if (isButton) {
    return (
      <Button
        variant="ghost"
        className={cn("relative h-full overflow-hidden rounded-lg p-0", className)}
        onClick={() => onImageClick?.(imageIndex ?? 0)}
      >
        {image}
        <span className="sr-only">View image</span>
      </Button>
    );
  }

  return <div className={cn("relative h-full overflow-hidden rounded-lg", className)}>{image}</div>;
};
