import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    removeTerminal, setDragging, bringToFront, setOffset, setMaximized, setDimensions,
    setPosition, setResizing, setResizeDirection,
    minimizeTerminal, setActiveTerminalId,
} from '../../../store/slices';

function Header({ id }) {

    const dispatch = useDispatch();
    const terminalState =
        useSelector((state) =>
            state.terminals.terminals.find((t) => t.id === id)
        ) || {};

    // Destructure with default values to avoid undefined errors
    const {
        isMaximized = false,
        isDragging = false,
        offset = { x: 0, y: 0 },
        refs = {},
        isResizing = false,
        resizeDirection = '',
        dimensions,
        isMinimized = false,
        position = {},
    } = terminalState;

    const handleMaximize = () => {
        dispatch(setMaximized({ terminalId: id, isMaximized: !isMaximized }))
    }

    const handleMinimize = useCallback(() => {
        dispatch(minimizeTerminal(id));
        dispatch(setActiveTerminalId(id));
    }, [dispatch, id, isMinimized]);

    const onClose = () => {
        dispatch(removeTerminal(id))
    }



    useEffect(() => {
        const handleMouseMove = (e) => {
            if (isDragging) {
                const newX = e.clientX - offset.x;
                const newY = e.clientY - offset.y;

                // Get window dimensions
                const windowWidth = window.innerWidth;
                const windowHeight = window.innerHeight;

                const taskbarHeight = document.querySelector('.taskbar')?.offsetHeight || 0;

                // Minimum distances from edges
                const minX = dimensions.width / 2 + 4;
                const minY = dimensions.height / 2 + 4;

                // Calculate boundaries considering terminal dimensions
                const maxX = windowWidth - dimensions.width / 2 - 4;
                const maxY = windowHeight - dimensions.height / 2 - taskbarHeight - 4;

                // Clamp position within boundaries (min and max)
                const clampedX = Math.max(minX, Math.min(maxX, newX));
                const clampedY = Math.max(minY, Math.min(maxY, newY));

                dispatch(setPosition({
                    terminalId: id,
                    position: {
                        x: clampedX,
                        y: clampedY
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