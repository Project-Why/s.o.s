import GuideLine1 from 'assets/images/Window/Writing/Guide-Line_1.gif';
import GuideLine2 from 'assets/images/Window/Writing/Guide-Line_2.gif';

import { useAppSelector } from 'hooks';

import { selectMode } from 'store/mode';

import {
  CSSProperties,
  ChangeEvent,
  FocusEvent,
  useRef,
  useState,
} from 'react';

function Writing(props: CSSProperties) {
  const lineHeight = 9;
  const maxByte = 90;
  const maxLine = 2;

  const mode = useAppSelector(selectMode);
  const [text, setText] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

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
      textAreaRef.current &&
      textAreaRef.current.scrollHeight === textAreaRef.current.clientHeight
    ) {
      setText(inputText);
    } else {
      e.target.value = text;
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
        value={text}
        onBlur={onBlurHandler}
        onChange={onChangeHandler}
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
    </div>
  );
}

export default Writing;
