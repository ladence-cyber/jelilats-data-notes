import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Jelilat’s Data Notes",
    template: "%s | Jelilat’s Data Notes",
  },
  description:
    "Notes on data protection, security and the process of learning both.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <Link className="brand" href="/">
            <span className="brand-name">JELILAT</span>
            <span className="brand-description">
              Notes on data protection, security and the process of learning
              both.
            </span>
          </Link>

         <Navigation />
        </header>

        <main>{children}</main>

        <footer className="site-footer">
  <div className="footer-identity">
    <p>Jelilat’s Data Notes</p>
    <p>Learning in public, at my own pace.</p>
  </div>

  <nav className="footer-links" aria-label="Footer navigation">
  <Link href="/about">About</Link>
</nav>
</footer>
      </body>
    </html>
  );
}