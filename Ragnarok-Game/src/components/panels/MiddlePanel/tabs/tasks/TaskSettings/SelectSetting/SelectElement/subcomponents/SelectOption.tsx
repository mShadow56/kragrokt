import { useState } from 'react';
import '../SelectElement.css';

function SelectOption({ option, i, onValueChange }: { option: string, i: number, onValueChange: (newValue: string) => void }) {
  const [backgroundColor, setBackgroundColor] = useState<'white' | 'lightgrey'>('white');

  // Function to handle mouse enter event
  const handleMouseEnter = () => {
    setBackgroundColor('lightgrey');
  };

  // Function to handle mouse leave event
  const handleMouseLeave = () => {
    setBackgroundColor('white');
  };

  const topStyle = `${i * 24}px`;

  var valueAttribute = option.replace(/\s+/g, '_').toLowerCase();

	return (
    <div className="select-dropdown-option" 
      style={{top: topStyle, backgroundColor}} 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
      data-value={valueAttribute}
      onClick={() => onValueChange(option)}>
      {option}
    </div>
	);
};

export default SelectOption;
