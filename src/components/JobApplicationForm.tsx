"use client";

import { useRef, useState } from "react";
import { CheckCircle2, Upload, FileText, X } from "lucide-react";
import { apiFetch } from "@/lib/api";

export default function JobApplicationForm({ careerSlug }: { careerSlug: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Refs for text fields so we can read their values reliably in the async handler
  const nameRef     = useRef<HTMLInputElement>(null);
  const emailRef    = useRef<HTMLInputElement>(null);
  const phoneRef    = useRef<HTMLInputElement>(null);
  const coverRef    = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    // Client-side validation
    const name      = nameRef.current?.value.trim() ?? "";
    const email     = emailRef.current?.value.trim() ?? "";
    const phone     = phoneRef.current?.value.trim() ?? "";
    const coverNote = coverRef.current?.value.trim() ?? "";

    if (!name || !email || !phone) {
      setError("Please fill in all required fields.");
      return;
    }
    if (!selectedFile) {
      setError("Please upload your resume.");
      return;
    }

    setLoading(true);

    // Build FormData explicitly — don't rely on new FormData(form) since
    // the file input is removed from the DOM when a file is already selected.
    const data = new FormData();
    data.append("name",      name);
    data.append("email",     email);
    data.append("phone",     phone);
    data.append("coverNote", coverNote);
    data.append("resume",    selectedFile, selectedFile.name);

    try {
      await apiFetch(`/careers/${careerSlug}/apply`, {
        method: "POST",
        body: data,
      });
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not submit your application right now."
      );
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="border border-charcoal/15 p-8 text-center bg-charcoal/[0.02]">
        <CheckCircle2 className="mx-auto text-safety mb-4" size={32} />
        <h4 className="font-display text-xl">Application received.</h4>
        <p className="mt-2 text-sm text-charcoal/60">
          We&apos;ll reach out if your profile is a fit.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-charcoal/80 mb-1.5">
            Full name <span className="text-safety">*</span>
          </label>
          <input
            ref={nameRef}
            name="name"
            required
            className="w-full border border-charcoal/20 bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-safety"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal/80 mb-1.5">
            Email address <span className="text-safety">*</span>
          </label>
          <input
            ref={emailRef}
            name="email"
            type="email"
            required
            className="w-full border border-charcoal/20 bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-safety"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-charcoal/80 mb-1.5">
          Phone number <span className="text-safety">*</span>
        </label>
        <input
          ref={phoneRef}
          name="phone"
          type="tel"
          required
          className="w-full border border-charcoal/20 bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-safety"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-charcoal/80 mb-1.5">
          Resume <span className="text-safety">*</span>
        </label>

        {selectedFile ? (
          /* ── File selected: show name with remove button ── */
          <div className="flex items-center gap-3 border border-charcoal/20 bg-charcoal/[0.02] px-4 py-3">
            <FileText size={18} className="text-blueprint shrink-0" />
            <span className="flex-1 text-sm text-charcoal/80 truncate">
              {selectedFile.name}
            </span>
            <button
              type="button"
              onClick={() => {
                setSelectedFile(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              className="text-charcoal/40 hover:text-safety-dim transition-colors"
              aria-label="Remove file"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          /* ── No file yet: show upload area ── */
          <label className="flex items-center gap-3 border border-dashed border-charcoal/25 px-4 py-4 text-sm text-charcoal/60 cursor-pointer hover:border-safety transition-colors">
            <Upload size={16} />
            Upload PDF or DOCX
            <input
              ref={fileInputRef}
              name="resume"
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
            />
          </label>
        )}

        <p className="mt-1 text-xs text-charcoal/40">
          Accepted: PDF, DOC, DOCX · Max 10 MB. Your document is securely stored.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-charcoal/80 mb-1.5">
          Cover note
        </label>
        <textarea
          ref={coverRef}
          name="coverNote"
          rows={4}
          className="w-full border border-charcoal/20 bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-safety resize-none"
        />
      </div>

      {error && <p className="text-sm text-safety-dim">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center gap-2 bg-charcoal text-concrete px-8 py-3.5 text-sm font-medium hover:bg-safety transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Submitting…" : "Submit Application"}
      </button>
    </form>
  );
}
