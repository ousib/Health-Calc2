import Link from "next/link";
import { Lock, ShieldCheck, Cookie, Mail, FileText, Globe } from "lucide-react";

export const metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Health Calculators Online. Learn how we protect your biometric inputs via client-side calculations, and how Google Analytics and Google AdSense cookies are used.",
  alternates: {
    canonical: "https://healthcalculatorsonline.com/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "November 16, 2026";

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <section className="rounded-3xl bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-900 text-white p-8 sm:p-10 shadow-xl border border-slate-700/60">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30 mb-4">
          <Lock className="w-3.5 h-3.5" />
          <span>Privacy &amp; Data Protection</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-2xl">
          Effective Date: {lastUpdated}. Health Calculators Online is committed to protecting your privacy while delivering accurate, client-side health and wellness tools.
        </p>
      </section>

      <article className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-2xs space-y-8 text-slate-700 text-sm sm:text-base leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            1. Client-Side Health Calculations (Zero Medical Data Storage)
          </h2>
          <p>
            All health, nutrition, cardiovascular, renal, and maternal calculators on{" "}
            <strong>healthcalculatorsonline.com</strong> run 100% locally inside your web browser using client-side JavaScript.
          </p>
          <p>
            When you enter personal measurements—such as your weight, height, age, blood pressure readings, lab values (e.g., serum creatinine), or menstrual cycle dates—those inputs are <strong>never transmitted to, logged by, or stored on our servers</strong>. Certain convenience features (such as saving favorite calculators) use your browser&apos;s local storage (`localStorage`), which stays strictly on your own device and can be cleared at any time.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Globe className="w-5 h-5 text-emerald-600" />
            2. Analytics &amp; Usage Information
          </h2>
          <p>
            To understand site performance, improve tool usability, and fix technical errors, we use{" "}
            <strong>Google Analytics (GA4)</strong>. Google Analytics collects aggregated, non-personally identifiable technical information such as browser type, device category, approximate region/country, referring pages, and page visit duration. It does <strong>not</strong> receive the health numbers you type into our calculators.
          </p>
          <p>
            You can opt out of Google Analytics tracking at any time by installing the{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 font-medium underline hover:text-emerald-800"
            >
              Google Analytics Opt-out Browser Add-on
            </a>
            .
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Cookie className="w-5 h-5 text-emerald-600" />
            3. Google AdSense &amp; Advertising Cookies
          </h2>
          <p>
            We partner with <strong>Google AdSense</strong> to display advertising that helps keep our 33+ health calculators free for everyone.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to this website or other websites on the internet.
            </li>
            <li>
              Google&apos;s use of advertising cookies enables it and its partners to serve ads to users based on their visit to our site and/or other sites on the internet.
            </li>
            <li>
              Users may opt out of personalized advertising by visiting{" "}
              <a
                href="https://myadcenter.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 font-medium underline hover:text-emerald-800"
              >
                Google My Ad Center
              </a>{" "}
              or{" "}
              <a
                href="https://www.aboutads.info/choices/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 font-medium underline hover:text-emerald-800"
              >
                aboutads.info
              </a>
              .
            </li>
          </ul>
          <p>
            In accordance with applicable privacy laws (including GDPR for EEA/UK visitors and CCPA/CPRA for California residents), visitors can manage or disable non-essential cookies via their browser settings or Google&apos;s consent tools.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-600" />
            4. Contact Inquiries &amp; User Rights
          </h2>
          <p>
            If you email us directly or submit a message through our{" "}
            <Link href="/contact" className="text-emerald-700 font-medium underline hover:text-emerald-800">
              Contact page
            </Link>
            , we use your name, email address, and message solely to respond to your inquiry, investigate formula feedback, or resolve technical support requests. We never sell or rent contact details to third parties.
          </p>
          <p>
            Under GDPR, CCPA, and similar privacy frameworks, you have the right to request access to, correction of, or deletion of any personal communication you have sent us.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">5. Children&apos;s Privacy</h2>
          <p>
            Health Calculators Online is intended for general educational use by adults and healthcare professionals. We do not knowingly collect personally identifiable information from children under 13 years of age (or under 16 in the EEA).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">6. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy periodically to reflect new legal requirements, technical changes, or site features. Any updates will be posted on this page with a revised effective date.
          </p>
        </section>

        <section className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            <Mail className="w-4 h-4 text-emerald-600" />
            Privacy Questions or Requests
          </h3>
          <p className="text-sm text-slate-600">
            Email us at{" "}
            <a
              href="mailto:healthcalculatorsonline@gmail.com"
              className="text-emerald-700 font-semibold hover:underline"
            >
              healthcalculatorsonline@gmail.com
            </a>{" "}
            or visit our{" "}
            <Link href="/contact" className="text-emerald-700 font-semibold hover:underline">
              Contact Us
            </Link>{" "}
            page.
          </p>
        </section>
      </article>
    </div>
  );
}
