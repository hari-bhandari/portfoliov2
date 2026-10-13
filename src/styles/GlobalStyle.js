import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  :root {
    --font-display: "Newsreader Variable", "Iowan Old Style", Georgia, serif;
    --font-sans: "Inter Variable", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
    --font-mono: "JetBrains Mono Variable", ui-monospace, "SF Mono", Menlo, monospace;

    --max: 1200px;
    --gutter: clamp(20px, 5vw, 48px);
    --radius: 14px;
    --radius-sm: 8px;
    --nav-h: 68px;

    --ease: cubic-bezier(0.22, 1, 0.36, 1);
    --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  }

  :root,
  :root[data-theme="dark"] {
    color-scheme: dark;
    --bg: #0c0d0f;
    --bg-soft: #111215;
    --surface: #15171b;
    --surface-2: #1b1d22;
    --line: rgba(236, 235, 231, 0.09);
    --line-strong: rgba(236, 235, 231, 0.18);
    --text: #ecebe7;
    --text-muted: #a5a49e;
    --text-faint: #87867f;
    --accent: #ee8a4f;
    --accent-soft: rgba(238, 138, 79, 0.12);
    --accent-ink: #ffb088;
    --live: #7fc8a0;
    --building: #e7c26a;
    --shadow: 0 1px 0 rgba(255, 255, 255, 0.04) inset, 0 30px 60px -30px rgba(0, 0, 0, 0.6);
  }

  :root[data-theme="light"] {
    color-scheme: light;
    --bg: #f5f3ee;
    --bg-soft: #efece5;
    --surface: #fbfaf7;
    --surface-2: #f1eee8;
    --line: rgba(22, 23, 26, 0.1);
    --line-strong: rgba(22, 23, 26, 0.2);
    --text: #16171a;
    --text-muted: #55565b;
    --text-faint: #6b6b6d;
    --accent: #b8471c;
    --accent-soft: rgba(184, 71, 28, 0.09);
    --accent-ink: #9a3a14;
    --live: #2f7d55;
    --building: #8a6512;
    --shadow: 0 1px 0 rgba(255, 255, 255, 0.7) inset, 0 30px 60px -36px rgba(40, 30, 20, 0.28);
  }

  *, *::before, *::after { box-sizing: border-box; }

  html {
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
    scroll-padding-top: calc(var(--nav-h) + 24px);
  }

  @media (prefers-reduced-motion: no-preference) {
    html { scroll-behavior: smooth; }
  }

  body {
    margin: 0;
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-sans);
    font-size: 17px;
    line-height: 1.6;
    font-feature-settings: "ss01", "cv11";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    transition: background-color 0.4s var(--ease), color 0.4s var(--ease);
  }

  h1, h2, h3, h4 {
    margin: 0;
    font-weight: 400;
    color: var(--text);
    text-wrap: balance;
  }

  h1, h2 {
    font-family: var(--font-display);
    letter-spacing: -0.02em;
    line-height: 1.04;
  }

  h3, h4 {
    font-family: var(--font-sans);
    font-weight: 600;
    letter-spacing: -0.01em;
    line-height: 1.3;
  }

  p { margin: 0; text-wrap: pretty; }

  a { color: inherit; text-decoration: none; }

  ul, ol { margin: 0; padding: 0; }

  img, svg, canvas { display: block; max-width: 100%; }

  ::selection { background: var(--accent); color: var(--bg); }

  :focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
    border-radius: 4px;
  }

  .visually-hidden {
    position: absolute !important;
    width: 1px; height: 1px;
    margin: -1px; padding: 0;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
    border: 0;
  }

  /* Scroll reveal: content is visible by default and only hidden once JS has confirmed it can animate it. */
  .js-reveal [data-reveal] {
    opacity: 0;
    transform: translate3d(0, 12px, 0);
    transition:
      opacity 0.6s var(--ease) calc(var(--i, 0) * 60ms),
      transform 0.6s var(--ease) calc(var(--i, 0) * 60ms);
  }
  .js-reveal [data-reveal].is-visible {
    opacity: 1;
    transform: none;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      transition-delay: 0ms !important;
    }
    .js-reveal [data-reveal] { opacity: 1; transform: none; }
  }
`

export default GlobalStyle
