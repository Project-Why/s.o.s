import State from 'components/Common/State';
import DecryptionPaperOpened from 'components/Space/DecrpytionPaper/Opened';
import DecryptionPaperOpening from 'components/Space/DecrpytionPaper/Opening';
import DecryptionPaperRollUp from 'components/Space/DecrpytionPaper/RollUp';

import { CSSProperties } from 'react';

function DecryptionPaper(props: CSSProperties) {
  return (
    <State
      searchingElement={<DecryptionPaperRollUp {...props} />}
      decryptingElement={<DecryptionPaperOpened {...props} />}
      writingElement={<DecryptionPaperRollUp {...props} />}
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
