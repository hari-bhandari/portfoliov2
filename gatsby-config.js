module.exports = {
  siteMetadata: {
    title: `Hari Bhandari- Software Developer`,
    description: `Hari Bhandari is a software developer and full stack developer based in Birmingham, England.`,
    author: `@hari-bhandari`,
    url: 'https://haribhandari.me',
    siteUrl:'https://haribhandari.me',
    image: '/og.png', // Path to your image you placed in the 'static' folder
    twitterUsername: '@_hari_bhandari',
  },
  plugins: [
      `gatsby-plugin-sitemap`,
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
        trackingId: 'UA-91344343-1',
      },
    },

  ],
}
