import { listProjects } from "@/lib/data";
import Link from "next/link";

export const metadata = { title: "Gallery | Kalpataru Constructions" };

export default async function GalleryPage() {
  const projects = await listProjects();
  const allImages = projects.flatMap((p) =>
    p.gallery.map((g) => ({ ...g, project: p }))
  );

  return (
    <>
      <section className="bg-charcoal text-concrete blueprint-grid py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="font-mono text-xs tracking-[0.25em] text-safety mb-4">GALLERY</div>
          <h1 className="font-display text-4xl sm:text-6xl max-w-3xl leading-[1.05]">
            The sites, unfiltered.
          </h1>
          <p className="mt-5 max-w-xl text-concrete/70">
            Site documentation from across every city — pulled straight from project records.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {allImages.map((img, i) => (
            <Link
              key={i}
              href={`/projects/${img.project.citySlug}/${img.project.slug}`}
              className="group block break-inside-avoid relative overflow-hidden"
            >
              <img src={img.url} alt={img.caption} className="w-full transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <div>
                  <div className="text-concrete text-sm font-medium">{img.project.title}</div>
                  <div className="text-concrete/60 text-xs font-mono mt-0.5">{img.caption}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
