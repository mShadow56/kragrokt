export interface Options {
    resolution:string,
    language:string,
    volume:number,
  }


  export let options: Options = {
    resolution:"HD",
    language:"English",
    volume: 5
  }


  export const getVolume = ():number => {
    return options.volume;
  }

  export const saveVolume = (num : number) :void => {
    options.volume=num;
  }
  
 
  
  // Function to save the options to local storage
  export function saveOptions(): void {
    localStorage.setItem('gameOptions', JSON.stringify(options));
  }

  export function loadOptions ():void {
    const savedState = localStorage.getItem("gameOptions");
    if (savedState) {
      options = JSON.parse(savedState);
    }
  }

 