import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function HeroSlide({ src, isActive, index }) {
  const imgRef = useRef(null);
  const wasActive = useRef(false);

  // Animate slide transition: cross-fade + subtle Ken Burns scale
  useEffect(() => {
    if (!imgRef.current) return;

    if (isActive) {
      gsap.fromTo(
        imgRef.current,
        { opacity: 0, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 1.1, ease: 'power2.inOut' }
      );
      wasActive.current = true;
    } else if (wasActive.current) {
      gsap.to(imgRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: 'power1.in',
      });
      wasActive.current = false;
    }
  }, [isActive]);

  return (
    <img
      ref={imgRef}
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
