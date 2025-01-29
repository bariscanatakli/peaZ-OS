import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bringToFront, minimizeTerminal, setActiveTerminalId } from '../../store/slices';

const TerminalButton = ({ terminal }) => {
  const dispatch = useDispatch();
  const { activeTerminalId, } = useSelector(state => state.terminals);
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const onOpen = () => {
    dispatch(bringToFront(terminal.id));
    dispatch(minimizeTerminal(terminal.id));
    dispatch(setActiveTerminalId(terminal.id));
  }
  const handleContextMenu = (e) => {
    e.preventDefault();
    setMenuPosition({ x: e.clientX, y: e.clientY });
    setShowMenu(true);
  };

  const handleClose = () => {
    onOpen();
    setShowMenu(false);
  };

  const handleInfo = () => {
    alert(`Terminal ID: ${terminal.id}`);
    setShowMenu(false);
  };

  const handleClick = () => {
    onOpen();

  };

  return (
    <div
      onContextMenu={handleContextMenu}
      onClick={handleClick}
      style={{ position: 'relative' }}
    >
      <button className={`taskbar-button ${activeTerminalId === terminal.id ? 'active' : ''}`}>
        <span role="img" aria-label="terminal">
          💻
        </span>
      </button>
      {showMenu && (
        <ul
          className="context-menu"
          style={{ top: menuPosition.y - 50, left: menuPosition.x, position: 'absolute' }}
          onMouseLeave={() => setShowMenu(false)}
        >
          <li onClick={handleInfo}>Information</li>
          <li onClick={handleClose}>Close</li>
        </ul>
      )}
    </div>
  );
};

export default TerminalButton;