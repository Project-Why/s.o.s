import DisplayDecrypting from 'components/Cockpit/Display/Decrypting';
import DisplaySearching from 'components/Cockpit/Display/Searching';
import DisplayWriting from 'components/Cockpit/Display/Writing';
import State from 'components/Common/State';

import { CSSProperties } from 'react';

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
