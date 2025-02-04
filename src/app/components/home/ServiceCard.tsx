"use client";
import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

type ServiceType = "Painting" | "Carpentry" | "Restoration";

interface ServiceCardProps {
  title: ServiceType;
  description?: string;
  image?: string;
  isactive?: boolean;
  secondImage?: string;
  handleCardClick?: (e) => void;
}

const Card = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isactive",
})<ServiceCardProps>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  height: 400px;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  background: linear-gradient(
      180deg,
      rgba(9, 51, 25, 0) 30%,
      rgba(9, 51, 25, 0.9) 90%
    ),
    linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url(${(props) => props.image}) center/cover no-repeat;

  @media (min-width: 1024px) {
    flex: ${({ isactive }) => (isactive ? "2" : "1")};
    min-width: ${({ isactive }) => (isactive ? "50%" : "15%")};
    opacity: ${({ isactive }) => (isactive ? "1" : "0.7")};
    width: 100%;
  }

  @media (max-width: 1023px) {
    flex: 1;
    width: 100%;
    transform: none;
    opacity: 1;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px;
  gap: 12px;
  width: 100%;
  position: relative;
`;

const Title = styled.h2`
  font-family: "Helvetica Neue", sans-serif;
  font-size: 28px;
  font-weight: 600;
  color: white;
`;

const Description = styled.p`
  font-family: "Helvetica Neue", sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: white;
  line-height: 1.5;
  max-width: 600px;
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 16px;
  align-items: center;
`;

const ToggleGroup = styled.div`
  display: flex;
  align-items: center;
  background: black;
  border-radius: 24px;
  padding: 4px;
  position: relative;
  height: 40px;
`;

const ToggleButton = styled.button<{ selected: boolean }>`
  flex: 1;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  background: transparent;
  color: ${({ selected }) => (selected ? "white" : "rgba(255, 255, 255, 0.6)")};
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
`;

const ToggleSlider = styled.div<{ activeindex: number }>`
  position: absolute;
  top: 4px;
  left: ${({ activeindex }) => (activeindex === 0 ? "4px" : "50%")};
  width: calc(50% - 4px);
  height: 80%;
  background: #2d6a4f;
  border-radius: 20px;
  transition: all 0.3s ease;
  z-index: 1;
`;

const ViewServiceLink = styled(Link)`
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 20px;
  border: 1px solid white;
  color: black;
  background: white;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    color: white;
  }
`;

const ArrowButtonWrapper = styled.div`
  display: flex;
  height: 48px;
  padding: 10px 12px;
  justify-content: center;
  align-self: flex-start;
  margin-top: 16px;
  gap: 8px;
  border-radius: 48px;
  background: rgba(7, 7, 7, 0.3);
  backdrop-filter: blur(10px);
`;

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  image,
  isactive,
  secondImage,
  handleCardClick,
}) => {
  const [paintingOption, setPaintingOption] = useState<"interior" | "exterior">(
    "interior"
  );

  return (
    <Card
      isactive={isactive}
      title={title}
      image={title !== "Painting" ? image : (paintingOption === "interior" ? image : secondImage)}
      onClick={handleCardClick}
    >
      <ContentWrapper>
        <Title>{title}</Title>
        {isactive ? (
          <>
            <Description>{description}</Description>
            <BottomRow>
              {title === "Painting" ? (
                <ToggleGroup>
                  <ToggleSlider
                    activeindex={paintingOption === "interior" ? 0 : 1}
                  />
                  <ToggleButton
                    className={paintingOption === "interior" ? "interiorActive" : "exteriorActive"}
                    selected={paintingOption === "interior"}
                    onClick={(e) => {
                      e.stopPropagation();
                      setPaintingOption("interior");
                    }}
                  >
                    Interior
                  </ToggleButton>
                  <ToggleButton
                    selected={paintingOption === "exterior"}
                    onClick={(e) => {
                      e.stopPropagation();
                      setPaintingOption("exterior");
                    }}
                  >
                    Exterior
                  </ToggleButton>
                </ToggleGroup>
              ) : (
                <div></div>
              )}

              <ViewServiceLink
                href={
                  title === "Painting"
                    ? `/${title.toLowerCase()}/${paintingOption}`
                    : `/${title.toLowerCase()}`
                }
              >
                View Service
              </ViewServiceLink>
            </BottomRow>
          </>
        ) : (
          <ArrowButtonWrapper>
            <Image src="/arrow.svg" alt="Arrow Icon" width={24} height={24} />
          </ArrowButtonWrapper>
        )}
      </ContentWrapper>
    </Card>
  );
};

export default ServiceCard;
