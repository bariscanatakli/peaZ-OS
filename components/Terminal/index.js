import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
    handleCommand,
    handleInput,
    handleMouseMove,
    handleMouseUp,
    getPrompt,
    handleClick,
    handleClose,
    handleMaximize,
    handleMinimize
} from './functions';

const Terminal = ({
    id,
    onClose,
    zIndex,
    bringToFront,
    toggleMinimize,
    initialPosition,
    input: initialInput,
    output: initialOutput,
    updateTerminalState,
    isMinimized
}) => {
    const [output, setOutput] = useState(initialOutput);
    const [input, setInput] = useState(initialInput);
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState(initialPosition);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isMaximized, setIsMaximized] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [resizeDirection, setResizeDirection] = useState('');
    const [dimensions, setDimensions] = useState({ width: 600, height: 400 });
    const terminalRef = useRef(null);
    const inputRef = useRef(null);
    const [suggestions, setSuggestions] = useState([]);
    const [currentPath, setCurrentPath] = useState('~');
    const [fileSystem, setFileSystem] = useState({
        '~': {
            type: 'dir',
            content: {
                about: { type: 'dir', content: {
                    'team.txt': { type: 'file', content: 'Team members: Alice, Bob, Charlie' },
                }},
                skills: { type: 'dir', content: {
                    'languages.txt': { type: 'file', content: 'JavaScript, Python, C++' },
                    'frameworks.txt': { type: 'file', content: 'React, Node.js, Express' },
                }},
                projects: { type: 'dir', content: {
                    'project1.txt': { type: 'file', content: 'Project1: Description of project1...' },
                    'project2.txt': { type: 'file', content: 'Project2: Description of project2...' },
                }},
                contact: { type: 'dir', content: {
                    'email.txt': { type: 'file', content: 'Email: example@example.com' },
                    'phone.txt': { type: 'file', content: 'Phone: 123-456-7890' },
                }},
                'README.txt': { type: 'file', content: 'Welcome to the Terminal!' },
            },
        },
    });

    const handleInputChange = useCallback((e) => {
        setInput(e.target.value);
    }, []);

    const handleKeyDownEvent = useCallback(
        (e) => {
            handleInput(
                e,
                (cmd) => handleCommand(cmd, setOutput, setHistory, currentPath, fileSystem, setCurrentPath),
                input,
                setInput,
                history,
                setHistory,
                historyIndex,
                setHistoryIndex,
                fileSystem,
                currentPath,
                setOutput,
                setSuggestions
            );
        },
        [input, history, historyIndex, fileSystem, currentPath]
    );

    useEffect(() => {
        const handleMouseMoveEvent = (e) => {
            handleMouseMove(
                e,
                terminalRef,
                setPosition,
                offset,
                isDragging,
                isResizing,
                resizeDirection,
                dimensions,
                setDimensions
            );
        };

        const handleMouseUpEvent = (e) => {
            handleMouseUp(e, setIsDragging, setIsResizing, setResizeDirection);
        };

        if (isDragging || isResizing) {
            window.addEventListener('mousemove', handleMouseMoveEvent);
            window.addEventListener('mouseup', handleMouseUpEvent);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMoveEvent);
            window.removeEventListener('mouseup', handleMouseUpEvent);
        };
    }, [isDragging, isResizing, offset, resizeDirection, dimensions]);

    return (
        <div
            ref={terminalRef}
            className={`terminal-container ${isMinimized ? 'minimized' : ''} ${isMaximized ? 'maximized' : ''}`}
            style={{
                top: `${position.y}px`,
                left: `${position.x}px`,
                zIndex: zIndex,
                width: `${dimensions.width}px`,
                height: `${dimensions.height}px`,
            }}
            onClick={() => [handleClick(bringToFront), inputRef.current.focus()]}
        >
            <div
                className="terminal-header"
                onMouseDown={(e) => {
                    bringToFront();
                    setIsDragging(true);
                    setOffset({
                        x: e.clientX - position.x,
                        y: e.clientY - position.y
                    });
                }}
                onDoubleClick={() => handleMaximize(setIsMaximized, isMaximized)}
            >
                <span>Terminal {id}</span>
                <div className="window-controls">
                    <button className="control-button minimize" onClick={() => handleMinimize(id, toggleMinimize)}>–</button>
                    <button className="control-button maximize" onClick={() => handleMaximize(setIsMaximized, isMaximized)}>
                        {isMaximized ? '🗗' : '▢'}
                    </button>
                    <button className="control-button close" onClick={() => handleClose(id, onClose)}>×</button>
                </div>
            </div>
            <div className="terminal">
                <div className="terminal-output">
                    {output.map((line, i) => (
                        <div key={i} className="output-line">
                            {line.startsWith(getPrompt(currentPath) + ' $') ? (
                                <>
                                    <span className="prompt">{getPrompt(currentPath)} $ </span>
                                    <span className="command">{line.slice((getPrompt(currentPath) + ' $ ').length)}</span>
                                </>
                            ) : (
                                <span className="output">{line}</span>
                            )}
                        </div>
                    ))}
                </div>
                <div className="input-line">
                    <span className="prompt">{getPrompt(currentPath)}</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDownEvent}
                        className="terminal-input"
                        autoFocus
                    />
                </div>
            </div>
        </div>
    );
};

export default Terminal;