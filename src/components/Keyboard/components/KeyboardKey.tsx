const KeyboardKey = ({ letter, isActionKey }) => {
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
};

export default KeyboardKey;
