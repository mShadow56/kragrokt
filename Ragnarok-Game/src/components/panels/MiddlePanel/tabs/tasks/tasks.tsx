import { useState } from 'react';
import './tasks.css';
import { MiddlePanelProps } from '../../MiddlePanel';
import TaskSettings from './TaskSettings/TaskSettings';
import TaskBoard from './TaskBoard/TaskBoard';
import { Zone } from '../../../../interfaces/Zone';
import { Activity } from '../../../../../classes/task/interfaces/Activity';

export interface TasksProps extends MiddlePanelProps {
  selectedZone: Zone | undefined,
  setSelectedZone: (newTask: Zone | undefined) => void,
  selectedActivity: Activity | undefined,
  setSelectedActivity: (newHero: Activity | undefined) => void,
  trigger: boolean,
  setTrigger: (newValue: boolean) => void;
}

function Tasks({
  currentTask,
  setCurrentTask,
  currentHero,
  setCurrentHero,
  partyMembers,
  setPartyMembers,
  selectedZone,
  setSelectedZone,
  selectedActivity,
  setSelectedActivity
}: MiddlePanelProps) {
  const [trigger, setTrigger] = useState<boolean>(false);



  return (
    <div id="tasks-container" className="tasks-container">
      <TaskSettings
        {...{
          currentTask,
          setCurrentTask,
          currentHero,
          setCurrentHero
        }}
        selectedZone={selectedZone} setSelectedZone={setSelectedZone}
        selectedActivity={selectedActivity} setSelectedActivity={setSelectedActivity}
        partyMembers={partyMembers} setPartyMembers={setPartyMembers}
        trigger={trigger} setTrigger={setTrigger} />
      <TaskBoard
        {...{
          currentTask,
          setCurrentTask,
          currentHero,
          setCurrentHero
        }}
        selectedZone={selectedZone} setSelectedZone={setSelectedZone}
        selectedActivity={selectedActivity} setSelectedActivity={setSelectedActivity}
        partyMembers={partyMembers} setPartyMembers={setPartyMembers}
        trigger={trigger} setTrigger={setTrigger} />
    </div>
  );
}

export default Tasks;