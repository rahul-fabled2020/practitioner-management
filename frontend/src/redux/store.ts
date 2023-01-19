import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import practitionerReducer from './slices/practitionerSlice';

const store = configureStore({
  reducer: { auth: authReducer, practitioner: practitionerReducer },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware();
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
