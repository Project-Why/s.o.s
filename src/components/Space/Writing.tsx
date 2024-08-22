import MouseWriting from 'assets/images/Mouse/Mouse-Writing.png';
import GuideLine1 from 'assets/images/Window/Writing/Guide-Line_1.gif';
import GuideLine2 from 'assets/images/Window/Writing/Guide-Line_2.gif';

import { useAppDispatch, useAppSelector } from 'hooks';

import { modeActions, selectMode } from 'store/mode';
import { selectScreen } from 'store/screen';

import LimitInfo from 'components/Common/LimitInfo';
import SendingAnimation from 'components/Space/SendingAnimation';

import { SendingAnimationState } from 'util/animation';
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
          pointerEvents:
            mode.writingState.currentAnimation ===
            SendingAnimationState.Completed
              ? 'auto'
              : 'none',
          display:
            mode.writingState.currentAnimation ===
              SendingAnimationState.Completed ||
            mode.writingState.currentAnimation ===
              SendingAnimationState.ProgressBar
              ? 'flex'
              : 'none',
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
      <SendingAnimation {...props} />
    </div>
  );
}

export default Writing;
