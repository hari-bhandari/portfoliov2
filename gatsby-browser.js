import "./src/styles/fonts.css"

export { wrapPageElement } from "./src/wrap-page"

// Keep the browser's own scroll restoration, but land on hash targets after client-side navigation.
export const shouldUpdateScroll = ({ routerProps: { location } }) => {
  if (location.hash) {
    const el = document.getElementById(location.hash.slice(1))
    if (el) {
      el.scrollIntoView()
      return false
    }
  }
  return true
}
