import Banner from "@/components/common/banner";
import IconTitleCard from "@/components/common/cards/generic/icon-title-card";
import Container from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import Section from "@/components/ui/section";
import { getUserData } from "@/lib/cookies/server";
import { IconChartBarPopular, IconEdit, IconHome } from "@tabler/icons-react";
import React from "react";
import HostConfirmationDialog from "./components/host-confirmation-dialog";

const BecomeAHostPage = async () => {
  const user = await getUserData();
  const isAuthenticated = !!user;
  const isHost = isAuthenticated && user.venueManager;

  const bannerBody = {
    default:
      "To become a host, log in to your account or register now. Start listing your property and share it with travelers worldwide.",
    isHost:
      "You're already a host! Click the button below to create new listings or manage your existing ones.",
    isGuest:
      "Click the 'Become a Host' button below to start listing your property and join our community of hosts."
  };

  let currentBannerBody = bannerBody.default;
  if (isHost) currentBannerBody = bannerBody.isHost;
  if (!isHost && isAuthenticated) currentBannerBody = bannerBody.isGuest;

  return (
    <main>
      <Container>
        <Section
          variant={"lg"}
          className="mx-auto max-w-xl space-y-16 text-center text-muted-foreground"
        >
          <Heading tag="h1" variant={"heading1"}>
            Become a host
          </Heading>
          <p className="leading-7">
            Join our community of hosts and start earning by sharing your space with travelers from
            around the world.
          </p>
        </Section>
        <Section variant={"lg"}>
          <ul className="grid items-stretch gap-24 md:grid-cols-3">
            <li>
              <IconTitleCard className="h-full" title="Host listings" icon={IconHome}>
                <p>
                  {`Create and manage listings for your properties, whether it's a cozy apartment or
                  a luxurious villa.`}
                </p>
              </IconTitleCard>
            </li>
            <li>
              <IconTitleCard className="h-full" title="Update anytime" icon={IconEdit}>
                <p>
                  {`Easily update your listings' details, availability, and pricing to keep your offerings current and competitive.`}
                </p>
              </IconTitleCard>
            </li>
            <li>
              <IconTitleCard
                className="h-full"
                title="Track performance"
                icon={IconChartBarPopular}
              >
                <p>
                  {`Access detailed insights and analytics to see how your listings are performing and optimize your hosting strategy.`}
                </p>
              </IconTitleCard>
            </li>
          </ul>
        </Section>
        <Section variant={"lg"}>
          <Banner
            isSection
            sectionInnerSpacing={"lg"}
            title="Ready to start hosting?"
            body={currentBannerBody}
          >
            <div className="flex gap-16">
              {!isAuthenticated && (
                <>
                  <Link variant={"outline"} href="/login?next=/become-a-host">
                    Log in
                  </Link>
                  <Link href="/register?next=/become-a-host&type=host">Register</Link>
                </>
              )}
              {isAuthenticated && !isHost && <HostConfirmationDialog />}
              {isAuthenticated && isHost && (
                <Link href="/profile/hosted-listings">Manage and create listings</Link>
              )}
            </div>
          </Banner>
          <p className="py-8 text-center text-sm text-muted-foreground">
            As a host, you’ll still be free to book stays as a guest. You can also downgrade to a
            guest account at any time.
          </p>
        </Section>
      </Container>
    </main>
  );
};

export default BecomeAHostPage;
