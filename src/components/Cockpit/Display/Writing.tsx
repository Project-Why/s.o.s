import { ModeState } from 'types/ModeState';

import Send from 'assets/images/Cockpit/Display/Writing/Send.gif';
import Toast1 from 'assets/images/Cockpit/Display/Writing/Toast/Toast_1.gif';
import Toast2 from 'assets/images/Cockpit/Display/Writing/Toast/Toast_2.gif';
import Toast3 from 'assets/images/Cockpit/Display/Writing/Toast/Toast_3.gif';
import Toast4 from 'assets/images/Cockpit/Display/Writing/Toast/Toast_4.gif';
import Toast5 from 'assets/images/Cockpit/Display/Writing/Toast/Toast_5.gif';

import { messageAPI } from 'apis/message';

import { useAppDispatch, useAppSelector } from 'hooks';

import { modeActions, selectMode } from 'store/mode';

import {
  CSSProperties,
  EventHandler,
  FocusEvent,
  MouseEvent,
  useEffect,
} from 'react';

function DisplayWriting(props: CSSProperties) {
  const mode = useAppSelector(selectMode);
  const dispatch = useAppDispatch();

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
    if (/^\s*$/.test(mode.writingState.text)) {
      dispatch(modeActions.setWritingToast('Blank'));
    } else {
      messageAPI.createMessage(mode.writingState.text);
    }
  };

  const removeToast = () => {
    dispatch(modeActions.setWritingToast('None'));
  };

  /** Remove Toast */
  useEffect(() => {
    const showToast =
      mode.writingState.toast !== 'None' && setInterval(removeToast, 1000);

    return () => {
      if (showToast) {
        clearInterval(showToast);
      }
    };
  }, [mode.writingState.toast]);

  const renderImage = (toast: ModeState.Toast) => {
    switch (toast) {
      case 'None':
        return (
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
        );
      case 'Blank':
        return (
          <img
            src={Toast1}
            alt='Writing Not Supported Character Toast'
            draggable='false'
            style={{
              width: '100%',
              objectFit: 'contain',
            }}
          />
        );
      case 'NotSupportedCharacter':
        return (
          <img
            src={Toast2}
            alt='Writing Not Supported Character Toast'
            draggable='false'
            style={{
              width: '100%',
              objectFit: 'contain',
            }}
          />
        );
      case 'Success':
        return (
          <img
            src={Toast3}
            alt='Writing Not Supported Character Toast'
            draggable='false'
            style={{
              width: '100%',
              objectFit: 'contain',
            }}
          />
        );

      case 'Fail':
        return (
          <img
            src={Toast4}
            alt='Writing Not Supported Character Toast'
            draggable='false'
            style={{
              width: '100%',
              objectFit: 'contain',
            }}
          />
        );

      case 'LimitLength':
        return (
          <img
            src={Toast5}
            alt='Writing Not Supported Character Toast'
            draggable='false'
            style={{
              width: '100%',
              objectFit: 'contain',
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div id='Display Writing' style={{ ...props }}>
      {renderImage(mode.writingState.toast)}
    </div>
  );
}

export default DisplayWriting;
