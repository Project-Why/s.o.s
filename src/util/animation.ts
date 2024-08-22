// Moving Animation
export enum MovingAnimationState {
  Completed = 'COMPLETED',
  PassingStars = 'PASSING_STARS',
  MovingCircle = 'MOVING_CIRCLE',
  SettingStars = 'SETTING_STARS',
  MovingStars = 'MOVING_STARS',
  MovingLine = 'MOVING_LINE',
}

export const movingAnimationStateInterval: {
  [key in MovingAnimationState]: number;
} = {
  [MovingAnimationState.Completed]: 0,
  [MovingAnimationState.PassingStars]: 500,
  [MovingAnimationState.MovingCircle]: 666,
  [MovingAnimationState.SettingStars]: 500,
  [MovingAnimationState.MovingStars]: 500,
  [MovingAnimationState.MovingLine]: 1000,
};

export const movingAnimationStateFlow: {
  [key in MovingAnimationState]: MovingAnimationState;
} = {
  [MovingAnimationState.Completed]: MovingAnimationState.PassingStars,
  [MovingAnimationState.PassingStars]: MovingAnimationState.MovingCircle,
  [MovingAnimationState.MovingCircle]: MovingAnimationState.SettingStars,
  [MovingAnimationState.SettingStars]: MovingAnimationState.MovingStars,
  [MovingAnimationState.MovingStars]: MovingAnimationState.MovingLine,
  [MovingAnimationState.MovingLine]: MovingAnimationState.Completed,
};

// Sending Animation
export enum SendingAnimationState {
  Completed = 'COMPLETED',
  ProgressBar = 'PROGRASS_BAR',
  Sending = 'SENDING',
  Cam = 'CAM',
}

export const sendingAnimationStateInterval: {
  [key in SendingAnimationState]: number;
} = {
  [SendingAnimationState.Completed]: 0,
  [SendingAnimationState.ProgressBar]: 2500,
  [SendingAnimationState.Sending]: 1750,
  [SendingAnimationState.Cam]: 2000,
};

export const sendingAnimationStateFlow: {
  [key in SendingAnimationState]: SendingAnimationState;
} = {
  [SendingAnimationState.Completed]: SendingAnimationState.ProgressBar,
  [SendingAnimationState.ProgressBar]: SendingAnimationState.Sending,
  [SendingAnimationState.Sending]: SendingAnimationState.Cam,
  [SendingAnimationState.Cam]: SendingAnimationState.Completed,
};

// Roll up Animation
export enum RollupAnimationState {
  Completed = 'COMPLETED',
  Paper = 'PAPER',
  Morse = 'MORSE',
}

export const rollupAnimationStateInterval: {
  [key in RollupAnimationState]: number;
} = {
  [RollupAnimationState.Completed]: 0,
  [RollupAnimationState.Paper]: 1550,
  [RollupAnimationState.Morse]: 550,
};

export const rollupAnimationStateFlow: {
  [key in RollupAnimationState]: RollupAnimationState;
} = {
  [RollupAnimationState.Completed]: RollupAnimationState.Paper,
  [RollupAnimationState.Paper]: RollupAnimationState.Morse,
  [RollupAnimationState.Morse]: RollupAnimationState.Completed,
};
