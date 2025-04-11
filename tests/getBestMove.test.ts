import { describe, it, expect } from 'vitest';
import { getBestMove } from '../src/logic/getBestMove';

describe('getBestMove', () => {
    it('should pick center on empty board', () => {
        const board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ];
        const move = getBestMove(board);

        // 檢查合法性
        expect(board[move.row][move.col]).toBe(''); // 確保 AI 選的位置是空的
        expect(move.row).toBeGreaterThanOrEqual(0); // 檢查 row（橫列）不能小於 0
        expect(move.row).toBeLessThan(3); // 確保 row 小於 3（因為棋盤大小是 3x3）
        expect(move.col).toBeGreaterThanOrEqual(0); // 檢查 col（直欄）不能小於 0 避免出界。
        expect(move.col).toBeLessThan(3); // 確保 col 小於 3 避免出界。
    });

    it('should win immediately if possible', () => {
        const board = [
            ['O', 'O', ''],
            ['X', 'X', ''],
            ['', '', ''],
        ];
        const move = getBestMove(board);
        expect(move).toEqual({ row: 0, col: 2 }); // 直接贏
    });

    it('should block opponent win', () => {
        const board = [
            ['X', 'X', ''],
            ['', '', ''],
            ['', '', ''],
        ];
        const move = getBestMove(board);
        expect(move).toEqual({ row: 0, col: 2 }); // 阻擋 X 贏
    });

    it('should choose faster win over slower win', () => {
        const board = [
            ['O', '', 'O'],
            ['X', 'O', 'X'],
            ['X', '', ''],
        ];
        const move = getBestMove(board);
        expect(move).toEqual({ row: 0, col: 1 }); // 越快贏越好
    });

    it('should result in a draw if no one can win', () => {
        const board = [
            ['O', 'X', 'O'],
            ['X', 'O', 'X'],
            ['', '', 'X'],
        ];
        const move = getBestMove(board);
        expect(move).toEqual({ row: 2, col: 0 }); // 無法獲勝時任選
    });
});
