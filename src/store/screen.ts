import { RootState } from 'store';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface Screen {
  width: number;
  height: number;
}

const initialState: Screen = {
  width: -1,
  height: -1,
};

export const screenSlice = createSlice({
  name: 'screen',
  initialState,
  reducers: {
    setScreen: (state: Screen, action: PayloadAction<Screen>) => {
      Object.assign<Screen, Screen>(state, action.payload);
    },
  },
});

export const screenActions = screenSlice.actions;
export const selectScreen = (state: RootState) => state.screen;
export default screenSlice.reducer;
