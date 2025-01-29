import React, { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { markdown } from '@codemirror/lang-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { setFileContent, setIsEditing, setEditingFile, setFileSystem } from '../../store/slices';
import { saveFileSystem } from '../../firebase/utils/fireStoreOperations';
import { getDirectory } from '../Terminal/functions/helper';

const Editor = ({ id }) => {
    const dispatch = useDispatch();
    const terminalState = useSelector(state => state.terminals.terminals.find(t => t.id === id));
    const fileSystem = useSelector(state => state.terminals.fileSystem);
    const editingFile = terminalState?.editingFile;
    const fileName = editingFile?.split('/').pop();
    const fileContent = terminalState?.fileContent;

    // Ensure content is string
    const [content, setContent] = useState(
        typeof fileContent === 'string' ? fileContent : 
        typeof fileContent === 'object' ? JSON.stringify(fileContent, null, 2) : 
        ''
    );

    const handleSave = async () => {
        if (!editingFile) {
            console.error('No file being edited');
            return;
        }

        try {
            console.log('Starting save operation:', editingFile);
            
            if (!fileSystem || !fileSystem['~']) {
                throw new Error('File system not initialized');
            }
    
            const updatedFileSystem = JSON.parse(JSON.stringify(fileSystem));
            const currentPath = editingFile.substring(0, editingFile.lastIndexOf('/'));
            const fileName = editingFile.split('/').pop();
            
            const parentDir = getDirectory(updatedFileSystem, currentPath);
            if (!parentDir || !parentDir.content[fileName]) {
                throw new Error(`File ${editingFile} not found`);
            }
    
            parentDir.content[fileName].content = content;
            
            dispatch(setFileSystem({ fileSystem: updatedFileSystem }));
            await saveFileSystem(updatedFileSystem);

            dispatch(setIsEditing({ terminalId: id, isEditing: false }));
            dispatch(setEditingFile({ terminalId: id, editingFile: null }));
            dispatch(setFileContent({ terminalId: id, content: '' }));
    
        } catch (error) {
            console.error('Save error:', error);
        }
    };

    const handleCancel = () => {
        dispatch(setIsEditing({ terminalId: id, isEditing: false }));
        dispatch(setEditingFile({ terminalId: id, editingFile: null }));
        dispatch(setFileContent({ terminalId: id, content: '' }));
    };

    useEffect(() => {
        setContent(typeof fileContent === 'string' ? fileContent :
                  typeof fileContent === 'object' ? JSON.stringify(fileContent, null, 2) : 
                  '');
    }, [fileContent]);

    const onChange = React.useCallback((value) => {
        setContent(value);
    }, []);

    return (
        <div className="editor-overlay">
            <div className="editor-container">
                <div className="editor-header">
                    <span>Editing: {fileName}</span>
                    <div>
                        <button onClick={handleCancel}>Cancel</button>
                        <button onClick={handleSave}>Save</button>
                    </div>
                </div>
                <CodeMirror
                    value={content || ''}
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