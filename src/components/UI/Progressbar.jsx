export function Progressbar({ value = 0 }) {
  return (
    <div
      className="progressbar"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin="0"
      aria-valuemax="100"
      aria-label="Slider progress"
    >
      <div className="progressbar__track">
        <div
          className="progressbar__fill swiper-progressbar-fill"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
