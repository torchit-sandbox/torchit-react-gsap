import { useRef, useCallback } from 'react';

export function useDragScroll() {
  const ref = useRef(null);
  const isDragging = useRef(false);
  const dragMoved = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = useCallback((e) => {
    isDragging.current = true;
    dragMoved.current = false;
    startX.current = e.pageX - ref.current.offsetLeft;
    scrollLeft.current = ref.current.scrollLeft;
  }, []);

  const onMouseLeave = useCallback(() => {
    isDragging.current = false;
  }, []);

  const onMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const onMouseMove = useCallback((e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    if (Math.abs(x - startX.current) > 6) dragMoved.current = true;
    ref.current.scrollLeft = scrollLeft.current - (x - startX.current);
  }, []);

  return { ref, onMouseDown, onMouseLeave, onMouseUp, onMouseMove, dragMoved };
}
