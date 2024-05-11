import { RootState } from 'store';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface Translate {
  index: number | null;
}

const initialState: Translate = {
  index: null,
};

export const translateSlice = createSlice({
  name: 'Translate',
  initialState,
  reducers: {
    setTranslate: (state: Translate, action: PayloadAction<Translate>) => {
      Object.assign<Translate, Translate>(state, action.payload);
    },
  },
});

export const translateActions = translateSlice.actions;
export const selectTranslate = (state: RootState) => state.translate;
export default translateSlice.reducer;
