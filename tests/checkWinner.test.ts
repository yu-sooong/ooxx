// tests/checkWinner.test.ts
import { describe, it, expect } from 'vitest';
import { checkWinner } from '../src/logic/checkWinner';

describe('checkWinner', () => {
    it('should return X when X wins a row', () => {
        const board = [
            ['X', 'X', 'X'],
            ['', '', ''],
            ['', '', ''],
        ];
        expect(checkWinner(board)).toBe('X');
    });

    it('should return O when O wins a diagonal', () => {
        const board = [
            ['O', '', 'X'],
            ['', 'O', 'X'],
            ['', '', 'O'],
        ];
        expect(checkWinner(board)).toBe('O');
    });

    it('should return draw when board is full with no winner', () => {
        const board = [
            ['X', 'O', 'X'],
            ['X', 'O', 'O'],
            ['O', 'X', 'X'],
        ];
        expect(checkWinner(board)).toBe('draw');
    });

    it('should return null when game is ongoing', () => {
        const board = [
            ['X', '', 'O'],
            ['', '', ''],
            ['', '', ''],
        ];
        expect(checkWinner(board)).toBe(null);
    });
});
