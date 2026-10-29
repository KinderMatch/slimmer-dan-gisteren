const videoThumbnailBySrc: Record<string, string> = {
  "/assets/content/ai-actors-slimmer-dan-gisteren.m4v": "/assets/video-thumbnails/ai-actors-slimmer-dan-gisteren.m4v-640-d1a985c81011.webp",
  "/assets/content/speech-ceo-en.mp4": "/assets/video-thumbnails/speech-ceo-en.mp4-640-0b66169bbe73.webp",
  "/assets/content/speech-ceo-es.mp4": "/assets/video-thumbnails/speech-ceo-es.mp4-640-7335fc5397c6.webp",
  "/assets/content/speech-ceo-nl.mp4": "/assets/video-thumbnails/speech-ceo-nl.mp4-640-06bff6be38f4.webp",
  "/assets/dave-dekker/dave-1-preview.mov": "/assets/video-thumbnails/dave-1-preview.mov.jpg",
  "/assets/dave-dekker/dave-3-preview.mov": "/assets/video-thumbnails/dave-3-preview.mov.jpg",
  "/assets/dave-dekker/dave-4-preview.mov": "/assets/video-thumbnails/dave-4-preview.mov.jpg",
  "/assets/dave-dekker/dave-5-preview.mov": "/assets/video-thumbnails/dave-5-preview.mov.jpg",
  "/assets/travel/dive-cairns-preview.mov": "/assets/video-thumbnails/dive-cairns-preview.mov.jpg",
  "/assets/travel/huacacina-paracas-preview.mov": "/assets/video-thumbnails/huacacina-paracas-preview.mov.jpg",
  "/assets/travel/kgari-noosa-preview.mov": "/assets/video-thumbnails/kgari-noosa-preview.mov.jpg",
  "/assets/travel/siargao-preview.mov": "/assets/video-thumbnails/siargao-preview.mov.jpg",
  "/assets/travel/whitsundays-preview.mov": "/assets/video-thumbnails/whitsundays-preview.mov.jpg",
  "/assets/websites/orchard-finance-preview.mp4": "/assets/video-thumbnails/orchard-finance-preview.mp4.jpg",
  "/assets/wedding/full/nordin-kyra-full.mp4": "/assets/video-thumbnails/nordin-kyra-preview.mov.jpg",
  "/assets/wedding/nordin-kyra-preview.mov": "/assets/video-thumbnails/nordin-kyra-preview.mov.jpg",
  "/assets/campaigns/daelenbroek.mp4": "/assets/video-thumbnails/daelenbroek.mp4.jpg",
  "/assets/campaigns/zb-auto.mp4": "/assets/video-thumbnails/zb-auto.mp4.jpg",
  "/assets/campaigns/massaclaim-airbnb.mp4": "/assets/video-thumbnails/massaclaim-airbnb.mp4.jpg",
  "/assets/campaigns/gym-republic.mp4": "/assets/video-thumbnails/gym-republic.mp4.jpg",
  "/assets/campaigns/zb-hondenhok.mp4": "/assets/video-thumbnails/zb-hondenhok.mp4.jpg",
  "/assets/campaigns/zb-schilder.mp4": "/assets/video-thumbnails/zb-schilder.mp4.jpg",
};

export function cleanVideoSrc(src: string | undefined) {
  return src?.split("#")[0];
}

export function videoThumbnailFor(src: string | undefined) {
  const cleanSrc = cleanVideoSrc(src);
  return cleanSrc ? videoThumbnailBySrc[cleanSrc] : undefined;
}
