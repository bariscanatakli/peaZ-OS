import React, { useState } from 'react';
import Terminal from '../components/Terminal';
import TerminalButton from '../components/Homepage/TerminalButton';
import StartButton from '../components/Homepage/StartButton';
import { addTerminal, bringTheTerminalFront, handleOpenTerminal, minimizeTerminal, removeTerminal } from '../components/Homepage/functions/Terminal';

const Home = () => {
  const [terminals, setTerminals] = useState([]);
  const [currentZIndex, setCurrentZIndex] = useState(1);
  const [positionOffset, setPositionOffset] = useState(20);
  const [activeTerminalId, setActiveTerminalId] = useState(null);
  const role = 'guest'; // Set role  

  return (
    <div className="home-container">
      <h1>Welcome to My Portfolio</h1>
      <p>Interact with the terminal below to navigate through my projects.</p>

      {/* Render Terminal Windows */}
      {terminals.map((terminal) => (
        <Terminal
          key={terminal.id}
          id={terminal.id}
          onClose={() => removeTerminal(terminal.id, setTerminals, terminals, activeTerminalId, setActiveTerminalId)}
          zIndex={terminal.zIndex}
          bringToFront={() => bringTheTerminalFront(terminal.id, setTerminals, currentZIndex, setCurrentZIndex, setActiveTerminalId)}
          toggleMinimize={() => minimizeTerminal(terminal.id, setTerminals, activeTerminalId, setActiveTerminalId)}
          initialPosition={terminal.position}
          input={terminal.input}
          output={terminal.output}
          isMinimized={terminal.isMinimized}
          userRole={terminal.role} // Pass role
          content={terminal.content}
          setTerminals={setTerminals}
        />
      ))}

      {/* Taskbar at the Bottom */}
      <div className="taskbar">
        <StartButton onAddTerminal={() => addTerminal(role, setTerminals, terminals, currentZIndex, setCurrentZIndex, positionOffset, setPositionOffset, setActiveTerminalId)} />
        {terminals.map((terminal) => (
          <TerminalButton
            key={terminal.id}
            terminal={terminal}
            onOpen={() => [handleOpenTerminal(terminal.id, setTerminals), bringTheTerminalFront(terminal.id, setTerminals, currentZIndex, setCurrentZIndex, setActiveTerminalId)]}
            isActive={activeTerminalId === terminal.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;