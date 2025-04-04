import { Heading } from "@/components/ui/heading";
import Section from "@/components/ui/section";
import React from "react";
import AvatarForm from "./components/avatar-form";
import { Avatar } from "@/components/ui/avatar";
import { getUserData } from "@/lib/cookies/server";
import { Link } from "@/components/ui/link";
import AccountDowngradeDialog from "./components/account-downgrade-dialog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings | Holidaze",
  description:
    "Manage your Holidaze account settings. Update your profile, change your avatar, and view your account type."
};

const SettingsPage = async () => {
  const user = await getUserData();
  const isVenueManager = user?.venueManager;

  return (
    <div>
      <Heading tag="h1" variant={"heading2"}>
        Settings
      </Heading>
      <Section
        variant={"disabled"}
        innerSpacing={"xs"}
        className="flex gap-16 border-b md:items-center"
      >
        <Avatar
          alt={user?.avatar.alt}
          src={user?.avatar.url}
          className="h-48 w-48 md:h-96 md:w-96"
        />
        <div className="space-y-2">
          <Heading tag="h2" variant={"heading5"}>
            {user?.name}
          </Heading>
          <p className="break-all text-sm md:text-base">{user?.email}</p>
        </div>
      </Section>
      <Section variant={"disabled"} innerSpacing={"xs"} className="space-y-16 border-b">
        <Heading tag="h2" variant={"heading5"}>
          Update avatar
        </Heading>
        <AvatarForm user={user} />
      </Section>
      <Section
        variant={"disabled"}
        innerSpacing={"xs"}
        className="space-y-24 border-b leading-7 text-muted-foreground"
      >
        <Heading tag="h2" variant={"heading5"}>
          {isVenueManager ? "Host status" : "Want to become a host?"}
        </Heading>
        {isVenueManager ? (
          <>
            <div className="space-y-8">
              <p>
                You are currently a host on Holidaze. This means you can list properties, manage
                bookings, and earn money by sharing your space with travelers.{" "}
              </p>
              <p>If you no longer wish to be a host, you can return to guest account</p>
            </div>
            <AccountDowngradeDialog />
          </>
        ) : (
          <>
            <p>
              You are currently using Holidaze as a guest. Upgrade to a host account to list
              properties, manage bookings, and start earning money by sharing your space with
              travelers.
            </p>
            <Link href="/become-a-host" className="max-sm:w-full">
              Get started
            </Link>
          </>
        )}
      </Section>
    </div>
  );
};

export default SettingsPage;
