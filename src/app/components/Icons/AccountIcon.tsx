import { FC } from "react";

interface AccountIconProps {
  fill?: string;
  pxSize?: string;
}

const AccountIcon: FC<AccountIconProps> = ({ fill = '#000', pxSize = '40px' }) => (
  <svg width={pxSize} height={pxSize} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M27.9999 27.9774C27.9999 25.0115 25.6999 22.4546 22.3999 21.5342" stroke={fill} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M17.2 21.6365C14.2 22.5569 12 25.1137 12 27.9774" stroke={fill} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M20.1001 22.0227C22.8615 22.0227 25.1001 19.7841 25.1001 17.0227C25.1001 14.2613 22.8615 12.0227 20.1001 12.0227C17.3387 12.0227 15.1001 14.2613 15.1001 17.0227C15.1001 19.7841 17.3387 22.0227 20.1001 22.0227Z" stroke={fill} strokeWidth="1.75" strokeLinecap="round" stroke-linejoin="round"></path>
  </svg>
);

export default AccountIcon;