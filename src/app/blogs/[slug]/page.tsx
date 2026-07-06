import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { blogs, getBlog } from "@/lib/data";

export function generateStaticParams() {
  return blogs.map((b) => ({ slug: b.slug }));
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = getBlog(slug);
  if (!blog) notFound();

  return (
    <article>
      <section className="relative bg-charcoal text-concrete overflow-hidden">
        <img src={blog.coverImage} alt={blog.title} className="absolute inset-0 h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/40" />
        <div className="relative mx-auto max-w-3xl px-5 sm:px-8 py-24">
          <Link href="/blogs" className="inline-flex items-center gap-1.5 text-xs font-mono text-concrete/60 hover:text-safety mb-6">
            <ArrowLeft size={13} /> JOURNAL
          </Link>
          <div className="font-mono text-xs tracking-[0.25em] text-safety mb-4">
            {blog.category.toUpperCase()} · {new Date(blog.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
          </div>
          <h1 className="font-display text-3xl sm:text-5xl leading-tight">{blog.title}</h1>
          <p className="mt-4 text-concrete/60 text-sm font-mono">BY {blog.author.toUpperCase()}</p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-5 sm:px-8 py-16 space-y-6">
        {blog.content.map((para, i) => (
          <p key={i} className="text-charcoal/80 leading-relaxed text-lg">
            {para}
          </p>
        ))}
      </div>
    </article>
  );
}
