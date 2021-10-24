import React from "react";
import { Link } from "gatsby";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import styled from "styled-components";
import Layout from "../components/layout";
import mixins from "../styles/mixins";


const StyledMainContainer = styled.main`
  ${mixins.flexCenter};
  flex-direction: column;
`
const StyledTitle = styled.h1`
  color: var(--green);
  font-family: var(--font-mono);
  font-size: clamp(100px, 25vw, 200px);
  line-height: 1;
`
const StyledSubtitle = styled.h2`
  font-size: clamp(30px, 5vw, 50px);
  font-weight: 400;
`
const StyledHomeButton = styled(Link)`
  ${mixins.bigButton};
  margin-top: 40px;
`
const NotFoundContainer=styled.div`
  padding: 23vh 0;
`

const NotFoundPage = ({ location }) => {
  return (
    <Layout location={location}>
      <Helmet title="Hari Bhandari-404 Page Not Found"  />
      <NotFoundContainer>
            <StyledMainContainer className="fillHeight">
              <StyledTitle>404</StyledTitle>
              <StyledSubtitle>Page Not Found</StyledSubtitle>
              <StyledHomeButton to="/">Go Home</StyledHomeButton>
            </StyledMainContainer>
        )}
      </NotFoundContainer>
    </Layout>
  )
}

NotFoundPage.propTypes = {
  location: PropTypes.object.isRequired,
}

export default NotFoundPage
