import InfiniteScrollList from "./components/infinite-scroll-list";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-12">
      <h1 className="text-2xl mb-4 uppercase">Github users</h1>

      <InfiniteScrollList />
    </main>
  );
}
