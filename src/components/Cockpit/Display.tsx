import { useAppSelector } from 'hooks';

import { selectMode } from 'store/mode';

import { CSSProperties } from 'react';

import DisplayDecrypting from './Display/Decrypting';
import DisplaySearching from './Display/Searching';
import DisplayWriting from './Display/Writing';

function Display(props: CSSProperties) {
  const mode = useAppSelector(selectMode);
  return mode.currentMode === 'Searching' ? (
    <DisplaySearching {...props} />
  ) : mode.currentMode === 'Writing' ? (
    <DisplayWriting {...props} />
  ) : (
    <DisplayDecrypting {...props} />
  );
}

export default Display;
