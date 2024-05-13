import Send from 'assets/images/Cockpit/Display/Writing/Send.gif';

import { messageAPI } from 'apis/message';

import { useAppSelector } from 'hooks';

import { selectMode } from 'store/mode';

import { CSSProperties, EventHandler, FocusEvent, MouseEvent } from 'react';

function DisplayWriting(props: CSSProperties) {
  const mode = useAppSelector(selectMode);
  const handleMouseOver: EventHandler<MouseEvent | FocusEvent> = (
    e: MouseEvent<HTMLImageElement> | FocusEvent<HTMLImageElement>,
  ) => {
    e.currentTarget.style.scale = '1.1';
  };
  const handleMouseOut: EventHandler<MouseEvent | FocusEvent> = (
    e: MouseEvent<HTMLImageElement> | FocusEvent<HTMLImageElement>,
  ) => {
    e.currentTarget.style.scale = '1';
  };
  const handleMouseDown: EventHandler<MouseEvent> = () => {
    messageAPI.createMessage(mode.writingState.text);
  };
  return (
    <div id='Display Writing' style={{ ...props }}>
      <img
        src={Send}
        alt='Writing Send Button'
        draggable='false'
        style={{
          width: '100%',
          objectFit: 'contain',
        }}
        role='presentation'
        onMouseOver={handleMouseOver}
        onFocus={handleMouseOver}
        onMouseOut={handleMouseOut}
        onBlur={handleMouseOut}
        onMouseDown={handleMouseDown}
      />
      {mode.writingState.display[mode.writingState.currentIdx]}
    </div>
  );
}

export default DisplayWriting;
