import { MorseCode } from 'common/morse';

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
    isLoading: boolean;
    currentAnimation: number;
    movingPosition: [number, number];
  }
  export interface DecryptingState extends ModeState {
    code: MorseCode | null;
  }
  export interface WritingState extends ModeState {
    text: string;
    isLoading: boolean;
    currentAnimation: number;
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
