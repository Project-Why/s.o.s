import RightButtonImageClickHover from 'assets/images/Cockpit/Button/Right/R-Button-Click Hover.gif';
import RightButtonImageClick from 'assets/images/Cockpit/Button/Right/R-Button-Click.gif';
import RightButtonImageHover from 'assets/images/Cockpit/Button/Right/R-Button-Hover.gif';
import RightButtonImage from 'assets/images/Cockpit/Button/Right/R-Button.gif';

import Button from 'components/Cockpit/Button';

import { useAppDispatch } from 'hooks';
import { CSSProperties, MouseEventHandler } from 'react';
import { counterActions } from 'store/counter';

function RightButton(props: CSSProperties) {
  const dispatch = useAppDispatch();
  const clickHandler: MouseEventHandler = () => {
    dispatch(counterActions.add(10));
  };
  return (
    <Button
      {...props}
      id='Right button'
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
