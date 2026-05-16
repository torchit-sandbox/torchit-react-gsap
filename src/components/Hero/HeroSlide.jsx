import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { prefersReducedMotion } from '../../utils/motion';

function getMediaSrc(media) {
  return typeof media === 'string' ? media : media?.desktop;
}

function isVideoSrc(media) {
  const src = getMediaSrc(media) || '';
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

export function HeroSlide({ media, src, isActive, isPriority = false }) {
  const mediaRef = useRef(null);
  const wasActive = useRef(false);
  const resolvedMedia = media ?? src;
  const video = isVideoSrc(resolvedMedia);

  useEffect(() => {
    if (!mediaRef.current) return;

    if (prefersReducedMotion()) {
      gsap.set(mediaRef.current, { opacity: isActive ? 1 : 0, scale: 1 });

      if (video && !isActive) {
        mediaRef.current.pause();
      }

      wasActive.current = isActive;
      return;
    }

    if (isActive) {
      gsap.fromTo(
        mediaRef.current,
        { opacity: 0, scale: 1.035 },
        { opacity: 1, scale: 1, duration: 1.1, ease: 'power2.inOut' }
      );

      if (video) {
        mediaRef.current.currentTime = 0;
        const playPromise = mediaRef.current.play();
        if (playPromise?.catch) {
          playPromise.catch(() => {});
        }
      }

      wasActive.current = true;
    } else if (wasActive.current) {
      if (video) {
        mediaRef.current.pause();
      }

      gsap.to(mediaRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: 'power1.in',
      });
      wasActive.current = false;
    }
  }, [isActive, video]);

  if (video) {
    const videoSrc = getMediaSrc(resolvedMedia);
    const sources = getVideoSources(videoSrc);
    const poster = getPosterSrc(videoSrc);

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

  if (typeof resolvedMedia === 'object') {
    return (
      <picture>
        {resolvedMedia.mobile && (
          <source media="(max-width: 767px)" srcSet={resolvedMedia.mobile} />
        )}
        {resolvedMedia.desktop && (
          <source media="(min-width: 768px)" srcSet={resolvedMedia.desktop} />
        )}
        <img
          ref={mediaRef}
          className="hero__bg"
          src={resolvedMedia.desktop || resolvedMedia.mobile}
          width={resolvedMedia.desktopWidth || 1408}
          height={resolvedMedia.desktopHeight || 682}
          alt=""
          aria-hidden="true"
          loading={isPriority ? 'eager' : 'lazy'}
          fetchPriority={isPriority ? 'high' : 'auto'}
          decoding={isPriority ? 'sync' : 'async'}
          style={{ opacity: isActive ? undefined : 0 }}
        />
      </picture>
    );
  }

  return (
    <img
      ref={mediaRef}
      className="hero__bg"
      src={resolvedMedia}
      width="1408"
      height="682"
      alt=""
      aria-hidden="true"
      loading={isPriority ? 'eager' : 'lazy'}
      fetchPriority={isPriority ? 'high' : 'auto'}
      decoding={isPriority ? 'sync' : 'async'}
      style={{ opacity: isActive ? undefined : 0 }}
    />
  );
}
