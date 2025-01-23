import React, { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { markdown } from '@codemirror/lang-markdown';

const Editor = ({ fileName, fileContent, onSave, onCancel }) => {
    const [content, setContent] = useState(fileContent || '');

    useEffect(() => {
        setContent(fileContent);
    }, [fileContent]);

    const handleSave = () => {
        onSave(content);
    };

    const onChange = React.useCallback((value) => {
        setContent(value);
    }, []);

    return (
        <div className="editor-overlay">
            <div className="editor-container">
                <div className="editor-header">
                    <span>Editing: {fileName}</span>
                    <div>
                        <button onClick={onCancel}>Cancel</button>
                        <button onClick={handleSave}>Save</button>
                    </div>
                </div>
                <CodeMirror
                    value={content}
                    height="400px"
                    theme="dark"
                    extensions={[markdown()]}
                    onChange={onChange}
                />
            </div>
        </div>
    );
};

export default Editor;