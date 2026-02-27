import { useRef } from 'react';
import { gsap } from 'gsap';

export function SliderButton({ direction = 'next', onClick, className = '', ...props }) {
  const btnRef = useRef(null);

  const onMouseEnter = () => {
    gsap.to(btnRef.current, { scale: 1.12, duration: 0.2, ease: 'power1.out' });
  };
  const onMouseLeave = () => {
    gsap.to(btnRef.current, { scale: 1, duration: 0.25, ease: 'power1.inOut' });
  };
  const onMouseDown = () => {
    gsap.to(btnRef.current, { scale: 0.92, duration: 0.12, ease: 'power1.in' });
  };
  const onMouseUp = () => {
    gsap.to(btnRef.current, { scale: 1.08, duration: 0.15, ease: 'back.out(2)' });
  };

  return (
    <button
      ref={btnRef}
      className={`slider__button slider__button--${direction} ${className}`.trim()}
      type="button"
      aria-label={direction === 'next' ? 'Next slide' : 'Previous slide'}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      {...props}
    />
  );
}
