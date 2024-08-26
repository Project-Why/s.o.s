import { ModeState } from 'types/ModeState';

import { RootState } from 'store';

import { StarProps } from 'components/Space/Star';

import {
  MovingAnimationState,
  SendingAnimationState,
  movingAnimationStateFlow,
  sendingAnimationStateFlow,
} from 'util/animation';
import { MorseCode } from 'util/morse';

import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: ModeState.ModeManageState = {
  currentMode: 'Searching',
  prevMode: 'Searching',
  writingState: {
    display: [],
    currentIdx: -1,
    text: '',
    isStart: false,
    isLoading: false,
    currentAnimation: SendingAnimationState.Completed,
    toast: 'None',
    sendSuccess: false,
    imageKey: 0,
  },
  searchingState: {
    display: [],
    currentIdx: -1,
    stars: [],
    nextStars: [],
    isStart: false,
    isLoading: false,
    imageKey: 0,
    currentAnimation: MovingAnimationState.Completed,
    movingPosition: [0, 0],
    moveSuccess: true,
    initLaunch: false,
  },
  decryptingState: {
    display: [],
    currentIdx: -1,
    isStart: false,
    imageKey: 0,
    code: null,
    codeIndex: 0,
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
    setSendingIsStart: (state: ModeState.ModeManageState) => {
      Object.assign<ModeState.WritingState, Partial<ModeState.WritingState>>(
        state.writingState,
        {
          isStart: !state.writingState.isStart,
        },
      );
    },
    setSendingIsLoading: (state: ModeState.ModeManageState) => {
      Object.assign<ModeState.WritingState, Partial<ModeState.WritingState>>(
        state.writingState,
        {
          isLoading: !state.writingState.isLoading,
        },
      );
    },
    setNextSendingAnimation: (state: ModeState.ModeManageState) => {
      Object.assign<ModeState.WritingState, Partial<ModeState.WritingState>>(
        state.writingState,
        {
          currentAnimation:
            sendingAnimationStateFlow[state.writingState.currentAnimation],
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
    setSendingImageKey: (state: ModeState.ModeManageState) => {
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
        nextStars: action.payload,
      });
    },
    changeStars: (state: ModeState.ModeManageState) => {
      Object.assign<
        ModeState.SearchingState,
        Partial<ModeState.SearchingState>
      >(state.searchingState, {
        stars: state.searchingState.nextStars,
        nextStars: [],
      });
    },
    setInitLaunch: (
      state: ModeState.ModeManageState,
      action: PayloadAction<boolean>,
    ) => {
      Object.assign<
        ModeState.SearchingState,
        Partial<ModeState.SearchingState>
      >(state.searchingState, { initLaunch: action.payload });
    },
    setMoveSuccess: (
      state: ModeState.ModeManageState,
      action: PayloadAction<boolean>,
    ) => {
      Object.assign<
        ModeState.SearchingState,
        Partial<ModeState.SearchingState>
      >(state.searchingState, { moveSuccess: action.payload });
    },
    setMovingIsStart: (state: ModeState.ModeManageState) => {
      Object.assign<
        ModeState.SearchingState,
        Partial<ModeState.SearchingState>
      >(state.searchingState, {
        isStart: !state.searchingState.isStart,
      });
    },
    setStarIsLoading: (state: ModeState.ModeManageState) => {
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
          movingAnimationStateFlow[state.searchingState.currentAnimation],
      });
    },
    setMovingImageKey: (state: ModeState.ModeManageState) => {
      Object.assign<
        ModeState.SearchingState,
        Partial<ModeState.SearchingState>
      >(state.searchingState, {
        imageKey:
          state.searchingState.imageKey === 1000
            ? 0
            : state.searchingState.imageKey + 1,
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
    setOpeningIsStart: (state: ModeState.ModeManageState) => {
      Object.assign<
        ModeState.DecryptingState,
        Partial<ModeState.DecryptingState>
      >(state.decryptingState, {
        isStart: !state.decryptingState.isStart,
      });
    },
    setOpeningImageKey: (state: ModeState.ModeManageState) => {
      Object.assign<
        ModeState.DecryptingState,
        Partial<ModeState.DecryptingState>
      >(state.decryptingState, {
        imageKey:
          state.decryptingState.imageKey === 1000
            ? 0
            : state.decryptingState.imageKey + 1,
      });
    },
    setCode: (
      state: ModeState.ModeManageState,
      action: PayloadAction<MorseCode | null>,
    ) => {
      Object.assign<
        ModeState.DecryptingState,
        Partial<ModeState.DecryptingState>
      >(state.decryptingState, {
        code: action.payload,
      });
    },
    setCodeIndex: (
      state: ModeState.ModeManageState,
      action: PayloadAction<number>,
    ) => {
      Object.assign<
        ModeState.DecryptingState,
        Partial<ModeState.DecryptingState>
      >(state.decryptingState, {
        codeIndex: action.payload,
      });
    },
  },
});

export const modeActions = modeSlice.actions;
export const selectMode = (state: RootState) => state.mode;
export default modeSlice.reducer;
