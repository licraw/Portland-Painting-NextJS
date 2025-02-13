import * as React from 'react';
import styled from 'styled-components';

const SVG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 9"
    width="1em"
    height="1em"
    preserveAspectRatio="xMidYMid meet"
    {...props}
  >
    <path d="M14.72 0L8.95 5.6l-.91 1.01-.62-.65L1.28 0 0 1.24l6.76 6.52L8 8.96l.04.04L16 1.24 14.72 0z" />
  </svg>
);

const SvgPointerDown: React.FC<React.SVGProps<SVGSVGElement>> = styled(SVG)`
  display: ${({ display = 'inline-block' }) => display};
  font-size: ${({ fontSize = '32px' }) => fontSize};
  vertical-align: middle;
  shape-rendering: inherit;
  transform: translate3d(0, 0, 0);
`;
export default SvgPointerDown;
