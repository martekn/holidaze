import { cn } from "@/lib/utils/shadcn-utils";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const ratings = [
  { text: "Not rated", range: [0, 0.9] },
  { text: "Poor", range: [1, 1 - 9] },
  { text: "Fair", range: [2, 2.9] },
  { text: "Good", range: [3, 3.9] },
  { text: "Very good", range: [4, 4.6] },
  { text: "Excellent", range: [4.7, 5] }
];

const ratingStyles = cva("text-sm font-base font-medium text-foreground", {
  variants: {
    variant: {
      default: "gap-4 flex items-center",
      ratingOnly: ""
    },
    textPosition: {
      default: "",
      reverse: "flex-row-reverse"
    }
  },
  defaultVariants: {
    variant: "default",
    textPosition: "default"
  }
});

type RatingStyleProps = VariantProps<typeof ratingStyles>;
type RatingProps = RatingStyleProps & {
  rating: number;
  textClassName?: string;
  ratingClassName?: string;
  className?: string;
};

const Rating = ({
  variant,
  textPosition,
  rating,
  textClassName,
  ratingClassName,
  className
}: RatingProps) => {
  const currentRating = ratings.find((item) => {
    const min = item.range[0];
    const max = item.range[1];

    if (min <= rating && max >= rating) {
      return true;
    }

    return false;
  });

  return (
    <div className={cn(ratingStyles({ variant, textPosition }), className)}>
      <div className={cn("rounded-md bg-accent-400 px-8", ratingClassName)}>{rating}</div>
      {variant !== "ratingOnly" && (
        <div className={cn(textClassName)}>{currentRating?.text ?? ""}</div>
      )}
    </div>
  );
};

export default Rating;
