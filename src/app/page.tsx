"use client";

import useFetchGithubUsers from "@/api/useFetchGithubUsers";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data } = useFetchGithubUsers();
  console.log({ data });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-black">
      <Button>Click me</Button>
    </main>
  );
}
