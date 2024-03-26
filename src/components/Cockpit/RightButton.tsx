import RightButtonImageClickHover from 'assets/images/Cockpit/Button/Right/R-Button-Click-Hover.gif';
import RightButtonImageClick from 'assets/images/Cockpit/Button/Right/R-Button-Click.gif';
import RightButtonImageHover from 'assets/images/Cockpit/Button/Right/R-Button-Hover.gif';
import RightButtonImage from 'assets/images/Cockpit/Button/Right/R-Button.gif';

import { modeActions } from 'store/mode';

import Button from 'components/Cockpit/Button';

import { CSSProperties, MouseEventHandler } from 'react';
import { useDispatch } from 'react-redux';

function RightButton(props: CSSProperties) {
  const dispatch = useDispatch();
  const clickHandler: MouseEventHandler = () => {
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
