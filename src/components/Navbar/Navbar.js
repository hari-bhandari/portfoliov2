import React, { useState, useEffect } from "react"
import { Link , Events } from 'react-scroll'
import {MobileNav, MobileNavContainer, MobileNavOverlay, Nav, NavButton, NavContainer, NavLinks, NavLogo, SocialLinks} from "./NavbarCss";
import logo from './logo.svg'
import darkLogo from './log.svg'
const Navigation = () => {
    const [scrolledTop, updateScrolledTop] = useState(true)
    const [scrollHeight, updateScrollHeight] = useState(0)
    const [openNav, updateOpenNav] = useState(false)
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        Events.scrollEvent.register('begin', () => {
            updateOpenNav(false)
        });
        setTimeout(() => setIsMounted(true), 400);
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const handleScroll = () => {
        if (window.pageYOffset < 100) {
            updateScrollHeight(window.pageYOffset);
        }
        updateScrolledTop(window.pageYOffset < 100);
    }

    return (
        <NavContainer className={`${scrolledTop ? 'top' : 'scrolled'} ${openNav ? 'open' : 'closed'} ${isMounted ? 'mounted' : 'not-mounted'}`}
                      scrollHeight={scrollHeight}>
            <MobileNavContainer className={`${openNav ? 'open' : 'closed'}`}>
                <MobileNav className={`${openNav ? 'open' : 'closed'}`}>
                    <NavLinks>
                        <Link href="#projects" className="nav-link" style={{ transitionDelay: `${openNav ? '100ms' : '250ms'}` }} offset={-30} to="projects" spy={true} smooth={true} delay={400} duration={500} >Projects</Link>
                        <Link href="#experience" className="nav-link" style={{ transitionDelay: `${openNav ? '150ms' : '200ms'}` }} offset={-30} to="experience" spy={true} smooth={true} delay={400} duration={500} >Experience</Link>
                        <Link href="#contact" className="nav-link" style={{ transitionDelay: `${openNav ? '200ms' : '150ms'}` }} offset={-30} to="contact" spy={true} smooth={true} delay={400} duration={500} >Contact</Link>
                        <a className="nav-link" href="/resume.pdf" target="_blank" rel="noopener noreferrer" style={{ transitionDelay: `${openNav ? '250ms' : '100ms'}` }} >Resume</a>
                    </NavLinks>
                    {/*<SocialLinks style={{ transitionDelay: `${openNav ? '300ms' : '50ms'}` }} className={`${openNav ? 'open' : 'closed'}`}>*/}
                    {/*    <SocialIconLinks iconClasses="nav-icon" />*/}
                    {/*</SocialLinks>*/}
                </MobileNav>
                <MobileNavOverlay onClick={() => updateOpenNav(false)} className={`${openNav ? 'open' : 'closed'}`} />
            </MobileNavContainer>
            <Nav className={`${scrolledTop ? 'top' : 'scrolled'}`}>
                <NavLogo src={scrolledTop ? logo : darkLogo} alt="Hari Bhandari Logo" />
                <NavButton
                    onClick={() => updateOpenNav(prevState => !prevState)}
                    className={`${openNav ? 'open' : 'closed'} ${scrolledTop ? 'top' : 'scrolled'}`} >
                    <div></div>
                    <div></div>
                </NavButton>
            </Nav>
        </NavContainer>
    )
}

export default Navigation