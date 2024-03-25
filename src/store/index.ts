import counter from 'store/counter';
import message from 'store/message';
import mode from 'store/mode';

import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    counter,
    mode,
    message,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
