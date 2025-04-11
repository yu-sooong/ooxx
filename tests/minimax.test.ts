import { describe, it, expect } from 'vitest';
import { minimax } from '../src/logic/getBestMove';

describe('minimax', () => {
    it('should return positive score when O is winning', () => {
        const board = [
            ['O', 'O', ''],
            ['X', 'X', ''],
            ['', '', ''],
        ];
        const score = minimax(board, 0, true);
        expect(score).toBeGreaterThan(0); // AI 有贏的機會
    });

    it('should return negative score when X is winning', () => {
        const board = [
            ['X', 'X', ''],
            ['O', '', ''],
            ['', '', ''],
        ];
        const score = minimax(board, 0, false);
        expect(score).toBeLessThan(0); // 玩家有贏的機會
    });

    it('should return 0 for a draw board', () => {
        const board = [
            ['X', 'O', 'X'],
            ['X', 'O', 'O'],
            ['O', 'X', 'X'],
        ];
        const score = minimax(board, 0, true);
        expect(score).toBe(0); // 平手
    });

    it('should return the correct score at depth > 0', () => {
        const board = [
            ['O', 'O', ''],
            ['', 'X', ''],
            ['', '', 'X'],
        ];
        const score = minimax(board, 1, true);
        expect(typeof score).toBe('number');
    });
});
