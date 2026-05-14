import { PARTNERS } from '../../data';

export function Partners() {
  return (
    <section
      className="partners"
      id="partners"
    >
      <div className="partners-slider">
        <div className="partners-slider-track">
          {[0, 1].map(groupIndex => (
            <div
              key={groupIndex}
              className="partners-slider-group"
              aria-hidden={groupIndex > 0 ? 'true' : undefined}
            >
              {PARTNERS.map(({ id, image }) => (
                <div
                  key={`${id}-${groupIndex}`}
                  className="partners-slider-item"
                >
                  <img
                    src={image}
                    alt=""
                    loading="lazy"
                    draggable="false"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
