import { useGameStateContext } from "../../../../../../contexts/GameStateContext";
import { Building } from "../../../../../GameState";


function SquareBuilding({
  id,
  boxPath,
  iconPath,
  handleBuildingClick
}: {
  id: number,
  boxPath: string,
  iconPath: string,
  handleBuildingClick: (value: number) => void
}) {
  const context = useGameStateContext();
  const name: string = context.gameState.camp.buildings[id].name;

  const elementId = (): string => {
    return name.replace(" ", "-").toLowerCase();
  }

  const buildingIsBuilt = (): boolean => {
    const building: Building | undefined = context.gameState.camp.buildings.find(building => building.name === name);
    if (building && building.level > 0) {
      return true;
    } else {
      return false;
    }
  }

  const fillOpacityStyle = (): number => {
    if (buildingIsBuilt()) {
      return 1;
    } else {
      return 0;
    }
  }

  const strokeDasharrayStyle = (): string => {
    if (buildingIsBuilt()) {
      return "none";
    } else {
      return `${20}, ${9}`;
    }
  }

  return (
    <g id={`${elementId()}-slot`} className="building-slot"
      onClick={() => handleBuildingClick(id)}>
      <path id={`${elementId()}-box`} className="building-box"
        style={
          {
            fillOpacity: fillOpacityStyle(),
            strokeDasharray: strokeDasharrayStyle(),
          }
        }
        d={`${boxPath} v ${58} h ${58} v ${-58} Z`} />
      <path id={`${elementId()}-icon`} className="building-icon"
        d={`${iconPath} v ${36} m ${-18}, ${-18} h ${36}`} />
    </g>
  );
}

export default SquareBuilding;