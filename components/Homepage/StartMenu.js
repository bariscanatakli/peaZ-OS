import React, { forwardRef } from 'react';

const StartMenu = forwardRef(({ onAddTerminal, onClose, setPath }, ref) => {
    console.log(onAddTerminal)
    const menuItems = [
        { label: 'New Terminal', path: '/' },
        { label: 'About', path: '/about' },
        { label: 'Skills', path: '/skills' },
        { label: 'Projects', path: '/projects' },
        { label: 'Contact', path: '/contact' }
    ];

    const handleMenuClick = (path) => {
        console.log(path)
        setPath(path)
        onAddTerminal(path);
        onClose();
    };

    return (
        <ul
            className="start-menu"
            ref={ref}
            style={{
                position: 'absolute',
                bottom: '32px',
                left: '-8px',
                zIndex: 1001,
            }}
            onMouseLeave={onClose}
        >
            {menuItems.map((item, index) => (
                <li
                    key={index}
                    onClick={() => handleMenuClick(item.path)}
                    className="start-menu-item"
                >
                    {item.label}
                </li>
            ))}
        </ul>
    );
});

StartMenu.displayName = 'StartMenu';

export default StartMenu;