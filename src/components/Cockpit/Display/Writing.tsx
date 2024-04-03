import Complete from 'assets/images/Cockpit/Display/Writing/Complete.gif';

import { useAppSelector } from 'hooks';

import { modeActions, selectMode } from 'store/mode';

import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { CSSProperties, SyntheticEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';

function DisplayWriting(props: CSSProperties) {
  const mode = useAppSelector(selectMode);
  const dispatch = useDispatch();
  const handleMouseOver = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.scale = '1.1';
  };
  const handleMouseOut = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.scale = '1';
  };
  const handleMouseDown = () => {
    console.log('send~');
  };
  useEffect(() => {
    if (mode.writingState.display.length === 0) {
      const displayList: EmotionJSX.Element[] = [
        <img
          src={Complete}
          key='Writing Send'
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
        />,
      ];
      dispatch(modeActions.setDisplay(displayList));
    }
  }, []);
  return (
    <div id='Display Writing' style={{ ...props }}>
      {mode.writingState.display[mode.writingState.currentIdx]}
    </div>
  );
}

export default DisplayWriting;
