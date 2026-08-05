# 财务会计（中级）答题练习

打开页面后**按章懒加载**题库，并缓存已解析章节，题量变大时也能保持打开速度。

## 在线打开

https://haoyi01.github.io/facct-quiz/

## 结构

| 文件 | 作用 |
|------|------|
| `questions.md` | 完整题库源文件（便于整体编辑） |
| `chapters/chXX.md` | 按章拆分，页面实际按章下载 |
| `manifest.json` | 章节目录（体积很小，优先加载） |
| `index.html` | 答题页 |
| `split-md.js` | 从 `questions.md` 重新拆章 |

## 如何改题

1. 在 GitHub 网页上编辑 `questions.md` 并 Commit
2. 仓库会**自动**跑 `split-md.js`，更新 `chapters/` 与 `manifest.json`（无需本机安装 Node）
3. 也可手动触发：仓库 → Actions → **Split questions.md** → Run workflow
4. 打开答题页，点「清除缓存并重载」

本地若有 Node，也可自行执行：`node split-md.js`

## 性能说明

- 首次只下载目录 + 当前章（约十几 KB），不再整包拉全库
- 解析结果缓存在浏览器 localStorage，同章再次进入几乎秒开
- 「查看成绩」会按需补加载尚未打开过的章节
