import CamFail from 'assets/images/Window/Cam/Cam-Fail.gif';
import CamSuccess from 'assets/images/Window/Cam/Cam-Success.gif';
import SendSuccess from 'assets/images/Window/Send/Send-Animation.gif';
import SendingSound from 'assets/sounds/Sending.mp3';

import { useAppDispatch, useAppSelector } from 'hooks';

import { modeActions, selectMode } from 'store/mode';

import {
  SendingAnimationState,
  sendingAnimationStateInterval,
} from 'util/animation';

import { CSSProperties, useEffect, useRef } from 'react';

function SendingAnimation(props: CSSProperties) {
  const audioRef = useRef(new Audio(SendingSound));
  const mode = useAppSelector(selectMode);
  const dispatch = useAppDispatch();

  /** Writing Animation */
  const animationNextSound = () => {
    dispatch(modeActions.setSendingIsStart());
    dispatch(modeActions.setNextSendingAnimation());
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };

  const animationNext = () => {
    dispatch(modeActions.setNextSendingAnimation());
  };

  const animationLast = () => {
    dispatch(modeActions.setSendingIsLoading());
    dispatch(modeActions.setNextSendingAnimation());
    if (mode.writingState.sendSuccess) {
      dispatch(modeActions.changeMode('Searching'));
      dispatch(modeActions.setText(''));
    }
    dispatch(modeActions.setWritingToast('None'));
  };

  const sendingAnimationStateAction: {
    [key in SendingAnimationState]: () => void;
  } = {
    [SendingAnimationState.Completed]: animationNext,
    [SendingAnimationState.ProgressBar]: animationNextSound,
    [SendingAnimationState.Sending]: animationNext,
    [SendingAnimationState.Cam]: animationLast,
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    if (mode.writingState.isStart) {
      intervalId = setInterval(
        sendingAnimationStateAction[mode.writingState.currentAnimation],
        sendingAnimationStateInterval[mode.writingState.currentAnimation],
      );
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [mode.writingState.isStart, mode.writingState.currentAnimation]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    if (
      mode.writingState.isLoading &&
      (mode.writingState.currentAnimation === SendingAnimationState.Sending ||
        mode.writingState.currentAnimation === SendingAnimationState.Cam)
    ) {
      intervalId = setInterval(
        sendingAnimationStateAction[mode.writingState.currentAnimation],
        sendingAnimationStateInterval[mode.writingState.currentAnimation],
      );
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [mode.writingState.isLoading, mode.writingState.currentAnimation]);

  return (
    <>
      <img
        id='Send Animation'
        draggable='false'
        src={`${SendSuccess}?${mode.writingState.imageKey}`}
        alt='Send Animation'
        style={{
          ...props,
          position: 'absolute',
          display:
            mode.writingState.currentAnimation === SendingAnimationState.Sending
              ? 'flex'
              : 'none',
          objectFit: 'cover',
        }}
      />
      <img
        id='Send Cam'
        draggable='false'
        src={`${mode.writingState.sendSuccess ? CamSuccess : CamFail}?${mode.writingState.imageKey}`}
        alt='Send Cam'
        style={{
          width: '24.79%',
          height: '28.7%',
          left: '37.605%',
          top: '20.65%',
          position: 'absolute',
          display:
            mode.writingState.currentAnimation === SendingAnimationState.Cam
              ? 'flex'
              : 'none',
          objectFit: 'cover',
        }}
      />
    </>
  );
}

export default SendingAnimation;
