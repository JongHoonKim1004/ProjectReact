// store.js
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { thunk } from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


// persist 설정
const persistConfig = {
  key: 'root',
  storage,
};

// 여러 리듀서를 병합
const rootReducer = combineReducers({
  auth: authReducer,
});

// 루트 리듀서를 persistReducer로 감싸기
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }).concat(thunk),
});

export const persistor = persistStore(store);

export default store;
