export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div className={align === "center" ? "text-center max-w-2xl mx-auto" : "max-w-2xl"}>
      <div
        className={`inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] mb-4 ${
          light ? "text-safety" : "text-safety-dim"
        }`}
      >
        <span className="w-6 h-px bg-current" />
        {eyebrow.toUpperCase()}
      </div>
      <h2 className={`font-display text-3xl sm:text-4xl md:text-5xl leading-[1.05] ${light ? "text-concrete" : "text-charcoal"}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base leading-relaxed ${light ? "text-concrete/70" : "text-charcoal/65"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
