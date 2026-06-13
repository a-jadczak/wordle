import LetterBox from './LetterBox';
import GAME_CONFIG from './../config/game';

const GuessBoard = () => {
  return (
    <div className="mx-auto my-auto grid w-full max-w-[min(92vw,22.5rem)] grid-cols-5 grid-rows-6 gap-1 sm:max-w-[22.5rem] sm:gap-1.5">
      {Array.from({ length: GAME_CONFIG.maxAttempts }).map((_, rowIndex) =>
        Array.from({ length: GAME_CONFIG.wordLength }).map((_, columnIndex) => (
          <LetterBox key={`${rowIndex}-${columnIndex}`} />
        )),
      )}
    </div>
  );
};

export default GuessBoard;
