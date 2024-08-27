import { useEffect, useRef, useState } from 'react';
import '../panels.css';
import './tabs.css';
import './MiddlePanel.css';
import Heroes from './tabs/heroes/heroes';
import { Hero } from '../../../classes/hero/hero';
import Tasks from './tabs/tasks/tasks';
import { Task } from '../../../classes/task/task';
import { Zone } from '../../interfaces/Zone';
import { Activity } from '../../../classes/task/interfaces/Activity';

export interface MiddlePanelProps {
  currentHero: Hero | undefined,
  setCurrentHero: (newHero: Hero | undefined) => void,
  currentTask: Task | undefined,
  setCurrentTask: (newTask: Task | undefined) => void,
	partyMembers: Hero[],
	setPartyMembers: (newParty: Hero[]) => void,
	selectedZone:Zone|undefined,
	setSelectedZone: (setSelectedZone: Zone | undefined) => void,
	selectedActivity: Activity |undefined,
	setSelectedActivity: (setSelectedActivity: Activity | undefined) => void,
}

function MiddlePanel({
	currentHero,
	setCurrentHero,
	currentTask,
	setCurrentTask,
  partyMembers,
  setPartyMembers,
  selectedZone,
  setSelectedZone,
  selectedActivity,
  setSelectedActivity
}: MiddlePanelProps) {
	const [tab, setTab] = useState(0);
	const tasksRefButton = useRef<HTMLButtonElement>(null);
	const heroesRefButton = useRef<HTMLButtonElement>(null);

	useEffect(()=>{
		if(tasksRefButton.current && heroesRefButton.current)
			{
			if(tab===0){
				tasksRefButton.current.style.backgroundColor="#613414";
				heroesRefButton.current.style.backgroundColor="#915a33";	
			}else if(tab===1){
				tasksRefButton.current.style.backgroundColor="#915a33";
				heroesRefButton.current.style.backgroundColor="#613414";	
			}
		}
	},[tab])

	const getComponent = () => {
		switch (tab) {
			case 0:
				return (
					<Tasks
						currentTask={currentTask} setCurrentTask={setCurrentTask}
						currentHero={currentHero} setCurrentHero={setCurrentHero}
						partyMembers={partyMembers} setPartyMembers={setPartyMembers}
						selectedZone={selectedZone} selectedActivity={selectedActivity}
            			setSelectedZone={setSelectedZone} setSelectedActivity={setSelectedActivity}>
					</Tasks>
				);
			case 1:
				return (
					<Heroes currentHero={currentHero} setCurrentHero={setCurrentHero}></Heroes>
				);
			default: return null
		};
	}

	return (
		<div id='middle-panel' className='large-panel'>
			<div className="wooden-frame-left"></div>
			<div className="wooden-frame-right"></div>

			<div className="tab-bar">
				<button ref={tasksRefButton} id="tasks-button" className="tab-button" onClick={() => setTab(0)}>TASKS</button>
				<button ref={heroesRefButton} id="heroes-button" className="tab-button" onClick={() => setTab(1)}>HERO INFO</button>
			</div>
			{getComponent()}
		</div>
	);
}

export default MiddlePanel;