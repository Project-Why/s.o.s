import { useAppSelector } from 'hooks';

import { selectMode } from 'store/mode';

import DecryptionPaperOpened from 'components/Space/DecrpytionPaper/Opened';
import DecryptionPaperRollUp from 'components/Space/DecrpytionPaper/RollUp';

import { CSSProperties } from 'react';

function DecryptionPaper(props: CSSProperties) {
  const mode = useAppSelector(selectMode);
  return (
    <>
      <DecryptionPaperRollUp
        display={`${mode.currentMode === 'Searching' || mode.currentMode === 'Writing' ? 'flex' : 'none'}`}
        {...props}
      />
      <DecryptionPaperOpened
        display={`${mode.currentMode === 'Decrypting' ? 'flex' : 'none'}`}
        {...props}
      />
    </>
  );
}

export default DecryptionPaper;
