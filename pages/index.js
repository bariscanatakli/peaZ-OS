import React from 'react';
import { useSelector } from 'react-redux';
import Terminal from '../components/Terminal';
import TerminalButton from '../components/Homepage/TerminalButton';
import StartButton from '../components/Homepage/StartButton';

const Home = () => {
  const { terminals } = useSelector(state => state.terminals);

  return (
    <div className="home-container">
      <h1>Welcome to My Portfolio</h1>
      <p>Interact with the terminal below to navigate through my projects.</p>

      {terminals.map((terminal) => (
        <Terminal
          key={terminal.key || terminal.id}
          id={terminal.id}
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