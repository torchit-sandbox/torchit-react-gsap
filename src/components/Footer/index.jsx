import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FOOTER_MENU } from '../../data';

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: footerRef.current, start: 'top 90%', once: true },
      });

      tl.from('.footer__logo', {
        y: 30,
        opacity: 0,
        duration: 0.65,
        ease: 'power2.out',
      })
        .from('.footer__contacts-item, .footer__contacts', {
          y: 20,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.1,
        }, '-=0.35')
        .from('.footer__menu-item', {
          y: 20,
          opacity: 0,
          duration: 0.45,
          ease: 'power2.out',
          stagger: 0.07,
        }, '-=0.4')
        .from('.footer__bottom', {
          y: 16,
          opacity: 0,
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
            <a href="/" className="footer__logo">
              <img
                className="footer__logo-icon"
                src="/images/svg/yellow-logo.svg"
                alt="TorchIT"
                width="162"
                height="28"
              />
            </a>
            <ul className="footer__contacts">
              <li className="footer__contacts-item">
                <a href="mailto:torch-it@gmail.com" className="footer__contacts-link">
                  torch-it@gmail.com
                </a>
              </li>
              <li className="footer__contacts">
                <a href="tel:+380688888888" className="footer__contacts-link">
                  +380-68-888-88-88
                </a>
              </li>
            </ul>
          </div>

          <ul className="footer__menu">
            {FOOTER_MENU.map((item, i) => (
              <li key={i} className="footer__menu-item">
                <a href="/" className="footer__menu-link">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">2026 | All rights reserved</p>
          <p className="footer__powered">Powered by TorchIT</p>
        </div>
      </div>
    </footer>
  );
}
