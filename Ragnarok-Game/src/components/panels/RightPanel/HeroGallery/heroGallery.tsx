import { Dispatch, useEffect, useState } from "react";
import { Hero } from "../../../../classes/hero/hero";
import GalleryPortrait from "./subcomponents/galleryPortraits";
import PortraitHighlight from "./subcomponents/portraitHighlight";
import { getHero, getHeroes } from "../../../GameState";
import { Position } from "../../../Game";


function HeroGallery({
  currentHero,
  setCurrentHero,
  setCursorPosition,
  isDraggingHero,
  setIsDraggingHero
}: {
  currentHero: Hero | undefined,
  setCurrentHero: (newHero: Hero | undefined) => void,
  setCursorPosition: Dispatch<React.SetStateAction<Position>>,
  isDraggingHero: boolean,
  setIsDraggingHero: Dispatch<React.SetStateAction<boolean>>
}) {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [portraitElement, setPortraitElement] = useState<HTMLElement | undefined>(undefined);

  
  useEffect(() => {
    // Load heroes when the component mounts
    const loadedHeroes = getHeroes();
    setHeroes(loadedHeroes);
  }, []);
  
  // Sets portraitElement to the one corresponding to currentHero
  useEffect(() => {
    if (currentHero) {
      const heroId = currentHero.id;
      const heroPortraitElement = getPortraitById(heroId);
      setPortraitElement(heroPortraitElement);
    } else {
      setPortraitElement(undefined);
    }
  }, [currentHero]);

  const handleHeroPortraitClick = (hero: Hero) => {
    onHeroPortraitClick(hero);
  };

	// Function to add the hero portrait to the right panel
	function addHeroPortrait(hero: Hero): JSX.Element {
    return (
      <GalleryPortrait
        key={hero.id} hero={hero}
        handleHeroPortraitClick={() => handleHeroPortraitClick(hero)}
        setCursorPosition={setCursorPosition}
        isDraggingHero={isDraggingHero} setIsDraggingHero={setIsDraggingHero}/>
    );
	}

	function onHeroPortraitClick(hero: Hero): void {
		showHeroById(hero.id);
		setCurrentHero(getHero(hero.id));
	}

	function getPortraitById(id: string): HTMLElement | undefined {
		var heroPortraitElement = document.getElementById(`${id}-portrait`);
		if (heroPortraitElement) {
			return heroPortraitElement;
		} else {
      //console.warn(`Hero portrait with ID ${id} not found.`);
			return;
		}
	}

	function showHeroById(id: string): void {
		const clone = structuredClone(getHero(id))
		setCurrentHero(clone);
	}
  
  const gridTemplateRowsStyle = `repeat(${Math.ceil(heroes.length / 2)}, 120px)`;

  return (
    <div id="hero-gallery" className="hero-gallery" style={{ gridTemplateRows: gridTemplateRowsStyle }}>
      <PortraitHighlight portraitElement={portraitElement}></PortraitHighlight>
      {heroes.map(hero => addHeroPortrait(hero))}
    </div>
  );
}

export default HeroGallery;