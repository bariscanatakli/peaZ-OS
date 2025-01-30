import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bringToFront } from '../../../store/slices';

function Container({ children, id }) {
  const dispatch = useDispatch();
  const terminalRef = useRef(null);
  
  const terminalState = useSelector(state => 
    state.terminals.terminals.find(t => t.id === id)
  );
  
  const { zIndex, isMinimized, isDragging, isMaximized, position, dimensions } = terminalState;

  const handleTerminalClick = (e) => {
    dispatch(bringToFront(id));
    
    if (!e.target.closest('.window-controls') && !isDragging) {
      terminalState.refs?.input?.current?.focus();
    }
  };

  return (
    <div
      ref={terminalRef}
      className={`terminal-container ${isMinimized ? 'minimized' : ''} ${isMaximized ? 'maximized' : ''}`}
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
        zIndex: zIndex,
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`
      }}
      onClick={handleTerminalClick}
    >
      {children}
    </div>
  );
}

export default Container;