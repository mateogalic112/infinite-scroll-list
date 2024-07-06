import { GithubUser } from "@/models/GithubUser";
import { useInfiniteQuery } from "@tanstack/react-query";

const fetchGithubUsers = async ({ page }: { page: number }) => {
  const PER_PAGE = 12;

  const url = new URL("https://api.github.com/users");

  const params = new URLSearchParams({
    page: `${page}`,
    per_page: `${PER_PAGE}`,
  });
  url.search = params.toString();

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const result = await response.json();

  const hasNextPage = result.length === PER_PAGE;

  return {
    data: result as GithubUser[],
    nextPage: hasNextPage ? page + 1 : null,
  };
};

const useFetchGithubUsers = (page: number = 1) => {
  const queryKey = ["users", page];

  return useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => fetchGithubUsers({ page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    select: ({ pages }) => pages.flatMap((page) => page.data),
  });
};

export default useFetchGithubUsers;
