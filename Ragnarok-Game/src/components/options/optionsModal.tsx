import { saveGameState } from "../GameState";
import { saveOptions } from "../Options";
import "./options.css";
import speakerOn from '../../assets/images/speakerOn.png';
import speakerOff from '../../assets/images/speakerOff.png';


interface Props {
    isOptionsOpen:boolean;
    setIsOptionsOpen: (isOptionsModal:boolean) => void;
    setScene: (scene: number) => void;
    volume:number;
    setVolume: (volume:number) => void;
    scene:number;
    setIsMusic: (setIsMusic:boolean) => void;
    isMusic:boolean;


  }

export function OptionModal({ isOptionsOpen, setIsOptionsOpen, setScene, volume, setVolume, scene,setIsMusic, isMusic}: Props) {
  // State to track the volume
  // Reference to the audio element
   
  const toggleMusic = () => {
    if (isMusic) {
      setIsMusic(false);
    } else {
      setIsMusic(true);
    }
};
  // Handle volume change
  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(event.target.value);
    setVolume(newVolume);
  };

  const optionsBackgroundClick = () => {
    setIsOptionsOpen(false);
    saveOptions();
  }

  const backToMenu = () => {
    setScene(0);
    setIsOptionsOpen(false);
    saveOptions();
  }

        if(isOptionsOpen){

            return(<div className="optionsModal">
                <div className="optionsBackground" onClick={optionsBackgroundClick}></div>
                <div className="modalFrame">
                    <div className="modalContent">
                    {scene != 0 ? (
                          <button className="saveButton" onClick={saveGameState}>SAVE GAME</button>
                      ) : null}
                          <div className="sliderFrame">
                            <h4>Volume</h4>
                            <div className="volumeContents">
                            <img id="speaker-icon" className="speakerIconInOptions" src={isMusic? speakerOn : speakerOff} alt="Toggle Music" onClick={toggleMusic} draggable="false" />  
                            <input className="volumeSlider"
                                type="range"
                                min="0"
                                max="10"
                                value={volume}
                                onChange={handleVolumeChange}
                           />
                           </div>
                           </div>
                           <button className="returnToMenuButton" onClick={backToMenu}>RETURN TO MENU</button>
                    </div>
                </div>
                </div>)
            
        }
     
}