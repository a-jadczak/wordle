import { createContext, useContext, useState } from 'react';
import GAME_CONFIG from '../config/game';

export type LetterStatus = 'correct' | 'present' | 'absent' | 'empty';

export type LetterResult = {
  letter: string;
  status: LetterStatus;
};

type GameStatus = 'playing' | 'won' | 'lost';

type GameStorageContextState = {
  ACTIONS: Record<string, () => void>;
  currentWord: string;
  wordToGuess: string;
  guesses: LetterResult[][];
  currentAttempt: number;
  gameStatus: GameStatus;
  message: string;
  addLetter: (value: string) => void;
};

const correctWord = 'REACT';

const GameStorageContext = createContext<GameStorageContextState | null>(null);

const evaluateGuess = (guess: string, answer: string): LetterResult[] => {
  const results: LetterResult[] = Array.from(guess, (letter) => ({
    letter,
    status: 'absent',
  }));
  const remainingLetters = answer.split('');

  results.forEach((result, index) => {
    if (result.letter === answer[index]) {
      result.status = 'correct';
      remainingLetters[index] = '';
    }
  });

  results.forEach((result) => {
    if (result.status === 'correct') return;

    const matchIndex = remainingLetters.indexOf(result.letter);

    if (matchIndex >= 0) {
      result.status = 'present';
      remainingLetters[matchIndex] = '';
    }
  });

  return results;
};

export function GameStorageProvider({ children }: { children: React.ReactNode }) {
  const [currentWord, setCurrentWord] = useState<string>('');
  const [guesses, setGuesses] = useState<LetterResult[][]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  const [message, setMessage] = useState<string>('');

  const currentAttempt = guesses.length;

  const addLetter = (value: string) => {
    if (gameStatus !== 'playing' || currentWord.length >= GAME_CONFIG.wordLength) return;

    setCurrentWord((prev) => prev + value.toUpperCase());
    setMessage('');
  };

  const checkWord = () => {
    if (gameStatus !== 'playing') return;

    if (currentWord.length !== GAME_CONFIG.wordLength) {
      setMessage('Not enough letters');
      return;
    }

    const guess = currentWord.toUpperCase();
    const result = evaluateGuess(guess, correctWord);
    const isCorrect = guess === correctWord;
    const isLastAttempt = currentAttempt + 1 >= GAME_CONFIG.maxAttempts;

    setGuesses((prev) => [...prev, result]);
    setCurrentWord('');

    if (isCorrect) {
      setGameStatus('won');
      setMessage('Correct!');
      return;
    }

    if (isLastAttempt) {
      setGameStatus('lost');
      setMessage(`The word was ${correctWord}`);
      return;
    }

    setMessage('');
  };

  const removeLetter = () => {
    if (gameStatus !== 'playing') return;

    setCurrentWord((prev) => prev.slice(0, -1));
    setMessage('');
  };

  const ACTIONS: Record<string, () => void> = {
    ENTER: checkWord,
    ESCAPE: removeLetter,
  };

  return (
    <GameStorageContext.Provider
      value={{
        ACTIONS,
        currentWord,
        wordToGuess: correctWord,
        guesses,
        currentAttempt,
        gameStatus,
        message,
        addLetter,
      }}
    >
      {children}
    </GameStorageContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useGameStorage() {
  const context = useContext(GameStorageContext);

  if (!context) {
    throw new Error('useGameStorage must be used inside GameStorageProvider');
  }

  return context;
}
