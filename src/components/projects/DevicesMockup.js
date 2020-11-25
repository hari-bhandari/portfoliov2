import React from 'react';
import {Camera, Iframe, Keyboard, LaptopBody, LaptopContainer, LaptopScreen} from "./PhoneMockupCSS";

const LaptopMockup = () => {
    return (
        <LaptopContainer>
            <LaptopBody>
                <LaptopScreen>
                    {/*<Iframe src="http://codepen.io" />*/}
                </LaptopScreen>
                <Camera/>
                {/*<Keyboard/>*/}
            </LaptopBody>
        </LaptopContainer>
    );
};

export  {LaptopMockup};