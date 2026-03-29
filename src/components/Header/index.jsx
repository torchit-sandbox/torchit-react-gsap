import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { NavMenu } from './NavMenu';
import { BurgerButton } from './BurgerButton';
import {ContactModal} from "../СontactModal";



export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia('(max-width: 1023px)').matches;
  });
  const [showNavLinks, setShowNavLinks] = useState(true);
  const headerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: -60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.35,
        clearProps: 'transform'
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 900px)');

    const handleChange = (e) => setIsSmallScreen(e.matches);

    setIsSmallScreen(mql.matches);

    if (mql.addEventListener) {
      mql.addEventListener('change', handleChange);
    } else {
      mql.addListener(handleChange);
    }

    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener('change', handleChange);
      } else {
        mql.removeListener(handleChange);
      }
    };
  }, []);

  useEffect(() => {
    if (isSmallScreen) {
      setShowNavLinks(true);
      return;
    }

    const heroEl = document.querySelector('.hero');

    if (!heroEl) {
      setShowNavLinks(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowNavLinks(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(heroEl);

    return () => observer.disconnect();
  }, [isSmallScreen]);

  const toggle = () => setMenuOpen((v) => !v);

  const handleOpenModal = () => {
    setMenuOpen(false);
    setModalOpen(true);
  };

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

        <NavMenu
          isOpen={menuOpen}
          showLinks={showNavLinks}
          onContactClick={handleOpenModal}
        />
        <BurgerButton isActive={menuOpen} onClick={toggle} />
      </div>

      {modalOpen && (
        <ContactModal onClose={() => setModalOpen(false)} />
      )}
    </header>
  );
}
