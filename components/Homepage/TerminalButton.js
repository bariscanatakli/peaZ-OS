import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  bringToFront,
  minimizeTerminal,
  setActiveTerminalId,
  setMaximized,
  removeTerminal,
  updateTerminal
} from '@/store/slices';
import ReactDOM from 'react-dom';
import TerminalInfo from './TerminalInfo';

const TerminalButton = ({ terminal }) => {
  const dispatch = useDispatch();
  const { activeTerminalId } = useSelector(state => state.terminals);
  const containerRef = useRef(null);
  const modalRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  
  // Editable terminal fields state
  const [editedContent, setEditedContent] = useState(terminal.content || '');
  const [editedIsMaximized, setEditedIsMaximized] = useState(!!terminal.isMaximized);
  const [editedPositionX, setEditedPositionX] = useState(terminal.position?.x || 0);
  const [editedPositionY, setEditedPositionY] = useState(terminal.position?.y || 0);
  const [editedWidth, setEditedWidth] = useState(terminal.dimensions?.width || 600);
  const [editedHeight, setEditedHeight] = useState(terminal.dimensions?.height || 400);
  
  const menuTimeoutRef = useRef(null);
  const isActive = activeTerminalId === terminal.id;

  const handleMouseEnter = () => {
    if (isActive) {
      if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
      setShowMenu(true);
    }
  };

  const handleMouseLeave = () => {
    if (isActive) {
      menuTimeoutRef.current = setTimeout(() => setShowMenu(false), 300);
    }
  };

  const handleClick = (e) => {
    e.stopPropagation();
    dispatch(setActiveTerminalId(terminal.id));
    dispatch(bringToFront(terminal.id));
  };

  const handleClickOutside = useCallback((e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowInfo(false);
    }
  }, []);

  useEffect(() => {
    if (showInfo) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showInfo, handleClickOutside]);

  const handleSaveEdit = () => {
    dispatch(updateTerminal({
      terminalId: terminal.id,
      updates: {
        content: editedContent,
        isMaximized: editedIsMaximized,
        position: { x: editedPositionX, y: editedPositionY },
        dimensions: { width: editedWidth, height: editedHeight }
      }
    }));
    setShowInfo(false);
  };

  return (
    <div 
      ref={containerRef}
      className="terminal-button-container" 
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <button className={`taskbar-button ${isActive ? 'active' : ''}`}>
        <span role="img" aria-label="terminal">💻</span>
      </button>
      {showMenu && isActive && (
        <ul
          className="context-menu"
          style={{
            position: 'absolute',
            bottom: '32px',
            left: '-8px',
            zIndex: 1001,
          }}
          onMouseEnter={() => {
            if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
          }}
          onMouseLeave={handleMouseLeave}
        >
          <li onClick={(e) => { e.stopPropagation(); setShowInfo(true); setShowMenu(false); }}>Edit Terminal</li>
          <li onClick={(e) => { e.stopPropagation(); dispatch(setMaximized({ terminalId: terminal.id, isMaximized: !terminal.isMaximized })); setShowMenu(false); }}>
            {terminal.isMaximized ? 'Restore' : 'Maximize'}
          </li>
          <li onClick={(e) => { e.stopPropagation(); dispatch(minimizeTerminal(terminal.id)); setShowMenu(false); }}>Minimize</li>
          <li onClick={(e) => { e.stopPropagation(); dispatch(removeTerminal(terminal.id)); setShowMenu(false); }}>Close</li>
        </ul>
      )}

      {/* Render TerminalInfo modal via React Portal */}
      {showInfo && ReactDOM.createPortal(
        <div ref={modalRef}>
          <TerminalInfo id={terminal.id} onClose={() => setShowInfo(false)} />
        </div>,
        document.body
      )}
    </div>
  );
};

export default TerminalButton;