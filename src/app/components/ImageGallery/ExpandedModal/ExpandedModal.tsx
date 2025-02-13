"use client";
import React, { useEffect } from "react";
import * as S from "./Styles";
import useEscapeKey from "./useEscapeKey";

interface ExpandedModalProps {
  modalVisible: boolean;
  toggleShowModal: () => void;
  children: React.ReactNode;
}

const ExpandedModal: React.FC<ExpandedModalProps> = ({
  modalVisible,
  toggleShowModal,
  children,
}) => {
  const modalRef = useEscapeKey(
    toggleShowModal
  ) as React.RefObject<HTMLDivElement>;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();
      event.stopPropagation();
    };

    if (modalVisible) {
      // Disable scrolling on the hidden body
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";

      document.addEventListener("keydown", handleKeyDown);
    } else {
      // Restore scrolling on the body
      document.body.style.overflow = "";
      document.body.style.position = "";

      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalVisible]);

  if (!modalVisible) {
    return null;
  }

  return (
    <>
      <S.ExpandedModalContainer ref={modalRef}>
        <S.ExitModalButton onClick={toggleShowModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            style={{ width: "24px", height: "24px" }}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </S.ExitModalButton>
        <S.ModalBackDrop />
        <S.StyledChildrenContainer>{children}</S.StyledChildrenContainer>
      </S.ExpandedModalContainer>
    </>
  );
};

export default ExpandedModal;
