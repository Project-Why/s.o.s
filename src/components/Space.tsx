import Star1 from 'assets/images/Window/Star/Star01.gif';
import Star2 from 'assets/images/Window/Star/Star02.gif';
import Star3 from 'assets/images/Window/Star/Star03.gif';
import Star4 from 'assets/images/Window/Star/Star04.gif';
import Star5 from 'assets/images/Window/Star/Star05.gif';

import { CSSProperties } from 'react';

import Star from './Star';

export type StarInformation = {
  left: string;
  top: string;
  image: string;
};

function Space(props: CSSProperties) {
  const date: Date = new Date('2024.01.29');

  const starCount = 20;
  const starWidth = 3.13;
  const starHeight = 5.56;

  const maxLeft = 100 - starWidth;
  const maxTop = 100 - starHeight;

  const starImages = [Star1, Star2, Star3, Star4, Star5];
  const starInformations: StarInformation[] = Array(starCount)
    .fill(0)
    .map(() => ({
      left: `${(Math.random() * maxLeft).toFixed(2)}%`,
      top: `${(Math.random() * maxTop).toFixed(2)}%`,
      image: starImages[Math.floor(Math.random() * 5)],
    }));

  return (
    <div id='space' draggable='false' style={{ ...props }}>
      {starInformations.map((value, index) => (
        <Star
          id={`${index}`}
          key={`${index}`}
          left={value.left}
          top={value.top}
          width='3.13%'
          height='5.56%'
          display='flex'
          position='absolute'
          image={value.image}
          createdAt={date}
        />
      ))}
    </div>
  );
}

export default Space;
