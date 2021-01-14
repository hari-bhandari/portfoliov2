
<div align="center">
  <img alt="Logo" src="https://raw.githubusercontent.com/hari-bhandari/portfoliov2/main/src/components/Navbar/logo.svg" width="100" />
</div>
<h1 align="center">
  Personal Portfolio
    <h5 align="center">Hari Bhandari</h5>
</h1>
<h2><a href="https://haribhandari.me">Demo</a></h2>
<img alt="Logo" src="https://haribhandari.me/demo.webp" width="100%" />
<h3>
Tree Structure</h3>
Strained eyes? There's DarkMode too :p

*NOTE: If you are using this site as a template for your own portfolio site, I would appreciate if you manifest my name with my portfolio url*

**Run the site locally**
clone it and run develop
_NOTE: The default branch for this repo is `develop`, when you push or pull make sure you specify the correct branch_

``````
├── gatsby-browser.js
├── gatsby-config.js
├── gatsby-node.js
├── LICENSE
├── package.json
├── package-lock.json
├── README.md
├── src
│   ├── commons
│   │   ├── Button.js
│   │   ├── Card.js
│   │   ├── Flex.js
│   │   ├── Grid.js
│   │   ├── IconLink.js
│   │   ├── IFrame.js
│   │   ├── LoaderCSS.js
│   │   ├── Loader.js
│   │   └── PageHeader.js
│   ├── components
│   │   ├── AboutMe
│   │   │   ├── AboutMeCSS.js
│   │   │   └── AboutMe.js
│   │   ├── Cards
│   │   │   ├── CodingCardCSS.js
│   │   │   ├── CodingCard.js
│   │   │   └── CodingList.js
│   │   ├── contact
│   │   │   ├── ContactFormCSS.js
│   │   │   ├── ContactForm.js
│   │   │   └── useForm.js
│   │   ├── CssAnimations.js
│   │   ├── Footer.js
│   │   ├── Header
│   │   │   ├── HeaderCss.js
│   │   │   └── Header.js
│   │   ├── header.js
│   │   ├── image.js
│   │   ├── layout.css
│   │   ├── layout.js
│   │   ├── Loader
│   │   │   ├── LoaderCSS.js
│   │   │   ├── Loader.js
│   │   │   └── LoaderLogo.js
│   │   ├── Navbar
│   │   │   ├── logo.svg
│   │   │   ├── NavbarCss.js
│   │   │   └── Navbar.js
│   │   ├── projects
│   │   │   ├── DevicesMockup.js
│   │   │   ├── MiniProject.js
│   │   │   ├── MiniProjectsCSS.js
│   │   │   ├── MiniProjects.js
│   │   │   ├── PhoneMockupCSS.js
│   │   │   ├── ProjectCSS.js
│   │   │   ├── Project.js
│   │   │   └── Projects.js
│   │   └── seo.js
│   ├── config.js
│   ├── images
│   │   ├── astar.png
│   │   ├── budget.png
│   │   ├── car.png
│   │   ├── contactKeeper.png
│   │   ├── corona.png
│   │   ├── cors.png
│   │   ├── devCamper.png
│   │   ├── gatsby-astronaut.png
│   │   ├── gatsby-icon.png
│   │   ├── ip.png
│   │   ├── logo.png
│   │   ├── logs.png
│   │   ├── mcdonalds.png
│   │   └── me.jpg
│   ├── json
│   │   ├── about.json
│   │   ├── header.json
│   │   ├── projects.json
│   │   └── unFeaturedProjects.json
│   ├── pages
│   │   ├── 404.js
│   │   └── index.js
│   ├── styles
│   │   ├── container.js
│   │   ├── GlobalStyle.js
│   │   ├── index.js
│   │   ├── media.js
│   │   ├── mixins.js
│   │   ├── Section.js
│   │   ├── theme.js
│   │   └── TransitionStyles.js
│   └── utils
│       ├── index.js
│       └── sr.js
├── static
│   ├── demo.gif
│   ├── og.png
│   └── resume.pdf
└── yarn.lock




## Tools Used

1. Gatsby.js (of course)
2. Styled Components for styling
3. Cypress for E2E Testing
4. Jest for Unit Testing
5. TravisCI for CI/CD

## :v: Contributing

*NOTE: if you want to change the [blog content](./content) or fix any typo you can do that from github's ui without cloning the repo locally*

After cloning & setting up the local project you can push the changes to your github fork and make a pull request.

> You can also run the tests locally to see if everything works fine with

### Running tests
```bash
npm run test
npm run test:e2e
```

### Pushing the changes

```bash
git add .
git commit -m "commit message"
git push YOUR_REPO_URL develop
```

------

Made with :heart: and Gatsbyjs