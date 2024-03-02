import StarBubbleImage from 'assets/images/Window/Star Hover/Bubble01.gif';

import { CSSProperties } from 'react';

export type StarBubbleProps = {
  id: string;
};

function StarBubble(props: CSSProperties & StarBubbleProps) {
  const { id, ...cssProps } = props;
  return (
    <div id={`star_bubble_${id}`} draggable='false' style={{ ...cssProps }}>
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
          fontSize: '20px',
        }}
      >
        hello my name is &#39;{id}&#39;
      </span>
    </div>
  );
}

export default StarBubble;
