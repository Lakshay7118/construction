"use client";

import { useState } from "react";
import { CheckCircle2, Upload } from "lucide-react";
import { apiFetch } from "@/lib/api";

export default function JobApplicationForm({ careerSlug }: { careerSlug: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const resume = form.get("resume") as File | null;

    try {
      await apiFetch(`/careers/${careerSlug}/apply`, {
        method: "POST",
        body: JSON.stringify({
          name: String(form.get("name") ?? ""),
          email: String(form.get("email") ?? ""),
          phone: String(form.get("phone") ?? ""),
          resumeFileName: resume?.name || fileName || "Resume uploaded",
          coverNote: String(form.get("coverNote") ?? ""),
        }),
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not submit your application right now.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="border border-charcoal/15 p-8 text-center bg-charcoal/[0.02]">
        <CheckCircle2 className="mx-auto text-safety mb-4" size={32} />
        <h4 className="font-display text-xl">Application received.</h4>
        <p className="mt-2 text-sm text-charcoal/60">We&apos;ll reach out if your profile is a fit.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-charcoal/80 mb-1.5">Full name</label>
          <input name="name" required className="w-full border border-charcoal/20 bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-safety" />
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal/80 mb-1.5">Email address</label>
          <input name="email" type="email" required className="w-full border border-charcoal/20 bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-safety" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-charcoal/80 mb-1.5">Phone number</label>
        <input name="phone" type="tel" required className="w-full border border-charcoal/20 bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-safety" />
      </div>
      <div>
        <label className="block text-sm font-medium text-charcoal/80 mb-1.5">Resume</label>
        <label className="flex items-center gap-3 border border-dashed border-charcoal/25 px-4 py-4 text-sm text-charcoal/60 cursor-pointer hover:border-safety transition-colors">
          <Upload size={16} />
          {fileName || "Upload PDF or DOCX"}
          <input
            name="resume"
            type="file"
            accept=".pdf,.doc,.docx"
            required
            className="hidden"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
          />
        </label>
      </div>
      <div>
        <label className="block text-sm font-medium text-charcoal/80 mb-1.5">Cover note</label>
        <textarea name="coverNote" rows={4} className="w-full border border-charcoal/20 bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-safety resize-none" />
      </div>
      {error && <p className="text-sm text-safety-dim">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center gap-2 bg-charcoal text-concrete px-8 py-3.5 text-sm font-medium hover:bg-safety transition-colors"
      >
        {loading ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}
