"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { apiFetch } from "@/lib/api";

export default function InquiryForm({
  variant,
}: {
  variant: "contact" | "quote";
}) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      projectType: variant === "quote" ? String(form.get("projectType") ?? "") : "General enquiry",
      city: variant === "quote" ? String(form.get("city") ?? "") : "Not specified",
      budget: String(form.get("budget") ?? "—"),
      message: String(form.get("message") ?? ""),
      source: variant === "quote" ? "Quote Form" : "Contact Form",
    };

    try {
      await apiFetch("/inquiries", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send your message right now.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="border border-charcoal/15 p-8 text-center bg-charcoal/[0.02]">
        <CheckCircle2 className="mx-auto text-safety mb-4" size={36} />
        <h3 className="font-display text-2xl">Received.</h3>
        <p className="mt-2 text-charcoal/65 text-sm max-w-sm mx-auto">
          {variant === "quote"
            ? "Our team will review your project details and respond within one business day with a preliminary quote."
            : "Thanks for reaching out — our team will get back to you shortly."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Full name" name="name" required />
        <Field label="Phone number" name="phone" type="tel" required />
      </div>
      <Field label="Email address" name="email" type="email" required />

      {variant === "quote" && (
        <>
          <div className="grid sm:grid-cols-2 gap-5">
            <SelectField
              label="Project type"
              name="projectType"
              options={["Residential", "Commercial", "Industrial", "Infrastructure"]}
            />
            <SelectField
              label="City"
              name="city"
              options={["Delhi", "Mumbai", "Pune", "Jaipur", "Ahmedabad", "Other"]}
            />
          </div>
          <Field label="Budget" name="budget" placeholder="Approximate budget" />
        </>
      )}

      <div>
        <label className="block text-sm font-medium text-charcoal/80 mb-1.5">
          {variant === "quote" ? "Project details" : "Message"}
        </label>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full border border-charcoal/20 bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-safety transition-colors resize-none"
          placeholder={
            variant === "quote"
              ? "Approximate area, timeline, and any specifics about the site or brief..."
              : "How can we help?"
          }
        />
      </div>

      {error && <p className="text-sm text-safety-dim">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-charcoal text-concrete px-8 py-3.5 text-sm font-medium hover:bg-safety transition-colors disabled:opacity-60"
      >
        {loading ? "Sending..." : variant === "quote" ? "Submit Quote Request" : "Send Message"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-charcoal/80 mb-1.5">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full border border-charcoal/20 bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-safety transition-colors"
      />
    </div>
  );
}

function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <div>
      <label className="block text-sm font-medium text-charcoal/80 mb-1.5">{label}</label>
      <select
        name={name}
        className="w-full border border-charcoal/20 bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-safety transition-colors"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
