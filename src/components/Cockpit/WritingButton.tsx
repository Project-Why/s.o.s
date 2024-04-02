import WritingButtonImageClickHover from 'assets/images/Cockpit/Button/Writing/W-Button-Click-Hover.gif';
import WritingButtonImageClick from 'assets/images/Cockpit/Button/Writing/W-Button-Click.gif';
import WritingButtonImageHover from 'assets/images/Cockpit/Button/Writing/W-Button-Hover.gif';
import WritingButtonImage from 'assets/images/Cockpit/Button/Writing/W-Button.gif';

import { useAppDispatch, useAppSelector } from 'hooks';

import { modeActions, selectMode } from 'store/mode';

import Button from 'components/Common/Button';

import { CSSProperties, MouseEventHandler } from 'react';

function WritingButton(props: CSSProperties) {
  const mode = useAppSelector(selectMode);
  const dispatch = useAppDispatch();
  const clickHandler: MouseEventHandler = () => {
    switch (mode.currentMode) {
      case 'Writing':
        dispatch(modeActions.changeMode(mode.prevMode));
        break;

      case 'Searching':
      case 'Decrypting':
        dispatch(modeActions.changeMode('Writing'));
        break;

      default:
        dispatch(modeActions.changeMode(mode.prevMode));
        break;
    }
  };
  return (
    <Button
      {...props}
      id='Writing Button'
      image={WritingButtonImage}
      hoverImage={WritingButtonImageHover}
      clickImage={WritingButtonImageClick}
      hoverClickImage={WritingButtonImageClickHover}
      buttonType='Latching'
      condition={mode.currentMode === 'Writing'}
      clickHandler={clickHandler}
    />
  );
}

export default WritingButton;
