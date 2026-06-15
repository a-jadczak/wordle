import { createContext, useContext } from 'react';

type GameStorageContextState = {};

const GameStorageContext = createContext<GameStorageContextState | null>(null);

export function GameStorageProvider({ children }: { children: React.ReactNode }) {
  return <GameStorageContext.Provider value={''}>{children}</GameStorageContext.Provider>;
}

export function useGameStorage() {
  const context = useContext(GameStorageContext);

  return context;
}
