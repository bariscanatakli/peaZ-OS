import React, { useState } from 'react';
import Terminal from '../components/Terminal';
import TerminalButton from '../components/TerminalButton';
import StartButton from '../components/StartButton';


const Home = () => {
  const [terminals, setTerminals] = useState([]);
  const [currentZIndex, setCurrentZIndex] = useState(1);
  const [positionOffset, setPositionOffset] = useState(20);
  const [activeTerminalId, setActiveTerminalId] = useState(null);

  const addTerminal = () => {
    const newTerminal = {
      id: Date.now(),
      zIndex: currentZIndex,
      isMinimized: false,
      position: {
        x: window.innerWidth / 2 + positionOffset,
        y: window.innerHeight / 2 + positionOffset,
      },
      input: '',
      output: ['Welcome to the terminal! Type "help" for available commands'],
    };
    setTerminals([...terminals, newTerminal]);
    setCurrentZIndex(currentZIndex + 1);
    setPositionOffset(positionOffset + 20);
    setActiveTerminalId(newTerminal.id);
  };

  const removeTerminal = (id) => {
    setTerminals(terminals.filter((terminal) => terminal.id !== id));
    if (activeTerminalId === id) {
      setActiveTerminalId(null);
    }
  };

  const bringToFront = (id) => {
    setTerminals((prevTerminals) =>
      prevTerminals.map((terminal) =>
        terminal.id === id ? { ...terminal, zIndex: currentZIndex } : terminal
      )
    );
    setCurrentZIndex(currentZIndex + 1);
    setActiveTerminalId(id);
  };

  const toggleMinimize = (id) => {
    setTerminals((prevTerminals) =>
      prevTerminals.map((terminal) =>
        terminal.id === id ? { ...terminal, isMinimized: !terminal.isMinimized } : terminal
      )
    );
    if (activeTerminalId === id) {
      setActiveTerminalId(null);
    }
  };

  const handleOpenTerminal = (id) => {
    setTerminals((prevTerminals) =>
      prevTerminals.map((terminal) =>
        terminal.id === id ? { ...terminal, isMinimized: false } : terminal
      )
    );
    bringToFront(id);
  };

  return (
    <div className="home-container">
      <h1>Welcome to My Portfolio</h1>
      <p>Interact with the terminal below to navigate through my projects.</p>
      
      {/* Render Terminal Windows */}
      {terminals.map((terminal) => (
        <Terminal
          key={terminal.id}
          id={terminal.id}
          onClose={removeTerminal}
          zIndex={terminal.zIndex}
          bringToFront={() => bringToFront(terminal.id)}
          toggleMinimize={toggleMinimize}
          initialPosition={terminal.position}
          input={terminal.input}
          output={terminal.output}
          updateTerminalState={() => {}} // Assuming existing functionality
          isMinimized={terminal.isMinimized}
        />
      ))}

      {/* Taskbar at the Bottom */}
      <div className="taskbar">
        <StartButton onAddTerminal={addTerminal} />
        {terminals.map((terminal) => (
          <TerminalButton
            key={terminal.id}
            terminal={terminal}
            onOpen={handleOpenTerminal}
            isActive={activeTerminalId === terminal.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;