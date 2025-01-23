import React from 'react'
import { handleClose } from '../functions';

function Header({ id, position, handleMinimize, handleMaximize, bringToFront, setIsDragging
    , setOffset, isMaximized, setIsMaximized, toggleMinimize,
     onClose }) {

    return (
        <div
            className="terminal-header" s
            onMouseDown={(e) => {
                bringToFront();
                setIsDragging(true);
                setOffset({ 
                    x: e.clientX - position.x,
                    y: e.clientY - position.y
                });
            }}
            onDoubleClick={() => handleMaximize(setIsMaximized, isMaximized)}>
            <span>Terminal {id}</span>
            <div className="window-controls">
                <button className="control-button minimize" onClick={() => handleMinimize(id, toggleMinimize)}>–</button>
                <button className="control-button maximize" onClick={() => handleMaximize(setIsMaximized, isMaximized)}>
                    {isMaximized ? '🗗' : '▢'}
                </button>
                <button className="control-button close" onClick={() => handleClose(id, onClose)}>×</button>
            </div>

        </div>
    )
}

export default Header
