import React, { FC } from 'react';
import { IconProps } from './IconProps';

const UserCircleIcon: FC<IconProps> = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 32"
    preserveAspectRatio="xMidYMid meet"
    {...props}
  >
    <path d="M24 16c0-6.627-5.373-12-12-12S0 9.372 0 16s5.373 12 12 12c1.278 0 2.508-.204 3.663-.574a6.389 6.389 0 001.403-.559C21.158 24.955 24 20.815 24 16zM2 16C2 10.486 6.486 6 12 6s10 4.486 10 10c0 3.183-1.5 6.018-3.825 7.85v-1.633c0-2.182-2-4.017-4.376-4.456 1.555-.683 2.64-2.217 2.64-4.003 0-2.42-1.989-4.383-4.444-4.383-2.454 0-4.443 1.963-4.443 4.383 0 1.823 1.129 3.385 2.735 4.046-2.449.519-4.471 2.432-4.471 4.703v1.335C3.496 22.009 2 19.179 2 16z" />
  </svg>
);

export default UserCircleIcon;
