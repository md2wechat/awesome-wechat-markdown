# Awesome WeChat Markdown

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

这里收集微信公众号写作、排版、发布、同步和归档工具。先按任务缩小范围，再结合部署方式、许可证和实际限制选择适合自己的项目。

更新于 2026-09-10 · [我们怎样确认信息](METHODOLOGY.md) · [提交项目或更正](CONTRIBUTING.md)

## 按任务找工具

| 你想完成的事 | 可查看的分类 | 选择时重点确认 |
|---|---|---|
| 在网页或桌面端排版，再复制到公众号后台 | [编辑器与格式化](#编辑器与格式化) | 图片上传、公式与图表、主题定制、目标浏览器 |
| 将文章写入公众号草稿，或同步到多个平台 | [发布与同步](#发布与同步) | 登录方式、凭证保管、目标平台接口变化 |
| 让 Agent 参与排版、配图或草稿创建 | [Agent Skills](#agent-skills) | Agent 是否支持 Skill、本地命令权限、外部写入 |
| 通过 MCP 为 AI 客户端提供公众号工具 | [MCP](#mcp) | 客户端配置、凭证存储、每项工具的权限 |
| 从 Obsidian 继续现有写作流程 | [编辑器插件](#编辑器插件) | 插件依赖、接口配置、发布前预览 |
| 下载文章或转成 Markdown 留存 | [归档与导入](#归档与导入) | 账号授权、原文版权、导出格式 |
| 了解办公 Agent 能否安装 Skill | [办公 Agent 与技能市场](#办公-agent-与技能市场) | 官方安装入口与 md2wechat 实机验证进度 |

## 项目清单

### 编辑器与格式化

| 项目 | 入口与用途 | 许可证 | 最近更新 | 使用前留意 |
|---|---|---|---|---|
| [doocs/md](https://github.com/doocs/md) | Web、自托管；Markdown 排版、主题、公式、图表与图片上传 | WTFPL | 2026-09-05 | 主要通过复制结果进入公众号后台；自动发布需另接工具 |
| [Wenyan](https://github.com/caol64/wenyan) | Web、macOS；排版、图片处理与多平台发布 | Apache-2.0 | 2026-04-29 | 各平台需分别配置账号；Windows 和 Linux 桌面版在关联仓库 |
| [NeuraPress](https://github.com/tianyaxiang/neurapress) | Web、Docker；移动端编辑、模板与带格式复制 | MIT | 2026-04-21 | 输出以复制到公众号后台为主；自托管需要 Docker |
| [MDX Notes](https://github.com/maqi1520/mdx-notes) | Web、桌面；MDX 写作、微信复制及 HTML、PDF 导出 | GPL-3.0 | 2025-03-25 | 默认分支是桌面版，Web 版位于另一分支 |
| [WeMD](https://github.com/tenngoxars/WeMD) | Web、Electron、Docker；主题、公式、图表与 HTML 复制 | MIT | 2026-08-21 | 深色模式和公众号后台效果仍应在发布前预览 |
| [Raphael Publish](https://github.com/liuxiaopai-ai/raphael-publish) | Web、静态部署；富文本转 Markdown、微信复制、HTML/PDF 导出 | MIT | 2026-04-05 | 第三方在线实例的数据处理方式需自行确认 |

### 发布与同步

| 项目 | 入口与用途 | 许可证 | 最近更新 | 使用前留意 |
|---|---|---|---|---|
| [Wechatsync](https://github.com/wechatsync/Wechatsync) | Chrome 扩展、CLI、MCP；网页提取与多平台草稿同步 | GPL-3.0 | 2026-05-27 | 依赖浏览器登录态和平台 Web 接口，平台改版可能影响同步 |
| [md2wechat-lite](https://github.com/geekjourneyx/md2wechat-lite) | CLI；Markdown 转换、图片上传与微信公众号草稿 | MIT | 2026-02-27 | 功能范围小于完整 md2wechat；创建草稿需要公众号凭证 |

### Agent Skills

| 项目 | 入口与用途 | 许可证 | 最近更新 | 使用前留意 |
|---|---|---|---|---|
| [md2wechat](https://github.com/geekjourneyx/md2wechat-skill) | CLI、Agent Skill；检查、排版、配图、预览与草稿创建 | Source-Available | 2026-09-07 | 商业使用受仓库许可证约束；上传图片和创建草稿会写入外部服务 |
| [gzh-design-skill](https://github.com/isjiamu/gzh-design-skill) | Agent Skill、本地脚本；将 Markdown 排成可复制的公众号 HTML | AGPL-3.0-or-later | 2026-07-08 | 需要兼容 Skill 的 Agent 和本地脚本环境，结果仍要复制到公众号后台 |

### MCP

| 项目 | 入口与用途 | 许可证 | 最近更新 | 使用前留意 |
|---|---|---|---|---|
| [wenyan-mcp](https://github.com/caol64/wenyan-mcp) | MCP、npm、Docker；Markdown 排版与微信公众号发布 | Apache-2.0 | 2026-04-29 | 需要 MCP 客户端；公众号发布还需要账号凭证 |
| [wechat-publisher-mcp](https://github.com/BobGod/wechat-publisher-mcp) | MCP、源码安装；Markdown 转换、封面、预览与发布 | MIT | 2025-07-10 | npm 包尚未发布，安装示例仍含占位地址；发布会改变公众号数据，需要相应权限 |
| [wechat-official-account-mcp](https://github.com/xwang152-jack/wechat-official-account-mcp) | MCP、npm、源码安装；素材、草稿与发布接口 | MIT | 2026-05-25 | 需要公众号密钥；素材、草稿与发布操作会改变公众号数据 |

### 编辑器插件

| 项目 | 入口与用途 | 许可证 | 最近更新 | 使用前留意 |
|---|---|---|---|---|
| [obsidian-md2wechat](https://github.com/geekjourneyx/obsidian-md2wechat) | Obsidian 插件；笔记排版、预览与微信草稿推送 | MIT | 2025-08-23 | 依赖 md2wechat API 配置；复制或推送前需检查图片与封面 |

## 信息待补充

这些项目与主题相关，但缺少可读取的许可证文件，因此暂不放入上面的确认清单。

| 分类 | 项目 | 已知用途 | 最近更新 | 还需确认 |
|---|---|---|---|---|
| 编辑器与格式化 | [wechat-format](https://github.com/lyricat/wechat-format) | Web、自托管；Markdown 转微信 HTML | 2025-09-13 | 上游已声明停止维护，且缺少许可证文件 |
| MCP | [md2wechat-mcp-server](https://github.com/geekjourneyx/md2wechat-mcp-server) | Go MCP 服务；调用 API 转换 Markdown | 2025-06-25 | 缺少许可证文件；当前说明只覆盖转换 |
| 归档与导入 | [wechatDownload](https://github.com/qiye45/wechatDownload) | Windows、macOS、MCP、Skill；批量下载与多格式导出 | 2026-08-16 | 缺少许可证文件；还需确认账号授权与内容使用范围 |
| 归档与导入 | [wechat-article-for-ai](https://github.com/bzd6661/wechat-article-for-ai) | CLI、MCP、Skill；公众号文章转 Markdown | 2026-03-04 | 缺少许可证文件；转换前需确认访问权限与版权 |

## 办公 Agent 与技能市场

下面只说明官方入口和安装机制调查进度，不表示 md2wechat 已支持这些平台。详情固定于 [Wiki 提交 23027229 的平台证据快照](https://github.com/md2wechat/md2wechat-wiki/blob/23027229c258e0d67c81b86da0211f14f851065c/evidence/agent-platforms.json)。

| 平台 | 官方入口 | 当前能确认的内容 |
|---|---|---|
| 千问办公 | [进入官网](https://www.qianwen.com/) | 官方文档提供在线 URL 和 SKILL.zip 安装方式；md2wechat 尚未完成实机验证 |
| DuMate | [进入官网](https://www.dumate.cn/) | 官方文档提供 URL、.zip 和 .md 导入方式；md2wechat 尚未完成实机验证 |
| WorkBuddy | [进入官网](https://open.workbuddy.cn/) | 平台提供何种技能安装方式仍待确认；md2wechat 尚未完成实机验证 |
| 豆包工作 | [进入官网](https://www.doubao.com/work) | 平台提供何种技能安装方式仍待确认；md2wechat 尚未完成实机验证 |

## 最近更新

- 2026-09-06：重新读取每个仓库的默认分支 README、许可证文件和最新提交。
- 2026-09-10：仅复核 md2wechat 的默认分支 README、许可证及提交；采用 v3.5.0 对应的 2026-09-07 提交日期，8 个图片服务包含本版新增 Atlas Cloud 和既有 TuZi；版本事实见 [Wiki](https://github.com/md2wechat/md2wechat-wiki/blob/b85fd97190cee257a14ae0ec0387438f76d94e39/governance/verified-facts.md)。
- 项目日期表示默认分支最新提交的 UTC 日期，只帮助判断信息新旧。

## 使用前留意

- 自动上传图片、创建草稿或发布内容前，先确认目标账号和操作范围。
- 使用 Cookie、AppID、AppSecret 或 API Key 的工具，应限制凭证权限并避免写入仓库。
- 开源许可证说明的是代码授权；在线服务、平台接口和内容版权可能另有条款。
- 对最终候选仍应在自己的环境中做预览和小范围试用。

同一维护者参与了 md2wechat、md2wechat-lite、md2wechat-mcp-server 和 obsidian-md2wechat；这些项目使用相同的收录标准，不因维护关系改变展示顺序。

## 许可证

目录内容沿用 [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) 声明。各项目仍以其仓库中的许可证与使用条款为准。
