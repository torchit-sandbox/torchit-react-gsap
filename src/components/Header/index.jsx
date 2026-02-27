import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { NavMenu } from './NavMenu';
import { BurgerButton } from './BurgerButton';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: -60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.35,
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  const toggle = () => setMenuOpen((v) => !v);

  useEffect(() => {
    document.documentElement.classList.toggle('is-lock', menuOpen);
    return () => document.documentElement.classList.remove('is-lock');
  }, [menuOpen]);

  return (
    <header
      ref={headerRef}
      className={`header container${menuOpen ? ' open' : ''}`}
    >
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