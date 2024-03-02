import MorseOpening from 'assets/images/Cockpit/Decryption/Morse/Morse-opening.gif';
import PaperAnimation from 'assets/images/Cockpit/Decryption/Paper-Animation.gif';
import PaperOpened from 'assets/images/Cockpit/Decryption/Paper-Opened.gif';

import { CSSProperties, useState } from 'react';

import DecryptionPaperXButton from './XButton';

function DecryptionPaperOpening(props: CSSProperties) {
  const [paperAnimation, setPaperAnimation] = useState(true);
  const [morseAnimation, setMorseAnimation] = useState(false);

  const turnOffPaperAnimation = () => {
    setPaperAnimation(false);
    setMorseAnimation(true);
  };
  const turnOffMorseAnimation = () => {
    setMorseAnimation(false);
  };

  return (
    <div id='Script Opened' draggable='false' style={{ ...props }}>
      {paperAnimation ? (
        <img
          id='Paper Animation'
          draggable='false'
          src={PaperAnimation}
          alt='paper open animation'
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
          }}
          onAnimationEnd={turnOffPaperAnimation}
        />
      ) : (
        <>
          <img
            draggable='false'
            src={PaperOpened}
            alt='paper roll up'
            style={{ width: '100%', objectFit: 'cover', position: 'absolute' }}
          />
          <img
            id='Paper Animation'
            draggable='false'
            src={MorseOpening}
            alt='morse open animation'
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              // backgroundRepeat: 'no-repeat',
              // animationDelay: '0s',
              // animationDuration: '2s',
            }}
            onAnimationEnd={turnOffMorseAnimation}
          />
          <DecryptionPaperXButton
            width='4%'
            left='84%'
            height='8%'
            top='18%'
            position='absolute'
            display='flex'
          />
        </>
      )}
    </div>
  );
}

export default DecryptionPaperOpening;
