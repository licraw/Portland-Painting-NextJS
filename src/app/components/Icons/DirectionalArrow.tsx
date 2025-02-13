import React from 'react';

interface DirectionalArrowProps {
  direction?: 'up' | 'down' | 'left' | 'right';
  fill?: string;
  strokeWidth?: number;
  width?: string | number;
  height?: string | number;
}

const DirectionalArrow: React.FC<DirectionalArrowProps> = ({
  direction = 'down',
  fill = '#1A1B1B',
  strokeWidth = 1.5,
  width = '32',
  height = '32',
}) => {
  const rotationMap = {
    down: '0',
    up: '180',
    right: '270',
    left: '90'
  };

  const rotationDegree = rotationMap[direction] || '0';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 12 7"
      fill={fill}
      style={{ transform: `rotate(${rotationDegree}deg)` }}
    >
      <path
        d="M0.955753 0.957031L6 5.91276"
        stroke={fill}
        strokeWidth={strokeWidth}
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M11 0.957031L6.04425 5.91276"
        stroke={fill}
        strokeWidth={strokeWidth}
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default DirectionalArrow;
