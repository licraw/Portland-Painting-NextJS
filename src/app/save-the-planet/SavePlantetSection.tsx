"use client";

import styled from "styled-components";
import PageSection from "../components/PageSection";
import React from "react";

/** 
 * Flex container that stacks items on mobile, lays them out in a row on desktop.
 */
const SectionLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 20px;

  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

/** 
 * Updated image styling for better side-by-side placement on larger screens.
 */
export const SectionImage = styled.img`
  width: 100%;
  max-width: 600px;
  height: auto;
  border-radius: 8px;

  @media (min-width: 1024px) {
    width: 45%; /* Takes ~45% on desktop */
    margin-right: 40px;
  }
`;
export const SectionImageFinal = styled.img`
  display: block;
  margin: 20px auto; /* Ensures it's centered horizontally */
  width: 100%;
  max-width: 1000px;
  height: auto;
  border-radius: 8px;

  @media (min-width: 1024px) {
    width: 70%; /* Make it narrower on large screens if you prefer */
  }
`;


export const SectionHeaderWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 40px;
  align-self: stretch;

  .sectionNumber {
    color: #167f3f;
  }

  hr {
    flex-grow: 1;
    height: 1px;
    border: none;
    background-color: lightgray;
  }
`;

export const SectionHeader = styled.h2`
  font-family: "Helvetica Neue";
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  margin: 0;

  @media (min-width: 1024px) {
    font-size: 20px;
  }
`;

export const SectionBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-self: stretch;
`;

export const SectionSubHeader = styled.h3`
  font-family: "Helvetica Neue";
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
  text-transform: capitalize;

  @media (min-width: 1024px) {
    font-size: 28px;
    line-height: 130%;
  }
`;

export const SectionContent = styled.div`
  font-family: "Helvetica Neue";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
`;

interface StatContainerProps {
  desktoptemplatecolumns?: number;
}

const StatsContainer = styled.div<StatContainerProps>`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-top: 24px;

  @media (min-width: 1024px) {
    grid-template-columns: ${(props) =>
      `repeat(${props.desktoptemplatecolumns || 2}, 1fr)`};
    gap: 24px;
  }
`;

interface StatCardProps {
  bgcolor?: string;
}

const StatCard = styled.div<StatCardProps>`
  background: ${(props) => props.bgcolor || "#e8f2ec"};
  border-radius: 12px;
  padding: 24px;
  text-align: left;
  font-family: "Helvetica Neue";

  h4 {
    font-size: 32px;
    font-weight: 700;
    color: #167f3f;
    margin: 0;
  }

  p {
    font-size: 14px;
    font-weight: 500;
    margin: 8px 0 0;
  }
`;

const SavePlanetSection = () => {
  return (
    <>
      {/* Section 1: It Will Last Longer */}
      <PageSection className="!pt-6" bgcolor="white">
        <SectionHeaderWrapper>
          <SectionHeader>
            <span className="sectionNumber">01/</span> It Will Last Longer
          </SectionHeader>
          <hr />
        </SectionHeaderWrapper>
        <SectionLayout>
          <SectionImage
            src="/save-the-planet/white-house.png"
            alt="Illustration showing durable building materials"
          />
          <SectionBody>
            <StatsContainer>
              <StatCard>
                <p>
                  Our climate is especially harsh on buildings with dark colors
                  and this wreaks havoc on older weak or troubled substrates.
                  Dark colors introduce intense heat from the sun creating
                  unwanted condensation, expansion, and contraction.
                </p>
              </StatCard>
              <StatCard>
                <p>
                  This causes bubbles and chronic sheathing failure that goes
                  through all the layers of paint to raw wood, popping the
                  original prime coat free of the substrate. A black wall on a
                  100-degree day can reach 140 degrees, whereas a white wall
                  stays relatively close to the actual temperature by not
                  absorbing the light from the sun.
                </p>
              </StatCard>
            </StatsContainer>
          </SectionBody>
        </SectionLayout>
      </PageSection>

      {/* Section 2: It’s In The Science */}
      <PageSection bgcolor="#E8F2EC">
        <SectionHeaderWrapper>
          <SectionHeader>
            <span className="sectionNumber">02/ </span>It’s In The Science
          </SectionHeader>
          <hr />
        </SectionHeaderWrapper>
        <SectionLayout>
          <SectionImage
            src="/save-the-planet/science.png"
            alt="Scientific research illustration"
          />
          <SectionBody>
            <StatsContainer desktoptemplatecolumns={3}>
              <StatCard>
                <p>
                  Turning the world’s black urban landscape white reflects
                  sunlight to delay global warming.
                </p>
              </StatCard>
              <StatCard>
                <p>
                  White homes stay cooler during the summer and that simple
                  change reduces the way heat accumulates, making people who
                  live and work inside consume less energy managing the
                  temperature of their homes.
                </p>
              </StatCard>
              <StatCard>
                <p>
                  White paint now on the market reflects 80 to 90 percent of
                  sunlight, but it gets warmer, not cooler, by absorbing
                  ultraviolet light.
                </p>
              </StatCard>
            </StatsContainer>
          </SectionBody>
        </SectionLayout>
      </PageSection>

      {/* Section 3: Help Out Your Neighbors */}
      <PageSection bgcolor="white">
        <SectionHeaderWrapper>
          <SectionHeader>
            <span className="sectionNumber">03/</span> Help Out Your Neighbors
          </SectionHeader>
          <hr />
        </SectionHeaderWrapper>
        <SectionLayout>
          <SectionImage
            src="/save-the-planet/help.png"
            alt="Community support illustration"
          />
          <SectionBody>
            <StatsContainer>
              <StatCard>
                <p>
                  If you’ve been living in the PNW in recent years, you’re no
                  stranger to the changing rising temperatures we face. Reducing
                  the need for air conditioning and the use of fossil fuels
                  helps combat the problem of urban heat islands.
                </p>
              </StatCard>
              <StatCard>
                <p>
                  In some neighborhoods, especially lower socioeconomic and
                  minority areas, where tree cover tends to be sparser, the
                  difference in temperature can be as much as 20 degrees during
                  the day.
                </p>
              </StatCard>
            </StatsContainer>
          </SectionBody>
        </SectionLayout>
      </PageSection>

      {/* Section 4: Save Money and Resist Spendy Repairs */}
      <PageSection bgcolor="#E8F2EC">
        <SectionHeaderWrapper>
          <SectionHeader>
            <span className="sectionNumber">04/</span> Save Money and Resist
            Spendy Repairs
          </SectionHeader>
          <hr />
        </SectionHeaderWrapper>
        <SectionLayout>
          <SectionImage
            src="/save-the-planet/4th-picture.png"
            alt="Illustration of cost savings and efficient repairs"
          />
          <SectionBody>
            <StatsContainer>
              <StatCard>
                <p>
                  We want your investment to perform as long as possible and for
                  you to enjoy our hard work for years to come. No painting
                  company in town covers chronic failure/bubbles in their
                  warranty, as this cannot be controlled. If you decide to paint
                  an old house dark, and it bubbles/fails completely, you will
                  have effectively done more damage than good to the home, and
                  the only remedy is to have the paint removed and repainted, at
                  an average of 2.5 times the original cost.
                </p>
              </StatCard>
              <StatCard>
                <p>
                  Not only will you save on repairs, but the initial job will
                  cost less. Choosing all white while only using color as an
                  accent requires less time and materials on our part, meaning
                  you get the same A+ service you expect from PPR but at a
                  greatly reduced rate.
                </p>
              </StatCard>
            </StatsContainer>
          </SectionBody>
        </SectionLayout>
      </PageSection>

      {/* Final Section: Call to share the printout */}
      <PageSection bgcolor="white">
        <SectionHeaderWrapper>
          <SectionSubHeader>
            A PRINTOUT TO SHARE WITH ANYONE INTERESTED IN PAINTING THEIR HOUSE
            WHITE AND REDUCING THEIR CARBON FOOTPRINT!!!
          </SectionSubHeader>
          <hr />
        </SectionHeaderWrapper>
        <SectionLayout>
          <SectionImageFinal
            src="/save-the-planet/summary.png"
            alt="Printable infographic illustration"
          />
        </SectionLayout>
      </PageSection>
    </>
  );
};

export default SavePlanetSection;
