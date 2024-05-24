import {configureStore,combineReducers} from '@reduxjs/toolkit';
import { persistReducer,persistStore } from 'redux-persist';
import cartReducer from './features/cartSlice';
import authReducer from './features/authSlice';
import storage from 'redux-persist/lib/storage';

const rootReducer=combineReducers({
    auth:authReducer,
    cart:cartReducer
});
const persistConfig={
    key:'root',
    storage,
    version:1,
};
const persistedReducer=persistReducer(persistConfig,rootReducer);
export const store=configureStore({
        reducer:persistedReducer
    })
export const persistor=persistStore(store);