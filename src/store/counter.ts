import { RootState } from 'store';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type CounterState = {
  count: number;
};

const initialState: CounterState = {
  count: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    add: (state: CounterState, action: PayloadAction<number>) => {
      Object.assign(state, { count: state.count + action.payload });
    },
    sub: (state: CounterState, action: PayloadAction<number>) => {
      Object.assign(state, { count: state.count - action.payload });
    },
    set: (state: CounterState) => {
      Object.assign(state, { count: 0 });
    },
  },
});

export const counterActions = counterSlice.actions;
export const selectCount = (state: RootState) => state.counter;
export default counterSlice.reducer;
