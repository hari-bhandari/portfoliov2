import React from "react";
import styled from "styled-components";
import SEO from "../components/seo";

const PdfContainer = styled.object`
  width: 100%;
  height: 100vh;
`;
export default function Test() {
  return (
    <>
      <SEO lang={"en"} Title={"Resume"}/>
      <PdfContainer data="resume.pdf">
        <p>It appears you don't have a PDF plugin for this browser.
          No biggie... you can <a href="/resume.pdf">click here to
            download the PDF file.</a></p>
      </PdfContainer>;
    </>
  )
    ;
}