import { MovingAnimationState, SendingAnimationState } from 'util/animation';
import { MorseCode } from 'util/morse';

export declare namespace ModeState {
  export type Mode = 'Writing' | 'Searching' | 'Decrypting';

  export type Toast =
    | 'None'
    | 'Blank'
    | 'NotSupportedCharacter'
    | 'Success'
    | 'Fail'
    | 'LimitLength';

  export interface ModeState {
    display: EmotionJSX.Element[];
    currentIdx: number;
  }
  export interface SearchingState extends ModeState {
    stars: StarProps[];
    nextStars: StarProps[];
    isStart: boolean;
    isLoading: boolean;
    imageKey: number;
    currentAnimation: MovingAnimationState;
    movingPosition: [number, number];
    moveSuccess: boolean;
    initLaunch: boolean;
  }
  export interface DecryptingState extends ModeState {
    isStart: boolean;
    imageKey: number;
    code: MorseCode | null;
    codeIndex: number;
  }
  export interface WritingState extends ModeState {
    text: string;
    isStart: boolean;
    currentAnimation: SendingAnimationState;
    toast: Toast;
    sendSuccess: boolean;
    imageKey: number;
  }
  export interface ModeManageState {
    currentMode: Mode;
    prevMode: Mode;
    decryptingState: ModeState.DecryptingState;
    searchingState: ModeState.SearchingState;
    writingState: ModeState.WritingState;
  }
}
