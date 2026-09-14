import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticles } from "@/lib/content";

export const revalidate = 60;

const sections = {
  projects: {
    title: "Projects",
    label: "Practical work",
    intro:
      "Projects through which I am building practical security knowledge and learning how technical decisions hold up outside a textbook.",
  },
  research: {
    title: "Research",
    label: "Long-form work",
    intro:
      "Research shaped by my studies in personal data security, regulation and the questions that continue to follow me.",
  },
  "privacy-notes": {
    title: "Privacy Notes",
    label: "Data protection",
    intro:
      "Notes on GDPR and personal data protection, written as I revisit familiar ideas and encounter new ones.",
  },
  "learning-notes": {
    title: "Learning Notes",
    label: "The notebook",
    intro:
      "Working notes from courses, experiments and concepts I am still learning to understand properly.",
  },
} as const;

type SectionName = keyof typeof sections;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const section = sections[category as SectionName];

  return {
    title: section?.title || "Articles",
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const section = sections[category as SectionName];

  if (!section) notFound();

  const articles = await getArticles(category);

  return (
    <div className="page-shell">
      <header className="page-header">
        <p className="eyebrow">{section.label}</p>
        <h1 className="page-heading">{section.title}</h1>
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
                  Read article
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