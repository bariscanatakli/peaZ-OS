import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Terminal from '../components/Terminal';
import TerminalButton from '../components/Homepage/TerminalButton';
import StartButton from '../components/Homepage/StartButton';
import {
  addTerminal,
  removeTerminal,
  bringToFront,
  minimizeTerminal,
  setPath,
  setActiveTerminalId,
} from '../store/slices';

const Home = () => {
  const dispatch = useDispatch();
  const {
    terminals,
    currentZIndex,
    positionOffset,
    activeTerminalId,
    path,
  } = useSelector(state => state.terminals);

  const handleAddTerminal = () => {
    // Generate timestamp ID
    const id = Date.now();
    // Generate unique key using timestamp + random string
    const key = `terminal-${id}-${Math.random().toString(36).substr(2, 9)}`;
    dispatch(addTerminal({ id, key }));
  };

  

  return (
    <div className="home-container">
      <h1>Welcome to My Portfolio</h1>
      <p>Interact with the terminal below to navigate through my projects.</p>

      {terminals.map((terminal) => (
        <Terminal
          key={terminal.key || terminal.id}
          id={terminal.id}
          onClose={() => dispatch(removeTerminal(terminal.id))}
          zIndex={terminal.zIndex}
          bringToFront={() => dispatch(bringToFront(terminal.id))}
          toggleMinimize={() => {
            dispatch(minimizeTerminal(terminal.id));
            dispatch(setActiveTerminalId(terminal.isMinimized ? terminal.id : null));
          }}
          initialPosition={terminal.position}
          input={terminal.input}
          output={terminal.output}
          isMinimized={terminal.isMinimized}
          userRole={terminal.role}
          content={terminal.content}
          initialPath={terminal.initialPath}
        />
      ))}

      <div className="taskbar">
        <StartButton
          setPath={(p) => dispatch(setPath(p))}
          onAddTerminal={handleAddTerminal}
        />
        {terminals.map((terminal) => (
          <TerminalButton
            key={terminal.id}
            terminal={terminal}
            onOpen={() => {
              dispatch(bringToFront(terminal.id));
              dispatch(minimizeTerminal(terminal.id));
              dispatch(setActiveTerminalId(terminal.id));
            }}
            isActive={activeTerminalId === terminal.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;