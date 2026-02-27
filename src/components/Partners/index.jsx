import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PARTNERS_COUNT } from '../../data';

gsap.registerPlugin(ScrollTrigger);

export function Partners() {
  const trackRef = useRef(null);
  const sectionRef = useRef(null);

  // Infinite marquee via GSAP
  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const items = track.querySelectorAll('.partners-slider-item');
      const totalWidth = Array.from(items).reduce(
        (acc, el) => acc + el.offsetWidth + 80, // 80 = margin-right
        0
      );

      gsap.to(track, {
        x: `-=${totalWidth / 2}`,
        duration: 18,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % (totalWidth / 2)),
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Section entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 90%', once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Double the items so marquee loops seamlessly
  const items = Array.from({ length: PARTNERS_COUNT * 2 }, (_, i) => i);

  return (
    <section ref={sectionRef} className="partners">
      <div
        className="partners-slider-track"
        ref={trackRef}
        style={{ display: 'flex', flexWrap: 'nowrap', overflow: 'hidden' }}
      >
        {items.map((i) => (
          <div key={i} className="partners-slider-item" style={{ flexShrink: 0 }}>
            <img src="/images/partner.svg" alt="" height="32" loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
}
