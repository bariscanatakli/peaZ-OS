import { commands } from "./commands";
import { getDirectory } from "./helper";
export const handleInput = (
    e,
    handleCommand,
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
) => {
    switch (e.key) {
        case 'Enter':
            if (input.trim()) {
                handleCommand(input.trim());
                setHistory([...history, input.trim()]);
                setHistoryIndex(-1);
                setInput('');
                setSuggestions([]);
            }
            break;
        case 'ArrowUp':
            if (history.length === 0) return;
            const newIndexUp = historyIndex === -1 ? history.length - 1 : Math.max(historyIndex - 1, 0);
            setHistoryIndex(newIndexUp);
            setInput(history[newIndexUp]);
            break;
        case 'ArrowDown':
            if (history.length === 0 || historyIndex === -1) return;
            const newIndexDown = historyIndex + 1;
            if (newIndexDown < history.length) {
                setHistoryIndex(newIndexDown);
                setInput(history[newIndexDown]);
            } else {
                setHistoryIndex(-1);
                setInput('');
            }
            break;
        case 'Tab':
            e.preventDefault();
            const tokens = input.split(' ');
            const lastToken = tokens[tokens.length - 1];
            let suggestions = [];

            if (tokens.length === 1) {
                // Command completion
                suggestions = Object.keys(commands).filter(cmd => cmd.startsWith(lastToken));
            } else {
                // File/directory completion
                const currentDir = getDirectory(fileSystem, currentPath);
                if (currentDir && currentDir.type === 'dir') {
                    suggestions = Object.keys(currentDir.content).filter(name => name.startsWith(lastToken));
                }
            }

            if (suggestions.length === 1) {
                tokens[tokens.length - 1] = suggestions[0];
                setInput(tokens.join(' ') + ' ');
            } else if (suggestions.length > 1) {
                setOutput(prev => [...prev, `\n${suggestions.join('  ')}`, '']);
            }
            break;
        default:
            break;
    }
};
export const handleCommand = (
    cmd,
    setOutput,
    setHistory,
    currentPath,
    fileSystem,
    setCurrentPath,
    history
) => {
    if (!cmd) return;

    const args = cmd.split(' ');
    const command = args.shift().toLowerCase();

    if (commands[command]) {
        const result = commands[command](args, fileSystem, currentPath, setCurrentPath, history);
        if (result !== null) {
            if (result === 'CLEAR_COMMAND') {
                setOutput([]);
            } else if (result === 'EXIT_COMMAND') {
                setOutput(prev => [...prev, 'Session terminated.']);
                // Additional logic to close the terminal if required
            } else {
                setOutput(prev => [...prev, result, '']);
            }
        }
    } else {
        setOutput(prev => [
            ...prev,
            `${getPrompt(currentPath)} $ ${cmd}`,
            `command not found: ${command}`,
            '',
        ]);
    }
    setHistory(prev => [...prev, cmd]);
};

export const getPrompt = (currentPath) => {
    const username = 'guest';
    const hostname = 'peaZ-OS';
    return `${username}@${hostname}:${currentPath}$`;
};