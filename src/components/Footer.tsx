import Link from "next/link";
import { cities } from "@/lib/data";
import { MapPin, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-blueprint text-concrete blueprint-grid-fine">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="col-span-2">
            <span className="font-display text-xl">KALPATARU</span>
            <span className="block text-[10px] font-medium tracking-[0.25em] text-safety mb-4">
              CONSTRUCTIONS
            </span>
            <p className="text-sm text-concrete/70 max-w-xs leading-relaxed">
              A record of what we&apos;ve built — city by city, site by site — for clients who want to
              verify quality before they sign.
            </p>
            <div className="mt-6 space-y-2 text-sm text-concrete/80">
              <div className="flex items-center gap-2">
                <MapPin size={15} className="text-safety shrink-0" />
                <span>Corporate Office, Bandra Kurla Complex, Mumbai</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={15} className="text-safety shrink-0" />
                <span>+91 22 4000 1234</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={15} className="text-safety shrink-0" />
                <span>projects@kalpataruconstructions.in</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-xs tracking-widest text-concrete/50 mb-4">SITEMAP</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/about" className="hover:text-safety">About</Link></li>
              <li><Link href="/services" className="hover:text-safety">Services</Link></li>
              <li><Link href="/projects" className="hover:text-safety">Projects</Link></li>
              <li><Link href="/gallery" className="hover:text-safety">Gallery</Link></li>
              <li><Link href="/blogs" className="hover:text-safety">Journal</Link></li>
              <li><Link href="/careers" className="hover:text-safety">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs tracking-widest text-concrete/50 mb-4">CITIES</h4>
            <ul className="space-y-2.5 text-sm">
              {cities.map((c) => (
                <li key={c.slug}>
                  <Link href={`/projects/${c.slug}`} className="hover:text-safety">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs tracking-widest text-concrete/50 mb-4">GET IN TOUCH</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/contact" className="hover:text-safety">Contact us</Link></li>
              <li><Link href="/quote" className="hover:text-safety">Request a quote</Link></li>
              <li><Link href="/careers" className="hover:text-safety">Open positions</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-concrete/15 flex flex-col sm:flex-row justify-between gap-3 text-xs text-concrete/50 font-mono">
          <span>© {new Date().getFullYear()} KALPATARU CONSTRUCTIONS PVT. LTD.</span>
          <span>REG. NO. CIN-U45201MH — ALL SITES ISO 45001 CERTIFIED</span>
        </div>
      </div>
    </footer>
  );
}
