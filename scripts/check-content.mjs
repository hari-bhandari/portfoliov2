// Checks the content files before publishing.
// Usage: npm run check:content           (structure and style only)
//        npm run check:content -- --links (also checks every external link and DOI)
import { readFileSync } from "node:fs"

const load = name => JSON.parse(readFileSync(new URL(`../src/content/${name}.json`, import.meta.url), "utf8"))
const profile = load("profile")
const projects = load("projects")
const research = load("research")
const experience = load("experience")
const skills = load("skills")

const problems = []
const fail = msg => problems.push(msg)

// House style: no em or en dashes anywhere in the copy.
const walk = (value, path) => {
  if (typeof value === "string") {
    if (/[–—]/.test(value)) fail(`${path}: contains an em or en dash`)
  } else if (value && typeof value === "object") {
    Object.entries(value).forEach(([k, v]) => walk(v, `${path}.${k}`))
  }
}
Object.entries({ profile, projects, research, experience, skills }).forEach(([k, v]) => walk(v, k))

// Every featured project needs a complete case study.
const required = [
  "slug",
  "name",
  "summary",
  "status",
  "statusKind",
  "role",
  "problem",
  "responsibilities",
  "solution",
  "decisions",
  "tradeoffs",
  "outcomes",
  "stack",
  "diagram",
]
const slugs = new Set()
projects.featured.forEach(p => {
  required.forEach(field => p[field] === undefined && fail(`projects.${p.slug || p.name}: missing "${field}"`))
  if (slugs.has(p.slug)) fail(`projects: duplicate slug "${p.slug}"`)
  slugs.add(p.slug)
  if (!["live", "building"].includes(p.statusKind))
    fail(`projects.${p.slug}: statusKind should be "live" or "building"`)
  const ids = new Set(p.diagram.nodes.map(n => n.id))
  p.diagram.edges.forEach(([a, b]) => {
    if (!ids.has(a) || !ids.has(b)) fail(`projects.${p.slug}: diagram edge ${a} -> ${b} points at a missing node`)
  })
})

research.publications.forEach(p => {
  if (!/^10\.\d{4,}\//.test(p.doi)) fail(`research.publications: "${p.title}" has an invalid DOI`)
})

if (process.argv.includes("--links")) {
  const urls = new Set([
    profile.links.linkedin,
    profile.links.github,
    ...projects.archive.flatMap(a => a.links.map(l => l.href)),
    ...research.publications.map(p => `https://doi.org/${p.doi}`),
  ])
  await Promise.all(
    [...urls].map(async url => {
      try {
        const res = await fetch(url, { method: "GET", redirect: "follow", headers: { "User-Agent": "Mozilla/5.0" } })
        // LinkedIn answers bots with 999; treat it as reachable.
        if (!res.ok && res.status !== 999) fail(`link ${url} returned ${res.status}`)
      } catch (e) {
        fail(`link ${url} failed: ${e.message}`)
      }
    }),
  )
}

if (problems.length) {
  console.error(problems.map(p => `  ✗ ${p}`).join("\n"))
  process.exit(1)
}
console.log("Content OK")
