import { sanityClient } from "./sanity";

export type Article = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  intro?: string;
  body?: unknown[];
  publishedAt?: string;
  githubUrl?: string;
  tags?: string[];
};

export type HomePage = {
  label?: string;
  heading: string;
  emphasis?: string;
  intro?: string;
  journeyLinkLabel?: string;
  featureLabel?: string;
  featureDetail?: string;
  featureLinkLabel?: string;
  notesHeading?: string;
  notesCaption?: string;
  noteLinkLabel?: string;
  projectsHeading?: string;
  projectsLinkLabel?: string;
  closingLabel?: string;
  closingHeading?: string;
  closingText?: string;
  aboutLinkLabel?: string;
  featureArticle?: Article;
  featuredNotes?: Article[];
  featuredProjects?: Article[];
  projectOrder?: Article[];
};


export type AboutPage = {
  label?: string;
  heading: string;
  intro?: string;
  body?: unknown[];
};

export type JourneyMilestone = {
  _key: string;
  date?: string;
  title: string;
  text?: string;
  linkLabel?: string;
  article?: Article;
};

export type JourneyPage = {
  label?: string;
  heading: string;
  intro?: string;
  milestones?: JourneyMilestone[];
};

const articleFields = `
  _id,
  title,
  "slug": slug.current,
  category,
  intro,
  body,
  publishedAt,
  githubUrl,
  tags
`;

export async function getHomePage() {
  return sanityClient.fetch<HomePage | null>(`
    *[_type == "homePage" && _id == "homePage"][0] {
      label,
      heading,
      emphasis,
      intro,
      journeyLinkLabel,
      featureLabel,
      featureDetail,
      featureLinkLabel,
      notesHeading,
      notesCaption,
      noteLinkLabel,
      projectsHeading,
      projectsLinkLabel,
      closingLabel,
      closingHeading,
      closingText,
      aboutLinkLabel,
      featureArticle->{${articleFields}},
      featuredNotes[]->{${articleFields}},
      featuredProjects[]->{${articleFields}}
    }
  `);
}

export async function getAboutPage() {
  return sanityClient.fetch<AboutPage | null>(`
    *[_type == "aboutPage" && _id == "aboutPage"][0] {
      label,
      heading,
      intro,
      body
    }
  `);
}

export async function getJourneyPage() {
  return sanityClient.fetch<JourneyPage | null>(`
    *[_type == "journeyPage" && _id == "journeyPage"][0] {
      label,
      heading,
      intro,
      milestones[] {
        _key,
        date,
        title,
        text,
        linkLabel,
        article->{${articleFields}}
      }
    }
  `);
}

export async function getArticles(category?: string) {
  if (category === "projects") {
    const orderedProjects = await sanityClient.fetch<Article[] | null>(`
      *[_type == "homePage" && _id == "homePage"][0].projectOrder[]->{
        ${articleFields}
      }
    `);

    if (orderedProjects && orderedProjects.length > 0) {
      return orderedProjects;
    }
  }

  return sanityClient.fetch<Article[]>(
    `*[
      _type == "article" &&
      defined(slug.current) &&
      ($category == "" || category == $category)
    ] | order(publishedAt desc) {
      ${articleFields}
    }`,
    { category: category ?? "" }
  );
}

export async function getArticle(slug: string) {
  return sanityClient.fetch<Article | null>(
    `*[_type == "article" && slug.current == $slug][0] {
      ${articleFields}
    }`,
    { slug }
  );
}