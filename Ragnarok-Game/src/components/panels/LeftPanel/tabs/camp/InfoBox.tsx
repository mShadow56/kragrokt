import { Building, getBuildings, getResources, Resource } from "../../../../GameState";


function InfoBox({
  selectedBuilding,
  setSelectedBuilding
}: {
  selectedBuilding: Building,
  setSelectedBuilding: (newBuilding: Building) => void
}) {

  const listOfUpgradeCosts = () => {
    const resources: Resource[] = selectedBuilding.upgradeCost;
    return (
      <div>
        {resources.map((resource, index) => {
          let name: string;
          if (getResources().length < (resource.id + 1)) {
            name = "Unknown";
          } else {
            name = getResources()[resource.id].name;
          }
          return (
            <li key={`${index}-${name}`}>
              {name}: ({getResources()[resource.id].quantity}/{resource.quantity})
            </li>
          );
        })}
      </div>
    );
  }

  function checkResourceAvailability(res: Resource): boolean {
    const storedRes: StorageItem = getResources()[res.id];
    if (storedRes.quantity >= res.quantity) {
      return true;
    }
    return false;
  }

  function upgradeBuilding() {
    const clone: Building = structuredClone(selectedBuilding);
    clone.level ++;
    clone.timeToUpgrade ++;
    getBuildings()[clone.id] = clone;
    getBuildings()[clone.id].upgradeCost.forEach(resource => {
      getResources()[resource.id].quantity -= resource.quantity;
      resource.quantity += 5;
    });
    setSelectedBuilding(clone);
  }

  function handleUpgradeButtonClick(): void {
    const allResourcesAvailable = selectedBuilding.upgradeCost.every(resource => checkResourceAvailability(resource));

    if (allResourcesAvailable) {
      console.log(`${selectedBuilding.level > 0 ? "Upgrading" : "Building"} building!`);
      upgradeBuilding();
    } else {
      console.log('Not enough resources to upgrade.');
    }
  }

  return (
    <div id="building-info-container" className="building-info-container">
      <div className="building-info-title">
        {selectedBuilding.name}
      </div>
      <div className="building-info-details">
        {selectedBuilding.description}
      </div>
      <div>Level: {selectedBuilding.level}</div>
      <div>Time to upgrade: {selectedBuilding.timeToUpgrade} {selectedBuilding.timeToUpgrade > 1 ? "days" : "day"}</div>
      <div>Cost to upgrade:</div>
      {listOfUpgradeCosts()}
      <div id="upgrade-building-button" className="upgrade-building-button"
        onClick={handleUpgradeButtonClick}>
        {selectedBuilding.level > 0 ? "Upgrade" : "Build"}
      </div>
    </div>
  );
}

export default InfoBox;