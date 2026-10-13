import React, { useEffect, useState } from "react"
import styled from "styled-components"

const Toggle = styled.button`
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  border: 1px solid var(--line);
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  transition:
    color 0.3s var(--ease),
    border-color 0.3s var(--ease);

  &:hover {
    color: var(--text);
    border-color: var(--line-strong);
  }

  svg {
    transition: transform 0.4s var(--ease);
  }
  &[data-theme="light"] svg {
    transform: rotate(180deg);
  }
`

// A half-filled disc: reads as "contrast" in either theme rather than a sun or moon.
const ThemeToggle = () => {
  const [theme, setTheme] = useState(null)

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || "dark")
  }, [])

  const next = theme === "light" ? "dark" : "light"
  const toggle = () => {
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem("theme", next)
    } catch (e) {
      // Storage can be unavailable (private mode); the choice still applies for this visit.
    }
    setTheme(next)
  }

  return (
    <Toggle
      type="button"
      onClick={toggle}
      data-theme={theme || undefined}
      aria-label={theme ? `Switch to ${next} theme` : "Switch theme"}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
        <circle cx="9" cy="9" r="7.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 1.75a7.25 7.25 0 0 1 0 14.5z" fill="currentColor" />
      </svg>
    </Toggle>
  )
}

export default ThemeToggle
