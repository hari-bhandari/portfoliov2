import React from "react"
import styled, { css } from "styled-components"
import { Link } from "gatsby"

export const bp = {
  sm: "@media (max-width: 640px)",
  md: "@media (max-width: 900px)",
  lg: "@media (min-width: 901px)",
}

export const Container = styled.div`
  width: 100%;
  max-width: calc(var(--max) + var(--gutter) * 2);
  margin: 0 auto;
  padding: 0 var(--gutter);
`

export const Section = styled.section`
  padding: clamp(72px, 11vw, 140px) 0;
  position: relative;

  & + & {
    border-top: 1px solid var(--line);
  }
`

export const Eyebrow = styled.div`
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 10px;

  &::before {
    content: "";
    width: 18px;
    height: 1px;
    background: var(--accent);
  }
`

export const Lede = styled.p`
  font-size: clamp(18px, 1.6vw, 21px);
  line-height: 1.6;
  color: var(--text-muted);
  max-width: 62ch;
`

const HeadingWrap = styled.header`
  display: grid;
  gap: 18px;
  margin-bottom: clamp(40px, 6vw, 64px);
  max-width: 760px;

  h2 {
    font-size: clamp(36px, 5vw, 60px);
  }
`

export const SectionHeading = ({ eyebrow, title, children, as = "h2", id }) => {
  const Tag = as
  return (
    <HeadingWrap data-reveal>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Tag id={id}>{title}</Tag>
      {children && <Lede>{children}</Lede>}
    </HeadingWrap>
  )
}

const buttonBase = css`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 48px;
  padding: 0 22px;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: -0.005em;
  transition:
    background-color 0.3s var(--ease),
    color 0.3s var(--ease),
    border-color 0.3s var(--ease),
    transform 0.3s var(--ease);
  white-space: nowrap;

  svg {
    transition: transform 0.4s var(--ease);
  }
  &:hover svg {
    transform: translateX(3px);
  }
`

const primary = css`
  ${buttonBase};
  background: var(--text);
  color: var(--bg);
  border: 1px solid var(--text);
  &:hover {
    background: var(--accent);
    border-color: var(--accent);
    color: var(--bg);
  }
`

const secondary = css`
  ${buttonBase};
  background: transparent;
  color: var(--text);
  border: 1px solid var(--line-strong);
  &:hover {
    border-color: var(--text);
  }
`

const isExternal = to => /^(https?:|mailto:)/.test(to) || /\.pdf$/.test(to)

const StyledInternal = styled(Link)`
  ${p => (p.$variant === "secondary" ? secondary : primary)}
`
const StyledExternal = styled.a`
  ${p => (p.$variant === "secondary" ? secondary : primary)}
`

export const Button = ({ to, variant = "primary", children, ...rest }) =>
  to.startsWith("#") ? (
    <StyledExternal href={to} $variant={variant} {...rest}>
      {children}
    </StyledExternal>
  ) : isExternal(to) ? (
    <StyledExternal href={to} $variant={variant} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </StyledExternal>
  ) : (
    <StyledInternal to={to} $variant={variant} {...rest}>
      {children}
    </StyledInternal>
  )

export const Arrow = ({ dir = "right", size = 16 }) => {
  const rotate = { right: 0, down: 90, left: 180, up: -90, upRight: -45 }[dir]
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const TextLinkStyled = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  color: var(--text);
  border-bottom: 1px solid var(--line-strong);
  padding-bottom: 2px;
  transition:
    border-color 0.3s var(--ease),
    color 0.3s var(--ease);
  &:hover {
    color: var(--accent);
    border-color: var(--accent);
  }
  svg {
    transition: transform 0.4s var(--ease);
  }
  &:hover svg {
    transform: translateX(3px);
  }
`

export const TextLink = ({ to, children, ...rest }) => (
  <TextLinkStyled to={to} {...rest}>
    {children} <Arrow size={14} />
  </TextLinkStyled>
)

export const ExternalLink = styled.a.attrs({ target: "_blank", rel: "noopener noreferrer" })`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--text);
  font-weight: 500;
  border-bottom: 1px solid var(--line-strong);
  padding-bottom: 1px;
  transition:
    color 0.3s var(--ease),
    border-color 0.3s var(--ease);
  &:hover {
    color: var(--accent);
    border-color: var(--accent);
  }
`

export const Tags = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`

export const Tag = styled.li`
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: 1;
  padding: 7px 10px;
  border-radius: 999px;
  border: 1px solid var(--line);
  color: var(--text-muted);
  background: var(--bg-soft);
`

const StatusWrap = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-muted);
  white-space: nowrap;

  &::before {
    content: "";
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${p => (p.$kind === "live" ? "var(--live)" : p.$kind === "building" ? "var(--building)" : "var(--text-faint)")};
  }
`

export const Status = ({ kind, children }) => <StatusWrap $kind={kind}>{children}</StatusWrap>

export const Prose = styled.div`
  display: grid;
  gap: 1.1em;
  color: var(--text-muted);
  font-size: 18px;
  line-height: 1.7;
  max-width: 64ch;

  p:first-child {
    color: var(--text);
  }
`

export const PageHero = styled.header`
  padding: calc(var(--nav-h) + clamp(56px, 10vw, 120px)) 0 clamp(48px, 7vw, 88px);
  border-bottom: 1px solid var(--line);

  h1 {
    font-size: clamp(44px, 7vw, 88px);
    margin: 20px 0 24px;
    max-width: 16ch;
  }
`
