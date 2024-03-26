import Searching1 from 'assets/images/Cockpit/Display/Searching/Searching_1.gif';
import TempImg from 'assets/images/Cockpit/Display/Writing/Complete-Glitch.gif';

import { useAppSelector } from 'hooks';

import { modeActions, selectMode } from 'store/mode';

import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { CSSProperties, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';

function DisplaySearching(props: CSSProperties) {
  const mode = useAppSelector(selectMode);
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    if (mode.searchingState.display.length === 0) {
      const displayList: EmotionJSX.Element[] = [
        <img
          src={Searching1}
          key='Searching 1'
          alt='Searching 1'
          draggable='false'
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />,
        <img
          src={TempImg}
          key='Searching 2'
          alt='Searching 2'
          draggable='false'
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />,
      ];
      dispatch(modeActions.setDisplay(displayList));
    }
  }, []);
  return (
    <div id='Display Searching' style={{ ...props }}>
      {mode.searchingState.display[mode.searchingState.currentIdx]}
    </div>
  );
}

export default DisplaySearching;
