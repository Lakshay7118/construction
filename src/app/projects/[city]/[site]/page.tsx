import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { projects, findProject, findCity, findProjectsByCity } from "@/lib/data";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";

export function generateStaticParams() {
  return projects.map((p) => ({ city: p.citySlug, site: p.slug }));
}

export default async function ProjectSitePage({
  params,
}: {
  params: Promise<{ city: string; site: string }>;
}) {
  const { city: citySlug, site } = await params;
  const [project, city, cityProjects] = await Promise.all([
    findProject(citySlug, site),
    findCity(citySlug),
    findProjectsByCity(citySlug),
  ]);
  if (!project || !city) notFound();

  const related = cityProjects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative bg-charcoal text-concrete overflow-hidden">
        <img src={project.heroImage} alt={project.title} className="absolute inset-0 h-full w-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-charcoal/30" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 py-24">
          <Link href={`/projects/${city.slug}`} className="inline-flex items-center gap-1.5 text-xs font-mono text-concrete/60 hover:text-safety mb-6">
            <MapPin size={13} /> {city.name.toUpperCase()}
          </Link>
          <div className="font-mono text-xs tracking-[0.25em] text-safety mb-3">
            {project.type.toUpperCase()} · {project.status === "ongoing" ? "IN PROGRESS" : `COMPLETED ${project.year}`}
          </div>
          <h1 className="font-display text-4xl sm:text-6xl max-w-3xl">{project.title}</h1>
          <p className="mt-5 max-w-2xl text-concrete/75 text-lg leading-relaxed">{project.description}</p>
        </div>
      </section>

      {/* SPEC SHEET */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-14 grid lg:grid-cols-4 gap-8 border-b border-charcoal/10">
        <SpecItem label="Built-up Area" value={`${project.sqft.toLocaleString()} sq.ft`} />
        {project.units && <SpecItem label="Units" value={String(project.units)} />}
        <SpecItem label="Client" value={project.client} />
        <SpecItem label="Year" value={project.year} />
      </section>

      {/* SCOPE + MATERIALS */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <SectionHeading eyebrow="Scope of Work" title="What we delivered" />
          <p className="mt-6 text-charcoal/70 leading-relaxed text-lg">{project.scopeOfWork}</p>
        </div>
        <div>
          <h3 className="font-mono text-xs tracking-widest text-safety-dim mb-4">MATERIALS USED</h3>
          <ul className="space-y-2.5">
            {project.materials.map((m) => (
              <li key={m} className="text-sm text-charcoal/75 border-b border-charcoal/10 pb-2.5">{m}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="bg-charcoal/[0.03] py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading eyebrow="Progress" title="Construction timeline" />
          <div className="mt-10 space-y-0">
            {project.timeline.map((t, i) => (
              <div key={t.phase} className="grid sm:grid-cols-[140px_1fr] gap-4 sm:gap-8 py-6 border-t border-charcoal/10">
                <div className="font-mono text-sm text-safety-dim">{t.date}</div>
                <div>
                  <h4 className="font-display text-xl">{t.phase}</h4>
                  <p className="mt-1.5 text-sm text-charcoal/65 leading-relaxed">{t.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER */}
      {project.beforeAfter && project.beforeAfter.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
          <SectionHeading eyebrow="Transformation" title="Before & after" />
          <div className="mt-10 grid gap-10">
            {project.beforeAfter.map((ba) => (
              <BeforeAfterSlider key={ba.label} beforeUrl={ba.beforeUrl} afterUrl={ba.afterUrl} label={ba.label} />
            ))}
          </div>
        </section>
      )}

      {/* GALLERY */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
        <SectionHeading eyebrow="Gallery" title="Site documentation" />
        <div className="mt-10 grid sm:grid-cols-2 gap-5">
          {project.gallery.map((g, i) => (
            <div key={i} className={`overflow-hidden ${i === 0 ? "sm:col-span-2 aspect-video" : "aspect-[4/3]"}`}>
              <img src={g.url} alt={g.caption} className="h-full w-full object-cover hover:scale-105 transition-transform duration-500" />
              <p className="mt-2 text-xs font-mono text-charcoal/50">{g.caption}</p>
            </div>
          ))}
        </div>
      </section>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="bg-charcoal/[0.03] py-16">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionHeading eyebrow={`More in ${city.name}`} title="Related projects" />
            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20 text-center">
        <h2 className="font-display text-3xl sm:text-4xl max-w-xl mx-auto">
          Considering a similar project?
        </h2>
        <Link href="/quote" className="mt-6 inline-flex items-center gap-2 bg-charcoal text-concrete px-7 py-4 text-sm font-medium hover:bg-safety transition-colors">
          Request a Quote <ArrowUpRight size={16} />
        </Link>
      </section>
    </>
  );
}

function SpecItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-xs tracking-wider text-charcoal/40">{label.toUpperCase()}</div>
      <div className="mt-1.5 font-display text-xl">{value}</div>
    </div>
  );
}
