import { CSSProperties, useState } from 'react';

import StarBubble from './StarBubble';

export type StarProps = {
  id: string;
  image: string;
  createdAt: Date;
};

function Star(props: CSSProperties & StarProps) {
  const { id, image, createdAt } = props;
  const [isHover, setIsHover] = useState(false);
  return (
    <>
      <div id={`star_${id}`} draggable='false' style={{ ...props }}>
        <img
          draggable='false'
          src={image}
          alt={`star_${id}`}
          style={{ objectFit: 'cover' }}
        />
      </div>
      <StarBubble
        id={id}
        createdAt={createdAt}
        visibility={isHover ? 'visible' : 'hidden'}
      />
    </>
  );
}

export default Star;
