import Searching1 from 'assets/images/Cockpit/Display/Searching/Searching_1.gif';
import Searching2 from 'assets/images/Cockpit/Display/Searching/Searching_2.gif';

import { useAppSelector } from 'hooks';

import { modeActions, selectMode } from 'store/mode';

import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { CSSProperties, useEffect } from 'react';
import { useDispatch } from 'react-redux';

function DisplaySearching(props: CSSProperties) {
  const mode = useAppSelector(selectMode);
  const dispatch = useDispatch();
  useEffect(() => {
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
          src={Searching2}
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
