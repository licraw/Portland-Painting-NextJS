import { FC } from "react";

interface Props {
  filled?: boolean;
}

const CheckboxIcon: FC<Props> = ({ filled }) => {
  if (filled) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"><rect width="15" height="15" x=".5" y=".5" fill="#191A1F" stroke="#191A1F" rx="1.5"/><path fill="#fff" stroke="#fff" stroke-width=".4" d="M7.122 10.9a.644.644 0 0 1-.911 0L3.989 8.678l.141-.141a.444.444 0 1 1 .629-.629L7.122 10.9Zm0 0ZM11.1 5.1 6.667 9.533 11.87 5.87a.444.444 0 1 0-.629-.629l-.141-.14Z"/></svg>;
  } 
  
  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"><rect width="15" height="15" x=".5" y=".5" stroke="#191A1F" rx="1.5"/></svg>
}

export default CheckboxIcon;