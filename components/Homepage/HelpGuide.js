import React, { useState, useRef } from 'react';

const HelpGuide = ({ onClose }) => {

    const [selectedCommand, setSelectedCommand] = useState(null);
    const [previousCommand, setPreviousCommand] = useState(null);
    const commandDetailsRef = useRef(null);
    const contentRef = useRef(null);

    const commands = {
        // Basic Commands
        help: {
            desc: 'Display available commands',
            usage: 'help'
        },
        ls: {
            desc: 'List directory contents',
            usage: 'ls [directory]'
        },
        cd: {
            desc: 'Change directory',
            usage: 'cd [directory]'
        },
        pwd: {
            desc: 'Print working directory',
            usage: 'pwd'
        },
        clear: {
            desc: 'Clear terminal screen',
            usage: 'clear'
        },
        cat: {
            desc: 'Display file contents',
            usage: 'cat [filename]'
        },
        whoami: {
            desc: 'Display current user',
            usage: 'whoami'
        },
        show: {
            desc: 'Display file contents',
            usage: 'show [filename]'
        }
    };

    const adminCommands = {
        touch: {
            desc: 'Create empty file (admin only)',
            usage: 'touch [filename]'
        },
        rm: {
            desc: 'Remove file/directory (admin only)',
            usage: 'rm [-r] [filename]'
        },
        mkdir: {
            desc: 'Create directory (admin only)',
            usage: 'mkdir [dirname]'
        },
        edit: {
            desc: 'Edit file contents (admin only)',
            usage: 'edit [filename]'
        },
        sudo: {
            desc: 'Execute command with admin privileges',
            usage: 'sudo [command]'
        },
        'sudo su': {
            desc: 'Switch to admin user',
            usage: 'sudo su [-]'
        },
        login: {
            desc: 'Login as user',
            usage: 'login [username] [password]'
        },
        logout: {
            desc: 'Logout current user',
            usage: 'logout'
        }
    };

    const handleCommandClick = (cmd) => {
        setPreviousCommand(selectedCommand);
        setSelectedCommand(cmd);

        // Scroll to command details
        setTimeout(() => {
            commandDetailsRef.current?.scrollIntoView({
                behavior: 'smooth',

            });
        }, 100);
    };

    const handleOutsideClick = (e) => {
        if (e.target.className === 'help-guide') {
            onClose();
        }
    };

    const scrollToPrevious = () => {
        if (previousCommand) {
            setSelectedCommand(previousCommand);
            setPreviousCommand(null);
        }
    };

    const scrollToTop = () => {
        contentRef.current?.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className="help-guide" onClick={handleOutsideClick}>
            <div className="help-content" ref={contentRef}>
                <button className="close-button" onClick={onClose}>×</button>
                <button
                    className="scroll-top-button"
                    onClick={scrollToTop}
                    title="Scroll to Top"
                >
                    ↑
                </button>
                {previousCommand && (
                    <button
                        className="previous-command-button"
                        onClick={scrollToPrevious}
                        title="Go to Previous Command"
                    >
                        ←
                    </button>
                )}
                <h1>🖥️ Terminal Guide</h1>

                <div className="terminal-box">
                    <div className="terminal-header">
                        <div className="terminal-controls">
                            <div className="control-dot red"></div>
                            <div className="control-dot yellow"></div>
                            <div className="control-dot green"></div>
                        </div>
                    </div>
                    <p>Welcome to my interactive terminal portfolio! This terminal simulates a Linux-like environment where you can navigate through my projects and information using commands.</p>
                </div>

                <section className="guide-section">
                    <h2>💻 Basic Controls</h2>
                    <ul className="tips-list">
                        <li>
                            <strong>Window Movement</strong>
                            Click and drag the terminal header to move the window
                        </li>
                        <li>
                            <strong>Window Controls</strong>
                            Click the minimize (-), maximize (□), or close (×) buttons to control the window
                        </li>
                        <li>
                            <strong>Command History</strong>
                            Use Up/Down arrow keys to navigate through previous commands
                        </li>
                        <li>
                            <strong>Window Resize</strong>
                            Drag the window edges or corners to resize the terminal
                        </li>
                    </ul>
                </section>

                <section className="guide-section">
                    <h2>💡 Good to Know</h2>
                    <ul className="tips-list">
                        <li>
                            <strong>Tab Completion:</strong> Press Tab key while typing to auto-complete commands and file names
                        </li>
                        <li>
                            <strong>Command Suggestions:</strong>When you tab complete a command, you can press Tab again to see available options
                        </li>
                        <li>
                            <strong>History Navigation:</strong> Use Up/Down arrow keys to cycle through previously used commands
                        </li>
                        <li>
                            <strong>Command Arguments:</strong> Some commands accept additional arguments shown in square brackets [arg]
                        </li>
                    </ul>
                </section>
                <section className="guide-section">
                    <h2>📁 Viewing Projects</h2>
                    <ul className="tips-list">
                        <li>
                            <strong>Using the edit command:</strong>
                            <span>The edit command opens files in the current terminal for viewing or editing (if you have permissions. You can still use it with dummy admin at public folder.)</span>
                            <div className="command-item">
                                <code><span>//If it is not exist.</span>guest@peaZ-OS:/public$ touch project1.html</code>
                                <span>//This will open an editor that edits project1.html.</span>
                                <code>guest@peaZ-OS:/public$ edit project1.html</code>
                            </div>
                        </li>
                        <li>
                            <strong>Using the show command:</strong>
                            <span>The show command opens project files in a new terminal window, allowing you to view multiple projects simultaneously.</span>
                            <div className="command-item">
                                <span>//This will open project1.html in a new terminal window</span>
                                <code>guest@peaZ-OS:/public$ show project1.html</code>
                            </div>
                        </li>
                        <li>
                            <strong>Example workflow:</strong>
                            <ol>
                                <li>1. First navigate to the projects directory: <code>cd /public</code></li>
                                <li>2. List available projects: <code>ls</code></li>
                                <li>3. View a project: <code>show project1.html</code> or <code>edit project1.html</code></li>
                            </ol>
                        </li>
                        <li>
                            <strong>Key differences:</strong>
                            <ul>
                                <li>- show: Opens in new window, better for viewing multiple projects. And see the projects, explore etc.</li>
                                <li>- edit: Opens the file with a custom editor.</li>
                                <li>- Both commands support all file types in the projects directory. But show commands will behave to render html files.</li>
                            </ul>
                        </li>
                    </ul>

                    <div className="terminal-box">
                        <div className="terminal-header">
                            <div className="terminal-controls">
                                <div className="control-dot red"></div>
                                <div className="control-dot yellow"></div>
                                <div className="control-dot green"></div>
                            </div>
                        </div>
                        <p><strong>Pro tip:</strong> Use <code>show</code> for exploring the projects and know about me,
                            and use <code>edit</code> If you want to give me an expression at the public folder with dummyadmin account.</p>
                    </div>
                </section>

                <section className="guide-section">
                    <h2>🔐 How to Login</h2>

                    <ul className="tips-list">
                        <li>
                            <strong>login dummyadmin dummypass</strong>
                            <span>Use this command to login with the admin credentials. You can only use commands at folder public.</span>
                        </li>
                        <li>
                            <strong>Example</strong>
                            <span>
                                <div
                                    key={`login`}
                                    className={`command-item`}
                                    onClick={() => handleCommandClick(`login`)}
                                >
                                    <code>guest@peaZ-OS:/ login dummyadmin@dummy.com dummypass
                                    </code>
                                    <code>Welcome dummyadmin. Logged in as dumymadmin.</code>
                                    <span></span>
                                </div>

                            </span>
                        </li>

                    </ul>

                </section>
                <section className="guide-section">
                    <h2>🛠️ Available Commands</h2>

                    <h3>Basic Commands</h3>
                    <div className="commands-grid">
                        {Object.entries(commands).map(([cmd, info]) => (
                            <div
                                key={cmd}
                                className={`command-item ${selectedCommand === cmd ? 'selected' : ''}`}
                                onClick={() => handleCommandClick(cmd)}
                            >
                                <code>{cmd}</code>
                                <span>{info.desc}</span>
                            </div>
                        ))}
                    </div>

                    <h3>🔒 Admin & Authentication</h3>
                    <div className="commands-grid">
                        {Object.entries(adminCommands).map(([cmd, info]) => (
                            <div
                                key={cmd}
                                className={`command-item ${selectedCommand === cmd ? 'selected' : ''}`}
                                onClick={() => handleCommandClick(cmd)}
                            >
                                <code>{cmd}</code>
                                <span>{info.desc}</span>
                            </div>
                        ))}
                    </div>

                    {selectedCommand && (
                        <div className="command-details" ref={commandDetailsRef}>
                            <h4>Command Usage:</h4>
                            <code>
                                {(commands[selectedCommand] || adminCommands[selectedCommand]).usage}
                            </code>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default HelpGuide;