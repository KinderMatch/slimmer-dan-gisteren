const videoThumbnailBySrc: Record<string, string> = {
  "/assets/content/ai-actors-slimmer-dan-gisteren.m4v": "/assets/video-thumbnails/ai-actors-slimmer-dan-gisteren.m4v.jpg",
  "/assets/content/speech-ceo-en.mp4": "/assets/video-thumbnails/speech-ceo-en.mp4.jpg",
  "/assets/content/speech-ceo-es.mp4": "/assets/video-thumbnails/speech-ceo-es.mp4.jpg",
  "/assets/content/speech-ceo-nl.mp4": "/assets/video-thumbnails/speech-ceo-nl.mp4.jpg",
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
  "/assets/wedding/nordin-kyra-preview.mov": "/assets/video-thumbnails/nordin-kyra-preview.mov.jpg",
  "https://videos.files.wordpress.com/0Bey1EBn/daelenbroek-3-ja-makelaardij.mp4": "/assets/optimized/content-airbnb.jpg",
  "https://videos.files.wordpress.com/2MO1QuZC/zelfstandigen-bouw_commercial_rbv_auto_final_1x1_social.mp4": "/assets/video-thumbnails/zb-auto.mp4.jpg",
  "https://videos.files.wordpress.com/AJxtK3QH/massaclaim-airbnb-servicekostenterug.mp4": "/assets/video-thumbnails/massaclaim-airbnb.mp4.jpg",
  "https://videos.files.wordpress.com/JEXpAg8v/the-gym-republic-v1.mp4": "/assets/video-thumbnails/gym-republic.mp4.jpg",
  "https://videos.files.wordpress.com/SiM1cMuS/zelfstandigen-bouw_commercial_rbv_hondenhok_final-1x1_social.mp4": "/assets/video-thumbnails/zb-hondenhok.mp4.jpg",
  "https://videos.files.wordpress.com/kQCILAhM/zelfstandigen-bouw_commercial_rbv_schilder_final_1x1_social.mp4": "/assets/video-thumbnails/zb-schilder.mp4.jpg",
};

export function cleanVideoSrc(src: string | undefined) {
  return src?.split("#")[0];
}

export function videoThumbnailFor(src: string | undefined) {
  const cleanSrc = cleanVideoSrc(src);
  return cleanSrc ? videoThumbnailBySrc[cleanSrc] : undefined;
}
