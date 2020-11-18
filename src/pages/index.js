import React, {Fragment, useEffect, useState} from "react"
import {Link} from "gatsby"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Loader from "../components/Loader/Loader";
import Navigation from "../components/Navbar/Navbar";
import GlobalStyle from "../styles/GlobalStyle";
import Header from "../components/Header/Header";
import {graphql} from "../../.cache/gatsby-browser-entry";

const IndexPage = ({data}) => {
    const isHome = window.location.pathname === '/';
    const [isLoading, setIsLoading] = useState(isHome);

    useEffect(() => {
        if (isLoading) {
            return;
        }
        if (window.location.hash) {
            const id = window.location.hash.substring(1); // location.hash without the '#'
            setTimeout(() => {
                const el = document.getElementById(id);
                if (el) {
                    el.scrollIntoView();
                    el.focus();
                }
            }, 0);
        }
    }, [isLoading]);
    return (

        <Layout>
            {isLoading && isHome ? (
                <Loader finishLoading={() => setIsLoading(false)} />
            ) : (
                <Fragment>
                    <Navigation/>
                    <Header data={data.header}/>
                    <GlobalStyle/>
                    <SEO title="Home"/>

                    <div style={{
                        margin: `6px auto`,
                        maxWidth: 960,
                        padding: `80px 1.45rem`,

                    }}>

                        <div style={{maxWidth: `300px`, marginBottom: `1.45rem`}}>
                            <Image/>
                        </div>
                        <Link to="/page-2/">Go to page 2</Link> <br/>
                        <Link to="/using-typescript/">Go to "Using TypeScript"</Link></div>
                </Fragment>)}
        </Layout>
    )
}

export default IndexPage
export const query = graphql`
  query IndexQuery {
    header: headerJson {
      intro
      name
      company
      companyURL
      subtitle
      copy
      subCopy
    }
    projects: allProjectsJson {
      edges {
        node {
          title
          classes
          description
          techList
          img
          codeLink
          siteLink
          featured
        }
      }
    }
    experience: allExperienceJson {
      edges {
        node {
          company
          dates
          position
          copy
          jobFeatures
          open
        }
      }
    }
  }
`;
