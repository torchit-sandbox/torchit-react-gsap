import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FOOTER_MENU } from '../../data';
import { prefersReducedMotion } from '../../utils/motion';

gsap.registerPlugin(ScrollTrigger);

export function Footer({ onOpenContact }) {
  const footerRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Устанавливаем начальное состояние явно
      gsap.set('.footer__logo', { y: 30, opacity: 0 });
      gsap.set('.footer__contacts-item, .footer__contacts, .footer__cta', { y: 20, opacity: 0 });
      gsap.set('.footer__menu-item', { y: 20, opacity: 0 });
      gsap.set('.footer__bottom', { y: 16, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          once: true,
          invalidateOnRefresh: true,
        },
      });

      tl.to('.footer__logo', {
        y: 0,
        opacity: 1,
        duration: 0.65,
        ease: 'power2.out',
      })
        .to('.footer__contacts-item, .footer__contacts, .footer__cta', {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.1,
        }, '-=0.35')
        .to('.footer__menu-item', {
          y: 0,
          opacity: 1,
          duration: 0.45,
          ease: 'power2.out',
          stagger: 0.07,
        }, '-=0.4')
        .to('.footer__bottom', {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
        }, '-=0.25');
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="footer container active">
      <div className="footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <a href="/" className="footer__logo" aria-label="TorchIT home">
              <img
                className="footer__logo-icon"
                src="/images/svg/yellow-logo.svg"
                alt="TorchIT"
                width="162"
                height="28"
              />
            </a>
            <ul className="footer__contacts" aria-label="TorchIT contact details">
              <li className="footer__contacts-item">
                <a href="mailto:torch-it@gmail.com" className="footer__contacts-link">
                  torch-it@gmail.com
                </a>
              </li>
              <li className="footer__contacts-item">
                <a href="tel:+380688888888" className="footer__contacts-link">
                  +380-68-888-88-88
                </a>
              </li>
            </ul>
          </div>

          <nav className="footer__nav" aria-label="Footer navigation">
            <ul className="footer__menu">
              {FOOTER_MENU.map((item) => (
                <li key={item.name} className="footer__menu-item">
                  {item.pending ? (
                    <span className="footer__menu-link footer__menu-link--pending" aria-label={`${item.name} link pending`}>
                      {item.name} <span aria-hidden="true">/ pending</span>
                    </span>
                  ) : (
                    <a href={item.href} className="footer__menu-link">{item.name}</a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="footer__cta-row">
          <p className="footer__cta-copy">Have a product to clarify, build, or improve?</p>
          <button
            className="footer__cta button button--yellow"
            type="button"
            onClick={onOpenContact}
          >
            Start a Project
          </button>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">2026 | All rights reserved</p>
          <p className="footer__powered">Powered by TorchIT</p>
        </div>
      </div>
    </footer>
  );
}
