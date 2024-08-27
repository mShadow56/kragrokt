import { useState } from 'react';
import "./storage.css";
import { useGameStateContext } from '../../../../../contexts/GameStateContext';

const defaultStorageItem: StorageItem = {
  name: "",
  description: "",
  quantity: 0,
  img_url: "./images/items/resources/unknown.png"
};

export function Storage() {
  const context = useGameStateContext();
  const [selectedItem, setSelectedItem] = useState<StorageItem>(defaultStorageItem);

  const showInventory = () => (
    <div className='item-image'>
      {Array.isArray(context.gameState.storage.resources) && context.gameState.storage.resources.map((item, index) => (
        // Check if the item exists and its quantity is greater than zero
        item && item.quantity > 0 && (
          <div key={index} className="item-wrapper">
            <img className='inventory-item' src={item.img_url} alt="" draggable="false" onClick={() => setSelectedItem(item)} />
            <div className="item-quantity">{item.quantity}</div>
          </div>
        )
      ))}
      {!Array.isArray(context.gameState.storage.resources) && "No items here"}
    </div>
  );

  return (
    <><div id="storage-container" className="StorageContainer">
      <div className="inventory-grid" id="inventory-grid">
        {showInventory()}
      </div>
    </div>
      <div className='item-info'>
        <img className='item-info-image' src={selectedItem?.img_url} />
        <div className='item-info-text'><h1>{selectedItem?.name}</h1>
          <h3>{selectedItem?.description}</h3></div>
      </div>
    </>
  );
}

export default Storage;