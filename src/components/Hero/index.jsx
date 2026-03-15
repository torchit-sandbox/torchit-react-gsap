import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { HERO_CONTENT } from '../../data';
import { useHeroSlider } from '../../hooks';
import { SliderButton } from '../UI';
import { HeroSlide } from './HeroSlide';
import { HeroTabs } from './HeroTabs';

export function Hero() {
  const { current, progress, next, prev, jumpTo } = useHeroSlider(HERO_CONTENT.length);
  const heroRef = useRef(null);

  // ── Hero entrance — staggered content reveal ─────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.9 }); // after header finishes

      tl.from('.hero__inner', {
        opacity: 0,
        scale: 0.97,
        duration: 1.1,
        ease: 'power2.out',
      })
        .from('.hero__info-title', {
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
        }, '-=0.7')
        .from('.hero__info-subtitle', {
          y: 30,
          opacity: 0,
          duration: 0.75,
          ease: 'power2.out',
        }, '-=0.6')
        .from('.hero-slider__button-wrapper', {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
        }, '-=0.5')
        .from('.hero__tabs-item', {
          y: 24,
          opacity: 0,
          duration: 0.55,
          ease: 'power2.out',
          stagger: 0.08,
        }, '-=0.45');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero container-big" aria-labelledby="hero-title">
      <div className="hero__inner">
        <a className="hero__bg-link" href={HERO_CONTENT[current].anchor}>
          {HERO_CONTENT.map((slide, i) => (
            <HeroSlide key={slide.id} src={slide.img} isActive={i === current} />
          ))}
        </a>

        <div className="hero__content">
          <div className="hero__info">
            <h1 className="hero__info-title h2" id="hero-title">
              {HERO_CONTENT[current].title}
            </h1>
            <p className="hero__info-subtitle">
              {HERO_CONTENT[current].description}
            </p>
          </div>

          <div className="slider__button-wrapper hero-slider__button-wrapper">
            <SliderButton direction="prev" onClick={prev} />
            <SliderButton direction="next" onClick={next} />
          </div>

          <HeroTabs
            tabs={HERO_CONTENT}
            current={current}
            progress={progress}
            onTabClick={jumpTo}
          />
        </div>
      </div>
    </section>
  );
}
