import test from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { validateCatalog, validateLock } from "../scripts/check-catalog.mjs"

const catalog = JSON.parse(readFileSync(new URL("../data/projects.json", import.meta.url), "utf8"))
const lock = JSON.parse(readFileSync(new URL("../.md2wechat/ecosystem-facts.lock.json", import.meta.url), "utf8"))
const readme = readFileSync(new URL("../README.md", import.meta.url), "utf8")
const reviewNow = new Date("2026-09-14T12:00:00Z")
const validate = (value = catalog, markdown = readme) =>
  validateCatalog(value, markdown, reviewNow)

test("current catalog, README and ecosystem pins agree", () => {
  assert.deepEqual(validateLock(lock), [])
  assert.deepEqual(validate(), [])
})

test("verified projects have repository README, license and activity evidence", () => {
  for (const project of catalog.projects.filter(item => item.status === "verified")) {
    assert.notEqual(project.license, "unknown")
    assert.ok(project.limitations.length > 0)
    assert.ok(project.evidenceUrls.some(url => /README/.test(url)))
    assert.ok(project.evidenceUrls.some(url => /LICEN[CS]E/.test(url)))
    assert.ok(project.evidenceUrls.some(url => /\/commit\//.test(url)))
  }
})

test("unknown licenses cannot pass as verified", () => {
  const changed = structuredClone(catalog)
  changed.projects[0].license = "unknown"
  assert.match(validate(changed).join("\n"), /unknown license requires review-due|verified project needs a known license/)
})

test("relationship disclosures reject vague affiliation", () => {
  const changed = structuredClone(catalog)
  changed.projects.find(item => item.id === "md2wechat").relationship = "related project"
  assert.match(validate(changed).join("\n"), /relationship must explain maintainer affiliation/)
})

test("invalid dates, duplicate entries and non-HTTPS evidence are rejected", () => {
  const changed = structuredClone(catalog)
  changed.projects[0].lastActivity = "2026-02-30"
  changed.projects[1].entry = changed.projects[0].entry
  changed.projects[2].evidenceUrls[0] = "http://example.com/readme"
  const errors = validate(changed).join("\n")
  assert.match(errors, /invalid lastActivity/)
  assert.match(errors, /duplicate entry/)
  assert.match(errors, /evidenceUrls must contain HTTPS URLs/)
})

test("README must include each entry once and cannot add untracked repositories", () => {
  const missing = readme.replace(catalog.projects[0].entry, "https://example.com/missing")
  assert.match(validate(catalog, missing).join("\n"), /exact entry must appear in one project table row/)

  const extra = `${readme}\n| [extra](https://github.com/example/untracked/tree/main) | Web | MIT | 2026-09-01 | test |\n`
  assert.match(validate(catalog, extra).join("\n"), /untracked repository/)
})

test("README rejects ranking, mutable popularity and mechanical labels", () => {
  for (const phrase of ["Stars", "排行榜", "最全", "最近核验", "关系披露"]) {
    assert.match(validate(catalog, `${readme}\n${phrase}\n`).join("\n"), /banned wording/)
  }
})

test("platform records cannot overstate md2wechat compatibility", () => {
  const changed = structuredClone(catalog)
  changed.platforms[0].publiclySupported = true
  changed.platforms[1].md2wechatStatus = "verified"
  const errors = validate(changed).join("\n")
  assert.match(errors, /must not claim public md2wechat support/)
  assert.match(errors, /platform status drift/)
})

test("lock rejects drift and extra fields", () => {
  const changed = structuredClone(lock)
  changed.sources.products.sha = "0".repeat(40)
  changed.sources.runtime.extra = true
  const errors = validateLock(changed).join("\n")
  assert.match(errors, /approved pins/)
  assert.match(errors, /runtime source has unexpected fields/)
})

test("each activity date must stay in its own project row", () => {
  const changed = structuredClone(catalog)
  changed.projects.find(item => item.id === "doocs-md").lastActivity = "2026-04-29"
  assert.match(validate(changed).join("\n"), /doocs-md: own README row must contain its lastActivity/)
})

test("catalog review date and README update line share one snapshot date", () => {
  const future = structuredClone(catalog)
  future.reviewedAt = "2026-09-15"
  const futureReadme = readme.replace("更新于 2026-09-14 ·", "更新于 2026-09-15 ·")
  assert.match(validate(future, futureReadme).join("\n"), /reviewedAt must not be in the future/)

  const mismatchedReadme = readme.replace("更新于 2026-09-14 ·", "更新于 2026-09-05 ·")
  assert.match(validate(catalog, mismatchedReadme).join("\n"), /README update date must exactly match/)
})

test("project activity cannot be later than the catalog snapshot", () => {
  const changed = structuredClone(catalog)
  changed.projects[0].lastActivity = "2026-09-15"
  assert.match(validate(changed).join("\n"), /lastActivity must not be later than catalog.reviewedAt/)
})

test("known maintainer relationships cannot be erased", () => {
  for (const id of ["md2wechat", "md2wechat-lite", "md2wechat-mcp-server", "obsidian-md2wechat"]) {
    const changed = structuredClone(catalog)
    changed.projects.find(item => item.id === id).relationship = "independent"
    assert.match(validate(changed).join("\n"), /known maintainer relationship must remain disclosed/)
  }
})

test("README rejects positive office-platform support claims in either word order", () => {
  assert.match(
    validate(catalog, `${readme}\nmd2wechat 已支持千问办公。\n`).join("\n"),
    /overstates md2wechat support/
  )
  assert.match(
    validate(catalog, `${readme}\nWorkBuddy 兼容 md2wechat。\n`).join("\n"),
    /overstates md2wechat support/
  )
  assert.doesNotMatch(
    validate(catalog, `${readme}\nmd2wechat 尚未支持 WorkBuddy。\n`).join("\n"),
    /overstates md2wechat support/
  )
})
