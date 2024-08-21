import MouseSpace from 'assets/images/Mouse/Mouse-Space.png';
import Smoke from 'assets/images/Mouse/Smoke.png';
import MovingCircle from 'assets/images/Window/Moving/Moving-Circle.gif';
import MovingLine from 'assets/images/Window/Moving/Moving-Line.gif';
import Star1 from 'assets/images/Window/Star/Star_1.gif';
import Star2 from 'assets/images/Window/Star/Star_2.gif';
import Star3 from 'assets/images/Window/Star/Star_3.gif';
import Star4 from 'assets/images/Window/Star/Star_4.gif';
import Star5 from 'assets/images/Window/Star/Star_5.gif';
import Star6 from 'assets/images/Window/Star/Star_6.gif';
import Star7 from 'assets/images/Window/Star/Star_7.gif';
import Star8 from 'assets/images/Window/Star/Star_8.gif';
import Star9 from 'assets/images/Window/Star/Star_9.gif';
import Star10 from 'assets/images/Window/Star/Star_10.gif';
import MovingSound from 'assets/sounds/Moving.mp3';

import { messageAPI } from 'apis/message';

import { useAppSelector } from 'hooks';

import { modeActions, selectMode } from 'store/mode';
import { selectScreen } from 'store/screen';

import Star, { StarProps } from 'components/Space/Star';

import {
  CSSProperties,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';

export type StarInformation = {
  left: number;
  top: number;
  image: string;
};

function Space(props: CSSProperties) {
  const starWidth = 3.13; // 60px when 1920px
  const starHeight = 5.56; // 60px when 1080px

  const maxLeft = 100 - starWidth;
  const maxTop = 80 - starHeight;

  const starImages = [
    Star1,
    Star2,
    Star3,
    Star4,
    Star5,
    Star6,
    Star7,
    Star8,
    Star9,
    Star10,
  ];

  // Smoke Animation
  const cursorXRef = useRef(0);
  const cursorYRef = useRef(0);
  const [isHover, setIsHover] = useState(false);
  const [images, setImages] = useState<{ id: number; x: number; y: number }[]>(
    [],
  );

  // Moving Animation
  const audioRef = useRef(new Audio(MovingSound));
  const [imageKey, setImageKey] = useState(0);

  // Global State
  const mode = useAppSelector(selectMode);
  const screen = useAppSelector(selectScreen);
  const dispatch = useDispatch();

  /** Moving Animation Utils. */
  const getMessages = async () => {
    dispatch(modeActions.setStars([]));
    const messages = await messageAPI.getMessages();
    if (messages) {
      const stars = messages.map<StarProps>((message) => ({
        id: message.id,
        location: message.location,
        createdAt: message.createdAt,
        message: message.code,
        left: +(Math.random() * maxLeft).toFixed(2),
        top: +(Math.random() * maxTop).toFixed(2),
        image: starImages[Math.floor(Math.random() * 5)],
        width: starWidth,
        height: starHeight,
        position: 'absolute',
        display: 'flex',
      }));
      dispatch(modeActions.setStars(stars));
    } else {
      dispatch(modeActions.setMoveSuccess(false));
    }
  };
  const initStars = () => {
    if (mode.searchingState.stars.length === 0 && screen.width > 0) {
      // Set Animation Position.
      dispatch(
        modeActions.setMovingPosition([
          screen.width * 0.5,
          screen.height * 0.5,
        ]),
      );

      // Get Stars.
      getMessages();

      // Start Animation.
      dispatch(modeActions.setMovingIsLoading());
    }
  };
  const handleOnMouseDown = async (e: MouseEvent) => {
    // Set Animation Position.
    const rect = e.currentTarget.getBoundingClientRect();
    dispatch(
      modeActions.setMovingPosition([
        e.clientX - rect.left,
        e.clientY - rect.top,
      ]),
    );

    // Get Stars.
    getMessages();

    // Change key.
    setImageKey((prevKey) => {
      return prevKey === 1000 ? 0 : prevKey + 1;
    }); // Change key to force re-render

    // Start Animation.
    dispatch(modeActions.setMovingIsLoading());
  };

  /** Smoke Animation Utils. */
  const handleOnMouseMove = (e: MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    cursorXRef.current = e.clientX - rect.left;
    cursorYRef.current = e.clientY - rect.top;
  };

  const handleOnMouseOver = () => {
    setIsHover(true);
  };

  const handleOnMouseLeave = () => {
    setIsHover(false);
  };

  const generateImage = useCallback(() => {
    if (isHover) {
      const id = Date.now();
      setImages((prevImages) => [
        ...prevImages,
        {
          id,
          x: cursorXRef.current,
          y: cursorYRef.current,
        },
      ]);

      // Remove the image after the animation duration (2 seconds)
      setTimeout(() => {
        setImages((prevImages) =>
          prevImages.filter((image) => image.id !== id),
        );
      }, 2000);
    }
  }, [isHover]);

  useEffect(() => {
    const interval = setInterval(() => {
      generateImage();
    }, 800);

    return () => {
      clearInterval(interval);
    };
  }, [generateImage]);

  /** Initial Loading. */
  useEffect(() => {
    if (mode.searchingState.initLaunch) {
      initStars();
    }
  }, [mode.searchingState.initLaunch]);

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

  useEffect(() => {
    const startAnimation =
      mode.searchingState.isLoading &&
      mode.searchingState.currentAnimation === 0 &&
      setInterval(animationNextSound, 0);
    const movingCircleAnimation =
      mode.searchingState.isLoading &&
      mode.searchingState.currentAnimation === 1 &&
      setInterval(animationNext, 666);
    const settingCurrentStars =
      mode.searchingState.isLoading &&
      mode.searchingState.currentAnimation === 2 &&
      setInterval(animationNext, 500);
    const movingCurrentStars =
      mode.searchingState.isLoading &&
      mode.searchingState.currentAnimation === 3 &&
      setInterval(animationNext, 500);
    const movingLineAnimation =
      mode.searchingState.isLoading &&
      mode.searchingState.currentAnimation === 4 &&
      setInterval(animationLast, 1000);
    return () => {
      if (startAnimation) {
        clearInterval(startAnimation);
      }
      if (movingCircleAnimation) {
        clearInterval(movingCircleAnimation);
      }
      if (settingCurrentStars) {
        clearInterval(settingCurrentStars);
      }
      if (movingCurrentStars) {
        clearInterval(movingCurrentStars);
      }
      if (movingLineAnimation) {
        clearInterval(movingLineAnimation);
      }
    };
  }, [mode.searchingState.isLoading, mode.searchingState.currentAnimation]);

  return (
    <div id='Space' draggable='false' style={{ ...props }}>
      <svg
        id='Empty Space'
        width='100%'
        height='100%'
        viewBox='0 0 100 100'
        preserveAspectRatio='none'
        style={{
          position: 'absolute',
        }}
      >
        <polygon
          points='0.0,0.0 0.0,100.0 6.588,100.0 7.898,98.403 10.197,95.9 12.413,93.433 14.779,91.187 17.071,89.365 20.412,87.107 22.179,85.904 25.094,84.229 25.094,83.419 25.301,82.486 25.853,81.505 26.861,80.572 27.813,80.155 29.332,79.934 30.233,80.17 30.867,80.711 31.31,81.366 36.09,79.182 35.58,75.893 35.317,71.867 35.165,68.677 35.193,62.761 35.179,60.626 35.621,57.951 36.491,55.005 37.112,53.803 38.177,52.692 39.335,52.256 40.647,52.109 43.173,51.79 47.044,51.885 49.156,51.836 58.144,52.032 62.008,52.201 64.038,52.606 65.589,54.28 66.206,56.134 66.675,60.209 66.565,68.726 66.413,77.071 66.233,79.157 72.225,81.747 80.198,86.324 79.984,82.127 79.901,80.262 80.392,79.538 79.867,77.231 80.26,76.089 79.86,75.046 80.06,74.813 80.454,74.837 79.722,73.046 79.794,72.724 80.312,72.665 80.022,71.956 83.02,71.423 82.865,70.561 83.03,70.395 83.942,70.763 83.91,67.999 84.242,68.135 84.918,68.545 85.132,65.366 85.547,64.705 86.254,64.159 87.414,64.184 88.287,64.306 89.226,64.527 89.823,65.036 90.165,65.932 90.275,66.632 90.31,67.907 89.68,73.044 88.82,81.771 87.133,92.52 90.752,96.23 92.576,98.626 93.409,100.0 100.0,100.0 100.0,0.0 0.0,0.0'
          onMouseDown={handleOnMouseDown}
          onMouseMove={handleOnMouseMove}
          onMouseOver={handleOnMouseOver}
          onMouseLeave={handleOnMouseLeave}
          style={{
            pointerEvents: `${!mode.searchingState.isLoading && mode.searchingState.initLaunch ? 'auto' : 'none'}`,
            cursor: `url(${MouseSpace}), auto`,
            fillOpacity: 0,
          }}
        />
      </svg>
      <div id='Smoke'>
        {images.map((image) => (
          <img
            key={image.id}
            src={Smoke}
            alt='Cursor Generated'
            style={{
              position: 'absolute',
              width: '10%',
              height: '10%',
              left: image.x,
              top: image.y,
              pointerEvents: 'none',
              transform: 'translate(-75%, -75%) scale(0.5, 0.5)',
              animation: 'MoveUp 2s linear',
            }}
          />
        ))}
        <style>
          {`
          @keyframes MoveUp {
            from {
            transform: 'translate(-75%, -75%) scale(0.5, 0.5)'
              opacity: 1;
            }
            to {
              transform: translate(-100%, -250%);
              opacity: 0;
              scale: 1;
            }
          }
        `}
        </style>
      </div>
      <img
        id='Moving Circle'
        src={`${MovingCircle}?${imageKey}`}
        alt='Moving Circle'
        style={{
          left: mode.searchingState.movingPosition[0],
          top: mode.searchingState.movingPosition[1],
          width: '8.4372%',
          height: '15%',
          position: 'absolute',
          display: `${
            mode.searchingState.currentAnimation === 1 ||
            mode.searchingState.currentAnimation === 2 ||
            mode.searchingState.currentAnimation === 3
              ? 'flex'
              : 'none'
          }`,
          transform: 'translate(-50%, -50%)',
          objectFit: 'cover',
        }}
      />
      <img
        id='Moving Line'
        src={`${MovingLine}?${imageKey}`}
        alt='Moving Line'
        style={{
          width: '200%',
          height: '200%',
          transform: `translate(${(1 - mode.searchingState.movingPosition[0] / screen.width) * -50}%, 
            ${(1 - mode.searchingState.movingPosition[1] / screen.height) * -50}%)` /** -50 to 0 */,
          position: 'absolute',
          display: `${
            mode.searchingState.currentAnimation === 2 ||
            mode.searchingState.currentAnimation === 3 ||
            mode.searchingState.currentAnimation === 4
              ? 'flex'
              : 'none'
          }`,
          objectFit: 'cover',
        }}
      />
      <div
        id='Stars'
        style={{
          pointerEvents: `${mode.searchingState.currentAnimation === 0 ? 'auto' : 'none'}`,
          display: `${
            mode.searchingState.currentAnimation === 1 ? 'none' : 'flex'
          }`,
        }}
      >
        {mode.searchingState.stars.map((starProps, index) => (
          <Star key={index} {...starProps} />
        ))}
      </div>
    </div>
  );
}

export default Space;
