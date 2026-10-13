import { useEffect, useRef, useState } from "react"

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

export const useReducedMotion = () => {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])
  return reduced
}

/**
 * Reveals every [data-reveal] element on the page as it scrolls into view.
 * One shared IntersectionObserver; re-scans when the route changes.
 */
export const useRevealOnScroll = key => {
  useEffect(() => {
    const root = document.documentElement
    if (prefersReducedMotion() || !("IntersectionObserver" in window)) return undefined

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            io.unobserve(entry.target)
          }
        })
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    )

    document.querySelectorAll("[data-reveal]:not(.is-visible)").forEach(el => {
      // Anything already on screen stays visible, so server-rendered content never flashes out.
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add("is-visible")
      } else {
        io.observe(el)
      }
    })
    root.classList.add("js-reveal")
    return () => io.disconnect()
  }, [key])
}

/**
 * Subtle pointer-driven 3D tilt. Writes CSS variables only (no React re-renders),
 * and only on devices with a fine pointer and motion allowed.
 */
export const useTilt = (max = 4) => {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion() || !window.matchMedia("(pointer: fine)").matches) return undefined
    let frame = 0
    let rect = null

    const onEnter = () => {
      rect = el.getBoundingClientRect()
    }
    const onMove = e => {
      if (!rect) rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        el.style.setProperty("--rx", `${(0.5 - y) * max}deg`)
        el.style.setProperty("--ry", `${(x - 0.5) * max}deg`)
        el.style.setProperty("--mx", `${x * 100}%`)
        el.style.setProperty("--my", `${y * 100}%`)
      })
    }
    const onLeave = () => {
      cancelAnimationFrame(frame)
      rect = null
      el.style.setProperty("--rx", "0deg")
      el.style.setProperty("--ry", "0deg")
    }
    el.addEventListener("pointerenter", onEnter)
    el.addEventListener("pointermove", onMove)
    el.addEventListener("pointerleave", onLeave)
    return () => {
      cancelAnimationFrame(frame)
      el.removeEventListener("pointerenter", onEnter)
      el.removeEventListener("pointermove", onMove)
      el.removeEventListener("pointerleave", onLeave)
    }
  }, [max])
  return ref
}
