"use client";

import ConfirmationDialogContent from "@/components/common/confirmation-dialog-content";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/components/ui/sonner";
import { updateUser } from "@/lib/api/user";
import { useRouter } from "next/navigation";
import React from "react";

const HostConfirmationDialog = () => {
  const router = useRouter();

  const onConfirmation = () => {
    try {
      updateUser({ venueManager: true });
      toast({
        title: "Account upgraded",
        variant: "success",
        children: "Account was successfully upgraded to host."
      });
      router.push("/profile/hosted-listings");
    } catch (error) {
      console.log(error);
      toast({
        title: "Account upgrade failed",
        variant: "error",
        children: "Account failed to upgrade to host. Please try again."
      });
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Become a host</Button>
      </DialogTrigger>
      <ConfirmationDialogContent
        onConfirmation={onConfirmation}
        title="Confirm host account upgrade"
      >
        <div>
          <p>
            Upgrade to a host account to list properties and start earning. You can still book stays
            as a guest and downgrade to a guest account anytime.
          </p>
        </div>
      </ConfirmationDialogContent>
    </Dialog>
  );
};

export default HostConfirmationDialog;
