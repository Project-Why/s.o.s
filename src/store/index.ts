import mode from 'store/mode';
import screen from 'store/screen';
import translate from 'store/translate';

import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    mode,
    screen,
    translate,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
