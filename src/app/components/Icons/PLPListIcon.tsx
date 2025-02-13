import { FC } from "react";

interface PLPListIconProps {
  color?: string;
}

const PLPListIcon: FC<PLPListIconProps> = ({ color = '#000' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" fill="none">
    <rect stroke={color} width="17.5" height="17.5" x="1.5" y=".75" strokeWidth="1.5" rx="1.25"/>
    <path fill={color} d="M1.75 12h17v1.5h-17zM1.75 6h17v1.5h-17z"/>
  </svg>
);

export default PLPListIcon;