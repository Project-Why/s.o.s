import { useAppSelector } from 'hooks';

import { selectMode } from 'store/mode';

import { CSSProperties, ReactElement, ReactNode } from 'react';

export type StateProps = {
  writingElement: ReactNode;
  searchingElement: ReactNode;
  decryptingElement: ReactNode;
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
