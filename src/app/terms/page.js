import Link from "next/link";
import { Scale, AlertTriangle, ShieldAlert, BookOpen } from "lucide-react";

export const metadata = {
  title: "Terms of Use & Medical Disclaimer",
  description:
    "Terms of Use and Medical Disclaimer for Health Calculators Online. Understand the educational scope, limitations, and clinical guidelines behind our health calculators.",
  alternates: {
    canonical: "https://healthcalculatorsonline.com/terms",
  },
};

export default function TermsPage() {
  const lastUpdated = "November 16, 2026";

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <section className="rounded-3xl bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-900 text-white p-8 sm:p-10 shadow-xl border border-slate-700/60">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30 mb-4">
          <Scale className="w-3.5 h-3.5" />
          <span>Terms &amp; Medical Disclaimer</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Terms of Use
        </h1>
        <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-2xl">
          Last Updated: {lastUpdated}. By accessing or using Health Calculators Online, you agree to the terms and medical disclaimers outlined below.
        </p>
      </section>

      <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-sm space-y-1">
          <p className="font-bold">Important Medical Disclaimer</p>
          <p className="text-amber-900/90 leading-relaxed">
            Every calculator, chart, and educational article on this site is provided strictly for informational and educational purposes. Nothing on this site constitutes medical advice, clinical diagnosis, or treatment. Always consult a licensed physician or qualified healthcare provider regarding medical questions or before changing diet, exercise, or medication.
          </p>
        </div>
      </div>

      <article className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-2xs space-y-8 text-slate-700 text-sm sm:text-base leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">1. Educational Scope &amp; No Doctor-Patient Relationship</h2>
          <p>
            Using Health Calculators Online does not establish a doctor-patient or clinical relationship between you and the site operators, contributors, or reviewers. Screening tools—including eGFR, Creatinine Clearance, ASCVD Risk, Diabetes Risk, Anion Gap, and Medication Dosage tools—rely on standardized population equations that may not reflect individual clinical circumstances such as acute illness, pregnancy, pediatric growth, or comorbidities.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">2. Accuracy of Formulas &amp; Continuous Maintenance</h2>
          <p>
            We implement widely accepted equations from organizations such as the World Health Organization (WHO), Centers for Disease Control and Prevention (CDC), American Heart Association (AHA), National Kidney Foundation (NKF), and Institute of Medicine (IOM). For details on how formulas are selected and verified, please review our{" "}
            <Link href="/editorial-policy" className="text-emerald-700 font-medium underline hover:text-emerald-800">
              Editorial &amp; Clinical Review Policy
            </Link>
            .
          </p>
          <p>
            Despite careful auditing, mathematical rounding, unit conversions, and updates to clinical guidelines can introduce discrepancies. Outputs are provided &ldquo;as is&rdquo; without warranty of fitness for any specific medical or diagnostic purpose.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">3. Acceptable Use</h2>
          <p>You agree to use this website lawfully and agree not to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Attempt to disrupt, scrape, overload, or reverse-engineer site infrastructure.</li>
            <li>Republish or redistribute bulk site content as your own proprietary service without written permission.</li>
            <li>Rely on automated outputs for emergency medical triage or unverified clinical prescribing.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">4. Third-Party Links &amp; Advertising</h2>
          <p>
            This website may display advertisements served via Google AdSense and links to external clinical references (such as WHO, CDC, or NIH resources). We do not endorse or assume responsibility for the content, products, or privacy practices of third-party websites.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">5. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Health Calculators Online and its contributors shall not be liable for any direct, indirect, incidental, consequential, or special damages arising from your use of, or inability to use, any calculator, guide, or content published on this website.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            6. Questions or Formula Corrections
          </h2>
          <p>
            If you spot a bug, unit error, or outdated clinical guideline, please notify us immediately via our{" "}
            <Link href="/contact" className="text-emerald-700 font-medium underline hover:text-emerald-800">
              Contact page
            </Link>{" "}
            or email{" "}
            <a
              href="mailto:healthcalculatorsonline@gmail.com"
              className="text-emerald-700 font-medium underline hover:text-emerald-800"
            >
              healthcalculatorsonline@gmail.com
            </a>
            .
          </p>
        </section>
      </article>
    </div>
  );
}
