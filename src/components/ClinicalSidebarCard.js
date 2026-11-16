import Link from "next/link";
import { ShieldCheck, Calculator, BookOpen, Lock, ChevronRight } from "lucide-react";

const POPULAR_TOOLS = [
  { name: "BMI Calculator", href: "/bmi-calculator", tag: "WHO Standard" },
  { name: "TDEE & Calorie Needs", href: "/tdee-calculator", tag: "Metabolism" },
  { name: "Body Fat Percentage", href: "/body-fat-calculator", tag: "U.S. Navy" },
  { name: "eGFR Kidney Function", href: "/gfr-calculator", tag: "CKD-EPI" },
  { name: "Creatinine Clearance", href: "/creatinine-clearance-calculator", tag: "Cockcroft-Gault" },
  { name: "Blood Pressure Staging", href: "/blood-pressure-category-calculator", tag: "AHA / ACC" },
];

export default function ClinicalSidebarCard() {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
        <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Calculator className="w-4 h-4 text-emerald-600" />
          Popular Health Tools
        </h4>
        <div className="space-y-1.5">
          {POPULAR_TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/70 text-xs text-slate-800 transition group"
            >
              <div>
                <div className="font-semibold group-hover:text-emerald-800">{tool.name}</div>
                <div className="text-[10px] text-slate-400">{tool.tag}</div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600" />
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-slate-900 text-slate-200 rounded-2xl p-5 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
          <ShieldCheck className="w-4 h-4" />
          Clinical Standards
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          All calculations execute locally inside your browser with zero server storage of personal measurements.
        </p>
        <div className="flex flex-col gap-1.5 pt-1 text-xs">
          <Link href="/editorial-policy" className="text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            Editorial &amp; Formula Policy
          </Link>
          <Link href="/privacy-policy" className="text-slate-300 hover:text-emerald-300 font-medium inline-flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" />
            Client-Side Privacy Notice
          </Link>
        </div>
      </div>
    </div>
  );
}
