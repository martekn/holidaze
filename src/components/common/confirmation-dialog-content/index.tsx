import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import React from "react";

type ConfirmationDialogContentProps = {
  title: string;
  onConfirmation: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children?: React.ReactNode;
};

const ConfirmationDialogContent = ({
  title,
  onConfirmation,
  children,
  ...props
}: ConfirmationDialogContentProps) => {
  return (
    <DialogContent {...props}>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription asChild={typeof children !== "string"}>{children}</DialogDescription>
      </DialogHeader>
      <div className="mt-4 flex justify-end gap-8">
        <DialogClose asChild>
          <Button variant={"outline"}>Cancel</Button>
        </DialogClose>
        <DialogClose asChild>
          <Button onClick={onConfirmation}>Confirm</Button>
        </DialogClose>
      </div>
    </DialogContent>
  );
};

export default ConfirmationDialogContent;
