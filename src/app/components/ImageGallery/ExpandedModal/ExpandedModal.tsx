"use client";
import React from 'react';
import * as S from './Styles';

interface ExpandedModalProps {
  children: React.ReactNode;
  toggleShowModal: () => void;
  modalVisible: boolean;
}

const ExpandedModal: React.FC<ExpandedModalProps> = ({ children, toggleShowModal, modalVisible }) => {
  if (!modalVisible) return null;

  return (
    <S.ExpandedModalContainer onClick={toggleShowModal}>
      <S.ExitModalButton onClick={toggleShowModal}>
        </S.ExitModalButton>
        <S.ModalBackDrop />
        <S.StyledChildrenContainer>{children}</S.StyledChildrenContainer>
    </S.ExpandedModalContainer>
  );
};

export default ExpandedModal;
