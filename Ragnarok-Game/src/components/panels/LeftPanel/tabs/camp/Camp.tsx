import { useState } from "react";
import { useGameStateContext } from "../../../../../contexts/GameStateContext";
import "./Camp.css";
import camp_frame from "../../../../../assets/images/maps/camp_frame.png";
import camp_overview from "../../../../../assets/images/maps/camp_overview.png";
import CircularBuilding from "./buildings/CircularBuilding";
import SquareBuilding from "./buildings/SquareBuilding";
import { Building } from "../../../../GameState";
import InfoBox from "./InfoBox";

/*
interface CampBuilding {
  name: string,
}
*/

function Camp() {
  const context = useGameStateContext();
  const buildings = context.gameState.camp.buildings;
  const [selectedBuilding, setSelectedBuilding] = useState<Building>(buildings[0]);

  function handleBuildingClick(value: number): void {
    setSelectedBuilding(buildings[value]);
  }

  return (
    <div id="camp-container" className="camp-container">
      <div id="camp-map" className="camp-map">
        <img id="camp-image" className="camp-image"
        src={camp_overview}
        alt="Camp Image"
        draggable="false"
        />
        <img id="camp-frame" className="camp-image"
        src={camp_frame}
        alt="Camp Frame"
        draggable="false"
        />
        <div style={{width: "400px", height: "400px", position: "absolute", top: "8px"}}>
          <svg width="400" height="400" viewBox="0 0 400 400">
            <g id="camp-buildings"
              style={{display: "inline"}}>
              <SquareBuilding id={0} /* Boathouse */
                boxPath={`M ${95}, ${289}`}
                iconPath={`m ${124}, ${300}`}
                handleBuildingClick={handleBuildingClick}
              />
              <SquareBuilding id={1} /* Fishing harbour */
                boxPath={`M ${247}, ${289}`}
                iconPath={`m ${276}, ${300}`}
                handleBuildingClick={handleBuildingClick}
              />
              <SquareBuilding id={2} /* Tent */
                boxPath={`M ${57}, ${213}`}
                iconPath={`m ${86}, ${224}`}
                handleBuildingClick={handleBuildingClick}
              />
              <SquareBuilding id={3} /* Smithy */
                boxPath={`M ${133}, ${213}`}
                iconPath={`m ${162}, ${224}`}
                handleBuildingClick={handleBuildingClick}
              />
              <SquareBuilding id={4} /* Bakery */
                boxPath={`M ${209}, ${213}`}
                iconPath={`m ${238}, ${224}`}
                handleBuildingClick={handleBuildingClick}
              />
              <SquareBuilding id={5} /* Brewery */
                boxPath={`M ${285}, ${213}`}
                iconPath={`m ${314}, ${224}`}
                handleBuildingClick={handleBuildingClick}
              />
              <SquareBuilding id={6} /* Tannery */
                boxPath={`M ${57}, ${137}`}
                iconPath={`m ${86}, ${148}`}
                handleBuildingClick={handleBuildingClick}
              />
              <SquareBuilding id={7} /* Inn */
                boxPath={`M ${133}, ${137}`}
                iconPath={`m ${162}, ${148}`}
                handleBuildingClick={handleBuildingClick}
              />
              <SquareBuilding id={8} /* Stable */
                boxPath={`M ${209}, ${137}`}
                iconPath={`m ${238}, ${148}`}
                handleBuildingClick={handleBuildingClick}
              />
              <SquareBuilding id={9} /* Building 10 */
                boxPath={`M ${285}, ${137}`}
                iconPath={`m ${314}, ${148}`}
                handleBuildingClick={handleBuildingClick}
              />
              <SquareBuilding id={10} /* Building 11 */
                boxPath={`M ${133}, ${61}`}
                iconPath={`m ${162}, ${72}`}
                handleBuildingClick={handleBuildingClick}
              />
              <SquareBuilding id={11} /* Building 12 */
                boxPath={`M ${209}, ${61}`}
                iconPath={`m ${238}, ${72}`}
                handleBuildingClick={handleBuildingClick}
              />
              <CircularBuilding id={12} /* Building 13 */
                diamondPath={`m ${69}, ${31.988}`}
                circlePosition={{x: `${69}`, y: `${73}`}}
                iconPath={`m ${69}, ${55}`}
                handleBuildingClick={handleBuildingClick}
              />
              <CircularBuilding id={13} /* Building 14 */
                diamondPath={`m ${331}, ${31.988}`}
                circlePosition={{x: `${331}`, y: `${73}`}}
                iconPath={`m ${331}, ${55}`}
                handleBuildingClick={handleBuildingClick}
              />
            </g>
          </svg>
        </div>
      </div>
      <InfoBox selectedBuilding={selectedBuilding} setSelectedBuilding={setSelectedBuilding}/>
    </div>
  )
}

export default Camp;