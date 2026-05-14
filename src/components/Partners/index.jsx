import { PARTNERS } from '../../data';

export function Partners() {
  const logos = [...PARTNERS, ...PARTNERS];

  return (
    <section
      className="partners"
      id="partners"
    >
      <div className="partners-slider">
        <div className="partners-slider-track">
          {logos.map(({ id, image }, index) => (
            <div
              key={`${id}-${index}`}
              className="partners-slider-item"
              aria-hidden={index >= PARTNERS.length ? 'true' : undefined}
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
      </div>
    </section>
  );
}
