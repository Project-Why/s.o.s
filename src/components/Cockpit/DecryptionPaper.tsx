import State from 'components/State';

import { CSSProperties } from 'react';

import DecryptionPaperOpened from './DecrpytionPaper/Opened';
import DecryptionPaperOpening from './DecrpytionPaper/Opening';
import DecryptionPaperRollUp from './DecrpytionPaper/RollUp';

function DecryptionPaper(props: CSSProperties) {
  return (
    <State
      searchingElement={<DecryptionPaperRollUp {...props} />}
      decryptingElement={<DecryptionPaperOpened {...props} />}
      animations={[
        {
          prevMode: 'Searching',
          currentMode: 'Decrypting',
          animationComponent: <DecryptionPaperOpening {...props} />,
        },
      ]}
    />
  );
}

export default DecryptionPaper;
