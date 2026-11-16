import Link from "next/link";
import { ShieldCheck, BookOpen, CheckCircle2, FileCheck, RefreshCw, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Editorial Policy & Clinical Methodology",
  description:
    "How Health Calculators Online researches, implements, cites, and audits 33+ medical, fitness, and nutritional calculators against WHO, CDC, AHA, NIH, and NKF standards.",
  alternates: {
    canonical: "https://healthcalculatorsonline.com/editorial-policy",
  },
};

export default function EditorialPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <section className="rounded-3xl bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-900 text-white p-8 sm:p-10 shadow-xl border border-slate-700/60">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30 mb-4">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Scientific Integrity &amp; E-E-A-T Standards</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Editorial &amp; Clinical Review Policy
        </h1>
        <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-2xl">
          Health information requires precision, source transparency, and clear clinical boundaries. Here is how we build, verify, and maintain every calculator and guide on our platform.
        </p>
      </section>

      <article className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-2xs space-y-8 text-slate-700 text-sm sm:text-base leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            1. Primary Clinical &amp; Peer-Reviewed Sources
          </h2>
          <p>
            Every formula implemented on Health Calculators Online is anchored to published clinical practice guidelines or peer-reviewed physiological equations—never arbitrary heuristics. Our primary reference authorities include:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {[
              { org: "World Health Organization (WHO)", scope: "Adult BMI cutoffs, waist-to-hip ratio thresholds, and global nutritional reference values." },
              { org: "Centers for Disease Control (CDC)", scope: "Pediatric BMI-for-age percentiles, diabetes screening risk factors, and physical activity guidance." },
              { org: "American Heart Association (AHA / ACC)", scope: "2017 Blood Pressure Staging guidelines, ASCVD cardiovascular risk modeling, and target heart rate zones." },
              { org: "National Kidney Foundation (NKF)", scope: "2021 CKD-EPI race-neutral eGFR equation and Cockcroft-Gault renal dosing adjustments." },
              { org: "Institute of Medicine (IOM / NAM)", scope: "Gestational weight gain targets by pre-pregnancy BMI and daily micronutrient / hydration reference intakes." },
              { org: "Exercise & Metabolic Physiology", scope: "Mifflin-St Jeor (1990), revised Harris-Benedict, Karvonen Heart Rate Reserve, and Hodgdon-Beckett U.S. Navy equations." }
            ].map((item) => (
              <div key={item.org} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
                <div className="font-bold text-slate-900 text-sm">{item.org}</div>
                <p className="text-xs text-slate-600 leading-relaxed">{item.scope}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-emerald-600" />
            2. Formula Validation &amp; Unit Verification
          </h2>
          <p>Before publishing or updating any calculator, our engineering and editorial workflow checks:</p>
          <ul className="space-y-2">
            {[
              "Exact mathematical parity with published peer-reviewed coefficients (e.g., metric vs. imperial conversions).",
              "Explicit disclosure of population limitations (athletes, pregnancy, pediatrics, amputees, or acute edema).",
              "Input boundary validation to prevent implausible physiological values from producing misleading outputs.",
              "Clear contextual interpretation explaining what a normal, borderline, or elevated score typically indicates."
            ].map((point) => (
              <li key={point} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-emerald-600" />
            3. Ongoing Curation &amp; Corrections Policy
          </h2>
          <p>
            Medical consensus evolves—such as the transition from race-adjusted renal formulas to the 2021 race-neutral CKD-EPI equation. We regularly audit our calculators and educational articles to incorporate updated medical guidelines and clarify terminology.
          </p>
          <p>
            Clinicians, researchers, and readers who notice a discrepancy or outdated reference are encouraged to report it through our{" "}
            <Link href="/contact" className="text-emerald-700 font-medium underline hover:text-emerald-800">
              Contact page
            </Link>
            . Verified corrections are prioritized and documented promptly.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">4. Advertising Independence</h2>
          <p>
            Our editorial content and calculation algorithms are strictly independent from advertising. Display ads served on the site do not influence how formulas behave, how risk categories are staged, or what clinical takeaways appear in our guides.
          </p>
        </section>
      </article>
    </div>
  );
}
