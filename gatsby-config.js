const profile = require("./src/content/profile.json")

module.exports = {
  siteMetadata: {
    title: "Hari Bhandari",
    titleTemplate: "%s · Hari Bhandari",
    description: profile.description,
    siteUrl: "https://haribhandari.me",
    image: "/og.png",
  },
  trailingSlash: "always",
  plugins: [
    "gatsby-plugin-styled-components",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Hari Bhandari",
        short_name: "Hari Bhandari",
        start_url: "/",
        background_color: "#0c0d0f",
        theme_color: "#0c0d0f",
        display: "minimal-ui",
        icon: "src/images/icon.png",
      },
    },
  ],
}
