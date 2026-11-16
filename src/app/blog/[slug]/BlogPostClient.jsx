"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Clock,
  Calculator,
  ChevronRight,
  Copy,
  Check,
  ShieldCheck,
  ListTree,
  FileText,
  AlertTriangle,
} from "lucide-react";

export default function BlogPostClient({ post, relatedPosts, recentPosts }) {
  const [copied, setCopied] = useState(false);

  const handleCopyUrl = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-16">
      {/* Main Article */}
      <article className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-2xs space-y-8">
        {/* Breadcrumbs */}
        <nav className="flex flex-wrap items-center gap-2 text-xs text-slate-500 pb-4 border-b border-slate-100">
          <Link href="/" className="text-emerald-700 font-medium hover:underline">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/blog" className="text-emerald-700 font-medium hover:underline">
            Health Guides
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-600">{post.category}</span>
        </nav>

        {/* Header */}
        <header className="space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/70 text-xs font-semibold">
            {post.category}
          </span>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                HC
              </div>
              <div>
                <div className="font-semibold text-slate-900">
                  HealthCalculators Clinical Editorial Team
                </div>
                <Link
                  href="/editorial-policy"
                  className="text-emerald-700 hover:underline text-[11px]"
                >
                  Reviewed under our Editorial &amp; Clinical Policy
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                {post.date}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                {post.readTime}
              </span>
            </div>
          </div>
        </header>

        {/* Article Sections */}
        <div className="space-y-8">
          {post.sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-24 space-y-3"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                {section.heading}
              </h2>
              <div className="text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {section.body}
              </div>
            </section>
          ))}
        </div>

        {/* Clinical References */}
        {post.references && post.references.length > 0 && (
          <section className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-600" />
              Clinical References &amp; Sources
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-600">
              {post.references.map((ref, idx) => (
                <li key={idx}>{ref}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Medical Note */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Educational Notice:</strong> This guide explains peer-reviewed health formulas for educational awareness and does not replace diagnosis or personalized care from a licensed clinician.
          </p>
        </div>

        {/* Related Calculators CTA */}
        {post.relatedCalculators && post.relatedCalculators.length > 0 && (
          <section className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-slate-50 border border-emerald-200/70 space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-emerald-600" />
              Try Related Interactive Calculators
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {post.relatedCalculators.map((calc) => (
                <Link
                  key={calc.href}
                  href={calc.href}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-emerald-600 text-slate-800 hover:text-white border border-slate-200 hover:border-emerald-600 text-xs sm:text-sm font-semibold transition shadow-2xs"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>{calc.name}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Share & Tags */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>

          <button
            onClick={handleCopyUrl}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition cursor-pointer shrink-0"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Article Link Copied" : "Copy Article Link"}</span>
          </button>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="pt-6 border-t border-slate-100 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              Related Health Guides
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition space-y-1.5 bg-slate-50/50"
                >
                  <div className="text-[11px] font-semibold text-emerald-700">
                    {rel.category}
                  </div>
                  <div className="text-sm font-bold text-slate-900 leading-snug">
                    {rel.title}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {rel.date} • {rel.readTime}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="pt-2">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Health Guides</span>
          </Link>
        </div>
      </article>

      {/* Clean Clinical Sidebar (Zero fake ad placeholders) */}
      <aside className="space-y-6">
        {/* Table of Contents */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-3 lg:sticky lg:top-24">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <ListTree className="w-4 h-4 text-emerald-600" />
            In This Article
          </h3>
          <ul className="space-y-2 text-xs">
            {post.sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="flex items-start gap-2 text-slate-600 hover:text-emerald-700 transition py-1"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{section.heading}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="pt-4 mt-4 border-t border-slate-100 space-y-2.5">
            <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Editorial Standards
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Formulas and explanations follow published WHO, CDC, AHA, and NIH clinical guidelines.
            </p>
            <Link
              href="/editorial-policy"
              className="inline-block text-xs font-semibold text-emerald-700 hover:underline"
            >
              View Methodology →
            </Link>
          </div>
        </div>

        {/* Recent Articles */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-600" />
            More Health Guides
          </h3>
          <div className="divide-y divide-slate-100">
            {recentPosts.map((item) => (
              <Link
                key={item.slug}
                href={`/blog/${item.slug}`}
                className="block py-3 first:pt-1 last:pb-0 group"
              >
                <div className="text-xs font-semibold text-slate-800 group-hover:text-emerald-700 transition leading-snug">
                  {item.title}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  {item.date} • {item.readTime}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
