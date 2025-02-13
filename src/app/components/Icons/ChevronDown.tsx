import { FC } from "react";

interface ChevronDownProps {
  color?: string;
}

const ChevronDown: FC<ChevronDownProps> = ({ color = '#000' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="7" fill="none">
    <path fill={color} stroke={color} strokeWidth="0.25" d="m5.375 4.35 3.237-3.237.07.07a.625.625 0 1 1 .884.884l-3.75 3.75a.624.624 0 0 1-.883 0l.442-1.467Zm0 0L2.137 1.113a.724.724 0 1 0-1.025 1.025M5.375 4.35 1.112 2.138m0 0 3.75 3.75a.724.724 0 0 0 1.025 0l-4.775-3.75Z"/>
  </svg>
);

export default ChevronDown;