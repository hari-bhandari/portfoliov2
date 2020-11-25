import React from 'react';
import {Iframe, LaptopBody, LaptopContainer,} from "./PhoneMockupCSS";

const LaptopMockup = () => {
    return (
        <LaptopContainer>
            <LaptopBody>
                    <Iframe src="http://codepen.io" />
            </LaptopBody>
        </LaptopContainer>
    );
};

export  {LaptopMockup};