"use client";

import { useEffect, useRef, useState } from "react";

import { useLanguage } from "./language";

const focusVideos = [
  {
    title: "The Gym Republic",
    src: "https://videos.files.wordpress.com/JEXpAg8v/the-gym-republic-v1.mp4",
  },
  {
    title: "Zelfstandigen Bouw - hondenhok",
    src: "https://videos.files.wordpress.com/SiM1cMuS/zelfstandigen-bouw_commercial_rbv_hondenhok_final-1x1_social.mp4",
  },
  {
    title: "Zelfstandigen Bouw - schilder",
    src: "https://videos.files.wordpress.com/kQCILAhM/zelfstandigen-bouw_commercial_rbv_schilder_final_1x1_social.mp4",
  },
  {
    title: "Zelfstandigen Bouw - auto",
    src: "https://videos.files.wordpress.com/2MO1QuZC/zelfstandigen-bouw_commercial_rbv_auto_final_1x1_social.mp4",
  },
  {
    title: "Massaclaim",
    src: "https://videos.files.wordpress.com/AJxtK3QH/massaclaim-airbnb-servicekostenterug.mp4",
  },
  {
    title: "Daelenbroek Makelaardij",
    src: "https://videos.files.wordpress.com/0Bey1EBn/daelenbroek-3-ja-makelaardij.mp4",
  },
];

function videoPreviewSrc(src: string) {
  return `${src}#t=0.001`;
}

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
        preload="auto"
        ref={videoRef}
      >
        <source src={videoPreviewSrc(activeVideo.src)} type="video/mp4" />
      </video>
      <div className="focus-video-meta" aria-live="polite">
        <span>{String(activeIndex + 1).padStart(2, "0")} / {focusVideos.length}</span>
        <strong>{activeVideo.title}</strong>
      </div>
    </div>
  );
}
