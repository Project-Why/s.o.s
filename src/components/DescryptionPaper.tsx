import PaperRollUp from 'assets/images/Cockpit/Decryption/Paper-RollUp.gif';

import { CSSProperties } from 'react';

function DescryptionPaper(props: CSSProperties) {
  return (
    <div id='Script' style={{ ...props }}>
      <img
        src={PaperRollUp}
        alt='Script Off'
        style={{ width: '100%', objectFit: 'cover' }}
      />
    </div>
  );
}

export default DescryptionPaper;
