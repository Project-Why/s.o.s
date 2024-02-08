import { CSSProperties, MouseEventHandler, useState } from 'react';

export type ButtonProps = {
  id: string;
  image: string;
  hoverImage: string;
  hoverClickImage: string;
  clickImage: string;
  clickHandler: MouseEventHandler;
};

function Button(props: CSSProperties & ButtonProps) {
  const { id, image, hoverImage, clickImage, hoverClickImage, clickHandler } =
    props;
  const [isHover, setIsHover] = useState(false);
  const [isClick, setIsClick] = useState(false);
  return (
    <div
      id={id}
      draggable='false'
      style={{ ...props }}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => {
        setIsHover(false);
        setIsClick(false);
      }}
      onFocus={() => setIsHover(true)}
      onBlur={() => setIsHover(false)}
      onMouseDown={(e) => {
        setIsClick(true);
        clickHandler(e);
      }}
      onMouseUp={() => setIsClick(false)}
    >
      <img
        draggable='false'
        src={
          isHover
            ? isClick
              ? hoverClickImage
              : hoverImage
            : isClick
              ? hoverImage
              : image
        }
        alt={id}
        style={{ objectFit: 'cover' }}
      />
    </div>
  );
}

export default Button;
