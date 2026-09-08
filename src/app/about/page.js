"use client";

import { useState } from 'react';
import Link from 'next/link';
import {
  Activity,
  HeartPulse,
  ShieldCheck,
  Award,
  Users,
  CheckCircle2,
  HelpCircle,
  Share2,
  ChevronDown,
  Lock,
  ArrowRight,
  BookOpen,
  Sparkles,
  ExternalLink,
  Mail,
  Copy,
  Check
} from 'lucide-react';
import { CALCULATORS } from '@/data/calculatorsData';

export default function AboutPage() {
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [copied, setCopied] = useState(false);

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const faqs = [
    {
      question: "How accurate are your health calculators compared to clinical medical assessments?",
      answer: "Our health calculators utilize peer-reviewed, scientifically validated formulas that are globally standard in clinical medicine and exercise physiology. For example, our BMI calculator follows the World Health Organization classification, our body fat calculator applies the U.S. Navy Method, and our renal calculators employ the race-neutral 2021 CKD-EPI formula. While these tools offer high diagnostic screening utility, they are for informational and monitoring purposes and should complement, not replace, personalized physician evaluation."
    },
    {
      question: "Are the calculators suitable for all ages, body types, and medical conditions?",
      answer: "Most calculators are calibrated for adults aged 18-65. Specific clinical exceptions apply for pregnant individuals, competitive athletes with elevated lean mass, amputees, and patients with severe edema or active renal failure. Whenever applicable, our individual calculators highlight specific demographic criteria and clinical boundary guidelines."
    },
    {
      question: "How often should I recalculate my health metrics to track progress?",
      answer: "For body composition and caloric metrics (like BMI, BMR, and Body Fat %), assessing every 2 to 4 weeks provides the most reliable signal without being distorted by day-to-day fluid retention or digestive contents. For cardiovascular risk markers and blood pressure trends, tracking regular weekly averages or quarterly clinical reviews provides actionable guidance."
    },
    {
      question: "Do you store or transmit any personal health data entered into these tools?",
      answer: "No. We operate under a strict privacy-first architecture: 100% of mathematical calculations are performed client-side inside your web browser. Zero medical inputs, weights, heights, or blood test values are transmitted to or stored on external servers."
    },
    {
      question: "How do you ensure the ongoing accuracy and validation of each formula?",
      answer: "Our calculators are cross-referenced with official guideline publications from the World Health Organization (WHO), Centers for Disease Control and Prevention (CDC), American Heart Association (AHA), American College of Sports Medicine (ACSM), and National Kidney Foundation (NKF). Formula implementations are audited regularly against published literature."
    },
    {
      question: "Can fitness trainers, dietitians, or healthcare professionals use these tools?",
      answer: "Yes. Healthcare practitioners, registered dietitians, and certified personal trainers worldwide utilize HealthCalculators as transparent, instant reference utilities for patient counseling, caloric baseline estimation, and cardiovascular risk education."
    }
  ];

  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Header */}
      <section className="relative rounded-3xl bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-900 text-white p-8 sm:p-12 shadow-xl border border-slate-700/60 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Clinical Integrity & Transparency</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            About HealthCalculators
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Bridging the gap between peer-reviewed medical science and daily health tracking through transparent, validated digital calculation tools.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold transition shadow-sm"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "Link Copied!" : "Share This Site"}</span>
            </button>
            <a
              href="mailto:healthcalculatorsonline@gmail.com"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-medium border border-slate-700 transition"
            >
              <Mail className="w-4 h-4 text-emerald-400" />
              <span>Contact Clinical Team</span>
            </a>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-2xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Our Core Mission</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Health decisions should be founded on accurate physiology, not guesswork or arbitrary diet trends. Our goal is to provide accessible, instant computational tools that deliver the same formulas utilized in clinical settings, with clear explanations of what every metric actually means for long-term health.
          </p>
          <ul className="space-y-2 pt-2 text-xs sm:text-sm text-slate-700">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Peer-reviewed scientific validation for every algorithm</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Full transparency on medical formulas and clinical boundaries</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Strict zero-data-collection privacy policy</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-2xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Client-Side Privacy Guarantee</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Unlike many commercial health applications, we do not require user accounts, email signups, or tracking cookies to perform health evaluations. Your biometric information—whether it is height, weight, pregnancy dates, or laboratory values—is processed strictly in your device's memory.
          </p>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-1">
            <span className="font-semibold text-slate-900">Zero Server Transmission</span>
            <p>
              When you submit a calculation form, the mathematical logic executes directly in client-side JavaScript. No sensitive medical data is saved to remote databases.
            </p>
          </div>
        </div>
      </section>

      {/* Clinical Formula Standards */}
      <section className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-2xs space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Scientific Foundation</span>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">
            Clinical Standards & Institutional Formulations
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            A comprehensive index of the scientific consensus models utilized across our 33+ tools:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-2">
            <h4 className="font-bold text-sm text-slate-900">Anthropometrics & Weight</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              World Health Organization (WHO) BMI cutoff points; Devine (1974), Robinson (1983), and Miller (1983) Ideal Body Weight equations; Boer & Hume Lean Body Mass formulas.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-2">
            <h4 className="font-bold text-sm text-slate-900">Energy & Metabolism</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Mifflin-St Jeor (1990) and revised Harris-Benedict (1984) equations, coupled with ACSM physical activity level (PAL) multipliers for precise caloric guidance.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-2">
            <h4 className="font-bold text-sm text-slate-900">Cardiovascular Health</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              American Heart Association (AHA) and American College of Cardiology (ACC) 2017 Blood Pressure Clinical Practice Guidelines and Karvonen heart rate reserve zones.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-2">
            <h4 className="font-bold text-sm text-slate-900">Renal & Laboratory</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              CKD-EPI 2021 race-neutral serum creatinine eGFR equation; Cockcroft-Gault Creatinine Clearance with normalized body surface area (BSA) indexation.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-2">
            <h4 className="font-bold text-sm text-slate-900">Body Composition</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              U.S. Navy Circumference Method (Hodgdon & Beckett) utilizing log anthropometrics to determine body fat percentage and fat-free mass index (FFMI).
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-2">
            <h4 className="font-bold text-sm text-slate-900">Maternal & Women's Health</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Naegele's Rule adjusted for 28-day cycle variance, and Institute of Medicine (IOM) trimester-specific pregnancy weight gain guidelines.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive FAQ Section */}
      <section className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-2xs space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5" />
            Frequently Asked Questions
          </span>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">
            Common Inquiries & Clinical Usage
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isExpanded = activeFAQ === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200/80 rounded-2xl overflow-hidden transition-all duration-150"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-4 sm:p-5 text-left font-semibold text-sm sm:text-base text-slate-900 hover:bg-slate-50 flex items-center justify-between gap-4 transition"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isExpanded ? "rotate-180 text-emerald-600" : ""
                    }`}
                  />
                </button>
                {isExpanded && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/40">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Directory Quick-Jump */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 space-y-6 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Explore All 33+ Calculators</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Select any tool below to calculate your metrics in under 60 seconds
            </p>
          </div>
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold text-center transition shrink-0"
          >
            Open Interactive Hub →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 pt-2">
          {CALCULATORS.map((calc) => (
            <Link
              key={calc.id}
              href={calc.href}
              className="p-3 rounded-xl bg-slate-800/80 hover:bg-emerald-950/80 hover:text-emerald-300 border border-slate-700/80 text-xs font-medium text-slate-300 transition truncate"
            >
              • {calc.title}
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
