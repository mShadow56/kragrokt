import SelectOption from "./SelectOption";
import '../SelectElement.css';
import { v4 as uuidv4 } from 'uuid';

function SelectDropdown({ options, onValueChange }: { options: string[], onValueChange: (newValue: string) => void }) {

  const heightStyle = `${options.length * 24 + 4}px`;

	return (
		<div className="select-dropdown" style={{height: heightStyle}}>
      {options.map((option, index) => (
        <SelectOption key={uuidv4()} option={option} i={index} onValueChange={onValueChange}></SelectOption>
      ))}
    </div>
	);
}

export default SelectDropdown;
