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
    initStars();
  }, [screen]);

  /** Space Animation */
  const animationNext = () => {
    dispatch(modeActions.setNextMovingAnimation());
  };

  const animationLast = () => {
    dispatch(modeActions.setMovingIsLoading());
    dispatch(modeActions.setNextMovingAnimation());
  };

  useEffect(() => {
    const startAnimation =
      mode.searchingState.isLoading &&
      mode.searchingState.currentAnimation === 0 &&
      setInterval(animationNext, 0);
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
          backgroundColor: 'white',
        }}
      >
        <polygon
          points='0,0 0,100 6,100 7,98 10,95 12,92 15,90 17,88 21,86 22,85 24,84 24,83 25,82 25,81 26,80 27,80 29,79 30,80 30,80 31,81 35,79 35,75 35,71 34,68 34,62 34,60 35,57 36,54 36,53 37,52 39,52 40,51 42,51 47,51 49,51 58,51 62,51 64,52 65,54 66,56 66,60 66,69 66,77 66,79 72,81 80,86 80,81 80,80 80,79 80,76 80,75 80,74 80,74 80,74 80,72 80,72 80,72 80,71 83,71 83,70 83,70 84,70 84,67 84,67 85,68 85,65 85,64 86,64 87,63 88,63 89,64 90,64 90,65 90,66 90,67 90,72 89,81 87,92 91,96 93,99 93,100 100,100 100,0 0,0'
          onMouseDown={handleOnMouseDown}
          onMouseMove={handleOnMouseMove}
          onMouseOver={handleOnMouseOver}
          onMouseLeave={handleOnMouseLeave}
          style={{
            pointerEvents: `${mode.searchingState.isLoading ? 'none' : 'auto'}`,
            cursor: `url(${MouseSpace}), auto`,
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
