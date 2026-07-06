"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blogs", label: "Journal" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-concrete/95 backdrop-blur border-b border-charcoal/15">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex h-18 items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2.5 shrink-0" onClick={() => setOpen(false)}>
            <span className="flex h-9 w-9 items-center justify-center border-2 border-charcoal font-mono text-xs font-medium">
              KC
            </span>
            <span className="font-display text-lg tracking-tight leading-none">
              KALPATARU
              <span className="block text-[10px] font-body font-medium tracking-[0.25em] text-safety">
                CONSTRUCTIONS
              </span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {links.map((link) => {
              const active = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 text-sm font-medium transition-colors relative ${
                    active ? "text-safety" : "text-charcoal/80 hover:text-charcoal"
                  }`}
                >
                  {link.label}
                  {active && <span className="absolute left-3.5 right-3.5 -bottom-0.5 h-0.5 bg-safety" />}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 bg-charcoal text-concrete px-5 py-2.5 text-sm font-medium hover:bg-safety transition-colors"
            >
              Request a Quote
            </Link>
          </div>

          <button
            className="lg:hidden p-2 -mr-2"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-charcoal/15 bg-concrete px-5 py-4 flex flex-col gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-2.5 text-base font-medium text-charcoal/90"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/quote"
            className="mt-2 inline-flex items-center justify-center gap-2 bg-charcoal text-concrete px-5 py-3 text-sm font-medium"
            onClick={() => setOpen(false)}
          >
            Request a Quote
          </Link>
        </nav>
      )}
    </header>
  );
}
