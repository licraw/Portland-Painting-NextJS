import React, { FC } from 'react';
import { IconProps } from './IconProps';

const XThinIcon: FC<IconProps> = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    preserveAspectRatio="xMidYMid meet"
    {...props}
  >
    <path d="M16 .7l-.7-.7L8 7.3.7 0 0 .7 7.3 8 0 15.3l.7.7L8 8.7l7.3 7.3.7-.7L8.7 8z" />
  </svg>
);

export default XThinIcon;

