import React from 'react';
import * as S from '../Styles';
import SkeletonGalleryCarousel from './SkeletonGalleryCarousel';

const SkeletonGalleryMainContent = () => {
  return (
    <S.GalleryMainContent>
      <SkeletonGalleryCarousel />
    </S.GalleryMainContent>
  );
};

export default SkeletonGalleryMainContent;
