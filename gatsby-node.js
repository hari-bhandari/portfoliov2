const path = require("path")
const { featured } = require("./src/content/projects.json")

// One case-study page per featured project, driven by src/content/projects.json.
exports.createPages = ({ actions }) => {
  const template = path.resolve("./src/templates/case-study.js")
  featured.forEach((project, index) => {
    const next = featured[(index + 1) % featured.length]
    actions.createPage({
      path: `/projects/${project.slug}/`,
      component: template,
      context: { slug: project.slug, nextSlug: next.slug },
    })
  })
}
