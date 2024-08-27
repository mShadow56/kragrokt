import "./Map.css";
import udgard from "../../../../../assets/images/maps/Udgaard.png";
import mapFrame from "../../../../../assets/images/maps/map-frame.png";
import { useState } from "react";
import { useGameStateContext } from "../../../../../contexts/GameStateContext";
import { Zone } from "../../../../interfaces/Zone";
import { ZoneElement } from "./zones/ZoneElement";
import { LeftPanelProps } from "../../LeftPanel";
import { Activity } from "../../../../../classes/task/interfaces/Activity";
import { Task } from "../../../../../classes/task/task";
import { addTask } from "../../../../GameState";

export default function Map({
	currentTask,
	setCurrentTask,
  selectedZone,
  setSelectedZone,
  selectedActivity,
  setSelectedActivity
}: LeftPanelProps) {
  const context = useGameStateContext();
  const [selectedArea, setSelectedArea] = useState<Zone>(
    context.gameState.world.zones[0]
  );

  const selectRelevantTask = (activity:Activity) => {
    const newTask = new Task;
    addTask(newTask);
    setCurrentTask(newTask);
    setSelectedZone(selectedArea);
    setSelectedActivity(activity);
  }

  const getZoneInfo = () => {
    return (
      <div className="map-location-field">
        <div className="map-location-title">
          {selectedArea.name} area
        </div>
        <div className="map-location-explored">{selectedArea.explored}% explored</div>
        <div className="map-content-container">
          <div className="map-content-title">Possible tasks available</div>
          <div className="map-location-content">
            {Array.isArray(selectedArea.activities) &&
              selectedArea.activities.map((item, index) => (
                <div className="available-task-box" onClick={()=>selectRelevantTask(item)}>
                  <h3 key={index}>{item.name}</h3>
                </div>
              ))}
            </div>
          </div>
      </div>
    );
  };

  return (
    <div id="map-container" className="map-container">
      <div id="map-box" className="map-box">
        <img id="map-image" src={udgard} alt="Map Image"></img>
        <img id="map-frame" src={mapFrame} alt="Map Frame Image"></img>
        <div id="map" className="map-zones">
          <svg width="400" height="400" viewBox="0 0 105.83333 105.83333">
            <ZoneElement id={0} setSelectedArea={setSelectedArea}></ZoneElement>
            <ZoneElement id={1} setSelectedArea={setSelectedArea}></ZoneElement>
            <ZoneElement id={2} setSelectedArea={setSelectedArea}></ZoneElement>
            <ZoneElement id={3} setSelectedArea={setSelectedArea}></ZoneElement>
            <ZoneElement id={4} setSelectedArea={setSelectedArea}></ZoneElement>
            <ZoneElement id={5} setSelectedArea={setSelectedArea}></ZoneElement>
            <ZoneElement id={6} setSelectedArea={setSelectedArea}></ZoneElement>
          </svg>
        </div>
      </div>
      {getZoneInfo()}
    </div>
  );
}
