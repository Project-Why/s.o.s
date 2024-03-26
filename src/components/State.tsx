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
  return mode.currentMode === 'Writing'
    ? writingElement
    : mode.currentMode === 'Decrypting'
      ? decryptingElement
      : searchingElement;
}

export default State;
