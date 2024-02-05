import { useAppSelector } from 'hooks';
import { CSSProperties } from 'react';
import { selectCount } from 'store/counter';

function Display(props: CSSProperties) {
  const counter = useAppSelector(selectCount);
  return (
    <div id='display' style={{ ...props }}>
      Display {counter.count}
    </div>
  );
}

export default Display;
