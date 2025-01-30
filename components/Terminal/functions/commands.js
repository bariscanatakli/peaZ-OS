import { auth } from '../../../firebase/firebase';
import { getDirectory, resolvePath } from './helper';
import { saveFileSystem } from '../../../firebase/utils/fireStoreOperations';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {
    addTerminal,
    setRole,
    setOutput,
    addOutput,
    setFileSystem,
    setEditingFile,
    setFileContent,
    setIsEditing,
    setPasswordPrompt,
    setAwaitingPassword,
    setPath,
    setSuggestions,
    setHistoryIndex,
    updateHistory,
    clearOutput,
} from '../../../store/slices';
const systemDirs = ['.', '..', '.git', 'node_modules'];

export const commands = {
    // File System Commands
    ls: (args, fileSystem, path, dispatch, role, state) => {
        if (!fileSystem || !fileSystem['~']) {
            return 'ls: file system not initialized';
        }
    
        const targetPath = args[0] || path || '/';
        const targetDir = getDirectory(fileSystem, targetPath);
    
        if (!targetDir || targetDir.type !== 'dir') {
            return `ls: cannot access '${targetPath}': No such directory`;
        }
    
        // Filter out system directories unless user is admin
        const items = Object.keys(targetDir.content).filter(item => {
            if (role === 'admin') return true;
            return !systemDirs.includes(item);
        }); 
    
        return items.length > 0 ? items.join('  ') : '';
    },

    cd: (args, fileSystem, path, dispatch, role, state) => {
        if (args.length === 0) return 'cd: missing operand';
        const targetPath = args[0];
        const resolvedPath = resolvePath(path, targetPath);
        const dir = getDirectory(fileSystem, resolvedPath);
    
        if (dir && dir.type === 'dir') {
            // Debug: log terminalId and resolvedPath
            console.log('Dispatching setPath with terminalId:', state.id, 'resolvedPath:', resolvedPath);
            dispatch(setPath({ terminalId: state.id, path: resolvedPath }));
            return `Changed directory to ${resolvedPath}`;
        }
        return `cd: no such file or directory: ${targetPath}`;
    },

    mkdir: async (args, fileSystem, path, dispatch, role, state) => {
        if (role !== 'admin') return 'mkdir: permission denied';
        if (args.length === 0) return 'mkdir: missing operand';

        const dirName = args[0];
        const updatedFileSystem = JSON.parse(JSON.stringify(fileSystem));
        const parentDir = getDirectory(updatedFileSystem, path);

        if (!parentDir) {
            return `mkdir: cannot create directory '${dirName}': No such directory`;
        }

        parentDir.content[dirName] = { type: 'dir', content: {} };

        // Update Redux state
        dispatch(setFileSystem({ fileSystem: updatedFileSystem }));

        // Save to Firebase
        await saveFileSystem(updatedFileSystem);

        return `Directory '${dirName}' created successfully`;
    },

    touch: async (args, fileSystem, path, dispatch, role, actions) => {
        console.log("Debug touch - role:", role); // Debug log

        if (role !== 'admin') {
            return 'touch: permission denied';
        }

        if (args.length === 0) {
            return 'touch: missing file operand';
        }

        const fileName = args[0];
        const parentDir = getDirectory(fileSystem, path);

        if (!parentDir) {
            return `touch: cannot create file '${fileName}': No such directory`;
        }

        // Create deep copy of fileSystem
        const updatedFileSystem = JSON.parse(JSON.stringify(fileSystem));
        const updatedParentDir = getDirectory(updatedFileSystem, path);

        if (!updatedParentDir.content[fileName]) {
            updatedParentDir.content[fileName] = { type: 'file', content: '' };

            // Update Redux state
            dispatch(setFileSystem({ fileSystem: updatedFileSystem }));

            // Save to Firebase
            await saveFileSystem(updatedFileSystem);
        }

        return `File '${fileName}' created successfully`;
    },

    rm: async (args, fileSystem, path, dispatch, role) => {
        if (role !== 'admin') {
            return 'rm: permission denied';
        }
    
        if (args.length === 0) {
            return 'rm: missing operand';
        }
    
        const fileName = args[0];
        const recursive = args.includes('-r') || args.includes('-R');
        const parentDir = getDirectory(fileSystem, path);
    
        if (!parentDir) {
            return `rm: cannot remove '${fileName}': No such directory`;
        }
    
        // Create deep copy of fileSystem
        const updatedFileSystem = JSON.parse(JSON.stringify(fileSystem));
        const updatedParentDir = getDirectory(updatedFileSystem, path);
    
        if (!updatedParentDir.content[fileName]) {
            return `rm: cannot remove '${fileName}': No such file or directory`;
        }
    
        if (updatedParentDir.content[fileName].type === 'dir' && !recursive) {
            return `rm: cannot remove '${fileName}': Is a directory`;
        }
    
        // Delete file/directory
        delete updatedParentDir.content[fileName];
    
        // Update Redux state using setFileSystem action
        dispatch(setFileSystem({ fileSystem: updatedFileSystem }));
    
        // Save to Firebase
        await saveFileSystem(updatedFileSystem);
    
        return `'${fileName}' removed successfully`;
    },

    // File Operations
    cat: (args, fileSystem, path) => {
        if (args.length === 0) return 'cat: missing file operand';
        const fileName = args[0];
        const parentDir = getDirectory(fileSystem, path);
        if (!parentDir || parentDir.type !== 'dir') return `cat: ${fileName}: No such directory`;

        const file = parentDir.content[fileName];
        if (!file) return `cat: ${fileName}: No such file`;
        if (file.type !== 'file') return `cat: ${fileName}: Is a directory`;
        return file.content || '';
    },

    edit: async (args, fileSystem, path, dispatch, role, state) => {
        if (!state || !state.id) {
            return 'edit: terminal state not initialized';
        }

        if (role !== 'admin') {
            return 'edit: permission denied';
        }

        if (args.length === 0) {
            return 'edit: missing file operand';
        }

        const fileName = args[0];
        const resolvedPath = resolvePath(path, fileName);
        const file = getDirectory(fileSystem, resolvedPath);

        if (!file) {
            return `edit: cannot find '${fileName}'`;
        }

        if (file.type !== 'file') {
            return `edit: '${fileName}' is not a file`;
        }

        try {
            dispatch(setEditingFile({
                terminalId: state.id,
                editingFile: resolvedPath
            }));

            dispatch(setFileContent({
                terminalId: state.id,
                content: file.content
            }));

            dispatch(setIsEditing({
                terminalId: state.id,
                isEditing: true
            }));

            return null;
        } catch (error) {
            console.error('Edit error:', error);
            return 'edit: failed to open file';
        }
    },

    // Authentication Commands
    authenticate: async (args, fileSystem, path, dispatch, role, actions) => {
        const [email, password] = args;
        if (!email || !password) return 'Usage: authenticate <email> <password>';

        try {
            await signInWithEmailAndPassword(auth, email, password);
            const tokenResult = await auth.currentUser.getIdTokenResult();

            // Dispatch role update
            dispatch(setRole(tokenResult.claims.role || 'guest'));
            dispatch(addOutput(`Logged in as ${tokenResult.claims.role || 'guest'}.`));
            return null;
        } catch (error) {
            console.error('Authentication error:', error);
            return 'Authentication failed.';
        }
    },

    login: async (args, fileSystem, path, dispatch, role, state) => {
        if (args.length !== 2) {
            return 'Usage: login <username> <password>';
        }

        const [username, password] = args;

        try {
            // Attempt Firebase authentication
            const userCredential = await signInWithEmailAndPassword(auth, username, password);
            const tokenResult = await userCredential.user.getIdTokenResult();

            // Set role based on token claims
            const userRole = tokenResult.claims.role || 'guest';
            dispatch(setRole({ terminalId: state.id, role: userRole }));

            // Add welcome message
            dispatch(addOutput({
                terminalId: state.id,
                output: `Welcome ${username}. Logged in as ${userRole}.`
            }));

            return null;
        } catch (error) {
            console.error('Login error:', error.code, error.message);

            switch (error.code) {
                case 'auth/user-not-found':
                    return 'Login failed: Invalid username';
                case 'auth/wrong-password':
                    return 'Login failed: Invalid password';
                case 'auth/invalid-email':
                    return 'Login failed: Invalid email format';
                default:
                    return `Login failed: ${error.message}`;
            }
        }
    },
    sudo: (args, fileSystem, path, dispatch, role) => {
        if (args.length === 0) {
            return 'sudo: no command specified';
        }

        if (args[0] === 'su' && (args[1] === '-' || !args[1])) {
            if (role === 'admin') {
                return 'Already running with admin privileges';
            }

            dispatch(setAwaitingPassword({
                terminalId: state.id,
                awaiting: true,
                type: 'sudo',
                command: 'su -'
            }));

            return 'Password: ';
        }

        return 'Command not implemented';
    },

    'su': (args, fileSystem, path, dispatch, role) => {
        if (role === 'admin') {
            return 'su: user root is already logged in';
        }

        dispatch(setAwaitingPassword({
            terminalId: state.id,
            awaiting: true,
            type: 'su',
            command: null
        }));

        return 'Password: ';
    },
    verifyPassword: async (password) => {
        try {
            // Use stored admin credentials
            const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
            await signInWithEmailAndPassword(auth, adminEmail, password);
            return true;
        } catch (error) {
            return false;
        }
    },
    logout: (args, fileSystem, path, dispatch, role, state) => {
        if (role !== 'admin') return 'logout: not logged in as admin';
        dispatch(setRole({ terminalId: state.id, role: 'guest' }));
        return 'Switched to guest user.';
    },

    whoami: (args, fileSystem, path, dispatch, role) => {
        return `${role}@peaZ-OS`;
    },

    // Add permissions system 
    chmod: async (args, fileSystem, path, dispatch, role) => {
        if (role !== 'admin') return 'chmod: Permission denied';
        // Add chmod implementation
        return 'Permission changes not implemented yet';
    },
    show: (args, fileSystem, path, dispatch, role, state) => {
        if (args.length === 0) return 'show: missing file operand';
        const fileName = args[0];
        const parentDir = getDirectory(fileSystem, path);
        if (!parentDir || parentDir.type !== 'dir') return `show: ${fileName}: No such directory`;

        const file = parentDir.content[fileName];
        if (!file) return `show: ${fileName}: No such file`;
        if (file.type !== 'file') return `show: ${fileName}: Is a directory`;

        // Ensure file content is a string
        const fileContent = typeof file.content === 'string' ? file.content : JSON.stringify(file.content);
   
        // Create new terminal with content
        const newTerminal = {
            id: Date.now(),
            zIndex: 1000,
            isMinimized: false,
            position: {
                x: window.innerWidth / 2 + 50,
                y: window.innerHeight / 2 + 50,
            },
            content: fileContent, // Set content directly
            path: path,
            role: 'guest',
            input: '',
            output: [],
            history: [],
            historyIndex: -1,
            isEditing: false,
            editingFile: null,
            fileContent: null
        };

        dispatch(addTerminal(newTerminal)); // Use the addTerminal action
        return `Opening ${fileName} in new window...`;
    },
    clear: (args, fileSystem, path, dispatch, role, state) => {
        dispatch(clearOutput({ terminalId: state.id }));
        return null;
    },

    pwd: (args, fileSystem, path) => path,

    echo: (args) => args.join(' '),

    history: (args, fileSystem, path, dispatch, role, state) => {
        const history = state?.history || [];
        if (!history.length) {
            return 'No commands in history';
        }

        return history
            .map((cmd, i) => `${i + 1}  ${cmd}`)
            .join('\n');
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

    exit: (args, fileSystem, path, dispatch, role) => {
        if (role === 'admin') {
            dispatch(setRole({ terminalId: state.id, role: 'guest' }));
            return 'Logged out from root';
        } else {
            dispatch(removeTerminal(state.id));
            return null;
        }
    },
};