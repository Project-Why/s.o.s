import { useAppSelector } from 'hooks';

import { selectCount } from 'store/counter';
import { selectMode } from 'store/mode';

import { CSSProperties } from 'react';

function Display(props: CSSProperties) {
  const counter = useAppSelector(selectCount);
  const mode = useAppSelector(selectMode);
  return (
    <div id='Display' draggable='false' style={{ ...props }}>
      Display {counter.count} <br />
      prev: {mode.prevMode} <br />
      current: {mode.currentMode}
    </div>
  );
}

export default Display;
