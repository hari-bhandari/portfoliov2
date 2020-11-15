import React, {useEffect, useState} from "react"
import {Link} from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Loader from "../components/Loader/Loader";

const IndexPage = () => {
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
                <div>
            <SEO title="Home"/>
            <h1>Hi people</h1>
            <p>Welcome to your new Gatsby site.</p>
            <p>Now go build something great.</p>
            <p>Now go build something great.</p>
            <p>Now go build something great.</p>
            <p>Now go build something great.</p>
            <p>Now go build something great.</p>
            <p>Now go build something great.</p>
            <p>Now go build something great.</p>
            <p>Now go build something great.</p>
            <p>Now go build something great.</p>
            <p>Now go build something great.</p>
            <p>Now go build something great.</p>
            <p>Now go build something great.</p>
            <p>Now go build something great.</p>
            <p>Now go build something great.</p>
            <p>Now go build something great.</p>
            <p>Now go build something great.</p>
            <p>Now go build something great.</p>
            <p>Now go build something great.</p>
            <p>Now go build something great.</p>
            <p>Now go build something great.</p>
            <p>Now go build something great.</p>
            <p>Now go build something great.</p>
            <p>Now go build something great.</p>
            <p>Now go build something great.</p>
            <p>Now go build something great.</p>
            <p>Now go build something great.</p>
            <p>Now go build something great.</p>
            <p>Now go build something great.</p>
            <p>Now go build something great.</p>
            <p>Now go build something great.</p>
            <p>Now go build something great.</p>
            <p>Now go build something great.</p>
            <p>Now go build something great.</p>
            <p>Now go build something great.</p>
            <p>Now go build something great.</p>
            <p>Now go build something great.</p>
            <p>Now go build something great.</p>
            <p>Now go build something great.</p>
            <p>Now go build something great.</p>
            <p>Now go build something great.</p>
            <p>Now go build something great.</p>
            <p>Now go build something great.</p>
            <div style={{maxWidth: `300px`, marginBottom: `1.45rem`}}>
                <Image/>
            </div>
            <Link to="/page-2/">Go to page 2</Link> <br/>
            <Link to="/using-typescript/">Go to "Using TypeScript"</Link></div>)}
        </Layout>
    )
}

export default IndexPage
