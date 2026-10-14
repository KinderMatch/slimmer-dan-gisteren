import type { ImgHTMLAttributes } from "react";
import images from "./responsive-images.json";

type ImageEntry = { width: number; height: number; variants: { src: string; width: number }[] };
const manifest: Record<string, ImageEntry> = images;

/** Static variants also work on GitHub Pages, without an image server. */
export function ResponsiveImage({ src, sizes, width, height, decoding = "async", ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const image = typeof src === "string" ? manifest[src] : undefined;
  return (
    <img
      {...props}
      src={src}
      srcSet={image?.variants.map(variant => `${variant.src} ${variant.width}w`).join(", ")}
      sizes={sizes ?? (src === "/assets/logo.png" ? "44px" : "100vw")}
      width={width ?? image?.width}
      height={height ?? image?.height}
      decoding={decoding}
    />
  );
}
