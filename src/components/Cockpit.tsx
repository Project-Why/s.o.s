import CockpitScreen from 'assets/images/Cockpit/Cockpit.gif';

import Display from 'components/Display';
import LeftButton from 'components/LeftButton';
import RightButton from 'components/RightButton';
import WritingButton from 'components/WritingButton';

import { CSSProperties } from 'react';

function Cockpit(props: CSSProperties) {
  return (
    <div id='Cockpit' draggable='false' style={{ ...props }}>
      <img
        draggable='false'
        src={CockpitScreen}
        alt='Cockpit Screen'
        style={{ objectFit: 'cover' }}
      />
      <Display
        zIndex={4}
        left='37%'
        width='28%'
        top='54%'
        height='30%'
        position='absolute'
        display='flex'
        justifyContent='center'
        alignItems='center'
      />
      <WritingButton
        zIndex={4}
        left='20%'
        width='10%'
        top='90%'
        height='10%'
        position='absolute'
        display='flex'
      />
      <LeftButton
        zIndex={4}
        left='40%'
        width='10%'
        top='90%'
        height='10%'
        position='absolute'
        display='flex'
      />
      <RightButton
        zIndex={4}
        left='50%'
        width='10%'
        top='90%'
        height='10%'
        position='absolute'
        display='flex'
      />
    </div>
  );
}

export default Cockpit;
