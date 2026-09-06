import test from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { validateCatalog, validateLock } from "../scripts/check-catalog.mjs"

const catalog = JSON.parse(readFileSync(new URL("../data/projects.json", import.meta.url), "utf8"))
const lock = JSON.parse(readFileSync(new URL("../.md2wechat/ecosystem-facts.lock.json", import.meta.url), "utf8"))
const readme = readFileSync(new URL("../README.md", import.meta.url), "utf8")

test("current catalog, README and ecosystem pins agree", () => {
  assert.deepEqual(validateLock(lock), [])
  assert.deepEqual(validateCatalog(catalog, readme), [])
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
  assert.match(validateCatalog(changed, readme).join("\n"), /unknown license requires review-due|verified project needs a known license/)
})

test("relationship disclosures reject vague affiliation", () => {
  const changed = structuredClone(catalog)
  changed.projects.find(item => item.id === "md2wechat").relationship = "related project"
  assert.match(validateCatalog(changed, readme).join("\n"), /relationship must explain maintainer affiliation/)
})

test("invalid dates, duplicate entries and non-HTTPS evidence are rejected", () => {
  const changed = structuredClone(catalog)
  changed.projects[0].lastActivity = "2026-02-30"
  changed.projects[1].entry = changed.projects[0].entry
  changed.projects[2].evidenceUrls[0] = "http://example.com/readme"
  const errors = validateCatalog(changed, readme).join("\n")
  assert.match(errors, /invalid lastActivity/)
  assert.match(errors, /duplicate entry/)
  assert.match(errors, /evidenceUrls must contain HTTPS URLs/)
})

test("README must include each entry once and cannot add untracked repositories", () => {
  const missing = readme.replace(catalog.projects[0].entry, "https://example.com/missing")
  assert.match(validateCatalog(catalog, missing).join("\n"), /entry must appear exactly once/)

  const extra = `${readme}\n[extra](https://github.com/example/untracked)\n`
  assert.match(validateCatalog(catalog, extra).join("\n"), /untracked repository/)
})

test("README rejects ranking, mutable popularity and mechanical labels", () => {
  for (const phrase of ["Stars", "排行榜", "最全", "最近核验", "关系披露"]) {
    assert.match(validateCatalog(catalog, `${readme}\n${phrase}\n`).join("\n"), /banned wording/)
  }
})

test("platform records cannot overstate md2wechat compatibility", () => {
  const changed = structuredClone(catalog)
  changed.platforms[0].publiclySupported = true
  changed.platforms[1].md2wechatStatus = "verified"
  const errors = validateCatalog(changed, readme).join("\n")
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
