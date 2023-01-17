import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: { auth: authReducer },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware();
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>