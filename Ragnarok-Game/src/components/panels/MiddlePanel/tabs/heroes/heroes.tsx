import { useState } from 'react';
import { loadGameState } from '../../../../GameState.ts';
import { Hero } from '../../../../../classes/hero/hero.ts';
import './heroes.css';
import OtherTab from "./subtabs/other";
import SkillsTab from "./subtabs/skills";
import StatsTab from "./subtabs/stats";
import SaveButton from './buttons/SaveButton.tsx';
import HeroProfile from '../../../../reusables/HeroProfile.tsx';


loadGameState();

function Heroes({
	currentHero,
	setCurrentHero
}: {
	currentHero: Hero | undefined,
	setCurrentHero: (newHero: Hero | undefined) => void
}) {
	const [subtab, setSubtab] = useState(0);

	const getTabComponent = () => {
		switch (subtab) {
			case 0:
				return (
					<OtherTab></OtherTab>
				);
			case 1:
				return (
					<StatsTab currentHero={currentHero} setCurrentHero={setCurrentHero}></StatsTab>
				);
			case 2:
				return (
					<SkillsTab currentHero={currentHero}></SkillsTab>
				);
			default: return null
		};
	}

	return (
		<div id="hero-container" className="hero-container">
			<HeroProfile hero={currentHero}></HeroProfile>
			<div id="stats-container" className="stats-container">
				<div className="lower-tab-bar">
					<div id="lower-tab-title" className="lower-tab-title">Stats</div>
					<button id="other-button" className="tab-button" onClick={() => setSubtab(0)}>INVENTORY</button>
					<button id="stats-button" className="tab-button" onClick={() => setSubtab(1)}>STATS</button>
					<button id="skills-button" className="tab-button" onClick={() => setSubtab(2)}>SKILLS</button>
				</div>
				{getTabComponent()}
			</div>
			<div id="hero-buttons" className="hero-buttons-tab-bar">
				<SaveButton currentHero={currentHero} setCurrentHero={setCurrentHero}></SaveButton>
			</div>
		</div>
	);
}


export default Heroes;