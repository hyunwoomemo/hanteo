"use client";
import Banner from "@/components/common/Banner";
import Footer from "@/components/common/Footer";
import { List } from "@/components/common/List";
import TopAppBar from "@/components/common/TopAppBar";
import { MAX_WIDTH } from "@/constants";
import { bannerData } from "@/dummy/banner";
import { tabData } from "@/dummy/tabData";

import { useEffect, useState } from "react";
import styled from "styled-components";

export default function Home() {
  const [tab, setTab] = useState(1);

  // 탭 이동시 상단 이동
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [tab]);

  return (
    <div>
      <TopAppBar data={tabData} tab={tab} setTab={setTab} />
      <Container $maxwidth={MAX_WIDTH}>
        <Banner data={bannerData} autoPlay={true} />
        <List tab={tab} setTab={setTab} />
      </Container>
      <Footer />
    </div>
  );
}

const Container = styled.div<{ $maxwidth: number }>`
  max-width: ${({ $maxwidth }) => `${$maxwidth}px`};
  margin: 0 auto;
`;
