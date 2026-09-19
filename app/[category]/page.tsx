import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticles, getSectionPage } from "@/lib/content";

export const revalidate = 60;




export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const section = await getSectionPage(category);

  return {
    title: section?.heading || "Articles",
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
const section = await getSectionPage(category);

if (!section) notFound();

const articles = await getArticles(category);

  return (
    <div className="page-shell">
      <header className="page-header">
        <p className="eyebrow">{section.label}</p>
        <h1 className="page-heading">{section.heading}</h1>
        <p className="page-intro">{section.intro}</p>
      </header>

      <section className="section">
        {articles.length > 0 ? (
          <div className="card-grid">
            {articles.map((article) => (
              <article className="article-card" key={article._id}>
                <span className="category">
                  {article.category.replaceAll("-", " ")}
                </span>

                <h3>
                  <Link href={`/${article.category}/${article.slug}`}>
                    {article.title}
                  </Link>
                </h3>

                {article.intro && <p>{article.intro}</p>}

                <Link
                  className="text-link"
                  href={`/${article.category}/${article.slug}`}
                >
                  {section.articleLinkLabel || "Read article"}
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <p className="section-caption">
            This part of the notebook is waiting for its first entry.
          </p>
        )}
      </section>
    </div>
  );
}