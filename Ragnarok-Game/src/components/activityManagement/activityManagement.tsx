import { Task } from "../../classes/task/task";
import { GameState, saveActivity } from "../GameState";
import { Activity } from "../../classes/task/interfaces/Activity";

// Assuming you have a way to access the current task from a component
export function ActivityManagement(gameState:GameState , currentTask: Task) {
  
      let newStory = [];
    
    if(currentTask.destination.zoneID === 0){ //if the zone is the camp
        if(gameState.world.zones[0].explored>3 && gameState.world.zones[0].discoveredActivities[0]===false){
          saveActivity(gameState, 0, createActivity("Gather oak wood", 500, [{id:0,quantity:5}], 1,1));
          gameState.world.zones[0].discoveredActivities[0]=true;
          newStory.push("As the heroes set out exploring, they discovered a dense forest just beyond the clearing. The trees stood tall and strong, their trunks straight and thick with age, the wood dark and sturdy. It was a lumberjack's dream—perfect for building or crafting weapons.")
        }

        if(gameState.world.zones[0].explored>14 && gameState.world.zones[0].discoveredActivities[1]===false){
          saveActivity(gameState, 0, createActivity("Hunt deers", 1000, [{id:2,quantity:3},{id:21,quantity:2}], 2,1));
         gameState.world.zones[0].discoveredActivities[1]=true;
          newStory.push("While journeying through the oak wood forest, your heroes came across a deer trails beneath the fallen leaves, pointing towards deeper within the forest.")
        }
      }

      if(currentTask.destination.zoneID === 1){ //if the zone is the Svartholtr
        if(gameState.world.zones[1].explored>9 && gameState.world.zones[1].discoveredActivities[0]===false){
          saveActivity(gameState, 1, createActivity("Gather pine wood", 500, [{id:0,quantity:5}], 1,1));
          gameState.world.zones[1].discoveredActivities[0]=true;
          newStory.push("Your heroes fell on some stick finding a pine forest.");
        }

        if(gameState.world.zones[1].explored>15 && gameState.world.zones[1].discoveredActivities[1]===false){
          saveActivity(gameState, 1, createActivity("Hunt reindeers", 1000, [{id:2,quantity:3},{id:21,quantity:2}], 2,1));
          gameState.world.zones[1].discoveredActivities[1]=true;
          newStory.push("While journeying through the oak wood forest, your heroes came across a deer trails beneath the fallen leaves, pointing towards deeper within the forest.")
        }

        if(gameState.world.zones[1].explored>20 && gameState.world.zones[1].discoveredActivities[2]===false){
            saveActivity(gameState, 1, createActivity("Raid camp", 500, [], 1,1));
            gameState.world.zones[1].discoveredActivities[2]=true;
            newStory.push("Your heroes got really really drunk, and found a camp, looking pretty raidable.");
          }

        if(gameState.world.zones[1].explored>25 && gameState.world.zones[1].discoveredActivities[3]===false){
            saveActivity(gameState, 1, createActivity("Defeat leader", 500, [], 1,1));
            gameState.world.zones[1].discoveredActivities[3]=true;
            newStory.push("Your presence have been noticed by a Jotun, You will no be able to pass without defeating him.");
        }
      }


      if(currentTask.destination.zoneID === 2){ //if the zone is the Meðalgarðr
        if(gameState.world.zones[2].explored>3 && gameState.world.zones[2].discoveredActivities[0]===false){
          saveActivity(gameState, 2, createActivity("Gather oak wood", 500, [{id:0,quantity:5}], 1,1));
          gameState.world.zones[2].discoveredActivities[0]=true;
          newStory.push("As the heroes set out exploring, they discovered a dense forest just beyond the clearing. The trees stood tall and strong, their trunks straight and thick with age, the wood dark and sturdy. It was a lumberjack's dream—perfect for building or crafting weapons.")
        }

        if(gameState.world.zones[2].explored>14 && gameState.world.zones[2].discoveredActivities[1]===false){
            saveActivity(gameState, 2, createActivity("Hunt deers", 1000, [{id:2,quantity:3},{id:21,quantity:2}], 2,1));
            gameState.world.zones[2].discoveredActivities[1]=true;
            newStory.push("While journeying through the oak wood forest, your heroes came across a deer trails beneath the fallen leaves, pointing towards deeper within the forest.")
        }
      }


   

  return newStory;
};

function createActivity(name:string, hE:number, itemRL:ItemReward[], aOfExpl:number, complexity:number):Activity{
    return {name: name, reward: {heroExperience: hE, itemRewardList: itemRL, amountOfExploration: aOfExpl}, complexity: complexity}
  }
