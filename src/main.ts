// main.ts
import { getBestMove } from './api/ai.ts';
import { checkWinner } from './utils/game.ts';

let board: string[][] = Array.from({ length: 3 }, () => Array(3).fill(''));
let isThinking = false;
let soundEnabled = true;
let trashTalkEnabled = true;

const boardElem = document.getElementById('board')!;
const resetBtn = document.getElementById('reset')!;
const modal = document.getElementById('result-modal')!;
const modalTitle = document.getElementById('modal-title')!;
const modalClose = document.getElementById('modal-close')!;
const spinner = document.getElementById('spinner')!;
const talkElem = document.getElementById('talk')!;
const talkText = document.getElementById('talk-text')!;
const soundToggle = document.getElementById('toggle-sound') as HTMLInputElement;
const trashToggle = document.getElementById('toggle-trash') as HTMLInputElement;
const themeToggle = document.getElementById('theme-toggle') as HTMLInputElement;

const trashTalks = [
  "你這一步下得不錯，但還不夠。",
  "你要認真了嗎。",
  "你有在思考嗎？",
  "這招我已經見過 101 次了。",
  "放棄吧，我是為這個遊戲而生的。",
  "年輕人、有讀書嗎。",
  "哇，居然敢這樣下？",
];

// 初始化主題

soundToggle.addEventListener('change', () => {
  soundEnabled = soundToggle.checked;
});

trashToggle.addEventListener('change', () => {
  trashTalkEnabled = trashToggle.checked;
});

function showModal(message: string) {
  modalTitle.textContent = message;
  modal.classList.remove('hidden');
}

modalClose.addEventListener('click', () => {
  modal.classList.add('hidden');
  resetGame();
});

function resetGame() {
  board = Array.from({ length: 3 }, () => Array(3).fill(''));
  talkElem.classList.add('hidden');
  talkText.textContent = '';
  renderBoard();
}
const soundPlayer = {
  ai: new Audio('/sounds/ai.mp3'),
  click: new Audio('/sounds/click.mp3'),
}

function renderBoard() {
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

      if (!cell && !checkWinner(board) && !isThinking) {
        btn.onclick = async () => {
          if (isThinking) return;

          board[r][c] = 'X';
          if (navigator.vibrate) navigator.vibrate(50); // 玩家下棋
          if (soundEnabled) soundPlayer.click.play();
          renderBoard();

          const result = checkWinner(board);
          if (result) return showResult(result);

          isThinking = true;
          spinner.classList.remove('hidden');

          if (trashTalkEnabled) {

            const randomTalk = trashTalks[Math.floor(Math.random() * trashTalks.length)];
            showTrashTalk(randomTalk);

            if ('speechSynthesis' in window && soundEnabled) {
              const utterance = new SpeechSynthesisUtterance(randomTalk);
              utterance.lang = 'zh-TW';
              speechSynthesis.cancel();
              speechSynthesis.speak(utterance);
            }
          } else {
            talkElem.classList.add('hidden');
          }

          await new Promise(resolve => setTimeout(resolve, 1200));

          const { row, col } = getBestMove(board);
          board[row][col] = 'O';
          if (navigator.vibrate) navigator.vibrate(50); // AI 下棋
          if (soundEnabled) soundPlayer.ai.play();

          isThinking = false;
          spinner.classList.add('hidden');
          renderBoard();

          const newResult = checkWinner(board);
          if (newResult) return showResult(newResult);
        };
      }

      boardElem.appendChild(btn);
    });
  });
}

function showResult(result: string) {
  if (result === 'draw') {
    showModal('平手了！');
  } else if (result === 'X') {
    showModal('你贏了！');
  } else {
    showModal('AI 贏了！');
  }
}

function showTrashTalk(text: string) {
  const talk = document.getElementById('talk')!;
  const talkText = document.getElementById('talk-text')!;

  talkText.textContent = text;

  talk.classList.remove('hidden', 'animate-fade-out');
  talk.classList.add('animate-fade-in');

  // 清除之前的 timeout（避免多重觸發）
  clearTimeout((talk as any)._fadeOutTimer);

  // 0.5 秒後自動淡出
  (talk as any)._fadeOutTimer = setTimeout(() => {
    talk.classList.remove('animate-fade-in');
    talk.classList.add('animate-fade-out');

    setTimeout(() => {
      talk.classList.add('hidden');
    }, 400); // 與 fade-out 動畫時間一致
  }, 500);
}

resetBtn.addEventListener('click', resetGame);
renderBoard();
