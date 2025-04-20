import React from "react";
import Link from "next/link";
import { Card, CardImage, CardTitle } from "@/components/ui/card";
import { IconArrowRight } from "@tabler/icons-react";

type AmenityCardProps = {
  title: string;
  image: { src: string; alt: string };
  id: string;
  description: string;
  amenity: string;
};

const AmenityCard = ({ title, image, description, amenity, ...props }: AmenityCardProps) => {
  return (
    <Card className="group relative cursor-pointer space-y-16 bg-transparent" {...props}>
      <CardImage ratio={5 / 3} src={image.src} alt={image.alt} scaleOnHover />
      <div className="space-y-16">
        <div className="flex items-center justify-between border-b border-secondary-300 pb-4">
          <CardTitle asChild ellipse fullCardLink>
            <Link href={`/explore?amenity=${amenity}`}>{title}</Link>
          </CardTitle>
          <IconArrowRight className="h-16 w-16 text-secondary-200 transition-colors group-hover:text-foreground" />
        </div>
        <p>{description}</p>
      </div>
    </Card>
  );
};

export default AmenityCard;
