import type { Metadata } from "next";
import RichText from "@/components/RichText";
import { getAboutPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
};

export const revalidate = 60;

export default async function AboutPage() {
  const page = await getAboutPage();

  if (!page) {
    return (
      <div className="page-shell">
        <header className="page-header">
          <p className="eyebrow">About</p>
          <h1 className="page-heading">Content is being prepared.</h1>
        </header>
      </div>
    );
  }

  return (
    <>
      <div className="page-shell">
        <header className="page-header">
          {page.label && <p className="eyebrow">{page.label}</p>}
          <h1 className="page-heading">{page.heading}</h1>
          {page.intro && <p className="page-intro">{page.intro}</p>}
        </header>
      </div>

      <RichText value={page.body} />
    </>
  );
}