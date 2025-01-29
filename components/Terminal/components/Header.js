import React from 'react'
import { useDispatch } from 'react-redux';
import { removeTerminal } from '../../../store/slices';

function Header({
    id,
    position,
    bringToFront,
    setIsDragging,
    setOffset,
    handleMaximize,
    isMaximized,
    toggleMinimize,
}) {
    const dispatch = useDispatch();


    const onClose = () => {
        dispatch(removeTerminal(id))
    }
    return (
        <div
            className="terminal-header"
            onMouseDown={(e) => {
                e.preventDefault(); // Prevent text selection
                if (!position) return;
                bringToFront();
                setIsDragging(true);
                setOffset({
                    x: e.clientX - position.x,
                    y: e.clientY - position.y
                });
            }}
            onDoubleClick={handleMaximize}
        >
            <span>Terminal {id}</span>
            <div className="window-controls">
                <button
                    className="control-button minimize"
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleMinimize();
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