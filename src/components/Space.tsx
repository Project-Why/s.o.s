import { CSSProperties } from 'react';

function Space(props: CSSProperties) {
  return (
    <div id='space' draggable='false' style={{ ...props }}>
      Space
    </div>
  );
}

export default Space;
