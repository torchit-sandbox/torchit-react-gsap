import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ABOUT_INTRO } from '../../data';

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconPlay = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><polygon points="5,3 19,12 5,21" /></svg>
);
const IconPause = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <rect x="5" y="3" width="4" height="18" rx="1" /><rect x="15" y="3" width="4" height="18" rx="1" />
  </svg>
);
const IconRewind = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
    <text x="12" y="14.5" textAnchor="middle" fontSize="5" fontWeight="bold" fontFamily="monospace">15</text>
  </svg>
);
const IconForward = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M12 5V1l5 5-5 5V7c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h2c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8z" />
    <text x="12" y="14.5" textAnchor="middle" fontSize="5" fontWeight="bold" fontFamily="monospace">15</text>
  </svg>
);
const IconVolumeFull = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
  </svg>
);
const IconVolumeMute = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
  </svg>
);
const IconFullscreen = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
  </svg>
);
const IconExitFullscreen = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
  </svg>
);
// Стрелка-сворачиватель (↙ к превью)
const IconCollapse = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmt = (s) => {
  if (!s || isNaN(s)) return '00:00';
  const m = Math.floor(s / 60).toString().padStart(2, '0');
  const sec = Math.floor(s % 60).toString().padStart(2, '0');
  return `${m}:${sec}`;
};

// ─── VideoPlayer ──────────────────────────────────────────────────────────────
function VideoPlayer({ isVisible, onCollapse }) {
  const mediaRef = useRef(null);
  const containerRef = useRef(null);
  const progressRef = useRef(null);
  const volumeRef = useRef(null);
  const hideTimer = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [buffered, setBuffered] = useState(0);

  // Pause when hidden
  useEffect(() => {
    if (!isVisible && mediaRef.current) {
      mediaRef.current.pause();
      setPlaying(false);
    }
  }, [isVisible]);

  useEffect(() => {
    const onFSChange = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFSChange);
    return () => document.removeEventListener('fullscreenchange', onFSChange);
  }, []);

  const showControlsTemporarily = useCallback(() => {
    setShowControls(true);
    clearTimeout(hideTimer.current);
    if (playing) {
      hideTimer.current = setTimeout(() => setShowControls(false), 3000);
    }
  }, [playing]);

  useEffect(() => {
    if (!playing) setShowControls(true);
    else showControlsTemporarily();
    return () => clearTimeout(hideTimer.current);
  }, [playing, showControlsTemporarily]);

  const togglePlay = () => {
    const v = mediaRef.current;
    if (!v) return;
    playing ? v.pause() : v.play();
    setPlaying(!playing);
  };

  const skip = (sec) => {
    const v = mediaRef.current;
    if (!v) return;
    v.currentTime = Math.max(0, Math.min(v.duration, v.currentTime + sec));
  };

  const handleTimeUpdate = () => {
    const v = mediaRef.current;
    if (!v) return;
    setCurrentTime(v.currentTime);
    if (v.buffered.length) setBuffered(v.buffered.end(v.buffered.length - 1));
  };

  const handleSeek = (e) => {
    if (!progressRef.current || !duration) return;
    const rect = progressRef.current.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    mediaRef.current.currentTime = ratio * duration;
  };

  const handleVolumeClick = (e) => {
    if (!volumeRef.current) return;
    const rect = volumeRef.current.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    setVolume(ratio);
    mediaRef.current.volume = ratio;
    setMuted(ratio === 0);
  };

  const toggleMute = () => {
    const v = mediaRef.current;
    if (!v) return;
    v.muted = !muted;
    setMuted(!muted);
  };

  const toggleFullscreen = () => {
    if (!fullscreen) containerRef.current?.requestFullscreen?.();
    else document.exitFullscreen?.();
  };

  const pct = duration ? (currentTime / duration) * 100 : 0;
  const bufPct = duration ? (buffered / duration) * 100 : 0;
  const volPct = muted ? 0 : volume * 100;

  return (
    <div
      ref={containerRef}
      className="video-player"
      style={{ cursor: showControls ? 'default' : 'none' }}
      onMouseMove={showControlsTemporarily}
    >
      <video
        ref={mediaRef}
        className="video-player__media"
        src="/video.mp4"
        onClick={(e) => { e.stopPropagation(); togglePlay(); }}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => setDuration(mediaRef.current.duration)}
        onEnded={() => setPlaying(false)}
        preload="metadata"
        playsInline
      />

      {/* Клик по пустому месту закрывает плеер — но не в фуллскрине */}
      <div
        className="video-player__overlay"
        onClick={!fullscreen ? onCollapse : undefined}
        style={{ cursor: !fullscreen ? 'pointer' : 'default' }}
      />

      {/*
        ── Кнопка закрытия — правый верхний угол ──────────────────────────────
        Показывается/скрывается вместе с остальными контролами.
        Вызывает onCollapse → тот же onVideoClick из родителя →
        GSAP прячет плеер и показывает превью.
      */}
      <button
        className="video-player__close-btn"
        style={{ opacity: showControls ? 1 : 0 }}
        onClick={(e) => { e.stopPropagation(); onCollapse(); }}
        title="Свернуть"
      >
        <IconCollapse />
      </button>

      {/* ── Нижние контролы ──────────────────────────────────────────────── */}
      <div className="video-player__controls" style={{ opacity: showControls ? 1 : 0 }} onClick={(e) => e.stopPropagation()}>
        <div className="video-player__top-row">
          <span className="video-player__title">TorchIT Presentation Showreel</span>
          <span className="video-player__time">{fmt(currentTime)} / {fmt(duration)}</span>
        </div>

        <div ref={progressRef} className="video-player__progress" onClick={handleSeek}>
          <div className="video-player__progress-buf" style={{ width: `${bufPct}%` }} />
          <div className="video-player__progress-fill" style={{ width: `${pct}%` }} />
          <div className="video-player__progress-thumb" style={{ left: `${pct}%` }} />
        </div>

        <div className="video-player__btn-row">
          <div className="video-player__btn-group">
            <button className="video-player__btn" onClick={togglePlay}>
              {playing ? <IconPause /> : <IconPlay />}
            </button>
            <button className="video-player__btn" onClick={() => skip(-15)}><IconRewind /></button>
            <button className="video-player__btn" onClick={() => skip(15)}><IconForward /></button>
            <button className="video-player__btn" onClick={toggleMute}>
              {muted || volume === 0 ? <IconVolumeMute /> : <IconVolumeFull />}
            </button>
            <div ref={volumeRef} className="video-player__volume" onClick={handleVolumeClick}>
              <div className="video-player__volume-fill" style={{ width: `${volPct}%` }} />
            </div>
          </div>

          <div className="video-player__btn-group">
            <button className="video-player__btn" onClick={toggleFullscreen}>
              {fullscreen ? <IconExitFullscreen /> : <IconFullscreen />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── AboutContentTop ──────────────────────────────────────────────────────────
export function AboutContentTop({ isExpanded, onPreviewClick, onVideoClick }) {
  const previewRef = useRef(null);
  const videoRef = useRef(null);
  const prevExpanded = useRef(false);

  useEffect(() => {
    if (isExpanded === prevExpanded.current) return;
    prevExpanded.current = isExpanded;

    const duration = 0.4;

    if (isExpanded) {
      gsap.to(previewRef.current, { autoAlpha: 0, duration });
      gsap.to(videoRef.current, { autoAlpha: 1, duration });
    } else {
      gsap.to(videoRef.current, { autoAlpha: 0, duration });
      gsap.to(previewRef.current, { autoAlpha: 1, duration });
    }
  }, [isExpanded]);

  return (
    <div className={`about-us__content about-us__content--top${isExpanded ? ' expanded' : ''}`}>
      <div className="about-us__content-info">
        <p>{ABOUT_INTRO}</p>
      </div>

      {/* Превью — видно когда свёрнуто */}
      <img
        ref={previewRef}
        className="about-us__content-preview"
        src="/images/about-us/video.jpg"
        alt="Preview — click to expand"
        width="742"
        height="271"
        loading="eager"
        onClick={onPreviewClick}
        style={{ cursor: 'pointer' }}
      />

      {/* Плеер — видно когда развёрнуто */}
      <div
        ref={videoRef}
        className="about-us__content-video"
        style={{ opacity: 0, visibility: 'hidden' }}
      >
        {/*
          onCollapse = onVideoClick — тот же колбэк что управляет isExpanded в родителе.
          Когда юзер жмёт ✕, родитель переключает isExpanded → false →
          useEffect выше запускает GSAP: плеер скрывается, превью появляется.
        */}
        <VideoPlayer isVisible={isExpanded} onCollapse={onVideoClick} />
      </div>
    </div>
  );
}