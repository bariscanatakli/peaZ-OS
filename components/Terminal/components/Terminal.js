import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTerminal, setActiveProject, setContent, setFileContent } from '../../../store/slices';
import Input from './Terminal/Input';
import Output from './Terminal/Output';


import { fetchFileSystem } from '@/firebase/utils/fireStoreOperations';

function TerminalComponent({ id }) {
  const dispatch = useDispatch();
  const terminals = useSelector((state) => state.terminals.terminals);
  const terminalsRef = useRef(terminals);

  // Keep terminalsRef updated with the latest terminals from Redux
  useEffect(() => {
    terminalsRef.current = terminals;
  }, [terminals]);

  // Removed "terminals" from dependency array to prevent multiple subscriptions at mount
  useEffect(() => {
    const handleMessage = async (event) => {
      if (event.data.type === 'CREATE_TERMINAL') {
        try {
          const fs = await fetchFileSystem();
          const html = fs?.["~"]?.["content"]?.["projects"]?.["content"][event.data.path]?.["content"];

          // Use terminalsRef.current to check for an existing terminal
          const existing = terminalsRef.current.find(t => t.path === event.data.path);
          if (!existing && html) {
            const newTerminalId = Date.now();
            dispatch(addTerminal({
              id: newTerminalId,
              path: event.data.path,
              project: event.data.project,
              content: html
            }));
          }
        } catch (error) {
          console.error('Failed to load project:', error);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [dispatch]);

  const terminalState = useSelector(state =>
    state.terminals.terminals.find(t => t.id === id)
  );
  const { content } = terminalState;
  // console.log(content);


  return (
    <div className="terminal">
      {content ? (
        <iframe
          srcDoc={content}
          // title={project}
          style={{
            width: '100%',
            height: '100%',
            border: 'none'
          }}
        />
      ) : (
        <>
          <Output id={id} output={terminalState.output} path={terminalState.path} />
          <Input id={id} />
        </>
      )}
    </div>
  );
}

export default TerminalComponent;