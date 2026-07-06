import SectionHeading from "@/components/SectionHeading";
import { awards } from "@/lib/data";

const goals = [
  "Improve brand recognition and industry standing",
  "Increase conversion from qualified inquiries",
  "Streamline how prospective clients discover projects",
  "Reduce dependency on printed brochures",
  "Showcase expertise through documented, verifiable work",
];

const personas = [
  {
    title: "Homeowner",
    goal: "Find a reliable construction company and request a quotation.",
    solution: "Interactive project galleries, testimonials, and transparent project documentation.",
  },
  {
    title: "Architect",
    goal: "Review previous projects before proposing a collaboration.",
    solution: "City-wise categorized portfolio with technical specifications and material breakdowns.",
  },
  {
    title: "Corporate Client",
    goal: "Evaluate our capability to deliver large-scale developments.",
    solution: "Dedicated project pages, certifications, awards, and delivery statistics.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-charcoal text-concrete blueprint-grid py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="font-mono text-xs tracking-[0.25em] text-safety mb-4">ABOUT US</div>
          <h1 className="font-display text-4xl sm:text-6xl max-w-3xl leading-[1.05]">
            India&apos;s most documented construction practice.
          </h1>
          <p className="mt-6 max-w-2xl text-concrete/70 text-lg leading-relaxed">
            Not a traditional corporate site — an immersive record of what we&apos;ve actually built,
            organized so it can be verified rather than just admired.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20 grid lg:grid-cols-2 gap-16">
        <div>
          <SectionHeading eyebrow="Vision" title="Why we exist" />
          <p className="mt-6 text-charcoal/70 leading-relaxed">
            To create India&apos;s most visually engaging construction company website — combining
            cutting-edge presentation with an intuitive content system — delivering a memorable
            experience for prospective clients, partners, investors, and stakeholders.
          </p>
          <p className="mt-4 text-charcoal/70 leading-relaxed">
            Most construction companies rely on printed brochures and static galleries that fail to
            communicate the actual quality of the work. We built our digital presence around a
            simple idea: if a project is good, it should be verifiable — city by city, site by site.
          </p>
        </div>
        <div>
          <SectionHeading eyebrow="What We're Solving" title="The problems we set out to fix" />
          <ul className="mt-6 space-y-3">
            {goals.map((g) => (
              <li key={g} className="flex gap-3 text-charcoal/75 leading-relaxed">
                <span className="font-mono text-safety shrink-0">—</span>
                {g}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-charcoal/[0.03] py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading eyebrow="Who We Serve" title="Built for three kinds of visitors" align="center" />
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {personas.map((p) => (
              <div key={p.title} className="bg-concrete border border-charcoal/10 p-7">
                <h3 className="font-display text-2xl">{p.title}</h3>
                <div className="mt-4 text-xs font-mono tracking-wider text-safety-dim">GOAL</div>
                <p className="mt-1 text-sm text-charcoal/70 leading-relaxed">{p.goal}</p>
                <div className="mt-4 text-xs font-mono tracking-wider text-safety-dim">OUR SOLUTION</div>
                <p className="mt-1 text-sm text-charcoal/70 leading-relaxed">{p.solution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20">
        <SectionHeading eyebrow="Recognition" title="Awards & certifications" />
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {awards.map((a) => (
            <div key={a.title} className="border-l-2 border-safety pl-4">
              <div className="font-display text-3xl">{a.year}</div>
              <div className="mt-1 text-sm text-charcoal/80">{a.title}</div>
              <div className="text-xs text-charcoal/45 mt-0.5">{a.issuer}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
