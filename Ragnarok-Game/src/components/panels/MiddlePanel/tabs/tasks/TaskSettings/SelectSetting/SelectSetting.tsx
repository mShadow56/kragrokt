import SelectElement from './SelectElement/SelectElement';
import selectBackgroundImage from '../../../../../../../assets/images/frames/select-background.png';
import selectFrameImage from '../../../../../../../assets/images/frames/select-frame.png';
import { Task } from '../../../../../../../classes/task/task';
import { Zone } from '../../../../../../interfaces/Zone';
function SelectSetting({
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
  

  const idCapitalised: string = id.charAt(0).toUpperCase() + id.slice(1);

  return (
    <div id={`${id}-setting`} className="select-setting">
      <div className="select-label">{idCapitalised}:</div>
      <div className="select-box">
        <img className="select-box-background"
          src={selectBackgroundImage}
          alt={`${idCapitalised} Background img`}
          draggable="false"/>
        <img className="select-box-frame"
          src={selectFrameImage}
          alt={`${idCapitalised} Frame img`}
          draggable="false"/>
        <SelectElement
          currentTask={currentTask}
          selectedZone={selectedZone}
          id={id}
          options={options}
          value={value}
          onValueChange={onValueChange}/>
      </div>
    </div>
  );
}

export default SelectSetting;