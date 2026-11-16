"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Send, CheckCircle2, ShieldCheck, BookOpen, MessageSquare } from "lucide-react";

export default function ContactClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("Formula Feedback");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please complete all required fields before sending.");
      return;
    }
    setError("");
    const subject = encodeURIComponent(`[HealthCalculators - ${topic}] Message from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nReply Email: ${email}\nTopic: ${topic}\n\nMessage:\n${message}`);
    window.location.href = `mailto:healthcalculatorsonline@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      <section className="rounded-3xl bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-900 text-white p-8 sm:p-10 shadow-xl border border-slate-700/60">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30 mb-4">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Support &amp; Clinical Feedback</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Contact Us
        </h1>
        <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-2xl">
          Have a question about one of our calculators, want to suggest a new clinical tool, or need to report a formula discrepancy? Reach our team directly below.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs">
          <h2 className="text-xl font-bold text-slate-900 mb-1">Send a Message</h2>
          <p className="text-xs sm:text-sm text-slate-500 mb-6">
            Please do not include sensitive personal medical records in your message.
          </p>

          {submitted && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Your email client has been opened.</p>
                <p className="text-xs text-emerald-800 mt-1">
                  If your email app did not launch automatically, you can write directly to{" "}
                  <a href="mailto:healthcalculatorsonline@gmail.com" className="underline font-semibold">
                    healthcalculatorsonline@gmail.com
                  </a>.
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Rivera"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Inquiry Topic
              </label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
              >
                <option value="Formula Feedback">Formula Feedback or Clinical Citation</option>
                <option value="Technical Issue">Technical Bug or Calculation Issue</option>
                <option value="Tool Request">Request a New Health Calculator</option>
                <option value="Privacy Request">Privacy / Cookie / Data Inquiry</option>
                <option value="General">General Question</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Message *
              </label>
              <textarea
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us which calculator or article you are referring to and how we can help..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition shadow-sm cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        </div>

        <aside className="space-y-5">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-600" />
              Direct Email
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              For editorial inquiries, clinical corrections, or partnership questions, email us directly:
            </p>
            <a
              href="mailto:healthcalculatorsonline@gmail.com"
              className="block text-sm font-semibold text-emerald-700 hover:underline break-all"
            >
              healthcalculatorsonline@gmail.com
            </a>
            <p className="text-[11px] text-slate-400">
              Typical response time: 1–2 business days.
            </p>
          </div>

          <div className="bg-slate-900 text-slate-200 rounded-3xl p-6 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Transparency Resources
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/editorial-policy" className="hover:text-emerald-400 transition flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                  Editorial &amp; Clinical Review Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-emerald-400 transition">
                  Privacy Policy &amp; Cookie Notice
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-emerald-400 transition">
                  Terms of Use &amp; Medical Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
