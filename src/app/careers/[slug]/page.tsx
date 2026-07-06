import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import { careers, getCareer } from "@/lib/data";
import JobApplicationForm from "@/components/JobApplicationForm";

export function generateStaticParams() {
  return careers.map((c) => ({ slug: c.slug }));
}

export default async function CareerDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = getCareer(slug);
  if (!job) notFound();

  return (
    <section className="mx-auto max-w-4xl px-5 sm:px-8 py-16">
      <Link href="/careers" className="inline-flex items-center gap-1.5 text-xs font-mono text-charcoal/50 hover:text-safety mb-8">
        <ArrowLeft size={13} /> ALL POSITIONS
      </Link>

      <div className="font-mono text-xs tracking-wider text-safety-dim mb-3">{job.type.toUpperCase()}</div>
      <h1 className="font-display text-4xl sm:text-5xl">{job.title}</h1>
      <div className="mt-3 flex items-center gap-1.5 text-charcoal/60">
        <MapPin size={15} /> {job.location}
      </div>

      <p className="mt-8 text-lg text-charcoal/75 leading-relaxed">{job.description}</p>

      <h3 className="mt-10 font-mono text-xs tracking-widest text-charcoal/50">RESPONSIBILITIES</h3>
      <ul className="mt-4 space-y-2.5">
        {job.responsibilities.map((r) => (
          <li key={r} className="flex gap-3 text-charcoal/75 text-sm">
            <span className="text-safety shrink-0">—</span>
            {r}
          </li>
        ))}
      </ul>

      <div className="mt-14 border-t border-charcoal/10 pt-10">
        <h3 className="font-display text-2xl mb-6">Apply for this position</h3>
        <JobApplicationForm />
      </div>
    </section>
  );
}
