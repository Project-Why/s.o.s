import morseAnimation from 'assets/images/Cockpit/Decryption/Morse/Morse-Animation.gif';
import paperAnimation from 'assets/images/Cockpit/Decryption/Paper-Animation.gif';
import PaperOpened from 'assets/images/Cockpit/Decryption/Paper-Opened.gif';

import DecryptionPaperOpened from 'components/Space/DecrpytionPaper/Opened';
import DecryptionPaperXButton from 'components/Space/DecrpytionPaper/XButton';

import { CSSProperties, useEffect, useState } from 'react';

function DecryptionPaperOpening(props: CSSProperties) {
  const [showPaperAnimation, setShowPaperAnimation] = useState(true);
  const [showMorseAnimation, setShowMorseAnimation] = useState(false);

  const showPaperAnimationInterval = 1533;
  const showMorseAnimationInterval = 800;

  const turnOffshowPaperAnimation = () => {
    setShowPaperAnimation(false);
    setShowMorseAnimation(true);
  };
  const turnOffshowMorseAnimation = () => {
    setShowMorseAnimation(false);
  };

  useEffect(() => {
    const turnOffshowPaperAnimationTime =
      showPaperAnimation &&
      setInterval(turnOffshowPaperAnimation, showPaperAnimationInterval);
    const turnOffshowMorseAnimationTime =
      showMorseAnimation &&
      setInterval(turnOffshowMorseAnimation, showMorseAnimationInterval);
    return () => {
      if (turnOffshowPaperAnimationTime) {
        clearInterval(turnOffshowPaperAnimationTime);
      }
      if (turnOffshowMorseAnimationTime) {
        clearInterval(turnOffshowMorseAnimationTime);
      }
    };
  }, [showPaperAnimation, showMorseAnimation]);

  return showPaperAnimation ? (
    <div id='Paper Opening 1' draggable='false' style={{ ...props }}>
      <img
        draggable='false'
        src={paperAnimation}
        alt='paper opening'
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'absolute',
        }}
      />
    </div>
  ) : showMorseAnimation ? (
    <div id='Paper Opening 2' draggable='false' style={{ ...props }}>
      <img
        draggable='false'
        src={PaperOpened}
        alt='paper opened'
        style={{ width: '100%', objectFit: 'cover', position: 'absolute' }}
      />
      <img
        draggable='false'
        src={morseAnimation}
        alt='morse open animation'
        style={{
          width: '96%',
          left: '1.25%',
          height: '95.6%',
          top: '2.22%',
          objectFit: 'cover',
          position: 'absolute',
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
  ) : (
    <DecryptionPaperOpened {...props} />
  );
}

export default DecryptionPaperOpening;
