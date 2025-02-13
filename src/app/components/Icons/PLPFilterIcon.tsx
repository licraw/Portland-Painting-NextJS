import { FC } from "react";

interface Props {
  theme?: string;
}

const PLPFilterIcon: FC<Props> = ({ theme = 'dark' }) => {
  const primaryColor = (theme == 'dark') ? '#191A1F' : '#fff';
  const secondaryColor = (theme == 'dark') ? '#fff' : '#191A1F';

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" fill="none">
      <rect width="18" height="1.5" y="2.5" fill={primaryColor} rx=".75"/>
      <circle cx="10.5" cy="3" r="1.75" fill={secondaryColor} stroke={primaryColor} strokeWidth="1.5"/>
      <rect width="18" height="1.5" y="7.5" fill={primaryColor} rx=".75"/>
      <circle cx="5.5" cy="8" r="1.75" fill={secondaryColor} stroke={primaryColor} strokeWidth="1.5"/>
      <rect width="18" height="1.5" y="12.5" fill={primaryColor} rx=".75"/>
      <circle cx="11.5" cy="13" r="1.75" fill={secondaryColor} stroke={primaryColor} strokeWidth="1.5"/>
    </svg>
  );
};

export default PLPFilterIcon;
