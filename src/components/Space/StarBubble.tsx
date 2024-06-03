import StarBubbleImage from 'assets/images/Window/Star Hover/Bubble_1.gif';

import { CSSProperties } from 'react';

export type StarBubbleProps = {
  id: number;
  createAt: Date;
  location: string;
};

function StarBubble(props: CSSProperties & StarBubbleProps) {
  const { id, createAt, location, ...cssProps } = props;
  return (
    <div id={`Star Bubble ${id}`} draggable='false' style={{ ...cssProps }}>
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
          fontSize: '1vw',
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
