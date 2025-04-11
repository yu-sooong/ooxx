export function checkWinner(board: string[][]): 'X' | 'O' | 'draw' | null {
    const lines = [
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]],
    ];
    for (const line of lines) {
        const [[a1, a2], [b1, b2], [c1, c2]] = line;
        const v1 = board[a1][a2], v2 = board[b1][b2], v3 = board[c1][c2];
        if (v1 && v1 === v2 && v2 === v3) return v1 as 'X' | 'O';
    }
    return board.flat().every(cell => cell) ? 'draw' : null;
}
