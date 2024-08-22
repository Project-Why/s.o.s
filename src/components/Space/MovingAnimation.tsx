import MovingCircle from 'assets/images/Window/Moving/Moving-Circle.gif';
import MovingLine from 'assets/images/Window/Moving/Moving-Line.gif';
import MovingSound from 'assets/sounds/Moving.mp3';

import { useAppSelector } from 'hooks';

import { modeActions, selectMode } from 'store/mode';
import { selectScreen } from 'store/screen';

import {
  MovingAnimationState,
  movingAnimationStateInterval,
} from 'util/animation';

import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

export type StarInformation = {
  left: number;
  top: number;
  image: string;
};

function MovingAnimation() {
  // Moving Animation
  const audioRef = useRef(new Audio(MovingSound));

  // Global State
  const mode = useAppSelector(selectMode);
  const screen = useAppSelector(selectScreen);
  const dispatch = useDispatch();

  /** Space Animation */
  const animationNextSound = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
    dispatch(modeActions.setNextMovingAnimation());
  };
  const animationNext = () => {
    dispatch(modeActions.setNextMovingAnimation());
  };

  const animationLast = () => {
    dispatch(modeActions.setMovingIsLoading());
    dispatch(modeActions.setNextMovingAnimation());
    dispatch(modeActions.setMoveSuccess(true));
  };

  const movingAnimationStateAction: {
    [key in MovingAnimationState]: () => void;
  } = {
    [MovingAnimationState.Completed]: animationNextSound,
    [MovingAnimationState.PassingStars]: animationNextSound,
    [MovingAnimationState.MovingCircle]: animationNext,
    [MovingAnimationState.SettingStars]: animationNext,
    [MovingAnimationState.MovingStars]: animationNext,
    [MovingAnimationState.MovingLine]: animationLast,
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (mode.searchingState.isLoading) {
      intervalId = setInterval(
        movingAnimationStateAction[mode.searchingState.currentAnimation],
        movingAnimationStateInterval[mode.searchingState.currentAnimation],
      );
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [mode.searchingState.isLoading, mode.searchingState.currentAnimation]);

  return (
    <>
      <img
        id='Moving Circle'
        src={`${MovingCircle}?${mode.searchingState.imageKey}`}
        alt='Moving Circle'
        style={{
          left: mode.searchingState.movingPosition[0],
          top: mode.searchingState.movingPosition[1],
          width: '8.4372%',
          height: '15%',
          position: 'absolute',
          display:
            mode.searchingState.currentAnimation ===
              MovingAnimationState.MovingCircle ||
            mode.searchingState.currentAnimation ===
              MovingAnimationState.SettingStars ||
            mode.searchingState.currentAnimation ===
              MovingAnimationState.MovingStars
              ? 'flex'
              : 'none',
          transform: 'translate(-50%, -50%)',
          objectFit: 'cover',
        }}
      />
      <img
        id='Moving Line'
        src={`${MovingLine}?${mode.searchingState.imageKey}`}
        alt='Moving Line'
        style={{
          width: '200%',
          height: '200%',
          transform: `translate(${(1 - mode.searchingState.movingPosition[0] / screen.width) * -50}%, 
            ${(1 - mode.searchingState.movingPosition[1] / screen.height) * -50}%)` /** -50 to 0 */,
          position: 'absolute',
          display:
            mode.searchingState.currentAnimation ===
              MovingAnimationState.SettingStars ||
            mode.searchingState.currentAnimation ===
              MovingAnimationState.MovingStars ||
            mode.searchingState.currentAnimation ===
              MovingAnimationState.MovingLine
              ? 'flex'
              : 'none',
          objectFit: 'cover',
        }}
      />
    </>
  );
}

export default MovingAnimation;
