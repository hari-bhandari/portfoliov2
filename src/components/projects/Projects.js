import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import PageHeader from "../../commons/PageHeader";
import IFrame from "../../commons/IFrame";
import Button,{IconButton} from "../../commons/Button";


import ProjectTemplate from './Project';
import { ProjectLinks, ProjectPreview, Tags } from './ProjectCSS';
import media from '../../styles/media'
const ProjectsWrapper = styled.section`
  margin-bottom: 100px;
  padding:0px 100px;
  
  
  ${media.medium}{
    padding: 40px;
  
  }
  ${media.small}{
    padding: 0px;
  }
  
  
`;
const Projects = () => {
    const projects = useStaticQuery(graphql`
    {
      allProjectsJson {
        edges {
          node {
            id
            description
            demo
            mobile
            title
            github
          }
        }
      }
    }
  `)
    return (
        <ProjectsWrapper id="projects" style={{ marginBottom: 100 }}>
            <PageHeader>Side Projects</PageHeader>

            {projects.allProjectsJson.edges.map(({ node }) => (
                <ProjectTemplate
                    key={node.id}
                    title={node.title}
                    desc={node.description}
                    links={
                        <ProjectLinks>
                            <Button target="__blank" as="a" href={node.demo}>
                                Live Demo
                            </Button>
                            <IconButton
                                label="View demo on Github"
                                href={node.github}
                                Icon={"github"}
                            />
                        </ProjectLinks>
                    }
                    preview={
                        <ProjectPreview>
                            <IFrame
                                livedemo={!!node.demo.match('codepen')}
                                src={node.demo}
                            />
                            <Tags>
                                {/*<FontAwesomeIcon icon={['fab', 'js']} />*/}
                                {/*<FontAwesomeIcon icon={['fab', 'html5']} />*/}
                                {/*<FontAwesomeIcon icon={['fab', 'css3']} />*/}
                            </Tags>
                        </ProjectPreview>
                    }
                />
            ))}

        </ProjectsWrapper>
    );
};

export default Projects;