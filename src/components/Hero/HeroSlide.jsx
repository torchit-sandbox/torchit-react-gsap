import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

function isVideoSrc(src = '') {
  return /\.(mp4|webm|ogg)$/i.test(src);
}

export function HeroSlide({ src, isActive }) {
  const mediaRef = useRef(null);
  const wasActive = useRef(false);
  const isVideo = isVideoSrc(src);

  useEffect(() => {
    if (!mediaRef.current) return;

    if (isActive) {
      gsap.fromTo(
        mediaRef.current,
        { opacity: 0, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 1.1, ease: 'power2.inOut' }
      );

      if (isVideo) {
        mediaRef.current.currentTime = 0;
        const playPromise = mediaRef.current.play();
        if (playPromise?.catch) {
          playPromise.catch(() => {});
        }
      }

      wasActive.current = true;
    } else if (wasActive.current) {
      if (isVideo) {
        mediaRef.current.pause();
      }

      gsap.to(mediaRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: 'power1.in',
      });
      wasActive.current = false;
    }
  }, [isActive, isVideo]);

  if (isVideo) {
    return (
      <video
        ref={mediaRef}
        className="hero__bg"
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        style={{ opacity: isActive ? undefined : 0 }}
      />
    );
  }

  return (
    <img
      ref={mediaRef}
      className="hero__bg"
      src={src}
      width="1408"
      height="682"
      alt=""
      aria-hidden="true"
      style={{ opacity: isActive ? undefined : 0 }}
    />
  );
}
