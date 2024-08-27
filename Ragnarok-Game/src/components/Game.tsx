import { useEffect, useRef, useState } from "react";
import "./Game.css";
import "../index.css";
import StartMenu from "./startMenu/startMenu";
import LeftPanel from "./panels/LeftPanel/LeftPanel";
import MiddlePanel from "./panels/MiddlePanel/MiddlePanel";
import RightPanel from "./panels/RightPanel/RightPanel";
import { Hero } from "../classes/hero/hero";
import { Task } from "../classes/task/task";
import UserInput from "./newGameSetup/userInput/UserInput";
import FadingElement from "./fadeInOut/FadingElement";
import Scenario from "./scenario/Scenario";
import { useGameStateContext } from "../contexts/GameStateContext";
import Draggables from "./draggables/Draggables";
import HeroesSelection from "./newGameSetup/heroesSelection/HeroesSelection";
import { OptionModal } from "./options/optionsModal";
import { Howl } from 'howler';
import { getVolume, loadOptions, saveVolume } from './Options';
import backgroundMusic from '../assets/sounds/intro_background.mp3';
import { Zone } from "./interfaces/Zone";
import { Activity } from "../classes/task/interfaces/Activity";


export interface Position {
  x: number,
  y: number
}

function Game() {
  const context = useGameStateContext();
  const [scene, setScene] = useState(0);
  const [currentHero, setCurrentHero] = useState<Hero | undefined>(undefined);
  const [currentTask, setCurrentTask] = useState<Task>();
  const [partyMembers, setPartyMembers] = useState<Hero[]>([]);
  const [cursorPosition, setCursorPosition] = useState<Position>({ x: 0, y: 0 });
  const [isDraggingHero, setIsDraggingHero] = useState<boolean>(false);
  const [currentFadeText, setCurrentFadeText] = useState("empty");
  const [isFading, setIsFading] = useState<boolean>(false);
  const [isScenarioOpen, setIsScenarioOpen] = useState(true);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [volume, setVolume] = useState(getVolume());
  const [isMusic, setIsMusic] = useState(false);
  //from tasks
  const [selectedZone, setSelectedZone] = useState<Zone | undefined>(undefined);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);


  const musicRef = useRef<Howl | null>(null);

  useEffect(() => {
    // Initialize the Howl instance on mount and clean up on unmount
    musicRef.current = new Howl({
      src: backgroundMusic,
      loop: true,
      volume: (volume / 10),
    });

    loadOptions();
    setVolume(getVolume());


    return () => {
      // Stop and unload the sound when the component unmounts
      if (musicRef.current) {
        musicRef.current.stop();
        musicRef.current.unload();
      }
    };
  }, []); // Empty dependency array means this effect runs once on mount

  useEffect(() => {
    console.log("ismusic: " + isMusic);
    if (musicRef.current) {
      if (!isMusic) {
        musicRef.current.stop();
      } else {
        musicRef.current.play();
      }
    }
  }, [isMusic]);

  useEffect(() => {
    if(musicRef.current !=null)  
    musicRef.current.volume(volume / 10);
    saveVolume(volume); // Assuming saveVolume is defined elsewhere
  }, [ volume]);



 

  const changeScene = (newScene: number) => {
    setScene(newScene);
  };

  const getFadeInOut = (fadeText: string) => {
    return (
      currentFadeText !== "empty" && (
        <FadingElement
          fadeText={fadeText} setCurrentFadeText={setCurrentFadeText}
          isFading={isFading} setIsFading={setIsFading}
          setIsScenarioOpen={setIsScenarioOpen} />
      )
    );
  };

  const checkIfUserInput = () => {
    if (context.gameState.log.userInput) {
      return 1;
    } else {
      return 2;
    }
  };

  const getComponent = (currentHero: Hero | undefined) => {
    switch (scene) {
      case 0:
        return (
          <StartMenu
            onReturnToMainGame={() => changeScene(checkIfUserInput())}
            setIsOptionsOpen={setIsOptionsOpen}
            setIsMusic={setIsMusic}
            isMusic={isMusic}
          />
        );
      case 1:
        return (
          <>
            <LeftPanel 
             currentTask={currentTask} setCurrentTask={setCurrentTask}
             selectedZone={selectedZone} selectedActivity={selectedActivity}
             setSelectedZone={setSelectedZone} setSelectedActivity={setSelectedActivity}
            />
            <MiddlePanel
              currentHero={currentHero} setCurrentHero={setCurrentHero}
              currentTask={currentTask} setCurrentTask={setCurrentTask}
              partyMembers={partyMembers} setPartyMembers={setPartyMembers}
              selectedZone={selectedZone} selectedActivity={selectedActivity}
              setSelectedZone={setSelectedZone} setSelectedActivity={setSelectedActivity}
            />
            <RightPanel
              currentHero={currentHero} setCurrentHero={setCurrentHero}
              setCursorPosition={setCursorPosition}
              isDraggingHero={isDraggingHero} setIsDraggingHero={setIsDraggingHero}
              setIsScenarioOpen={setIsScenarioOpen}
              setIsOptionsOpen={setIsOptionsOpen}

            />
            <Draggables
              currentHero={currentHero}
              currentTask={currentTask}
              partyMembers={partyMembers} setPartyMembers={setPartyMembers}
              cursorPosition={cursorPosition} setCursorPosition={setCursorPosition}
              isDraggingHero={isDraggingHero} setIsDraggingHero={setIsDraggingHero}
            />
            <Scenario
              setCurrentFadeText={setCurrentFadeText}
              isScenarioOpen={isScenarioOpen} setIsScenarioOpen={setIsScenarioOpen}
              setIsFading={setIsFading}
            />
          </>
        );
      case 2:
        return (
          <UserInput
            setScene={setScene}
          />
        );
      case 3:
        return (
          <HeroesSelection
          setScene={setScene}
          setCurrentFadeText={setCurrentFadeText}
          setIsFading={setIsFading}
        />
      );
      default:
        return null;
    }
  };

  const getOptions = () => {
    return <OptionModal 
    isOptionsOpen={isOptionsOpen}
    setIsOptionsOpen={setIsOptionsOpen} 
    setScene={setScene}
    scene={scene}
    setVolume={setVolume}
    volume={volume}
    isMusic={isMusic}
    setIsMusic={setIsMusic}></OptionModal>
  }

  return (
    <div id="game-window" className="hd-window">
      {getComponent(currentHero)}
      {getOptions()}
      {getFadeInOut(currentFadeText)}
    </div>
  );
}

export default Game;
