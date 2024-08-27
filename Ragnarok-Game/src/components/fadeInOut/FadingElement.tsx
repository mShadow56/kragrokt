// FadingElement.tsx
import { useEffect, useRef } from 'react';
import './FadingElement.css'; // Import the CSS file for the animation


interface Props {
  fadeText: string;
  setCurrentFadeText: (text: string) => void;
  isFading: boolean;
  setIsFading: (newValue: boolean) => void;
  setIsScenarioOpen: (isOpen: boolean) => void;
}

function FadingElement({ fadeText, setCurrentFadeText, isFading, setIsFading, setIsScenarioOpen }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFading) {
      console.log("Is fading IN");
      fadeIn(0);
    } else if (!isFading) {
      console.log("Is fading OUT");
      fadeOut(6000);
    }
  }, [isFading]);

  function fadeIn(time: number): void {
    setTimeout(() => {
      ref.current!.style.opacity = '1';
    }, time); // Change opacity to 1 after 0.5 seconds
    setIsFading(false);
  }

  function fadeOut(time: number): void {
    setTimeout(() => {
      ref.current!.style.opacity = '0';
      setIsScenarioOpen(true);
    }, time); // Change opacity to 0 after 6 seconds
    setTimeout(() => { setCurrentFadeText("empty") }, 6800);
  }

  return (
    <div ref={ref} className="fading-element" >
      <span className='text'>&nbsp;{fadeText}&nbsp;</span>
    </div>
  );
}

export default FadingElement;