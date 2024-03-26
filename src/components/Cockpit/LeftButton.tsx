import LeftButtonImageClickHover from 'assets/images/Cockpit/Button/Left/L-Button-Click-Hover.gif';
import LeftButtonImageClick from 'assets/images/Cockpit/Button/Left/L-Button-Click.gif';
import LeftButtonImageHover from 'assets/images/Cockpit/Button/Left/L-Button-Hover.gif';
import LeftButtonImage from 'assets/images/Cockpit/Button/Left/L-Button.gif';

import { modeActions } from 'store/mode';

import Button from 'components/Cockpit/Button';

import { CSSProperties, MouseEventHandler } from 'react';
import { useDispatch } from 'react-redux';

function LeftButton(props: CSSProperties) {
  const dispatch = useDispatch();
  const clickHandler: MouseEventHandler = () => {
    dispatch(modeActions.setPrev());
  };
  return (
    <Button
      {...props}
      id='Left Button'
      image={LeftButtonImage}
      hoverImage={LeftButtonImageHover}
      clickImage={LeftButtonImageClick}
      hoverClickImage={LeftButtonImageClickHover}
      buttonType='Momentary'
      clickHandler={clickHandler}
    />
  );
}

export default LeftButton;
