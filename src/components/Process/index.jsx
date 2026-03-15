import {useState, useRef, useEffect} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {PROCESS_COLUMNS} from '../../data';
import {SectionHeader} from '../UI';
import {BoardColumn} from './BoardColumn';

gsap.registerPlugin(ScrollTrigger);

export function Process() {
  const [columns, setColumns] = useState(PROCESS_COLUMNS);
  const [isDirty, setIsDirty] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.from('.process .section__header-title', {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.process .section__header',
          start: 'top 85%',
          once: true
        },
      });
      gsap.from('.process .section__header-tag', {
        x: 30,
        opacity: 0,
        duration: 0.65,
        ease: 'power2.out',
        delay: 0.15,
        scrollTrigger: {
          trigger: '.process .section__header',
          start: 'top 85%',
          once: true
        },
      });

      // Reset button
      gsap.from('.process__reset', {
        y: 16,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.process__reset',
          start: 'top 90%',
          once: true
        },
      });

      // Board columns cascade in
      gsap.from('.board__column', {
        y: 80,
        opacity: 0,
        duration: 0.75,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.board__columns',
          start: 'top 85%',
          once: true
        },
      });

      // Task cards stagger within columns
      gsap.from('.board__column-item', {
        y: 30,
        opacity: 0,
        duration: 0.55,
        ease: 'power2.out',
        stagger: 0.08,
        delay: 0.35,
        scrollTrigger: {
          trigger: '.board__columns',
          start: 'top 85%',
          once: true
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleDrop = (taskNumber, targetColumnId) => {
    setColumns(prev => {
      let movedTask = null;
      const updated = prev.map(col => {
        const task = col.tasks.find(t => String(t.number) === String(taskNumber));
        if (task) movedTask = task;
        return {
          ...col,
          tasks: col.tasks.filter(t => String(t.number) !== String(taskNumber))
        };
      });

      if (!movedTask) return prev;

      return updated.map(col =>
        col.id === targetColumnId
          ? {...col, tasks: [...col.tasks, movedTask]}
          : col
      );
    });
    setIsDirty(true);
  };

  const handleReset = () => {
    setColumns(PROCESS_COLUMNS);
    setIsDirty(false);
  };

  return (
    <section
      ref={sectionRef}
      className="process container"
      aria-labelledby="process-title"
      id="process"
    >
      <SectionHeader
        id="process-title"
        title={<>Clear process.<br />Predictable results.</>}
        tag="/ Process"
      />

      <button
        className={`process__reset button button--yellow${!isDirty ? ' disabled' : ''}`}
        type="button"
        onClick={handleReset}
        disabled={!isDirty}
      >
        Reset Board
      </button>

      <ul className="board__columns">
        {columns.map((col) => (
          <BoardColumn
            key={col.id}
            id={col.id}
            title={col.title}
            tasks={col.tasks}
            onDrop={handleDrop}
          />
        ))}
      </ul>
    </section>
  );
}
