import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
type LogoProps = { variant?: "light" | "dark"; logoClassName?: string };

const Logo = ({ variant = "light", logoClassName }: LogoProps) => {
  const isDark = variant === "dark";

  return (
    <Link href="/">
      <Image
        src={isDark ? "/images/logo-dark.svg" : "/images/logo.svg"}
        alt="Holidaze"
        width={120}
        height={25}
        priority
        unoptimized
        className={cn("h-auto", logoClassName)}
      />
    </Link>
  );
};

export { Logo };
