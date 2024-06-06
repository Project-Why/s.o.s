import { ModeState } from 'types/ModeState';

import ProgressBar from 'assets/images/Cockpit/Display/Writing/Progress-Bar.gif';
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

  const sendMessage = async (text: string) => {
    const response = await messageAPI.createMessage(text);
    if (response) {
      dispatch(modeActions.setSendSuccess(true));
    } else {
      dispatch(modeActions.setSendSuccess(false));
    }
  };

  const handleMouseDown: EventHandler<MouseEvent> = () => {
    if (/^\s*$/.test(mode.writingState.text)) {
      dispatch(modeActions.setWritingToast('Blank'));
    } else {
      sendMessage(mode.writingState.text);

      dispatch(modeActions.setNextImageKey());

      dispatch(modeActions.setWritingIsLoading());
    }
  };

  const removeToast = () => {
    dispatch(modeActions.setWritingToast('None'));
  };

  /** Remove Toast */
  useEffect(() => {
    let showToast: NodeJS.Timer;

    switch (mode.writingState.toast) {
      case 'Blank':
      case 'NotSupportedCharacter':
      case 'LimitLength':
        showToast = setInterval(removeToast, 1000);
        break;
      case 'None':
      default:
        break;
    }

    return () => {
      if (showToast) {
        clearInterval(showToast);
      }
    };
  }, [mode.writingState.toast]);

  /** Choose Image */
  const renderImage = (toast: ModeState.Toast, animationState: number) => {
    switch (toast) {
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
      case 'None':
      default:
        switch (animationState) {
          case 1:
          case 2:
            return (
              <img
                src={ProgressBar}
                alt='Writing Not Supported Character Toast'
                draggable='false'
                style={{
                  width: '100%',
                  objectFit: 'contain',
                }}
              />
            );
          case 3:
            return null;
          case 0:
          default:
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
        }
    }
  };

  return (
    <div id='Display Writing' style={{ ...props }}>
      {renderImage(mode.writingState.toast, mode.writingState.currentAnimation)}
    </div>
  );
}

export default DisplayWriting;
