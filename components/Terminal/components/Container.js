import React from 'react'

function Container({ children, terminalRef, isMinimized, isMaximized, position, zIndex, dimensions, handleTerminalClick }) {
    return (
        <div
            ref={terminalRef}
            className={`terminal-container ${isMinimized ? 'minimized' : ''} ${isMaximized ? 'maximized' : ''}`}
            style={{
                top: `${position.y}px`,
                left: `${position.x}px`,
                zIndex: zIndex,
                width: `${dimensions.width}px`,
                height: `${dimensions.height}px`
            }}
            onClick={handleTerminalClick}
        >
            {children}
        </div>
    )
}

export default Container