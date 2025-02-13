import React from 'react';
import * as S from '../Styles';

const SkeletonThumbnailList = () => {
  const fakeThumbnails = [];
  for (let i = 0; i < 4; i++) {
    fakeThumbnails.push(
      <S.ImageThumbnailContainer key={i}>
        <S.ThumbnailImage />
      </S.ImageThumbnailContainer>
    );
  }
    return (
      <S.ThumbnailList>
         {fakeThumbnails}
      </S.ThumbnailList>
    );
  }


export default SkeletonThumbnailList;
