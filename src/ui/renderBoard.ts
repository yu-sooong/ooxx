export function renderBoard({
                                board,
                                isThinking,
                                onClick
                            }: {
    board: string[][];
    isThinking: boolean;
    onClick: (r: number, c: number) => void;
}) {
    const boardElem = document.getElementById('board')!;
    boardElem.innerHTML = '';

    board.forEach((row, r) => {
        row.forEach((cell, c) => {
            const btn = document.createElement('button');
            btn.className = `
        w-[100px] h-[100px]
        text-8xl font-extrabold
        border border-gray-300 dark:border-gray-700
        rounded-xl shadow transition-transform duration-200 ease-in-out
        hover:scale-105 active:scale-95
        ${cell === 'X' ? 'text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-800' :
                cell === 'O' ? 'text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-800' :
                    'text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'}
        ${cell === '' ? 'bg-white dark:bg-gray-900' : 'bg-transparent'}
      `;
            btn.textContent = cell;
            if (!cell && !isThinking) btn.onclick = () => onClick(r, c);
            boardElem.appendChild(btn);
        });
    });
}
