import { forwardRef, useRef } from 'react';
import { gsap } from 'gsap';

export const ReviewCard = forwardRef(function ReviewCard(
  { text, author, role, photo, isActive, onActivate },
  forwardedRef,
) {
  const cardRef = useRef(null);
  const quoteRef = useRef(null);

  const setRefs = (node) => {
    cardRef.current = node;
    if (typeof forwardedRef === 'function') forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  };

  const handleActivate = () => {
    onActivate?.();
    gsap.fromTo(
      quoteRef.current,
      { scale: 0.8, rotate: -8 },
      { scale: 1, rotate: 0, duration: 0.45, ease: 'back.out(2)' }
    );
  };

  const onMouseEnter = () => {
    gsap.to(cardRef.current, {
      y: 5,
      boxShadow: '0 16px 40px rgba(0,0,0,0.3)',
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const onMouseLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      boxShadow: '0 4px 10px rgba(82,82,82,0.1)',
      duration: 0.35,
      ease: 'power2.inOut',
    });
  };

  return (
    <article
      ref={setRefs}
      className={`review-card${isActive ? ' expanded' : ''}`}
      onClick={handleActivate}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleActivate()}
      aria-expanded={isActive}
    >
      <span ref={quoteRef} className="review-card__quote" aria-hidden="true" />
      <p className="review-card__text">{text}</p>
      <footer className="review-card__author">
        <img
          className="review-card__author-photo"
          src={photo}
          alt=""
          width="51"
          height="51"
          loading="lazy"
        />
        <div className="review-card__author-info">
          <p className="review-card__author-name">{author}</p>
          <p className="review-card__author-role">{role}</p>
        </div>
      </footer>
    </article>
  );
});
