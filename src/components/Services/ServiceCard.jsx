import { useRef } from 'react';
import { gsap } from 'gsap';

export function ServiceCard({ image, title, description }) {
  const cardRef = useRef(null);

  const onMouseEnter = () => {
    gsap.to(cardRef.current, {
      y: -6,
      duration: 0.3,
      ease: 'power2.out',
    });
    gsap.to(cardRef.current.querySelector('.service-card__image'), {
      scale: 1.04,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const onMouseLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      duration: 0.35,
      ease: 'power2.inOut',
    });
    gsap.to(cardRef.current.querySelector('.service-card__image'), {
      scale: 1,
      duration: 0.4,
      ease: 'power2.inOut',
    });
  };

  return (
    <article
      ref={cardRef}
      className="service-card"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ overflow: 'hidden' }}
    >
      <img
        className="service-card__image"
        src={image}
        alt=""
        width="336"
        height="96"
        style={{ transformOrigin: 'center', willChange: 'transform' }}
      />
      <div className="service-card__body">
        <h3 className="service-card__title">{title}</h3>
        <p className="service-card__description">{description}</p>
      </div>
    </article>
  );
}
