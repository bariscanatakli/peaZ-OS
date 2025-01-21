// ...existing code...

export const getDirectory = (fileSystem, path) => {
    const parts = path.split('/').filter(part => part && part !== '~');
    let dir = fileSystem['~'];
    for (const part of parts) {
        const dirName = Object.keys(dir.content).find(
            name => name.toLowerCase() === part.toLowerCase() && dir.content[name].type === 'dir'
        );
        if (!dirName) {
            return null;
        }
        dir = dir.content[dirName];
    }
    return dir;
};

export const resolvePath = (fileSystem, currentPath, target) => {
    if (target === '~') {
        return '~';
    } else if (target === '..') {
        const parts = currentPath.split('/').filter(part => part && part !== '~');
        parts.pop();
        return parts.length > 0 ? `~/${parts.join('/')}` : '~';
    } else {
        const currentDir = getDirectory(fileSystem, currentPath);
        if (!currentDir) return null;
        const dirName = Object.keys(currentDir.content).find(
            name => name.toLowerCase() === target.toLowerCase() && currentDir.content[name].type === 'dir'
        );
        if (dirName) {
            return currentPath === '~' ? `~/${dirName}` : `${currentPath}/${dirName}`;
        }
        return null;
    }
};

// ...export and existing code...