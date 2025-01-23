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
    setSuggestions,
    role,
    setRole,
    isAwaitingPassword,
    setTerminals,
    setCurrentPath
) => {
    switch (e.key) {
        case 'Enter':
            if (isAwaitingPassword) {
                handleCommand(`authenticate ${input}`, setOutput, setHistory, currentPath, fileSystem, setCurrentPath, history, role, setRole, setTerminals, setIsEditing,
                    setEditingFile,
                    setFileContent); // Pass setTerminals
                setInput('');
                break;
            }
            if (input.trim()) {
                handleCommand(input.trim(), setOutput, setHistory, currentPath, fileSystem, setCurrentPath, history, role, setRole, setTerminals); // Pass setTerminals
                setInput('');
                setHistory([...history, input.trim()]);
                setHistoryIndex(-1);
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
    history,
    role,
    setRole,
    setTerminals,
    currentTerminalId,
    setIsEditing,
    setEditingFile,
    setFileContent
) => {
    if (!cmd) return;

    const args = cmd.split(' ');
    const command = args.shift().toLowerCase();

    if (commands[command]) {
        let result;

        switch (command) {
            case 'cd':
                result = commands[command](args, fileSystem, currentPath, setCurrentPath);
                break;
            case 'sudo':
                result = commands[command](args, fileSystem, currentPath, role, setRole, setOutput);
                break;  
            case 'logout':
                result = commands[command](args, fileSystem, currentPath, role, setRole, setOutput);
                break;
            case 'edit':
                result = commands[command](args, fileSystem, currentPath, role, setRole, setOutput, setIsEditing, setEditingFile, setFileContent);
                break;
            case 'authenticate':
                result = commands[command](args, setRole, setOutput);
                break;
            case "rm":
                result = commands[command](args, fileSystem, currentPath, role);
                break;
            case "cat":
                result = commands[command](args, fileSystem, currentPath);
                break;
            case "ls":
                result = commands[command](args, fileSystem, currentPath);
                break
            case "mkdir":
                result = commands[command](args, fileSystem, currentPath);
                break;
            case "touch":
                result = commands[command](args, fileSystem, currentPath, role);
                break;
            case "show":
                result = commands[command](args, fileSystem, currentPath, setTerminals);
                break;
            case 'history':
                result = commands[command](args, fileSystem, currentPath, history);
                break;
            case 'exit':
                result = commands[command](args, setTerminals, currentTerminalId);
                break;
            case "clear":
                result = commands[command]();
                break;

            default:
                result = commands[command](args, fileSystem, currentPath);
        }

        if (result === 'CLEAR_COMMAND') {
            setOutput([]);
        } else if (result === 'PASSWORD_PROMPT') {
            // Handle in Terminal component
        } else if (result) {
            setOutput(prev => [...prev, `${getPrompt(currentPath, role)} $ ${cmd}`, result]);
        } else {
            setOutput(prev => [...prev, `${getPrompt(currentPath, role)} $ ${cmd}`]);
        }

        setHistory(prev => [...prev, cmd]);
    } else {
        setOutput(prev => [
            ...prev,
            `${getPrompt(currentPath, role)} $ ${cmd}`,
            `command not found: ${command}`
        ]);
    }
};

export const getPrompt = (currentPath, role) => {
    const username = role === 'admin' ? 'root' : 'guest';
    return `${username}@peaZ-OS:${currentPath}$`;
};