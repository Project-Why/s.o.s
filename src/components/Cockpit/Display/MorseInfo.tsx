import MorseDot1 from 'assets/images/Cockpit/Display/Decrypting/Morse_Dot1.gif';
import MorseLine1 from 'assets/images/Cockpit/Display/Decrypting/Morse_Line1.gif';

import { CSSProperties } from 'react';

export type MorseInfoProps = {
  index: number;
  code: string;
};

function MorseInfo(props: CSSProperties & MorseInfoProps) {
  const { index, code, ...cssProps } = props;
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
              style={{ width: '10%', aspectRatio: '1' }}
            >
              {char === '1' && (
                <img
                  src={MorseLine1}
                  alt={`Code ${codeIndex}`}
                  style={{ width: '100%', objectFit: 'cover' }}
                />
              )}
              {char === '0' && (
                <img
                  src={MorseDot1}
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
