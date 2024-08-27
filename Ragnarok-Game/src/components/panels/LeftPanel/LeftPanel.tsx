import { useEffect, useRef, useState } from 'react';
import '../panels.css';
import './LeftPanel.css';
import Map from './tabs/map/Map';
import Storage from "./tabs/storage/storage";
import Camp from './tabs/camp/Camp';
import { Task } from '../../../classes/task/task';
import { Zone } from '../../interfaces/Zone';
import { Activity } from '../../../classes/task/interfaces/Activity';

export interface LeftPanelProps {
	currentTask: Task | undefined,
	setCurrentTask: (newTask: Task | undefined) => void,
	  selectedZone:Zone|undefined,
	  setSelectedZone: (setSelectedZone: Zone | undefined) => void,
	  selectedActivity: Activity |undefined,
	  setSelectedActivity: (setSelectedActivity: Activity | undefined) => void,
  }

function LeftPanel({
	currentTask,
	setCurrentTask,
  selectedZone,
  setSelectedZone,
  selectedActivity,
  setSelectedActivity
}: LeftPanelProps) {
	const [tab, setTab] = useState(0);
	const mapRefButton = useRef<HTMLButtonElement>(null);
	const campRefButton = useRef<HTMLButtonElement>(null);
	const storageRefButton = useRef<HTMLButtonElement>(null);

	useEffect(()=>{
		if(mapRefButton.current && campRefButton.current && storageRefButton.current)
			{
			if(tab===0){
				mapRefButton.current.style.backgroundColor="#613414";
				campRefButton.current.style.backgroundColor="#915a33";
				storageRefButton.current.style.backgroundColor="#915a33";

			}else if(tab===1){
				mapRefButton.current.style.backgroundColor="#915a33";
				campRefButton.current.style.backgroundColor="#613414";
				storageRefButton.current.style.backgroundColor="#915a33";	
			}else if(tab===2){
				mapRefButton.current.style.backgroundColor="#915a33";
				campRefButton.current.style.backgroundColor="#915a33";
				storageRefButton.current.style.backgroundColor="#613414";	
			}
		}
	},[tab])
	const getComponent = () => {
		switch (tab) {
			case 0:
				return (
					<Map currentTask={currentTask} setCurrentTask={setCurrentTask}
					selectedZone={selectedZone} selectedActivity={selectedActivity}
					setSelectedZone={setSelectedZone} setSelectedActivity={setSelectedActivity}/>
				);
			case 1:
				return (
					<Camp />
				);
			case 2:
				return (
					<Storage />
				);
			default: return null
		}
	}



	return (
		<div id='left-panel' className='large-panel'>
			<div className="wooden-frame-left"></div>
			<div className="wooden-frame-right"></div>
			<div className="tab-bar">
				<button ref={mapRefButton} id="map-button" className="tab-button" onClick={() => setTab(0)}>MAP</button>
				<button ref={campRefButton} id="camp-button" className="tab-button" onClick={() => setTab(1)}>CAMP</button>
				<button ref={storageRefButton} id="storage-button" className="tab-button" onClick={() => setTab(2)}>STORAGE</button>
			</div>
			{getComponent()}
		</div>
	);
}

export default LeftPanel;