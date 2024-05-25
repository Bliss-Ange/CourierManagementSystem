import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


// Slice
import userReducer from "./authentication/userSlice";
import modalReducer from './modal/modalSlice';

const rootReducer = combineReducers({
  user: userReducer,
  modal: modalReducer,
});

const persistConfig = {
  key: 'root',
  storage,
}; 

// Apply persistReducer to the combined reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
export const store = configureStore({
  reducer: persistedReducer,
});

// Create and export persistor for later use
export const persistor = persistStore(store);

// Export RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;