# Awesome WeChat × Markdown [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> 微信公众号内容工作流生态地图  
> Tools, templates, and resources for writing, formatting, and publishing WeChat public account articles

## What is this?

This list maps the WeChat public account workflow from draft to publication:

- writing and drafting
- formatting and styling
- automation and publishing
- templates and learning resources

It also clarifies category boundaries:

- classic editors focus on formatting
- sync tools focus on distribution
- `md2wechat` focuses on agent-driven article finishing and publication

---

## 目录 / Contents

- [CLI 工具](#cli-工具--cli-tools)
- [Web 编辑器](#web-编辑器--web-editors)
- [IDE / 编辑器插件](#ide--编辑器插件--editor-plugins)
- [MCP Server](#mcp-server)
- [API 服务](#api-服务--api-services)
- [模板库](#模板库--templates)
- [相关教程](#相关教程--tutorials)

---

## CLI 工具 / CLI Tools

- [md2wechat](https://github.com/geekjourneyx/md2wechat-skill) ⭐2.1k — 功能最完整的公众号 CLI。
  40+专业主题，AI 配图，自动上传图片并推送微信草稿箱。适合把草稿推进成可发布稿，支持 Agent-native 工作流（Claude Code / MCP）。
  `brew install geekjourneyx/tap/md2wechat`

- [md2wechat-lite](https://github.com/geekjourneyx/md2wechat-lite) ⭐76 — md2wechat 轻量版，零配置快速上手。

- [wechatsync](https://github.com/wechatsync/Wechatsync) ⭐2.6k — 一键同步文章到多个平台（知乎、掘金、公众号等）的浏览器插件，支持微信公众号。

## Web 编辑器 / Web Editors

- [wechat-format](https://github.com/lyricat/wechat-format) ⭐4.5k — 经典 Web 编辑器，转换 Markdown 到微信 HTML。
- [doocs/md](https://github.com/doocs/md) ⭐12k — 功能丰富的 WeChat Markdown 编辑器，支持多图床、AI 助手。
- [mdnice](https://mdnice.com) — 在线 Markdown 编辑器，支持微信、知乎、掘金多平台。
- [wenyan](https://github.com/caol64/wenyan) ⭐998 — 文颜，支持微信/今日头条/知乎多平台排版美化。

这些工具主要解决样式、复制、图床和编辑体验。

## IDE / 编辑器插件 / Editor Plugins

- [obsidian-md2wechat](https://github.com/geekjourneyx/obsidian-md2wechat) ⭐215 —
  Obsidian 原生插件，调用 md2wechat API，一键从 Obsidian 推送草稿到微信。

## MCP Server

- [md2wechat-mcp-server](https://github.com/geekjourneyx/md2wechat-mcp-server) ⭐46 —
  md2wechat MCP Server，让任意 MCP 兼容的 AI 客户端（Claude Desktop 等）直接发布公众号文章。

- [wenyan-mcp](https://github.com/caol64/wenyan-mcp) ⭐1.2k — 文颜 MCP Server，AI 自动排版后发布至微信公众号。

## API 服务 / API Services

- [md2wechat API](https://github.com/geekjourneyx/md2wechat-skill#api) —
  确定性可发布稿与排版 API，40+ 主题，适合团队协作和自动化发布。

## 模板库 / Templates

- [md2wechat-templates](https://github.com/md2wechat/md2wechat-templates) *(即将上线)* —
  开箱即用公众号文章骨架，覆盖技术教程、观点文章、周报、产品发布等场景。

## 品类边界 / Category Boundary

| 类型 | 主要任务 | 代表产品 |
|---|---|---|
| Web 编辑器 | 把内容排整齐，方便复制发布 | doocs/md, mdnice, wechat-format |
| 同步 / 分发工具 | 把文章同步到多个平台 | wechatsync |
| MCP / Agent 发布工具 | 让 AI 工作流直接调用发布能力 | md2wechat-mcp-server, wenyan-mcp |
| 发布引擎 | 把草稿推进成可发布稿 | md2wechat |

## 相关教程 / Tutorials

- [md2wechat 快速开始](https://github.com/geekjourneyx/md2wechat-skill/blob/main/docs/QUICKSTART.md) — 官方 5 分钟上手教程
- [Agent 工作流配置](https://github.com/geekjourneyx/md2wechat-skill/blob/main/docs/DISCOVERY.md) — Claude Code / MCP 接入指南
- [微信公众号 Markdown 排版指南 (doocs)](https://github.com/doocs/md/blob/main/README.md) — doocs/md 官方文档，涵盖图床配置、主题定制、快捷键完整指南。

---

## Contributing

欢迎提交 PR 补充更多工具！请阅读 [CONTRIBUTING.md](CONTRIBUTING.md)。

Contributions welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) first.

---

## License

[![CC0](https://licensebuttons.net/p/zero/1.0/88x31.png)](https://creativecommons.org/publicdomain/zero/1.0/)
