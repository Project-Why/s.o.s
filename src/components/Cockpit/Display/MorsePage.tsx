import Code from 'components/Cockpit/Display/MorseCode';

import { DecryptingDisplay, MorseCode } from 'util/morse';

import React, { CSSProperties } from 'react';

export type MorsePageProps = {
  index: number;
  morsePage: MorseCode[][];
};

function MorsePage(props: CSSProperties & MorsePageProps) {
  const { index, morsePage, ...cssProps } = props;

  return (
    <div id={`Page ${index}`} style={{ ...cssProps }}>
      {morsePage.map((line, lineIndex) => (
        <div
          id={`Code Line ${lineIndex}`}
          key={lineIndex}
          style={{
            width: '100%',
            aspectRatio: `${DecryptingDisplay.CodeCount} / 1`,
            display: 'flex',
          }}
        >
          {line.map((code, codeIndex) => (
            <React.Fragment key={`${lineIndex}_${codeIndex}`}>
              <Code
                code={code}
                codeIndex={(index + 1) * (lineIndex + 1) * (codeIndex + 1)}
                display='flex'
                height='100%'
                aspectRatio={`${code.length}/1`}
              />
              <div style={{ height: '100%', aspectRatio: 1 }} />
            </React.Fragment>
          ))}
        </div>
      ))}
    </div>
  );
}

export default MorsePage;
