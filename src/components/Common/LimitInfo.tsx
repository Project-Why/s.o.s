import { selectScreen } from 'store/screen';

import { CSSProperties } from 'react';
import { useSelector } from 'react-redux';

export interface LimitInfoProps {
  right: number;
  top: number;
  fontSize: number;
  current: number;
  max: number;
  info?: string;
}

function LimitInfo(props: LimitInfoProps & CSSProperties) {
  const { right, top, fontSize, current, max, info, ...cssProps } = props;
  const { width, height } = useSelector(selectScreen);
  return (
    <div
      id={`Limit Info ${info}`}
      style={{
        width: 'auto',
        height: (fontSize * height) / 100,
        right: (right * width) / 100,
        top: (top * height) / 100,
        position: 'absolute',
        textAlign: 'right',
        fontSize: (fontSize * height) / 100,
        fontFamily: 'FlowerScent',
        ...cssProps,
      }}
    >
      {info ? `${current} / ${max} ${info}` : `${current} / ${max}`}
    </div>
  );
}

export default LimitInfo;
