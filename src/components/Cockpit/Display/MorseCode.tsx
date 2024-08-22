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

import { modeActions } from 'store/mode';

import { MorseCode } from 'util/morse';

import { CSSProperties, EventHandler, FocusEvent, MouseEvent } from 'react';

export type CodeProps = {
  code: MorseCode;
  codeIndex: number;
};

function Code(props: CodeProps & CSSProperties) {
  const { code, codeIndex, ...cssProps } = props;
  const dots = [MorseDot1, MorseDot2, MorseDot3, MorseDot4, MorseDot5];
  const lines = [MorseLine1, MorseLine2, MorseLine3, MorseLine4, MorseLine5];

  const dispatch = useAppDispatch();

  const handleMouseOut: EventHandler<MouseEvent | FocusEvent> = () => {
    dispatch(modeActions.setCode(null));
  };
  const handleMouseOver: EventHandler<MouseEvent | FocusEvent> = () => {
    dispatch(modeActions.setCode(code));
    dispatch(modeActions.setCodeIndex(codeIndex));
  };
  return (
    <div
      id={`code ${code}`}
      style={{
        ...cssProps,
      }}
      onMouseOver={handleMouseOver}
      onFocus={handleMouseOver}
      onMouseOut={handleMouseOut}
      onBlur={handleMouseOut}
    >
      {Array.from(code).map((symbol, symbolIndex) => (
        <div
          id={`Code ${symbolIndex}`}
          key={`Code ${symbolIndex}`}
          style={{
            height: '100%',
            aspectRatio: 1,
            backgroundImage: `url(${symbol === '-' ? lines[Math.floor(Math.random() * 5)] : dots[Math.floor(Math.random() * 5)]})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      ))}
    </div>
  );
}

export default Code;
