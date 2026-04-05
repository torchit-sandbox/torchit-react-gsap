export function HeroTabs({ tabs, current, progress, onTabClick, onHover }) {
  const handleAnchorClick = (e, anchor) => {
    e.stopPropagation();
    if (!anchor) return;

    const id = anchor.startsWith('#') ? anchor.slice(1) : anchor;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    window.location.hash = anchor;
  };

  return (
    <ul className="hero__tabs-list">
      {tabs.map((tab, i) => (
        <li
          key={tab.id}
          className={`hero__tabs-item glass-effect h4${i === current ? ' active' : ''}`}
          style={
            i === current
              ? {
                  backgroundImage: `linear-gradient(to right, rgba(255,255,255,1) ${progress}%, transparent ${progress}%)`,
                }
              : { backgroundImage: 'none' }
          }
          onClick={() => onTabClick(i)}
          onMouseEnter={() => onHover(true)}
          onMouseLeave={() => onHover(false)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onTabClick(i)}
          aria-current={i === current ? 'true' : undefined}
        >
          <span>
            {tab.tab}
            <a
              href={tab.anchor}
              className="hero__tabs-item-link"
              onClick={(e) => handleAnchorClick(e, tab.anchor)}
              aria-label={`Go to ${tab.tab} section`}
            />
          </span>
        </li>
      ))}
    </ul>
  );
}
