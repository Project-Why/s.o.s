import { useAppDispatch, useAppSelector } from 'hooks';

import { bubbleActions } from 'store/bubble';
import { modeActions, selectMode } from 'store/mode';
import { selectScreen } from 'store/screen';

import MorsePage from 'components/Cockpit/Display/MorsePage';

import { MovingAnimationState } from 'util/animation';
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
        case MovingAnimationState.PassingStars: {
          const startX = screen.width * left * 0.01;
          const startY = screen.height * top * 0.01;

          const targetX = mode.searchingState.movingPosition[0];
          const targetY = mode.searchingState.movingPosition[1];

          // Calculate direction vector
          const deltaX = startX - targetX;
          const deltaY = startY - targetY;

          // Normalize the direction vector
          const magnitude = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
          const normalizedX = deltaX / magnitude;
          const normalizedY = deltaY / magnitude;

          // Define the distance to move away
          const moveDistance = 1250; // Adjust this value to control how far the star moves

          // Calculate the new position
          const newX = startX + normalizedX * moveDistance;
          const newY = startY + normalizedY * moveDistance;

          // Apply the new position with transition
          starElement.style.transition = `left 0.5s ease-out, top 0.5s ease-out`;
          starElement.style.left = `${newX}px`;
          starElement.style.top = `${newY}px`;

          break;
        }
        case MovingAnimationState.MovingCircle:
        case MovingAnimationState.SettingStars:
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
        case MovingAnimationState.MovingStars:
        case MovingAnimationState.MovingLine:
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
        case MovingAnimationState.Completed:
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
