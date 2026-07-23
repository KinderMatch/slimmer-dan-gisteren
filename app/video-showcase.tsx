"use client";

import { useEffect, useRef, useState } from "react";

import { type LocalizedString, Text } from "./language";
import { MediaLightbox } from "./media-lightbox";

const t = (nl: string, en: string, es = en): LocalizedString => ({ nl, en, es });

const videoCases = [
  {
    title: "Zelfstandigen Bouw - hondenhok",
    label: t("Campagnevideo", "Campaign video", "Video de campaña"),
    text: t(
      "Een social-first video waarin het probleem direct zichtbaar wordt en de kijker snel naar de boodschap wordt getrokken.",
      "A social-first video where the problem is immediately visible and the viewer is quickly pulled into the message.",
      "Un video pensado para redes donde el problema se ve de inmediato y el espectador entra rápido en el mensaje.",
    ),
    src: "https://videos.files.wordpress.com/SiM1cMuS/zelfstandigen-bouw_commercial_rbv_hondenhok_final-1x1_social.mp4",
  },
  {
    title: "Zelfstandigen Bouw - schilder",
    label: t("Vakmanschap", "Craftsmanship", "Oficio"),
    text: t(
      "Herkenbare situatie, compacte spanningsboog en een duidelijke vertaalslag naar de doelgroep van zelfstandige bouwprofessionals.",
      "A recognizable situation, compact story arc and a clear translation to the target audience of independent construction professionals.",
      "Una situación reconocible, una narrativa compacta y una traducción clara al público de profesionales independientes de la construcción.",
    ),
    src: "https://videos.files.wordpress.com/kQCILAhM/zelfstandigen-bouw_commercial_rbv_schilder_final_1x1_social.mp4",
  },
  {
    title: "Zelfstandigen Bouw - auto",
    label: "Awareness",
    text: t(
      "Een laagdrempelige campagnevideo die inspeelt op dagelijkse herkenning en daardoor geschikt is voor bereik en herhaling.",
      "An accessible campaign video built around everyday recognition, making it suitable for reach and repetition.",
      "Un video de campaña accesible basado en reconocimiento cotidiano, ideal para alcance y repetición.",
    ),
    src: "https://videos.files.wordpress.com/2MO1QuZC/zelfstandigen-bouw_commercial_rbv_auto_final_1x1_social.mp4",
  },
  {
    title: "The Gym Republic",
    label: "Community",
    text: t(
      "Dynamische content met tempo en energie, gemaakt om de sfeer van het merk snel voelbaar te maken in de feed.",
      "Dynamic content with pace and energy, created to make the brand atmosphere instantly felt in the feed.",
      "Contenido dinámico con ritmo y energía, creado para transmitir al instante la atmósfera de la marca en el feed.",
    ),
    src: "https://videos.files.wordpress.com/JEXpAg8v/the-gym-republic-v1.mp4",
  },
  {
    title: "Massaclaim",
    label: t("Uitlegvideo", "Explainer video", "Video explicativo"),
    text: t(
      "Een duidelijke social video waarin een concrete dienst kort wordt uitgelegd en direct aan een actie wordt gekoppeld.",
      "A clear social video where a specific service is briefly explained and directly linked to an action.",
      "Un video social claro donde se explica brevemente un servicio concreto y se conecta directamente con una acción.",
    ),
    src: "https://videos.files.wordpress.com/AJxtK3QH/massaclaim-airbnb-servicekostenterug.mp4",
  },
  {
    title: "Daelenbroek Makelaardij",
    label: t("Lokale zichtbaarheid", "Local visibility", "Visibilidad local"),
    text: t(
      "Een compacte videocase die herkenbaarheid en lokale relevantie combineert voor een doelgroep die snel wil begrijpen waarom dit ertoe doet.",
      "A compact video case that combines recognition and local relevance for an audience that wants to quickly understand why it matters.",
      "Un caso de video compacto que combina reconocimiento y relevancia local para un público que quiere entender rápido por qué importa.",
    ),
    src: "https://videos.files.wordpress.com/0Bey1EBn/daelenbroek-3-ja-makelaardij.mp4",
  },
];

function videoPreviewSrc(src: string) {
  return `${src}#t=0.001`;
}

export function VideoShowcase({ compact = false }: { compact?: boolean }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [playAfterSelect, setPlayAfterSelect] = useState(false);
  const featuredVideoRef = useRef<HTMLVideoElement>(null);
  const cases = compact ? videoCases.slice(0, 4) : videoCases;
  const featured = cases[selectedIndex] ?? cases[0];

  useEffect(() => {
    const video = featuredVideoRef.current;
    if (!video) return;

    video.load();
    if (!playAfterSelect) return;

    video.play().catch(() => {
      video.controls = true;
    });
  }, [featured.src, playAfterSelect]);

  return (
    <div className={compact ? "video-showcase compact" : "video-showcase"}>
      <article className="video-feature">
        <div className="video-frame">
          <video ref={featuredVideoRef} controls preload="auto" playsInline key={featured.src}>
            <source src={videoPreviewSrc(featured.src)} type="video/mp4" />
          </video>
        </div>
        <div className="video-caption">
          <span><Text value={t("Featured case", "Featured case", "Caso destacado")} /> / <Text value={featured.label} /></span>
          <h3>{featured.title}</h3>
          <p><Text value={featured.text} /></p>
          <MediaLightbox
            className="video-lightbox-button"
            label={featured.label}
            src={featured.src}
            title={featured.title}
            type="video"
          >
            <Text value={t("Vergroot met geluid", "Enlarge with sound", "Ampliar con sonido")} />
          </MediaLightbox>
        </div>
      </article>

      <div className="video-stack" aria-label="Meer videocases">
        {cases.map((video, index) => (
          <button
            aria-pressed={selectedIndex === index}
            className="video-mini"
            key={video.src}
            onClick={() => {
              setSelectedIndex(index);
              setPlayAfterSelect(true);
            }}
            type="button"
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <video muted preload="auto" playsInline>
              <source src={videoPreviewSrc(video.src)} type="video/mp4" />
            </video>
            <h3>{video.title}</h3>
            <small><Text value={video.label} /></small>
          </button>
        ))}
      </div>
    </div>
  );
}
