import { Hero, updateSkills } from "../../../../../../classes/hero/hero";
import { getHero, updateHero, addHero, saveGameState } from "../../../../../GameState";


function SaveButton({
	currentHero,
	setCurrentHero
}: {
	currentHero: Hero | undefined,
	setCurrentHero: (newHero: Hero | undefined) => void
}) {

	function saveCurrentHero() {
		if (currentHero === undefined) {
			return;
		}
		const clone = structuredClone(currentHero);
		updateSkills(clone);
		if (getHero(clone.id)) {
			updateHero(clone);
			console.log('Updating hero!');
		} else {
			addHero(clone);
			console.log('Saving hero!', clone);
		}
		setCurrentHero(clone);
		saveGameState();
	}

  return (
    <button id="save-button" className="tab-button" onClick={() => saveCurrentHero()}>SAVE</button>
  );
}

export default SaveButton;