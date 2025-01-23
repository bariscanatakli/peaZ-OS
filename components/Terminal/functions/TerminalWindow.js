export const handleMouseMove = (e, terminalRef, setPosition,
    offset, isDragging, isResizing, resizeDirection, dimensions, setDimensions
) => {
    if (isDragging) {
        const newX = e.clientX - offset.x;
        const newY = e.clientY - offset.y;
        const terminalWidth = terminalRef.current ? terminalRef.current.offsetWidth : 0;
        const terminalHeight = terminalRef.current ? terminalRef.current.offsetHeight : 0;
        const screenDimensions = {
            left: terminalWidth, bottom: window.innerHeight - terminalHeight / 2,
            right: window.innerWidth - terminalWidth / 2, top: window.innerHeight + terminalHeight / 2
        };
        setPosition({
            x: newX < screenDimensions.left / 2 ? screenDimensions.left / 2 : newX > screenDimensions.right ? screenDimensions.right : newX,
            y: newY < 200 ? 200 : newY > screenDimensions.bottom ? screenDimensions.bottom : newY
        });
    } else if (isResizing) {
        const newWidth = resizeDirection.includes('right') ? e.clientX - position.x : dimensions.width;
        const newHeight = resizeDirection.includes('bottom') ? e.clientY - position.y : dimensions.height;
        setDimensions({
            width: newWidth > 300 ? newWidth : 300,
            height: newHeight > 200 ? newHeight : 200
        });
    }
};

export const handleMouseUp = (e, setIsDragging, setIsResizing, setResizeDirection) => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeDirection('');
}

export const handleClose = (id, onClose) => {
    onClose(id);
};

export const handleMinimize = (id, toggleMinimize) => {
    toggleMinimize(id);
};

export const handleMaximize = (setIsMaximized, isMaximized) => {
    setIsMaximized(!isMaximized);
};