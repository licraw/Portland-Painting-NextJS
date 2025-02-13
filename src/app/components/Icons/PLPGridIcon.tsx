import { FC } from "react";

interface PLPGridIconProps {
  color?: string;
}

const PLPGridIcon: FC<PLPGridIconProps> = ({ color = '#000' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" fill="none">
    <rect stroke={color} width="17.5" height="17.5" x="1.5" y=".75" strokeWidth="1.5" rx="1.25" />
    <path fill={color} d="M9.395 1h1.5v17h-1.5z"/>
    <path fill={color} d="M1.75 9h17v1.5h-17z"/>
  </svg>
);

export default PLPGridIcon;