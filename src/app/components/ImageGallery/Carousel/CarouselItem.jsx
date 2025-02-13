import React from 'react';
import { styled } from 'styled-components';

const CarouselItemContainer = styled.div`
  will-change: transform;
  transform: translate3d(0, 0, 0);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: ${(props) => (props.isModal ? '100%' : 'calc(100% - 4rem)')};
  margin: ${(props) => (props.isModal ? '0' : '2rem')};
  position: relative;
  &.hidden-xs-down {
    display: none;
    @media screen and (min-width: 769px) {
      display: inline-flex;
    }
  }

  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${(props) => props.imageURL});

  @media screen and (min-width: 769px) {
    width: calc(100% - 9rem);
    margin: 4.5rem;
  }
`;

const CarouselItem = ({ children, isModal, imageURL }) => (
  <CarouselItemContainer isModal={isModal} imageURL={imageURL}>
    {children}
  </CarouselItemContainer>
);

export default CarouselItem;
