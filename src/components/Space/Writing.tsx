import CamFail from 'assets/images/Window/Cam/Cam-Fail.gif';
import CamIntro from 'assets/images/Window/Cam/Cam-Intro.gif';
import CamSuccess from 'assets/images/Window/Cam/Cam-Success.gif';
import SendSuccess from 'assets/images/Window/Send/Send-Success.gif';
import GuideLine1 from 'assets/images/Window/Writing/Guide-Line_1.gif';
import GuideLine2 from 'assets/images/Window/Writing/Guide-Line_2.gif';

import { useAppDispatch, useAppSelector } from 'hooks';

import { modeActions, selectMode } from 'store/mode';
import { selectScreen } from 'store/screen';

import LimitInfo from 'components/Common/LimitInfo';

import { allowedCharacters } from 'common/morse';

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
    setLineCount(currentLineCount);
  };

  useEffect(() => {
    onTextChangeHandler();
  }, [mode.writingState.text]);

  /** Writing Animation */
  const animationNext = () => {
    dispatch(modeActions.setNextWritingAnimation());
  };

  const setToast = () => {
    dispatch(modeActions.setNextWritingAnimation());
    if (mode.writingState.sendSuccess) {
      dispatch(modeActions.setWritingToast('Success'));
    } else {
      dispatch(modeActions.setWritingToast('Fail'));
    }
  };

  const animationLast = () => {
    console.log(mode.writingState.currentAnimation);
    dispatch(modeActions.setWritingIsLoading());
    dispatch(modeActions.setNextWritingAnimation());
    if (mode.writingState.sendSuccess) {
      dispatch(modeActions.changeMode('Searching'));
      // dispatch(modeActions.setText(''))
    }
  };

  useEffect(() => {
    const startAnimation =
      mode.writingState.isLoading &&
      mode.writingState.currentAnimation === 0 &&
      setInterval(animationNext, 0);
    const progressBarAnimation =
      mode.writingState.isLoading &&
      mode.writingState.currentAnimation === 1 &&
      setInterval(animationNext, 2000);
    const sendSuccessAnimation =
      mode.writingState.isLoading &&
      mode.writingState.currentAnimation === 2 &&
      setInterval(animationNext, 1178);
    const camIntroAnimation =
      mode.writingState.isLoading &&
      mode.writingState.currentAnimation === 3 &&
      setInterval(setToast, 571);
    const camAfterAnimation =
      mode.writingState.isLoading &&
      mode.writingState.currentAnimation === 4 &&
      setInterval(animationNext, 571);
    const endAnimation =
      mode.writingState.isLoading &&
      mode.writingState.currentAnimation === 5 &&
      setInterval(animationLast, 429);
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
      if (camIntroAnimation) {
        clearInterval(camIntroAnimation);
      }
      if (camAfterAnimation) {
        clearInterval(camAfterAnimation);
      }
      if (endAnimation) {
        clearInterval(endAnimation);
      }
    };
  }, [mode.writingState.isLoading, mode.writingState.currentAnimation]);

  const renderImages = (currentAnimation: number, sendSuccess: boolean) => {
    switch (currentAnimation) {
      case 2:
        return (
          <div
            id='Send Animation'
            style={{
              display: mode.currentMode === 'Writing' ? 'flex' : 'none',
              backgroundImage: `url(${SendSuccess})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
              ...props,
            }}
          />
        );
      case 3:
        return (
          <>
            <div
              id='Send Animation'
              draggable='false'
              style={{
                display: mode.currentMode === 'Writing' ? 'flex' : 'none',
                backgroundImage: `url(${SendSuccess})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                ...props,
              }}
            />
            <div
              id='Cam Intro'
              draggable='false'
              style={{
                display: mode.currentMode === 'Writing' ? 'flex' : 'none',
                width: '24.79%',
                height: '28.7%',
                left: '2.91%',
                top: '4.81%',
                position: 'absolute',
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                backgroundImage: `url(${CamIntro})`,
              }}
            />
          </>
        );
      case 4:
        if (sendSuccess) {
          return (
            <div
              id='Cam Success'
              draggable='false'
              style={{
                display: mode.currentMode === 'Writing' ? 'flex' : 'none',
                width: '24.79%',
                height: '28.7%',
                left: '2.91%',
                top: '4.81%',
                position: 'absolute',
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                backgroundImage: `url(${CamSuccess})`,
              }}
            />
          );
        }

        return (
          <div
            id='Cam Fail'
            draggable='false'
            style={{
              display: mode.currentMode === 'Writing' ? 'flex' : 'none',
              width: '24.79%',
              height: '28.7%',
              left: '2.91%',
              top: '4.81%',
              position: 'absolute',
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
              backgroundImage: `url(${CamFail})`,
            }}
          />
        );

      case 5:
      case 0:
      default:
        return (
          <div
            id='Writing Input'
            style={{
              display: mode.currentMode === 'Writing' ? 'flex' : 'none',
              flexDirection: 'column',
              padding: '10%',
              paddingLeft: '16%',
              paddingRight: '16%',
              boxSizing: 'border-box',
              backgroundColor: '#FFFFFF',
              pointerEvents: `${currentAnimation === 0 ? 'auto' : 'none'}`,
              ...props,
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
              color='#000000'
            />
            <LimitInfo
              right={15}
              top={60}
              current={lineCount}
              max={maxLineCount}
              info='Lines'
              fontSize={4}
              color='#000000'
            />
          </div>
        );
    }
  };

  return renderImages(
    mode.writingState.currentAnimation,
    mode.writingState.sendSuccess,
  );
}

export default Writing;
