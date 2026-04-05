import { useState, useEffect, useRef, useCallback } from 'react';

const DURATION = 5000;
const STEP = 50;

export function useHeroSlider(count) {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);
  const progressRef = useRef(0);

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      progressRef.current += (STEP / DURATION) * 100;
      setProgress(progressRef.current);
      if (progressRef.current >= 100) {
        progressRef.current = 0;
        setProgress(0);
        setCurrent((c) => (c + 1) % count);
      }
    }, STEP);
  }, [count, isPaused]);

  const goTo = useCallback(
    (idx) => {
      const nextSlide = typeof idx === 'function' ? idx : () => idx;
      setCurrent((c) => {
        const resolved = nextSlide(c);
        progressRef.current = 0;
        setProgress(0);
        return resolved;
      });
      if (!isPaused) startTimer();
    },
    [startTimer, isPaused],
  );

  const next = useCallback(() => goTo((c) => (c + 1) % count), [goTo, count]);
  const prev = useCallback(() => goTo((c) => (c - 1 + count) % count), [goTo, count]);
  const jumpTo = useCallback((idx) => goTo(idx), [goTo]);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [startTimer]);

  return { current, progress, next, prev, jumpTo, setIsPaused };
}
