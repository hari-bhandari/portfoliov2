import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { useInView } from 'react-intersection-observer';

const IframeWrapper = styled.div`
  position: relative;
  overflow: hidden;
  padding-top: 56.25%;
  background-color: #000000;
  border-radius: 10px;

  ${props =>
    props.livedemo &&
    css`
      @media (max-width:768px) {
        min-height: 400px;
      }
    `}

 
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }

  .loader {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

const LoaderWrapper = styled.div`
  svg {
    position: absolute;
    top: 20%;
    left: 10%;
    transform: translate(-50%, -50%);
    width: 10%;
  }

  .paths {
    > * {
      animation-name: pathAni;
      animation-duration: 1s;
      animation-iteration-count: infinite;
      animation-timing-function: ease-in-out;
      //animation-fill-mode: alternate;
      transform-origin: 50% 50%;
      transform: scale(0.8);
    }
    path:nth-child(1) {
      animation-delay: 0.2s;
    }
    path:nth-child(2) {
      animation-delay: 0.3s;
    }
    path:nth-child(3) {
      animation-delay: 0.4s;
    }
  }

  @keyframes pathAni {
    0% {
      transform: scale(0.8);
    }
    50% {
      transform: scale(1);
    }
    100% {
      transform: scale(0.8);
    }
  }
`;
const Loader = () => {
  let maskid = `mask-${Math.random()}`;
  let paintid = `paint-${Math.random()}`;
  return (
    <LoaderWrapper>
      <svg
        width="1000"
        height="1000"
        viewBox="0 0 247 210"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >

        <g className="paths" mask={`url(#${maskid})`}>
          <path d="M434 386L348 307C338.024 316.209 320.28 341.436 312 352L392 434C401.98 424.78 425.724 396.579 434 386Z" fill="#8679F9"/>
          <path d="M545.37 457.07C578.22 457.07 607.25 475.86 624.5 504.39C641.945 462.225 650.863 417.021 650.74 371.39C650.74 360.723 650.27 350.17 649.33 339.73L545.37 457.07Z" fill="#8679F9" mask={`url(#${maskid})`}/>
          <path d="M201.52 285.74C168.67 285.74 139.64 266.96 122.39 238.42C104.961 280.585 96.0566 325.785 96.19 371.41C96.19 382.077 96.6567 392.627 97.59 403.06L201.52 285.74Z" fill="#8679F9" mask={`url(#${maskid})`}/>
          <path d="M449.57 565.19L345.4 682.75C395.862 688.457 446.865 678.625 491.59 654.57C466.25 635.1 449.57 602.31 449.57 565.19Z" fill="#8679F9" mask={`url(#${maskid})`}/>
          <path d="M297.33 177.62L401.5 60.07C351.033 54.3407 300.021 64.1732 255.3 88.25C280.64 107.71 297.32 140.51 297.33 177.62Z" fill="#8679F9" mask={`url(#${maskid})`}/>
          <path d="M731.95 200.81C750.13 180.29 751.8 146.88 734.5 125.42C716.03 102.51 684.58 101.89 665.4 123.54L198.13 650.81C179.48 671.81 179.48 705.96 198.13 726.99C207.45 737.51 219.67 742.77 231.88 742.77C244.09 742.77 256.32 737.51 265.64 726.99L454.19 514.27C461.19 506.39 472.5 506.39 479.48 514.27C482.021 517.251 483.721 520.856 484.403 524.713C485.085 528.57 484.725 532.539 483.36 536.21C478.966 548.191 477.355 561.015 478.65 573.71C482.12 608.94 507.54 637.22 538.81 640.57C581.06 645.09 616.22 605.38 612.18 557.69C609.18 522.36 584.04 493.69 552.78 489.85C541.37 488.432 529.792 490.327 519.43 495.31C512.79 498.47 505.11 496.74 500.01 490.99C496.649 487.018 494.805 481.983 494.805 476.78C494.805 471.577 496.649 466.542 500.01 462.57L731.95 200.81Z" fill="white" mask={`url(#${maskid})`}/>
          <path d="M550.36 17.66C531.88 -5.25001 500.43 -5.87001 481.25 15.81L292.72 228.54C285.72 236.42 274.41 236.42 267.43 228.54C264.89 225.558 263.193 221.953 262.512 218.096C261.832 214.239 262.194 210.27 263.56 206.6C267.946 194.621 269.553 181.801 268.26 169.11C264.8 133.88 239.39 105.6 208.12 102.24C165.86 97.71 130.69 137.43 134.73 185.12C137.73 220.45 162.87 249.12 194.13 252.96C205.54 254.378 217.118 252.483 227.48 247.5C234.13 244.34 241.8 246.07 246.9 251.82C250.261 255.792 252.105 260.827 252.105 266.03C252.105 271.233 250.261 276.268 246.9 280.24L13.98 543.1C-4.66 564.1 -4.66 598.25 13.98 619.28C23.3 629.8 35.52 635.07 47.74 635.07C59.96 635.07 72.19 629.81 81.49 619.28L547.81 93.05C565.98 72.53 567.66 39.12 550.36 17.66Z" fill="white" mask={`url(#${maskid})`}/>
        </g>
      </svg>
    </LoaderWrapper>
  );
};

const IFrame = ({ src, livedemo }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  const handleLoaded = () => {
    setIsLoading(true);
  };

  return (
    <IframeWrapper livedemo={livedemo} className="iframe-wrapper" ref={ref}>
      <iframe
        title={src}
        style={{ opacity: isLoading ? '0' : '1' }}
        src={inView ? src : undefined}
        onLoad={handleLoaded}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope"
        allowFullScreen
      />
      {isLoading && <Loader />}
    </IframeWrapper>
  );
};

IFrame.defaultProps = {
  livedemo: false,
};
IFrame.propTypes = {
  src: PropTypes.string.isRequired,
  livedemo: PropTypes.bool,
};

export default IFrame;
