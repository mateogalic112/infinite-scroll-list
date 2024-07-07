import { MutableRefObject, useCallback, useEffect, useRef } from "react";
import useFetchGithubUsers from "./useFetchGithubUsers";

interface Args {
  lastElementRef: MutableRefObject<HTMLDivElement | null>;
}

const useInfiniteScroll = ({ lastElementRef }: Args) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFetchGithubUsers(1);

  const observerElem = useRef<IntersectionObserver | null>(null);

  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage]
  );

  const observer = useCallback(
    (node: HTMLDivElement) => {
      if (isFetchingNextPage) return;
      if (observerElem.current) observerElem.current.disconnect();

      observerElem.current = new IntersectionObserver(observerCallback);
      if (node) observerElem.current.observe(node);
    },
    [isFetchingNextPage, observerCallback]
  );

  useEffect(() => {
    const currentElement = lastElementRef.current;
    if (currentElement) observer(currentElement);

    return () => {
      if (observerElem.current && currentElement) {
        observerElem.current.unobserve(currentElement);
      }
    };
  }, [lastElementRef, observer]);

  return { data, isFetchingNextPage };
};

export default useInfiniteScroll;
