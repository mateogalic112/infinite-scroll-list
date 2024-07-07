"use client";

import useInfiniteScroll from "@/api/useInfiniteScroll";
import { Separator } from "@/components/ui/separator";
import { LoadingSpinner } from "@/icons/LoadingSpinner";
import { Fragment, useRef } from "react";
import ListItem from "./list-item";

const InfiniteScrollList = () => {
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  const { data: users = [], isFetchingNextPage } = useInfiniteScroll({
    lastElementRef,
  });

  return (
    <div className="max-w-[400px] max-h-[360px] overflow-y-scroll pr-4">
      <ul>
        {users.map((user) => (
          <Fragment key={user.id}>
            <ListItem user={user} />
            <Separator />
          </Fragment>
        ))}
      </ul>
      <div
        className="flex items-center justify-center p-4"
        ref={lastElementRef}
      >
        {isFetchingNextPage && <LoadingSpinner />}
      </div>
    </div>
  );
};

export default InfiniteScrollList;
