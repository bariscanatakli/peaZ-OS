import React from 'react'
import { getPrompt } from '../../functions'

function Output({ output, path, role }) {
    
    return (
        <div className="terminal-output">
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
