import "./globals.css";
import Navbar from "@/components/Navbar";
import Script from "next/script";
import Link from "next/link";
import {
  Activity,
  HeartPulse,
  Stethoscope,
  BookOpen,
  ShieldAlert,
  Lock,
  Mail,
  Scale,
  Sparkles,
  ExternalLink,
  ChevronRight,
  AlertTriangle
} from "lucide-react";

export const metadata = {
  title: {
    default: "Health Calculators Online | Clinical & Wellness Suite",
    template: "%s | Health Calculators Online",
  },
  description: "Free, clinically referenced health calculators for BMI, caloric needs, body composition, cardiovascular risk, and renal function.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Font Awesome for legacy calculator components */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-E9W1HQGW35"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-E9W1HQGW35');
          `}
        </Script>
      </head>

      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-emerald-500 selection:text-white">
        <Navbar />

        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {children}
        </main>

        {/* Modern Medical Footer */}
        <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 mt-auto">
          {/* Main Footer Links */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
              
              {/* Brand Col */}
              <div className="lg:col-span-2 space-y-4">
                <Link href="/" className="inline-flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-lg font-bold tracking-tight text-white">
                      Health<span className="text-emerald-400">Calculators</span>
                    </span>
                    <span className="block text-[11px] text-slate-400">
                      Evidence-Based Clinical Suite
                    </span>
                  </div>
                </Link>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
                  Research-backed health calculations designed for patients, clinicians, and fitness enthusiasts. Formulated according to current WHO, CDC, AHA, and NIH standards.
                </p>

                <div className="pt-2">
                  <a
                    href="mailto:healthcalculatorsonline@gmail.com"
                    className="inline-flex items-center gap-2 text-xs text-slate-300 hover:text-emerald-400 transition"
                  >
                    <Mail className="w-4 h-4 text-emerald-400" />
                    <span>healthcalculatorsonline@gmail.com</span>
                  </a>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
                    <Lock className="w-3 h-3 text-emerald-400" />
                    Client-Side Execution (Zero Tracking)
                  </span>
                </div>
              </div>

              {/* Links Column 1: Body & Fitness */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-emerald-400" />
                  Body & Fitness
                </h4>
                <ul className="space-y-2 text-xs">
                  <li>
                    <Link href="/bmi-calculator" className="hover:text-emerald-400 transition">
                      BMI Calculator
                    </Link>
                  </li>
                  <li>
                    <Link href="/body-fat-calculator" className="hover:text-emerald-400 transition">
                      Body Fat % (Navy)
                    </Link>
                  </li>
                  <li>
                    <Link href="/calorie-calculator" className="hover:text-emerald-400 transition">
                      Daily Calorie Planner
                    </Link>
                  </li>
                  <li>
                    <Link href="/tdee-calculator" className="hover:text-emerald-400 transition">
                      TDEE & Macro Ratio
                    </Link>
                  </li>
                  <li>
                    <Link href="/ibw-calculator" className="hover:text-emerald-400 transition">
                      Ideal Body Weight (IBW)
                    </Link>
                  </li>
                  <li>
                    <Link href="/lbm-calculator" className="hover:text-emerald-400 transition">
                      Lean Body Mass (LBM)
                    </Link>
                  </li>
                  <li>
                    <Link href="/protein-intake-calculator" className="hover:text-emerald-400 transition">
                      Protein Intake Needs
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Links Column 2: Cardiovascular & Labs */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                  <HeartPulse className="w-3.5 h-3.5 text-emerald-400" />
                  Cardio & Clinical
                </h4>
                <ul className="space-y-2 text-xs">
                  <li>
                    <Link href="/blood-pressure-category-calculator" className="hover:text-emerald-400 transition">
                      Blood Pressure Staging
                    </Link>
                  </li>
                  <li>
                    <Link href="/heart-rate-calculator" className="hover:text-emerald-400 transition">
                      Target Heart Rate Zones
                    </Link>
                  </li>
                  <li>
                    <Link href="/heart-disease-risk-calculator" className="hover:text-emerald-400 transition">
                      Cardiovascular ASCVD Risk
                    </Link>
                  </li>
                  <li>
                    <Link href="/gfr-calculator" className="hover:text-emerald-400 transition">
                      eGFR Kidney Function
                    </Link>
                  </li>
                  <li>
                    <Link href="/creatinine-clearance-calculator" className="hover:text-emerald-400 transition">
                      Creatinine Clearance (CrCl)
                    </Link>
                  </li>
                  <li>
                    <Link href="/diabetes-risk-calculator" className="hover:text-emerald-400 transition">
                      Type 2 Diabetes Risk Score
                    </Link>
                  </li>
                  <li>
                    <Link href="/medication-dosage-calculator" className="hover:text-emerald-400 transition">
                      Medication Dosage by Weight
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Links Column 3: Women's Health & Guides */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                  Maternal & Resources
                </h4>
                <ul className="space-y-2 text-xs">
                  <li>
                    <Link href="/pregnancy-due-date-calculator" className="hover:text-emerald-400 transition">
                      Pregnancy Due Date
                    </Link>
                  </li>
                  <li>
                    <Link href="/pregnancy-weight-gain-calculator" className="hover:text-emerald-400 transition">
                      Gestational Weight Gain
                    </Link>
                  </li>
                  <li>
                    <Link href="/ovulation-tracker" className="hover:text-emerald-400 transition">
                      Ovulation & Fertility
                    </Link>
                  </li>
                  <li>
                    <Link href="/water-intake-calculator" className="hover:text-emerald-400 transition">
                      Daily Hydration Needs
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="hover:text-emerald-400 transition font-medium text-slate-300">
                      Clinical Health Guides
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="hover:text-emerald-400 transition font-medium text-slate-300">
                      About & Methodology
                    </Link>
                  </li>
                </ul>
              </div>

            </div>

            {/* Medical Disclaimer Banner */}
            <div className="mt-10 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-200/90 text-xs flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-semibold text-amber-300">Strict Medical & Educational Disclaimer:</span>
                <p className="text-slate-300 leading-relaxed">
                  The tools and information on HealthCalculators are designed for educational, fitness tracking, and informational purposes only. They are not intended to replace professional clinical diagnosis, advice, or personalized treatment from a licensed healthcare provider. If you suspect an acute medical emergency, please contact 911 or visit your nearest emergency room immediately.
                </p>
              </div>
            </div>

            {/* Bottom copyright row */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
              <p>&copy; {new Date().getFullYear()} HealthCalculators. All rights reserved. Peer-reviewed health algorithms.</p>
              
              <div className="flex items-center gap-4 text-slate-400">
                <Link href="/about" className="hover:text-slate-300 transition">
                  About
                </Link>
                <span>•</span>
                <Link href="/blog" className="hover:text-slate-300 transition">
                  Health Blog
                </Link>
                <span>•</span>
                <Link href="/#calculator-directory" className="hover:text-slate-300 transition">
                  All 33+ Tools
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
