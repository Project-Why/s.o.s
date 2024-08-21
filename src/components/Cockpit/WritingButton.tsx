import WritingButtonImageClickHover from 'assets/images/Cockpit/Button/Writing/W-Button-Click-Hover.gif';
import WritingButtonImageClick from 'assets/images/Cockpit/Button/Writing/W-Button-Click.gif';
import WritingButtonImageHover from 'assets/images/Cockpit/Button/Writing/W-Button-Hover.gif';
import WritingButtonImage from 'assets/images/Cockpit/Button/Writing/W-Button.gif';
import WritingButtonSound from 'assets/sounds/WButton.mp3';

import { useAppDispatch, useAppSelector } from 'hooks';

import { modeActions, selectMode } from 'store/mode';

import Button from 'components/Common/Button';

import { CSSProperties, MouseEventHandler, useRef } from 'react';

function WritingButton(props: CSSProperties) {
  const audioRef = useRef(new Audio(WritingButtonSound));

  const mode = useAppSelector(selectMode);
  const dispatch = useAppDispatch();
  const clickHandler: MouseEventHandler = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
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
      pointerEvents={
        mode.writingState.isLoading ||
        mode.searchingState.isLoading ||
        !mode.searchingState.initLaunch
          ? 'none'
          : 'auto'
      }
    />
  );
}

export default WritingButton;
