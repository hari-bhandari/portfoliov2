import React, {useState, useEffect} from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import anime from 'animejs';
import {StyledLoader} from "./LoaderCSS";
import IconLoader from "./LoaderLogo";
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
        const timeout = setTimeout(() => setIsMounted(true), 500);
        animate();
        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <StyledLoader className="loader" isMounted={isMounted}>
            <Helmet bodyAttributes={{ class: `hidden` }} />
            <div className="logo-wrapper">
                <IconLoader />
            </div>
        </StyledLoader>
    );
};

Loader.propTypes = {
    finishLoading: PropTypes.func.isRequired,
};

export default Loader;
