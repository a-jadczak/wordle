import LetterBox from './LetterBox';
import GAME_CONFIG from './../config/game';
import { useGameStorage, type LetterResult } from '../context/GameStorageContext';

const createEmptyRow = (): LetterResult[] =>
  Array.from({ length: GAME_CONFIG.wordLength }, () => ({
    letter: '',
    status: 'empty',
  }));

const createCurrentRow = (word: string): LetterResult[] =>
  Array.from({ length: GAME_CONFIG.wordLength }, (_, index) => ({
    letter: word[index] ?? '',
    status: 'empty',
  }));

const GuessBoard = () => {
  const { currentWord, guesses, gameStatus, message } = useGameStorage();

  const board =
    gameStatus === 'playing' && guesses.length < GAME_CONFIG.maxAttempts
      ? [...guesses, createCurrentRow(currentWord)]
      : guesses;

  const rows = Array.from({ length: GAME_CONFIG.maxAttempts }, (_, rowIndex) => {
    return board[rowIndex] ?? createEmptyRow();
  });

  return (
    <div className="mx-auto my-auto w-full max-w-[min(92vw,22.5rem)]">
      <div className="grid grid-cols-5 grid-rows-6 gap-1 sm:gap-1.5">
        {rows.map((row, rowIndex) =>
          row.map(({ letter, status }, columnIndex) => (
            <LetterBox key={`${rowIndex}-${columnIndex}`} letter={letter} status={status} />
          )),
        )}
      </div>

      <p className="mt-4 min-h-6 text-center text-sm font-bold uppercase tracking-wide text-gray-700">
        {message}
      </p>
    </div>
  );
};

export default GuessBoard;
