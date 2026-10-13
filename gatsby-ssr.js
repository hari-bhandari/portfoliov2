import React from "react"

export { wrapPageElement } from "./src/wrap-page"

// Applies the saved or system theme before first paint, so there is no flash of the wrong theme.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}})();`

export const onRenderBody = ({ setHtmlAttributes, setPreBodyComponents, setHeadComponents }) => {
  setHtmlAttributes({ lang: "en-GB" })
  setHeadComponents([
    <meta key="color-scheme" name="color-scheme" content="dark light" />,
    // The display serif and body sans are above the fold on every page; fetch them before CSS asks.
    ...["newsreader-latin-wght-normal", "inter-latin-wght-normal"].map(name => (
      <link
        key={name}
        rel="preload"
        href={`/fonts/${name}.woff2`}
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
    )),
  ])
  setPreBodyComponents([<script key="theme" dangerouslySetInnerHTML={{ __html: themeScript }} />])
}
