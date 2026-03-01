import { useEffect, useRef } from 'react';
import { PARTNERS } from '../../data';
import { gsap } from 'gsap';

export function Partners() {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;

    const partners = Array.from(track.children);
    partners.forEach(child => track.appendChild(child.cloneNode(true)));

    const totalWidth = track.scrollWidth / 2;

    gsap.to(track, {
      x: -totalWidth,
      duration: 50,
      ease: 'linear',
      repeat: -1,
    });
  }, []);

  return (
    <section className="partners">
      <div className="partners-slider">
        <div className="partners-slider-track" ref={trackRef}>
          {PARTNERS.map(({ id, image }) => (
            <div key={id} className="partners-slider-item">
              <img src={image} alt="" height="32" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}