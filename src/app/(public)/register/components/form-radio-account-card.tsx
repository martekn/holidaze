import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils/shadcn-utils";
import { TablerIcon } from "@tabler/icons-react";
import React from "react";

type FormRadioAccountCardProps = {
  value: string;
  title: string;
  description: string;
  icon: TablerIcon;
  isSelected: boolean;
  listItems?: string[];
};

const FormRadioAccountCard = React.forwardRef<
  React.ElementRef<typeof RadioGroupItem>,
  FormRadioAccountCardProps
>(({ value, isSelected, icon: Icon, title, description, listItems, ...props }, ref) => {
  return (
    <FormItem variant={"radio"}>
      <FormLabel
        size="sm"
        className={cn(
          "flex w-full items-start gap-16 rounded-lg border p-16 text-sm text-muted-foreground",
          isSelected ? "border-secondary-300 bg-secondary-100/50" : "bg-background"
        )}
      >
        <div
          className={cn(
            "flex-shrink-0 rounded-md p-4 sm:p-8",
            isSelected
              ? "bg-secondary-200 text-neutral-700"
              : "bg-neutral-200 text-muted-foreground"
          )}
        >
          <Icon className="h-20 w-20" />
        </div>
        <div className="flex-grow space-y-4">
          <Heading tag="h3" variant={"heading6"}>
            {title}
          </Heading>
          <p>{description}</p>
          {listItems && listItems.length > 0 && (
            <ul className="list-inside list-disc space-y-2">
              {listItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>
        <FormControl>
          <RadioGroupItem ref={ref} value={value} {...props} />
        </FormControl>
      </FormLabel>
    </FormItem>
  );
});

FormRadioAccountCard.displayName = "FormRadioAccountCard";

export default FormRadioAccountCard;
