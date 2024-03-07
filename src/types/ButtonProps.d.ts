import { MouseEventHandler } from 'react';

export declare namespace ButtonProps {
  export interface CommonButtonProps {
    id: string;
    image: string;
    hoverImage: string;
    hoverClickImage: string;
    clickImage: string;
    buttonType: 'Latching' | 'Momentary'; // Latching 상태 유지, Momentary 띄워짐
    clickHandler: MouseEventHandler;
  }
  export interface LatchingButtonProps extends CommonButtonProps {
    buttonType: 'Latching';
    condition: boolean;
  }
  export interface MomentaryButtonProps extends CommonButtonProps {
    buttonType: 'Momentary';
  }

  export type ButtonProps = LatchingButtonProps | MomentaryButtonProps;
}
