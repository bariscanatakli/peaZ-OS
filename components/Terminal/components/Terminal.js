import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTerminal, setActiveProject, setContent, setFileContent } from '../../../store/slices';
import Input from './Terminal/Input';
import Output from './Terminal/Output';

import { fetchFileSystem } from '@/firebase/utils/fireStoreOperations';

function TerminalComponent({ id }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleMessage = async (event) => {
      console.log(event);
      if (event.data.type === 'CREATE_TERMINAL') {
        try {

          const fs = await fetchFileSystem();
          // console.log(fs?.["~"]?.["content"]?.["projects"]?.["content"]["netscope.html"]?.["content"]);

          console.log(event);


          const html = fs?.["~"]?.["content"]?.["projects"]?.["content"][event.data.path]?.["content"]

          const response = await fetch(`${event.path}`);

          // console.log(response);

          // const html = await response.text();

          // Only create new terminal if we have valid HTML content
          if (html) {
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
  const activeProject = useSelector(state => state.terminals.activeProject);

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