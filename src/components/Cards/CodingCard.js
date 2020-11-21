import React, {useState} from 'react';
import {FaJava, FaJs, FaPython} from 'react-icons/fa';
import {codeObject} from "./CodingList";
import {CodeCardWrapper, ColorPaletteWrapper, HeroCardWrapper,} from './CodingCardCSS';


export const CodeCard = () => {
    const [language, setLanguage] = useState('js')
    const [text, setText] = useState(codeObject['js'])
    const onClickForPL = (language, text) => {
        setLanguage(language)
        setText(text)
    }

    return (
        <>
            <CodeCardWrapper>
      <pre>
        1&nbsp;&nbsp;class <b>Person</b> {'{'}
      </pre>
                <pre>2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{text[1]}</pre>
                <pre>2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{text[2]}</pre>
                <pre>2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{text[3]}</pre>
                <pre>2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'}'}</pre>
                <pre>3&nbsp;&nbsp;{'}'}</pre>
            </CodeCardWrapper>
            <ColorPaletteWrapper>
                <FaJs size={10} onClick={onClickForPL('python',codeObject['python'])}/>
                <FaJava/>
                <FaPython/>
            </ColorPaletteWrapper>
        </>
    );
};

export const HeroCard = () => {
    return (
        <HeroCardWrapper>
            <CodeCard />
        </HeroCardWrapper>
    );
};