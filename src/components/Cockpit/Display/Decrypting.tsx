import { useAppSelector } from 'hooks';

import { selectMode } from 'store/mode';

import LimitInfo from 'components/Common/LimitInfo';

import { CSSProperties } from 'react';

function DisplayDecrypting(props: CSSProperties) {
  const mode = useAppSelector(selectMode);
  return (
    <div id='Display Decrypting' style={{ ...props }}>
      {mode.decryptingState.display[mode.decryptingState.currentIdx]}
      <LimitInfo
        right={1}
        top={25}
        current={mode.decryptingState.currentIdx + 1}
        max={mode.decryptingState.display.length}
        fontSize={4}
      />
    </div>
  );
}

export default DisplayDecrypting;
