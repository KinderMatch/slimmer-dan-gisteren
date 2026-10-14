import { dimensionsFor } from "./image-dimensions";
import { videoThumbnailFor } from "./video-thumbnails";

export function VideoPoster({ className = "", src }: { className?: string; src: string }) {
  const poster = videoThumbnailFor(src);
  if (!poster) return null;

  const dimensions = dimensionsFor(poster);

  return (
    <div className={["video-poster", className].filter(Boolean).join(" ")}>
      <img src={poster} alt="" loading="lazy" width={dimensions?.width} height={dimensions?.height} />
      <span className="video-play-indicator">
        <span>Video</span>
      </span>
    </div>
  );
}
