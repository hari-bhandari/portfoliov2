import media from "../../styles/media";
import theme from "../../styles/theme";
import styled from 'styled-components'
export const Nav = styled.nav`
  position: relative;
  display: flex;
  justify-content: space-between;
  justify-items: center;
  align-items: center;
  height: 80px;
  width: 100%;
  padding-left: 40px;
  padding-right: 40px;
  top: 0px;

  ${media.medium} {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`

export const NavContainer = styled.div`
  position: fixed;
  width: 100%;
  z-index: 100;
  transition: ${theme.transition};
  box-shadow: ${theme.boxShadow};

  &.not-mounted {
    transform: translateY(-70px);
  }

  &.scrolled {
    background-color: ${theme.colors.navbar};
  }

  &.top {
    background-color: transparent;
    box-shadow: none;
  }
`

export const NavLogo = styled.img`
  height: 50px;
  width: 50px;
`

export const MobileNavContainer = styled.div`
  position: fixed;

  &.closed {
    visibility: hidden;
  }
`

export const MobileNavOverlay = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  background-color: rgba(0,0,0,0.3);
  opacity: 0;
  z-index: -1;
  transition: ${theme.transition};
  transition-delay: .3s;

  &.open {
    opacity: 1;
    transition-delay: 0s;
  }

`

export const MobileNav = styled.div`
  max-height: 500px;
  width: 100vw;
  transform: translateY(-100vh);
  background-color: ${theme.colors.navbar};
  padding: 100px 4rem;
  opacity: 1;
  z-index: 10000;
  transition: ${theme.transition};
  box-shadow: ${theme.boxShadow};
  transition-delay: .4s;

  &.open {
    transform: translateY(0);
    transition-delay: 0s;

    .nav-link {
      opacity: 1;
    }
  }

  ${media.medium} {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .nav-link {
    color: white;
    text-shadow: -1px -1px 0 ${theme.colors.dark}, 1px -1px 0 ${theme.colors.dark}, -1px 1px 0 ${theme.colors.dark}, 1px 1px 0 ${theme.colors.dark};
    font-size: 44px;
    margin-top: 15px;
    transition: opacity ${theme.specificTransition};
    opacity: 0;
    font-weight: 600;

    ${media.medium} {
      font-size: 36px;
    }

    &:hover {
      color: ${theme.colors.yellow};
      cursor: pointer;
    }
  }
`

export const NavLinks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`
export const SocialLinks = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 25px;
  opacity: 0;
  transition: opacity ${theme.specificTransition};

  ${media.largeUp} {
    justify-content: flex-end;
  }

  ${media.small} {
    justify-content: center;
    margin-top: 50px;
  }

  &.open {
    opacity: 1;
  }

  a {
    margin-right: 20px;
    color: ${theme.colors.mayerPurple};
    font-weight: 600;
    font-size: 18px;

    &:last-of-type {
      margin-right: 0;
    }
  }
`

export const NavButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 30px;
  width: 30px;

  > div {
    transition: background-color ${theme.specificTransition} .3s, width ${theme.specificTransition} 0s, transform ${theme.specificTransition};
    background-color: ${theme.colors.navbar};

    &:first-of-type {
      width: 100%;
      height: 2px;
      margin-bottom: 10px;
    }

    &:nth-of-type(2) {
      width: 50%;
      height: 2px;
      align-self: flex-end;

    }
  }

  &:hover {
    cursor: pointer;
    > div {
      &:first-of-type {
        align-self: flex-start;
        width: 50%;
      }

      &:nth-of-type(2) {
        width: 100%;
      }
    }
  }

  &.scrolled,
  &.open {
    > div {
      background-color: ${theme.colors.dark};
      transition-delay: 0s;
    }
  }

  &.open {
    > div {
      transition: background-color ${theme.specificTransition} 0s, width ${theme.specificTransition} 0s, transform ${theme.specificTransition} .2s;

      &:first-of-type {
        transform: translateY(6px) rotate(45deg);
        width: 100%;
      }

      &:nth-of-type(2) {
        transform: translateY(-6px) rotate(-45deg);
        width: 100%;
      }
    }
  }
`