import MorseDot1 from 'assets/images/Cockpit/Display/Decrypting/Morse-Dot_1.gif';
import MorseDot2 from 'assets/images/Cockpit/Display/Decrypting/Morse-Dot_2.gif';
import MorseDot3 from 'assets/images/Cockpit/Display/Decrypting/Morse-Dot_3.gif';
import MorseDot4 from 'assets/images/Cockpit/Display/Decrypting/Morse-Dot_4.gif';
import MorseDot5 from 'assets/images/Cockpit/Display/Decrypting/Morse-Dot_5.gif';
import MorseLine1 from 'assets/images/Cockpit/Display/Decrypting/Morse-Line_1.gif';
import MorseLine2 from 'assets/images/Cockpit/Display/Decrypting/Morse-Line_2.gif';
import MorseLine3 from 'assets/images/Cockpit/Display/Decrypting/Morse-Line_3.gif';
import MorseLine4 from 'assets/images/Cockpit/Display/Decrypting/Morse-Line_4.gif';
import MorseLine5 from 'assets/images/Cockpit/Display/Decrypting/Morse-Line_5.gif';

import { useAppDispatch } from 'hooks';

import { translateActions } from 'store/translate';

import { CSSProperties, EventHandler, FocusEvent, MouseEvent } from 'react';

export type SignalProps = {
  signal: string;
  index: number;
};

function Signal(props: SignalProps & CSSProperties) {
  const { signal, index, ...cssProps } = props;
  const dots = [MorseDot1, MorseDot2, MorseDot3, MorseDot4, MorseDot5];
  const lines = [MorseLine1, MorseLine2, MorseLine3, MorseLine4, MorseLine5];

  const dispatch = useAppDispatch();

  const handleMouseOut: EventHandler<MouseEvent | FocusEvent> = () => {
    dispatch(translateActions.setTranslate({ index: null }));
  };
  const handleMouseOver: EventHandler<MouseEvent | FocusEvent> = () => {
    dispatch(translateActions.setTranslate({ index }));
  };
  return (
    <div
      id={`Signal ${index}`}
      style={{
        ...cssProps,
      }}
      onMouseOver={handleMouseOver}
      onFocus={handleMouseOver}
      onMouseOut={handleMouseOut}
      onBlur={handleMouseOut}
    >
      {Array.from(signal).map((code, codeIndex) => (
        <div
          id={`Code ${codeIndex}`}
          key={`Code ${codeIndex}`}
          style={{
            height: '100%',
            aspectRatio: 1,
            backgroundImage: `url(${code === '-' ? lines[Math.floor(Math.random() * 5)] : dots[Math.floor(Math.random() * 5)]})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      ))}
    </div>
  );
}

export default Signal;
