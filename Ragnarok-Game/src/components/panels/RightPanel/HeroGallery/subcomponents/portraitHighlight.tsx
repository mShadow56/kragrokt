import { useEffect, useRef } from "react";


function PortraitHighlight({ portraitElement }: { portraitElement: HTMLElement | undefined }) {
  const highlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (highlightRef.current && portraitElement) {
      const highlightDiv = highlightRef.current;
      highlightDiv.style.position = 'absolute';
      highlightDiv.style.backgroundColor = '#FFFF00';
      highlightDiv.style.width = `${portraitElement.offsetWidth + 4}px`;
      highlightDiv.style.height = `${portraitElement.offsetHeight + 4}px`;
      highlightDiv.style.top = `${portraitElement.offsetTop - 2}px`;
      highlightDiv.style.left = `${portraitElement.offsetLeft - 2}px`;
      highlightDiv.style.borderRadius = '2px';
    }
  }, [portraitElement]);

  if (!portraitElement) {
    return (
      <></>
    )
  } else {
    return (
      <div ref={highlightRef} id='portrait-highlight'></div>
    );
  }
}

export default PortraitHighlight;
