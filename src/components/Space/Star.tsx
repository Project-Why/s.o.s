import { useAppDispatch, useAppSelector } from 'hooks';

import { bubbleActions } from 'store/bubble';
import { modeActions, selectMode } from 'store/mode';
import { selectScreen } from 'store/screen';

import MorsePage from 'components/Cockpit/Display/MorsePage';

import { convertStringToMorseCode } from 'util/morse';

import { CSSProperties, MouseEventHandler, useEffect } from 'react';

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

  const mode = useAppSelector(selectMode);
  const screen = useAppSelector(selectScreen);
  const dispatch = useAppDispatch();

  const mouseOverHander = () => {
    dispatch(
      bubbleActions.setBubble({
        isHover: true,
        left: left + width,
        top: top + height,
        id,
        createdAt: new Date(createdAt),
        location,
      }),
    );
  };
  const mouseOutHander = () => {
    dispatch(bubbleActions.setIsHover(false));
  };

  const clickHandler: MouseEventHandler = () => {
    dispatch(modeActions.changeMode('Decrypting'));
    dispatch(modeActions.setOpeningImageKey());
    dispatch(modeActions.setOpeningIsLoading());

    // Get Morse Message from server.
    const morseInfo = convertStringToMorseCode(message);
    dispatch(
      modeActions.setDisplay(
        morseInfo.map((value, index) => (
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
      ),
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
    <div
      id={`Star ${id}`}
      draggable='false'
      onMouseOver={mouseOverHander}
      onMouseOut={mouseOutHander}
      onFocus={mouseOverHander}
      onBlur={mouseOutHander}
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
  );
}

export default Star;
