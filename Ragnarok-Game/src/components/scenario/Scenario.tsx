import { useEffect, useRef, useState } from "react";
import closeButton from "../../assets/images/closeButton.png";
import {
  Hero,
  updateLevel,
  updateStatPointsAvailable,
  updateStatPointsTotal,
  updateSubstats,
} from "../../classes/hero/hero";
import { Connection, mapGraph, Task } from "../../classes/task/task";
import { useGameStateContext } from "../../contexts/GameStateContext";
import {
  addEvent,
  getDay,
  getEvent,
  getHero,
  getResourceName,
  getOngoingTasks,
  saveGameState,
  setDay,
  completeTask,
  getZone,
} from "../GameState";
import { GameEvent } from "../interfaces/GameEvent";
import Left_arrow from "./buttons/left_arrow";
import Right_arrow from "./buttons/right_arrow";
import "./Scenario.css";
import { Zone } from "../interfaces/Zone";
import { ActivityManagement } from "../activityManagement/activityManagement";

interface Props {
  isScenarioOpen: boolean;
  setIsScenarioOpen: (isOpen: boolean) => void;
  setCurrentFadeText: (text: string) => void;
  setIsFading: (newValue: boolean) => void;
}

function Scenario({ isScenarioOpen, setIsScenarioOpen, setCurrentFadeText, setIsFading }: Props) {
  //access to all of gamestate
  const context = useGameStateContext();
  //Contains all the events from gamestate
  const [event] = useState<GameEvent[]>(getEvent());
  //Contains all the tasks in gamestate
  const [loadedTasks, setLoadedTasks] = useState<Task[]>(getOngoingTasks());
  //contains the event that is currently being shown on the scenario window.
  const [currentEvent, setCurrentEvent] = useState<GameEvent>(event[context.gameState.events.length-1]);

  const [selectedContent, setSelectedContent] = useState("story"); 
  const buttonRefStory = useRef<HTMLButtonElement | null>(null);
  const buttonRefLog = useRef<HTMLButtonElement | null>(null);



  let story: string[] = [];
  let items: string[] = [];

  useEffect(() => {
    setLoadedTasks(getOngoingTasks());
  }, [currentEvent])

  useEffect(() => {
    if(buttonRefLog.current && buttonRefStory.current){
      if(selectedContent==="story"){
      buttonRefStory.current.style.backgroundColor="#edc774";
      buttonRefLog.current.style.backgroundColor="#8e7a4e";
    }else if(selectedContent==="log"){
      buttonRefStory.current.style.backgroundColor="#8e7a4e";
      buttonRefLog.current.style.backgroundColor="#edc774";
    }}

    
  }, [selectedContent])

  // Function to generate a random number within a specified range
  function generateRandomNumberInRange (min: number, max: number): number {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log("RandomNumber: " + num);
    return num;
  };
  
  //Closes the scenarion window by setting the setIsScenarioOpen to false
  const closeScenarioModal = (): void => {
    console.log("Closing options modal...");
    setIsScenarioOpen(false); 
    // Updates day, to set the day to 1
    if (getDay() === 0) {
      updateDate();
    }
  };

  function ordinalSuffixOf(i: number): string {
    let j: number = i % 10,
      k = i % 100;
    if (j === 1 && k !== 11) {
      return i + "st";
    }
    if (j === 2 && k !== 12) {
      return i + "nd";
    }
    if (j === 3 && k !== 13) {
      return i + "rd";
    }
    return i + "th";
  }

  // Add experience to heroes in the party, then update level and stats
  function updateHeroesInParty(task: Task) {
    for (let i = 0; i < task.party.length; i++) {
      const hero: Hero | undefined = getHero(task.party[i]);

      if (hero) {
        hero.xp += task.activity.reward.heroExperience;
        updateLevel(hero);
        updateSubstats(hero);
        updateStatPointsTotal(hero);
        updateStatPointsAvailable(hero);
      }
    }
  }

  function createStory(task: Task) {
    story.push(
      "You have finished the task of " + task.activity.name
    );

    for (let j = 0; j < task.party.length; j++) {
      items.push(
        task.activity.reward.heroExperience +
          " experience points for your hero " +
          getHero(task.party[j])?.firstName +
          " " +
          getHero(task.party[j])?.lastName
      );
    }
    
    for (let k = 0; k < task.activity.reward.itemRewardList.length; k++) {
      items.push(task.activity.reward.itemRewardList[k].quantity+ " "+getResourceName(task.activity.reward.itemRewardList[k].id) );

    }
  }
  
  function addItemsToStorage(task: Task) {
    // Add items to storage
    const itemRewardList: ItemReward[] = task.activity.reward.itemRewardList;
    const resources: StorageItem[] = context.gameState.storage.resources;
    for (let j = 0; j < itemRewardList.length; j++) {
      resources[itemRewardList[j].id].quantity += itemRewardList[j].quantity;
    }
  }

  function updateZoneExplored(task: Task) {
    // Increase percentage of zone explored
    const fullAmountExplored: number = task.activity.reward.amountOfExploration * task.party.length;
    if (task.destination.zoneID !== undefined) {
      console.log(`Full amount explored: ${fullAmountExplored}`);
      context.gameState.world.zones[task.destination.zoneID].explored += fullAmountExplored;
    }
  }

  function findNeighbors(zoneName: string) {
    // Access the graph data for the given zone
    const zoneData: Connection[] = mapGraph[zoneName];
    
    // Initialize an empty array to hold the results
    let neighbors: string[] = [];
    
    // Check if the zone exists in the graph
    if (!zoneData || !Array.isArray(zoneData)) {
      console.log(`Zone ${zoneName} not found.`);
      return neighbors;
    }
    
    // Iterate over the connections from the zone
    zoneData.forEach(connection => {
      // Add the neighbor zone to the results array
      neighbors.push(connection.node);
    });
    
    // Return the array of neighbors
    return neighbors;
  }
  
  function lookForNewZones(task: Task) {
    // Check if found new area
    const zoneExplored: number = context.gameState.world.zones[task.destination.zoneID].explored;

    let currentZone: Zone | undefined = getZone(task.destination.zone);
    if (!currentZone) {
      return;
    }
    
    const neighborZones: string[] = findNeighbors(task.destination.zone);
    for (let i = 0; i < neighborZones.length; i++) {
      const randomNumber: number = generateRandomNumberInRange(0,100);
      const currentZoneID = getZone(neighborZones[i])?.id;
      if (currentZoneID && randomNumber < zoneExplored && context.gameState.world.discoveredZones[currentZoneID]===false) {
        context.gameState.world.discoveredZones[currentZoneID] = true;

        switch (currentZoneID) {
          case 1:
            story.push("You heroes have found a new area, here lies a dense and foreboding forest, where the trees are as hard as iron and the undergrowth is thick with thorns and brambles. The forest is ancient, and the trees tower high above, their twisted branches blocking out the sun. The air is filled with the sound of creaking wood and the rustling of unseen creatures.")
            break;
        
          default:
            break;
        }

      }
    }
  }

  //used to create a new event and decide rewards
  const calculateEventsAndRewards = (): void => {
    story = [];
    items = [];

    story.push(`It was the ${ordinalSuffixOf(getDay())} day.`);

    for (let i = 0; i < loadedTasks.length; i++) {
      const dayOfCompletion: number = loadedTasks[i].dateDeployed + loadedTasks[i].timeToFinish;
      if (
        loadedTasks[i].state === "deployed" &&
        dayOfCompletion === getDay()
      ) {
        console.log("Day of completion: " + dayOfCompletion);
        let currentTask: Task = loadedTasks[i];
        
        completeTask(currentTask);

        updateZoneExplored(currentTask);
        
        const storyArray = ActivityManagement(context.gameState, currentTask);
        for (let i = 0; i < storyArray.length; i++) {
          story.push(storyArray[i]);
          
        }


        lookForNewZones(currentTask);

        createStory(currentTask);

        updateHeroesInParty(currentTask);

        addItemsToStorage(currentTask);

      }
    }

    let newEvent: GameEvent = {
      day: getDay(),
      title: "DAY " + getDay(),
      story: story,
      storyItems: items,
    };
    addEvent(newEvent);
    setCurrentEvent(event[context.gameState.events.length - 1]);
    saveGameState();
  };

  const updateDate = () => {
    setDay(getDay() + 1);
    // Start of FadeIn
    setIsFading(true);
    setCurrentFadeText("DAY "+ getDay());
    // End of FadeIn
    setIsScenarioOpen(false);
    setTimeout(() => { calculateEventsAndRewards() }, 1500);
    // Start of FadeOut
    // End of FadeOut
  };

  const content = () => {
    const arrowButtons = () => {
      if (currentEvent.day === 0) {
        return (
          <>
            <Right_arrow onClick={rightClick} />
          </>
        );
      } else if (currentEvent.day === event.length - 1) {
        return <Left_arrow onClick={leftClick} />;
      } else {
        return (
          <>
            <Right_arrow onClick={rightClick} />
            <Left_arrow onClick={leftClick} />
          </>
        );
      }
    };

    const leftClick = () => {
      //Vi skal en dag tilbage i currentEvent vi at sætte
      setCurrentEvent(event[currentEvent.day - 1]);
    };

    const rightClick = () => {
      setCurrentEvent(event[currentEvent.day + 1]);
    };

    const nextDayButton = () => {
      if (currentEvent.day === getDay()) {
        return (
          <button className="NextDayButton" onClick={updateDate}>
            Next day
          </button>
        );
      }
    };

    const eventItemList = () => {
      if (currentEvent.storyItems.length != 0) {
        return (
          <>
            {Array.isArray(currentEvent.storyItems)
              ? currentEvent.storyItems.map((item, index) => (
                  <li key={index}>You have acquired {item}</li>
                ))
              : "No items available"}
          </>
        );
      }
    };

    return (
      <>
        <div>
          <div className="scenarioTop">
            <h2 className="scenarioTopTitle">{currentEvent.title}</h2>
            <img src={closeButton} onClick={closeScenarioModal}></img>
          </div>

          <div className="scenarioBottom">
            {arrowButtons()}
             
            <div className="scenarioStory">
           <div className="storyLogButtons-container">
            <div className="storyLogButtons">
              <button className="buttonRefStory" ref={buttonRefStory} onClick={()=> setSelectedContent("story")}>STORY</button>
              <button className="buttonRegLog" ref={buttonRefLog} onClick={()=> setSelectedContent("log")}>LOG</button>  
            </div>
                 </div>
              <div>
              {selectedContent === "story" ? (
              Array.isArray(currentEvent.story)
                ? currentEvent.story.map((story, index) => (
                    <h2 key={index}>{story}</h2>
                  ))
                : "No story available"
            ) : eventItemList()} 
          </div>
          <div className="nextDayContainer">
          {nextDayButton()}
          </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return <>{isScenarioOpen && <div className="scenario">{content()}</div>}</>;
}

export default Scenario;
