const config = require('./src/config');
module.exports = {
  siteMetadata: {
    title: `Hari Bhandari- Software Developer`,
    description: `Hari Bhandari is a software developer and full stack developer based in Birmingham, England.`,
    author: `@hari-bhandari`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },

    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/json`,
      },
    },
    `gatsby-transformer-sharp`,

    `gatsby-plugin-sharp`,
    {
      // https://www.gatsbyjs.org/packages/gatsby-remark-images
      resolve: 'gatsby-remark-images',
      options: {
        maxWidth: 700,
        linkImagesToOriginal: true,
        quality: 90,
        tracedSVG:true,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },

  ],
}
