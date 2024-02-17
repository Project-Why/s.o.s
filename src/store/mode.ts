import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store';

export type Mode = 'Writing' | 'Searching' | 'Decrypting';

type ModeState = {
  currentMode: Mode;
  prevMode: Mode;
  message: string;
};

const initialState: ModeState = {
  currentMode: 'Searching',
  prevMode: 'Searching',
  message: '',
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
    setMessage: (state: ModeState, action: PayloadAction<string>) => {
      Object.assign<ModeState, Partial<ModeState>>(state, {
        message: action.payload,
      });
    },
  },
});

export const modeActions = modeSlice.actions;
export const selectMode = (state: RootState) => state.mode;
export default modeSlice.reducer;
