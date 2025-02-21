import useDrag, { DragProps } from "@/hooks/useDrag";
import React from "react";
import styled from "styled-components";

interface DragContainerProps extends DragProps {
  children: React.ReactNode;
}

const DragContainer = ({ leftDrag, rightDrag, children }: DragContainerProps) => {
  const { containerRef, handleTouchEnd, handleTouchMove, handleTouchStart } = useDrag({ leftDrag, rightDrag });

  return (
    <Container
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchEnd}
    >
      {children}
    </Container>
  );
};

export default DragContainer;

const Container = styled.div``;
