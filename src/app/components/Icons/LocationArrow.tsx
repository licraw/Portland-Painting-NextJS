import React from 'react';
import styled from 'styled-components';

const StyledLocationArrow = styled.svg`
  fill: #1A1B1B;
  transition: all .3s ease-in-out;

  &:hover {
    fill: #FFFFFF;
  }
`;

const LocationArrow = () => (
  <StyledLocationArrow xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17">
    <path d="M8.5002 16.5001C8.46433 16.5001 8.42798 16.4962 8.39176 16.4881C8.16289 16.4373 8.00004 16.2344 8.00004 16V8.5H0.500045C0.265639 8.5 0.0626702 8.33715 0.0119202 8.10828C-0.0388611 7.87943 0.0762014 7.64603 0.288608 7.5469L15.2886 0.546903C15.4792 0.458028 15.7049 0.497778 15.8536 0.646465C16.0023 0.795153 16.042 1.02093 15.9532 1.21147L8.95317 16.2115C8.8697 16.3902 8.69111 16.5001 8.5002 16.5001ZM2.75383 7.5H8.50004C8.7762 7.5 9.00004 7.72387 9.00004 8V13.7462L14.4655 2.03456L2.75383 7.5Z"/>
  </StyledLocationArrow>
);

export default LocationArrow;
