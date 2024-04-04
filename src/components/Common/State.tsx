import { ModeState } from 'types/ModeState';

import { useAppSelector } from 'hooks';

import { selectMode } from 'store/mode';

import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

export type ModeAnimation = {
  prevMode: ModeState.Mode;
  currentMode: ModeState.Mode;
  animationComponent: EmotionJSX.Element;
};

export type StateProps = {
  writingElement: EmotionJSX.Element;
  searchingElement: EmotionJSX.Element;
  decryptingElement: EmotionJSX.Element;
  animations: ModeAnimation[];
};

function State(props: Partial<StateProps>) {
  const {
    writingElement = null,
    searchingElement = null,
    decryptingElement = null,
    animations = [],
  } = props;
  const mode = useAppSelector(selectMode);
  const writingAnimations: ModeAnimation[] = [];
  const searchingAnimations: ModeAnimation[] = [];
  const decryptingAnimations: ModeAnimation[] = [];

  animations.forEach((value) => {
    switch (value.currentMode) {
      case 'Decrypting': {
        decryptingAnimations.push(value);
        break;
      }
      case 'Searching': {
        searchingAnimations.push(value);
        break;
      }
      case 'Writing': {
        writingAnimations.push(value);
        break;
      }
      default: {
        break;
      }
    }
  });

  const component = (_mode: ModeState.ModeManageState) => {
    switch (_mode.currentMode) {
      case 'Decrypting': {
        const changeElement = decryptingAnimations.find(
          (value) => value.prevMode === mode.prevMode,
        );
        if (changeElement) return changeElement.animationComponent;
        return decryptingElement;
      }
      case 'Searching': {
        const changeElement = searchingAnimations.find(
          (value) => value.prevMode === mode.prevMode,
        );
        if (changeElement) return changeElement.animationComponent;
        return searchingElement;
      }
      case 'Writing': {
        const changeElement = writingAnimations.find(
          (value) => value.prevMode === mode.prevMode,
        );
        if (changeElement) return changeElement.animationComponent;
        return writingElement;
      }
      default: {
        return null;
      }
    }
  };

  return component(mode);
}

export default State;
