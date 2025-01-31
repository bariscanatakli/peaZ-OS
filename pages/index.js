import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import Terminal from '../components/Terminal';
import TerminalButton from '../components/Homepage/TerminalButton';
import StartButton from '../components/Homepage/StartButton';
import HelpGuide from '../components/Homepage/HelpGuide';

const Home = () => {
  const { terminals } = useSelector(state => state.terminals);
  const [showHelp, setShowHelp] = useState(false);


  return (
    <div className="home-container">
      <h1>Welcome to My Portfolio</h1>
      <p>Interact with the terminal below to navigate through my projects.</p>

      <button
        className="help-button"
        onClick={() => setShowHelp(true)}
      >
        <span role="img" aria-label="help">❔</span> Terminal Guide
      </button>

      {showHelp && <HelpGuide onClose={() => setShowHelp(false)} />}
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