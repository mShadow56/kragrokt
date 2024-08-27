import { useEffect, useState } from "react";import { v4 as uuidv4 } from 'uuid';
import { Hero, namesMen, namesWomen, updateSkills, updateStatPointsAvailable, updateSubstats } from "../../../classes/hero/hero";
import { randomIntegerBetween, randomIntegerBelow } from "../../../utils/dice";
import './HeroesSelection.css';
import { addHero, saveGameState } from "../../GameState";
import HeroProfile from "../../reusables/HeroProfile";
import HeroStats from "../../reusables/HeroStats";
import OtherTab from "../../panels/MiddlePanel/tabs/heroes/subtabs/other";
import SkillsTab from "../../panels/MiddlePanel/tabs/heroes/subtabs/skills";

interface Props {
  setScene: (scene: number) => void;
  setCurrentFadeText: (text: string) => void;
  setIsFading: (newValue: boolean) => void;
}

const minAge = 15;
const maxAge = 60;
const pctShieldmaidens = 0.1;

function HeroesSelection({ setScene, setCurrentFadeText, setIsFading }: Props) {
  const [heroesCreated, setHeroesCreated] = useState<boolean>(false);
  const [heroPool, setHeroPool] = useState<Hero[]>([]);
  const [chosenHeroes, setChosenHeroes] = useState<Hero[]>([]);
  const [selectedHero, setSelectedHero] = useState<Hero>();
	const [subtab, setSubtab] = useState(0);

  useEffect(() => {
    if (!heroesCreated) {
      console.log("Adding heroes to pool!");
      for(let i = 0; i < 6; i++) {
        const newHero: Hero = createRandomHero();
        if (heroPool.length < 6) {
          heroPool.push(newHero);
        }
      }
      setHeroesCreated(true);
      setSelectedHero(heroPool[0]);
    }
  }, []);

  function createRandomHero(): Hero {
		var randomNumber = Math.random();

		// Define the cumulative probabilities
		var warriorProbability = 0.5; // 50%
		var scoutProbability = 0.9; // 40% (40% of the total, since it's after the warrior)
		//var witchProbability = 1.0; // 5% (5% of the total, since it's after the scout)

		// Check which hero to create based on the random number
		if (randomNumber < warriorProbability) {
			return createWarrior();
		} else if (randomNumber < scoutProbability) {
			return createScout();
		} else {
			return createWitch();
		}
  }

	function createWarrior(): Hero {
		var y = pctShieldmaidens;
		var x = Math.random();
		var gender;
		var occupation = '';
		var background = '';
		if (x > y) {
			gender = 'Male';
			occupation = 'Huscarl';
			background = 'Died in the service of his earl.'
		} else {
			gender = 'Female';
			occupation = 'Shieldmaiden';
			background = 'Died in the service of her earl.'
		}

		// Create a new Hero instance with all required arguments
		let newHero: Hero = new Hero(
			createRandomFirstName(gender), // first name
			createRandomLastName(gender), // last name
			gender,
			randomIntegerBetween(minAge, maxAge), // age
			occupation,
			background,
			uuidv4(),
			true
		);

		newHero.stats = createRandomStats(newHero, occupation);
		updateSubstats(newHero);
		updateStatPointsAvailable(newHero);
		updateSkills(newHero);

    return newHero;
		//setNewHero(newHero);
	}

	function createScout(): Hero {
		var y = pctShieldmaidens;
		var x = Math.random();
		var gender;
		var occupation = 'Scout';
		var background = 'Died fighting a beast.';
		if (x > y) {
			gender = 'Male';
		} else {
			gender = 'Female';
		}

		// Create a new Hero instance with all required arguments
		let newHero: Hero = new Hero(
			createRandomFirstName(gender), // first name
			createRandomLastName(gender), // last name
			gender,
			randomIntegerBetween(minAge, maxAge), // age
			occupation,
			background,
			uuidv4(),
			true
		);

		newHero.stats = createRandomStats(newHero, occupation);
		updateSubstats(newHero);
		updateStatPointsAvailable(newHero);
		updateSkills(newHero);

    return newHero;
		//setNewHero(newHero);
	}

	function createWitch(): Hero {
		var gender = 'Female';
		var occupation = 'Witch';
		var background = 'Died in the service of her king.';

		// Create a new Hero instance with all required arguments
		let newHero: Hero = new Hero(
			createRandomFirstName(gender), // first name
			createRandomLastName(gender), // last name
			gender,
			randomIntegerBetween(minAge, maxAge), // age
			occupation,
			background,
			uuidv4(),
			true
		);

		newHero.stats = createRandomStats(newHero, occupation);
		updateSubstats(newHero);
		updateStatPointsAvailable(newHero);
		updateSkills(newHero);

    return newHero;
		//setNewHero(newHero);
	}

	function createRandomFirstName(gender: string): string {
		var firstName = '';
		if (gender === 'Male') {
			firstName = namesMen[randomIntegerBelow(namesMen.length)];
		} else if (gender === 'Female') {
			firstName = namesWomen[randomIntegerBelow(namesWomen.length)];
		} else {
			console.log('Error: gender should either be \'Male\' or \'Female\'');
		}

		return firstName;
	}

	function createRandomLastName(gender: string): string {
		var lastName = '';
		var x = namesMen[randomIntegerBelow(namesMen.length)];
		var y = 's';
		if (x.endsWith('s')) {
			y = '';
		}
		if (x[x.length - 2] == x[x.length - 1]) {
			x = x.slice(0, -1);
		}
		if (gender === 'Male') {
			lastName = x + y + 'søn';
		} else if (gender === 'Female') {
			lastName = x + y + 'datter';
		} else {
			console.log('Error: gender should either be \'Male\' or \'Female\'');
		}

		return lastName;
	}

	function createRandomStats(hero: Hero, occupation: string) {
		var stats = { str: 1, dex: 1, int: 1, con: 1, wis: 1 };

		if (occupation === 'Huscarl' || occupation === 'Shieldmaiden') {
			var stats = { con: 2, int: 1, str: 4, dex: 2, wis: 1 };
			hero.statPointsSpent = 5; // Start with 1 point for each stat
		} else if (occupation === 'Scout') {
			var stats = { con: 2, int: 1, str: 2, dex: 4, wis: 1 };
			hero.statPointsSpent = 5; // Start with 1 point for each stat
		} else if (occupation === 'Witch') {
			var stats = { con: 1, int: 4, str: 1, dex: 1, wis: 3 };
			hero.statPointsSpent = 5; // Start with 1 point for each stat
		}

		// Randomly distribute the remaining points
		while (hero.statPointsSpent < hero.statPointsTotal) {
			// Choose a random stat to increase
			var statKey = Object.keys(stats)[randomIntegerBelow(Object.keys(stats).length)];
			// Increase the chosen stat by 1
			(stats as any)[statKey]++;
			hero.statPointsSpent++;
		}
		updateStatPointsAvailable(hero);

		return stats;
	}

  function handleAddHeroClick(hero: Hero) {
    if (chosenHeroes.length < 3) {
      chosenHeroes.push(hero);
      setHeroPool(heroPool.filter(h => h !== hero));
    } else {
      console.log(`Only three heroes allowed on board the ship!`);
    }
  }

  function handleRemoveHeroClick(hero: Hero) {
    heroPool.push(hero);
    setChosenHeroes(chosenHeroes.filter(h => h !== hero));
  }

  function handleSetSailClick() {
    if (chosenHeroes.length !== 3) {
      console.log(`You must first select three heroes!`);
      return;
    }
    console.log(`Setting sail!`);
    chosenHeroes.forEach(hero => {
      addHero(hero);
    })
    saveGameState();

    // Start of FadeIn
    setIsFading(true);
    setCurrentFadeText("DAY 1");

    setTimeout(() => { setScene(1) }, 3600);
    setTimeout(() => { setCurrentFadeText("empty") }, 9000);
  }

	const getTabComponent = () => {
		switch (subtab) {
			case 0:
				return (
					<OtherTab></OtherTab>
				);
			case 1:
				return (
					<HeroStats hero={selectedHero}></HeroStats>
				);
			case 2:
				return (
					<SkillsTab currentHero={selectedHero}></SkillsTab>
				);
			default: return null
		};
	}

  return (
    <>
    <div className="heroes-selection-container">
      <div id="hero-pool-container" className="heroes-container">
        {heroPool.map(hero => {
          //console.log(`heroPool.length: ${heroPool.length}`);
          return (
            <div key={`${hero.id}-key`} id={`${hero.id}-id`} onClick={() => {setSelectedHero(hero)}} onDoubleClick={() => {handleAddHeroClick(hero)}}>
              {hero.firstName} {hero.lastName}, {hero.age}, {hero.gender}, {hero.occupation}
            </div>
          );
        })}
      </div>
      <div className="selected-hero-container">
        <HeroProfile hero={selectedHero}></HeroProfile>
				<div id="stats-container" className="hero-stats-container">
					<div className="hero-stats-lower-tab-bar">
						<div id="lower-tab-title" className="hero-stats-lower-tab-title">Stats</div>
						<button id="other-button" className="tab-button" onClick={() => setSubtab(0)}>INVENTORY</button>
						<button id="stats-button" className="tab-button" onClick={() => setSubtab(1)}>STATS</button>
						<button id="skills-button" className="tab-button" onClick={() => setSubtab(2)}>SKILLS</button>
					</div>
					{getTabComponent()}
				</div>
      </div>
      <div id="chosen-heroes-container" className="heroes-container">
        {chosenHeroes.map(hero => {
          //console.log(`chosenHeroes.length: ${chosenHeroes.length}`);
          return (
            <div key={`${hero.id}-key`} id={`${hero.id}-id`} onClick={() => {setSelectedHero(hero)}} onDoubleClick={() => {handleRemoveHeroClick(hero)}}>
              {hero.firstName} {hero.lastName}, {hero.age}, {hero.gender}, {hero.occupation}
            </div>
          );
        })}
      </div>
      <div className="set-sail-button" onClick={handleSetSailClick}>Set sail!</div>
    </div>
    </>
  );
}

export default HeroesSelection;