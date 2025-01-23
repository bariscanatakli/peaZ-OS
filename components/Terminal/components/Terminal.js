import React from 'react'
import Input from './Terminal/Input'
import Output from './Terminal/Output'

function TerminalComponent({ content, output, getPrompt, currentPath, role, input, inputRef, handleInputChange, handleKeyDownEvent }) {
    return (
        <div className="terminal">
            {content ? (
                <iframe srcDoc={content} title="HTML Viewer" style={
                    {
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        backgroundColor: 'white',
                    
                    }
                } />
            ) : (
                <>
                    <Output output={output} getPrompt={getPrompt} currentPath={currentPath} role={role} />
                    <Input
                        currentPath={currentPath}
                        role={role} inputRef={inputRef} input={input}
                        handleInputChange={handleInputChange}
                        handleKeyDownEvent={handleKeyDownEvent}
                        getPrompt={getPrompt}
                    />
                </>
            )}
        </div>
    )
}

export default TerminalComponent
