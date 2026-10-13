"use client";

import { useEffect, useState } from "react";

import { dimensionsFor } from "./image-dimensions";
import { type LocalizedString, resolveText, Text, useLanguage } from "./language";

export type ContentImage = {
  alt: LocalizedString | string;
  src: string;
};

export function ContentGallery({ images }: { images: ContentImage[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeImage = activeIndex === null ? null : images[activeIndex];
  const { language } = useLanguage();

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex]);

  return (
    <>
      <div className="content-gallery" aria-label="Voorbeelden van social content">
        {images.map((image, index) => {
          const dimensions = dimensionsFor(image.src);

          return (
            <button
              aria-label={
                language === "en"
                  ? `View ${resolveText(image.alt, language)} in full`
                  : language === "es"
                    ? `Ver ${resolveText(image.alt, language)} completa`
                    : `${resolveText(image.alt, language)} volledig bekijken`
              }
              className="content-gallery-item"
              key={image.src}
              onClick={() => setActiveIndex(index)}
              type="button"
            >
              <img src={image.src} alt={resolveText(image.alt, language)} loading="lazy" width={dimensions?.width} height={dimensions?.height} />
              <span><Text value={{ nl: "Bekijk", en: "View", es: "Ver" }} /></span>
            </button>
          );
        })}
      </div>

      {activeImage ? (
        <div
          aria-modal="true"
          className="image-lightbox"
          onClick={() => setActiveIndex(null)}
          role="dialog"
        >
          <button
            aria-label={language === "en" ? "Close image" : language === "es" ? "Cerrar imagen" : "Sluit afbeelding"}
            className="lightbox-close"
            onClick={() => setActiveIndex(null)}
            type="button"
          >
            {language === "en" ? "Close" : language === "es" ? "Cerrar" : "Sluiten"}
          </button>
          <figure onClick={(event) => event.stopPropagation()}>
            <img
              src={activeImage.src}
              alt={resolveText(activeImage.alt, language)}
              width={dimensionsFor(activeImage.src)?.width}
              height={dimensionsFor(activeImage.src)?.height}
            />
            <figcaption>{resolveText(activeImage.alt, language)}</figcaption>
          </figure>
        </div>
      ) : null}
    </>
  );
}
