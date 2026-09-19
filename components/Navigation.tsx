"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/research", label: "Research" },
  { href: "/privacy-notes", label: "Privacy notes" },
  { href: "/learning-notes", label: "Learning notes" },
  { href: "/journey", label: "Journey" },
  { href: "/about", label: "About" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="navigation" aria-label="Main navigation">
      {links.map((link) => {
        const isActive =
          link.href === "/"
            ? pathname === "/"
            : pathname === link.href || pathname.startsWith(`${link.href}/`);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={isActive ? "active" : undefined}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}