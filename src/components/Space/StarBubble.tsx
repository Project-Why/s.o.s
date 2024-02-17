import StarBubbleImage from 'assets/images/Window/Star Hover/Bubble_1.gif';

import { CSSProperties, useState } from 'react';

export type StarProps = {
  id: string;
  createdAt: Date;
};

function StarBubble(props: CSSProperties & StarProps) {
  const { id, createdAt } = props;
  const [isHover, setIsHover] = useState(false);
  return (
    <div id={`star_bubble_${id}`} draggable='false' style={{ ...props }}>
      <img
        draggable='false'
        src={StarBubbleImage}
        alt={`star_bubble_${id}`}
        style={{ objectFit: 'cover' }}
      />
    </div>
  );
}

export default StarBubble;
