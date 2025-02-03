import { commands } from "./commands";
import { getDirectory } from "./helper";
import {
    setInput,
    updateHistory,
    setHistoryIndex,
    setSuggestions,
    addOutput,
    clearOutput,
    setPath,
    setRole,
    setFileSystem,
    setFileContent,
    setIsEditing,
    setAwaitingPassword,
    setEditingFile,
} from '../../../store/slices';

export const handleInput = (e, dispatch, state) => {
    if (!state) return;

    const {
        input = '',
        history = [],
        historyIndex = -1,
        path = '/',
        fileSystem = null,
        isAwaitingPassword,
        passwordType,
        lastSudoCommand,
        role
    } = state;

    switch (e.key) {
        case 'Enter':
            if (isAwaitingPassword) {
                e.preventDefault();
                const password = input.trim();

                if (password === process.env.NEXT_PUBLIC_ROOT_PASSWORD) {
                    dispatch(setRole({ terminalId: state.id, role: 'admin' }));
                    dispatch(addOutput('Root access granted.'));
                } else {
                    dispatch(addOutput('Authentication failure'));
                }

                dispatch(setAwaitingPassword({
                    terminalId: state.id,
                    awaiting: false,
                    type: null,
                    command: null
                }));
                dispatch(setInput({ terminalId: state.id, input: '' }));
                return;
            }

            if (input.trim()) {
                // dispatch(addOutput({ terminalId: state.id, output: `${getPrompt(path, role)}${input}` }));
                handleCommand(input.trim(), dispatch, state);
                dispatch(updateHistory({ terminalId: state.id, command: input.trim() }));
                dispatch(setHistoryIndex({ terminalId: state.id, historyIndex: -1 }));
                dispatch(setInput({ terminalId: state.id, input: '' }));
            }
            break;

        case 'ArrowUp':
            e.preventDefault();
            if (!history.length) return;

            const newIndexUp = historyIndex === -1 ?
                history.length - 1 :
                Math.max(0, historyIndex - 1);

            dispatch(setHistoryIndex({ terminalId: state.id, historyIndex: newIndexUp }));
            dispatch(setInput({ terminalId: state.id, input: history[newIndexUp] }));
            break;

        case 'ArrowDown':
            e.preventDefault();
            if (history.length === 0 || historyIndex === -1) return;

            const newIndexDown = historyIndex + 1;
            if (newIndexDown < history.length) {
                dispatch(setHistoryIndex({ terminalId: state.id, historyIndex: newIndexDown }));
                dispatch(setInput({ terminalId: state.id, input: history[newIndexDown] }));
            } else {
                dispatch(setHistoryIndex({ terminalId: state.id, historyIndex: -1 }));
                dispatch(setInput({ terminalId: state.id, input: '' }));
            }
            break;

        case 'Tab':
            e.preventDefault();
            const tokens = input.split(' ');
            const lastToken = tokens[tokens.length - 1];
            let suggestions = [];

            if (tokens.length === 1) {
                suggestions = Object.keys(commands).filter(cmd =>
                    cmd.startsWith(lastToken)
                );
            } else if (fileSystem) {
                const currentDir = getDirectory(fileSystem, path);
                if (currentDir && currentDir.type === 'dir') {
                    suggestions = Object.keys(currentDir.content).filter(name =>
                        name.startsWith(lastToken)
                    );
                }
            }

            if (suggestions.length === 1) {
                tokens[tokens.length - 1] = suggestions[0];
                dispatch(setInput({ terminalId: state.id, input: tokens.join(' ') + ' ' }));
            } else if (suggestions.length > 0) {
                dispatch(addOutput({ terminalId: state.id, output: `\n${suggestions.join('  ')}\n` }));
            }
            break;

        default:
            break;
    }
};
export const handleCommand = async (cmd, dispatch, state) => {
    if (!cmd) return;

    const args = cmd.split(' ');
    const command = args.shift().toLowerCase();

    // Add command echo
    dispatch(addOutput({
        terminalId: state.id,
        output: `${getPrompt(state.path, state.role, state.username)}${cmd}`
    }));

    // Debug: log terminalId
    console.log('Terminal ID:', state.id);

    // Check if command exists
    if (!commands[command]) {
        dispatch(addOutput({
            terminalId: state.id,
            output: `command not found: ${command}`
        }));
        return;
    }

    // Execute command with proper error handling
    try {
        const result = await commands[command](
            args,
            state.fileSystem,
            state.path,
            dispatch,
            state.role,
            state
        );

        if (result) {
            dispatch(addOutput({
                terminalId: state.id,
                output: result
            }));
        }
    } catch (error) {
        console.error(`Error executing ${command}:`, error);
        dispatch(addOutput({
            terminalId: state.id,
            output: `Error: ${error.message}`
        }));
    }
};

export const getPrompt = (path = '/', role = 'guest') => {
    const username = role === 'admin' ? 'root' : 'guest';
    return `${username}@peaZ-OS:${path}${path === '/' ? '' : '/'} `;
};