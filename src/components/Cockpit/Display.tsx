import { useAppSelector } from 'hooks';
import { CSSProperties } from 'react';
import { selectCount } from 'store/counter';
import { selectMode } from 'store/mode';

function Display(props: CSSProperties) {
  const counter = useAppSelector(selectCount);
  const mode = useAppSelector(selectMode);
  return (
    <div id='display' draggable='false' style={{ ...props }}>
      Display {counter.count} <br />
      prev: {mode.prevMode} <br />
      current: {mode.currentMode}
    </div>
  );
}

export default Display;
