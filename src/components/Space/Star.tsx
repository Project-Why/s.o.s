import { useAppDispatch } from 'hooks';

import { modeActions } from 'store/mode';

import MorsePage from 'components/Cockpit/Display/MorsePage';
import StarBubble from 'components/Space/StarBubble';

import { convertStringToMorseCode } from 'common/morse';

import { CSSProperties, MouseEventHandler, useState } from 'react';

export type StarProps = {
  id: number;
  createdAt: Date;
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
          left: `${left}%`,
          top: `${top}%`,
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
        createAt={createdAt}
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
