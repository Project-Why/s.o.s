import XButtonHover from 'assets/images/Cockpit/Decryption/X-Button-Hover.gif';
import XButton from 'assets/images/Cockpit/Decryption/X-Button.gif';

import { useAppDispatch } from 'hooks';

import { modeActions } from 'store/mode';

import { CSSProperties, MouseEventHandler } from 'react';

import Button from '../Button';

function DecryptionPaperXButton(props: CSSProperties) {
  const dispatch = useAppDispatch();
  const clickHandler: MouseEventHandler = () => {
    dispatch(modeActions.changeMode('Searching'));
  };
  return (
    <Button
      {...props}
      id='X Button'
      image={XButton}
      hoverImage={XButtonHover}
      clickImage={XButton}
      hoverClickImage={XButtonHover}
      buttonType='Momentary'
      clickHandler={clickHandler}
    />
  );
}
export default DecryptionPaperXButton;
