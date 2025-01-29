import React, { useState, useRef, useEffect, useCallback } from 'react';
import Editor from '../Editor';
import {
    handleCommand, handleMouseMove, handleMouseUp,
    getPrompt, handleMaximize, handleMinimize
} from './functions';
import { fetchFileSystem, saveFileSystem } from '../../firebase/utils/fireStoreOperations';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { getDirectory } from './functions/helper';
import Container from './components/Container';
import Header from './components/Header';
import TerminalComponent from './components/Terminal';
import { useDispatch, useSelector } from 'react-redux';
import { handleInput } from './functions';
import {
    addOutput,
    setRole,
    setUid,
    setFileSystem,
    setIsEditing,
    setEditingFile,
    setFileContent,
    setInput,
    setPath,
    setSuggestions,
    setHistoryIndex,
    updateHistory,
    clearOutput,
    setAwaitingPassword,
    minimizeTerminal, // Add this import
    setActiveTerminalId,
    setTerminalRef,
    setInputRef,
} from '../../store/slices';
const Terminal = ({
    id,
    onClose,
    zIndex,
    bringToFront,
    toggleMinimize,
    initialPosition = { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    isMinimized,
    userRole = 'guest',
    content = null,
    initialPath = '/'
}) => {
    const dispatch = useDispatch();
    const terminalState = useSelector(state => state.terminals.terminals.find(t => t.id === id));
    const fileSystem = useSelector(state => state.terminals.fileSystem);

    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState(initialPosition);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isMaximized, setIsMaximized] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [resizeDirection, setResizeDirection] = useState('');
    const [dimensions, setDimensions] = useState({ width: 600, height: 400 });

    // Create refs but manage them through Redux
    const terminalRef = useCallback(node => {
        if (node !== null) {
            dispatch(setTerminalRef({ terminalId: id, ref: node }));
        }
    }, [dispatch, id]);

    const inputRef = useCallback(node => {
        if (node !== null) {
            dispatch(setInputRef({ terminalId: id, ref: node }));
        }
    }, [dispatch, id]);

    const currentTerminalRef = terminalState?.refs?.terminal;
    const currentInputRef = terminalState?.refs?.input;

    const [currentPath, setCurrentPath] = useState(initialPath);

    useEffect(() => {
        if (terminalState) {
            setCurrentPath(terminalState.path);
        }
    }, [terminalState]);
    const handleMinimize = useCallback(() => {
        dispatch(minimizeTerminal(id));
        dispatch(setActiveTerminalId(isMinimized ? id : null));
    }, [dispatch, id, isMinimized]);


    useEffect(() => {
        const initializeFileSystem = async () => {
            try {
                const fs = await fetchFileSystem();
                if (fs) {
                    dispatch(setFileSystem({ fileSystem: fs }));
                }
            } catch (error) {
                console.error('Error initializing file system:', error);
            }
        };

        initializeFileSystem();
    }, []);

    useEffect(() => {
        const syncFileSystem = async () => {
            if (terminalState?.fileSystem) {
                await saveFileSystem(terminalState.fileSystem);
            }
        };

        syncFileSystem();
    }, [terminalState?.fileSystem]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    await user.getIdToken(true);
                    const token = await user.getIdTokenResult();
                    dispatch(setRole(token.claims.role || 'guest'));
                    dispatch(setUid(user.uid));
                    dispatch(addOutput(`Logged in as ${token.claims.role || 'guest'}.`));
                } catch (error) {
                    dispatch(addOutput('Error refreshing token. Defaulting to guest.'));
                }
            } else {
                dispatch(setUid(null));
                dispatch(setRole('guest'));
                dispatch(addOutput('No user is signed in. Operating as guest.'));
            }
        });

        return () => unsubscribe();
    }, [dispatch]);

    useEffect(() => {
        if (fileSystem) {
            saveFileSystem(fileSystem);
        }
    }, [fileSystem]);

    const handleInputChange = useCallback((e) => {
        dispatch(setInput({
            terminalId: id,
            input: e.target.value
        }));
    }, [dispatch, id]);

    const handleKeyDownEvent = useCallback((e) => {
        if (!terminalState) return;
        handleInput(e, dispatch, {

            id,
            input: terminalState?.input || '',
            output: terminalState?.output || [],
            history: terminalState?.history || [],
            historyIndex: terminalState?.historyIndex || -1,
            currentPath: terminalState?.path || '/',
            role: terminalState?.role || 'guest',
            fileSystem: terminalState?.fileSystem,
            actions: {
                setPath,
                setRole,
                addOutput,
                clearOutput,
                setFileSystem,
                setInput,
                setSuggestions,
                setHistoryIndex,
                updateHistory,
                setIsEditing,
            }
        });
    }, [dispatch, terminalState, id]);


    useEffect(() => {
        const handleMouseMove = (e) => {
            if (isDragging) {
                const newX = e.clientX - offset.x;
                const newY = e.clientY - offset.y;
                const terminalWidth = terminalState?.refs?.terminal?.offsetWidth || 0;
                const terminalHeight = terminalState?.refs?.terminal?.offsetHeight || 0;

                // Screen boundaries
                const screenDimensions = {
                    left: terminalWidth,
                    bottom: window.innerHeight - terminalHeight / 2,
                    right: window.innerWidth - terminalWidth / 2,
                    top: window.innerHeight + terminalHeight / 2
                };

                // Constrain position within screen bounds
                setPosition({
                    x: Math.max(screenDimensions.left / 2,
                        Math.min(screenDimensions.right, newX)),
                    y: Math.max(200,
                        Math.min(screenDimensions.bottom, newY))
                });
            } else if (isResizing) {
                const newWidth = resizeDirection.includes('right') ?
                    e.clientX - position.x : dimensions.width;
                const newHeight = resizeDirection.includes('bottom') ?
                    e.clientY - position.y : dimensions.height;

                setDimensions({
                    width: Math.max(300, newWidth),
                    height: Math.max(200, newHeight)
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
    }, [isDragging, isResizing, offset, position.x, position.y, dimensions, resizeDirection]);

    const handleTerminalClick = useCallback((e) => {
        // Bring terminal to front
        dispatch(bringToFront(id));

        // Focus input unless clicking on a control button or dragging
        if (!e.target.closest('.window-controls') && !isDragging) {
            inputRef.current?.focus();
        }
    }, [dispatch, id, isDragging]);
    return (
        <>
            {terminalState?.isEditing && (
                <Editor id={id} />
            )}
            <Container
                terminalRef={terminalRef}
                isMinimized={isMinimized}
                isMaximized={isMaximized}
                position={position}
                zIndex={zIndex}
                dimensions={dimensions}
                handleTerminalClick={handleTerminalClick}
            >
                <Header
                    id={id}
                    position={position}
                    bringToFront={() => dispatch(bringToFront(id))}
                    setIsDragging={setIsDragging}
                    setOffset={setOffset}
                    handleMaximize={() => setIsMaximized(!isMaximized)}
                    isMaximized={isMaximized}
                    toggleMinimize={handleMinimize} // Pass the handleMinimize function

                />
                <TerminalComponent
                    content={content}
                    output={terminalState.output}
                    getPrompt={getPrompt}
                    currentPath={currentPath}
                    role={terminalState.role}
                    input={terminalState?.input || ''}
                    inputRef={inputRef}
                    handleInputChange={handleInputChange}
                    handleKeyDownEvent={handleKeyDownEvent}
                    isAwaitingPassword={terminalState.isAwaitingPassword}
                    id={id}
                />
            </Container>
        </>
    );
};

export default Terminal;