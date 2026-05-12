import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

function isVideoSrc(src = '') {
  return /\.(mp4|webm|ogg)$/i.test(src);
}

function getVideoSources(src = '') {
  const sources = [];

  if (/\.mp4$/i.test(src)) {
    sources.push({ src: src.replace(/\.mp4$/i, '.webm'), type: 'video/webm' });
    sources.push({ src, type: 'video/mp4' });
    return sources;
  }

  if (/\.webm$/i.test(src)) {
    sources.push({ src, type: 'video/webm' });
    return sources;
  }

  if (/\.ogg$/i.test(src)) {
    sources.push({ src, type: 'video/ogg' });
    return sources;
  }

  return [{ src, type: 'video/mp4' }];
}

function getPosterSrc(src = '') {
  if (/\.mp4$/i.test(src)) return src.replace(/\.mp4$/i, '-poster.webp');
  if (/\.webm$/i.test(src)) return src.replace(/\.webm$/i, '-poster.webp');
  if (/\.ogg$/i.test(src)) return src.replace(/\.ogg$/i, '-poster.webp');
  return undefined;
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
    const sources = getVideoSources(src);
    const poster = getPosterSrc(src);

    return (
      <video
        ref={mediaRef}
        className="hero__bg"
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        aria-hidden="true"
        style={{ opacity: isActive ? undefined : 0 }}
      >
        {sources.map((source) => (
          <source key={source.src} src={source.src} type={source.type} />
        ))}
      </video>
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
