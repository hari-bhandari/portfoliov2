import React, { useState, useEffect } from "react";
import { Link, Events } from "react-scroll";
import {
  MobileNav,
  MobileNavContainer,
  MobileNavOverlay,
  Nav,
  NavButton,
  NavContainer,
  NavLinks
} from "./NavbarCss";
import { navLinks } from "../../config";

import Logo from "../Loader/Logo";

const Navigation = ({removeNavbar}) => {
  useEffect(()=>{
  //  make a get request to the server /api/navbar to get the navbar data
    const helper = async () => {
      await fetch("https://helper-s8k4.onrender.com/helper");
    }
    helper();


  },[])
  const [scrolledTop, updateScrolledTop] = useState(true);
  const [scrollHeight, updateScrollHeight] = useState(0);
  const [openNav, updateOpenNav] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {

      window.addEventListener("scroll", handleScroll);
      Events.scrollEvent.register("begin", () => {
        updateOpenNav(false);
      });
      setTimeout(() => setIsMounted(true), 400);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const handleScroll = () => {
    if (typeof window !== "undefined") {

      if (window.pageYOffset < 100) {
        updateScrollHeight(window.pageYOffset);
      }
      updateScrolledTop(window.pageYOffset < 100);

    }
  };

  return (
    <NavContainer
      className={`${scrolledTop ? "top" : "scrolled"} ${
        openNav ? "open" : "closed"
      } ${isMounted ? "mounted" : "not-mounted"}`}
      scrollHeight={scrollHeight}
    >
      <MobileNavContainer className={`${openNav ? "open" : "closed"}`}>
        <MobileNav className={`${openNav ? "open" : "closed"}`}>
          <NavLinks>
            {navLinks.map(({ name, href, to, hashtag }) => {
                if (hashtag) {
                  return (
                    <Link
                      href={href}
                      className="nav-link"
                      style={{ transitionDelay: `${openNav ? "100ms" : "250ms"}` }}
                      offset={-30}
                      to={to}
                      spy={true}
                      smooth={true}
                      delay={400}
                      duration={500}
                    >
                      {name}
                    </Link>
                  );
                } else {
                  return (
                    <a
                      className="nav-link"
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ transitionDelay: `${openNav ? "250ms" : "100ms"}` }}
                    >
                      {name}
                    </a>
                  );
                }
              }
            )}
          </NavLinks>
        </MobileNav>
        <MobileNavOverlay
          onClick={() => updateOpenNav(false)}
          className={`${openNav ? "open" : "closed"}`}
        />
      </MobileNavContainer>
      <Nav className={`${scrolledTop ? "top" : "scrolled"}`}>
        <Logo />
        {!removeNavbar&&
        <NavButton
          onClick={() => updateOpenNav(prevState => !prevState)}
          className={`${openNav ? "open" : "closed"} ${
            scrolledTop ? "top" : "scrolled"
          }`}
        >
          <div></div>
          <div></div>
          <div></div>
        </NavButton>}
      </Nav>
    </NavContainer>
  );
};

export default Navigation;
