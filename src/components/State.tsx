import { useAppSelector } from 'hooks';

import { selectMode } from 'store/mode';

import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { CSSProperties } from 'react';

export type StateProps = {
  writingElement: EmotionJSX.Element;
  searchingElement: EmotionJSX.Element;
  decryptingElement: EmotionJSX.Element;
};

function State(props: CSSProperties & StateProps) {
  const { writingElement, searchingElement, decryptingElement, ...cssProps } =
    props;
  const mode = useAppSelector(selectMode);
  return (
    <div style={{ ...cssProps }}>
      {mode.currentMode === 'Writing'
        ? writingElement
        : mode.currentMode === 'Decrypting'
          ? decryptingElement
          : searchingElement}
    </div>
  );
}

export default State;
