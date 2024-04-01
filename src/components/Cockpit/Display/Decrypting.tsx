import { useAppSelector } from 'hooks';

import { selectMode } from 'store/mode';

import { CSSProperties } from 'react';

function DisplayDecrypting(props: CSSProperties) {
  const mode = useAppSelector(selectMode);
  return (
    <div id='Display Decrypting' style={{ ...props }}>
      {mode.decryptingState.display[mode.decryptingState.currentIdx]}
      <div
        style={{
          width: '15vw',
          height: '2vw',
          left: '40%',
          top: '80%',
          position: 'absolute',
          fontSize: '2vw',
          textAlign: 'right',
        }}
      >
        {mode.decryptingState.currentIdx + 1} /{' '}
        {mode.decryptingState.display.length}
      </div>
    </div>
  );
}

export default DisplayDecrypting;
