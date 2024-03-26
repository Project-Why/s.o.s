export declare namespace ModeState {
  export type Mode = 'Writing' | 'Searching' | 'Decrypting';

  export interface ModeState {
    display: [EmotionJSX.Element] | [];
    currentIdx: number;
  }
  export interface SearchingState extends ModeState {
    stars: [EmotionJSX.Element] | [];
  }
  export interface DecryptingState extends ModeState {
    starId: number;
  }
  export interface WritingState extends ModeState {
    text: string;
  }
  export interface ModeManageState {
    currentMode: Mode;
    prevMode: Mode;
    decryptingState: ModeState.DecryptingState;
    searchingState: ModeState.SearchingState;
    writingState: ModeState.WritingState;
  }
}
