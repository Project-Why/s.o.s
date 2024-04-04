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

import { CSSProperties } from 'react';

export type MorseInfoProps = {
  index: number;
  code: string;
};

function MorseInfo(props: CSSProperties & MorseInfoProps) {
  const { index, code, ...cssProps } = props;
  const dots = [MorseDot1, MorseDot2, MorseDot3, MorseDot4, MorseDot5];
  const lines = [MorseLine1, MorseLine2, MorseLine3, MorseLine4, MorseLine5];
  return (
    <div id={`Signal ${index}`} style={{ ...cssProps }}>
      {code.split('\n').map((value, lineIndex) => (
        <div
          id={`Code Line ${lineIndex}`}
          key={`Code Line ${lineIndex}`}
          style={{
            width: '100%',
            height: '30%',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          {Array.from(value).map((char, codeIndex) => (
            <div
              id={`Code ${codeIndex}`}
              key={`Code ${codeIndex}`}
              style={{
                width: '10%',
                aspectRatio: '1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {char === '1' && (
                <img
                  src={lines[Math.floor(Math.random() * 5)]}
                  alt={`Code ${codeIndex}`}
                  style={{ width: '100%', objectFit: 'cover' }}
                />
              )}
              {char === '0' && (
                <img
                  src={dots[Math.floor(Math.random() * 5)]}
                  alt={`Code ${codeIndex}`}
                  style={{ width: '100%', objectFit: 'cover' }}
                />
              )}
              {char === ' ' && (
                <div style={{ width: '100%', aspectRatio: '1' }} />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default MorseInfo;
