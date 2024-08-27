import { Dispatch, SetStateAction } from "react";
import { Hero } from "../../classes/hero/hero";
import DraggableHeroPortrait from "./subcomponents/DraggableHeroPortrait";
import { Position } from "../Game";
import { Task } from "../../classes/task/task";

export interface DraggablesProps {
  currentHero: Hero | undefined,
  currentTask: Task | undefined,
	partyMembers: Hero[],
	setPartyMembers: (newParty: Hero[]) => void,
  cursorPosition: Position,
  setCursorPosition: Dispatch<React.SetStateAction<Position>>,
  isDraggingHero: boolean,
  setIsDraggingHero: Dispatch<SetStateAction<boolean>>
}

function Draggables({
  currentHero,
	currentTask,
  partyMembers,
  setPartyMembers,
  cursorPosition,
  setCursorPosition,
  isDraggingHero,
  setIsDraggingHero
}: DraggablesProps) {


  function getDraggableHeroPortrait(): JSX.Element {
    if (!currentHero || !isDraggingHero) {
      return (<></>);
    }

    return (
      <DraggableHeroPortrait
      currentHero={currentHero}
      currentTask={currentTask}
      partyMembers={partyMembers} setPartyMembers={setPartyMembers}
      cursorPosition={cursorPosition} setCursorPosition={setCursorPosition}
      isDraggingHero={isDraggingHero} setIsDraggingHero={setIsDraggingHero}
      />
    );
  }

  return (
    <div>
      {getDraggableHeroPortrait()}
    </div>
  );
}

export default Draggables;