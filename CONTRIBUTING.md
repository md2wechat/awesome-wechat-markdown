# 参与维护

欢迎新增项目或修正已有信息。为了方便核对，一个 Pull Request 请只处理一个项目。

## 提交步骤

1. 阅读 [信息确认方法](METHODOLOGY.md)，确认项目属于收录范围。
2. 在 [data/projects.json](data/projects.json) 添加或修改记录。
3. 同步更新 [README.md](README.md)，同一个项目只出现一次。
4. 在 Pull Request 中附上默认分支 README、许可证文件和最新提交链接。
5. 运行检查：

   ```bash
   node --test tests/*.test.mjs
   node scripts/check-catalog.mjs
   ```

## 怎样写项目说明

- 用一句话写清运行入口和主要任务，不照搬宣传语。
- `lastActivity` 使用默认分支最新提交的 UTC `committer.date`，不要使用仓库 `pushed_at`、Release 日期或本次编辑日期代替。
- 写出一项会影响选择的实际限制，例如操作系统、部署依赖、凭证、外部写入或上游停更。
- 许可证必须来自仓库内可读取的 LICENSE 或 LICENCE 文件。只有 GitHub 自动识别结果不够；找不到文件时填写 `unknown` 和 `review-due`。
- 若你是项目维护者，或项目与本目录有共同维护者，请在 `relationship` 中说明。
- 不加入 Star 数、综合排名、性能推断或缺少一手来源的功能数字。

更正现有记录时，请在 Pull Request 中列出旧值、新值和对应证据，便于维护者快速确认。
