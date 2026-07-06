import Link from "next/link";
import type { Project } from "@/lib/data";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.citySlug}/${project.slug}`}
      className="group block bg-charcoal/[0.02] border border-charcoal/10 hover:border-safety/50 transition-colors"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={project.heroImage}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className={`absolute top-3 left-3 font-mono text-[10px] tracking-wider px-2 py-1 ${
            project.status === "ongoing" ? "bg-safety text-concrete" : "bg-charcoal/80 text-concrete"
          }`}
        >
          {project.status === "ongoing" ? "IN PROGRESS" : "COMPLETED " + project.year}
        </span>
      </div>
      <div className="p-5">
        <div className="font-mono text-[11px] text-safety-dim tracking-wider mb-1.5">
          {project.type.toUpperCase()}
        </div>
        <h3 className="font-display text-xl leading-tight">{project.title}</h3>
        <p className="mt-2 text-sm text-charcoal/60 line-clamp-2 leading-relaxed">{project.description}</p>
        <div className="mt-4 font-mono text-xs text-charcoal/45">
          {project.sqft.toLocaleString()} SQ.FT{project.units ? ` · ${project.units} UNITS` : ""}
        </div>
      </div>
    </Link>
  );
}
