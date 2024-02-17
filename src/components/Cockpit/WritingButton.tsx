import WritingButtonImageClickHover from 'assets/images/Cockpit/Button/Writing/W-Button-Click Hover.gif';
import WritingButtonImageClick from 'assets/images/Cockpit/Button/Writing/W-Button-Click.gif';
import WritingButtonImageHover from 'assets/images/Cockpit/Button/Writing/W-Button-Hover.gif';
import WritingButtonImage from 'assets/images/Cockpit/Button/Writing/W-Button.gif';

import Button from 'components/Cockpit/Button';

import { useAppDispatch, useAppSelector } from 'hooks';
import { CSSProperties, MouseEventHandler } from 'react';
import { modeActions, selectMode } from 'store/mode';

function WritingButton(props: CSSProperties) {
  const mode = useAppSelector(selectMode);
  const dispatch = useAppDispatch();
  const clickHandler: MouseEventHandler = () => {
    switch (mode.currentMode) {
      case 'Writing':
        dispatch(modeActions.changeMode(mode.prevMode));
        break;

      case 'Searching' || 'Decrypting':
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
      id='Writing button'
      image={WritingButtonImage}
      hoverImage={WritingButtonImageHover}
      clickImage={WritingButtonImageClick}
      hoverClickImage={WritingButtonImageClickHover}
      buttonType='Latching'
      clickHandler={clickHandler}
    />
  );
}

export default WritingButton;
