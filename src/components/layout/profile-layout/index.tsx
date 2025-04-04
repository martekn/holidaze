"use client";
import Container from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { PROFILE_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils/shadcn-utils";
import { usePathname } from "next/navigation";

const ProfileLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const currentPage = usePathname();

  return (
    <Container className="grid flex-1 gap-64 lg:grid-cols-7 xl:grid-cols-4">
      <nav
        data-profile-layout
        className="profile-layout-container w-full border-neutral-200 pt-0 shadow-lg shadow-neutral-700/50 max-lg:fixed max-lg:inset-x-0 max-lg:bottom-0 max-lg:z-50 max-lg:border-t max-lg:border-neutral-300 max-lg:bg-neutral-100 lg:col-span-2 lg:h-full lg:space-y-4 lg:border-r lg:pr-24 lg:pt-64 lg:shadow-none xl:col-span-1"
      >
        <Heading variant={"heading6"} tag="h2" className="max-lg:sr-only">
          Account
        </Heading>
        <ul className="flex max-[17rem]:flex-wrap lg:flex-col">
          {PROFILE_LINKS.map(({ text, href, icon: Icon }, index) => {
            const isActive = currentPage === href;
            return (
              <li key={index} className="my-8 w-full px-16 lg:my-0 lg:px-0">
                <Link
                  href={href}
                  variant={"link"}
                  size={"custom"}
                  className={cn(
                    "relative w-full gap-12 px-8 py-12 font-base font-normal hover:bg-neutral-200 hover:no-underline lg:justify-start [&_svg]:h-24 [&_svg]:w-24 [&_svg]:stroke-[1.2]",
                    isActive &&
                      "bg-secondary-100 hover:bg-secondary-100 max-lg:bg-secondary-200 max-lg:hover:bg-secondary-200 max-lg:[&_svg]:stroke-[2]"
                  )}
                >
                  <Icon />
                  <span className="max-lg:sr-only">{text}</span>

                  {isActive && (
                    <span className="ml-auto h-[3px] w-[3px] rounded-full bg-neutral-700 max-lg:hidden" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <main className="pb-64 pt-32 md:pb-128 md:pt-64 lg:col-span-5 xl:col-span-3">{children}</main>
    </Container>
  );
};

export default ProfileLayout;
