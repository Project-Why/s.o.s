import { RootState } from 'store';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type MessageState = {
  text: string;
};

const initialState: MessageState = {
  text: '',
};

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage: (state: MessageState, action: PayloadAction<string>) => {
      Object.assign<MessageState, Partial<MessageState>>(state, {
        text: action.payload,
      });
    },
  },
});

export const messageActions = messageSlice.actions;
export const selectMessage = (state: RootState) => state.message;
export default messageSlice.reducer;
