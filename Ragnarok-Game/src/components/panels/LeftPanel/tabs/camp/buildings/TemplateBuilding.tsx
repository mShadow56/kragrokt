import { useGameStateContext } from "../../../../../../contexts/GameStateContext";
import { Building } from "../../../../../GameState";


class TemplateBuilding {
  id: number = 0;
  handleBuildingClick: (value: number) => void;
  constructor(id: number, handleBuildingClick: (value: number) => void) {
    this.id = id;
    this.handleBuildingClick = handleBuildingClick;
  }
  context = useGameStateContext();
  name: string = this.context.gameState.camp.buildings[this.id].name;

  buildingIsBuilt = (): boolean => {
    const building: Building | undefined = this.context.gameState.camp.buildings.find(building => building.name === this.name);
    if (building && building.level > 0) {
      return true;
    } else {
      return false;
    }
  }
}

export default TemplateBuilding;