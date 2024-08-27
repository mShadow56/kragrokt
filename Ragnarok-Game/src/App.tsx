//import { useState } from 'react';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import star from './assets/images/star.png';
import { GameState, gameStateDefault } from './components/GameState';
import AboutUsPage from './components/pages/AboutUsPage';
import HdtRPage from './components/pages/HDtRPage';
import GameStateContext from './contexts/GameStateContext';

function App() {
  const [gameState, setGameState] = useState<GameState>(gameStateDefault);

  return (
    <Router>
      <Navbar className="custom-navbar">
        <Container className='custom-container'>
          <Navbar.Brand>
            <img src={star} alt="star" className='starIcon'/>
          </Navbar.Brand>
          <Nav.Item>
            <Link className='hdtr' to="/" aria-label="Navigate to HUNDRED DAYS TO RAGNAROK page">Hundred Days to Ragnarok</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/about-us" aria-label="Navigate to About Us page">About</Link>
          </Nav.Item>
        </Container>
      </Navbar>
        <GameStateContext.Provider value={{gameState, setGameState}}>
          <Routes>
            <Route path="/" element={<HdtRPage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
          </Routes>
        </GameStateContext.Provider>
    </Router>
  );  
}

export default App;