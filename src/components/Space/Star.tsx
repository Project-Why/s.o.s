import { useAppDispatch } from 'hooks';

import { modeActions } from 'store/mode';

import MorseInfo from 'components/Cockpit/Display/MorseInfo';
import StarBubble from 'components/Space/StarBubble';

import { CSSProperties, MouseEventHandler, useState } from 'react';

export type StarProps = {
  id: number;
  image: string;
  width: number;
  height: number;
  left: number;
  top: number;
};

function Star(props: CSSProperties & StarProps) {
  const { id, image, width, height, left, top, ...cssProps } = props;
  const [isHover, setIsHover] = useState(false);
  const dispatch = useAppDispatch();
  const clickHandler: MouseEventHandler = () => {
    dispatch(modeActions.changeMode('Decrypting'));
    const morseInfo = [
      '001001 0101101\n0100010 010010\n001101 0101110\n0100010 010010\n001001 0101101\n0100010 010010',
      '11101011 11110\n0011100 011110\n110101 0101101\n0011100 011110\n11101011 11110',
    ];
    dispatch(
      modeActions.setStar({
        currentIdx: 0,
        starId: id,
        display: morseInfo.map((value, index) => (
          <MorseInfo
            key={`Signal ${index}`}
            index={index}
            code={value}
            width='match-parent'
            height='match-parent'
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
