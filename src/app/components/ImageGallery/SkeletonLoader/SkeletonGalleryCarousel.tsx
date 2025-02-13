import React from 'react';
import { styled } from 'styled-components';

const CarouselContainer = styled.div`
  overflow: hidden;

  width: 100%;
  padding-top: 66.67%;
  height: 0;

  display: flex;
  justify-content: center;
  align-items: center;
`;


const SkeletonGalleryCarousel = () => {

  return (
    <CarouselContainer />
  );
};

export default SkeletonGalleryCarousel;
