import XButton from 'assets/images/Cockpit/Decryption/X-Button.gif';

import { useAppDispatch, useAppSelector } from 'hooks';

import { modeActions, selectMode } from 'store/mode';

import { CSSProperties, MouseEventHandler } from 'react';

function DecryptionPaperXButton(props: CSSProperties) {
  const mode = useAppSelector(selectMode);
  const dispatch = useAppDispatch();
  const clickHandler: MouseEventHandler = () => {
    switch (mode.currentMode) {
      case 'Decrypting':
        dispatch(modeActions.changeMode(mode.prevMode));
        break;

      default:
        dispatch(modeActions.changeMode('Searching'));
        break;
    }
  };
  return (
    <div
      id='X Button'
      style={{
        ...props,
      }}
      onMouseDown={clickHandler}
    >
      <img
        draggable='false'
        src={XButton}
        alt='x button for decryption paper'
        style={{ objectFit: 'cover' }}
      />
    </div>
  );
}
export default DecryptionPaperXButton;
