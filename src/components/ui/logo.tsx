import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
type LogoProps = { variant?: "light" | "dark"; className?: string };

const Logo = ({ variant = "light", className }: LogoProps) => {
  const isDark = variant === "dark";

  return (
    <Link
      href="/"
      className={cn(
        "inline-block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        isDark && "focus-visible:ring-neutral-200",
        className
      )}
    >
      <Image
        src={isDark ? "/images/logo-dark.svg" : "/images/logo.svg"}
        alt="Holidaze"
        width={120}
        height={25}
        priority
        unoptimized
        className={cn("h-auto w-full")}
      />
    </Link>
  );
};

export { Logo };
