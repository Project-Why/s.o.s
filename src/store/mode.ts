import { RootState } from 'store';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type Mode = 'Writing' | 'Searching' | 'Decrypting';

type ModeState = {
  currentMode: Mode;
  prevMode: Mode;
};

const initialState: ModeState = {
  currentMode: 'Searching',
  prevMode: 'Searching',
};

export const modeSlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    changeMode: (state: ModeState, action: PayloadAction<Mode>) => {
      Object.assign<ModeState, Partial<ModeState>>(state, {
        prevMode: state.currentMode,
        currentMode: action.payload,
      });
    },
  },
});

export const modeActions = modeSlice.actions;
export const selectMode = (state: RootState) => state.mode;
export default modeSlice.reducer;
