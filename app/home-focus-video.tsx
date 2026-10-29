"use client";

import { useEffect, useRef, useState } from "react";

import { useLanguage } from "./language";
import { videoThumbnailFor } from "./video-thumbnails";

const focusVideos = [
  {
    title: "The Gym Republic",
    src: "/assets/campaigns/gym-republic.mp4",
  },
  {
    title: "Zelfstandigen Bouw - hondenhok",
    src: "/assets/campaigns/zb-hondenhok.mp4",
  },
  {
    title: "Zelfstandigen Bouw - schilder",
    src: "/assets/campaigns/zb-schilder.mp4",
  },
  {
    title: "Zelfstandigen Bouw - auto",
    src: "/assets/campaigns/zb-auto.mp4",
  },
  {
    title: "Massaclaim",
    src: "/assets/campaigns/massaclaim-airbnb.mp4",
  },
  {
    title: "Daelenbroek Makelaardij",
    src: "/assets/campaigns/daelenbroek.mp4",
  },
];

export function HomeFocusVideo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { language } = useLanguage();
  const activeVideo = focusVideos[activeIndex] ?? focusVideos[0];
  const showNextVideo = () => setActiveIndex((index) => (index + 1) % focusVideos.length);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.load();
    video.play().catch(() => {
      video.controls = true;
    });
  }, [activeVideo.src]);

  return (
    <div className="home-focus-video">
      <video
        aria-label={
          language === "en"
            ? `Active focus video: ${activeVideo.title}`
            : language === "es"
              ? `Video destacado activo: ${activeVideo.title}`
              : `Actieve focus video: ${activeVideo.title}`
        }
        autoPlay
        muted
        onEnded={showNextVideo}
        onError={showNextVideo}
        playsInline
        poster={videoThumbnailFor(activeVideo.src)}
        preload="metadata"
        ref={videoRef}
      >
        <source src={activeVideo.src} type="video/mp4" />
      </video>
      <div className="focus-video-meta" aria-live="polite">
        <span>{String(activeIndex + 1).padStart(2, "0")} / {focusVideos.length}</span>
        <strong>{activeVideo.title}</strong>
      </div>
    </div>
  );
}
