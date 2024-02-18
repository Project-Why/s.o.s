import Cockpit from 'components/Cockpit/Cockpit';
import DescryptionPaper from 'components/Cockpit/DecryptionPaper';
import Display from 'components/Cockpit/Display';
import LeftButton from 'components/Cockpit/LeftButton';
import RightButton from 'components/Cockpit/RightButton';
import WritingButton from 'components/Cockpit/WritingButton';
import Space from 'components/Space/Space';

import 'pages/App.css';

import { useAppSelector } from 'hooks';
import { useLayoutEffect } from 'react';
import { selectMode } from 'store/mode';

function App() {
  const mode = useAppSelector(selectMode);
  const FixRatio = () => {
    const root: HTMLElement | null = document.querySelector('#root');
    const app: HTMLElement | null = document.getElementById('App');

    if (root && app) {
      let width = root.clientWidth;
      let height = width * 0.5625; // 1080 ÷ 1920 ≒ 0.5625

      if (height > root.clientHeight) {
        height = root.clientHeight;
        width = height * 1.7777; // 1920 ÷ 1080 ≒ 1.7777
      }

      app.style.width = `${width}px`;
      app.style.height = `${height}px`;
    }
  };
  useLayoutEffect(() => {
    window.onresize = FixRatio;
    FixRatio();
  }, []);
  return (
    <div
      id='App'
      draggable='false'
      style={{
        backgroundColor: 'black',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'FlowerScent',
        color: 'white',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none',
        userSelect: 'none',
      }}
    >
      <Space
        zIndex={0}
        width='100%'
        height='100%'
        position='absolute'
        display='flex'
      />
      <DescryptionPaper
        zIndex={2}
        width='100%'
        height='100%'
        position='absolute'
        display='flex'
        pointerEvents={mode.currentMode === 'Decrypting' ? 'auto' : 'none'}
      />
      <Cockpit
        zIndex={3}
        width='100%'
        height='100%'
        position='absolute'
        display='flex'
        pointerEvents='none'
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
        left='24%'
        width='9.1%'
        top='79.4%'
        height='13.7%'
        position='absolute'
        display='flex'
      />
      <LeftButton
        zIndex={4}
        left='42.6%'
        width='8.6%'
        top='88.1%'
        height='9.7%'
        position='absolute'
        display='flex'
      />
      <RightButton
        zIndex={4}
        left='52.1%'
        width='8.6%'
        top='88.2%'
        height='9.6%'
        position='absolute'
        display='flex'
      />
    </div>
  );
}

export default App;
