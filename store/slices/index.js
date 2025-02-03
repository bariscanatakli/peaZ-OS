import { createSlice } from '@reduxjs/toolkit';

// Add this helper function at the top of the file
const getDefaultPosition = () => {
  if (typeof window !== 'undefined') {
    return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  }
  return { x: 0, y: 0 };
};
const calculateTerminalDimensions = () => {
  // Safely detect window
  if (typeof window === 'undefined') {
    return { width: 800, height: 600 };
  }

  const width = Math.max(window.innerWidth * 0.5, 600);
  const height = Math.max(window.innerHeight * 0.6, 400);
  return { width, height };
};


const terminalState = {
  id: null,
  path: '/',
  fileSystem: null,
  history: [],
  historyIndex: -1,
  suggestions: [],
  isAwaitingPassword: false,
  passwordType: null,
  lastSudoCommand: null,
  role: 'guest',
  uid: null,
  isEditing: false,
  editingFile: null,
  fileContent: '',
  input: '',
  output: [],
  permissions: { read: true, write: false, execute: false },
  refs: {
    terminal: null,
    input: null
  },
  isDragging: false,
  offset: { x: 0, y: 0 },
  isMinimized: false,
  isMaximized: false,
  position: getDefaultPosition(),
  dimensions: calculateTerminalDimensions(),
  isResizing: false,
  resizeDirection: "",


};

const initialState = {
  terminals: [],
  currentZIndex: 1,
  positionOffset: 20,
  fileSystem: null,
  activeTerminalId: null,
};

export const terminalsSlice = createSlice({
  name: 'terminals',
  initialState,
  reducers: {
    addTerminal: (state, action) => {

      const { id, key, content, editingFile, history, historyIndex, input, isEditing, isMinimized, output, path, position, role, } = action.payload;
      // Calculate new position with offset
      const newPosition = {


        x: Math.min(window.innerWidth / 3 + state.positionOffset),
        y: Math.min(window.innerHeight / 3 + state.positionOffset)
      };

      const newTerminal = { 
        ...terminalState,
        id,
        key,
        zIndex: state.currentZIndex + 1,
        input: '',
        output: ['Welcome to Terminal. Type "help" for available commands.'],
        path: path || '/',
        role: role || 'guest',
        isEditing: isEditing || false,
        editingFile: editingFile || null,
        fileContent: '',
        content: content || null,
        history: history || [],
        historyIndex: historyIndex || -1,
        position: newPosition || getDefaultPosition(),
        isMinimized: isMinimized || false,



      };
      state.terminals.push(newTerminal);
      state.currentZIndex++;
      state.positionOffset = (state.positionOffset + 20) % 300;
    },

    removeTerminal: (state, action) => {
      state.terminals = state.terminals.filter(t => t.id !== action.payload);
    },

    setActiveProject: (state, action) => {
      state.activeProject = action.payload;
    },
    bringToFront: (state, action) => {
      state.currentZIndex++;
      const terminal = state.terminals.find(t => t.id === action.payload);
      if (terminal) {
        terminal.zIndex = state.currentZIndex;
      }
    },

    setPath: (state, action) => {
      const { terminalId, path } = action.payload;
      const terminal = state.terminals.find(t => t.id === terminalId);
      if (terminal) {
        terminal.path = path;
      }
    },

    setActiveTerminalId: (state, action) => {
      state.activeTerminalId = action.payload;
      console.log('Setting active terminal:', action.payload); // Debug
    },
    minimizeTerminal: (state, action) => {
      const terminal = state.terminals.find(t => t.id === action.payload);
      if (terminal) {
        terminal.isMinimized = !terminal.isMinimized;
      }
    },
    setFileSystem: (state, action) => {
      const { fileSystem } = action.payload;
      // Update global file system
      state.fileSystem = fileSystem;
      // Update all terminals' file systems
      state.terminals.forEach(terminal => {
        terminal.fileSystem = fileSystem;
      });
    },

    updateHistory: (state, action) => {
      const { terminalId, command } = action.payload;
      const terminal = state.terminals.find(t => t.id === terminalId);
      if (terminal) {
        terminal.history.push(command.trim());
        terminal.historyIndex = terminal.history.length;
      }
    },

    setHistoryIndex: (state, action) => {
      const { terminalId, historyIndex } = action.payload;
      const terminal = state.terminals.find(t => t.id === terminalId);
      if (terminal) {
        terminal.historyIndex = historyIndex;
      }
    },

    setSuggestions: (state, action) => {
      const { terminalId, suggestions } = action.payload;
      const terminal = state.terminals.find(t => t.id === terminalId);
      if (terminal) {
        terminal.suggestions = suggestions;
      }
    },

    setAwaitingPassword: (state, action) => {
      const { terminalId, awaiting, type, command } = action.payload;
      const terminal = state.terminals.find(t => t.id === terminalId);
      if (terminal) {
        terminal.isAwaitingPassword = awaiting;
        terminal.passwordType = type;
        terminal.lastSudoCommand = command || null;
      }
    },

    setRole: (state, action) => {
      const { terminalId, role } = action.payload;
      const terminal = state.terminals.find(t => t.id === terminalId);
      if (terminal) {
        terminal.role = role;
        if (role === 'admin') {
          terminal.permissions = { read: true, write: true, execute: true };
        } else {
          terminal.permissions = { read: true, write: false, execute: false };
        }
      }
    },

    setInput: (state, action) => {
      const { terminalId, input } = action.payload;
      const terminal = state.terminals.find(t => t.id === terminalId);
      if (terminal) {
        terminal.input = input;
      }
    },

    addOutput: (state, action) => {
      const { terminalId, output } = action.payload;
      const terminal = state.terminals.find(t => t.id === terminalId);
      if (terminal) {
        terminal.output.push(output);
      }
    },

    clearOutput: (state, action) => {
      const { terminalId } = action.payload;
      const terminal = state.terminals.find(t => t.id === terminalId);
      if (terminal) {
        terminal.output = [];
      }
    },
    setEditingFile: (state, action) => {
      if (!action.payload) return;
      const { terminalId, editingFile } = action.payload;
      const terminal = state.terminals.find(t => t.id === terminalId);
      if (terminal) {
        terminal.editingFile = editingFile;
      }
    },

    setFileContent: (state, action) => {
      if (!action.payload) return;
      const { terminalId, content } = action.payload;
      const terminal = state.terminals.find(t => t.id === terminalId);
      if (terminal) {
        terminal.fileContent = content;
      }
    },

    setIsEditing: (state, action) => {
      if (!action.payload) return;
      const { terminalId, isEditing } = action.payload;
      const terminal = state.terminals.find(t => t.id === terminalId);
      if (terminal) {
        terminal.isEditing = isEditing;
      }
    },
    updateTerminal: (state, action) => {
      const { terminalId, updates } = action.payload;
      state.terminals = state.terminals.map(t =>
        t.id === terminalId ? { ...t, ...updates } : t
      );
    },
    setTerminalRef: (state, action) => {
      const { terminalId, ref } = action.payload;
      const terminal = state.terminals.find(t => t.id === terminalId);
      if (terminal) {
        terminal.refs = {
          ...terminal.refs,
          terminal: ref
        };
      }
    },

    setInputRef: (state, action) => {
      const { terminalId, ref } = action.payload;
      const terminal = state.terminals.find(t => t.id === terminalId);
      if (terminal) {
        terminal.refs = {
          ...terminal.refs,
          input: ref
        };
      }
    },
    setDragging: (state, action) => {
      const { terminalId, isDragging } = action.payload;
      console.log(isDragging)
      const terminal = state.terminals.find(t => t.id === terminalId);
      if (terminal) {
        terminal.isDragging = isDragging;
      }
    },
    setOffset: (state, action) => {
      const { terminalId, offset } = action.payload;
      const terminal = state.terminals.find(t => t.id === terminalId);
      if (terminal) {
        terminal.offset = offset;
      }
    },
    setMaximized: (state, action) => {
      const { terminalId, isMaximized } = action.payload;
      const terminal = state.terminals.find(t => t.id === terminalId);
      terminal.dimensions = { width: 600, height: 400 }
      if (terminal) {
        terminal.isMaximized = isMaximized;
      }
    },
    setPosition: (state, action) => {
      const { terminalId, position } = action.payload;
      const terminal = state.terminals.find(t => t.id === terminalId);
      if (terminal) {
        terminal.position = position;
      }
    },

    setDimensions: (state, action) => {
      const { terminalId, dimensions } = action.payload;
      const terminal = state.terminals.find(t => t.id === terminalId);
      if (terminal) {
        terminal.dimensions = dimensions;
      }
    },
    setUid: (state, action) => {
      const { terminalId, uid } = action.payload;
      const terminal = state.terminals.find(t => t.id === terminalId);
      if (terminal) {
        terminal.uid = uid;
      }
    },
    setResizing: (state, action) => {
      const { terminalId, isResizing } = action.payload;
      const terminal = state.terminals.find(t => t.id === terminalId);
      if (terminal) {
        terminal.isResizing = isResizing
      }
    },
    setResizeDirection: (state, action) => {
      const { terminalId, direction } = action.payload;
      const terminal = state.terminals.find(t => t.id === terminalId);
      if (terminal) {
        terminal.resizeDirection = direction
      }
    },
  },
});

export const {
  addTerminal,
  removeTerminal,
  bringToFront,
  setPath,
  setFileSystem,
  updateHistory,
  setHistoryIndex,
  setSuggestions,
  setAwaitingPassword,
  minimizeTerminal,
  setRole,
  setInput,
  addOutput,
  clearOutput,
  updateTerminal,
  setEditingFile,
  setFileContent,
  setIsEditing,
  setActiveTerminalId,
  setTerminalRef,
  setInputRef,
  setDragging,
  setOffset,
  setMaximized,
  setPosition,
  setDimensions,
  setResizing,
  setResizeDirection,
  setUid,
  setActiveProject,
} = terminalsSlice.actions;

export default terminalsSlice.reducer;