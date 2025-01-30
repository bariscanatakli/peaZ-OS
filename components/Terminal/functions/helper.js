export const getDirectory = (fileSystem, path = '/') => {
    if (!path || !fileSystem) return null;
    
    const parts = path.split('/').filter(Boolean);
    let current = fileSystem['~'];

    for (const part of parts) {
        if (part === '..') {
            // Handle parent directory
            parts.pop();
            continue;
        }
        if (!current || !current.content || !current.content[part]) {
            return null;
        }
        current = current.content[part];
    }
    return current;
};

export const resolvePath = (path = '/', targetPath = '/') => {
    if (typeof targetPath !== 'string') {
        console.error('resolvePath: targetPath is not a string', targetPath);
        return path;
    }

    if (typeof path !== 'string') {
        console.error('resolvePath: path is not a string', path);
        path = '/';
    }

    if (targetPath.startsWith('/')) {
        return targetPath;
    }

    const current = path.split('/').filter(Boolean);
    const target = targetPath.split('/').filter(Boolean);

    for (const part of target) {
        if (part === '..') {
            current.pop();
        } else if (part !== '.') {
            current.push(part);
        }
    }

    return '/' + current.join('/');
};