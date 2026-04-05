import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ABOUT_PARAGRAPHS } from '../../data';

export function AboutContent({ isExpanded, onToggle }) {
  const textRef = useRef(null);
  const pictureRef = useRef(null);
  const prevExpanded = useRef(false);

  const isTooLong = useMemo(() => {
    const fullText = ABOUT_PARAGRAPHS.join(' ');
    return fullText.length > 740;
  }, []);

  useEffect(() => {
    if (isExpanded === prevExpanded.current) return;
    prevExpanded.current = isExpanded;

    const duration = 0.4;

    const blinkAndShow = (ref) => {
      if (!ref.current) return;
      gsap.to(ref.current, { opacity: 0, duration: 0.1 });
      setTimeout(() => {
        gsap.to(ref.current, { opacity: 1, duration });
      }, 30);
    };

    if (isExpanded) {
      blinkAndShow(pictureRef);

      gsap.from(textRef.current.querySelectorAll('p'), {
        y: 16,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.08,
      });
    } else {
      blinkAndShow(pictureRef);
    }
  }, [isExpanded]);

  return (
    <div className={`about-us__content about-us__content--medium${isExpanded ? ' expanded' : ''}`}>
      <img
        ref={pictureRef}
        className="about-us__content-picture"
        src="/images/about-us/content-1.jpg"
        alt=""
        width="742"
        height="448"
        loading="eager"
      />

      <div className="about-us__content-wrapper">
        <div ref={textRef} className="about-us__content-info" id="text">
          {ABOUT_PARAGRAPHS.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
        
        {isTooLong && (
          <button
            className="about-us__content-button"
            type="button"
            id="read-more"
            onClick={onToggle}
          >
            {isExpanded ? 'Hide details' : 'Read more'}
          </button>
        )}
      </div>
    </div>
  );
}
