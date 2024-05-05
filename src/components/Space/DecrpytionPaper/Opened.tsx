import MorseOpened from 'assets/images/Cockpit/Decryption/Morse/Morse.png';
import PaperOpened from 'assets/images/Cockpit/Decryption/Paper-Opened.gif';

import DecryptionPaperXButton from 'components/Space/DecrpytionPaper/XButton';

import { CSSProperties } from 'react';

function DecryptionPaperOpened(props: CSSProperties) {
  return (
    <div id='Paper Opened' draggable='false' style={{ ...props }}>
      <img
        draggable='false'
        src={PaperOpened}
        alt='paper opened'
        style={{ width: '100%', objectFit: 'cover', position: 'absolute' }}
      />
      <img
        draggable='false'
        src={MorseOpened}
        alt='morse opened'
        style={{
          width: '96%',
          left: '1.25%',
          height: '95.6%',
          top: '2.22%',
          objectFit: 'cover',
          position: 'absolute',
          opacity: '.45',
        }}
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
