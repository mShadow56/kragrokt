import '../panels.css';
import './RightPanel.css';
import { Hero } from '../../../classes/hero/hero';
import HeroGallery from './HeroGallery/heroGallery';
import { Dispatch } from 'react';
import { Position } from '../../Game';


interface RightPanelProps {
  currentHero: Hero | undefined,
  setCurrentHero: (newHero: Hero | undefined) => void,
  setCursorPosition: Dispatch<React.SetStateAction<Position>>,
  isDraggingHero: boolean,
  setIsDraggingHero: Dispatch<React.SetStateAction<boolean>>,
  setIsScenarioOpen: (isOpen: boolean) => void,
  setIsOptionsOpen: (isOptionsModal:boolean) => void;

}

function RightPanel({
	currentHero,
	setCurrentHero,
  setCursorPosition,
  isDraggingHero,
  setIsDraggingHero,
	setIsScenarioOpen,
	setIsOptionsOpen
}: RightPanelProps) {

	const ScenarioOpen = ()=>{
		setIsScenarioOpen(true);
	}

	return (
		<div id='right-panel' className='small-panel'>
			<div className='wooden-frame-left'></div>
			<div className='wooden-frame-right'></div>
			<div id='hero-gallery-container' className='hero-gallery-container'>
				<h2 className='right-panel-titel'>HEROES</h2>
				<HeroGallery
					currentHero={currentHero} setCurrentHero={setCurrentHero}
					setCursorPosition={setCursorPosition}
					isDraggingHero={isDraggingHero} setIsDraggingHero={setIsDraggingHero}/>
			</div>
			<div className='right-panel-bottom-buttons'>
				<button onClick={ScenarioOpen}>HISTORY</button>
				<button onClick={() =>setIsOptionsOpen(true)}>OPTIONS</button>
			</div>
		</div>
	);
}

export default RightPanel;