import * as React from 'react';
import styled from 'styled-components';

const SVG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 21 20.41"
    width="1em"
    height="1em"
    preserveAspectRatio="xMidYMid meet"
    {...props}
  >
    <path d="M21 1.41L19.59 0 10.5 9.09 1.41 0 0 1.41l9.09 9.09L.59 19 2 20.41l8.5-8.5 8.5 8.5L20.41 19l-8.5-8.5L21 1.41z" />
  </svg>
);

const SvgX: React.FC<React.SVGProps<SVGSVGElement>> = styled(SVG)`
  display: ${({ display = 'inline-block' }) => display};
  font-size: ${({ fontSize = '32px' }) => fontSize};
  vertical-align: middle;
  shape-rendering: inherit;
  transform: translate3d(0, 0, 0);
`;
export default SvgX;
