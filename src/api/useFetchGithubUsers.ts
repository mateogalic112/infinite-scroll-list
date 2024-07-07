import { GithubUser } from "@/models/GithubUser";
import { useInfiniteQuery } from "@tanstack/react-query";

const fetchGithubUsers = async (cursor: number) => {
  const PER_PAGE = 12;

  const url = new URL("https://api.github.com/users");

  const params = new URLSearchParams({
    since: `${cursor}`,
    per_page: `${PER_PAGE}`,
  });
  url.search = params.toString();

  const response = await fetch(url, {
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const users = (await response.json()) as GithubUser[];

  const hasNextPage = users.length === PER_PAGE;
  // Use last user id as next page cursor
  const nextPage = hasNextPage ? users[users.length - 1].id : null;

  return {
    data: users,
    nextPage,
  };
};

const useFetchGithubUsers = () => {
  const queryKey = ["github-users"];

  return useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => fetchGithubUsers(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    select: ({ pages }) => pages.flatMap((page) => page.data),
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

export default useFetchGithubUsers;
