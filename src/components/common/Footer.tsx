import { MAX_WIDTH } from "@/constants";
import React from "react";
import styled from "styled-components";

const Footer = () => {
  const handleToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Container>
      <FooterContainer $maxwidth={MAX_WIDTH}>
        Footer
        <TopButton onClick={handleToTop}>Top</TopButton>
      </FooterContainer>
    </Container>
  );
};

export default Footer;

const Container = styled.div`
  background-color: #eee;

  min-height: 200px;
  position: relative;
`;

const FooterContainer = styled.div<{ $maxwidth: number }>`
  max-width: ${({ $maxwidth }) => $maxwidth}px;
  margin: 0 auto;
  padding: 40px;
`;

const TopButton = styled.span`
  position: absolute;
  right: 20px;
  bottom: 20px;
  width: 70px;
  height: 70px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eee;
  cursor: pointer;
`;
