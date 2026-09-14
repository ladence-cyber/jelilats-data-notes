import type { Metadata } from "next";
import Link from "next/link";
import { getJourneyPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Journey",
};

export const revalidate = 60;

export default async function JourneyPage() {
  const page = await getJourneyPage();

  if (!page) {
    return (
      <div className="page-shell">
        <header className="page-header">
          <p className="eyebrow">Journey</p>
          <h1 className="page-heading">Content is being prepared.</h1>
        </header>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <header className="page-header">
        {page.label && <p className="eyebrow">{page.label}</p>}
        <h1 className="page-heading">{page.heading}</h1>
        {page.intro && <p className="page-intro">{page.intro}</p>}
      </header>

      <section className="milestone-list">
        {(page.milestones || []).map((milestone) => (
          <article className="milestone" key={milestone._key}>
            <div className="milestone-date">{milestone.date}</div>

            <div>
              <h2>{milestone.title}</h2>
              {milestone.text && <p>{milestone.text}</p>}

              {milestone.article && (
                <Link
                  className="text-link"
                  href={`/${milestone.article.category}/${milestone.article.slug}`}
                >
                  {milestone.linkLabel || "Read the related article"}
                </Link>
              )}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}