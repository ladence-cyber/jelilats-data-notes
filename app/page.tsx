import Link from "next/link";
import { getHomePage, type Article } from "@/lib/content";

export const revalidate = 60;

function articleHref(article: Article) {
  return `/${article.category}/${article.slug}`;
}

function displayCategory(category: string) {
  return category.replaceAll("-", " ");
}

function ArticleCard({
  article,
  linkLabel,
}: {
  article: Article;
  linkLabel?: string;
}) {
  return (
    <article className="article-card">
      <span className="category">{displayCategory(article.category)}</span>
      <h3>
        <Link href={articleHref(article)}>{article.title}</Link>
      </h3>
      {article.intro && <p>{article.intro}</p>}
      <Link className="text-link" href={articleHref(article)}>
        {linkLabel || "Read article"}
      </Link>
    </article>
  );
}

function HighlightedHeading({
  heading,
  emphasis,
}: {
  heading: string;
  emphasis?: string;
}) {
  if (!emphasis) return <>{heading}</>;

  const position = heading.toLowerCase().indexOf(emphasis.toLowerCase());

  if (position === -1) return <>{heading}</>;

  return (
    <>
      {heading.slice(0, position)}
      <em>{heading.slice(position, position + emphasis.length)}</em>
      {heading.slice(position + emphasis.length)}
    </>
  );
}

export default async function Home() {
  const page = await getHomePage();

  if (!page) {
    return (
      <div className="page-shell">
        <section className="hero">
          <p className="eyebrow">Jelilat’s Data Notes</p>
          <h1>Content is being prepared.</h1>
        </section>
      </div>
    );
  }

  const notes = page.featuredNotes || [];
  const projects = page.featuredProjects || [];

  return (
    <>
      <div className="page-shell">
        <section className="hero">
          {page.label && <p className="eyebrow">{page.label}</p>}

          <h1>
            <HighlightedHeading
              heading={page.heading}
              emphasis={page.emphasis}
            />
          </h1>

          {page.intro && <p className="hero-intro">{page.intro}</p>}

          <Link className="text-link" href="/journey">
            {page.journeyLinkLabel || "Follow the journey"}
          </Link>
        </section>

        {page.featureArticle && (
          <section className="section">
            <p className="eyebrow">
              {page.featureLabel || "Featured article"}
            </p>

            <article className="feature-card">
              <div>
                <p className="eyebrow">
                  {displayCategory(page.featureArticle.category)}
                </p>
                <h2>
                  <Link href={articleHref(page.featureArticle)}>
                    {page.featureArticle.title}
                  </Link>
                </h2>
              </div>

              <div>
                <p>{page.featureDetail || page.featureArticle.intro}</p>
                <Link
                  className="text-link"
                  href={articleHref(page.featureArticle)}
                >
                  {page.featureLinkLabel || "Read the article"}
                </Link>
              </div>
            </article>
          </section>
        )}

        {notes.length > 0 && (
          <section className="section">
            <h2 className="section-heading">
              {page.notesHeading || "From the notebook"}
            </h2>

            {page.notesCaption && (
              <p className="section-caption">{page.notesCaption}</p>
            )}

            <div className="card-grid">
              {notes.map((article) => (
                <ArticleCard
                  key={article._id}
                  article={article}
                  linkLabel={page.noteLinkLabel}
                />
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section className="section">
            <h2 className="section-heading">
              {page.projectsHeading || "Practical work"}
            </h2>

            <div className="card-grid">
              {projects.map((article) => (
                <ArticleCard key={article._id} article={article} />
              ))}
            </div>

            <Link className="text-link" href="/projects">
              {page.projectsLinkLabel || "See all projects"}
            </Link>
          </section>
        )}

        <section className="closing-panel">
          <div>
            {page.closingLabel && (
              <p className="eyebrow">{page.closingLabel}</p>
            )}
          </div>

          <div>
            {page.closingHeading && <h2>{page.closingHeading}</h2>}
            {page.closingText && <p>{page.closingText}</p>}

            <Link className="text-link" href="/about">
              {page.aboutLinkLabel || "More about Jelilat"}
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}