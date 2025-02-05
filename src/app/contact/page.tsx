"use client";
import Image from "next/image";
import ContactForm from "../components/ContactForm";
import styled from "styled-components";

/*  
  The container below still handles layout (max-width, margins, flex-direction, gap)
  but the colors, typography, and “cosmetic” details (background, border, box-shadow) 
  are set using our theme values.
*/
const Section = styled.section`
  max-width: 1200px;
  margin: 32px auto;
  padding: 24px;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

/* Contact Information Styles */
const ContactInfo = styled.div`
  flex: 1;
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
  }
`;

const Heading = styled.h1`
  font-family: "Helvetica Neue", sans-serif;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;

  @media (min-width: 1024px) {
    font-size: 28px;
  }
`;

const Paragraph = styled.p`
  font-family: "Helvetica Neue", sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #4a5568; /* Similar to Tailwind's text-gray-700 */
  margin-bottom: 24px;
`;

const AddressBlock = styled.div`
  font-family: "Helvetica Neue", sans-serif;
  font-size: 18px;
  font-weight: 500;
  color: #4a5568;
  margin-bottom: 24px;

  a {
    color: #167f3f;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ImageWrapper = styled.div`
  img {
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

/* Container for the contact form (layout only) */
const FormContainer = styled.div`
  flex: 1;
`;

export default function ContactPage() {
  return (
    <Section>
      <ContactInfo>
        <Heading>Portland Painting and Restoration</Heading>
        <Paragraph>
          We look forward to collaborating with you on your next project. Please fill out the form to contact us, or reach us using the information below.
        </Paragraph>
        <AddressBlock>
          <p>
            <a href="tel:5032367003">(503) 236-7003</a>
          </p>
          <p>918 SE Stephens St.</p>
          <p>Portland, OR 97214</p>
        </AddressBlock>
        <ImageWrapper>
          <Image
            src="/gallery/interior2.jpeg"
            alt="Portland Painting and Restoration"
            width={500}
            height={400}
          />
        </ImageWrapper>
      </ContactInfo>
      <FormContainer>
        <ContactForm />
      </FormContainer>
    </Section>
  );
}
