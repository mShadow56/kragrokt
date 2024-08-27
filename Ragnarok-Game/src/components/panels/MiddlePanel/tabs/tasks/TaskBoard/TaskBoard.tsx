import { useEffect, useState } from 'react';
import taskBoardBackgroundImage from '../../../../../../assets/images/frames/task-board-background.png';
import taskBoardFrameImage from '../../../../../../assets/images/frames/task-board-frame.png';
import './TaskBoard.css';
import { Task, getState, setState } from '../../../../../../classes/task/task';
import { getOngoingTasks, getTask, getZone, getHero, getCompletedTasks } from '../../../../../GameState';
import { TasksProps } from '../tasks';
import { Hero } from '../../../../../../classes/hero/hero';

function TaskBoard({
  setCurrentTask,
  selectedZone,
  setSelectedZone,
  selectedActivity,
  setSelectedActivity,
  partyMembers,
  setPartyMembers,
  trigger,
  setTrigger
}: TasksProps) {
  const [currentTab, setCurrentTab] = useState<string>('ongoing');

  const setStateOfTasks = (): void => {
    getOngoingTasks().forEach((task) => {
      if (getState(task) !== "deployed") {
        if (task.destination.zone !== '' && task.activity.name !== '' && task.party.length > 0) {
          setState(task, 'ready');
        } else {
          setState(task, 'unready');
        }
      }
    });
    setTrigger(!trigger);
  }

  function handleTaskClick(task: Task): void {
    setCurrentTask(getTask(task.id))
    setSelectedZone(getZone(task.destination.zone));
    setSelectedActivity(task.activity);
    const newParty: Hero[] = [];
    task.party.forEach(id => {
      const hero: Hero | undefined = getHero(id);
      if (hero) {
        newParty.push(hero);
      }
    });
    setPartyMembers(newParty);
  }

  const getTasksAsElements = (): JSX.Element => {
    if (currentTab === 'ongoing') {
      return getOngoingTasksAsElements();
    } else if ( currentTab === 'completed') {
      return getCompletedTasksAsElements();
    } else {
      return (<></>);
    }
  }

  const getOngoingTasksAsElements = (): JSX.Element => {
    return (
      <>
      {getOngoingTasks().map((task) => (
        <div key={`${task.id}-key`} id={`task-${task.id}`} onClick={() => handleTaskClick(task)}>
          {`${task.activity.name} in ${task.destination.zone} (${task.party.length}/4) - ${getState(task)}!`}
        </div>
      ))}
      </>
    );
  }

  const getCompletedTasksAsElements = (): JSX.Element => {
    return (
      <>
      {getCompletedTasks().map((task) => (
        <div key={`${task.id}-key`} id={`task-${task.id}`} onClick={() => handleTaskClick(task)}>
          {`${task.activity.name} in ${task.destination.zone} (${task.party.length}/4) - ${getState(task)}!`}
        </div>
      ))}
      </>
    );
  }

  useEffect(() => {
    setStateOfTasks();
  }, [selectedZone, selectedActivity, partyMembers]);

  function handleOngoingTabClick() {
    setCurrentTab('ongoing');
  }

  function handleCompletedTabClick() {
    setCurrentTab('completed');
  }

  return (
    <div id="task-board" className="task-board">
      <img className="task-board-background"
        src={taskBoardBackgroundImage}
        alt="Taskboard Background img"
        draggable="false">
      </img>
      <img className="task-board-frame"
        src={taskBoardFrameImage}
        alt="Taskboard Frame img"
        draggable="false"></img>
      <div id="tasks-list" className="tasks-list">
        {getTasksAsElements()}
      </div>
      <div id="task-board-buttons" className="task-board-bar">
        <button id="ongoing-tasks-button" className="tab-button"
          onClick={handleOngoingTabClick}>Ongoing
        </button>
        <button id="completed-tasks-button" className="tab-button"
          onClick={handleCompletedTabClick}>Completed
        </button>
      </div>
    </div>
  );
}

export default TaskBoard;