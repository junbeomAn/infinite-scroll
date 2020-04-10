import { useEffect } from "react";

export default ({
  target,
  onIntersect,
  threshold = 1.0,
  rootMargin = "0px"
}) => {
  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect);

    if (!target) {
      return;
    }

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [target, rootMargin, onIntersect, threshold]);
};
