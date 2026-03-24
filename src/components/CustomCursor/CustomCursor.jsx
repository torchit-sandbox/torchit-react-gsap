import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let rafId = null;

    gsap.set([dot, ring], { x: -100, y: -100 });

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.set(dot, { x: mouseX, y: mouseY });
    };

    const onMouseEnterLink = () => {
      gsap.to(dot, { scale: 2.5, duration: 0.25, ease: 'power2.out' });
      gsap.to(ring, { scale: 1.6, opacity: 0.35, duration: 0.25, ease: 'power2.out' });
    };

    const onMouseLeaveLink = () => {
      gsap.to(dot, { scale: 1, duration: 0.25, ease: 'power2.out' });
      gsap.to(ring, { scale: 1, opacity: 0.6, duration: 0.25, ease: 'power2.out' });
    };

    const onMouseDown = () => {
      gsap.to(dot, { scale: 0.7, duration: 0.1, ease: 'power2.out' });
      gsap.to(ring, { scale: 0.8, duration: 0.1, ease: 'power2.out' });
    };

    const onMouseUp = () => {
      gsap.to(dot, { scale: 1, duration: 0.2, ease: 'elastic.out(1, 0.5)' });
      gsap.to(ring, { scale: 1, duration: 0.2, ease: 'elastic.out(1, 0.5)' });
    };

    const loop = () => {
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;
      gsap.set(ring, { x: ringX, y: ringY });
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    const interactives = document.querySelectorAll('a, button, [data-cursor]');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterLink);
      el.addEventListener('mouseleave', onMouseLeaveLink);
    });

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterLink);
        el.removeEventListener('mouseleave', onMouseLeaveLink);
      });
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="custom-cursor__ring" />
      <div ref={dotRef} className="custom-cursor__dot" />
    </>
  );
}