
import React from 'react';

const StartButton = ({ onClick }) => {
  return (
    <button className="taskbar-button" onClick={onClick}>
      <span role="img" aria-label="start">🖥️</span>
    </button>
  );
};

export default StartButton;