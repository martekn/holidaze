import { cn } from "@/lib/utils/shadcn-utils";

const Skeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn("animate-pulse rounded-lg bg-neutral-300", className)} {...props} />;
};

export { Skeleton };
