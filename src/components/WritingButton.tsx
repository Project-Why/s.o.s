import WritingButtonImageClickHover from 'assets/images/Cockpit/Button/Writing/W-Button-Click Hover.gif';
import WritingButtonImageClick from 'assets/images/Cockpit/Button/Writing/W-Button-Click.gif';
import WritingButtonImageHover from 'assets/images/Cockpit/Button/Writing/W-Button-Hover.gif';
import WritingButtonImage from 'assets/images/Cockpit/Button/Writing/W-Button.gif';

import Button from 'components/Button';

import { useAppDispatch } from 'hooks';
import { CSSProperties, MouseEventHandler } from 'react';
import { counterActions } from 'store/counter';

function WritingButton(props: CSSProperties) {
  const dispatch = useAppDispatch();
  const clickHandler: MouseEventHandler = () => {
    dispatch(counterActions.set());
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
