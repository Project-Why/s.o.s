import Searching1 from 'assets/images/Cockpit/Display/Searching/Searching_1.gif';

import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { CSSProperties } from 'react';

function DisplaySearching(props: CSSProperties) {
  const displayList: [EmotionJSX.Element] = [
    <img
      src={Searching1}
      key='Searching 1'
      alt='Searching 1'
      draggable='false'
      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
    />,
  ];
  return (
    <div id='Display Searching' style={{ ...props }}>
      {displayList[0]}
    </div>
  );
}

export default DisplaySearching;
