import React from 'react';

const ArrowIcon = ({ direction }) => {
  const rotation = direction === 'left' ? 'rotate(180deg)' : 'none';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      style={{ transform: rotation }}
    >
      <path
        d="M11 15.25C10.5858 15.25 10.25 15.5858 10.25 16C10.25 16.4142 10.5858 16.75 11 16.75V15.25ZM21.5303 16.5303C21.8232 16.2374 21.8232 15.7626 21.5303 15.4697L16.7574 10.6967C16.4645 10.4038 15.9896 10.4038 15.6967 10.6967C15.4038 10.9896 15.4038 11.4645 15.6967 11.7574L19.9393 16L15.6967 20.2426C15.4038 20.5355 15.4038 21.0104 15.6967 21.3033C15.9896 21.5962 16.4645 21.5962 16.7574 21.3033L21.5303 16.5303ZM11 16.75H21V15.25H11V16.75Z"
        fill="#1A1B1B"
      />
    </svg>
  );
};

export default ArrowIcon;
