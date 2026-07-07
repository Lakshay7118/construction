import { listCities, listProjects } from "@/lib/data";
import CityCard from "@/components/CityCard";

export const metadata = { title: "Projects by City | Kalpataru Constructions" };

export default async function ProjectsPage() {
  const [cities, projects] = await Promise.all([listCities(), listProjects()]);
  return (
    <>
      <section className="bg-charcoal text-concrete blueprint-grid py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="font-mono text-xs tracking-[0.25em] text-safety mb-4">PROJECTS</div>
          <h1 className="font-display text-4xl sm:text-6xl max-w-3xl leading-[1.05]">
            Select a city to see what we&apos;ve built there.
          </h1>
          <p className="mt-5 max-w-xl text-concrete/70">
            Every site is filed under the city it was built in — completed and ongoing work included.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cities.map((city) => (
            <CityCard key={city.slug} city={city} projectCount={projects.filter((p) => p.citySlug === city.slug).length} />
          ))}
        </div>
      </section>
    </>
  );
}
