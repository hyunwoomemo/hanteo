"use client";
import { IBanner } from "@/dummy/banner";
import React from "react";
import styled from "styled-components";
import DragContainer from "./DragContainer";
import Image from "next/image";
import Link from "next/link";
import useBanner from "@/hooks/useBanner";

interface BannerProps {
  data: Array<IBanner>;
  autoPlay: boolean;
  autoPlaySec?: number;
}

const GAP = 10;

const Banner = ({ data }: BannerProps) => {
  const { dataArray, handleMovePage, translatex, carouseltransition, itemwidthrate, width, page, setPage, draggingPreventClick } = useBanner({
    data,
    autoPlay: true,
    gap: GAP,
  });

  return (
    <DragContainer leftDrag={() => handleMovePage("right")} rightDrag={() => handleMovePage("left")}>
      <Container>
        <BannerWrapper $translatex={translatex} $gap={GAP} $carouseltransition={carouseltransition}>
          {dataArray.map(
            (item, index) =>
              item && (
                <BannerItem draggable={false} href={item.link} target="_blank" key={`${item.id}-${index}`} itemwidthrate={itemwidthrate} width={width} {...draggingPreventClick}>
                  {item.image && <BannerImage src={item.image} width={500} height={200} alt="banner image" draggable={false}></BannerImage>}
                  <BannerContents>{item.title}</BannerContents>
                </BannerItem>
              )
          )}
        </BannerWrapper>
      </Container>
      <Indicator length={data.length} page={page} setPage={setPage} />
    </DragContainer>
  );
};

interface IndicatorProps {
  length: number;
  page: number;
  setPage: (page: number) => void;
}

const Indicator = ({ length, page, setPage }: IndicatorProps) => {
  return (
    <IndicatorContainer>
      {Array.from({ length: length }).map((_, i) => {
        return <IndicatorItem onClick={() => setPage(i + 1)} key={i} selected={i === page - 1} />;
      })}
    </IndicatorContainer>
  );
};

export default Banner;

const Container = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
  position: relative;
  margin: 20px 0;
`;

const BannerWrapper = styled.div<{ $translatex: number; $gap: number; $carouseltransition: string }>`
  display: flex;
  flex-wrap: nowrap;
  gap: ${(props) => props.$gap}px;
  transform: ${(props) => `translateX(${props.$translatex}px)`};
  justify-content: center;
  opacity: ${(props) => (props.$translatex === 0 ? 0 : 1)};
  transition: ${(props) => props.$carouseltransition};
`;

const BannerItem = styled(Link)<{ itemwidthrate: number; width: number }>`
  width: ${(props) => `${props.width * props.itemwidthrate}px`};
  /* height: 200px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #eee;
  border-radius: 10px;
  user-select: none;
`;

const BannerImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* background-color: rgba(180, 244, 180); */
  object-fit: contain;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;
const BannerContents = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 15px;
  font-weight: bold;
`;

const IndicatorContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  justify-content: center;
`;

const IndicatorItem = styled.span<{ selected: boolean }>`
  width: ${({ selected }) => (selected ? "15px" : "10px")};
  height: 10px;
  border-radius: 10px;
  background: ${({ selected }) => (selected ? "tomato" : "#eee")};

  transition: all 0.3s;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;
