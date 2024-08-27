// Panels.tsx
import React from 'react';
import './panels.css';

interface PanelProps {
  id: 'left-panel' | 'middle-panel' | 'right-panel';
  className: 'large-panel' | 'small-panel';
}

const Panel: React.FC<PanelProps> = ({ id, className }) => {
  if (!['large-panel', 'small-panel'].includes(className)) {
    throw new Error(`Invalid className: ${className}. Expected 'large-panel' or 'small-panel'.`);
  }

  return (
    <div id={id} className={className}>
      <div className="wooden-frame-left"></div>
      <div className="wooden-frame-right"></div>
    </div>
  );
};

export default Panel;
