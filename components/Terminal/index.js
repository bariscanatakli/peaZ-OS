import React, { useState, useRef, useEffect, useCallback } from 'react';
import Editor from '../Editor';
import {
    handleCommand, handleInput, handleMouseMove, handleMouseUp,
    getPrompt, handleMaximize, handleMinimize
} from './functions';
import { fetchFileSystem, saveFileSystem } from '../../firebase/utils/fireStoreOperations';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { getDirectory } from './functions/helper';
import Container from './components/Container';
import Header from './components/Header';
import TerminalComponent from './components/Terminal';

const Terminal = ({ id, onClose, zIndex, bringToFront, toggleMinimize, initialPosition, 
    input: initialInput, output: initialOutput, isMinimized, userRole = 'guest', 
    setTerminals, content, initialPath = '/' }) => {
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
    const [currentPath, setCurrentPath] = useState(initialPath); // Use initialPath
    const [role, setRole] = useState(userRole);
    const [isAwaitingPassword, setIsAwaitingPassword] = useState(false);
    const [fileSystem, setFileSystem] = useState(null);
    const [uid, setUid] = useState(null);

    const [isEditing, setIsEditing] = useState(false);
    const [editingFile, setEditingFile] = useState(null);
    const [fileContent, setFileContent] = useState('');

    const handleSave = async (newContent) => {
        console.log('Saving file:', editingFile);
        if (!fileSystem || !fileSystem['~'].content) {
            setOutput(prev => [...prev, 'Error: File system is not initialized.']);
            return;
        }
        const file = getDirectory(fileSystem, editingFile);
        if (!file) {
            setOutput(prev => [...prev, `Error: File '${editingFile}' not found.`]);
            setIsEditing(false);
            return;
        }
        file.content = newContent;
        setFileSystem({ ...fileSystem });
        await saveFileSystem(fileSystem);
        setOutput(prev => [...prev, `File '${editingFile}' saved.`]);
        setIsEditing(false);
        setEditingFile(null);
        setFileContent('');
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditingFile(null);
    };

    useEffect(() => {
        const initializeFileSystem = async () => {
            try {
                const fs = await fetchFileSystem();
                if (fs) {
                    setFileSystem(fs);
                } else {
                    console.error('Error fetching file system.');
                }

            } catch (error) {
                console.error('Error initializing file system:', error);
            }
        };
        initializeFileSystem();
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUid(user.uid);
                try {
                    await user.getIdToken(true); // Force refresh to get latest claims
                    const token = await user.getIdTokenResult();
                    console.log('User role:', token.claims.role || 'guest');
                    setRole(token.claims.role || 'guest');
                    setOutput(prev => [...prev, `Logged in as ${token.claims.role || 'guest'}.`]);
                } catch (error) {
                    console.error('Error refreshing token:', error);
                    setRole('guest');
                    setOutput(prev => [...prev, 'Error refreshing token. Defaulting to guest.']);
                }
            } else {
                setUid(null);
                setRole('guest');
                setOutput(prev => [...prev, 'No user is signed in. Operating as guest.']);
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (fileSystem) {
            saveFileSystem(fileSystem);
        }
    }, [fileSystem]);

    const handleInputChange = useCallback((e) => {
        setInput(e.target.value);
    }, []);

    const handleKeyDownEvent = useCallback(
        (e) => {
            handleInput(
                e,
                async (cmd) => {
                    if (cmd === 'PASSWORD_PROMPT') {
                        setIsAwaitingPassword(true);
                        return;
                    }
                    handleCommand(cmd, setOutput, setHistory, currentPath, fileSystem, setCurrentPath, history, role, setRole, setTerminals, id, setIsEditing, setEditingFile, setFileContent);
                    setIsAwaitingPassword(false);
                },
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
                setCurrentPath,
                setTerminals,
                setIsEditing,
                setEditingFile,
                setFileContent,
            );
        },
        [input, history, historyIndex, fileSystem, currentPath, role, isAwaitingPassword]
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

    const handleTerminalClick = () => {
        bringToFront();
        // Only focus input if we're not showing HTML content
        if (!content && inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <>
            {isEditing && (<Editor fileName={editingFile.split('/').pop()} fileContent={fileContent} onSave={handleSave} onCancel={handleCancel} />)}
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
                    bringToFront={() => bringToFront()}
                    setIsDragging={setIsDragging}
                    setOffset={setOffset}
                    handleMaximize={handleMaximize}
                    setIsMaximized={setIsMaximized}
                    isMaximized={isMaximized}
                    id={id}
                    toggleMinimize={toggleMinimize}
                    position={position}
                    onClose={() => onClose(id, setTerminals)}
                    handleMinimize={() => handleMinimize(id, toggleMinimize)}
                />
                <TerminalComponent
                    content={content}
                    output={output}
                    input={input}
                    inputRef={inputRef}
                    handleInputChange={handleInputChange}
                    handleKeyDownEvent={handleKeyDownEvent}
                    getPrompt={getPrompt}
                    currentPath={currentPath}
                    role={role}
                />
            </Container>

        </>

    );
};

export default Terminal;