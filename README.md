# TorchIT — React + GSAP

## Why Webpack instead of Vite?

Vite uses Rollup under the hood, which ships **native platform binaries**
(`rollup-darwin-arm64`, `rollup-linux-x64-gnu`, etc.). On macOS these binaries
are sometimes **flagged as viruses** by antivirus software (false positive, but
still blocks the install).

This project uses **Webpack 5** instead — 100% JavaScript, zero native
binaries, no antivirus false positives on any platform.

## Getting Started

```bash
npm install
npm run dev      # http://localhost:3000  (hot reload)
npm run build    # production build → /dist
```

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI |
| Webpack 5 | Bundler (pure JS, no native binaries) |
| Babel | JSX + modern JS transpilation |
| GSAP 3 | Component and interaction animations |
| Swiper 11 | Services carousel |
| CSS keyframes | Partners logo marquee |

## Animation System

| Component | What animates |
|-----------|--------------|
| Header | Slides down on load; nav links stagger in; mobile menu slides from right |
| Hero | Title → subtitle → buttons → tabs cascade in sequence |
| HeroSlide | Ken Burns cross-fade: scale 1.06→1 + opacity on slide change |
| About | Scroll-triggered: title up, text from left, image from right, gallery stagger |
| AboutContentTop | Click expand: preview fades out, video scales in (and back) |
| AboutContentMedium | "Read more" reveals paragraphs with stagger |
| Services | Cards stagger up; slider buttons slide from sides |
| ServiceCard | Hover: card lifts + image zooms; mouse leave reverses |
| Process | Board columns cascade; task cards stagger within |
| TaskCard | Hover: lift + number badge bounces |
| Reviews | Cards slide in from right on scroll |
| ReviewCard | Hover lift; click pulses quote icon |
| Partners | CSS marquee with duplicated logo groups for seamless motion |
| Footer | Logo → contacts → menu → copyright stagger on scroll |
| SliderButton | Press/release spring: scale down + back.out on release |

## Partner Logos

Partner/client logos are managed from the `PARTNERS` data source. Add each real logo once in data. The Partners component duplicates the source list at render time to create a seamless marquee loop.
