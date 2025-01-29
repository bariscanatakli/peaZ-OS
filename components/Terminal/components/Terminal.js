import React from 'react'
import Input from './Terminal/Input'
import Output from './Terminal/Output'

function TerminalComponent({ 
    content, 
    output,
    getPrompt, 
    currentPath, 
    role, 
    input, 
    inputRef, 
    handleInputChange, 
    handleKeyDownEvent, 
    isAwaitingPassword, 
    id 
}) {

    return (
        <div className="terminal">
            {content ? (
                <div 
                    className="html-viewer"
                    dangerouslySetInnerHTML={{ __html: content }}
                    style={{
                        width: '100%',
                        height: '100%',
                      
                    }}
                />
            ) : (
                <>
                    <Output output={output} getPrompt={getPrompt} currentPath={currentPath} role={role} />
                    <Input
                        getPrompt={getPrompt}
                        currentPath={currentPath}
                        role={role}
                        input={input}
                        inputRef={inputRef}
                        handleInputChange={handleInputChange}
                        handleKeyDownEvent={handleKeyDownEvent}
                        type={isAwaitingPassword ? "password" : "text"}
                    />
                </>
            )}
        </div>
    );
}

export default TerminalComponent;