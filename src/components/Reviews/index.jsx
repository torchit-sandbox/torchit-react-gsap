import {useRef, useEffect} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {REVIEWS} from '../../data';
import {useDragScroll} from '../../hooks';
import {SectionHeader} from '../UI';
import {ReviewCard} from './ReviewCard';

gsap.registerPlugin(ScrollTrigger);

export function Reviews() {
  const {
    ref,
    onMouseDown,
    onMouseLeave,
    onMouseUp,
    onMouseMove
  } = useDragScroll();
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.from('.reviews .section__header-title', {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.reviews .section__header',
          start: 'top 85%',
          once: true
        },
      });
      gsap.from('.reviews .section__header-tag', {
        x: 30,
        opacity: 0,
        duration: 0.65,
        ease: 'power2.out',
        delay: 0.1,
        scrollTrigger: {
          trigger: '.reviews .section__header',
          start: 'top 85%',
          once: true
        },
      });
      gsap.from('.reviews .section__header-description', {
        y: 20,
        opacity: 0,
        duration: 0.65,
        ease: 'power2.out',
        delay: 0.2,
        scrollTrigger: {
          trigger: '.reviews .section__header',
          start: 'top 85%',
          once: true
        },
      });

      // Cards slide in from right, staggered
      gsap.from('.review-card', {
        x: 80,
        opacity: 0,
        duration: 0.75,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: '.reviews__list',
          start: 'top 88%',
          once: true
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="reviews container"
      aria-labelledby="reviews-title"
      id="reviews"
    >
      <SectionHeader
        id="reviews-title"
        title="What our clients say"
        tag="/ Reviews"
        description="We build long-term partnerships based on trust, communication, and results. Here's what our clients share about working with us."
      />

      <div
        className="reviews__list"
        id="track"
        ref={ref}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        {REVIEWS.map((review) => (
          <ReviewCard
            key={review.id}
            text={review.text}
            author={review.author}
            role={review.role}
            photo={review.photo}
          />
        ))}
      </div>
    </section>
  );
}
