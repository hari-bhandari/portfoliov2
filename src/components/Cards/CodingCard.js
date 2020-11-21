import React, {useState} from 'react';
import {FaJava, FaJs, FaPython} from 'react-icons/fa';
import {codeObject} from "./CodingList";
import {CodeCardWrapper, ColorPaletteWrapper, HeroCardWrapper,} from './CodingCardCSS';


export const CodeCard = () => {
    const [language, setLanguage] = useState('js')
    const [text, setText] = useState(codeObject['js'])
    const onClickForPL = (language,text) => {
        setLanguage(language)
        setText(text)
    }

    return (
        <>
            <CodeCardWrapper>
                {text.map((value,index)=>(
                    <pre>{index}{value}</pre>
                ))}
            </CodeCardWrapper>
            <ColorPaletteWrapper>
                <FaJs onClick={()=>{onClickForPL('js',codeObject['js'])}}/>
                <FaJava onClick={()=>{onClickForPL('java',codeObject['java'])}}/>
                <FaPython onClick={()=>{onClickForPL('python',codeObject['python'])}}/>
            </ColorPaletteWrapper >
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