import Link from "next/link";
import { blogs } from "@/lib/data";

export const metadata = { title: "Journal | Kalpataru Constructions" };

export default function BlogsPage() {
  return (
    <>
      <section className="bg-charcoal text-concrete blueprint-grid py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="font-mono text-xs tracking-[0.25em] text-safety mb-4">JOURNAL</div>
          <h1 className="font-display text-4xl sm:text-6xl max-w-3xl leading-[1.05]">
            Notes from the field.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {blogs.map((b) => (
            <Link key={b.slug} href={`/blogs/${b.slug}`} className="group block">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={b.coverImage} alt={b.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="mt-4 font-mono text-xs text-safety-dim tracking-wider">
                {b.category.toUpperCase()} · {new Date(b.date).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
              </div>
              <h2 className="mt-2 font-display text-2xl leading-tight">{b.title}</h2>
              <p className="mt-2 text-sm text-charcoal/60 leading-relaxed">{b.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
