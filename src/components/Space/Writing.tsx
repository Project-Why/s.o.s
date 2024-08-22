import MouseWriting from 'assets/images/Mouse/Mouse-Writing.png';
import CamFail from 'assets/images/Window/Cam/Cam-Fail.gif';
import CamSuccess from 'assets/images/Window/Cam/Cam-Success.gif';
import SendSuccess from 'assets/images/Window/Send/Send-Animation.gif';
import GuideLine1 from 'assets/images/Window/Writing/Guide-Line_1.gif';
import GuideLine2 from 'assets/images/Window/Writing/Guide-Line_2.gif';
import SendingSound from 'assets/sounds/Sending.mp3';

import { useAppDispatch, useAppSelector } from 'hooks';

import { modeActions, selectMode } from 'store/mode';
import { selectScreen } from 'store/screen';

import LimitInfo from 'components/Common/LimitInfo';

import { allowedCharacters } from 'util/morse';

import {
  CSSProperties,
  ChangeEvent,
  FocusEvent,
  useEffect,
  useRef,
  useState,
} from 'react';

function Writing(props: CSSProperties) {
  const lineHeight = 15;
  const fontHeight = 6;
  const maxByte = 150;
  const maxLineCount = 2;

  const audioRef = useRef(new Audio(SendingSound));
  const [lineCount, setLineCount] = useState(1);
  const mode = useAppSelector(selectMode);
  const { height } = useAppSelector(selectScreen);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const lineCheckerRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useAppDispatch();

  const onBlurHandler = (e: FocusEvent<HTMLElement, Element>) => {
    if (e.relatedTarget === null) {
      e.target.focus();
    }
  };
  const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;
    const byteLength = new TextEncoder().encode(inputText).length;
    const textArea = textAreaRef.current;
    if (
      byteLength <= maxByte &&
      allowedCharacters.test(inputText) &&
      textArea &&
      textArea.clientHeight === textArea.scrollHeight
    ) {
      dispatch(modeActions.setText(inputText));
    } else if (!allowedCharacters.test(inputText)) {
      dispatch(modeActions.setWritingToast('NotSupportedCharacter'));
    } else if (
      byteLength > maxByte ||
      (textArea && textArea.clientHeight !== textArea.scrollHeight)
    ) {
      dispatch(modeActions.setWritingToast('LimitLength'));
    }
  };
  const onTextChangeHandler = () => {
    const lineChecker = lineCheckerRef.current;
    let currentLineCount = 1;
    if (lineChecker) {
      currentLineCount = Math.ceil(
        lineChecker.scrollHeight / lineChecker.clientHeight,
      );
    }
    setLineCount(Number.isNaN(currentLineCount) ? 1 : currentLineCount);
  };

  useEffect(() => {
    onTextChangeHandler();
  }, [mode.writingState.text]);

  /** Writing Animation */
  const animationNextSound = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
    dispatch(modeActions.setNextSendingAnimation());
  };

  const animationNext = () => {
    dispatch(modeActions.setNextSendingAnimation());
  };

  const setToast = () => {
    dispatch(modeActions.setNextSendingAnimation());
    if (mode.writingState.sendSuccess) {
      dispatch(modeActions.setWritingToast('Success'));
    } else {
      dispatch(modeActions.setWritingToast('Fail'));
    }
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

  useEffect(() => {
    const startAnimation =
      mode.writingState.isLoading &&
      mode.writingState.currentAnimation === 0 &&
      setInterval(animationNext, 0);
    const progressBarAnimation =
      mode.writingState.isLoading &&
      mode.writingState.currentAnimation === 1 &&
      setInterval(animationNextSound, 2500);
    const sendSuccessAnimation =
      mode.writingState.isLoading &&
      mode.writingState.currentAnimation === 2 &&
      setInterval(setToast, 1750);
    const camAnimation =
      mode.writingState.isLoading &&
      mode.writingState.currentAnimation === 3 &&
      setInterval(animationLast, 2000);
    return () => {
      if (startAnimation) {
        clearInterval(startAnimation);
      }
      if (progressBarAnimation) {
        clearInterval(progressBarAnimation);
      }
      if (sendSuccessAnimation) {
        clearInterval(sendSuccessAnimation);
      }
      if (camAnimation) {
        clearInterval(camAnimation);
      }
    };
  }, [mode.writingState.isLoading, mode.writingState.currentAnimation]);

  return (
    <div
      id='Writing'
      style={{
        ...props,
      }}
    >
      <div
        id='Writing Input'
        style={{
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          position: 'absolute',
          padding: '10%',
          paddingLeft: '16%',
          paddingRight: '16%',
          boxSizing: 'border-box',
          backgroundColor: '#FFFFFF',
          pointerEvents: `${mode.writingState.currentAnimation === 0 ? 'auto' : 'none'}`,
          display: `${
            mode.writingState.currentAnimation === 0 ||
            mode.writingState.currentAnimation === 1
              ? 'flex'
              : 'none'
          }`,
        }}
      >
        <img
          draggable='false'
          src={GuideLine1}
          alt='Guide-Line_1'
          style={{
            objectFit: 'cover',
            position: 'absolute',
            left: '13%',
            top: '23%',
            width: '74%',
            pointerEvents: 'none',
          }}
        />
        <img
          draggable='false'
          src={GuideLine2}
          alt='Guide-Line_2'
          style={{
            objectFit: 'cover',
            position: 'absolute',
            left: '13%',
            top: '38%',
            width: '74%',
            pointerEvents: 'none',
          }}
        />
        <textarea
          id='Text Area'
          ref={textAreaRef}
          value={mode.writingState.text}
          onBlur={onBlurHandler}
          onChange={onChangeHandler}
          spellCheck={false}
          style={{
            padding: 0,
            width: '100%',
            height: (2 * lineHeight * height) / 100,
            verticalAlign: 'top',
            fontFamily: 'FlowerScent',
            fontSize: (fontHeight * height) / 100,
            lineHeight: lineHeight / fontHeight,
            borderWidth: 0,
            outline: 'none',
            resize: 'none',
            cursor: `url(${MouseWriting}), auto`,
          }}
        />
        <textarea
          id='Line Checker'
          ref={lineCheckerRef}
          value={mode.writingState.text}
          onChange={() => {}}
          spellCheck={false}
          style={{
            padding: 0,
            width: '100%',
            height: (lineHeight * height) / 100,
            verticalAlign: 'top',
            fontFamily: 'FlowerScent',
            fontSize: (fontHeight * height) / 100,
            lineHeight: lineHeight / fontHeight,
            borderWidth: 0,
            outline: 'none',
            resize: 'none',
            pointerEvents: 'none',
            visibility: 'hidden',
          }}
        />
        <LimitInfo
          right={15}
          top={52}
          current={new TextEncoder().encode(mode.writingState.text).length}
          max={150}
          info='Bytes'
          fontSize={4}
          color='black'
        />
        <LimitInfo
          right={15}
          top={60}
          current={lineCount}
          max={maxLineCount}
          info='Lines'
          fontSize={4}
          color='black'
        />
      </div>
      <img
        id='Send Animation'
        draggable='false'
        src={`${SendSuccess}?${mode.writingState.imageKey}`}
        alt='Send Animation'
        style={{
          ...props,
          position: 'absolute',
          display: `${
            mode.writingState.currentAnimation === 2 ? 'flex' : 'none'
          }`,
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
          display: `${
            mode.writingState.currentAnimation === 3 ? 'flex' : 'none'
          }`,
          objectFit: 'cover',
        }}
      />
    </div>
  );
}

export default Writing;
