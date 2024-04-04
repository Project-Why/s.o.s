import State from 'components/Common/State';

import { CSSProperties } from 'react';

import DisplayDecrypting from './Display/Decrypting';
import DisplaySearching from './Display/Searching';
import DisplayWriting from './Display/Writing';

function Display(props: CSSProperties) {
  return (
    <State
      writingElement={<DisplayWriting {...props} />}
      searchingElement={<DisplaySearching {...props} />}
      decryptingElement={<DisplayDecrypting {...props} />}
    />
  );
}

export default Display;
