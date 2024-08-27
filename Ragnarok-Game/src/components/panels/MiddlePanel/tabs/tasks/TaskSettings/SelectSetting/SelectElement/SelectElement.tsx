import { useEffect, useRef, useState } from 'react'; // Import useState
import SelectDropdown from "./subcomponents/SelectDropdown";
import './SelectElement.css';
import { Task } from '../../../../../../../../classes/task/task';
import { Zone } from '../../../../../../../interfaces/Zone';
function SelectElement({
	currentTask,
	id,
	options,
	value,
	onValueChange,
	selectedZone,
}: {
	currentTask: Task | undefined,
	id: string,
	options: string[] | undefined,
	value: string | undefined,
	onValueChange: (value: string) => void,
	selectedZone: Zone | undefined,
}) {
	const [dropdownVisible, setDropdownVisible] = useState(false);
	const [desinationChosen, setDestinationChosen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	function handleSelectClick() {
		if (!options) {
			return;
		}
		setDropdownVisible(!dropdownVisible);
	}

	// Function to check if the click was outside the dropdown
	const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current &&!dropdownRef.current.contains(event.target as Node)) {
					setDropdownVisible(false);
			}
	};

	// Add event listener when the component mounts
	useEffect(() => {
			document.addEventListener("mousedown", handleClickOutside);
			return () => {
					// Remove event listener when the component unmounts
					document.removeEventListener("mousedown", handleClickOutside);
			};
	}, []);

	useEffect(()=>{
		if(selectedZone!=undefined){
			setDestinationChosen(true);
		}else{
			setDestinationChosen(false);
		}
	},[selectedZone])

	if (!currentTask) {
		return (
			<div id={id} className="value-selector"></div>
		);
	}

	const unreadyGoalTable = () => { //For at fjerne goal tekst, når destination'en ikke er valgt i Tasks
		if(!desinationChosen && id==='goal' ) {
			return '';
		}
		return value || `Select a ${id}...`;
		
	}
	
	return (
		<div ref={dropdownRef} id={id} className="value-selector" onClick={handleSelectClick}>
			{/* Directly invoke unreadyGoalTable */}
			<div id={`selected-${id}`} className='selected-value'>{unreadyGoalTable()}</div>
			{options && dropdownVisible && <SelectDropdown options={options} onValueChange={onValueChange}></SelectDropdown>}
		</div>
	);
};

export default SelectElement;
