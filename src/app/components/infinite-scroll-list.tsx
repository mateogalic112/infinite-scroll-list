"use client";

import useInfiniteScroll from "@/api/useInfiniteScroll";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Fragment, useRef } from "react";

const InfiniteScrollList = () => {
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  const { data: users = [], isFetchingNextPage } = useInfiniteScroll({
    lastElementRef,
  });

  console.log({ users });

  return (
    <div className="max-h-[300px] overflow-y-scroll">
      <ul className="max-w-[400px]">
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
      <div ref={lastElementRef}>
        {isFetchingNextPage && <p>Loading more...</p>}
      </div>
    </div>
  );
};

export default InfiniteScrollList;
