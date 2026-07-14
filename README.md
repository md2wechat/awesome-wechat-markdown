# Awesome WeChat Markdown

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

面向微信公众号 Markdown 写作、排版、发布、同步与归档的开源项目目录。每条记录说明部署方式、许可证、最近活动和使用边界，方便按任务筛选。

最近核验：2026-07-14 · [收录与复核方法](METHODOLOGY.md) · [提交项目或更正记录](CONTRIBUTING.md)

目录不使用 Star 数或综合分排序。项目状态表示本目录的核验结果，不代表安全审计或质量担保。

## 先按任务选择

| 你的任务 | 优先查看 | 选择时确认 |
|---|---|---|
| 在网页中排版，再复制到公众号后台 | [编辑器与格式化工具](#编辑器与格式化工具) | 图床、公式与图表、主题定制、浏览器兼容性 |
| 将同一篇文章同步到多个平台 | [发布与同步](#发布与同步) | 登录方式、Cookie 保管、目标平台接口变化 |
| 让 AI Agent 处理排版和草稿发布 | [Agent Skills](#agent-skills) | 客户端支持、密钥权限、命令副作用 |
| 为 AI 客户端接入微信公众号能力 | [MCP Servers](#mcp-servers) | MCP 客户端、凭证存储、工具调用权限 |
| 从 Obsidian 写作并发布 | [编辑器插件](#编辑器插件) | 插件依赖、接口配置、发布前预览 |
| 保存或导入公众号历史文章 | [归档与导入](#归档与导入) | 授权范围、媒体下载、导出格式 |

## 已核验项目

### 编辑器与格式化工具

| 项目 | 入口与能力 | 许可证 | 最近活动 | 使用边界 |
|---|---|---|---|---|
| [doocs/md](https://github.com/doocs/md) | Web、自托管、CLI；微信 HTML、主题、KaTeX、Mermaid、图床 | WTFPL | 2026-07-14 | 主要流程是编辑后复制；发布自动化需另接工具 |
| [Wenyan](https://github.com/caol64/wenyan) | macOS；Markdown 排版、图片上传、多平台发布、自定义主题 | Apache-2.0 | 2026-04-29 | 桌面端以 macOS 为主；平台发布需要对应账号配置 |
| [NeuraPress](https://github.com/tianyaxiang/neurapress) | Web、自托管；Markdown 编辑、自定义样式、复制 HTML | MIT | 2026-04-21 | 自托管需要 Docker 环境；复制后仍需在公众号后台检查 |
| [MDX Notes](https://github.com/maqi1520/mdx-notes) | Web、桌面；MDX 笔记、微信复制、HTML/PDF 导出 | GPL-3.0 | 2026-02-16 | 功能覆盖笔记与导出，公众号发布以复制流程为主 |
| [WeMD](https://github.com/tenngoxars/WeMD) | Web、Electron、Docker；主题、图床、GFM、KaTeX、Mermaid | MIT | 2026-06-26 | 多种部署入口的配置不同；发布前需验证目标浏览器效果 |
| [Raphael Publish](https://github.com/liuxiaopai-ai/raphael-publish) | Web、静态部署；富文本转 Markdown、微信复制、HTML/PDF 导出 | MIT | 2026-04-05 | 采用复制发布流程；第三方部署实例需自行判断数据边界 |

### 发布与同步

| 项目 | 入口与能力 | 许可证 | 最近活动 | 使用边界 |
|---|---|---|---|---|
| [Wechatsync](https://github.com/wechatsync/Wechatsync) | 浏览器扩展、CLI、MCP；网页提取、多平台草稿同步 | GPL-3.0 | 2026-05-27 | 依赖浏览器登录、Cookie 和平台 Web 接口；接口变更可能影响同步 |
| [md2wechat-lite](https://github.com/geekjourneyx/md2wechat-lite) | CLI；Markdown 转换与微信公众号草稿发布 | MIT | 2026-02-27 | 轻量工作流，复杂排版和 Agent 编排请查看完整项目 |

### Agent Skills

| 项目 | 入口与能力 | 许可证 | 最近活动 | 使用边界 |
|---|---|---|---|---|
| [md2wechat](https://github.com/geekjourneyx/md2wechat-skill) | CLI、Agent Skill；检查、排版、配图、预览、草稿发布 | Source-Available | 2026-07-13 | 商业使用受仓库许可证约束；上传图片和创建草稿会改变外部状态 |

> 关系披露：`md2wechat`、`md2wechat-lite` 与本目录存在共同维护者，采用同一套收录字段，没有排序优先级。

### MCP Servers

| 项目 | 入口与能力 | 许可证 | 最近活动 | 使用边界 |
|---|---|---|---|---|
| [wenyan-mcp](https://github.com/caol64/wenyan-mcp) | MCP；Markdown 格式化与微信公众号发布 | Apache-2.0 | 2026-04-29 | 需要 MCP 客户端和微信公众号凭证；调用发布工具前应检查参数 |
| [wechat-publisher-mcp](https://github.com/BobGod/wechat-publisher-mcp) | MCP；微信公众号素材与草稿发布 | MIT | 2025-07-10 | 需要公众号 API 凭证；维护活跃度低于本表其他项目 |
| [wechat-official-account-mcp](https://github.com/xwang152-jack/wechat-official-account-mcp) | MCP；微信公众号内容管理与发布接口 | MIT | 2026-05-25 | 涉及账号凭证和外部写操作，部署时需限制调用权限 |

### 编辑器插件

| 项目 | 入口与能力 | 许可证 | 最近活动 | 使用边界 |
|---|---|---|---|---|
| [obsidian-md2wechat](https://github.com/geekjourneyx/obsidian-md2wechat) | Obsidian 插件；笔记排版、预览、推送微信草稿 | MIT | 2025-08-23 | 依赖 Obsidian 与 md2wechat 接口配置；发布前需检查图片和封面 |

> 关系披露：`obsidian-md2wechat` 与本目录存在共同维护者。

## 待复核项目

这些项目与主题相关，许可证或关键边界仍需补证。确认授权条款后才能进入已核验项目。

### 编辑器与格式化工具

- [wechat-format](https://github.com/lyricat/wechat-format) — Web 端 Markdown 转微信 HTML。最近活动：2025-09-13。GitHub 未识别许可证。

### Agent Skills

- [gzh-design-skill](https://github.com/isjiamu/gzh-design-skill) — 面向公众号图文设计的 Agent Skill。最近活动：2026-07-08。GitHub 未识别许可证。

### MCP Servers

- [md2wechat-mcp-server](https://github.com/geekjourneyx/md2wechat-mcp-server) — 将微信公众号发布能力暴露给 MCP 客户端。最近活动：2025-06-25。GitHub 未识别许可证；与本目录存在共同维护者。

### 归档与导入

- [wechatDownload](https://github.com/qiye45/wechatDownload) — 公众号文章下载与本地归档。最近活动：2026-06-21。GitHub 未识别许可证。
- [wechat-article-for-ai](https://github.com/bzd6661/wechat-article-for-ai) — 将公众号文章转为 AI 可处理的内容。最近活动：2026-03-04。GitHub 未识别许可证。

## md2wechat 官方参考

以下页面由本目录维护者所属项目维护，用于核对 md2wechat 的能力和接口，不参与项目排名。

- [产品对比](https://www.md2wechat.cn/compare)：按任务查看工作流差异。
- [API 文档](https://www.md2wechat.cn/api-docs)：转换接口、请求字段和返回结构。
- [文档中心](https://www.md2wechat.cn/docs)：安装、配置、命令与常见问题。
- [高级排版模块](https://www.md2wechat.cn/features)：排版能力与适用场景。

## 许可证

目录内容采用 [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) 发布。各项目遵循其仓库中的许可证与使用条款。
