import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeader } from '../UI';
import { AboutContentTop } from './AboutContentTop';
import { AboutContentMedium } from './AboutContentMedium';

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const [videoExpanded, setVideoExpanded] = useState(false);
  const [textExpanded, setTextExpanded] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header
      gsap.from('.about-us .section__header-title', {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about-us .section__header', start: 'top 85%', once: true },
      });
      gsap.from('.about-us .section__header-tag', {
        x: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
        delay: 0.15,
        scrollTrigger: { trigger: '.about-us .section__header', start: 'top 85%', once: true },
      });

      // Top row — text slides in from left, image from right
      gsap.from('.about-us__content--top .about-us__content-info', {
        x: -60,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about-us__content--top', start: 'top 85%', once: true },
      });
      gsap.from('.about-us__content-preview', {
        x: 60,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about-us__content--top', start: 'top 85%', once: true },
      });

      // Medium row — picture, then text, then gallery
      gsap.from('.about-us__content-picture', {
        y: 50,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about-us__content--medium', start: 'top 85%', once: true },
      });
      gsap.from('.about-us__content-wrapper', {
        y: 50,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
        delay: 0.15,
        scrollTrigger: { trigger: '.about-us__content--medium', start: 'top 85%', once: true },
      });
      gsap.from('.about-us__content-image', {
        y: 40,
        opacity: 0,
        duration: 0.75,
        ease: 'power2.out',
        stagger: 0.14,
        delay: 0.3,
        scrollTrigger: { trigger: '.about-us__content--medium', start: 'top 85%', once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="about-us container" aria-labelledby="about-us-title">
      <SectionHeader
        id="about-us-title"
        title={<>We're not just a tech team, <br />we're your product partners.</>}
        tag="/ About Us"
      />

      <div className="about-us__wrapper">
        <AboutContentTop
          isExpanded={videoExpanded}
          onPreviewClick={() => setVideoExpanded(true)}
          onVideoClick={() => setVideoExpanded(false)}
        />
        <AboutContentMedium
          isExpanded={textExpanded}
          onToggle={() => setTextExpanded((v) => !v)}
        />
      </div>
    </section>
  );
}
