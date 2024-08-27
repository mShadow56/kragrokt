

function MenuButton() {

  function returnToMainMenu() {
    console.log('Returning to Main Menu!');
  }

  return (
    <button id="menu-button" className="tab-button" onClick={() => returnToMainMenu()}>MENU</button>
  );
}

export default MenuButton;