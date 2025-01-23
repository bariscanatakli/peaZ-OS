import React, { forwardRef } from 'react';

const StartMenu = forwardRef(({ onAddTerminal, onClose }, ref) => {
    const handleMenuClick = (path) => {
        onAddTerminal(path);
        onClose();
    };

    return (
        <ul
            className="start-menu"
            ref={ref}
            style={{
                position: 'absolute',
                bottom: '32px', // Adjust based on taskbar height
                left: '-8px',    // Align with Start button
                zIndex: 1001,
            }}
            onMouseLeave={onClose}
        >
            <li onClick={onAddTerminal}>New Terminal</li>   
            <li onClick={() => handleMenuClick('about')}>About</li>
            <li onClick={() => handleMenuClick('skills')}>Skills</li>
            <li onClick={() => handleMenuClick('projects')}>Projects</li>
            <li onClick={() => handleMenuClick('contact')}>Contact</li>
        </ul>
    );
});

export default StartMenu;