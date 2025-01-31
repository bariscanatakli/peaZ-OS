import React from 'react';
import Input from './Terminal/Input';
import Output from './Terminal/Output';
import { useSelector } from 'react-redux';

function TerminalComponent({ id }) {
  const terminalState = useSelector(state => 
    state.terminals.terminals.find(t => t.id === id)
  );
  const { content, contentType, output, role, path } = terminalState;

  return (
    <>
    
     <div className="terminal">
     
     {content && (
                
                
                <iframe srcDoc={content} title="HTML Viewer" style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    // backgroundColor: 'white',
                }}/>
            )}
            {!content && (
                <>
                    <Output id={id} output={output} path={path} role={role} />
                    <Input id={id} />
                </>
            )   }

    </div>
    </>
   
  );
}

export default TerminalComponent;