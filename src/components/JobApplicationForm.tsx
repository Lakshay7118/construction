"use client";

import { useState } from "react";
import { CheckCircle2, Upload } from "lucide-react";

export default function JobApplicationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Wired to /api/careers/apply once the backend is connected.
    setSubmitted(true);
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
          <input required className="w-full border border-charcoal/20 bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-safety" />
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal/80 mb-1.5">Email address</label>
          <input type="email" required className="w-full border border-charcoal/20 bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-safety" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-charcoal/80 mb-1.5">Resume</label>
        <label className="flex items-center gap-3 border border-dashed border-charcoal/25 px-4 py-4 text-sm text-charcoal/60 cursor-pointer hover:border-safety transition-colors">
          <Upload size={16} />
          {fileName || "Upload PDF or DOCX"}
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
          />
        </label>
      </div>
      <button
        type="submit"
        className="inline-flex items-center gap-2 bg-charcoal text-concrete px-8 py-3.5 text-sm font-medium hover:bg-safety transition-colors"
      >
        Submit Application
      </button>
    </form>
  );
}
