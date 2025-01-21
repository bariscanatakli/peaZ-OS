import { getDirectory, resolvePath } from './helper';

export const commands = {
    ls: (args, fileSystem, currentPath) => {
        const currentDir = getDirectory(fileSystem, currentPath);
        if (!currentDir || currentDir.type !== 'dir') {
            return `ls: cannot access '${currentPath}': No such directory`;
        }
        const items = Object.keys(currentDir.content);
        return items.length > 0 ? items.join('  ') : '';
    },
    cd: (args, fileSystem, currentPath, setCurrentPath) => {
        if (args.length === 0) {
            return 'cd: missing operand';
        }
        const target = args[0];
        const newPath = resolvePath(fileSystem, currentPath, target);
        if (!newPath) {
            return `cd: no such directory: ${target}`;
        }
        const targetDir = getDirectory(fileSystem, newPath);
        if (targetDir && targetDir.type === 'dir') {
            setCurrentPath(newPath);
            return null;
        } else {
            return `cd: no such directory: ${target}`;
        }
    },
    mkdir: (args, fileSystem, currentPath) => {
        if (args.length === 0) {
            return 'mkdir: missing operand';
        }
        const dirName = args[0];
        const newPath = currentPath === '~' ? `~/${dirName}` : `${currentPath}/${dirName}`;
        const parentDir = getDirectory(fileSystem, currentPath);
        if (!parentDir) {
            return `mkdir: cannot create directory '${dirName}': No such directory`;
        }
        if (parentDir.content[dirName]) {
            return `mkdir: cannot create directory '${dirName}': File exists`;
        }
        parentDir.content[dirName] = { type: 'dir', content: {} };
        return null;
    },
    rm: (args, fileSystem, currentPath) => {
        if (args.length === 0) {
            return 'rm: missing operand';
        }
        const target = args[0];
        const parentPath = currentPath;
        const parentDir = getDirectory(fileSystem, parentPath);
        if (!parentDir) {
            return `rm: cannot remove '${target}': No such directory`;
        }
        if (!parentDir.content[target]) {
            return `rm: cannot remove '${target}': No such file or directory`;
        }
        delete parentDir.content[target];
        return null;
    },
    touch: (args, fileSystem, currentPath) => {
        if (args.length === 0) {
            return 'touch: missing file operand';
        }
        const fileName = args[0];
        const parentDir = getDirectory(fileSystem, currentPath);
        if (!parentDir) {
            return `touch: cannot create file '${fileName}': No such directory`;
        }
        if (!parentDir.content[fileName]) {
            parentDir.content[fileName] = { type: 'file', content: '' };
        }
        return null;
    },
    echo: (args) => {
        return args.join(' ');
    },
    pwd: (args, fileSystem, currentPath) => {
        return currentPath;
    },
    cat: (args, fileSystem, currentPath) => {
        if (args.length === 0) {
            return 'cat: missing file operand';
        }
        const fileName = args[0];
        const parentDir = getDirectory(fileSystem, currentPath);
        if (!parentDir || parentDir.type !== 'dir') {
            return `cat: ${fileName}: No such directory`;
        }
        const file = parentDir.content[fileName];
        if (!file) {
            return `cat: ${fileName}: No such file`;
        }
        if (file.type !== 'file') {
            return `cat: ${fileName}: Is a directory`;
        }
        return file.content || '';
    },
    history: (args, fileSystem, currentPath, history) => {
        return history.length > 0 ? history.join('\n') : 'No commands in history';
    },
    clear: () => {
        return 'CLEAR_COMMAND';
    },
    mv: (args, fileSystem, currentPath) => {
        if (args.length < 2) {
            return 'mv: missing file operand';
        }
        const [source, destination] = args;
        const parentDir = getDirectory(fileSystem, currentPath);
        if (!parentDir) {
            return `mv: cannot move '${source}': No such directory`;
        }
        if (!parentDir.content[source]) {
            return `mv: cannot move '${source}': No such file or directory`;
        }
        if (parentDir.content[destination]) {
            return `mv: cannot move '${source}': Destination '${destination}' already exists`;
        }
        parentDir.content[destination] = parentDir.content[source];
        delete parentDir.content[source];
        return null;
    },
    cp: (args, fileSystem, currentPath) => {
        if (args.length < 2) {
            return 'cp: missing file operand';
        }
        const [source, destination] = args;
        const parentDir = getDirectory(fileSystem, currentPath);
        if (!parentDir) {
            return `cp: cannot copy '${source}': No such directory`;
        }
        const sourceFile = parentDir.content[source];
        if (!sourceFile) {
            return `cp: cannot copy '${source}': No such file or directory`;
        }
        if (parentDir.content[destination]) {
            return `cp: cannot copy '${source}': Destination '${destination}' already exists`;
        }
        // Deep copy for directories
        const copy = JSON.parse(JSON.stringify(sourceFile));
        parentDir.content[destination] = copy;
        return null;
    },
    grep: (args, fileSystem, currentPath) => {
        if (args.length < 2) {
            return 'grep: missing search pattern or file operand';
        }
        const [pattern, ...files] = args;
        let result = '';
        const parentDir = getDirectory(fileSystem, currentPath);
        if (!parentDir) {
            return `grep: No such directory: ${currentPath}`;
        }
        files.forEach(fileName => {
            const file = parentDir.content[fileName];
            if (!file) {
                result += `grep: ${fileName}: No such file or directory\n`;
                return;
            }
            if (file.type !== 'file') {
                result += `grep: ${fileName}: Is a directory\n`;
                return;
            }
            const lines = file.content.split('\n');
            lines.forEach((line, index) => {
                if (line.includes(pattern)) {
                    result += `${fileName}:${index + 1}:${line}\n`;
                }
            });
        });
        return result || 'No matches found';
    },
    help: () => {
        return `Available commands:
ls - list directory contents
cd - change directory
mkdir - create a new directory
rm - remove files or directories
touch - create a new file
echo - display a line of text
pwd - print working directory
cat - display file contents
history - show command history
clear - clear the terminal
mv - move or rename a file/directory
cp - copy a file/directory
grep - search text using patterns
help - show available commands
exit - close terminal`;
    },
    exit: () => {
        return 'EXIT_COMMAND';
    },
};