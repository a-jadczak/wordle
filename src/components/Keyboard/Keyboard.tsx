import KEYBOARD_KEYS from '../../constants/keyboard';
import KeyboardKey from './components/KeyboardKey';

const Keyboard = () => {
  return (
    <div className="w-full max-w-xl mx-auto mt-8 space-y-2 px-3 text-center text-xl font-bold">
      {KEYBOARD_KEYS.map((row) => {
        const gridTemplateColumns = row
          .map((letter) => (letter.length > 1 ? '5fr' : '3fr'))
          .join(' ');

        return (
          <div
            key={row.join('-')}
            className="grid justify-items-center mx-auto w-fit gap-1.5"
            style={{ gridTemplateColumns }}
          >
            {row.map((letter) => {
              const isActionKey = letter.length > 1;

              return <KeyboardKey key={letter} isActionKey={isActionKey} letter={letter} />;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Keyboard;
