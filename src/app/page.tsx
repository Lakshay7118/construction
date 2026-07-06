import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import { cities, services, projects, testimonials, awards } from "@/lib/data";
import CityCard from "@/components/CityCard";
import SectionHeading from "@/components/SectionHeading";

export default function Home() {
  const totalSqft = cities.reduce((sum, c) => sum + c.totalSqft, 0);
  const featured = projects.find((p) => p.slug === "skyline-towers")!;

  return (
    <>
      {/* HERO */}
      <section className="relative bg-charcoal text-concrete overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-[0.15]" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 pt-20 pb-24 sm:pt-28 sm:pb-32">
          <div className="font-mono text-xs tracking-[0.25em] text-safety mb-6">
            EST. 1994 — 32 YEARS ON SITE
          </div>
          <h1 className="font-display text-[13vw] sm:text-7xl md:text-8xl leading-[0.95] max-w-4xl">
            WE BUILD
            <br />
            <span className="text-outline" style={{ WebkitTextStrokeColor: "var(--concrete)" }}>
              WHAT LASTS.
            </span>
          </h1>
          <p className="mt-8 max-w-xl text-concrete/70 text-lg leading-relaxed">
            A city-by-city record of every residential tower, commercial park, and industrial site
            we&apos;ve delivered — documented, not just photographed.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 bg-safety text-concrete px-7 py-4 text-sm font-medium hover:bg-safety-dim transition-colors"
            >
              Explore Projects <ArrowUpRight size={16} />
            </Link>
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 border border-concrete/30 px-7 py-4 text-sm font-medium hover:border-concrete transition-colors"
            >
              Request a Quote
            </Link>
          </div>

          <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-8 border-t border-concrete/15 pt-8">
            <Stat value={`${totalSqft}L+`} label="Sq. Ft. Delivered" />
            <Stat value={`${cities.length}`} label="Active Cities" />
            <Stat value={`${projects.length}+`} label="Projects on Record" />
            <Stat value="90+" label="Lighthouse Score" />
          </div>
        </div>
      </section>

      {/* CITY-WISE GALLERY — signature feature */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-24">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <SectionHeading
            eyebrow="City-Wise Portfolio"
            title="Every site, filed by city."
            description="Our flagship feature: a living map of completed and ongoing work, organized the way our clients actually search for it."
          />
          <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm font-medium border-b border-charcoal pb-0.5 shrink-0">
            View all cities <ArrowUpRight size={15} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cities.map((city) => (
            <CityCard key={city.slug} city={city} />
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-charcoal/[0.03] py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="What We Build"
            title="Four disciplines, one crew."
            align="center"
          />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s, i) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group relative bg-charcoal text-concrete p-6 h-72 flex flex-col justify-between overflow-hidden"
              >
                <span className="font-mono text-xs text-concrete/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-2xl">{s.name}</h3>
                  <p className="mt-2 text-sm text-concrete/60 leading-relaxed">{s.tagline}</p>
                </div>
                <ArrowUpRight
                  className="absolute top-6 right-6 text-safety opacity-0 group-hover:opacity-100 transition-opacity"
                  size={18}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECT */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-24">
        <SectionHeading eyebrow="Featured Site" title="Skyline Towers, Mumbai" />
        <div className="mt-10 grid lg:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-[4/3] tick-corners overflow-hidden">
            <img src={featured.heroImage} alt={featured.title} className="h-full w-full object-cover" />
          </div>
          <div>
            <p className="text-charcoal/70 leading-relaxed text-lg">{featured.description}</p>
            <dl className="mt-8 grid grid-cols-2 gap-6 font-mono text-sm">
              <div>
                <dt className="text-charcoal/40 text-xs tracking-wider">SQ. FT.</dt>
                <dd className="text-xl mt-1">{featured.sqft.toLocaleString()}</dd>
              </div>
              <div>
                <dt className="text-charcoal/40 text-xs tracking-wider">UNITS</dt>
                <dd className="text-xl mt-1">{featured.units}</dd>
              </div>
              <div>
                <dt className="text-charcoal/40 text-xs tracking-wider">DELIVERED</dt>
                <dd className="text-xl mt-1">{featured.year}</dd>
              </div>
              <div>
                <dt className="text-charcoal/40 text-xs tracking-wider">STATUS</dt>
                <dd className="text-xl mt-1 capitalize">{featured.status}</dd>
              </div>
            </dl>
            <Link
              href={`/projects/${featured.citySlug}/${featured.slug}`}
              className="mt-8 inline-flex items-center gap-2 border-b border-charcoal pb-1 text-sm font-medium"
            >
              View full case study <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS + AWARDS */}
      <section className="bg-blueprint text-concrete blueprint-grid-fine py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading eyebrow="Trust" title="What clients verify, in their own words." light />
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="border border-concrete/15 p-6 bg-blueprint/40">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="fill-safety text-safety" />
                  ))}
                </div>
                <p className="text-concrete/85 leading-relaxed text-[15px]">&ldquo;{t.message}&rdquo;</p>
                <div className="mt-5 font-mono text-xs text-concrete/50">
                  {t.name.toUpperCase()} — {t.role}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 border-t border-concrete/15 pt-10">
            <h3 className="font-mono text-xs tracking-widest text-concrete/50 mb-6">RECOGNITION</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {awards.map((a) => (
                <div key={a.title}>
                  <div className="font-display text-2xl text-safety">{a.year}</div>
                  <div className="mt-1 text-sm text-concrete/85">{a.title}</div>
                  <div className="text-xs text-concrete/45 mt-0.5">{a.issuer}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-24 text-center">
        <h2 className="font-display text-4xl sm:text-5xl max-w-2xl mx-auto leading-[1.05]">
          Have a site in mind? Let&apos;s put it on the record.
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/quote" className="inline-flex items-center gap-2 bg-charcoal text-concrete px-7 py-4 text-sm font-medium hover:bg-safety transition-colors">
            Request a Quote <ArrowUpRight size={16} />
          </Link>
          <Link href="/contact" className="inline-flex items-center gap-2 border border-charcoal/30 px-7 py-4 text-sm font-medium hover:border-charcoal transition-colors">
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-3xl sm:text-4xl text-safety">{value}</div>
      <div className="mt-1 text-xs sm:text-sm text-concrete/60">{label}</div>
    </div>
  );
}
