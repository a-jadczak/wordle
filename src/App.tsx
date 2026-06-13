import LetterBox from './components/LetterBox';
import GAME_CONFIG from './config/game';

function App() {
  return (
    <main
      className="d-flex
      flex-col
      justify-center
      h-screen
      bg-red-200"
    >
      <h1
        className="text-center text-5xl
        bg-amber-600"
      >
        Wordle
      </h1>
      <div
        className="
        grid grid-cols-5 grid-rows-6
        w-fit mx-auto
        gap-1
        "
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

      <div></div>
    </main>
  );
}

export default App;
