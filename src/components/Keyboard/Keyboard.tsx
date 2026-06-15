import KEYBOARD_KEYS from '../../constants/keyboard';
import KeyboardKey from './components/KeyboardKey';
import { useGameStorage } from '../../context/GameStorageContext';

const Keyboard = () => {
  const { addLetter, ACTIONS } = useGameStorage();

  return (
    <div className="w-full max-w-xl mx-auto mt-8 space-y-1.5 px-3 text-center font-bold sm:space-y-2">
      {KEYBOARD_KEYS.map((row) => {
        const gridTemplateColumns = row
          .map((letter) => `minmax(0, ${letter.length > 1 ? '5fr' : '3fr'})`)
          .join(' ');

        return (
          <div
            key={row.join('-')}
            className="grid w-full gap-1 sm:gap-1.5"
            style={{ gridTemplateColumns }}
          >
            {row.map((letter) => {
              const isActionKey = letter.length > 1;

              return (
                <KeyboardKey
                  key={letter}
                  isActionKey={isActionKey}
                  letter={letter}
                  addLetter={addLetter}
                  ACTIONS={ACTIONS}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Keyboard;
