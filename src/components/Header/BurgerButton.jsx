import { forwardRef } from 'react';

export const BurgerButton = forwardRef(function BurgerButton({ isActive, onClick }, ref) {
  return (
    <button
      ref={ref}
      className={`header__burger-button visible-tablet${isActive ? ' is-active' : ''}`}
      type="button"
      aria-label={isActive ? 'Close menu' : 'Open menu'}
      aria-expanded={isActive}
      onClick={onClick}
    >
      <img
        className="header__burger-button-icon header__burger-button-icon--open"
        src="/images/svg/burger-button.png"
        alt=""
        aria-hidden="true"
        width="40"
        height="40"
      />
      <img
        className="header__burger-button-icon header__burger-button-icon--close"
        src="/images/svg/burger-button-close.svg"
        alt=""
        aria-hidden="true"
        width="40"
        height="40"
      />
    </button>
  );
});
