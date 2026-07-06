import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { services, projects, getService } from "@/lib/data";
import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const relatedProjects = projects.filter((p) => p.type === service.name).slice(0, 3);

  return (
    <>
      <section className="relative bg-charcoal text-concrete overflow-hidden">
        <img src={service.image} alt={service.name} className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/40" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 py-24">
          <div className="font-mono text-xs tracking-[0.25em] text-safety mb-4">SERVICE</div>
          <h1 className="font-display text-5xl sm:text-7xl">{service.name}</h1>
          <p className="mt-4 max-w-xl text-concrete/75 text-lg">{service.tagline}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <SectionHeading eyebrow="Overview" title="What this covers" />
          <p className="mt-6 text-charcoal/70 leading-relaxed text-lg">{service.description}</p>
        </div>
        <div>
          <h3 className="font-mono text-xs tracking-widest text-safety-dim mb-4">CAPABILITIES</h3>
          <ul className="space-y-3">
            {service.capabilities.map((c) => (
              <li key={c} className="flex gap-3 text-charcoal/75 text-sm">
                <Check size={16} className="text-safety shrink-0 mt-0.5" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {relatedProjects.length > 0 && (
        <section className="bg-charcoal/[0.03] py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
              <SectionHeading eyebrow="On Record" title={`Recent ${service.name.toLowerCase()} sites`} />
              <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm font-medium border-b border-charcoal pb-0.5">
                View all projects <ArrowUpRight size={15} />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedProjects.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20 text-center">
        <h2 className="font-display text-3xl sm:text-4xl">Have a {service.name.toLowerCase()} project in mind?</h2>
        <Link href="/quote" className="mt-6 inline-flex items-center gap-2 bg-charcoal text-concrete px-7 py-4 text-sm font-medium hover:bg-safety transition-colors">
          Request a Quote <ArrowUpRight size={16} />
        </Link>
      </section>
    </>
  );
}
