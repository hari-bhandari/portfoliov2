import React, { useRef, useEffect, useState } from 'react';
import { withTheme } from 'styled-components';

import {
    HeroCardWrapper,
    CodeCardWrapper,
    ColorPaletteWrapper,
    ColorBoxWrapper,
} from './HeroCard.style';

function repeatString(str, count) {
    let maxCount = str.length * count;
    count = Math.floor(Math.log(count) / Math.log(2));
    while (count) {
        str += str;
        count--;
    }
    str += str.substring(0, maxCount - str.length);
    return str;
}


export const CodeCard = () => {
    const [text, setText] = useState(`new Date().getFullYear() - 2001;`);
    const age = new Date().getFullYear() - 2001;
    // trimed down polyfill of String.repeat
    const changeText = () => {
        let space = repeatString(' ', 54);
        setText(age + ';' + space);
    };
    return (
        <CodeCardWrapper>
      <pre>
        1&nbsp;&nbsp;class <b>Person</b> {'{'}
      </pre>
            <pre>2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; constructor() {'{'}</pre>
            <pre>
        3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; this.name = "<b>Anurag Hazra</b>";
      </pre>
            <pre>
        4&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; this.traits = ["<b>DESIGN</b>", "<b>DEV</b>"];
      </pre>
            <pre onClick={changeText}>5&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; this.age = {text}</pre>
            <pre>6&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {'}'}</pre>
            <pre>7&nbsp;&nbsp;{'}'}</pre>
        </CodeCardWrapper>
    );
};

const ColorBox = ({ color }) => {
    const tooltipRef = useRef();
    useEffect(() => {
        return tooltipRef.current.addEventListener('animationend', () => {
            tooltipRef.current.classList.remove('tooltip-animate');
        });
    });
    const copy = () => {
        copyToClipboard(color);
        tooltipRef.current.classList.add('tooltip-animate');
    };

    return (
        <ColorBoxWrapper
            ref={tooltipRef}
            onClick={copy}
            style={{ background: color }}
        />
    );
};

export const ColorPalette = withTheme(({ theme }) => {
    return (
        <ColorPaletteWrapper>

        </ColorPaletteWrapper>
    );
});

export const HeroCard = () => {
    return (
        <HeroCardWrapper>
            <CodeCard />
            <ColorPalette />
        </HeroCardWrapper>
    );
};