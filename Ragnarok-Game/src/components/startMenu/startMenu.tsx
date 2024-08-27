import React, { useEffect, useRef } from 'react';
import image from '../../assets/images/newIntro.png';
import './startMenu.css';
import speakerOn from '../../assets/images/speakerOn.png';
import speakerOff from '../../assets/images/speakerOff.png';


interface StartMenuProps {
    onReturnToMainGame: () => void;
    setIsOptionsOpen: (isOptionsModal:boolean) => void;
    setIsMusic: (setIsMusic:boolean) => void;
    isMusic:boolean;
}



const StartMenu: React.FC<StartMenuProps> = ({ onReturnToMainGame, setIsOptionsOpen, setIsMusic, isMusic }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        console.log("useEffect is called");
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.fillStyle = "grey";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const img = new Image();
        img.src = image;
        canvas.width = 1280;
        canvas.height = 720;

        img.onload = function () {
            ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 1280, 720);
        };
    }, []);

    const toggleMusic = () => {
        if (isMusic) {
          setIsMusic(false);
        } else {
          setIsMusic(true);
        }
    };


    const startGame = () => {
        console.log('Starting the game...');
        handleReturnToMainGame();
    };

    const loadGame = () => {
        console.log('Loading the game...');
    };

    const handleReturnToMainGame = () => {
        console.log('Returning to main game...');
        onReturnToMainGame();
    };

    return (
        <div className="menuContainer">
            <canvas className="canvas" ref={canvasRef}></canvas>
            <div className="Golder">  
             <img id="speaker-icon" className="speakerIcon" src={isMusic? speakerOn : speakerOff} alt="Toggle Music" onClick={toggleMusic} draggable="false" />
                <div className="buttonContainer" >
                    <button id="start-button" className="ButtonIntro" onClick={startGame}>START</button>
                    <button id="load-button" className="ButtonIntro" onClick={loadGame}>LOAD</button>
                    <button  id="options-button" className="ButtonIntro" onClick={()=>setIsOptionsOpen(true)}>OPTIONS</button>
                </div>
            </div>
        </div>
    );
};

export default StartMenu;