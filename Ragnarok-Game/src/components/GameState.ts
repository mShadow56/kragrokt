import { GameEvent } from './interfaces/GameEvent.ts';
import { Log } from './interfaces/gameState/Log.ts';
import { Player } from './interfaces/gameState/Player.ts';
import { Hero } from '../classes/hero/hero.ts';
import { setState, Task } from '../classes/task/task.ts';
import { World } from './interfaces/gameState/World.ts';
import { Zone } from './interfaces/Zone.ts';
import { Activity } from '../classes/task/interfaces/Activity.ts';

export interface GameState {
  events: GameEvent[],
  log: Log,
  player: Player,
  heroes: Hero[],
  camp: Camp,
  storage: {
    resources: StorageItem[]
  }
  tasks: {
    onGoing: Task[],
    completed: Task[]
  }
  world: World;
}

export interface Camp {
  buildings: Building[],
  capacity: {
    heroes: number,
    npcs: number
  }
}

export interface Building {
  id: number,
  name: string,
  level: number, // 0-3, 0 = not built ???
  upgradeCost: Resource[],
  timeToUpgrade: number,
  description: string
}

export interface Resource {
  id: number,
  quantity: number
}

export let gameStateDefault: GameState = {
  events: [{
    day: 0,
    title: "INTRODUCTION",
    story: ["Fimbulwinter descended, an unrelenting storm of snow and ice. As food supplies dwindled, desperation turned people against each other, transforming the world into a brutal battlefield. You lost your life defending your clan, achieving an honorable death and earning a place in Asgard.", "Weeks passed in the realm of the gods, filled with feasting and fighting alongside fellow warriors. Yet, you found no joy, haunted by the ongoing horrors in the other realms. Your orders were to protect Asgard, but what about the other races? Who would protect them? ", "You and some like-minded friends, unable to bear the wait any longer, sneaked out one night. You borrowed a boat, stocked it with rations and provisions, and set sail for the enemy's land, Jotunheim."],
    storyItems: ["Friends"],
  },
  {
    day: 1,
    title: "DAY 1",
    story: ["It was the first day after escaping from Valhalla, using the stolen boat you sailed across the river Iving, the natural boundary between Asgard and Jotunheim. The wild landscape ahead signaled your arrival in the land of giants. The waves grew more treacherous as you neared the shore, but with great effort, you and your companions finally reached land.", "You pulled the boat ashore, securing it from the icy waters of Jotunheim. Establishing a base camp was crucial, but the tents from Asgard were ill-suited for Jotunheim's harsh climate. You needed to gather food and building materials, knowing that dismantling your only means of escape was not an option."],
    storyItems: ["15 wood", "5 bread", "10 fish"],
  },],
  log: {
    userInput: false
  },
  player: {
    name: "Nameless",
    gender: "Undecided",
    day: 1,
    god: "Undecided",
  },
  heroes: [
    {
      firstName: "Karl",
      lastName: "Karlssøn",
      gender: "Male",
      age: 31,
      stats: {
        con: 3,
        int: 1,
        str: 7,
        dex: 2,
        wis: 1,
      },
      occupation: "Huscarl",
      background: "Died in the service of his earl.",
      xp: 1600,
      level: 2,
      substats: {
        hp: 24,
        mp: 16,
        atk: 25,
        def: 15,
        wlp: 13,
      },
      statPointsTotal: 9,
      statPointsSpent: 9,
      statPointsAvailable: 0,
      skills: {
        fishing: {
          xp: 0,
          lvl: 0,
        },
        hunting: {
          xp: 0,
          lvl: 0,
        },
        cooking: {
          xp: 0,
          lvl: 0,
        },
        farming: {
          xp: 0,
          lvl: 0,
        },
        brewing: {
          xp: 0,
          lvl: 0,
        },
        gathering: {
          xp: 0,
          lvl: 0,
        },
        woodcutting: {
          xp: 0,
          lvl: 0,
        },
        fletching: {
          xp: 0,
          lvl: 0,
        },
        mining: {
          xp: 100,
          lvl: 1,
        },
        smithing: {
          xp: 400,
          lvl: 3,
        },
      },
      inParty: false,
      onQuest: false,
      id: "1c2153d2-805d-46df-88e9-3af706328ef5",
      exists: true,
    }
  ],
  camp: {
    buildings: [
      {
        id: 0,
        name: "Boathouse",
        level: 0,
        upgradeCost: [
          {
            id: 0,
            quantity: 10
          },
          {
            id: 1,
            quantity: 5
          }
        ],
        timeToUpgrade: 1,
        description: "This is a boathouse."
      },
      {
        id: 1,
        name: "Wharf",
        level: 0,
        upgradeCost: [
          {
            id: 0,
            quantity: 15
          }
        ],
        timeToUpgrade: 2,
        description: "This is a wharf."
      },
      {
        id: 2,
        name: "Tent", // tent -> turfhouse -> longhouse
        level: 0,
        upgradeCost: [
          {
            id: 0,
            quantity: 5
          }
        ],
        timeToUpgrade: 2,
        description: "This is a tent."
      },
      {
        id: 3,
        name: "Smithy",
        level: 0,
        upgradeCost: [
          {
            id: 0,
            quantity: 10
          },
          {
            id: 1,
            quantity: 15
          }
        ],
        timeToUpgrade: 1,
        description: `This is a smithy.`
      },
      {
        id: 4,
        name: "Bakery",
        level: 0,
        upgradeCost: [
          {
            id: 0,
            quantity: 10
          },
          {
            id: 1,
            quantity: 5
          }
        ],
        timeToUpgrade: 1,
        description: "This is a bakery."
      },
      {
        id: 5,
        name: "Brewery",
        level: 0,
        upgradeCost: [
          {
            id: 0,
            quantity: 10
          },
          {
            id: 1,
            quantity: 5
          }
        ],
        timeToUpgrade: 1,
        description: "This is a brewery."
      },
      {
        id: 6,
        name: "Tannery",
        level: 0,
        upgradeCost: [
          {
            id: 0,
            quantity: 12
          },
          {
            id: 1,
            quantity: 3
          }
        ],
        timeToUpgrade: 1,
        description: "This is a tannery."
      },
      {
        id: 7,
        name: "Inn",
        level: 0,
        upgradeCost: [
          {
            id: 0,
            quantity: 15
          },
          {
            id: 1,
            quantity: 5
          }
        ],
        timeToUpgrade: 1,
        description: "This is an inn."
      },
      {
        id: 8, 
        name: "Stable",
        level: 0,
        upgradeCost: [
          {
            id: 0,
            quantity: 15
          }
        ],
        timeToUpgrade: 1,
        description: "This is a stable."
      },
      {
        id: 9,
        name: "Building 10",
        level: 0,
        upgradeCost: [
          {
            id: 0,
            quantity: 10
          }
        ],
        timeToUpgrade: 1,
        description: "This is a building."
      },
      {
        id: 10,
        name: "Building 11",
        level: 0,
        upgradeCost: [
          {
            id: 0,
            quantity: 10
          }
        ],
        timeToUpgrade: 1,
        description: "This is a building."
      },
      {
        id: 11,
        name: "Building 12",
        level: 0,
        upgradeCost: [
          {
            id: 0,
            quantity: 10
          }
        ],
        timeToUpgrade: 1,
        description: "This is a building."
      },
      {
        id: 12,
        name: "West lookout",
        level: 0,
        upgradeCost: [
          {
            id: 0,
            quantity: 20
          },
          {
            id: 1,
            quantity: 5
          }
        ],
        timeToUpgrade: 2,
        description: "This is the west lookout."
      },
      {
        id: 13,
        name: "East lookout",
        level: 0,
        upgradeCost: [
          {
            id: 0,
            quantity: 20
          },
          {
            id: 1,
            quantity: 5
          }
        ],
        timeToUpgrade: 2,
        description: "This is the east lookout."
      },
    ],
    capacity: {
      heroes: 4,
      npcs: 6
    }
  },
  storage: {
    resources: [
    {
      name: "Oak lumber",
      description: "A common tree lumber made out of oak.",
      quantity: 15,
      img_url: "./images/items/resources/oak.png"
    },
    {
      name: "Stone",
      description: "Basic building material obtained from rocks.",
      quantity: 0,
      img_url: "./images/items/resources/stone.png"
    },
    {
      name: "Leather",
      description: "Tanned animal hides used for crafting.",
      quantity: 0,
      img_url: "./images/items/resources/leather.png"
    },
    {
      name: "Bone",
      description: "Remains of creatures, useful in crafting.",
      quantity: 0,
      img_url: "./images/items/resources/bone.png"
    },
    {
      name: "Coal",
      description: "A combustible black rock used as fuel.",
      quantity: 0,
      img_url: "./images/items/resources/coal.png"
    },
    {
      name: "Iron Nugget",
      description: "Small chunks of iron, used in crafting.",
      quantity: 0,
      img_url: "./images/items/resources/iron_nugget.png"

    },
    {
      name: "Iron Ore",
      description: "Raw iron that can be refined into ingots.",
      quantity: 0,
      img_url: "./images/items/resources/iron_ore.png"
    },
    {
      name: "Iron Ingot",
      description: "Refined iron, used for making tools and armor.",
      quantity: 0,
      img_url: "./images/items/resources/iron_ingot.png"
    },
    {
      name: "Steel Alloy",
      description: "A strong alloy made from iron and carbon.",
      quantity: 0,
      img_url: "./images/items/resources/steel_alloy.png"
    },
    {
      name: "Dwarf Steel Alloy",
      description: "An exceptionally durable alloy crafted by dwarves.",
      quantity: 0,
      img_url: "./images/items/resources/dwarf_steel_alloy.png"
    },
    {
      name: "Copper Nugget",
      description: "Small pieces of copper, used in crafting and coinage.",
      quantity: 0,
      img_url: "./images/items/resources/copper_nugget.png"
    },
    {
      name: "Copper Ore",
      description: "Raw copper that can be refined into ingots.",
      quantity: 0,
      img_url: "./images/items/resources/copper_ore.png"
    },
    {
      name: "Copper Ingot",
      description: "Refined copper, used for crafting and electrical components.",
      quantity: 0,
      img_url: "./images/items/resources/copper_ingot.png"
    },
    {
      name: "Silver Nugget",
      description: "Small chunks of silver, used in high-end crafting.",
      quantity: 0,
      img_url: "./images/items/resources/silver_nugget.png"
    },
    {
      name: "Silver Ore",
      description: "Raw silver that can be refined into ingots.",
      quantity: 0,
      img_url: "./images/items/resources/silver_ore.png"
    },
    {
      name: "Silver Ingot",
      description: "Refined silver, used in jewelry and currency.",
      quantity: 0,
      img_url: "./images/items/resources/silver_ingot.png"
    },
    {
      name: "Gold Nugget",
      description: "Small pieces of gold, used in luxury crafting.",
      quantity: 0,
      img_url: "./images/items/resources/gold_nugget.png"
    },
    {
      name: "Gold Ore",
      description: "Raw gold that can be refined into ingots.",
      quantity: 0,
      img_url: "./images/items/resources/gold_ore.png"
    },
    {
      name: "Gold Ingot",
      description: "Refined gold, used in high-end crafts and currency.",
      quantity: 0,
      img_url: "./images/items/resources/gold_ingot.png"
    },
    {
      name: "Bread",
      description: "A tasty loaf of bread.",
      quantity: 5,
      img_url: "./images/items/resources/bread.png"
    },
    {
      name: "Fish",
      description: "A tasty Fish.",
      quantity: 10,
      img_url: "./images/items/resources/fish.png"
    },
    {
      name: "Meat",
      description: "A steak of raw animal flesh.",
      quantity: 0,
      img_url: "./images/items/resources/meat.png"
    }]
  },
  tasks: {
    onGoing: [],
    completed: []
  },
  world: {
    discoveredZones: [
      true,
      false,
      false,
      false,
      false,
      false,
      false
    ],
    zones: [
      {
        id:0,
        name: "Camp",
        explored: 0.0, // percentage; 0.0 = unexplored, 1.0 = fully explored
        discoveredActivities:[
          false,
          false,
          false,
          false,
          false
        ],
        activities: [
          {
            name: "Explore area",
            reward: {
              heroExperience: 800,
              itemRewardList: [
              {
                id:1,
                quantity:3
              },
              ],
              amountOfExploration: 5,
            },
            complexity: 1,
          },
        ],
      },
      {
        id:1,
        name: "Svartholtr",
        explored: 0.0, // percentage; 0.0 = unexplored, 1.0 = fully explored
        discoveredActivities:[
          false,
          false,
          false,
          false,
          false
        ],
        activities: [
          {
            name: "Explore area",
            reward: {
              heroExperience: 100,
              itemRewardList: [{
                id:3,
                quantity:5
              }],
              amountOfExploration: 7,
            },
            complexity: 1,
          }
        ],
      },
      {
        id:2,
        name: "Meðalgarðr",
        explored: 0.0, // percentage; 0.0 = unexplored, 1.0 = fully explored
        discoveredActivities:[
          false,
          false,
          false,
          false,
          false
        ],
        activities: [
          {
            name: "Explore area",
            reward: {
              heroExperience: 0,
              itemRewardList: [],
              amountOfExploration: 7,
            },

            complexity: 1,
          },
          {
            name: "Fish in river",
            reward: {
              heroExperience: 0,
              itemRewardList: [],
              amountOfExploration: 1,
            },

            complexity: 1,
          },
          {
            name: "Hunt elk",
            reward: {
              heroExperience: 0,
              itemRewardList: [],
              amountOfExploration: 1,
            },

            complexity: 1,
          },
          {
            name: "Raid camp",
            reward: {
              heroExperience: 0,
              itemRewardList: [],
              amountOfExploration: 1,
            },

            complexity: 1,
          },
          {
            name: "Defeat leader",
            reward: {
              heroExperience: 0,
              itemRewardList: [],
              amountOfExploration: 1,
            },

            complexity: 1,
          },
        ],
      },
      {
        id:3,
        name: "Þváheimr",
        explored: 0.0, // percentage; 0.0 = unexplored, 1.0 = fully explored
        discoveredActivities:[
          false,
          false,
          false,
          false,
          false
        ],
        activities: [
          {
            name: "Explore area",
            reward: {
              heroExperience: 0,
              itemRewardList: [],
              amountOfExploration: 7,
            },

            complexity: 0,
          },
          {
            name: "Fish in river",
            reward: {
              heroExperience: 0,
              itemRewardList: [],
              amountOfExploration: 1,
            },

            complexity: 0,
          },
          {
            name: "Raid camp",
            reward: {
              heroExperience: 0,
              itemRewardList: [],
              amountOfExploration: 1,
            },

            complexity: 1,
          },
          {
            name: "Defeat leader",
            reward: {
              heroExperience: 0,
              itemRewardList: [],
              amountOfExploration: 1,
            },

            complexity: 1,
          },
        ],
      },
      {
        id:4,
        name: "Skarnalǫg",
        explored: 0.0, // percentage; 0.0 = unexplored, 1.0 = fully explored
        discoveredActivities:[
          false,
          false,
          false,
          false,
          false
        ],
        activities: [
          {
            name: "Explore area",
            reward: {
              heroExperience: 0,
              itemRewardList: [],
              amountOfExploration: 7,
            },

            complexity: 0,
          },
          {
            name: "Steal crops",
            reward: {
              heroExperience: 0,
              itemRewardList: [],
              amountOfExploration: 1,
            },

            complexity: 0,
          },
          {
            name: "Hunt deer",
            reward: {
              heroExperience: 0,
              itemRewardList: [],
              amountOfExploration: 1,
            },

            complexity: 0,
          },
          {
            name: "Raid camp",
            reward: {
              heroExperience: 0,
              itemRewardList: [],
              amountOfExploration: 1,
            },

            complexity: 1,
          },
          {
            name: "Defeat leader",
            reward: {
              heroExperience: 0,
              itemRewardList: [],
              amountOfExploration: 1,
            },

            complexity: 1,
          },
        ],
      },
      {
        id:5,
        name: "Vágholtr",
        explored: 0.0, // percentage; 0.0 = unexplored, 1.0 = fully explored
        discoveredActivities:[
          false,
          false,
          false,
          false,
          false
        ],
        activities: [
          {
            name: "Explore area",
            reward: {
              heroExperience: 0,
              itemRewardList: [],
              amountOfExploration: 7,
            },

            complexity: 0,
          },
          {
            name: "Mine copper",
            reward: {
              heroExperience: 0,
              itemRewardList: [],
              amountOfExploration: 1,
            },

            complexity: 1,
          },
          {
            name: "Raid camp",
            reward: {
              heroExperience: 0,
              itemRewardList: [],
              amountOfExploration: 1,
            },

            complexity: 1,
          },
          {
            name: "Defeat leader",
            reward: {
              heroExperience: 0,
              itemRewardList: [],
              amountOfExploration: 1,
            },

            complexity: 1,
          },
        ],
      },
      {
        id:6,
        name: "Fjalland",
        explored: 0.0, // percentage; 0.0 = unexplored, 1.0 = fully explored
        discoveredActivities:[
          false,
          false,
          false,
          false,
          false
        ],
        activities: [
          {
            name: "Explore area",
            reward: {
              heroExperience: 0,
              itemRewardList: [],
              amountOfExploration: 7,
            },

            complexity: 0,
          },
          {
            name: "Mine iron",
            reward: {
              heroExperience: 0,
              itemRewardList: [],
              amountOfExploration: 1,
            },

            complexity: 1,
          },
          {
            name: "Raid camp",
            reward: {
              heroExperience: 0,
              itemRewardList: [],
              amountOfExploration: 1,
            },

            complexity: 1,
          },
          {
            name: "Defeat leader",
            reward: {
              heroExperience: 0,
              itemRewardList: [],
              amountOfExploration: 1,
            },

            complexity: 1,
          },
        ],
      },
    ],
  },
};


export function saveActivity(gameState: GameState, zoneId: number, activity: Activity): void {
  const zone = gameState.world.zones.find(z => z.id === zoneId);
  if (zone) {
    zone.activities.push(activity);
  } else {
    console.error(`Zone with ID ${zoneId} not found.`);
  }
}


export function updateActivity(gameState: GameState, zoneId: number, activityName: string, updatedActivity: Partial<Activity>): void {
  const zone = gameState.world.zones.find(z => z.id === zoneId);
  if (zone) {
    const activityIndex = zone.activities.findIndex(a => a.name === activityName);
    if (activityIndex !== -1) {
      zone.activities[activityIndex] = { ...zone.activities[activityIndex], ...updatedActivity };
    } else {
      console.error(`Activity "${activityName}" not found in zone ${zoneId}.`);
    }
  } else {
    console.error(`Zone with ID ${zoneId} not found.`);
  }
}


export function removeActivity(gameState: GameState, zoneId: number, activityName: string): void {
  const zone = gameState.world.zones.find(z => z.id === zoneId);
  if (zone) {
    zone.activities = zone.activities.filter(a => a.name !== activityName);
  } else {
    console.error(`Zone with ID ${zoneId} not found.`);
  }
}

export const addEvent = (event: GameEvent): void => {
  gameStateDefault.events.push(event);
}

export const getEvent = (): GameEvent[] => {
  return gameStateDefault.events;
}

export const loadLog = (): boolean => {
  return gameStateDefault.log.userInput;
}

export const setLog = (input: boolean): void => {
  gameStateDefault.log.userInput = input;
};

/** PLAYER
 * Function to set name, gender, and god in player within GameStateContext
 * using:
 * @param name 
 * @param gender 
 * @param god 
 */

export const setNGG = (name: string, gender: string, god: string): void => {
  gameStateDefault.player.name = name;
  gameStateDefault.player.gender = gender;
  gameStateDefault.player.god = god;
};

/** PLAYER
 * Function to get the current day from within GameStateContext
 * @returns day
 */

export const getDay = (): number => {
  return gameStateDefault.player.day;
};

/** PLAYER
 * Function to set the day within GameStateContext
 * using:
 * @param day 
 */

export const setDay = (day: number): void => {
  gameStateDefault.player.day = day;
};

/** HEROES
 * Function to add a hero to the list of heroes within GameStateContext
 * using:
 * @param hero 
 */

export const addHero = (hero: Hero): void => {
  gameStateDefault.heroes.push(hero);
}

/** HEROES
 * Function to update a hero in the list of heroes within GameStateContext
 * using:
 * @param clone 
 */

export const updateHero = (clone: Hero): void => {
  // Find the index of the hero with the matching ID
  const index = gameStateDefault.heroes.findIndex(hero => hero.id === clone.id);

  // Check if the hero was found
  if (index !== -1) {
    // Update the hero at the found index with the clone
    gameStateDefault.heroes[index] = clone;
  }
}

/** HEROES
 * Function to get a hero from the list of heroes within GameStateContext
 * using:
 * @param id 
 * @returns hero
 */

export const getHero = (id: string): Hero | undefined => {
  const hero = gameStateDefault.heroes.find(hero => hero.id === id);
  if (!hero) {
    console.log(`Hero with ID "${id}" not found.`);
    return;
  }
  return hero;
}

/** HEROES
 * Function to get the list of heroes within GameStateContext
 * @returns heroes
 */

export const getHeroes = (): Hero[] => {
  return gameStateDefault.heroes;
}

/** TASKS
 * Function to add a task to the list of tasks within GameStateContext
 * @param task 
 */

export const addTask = (task: Task): void => {
  if (task.state === "completed") {
    gameStateDefault.tasks.completed.push(task);
  } else {
    gameStateDefault.tasks.onGoing.push(task);
  }
}

/** TASKS
 * Function to remove a task from the list of tasks within GameStateContext
 * @param id 
 */

export const removeTask = (id: string): void => {
  gameStateDefault.tasks.onGoing = gameStateDefault.tasks.onGoing.filter(task => task.id !== id);
}

/** TASKS
 * Function to move a task to completed tasks list
 * using:
 * @param task
 */

export const completeTask = (task: Task): void => {
  if (task.state === "deployed") {
    setState(task, "completed");
    addTask(task);
    removeTask(task.id);
  } else {
    console.log(`Couldn't complete task with ID "${task.id}".`);
  }
}

/** TASKS
 * Function to get a task from the list of tasks within GameStateContext
 * using:
 * @param id of task
 * @returns task
 */

export const getTask = (id: string): Task | undefined => {
  let task: Task | undefined = gameStateDefault.tasks.onGoing.find(task => task.id === id) || gameStateDefault.tasks.completed.find(task => task.id === id);
  if (!task) {
    console.log(`Task with ID "${id}" not found.`);
    return;
  }
  return task;
}

/** TASKS
 * Function to get the list of tasks within GameStateContext
 * @returns 
 */

export const getOngoingTasks = (): Task[] => {
  return gameStateDefault.tasks.onGoing;
}

/** TASKS
 * Function to get the list of tasks within GameStateContext
 * @returns 
 */

export const getCompletedTasks = (): Task[] => {
  return gameStateDefault.tasks.completed;
}

// Funktion der undersøger, om en task kan ændres på, dvs. at den ikke er deployed eller completed
export const isTaskEditable = (task: Task | undefined): boolean => {
  if (task) {
    const state: string = task.state;
    if (state === 'deployed' || state === 'completed') {
      //console.log(`Unable to edit ${state} task!`);
      return false;
    }
    //console.log('Editing task!');
    return true;
  }
  //console.log('No task to edit!');
  return false
}

/** TASKS
 * Function to check if hero is in party of any task in list of tasks within GameStateContext
 * using:
 * @param hero 
 * @returns boolean
 */

export const isHeroInParty = (hero: Hero): boolean => {
  let tasks: Task[] = getOngoingTasks();
  
  return tasks.some(task => task.party.includes(hero.id));
}

/** ZONES
 * Function to get a zone from the list of zones within GameStateContext
 * using:
 * @param name 
 * @returns zone
 */

export const getZone = (name: string | undefined): Zone | undefined => {
  if (!name) {
    return;
  }
  return gameStateDefault.world.zones.find(zone => zone.name === name);
}

/** ZONES
 * Function to get the list of zones within GameStateContext
 * @returns zones
 */

export const getZones = (): Zone[] => {
  return gameStateDefault.world.zones;
}

/** CAMP
 * Function to get the list of buildings within GameStateContext
 * @returns buildings
 */

export const getBuildings = (): Building[] => {
  return gameStateDefault.camp.buildings;
}

/** STORAGE
 * Function to get the list of resources within GameStateContext
 * @returns resources
 */

export const getResources = (): StorageItem[] => {
  return gameStateDefault.storage.resources;
}

/** STORAGE
 * Function to get resource name by number id
 * @returns resource name
 */

//Return the name of the item
export const getResourceName = (id: number): string => {
  return gameStateDefault.storage.resources[id].name;
}


// Example to display the game state
function displayGameState(): void {
  console.log("GameState:");
  console.log(gameStateDefault);
}

// Function to save the game state to local storage
function saveGameState(): void {
  localStorage.setItem('gameState', JSON.stringify(gameStateDefault));
}

// Function to load the game state from local storage
function loadGameState(): void {
  const savedState = localStorage.getItem("gameState");
  if (savedState) {
    gameStateDefault = JSON.parse(savedState);
  }
}

export {
  displayGameState,
  saveGameState,
  loadGameState,
};
