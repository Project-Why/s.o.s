import Star1 from 'assets/images/Window/Star/Star01.gif';
import Star2 from 'assets/images/Window/Star/Star02.gif';
import Star3 from 'assets/images/Window/Star/Star03.gif';
import Star4 from 'assets/images/Window/Star/Star04.gif';
import Star5 from 'assets/images/Window/Star/Star05.gif';

import Star from 'components/Space/Star';

import { CSSProperties } from 'react';

export type StarInformation = {
  left: number;
  top: number;
  image: string;
};

function Space(props: CSSProperties) {
  const date: Date = new Date('2024.01.29');

  const starCount = 20;
  const starWidth = 3.13; // 60px when 1920px
  const starHeight = 5.56; // 60px when 1080px

  const maxLeft = 100 - starWidth;
  const maxTop = 100 - starHeight;

  const starImages = [Star1, Star2, Star3, Star4, Star5];
  const starInformations: StarInformation[] = Array(starCount)
    .fill(0)
    .map(() => ({
      left: +(Math.random() * maxLeft).toFixed(2),
      top: +(Math.random() * maxTop).toFixed(2),
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
          width={starWidth}
          height={starHeight}
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
