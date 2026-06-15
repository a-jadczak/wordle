import { createContext, useContext, useState } from 'react';

type LetterStatus = 'correct' | 'present' | 'absent';

type LetterResult = {
  letter: string;
  status: LetterStatus;
};

type GameStorageContextState = {
  ACTIONS: Record<string, () => void>;
  currentWord: string;
  //wordToGuess: string;
  //numberOfAttempts: number;
  //checkWord: () => LetterResult[];
  addLetter: (value: string) => void;
  //removeLetter: () => void;
};

const GameStorageContext = createContext<GameStorageContextState | null>(null);

export function GameStorageProvider({ children }: { children: React.ReactNode }) {
  const [currentWord, setCurrentWord] = useState<string>('');

  const addLetter = (value: string) => {
    setCurrentWord((prev) => prev + value);
    console.log(currentWord);
  };

  const checkWord = () => {
    console.log('Check');
  };

  const removeLetter = () => {
    setCurrentWord((prev) => prev.slice(0, -1));
    console.log(currentWord);
  };

  const ACTIONS: Record<string, () => void> = {
    ENTER: checkWord,
    ESCAPE: removeLetter,
  };

  return (
    <GameStorageContext.Provider value={{ currentWord, addLetter, ACTIONS }}>
      {children}
    </GameStorageContext.Provider>
  );
}

export function useGameStorage() {
  const context = useContext(GameStorageContext);

  return context;
}
