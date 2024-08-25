import Launch from 'assets/images/Cockpit/Display/Searching/Launch.gif';
import Searching1 from 'assets/images/Cockpit/Display/Searching/Searching_1.gif';
import Searching2 from 'assets/images/Cockpit/Display/Searching/Searching_2.gif';
import Searching3 from 'assets/images/Cockpit/Display/Searching/Searching_3.gif';
import Searching4 from 'assets/images/Cockpit/Display/Searching/Searching_4.gif';
import Searching5 from 'assets/images/Cockpit/Display/Searching/Searching_5.gif';
import Toast4 from 'assets/images/Cockpit/Display/Writing/Toast/Toast_4.gif';

import { useAppSelector } from 'hooks';

import { modeActions, selectMode } from 'store/mode';

import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import {
  CSSProperties,
  EventHandler,
  FocusEvent,
  MouseEvent,
  useEffect,
} from 'react';
import { useDispatch } from 'react-redux';

function DisplaySearching(props: CSSProperties) {
  const mode = useAppSelector(selectMode);
  const dispatch = useDispatch();

  const handleMouseDown = async () => {
    dispatch(modeActions.setInitLaunch(true));
  };
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
        <img
          src={Searching3}
          key='Searching 3'
          alt='Searching 3'
          draggable='false'
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />,
        <img
          src={Searching4}
          key='Searching 4'
          alt='Searching 4'
          draggable='false'
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />,
        <img
          src={Searching5}
          key='Searching 5'
          alt='Searching 5'
          draggable='false'
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />,
      ];
      dispatch(modeActions.setDisplay(displayList));
    }
  }, []);
  return (
    <div id='Display Searching' style={{ ...props }}>
      {!mode.searchingState.initLaunch ? (
        <img
          src={Launch} // Temp
          alt='Writing Not Supported Character Toast'
          draggable='false'
          role='presentation'
          onMouseOver={handleMouseOver}
          onFocus={handleMouseOver}
          onMouseOut={handleMouseOut}
          onBlur={handleMouseOut}
          onMouseDown={handleMouseDown}
          style={{
            width: '100%',
            objectFit: 'contain',
            position: 'absolute',
            zIndex: 1,
          }}
        />
      ) : mode.searchingState.moveSuccess ? (
        mode.searchingState.display[mode.searchingState.currentIdx]
      ) : (
        <img
          src={Toast4}
          alt='Writing Not Supported Character Toast'
          draggable='false'
          style={{
            width: '100%',
            objectFit: 'contain',
          }}
        />
      )}
    </div>
  );
}

export default DisplaySearching;
