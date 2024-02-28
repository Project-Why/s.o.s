import PaperAnimation from 'assets/images/Cockpit/Decryption/Paper-Animation.gif';
import PaperOpened from 'assets/images/Cockpit/Decryption/Paper-Opened.gif';
import PaperRollUp from 'assets/images/Cockpit/Decryption/Paper-RollUp.gif';

import { useAppSelector } from 'hooks';

import { selectMode } from 'store/mode';

import { CSSProperties } from 'react';

function DecryptionPaper(props: CSSProperties) {
  const mode = useAppSelector(selectMode);
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

export default DecryptionPaper;
