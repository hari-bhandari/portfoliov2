import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import PageHeader from "../../commons/PageHeader";
import IFrame from "../../commons/IFrame";
import Button,{IconButton} from "../../commons/Button";
import {IoLogoJavascript,FaJava,FaPython} from "react-icons/all";


import ProjectTemplate from './Project';
import { ProjectLinks, ProjectPreview, Tags } from './ProjectCSS';

const ProjectsWrapper = styled.section`
  margin-bottom: 100px;
  padding:200px
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
            picture
            title
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
                            <Button target="__blank" as="a" href={node.demo}>
                                <FaJava/>
                            </Button>
                        </ProjectLinks>
                    }
                    preview={
                        <ProjectPreview>
                            <IFrame
                                livedemo={!!node.demo.match('codepen')}
                                src={"https://codepen.com"}
                            />
                            <Tags>
                                <IoLogoJavascript/>
                                <FaPython/>
                                <FaJava/>

                            </Tags>
                        </ProjectPreview>
                    }
                />
            ))}

        </ProjectsWrapper>
    );
};

export default Projects;