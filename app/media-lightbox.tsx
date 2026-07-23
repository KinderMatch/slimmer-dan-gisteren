"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

import { type LocalizedString, resolveText, useLanguage } from "./language";

type MediaLightboxProps = {
  alt?: LocalizedString | string;
  children: ReactNode;
  className: string;
  fullSrc?: string;
  label?: LocalizedString | string;
  src: string;
  title: LocalizedString | string;
  type: "image" | "video";
};

export function MediaLightbox({ alt, children, className, fullSrc, label, src, title, type }: MediaLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { language } = useLanguage();
  const translatedTitle = resolveText(title, language);
  const translatedLabel = label ? resolveText(label, language) : "";
  const translatedAlt = alt ? resolveText(alt, language) : translatedTitle;
  const lightboxSrc = fullSrc ?? src;

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || type !== "video") return;

    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    video.volume = 1;
    video.play().catch(() => {
      video.controls = true;
    });
  }, [isOpen, type, lightboxSrc]);

  return (
    <>
      <button
        aria-label={
          language === "en"
            ? `Enlarge ${translatedTitle}`
            : language === "es"
              ? `Ampliar ${translatedTitle}`
              : `${translatedTitle} vergroten`
        }
        className={`${className} media-trigger`}
        onClick={() => setIsOpen(true)}
        type="button"
      >
        {children}
      </button>

      {isOpen ? (
        <div aria-modal="true" className="media-lightbox" onClick={() => setIsOpen(false)} role="dialog">
          <button
            aria-label={language === "en" ? "Close media" : language === "es" ? "Cerrar media" : "Sluit media"}
            className="lightbox-close"
            onClick={() => setIsOpen(false)}
            type="button"
          >
            {language === "en" ? "Close" : language === "es" ? "Cerrar" : "Sluiten"}
          </button>
          <figure className={type === "video" ? "media-lightbox-frame video" : "media-lightbox-frame"} onClick={(event) => event.stopPropagation()}>
            {type === "video" ? (
              <video ref={videoRef} controls playsInline preload="auto">
                <source src={lightboxSrc} />
              </video>
            ) : (
              <img src={lightboxSrc} alt={translatedAlt} />
            )}
            <figcaption>
              {label ? <span>{translatedLabel}</span> : null}
              <strong>{translatedTitle}</strong>
            </figcaption>
          </figure>
        </div>
      ) : null}
    </>
  );
}
