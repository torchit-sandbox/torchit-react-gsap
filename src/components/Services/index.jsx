import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SERVICES } from '../../data';
import { useSwiper } from '../../hooks';
import { SectionHeader, SliderButton, Progressbar } from '../UI';
import { ServiceCard } from './ServiceCard';

gsap.registerPlugin(ScrollTrigger);

const SLIDES = [...SERVICES, ...SERVICES];

export function Services() {
  const { swiperRef, progress } = useSwiper({
    prevSelector: '.services-section .slider__button--prev',
    nextSelector: '.services-section .slider__button--next',
  });
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.from('.services .section__header-title', {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.services .section__header', start: 'top 85%', once: true },
      });
      gsap.from('.services .section__header-tag', {
        x: 30,
        opacity: 0,
        duration: 0.65,
        ease: 'power2.out',
        delay: 0.15,
        scrollTrigger: { trigger: '.services .section__header', start: 'top 85%', once: true },
      });

      // Slider buttons
      gsap.from('.services-section .slider__button--prev', {
        x: -30,
        opacity: 0,
        duration: 0.55,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.services__inner', start: 'top 88%', once: true },
      });
      gsap.from('.services-section .slider__button--next', {
        x: 30,
        opacity: 0,
        duration: 0.55,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.services__inner', start: 'top 88%', once: true },
      });

      // Cards stagger in
      gsap.from('.services__item', {
        y: 60,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: '.services__slider', start: 'top 88%', once: true },
      });

      // Progressbar slide up
      gsap.from('.services .progressbar', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.services .progressbar', start: 'top 95%', once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="services container services-section"
      aria-labelledby="services-title"
    >
      <SectionHeader
        id="services-title"
        title={<>Your Product.<br />Our Expertise.</>}
        tag="/ Services"
      />

      <div className="services__inner">
        <SliderButton direction="prev" />

        <div className="services__slider swiper" ref={swiperRef}>
          <ul className="services__list swiper-wrapper">
            {SLIDES.map((service, i) => (
              <li key={`${service.id}-${i}`} className="services__item swiper-slide">
                <ServiceCard
                  image={service.image}
                  title={service.title}
                  description={service.description}
                />
              </li>
            ))}
          </ul>
        </div>

        <SliderButton direction="next" />
      </div>

      <Progressbar value={progress} />
    </section>
  );
}
