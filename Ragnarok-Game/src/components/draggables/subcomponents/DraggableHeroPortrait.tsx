import { useEffect} from 'react';
import './DraggableHeroPortrait.css';
import defaultBackgroundImage from '../../../assets/images/portraits/default-Background.png';
import defaultFrameImage from '../../../assets/images/portraits/default-Frame.png';
import defaultFemaleImage from '../../../assets/images/portraits/default-Female.png';
import defaultMaleImage from '../../../assets/images/portraits/default-Male.png';
import { Position } from '../../Game';
import { DraggablesProps } from '../Draggables';
import { addHeroToParty } from '../../../classes/task/task';
import { isTaskEditable, isHeroInParty } from '../../GameState';


function DraggableHeroPortrait({
  currentHero,
	currentTask,
  partyMembers,
  setPartyMembers,
  cursorPosition,
  setCursorPosition,
  isDraggingHero,
  setIsDraggingHero
}: DraggablesProps) {
  //const [left, setLeft] = useState<number>(0);
  //const [top, setTop] = useState<number>(0);

  const handleHeroPortraitClick = () => {
    setIsDraggingHero(!isDraggingHero);
    handleHeroPortraitDrop();
    //console.log(`Releasing portrait of ${hero.firstName} ${hero.lastName}`);
  };

  function handleHeroPortraitDrop() {
    if (!currentTask || !currentHero || !isDraggingHero || !positionWithinPartyBox(cursorPosition)) {
      return;
    }
  
    if (!isTaskEditable(currentTask)) {
      return;
    }
  
    if (isHeroInParty(currentHero)) {
      return;
    }
  
    addHeroToParty(currentTask, currentHero);
    const newPartyMembers = [...partyMembers, currentHero];
    setPartyMembers(newPartyMembers);
  }

  // Find ud af, hvor de forskellige tal kommer fra, og fiks det
  function positionWithinPartyBox(position: Position): boolean {
    const partyBoxWindow: HTMLElement | null = document.getElementById('party-list');
    const gameWindowElement: HTMLElement | null = document.getElementById('game-window');

    if (!partyBoxWindow || !gameWindowElement) {
      return false;
    }

    const posX = position.x + 36;
    const posY = position.y + 52;

    let gRect = gameWindowElement.getBoundingClientRect();
    const gX = gRect.left; // gX is 5
    const gY = gRect.top; // gY is 138.5
    let pRect = partyBoxWindow.getBoundingClientRect();
    const pX = (pRect.left - gX - 8); // gX should be 14
    const pY = (pRect.top - gY - 8); // gY should be 149
    //console.log('x: ', position.x + 35, ' | y: ', position.y + 50);
    //console.log('gX: ', gX, ' | gY: ', gY);
    //console.log('pX: ', pX, ' | pY: ', pY);
    //console.log('pRect.width: ', pRect.width, ' | pRect.height: ', pRect.height);

    if ((posX) > (pX) && (posX) < (pX + pRect.width)) {
      if ((posY) > (pY) && (posY) < (pY + pRect.height)) {
        return true;
      }
    }
    return false;
  }

  // Calculate dynamic offsets based on game-window position
  function calculateDynamicOffsets() {
    const gameWindowElement: HTMLElement | null = document.getElementById('game-window');

    if (!gameWindowElement) {
      return { x: 0, y: 0 };
    }

    let rect = gameWindowElement.getBoundingClientRect();
    const xOffset = (rect.left + 36 + 8); // 36 is half of portrait width, excluding left margin
    const yOffset = (rect.top + 52 + 8); // 52 is half of portrait height, excluding top margin

    return { x: xOffset, y: yOffset };
  };

  useEffect(() => {
    //const partyBoxPositions = getPartyBoxPositions();
    //setLeft(partyBoxPositions.x);
    //setTop(partyBoxPositions.y);
    //console.log('Left: ', left, ' | Top: ', top);

    const handleMouseMove = (e: MouseEvent) => {
      const dynamicOffsets = calculateDynamicOffsets();
      setCursorPosition({
        x: e.clientX - dynamicOffsets.x,
        y: e.clientY - dynamicOffsets.y
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
/*
  // Fjern senere
  function getPartyBoxPositions(): Position {
    const partyBoxWindow: HTMLElement | null = document.getElementById('party-list');
    const gameWindowElement: HTMLElement | null = document.getElementById('game-window');

    if (!partyBoxWindow || !gameWindowElement) {
      return { x: 0, y: 0 };
    }

    let gRect = gameWindowElement.getBoundingClientRect();
    const gX = gRect.left; // gX is 5
    const gY = gRect.top; // gY is 138.5
    //console.log('gX: ', gX, ' | gY: ', gY);
    let pRect = partyBoxWindow.getBoundingClientRect();
    const pX = (pRect.left - gX - 10); // gX should be 14
    const pY = (pRect.top - gY - 10); // gY should be 149

    return { x: pX, y: pY };
  }
*/
  const getHeroImage = () => {
    if (currentHero) {
      if (currentHero.gender === 'Male') {
        return defaultMaleImage;
      } else {
        return defaultFemaleImage;
      }
    }
  }

  const getStyle = () => {
    return {left: `${cursorPosition.x}px`, top: `${cursorPosition.y}px`};
  }

  return (
    <>
    {/*<div id='green-rectangle' style={{
      width: '154px',
      height: '82px',
      position: 'absolute',
      left: `${left.toString()}px`,
      top: `${top.toString()}px`,
      border: 'dotted 3px green'}}
    />*/}
    <div
      id={`${currentHero!.id}-draggable-portrait`}
      className='draggable-portrait'
      onClick={() => handleHeroPortraitClick()}
      style={getStyle()}>
      <img
        id='draggable-hero-background'
        className='draggable-portrait-img'
        src={defaultBackgroundImage}
        alt='Background Image'
        draggable='false'>
      </img>
      <img
        id='draggable-hero-image'
        className='draggable-portrait-img'
        src={getHeroImage()}
        alt={`${currentHero!.firstName} ${currentHero!.lastName} Image`}
        draggable='false'>
      </img>
      <div className='draggable-hero-label'>
        <div id='draggable-hero-name' className='draggable-hero-value'>{currentHero!.firstName}</div>
        <div id='draggable-hero-level' className='draggable-hero-value'>Lvl. {currentHero!.level}</div>
      </div>
      <img
        id='draggable-hero-frame'
        className='draggable-portrait-img'
        src={defaultFrameImage}
        alt='Frame Image'
        draggable='false'>
      </img>
    </div>
    </>
  );
}

export default DraggableHeroPortrait;