export type ImageDimensions = {
  height: number;
  width: number;
};

export const imageDimensionsBySrc: Record<string, ImageDimensions> = {
  "/assets/generated/datacenter-320.gif": { width: 320, height: 169 },
  "/assets/google-ads.gif": { width: 400, height: 266 },
  "/assets/jimmy-buitenhuis.png": { width: 320, height: 320 },
  "/assets/logo.png": { width: 512, height: 512 },
  "/assets/optimized/airfoto.jpg": { width: 1600, height: 899 },
  "/assets/optimized/content-airbnb.jpg": { width: 1200, height: 1047 },
  "/assets/optimized/content-color-run.jpg": { width: 1200, height: 1075 },
  "/assets/optimized/content-maasclaim.jpg": { width: 1200, height: 898 },
  "/assets/optimized/content-nxchange.jpg": { width: 1600, height: 1440 },
  "/assets/optimized/content-zb.jpg": { width: 1600, height: 1416 },
  "/assets/seo-google-search.gif": { width: 480, height: 360 },
  "/assets/wedding/airfoto.jpg": { width: 2200, height: 1237 },
  "/assets/dave-dekker/photos/event-01.jpg": { width: 1800, height: 1200 },
  "/assets/dave-dekker/photos/event-02.jpg": { width: 1800, height: 1200 },
  "/assets/dave-dekker/photos/event-03.jpg": { width: 1200, height: 1800 },
  "/assets/dave-dekker/photos/event-04.jpg": { width: 1800, height: 1200 },
  "/assets/dave-dekker/photos/event-05.jpg": { width: 1800, height: 1200 },
  "/assets/dave-dekker/photos/event-06.jpg": { width: 1800, height: 1200 },
  "/assets/dave-dekker/photos/event-07.jpg": { width: 1800, height: 1200 },
  "/assets/dave-dekker/photos/event-08.jpg": { width: 1800, height: 1622 },
  "/assets/dave-dekker/photos/event-09.jpg": { width: 1800, height: 1200 },
  "/assets/dave-dekker/photos/event-10.jpg": { width: 1800, height: 1211 },
  "/assets/dave-dekker/photos/event-11.jpg": { width: 1800, height: 1200 },
  "/assets/dave-dekker/photos/event-12.jpg": { width: 1800, height: 1638 },
  "/assets/dave-dekker/photos/event-13.jpg": { width: 1800, height: 1200 },
  "/assets/dave-dekker/photos/event-14.jpg": { width: 1200, height: 1800 },
  "/assets/dave-dekker/photos/event-15.jpg": { width: 1800, height: 1200 },
};

export function dimensionsFor(src: string | undefined): ImageDimensions | undefined {
  if (!src || !src.startsWith("/")) return undefined;
  return imageDimensionsBySrc[src.split("?")[0]];
}
