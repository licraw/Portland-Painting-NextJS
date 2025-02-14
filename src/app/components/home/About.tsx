"use client";

import styled from "styled-components";
import PageSection from "../PageSection";
import Link from "next/link";

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

const AboutRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const SectionSubHeader = styled.h3`
  font-family: "Helvetica Neue";
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
  text-transform: capitalize;

  @media (min-width: 1024px) {
    font-size: 48px;
    line-height: 130%;
    max-width: 50%;
  }
`;

export const SectionContent = styled.div`
  font-family: "Helvetica Neue";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
  max-width: 600px;
`;

const AboutLink = styled(Link)`
  display: inline-block;
  padding: 12px 24px;
  border-radius: 48px;
  border: 1px solid black;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  color: black;
  transition: all 0.3s ease;
  margin-top: 16px;

  &:hover {
    background: black;
    color: white;
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-top: 24px;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
`;

const StatCard = styled.div`
  background: #e8f2ec;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
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

const About = () => {
  return (
    <PageSection bgcolor="white">
      <SectionHeaderWrapper>
        <SectionHeader>
          <span className="sectionNumber">02/</span> About Us
        </SectionHeader>
        <hr />
      </SectionHeaderWrapper>
      <SectionBody>
        {/* Title and Content Side-by-Side */}
        <AboutRow>
          <SectionSubHeader>Reviving Homes, Restoring Trust</SectionSubHeader>
          <SectionContent>
            <p>
              Portland Painting and Restoration is one of Portland and
              Vancouver’s premier repair, light remodel, and finish contractors.
              Our team of professional Carpenters and Painters, along with
              dedicated Estimators, Project Managers, and Office Staff, work
              together to deliver top-tier results with a focus on client
              satisfaction and quality workmanship. We specialize in providing
              thoughtful, era-appropriate solutions that enhance and protect
              your property, whether through carpentry repairs, remodeling,
              cabinet modifications, or painting services.
            </p>
            <AboutLink href="/about-us/green-and-safe">About Us</AboutLink>
          </SectionContent>
        </AboutRow>

        {/* Stats Section */}
        <StatsContainer>
          <StatCard>
            <h4>15+ Years</h4>
            <p>
              <strong>Serving the Portland Area</strong> with quality
              restoration since 2009.
            </p>
          </StatCard>

          <StatCard>
            <h4>62 Reviews</h4>
            <p>
              <strong>Google Rated 4.9 Stars</strong> by our satisfied
              customers.
            </p>
          </StatCard>

          <StatCard>
            <h4>300+ Projects</h4>
            <p>
              <strong>Completed Renovations</strong> that transform homes and
              businesses.
            </p>
          </StatCard>
        </StatsContainer>
      </SectionBody>
    </PageSection>
  );
};

export default About;

// <br />
// <p>
//   From the first consultation with our estimator to the final
//   walk-through with our project manager, we ensure every phase of the
//   project is handled with care and precision. Our office staff is
//   always available to provide support and keep communication seamless
//   throughout the process.
// </p>
// <br />
// <p>
//   As a licensed, bonded, and insured lead-safe contractor in both
//   Oregon and Washington, Portland Painting and Restoration meets all
//   OSHA safety standards and exceeds PDCA guidelines. Trusted by
//   general contractors but available directly to you, we offer a direct
//   path to quality workmanship—saving you time and money while
//   delivering exceptional results.
// </p>
