import { useAppSelector } from 'hooks';

import { selectMode } from 'store/mode';

import { CSSProperties } from 'react';

import DecryptionPaperOpened from './DecrpytionPaper/Opened';
import DecryptionPaperRollUp from './DecrpytionPaper/RollUp';

function DecryptionPaper(props: CSSProperties) {
  const mode = useAppSelector(selectMode);
  return mode.currentMode === 'Decrypting' ? (
    <DecryptionPaperOpened {...props} />
  ) : (
    <DecryptionPaperRollUp {...props} />
  );
}

export default DecryptionPaper;
