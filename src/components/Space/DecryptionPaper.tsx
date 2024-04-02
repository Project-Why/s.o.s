import State from 'components/Common/State';
import DecryptionPaperOpened from 'components/Space/DecrpytionPaper/Opened';
import DecryptionPaperOpening from 'components/Space/DecrpytionPaper/Opening';
import DecryptionPaperRollUp from 'components/Space/DecrpytionPaper/RollUp';
import Writing from 'components/Space/Writing';

import { CSSProperties } from 'react';

function DecryptionPaper(props: CSSProperties) {
  return (
    <State
      searchingElement={<DecryptionPaperRollUp {...props} />}
      decryptingElement={<DecryptionPaperOpened {...props} />}
      writingElement={
        <Writing
          padding='10%'
          paddingLeft='16%'
          paddingRight='16%'
          boxSizing='border-box'
          backgroundColor='#FFFFFF'
          {...props}
        />
      }
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
