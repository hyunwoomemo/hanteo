import { useEffect } from "react";

interface IntersectionProps {
  ref: React.RefObject<HTMLDivElement | null>;
  onIntersect: () => void;
  threshold?: number;
  root?: HTMLDivElement | null;
  rootMargin?: string;
  enabled?: boolean;
}

const useIntersection = ({ ref, onIntersect, threshold = 0, root = null, rootMargin = "0px", enabled = true }: IntersectionProps) => {
  useEffect(() => {
    if (!ref || !ref.current || !enabled) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      },
      { root, rootMargin, threshold }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect(); // 기존 observer 정리
    };
  }, [ref, onIntersect, root, rootMargin, threshold, enabled]);
};

export default useIntersection;
