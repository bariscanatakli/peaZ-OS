import React, { useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bringToFront, setActiveTerminalId, setDimensions } from '../../../store/slices';
import debounce from 'lodash/debounce';

function Container({ children, id }) {
  const dispatch = useDispatch();
  const terminalRef = useRef(null);
  const prevDimensionsRef = useRef(null);

  const terminalState = useSelector(state =>
    state.terminals.terminals.find(t => t.id === id)
  );

  const { zIndex, isMinimized, isMaximized, position, dimensions, activeTerminalId } = terminalState;

  // Debounced dimension update
  const updateDimensions = useCallback(
    debounce((width, height) => {
      const prevDims = prevDimensionsRef.current;
      if (!prevDims || prevDims.width !== width || prevDims.height !== height) {
        dispatch(setDimensions({
          terminalId: id,
          dimensions: { width, height }
        }));
        prevDimensionsRef.current = { width, height };
      }
    }, 100),
    [dispatch, id]
  );

  useEffect(() => {
    if (!terminalRef.current) return;

    const resizeObserver = new ResizeObserver(entries => {
      const entry = entries[0]; 
      if (entry) {
        const { width, height } = entry.contentRect;
        updateDimensions(width, height);
      }
    });

    resizeObserver.observe(terminalRef.current);
    
    return () => {
      resizeObserver.disconnect();
      updateDimensions.cancel();
    };
  }, [updateDimensions]);

  const handleFocus = () => {
    dispatch(bringToFront(id));
    dispatch(setActiveTerminalId(id));
  };

  return (
    <div
    ref={terminalRef}
    tabIndex={-1}
    className={`terminal-container ${isMinimized ? 'minimized' : ''} 
               ${isMaximized ? 'maximized' : ''} 
               ${activeTerminalId === id ? 'active' : ''}`}
    style={{
      top: `${position.y}px`,
      left: `${position.x}px`,
      zIndex,
      width: `${dimensions.width}px`,
      height: `${dimensions.height}px`,
      outline: 'none'
    }}
    onFocus={handleFocus}
    onClick={handleFocus}
  >
    {children}
  </div>
  );
}

export default Container;