import React from 'react'
import Input from './Terminal/Input'
import Output from './Terminal/Output'
import { useSelector } from 'react-redux';

function TerminalComponent({ id }) {
    const terminalState = useSelector(state => state.terminals.terminals.find(t => t.id === id));
    const { content, output, role, currentPath } = terminalState;

    return (
        <div className="terminal">
            {content && (
                <div
                    className="html-viewer"
                    dangerouslySetInnerHTML={{ __html: content }}
                    style={{
                        width: '100%',
                        height: '100%',

                    }}
                />
            )}

            {!content && (
                <>
                    <Output id={id} output={output} currentPath={currentPath} role={role} />
                    <Input id={id} />
                </>
            )}

        </div>
    );
}

export default TerminalComponent;