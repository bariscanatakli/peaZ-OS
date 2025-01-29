import { configureStore } from '@reduxjs/toolkit';
import terminalsReducer from './slices';

const store = configureStore({
  reducer: {
    terminals: terminalsReducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default store;