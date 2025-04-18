import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { FormItem } from "@/components/ui/form";
import { AutosizeTextarea } from "../../../../../../components/common/autosize-textarea";
import { TMedia } from "@/lib/schema";
import { Label } from "@/components/ui/label";

type MediaWithID = TMedia & { id: string };
type SortableListProps = {
  media: MediaWithID[];
  onChange: (value: MediaWithID[]) => void;
  onDelete: (id: string) => void;
};
const SortableMediaList = ({ media, onChange, onDelete }: SortableListProps) => {
  const moveItem = (index: number, direction: "up" | "down") => {
    const newItems = [...media];
    if (direction === "up" && index > 0) {
      [newItems[index], newItems[index - 1]] = [newItems[index - 1], newItems[index]];
    } else if (direction === "down" && index < media.length - 1) {
      [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
    }
    onChange(newItems);
  };

  return (
    <ul className="space-y-24">
      <AnimatePresence>
        {media.map((image, index) => (
          <motion.li
            key={image.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            layout
            className="flex gap-16 bg-neutral-100"
          >
            <div className="flex flex-col space-y-4">
              <Button
                variant={"outline"}
                className="h-32 w-32"
                size={"icon"}
                onClick={() => moveItem(index, "up")}
                disabled={index === 0}
              >
                <span className="sr-only">Move up</span>
                <IconChevronUp className="h-20 w-20" />
              </Button>
              <Button
                variant={"outline"}
                className="h-32 w-32"
                size={"icon"}
                onClick={() => moveItem(index, "down")}
                disabled={index === media.length - 1}
              >
                <span className="sr-only">Move down</span>
                <IconChevronDown className="h-20 w-20" />
              </Button>
            </div>

            <div className="flex flex-1 gap-16 max-sm:flex-col">
              <div className="w-full sm:max-w-[10rem]">
                <AspectRatio ratio={3 / 2} className="overflow-hidden rounded-lg">
                  <ImageWithFallback src={image.url} alt="" fill className="object-cover" />
                </AspectRatio>
              </div>
              <FormItem className="w-full">
                <Label htmlFor={`${image.id}-alt`}>Description</Label>
                <AutosizeTextarea
                  value={image.alt}
                  id={`${image.id}-alt`}
                  onChange={(e) => {
                    const newMedia = [...media];
                    newMedia[index].alt = e.target.value;
                    onChange(newMedia);
                  }}
                />
                <Button
                  onClick={() => {
                    onDelete(image.id);
                  }}
                  size={"custom"}
                  variant={"link"}
                  className="text-sm font-normal text-muted-foreground"
                >
                  Remove
                </Button>
              </FormItem>
            </div>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
};

export default SortableMediaList;
