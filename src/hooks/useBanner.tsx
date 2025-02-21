import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useWindowSize from "./useWindowSize";
import { IBanner } from "@/dummy/banner";

interface useBannerProps {
  data: Array<IBanner>;
  autoPlay: boolean;
  autoPlaySec?: number;
  gap: number;
}

const TRANSTION_SEC = 0.3;

const useBanner = ({ data, autoPlay, autoPlaySec = 3000, gap }: useBannerProps) => {
  const { width } = useWindowSize();
  const [page, setPage] = useState(1);
  const [translatex, setTransLateX] = useState(0);
  const [carouseltransition, setCarouseltransition] = useState(`transform ${TRANSTION_SEC}s, opacity 1s`);
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // 인터벌 저장
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);

  const itemwidthrate = useMemo(() => {
    return width > 769 ? 0.3 : 0.85;
  }, [width]);

  const dataArray = useMemo(() => {
    return [data.at(-1), ...data, data[0]];
  }, [data]);

  useEffect(() => {
    setTransLateX((width - width * itemwidthrate) / 2 - (width * itemwidthrate + gap) * page);
  }, [page, width, itemwidthrate, gap]);

  const handleMovePage = useCallback(
    (type: string) => {
      setCarouseltransition(`transform ${TRANSTION_SEC}s, opacity 1s`);
      if (type === "left") {
        setPage((prev) => prev - 1);
        if (page === 1) {
          setTimeout(() => {
            setCarouseltransition("transform 0s, opacity 0s");
            setPage(dataArray.length - 2);
          }, TRANSTION_SEC * 1000);
        }
      } else {
        setPage((page + 1) % dataArray.length);
      }
    },
    [dataArray.length, page]
  );

  useEffect(() => {
    if (page === dataArray.length - 1) {
      setTimeout(() => {
        setCarouseltransition("transform 0s, opacity 1s");
        setPage(1);
      }, TRANSTION_SEC * 1000);
    }
  }, [page, dataArray.length]);

  useEffect(() => {
    if (autoPlay) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current); // 기존 인터벌 제거
      }
      intervalRef.current = setInterval(() => {
        handleMovePage("right");
      }, autoPlaySec);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        } // 컴포넌트 언마운트 시 인터벌 제거
      };
    }
  }, [autoPlay, handleMovePage, autoPlaySec]);

  const onMouseDown = (e: React.MouseEvent) => {
    startX.current = e.clientX;
    setIsDragging(false);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (Math.abs(e.clientX - startX.current) > 5) {
      // 5px 이상 움직이면 드래그로 판단
      setIsDragging(true);
    }
  };

  const onClick = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault(); // 드래그 중이면 링크 이동 막기
    }
  };

  const draggingPreventClick = {
    onMouseDown,
    onMouseMove,
    onClick,
  };

  return { dataArray, handleMovePage, translatex, carouseltransition, itemwidthrate, width, page, setPage, draggingPreventClick };
};

export default useBanner;
