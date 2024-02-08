import Cockpit from 'components/Cockpit';
import DescryptionPaper from 'components/DecryptionPaper';
import Space from 'components/Space';

import 'pages/App.css';

import { useLayoutEffect } from 'react';

function App() {
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
      />
      <Cockpit
        zIndex={3}
        width='100%'
        height='100%'
        position='absolute'
        display='flex'
      />
    </div>
  );
}

export default App;
