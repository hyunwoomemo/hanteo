import React, { useRef, useState } from "react";

export interface DragProps {
  leftDrag: () => void;
  rightDrag: () => void;
}

const useDrag = ({ leftDrag, rightDrag }: DragProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [startX, setStartX] = useState<number | null>(null);
  const [startY, setStartY] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientX = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    setStartX(clientX);
    setStartY(clientY);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!startX || !startY) return;
    const clientX = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    const diffX = startX - clientX;
    const diffY = startY - clientY;

    if (diffY > Math.abs(diffX)) {
      return; // 세로 스크롤
    }

    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        // 왼쪽 → 다음 탭 이동

        leftDrag();
      } else {
        // 오른쪽 → 이전 탭 이동
        rightDrag();
      }
      setStartX(null); // 한 번 이동 후 초기화
    }
  };

  const handleTouchEnd = () => {
    setStartX(null);
  };

  return {
    containerRef,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};

export default useDrag;
