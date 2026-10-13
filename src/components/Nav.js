import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import LogoMark from "./LogoMark"
import ThemeToggle from "./ThemeToggle"
import { bp } from "./ui"

export const navLinks = [
  { label: "Research", to: "/research/" },
  { label: "Work", to: "/projects/" },
  { label: "Experience", to: "/experience/" },
  { label: "About", to: "/about/" },
  { label: "Contact", to: "/contact/" },
]

const Bar = styled.header`
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 50;
  height: var(--nav-h);
  transition:
    background-color 0.4s var(--ease),
    border-color 0.4s var(--ease),
    backdrop-filter 0.4s var(--ease);
  border-bottom: 1px solid transparent;

  &[data-scrolled="true"],
  &[data-open="true"] {
    background: color-mix(in srgb, var(--bg) 78%, transparent);
    backdrop-filter: saturate(140%) blur(14px);
    -webkit-backdrop-filter: saturate(140%) blur(14px);
    border-bottom-color: var(--line);
  }
`

const Inner = styled.nav`
  height: 100%;
  max-width: calc(var(--max) + var(--gutter) * 2);
  margin: 0 auto;
  padding: 0 var(--gutter);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
`

const Brand = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-family: var(--font-display);
  font-size: 21px;
  letter-spacing: -0.01em;
  color: var(--text);

  svg {
    transition: transform 0.8s var(--ease);
  }
  &:hover svg {
    transform: rotate(-12deg);
  }
`

const Links = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  gap: 4px;

  ${bp.md} {
    display: none;
  }

  a {
    display: block;
    padding: 8px 14px;
    border-radius: 999px;
    font-size: 15px;
    color: var(--text-muted);
    transition:
      color 0.3s var(--ease),
      background-color 0.3s var(--ease);

    &:hover {
      color: var(--text);
    }
    &[aria-current="page"] {
      color: var(--text);
      background: var(--surface);
    }
  }
`

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const MenuButton = styled.button`
  display: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--line);
  background: transparent;
  color: var(--text);
  cursor: pointer;
  place-items: center;

  ${bp.md} {
    display: grid;
  }

  span {
    position: relative;
    width: 16px;
    height: 10px;
  }
  span::before,
  span::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    height: 1.5px;
    background: currentColor;
    border-radius: 2px;
    transition:
      transform 0.4s var(--ease),
      top 0.4s var(--ease);
  }
  span::before {
    top: 1px;
  }
  span::after {
    top: 7.5px;
  }
  &[aria-expanded="true"] span::before {
    top: 4.25px;
    transform: rotate(45deg);
  }
  &[aria-expanded="true"] span::after {
    top: 4.25px;
    transform: rotate(-45deg);
  }
`

const Sheet = styled.div`
  position: fixed;
  inset: var(--nav-h) 0 0 0;
  z-index: 49;
  background: var(--bg);
  padding: 32px var(--gutter);
  display: none;

  ${bp.md} {
    display: block;
  }

  visibility: hidden;
  opacity: 0;
  transform: translateY(-8px);
  /* Exits are quicker than entrances. */
  transition:
    opacity 0.2s var(--ease),
    transform 0.2s var(--ease),
    visibility 0s linear 0.2s;

  &[data-open="true"] {
    visibility: visible;
    opacity: 1;
    transform: none;
    transition:
      opacity 0.35s var(--ease),
      transform 0.35s var(--ease);
  }

  ul {
    list-style: none;
    display: grid;
  }
  a {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 18px 0;
    border-bottom: 1px solid var(--line);
    font-family: var(--font-display);
    font-size: 34px;
    color: var(--text);
  }
  a[aria-current="page"] {
    color: var(--accent);
  }
  small {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--text-faint);
  }
`

const SkipLink = styled.a`
  position: fixed;
  top: 12px;
  left: 12px;
  z-index: 100;
  padding: 10px 16px;
  border-radius: 999px;
  background: var(--text);
  color: var(--bg);
  font-weight: 500;
  transform: translateY(-160%);
  transition: transform 0.3s var(--ease);

  &:focus {
    transform: none;
  }
`

const Nav = ({ pathname }) => {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const buttonRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return undefined
    document.body.style.overflow = "hidden"
    const onKey = e => {
      if (e.key === "Escape") {
        setOpen(false)
        buttonRef.current && buttonRef.current.focus()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <>
      <SkipLink href="#main">Skip to content</SkipLink>
      <Bar data-scrolled={scrolled} data-open={open}>
        <Inner aria-label="Main">
          <Brand to="/" aria-label="Hari Bhandari, home">
            <LogoMark size={26} />
            <span>Hari Bhandari</span>
          </Brand>
          <Links>
            {navLinks.map(link => (
              <li key={link.to}>
                <Link to={link.to} partiallyActive>
                  {link.label}
                </Link>
              </li>
            ))}
          </Links>
          <Actions>
            <ThemeToggle />
            <MenuButton
              ref={buttonRef}
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen(o => !o)}
            >
              <span />
            </MenuButton>
          </Actions>
        </Inner>
      </Bar>
      <Sheet id="mobile-menu" data-open={open} aria-hidden={!open} inert={open ? undefined : ""}>
        <ul>
          {navLinks.map((link, i) => (
            <li key={link.to}>
              <Link to={link.to} partiallyActive tabIndex={open ? 0 : -1}>
                {link.label}
                <small>0{i + 1}</small>
              </Link>
            </li>
          ))}
        </ul>
      </Sheet>
    </>
  )
}

export default Nav
