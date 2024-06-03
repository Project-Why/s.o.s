import { useAppDispatch, useAppSelector } from 'hooks';

import { modeActions, selectMode } from 'store/mode';

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
  const [isHover, setIsHover] = useState(false);
  const mode = useAppSelector(selectMode);
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
    if (starElement && mode.searchingState.isLoading) {
      // Initial Position
      starElement.style.position = 'absolute';
      starElement.style.left = `${mode.searchingState.movingPosition[0]}px`;
      starElement.style.top = `${mode.searchingState.movingPosition[1]}px`;

      // Move
      setTimeout(() => {
        starElement.style.transition = 'left 1s ease-out, top 1s ease-out';
        starElement.style.left = `${left}%`;
        starElement.style.top = `${top}%`;
      }, 0);
    }
  }, [mode.searchingState.isLoading]);

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
          pointerEvents: `${mode.searchingState.isLoading ? 'none' : 'auto'}`,
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
