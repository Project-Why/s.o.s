import mode from 'store/mode';

import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    mode,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
