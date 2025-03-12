import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/shadcn-utils";
import { IconMapSearch } from "@tabler/icons-react";
import { format } from "date-fns";
import { useSearchParams } from "next/navigation";
import React from "react";

const Divider = () => <span className="h-16 w-px flex-shrink-0 bg-border" />;

type ButtonInnerProps = { className: string };

const ButtonInnerSmall = ({ className }: ButtonInnerProps) => (
  <span className={cn("flex w-full items-center gap-8", className)}>
    <IconMapSearch className="h-16 w-16 flex-shrink-0 stroke-[1.5]" />{" "}
    <span className="line-clamp-1 text-ellipsis font-medium">Search...</span>
  </span>
);

type ButtonInnerFullProps = ButtonInnerProps & {
  destination?: string | null;
  date?: string | null;
  guests?: string | null;
};

const ButtonInnerFull = ({
  destination,
  date = "Flexible dates",
  guests,
  className
}: ButtonInnerFullProps) => (
  <span className={cn("flex w-full items-center gap-16", className)}>
    <IconMapSearch className="h-16 w-16 flex-shrink-0 stroke-[1.5]" />
    <span className="line-clamp-1 block text-ellipsis">{destination}</span>
    <Divider />
    <span className="flex-shrink-0">{date}</span>
    <Divider />
    <span className="flex-shrink-0">{guests}</span>
  </span>
);

const SearchButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ ...props }, ref) => {
  const searchParams = useSearchParams();
  const destination = searchParams.get("destination");
  const from = searchParams.get("from") || null;
  const to = searchParams.get("to") || null;
  const guestsParam = Number(searchParams.get("guests"));

  const formattedDestination = destination || "Explore destinations";
  const formattedFromDate = from ? format(new Date(from), "dd-MM-yyyy") : null;
  const formattedToDate = to ? format(new Date(to), "dd-MM-yyyy") : null;
  let formattedDate = "Flexible dates";
  if (formattedFromDate && formattedToDate) {
    formattedDate = `${formattedFromDate} - ${formattedToDate}`;
  } else if (formattedToDate) {
    formattedDate = `Flexible - ${formattedToDate}`;
  } else if (formattedFromDate) {
    formattedDate = `${formattedFromDate} - flexible`;
  }

  const formattedGuests = guestsParam
    ? `${guestsParam} guest${guestsParam > 1 ? "s" : ""}`
    : "Guests";

  return (
    <Button
      ref={ref}
      {...props}
      variant="outline"
      size="custom"
      className="w-full rounded-lg border bg-background px-12 py-8 font-base text-sm @container hover:border-neutral-400 hover:bg-background active:bg-background"
    >
      <ButtonInnerFull
        className="hidden @md:flex"
        date={formattedDate}
        destination={formattedDestination}
        guests={formattedGuests}
      />
      <ButtonInnerSmall className="@md:hidden" />
    </Button>
  );
});

SearchButton.displayName = "SearchButton";

export default SearchButton;
