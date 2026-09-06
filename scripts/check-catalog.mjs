import { readFileSync } from "node:fs"
import { pathToFileURL } from "node:url"

const categoryValues = new Set([
  "editor-formatting",
  "publishing-sync",
  "agent-skills",
  "mcp",
  "editor-plugins",
  "archive-import"
])
const statusValues = new Set(["verified", "review-due", "archived"])
const expectedPlatformStatuses = {
  qwenwork: "install-ready",
  dumate: "install-ready",
  workbuddy: "smoke-pending",
  "doubao-work": "smoke-pending"
}
const expectedLock = {
  schemaVersion: 1,
  reviewedAt: "2026-09-06",
  sources: {
    runtime: {
      repository: "geekjourneyx/md2wechat-skill",
      path: "VERSION",
      sha: "18091983f59ddde8105e566545a0d9e4a12a4f1c",
      schemaVersion: "v3.4.0"
    },
    products: {
      repository: "md2wechat/.github",
      path: "facts/product-routes.json",
      sha: "9b25b7142815876f44053cf819842db320408d2a",
      schemaVersion: 1
    },
    platforms: {
      repository: "md2wechat/md2wechat-wiki",
      path: "evidence/agent-platforms.json",
      sha: "474ef8b8398e9b21b79ed937e24cb3c13ce1505d",
      schemaVersion: 1
    }
  }
}
const expectedPlatformSource = "https://github.com/md2wechat/md2wechat-wiki/blob/23027229c258e0d67c81b86da0211f14f851065c/evidence/agent-platforms.json"
const bannedReadmePatterns = [
  /每条记录说明/,
  /使用边界/,
  /最近核验/,
  /已核验项目/,
  /待复核项目/,
  /关系披露/,
  /\bStars?\b/i,
  /星标|排行榜|综合分|最全|最佳|首选/
]

function exactKeys(value, keys) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false
  return Object.keys(value).sort().join("\0") === [...keys].sort().join("\0")
}

function validCalendarDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value || "")
  if (!match) return false
  const date = new Date(`${value}T00:00:00.000Z`)
  return Number.isFinite(date.getTime()) &&
    date.getUTCFullYear() === Number(match[1]) &&
    date.getUTCMonth() + 1 === Number(match[2]) &&
    date.getUTCDate() === Number(match[3])
}

function validHttps(value) {
  try {
    return new URL(value).protocol === "https:"
  } catch {
    return false
  }
}

function countLinkDestination(text, value) {
  return [...text.matchAll(/\]\((https:\/\/[^\s)]+)\)/g)]
    .filter(match => match[1] === value)
    .length
}

function countLiteral(text, value) {
  return text.split(value).length - 1
}

function repositoryPath(entry) {
  try {
    const url = new URL(entry)
    if (url.hostname !== "github.com") return null
    const parts = url.pathname.split("/").filter(Boolean)
    return parts.length === 2 ? `${parts[0]}/${parts[1]}` : null
  } catch {
    return null
  }
}

export function validateLock(lock) {
  const errors = []
  if (!exactKeys(lock, ["schemaVersion", "reviewedAt", "sources"])) {
    errors.push("lock root must contain only schemaVersion, reviewedAt and sources")
  }
  if (JSON.stringify(lock) !== JSON.stringify(expectedLock)) {
    errors.push("ecosystem lock does not match the approved pins")
  }
  if (!exactKeys(lock?.sources, ["runtime", "products", "platforms"])) {
    errors.push("lock sources must contain runtime, products and platforms only")
  }
  for (const name of ["runtime", "products", "platforms"]) {
    const source = lock?.sources?.[name]
    if (!exactKeys(source, ["repository", "path", "sha", "schemaVersion"])) {
      errors.push(`${name} source has unexpected fields`)
    }
    if (!/^[0-9a-f]{40}$/.test(source?.sha || "")) {
      errors.push(`${name} source SHA must be 40 lowercase hex characters`)
    }
  }
  return errors
}

export function validateCatalog(catalog, readme, now = new Date("2026-09-06T23:59:59Z")) {
  const errors = []
  if (catalog?.schemaVersion !== 1) errors.push("schemaVersion must equal 1")
  if (!validCalendarDate(catalog?.reviewedAt)) errors.push("reviewedAt must be a calendar date")
  if (catalog?.activityDefinition !== "Latest commit on the repository default branch, using the UTC committer date.") {
    errors.push("activityDefinition must use the default-branch UTC committer date")
  }
  if (!Array.isArray(catalog?.projects)) return [...errors, "projects must be an array"]

  const ids = new Set()
  const entries = new Set()
  for (const project of catalog.projects) {
    const label = project?.id || "<missing-id>"
    for (const field of ["id", "name", "category", "entry", "deployment", "license", "lastActivity", "status", "limitations", "relationship"]) {
      if (typeof project?.[field] !== "string" || !project[field].trim()) errors.push(`${label}: ${field} is required`)
    }
    if (ids.has(project.id)) errors.push(`${label}: duplicate id`)
    if (entries.has(project.entry)) errors.push(`${label}: duplicate entry`)
    ids.add(project.id)
    entries.add(project.entry)

    if (!categoryValues.has(project.category)) errors.push(`${label}: invalid category`)
    if (!statusValues.has(project.status)) errors.push(`${label}: invalid status`)
    if (!validCalendarDate(project.lastActivity)) {
      errors.push(`${label}: invalid lastActivity`)
    } else if (Date.parse(`${project.lastActivity}T00:00:00Z`) > now.getTime()) {
      errors.push(`${label}: lastActivity is in the future`)
    }
    if (!repositoryPath(project.entry)) errors.push(`${label}: entry must be an official GitHub repository URL`)
    if (!Array.isArray(project.evidenceUrls) || project.evidenceUrls.length === 0 || project.evidenceUrls.some(url => !validHttps(url))) {
      errors.push(`${label}: evidenceUrls must contain HTTPS URLs`)
    }
    if (project.license === "unknown" && project.status !== "review-due") {
      errors.push(`${label}: unknown license requires review-due status`)
    }
    if (project.status === "verified") {
      const repo = repositoryPath(project.entry)
      const prefix = `https://github.com/${repo}/`
      if (project.license === "unknown") errors.push(`${label}: verified project needs a known license`)
      if (!project.limitations.trim()) errors.push(`${label}: verified project needs a limitation`)
      if (!project.evidenceUrls.every(url => url.startsWith(prefix))) {
        errors.push(`${label}: verified evidence must come from the project repository`)
      }
      if (!project.evidenceUrls.some(url => /\/blob\/[0-9a-f]{40}\/README(?:_[A-Z]+)?\.md$/i.test(url))) {
        errors.push(`${label}: verified project needs a commit-pinned README`)
      }
      if (!project.evidenceUrls.some(url => /\/blob\/[0-9a-f]{40}\/(?:LICENSE|LICENCE)(?:\.[^/]+)?$/i.test(url))) {
        errors.push(`${label}: verified project needs a readable commit-pinned license`)
      }
      if (!project.evidenceUrls.some(url => /\/commit\/[0-9a-f]{40}$/.test(url))) {
        errors.push(`${label}: verified project needs the default-branch activity commit`)
      }
    }
    if (project.relationship !== "independent" && !/(?:same-owner|maintainer|affiliated)/.test(project.relationship)) {
      errors.push(`${label}: relationship must explain maintainer affiliation`)
    }
    if (countLinkDestination(readme, project.entry) !== 1) errors.push(`${label}: entry must appear exactly once in README`)
    if (countLiteral(readme, project.lastActivity) < 1) errors.push(`${label}: lastActivity is missing from README`)
  }

  if (catalog.platformSource !== expectedPlatformSource) errors.push("platformSource must pin the reviewed Wiki commit")
  if (!Array.isArray(catalog.platforms) || catalog.platforms.length !== 4) {
    errors.push("platforms must contain four records")
  } else {
    const platformIds = new Set()
    for (const platform of catalog.platforms) {
      platformIds.add(platform.id)
      if (expectedPlatformStatuses[platform.id] !== platform.md2wechatStatus) errors.push(`${platform.id}: platform status drift`)
      if (platform.publiclySupported !== false) errors.push(`${platform.id}: must not claim public md2wechat support`)
      if (!validHttps(platform.entry)) errors.push(`${platform.id}: platform entry must be HTTPS`)
      if (countLinkDestination(readme, platform.entry) !== 1) errors.push(`${platform.id}: platform entry must appear exactly once in README`)
    }
    if (platformIds.size !== 4 || Object.keys(expectedPlatformStatuses).some(id => !platformIds.has(id))) {
      errors.push("platform ids do not match the reviewed Wiki source")
    }
  }

  for (const pattern of bannedReadmePatterns) {
    if (pattern.test(readme)) errors.push(`README contains banned wording: ${pattern}`)
  }

  const listedRepos = [...readme.matchAll(/\(https:\/\/github\.com\/([^/\s)]+)\/([^/\s)#?]+)\)/g)]
    .map(match => `https://github.com/${match[1]}/${match[2]}`)
  for (const entry of listedRepos) {
    if (!entries.has(entry)) errors.push(`README lists an untracked repository: ${entry}`)
  }

  return errors
}

function main() {
  const catalog = JSON.parse(readFileSync(new URL("../data/projects.json", import.meta.url), "utf8"))
  const lock = JSON.parse(readFileSync(new URL("../.md2wechat/ecosystem-facts.lock.json", import.meta.url), "utf8"))
  const readme = readFileSync(new URL("../README.md", import.meta.url), "utf8")
  const errors = [...validateLock(lock), ...validateCatalog(catalog, readme)]
  if (errors.length) {
    for (const error of errors) console.error(`- ${error}`)
    process.exitCode = 1
    return
  }
  const verified = catalog.projects.filter(project => project.status === "verified").length
  console.log(`Validated ${catalog.projects.length} projects (${verified} verified) and ${catalog.platforms.length} office-Agent platforms.`)
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) main()
