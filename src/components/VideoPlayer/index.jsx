import {useCallback, useEffect, useRef, useState} from "react";
import {
  IconForward,
  IconPause,
  IconPlay,
  IconRewind,
  IconVolumeFull,
  IconVolumeMute,
  IconFullscreen,
  IconExitFullscreen,
  IconCollapse
} from "./data";

const fmt = (s) => {
  if (!s || isNaN(s)) return '00:00';
  const m = Math.floor(s / 60).toString().padStart(2, '0');
  const sec = Math.floor(s % 60).toString().padStart(2, '0');
  return `${m}:${sec}`;
};

export function VideoPlayer({isVisible, onCollapse}) {
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
      style={{cursor: showControls ? 'default' : 'none'}}
      onMouseMove={showControlsTemporarily}
    >
      <video
        ref={mediaRef}
        className="video-player__media"
        src="/video.mp4"
        onClick={(e) => {
          e.stopPropagation();
          togglePlay();
        }}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => setDuration(mediaRef.current.duration)}
        onEnded={() => setPlaying(false)}
        preload="metadata"
        playsInline
      />

      <div className="video-player__overlay" />
      <button
        className="video-player__close-btn"
        style={{opacity: showControls ? 1 : 0}}
        onClick={(e) => {
          e.stopPropagation();
          onCollapse();
        }}
        title="Свернуть"
      >
        <IconCollapse />
      </button>

      <div
        className="video-player__controls"
        style={{opacity: showControls ? 1 : 0}}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="video-player__top-row">
          <span className="video-player__title h3">TorchIT Presentation Showreel</span>
          <span className="video-player__time">{fmt(currentTime)} / {fmt(duration)}</span>
        </div>

        <div
          ref={progressRef}
          className="video-player__progress"
          onClick={handleSeek}
        >
          <div
            className="video-player__progress-buf"
            style={{width: `${bufPct}%`}}
          />
          <div
            className="video-player__progress-fill"
            style={{width: `${pct}%`}}
          />
          <div
            className="video-player__progress-thumb"
            style={{left: `${pct}%`}}
          />
        </div>

        <div className="video-player__btn-row">
          <div className="video-player__btn-group">
            <button
              className="video-player__btn"
              onClick={togglePlay}
            >
              {playing ? <IconPause /> : <IconPlay />}
            </button>
            <button
              className="video-player__btn"
              onClick={() => skip(-15)}
            ><IconRewind /></button>
            <button
              className="video-player__btn"
              onClick={() => skip(15)}
            ><IconForward /></button>
            <button
              className="video-player__btn"
              onClick={toggleMute}
            >
              {muted || volume === 0 ? <IconVolumeMute /> : <IconVolumeFull />}
            </button>
            <div
              ref={volumeRef}
              className="video-player__volume"
              onClick={handleVolumeClick}
            >
              <div
                className="video-player__volume-fill"
                style={{width: `${volPct}%`}}
              />
            </div>
          </div>

          <div className="video-player__btn-group">
            <button
              className="video-player__btn"
              onClick={toggleFullscreen}
            >
              {fullscreen ? <IconExitFullscreen /> : <IconFullscreen />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
