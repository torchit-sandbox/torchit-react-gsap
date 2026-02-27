import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Animates children of `containerRef` that match `selector` when
 * the container scrolls into view.
 *
 * @param {object} options
 * @param {string}  [options.selector='.gs-reveal']  CSS selector for targets
 * @param {string}  [options.from='bottom']           Direction: 'bottom'|'left'|'right'|'none'
 * @param {number}  [options.distance=48]             Translate distance in px
 * @param {number}  [options.stagger=0.12]            Stagger between children (seconds)
 * @param {number}  [options.duration=0.85]           Tween duration (seconds)
 * @param {string}  [options.ease='power3.out']       GSAP ease string
 * @param {string}  [options.start='top 88%']         ScrollTrigger start
 * @param {boolean} [options.once=true]               Only animate once
 */
export function useScrollReveal(options = {}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const {
      selector = '.gs-reveal',
      from = 'bottom',
      distance = 48,
      stagger = 0.12,
      duration = 0.85,
      ease = 'power3.out',
      start = 'top 88%',
      once = true,
    } = options;

    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray(selector, containerRef.current);
      if (!targets.length) return;

      const fromVars = { opacity: 0, duration, ease };
      if (from === 'bottom') fromVars.y = distance;
      if (from === 'left')   fromVars.x = -distance;
      if (from === 'right')  fromVars.x = distance;

      gsap.from(targets, {
        ...fromVars,
        stagger,
        scrollTrigger: {
          trigger: containerRef.current,
          start,
          once,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return containerRef;
}
