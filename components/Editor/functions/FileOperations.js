const handleSave = async (newContent) => {

    if (!fileSystem || !fileSystem['~'].content) {
        setOutput(prev => [...prev, 'Error: File system is not initialized.']);
        return;
    }
    const file = getDirectory(fileSystem, editingFile);
    if (!file) {
        setOutput(prev => [...prev, `Error: File '${editingFile}' not found.`]);
        setIsEditing(false);
        return;
    }
    file.content = newContent;
    setFileSystem({ ...fileSystem });
    await saveFileSystem(fileSystem);
    setOutput(prev => [...prev, `File '${editingFile}' saved.`]);
    setIsEditing(false);
    setEditingFile(null);
    setFileContent('');
};

