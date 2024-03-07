import XButton from 'assets/images/Cockpit/Decryption/X-Button.gif';

import { useAppDispatch } from 'hooks';

import { modeActions } from 'store/mode';

import { CSSProperties, MouseEventHandler } from 'react';

function DecryptionPaperXButton(props: CSSProperties) {
  const dispatch = useAppDispatch();
  const clickHandler: MouseEventHandler = () => {
    dispatch(modeActions.changeMode('Searching'));
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
