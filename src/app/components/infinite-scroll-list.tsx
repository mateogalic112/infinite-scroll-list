"use client";

import useInfiniteScroll from "@/api/useInfiniteScroll";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LoadingSpinner } from "@/icons/LoadingSpinner";
import { Fragment, useRef } from "react";

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
            <li className="flex items-center gap-4 p-2 w-full">
              <Avatar>
                <AvatarImage src={user.avatar_url} alt={user.login} />
                <AvatarFallback>{user.login[0]}</AvatarFallback>
              </Avatar>

              <div>
                <h4>{user.login}</h4>
                <Badge>{user.type}</Badge>
              </div>

              <Button
                variant="outline"
                className="ml-auto p-2 h-auto leading-none"
              >
                Learn more
              </Button>
            </li>
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
