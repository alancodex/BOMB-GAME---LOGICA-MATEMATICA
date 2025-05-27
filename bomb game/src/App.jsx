import React from 'react';
import { BombProvider, useBomb } from "./components/Bomb/BombContext";
import GamePage from "./pages/GamePage";
import GameOverPage from "./pages/GameOver";
import GameWinPage from "./pages/GameWin"; 

const CurrentScreen = () => {
  const { gameState } = useBomb(); 

  if (gameState === 'won') {
    return <GameWinPage />;
  }
  if (gameState === 'lost') {
    return <GameOverPage />;
  }
  
  return <GamePage />;
};

const App = () => {
  return (
    <BombProvider> 
      <CurrentScreen />
    </BombProvider>
  );
};

export default App;
