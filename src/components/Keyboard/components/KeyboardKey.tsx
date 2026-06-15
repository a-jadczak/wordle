interface KeyboardKeyProps {
  letter: string;
  isActionKey: boolean;
}

const KeyboardKey = ({ letter, isActionKey }: KeyboardKeyProps) => {
  return (
    <button
      type="button"
      className={`grid h-[clamp(2.5rem,12vw,3.5rem)] w-full cursor-pointer place-items-center rounded bg-gray-300 text-gray-900 shadow-sm ${
        isActionKey
          ? 'px-1 text-[clamp(0.625rem,2.5vw,0.875rem)]'
          : 'text-[clamp(1rem,4vw,1.25rem)]'
      }`}
      onClick={() => console.log(letter)}
    >
      {letter}
    </button>
  );
};

export default KeyboardKey;
