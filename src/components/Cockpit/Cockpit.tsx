import CockpitScreen from 'assets/images/Cockpit/Cockpit.gif';

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
    </div>
  );
}

export default Cockpit;
