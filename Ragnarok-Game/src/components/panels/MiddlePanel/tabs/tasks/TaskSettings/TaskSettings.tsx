import { useEffect } from 'react';
import { Task, calculateTravelTime, canDeploy, deploy, setActivity, setState, setZone, updateDateDeployed, updateTimeToFinish } from '../../../../../../classes/task/task';
import SelectSetting from './SelectSetting/SelectSetting';
import selectLowerBoxBackgroundImage from '../../../../../../assets/images/frames/lower-box-background.png';
import selectLowerBoxFrameImage from '../../../../../../assets/images/frames/lower-box-frame.png';
import PartySetting from './PartySetting/PartySetting';
import { Zone } from '../../../../../interfaces/Zone';
import { getZone, addTask, removeTask, getZones, getDay, isTaskEditable } from '../../../../../GameState';
import { TasksProps } from '../tasks';
import { Activity } from '../../../../../../classes/task/interfaces/Activity';
import { useGameStateContext } from '../../../../../../contexts/GameStateContext';


function TaskSettings({
  currentTask,
  setCurrentTask,
  currentHero,
  setCurrentHero,
  selectedZone,
  setSelectedZone,
  selectedActivity,
  setSelectedActivity,
  partyMembers,
  setPartyMembers,
  trigger,
  setTrigger
}: TasksProps) {
  const context = useGameStateContext();

  useEffect(() => {
    if (currentTask && currentTask.destination.zone !== '') {
      const zone: Zone | undefined = structuredClone(getZone(currentTask.destination.zone));
      setSelectedZone(zone);
    }
    if (currentTask && currentTask.activity.name !== '') {
      const activity: Activity | undefined = structuredClone(getZone(currentTask.destination.zone)?.activities.find(activity => activity.name === currentTask?.activity.name));
      setSelectedActivity(activity);
    }
  }, [currentTask]);

  useEffect(() => {
    if (currentTask && selectedZone) {
      setZone(currentTask, structuredClone(selectedZone).name, structuredClone(selectedZone).id);
      calculateTravelTime(currentTask);
      const newActivity: Activity = {
        name: '',
        reward: {
          heroExperience: 0,
          itemRewardList: [],
          amountOfExploration: 0
        },
        complexity: 0,
      };
      setActivity(currentTask, newActivity);
    }
  }, [selectedZone]);

  useEffect(() => {
    if (currentTask && selectedActivity) {
      setActivity(currentTask, structuredClone(selectedActivity));
      /*
      if (currentTask.state !== 'deployed' && currentTask.state !== 'completed') {
        updateTimeToFinish(currentTask);
        updateDateDeployed(currentTask);
      }
      */
    }
  }, [selectedActivity]);


  //Button for creating new task
  const onNewTaskButtonClick = (): void => {
    const newTask = new Task;
    addTask(newTask);
    setCurrentTask(newTask);
    setSelectedZone(undefined);
    setSelectedActivity(undefined);
  }

  //Button for deleting task
  const onDeleteTaskButtonClick = (): void => {
    if (currentTask) {
      const state = currentTask.state;
      if ((state === 'deployed' && !isTaskCreatedToday(currentTask)) || state === 'completed') {
        console.log(`Can't delete a ${state} task!`);
        return;
      }
      removeTask(currentTask.id);
      setCurrentTask(undefined);
      setSelectedZone(undefined);
      setSelectedActivity(undefined);
      setPartyMembers([]);
    }
  }

  //Button for deploying task
  const onDeployButtonClick = () => {
    if (currentTask) {
      if (canDeploy(currentTask)) {
        deploy(currentTask);
        updateTimeToFinish(currentTask);
        updateDateDeployed(currentTask);
      } else if (currentTask.state === 'deployed' && currentTask.dateDeployed === getDay()) {
        setState(currentTask, 'ready');
      }
    }
    setTrigger(!trigger);
  }

  //Handles changing of Destination
  const handleDestinationValueChange = (newValue: string) => {
    if (!isTaskEditable(currentTask)) {
      return;
    }
    const newZone: Zone | undefined = getZones().find(zone => zone.name === newValue);
    setSelectedZone(structuredClone(newZone));
    setSelectedActivity(undefined);
  };

  //Handles changing of goal
  const handleGoalValueChange = (newValue: string) => {
    if (!selectedZone) {
      return;
    }
    if (!isTaskEditable(currentTask)) {
      return;
    }
    const newGoal: Activity | undefined = selectedZone?.activities.find(activity => activity.name === newValue);
    setSelectedActivity(structuredClone(newGoal));
  }

  // Funktion der henter alle tilgængelige zoner til SelectSetting-elementet
  function getZoneOptions(): string[] {
    const options: string[] = [];
    structuredClone(getZones().forEach((zone, index) => {
      if (context.gameState.world.discoveredZones[index]) {
        options.push(zone.name);
      }
    }));
    return options;
  }

  // Funktion der henter alle tilgængelige aktiviteter for den valgte zone til SelectSetting-elementet
  function getGoalOptions(): string[] {
    const options: string[] = [];
    structuredClone(getZone(selectedZone?.name)?.activities.forEach(activity => options.push(activity.name)))
    return options;
  }

  // Funktion der undersøger, om en opgave/task er oprettet ved nuværende/gældende dag
  function isTaskCreatedToday(task: Task): boolean {
    if (task) {
      const dateCreated = task.dateCreated;
      const currentDay = getDay();
      if (dateCreated !== currentDay) {
        console.log(`Task wasn't created today`);
        return false;
      } else {
        return true;
      }
    } else {
      console.log('No task selected!');
      return false;
    }
  }


  return (
    <>
      <div id="tasks-buttons" className="tasks-bar">
        <button id="new-task-button" className="tab-button" onClick={onNewTaskButtonClick}>NEW</button>
        <button id="delete-task-button" className="tab-button" onClick={onDeleteTaskButtonClick}>DELETE</button>
        <button id="deploy-task-button" className="tab-button" onClick={onDeployButtonClick}>DEPLOY</button>
      </div>
      <div id="task-settings" className="task-settings">
        <SelectSetting currentTask={currentTask} selectedZone={selectedZone} id='destination' options={getZoneOptions()} value={selectedZone?.name} onValueChange={handleDestinationValueChange} />
        <SelectSetting currentTask={currentTask} selectedZone={selectedZone} id='goal' options={getGoalOptions()} value={selectedActivity?.name} onValueChange={handleGoalValueChange} />
        <div className="task-settings-lower">
          <PartySetting
            currentTask={currentTask}
            currentHero={currentHero} setCurrentHero={setCurrentHero}
            partyMembers={partyMembers} setPartyMembers={setPartyMembers} />
          <div id="task-inventory" className="list-setting">
            <div id="inventory-name" className="list-label">Inventory:</div>
            <div id="inventory" className="list-box">
              <img className="list-box-background"
                src={selectLowerBoxBackgroundImage}
                alt="Inventory Background img"
                draggable="false">
              </img>
              <img className="list-box-frame"
                src={selectLowerBoxFrameImage}
                alt="Inventory Frame img"
                draggable="false">
              </img>
              <div id="inventory-list" className="list-box-names"></div>
            </div>
            <div className="party-buttons">
              <button id="add-to-inventory" className="tab-button">Add</button>
              <button id="remove-from-inventory" className="tab-button">Remove</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskSettings;
