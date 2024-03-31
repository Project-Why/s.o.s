import State from 'components/State';

import { CSSProperties } from 'react';

import DecryptionPaperOpening from './DecrpytionPaper/Opening';
import DecryptionPaperRollUp from './DecrpytionPaper/RollUp';

function DecryptionPaper(props: CSSProperties) {
  return (
    <State
      searchingElement={<DecryptionPaperRollUp {...props} />}
      decryptingElement={<DecryptionPaperOpening {...props} />}
    />
  );
}

export default DecryptionPaper;
