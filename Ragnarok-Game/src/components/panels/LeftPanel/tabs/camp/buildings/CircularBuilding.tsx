import { useGameStateContext } from "../../../../../../contexts/GameStateContext";
import { Building } from "../../../../../GameState";


function CircularBuilding({
  id,
  diamondPath,
  circlePosition,
  iconPath,
  handleBuildingClick
}: {
  id: number,
  diamondPath: string,
  circlePosition: {x: string, y: string},
  iconPath: string,
  handleBuildingClick: (value: number) => void
}) {
  const context = useGameStateContext();
  const name: string = context.gameState.camp.buildings[id].name;
  const sqrD: number = Math.sqrt(2 * Math.pow(58, 2)); // Diagonal of square (diamond)
  const radius: number = 36;

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

  const fillStyle = (): string => {
    if (buildingIsBuilt()) {
      return "#8c5a3c";
    } else {
      return "#698750";
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
    const gap: number = (2 * Math.PI * radius) / 8 - 20;
    if (buildingIsBuilt()) {
      return "none";
    } else {
      return `${20}, ${gap}`;
    }
  }

  const diamondShape = (): JSX.Element => {
    if (buildingIsBuilt()) {
      return (
        <path id={`${elementId()}-diamond`} className="building-diamond"
          d={`${diamondPath} ${-sqrD/2}, ${sqrD/2} ${sqrD/2}, ${sqrD/2} ${sqrD/2}, ${-sqrD/2} z`} />
      );
    } else {
      return (<></>);
    }
  }

  return (
    <g id={`${elementId()}-slot`} className="building-slot"
      onClick={() => handleBuildingClick(id)}>
      {diamondShape()}
      <circle id={`${elementId()}-circle`} className="building-circle"
        style={
          {
            fill: fillStyle(),
            fillOpacity: fillOpacityStyle(),
            strokeDasharray: strokeDasharrayStyle(),
          }
        }
        cx={circlePosition.x}
        cy={circlePosition.y}
        r={`${radius}`} />
      <path id={`${elementId()}-icon`} className="building-icon"
        d={`${iconPath} v ${36} m ${-18}, ${-18} h ${36}`} />
    </g>
  );
}

export default CircularBuilding;