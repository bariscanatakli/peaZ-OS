import { auth } from '../../../firebase/firebase';
import { getDirectory, resolvePath } from './helper';
import { saveFileSystem } from '../../../firebase/utils/fireStoreOperations';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const commands = {
    // File System Commands
    ls: (args, fileSystem, currentPath) => {
        const currentDir = getDirectory(fileSystem, currentPath);
        if (!currentDir || currentDir.type !== 'dir') {
            return `ls: cannot access '${currentPath}': No such directory`;
        }
        const items = Object.keys(currentDir.content);
        return items.length > 0 ? items.join('  ') : '';
    },

    cd: (args, fileSystem, currentPath, setCurrentPath) => {
        if (args.length === 0) return 'cd: missing operand';
        const targetPath = args[0];
        const resolvedPath = resolvePath(currentPath, targetPath);
        const dir = getDirectory(fileSystem, resolvedPath);
        if (dir && dir.type === 'dir') {
            setCurrentPath(resolvedPath);
            return null;
        }
        return `cd: no such file or directory: ${targetPath}`;
    },

    mkdir: async (args, fileSystem, currentPath, role) => {
        if (role !== 'admin') return 'mkdir: permission denied';
        if (args.length === 0) return 'mkdir: missing operand';
        const dirName = args[0];
        const parentDir = getDirectory(fileSystem, currentPath);
        if (!parentDir) return `mkdir: cannot create directory '${dirName}': No such directory`;
        if (parentDir.content[dirName]) return `mkdir: cannot create directory '${dirName}': File exists`;
        
        parentDir.content[dirName] = { type: 'dir', content: {} };
        await saveFileSystem(fileSystem);
        return null;
    },

    touch: async (args, fileSystem, currentPath, role) => {
        if (role !== 'admin') return 'touch: permission denied';
        if (args.length === 0) return 'touch: missing file operand';
        const fileName = args[0];
        const parentDir = getDirectory(fileSystem, currentPath);
        if (!parentDir) return `touch: cannot create file '${fileName}': No such directory`;
        
        if (!parentDir.content[fileName]) {
            parentDir.content[fileName] = { type: 'file', content: '' };
            await saveFileSystem(fileSystem);
        }
        return null;
    },

    rm: async (args, fileSystem, currentPath, role) => {
        console.log(role)
        if (role !== 'admin') return 'rm: permission denied';
        if (args.length === 0) return 'rm: missing operand';
        const target = args[0];
        const parentDir = getDirectory(fileSystem, currentPath);
        if (!parentDir) return `rm: cannot remove '${target}': No such directory`;
        if (!parentDir.content[target]) return `rm: cannot remove '${target}': No such file or directory`;
        
        delete parentDir.content[target];
        await saveFileSystem(fileSystem);
        return null;
    },

    // File Operations
    cat: (args, fileSystem, currentPath) => {
        if (args.length === 0) return 'cat: missing file operand';
        const fileName = args[0];
        const parentDir = getDirectory(fileSystem, currentPath);
        if (!parentDir || parentDir.type !== 'dir') return `cat: ${fileName}: No such directory`;
        
        const file = parentDir.content[fileName];
        if (!file) return `cat: ${fileName}: No such file`;
        if (file.type !== 'file') return `cat: ${fileName}: Is a directory`;
        return file.content || '';
    },

    edit: async (args, fileSystem, currentPath, role, setRole, setOutput, setIsEditing, setEditingFile, setFileContent) => {
        if (role !== 'admin') return 'edit: permission denied';
        if (args.length === 0) return 'edit: missing file operand';
        const fileName = args[0];
        const resolvedPath = resolvePath(currentPath, fileName);
        const file = getDirectory(fileSystem, resolvedPath);
        
        if (!file) return `edit: cannot find '${fileName}'`;
        if (file.type !== 'file') return `edit: '${fileName}' is not a file`;
        
        setEditingFile(resolvedPath);
        setFileContent(file.content);
        setIsEditing(true);
        return null;
    },

    // Authentication Commands
    sudo: async (args, fileSystem, currentPath, role, setRole, setOutput) => {
        if (args[0] === 'su' && args[1] === '-') {
            setOutput(prev => [...prev, 'Password:']);
            return 'PASSWORD_PROMPT';
        }
        return `sudo: command not found: ${args[0]}`;
    },

    logout: (args, fileSystem, currentPath, role, setRole, setOutput) => {
        if (role !== 'admin') return 'logout: not logged in as admin';
        setRole('guest');
        setOutput(prev => [...prev, 'Switched to guest user.']);
        return null;
    },

    authenticate: async (args, setRole, setOutput) => {
        const [email, password] = args;
        if (!email || !password) return 'Usage: authenticate <email> <password>';
        
        try {
            await signInWithEmailAndPassword(auth, email, password);
            const tokenResult = await auth.currentUser.getIdTokenResult();
            setRole(tokenResult.claims.role || 'guest');
            setOutput(prev => [...prev, `Logged in as ${tokenResult.claims.role || 'guest'}.`]);
        } catch (error) {
            console.error('Authentication error:', error);
            setOutput(prev => [...prev, 'Authentication failed.']);
        }
        return null;
    },

    show: async (args, fileSystem, currentPath, setTerminals) => {
        if (args.length === 0) return 'show: missing file operand';
        const fileName = args[0];
        const parentDir = getDirectory(fileSystem, currentPath);
        if (!parentDir || parentDir.type !== 'dir') return `show: ${fileName}: No such directory`;
        
        const file = parentDir.content[fileName];
        if (!file) return `show: ${fileName}: No such file`;
        if (file.type !== 'file') return `show: ${fileName}: Is a directory`;
        
        // Create a new terminal with HTML content
        const newTerminal = {
            id: Date.now(),
            zIndex: 1000,
            isMinimized: false,
            position: {
                x: window.innerWidth / 2 + 50,
                y: window.innerHeight / 2 + 50,
            },
            input: '',
            output: [],
            content: file.content, // HTML content to render
        };
        
        setTerminals(prev => [...prev, newTerminal]);
        return `Opening ${fileName} in new window...`;
    },

    // Utility Commands
    clear: () => 'CLEAR_COMMAND',
    
    pwd: (args, fileSystem, currentPath) => currentPath,
    
    echo: (args) => args.join(' '),
    
    history: (args, fileSystem, currentPath, history) => {
        return history.length > 0 ? history.join('\n') : 'No commands in history';
    },

    help: () => {
        return `Available commands:
ls - list directory contents
cd - change directory
mkdir - create a new directory
touch - create a new file
rm - remove files or directories
cat - display file contents
edit - edit file contents
sudo su - switch to admin user
logout - switch back to guest user
clear - clear terminal screen
pwd - print working directory
echo - display a line of text
history - show command history
help - display this help message`;
    },

    exit: (args, setTerminals, currentTerminalId) => {
        setTerminals(prev => prev.filter(t => t.id !== currentTerminalId));
        return null;
    }
};