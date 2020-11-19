import React, { useEffect, useState } from "react"
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Container from "../../styles/container";
import {Head, HeaderCopy, HeaderLink, HeaderSubCopy, HeaderText} from "./HeaderCss";

const Header = ({ data, bgColor }) => {

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setTimeout(() => setIsMounted(true), 1000)
    }, []);

    const one = () => <HeaderSubCopy style={{ transitionDelay: '100ms', color:'white' }}>{data.intro}</HeaderSubCopy>;
    const two = () => <HeaderText style={{ transitionDelay: '200ms' }}>{data.name}</HeaderText>;
    const three = () => <HeaderCopy style={{ transitionDelay: '300ms' }}>{data.copy} <HeaderLink href="https://www.clearlink.com" target="_blank"> {data.company}</HeaderLink></HeaderCopy>;
    const four = () => <HeaderSubCopy style={{ transitionDelay: '400ms' }}>{data.subCopy}</HeaderSubCopy>;

    const items = [one, two, three, four];

    return (
        <Head bgColor={bgColor}>
            <Container>
                <TransitionGroup>
                    {isMounted &&
                    items.map((item, i) => (
                        <CSSTransition key={i} classNames="fadeup" timeout={3000}>
                            {item}
                        </CSSTransition>
                    ))
                    }
                </TransitionGroup>
            </Container>
        </Head>
    )


}

export default Header