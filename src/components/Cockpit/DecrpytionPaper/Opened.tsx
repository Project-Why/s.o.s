import MorseOpened from 'assets/images/Cockpit/Decryption/Morse/Morse-opened.gif';
import PaperOpened from 'assets/images/Cockpit/Decryption/Paper-Opened.gif';

import { CSSProperties } from 'react';

import DecryptionPaperXButton from './XButton';

function DecryptionPaperOpened(props: CSSProperties) {
  return (
    <div id='Script Opened' draggable='false' style={{ ...props }}>
      <img
        draggable='false'
        src={PaperOpened}
        alt='paper roll up'
        style={{ width: '100%', objectFit: 'cover', position: 'absolute' }}
      />
      <img
        draggable='false'
        src={MorseOpened}
        alt='morse opend'
        style={{ width: '100%', objectFit: 'cover', position: 'absolute' }}
      />
      <DecryptionPaperXButton
        width='4%'
        left='84%'
        height='8%'
        top='18%'
        position='absolute'
        display='flex'
      />
    </div>
  );
}

export default DecryptionPaperOpened;
