import { styled } from 'styled-components';

export const ExpandedModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  img {
  user-select: none;
  }
  .gallery-modal-thumbnai-list.hidden {
    display: none;
  }
`;

export const StyledChildrenContainer = styled.div`
  background-color: white;
  position: relative;
  width: 100%;
`;

export const ModalBackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const ScrollModalRightWrapper = styled.div`
  z-index: 9999;
  position: absolute;
  bottom: 50%;
  right: 1rem;
  display: none;
  @media screen and (min-width: 769px) {
    display: block;
  }
`;

export const ScrollModalLeftWrapper = styled.div`
  z-index: 9999;
  position: absolute;
  bottom: 50%;
  left: 1rem;
  display: none;
  @media screen and (min-width: 769px) {
    display: block;
  }
`;

export const ExitModalButton = styled.button`
  cursor: pointer;
  position: absolute;
  z-index: 9999;
  top: 1rem;
  right: 1rem;
  padding: 0;
  border: none;
  background: transparent;
  border-radius: 50%;
  img {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    border: 1px solid #e0e0e0;
  }
`;
