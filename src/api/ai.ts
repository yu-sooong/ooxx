// const HF_API_KEY = import.meta.env.VITE_HF_API_KEY;
// const MODEL = "mistralai/Mistral-7B-Instruct-v0.1";
// const API_URL = `https://api-inference.huggingface.co/models/${MODEL}`;
//
// export async function askHuggingFaceMove(board: string[][]): Promise<{ row: number; col: number }> {
//   const prompt = `
// 你是一位井字棋專家，請根據當前棋盤選出你作為 O 的最佳落子。
//
// 棋盤如下（X 是玩家，O 是你）：
// ${JSON.stringify(board)}
//
// 請注意：
// - 不要下在已經有棋子的格子上。
// - 棋盤是 3x3 的，座標從 0 開始。
// - 只回傳 JSON 格式的落子，例如：{"row":1,"col":2}
// `;
//
//   const response = await fetch(API_URL, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${HF_API_KEY}`,
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//       inputs: prompt,
//       options: { wait_for_model: true }
//     })
//   });
//
//   const result = await response.json();
//   const text = result[0]?.generated_text || "";
//
//   // 嘗試擷取 JSON 格式
//   const match = text.match(/\{[\s\S]*?\}/);
//   try {
//     return match ? JSON.parse(match[0]) : { row: -1, col: -1 };
//   } catch {
//     console.error("AI 回傳格式錯誤：", text);
//     return { row: -1, col: -1 };
//   }
// }
import { checkWinner } from '../utils/game.ts';

export function getBestMove(board: string[][]): { row: number; col: number } {
  let bestScore = -Infinity;
  let move = { row: 0, col: 0 };

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === '') {
        board[i][j] = 'O';
        const score = minimax(board, 0, false);
        board[i][j] = '';
        if (score > bestScore) {
          bestScore = score;
          move = { row: i, col: j };
        }
      }
    }
  }

  return move;
}

const scores = { X: -1, O: 1, draw: 0 };

function minimax(board: string[][], depth: number, isMaximizing: boolean): number {
  const result = checkWinner(board);
  if (result) return scores[result];

  if (isMaximizing) {
    let best = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === '') {
          board[i][j] = 'O';
          best = Math.max(best, minimax(board, depth + 1, false));
          board[i][j] = '';
        }
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === '') {
          board[i][j] = 'X';
          best = Math.min(best, minimax(board, depth + 1, true));
          board[i][j] = '';
        }
      }
    }
    return best;
  }
}

