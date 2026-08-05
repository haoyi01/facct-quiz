/**
 * Split questions.md → chapters/chXX.md + manifest.json
 * Usage: node split-md.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const mdPath = path.join(ROOT, "questions.md");
const outDir = path.join(ROOT, "chapters");

if (!fs.existsSync(mdPath)) {
  console.error("缺少 questions.md");
  process.exit(1);
}

const md = fs.readFileSync(mdPath, "utf8");
const parts = md.split(/\n## /);
fs.mkdirSync(outDir, { recursive: true });

const index = [];
let n = 0;
for (const block of parts) {
  const title = block.split("\n")[0].trim();
  if (!title.startsWith("第")) continue;
  n++;
  const id = String(n).padStart(2, "0");
  const file = "ch" + id + ".md";
  const body = "## " + block.trim() + "\n";
  fs.writeFileSync(path.join(outDir, file), body, "utf8");
  const ans = block.match(/### 【.+?答案与解析】/);
  const qPart = ans ? block.slice(0, block.indexOf(ans[0])) : block;
  const qCount = [...qPart.matchAll(/\*\*(\d+)\.\*\*/g)].length;
  index.push({
    id,
    file: "chapters/" + file,
    title,
    questionCount: qCount,
  });
  console.log(id, qCount, "题", title.slice(0, 28));
}

fs.writeFileSync(
  path.join(ROOT, "manifest.json"),
  JSON.stringify({ version: 1, chapters: index }, null, 2),
  "utf8"
);
console.log(
  "完成：",
  index.length,
  "章，共",
  index.reduce((s, c) => s + c.questionCount, 0),
  "题"
);
