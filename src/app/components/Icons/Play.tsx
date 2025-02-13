import * as React from 'react';
import styled from 'styled-components';

const SVG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 179.9 256"
    width="1em"
    height="1em"
    preserveAspectRatio="xMidYMid meet"
    {...props}
  >
    <path className="play_svg__st0" d="M0 0l179.9 128L0 256z" />
  </svg>
);

const SvgPlay: React.FC<React.SVGProps<SVGSVGElement>> = styled(SVG)`
  display: ${({ display = 'inline-block' }) => display};
  font-size: ${({ fontSize = '32px' }) => fontSize};
  vertical-align: middle;
  shape-rendering: inherit;
  transform: translate3d(0, 0, 0);
`;
export default SvgPlay;
