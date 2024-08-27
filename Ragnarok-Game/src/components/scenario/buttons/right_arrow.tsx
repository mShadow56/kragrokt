import React from 'react';
import './arrow.css';

// Define an interface for the props
interface RightArrowProps {
  onClick: () => void; // Function that takes no arguments and returns void
}

const Right_arrow: React.FC<RightArrowProps> = ({ onClick }) => {
  const handleClick = () => {
    onClick(); // Call the passed onClick function
  };

  return (
    <svg
        className='rightArrow'
        onClick={handleClick}
      xmlns="http://www.w3.org/2000/svg"
      width="108.25319"
      height="125"
      viewBox="0 0 28.641991 33.072918"
      version="1.1"
      id="svg8"
      inkscape:export-filename="..\images\maps\Udgaard.png"
      inkscape:export-xdpi="96.000008"
      inkscape:export-ydpi="96.000008">
      <g
        id="layer7"
        transform="translate(-132.29167,-33.072918)">
        <path  
          d="m 132.29167,33.072918 28.64199,16.536459 -28.64199,16.536459 z"
          id="path107" />
      </g>
    </svg>
  );
};

export default Right_arrow;