
import './arrow.css';

interface Props {
  onClick: () => void; 
}

const Left_arrow:React.FC<Props>= ({ onClick }) =>  {
  const handleClick = () => {
    onClick();
  };
  return (
    <svg 
    className='leftArrow'
    onClick={handleClick}
    xmlns="http://www.w3.org/2000/svg"
    width="108.25319"
    height="125"
    viewBox="0 0 28.641991 33.072918"
    version="1.1"
    id="svg8"
    inkscape:export-filename="..\images\maps\Udgaard.png"
    inkscape:export-xdpi="96.000008"
    inkscape:export-ydpi="96.000008"><g
      id="layer7"
      transform="translate(-103.64968,-33.072918)"><path 
        d="m 132.29167,33.072918 -28.64199,16.536459 28.64199,16.536459 z"
        id="path107-2" /></g></svg>
   
  )
}

export default Left_arrow;