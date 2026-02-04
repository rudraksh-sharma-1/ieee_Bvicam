import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getChapterBySlug, getAllChapterSlugs } from "@/lib/chapter-details";
import ChapterHero from "@/components/chapters/ChapterHero";
import ChapterStats from "@/components/chapters/ChapterStats";
import ChapterTeam from "@/components/chapters/ChapterTeam";
import ChapterPastEvents from "@/components/chapters/ChapterPastEvents";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export async function generateStaticParams() {
  const slugs = getAllChapterSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const chapter = getChapterBySlug(slug);

  if (!chapter) {
    return {
      title: "Chapter Not Found | IEEE BVICAM",
    };
  }

  return {
    title: chapter.metadata.title,
    description: chapter.metadata.description,
    openGraph: {
      title: chapter.metadata.title,
      description: chapter.metadata.description,
      type: "website",
    },
  };
}

export default async function ChapterPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const chapter = getChapterBySlug(slug);

  if (!chapter) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-zinc-950 pt-18">

      <Navbar/>
      
      {/* Section 1 & 2: Hero with Name, Logo, and Description */}
      <ChapterHero
        name={chapter.name}
        logo={chapter.logo}
        description={chapter.longDescription}
      />

      {/* Section 3: Stats and Insights */}
      <ChapterStats stats={chapter.stats} />

      {/* Section 4: Chapter Team */}
      <ChapterTeam team={chapter.team} chapterName={chapter.name} />

      {/* Section 5: Past Events (Temporary Design) */}
      <ChapterPastEvents events={chapter.pastEvents} />

      <Footer/>
    </main>
  );
}