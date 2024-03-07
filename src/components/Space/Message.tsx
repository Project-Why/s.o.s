import { useAppSelector } from 'hooks';

import { selectMode } from 'store/mode';

import { CSSProperties } from 'react';

function Message(props: CSSProperties) {
  const mode = useAppSelector(selectMode);

  return (
    <div
      id='Message Input'
      style={{
        display: mode.currentMode === 'Writing' ? 'flex' : 'none',
        ...props,
      }}
    >
      <textarea
        placeholder='다함께 우하하'
        maxLength={30}
        onBlur={(e) => {
          if (e.relatedTarget === null) {
            e.target.focus();
          }
        }}
        style={{
          display: mode.currentMode === 'Writing' ? 'flex' : 'none',
          width: '100%',
          height: '100%',
          verticalAlign: 'top',
          fontFamily: 'FlowerScent',
          fontSize: '7vw',
          borderWidth: 0,
          outline: 'none',
          resize: 'none',
        }}
      />
    </div>
  );
}

export default Message;
