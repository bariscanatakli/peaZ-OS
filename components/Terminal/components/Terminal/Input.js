import React, { useCallback } from 'react'

import { useSelector, useDispatch } from 'react-redux';
import { handleInput, getPrompt } from '../../functions';

import { setInputRef, setInput } from '../../../../store/slices';

function Input({ id }) {


    const dispatch = useDispatch();
    const terminalState = useSelector(state => state.terminals.terminals.find(t => t.id === id));
    const { role, input, path } = terminalState;
    
    const inputRef = useCallback(node => {
        if (node !== null) {
            dispatch(setInputRef({ terminalId: id, ref: node }));
        }
    }, [dispatch, id]);

    return (
        <div className="input-line">
            <span className="prompt">{getPrompt(path, role)}</span>
            <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => dispatch(setInput({ terminalId: id, input: e.target.value }))}
                onKeyDown={(e) => handleInput(e, dispatch, terminalState)}
                className="terminal-input"
            />
        </div>
    )
}

export default Input
