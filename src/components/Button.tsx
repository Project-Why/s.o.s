import { CSSProperties, MouseEventHandler, useState } from 'react';

export type ButtonProps = {
  id: string;
  image: string;
  hoverImage: string;
  hoverClickImage: string;
  clickImage: string;
  buttonType: 'Latching' | 'Momentary'; // Latching 상태 유지, Momentary 띄워짐
  clickHandler: MouseEventHandler;
};

function Button(props: CSSProperties & ButtonProps) {
  const {
    id,
    image,
    hoverImage,
    clickImage,
    hoverClickImage,
    buttonType,
    clickHandler,
  } = props;
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
          buttonType === 'Momentary'
            ? isHover
              ? isClick
                ? hoverClickImage
                : hoverImage
              : isClick
                ? clickImage
                : image
            : hoverImage
        }
        alt={id}
        style={{ objectFit: 'cover' }}
      />
    </div>
  );
}

export default Button;
