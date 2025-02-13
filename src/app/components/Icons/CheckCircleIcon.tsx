import React, { FC } from 'react';
import { IconProps } from './IconProps';

const CheckCircleIcon: FC<IconProps> = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 32"
    preserveAspectRatio="xMidYMid meet"
    {...props}
  >
    <path
      d="M12 4C5.373 4 0 9.373 0 16s5.373 12 12 12 12-5.373 12-12S18.627 4 12 4zm0 22C6.486 26 2 21.514 2 16S6.486 6 12 6s10 4.486 10 10-4.486 10-10 10z"
      fillRule="evenodd"
      clipRule="evenodd"
    />
    <path d="M9.88 21.224l-4.087-4.086 1.414-1.415 2.673 2.673 6.913-6.913 1.414 1.414z" />
  </svg>
);

export default CheckCircleIcon;
