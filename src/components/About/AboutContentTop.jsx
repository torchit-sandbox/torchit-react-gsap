import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ABOUT_INTRO } from '../../data';

export function AboutContentTop({ isExpanded, onPreviewClick, onVideoClick }) {
  const previewRef = useRef(null);
  const videoRef = useRef(null);
  const prevExpanded = useRef(false);

  // Animate the preview → video swap
  useEffect(() => {
    if (isExpanded === prevExpanded.current) return;
    prevExpanded.current = isExpanded;

    if (isExpanded) {
      // Fade out preview, fade in video with scale
      gsap.to(previewRef.current, { opacity: 0, scale: 0.95, duration: 0.35, ease: 'power1.in' });
      gsap.fromTo(
        videoRef.current,
        { opacity: 0, scale: 1.04, display: 'block' },
        { opacity: 1, scale: 1, duration: 0.7, ease: 'power2.out', delay: 0.2 }
      );
    } else {
      gsap.to(videoRef.current, {
        opacity: 0, scale: 0.97, duration: 0.35, ease: 'power1.in',
        onComplete: () => gsap.set(videoRef.current, { display: 'none' }),
      });
      gsap.fromTo(
        previewRef.current,
        { opacity: 0, scale: 1.03 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out', delay: 0.2 }
      );
    }
  }, [isExpanded]);

  return (
    <div className={`about-us__content about-us__content--top${isExpanded ? ' expanded' : ''}`}>
      <div className="about-us__content-info">
        <p>{ABOUT_INTRO}</p>
      </div>
      <img
        ref={previewRef}
        className="about-us__content-preview"
        src="/images/about-us/video.jpg"
        alt="Preview — click to expand"
        width="742"
        height="271"
        loading="eager"
        onClick={onPreviewClick}
        style={{ cursor: 'pointer' }}
      />
      <img
        ref={videoRef}
        className="about-us__content-video"
        src="/images/about-us/video-active.jpg"
        alt="Video — click to collapse"
        width="1312"
        height="600"
        loading="eager"
        onClick={onVideoClick}
        style={{ cursor: 'pointer', display: 'none', opacity: 0 }}
      />
    </div>
  );
}
