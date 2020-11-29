import React, { useEffect, useState } from "react"
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Container from "../../styles/container";
import {Head, HeaderCopy, HeaderLink, HeaderSubCopy, HeaderText} from "./HeaderCss";
import {HeroCard} from "../Cards/CodingCard";
import ReactTypingEffect from 'react-typing-effect';
const Header = ({ data, bgColor }) => {

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setTimeout(() => setIsMounted(true), 20)
    }, []);

    const one = () => <HeaderSubCopy style={{ transitionDelay: '100ms', color:'white' }}>Hello, I'm</HeaderSubCopy>;
    const two = () => <HeaderText style={{ transitionDelay: '200ms' }}>Hari Bhandari</HeaderText>;
    const three = () => <HeaderCopy style={{ transitionDelay: '300ms' }}>A <ReactTypingEffect  typingDelay={500} eraseSpeed={100} eraseDelay={500} text={["Full Stack developer", "Software Engineer","Mathematician"]}/></HeaderCopy>;
    const four = () => <HeaderSubCopy style={{ transitionDelay: '400ms' }}>{data.subCopy}</HeaderSubCopy>;

    const items = [one, two, three, four];

    return (
        <Head bgColor={bgColor}>
            <Container>
                    <div className="header__container">
                        <div className={"intro"}>
                    {isMounted &&
                    items.map((item, i) => (
                        <TransitionGroup>
                        <CSSTransition key={i} classNames="fadeup" timeout={3000}>
                            {item}
                        </CSSTransition>
                        </TransitionGroup>

                    ))

                    }
                        </div>
                        <div className="coding-block">
                            <HeroCard/>
                        </div>
                    </div>
            </Container>
        </Head>
    )


}

export default Header
