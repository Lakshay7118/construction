"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import ProjectCard from "@/components/ProjectCard";
import type { Project, ProjectType } from "@/lib/data";

type ProjectTypeFilterProps = {
  projects: Project[];
};

const allFilter = "All";

export default function ProjectTypeFilter({ projects }: ProjectTypeFilterProps) {
  const [activeType, setActiveType] = useState<ProjectType | typeof allFilter>(allFilter);

  const types = useMemo(
    () => Array.from(new Set(projects.map((project) => project.type))).sort(),
    [projects],
  );

  const filteredProjects = useMemo(
    () =>
      activeType === allFilter
        ? projects
        : projects.filter((project) => project.type === activeType),
    [activeType, projects],
  );

  return (
    <>
      {types.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-10">
          <FilterButton active={activeType === allFilter} onClick={() => setActiveType(allFilter)}>
            ALL
          </FilterButton>
          {types.map((type) => (
            <FilterButton key={type} active={activeType === type} onClick={() => setActiveType(type)}>
              {type.toUpperCase()}
            </FilterButton>
          ))}
        </div>
      )}

      {filteredProjects.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <div className="border border-charcoal/10 bg-charcoal/[0.02] px-5 py-8 text-sm text-charcoal/60">
          No projects found for this filter.
        </div>
      )}
    </>
  );
}

function FilterButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`px-4 py-2 text-xs font-mono tracking-wider transition-colors ${
        active
          ? "bg-charcoal text-concrete"
          : "border border-charcoal/20 text-charcoal/60 hover:border-safety/60 hover:text-charcoal"
      }`}
    >
      {children}
    </button>
  );
}
