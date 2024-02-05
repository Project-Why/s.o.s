import { CSSProperties, MouseEventHandler, useState } from 'react';

export type ButtonImageProps = {
  id: string;
  image: string;
  hoverImage: string;
  clickImange: string;
  clickHandler: MouseEventHandler;
};

function Button(props: CSSProperties & ButtonImageProps) {
  const { id, image, hoverImage, clickImange, clickHandler } = props;
  const [isHover, setIsHover] = useState(false);
  const [isClick, setIsClick] = useState(false);
  return (
    <div
      id={id}
      style={{ ...props }}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
      onFocus={() => setIsHover(true)}
      onBlur={() => setIsHover(false)}
      onMouseDown={(e) => {
        setIsClick(true);
        clickHandler(e);
      }}
      onMouseUp={() => setIsClick(false)}
    >
      <img
        src={isHover ? (isClick ? clickImange : hoverImage) : image}
        alt={id}
        style={{ objectFit: 'cover' }}
      />
    </div>
  );
}

export default Button;
