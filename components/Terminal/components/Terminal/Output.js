import React, { useRef, useEffect } from 'react'
import { getPrompt } from '../../functions'

function Output({ output, path, role }) {
    const outputRef = useRef(null);

    const scrollToBottom = () => {
        if (outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [output]); // Scroll when output changes

    return (
        <div className="terminal-output" ref={outputRef}>
            {output.map((line, i) => (
                typeof line === 'string' && line.startsWith(getPrompt(path, role) + ' $') ? (
                    <div key={i} className="output-line">
                        <span className="prompt">{getPrompt(path, role)} $ </span>
                        <span className="command">{line.slice((getPrompt(path, role) + ' $ ').length)}</span>
                    </div>
                ) : (
                    <div key={i} className="output-line">
                        <span className="output">{line}</span>
                    </div>
                )
            ))}
        </div>
    )
}

export default Output