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
      "Content-Type": "application/json",
      Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const result = await response.json();
  const users = result as GithubUser[];

  const hasNextPage = result.length === PER_PAGE;

  return {
    data: users,
    nextPage: hasNextPage ? users[users.length - 1].id : null,
  };
};

const useFetchGithubUsers = (cursor: number) => {
  const queryKey = ["users", cursor];

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
