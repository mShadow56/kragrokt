import { Hero, updateLevel, updateSkills, updateStatPointsAvailable, updateStatPointsTotal, updateSubstats } from "../../../../../../classes/hero/hero";


function LevelButton({ currentHero, setCurrentHero }: { currentHero: Hero | undefined, setCurrentHero: (newHero: Hero | undefined) => void }) {

	function levelCurrentHero() {
		//Test level up
		if (currentHero === undefined) {
			return;
		}
		const clone = structuredClone(currentHero);
		clone.xp += 1000;
		updateLevel(clone);
		updateSubstats(clone);
		updateStatPointsTotal(clone);
		updateStatPointsAvailable(clone);
		updateSkills(clone);
		setCurrentHero(clone);
	}

  return (
    <button id="level-button" className="tab-button" onClick={() => levelCurrentHero()}>LEVEL</button>
  );
}

export default LevelButton;