import { tabData } from "@/dummy/tabData";
import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import DragContainer from "./DragContainer";
import useIntersection from "@/hooks/useIntersection";

interface ListProps {
  tab: number;
  setTab: (tab: number) => void;
}

export const List = ({ tab, setTab }: ListProps) => {
  const name = useMemo(() => tabData.find((v) => v.id === tab)?.name, [tab]);

  const [dataCount, setDataCount] = useState(20);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const prevTabNum = useRef<number>(tab);
  const ref = useRef<HTMLDivElement | null>(null);

  useIntersection({
    ref,
    onIntersect: () =>
      setDataCount((prev) => {
        if (prev < 100) {
          return prev + 20;
        } else {
          return prev;
        }
      }),
    enabled: dataCount < 100,
  });

  // 드래그가 아닌 탭 클릭 시 방향 설정
  useEffect(() => {
    setDataCount(20);
    if (prevTabNum.current < tab) {
      setDirection("left");
    }
    if (prevTabNum.current > tab) {
      setDirection("right");
    }
    prevTabNum.current = tab;
  }, [tab]);

  // framer-motion 옵션
  const slideVariants = {
    hidden: (direction: "left" | "right") => ({
      opacity: 0,
      x: direction === "left" ? 50 : -50,
    }),
    visible: {
      opacity: 1,
      x: 0,
    },
    exit: (direction: "left" | "right") => ({
      opacity: 0,
      x: direction === "left" ? -50 : 50,
    }),
  };

  const handleLeftDrag = () => {
    if (tab < tabData.length) {
      setTab(tab + 1);
    } else {
      setTab(1);
    }
    setDirection("left");
  };

  const handleRightDrag = () => {
    if (tab > 1) {
      setTab(tab - 1);
    } else {
      setTab(tabData.length);
    }
    setDirection("right");
  };

  return (
    <DragContainer leftDrag={handleLeftDrag} rightDrag={handleRightDrag}>
      <Container>
        <Title>{name}</Title>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div key={tab} variants={slideVariants} initial="hidden" animate="visible" exit="exit" custom={direction} transition={{ duration: 0.2 }} style={{ width: "100%" }}>
            {Array.from({ length: dataCount }).map((_, i) => (
              <ListItem key={i} />
            ))}
          </motion.div>
        </AnimatePresence>
        <div ref={ref}></div>
      </Container>
    </DragContainer>
  );
};

export const ListItem = () => {
  return (
    <Item>
      <ImageBox />
      <Contents>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi vel ratione officia, exercitationem et corrupti illum, perferendis.</Contents>
    </Item>
  );
};

const Container = styled.div`
  padding: 20px;
  user-select: none; /* 드래그 방지 */
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eaeaea;
  gap: 15px;
`;

const ImageBox = styled.div`
  min-width: 60px;
  min-height: 60px;
  flex: 1 1 auto;
  border-radius: 10px;
  background-color: #eaeaea;
  margin-right: 10px;
`;

const Contents = styled.div`
  flex: 5 5 auto;
`;
