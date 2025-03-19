import * as React from "react";

import { cn } from "@/lib/utils/shadcn-utils";
import {
  CardImageStyleProps,
  cardImageStyles,
  CardStyleProps,
  cardStyles
} from "@/lib/styles/card-styles";
import { HeadingStyleProps, headingStyles } from "@/lib/styles/heading-styles";
import { AspectRatio } from "./aspect-ratio";
import { ImageProps } from "next/image";
import { Slot } from "@radix-ui/react-slot";
import { ImageWithFallback } from "./image-with-fallback";

interface CardProps extends React.HTMLAttributes<HTMLDivElement>, CardStyleProps {
  asChild?: boolean;
}
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant, padding, asChild = false, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp ref={ref} className={cn(cardStyles({ variant, padding }), className)} {...props} />
    );
  }
);
Card.displayName = "Card";

export interface CardTitleProps extends React.HTMLAttributes<HTMLDivElement>, HeadingStyleProps {
  asChild?: boolean;
  ellipse?: boolean;
  fullCardLink?: boolean;
  hoverEffect?: boolean;
}

const CardTitle = React.forwardRef<HTMLDivElement, CardTitleProps>(
  (
    {
      className,
      fullCardLink = false,
      ellipse = false,
      asChild = false,
      hoverEffect = false,
      variant = "heading5",
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "div";

    return (
      <Comp
        ref={ref}
        className={cn(
          headingStyles({ variant }),
          "block",
          ellipse && "line-clamp-1 text-ellipsis",
          fullCardLink && "after:absolute after:inset-0 after:block",
          hoverEffect && "hover:underline hover:underline-offset-2",
          className
        )}
        {...props}
      />
    );
  }
);

CardTitle.displayName = "CardTitle";

interface CardImageProps extends Omit<ImageProps, "ref">, CardImageStyleProps {
  ratio?: number;
  className?: string;
  scaleOnHover?: boolean;
  alt: string;
  fallbackSrc?: string;
}

const CardImage = React.forwardRef<HTMLDivElement, CardImageProps>(
  (
    {
      ratio,
      className,
      scaleOnHover = false,
      alt,
      rounded = "all",
      fallbackSrc = "/images/placeholder.jpg?height=400&width=600",
      ...props
    },
    ref
  ) => {
    const image = (
      <ImageWithFallback
        alt={alt || "Image"}
        fill
        unoptimized
        fallbackSrc={fallbackSrc}
        {...props}
        className={cn(
          "object-cover object-center",
          scaleOnHover ? "transition-transform duration-300 group-hover:scale-110" : ""
        )}
      />
    );

    if (ratio) {
      return (
        <div ref={ref} className={className}>
          <AspectRatio ratio={ratio} className={cn(cardImageStyles({ rounded }))}>
            {image}
          </AspectRatio>
        </div>
      );
    }

    return (
      <div ref={ref} className={cn("overflow-hidden", className)}>
        {image}
      </div>
    );
  }
);

CardImage.displayName = "CardImage";

export { Card, CardTitle, CardImage };
