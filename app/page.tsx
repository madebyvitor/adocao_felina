import { Suspense } from "react";
import { HomePageContent } from "@/components/home-page";
import { getCats } from "@/lib/cats";

export default function HomePage() {
  return (
    <main>
      <Suspense fallback={<HomePageFallback />}>
        <HomeCatalog />
      </Suspense>
    </main>
  );
}

async function HomeCatalog() {
  const cats = await getCats();
  return <HomePageContent cats={cats} />;
}

function HomePageFallback() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 pt-12 pb-16 sm:pt-16">
      <div className="h-16 w-72 animate-pulse rounded-2xl bg-line" />
      <div className="mt-6 h-6 w-full max-w-md animate-pulse rounded-full bg-line" />
      <div className="mt-16 h-10 w-64 animate-pulse rounded-2xl bg-line" />
    </div>
  );
}
