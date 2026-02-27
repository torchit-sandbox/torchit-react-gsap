import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { NavMenu } from './NavMenu';
import { BurgerButton } from './BurgerButton';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);

  // ── Page-load entrance ──────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });

      tl.from('.header__inner', {
        y: -72,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
      })
        .from('.header__logo', {
          x: -20,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
        }, '-=0.55')
        .from('.header__menu-link', {
          y: -10,
          opacity: 0,
          duration: 0.45,
          ease: 'power2.out',
          stagger: 0.07,
        }, '-=0.4')
        .from('.header__button', {
          scale: 0.8,
          opacity: 0,
          duration: 0.5,
          ease: 'back.out(1.7)',
        }, '-=0.3');
    }, headerRef);

    return () => ctx.revert();
  }, []);

  // ── Mobile overlay animation ─────────────────────────────────────────────
  useEffect(() => {
    if (!menuOpen) return;
    const ctx = gsap.context(() => {
      gsap.from('.header__menu-link', {
        x: 40,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out',
        stagger: 0.07,
        delay: 0.1,
      });
    });
    return () => ctx.revert();
  }, [menuOpen]);

  const toggle = () => setMenuOpen((v) => !v);

  useEffect(() => {
    document.documentElement.classList.toggle('is-lock', menuOpen);
    return () => document.documentElement.classList.remove('is-lock');
  }, [menuOpen]);

  return (
    <header ref={headerRef} className={`header container${menuOpen ? ' open' : ''}`}>
      <div className="header__inner glass-effect">
        <a className="header__logo" href="/">
          <img
            className="header__logo-icon"
            src="/images/svg/white-logo.svg"
            alt="TorchIT"
            width="162"
            height="28"
          />
        </a>
        <NavMenu isOpen={menuOpen} />
        <BurgerButton isActive={menuOpen} onClick={toggle} />
      </div>
    </header>
  );
}
