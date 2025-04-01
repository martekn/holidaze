"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useState } from "react";

interface ImageWithFallbackProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string;
}

export function ImageWithFallback({
  alt,
  src,
  fallbackSrc = "/images/placeholder.jpg",
  className,
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      {...props}
      src={imgSrc || "/images/placeholder.jpg"}
      alt={alt || "Image"}
      className={className}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
}
