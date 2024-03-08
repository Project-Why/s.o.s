import PaperRollUp from 'assets/images/Cockpit/Decryption/Paper-Roll-Up.gif';

import { CSSProperties } from 'react';

function DecryptionPaperRollUp(props: CSSProperties) {
  return (
    <div id='Script' draggable='false' style={{ ...props }}>
      <img
        draggable='false'
        src={PaperRollUp}
        alt='paper roll up'
        style={{ width: '100%', objectFit: 'cover' }}
      />
    </div>
  );
}

export default DecryptionPaperRollUp;
