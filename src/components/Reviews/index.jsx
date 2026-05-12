import {useRef, useEffect, useState} from 'react';
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
    onMouseMove,
    dragMoved
  } = useDragScroll();
  const sectionRef = useRef(null);
  const cardRefs = useRef(new Map());
  const [activeId, setActiveId] = useState(null);

  const setCardRef = (id) => (node) => {
    if (!node) {
      cardRefs.current.delete(id);
      return;
    }
    cardRefs.current.set(id, node);
  };

  useEffect(() => {
    if (activeId == null) return;
    const node = cardRefs.current.get(activeId);
    if (!node) return;
    node.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [activeId]);

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
        description="Experiences from teams we’ve worked with."
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
            ref={setCardRef(review.id)}
            text={review.text}
            author={review.author}
            role={review.role}
            photo={review.photo}
            isActive={review.id === activeId}
            onActivate={() => {
              if (dragMoved.current) return;
              setActiveId(review.id);
            }}
          />
        ))}
      </div>
    </section>
  );
}
