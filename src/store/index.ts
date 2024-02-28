import counterReducer from 'store/counter';
import modeReducer from 'store/mode';

import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: { counter: counterReducer, mode: modeReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
