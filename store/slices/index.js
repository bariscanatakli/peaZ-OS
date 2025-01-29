import { createSlice } from '@reduxjs/toolkit';

const initialFileSystem = {
  '~': {
    type: 'dir',
    content: {
      home: {
        type: 'dir',
        content: {}
      }
    }
  }
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
  
};

const initialState = {
  terminals: [],
  currentZIndex: 1,
  positionOffset: 20,
  fileSystem: null
};

export const terminalsSlice = createSlice({
  name: 'terminals',
  initialState,
  reducers: {
    addTerminal: (state, action) => {
      console.log(action.payload)
      const { id, key, content, editingFile, history, historyIndex, input, isEditing, isMinimized, output, path, position, role, } = action.payload;
      const newTerminal = {
        ...terminalState,
        id,
        key,
        zIndex: state.currentZIndex + 1,
        input: '',
        output: ['Welcome to Terminal. Type "help" for available commands.'],
        path: '/',
        role: role || 'guest',
        isEditing: isEditing || false,
        editingFile: editingFile || null,
        fileContent: '',
        content: content || null,
        history: history || [],
        historyIndex: historyIndex || -1,
     
        isMinimized: isMinimized || false,

      };
      state.terminals.push(newTerminal);
      state.currentZIndex++;
      state.positionOffset += 20;
    },

    removeTerminal: (state, action) => {
      state.terminals = state.terminals.filter(t => t.id !== action.payload);
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
  setInputRef
} = terminalsSlice.actions;

export default terminalsSlice.reducer;