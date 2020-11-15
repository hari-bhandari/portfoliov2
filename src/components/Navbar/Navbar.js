import React, {Component} from "react";
import {throttle} from "../../utils";
import theme from "../../styles/theme";
import {NavLinks} from './NavbarCss'
const {loaderDelay}=theme
const DELTA=5
class Nav extends Component {
    state = {
        isMounted: !this.props.isHome,
        menuOpen: false,
        scrollDirection: 'none',
        lastScrollTop: 0,
    };

    componentDidMount() {
        setTimeout(
            () =>
                this.setState({ isMounted: true }, () => {
                    window.addEventListener('scroll', () => throttle(this.handleScroll()));
                    window.addEventListener('resize', () => throttle(this.handleResize()));
                    window.addEventListener('keydown', e => this.handleKeydown(e));
                }),
            100,
        );
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', () => this.handleScroll());
        window.removeEventListener('resize', () => this.handleResize());
        window.removeEventListener('keydown', e => this.handleKeydown(e));
    }

    toggleMenu = () => this.setState({ menuOpen: !this.state.menuOpen });

    handleScroll = () => {
        const { isMounted, menuOpen, scrollDirection, lastScrollTop } = this.state;
        const fromTop = window.scrollY;

        // Make sure they scroll more than DELTA
        if (!isMounted || Math.abs(lastScrollTop - fromTop) <= DELTA || menuOpen) {
            return;
        }

        if (fromTop < DELTA) {
            this.setState({ scrollDirection: 'none' });
        } else if (fromTop > lastScrollTop && fromTop > navHeight) {
            if (scrollDirection !== 'down') {
                this.setState({ scrollDirection: 'down' });
            }
        } else if (fromTop + window.innerHeight < document.body.scrollHeight) {
            if (scrollDirection !== 'up') {
                this.setState({ scrollDirection: 'up' });
            }
        }

        this.setState({ lastScrollTop: fromTop });
    };

    handleResize = () => {
        if (window.innerWidth > 768 && this.state.menuOpen) {
            this.toggleMenu();
        }
    };

    handleKeydown = e => {
        if (!this.state.menuOpen) {
            return;
        }

        if (e.which === 27 || e.key === 'Escape') {
            this.toggleMenu();
        }
    };

    render() {
        const { isMounted, menuOpen, scrollDirection } = this.state;
        const { isHome } = this.props;
        const timeout = isHome ? loaderDelay : 0;
        const fadeClass = isHome ? 'fade' : '';
        const fadeDownClass = isHome ? 'fadedown' : '';

        return (
            <StyledContainer scrollDirection={scrollDirection}>
                <Helmet>
                    <body className={menuOpen ? 'blur' : ''} />
                </Helmet>
                <StyledNav>
                    <TransitionGroup component={null}>
                        {isMounted && (
                            <CSSTransition classNames={fadeClass} timeout={timeout}>
                                <StyledLogo tabindex="-1">
                                    {isHome ? (
                                        <a href="/" aria-label="home">
                                            <IconLogo />
                                        </a>
                                    ) : (
                                        <Link to="/" aria-label="home">
                                            <IconLogo />
                                        </Link>
                                    )}
                                </StyledLogo>
                            </CSSTransition>
                        )}
                    </TransitionGroup>

                    <TransitionGroup component={null}>
                        {isMounted && (
                            <CSSTransition classNames={fadeClass} timeout={timeout}>
                                <StyledHamburger onClick={this.toggleMenu}>
                                    <StyledHamburgerBox>
                                        <StyledHamburgerInner menuOpen={menuOpen} />
                                    </StyledHamburgerBox>
                                </StyledHamburger>
                            </CSSTransition>
                        )}
                    </TransitionGroup>

                    <StyledLink>
                        <StyledList>
                            <TransitionGroup component={null}>
                                {isMounted &&
                                navLinks &&
                                navLinks.map(({ url, name }, i) => (
                                    <CSSTransition key={i} classNames={fadeDownClass} timeout={timeout}>
                                        <StyledListItem
                                            key={i}
                                            style={{ transitionDelay: `${isHome ? i * 100 : 0}ms` }}>
                                            <StyledListLink to={url}>{name}</StyledListLink>
                                        </StyledListItem>
                                    </CSSTransition>
                                ))}
                            </TransitionGroup>
                        </StyledList>

                        <TransitionGroup component={null}>
                            {isMounted && (
                                <CSSTransition classNames={fadeDownClass} timeout={timeout}>
                                    <div style={{ transitionDelay: `${isHome ? navLinks.length * 100 : 0}ms` }}>
                                        <StyledResumeButton
                                            href="/resume.pdf"
                                            target="_blank"
                                            rel="nofollow noopener noreferrer">
                                            Resume
                                        </StyledResumeButton>
                                    </div>
                                </CSSTransition>
                            )}
                        </TransitionGroup>
                    </StyledLink>
                </StyledNav>

                <Menu menuOpen={menuOpen} toggleMenu={this.toggleMenu} />
            </StyledContainer>
        );
    }
}

Nav.propTypes = {
    isHome: PropTypes.bool,
};

export default Nav;
