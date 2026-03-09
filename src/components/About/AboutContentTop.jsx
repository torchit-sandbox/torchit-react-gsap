import {useEffect, useRef, useState, useCallback} from 'react';
import {gsap} from 'gsap';
import {ABOUT_INTRO} from '../../data';
import {VideoPlayer} from "../VideoPlayer";

export function AboutContentTop({isExpanded, onPreviewClick, onVideoClick}) {
  const previewRef = useRef(null);
  const videoRef = useRef(null);
  const prevExpanded = useRef(false);

  useEffect(() => {
    if (isExpanded === prevExpanded.current) return;
    prevExpanded.current = isExpanded;

    const duration = 0.4;

    if (isExpanded) {
      gsap.to(previewRef.current, {autoAlpha: 0, duration});
      gsap.to(videoRef.current, {autoAlpha: 1, duration});
    } else {
      gsap.to(videoRef.current, {autoAlpha: 0, duration});
      gsap.to(previewRef.current, {autoAlpha: 1, duration});
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
        style={{cursor: 'pointer'}}
      />

      <div
        ref={videoRef}
        className="about-us__content-video"
        style={{opacity: 0, visibility: 'hidden'}}
      >
        <VideoPlayer
          isVisible={isExpanded}
          onCollapse={onVideoClick}
        />
      </div>
    </div>
  );
}