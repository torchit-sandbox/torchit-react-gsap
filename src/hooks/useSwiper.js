import { useEffect, useRef, useState } from 'react';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

export function useSwiper({ prevSelector, nextSelector, breakpoints } = {}) {
  const swiperRef = useRef(null);
  const instanceRef = useRef(null);
  const [progress, setProgress] = useState(20);

  useEffect(() => {
    if (!swiperRef.current) return;

    instanceRef.current = new Swiper(swiperRef.current, {
      modules: [Navigation],
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 16,
      grabCursor: true,
      navigation: {
        prevEl: prevSelector,
        nextEl: nextSelector,
      },
      breakpoints: breakpoints ?? {
        768: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 24 },
        1199: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 24 },
      },
      on: {
        init: (swiper) => setProgress(Math.max(20, Math.round(swiper.progress * 100))),
        slideChange: (swiper) => setProgress(Math.max(20, Math.round(swiper.progress * 100))),
      },
    });

    return () => {
      instanceRef.current?.destroy?.();
    };
  }, [prevSelector, nextSelector, breakpoints]);

  return { swiperRef, progress };
}
