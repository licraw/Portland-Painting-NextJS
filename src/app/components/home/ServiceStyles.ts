import styled from "styled-components";

export const SectionHeaderWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 40px;
  align-self: stretch;
  .sectionNumber {
    color: #167f3f;
  }
  hr {
    flex-grow: 1;
    height: 1px;
    border: none;
    background-color: lightgray;
  }
`;

export const SectionHeader = styled.h2`
  font-family: "Helvetica Neue";
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  margin: 0;
  @media (min-width: 1024px) {
    font-size: 20px;
  }
`;

export const SectionBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-self: stretch;
`;

export const SectionSubHeader = styled.h3`
  font-family: "Helvetica Neue";
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
  text-transform: capitalize;
  @media (min-width: 1024px) {
    font-size: 48px;
    line-height: 130%;
    max-width: 50%;
  }
`;

export const SectionContent = styled.div`
  font-family: "Helvetica Neue";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
`;