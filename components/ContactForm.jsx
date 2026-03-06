"use client";

import { formFieldClassName } from "@/lib/siteData";
import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [messageLength, setMessageLength] = useState(0);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      service: formData.get("service"),
      message: formData.get("message"),
      website: formData.get("website"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.status === 429) {
        setError("Too many submissions. Please wait an hour before trying again.");
      } else if (result.success) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white p-10 shadow-xl">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#6aa595]/10">
            <svg className="h-8 w-8 text-[#6aa595]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="mt-4 text-xl font-semibold text-[#1a1a2e]">Message Sent!</h3>
          <p className="mt-2 text-sm text-[#5a6478]">
            We typically respond within 24 hours.
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-6 text-sm font-medium text-[#5a688e] transition-colors hover:text-[#6aa595]"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-10 shadow-xl">
      <h3 className="text-xl font-semibold text-[#1a1a2e]">Send us a Message</h3>
      <p className="mb-8 mt-2 text-sm text-[#5a6478]">
        We typically respond within 24 hours
      </p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input name="website" type="text" tabIndex={-1} autoComplete="off" style={{ display: 'none' }} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-xs uppercase tracking-wider text-slate-600"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className={formFieldClassName}
              placeholder="Your name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-xs uppercase tracking-wider text-slate-600"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className={formFieldClassName}
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-xs uppercase tracking-wider text-slate-600"
            >
              Phone (optional)
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className={formFieldClassName}
              placeholder="+91 9876543210"
            />
          </div>

          <div>
            <label
              htmlFor="service"
              className="mb-2 block text-xs uppercase tracking-wider text-slate-600"
            >
              Service
            </label>
            <select
              id="service"
              name="service"
              className={formFieldClassName}
              defaultValue=""
            >
              <option value="" disabled>
                Select service
              </option>
              <option value="Bookkeeping">Bookkeeping</option>
              <option value="Reconciliation">Reconciliation</option>
              <option value="AP Support">AP Support</option>
              <option value="AR Support">AR Support</option>
              <option value="Payroll">Payroll</option>
              <option value="Tax Planning">Tax Planning</option>
              <option value="Audit">Audit</option>
              <option value="Advisory">Advisory</option>
              <option value="Data Security">Data Security</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="message"
            className="mb-2 block text-xs uppercase tracking-wider text-slate-600"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            minLength={10}
            onChange={(e) => setMessageLength(e.target.value.length)}
            className={formFieldClassName}
            placeholder="Tell us about your current finance operations and goals."
          />
          <p className={`mt-1 text-[10px] text-right ${messageLength > 0 && messageLength < 10 ? "text-red-400" : messageLength >= 10 ? "text-[#6aa595]" : "text-[#5a6478]/60"}`}>
            {messageLength}/10 minimum characters
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-[#5a688e] py-4 text-sm font-semibold tracking-wide text-white cursor-pointer transition-all duration-300 hover:bg-[#6aa595] hover:shadow-lg hover:shadow-[#6aa595]/20 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Sending..." : "Send Message ->"}
        </button>
        {error && <p className="mt-2 text-center text-xs text-red-500">{error}</p>}
      </form>
    </div>
  );
}
