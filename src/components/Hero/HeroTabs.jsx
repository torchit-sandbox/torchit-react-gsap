import { HERO_TABS } from '../../data';

export function HeroTabs({ current, progress, onTabClick }) {
  return (
    <ul className="hero__tabs-list">
      {HERO_TABS.map((tab, i) => (
        <li
          key={tab}
          className={`hero__tabs-item glass-effect h4${i === current ? ' active' : ''}`}
          style={
            i === current
              ? {
                  backgroundImage: `linear-gradient(to right, rgba(255,255,255,1) ${progress}%, transparent ${progress}%)`,
                }
              : { backgroundImage: 'none' }
          }
          onClick={() => onTabClick(i)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onTabClick(i)}
          aria-current={i === current ? 'true' : undefined}
        >
          <span>{tab}</span>
        </li>
      ))}
    </ul>
  );
}
