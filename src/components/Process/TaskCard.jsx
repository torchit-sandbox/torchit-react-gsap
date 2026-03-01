import { useRef } from 'react';
import { gsap } from 'gsap';

export function TaskCard({ number, title, description }) {
  const cardRef = useRef(null);

  const onMouseEnter = () => {
    gsap.to(cardRef.current, {
      y: -3,
      duration: 0.25,
      ease: 'power1.out',
    });
    gsap.to(cardRef.current.querySelector('.task-card__number'), {
      scale: 1.1,
      duration: 0.25,
      ease: 'back.out(2)',
    });
  };

  const onMouseLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      duration: 0.3,
      ease: 'power1.inOut',
    });
    gsap.to(cardRef.current.querySelector('.task-card__number'), {
      scale: 1,
      duration: 0.25,
      ease: 'power1.inOut',
    });
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData('taskNumber', number);
    e.dataTransfer.effectAllowed = 'move';
    gsap.to(cardRef.current, { opacity: 0.5, scale: 0.97, duration: 0.1 });
  };

  const handleDragEnd = () => {
    gsap.to(cardRef.current, { opacity: 1, scale: 1, duration: 0.2 });
  };

  return (
    <article
      ref={cardRef}
      className="task-card"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <header className="task-card__header">
        <span className="task-card__number">{number}</span>
        <h4 className="task-card__title">{title}</h4>
      </header>
      <div className="task-card__body">
        <p className="task-card__description">{description}</p>
      </div>
    </article>
  );
}
