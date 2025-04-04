"use client";

import ConfirmationDialogContent from "@/components/common/confirmation-dialog-content";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/components/ui/sonner";
import { updateUser } from "@/lib/api/user";
import React from "react";

const AccountDowngradeDialog = () => {
  const onConfirmation = () => {
    try {
      updateUser({ venueManager: false });
      toast({
        title: "Account downgraded",
        variant: "success",
        children: "Account was successfully downgraded to guest"
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Account downgrade failed",
        variant: "error",
        children: "Account failed to downgrade to guest. Please try again."
      });
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="max-sm:w-full">Return to guest account</Button>
      </DialogTrigger>
      <ConfirmationDialogContent
        onConfirmation={onConfirmation}
        title="Confirm Downgrade to Guest Account"
      >
        <div className="space-y-12">
          <p>Are you sure you want to downgrade to a guest account?</p>
          <ul className="list-inside list-disc space-y-8">
            <li>
              All host-related information, including your listings and their details, will be
              permanently deleted.
            </li>
            <li>You will no longer be able to create or manage listings.</li>
          </ul>
          <p>
            If you upgrade to a host account again in the future, your previous history, listings,
            and information will not be restored.
          </p>
        </div>
      </ConfirmationDialogContent>
    </Dialog>
  );
};

export default AccountDowngradeDialog;
