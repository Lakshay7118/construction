import { notFound } from "next/navigation";
import { cities, getCity, getProjectsByCity } from "@/lib/data";
import ProjectCard from "@/components/ProjectCard";

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export default async function CityDetailPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: citySlug } = await params;
  const city = getCity(citySlug);
  if (!city) notFound();

  const cityProjects = getProjectsByCity(citySlug);
  const types = Array.from(new Set(cityProjects.map((p) => p.type)));

  return (
    <>
      <section className="relative bg-charcoal text-concrete overflow-hidden">
        <img src={city.coverImage} alt={city.name} className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/40" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 py-24">
          <div className="font-mono text-xs tracking-[0.25em] text-safety mb-4">{city.state.toUpperCase()}</div>
          <h1 className="font-display text-5xl sm:text-7xl">{city.name}</h1>
          <p className="mt-5 max-w-xl text-concrete/75 text-lg leading-relaxed">{city.description}</p>
          <div className="mt-8 flex gap-8 font-mono text-sm text-concrete/60 border-t border-concrete/15 pt-5">
            <span>{cityProjects.length} PROJECT{cityProjects.length !== 1 ? "S" : ""} ON RECORD</span>
            <span>{city.totalSqft}L SQ.FT BUILT</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
        {types.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-10">
            <span className="px-4 py-2 text-xs font-mono tracking-wider bg-charcoal text-concrete">ALL</span>
            {types.map((t) => (
              <span key={t} className="px-4 py-2 text-xs font-mono tracking-wider border border-charcoal/20 text-charcoal/60">
                {t.toUpperCase()}
              </span>
            ))}
          </div>
        )}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cityProjects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>
    </>
  );
}
