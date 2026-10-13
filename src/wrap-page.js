import React from "react"
import Layout from "./components/Layout"

export const wrapPageElement = ({ element, props }) => <Layout location={props.location}>{element}</Layout>
