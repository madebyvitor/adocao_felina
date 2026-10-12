import { HomePageContent } from "@/components/home-page";
import { getCats } from "@/lib/cats";

export default async function HomePage() {
  const cats = await getCats();
  return (
    <main>
      <HomePageContent cats={cats} />
    </main>
  );
}
