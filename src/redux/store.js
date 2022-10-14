import transactionReducer from './transacitions/transactionSlice';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import categoriesReducer from '../redux/categories/categoriesSlice';
import authReducer from './auth/authSlice';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const authPersistConfig = {
  key: 'token',
  whitelist: ['idToken'],
  version: 1,
  storage,
};

const authPersistedReducer = persistReducer(authPersistConfig, authReducer);

const rootReducer = combineReducers({
  auth: authPersistedReducer,
  transactions: transactionReducer,
  categories: categoriesReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);

export default store;
