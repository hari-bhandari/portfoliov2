import React, { useRef, useEffect, useState } from 'react';
import { withTheme } from 'styled-components';
import { FaPython, FaJs,FaJava } from 'react-icons/fa';
import {
    HeroCardWrapper,
    CodeCardWrapper,
    ColorPaletteWrapper,
    ColorBoxWrapper,
} from './CodingCardCSS';

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
            <pre onClick={changeText}>5&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; this.age = {text}</pre>
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

    return (
        <ColorBoxWrapper
            ref={tooltipRef}
            style={{ background: color }}
        />
    );
};

export const ColorPalette = withTheme(({ theme }) => {
    return (
        <ColorPaletteWrapper>
            <FaJs size={10}/>
            <FaJava/>
            <FaPython/>
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