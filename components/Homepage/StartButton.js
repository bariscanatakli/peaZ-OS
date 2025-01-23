import React, { useState, useRef, useEffect } from 'react';
import StartMenu from './StartMenu';

const StartButton = ({ onAddTerminal }) => {
  const [showMenu, setShowMenu] = useState(false);
  const startButtonRef = useRef(null);
  const menuRef = useRef(null);

  const handleClick = () => {
    setShowMenu((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      startButtonRef.current &&
      !startButtonRef.current.contains(event.target)
    ) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    if (showMenu) {
      window.addEventListener('click', handleClickOutside);
    } else {
      window.removeEventListener('click', handleClickOutside);
    }

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [showMenu]);

  const handleAddTerminal = () => {
    onAddTerminal();
    setShowMenu(false);
  };

  return (
    <div className="start-button-container">
      <button className="start-button" onClick={handleClick} ref={startButtonRef}>
        <span role="img" aria-label="start">
          🖥️
        </span>
      </button>
      {showMenu && <StartMenu ref={menuRef} onAddTerminal={handleAddTerminal} onClose={() => setShowMenu(false)} />}
    </div>
  );
};

export default StartButton;