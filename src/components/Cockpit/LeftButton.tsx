import LeftButtonImageClickHover from 'assets/images/Cockpit/Button/Left/L-Button-Click Hover.gif';
import LeftButtonImageClick from 'assets/images/Cockpit/Button/Left/L-Button-Click.gif';
import LeftButtonImageHover from 'assets/images/Cockpit/Button/Left/L-Button-Hover.gif';
import LeftButtonImage from 'assets/images/Cockpit/Button/Left/L-Button.gif';

import { useAppDispatch } from 'hooks';

import { counterActions } from 'store/counter';

import Button from 'components/Cockpit/Button';

import { CSSProperties, MouseEventHandler } from 'react';

function LeftButton(props: CSSProperties) {
  const dispatch = useAppDispatch();
  const clickHandler: MouseEventHandler = () => {
    dispatch(counterActions.sub(10));
  };
  return (
    <Button
      {...props}
      id='left button'
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
