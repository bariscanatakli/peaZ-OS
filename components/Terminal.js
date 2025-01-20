import React, { useState, useRef, useEffect } from 'react';


const commands = ['ls', 'cd', 'mkdir', 'rm', 'touch', 'echo', 'pwd'];
const fileSystem = ['Documents', 'Downloads', 'Pictures', 'Music', 'Projects'];


export default function Terminal({ id, onClose, zIndex, bringToFront, toggleMinimize, initialPosition, input: initialInput, output: initialOutput, updateTerminalState, isMinimized }) {
    // const [input, setInput] = useState(initialInput);
    // const [output, setOutput] = useState(initialOutput);
    // const [history, setHistory] = useState([]);
    // const [historyIndex, setHistoryIndex] = useState(-1);

    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState(initialPosition);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [openAnimation, setOpenAnimation] = useState(true);
    const [closeAnimation, setCloseAnimation] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [isResizing, setIsResizing] = useState(false);
    const [resizeDirection, setResizeDirection] = useState('');
    const [dimensions, setDimensions] = useState({ width: 600, height: 400 });
    const terminalRef = useRef(null);
    const inputRef = useRef(null);
    const outputRef = useRef(null);
    const [currentPath, setCurrentPath] = useState('~');
    const [fileSystem, setFileSystem] = useState({
        '~': {
            type: 'dir',
            content: {
                'Documents': { type: 'dir', content: {} },
                'Downloads': { type: 'dir', content: {} },
                'Pictures': { type: 'dir', content: {} },
                'Music': { type: 'dir', content: {} },
                'Projects': { type: 'dir', content: {} },
                'about.txt': { type: 'file', content: 'Hi, I am a software developer...' },
                'skills.txt': { type: 'file', content: 'JavaScript, React, Node.js...' },
                'contact.txt': { type: 'file', content: 'Email: example@domain.com\nGitHub: github.com/username' }
            }
        }
    });
    const [input, setInput] = useState('');
    const [output, setOutput] = useState(['Welcome to Terminal v1.0.0', 'Type "help" for available commands', '']);
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [cursorPosition, setCursorPosition] = useState(0);
    // const [fileSystem, setFileSystem] = useState({
    //     '~': {
    //         type: 'dir',
    //         content: {
    //             'projects': { type: 'dir', content: {} },
    //             'about.txt': { type: 'file', content: 'Hi, I am a software developer...' },
    //             'skills.txt': { type: 'file', content: 'JavaScript, React, Node.js...' },
    //             'contact.txt': { type: 'file', content: 'Email: example@domain.com\nGitHub: github.com/username' }
    //         }
    //     }
    // });

    const commands = {
        cd: (args) => {
            const newPath = args[0] || '~';
            if (fileSystem[newPath] && fileSystem[newPath].type === 'dir') {
                setCurrentPath(newPath);
                return '';
            }
            return `cd: no such directory: ${newPath}`;
        },
        ls: () => {
            const currentDir = fileSystem[currentPath];
            if (!currentDir) {
                return `Error: Directory ${currentPath} does not exist.`;
            }
            return Object.entries(currentDir.content)
                .map(([name, item]) => `${item.type === 'dir' ? '📁' : '📄'} ${name}`)
                .join('\n');
        },
        cat: (args) => {
            if (!args.length) return 'cat: missing file operand';
            const file = fileSystem[currentPath].content[args[0]];
            if (!file || file.type !== 'file') return `cat: ${args[0]}: No such file`;
            return file.content;
        },
        clear: () => {
            setOutput([]);
            return null;
        },
        help: () => `Available commands:
  ls          - list directory contents
  cd          - change directory
  cat         - read file contents
  pwd         - print working directory
  clear       - clear terminal
  help        - show this help
  exit        - close terminal`,
        pwd: () => currentPath,
        man: (args) => {
            if (!args.length) return 'What manual page do you want?';
            const cmd = args[0];
            const manPages = {
                ls: 'ls - list directory contents\n\nUsage: ls [directory]',
                cd: 'cd - change directory\n\nUsage: cd [directory]',
                cat: 'cat - concatenate and print files\n\nUsage: cat [file]',
                pwd: 'pwd - print working directory\n\nUsage: pwd',
                echo: 'echo - display a line of text\n\nUsage: echo [string]',
                whoami: 'whoami - print effective userid\n\nUsage: whoami'
            };
            return manPages[cmd] || `No manual entry for ${cmd}`;
        },
        echo: (args) => args.join(' '),
        whoami: () => 'guest',
        date: () => new Date().toString(),
        uname: () => 'peaZ-OS v1.0.0',
        history: () => history.join('\n'),
        exit: () => {
            onClose(id);
            return '';
        }
    };


    // Add typing animation
    const animateTyping = (text, speed = 50) => {
        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                setOutput(prev => [...prev.slice(0, -1), prev[prev.length - 1] + text[i]]);
                i++;
            } else {
                clearInterval(interval);
            }
        }, speed);
    };

    // Enhance the terminal prompt
    const getPrompt = () => {
        const username = 'guest';
        const hostname = 'portfolio';
        return `${username}@${hostname}:${currentPath}$`;
    };

    useEffect(() => {
        updateTerminalState(id, { input, output });
    }, [input, output]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (isDragging) {
                const newX = e.clientX - offset.x;
                const newY = e.clientY - offset.y;
                const terminalWidth = terminalRef.current ? terminalRef.current.offsetWidth : 0;
                const terminalHeight = terminalRef.current ? terminalRef.current.offsetHeight : 0;
                const screenDimensions = {
                    left: terminalWidth, bottom: window.innerHeight - terminalHeight / 2,
                    right: window.innerWidth - terminalWidth / 2, top: window.innerHeight + terminalHeight / 2
                };
                setPosition({
                    x: newX < screenDimensions.left / 2 ? screenDimensions.left / 2 : newX > screenDimensions.right ? screenDimensions.right : newX,
                    y: newY < 200 ? 200 : newY > screenDimensions.bottom ? screenDimensions.bottom : newY
                });
            } else if (isResizing) {
                const newWidth = resizeDirection.includes('right') ? e.clientX - position.x : dimensions.width;
                const newHeight = resizeDirection.includes('bottom') ? e.clientY - position.y : dimensions.height;
                setDimensions({
                    width: newWidth > 300 ? newWidth : 300,
                    height: newHeight > 200 ? newHeight : 200
                });
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            setIsResizing(false);
            setResizeDirection('');
        };

        if (isDragging || isResizing) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, isResizing, offset, resizeDirection, position, dimensions]);

    const handleClick = () => {
        bringToFront();
    };

    const handleClose = () => {
        setCloseAnimation(true);
        onClose(id);
    };

    const handleMinimize = () => {
        toggleMinimize(id);
    };

    const handleMaximize = () => {
        setIsMaximized(!isMaximized);
    };

    const handleInput = (e) => {
        if (e.key === 'Enter') {
            handleCommand(input);
            setHistory([...history, input]);
            setHistoryIndex(-1);
            setInput('');
            setSuggestions([]);
        } else if (e.key === 'ArrowUp') {
            if (history.length === 0) return;
            const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(historyIndex - 1, 0);
            setHistoryIndex(newIndex);
            setInput(history[newIndex]);
        } else if (e.key === 'ArrowDown') {
            if (history.length === 0) return;
            if (historyIndex === -1) return;
            const newIndex = historyIndex + 1;
            if (newIndex < history.length) {
                setHistoryIndex(newIndex);
                setInput(history[newIndex]);
            } else {
                setHistoryIndex(-1);
                setInput('');
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            const tokens = input.split(' ');
            const lastToken = tokens[tokens.length - 1];
            let suggestions = [];

            if (tokens.length === 1) {
                // Command completion
                suggestions = Object.keys(commands).filter(cmd => cmd.startsWith(lastToken));
            } else {
                // File/directory completion
                const currentDir = fileSystem[currentPath];
                if (currentDir && currentDir.content) {
                    if (tokens[0] === 'cd') {
                        // Only directories for cd
                        suggestions = Object.entries(currentDir.content)
                            .filter(([_, item]) => item.type === 'dir')
                            .map(([name]) => name)
                            .filter(name => name.startsWith(lastToken));
                    } else {
                        // Both files and directories for other commands
                        suggestions = Object.keys(currentDir.content)
                            .filter(name => name.startsWith(lastToken));
                    }
                }
            }

            if (suggestions.length === 1) {
                tokens[tokens.length - 1] = suggestions[0];
                setInput(tokens.join(' ') + ' ');
            } else if (suggestions.length > 1) {
                setOutput(prev => [...prev, `\nPossible completions:`, ...suggestions, '']);
                const commonPrefix = suggestions.reduce((a, b) => {
                    let i = 0;
                    while (i < a.length && i < b.length && a[i] === b[i]) i++;
                    return a.slice(0, i);
                });
                if (commonPrefix.length > lastToken.length) {
                    tokens[tokens.length - 1] = commonPrefix;
                    setInput(tokens.join(' '));
                }
            }
        }
    };

    const handleAutocomplete = (currentInput) => {
        if (currentInput === '') {
            setSuggestions([]);
            return;
        }
        const filtered = availableCommands.filter(cmd => cmd.startsWith(currentInput));
        setSuggestions(filtered);
    };

    const parseCommand = (cmd) => {
        switch (cmd.toLowerCase()) {
            case 'exit':
                handleClose();
                break;
            case 'help':
                setOutput(prev => [...prev, 'Available commands: help, exit, clear']);
                break;
            case 'clear':
                setOutput([]);
                break;
            default:
                setOutput(prev => [...prev, `Unknown command: ${cmd}`]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setInput(suggestion);
        setSuggestions([]);
    };

    const startResizing = (direction) => (e) => {
        e.stopPropagation();
        setIsResizing(true);
        setResizeDirection(direction);
    };
    const handleCommand = (cmd) => {
        if (!cmd) return;

        const args = cmd.split(' ');
        const command = args.shift().toLowerCase();

        if (commands[command]) {
            const result = commands[command](args);
            if (result !== null) {
                setOutput(prev => [...prev, `${currentPath} $ ${cmd}`, result, '']);
            }
        } else {
            setOutput(prev => [...prev, `${currentPath} $ ${cmd}`, `command not found: ${command}`, '']);
        }
        setHistory(prev => [...prev, cmd]);
    };
    return (
        <div
            ref={terminalRef}
            className={`terminal-container ${isMinimized ? 'minimized' : ''}`}
            style={{
                top: `${position.y}px`,
                left: `${position.x}px`,
                zIndex: zIndex,
                width: `${dimensions.width}px`,
                height: `${dimensions.height}px`,
            }}
            onClick={handleClick}
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
            >
                <span>Terminal {id}</span>
                <div className="window-controls">
                    <button className="control-button minimize" onClick={handleMinimize}>–</button>
                    <button className="control-button maximize" onClick={handleMaximize}>{isMaximized ? '🗗' : '▢'}</button>
                    <button className="control-button close" onClick={handleClose}>×</button>
                </div>
            </div>
            <div className="terminal">
                <div className="terminal-output">
                    {output.map((line, i) => (
                        <div key={i} className="output-line">
                            {line.startsWith(getPrompt()) ? (
                                <>
                                    <span className="prompt">{getPrompt()}</span>
                                    <span className="command">{line.slice(getPrompt().length)}</span>
                                </>
                            ) : (
                                <span className="output">{line}</span>
                            )}
                        </div>
                    ))}
                </div>
                <div className="input-line">
                    <span className="prompt">{getPrompt()}</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={handleInput}
                        className="terminal-input"
                        autoFocus
                    />

                </div>
            </div>
        </div>
    );
}