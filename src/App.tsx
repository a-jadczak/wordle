import LetterBox from './components/LetterBox';
import GAME_CONFIG from './config/game';
import KEYBOARD_KEYS from './constants/keyboard';

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

      <div className="w-full max-w-xl mx-auto mt-8 space-y-2 px-3 text-center text-xl font-bold">
        {KEYBOARD_KEYS.map((row) => {
          return (
            <div
              key={row.join('-')}
              className="grid justify-items-center mx-auto w-fit gap-1.5"
              style={{
                gridTemplateColumns: row
                  .map((letter) => (letter.length > 1 ? '5fr' : '3fr'))
                  .join(' '),
              }}
            >
              {row.map((letter) => {
                const isActionKey = letter.length > 1;

                return (
                  <div
                    key={letter}
                    className={`grid h-14 place-items-center rounded bg-gray-300 text-gray-900 shadow-sm cursor-pointer ${
                      isActionKey ? 'px-3 text-sm' : 'w-12'
                    }`}
                  >
                    {letter}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default App;
