import React from 'react';
import * as S from '../Styles';
import SkeletonGalleryMainContent from './SkeletonGalleryMainContent';
import SkeletonThumbnailList from './SkeletonThumbnailList';

const SkeletonLoader = () => {
  return (
    <div style={{ position: 'relative', maxWidth: '850px', margin: '0 auto' }}>
      <S.GalleryContainer>
        <S.ThumbnailListBackground />
        <SkeletonThumbnailList />
        <SkeletonGalleryMainContent />
      </S.GalleryContainer>
    </div>
  );
};

export default SkeletonLoader;
