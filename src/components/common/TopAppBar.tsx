"use client";

import { MAX_WIDTH } from "@/constants";
import { ITap } from "@/dummy/tabData";
import useWindowSize from "@/hooks/useWindowSize";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

interface TopAppBarProps {
  data: Array<ITap>;
  tab: number;
  setTab: (tab: number) => void;
}

const TopAppBar = ({ data, tab, setTab }: TopAppBarProps) => {
  const tabContainerRef = useRef<HTMLDivElement>(null);

  const { width } = useWindowSize();

  useEffect(() => {
    if (tabContainerRef.current) {
      const activeTab = tabContainerRef.current.querySelector(`[data-tab="${tab}"]`);
      if (activeTab) {
        (activeTab as HTMLElement).scrollIntoView({ behavior: "smooth", inline: "center" });
      }
    }
  }, [tab]);

  return (
    <Container width={width}>
      <TabContainer $maxwidth={MAX_WIDTH} ref={tabContainerRef}>
        {data.map((item) => (
          <TapItem width={width} selected={item.id === tab} data-tab={item.id} key={item.id} onClick={() => setTab(item.id)}>
            {item.name}
          </TapItem>
        ))}
      </TabContainer>
    </Container>
  );
};

export default TopAppBar;

const Container = styled.div<{ width: number }>`
  display: flex;
  align-items: center;
  padding: 0 20px;
  overflow-x: auto;
  height: 60px;
  background-color: rgba(244, 180, 180);
  scrollbar-width: none;
  -ms-overflow-style: none;
  justify-content: space-between;
  /* justify-content: ${({ width }) => (width > 768 ? "space-between" : undefined)}; */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TabContainer = styled.div<{ $maxwidth: number }>`
  display: flex;
  justify-content: space-between;
  flex: 1;
  max-width: ${({ $maxwidth }) => $maxwidth}px;
  margin: 0 auto;
`;

const TapItem = styled.div<{ selected: boolean; width: number }>`
  font-size: 16px;
  font-weight: bold;
  color: ${({ selected }) => (selected ? "#fff" : "#000")};
  cursor: pointer;
  width: ${({ width }) => (width > 768 ? undefined : "90px")};
`;
