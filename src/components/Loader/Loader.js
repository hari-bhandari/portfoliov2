import React, {useState, useEffect} from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import anime from 'animejs';
import {StyledContainer, StyledLogo} from "./LoaderCSS";
const Loader = ({finishLoading}) => {
    const animate = () => {
        const loader = anime.timeline({
            complete: () => finishLoading(),
        });

        loader
            .add({
                targets: '#logo path',
                delay: 300,
                duration: 1500,
                easing: 'easeInOutQuart',
                strokeDashoffset: [anime.setDashoffset, 0],
            })
            .add({
                targets: '#logo #B',
                duration: 700,
                easing: 'easeInOutQuart',
                opacity: 1,
            })
            .add({
                targets: '#logo',
                delay: 500,
                duration: 300,
                easing: 'easeInOutQuart',
                opacity: 0,
                scale: 0.1,
            })
            .add({
                targets: '.loader',
                duration: 200,
                easing: 'easeInOutQuart',
                opacity: 0,
                zIndex: -1,
            });
    };
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setIsMounted(true), 10);
        animate();
        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <StyledContainer className="loader">
            <Helmet bodyAttributes={{class: `hidden`}}/>
            <StyledLogo isMounted={isMounted}>
                <svg width="1116" height="1058" viewBox="0 0 1116 1058" fill="none" xmlns="http://www.w3.org/2000/svg" id="logo">
                    <g id="B" transform="translate(11.000000, 5.000000)">
                        <path d="M619 544L533 465C523.024 474.209 505.28 499.436 497 510L577 592C586.98 582.78 610.724 554.579 619 544Z" fill="#8679F9"/>
                        <path d="M730.37 615.07C763.22 615.07 792.25 633.86 809.5 662.39C826.945 620.225 835.863 575.021 835.74 529.39C835.74 518.723 835.27 508.17 834.33 497.73L730.37 615.07Z" fill="#8679F9"/>
                        <path d="M386.52 443.74C353.67 443.74 324.64 424.96 307.39 396.42C289.961 438.585 281.057 483.785 281.19 529.41C281.19 540.077 281.657 550.627 282.59 561.06L386.52 443.74Z" fill="#8679F9"/>
                        <path d="M634.57 723.19L530.4 840.75C580.862 846.457 631.865 836.625 676.59 812.57C651.25 793.1 634.57 760.31 634.57 723.19Z" fill="#8679F9"/>
                        <path d="M482.33 335.62L586.5 218.07C536.033 212.341 485.021 222.173 440.3 246.25C465.64 265.71 482.32 298.51 482.33 335.62Z" fill="#8679F9"/>
                        <path d="M916.95 358.81C935.13 338.29 936.8 304.88 919.5 283.42C901.03 260.51 869.58 259.89 850.4 281.54L383.13 808.81C364.48 829.81 364.48 863.96 383.13 884.99C392.45 895.51 404.67 900.77 416.88 900.77C429.09 900.77 441.32 895.51 450.64 884.99L639.19 672.27C646.19 664.39 657.5 664.39 664.48 672.27C667.021 675.251 668.721 678.856 669.403 682.713C670.085 686.57 669.725 690.539 668.36 694.21C663.966 706.191 662.355 719.015 663.65 731.71C667.12 766.94 692.54 795.22 723.81 798.57C766.06 803.09 801.22 763.38 797.18 715.69C794.18 680.36 769.04 651.69 737.78 647.85C726.37 646.432 714.792 648.327 704.43 653.31C697.79 656.47 690.11 654.74 685.01 648.99C681.649 645.018 679.805 639.983 679.805 634.78C679.805 629.577 681.649 624.542 685.01 620.57L916.95 358.81Z" fill="white"/>
                        <path d="M735.36 175.66C716.88 152.75 685.43 152.13 666.25 173.81L477.72 386.54C470.72 394.42 459.41 394.42 452.43 386.54C449.89 383.558 448.193 379.953 447.512 376.096C446.832 372.239 447.194 368.27 448.56 364.6C452.946 352.621 454.553 339.801 453.26 327.11C449.8 291.88 424.39 263.6 393.12 260.24C350.86 255.71 315.69 295.43 319.73 343.12C322.73 378.45 347.87 407.12 379.13 410.96C390.54 412.378 402.118 410.483 412.48 405.5C419.13 402.34 426.8 404.07 431.9 409.82C435.261 413.792 437.105 418.827 437.105 424.03C437.105 429.233 435.261 434.268 431.9 438.24L198.98 701.1C180.34 722.1 180.34 756.25 198.98 777.28C208.3 787.8 220.52 793.07 232.74 793.07C244.96 793.07 257.19 787.81 266.49 777.28L732.81 251.05C750.98 230.53 752.66 197.12 735.36 175.66Z" fill="white"/>
                    </g>
                    <path d="M558 1028C847.885 1028 1086 806.26 1086 529C1086 251.74 847.885 30 558 30C268.115 30 30 251.74 30 529C30 806.26 268.115 1028 558 1028Z" stroke="#FEFEFE" strokeWidth="60"/>
                    <defs>
                        <clipPath id="clip0">
                            <rect width="746.58" height="742.82" fill="white" transform="translate(185 158)"/>
                        </clipPath>
                    </defs>
                </svg>
            </StyledLogo>
        </StyledContainer>
    );
};

Loader.propTypes = {
    finishLoading: PropTypes.func.isRequired,
};

export default Loader;
