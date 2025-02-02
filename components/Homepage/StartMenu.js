import React, { forwardRef } from 'react';
import { useDispatch } from 'react-redux';
import { addTerminal, setPath } from '../../store/slices';

const StartMenu = forwardRef(({ onClose, setShowMenu }, ref) => {

    const dispatch = useDispatch();

    const menuItems = [
        { label: 'New Terminal', path: '/' },
        { label: 'About', path: '/about' },
        { label: 'Skills', path: '/skills' },
        { label: 'Projects', path: '/projects' },
        { label: 'Contact', path: '/contact' }
    ];

    const handleMenuClick = (selectedPath) => {
        const id = Date.now();
        const key = `terminal-${id}-${Math.random().toString(36).substr(2, 9)}`;
        dispatch(addTerminal({
            id,
            key,
            path: selectedPath
        }));
        // dispatch(setPath({ terminalId: id, path: selectedPath }));
        dispatch(setPath({ terminalId: id, path: selectedPath }));
        setShowMenu(false);
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