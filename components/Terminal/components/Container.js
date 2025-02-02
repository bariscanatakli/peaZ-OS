import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bringToFront, setActiveTerminalId } from '../../../store/slices';

function Container({ children, id }) {
  const dispatch = useDispatch();
  const terminalRef = useRef(null);
  const { activeTerminalId } = useSelector(state => state.terminals);
  const terminalState = useSelector(state =>
    state.terminals.terminals.find(t => t.id === id)
  );

  const { zIndex, isMinimized, isDragging, isMaximized, position, dimensions, refs } = terminalState;

  useEffect(() => {
    // Set initial active terminal when mounted
    if (!activeTerminalId && id) {
      dispatch(setActiveTerminalId(id));
    }
  }, []);

  const handleTerminalClick = (e) => {
    if (
      e.target.closest('.window-controls') ||
      e.target.closest('.terminal-header') ||
      terminalState.isDragging
    ) {
      return;
    }

    dispatch(bringToFront(id));
    dispatch(setActiveTerminalId(id));

    const inputElement = terminalState.refs?.input;
    if (inputElement) {
      inputElement.focus();
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