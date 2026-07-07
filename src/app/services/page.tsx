import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { listServices } from "@/lib/data";

export const metadata = { title: "Services | Kalpataru Constructions" };

export default async function ServicesPage() {
  const services = await listServices();
  return (
    <>
      <section className="bg-charcoal text-concrete blueprint-grid py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="font-mono text-xs tracking-[0.25em] text-safety mb-4">SERVICES</div>
          <h1 className="font-display text-4xl sm:text-6xl max-w-3xl leading-[1.05]">
            Four disciplines. One accountable crew.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20">
        <div className="space-y-5">
          {services.map((s, i) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group grid md:grid-cols-[120px_1fr_auto] items-center gap-6 border border-charcoal/10 hover:border-safety/50 p-6 md:p-8 transition-colors"
            >
              <span className="font-mono text-4xl text-charcoal/15 group-hover:text-safety/30 transition-colors">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="font-display text-2xl md:text-3xl">{s.name}</h2>
                <p className="mt-1.5 text-charcoal/60 text-sm md:text-base">{s.tagline}</p>
              </div>
              <ArrowUpRight className="hidden md:block text-safety opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
