import React, { useState, useRef, useEffect } from 'react';
import StartMenu from './StartMenu';
import { useDispatch } from 'react-redux';
import { addTerminal, setPath } from '../../store/slices';

const StartButton = () => {
  const [showMenu, setShowMenu] = useState(false);
  const startButtonRef = useRef(null);
  const menuRef = useRef(null);
  const dispatch = useDispatch();

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

  const handleMenuClick = (selectedPath) => {
    dispatch(setPath(selectedPath))
    const id = Date.now();
    // Generate unique key using timestamp + random string
    const key = `terminal-${id}-${Math.random().toString(36).substr(2, 9)}`;
    dispatch(addTerminal({ id, key }));
    setShowMenu(false);
  };
  return (
    <div className="start-button-container">
      <button
        className="start-button"
        onClick={handleClick}
        ref={startButtonRef}>
        <span role="img" aria-label="start">🖥️</span>
      </button>
      {
        showMenu &&
        <StartMenu
          ref={menuRef}
          setShowMenu={setShowMenu}
          onClose={() => setShowMenu(false)} />}
    </div>
  );
};

export default StartButton;