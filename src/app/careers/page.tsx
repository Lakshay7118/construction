import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { listCareers } from "@/lib/data";

export const metadata = { title: "Careers | Kalpataru Constructions" };

export default async function CareersPage() {
  const careers = await listCareers();
  return (
    <>
      <section className="bg-charcoal text-concrete blueprint-grid py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="font-mono text-xs tracking-[0.25em] text-safety mb-4">CAREERS</div>
          <h1 className="font-display text-4xl sm:text-6xl max-w-3xl leading-[1.05]">
            Build something you can point to.
          </h1>
          <p className="mt-5 max-w-xl text-concrete/70">
            Open positions across our active sites — from engineering to project management.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
        <div className="space-y-4">
          {careers.map((job) => (
            <Link
              key={job.slug}
              href={`/careers/${job.slug}`}
              className="group flex flex-wrap items-center justify-between gap-4 border border-charcoal/10 hover:border-safety/50 p-6 transition-colors"
            >
              <div>
                <h2 className="font-display text-2xl">{job.title}</h2>
                <div className="mt-1.5 flex items-center gap-4 text-sm text-charcoal/60">
                  <span className="flex items-center gap-1.5"><MapPin size={14} /> {job.location}</span>
                  <span className="font-mono text-xs">{job.type.toUpperCase()}</span>
                </div>
              </div>
              <ArrowUpRight className="text-safety opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
