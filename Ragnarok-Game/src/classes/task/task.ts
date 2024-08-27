import { v4 as uuidv4 } from 'uuid';
import { Hero } from '../hero/hero';
import { getDay } from '../../components/GameState';
import { Activity } from './interfaces/Activity';

export interface Connection {
  node: string;
  weight: number;
}

export interface MapGraph {
  [key: string]: Connection[];
}

class Task {
  state: 'unready' | 'ready' | 'deployed' | 'completed';
  destination: Destination;
  activity: Activity;
  party: string[];
  timeToFinish: number;
  dateCreated: number;
  dateDeployed: number;
  success: boolean;
  id: string;

  constructor() {
    this.state = 'unready';
    this.destination = {
      zoneID:0,
      zone: '',
      location: '',
      travelTime: 0,
    };
    this.activity = {
      name: '',
      reward: {
        heroExperience: 0,
        itemRewardList: [],
        amountOfExploration: 0,
      },
      complexity: 0,
    };
    this.party = [];
    this.timeToFinish = 0;
    this.dateCreated = structuredClone(getDay());
    this.dateDeployed = 0; // if (loadDay() === task.timeToFinish + task.dateDeployed) { //day of task completion }
    this.success = false;
    this.id = uuidv4();
  }
}

function getState(task: Task) {
  return task.state;
}

// Setter for the state property
function setState(task: Task, state: 'unready' | 'ready' | 'deployed' | 'completed'): void {
  task.state = state;
}

// Method to check if the task can be deployed
function canDeploy(task: Task) {
  return task.state === 'ready';
}

// Method to check if the task can be completed
function canComplete(task: Task) {
  return task.state === 'deployed'; // Questionable
}

// Example method to change the state to deployed
function deploy(task: Task) {
  if (canDeploy(task)) {
    task.state = 'deployed';
  } else {
    console.log('Cannot deploy task: it is not in the ready state.');
  }
}

// Example method to mark the task as completed
function complete(task: Task, success: boolean) {
  if (canComplete(task)) {
    task.state = 'completed';
    task.success = success;
  } else {
    console.log('Cannot complete task: it is not in the deployed state.');
  }
}

function addHeroToParty(task: Task, hero: Hero) {
  // Check if the party array has less than 4 heroes
  if (task.party.length < 4) {
    if (!task.party.includes(hero.id)) { // Check that it doesn't already contain this hero
      task.party.push(hero.id); // Add the hero to the party
      hero.inParty = true;
    } else {
      console.log('Hero already added to party. Cannot add same hero twice.');
    }
  } else {
    console.log('The party is full. Cannot add more heroes.');
  }
}

function removeHeroFromParty(task: Task, hero: Hero) {
  if (task.party.length > 0) {
    const index = task.party.indexOf(hero.id);
    if (index !== -1) {
      task.party.splice(index, 1);
      hero.inParty = false;
    }
  }
}


function setZone(task: Task, zone: string, zoneID:number) {
  // Set the zone of the task
  task.destination.zone = zone;
  // Set the zone id of the task
  task.destination.zoneID=zoneID;


}

function setActivity(task: Task, activity: Activity) {
  // Set the goal of the task
  task.activity = activity;
}

function updateTimeToFinish(task: Task) {
  task.timeToFinish = Math.floor((2 * task.destination.travelTime) + task.activity.complexity); // eller noget
}

function updateDateDeployed(task: Task) {
  task.dateDeployed = getDay();
}

function calculateTravelTime(task: Task) {
  const start = 'Camp';
  const end = task.destination.zone;
  const result = dijkstra(mapGraph, start, end);

  if (result) {
    //console.log(`The shortest path from ${start} to ${end} is: ${result.path.join(' -> ')}`);
    //console.log(`The travel time is: ${result.distance}`);
    task.destination.travelTime = result.distance;
  } else {
    console.log(`No path found from ${start} to ${end}`);
  }
}

function dijkstra(graph: Graph, start: string, end: string): { path: string[]; distance: number } | null {
  const unvisited = new Set<string>(Object.keys(graph));
  const distances: { [key: string]: number } = {};
  const previous: { [key: string]: string | null } = {};

  // Initialize distances to all nodes as Infinity except for the start node
  for (let node in graph) {
    distances[node] = Infinity;
    previous[node] = null;
  }
  distances[start] = 0;

  while (unvisited.size > 0) {
    let currentNode = Array.from(unvisited).reduce((a, b) => distances[a] < distances[b] ? a : b);

    unvisited.delete(currentNode);

    if (currentNode === end) {
      let path: string[] = [];
      let current: string | null = end;
      while (current) {
        path.unshift(current);
        current = previous[current];
      }
      return { path: path.reverse(), distance: distances[end] };
    }

    if (distances[currentNode] === Infinity) break;

    for (let neighbor of graph[currentNode]) {
      let candidate = distances[currentNode] + neighbor.weight;
      if (candidate < distances[neighbor.node]) {
        distances[neighbor.node] = candidate;
        previous[neighbor.node] = currentNode;
      }
    }
  }

  return null; // No path found
}

const mapGraph: MapGraph = {
  'Camp': [
    { node: 'Svartholtr', weight: 0.5 },
  ],
  'Svartholtr': [
    { node: 'Camp', weight: 0.5 },
    { node: 'Meðalgarðr', weight: 0.5 },
  ],
  'Meðalgarðr': [
    { node: 'Svartholtr', weight: 0.5 },
    { node: 'Þváheimr', weight: 0.5 },
    { node: 'Vágholtr', weight: 1 },
    { node: 'Fjalland', weight: 1 },
  ],
  'Þváheimr': [
    { node: 'Meðalgarðr', weight: 0.5 },
    { node: 'Skarnalǫg', weight: 1 },
    { node: 'Fjalland', weight: 1 },
  ],
  'Skarnalǫg': [
    { node: 'Þváheimr', weight: 1 },
  ],
  'Vágholtr': [
    { node: 'Meðalgarðr', weight: 1 },
    { node: 'Fjalland', weight: 1.5 },
  ],
  'Fjalland': [
    { node: 'Meðalgarðr', weight: 1 },
    { node: 'Þváheimr', weight: 1 },
    { node: 'Vágholtr', weight: 1.5 },
  ],
};

export {
  Task,
  getState,
  setState,
  canDeploy,
  canComplete,
  deploy,
  complete,
  addHeroToParty,
  removeHeroFromParty,
  setZone,
  setActivity,
  updateDateDeployed,
  updateTimeToFinish,
  calculateTravelTime,
  mapGraph
};