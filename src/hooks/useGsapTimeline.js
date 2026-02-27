import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Returns a ref. When mounted, executes `buildTimeline(tl, container)`.
 * Automatically cleans up context on unmount.
 */
export function useGsapTimeline(buildTimeline, deps = []) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      buildTimeline(tl, ref.current);
    }, ref);

    return () => ctx.revert();
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  return ref;
}
