import GuideLine1 from 'assets/images/Window/Writing/Guide-Line_1.gif';
import GuideLine2 from 'assets/images/Window/Writing/Guide-Line_2.gif';

import { useAppDispatch, useAppSelector } from 'hooks';

import { modeActions, selectMode } from 'store/mode';

import { CSSProperties, ChangeEvent, FocusEvent, useRef } from 'react';

function Writing(props: CSSProperties) {
  const lineHeight = 9;
  const maxByte = 150;
  const allowedCharacters = /^[A-Za-z0-9 ,:?'–/()"=+×@ㄱ-ㅎ가-힣ㅏ-ㅣéÉ\n]*$/;

  const mode = useAppSelector(selectMode);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useAppDispatch();

  const onBlurHandler = (e: FocusEvent<HTMLElement, Element>) => {
    if (e.relatedTarget === null) {
      e.target.focus();
    }
  };
  const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;
    const byteLength = new TextEncoder().encode(inputText).length;
    if (
      byteLength <= maxByte &&
      allowedCharacters.test(inputText) &&
      textAreaRef.current &&
      textAreaRef.current.scrollHeight === textAreaRef.current.clientHeight
    ) {
      dispatch(modeActions.setText(inputText));
    } else {
      e.target.value = mode.writingState.text;
    }
  };

  return (
    <div
      id='Writing Input'
      style={{
        display: mode.currentMode === 'Writing' ? 'flex' : 'none',
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
          top: '25%',
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
          top: '40%',
          width: '74%',
          pointerEvents: 'none',
        }}
      />
      <textarea
        ref={textAreaRef}
        value={mode.writingState.text}
        onBlur={onBlurHandler}
        onChange={onChangeHandler}
        spellCheck={false}
        style={{
          width: '100%',
          height: `${2 * lineHeight}vw`,
          verticalAlign: 'top',
          fontFamily: 'FlowerScent',
          fontSize: '3vw',
          lineHeight: `${lineHeight}vw`,
          borderWidth: 0,
          outline: 'none',
          resize: 'none',
        }}
      />
      <div
        id=''
        style={{
          left: '70%',
          top: '55%',
          width: '15vw',
          height: '2vw',
          position: 'absolute',
          textAlign: 'right',
          fontFamily: 'FlowerScent',
          fontSize: '2vw',
          color: '#000000',
        }}
      >
        {new TextEncoder().encode(mode.writingState.text).length} / 150 Byte
      </div>
    </div>
  );
}

export default Writing;
