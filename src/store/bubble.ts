import { RootState } from 'store';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface Bubble {
  isHover: boolean;
  left: number;
  top: number;
  id: number;
  createdAt: Date;
  location: string;
}

const initialState: Bubble = {
  isHover: false,
  left: -1,
  top: -1,
  id: -1,
  createdAt: new Date(),
  location: '',
};

export const bubbleSlice = createSlice({
  name: 'screen',
  initialState,
  reducers: {
    setBubble: (state: Bubble, action: PayloadAction<Bubble>) => {
      Object.assign<Bubble, Partial<Bubble>>(state, action.payload);
    },
    setIsHover: (state: Bubble, action: PayloadAction<boolean>) => {
      Object.assign<Bubble, Partial<Bubble>>(state, {
        isHover: action.payload,
      });
    },
  },
});

export const bubbleActions = bubbleSlice.actions;
export const selectBubble = (state: RootState) => state.bubble;
export default bubbleSlice.reducer;
