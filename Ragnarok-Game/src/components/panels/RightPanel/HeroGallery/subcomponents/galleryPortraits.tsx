import { Hero } from '../../../../../classes/hero/hero';
import '../heroGallery.css';
import defaultBackgroundImage from '../../../../../assets/images/portraits/default-Background.png';
import defaultFrameImage from '../../../../../assets/images/portraits/default-Frame.png';
import defaultFemaleImage from '../../../../../assets/images/portraits/default-Female.png';
import defaultMaleImage from '../../../../../assets/images/portraits/default-Male.png';
import { Dispatch, MouseEvent } from 'react';
import { Position } from '../../../../Game';


function GalleryPortrait({
  hero,
  handleHeroPortraitClick,
  setCursorPosition,
  isDraggingHero,
  setIsDraggingHero
}: {
  hero: Hero,
  handleHeroPortraitClick: (hero: Hero) => void,
  setCursorPosition: Dispatch<React.SetStateAction<Position>>,
  isDraggingHero: boolean,
  setIsDraggingHero: Dispatch<React.SetStateAction<boolean>>
}) {

  // Calculate dynamic offsets based on game-window position
  const calculateDynamicOffsets = () => {
    const gameWindowElement: HTMLElement | null = document.getElementById('game-window');

    if (!gameWindowElement) {
      return { x: 0, y: 0 };
    }

    let rect = gameWindowElement.getBoundingClientRect();
    const xOffset = (rect.left + 44); // 44 is half of portrait width, including left margin
    const yOffset = (rect.top + 60); // 60 is half of portrait height, including top margin

    return { x: xOffset, y: yOffset };
  };

  function handleDoubleClick(event: MouseEvent<HTMLDivElement>) {
    const dynamicOffsets = calculateDynamicOffsets();
    const currentCursorPosition = {
      x: event.clientX - dynamicOffsets.x,
      y: event.clientY - dynamicOffsets.y
    };
    setCursorPosition(currentCursorPosition);
    setIsDraggingHero(!isDraggingHero)
  }

  const getHeroImage = () => {
    if (hero.gender === 'Male') {
      return defaultMaleImage;
    } else {
      return defaultFemaleImage;
    }
  }

  return (
    <div
      id={`${hero.id}-portrait`}
      className='gallery-portrait'
      onClick={() => handleHeroPortraitClick(hero)}
      onDoubleClick={(event) => handleDoubleClick(event)}>
      <img
        id='gallery-hero-background'
        className='gallery-portrait-img'
        src={defaultBackgroundImage}
        alt='Background Image'
        draggable='false'>
      </img>
      <img
        id='gallery-hero-image'
        className='gallery-portrait-img'
        src={getHeroImage()}
        alt={`${hero.firstName} ${hero.lastName} Image`}
        draggable='false'>
      </img>
      <div className='gallery-hero-label'>
        <div id='gallery-hero-name' className='gallery-hero-value'>{hero.firstName}</div>
        <div id='gallery-hero-level' className='gallery-hero-value'>Lvl. {hero.level}</div>
      </div>
      <img
        id='gallery-hero-frame'
        className='gallery-portrait-img'
        src={defaultFrameImage}
        alt='Frame Image'
        draggable='false'>
      </img>
    </div>
  );
}

export default GalleryPortrait;