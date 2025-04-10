import styled from "styled-components";

export const SectionImageFinal = styled.img`
  display: block;
  margin: 20px auto; /* Ensures it's centered horizontally */
  width: 100%;
  max-width: 1000px;
  height: auto;
  border-radius: 8px;

  @media (min-width: 1024px) {
    width: 70%; /* Make it narrower on large screens if you prefer */
  }
`;
