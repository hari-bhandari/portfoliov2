import React from 'react';
import PropTypes from 'prop-types';
import {IconButton} from "../../commons/Button";
import {CardFooter} from "../../commons/Card";
import Image from "../image";
import { CCard } from './MiniProjectsCSS';

const MiniProject = ({ node }) => {
    let img = node.picture
    return (
        <CCard key={node.id}>
            <a
                name={node.title}
                aria-label={node.title}
                className="thumbnail-a"
                href={node.demo}
                target="__blank"
            >
                <Image alt={node.title} src={img} />
            </a>
            <CardFooter justify="space-between" align="center" nowrap>
                <h4>{node.title}</h4>
                <div>
                    <IconButton
                        label={`Live Demo - ${node.title}`}
                        href={node.demo}
                        icon="window-maximize"
                    />
                    <IconButton
                        label={`Source Code - ${node.title}`}
                        href={node.src}
                        Icon={'github'}
                    />
                </div>
            </CardFooter>
        </CCard>
    );
};

MiniProject.propTypes = {
    node: PropTypes.object.isRequired
};

export default MiniProject;