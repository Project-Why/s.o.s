import RightButtonImageClickHover from 'assets/images/Cockpit/Button/Right/R-Button-Click-Hover.gif';
import RightButtonImageClick from 'assets/images/Cockpit/Button/Right/R-Button-Click.gif';
import RightButtonImageHover from 'assets/images/Cockpit/Button/Right/R-Button-Hover.gif';
import RightButtonImage from 'assets/images/Cockpit/Button/Right/R-Button.gif';
import RightButtonSound from 'assets/sounds/RButton.mp3';

import { modeActions } from 'store/mode';

import Button from 'components/Common/Button';

import { CSSProperties, MouseEventHandler, useRef } from 'react';
import { useDispatch } from 'react-redux';

function RightButton(props: CSSProperties) {
  const audioRef = useRef(new Audio(RightButtonSound));

  const dispatch = useDispatch();
  const clickHandler: MouseEventHandler = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
    dispatch(modeActions.setPost());
  };
  return (
    <Button
      {...props}
      id='Right Button'
      image={RightButtonImage}
      hoverImage={RightButtonImageHover}
      clickImage={RightButtonImageClick}
      hoverClickImage={RightButtonImageClickHover}
      buttonType='Momentary'
      clickHandler={clickHandler}
    />
  );
}

export default RightButton;
