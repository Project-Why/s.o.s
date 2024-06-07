import { useAppDispatch, useAppSelector } from 'hooks';

import { modeActions, selectMode } from 'store/mode';
import { selectScreen } from 'store/screen';

import MorsePage from 'components/Cockpit/Display/MorsePage';
import StarBubble from 'components/Space/StarBubble';

import { convertStringToMorseCode } from 'common/morse';

import { CSSProperties, MouseEventHandler, useEffect, useState } from 'react';

export type StarProps = {
  id: number;
  createdAt: string;
  location: string;
  message: string;
  image: string;
  width: number;
  height: number;
  left: number;
  top: number;
};

function Star(props: CSSProperties & StarProps) {
  const {
    id,
    createdAt,
    location,
    message,
    image,
    width,
    height,
    left,
    top,
    ...cssProps
  } = props;

  const initStarSize = 0.4;
  const initStarPosition = 0.99;

  const [isHover, setIsHover] = useState(false);
  const mode = useAppSelector(selectMode);
  const screen = useAppSelector(selectScreen);
  const dispatch = useAppDispatch();
  const clickHandler: MouseEventHandler = () => {
    dispatch(modeActions.changeMode('Decrypting'));

    // Get Morse Message from server.
    const morseInfo = convertStringToMorseCode(message);
    dispatch(
      modeActions.setStar({
        currentIdx: 0,
        starId: id,
        display: morseInfo.map((value, index) => (
          <MorsePage
            key={`Morse ${index}`}
            index={index}
            morsePage={value}
            width='100%'
            height='100%'
            paddingTop='5%'
            display='flex'
            alignItems='left'
            justifyContent='top'
            flexDirection='column'
          />
        )),
      }),
    );
  };

  useEffect(() => {
    // Get component
    const starElement = document.getElementById(`Star ${id}`);
    if (starElement) {
      switch (mode.searchingState.currentAnimation) {
        case 1: // Initial Position
        case 2:
          starElement.style.left = `${
            initStarPosition *
              (mode.searchingState.movingPosition[0] -
                screen.width * width * 0.01 * initStarSize) +
            (1 - initStarPosition) * screen.width * left * 0.01
          }px`;
          starElement.style.top = `${
            initStarPosition *
              (mode.searchingState.movingPosition[1] -
                screen.height * height * 0.01 * initStarSize) +
            (1 - initStarPosition) * screen.width * top * 0.01
          }px`;
          starElement.style.width = `${width * initStarSize}%`;
          starElement.style.height = `${height * initStarSize}%`;
          break;
        case 3:
        case 4:
          setTimeout(() => {
            starElement.style.transition = `left 1s cubic-bezier(0.7, 0, 1, 1), 
              top 1s cubic-bezier(0.7, 0, 1, 1), 
              width 1s cubic-bezier(.999, 0, 1, 1), 
              height 1s cubic-bezier(.999, 0, 1, 1)`;
            starElement.style.left = `${left}%`;
            starElement.style.top = `${top}%`;
            starElement.style.width = `${width}%`;
            starElement.style.height = `${height}%`;
          }, 0);
          break;
        case 0:
          starElement.style.left = `${left}%`;
          starElement.style.top = `${top}%`;
          starElement.style.width = `${width}%`;
          starElement.style.height = `${height}%`;
          break;
        default:
          break;
      }
    }
  }, [mode.searchingState.currentAnimation]);

  return (
    <>
      <div
        id={`Star ${id}`}
        draggable='false'
        onMouseOver={() => setIsHover(true)}
        onMouseOut={() => setIsHover(false)}
        onFocus={() => setIsHover(true)}
        onBlur={() => setIsHover(false)}
        onMouseDown={clickHandler}
        style={{
          width: `${width}%`,
          height: `${height}%`,
          ...cssProps,
        }}
      >
        <img
          draggable='false'
          src={image}
          alt={`star_${id}`}
          style={{ objectFit: 'cover' }}
        />
      </div>
      <StarBubble
        id={id}
        createAt={new Date(createdAt)}
        location={location}
        width='12.5%'
        height='12%'
        left={`${left < 87.5 ? left : 87.5}%`}
        top={`${top + height + 12 < 80 ? top + height : top - 12}%`}
        zIndex={5}
        display={isHover ? 'flex' : 'none'}
        position='absolute'
      />
    </>
  );
}

export default Star;
