import InquiryForm from "@/components/InquiryForm";

export const metadata = { title: "Request a Quote | Kalpataru Constructions" };

export default function QuotePage() {
  return (
    <>
      <section className="bg-charcoal text-concrete blueprint-grid py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="font-mono text-xs tracking-[0.25em] text-safety mb-4">REQUEST A QUOTE</div>
          <h1 className="font-display text-4xl sm:text-6xl max-w-3xl leading-[1.05]">
            Tell us about the site. We&apos;ll take it from there.
          </h1>
          <p className="mt-5 max-w-xl text-concrete/70">
            Share a few details and our team will respond within one business day with a preliminary
            quote and next steps.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-5 sm:px-8 py-16">
        <InquiryForm variant="quote" />
      </section>
    </>
  );
}
