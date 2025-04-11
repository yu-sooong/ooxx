import { getBestMove } from './logic/getBestMove';
import { checkWinner } from './logic/checkWinner';
import { initBoard } from './utils/initBoard';
import { speak } from './utils/speak';
import { renderBoard } from './ui/renderBoard';
import { showTrashTalk } from './ui/showTrashTalk';
import { soundPlayer } from './sound/soundPlayer';
import { trashTalks } from './data/trashTalks';

let board = initBoard();
let isThinking = false;
let soundEnabled = true;
let trashTalkEnabled = true;

const resetBtn = document.getElementById('reset')!;
const modal = document.getElementById('result-modal')!;
const modalTitle = document.getElementById('modal-title')!;
const modalClose = document.getElementById('modal-close')!;
const spinner = document.getElementById('spinner')!;
const talkElem = document.getElementById('talk')!;
const talkText = document.getElementById('talk-text')!;
const soundToggle = document.getElementById('toggle-sound') as HTMLInputElement;
const trashToggle = document.getElementById('toggle-trash') as HTMLInputElement;

soundToggle.addEventListener('change', () => soundEnabled = soundToggle.checked);
trashToggle.addEventListener('change', () => trashTalkEnabled = trashToggle.checked);

resetBtn.addEventListener('click', () => {
  board = initBoard();
  talkElem.classList.add('hidden');
  talkText.textContent = '';
  render();
});

modalClose.addEventListener('click', () => {
  modal.classList.add('hidden');
  board = initBoard();
  render();
});

function showResult(result: string) {
  modalTitle.textContent = result === 'draw' ? '平手了！' : result === 'X' ? '你贏了！' : 'AI 贏了！';
  modal.classList.remove('hidden');
}

function render() {
  renderBoard({
    board,
    isThinking,
    onClick: async (r, c) => {
      if (isThinking || board[r][c]) return;

      board[r][c] = 'X';
      if (navigator.vibrate) navigator.vibrate(50);
      if (soundEnabled) soundPlayer.click.play();
      render();

      const result = checkWinner(board);
      if (result) return showResult(result);

      isThinking = true;
      spinner.classList.remove('hidden');

      if (trashTalkEnabled) {
        const text = trashTalks[Math.floor(Math.random() * trashTalks.length)];
        showTrashTalk(text);
        if (soundEnabled) speak(text);
      }

      await new Promise(res => setTimeout(res, 1200));
      const { row, col } = getBestMove(board);
      board[row][col] = 'O';
      if (navigator.vibrate) navigator.vibrate(50);
      if (soundEnabled) soundPlayer.ai.play();

      isThinking = false;
      spinner.classList.add('hidden');
      render();

      const result2 = checkWinner(board);
      if (result2) return showResult(result2);
    }
  });
}

render();
