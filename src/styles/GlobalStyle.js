import React from 'react'
import { theme, media } from '../styles'
import {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`
      :root {
    --dark-navy: #020c1b;
    --navy: #0a192f;
    --light-navy: #172a45;
    --lightest-navy: #303C55;
    --navy-shadow: rgba(2, 12, 27, 0.7);
    --slate: #8892b0;
    --light-slate: #a8b2d1;
    --lightest-slate: #ccd6f6;
    --white: #e6f1ff;
    --green: #64ffda;
    --green-tint: rgba(100, 255, 218, 0.1);

    --font-sans: 'Calibre', 'San Francisco', 'SF Pro Text', -apple-system, system-ui, sans-serif;
    --font-mono: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;

    --fz-xxs: 12px;
    --fz-xs: 13px;
    --fz-sm: 14px;
    --fz-md: 16px;
    --fz-lg: 18px;
    --fz-xl: 20px;
    --fz-xxl: 22px;
    --fz-heading: 32px;

    --border-radius: 4px;
    --nav-height: 100px;
    --nav-scroll-height: 70px;

    --tab-height: 42px;
    --tab-width: 120px;

    --easing: cubic-bezier(0.645, 0.045, 0.355, 1);
    --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

    --hamburger-width: 30px;

    --ham-before: top 0.1s ease-in 0.25s, opacity 0.1s ease-in;
    --ham-before-active: top 0.1s ease-out, opacity 0.1s ease-out 0.12s;
    --ham-after: bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    --ham-after-active: bottom 0.1s ease-out, transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s;
  }
      html {
        background-color: ${theme.colors.darkBlue};
      }
        
  body {
    margin: 0;
    width: 100%;
    min-height: 100%;
    overflow-x: hidden;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    color: var(--slate);
    font-family: 'Calibre', 'San Francisco', 'SF Pro Text', -apple-system, system-ui, sans-serif;
    font-size: var(--fz-xl);
    line-height: 1.3;

    @media (max-width: 480px) {
      font-size: var(--fz-lg);
    }

    &.hidden {
      overflow: hidden;
    }

    &.blur {
      overflow: hidden;

      header {
        background-color: transparent;
      }

      #content > * {
        filter: blur(5px) brightness(0.7);
        transition: var(--transition);
        pointer-events: none;
        user-select: none;
      }
    }
  }


      h1 {
        font-size: 70px;
        line-height: 72px;
        color: ${theme.colors.light};
        font-family: ${theme.fonts.Raleway};
        margin-bottom: 30px;
        text-align: left;
        font-weight: 600;

        ${media.medium} {
          font-size: 54px;
          line-height: 56px;
        }

        ${media.small} {
          font-size: 40px;
          line-height: 42px;
        }
      }
        .numbered-heading {
    display: flex;
    align-items: center;
    position: relative;
    margin: 10px 0 40px;
    width: 100%;
    font-size: clamp(26px, 5vw, var(--fz-heading));
    white-space: nowrap;

    &:before {
      position: relative;
      bottom: 4px;
      counter-increment: section;
      content: '0' counter(section) '.';
      margin-right: 10px;
      color: var(--green);
      font-family: var(--font-mono);
      font-size: clamp(var(--fz-md), 3vw, var(--fz-xl));
      font-weight: 400;

      @media (max-width: 480px) {
        margin-bottom: -3px;
        margin-right: 5px;
      }
    }

    &:after {
      content: '';
      display: block;
      position: relative;
      top: -5px;
      width: 300px;
      height: 1px;
      margin-left: 20px;
      background-color: var(--lightest-navy);

      @media (max-width: 1080px) {
        width: 200px;
      }
      @media (max-width: 768px) {
        width: 100%;
      }
      @media (max-width: 600px) {
        margin-left: 10px;
      }
    }
  }
  p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
}
    section {
    margin: 0 auto;
    padding: 100px 20px;
    max-width: 1000px;

    @media (max-width: 768px) {
      padding: 80px 20px;
    }

    @media (max-width: 480px) {
      padding: 60px 20px;
    }
  }

      h2 {
        font-size: 52px;
        line-height: 54px;
        margin-bottom: 15px;
        text-align: left;
        font-weight: 600;
        color: ${theme.colors.light};
        font-family: ${theme.fonts.Raleway};

        ${media.medium} {
          font-size: 42px;
          line-height: 44px;
          text-align: left;
        }

        ${media.small} {
          font-size: 32px;
          line-height: 34px;
        }

      }

      h3 {
        font-size: 36px;
        line-height: 38px;
        margin-bottom: 15px;
        font-weight: 400;
        color: ${theme.colors.gray};
        font-family: ${theme.fonts.Roboto};

        ${media.medium} {
          font-size: 32px;
          line-height: 34px;
        }

        ${media.small} {
          font-size: 26px;
          line-height: 28px;
        }

        &.heavy {
          font-weight: 700;
        }

        &.white {
          color: ${theme.colors.white};
        }
      }

      h4 {
        font-size: 24px;
        line-height: 28px;
        color: ${theme.colors.darkLight};
        font-family: ${theme.fonts.Roboto};
        font-weight: 400;

        &.heavy {
          font-weight: 700;
        }
      }

      h5 {
        font-size: 18px;
        line-height: 24px;
        color: ${theme.colors.light};
        font-family: ${theme.fonts.Roboto};
        font-weight: 300;

        &.light {
          font-weight: 400;
        }
      }

      html {
        font-family: ${theme.fonts.Roboto};
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
      }

  

      * {
        box-sizing: border-box;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      p {
        margin: 0;
      }

      p {
        font-size: 16px;
        /* line-height: 24px; */
        font-family: 'Calibre', 'San Francisco', 'SF Pro Text', -apple-system, system-ui, sans-serif;

        &.legal {
          font-size: 10px;
          line-height: 12px;
          color: ${theme.colors.legalGray};
        }
      }

      a {
        text-decoration: none;
      }

      .text-center { text-align: center; }
      .margin-bottom-45 { margin-bottom: 45px; }
      .margin-bottom-25 { margin-bottom: 25px; }

   
      .text-center {
        text-align: center;
      }

      .no-margin-bottom {
        margin-bottom: 0;
      }

      .heavy {
        font-weight: 700;
      }

      .max-width-500 {
        ${media.largeUp} {
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }
      }

      .gatsby-sbs-image {
        max-width: 400px;
        margin-left: auto;
        margin-right: auto;
      }

      .gatsby-header-img {
        height: 100%;
        width: 100%;
      }

      .side-icon {
        height: 20px;
        width: 20px;
        mix-blend-mode: difference;

        path {
          fill: ${theme.colors.light};
        }

        &:hover {
          opacity: .4;

        }
      }

      .nav-icon {
        height: 22px;
        width: 22px;

        path {
          fill: ${theme.colors.dark};
        }

        &:hover {
          path {
            fill: ${theme.colors.mayerPurple};
          }
        }
      }

      .fadeup-enter {
        background-color: transparent;
        opacity: 0.01;
        transform: translateY(20px);
        transition: opacity 300ms ${theme.easing}, transform 300ms ${theme.easing};
      }

      .fadeup-enter-active {
        background-color: transparent;
        opacity: 1;
        transform: translateY(0px);
        transition: opacity 300ms ${theme.easing}, transform 300ms ${theme.easing};
      }

      .fadedown-enter {
        background-color: transparent;
        opacity: 0.01;
        transform: translateY(-20px);
        transition: opacity 300ms ${theme.easing}, transform 300ms ${theme.easing};
      }

      .fadedown-enter-active {
        background-color: transparent;
        opacity: 1;
        transform: translateY(0px);
        transition: opacity 300ms ${theme.easing}, transform 300ms ${theme.easing};
      }

      .fade-enter {
        background-color: transparent;
        opacity: 0.01;
        transition: opacity 1000ms ${theme.easing};
      }

      .fade-enter-active {
        opacity: 1;
        transition: opacity 1000ms ${theme.easing};
      }

      vertical-text-transition{
        display: inline;
        text-indent: 8px;
      }
      .vertical-text-transition span{
        animation: topToBottom 12s linear infinite 0s;
        -ms-animation: topToBottom 12s linear infinite 0s;
        -webkit-animation: topToBottom 12s linear infinite 0s;
        opacity: 0;
        overflow: hidden;
        position: absolute;
      }
      .vertical-text-transition span:nth-of-type(2){
        animation-delay: 4s;
        -ms-animation-delay: 4s;
        -webkit-animation-delay: 4s;
      }
      .vertical-text-transition span:nth-of-type(3){
        animation-delay: 8s;
        -ms-animation-delay: 8s;
        -webkit-animation-delay: 8s;
      }



      /*topToBottom Animation*/
      @-moz-keyframes topToBottom{
        0% { opacity: 0; }
        5% { opacity: 0; -moz-transform: translateY(-50px); }
        10% { opacity: 1; -moz-transform: translateY(0px); }
        25% { opacity: 1; -moz-transform: translateY(0px); }
        30% { opacity: 0; -moz-transform: translateY(50px); }
        80% { opacity: 0; }
        100% { opacity: 0; }
      }
      @-webkit-keyframes topToBottom{
        0% { opacity: 0; }
        5% { opacity: 0; -webkit-transform: translateY(-50px); }
        10% { opacity: 1; -webkit-transform: translateY(0px); }
        25% { opacity: 1; -webkit-transform: translateY(0px); }
        30% { opacity: 0; -webkit-transform: translateY(50px); }
        80% { opacity: 0; }
        100% { opacity: 0; }
      }
      @-ms-keyframes topToBottom{
        0% { opacity: 0; }
        5% { opacity: 0; -ms-transform: translateY(-50px); }
        10% { opacity: 1; -ms-transform: translateY(0px); }
        25% { opacity: 1; -ms-transform: translateY(0px); }
        30% { opacity: 0; -ms-transform: translateY(50px); }
        80% { opacity: 0; }
        100% { opacity: 0; }
      }

      .gatsby-sbs-image {
        max-width: 400px;
        margin-left: auto;
        margin-right: auto;
      }
    `


export default GlobalStyle
