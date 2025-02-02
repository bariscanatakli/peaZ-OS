import React from 'react';
import { useSelector } from 'react-redux';

const TerminalInfo = ({ id, onClose }) => {
  const terminal = useSelector(state =>
    state.terminals.terminals.find(t => t.id === id)
  );

  if (!terminal) return null;

  return (
    <div className="terminal-info-modal-custom">
      <div className="terminal-info-content">
        <div className="modal-header">
          <h3>Terminal Info</h3>
          <button onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <div className="info-grid">
            <div className="info-item">
              <span>ID:</span>
              <span>{terminal.id}</span>
            </div>
            <div className="info-item">
              <span>Path:</span>
              <span>{terminal.path}</span>
            </div>
            <div className="info-item">
              <span>Role:</span>
              <span>{terminal.role}</span>
            </div>
            <div className="info-item">
              <span>Position:</span>
              <span>
                {terminal.position
                  ? `(${terminal.position.x}, ${terminal.position.y})`
                  : 'N/A'}
              </span>
            </div>
            <div className="info-item">
              <span>Dimensions:</span>
              <span>
                {terminal.dimensions
                  ? `${terminal.dimensions.width} x ${terminal.dimensions.height}`
                  : 'N/A'}
              </span>
            </div>
            <div className="info-item">
              <span>Minimized:</span>
              <span>{terminal.isMinimized ? 'Yes' : 'No'}</span>
            </div>
            <div className="info-item">
              <span>Editing:</span>
              <span>{terminal.isEditing ? 'Yes' : 'No'}</span>
            </div>
            <div className="info-item">
              <span>Input:</span>
              <span>{terminal.input || '-'}</span>
            </div>
            <div className="info-item">
              <span>Output Count:</span>
              <span>{terminal.output ? terminal.output.length : 0}</span>
            </div>
            <div className="info-item">
              <span>History Count:</span>
              <span>{terminal.history ? terminal.history.length : 0}</span>
            </div>
            <div className="info-item">
              <span>Awaiting Password:</span>
              <span>{terminal.isAwaitingPassword ? 'Yes' : 'No'}</span>
            </div>
            {/* Add additional info as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalInfo;