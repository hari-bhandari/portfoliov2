import React, {useState, useEffect} from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import anime from 'animejs';
import IconLoader from "./LoaderLogo";
import {StyledContainer, StyledLogo} from "./LoaderCSS";

const Loader = ({finishLoading}) => {
    const animate = () => {
        const loader = anime.timeline({
            complete: () => finishLoading(),
        });

        loader
            .add({
                targets: '#logo path',
                delay: 0,
                duration: 180,
                easing: 'easeInOutQuart',
                strokeDashoffset: [anime.setDashoffset, 0],
            })
            .add({
                targets: '#logo #B',
                duration: 100,
                easing: 'easeInOutQuart',
                opacity: 1,
            })
            .add({
                targets: '#logo',
                delay: 50,
                duration: 300,
                easing: 'easeInOutQuart',
                opacity: 0,
                scale: 0.1,
            })
            .add({
                targets: '.loader',
                duration: 30,
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
                <IconLoader/>
            </StyledLogo>
        </StyledContainer>
    );
};

Loader.propTypes = {
    finishLoading: PropTypes.func.isRequired,
};

export default Loader;
