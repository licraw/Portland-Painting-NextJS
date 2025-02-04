"use client";
import { useState } from "react";
import Section from "../PageSection";
import styled from "styled-components";
import {
  SectionHeaderWrapper,
  SectionHeader,
  SectionBody,
  SectionSubHeader,
  SectionContent,
} from "./ServiceStyles";
import ServiceCard from "./ServiceCard";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;

  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: stretch;
    gap: 24px;
  }
`;

const Services = () => {
  const [activeCard, setActiveCard] = useState("Painting");

  function handleCardClick(e: { currentTarget: any; }) {
    const card = e.currentTarget;
    const title = card.querySelector("h2")?.textContent || "";

    setActiveCard(title);
  }



  return (
    <Section bgcolor="#E8F2EC">
      <SectionHeaderWrapper>
        <SectionHeader>
          <span className="sectionNumber">03/ </span>Our Services
        </SectionHeader>
        <hr />
      </SectionHeaderWrapper>
      <SectionBody>
        <SectionSubHeader>
          Our various services are provided for you
        </SectionSubHeader>
        <SectionContent>
          <CardContainer>
            <ServiceCard
              isactive={activeCard === "Painting"}
              title="Painting"
              description="Servicing the greater Portland, OR metro area, we offer both Interior and exterior repaints as well as chronic failure solutions like lead paint removal of old failing substrates and carpentry repairs, of which ensures a sound substrate on historic homes to preserve them for another 100 years to come."
              image='/gallery/interior1.jpeg'
              secondImage='/gallery/exterior1.jpeg'
              handleCardClick={handleCardClick}
            />
            <ServiceCard
              isactive={activeCard === "Carpentry"}
              title="Carpentry"
              description="Our carpentry services include repairs, modifications, and installations. We specialize in providing thoughtful, era-appropriate solutions that enhance and protect your property."
              image="/gallery/carpentry1.jpg"
              handleCardClick={handleCardClick}
            />
            <ServiceCard
              isactive={activeCard === "Restoration"}
              title="Restoration"
              description="Our restoration services include repairs, modifications, and installations. We specialize in providing thoughtful, era-appropriate solutions that enhance and protect your property."
              image="/gallery/restoration1.jpg"
              handleCardClick={handleCardClick}
            />
          </CardContainer>
        </SectionContent>
      </SectionBody>
    </Section>
  );
};

export default Services;
