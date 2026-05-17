import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { prefersReducedMotion } from '../../utils/motion';

const ACTIVE_MEDIA_Z_INDEX = 0;
const INACTIVE_MEDIA_Z_INDEX = -1;

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
    const node = mediaRef.current;
    if (!node) return;

    gsap.killTweensOf(node);

    if (prefersReducedMotion()) {
      gsap.set(node, {
        opacity: isActive ? 1 : 0,
        scale: 1,
        zIndex: isActive ? ACTIVE_MEDIA_Z_INDEX : INACTIVE_MEDIA_Z_INDEX,
        pointerEvents: isActive ? 'auto' : 'none',
      });

      if (video && !isActive) {
        node.pause();
      }

      wasActive.current = isActive;
      return;
    }

    if (isActive) {
      gsap.set(node, {
        zIndex: ACTIVE_MEDIA_Z_INDEX,
        pointerEvents: 'auto',
      });
      gsap.fromTo(
        node,
        { opacity: 0, scale: 1.035 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' }
      );

      if (video) {
        node.currentTime = 0;
        const playPromise = node.play();
        if (playPromise?.catch) {
          playPromise.catch(() => {});
        }
      }

      wasActive.current = true;
    } else {
      if (video) {
        node.pause();
      }

      gsap.set(node, { pointerEvents: 'none', zIndex: INACTIVE_MEDIA_Z_INDEX });
      gsap.to(node, {
        opacity: 0,
        duration: wasActive.current ? 0.35 : 0,
        ease: 'power1.out',
        onComplete: () => {
          gsap.set(node, { opacity: 0, scale: 1, zIndex: INACTIVE_MEDIA_Z_INDEX });
        },
      });
      wasActive.current = false;
    }
  }, [isActive, video]);

  const mediaStyle = {
    opacity: isActive ? undefined : 0,
    zIndex: isActive ? ACTIVE_MEDIA_Z_INDEX : INACTIVE_MEDIA_Z_INDEX,
    pointerEvents: isActive ? 'auto' : 'none',
  };

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
        style={mediaStyle}
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
          style={mediaStyle}
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
      style={mediaStyle}
    />
  );
}
