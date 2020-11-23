import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import {StyledAboutSection,StyledPic,StyledText} from './AboutMeCSS'
import sr from '../../utils/sr'
import {srConfig} from '../../config'
import me from '../../images/me.jpg'

const AboutMe = () => {
    const data = useStaticQuery(graphql`
    query {
      avatar: file(sourceInstanceName: { eq: "images" }, relativePath: { eq: "me.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 500, traceSVG: { color: "#64ffda" }) {
            base64
            tracedSVG
            srcWebp
            srcSetWebp
            originalImg
            originalName
          }
        }
      }
    }
    
  `);

    const revealContainer = useRef(null);

    useEffect(() => {
        sr.reveal(revealContainer.current, srConfig());
    }, []);

    const skills = ['JavaScript (ES6+)', 'HTML & (S)CSS', 'React', 'BootStrap','Python','Java', 'Node.js', 'MongoDB'];

    return (
        <StyledAboutSection id="about" ref={revealContainer}>
            <h2 className="numbered-heading">About Me</h2>

            <div className="inner">
                <StyledText>
                    <div>
                        <p>Hi,I'm Hari Bhandari,</p>

                        <p>
                            A passionate self-taught developer. I like to describe myself as someone persistent and purposeful;
                            I love solving real-life problems, mathematics problems and learning new algorithms.
                        </p>

                        <p>
                            I started coding back in 2019 after I graduated from my sixth form with AAB. I was impassive
                            about algorithms, but Advanced level further decision wholly altered my mind.
                            It taught me different aspects of programming from learning algorithms to being more Logical.
                            Also, Advanced level Mathematics and Further Mathematics has enhanced my mathematical skills,
                            problems solving skills and most importantly, my analytical skills. I want to pursue a career
                            in computer programming!
                            Furthermore, I am also interested in creating and learning optimised algorithms.
                        </p>

                        <p>Here are a few technologies I've been working with recently:</p>
                    </div>

                    <ul className="skills-list">
                        {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
                    </ul>
                </StyledText>

                <StyledPic>
                    <div className="wrapper">
                        <img src={me} alt="" className="img"/>
                        {/*<Img fluid={data.avatar.childImageSharp.fluid} alt="Avatar"  />*/}
                    </div>
                </StyledPic>
            </div>
        </StyledAboutSection>
    );
};

export default AboutMe;