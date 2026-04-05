import { NAV_LINKS } from '../../data';

export function NavMenu({ isOpen, showLinks = true, onContactClick, onClose }) {
  const shouldRenderLinks = showLinks || isOpen;

  const handleLinkClick = () => {
    if (isOpen) {
      onClose();
    }
  };

  return (
    <dialog className="header__overlay-menu-dialog container" open={isOpen}>
      {shouldRenderLinks && (
        <nav className="header__menu" role="navigation" aria-label="Main menu">
          <ul className="header__menu-list">
            {NAV_LINKS.map(({name, href}) => (
              <li key={name} className="header__menu-item">
                <a className="header__menu-link" href={href} onClick={handleLinkClick}>
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
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
