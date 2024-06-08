import { useAppSelector } from 'hooks';

import { selectMode } from 'store/mode';
import { screenActions, selectScreen } from 'store/screen';

import Cockpit from 'components/Cockpit/Cockpit';
import Display from 'components/Cockpit/Display';
import LeftButton from 'components/Cockpit/LeftButton';
import RightButton from 'components/Cockpit/RightButton';
import WritingButton from 'components/Cockpit/WritingButton';
import MorseSound from 'components/Common/MorseSound';
import DescryptionPaper from 'components/Space/DecryptionPaper';
import Space from 'components/Space/Space';
import Writing from 'components/Space/Writing';

import 'pages/App.css';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function App() {
  const mode = useAppSelector(selectMode);
  const screen = useAppSelector(selectScreen);
  const dispatch = useDispatch();
  const FixRatio = () => {
    let width = window.innerWidth;
    let height = width * 0.5625; // 1080 ÷ 1920 ≒ 0.5625

    if (height > window.innerHeight) {
      height = window.innerHeight;
      width = height * 1.7777; // 1920 ÷ 1080 ≒ 1.7777
    }
    dispatch(screenActions.setScreen({ width, height }));
  };
  useEffect(() => {
    window.onresize = FixRatio;
    FixRatio();
  }, []);
  return (
    <>
      <div
        id='App'
        draggable='false'
        style={{
          width: screen.width,
          height: screen.height,
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
          zIndex={1}
          width='100%'
          height='100%'
          position='absolute'
          display='flex'
          pointerEvents={mode.currentMode === 'Searching' ? 'none' : 'auto'}
        />
        <Writing zIndex={1} width='100%' height='100%' position='absolute' />
        <Cockpit
          zIndex={2}
          width='100%'
          height='100%'
          position='absolute'
          display='flex'
          pointerEvents='none'
        />
        <Display
          zIndex={3}
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
          zIndex={3}
          left='24%'
          width='9.1%'
          top='79.4%'
          height='13.7%'
          position='absolute'
          display='flex'
        />
        <LeftButton
          zIndex={3}
          left='42.6%'
          width='8.6%'
          top='88.1%'
          height='9.7%'
          position='absolute'
          display='flex'
        />
        <RightButton
          zIndex={3}
          left='52.1%'
          width='8.6%'
          top='88.2%'
          height='9.6%'
          position='absolute'
          display='flex'
        />
      </div>
      <MorseSound />
      <div
        id='Vertical Overlay Top'
        style={{
          position: 'absolute',
          top: 0,
          width: '100%',
          height: `calc((100% - ${screen.height}px) / 2)`,
          backgroundColor: 'gray',
          zIndex: 2,
        }}
      />
      <div
        id='Vertical Overlay Bottom'
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: `calc((100% - ${screen.height}px) / 2)`,
          backgroundColor: 'gray',
          zIndex: 2,
        }}
      />
      <div
        id='Horizontal Overlay Left'
        style={{
          position: 'absolute',
          left: 0,
          width: `calc((100% - ${screen.width}px) / 2)`,
          height: '100%',
          backgroundColor: 'gray',
          zIndex: 2,
        }}
      />
      <div
        id='Horizontal Overlay Right'
        style={{
          position: 'absolute',
          right: 0,
          width: `calc((100% - ${screen.width}px) / 2)`,
          height: '100%',
          backgroundColor: 'gray',
          zIndex: 2,
        }}
      />
    </>
  );
}

export default App;
