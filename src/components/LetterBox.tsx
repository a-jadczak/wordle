import type { LetterResult } from '../context/GameStorageContext';

const STATUS_CLASSES: Record<LetterResult['status'], string> = {
  correct: 'border-green-600 bg-green-600 text-white',
  present: 'border-yellow-500 bg-yellow-500 text-white',
  absent: 'border-gray-500 bg-gray-500 text-white',
  empty: 'border-gray-600 bg-white text-gray-900',
};

const LetterBox = ({ letter, status }: LetterResult) => {
  return (
    <div
      className={`grid aspect-square w-full place-items-center border-2 text-center text-[clamp(2rem,10vw,3rem)] font-bold leading-none ${STATUS_CLASSES[status]}`}
    >
      <span>{letter}</span>
    </div>
  );
};

export default LetterBox;
