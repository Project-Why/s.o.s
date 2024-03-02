import { useAppDispatch } from 'hooks';

import { modeActions } from 'store/mode';

import StarBubble from 'components/Space/StarBubble';

import { CSSProperties, MouseEventHandler, useState } from 'react';

export type StarProps = {
  id: string;
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
  };
  return (
    <>
      <div
        id={`star_${id}`}
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
