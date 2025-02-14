import styled, { css } from 'styled-components';
interface StyleProps {
  isModal?: boolean;
  mobileMaxHeight?: string;
  zoomRate?: number;
  mobileZoomRate?: number;
  modalImageMaxHeight?: number;
  mobileDisplay?: string;
  widthPercentage?: number;
  paddingTopPercentage?: number;
  mediaItemsLength?: number;
}

export const CarouselItemsContainer = styled.div<StyleProps>`
  img {
    max-height: ${props => props.modalImageMaxHeight}px;
    min-height: 40px;
  }
`;

export const ProductBadgeContainer = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 1;

  @media screen and (min-width: 992px) {
    display: flex;
  }
`;

export const HeroImageWrapper = styled.div`
  display: flex;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
`;

export const GalleryContainer = styled.div`
  display: flex;
  align-items: flex-start;
  position: relative;
  margin: 2rem -16px;
  overscroll-behavior-x: none;
  @media screen and (min-width: 992px) {
    margin: 2rem 0;
  }
  img {
    user-select: none;
  }
`;

export const GalleryMainContent = styled.div<StyleProps>`
  position: relative;
  width: 100%;
  background-color: ${props => (props.isModal ? 'white' : 'white')};
  padding-top: 0;
  overflow: ${props => (props.isModal ? '' : 'hidden')};
  @media screen and (min-width: 992px) {
    margin-left: ${props => (props.isModal ? '0' : '50px')};
    margin-top: ${props => (props.isModal ? '0' : '-20px')};
    width: ${props => (props.isModal ? '100%' : 'calc(100% - 50px)')};
  }
  &:hover .video-controls {
    visibility: visible;
  }
  img {
    user-select: none;
  }
`;

export const ModalContainer = styled.div`
  position: relative;
  z-index: 999999999;
`;

export const HeroImage = styled.img<StyleProps>`
  user-select: none;
  width: ${props => (props.isModal ? '' : '100%')};
  height: ${props => (props.isModal ? '' : '100%')};
  object-fit: contain;
  mix-blend-mode: darken;
  cursor: zoom-in;
  transition: transform 0.3s ease;
  resize: none;

  &.modal-hero-image {
    max-width: 95%;
    position: absolute;
    z-index: 9999;
    cursor: default;
    transition: transform 0.3s ease;
  }

  &.modal-hero-image.zoomed {
    transform: ${props => (props.mobileZoomRate ? `scale(${props.mobileZoomRate})` : '')};
    cursor: default;
    @media screen and (min-width: 992px) {
      transform: ${props => (props.zoomRate ? `scale(${props.zoomRate})` : '')};
    }
  }
  &.modal-hero-image.non-zoomable {
    pointer-events: none;
  }
`;

const thumbListStyle = css<StyleProps>`
  position: absolute;
  bottom: -6rem;
  max-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: ${props => (props.mediaItemsLength && props.mediaItemsLength <= 4 ? 'center' : 'flex-start')}; /* Center for few items, left-align for many */
  padding-left: ${props => (props.mediaItemsLength && props.mediaItemsLength <= 4 ? 'inherit' : '24px')};
  padding-right: ${props => (props.mediaItemsLength && props.mediaItemsLength <= 4 ? 'inherit' : '16px')};
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 0.5rem;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (min-width: 992px) {
    top: calc(50% - 4px);
    transform: translateY(-50%);
    left: 0;
    display: flex;
    flex-direction: column;
    bottom: revert;
    left: 0;
    overflow-y: auto;
    padding-bottom: 0;
    height: 360px;
    justify-content: ${props => (props.mediaItemsLength && props.mediaItemsLength >= 6 ? 'inherit' : 'center')};
    padding-left: 0;
    padding-right: 0;
    overflow-x: hidden;
  }
`;

export const ThumbnailListBackground = styled.div`
  position: absolute;
  bottom: -7rem;
  left: 0;
  right: 0;
  height: 128px;
  width: 100%;
  background-color: white;

  &::before {
    content: ' ';
    display: block;
    height: 100%;
  }
  @media screen and (min-width: 992px) {
    display: none !important;
    &::before {
      display: none !important;
    }
  }
`;

const modalThumbListStyle = css<StyleProps>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: start;
  flex-direction: row;
  gap: 8px;
  overflow-x: auto;
  z-index: 99999;
  margin: 0 2rem;
  @media screen and (min-width: 992px) {
    justify-content: start;
  }
`;

export const ThumbnailList = styled.div<StyleProps>`
  ${props => (props.isModal ? modalThumbListStyle : thumbListStyle)}
  img {
    user-select: none;
  }
`;

export const ImageThumbnailContainer = styled.div<StyleProps>`
  min-width: ${props => (props.isModal ? '60px' : '50px')};
  width: ${props => (props.isModal ? '60px' : '50px')};
  height: ${props => (props.isModal ? '60px' : '50px')};
  min-height: 50px;
  margin-right: 8px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  mix-blend-mode: darken;
  background-color: ${props => (props.isModal ? '#f9f9f9' : 'white')};
  border-radius: 4px;
  border: solid rgba(26, 27, 27, 0.2) 1px;

  &.activeStyle {
    border: ${props => (props.isModal ? 'solid black 1px' : '')};
    border: solid black 1.2px;
    @media screen and (min-width: 992px) {
      background-color: ${props => (props.isModal ? '#f9f9f9' : 'white')};
    }
  }

  cursor: pointer;

  &.hidden-xs-down {
    display: none;
    @media screen and (min-width: 992px) {
      display: flex;
    }
  }

  &:hover {
    border: solid black 1.2px;
  }

  @media screen and (min-width: 992px) {
    margin-right: 0;
    background-color: ${props => (props.isModal ? '#f9f9f9' : 'white')};
    border-radius: 4px;
    border-width: 1.2px;
  }
`;

export const ThumbnailImage = styled.img<StyleProps>`
  visibility: visible;
  max-width: 35px;
  max-height: 35px;
  mix-blend-mode: darken;
  cursor: pointer;

  @media screen and (min-width: 992px) {
    visibility: visible;
  }
`;

export const ScrollThumbsDownButton = styled.button`
  cursor: pointer;
  width: 50px;
  padding: 0;
  height: 2rem;
  flex-shrink: 0;
  background-color: transparent;
  position: absolute;
  bottom: calc(50% - 202px);
  border: none;
  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline-width: 0px;
    box-shadow: rgb(185, 205, 241) 0px 0px 0px 3px;
    transition: box-shadow 0.15s ease 0s;
  }

  display: none;
  justify-content: center;
  align-items: center;
  border-radius: 0;

  @media screen and (min-width: 992px) {
    display: flex;
  }
`;

export const ScrollThumbsUpButton = styled.button`
  cursor: pointer;
  width: 50px;
  padding: 0;
  height: 2rem;
  flex-shrink: 0;
  background-color: transparent;
  position: absolute;
  top: calc(50% - 216px);
  border: none;
  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline-width: 0px;
    box-shadow: rgb(185, 205, 241) 0px 0px 0px 3px;
    transition: box-shadow 0.15s ease 0s;
  }

  display: none;
  justify-content: center;
  align-items: center;
  border-radius: 0;

  @media screen and (min-width: 992px) {
    display: flex;
  }
`;

export const ScrollGalleryButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 2rem;
  right: 2rem;
  transform: translateY(-50%);

  .gallery-button {
    background-color: transparent;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    cursor: pointer;
  }
`;

export const LeftScrollButtonWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 2rem;
  transform: translateY(-50%);
  z-index: 1;
  visibility: hidden;

  .gallery-button {
    background-color: transparent;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    cursor: pointer;
  }
  &:hover {
    background-color: #e8f2ec;
    border-radius: 50%;
  }
  @media screen and (min-width: 992px) {
    visibility: visible;
  }
`;

export const RightScrollButtonWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 2rem;
  transform: translateY(-50%);
  z-index: 1;
  visibility: hidden;

  .gallery-button {
    background-color: transparent;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    cursor: pointer;
  }
  &:hover {
    background-color: #e8f2ec;
    border-radius: 50%;
  }
  @media screen and (min-width: 992px) {
    visibility: visible;
  }
`;

export const ArrowScrollButton = styled.button`
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: transparent;
  border: none;
  padding: 0;
  &:hover {
    background-color: #e8f2ec;
    border-radius: 50%;
  }
`;

export const PlayIcon = styled.img<StyleProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 30px;
  height: 30px;
`;

export const IframeWrapper = styled.div<StyleProps>`
  position: relative;
  width: ${props => (props.widthPercentage ? `${props.widthPercentage}%` : '100%')};
  padding-top: ${props => (props.paddingTopPercentage ? `${props.paddingTopPercentage}%` : '56.25%')};
  height: 0;

  .iframe-play-icon {
    visibility: visible;
    z-index: 16;
    height: 40px;
    width: 40px;

    @media screen and (min-width: 992px) {
      display: none;
    }
  }
  .show-iframe {
    visibility: visible;
    opacity: 1;
    transition: opacity 300ms 300ms ease-in-out;
  }
  .hide-iframe {
    visibility: hidden;
    opacity: 0;
  }
`;

export const StyledIframe = styled.iframe<StyleProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  z-index: 15;
  border-radius: 16px;
  display: ${props => (props.mobileDisplay ? props.mobileDisplay : 'block')};
  @media screen and (min-width: 992px) {
    display: block;
  }
`;

export const IframeThumbnailMobile = styled.img`
  background-color: black;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 16px;

  @media screen and (min-width: 992px) {
    display: none;
  }
`;

export const IframeThumbnailDesktop = styled.div`
  background-color: black;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  display: none;

  @media screen and (min-width: 992px) {
    display: block;
  }
`;

export const IframeThumbnailWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  z-index: 14;
  cursor: pointer;
`;

export const IframeLoader = styled.div`
  background-color: black;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  z-index: 13;
  margin: -10px 0;
`;

export const ModalContent = styled.div``;

export const ModalGalleryMainContent = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
  padding-top: 66.67%;
  height: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  &:hover .video-controls {
    visibility: visible;
  }
`;

export const RightArrowButton = styled.div`
  position: fixed;
  right: 0;
  bottom: 1.5rem;
  cursor: pointer;
  z-index: 9999;
`;

export const LeftArrowButton = styled.div`
  position: fixed;
  bottom: 1.5rem;
  left: 0;
  cursor: pointer;
  z-index: 9999;
`;
