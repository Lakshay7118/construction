import Link from "next/link";
import type { City } from "@/lib/data";
import { getProjectsByCity } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

export default function CityCard({ city, projectCount }: { city: City; projectCount?: number }) {
  const count = projectCount ?? getProjectsByCity(city.slug).length;

  return (
    <Link
      href={`/projects/${city.slug}`}
      className="group relative block h-[420px] overflow-hidden bg-charcoal tick-corners"
    >
      <img
        src={city.coverImage}
        alt={`${city.name} skyline`}
        className="absolute inset-0 h-full w-full object-cover opacity-70 grayscale-[30%] transition-all duration-700 group-hover:scale-105 group-hover:opacity-90 group-hover:grayscale-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />

      <div className="absolute top-5 left-5 font-mono text-[11px] text-concrete/70 tracking-wider">
        {city.state.toUpperCase()}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="flex items-end justify-between">
          <div>
            <h3 className="font-display text-3xl text-concrete">{city.name}</h3>
            <p className="mt-2 text-sm text-concrete/70 max-w-[26ch] leading-relaxed">
              {city.description}
            </p>
          </div>
          <ArrowUpRight className="text-safety shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" size={22} />
        </div>
        <div className="mt-4 flex gap-5 font-mono text-xs text-concrete/60 border-t border-concrete/15 pt-3">
          <span>{count} PROJECT{count !== 1 ? "S" : ""}</span>
          <span>{city.totalSqft}L SQ.FT BUILT</span>
        </div>
      </div>
    </Link>
  );
}
