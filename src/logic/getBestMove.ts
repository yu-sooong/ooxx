import { checkWinner } from './checkWinner';

// AI 會優先選擇快速獲勝，並強烈阻止玩家 X 獲勝
const scores = { X: -100, O: 100, draw: 0 };

export function getBestMove(board: string[][]): { row: number; col: number } {
    let bestScore = -Infinity;
    let move = { row: 0, col: 0 };

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (!board[i][j]) {
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

export function minimax(board: string[][], depth: number, isMaximizing: boolean): number {
    const result = checkWinner(board);
    if (result !== null) {
        return scores[result] - depth; // 越早贏越高分，越早輸越低分
    }

    if (isMaximizing) {
        let best = -Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (!board[i][j]) {
                    board[i][j] = 'O';
                    const score = minimax(board, depth + 1, false);
                    board[i][j] = '';
                    best = Math.max(score, best);
                }
            }
        }
        return best;
    } else {
        let best = Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (!board[i][j]) {
                    board[i][j] = 'X';
                    const score = minimax(board, depth + 1, true);
                    board[i][j] = '';
                    best = Math.min(score, best);
                }
            }
        }
        return best;
    }
}
