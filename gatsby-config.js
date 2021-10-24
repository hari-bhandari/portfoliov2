module.exports = {
  siteMetadata: {
    title: `Hari Bhandari - Portfolio`,
    description: `Hari Bhandari is a software developer and full stack developer based in Birmingham, England.Hari Bhandari specialises in React.js, Node.js and web developing in general. He is currently pursuing  MEng Computer science.`,
    author: `@hari-bhandari`,
    url: "https://haribhandari.me",
    siteUrl: "https://haribhandari.me",
    image: "/og.png", // Path to your image you placed in the 'static' folder
    twitterUsername: "@_hari_bhandari",
  },
  plugins: [
   `gatsby-plugin-styled-components`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/json`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-json`,
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Hari-Bhandari-Portfolio`,
        short_name: `portfolio`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/logo.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-91344343-1",
      },
    },
  ],
}
