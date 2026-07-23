"use client";

import { useEffect, useRef, useState } from "react";

import { type LocalizedString, resolveText, Text, useLanguage } from "./language";
import { MediaLightbox } from "./media-lightbox";

type ArtistVideo = {
  fullSrc?: string;
  label: LocalizedString | string;
  src: string;
  title: LocalizedString | string;
};

type ArtistPhoto = {
  alt: LocalizedString | string;
  src: string;
};

export function ArtistEventShowcase({ photos, videos }: { photos: ArtistPhoto[]; videos: ArtistVideo[] }) {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const lastPhotoInteractionRef = useRef(0);
  const lastVideoInteractionRef = useRef(0);
  const { language } = useLanguage();
  const activeVideo = videos[activeVideoIndex] ?? videos[0];
  const activePhoto = photos[activePhotoIndex] ?? photos[0];

  useEffect(() => {
    if (videos.length < 2) return;

    const interval = window.setInterval(() => {
      if (Date.now() - lastVideoInteractionRef.current < 12000) return;
      setActiveVideoIndex((index) => (index + 1) % videos.length);
    }, 8000);

    return () => window.clearInterval(interval);
  }, [videos.length]);

  useEffect(() => {
    if (photos.length < 2) return;

    const interval = window.setInterval(() => {
      if (Date.now() - lastPhotoInteractionRef.current < 10000) return;
      setActivePhotoIndex((index) => (index + 1) % photos.length);
    }, 4200);

    return () => window.clearInterval(interval);
  }, [photos.length]);

  if (!activeVideo || !activePhoto) return null;

  return (
    <div className="artist-event-showcase">
      <div className="artist-event-video-layout">
        <MediaLightbox
          className="artist-feature-video"
          fullSrc={activeVideo.fullSrc}
          label={activeVideo.label}
          src={activeVideo.src}
          title={activeVideo.title}
          type="video"
        >
          <video autoPlay loop muted playsInline preload="metadata" key={activeVideo.src}>
            <source src={activeVideo.src} />
          </video>
          <div>
            <span><Text value={activeVideo.label} /></span>
            <strong><Text value={activeVideo.title} /></strong>
            <small><Text value={{ nl: "Vergroot met geluid", en: "Enlarge with sound", es: "Ampliar con sonido" }} /></small>
          </div>
        </MediaLightbox>

        <div className="artist-video-tabs" aria-label="Dave Dekker videocases">
          {videos.map((video, index) => (
            <button
              aria-pressed={activeVideoIndex === index}
              key={video.src}
              onClick={() => {
                lastVideoInteractionRef.current = Date.now();
                setActiveVideoIndex(index);
              }}
              type="button"
            >
              <video muted playsInline preload="metadata">
                <source src={video.src} />
              </video>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong><Text value={video.title} /></strong>
              <small><Text value={video.label} /></small>
            </button>
          ))}
        </div>
      </div>

      <div className="artist-photo-copy">
        <p className="eyebrow"><Text value={{ nl: "Event fotografie", en: "Event photography", es: "Fotografía de eventos" }} /></p>
        <h3><Text value={{ nl: "Beeld dat laat zien hoe het moment voelde.", en: "Images that show how the moment felt.", es: "Imágenes que muestran cómo se sintió el momento." }} /></h3>
        <p>
          <Text value={{
            nl: "Naast video werkt fotografie goed voor aankondigingen, recap posts, persbeelden en social carrousels. Deze serie laat de sfeer, zaal, sprekers en publieksmomenten van De Rode Loper zien.",
            en: "Besides video, photography works well for announcements, recap posts, press images and social carousels. This series shows the atmosphere, room, speakers and audience moments of De Rode Loper.",
            es: "Además del video, la fotografía funciona muy bien para anuncios, recaps, prensa y carruseles sociales. Esta serie muestra el ambiente, la sala, los ponentes y el público de De Rode Loper.",
          }} />
        </p>
      </div>

      <div className="artist-photo-slideshow">
        <MediaLightbox
          alt={activePhoto.alt}
          className="artist-slideshow-photo"
          label={{ nl: "Event fotografie", en: "Event photography", es: "Fotografía de eventos" }}
          src={activePhoto.src}
          title={activePhoto.alt}
          type="image"
        >
          <img src={activePhoto.src} alt={resolveText(activePhoto.alt, language)} loading="lazy" key={activePhoto.src} />
          <figcaption>
            <span>{String(activePhotoIndex + 1).padStart(2, "0")} / <Text value={{ nl: "Event fotografie", en: "Event photography", es: "Fotografía de eventos" }} /></span>
            <strong><Text value={activePhoto.alt} /></strong>
          </figcaption>
        </MediaLightbox>

        <div className="artist-photo-strip" aria-label="Eventfoto slideshow">
          {photos.map((photo, index) => (
            <button
              aria-label={
                language === "en"
                  ? `Show ${resolveText(photo.alt, language)}`
                  : language === "es"
                    ? `Mostrar ${resolveText(photo.alt, language)}`
                    : `${resolveText(photo.alt, language)} tonen`
              }
              aria-pressed={activePhotoIndex === index}
              key={photo.src}
              onClick={() => {
                lastPhotoInteractionRef.current = Date.now();
                setActivePhotoIndex(index);
              }}
              type="button"
            >
              <img src={photo.src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
