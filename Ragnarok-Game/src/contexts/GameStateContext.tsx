import React, { useContext } from 'react';
import { GameState } from '../components/GameState';

// Define the shape of the context value
interface GameStateContextType {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

// Create the context with a default value
const GameStateContext = React.createContext<GameStateContextType | undefined>(undefined);

export function useGameStateContext(): GameStateContextType {
  const gameState = useContext(GameStateContext);

  if (gameState === undefined) {
    throw new Error('useGameStateContext must be used with a GameStateContext');
  }

  return gameState;
}

export default GameStateContext;