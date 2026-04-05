import {useEffect, useRef} from 'react';
import {PARTNERS} from '../../data';
import {gsap} from 'gsap';

function horizontalLoop(items, config) {
  items = gsap.utils.toArray(items);
  config = config || {};
  let tl = gsap.timeline({
      repeat: config.repeat,
      paused: config.paused,
      defaults: {ease: 'none'},
      onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
    }),
    length = items.length,
    startX = items[0].offsetLeft,
    times = [],
    widths = [],
    xPercents = [],
    curIndex = 0,
    pixelsPerSecond = (config.speed || 1) * 100,
    snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1),
    totalWidth,
    curX,
    distanceToStart,
    distanceToLoop,
    item,
    i;
  gsap.set(items, {
    xPercent: (i, el) => {
      let w = (widths[i] = parseFloat(gsap.getProperty(el, 'width', 'px')));
      xPercents[i] = snap(
        (parseFloat(gsap.getProperty(el, 'x', 'px')) / w) * 100 +
        gsap.getProperty(el, 'xPercent')
      );
      return xPercents[i];
    },
  });
  gsap.set(items, {x: 0});
  totalWidth =
    items[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    items[length - 1].offsetWidth *
    gsap.getProperty(items[length - 1], 'scaleX') +
    (parseFloat(config.paddingRight) || 0);
  for (i = 0; i < length; i++) {
    item = items[i];
    curX = (xPercents[i] / 100) * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop =
      distanceToStart + widths[i] * gsap.getProperty(item, 'scaleX');
    tl.to(
      item,
      {
        xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
        duration: distanceToLoop / pixelsPerSecond,
      },
      0
    )
      .fromTo(
        item,
        {
          xPercent: snap(
            ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
          ),
        },
        {
          xPercent: xPercents[i],
          duration:
            (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false,
        },
        distanceToLoop / pixelsPerSecond
      )
      .add('label' + i, distanceToStart / pixelsPerSecond);
    times[i] = distanceToStart / pixelsPerSecond;
  }
  function toIndex(index, vars) {
    vars = vars || {};
    Math.abs(index - curIndex) > length / 2 &&
    (index += index > curIndex ? -length : length);
    let newIndex = gsap.utils.wrap(0, length, index),
      time = times[newIndex];
    if (time > tl.time() !== index > curIndex) {
      vars.modifiers = {time: gsap.utils.wrap(0, tl.duration())};
      time += tl.duration() * (index > curIndex ? 1 : -1);
    }
    curIndex = newIndex;
    vars.overwrite = true;
    return tl.tweenTo(time, vars);
  }
  tl.next = vars => toIndex(curIndex + 1, vars);
  tl.previous = vars => toIndex(curIndex - 1, vars);
  tl.current = () => curIndex;
  tl.toIndex = (index, vars) => toIndex(index, vars);
  tl.times = times;
  tl.progress(1, true).progress(0, true);
  if (config.reversed) {
    tl.vars.onReverseComplete();
    tl.reverse();
  }
  return tl;
}

export function Partners() {
  const trackRef = useRef(null);

  useEffect(() => {
    let loop;
    const handleResize = () => {
      if (loop) loop.kill();
      loop = horizontalLoop(Array.from(trackRef.current.children), {
        repeat: -1,
        speed: 0.5,
        paddingRight: 80,
      });
    };

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const images = track.querySelectorAll('img');
      let loadedCount = 0;
      let initialized = false;

      const handleInit = () => {
        loadedCount++;
        if (loadedCount >= images.length && !initialized) {
          initialized = true;
          requestAnimationFrame(() => {
            if (trackRef.current) {
              loop = horizontalLoop(Array.from(trackRef.current.children), {
                repeat: -1,
                speed: 0.5,
                paddingRight: 80,
              });
              window.addEventListener('resize', handleResize);
            }
          });
        }
      };

      if (images.length === 0) {
        handleInit();
      } else {
        images.forEach(img => {
          if (img.complete) {
            handleInit();
          } else {
            img.onload = handleInit;
            img.onerror = handleInit;
          }
        });
      }
    }, trackRef);

    return () => {
      ctx.revert();
      if (loop) loop.kill();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section
      className="partners"
      id="partners"
    >
      <div className="partners-slider">
        <div
          className="partners-slider-track"
          ref={trackRef}
        >
          {[...PARTNERS, ...PARTNERS, ...PARTNERS].map(({id, image}, index) => (
            <div
              key={`${id}-${index}`}
              className="partners-slider-item"
            >
              <img
                src={image}
                alt=""
                height="32"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}