import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import RichText from "@/components/RichText";
import { getArticle } from "@/lib/content";

export const revalidate = 60;

function sectionTitle(category: string) {
  const titles: Record<string, string> = {
    projects: "Projects",
    research: "Research",
    "privacy-notes": "Privacy Notes",
    "learning-notes": "Learning Notes",
  };

  return titles[category] || "Articles";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  return {
    title: article?.title || "Article",
    description: article?.intro,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const article = await getArticle(slug);

  if (!article || article.category !== category) notFound();

  const date = article.publishedAt
    ? new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(article.publishedAt))
    : null;

  return (
    <>
      <div className="page-shell">
        <header className="page-header article-header">
          <Link className="text-link back-link" href={`/${category}`}>
            {sectionTitle(category)}
          </Link>

          <p className="eyebrow">{sectionTitle(category)}</p>
          <h1 className="page-heading">{article.title}</h1>

          {article.intro && <p className="page-intro">{article.intro}</p>}

          {date && <p className="article-date">{date}</p>}
        </header>
      </div>

      <RichText value={article.body} />

      <div className="page-shell article-footer">
        {article.tags && article.tags.length > 0 && (
          <ul className="tag-list" aria-label="Article topics">
            {article.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        )}

        {article.githubUrl && (
          <a
            className="text-link"
            href={article.githubUrl}
            target="_blank"
            rel="noreferrer"
          >
            View the project on GitHub
          </a>
        )}
      </div>
    </>
  );
}