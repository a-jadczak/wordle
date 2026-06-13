import LetterBox from './LetterBox';
import GAME_CONFIG from './../config/game';
const GuessBoard = () => {
  return (
    <div
      className="grid grid-cols-5 grid-rows-6 gap-1
        w-fit mx-auto
        h-fit my-auto"
    >
      {Array.from({ length: GAME_CONFIG.maxAttempts }).map(() => {
        return (
          <>
            {Array.from({ length: GAME_CONFIG.wordLength }).map((_, index) => (
              <LetterBox key={index} />
            ))}
          </>
        );
      })}
    </div>
  );
};

export default GuessBoard;
