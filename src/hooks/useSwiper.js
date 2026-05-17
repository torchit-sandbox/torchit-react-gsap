import { useEffect, useRef, useState } from 'react';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

function getSlidesPerView(swiper) {
  const slidesPerView = swiper?.params?.slidesPerView;

  if (typeof slidesPerView === 'number') {
    return slidesPerView;
  }

  return 1;
}

function calculateProgress(swiper) {
  const totalSlides = swiper?.slides?.length ?? 0;

  if (totalSlides <= 0) {
    return 0;
  }

  const slidesPerView = Math.min(getSlidesPerView(swiper), totalSlides);
  const lastReachableIndex = Math.max(0, totalSlides - slidesPerView);
  const activeIndex = Math.min(swiper.activeIndex ?? 0, lastReachableIndex);

  if (lastReachableIndex === 0) {
    return 100;
  }

  return Math.min(
    100,
    Math.max(0, Math.round(((activeIndex + slidesPerView) / totalSlides) * 100)),
  );
}

export function useSwiper({ prevSelector, nextSelector, breakpoints } = {}) {
  const swiperRef = useRef(null);
  const instanceRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!swiperRef.current) return;

    const updateProgress = (swiper) => {
      setProgress(calculateProgress(swiper));
    };

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
        768: { slidesPerView: 2, slidesPerGroup: 1, spaceBetween: 24 },
        1199: { slidesPerView: 3, slidesPerGroup: 1, spaceBetween: 24 },
      },
      on: {
        init: updateProgress,
        slideChange: updateProgress,
        resize: updateProgress,
        breakpoint: updateProgress,
      },
    });

    return () => {
      instanceRef.current?.destroy?.();
    };
  }, [prevSelector, nextSelector, breakpoints]);

  return { swiperRef, progress };
}
