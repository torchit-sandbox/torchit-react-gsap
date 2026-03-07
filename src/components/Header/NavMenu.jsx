import { NAV_LINKS } from '../../data';

export function NavMenu({ isOpen, onContactClick }) {
  return (
    <dialog className="header__overlay-menu-dialog container" open={isOpen}>
      <nav className="header__menu" role="navigation" aria-label="Main menu">
        <ul className="header__menu-list">
          {NAV_LINKS.map((link) => (
            <li key={link} className="header__menu-item">
              <a className="header__menu-link" href="/">
                {link}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <button
        className="header__button button button--white"
        type="button"
        onClick={onContactClick}
      >
        Contact us
      </button>
    </dialog>
  );
}
