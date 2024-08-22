import StarBubbleImage from 'assets/images/Window/Star Hover/Bubble_1.gif';

import { useAppSelector } from 'hooks';

import { selectScreen } from 'store/screen';

import { CSSProperties } from 'react';

export type StarBubbleProps = {
  id: number;
  createAt: Date;
  location: string;
  left: number;
  top: number;
};

function StarBubble(props: CSSProperties & StarBubbleProps) {
  const { id, createAt, location, left, top, ...cssProps } = props;
  const { height: screenHeight } = useAppSelector(selectScreen);

  const width = 15;
  const height = (width * 24) / 25;
  const fontSize = 2.5;

  return (
    <div
      id={`Star Bubble ${id}`}
      draggable='false'
      style={{
        width: `${width}%`,
        height: `${height}%`,
        left: `${Math.min(left, 100 - width)}%`,
        top: `${Math.min(top, 100 - height)}%`,
        ...cssProps,
      }}
    >
      <img
        draggable='false'
        src={StarBubbleImage}
        alt={`star_bubble_${id}`}
        style={{ objectFit: 'cover' }}
      />
      <span
        style={{
          padding: '10%',
          position: 'absolute',
          color: 'black',
          fontSize: (fontSize * screenHeight) / 100,
        }}
      >
        id: {id} <br />
        date: {createAt.toLocaleDateString()} <br />
        location: {location}
      </span>
    </div>
  );
}

export default StarBubble;
