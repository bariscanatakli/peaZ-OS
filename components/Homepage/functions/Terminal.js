export const addTerminal = (role, setTerminals, terminals, currentZIndex, setCurrentZIndex,
    positionOffset, setPositionOffset, setActiveTerminalId, initialPath = '/') => {

    const newTerminal = {
        id: Date.now(),
        zIndex: currentZIndex,
        isMinimized: false,
        position: {
            x: window.innerWidth / 2 + positionOffset,
            y: window.innerHeight / 2 + positionOffset,
        },
        input: '',
        output: ['Welcome to the terminal! Type "help" for available commands'],
        role: role,
        initialPath: initialPath // Store initial path
    };

    setTerminals(prevTerminals => [...prevTerminals, newTerminal]);
    setCurrentZIndex(prev => prev + 1);
    setPositionOffset(prev => prev + 20);
    setActiveTerminalId(newTerminal.id);
};
export const removeTerminal = (id, setTerminals, terminals, activeTerminalId, setActiveTerminalId) => {
    setTerminals(terminals.filter((terminal) => terminal.id !== id));
    if (activeTerminalId === id) {
        setActiveTerminalId(null);
    }
};

export const bringTheTerminalFront = (id, setTerminals, currentZIndex, setCurrentZIndex, setActiveTerminalId) => {
    setTerminals((prevTerminals) =>
        prevTerminals.map((terminal) =>
            terminal.id === id ? { ...terminal, zIndex: currentZIndex } : terminal
        )
    );
    setCurrentZIndex(currentZIndex + 1);
    setActiveTerminalId(id);
};

export const minimizeTerminal = (id, setTerminals, activeTerminalId, setActiveTerminalId) => {
    setTerminals((prevTerminals) =>
        prevTerminals.map((terminal) =>
            terminal.id === id ? { ...terminal, isMinimized: !terminal.isMinimized } : terminal
        )
    );
    if (activeTerminalId === id) {
        setActiveTerminalId(null);
    }
};

export const handleOpenTerminal = (id, setTerminals) => {
    setTerminals((prevTerminals) =>
        prevTerminals.map((terminal) =>
            terminal.id === id ? { ...terminal, isMinimized: false } : terminal
        )
    );

};