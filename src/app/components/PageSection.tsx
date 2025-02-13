'use client';

import styled from "styled-components";

interface PageSectionProps {
  bgcolor: string;
  children: React.ReactNode;
  className?: string;
}

const Section = styled.section<PageSectionProps>`
  background-color: ${(props) => props.bgcolor};
  display: flex;
  padding: 40px 32px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 24px;
  align-self: stretch;

  @media (min-width: 1024px) {
    padding: 80px;
  }
`;

const PageSection: React.FC<PageSectionProps> = ({ bgcolor, children, className }) => {
  return <Section className={className}  bgcolor={bgcolor}>{children}</Section>;
};

export default PageSection;
