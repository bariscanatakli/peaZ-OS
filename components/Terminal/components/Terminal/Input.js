import React from 'react'

function Input({ getPrompt, currentPath, role, input, setInput, inputRef, handleInputChange, handleKeyDownEvent })   {
    return (
        <div className="input-line">
            <span className="prompt">{getPrompt(currentPath, role)} $ </span>
            <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDownEvent}
                className="terminal-input"
            />
        </div>
    )
}

export default Input
