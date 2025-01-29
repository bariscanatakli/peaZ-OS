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
  const { terminals, } = useSelector(state => state.terminals);

  return (
    <div className="home-container">
      <h1>Welcome to My Portfolio</h1>
      <p>Interact with the terminal below to navigate through my projects.</p>

      {terminals.map((terminal) => (
        <Terminal
          key={terminal.key || terminal.id}
          id={terminal.id}
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
        <StartButton />
        {terminals.map((terminal) => (
          <TerminalButton
            key={terminal.id}
            terminal={terminal}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;