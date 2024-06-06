import { ModeState } from 'types/ModeState';

import { RootState } from 'store';

import { StarProps } from 'components/Space/Star';

import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: ModeState.ModeManageState = {
  currentMode: 'Searching',
  prevMode: 'Searching',
  writingState: {
    display: [],
    currentIdx: -1,
    text: '',
    isLoading: false,
    currentAnimation: 0,
    toast: 'None',
    sendSuccess: false,
    imageKey: 0,
  },
  searchingState: {
    display: [],
    currentIdx: -1,
    stars: [],
    isLoading: false,
    currentAnimation: 0,
    movingPosition: [0, 0],
  },
  decryptingState: {
    display: [],
    currentIdx: -1,
    starId: -1,
  },
};

export const modeSlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    changeMode: (
      state: ModeState.ModeManageState,
      action: PayloadAction<ModeState.Mode>,
    ) => {
      Object.assign<
        ModeState.ModeManageState,
        Partial<ModeState.ModeManageState>
      >(state, {
        prevMode: state.currentMode,
        currentMode: action.payload,
      });
    },
    setPrev: (state: ModeState.ModeManageState) => {
      switch (state.currentMode) {
        case 'Writing':
          if (state.writingState.currentIdx > 0) {
            Object.assign<
              ModeState.WritingState,
              Partial<ModeState.WritingState>
            >(state.writingState, {
              currentIdx: state.writingState.currentIdx - 1,
            });
          }
          break;
        case 'Decrypting':
          if (state.decryptingState.currentIdx > 0) {
            Object.assign<
              ModeState.DecryptingState,
              Partial<ModeState.DecryptingState>
            >(state.decryptingState, {
              currentIdx: state.decryptingState.currentIdx - 1,
            });
          }
          break;
        case 'Searching':
          if (state.searchingState.currentIdx > 0) {
            Object.assign<
              ModeState.SearchingState,
              Partial<ModeState.SearchingState>
            >(state.searchingState, {
              currentIdx: state.searchingState.currentIdx - 1,
            });
          } else {
            Object.assign<
              ModeState.SearchingState,
              Partial<ModeState.SearchingState>
            >(state.searchingState, {
              currentIdx: state.searchingState.display.length - 1,
            });
          }
          break;
        default:
          break;
      }
    },
    setPost: (state: ModeState.ModeManageState) => {
      switch (state.currentMode) {
        case 'Writing':
          if (
            state.writingState.currentIdx <
            state.writingState.display.length - 1
          ) {
            Object.assign<
              ModeState.WritingState,
              Partial<ModeState.WritingState>
            >(state.writingState, {
              currentIdx: state.writingState.currentIdx + 1,
            });
          }
          break;
        case 'Decrypting':
          if (
            state.decryptingState.currentIdx <
            state.decryptingState.display.length - 1
          ) {
            Object.assign<
              ModeState.DecryptingState,
              Partial<ModeState.DecryptingState>
            >(state.decryptingState, {
              currentIdx: state.decryptingState.currentIdx + 1,
            });
          }
          break;
        case 'Searching':
          if (
            state.searchingState.currentIdx <
            state.searchingState.display.length - 1
          ) {
            Object.assign<
              ModeState.SearchingState,
              Partial<ModeState.SearchingState>
            >(state.searchingState, {
              currentIdx: state.searchingState.currentIdx + 1,
            });
          } else {
            Object.assign<
              ModeState.SearchingState,
              Partial<ModeState.SearchingState>
            >(state.searchingState, {
              currentIdx: 0,
            });
          }
          break;
        default:
          break;
      }
    },
    setDisplay: (
      state: ModeState.ModeManageState,
      action: PayloadAction<EmotionJSX.Element[]>,
    ) => {
      switch (state.currentMode) {
        case 'Decrypting':
          Object.assign<
            ModeState.DecryptingState,
            Partial<ModeState.DecryptingState>
          >(state.decryptingState, {
            display: action.payload,
            currentIdx: 0,
          });
          break;
        case 'Searching':
          Object.assign<
            ModeState.SearchingState,
            Partial<ModeState.SearchingState>
          >(state.searchingState, {
            display: action.payload,
            currentIdx: 0,
          });
          break;
        case 'Writing':
          Object.assign<
            ModeState.WritingState,
            Partial<ModeState.WritingState>
          >(state.writingState, {
            display: action.payload,
            currentIdx: 0,
          });
          break;
        default:
          break;
      }
    },
    setText: (
      state: ModeState.ModeManageState,
      action: PayloadAction<string>,
    ) => {
      Object.assign<ModeState.WritingState, Partial<ModeState.WritingState>>(
        state.writingState,
        {
          text: action.payload,
        },
      );
    },
    setWritingToast: (
      state: ModeState.ModeManageState,
      action: PayloadAction<ModeState.Toast>,
    ) => {
      Object.assign<ModeState.WritingState, Partial<ModeState.WritingState>>(
        state.writingState,
        {
          toast: action.payload,
        },
      );
    },
    setWritingIsLoading: (state: ModeState.ModeManageState) => {
      Object.assign<ModeState.WritingState, Partial<ModeState.WritingState>>(
        state.writingState,
        {
          isLoading: !state.writingState.isLoading,
        },
      );
    },
    setNextWritingAnimation: (state: ModeState.ModeManageState) => {
      Object.assign<ModeState.WritingState, Partial<ModeState.WritingState>>(
        state.writingState,
        {
          currentAnimation:
            state.writingState.currentAnimation === 3
              ? 0
              : state.writingState.currentAnimation + 1,
        },
      );
    },
    setSendSuccess: (
      state: ModeState.ModeManageState,
      action: PayloadAction<boolean>,
    ) => {
      Object.assign<ModeState.WritingState, Partial<ModeState.WritingState>>(
        state.writingState,
        { sendSuccess: action.payload },
      );
    },
    setNextImageKey: (state: ModeState.ModeManageState) => {
      Object.assign<ModeState.WritingState, Partial<ModeState.WritingState>>(
        state.writingState,
        {
          imageKey:
            state.writingState.imageKey === 1000
              ? 0
              : state.writingState.imageKey + 1,
        },
      );
    },
    setStars: (
      state: ModeState.ModeManageState,
      action: PayloadAction<StarProps[]>,
    ) => {
      Object.assign<
        ModeState.SearchingState,
        Partial<ModeState.SearchingState>
      >(state.searchingState, {
        stars: action.payload,
      });
    },
    setMovingIsLoading: (state: ModeState.ModeManageState) => {
      Object.assign<
        ModeState.SearchingState,
        Partial<ModeState.SearchingState>
      >(state.searchingState, {
        isLoading: !state.searchingState.isLoading,
      });
    },
    setNextMovingAnimation: (state: ModeState.ModeManageState) => {
      Object.assign<
        ModeState.SearchingState,
        Partial<ModeState.SearchingState>
      >(state.searchingState, {
        currentAnimation:
          state.searchingState.currentAnimation === 4
            ? 0
            : state.searchingState.currentAnimation + 1,
      });
    },
    setMovingPosition: (
      state: ModeState.ModeManageState,
      action: PayloadAction<[number, number]>,
    ) => {
      Object.assign<
        ModeState.SearchingState,
        Partial<ModeState.SearchingState>
      >(state.searchingState, { movingPosition: action.payload });
    },
    setStar: (
      state: ModeState.ModeManageState,
      action: PayloadAction<ModeState.DecryptingState>,
    ) => {
      Object.assign<
        ModeState.ModeManageState,
        Partial<ModeState.ModeManageState>
      >(state, { decryptingState: action.payload });
    },
  },
});

export const modeActions = modeSlice.actions;
export const selectMode = (state: RootState) => state.mode;
export default modeSlice.reducer;
