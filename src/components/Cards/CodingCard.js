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
                    <pre key={index}>{index}{value}</pre>
                ))}
            </CodeCardWrapper>
            <ColorPaletteWrapper>
                <FaJs onClick={()=>{onClickForPL('js',codeObject['js'])}} className={language=='js'?'selected':''}/>
                <FaJava onClick={()=>{onClickForPL('java',codeObject['java']) }} className={language=='java'?'selected':''} />
                <FaPython onClick={()=>{onClickForPL('python',codeObject['python'])}} className={language=='python'?'selected':''}/>
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