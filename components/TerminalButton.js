import React, { useState } from 'react';

const TerminalButton = ({ terminal, onOpen, isActive }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const handleContextMenu = (e) => {
    e.preventDefault();
    setMenuPosition({ x: e.clientX, y: e.clientY });
    setShowMenu(true);
  };

  const handleClose = () => {
    onOpen(terminal.id);
    setShowMenu(false);
  };

  const handleInfo = () => {
    alert(`Terminal ID: ${terminal.id}`);
    setShowMenu(false);
  };

  const handleClick = () => {
    onOpen(terminal.id);
  };

  return (
    <div
      onContextMenu={handleContextMenu}
      onClick={handleClick}
      style={{ position: 'relative', marginRight: '8px' }}
    >
      <button className={`taskbar-button ${isActive ? 'active' : ''}`}>
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