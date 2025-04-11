# 🧠 AI OX Game - TypeScript + Minimax

使用 TypeScript 與 Minimax 演算法實作的井字棋遊戲，支援：

- 🎮 OX 對戰電腦 AI
- 💬 Trash Talk（AI 嘴砲）
- 🔊 音效 / 🎤 語音朗讀
- 📱 支援手機震動
- 💻 單元測試與 GitHub Actions CI
- 🌐 Demo 部署到 GitHub Pages

> 專案部落格說明 👉 [我的 PaperMod 技術筆記](https://543t.netlify.app/posts/2025-04-11/hugo-paper-ooxx/)

---

## 🎬 Demo 影片

[![Watch the video](https://img.youtube.com/vi/wteKPhDTANw/hqdefault.jpg)](https://www.youtube.com/watch?v=wteKPhDTANw)


---

## 🚀 專案啟動

```bash
# 下載專案
git clone https://github.com/你的帳號/ooxx.git
cd ooxx

# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 打包生產版本
npm run build

# 預覽生產版本
npm run preview
```

---

## 🧪 單元測試（Vitest）

```bash
# 執行所有單元測試
npm run test

# 查看 Coverage
npm run coverage
```

---

## ✅ 測試內容包含

- `getBestMove()` 能夠正確落子
- `minimax()` 判斷勝負邏輯
- `checkWinner()` 判斷誰贏誰平手
- 回傳合法格子、不出界、不踩錯
- 多種盤面自動化測試情境

---

## 🤖 Minimax 調教重點

- `O = +100`，`X = -100`，`draw = 0`
- 加上 `-depth` → 早贏比晚贏好
- 具備防呆 + 日誌輸出

```ts
console.log(`[depth=${depth}] Tried (${i},${j}) => score = ${score}`);
```

---

## 🔧 技術棧

- TypeScript / DOM / TailwindCSS / Vite
- Minimax 演算法
- SpeechSynthesis API（語音朗讀）
- Vitest 單元測試
- GitHub Actions CI / Pages Deploy

---

## 🛠 部署到 GitHub Pages

```bash
npm run build
# dist/ 會產出靜態檔案
# 並透過 .github/workflows/deploy.yml 自動部署 gh-pages 分支
```

---

## 🧠 延伸目標

- [ ] 支援 NxN 棋盤擴充
- [ ] PvP 雙人模式
- [ ] 串接 實際 AI (HuggingFace/Open AI) / GPT 多模型切換

---
歡迎 PR、Star 🌟，也歡迎你改進 trash talk 嘴砲劇本！
