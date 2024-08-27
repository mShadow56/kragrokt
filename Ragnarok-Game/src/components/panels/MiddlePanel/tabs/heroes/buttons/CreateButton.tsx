import { v4 as uuidv4 } from 'uuid';
import { Hero, namesMen, namesWomen, updateSkills, updateStatPointsAvailable, updateSubstats } from "../../../../../../classes/hero/hero";
import { randomIntegerBetween, randomIntegerBelow } from "../../../../../../utils/dice";


const minAge = 15;
const maxAge = 60;
const pctShieldmaidens = 0.1;

function CreateButton({ setCurrentHero }: { setCurrentHero: (newHero: Hero | undefined) => void }) {

  function createRandomHero() {
		var randomNumber = Math.random();

		// Define the cumulative probabilities
		var warriorProbability = 0.5; // 50%
		var scoutProbability = 0.9; // 40% (40% of the total, since it's after the warrior)
		//var witchProbability = 1.0; // 5% (5% of the total, since it's after the scout)

		// Check which hero to create based on the random number
		if (randomNumber < warriorProbability) {
			createWarrior();
		} else if (randomNumber < scoutProbability) {
			createScout();
		} else {
			createWitch();
		}
  }

	function createWarrior() {
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

		setCurrentHero(newHero);
	}

	function createScout() {
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

		setCurrentHero(newHero);
	}

	function createWitch() {
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

		setCurrentHero(newHero);
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

  return (
    <button id="create-button" className="tab-button" onClick={() => createRandomHero()}>CREATE</button>
  );
}

export default CreateButton;