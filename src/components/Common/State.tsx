import { ModeState } from 'types/ModeState';

import { useAppSelector } from 'hooks';

import { selectMode } from 'store/mode';

import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

export type StateProps = {
  writingElement: EmotionJSX.Element;
  searchingElement: EmotionJSX.Element;
  decryptingElement: EmotionJSX.Element;
};

function State(props: Partial<StateProps>) {
  const {
    writingElement = null,
    searchingElement = null,
    decryptingElement = null,
  } = props;
  const mode = useAppSelector(selectMode);

  const component = (_mode: ModeState.ModeManageState) => {
    switch (_mode.currentMode) {
      case 'Decrypting':
        return decryptingElement;
      case 'Searching':
        return searchingElement;
      case 'Writing':
        return writingElement;
      default:
        return null;
    }
  };

  return component(mode);
}

export default State;
