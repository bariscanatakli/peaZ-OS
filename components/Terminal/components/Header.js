import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    removeTerminal, setDragging, bringToFront, setOffset, setMaximized, setDimensions,
    setPosition, setResizing, setResizeDirection,
    minimizeTerminal, setActiveTerminalId,
} from '../../../store/slices';

function Header({ id }) {
    
    const dispatch = useDispatch();
    const { isMaximized, position, isDragging, offset, refs, isResizing, resizeDirection, dimensions, isMinimized } = useSelector(state => state.terminals.terminals.find(t => t.id === id));

    const handleMaximize = () => {
        dispatch(setMaximized({ terminalId: id, isMaximized: !isMaximized }))
    }

    const handleMinimize = useCallback(() => {
        dispatch(minimizeTerminal(id));
        dispatch(setActiveTerminalId(isMinimized ? id : null));
    }, [dispatch, id, isMinimized]);

    const onClose = () => {
        dispatch(removeTerminal(id))
    }



    useEffect(() => {
        const handleMouseMove = (e) => {
            if (isDragging) {
                const newX = e.clientX - offset.x;
                const newY = e.clientY - offset.y;
                const terminalWidth = refs?.terminal?.offsetWidth || 0;
                const terminalHeight = refs?.terminal?.offsetHeight || 0;

                // Screen boundaries
                const screenDimensions = {
                    left: terminalWidth,
                    bottom: window.innerHeight - terminalHeight / 2,
                    right: window.innerWidth - terminalWidth / 2,
                    top: window.innerHeight + terminalHeight / 2
                };

                // Constrain position within screen bounds

                dispatch(setPosition({ terminalId: id, position: { x: Math.max(screenDimensions.left / 2, Math.min(screenDimensions.right, newX)), y: Math.max(200, Math.min(screenDimensions.bottom, newY)) } }));
            } else if (isResizing) {
                const newWidth = resizeDirection.includes('right') ?
                    e.clientX - position.x : dimensions.width;
                const newHeight = resizeDirection.includes('bottom') ?
                    e.clientY - position.y : dimensions.height;

                dispatch(setDimensions({
                    terminalId: id,
                    dimensions: {
                        width: Math.max(300, newWidth),
                        height: Math.max(200, newHeight)
                    }
                }));
            }
        };

        const handleMouseUp = () => {
            dispatch(setDragging({ terminalId: id, isDragging: false }));
            dispatch(setResizing({ terminalId: id, isResizing: false }));
            dispatch(setResizeDirection({ terminalId: id, resizeDirection: '' }));
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



    return (
        <div
            className="terminal-header"
            onMouseDown={(e) => {
                e.preventDefault(); // Prevent text selection
                if (!position) return;
                dispatch(bringToFront(id))
                dispatch(setDragging({ terminalId: id, isDragging: true }));
                dispatch(setOffset({ terminalId: id, offset: { x: e.clientX - position.x, y: e.clientY - position.y } }));
            }}
            onDoubleClick={handleMaximize}
        >
            <span>Terminal {id}</span>
            <div className="window-controls">
                <button
                    className="control-button minimize"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleMinimize();
                    }}
                >–</button>
                <button className="control-button maximize" onClick={handleMaximize}>
                    {isMaximized ? '🗗' : '▢'}
                </button>
                <button className="control-button close" onClick={onClose}>×</button>
            </div>
        </div>
    );
}

export default Header;