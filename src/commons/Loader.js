import React from 'react';
import {LoaderContainer,Loaders,FlexClass} from './LoaderCSS'
const CSSLoader = () => {
    return (
        <LoaderContainer>
            <FlexClass>
                <Loaders/>
            </FlexClass>
        </LoaderContainer>
    );
};

export default CSSLoader;