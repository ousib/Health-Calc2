"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Scale,
  Apple,
  HeartPulse,
  Stethoscope,
  Flower2,
  ShieldAlert,
  Flame,
  LayoutGrid,
  Clock,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Lock,
  BookOpen,
  Award,
  ChevronRight,
  Star,
  CheckCircle2,
  X,
  Gauge,
  Percent,
  PieChart,
  Filter
} from "lucide-react";
import { CALCULATORS, CALCULATOR_CATEGORIES } from "@/data/calculatorsData";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [favorites, setFavorites] = useState([]);
  const [mounted, setMounted] = useState(false);

  // Load favorites from localStorage
  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("health_calc_favorites");
      if (saved) {
        setFavorites(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Toggle favorite
  const toggleFavorite = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    const updated = favorites.includes(id)
      ? favorites.filter(favId => favId !== id)
      : [...favorites, id];
    setFavorites(updated);
    try {
      localStorage.setItem("health_calc_favorites", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  // Icon map
  const categoryIconMap = {
    all: LayoutGrid,
    popular: Flame,
    body: Scale,
    nutrition: Apple,
    cardio: HeartPulse,
    clinical: Stethoscope,
    women: Flower2,
    risk: ShieldAlert,
  };

  // Filtered calculators
  const filteredCalculators = useMemo(() => {
    return CALCULATORS.filter(calc => {
      // Category filter
      let matchesCat = true;
      if (selectedCategory === "popular") {
        matchesCat = calc.popular;
      } else if (selectedCategory === "favorites") {
        matchesCat = favorites.includes(calc.id);
      } else if (selectedCategory !== "all") {
        matchesCat = calc.category === selectedCategory;
      }

      // Search filter
      const query = searchQuery.trim().toLowerCase();
      let matchesSearch = true;
      if (query !== "") {
        matchesSearch =
          calc.title.toLowerCase().includes(query) ||
          calc.desc.toLowerCase().includes(query) ||
          calc.categoryName.toLowerCase().includes(query) ||
          (calc.standard && calc.standard.toLowerCase().includes(query)) ||
          calc.badge.toLowerCase().includes(query);
      }

      return matchesCat && matchesSearch;
    });
  }, [searchQuery, selectedCategory, favorites]);

  // Featured flagship calculators
  const featuredCalculators = [
    {
      id: "bmi",
      title: "Body Mass Index (BMI)",
      href: "/bmi-calculator",
      tag: "Body Composition",
      desc: "Instant WHO-standard classification with healthy weight targets.",
      icon: Scale,
      color: "emerald",
      metric: "WHO Standard",
    },
    {
      id: "tdee",
      title: "TDEE & Calorie Planner",
      href: "/tdee-calculator",
      tag: "Metabolic Energy",
      desc: "Total Daily Energy Expenditure with deficit & surplus macro ratios.",
      icon: PieChart,
      color: "amber",
      metric: "Mifflin-St Jeor",
    },
    {
      id: "bp-category",
      title: "Blood Pressure Category",
      href: "/blood-pressure-category-calculator",
      tag: "Cardiovascular",
      desc: "Clinical staging from Normal to Stage 2 Hypertension with health advice.",
      icon: Gauge,
      color: "rose",
      metric: "AHA / ACC 2017",
    },
    {
      id: "body-fat",
      title: "Body Fat Percentage",
      href: "/body-fat-calculator",
      tag: "Fitness & Leanness",
      desc: "Anthropometric body composition without requiring DEXA scan.",
      icon: Percent,
      color: "blue",
      metric: "U.S. Navy Method",
    },
  ];

  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white pt-12 pb-14 px-6 sm:px-10 lg:px-12 shadow-xl border border-slate-700/50 mt-4">
        {/* Subtle decorative medical cross grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>33+ Clinically Referenced Health Calculators</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Scientific Health Calculation,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
              Validated & Free
            </span>
          </h1>

          {/* Description */}
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
            Research-backed calculators for body composition, metabolic energy, cardiovascular risk, renal function, and maternal health—calculated instantly in your browser with 100% data privacy.
          </p>

          {/* Hero Search Bar */}
          <div className="max-w-2xl mx-auto pt-2">
            <div className="relative flex items-center bg-white rounded-2xl shadow-xl shadow-slate-950/20 border border-slate-100 p-1.5">
              <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search calculators (e.g. BMI, calories, water, GFR, diabetes, blood pressure)..."
                className="w-full text-sm sm:text-base px-3 py-2 text-slate-900 placeholder-slate-400 bg-transparent border-0 focus:outline-hidden focus:ring-0"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-1 text-slate-400 hover:text-slate-600 mr-2 rounded-lg"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => {
                  const el = document.getElementById("calculator-directory");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold transition shrink-0 shadow-sm shadow-emerald-700/30"
              >
                Find Tool
              </button>
            </div>

            {/* Quick search tags */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-slate-300">
              <span className="text-slate-400">Quick searches:</span>
              {["BMI", "TDEE", "Blood Pressure", "Body Fat", "GFR", "Due Date", "Diabetes"].map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setSearchQuery(term);
                    const el = document.getElementById("calculator-directory");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-2.5 py-0.5 rounded-full bg-slate-800/80 hover:bg-emerald-900/60 hover:text-emerald-300 border border-slate-700 transition"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Trust points */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto border-t border-slate-800 text-xs text-slate-300">
            <div className="flex items-center justify-center gap-1.5 py-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>WHO & CDC Aligned</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 py-1">
              <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Private (No Ads)</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 py-1">
              <Award className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Peer-Reviewed Formulas</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 py-1">
              <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Results Under 30s</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Flagship Tools Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-500" />
              <span>Essential Health Benchmarks</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              The four foundational metrics every individual should evaluate regularly
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredCalculators.map((calc) => {
            const Icon = calc.icon;
            return (
              <Link
                key={calc.id}
                href={calc.href}
                className="group relative bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {calc.metric}
                    </span>
                  </div>

                  <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block mb-1">
                    {calc.tag}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition">
                    {calc.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                    {calc.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-600 group-hover:text-emerald-700">
                  <span>Calculate now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Main Interactive Directory Section */}
      <section id="calculator-directory" className="space-y-6 pt-4">
        {/* Header & Controls */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
                <LayoutGrid className="w-6 h-6 text-emerald-600" />
                <span>All Health Calculators</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {filteredCalculators.length} available
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Browse our complete index of peer-reviewed formulas across six medical disciplines
              </p>
            </div>

            {/* Quick search inside directory if user scrolled */}
            <div className="relative sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Filter tools..."
                className="w-full text-xs pl-9 pr-7 py-2 rounded-xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {CALCULATOR_CATEGORIES.map((cat) => {
              const Icon = categoryIconMap[cat.id] || LayoutGrid;
              const isSelected = selectedCategory === cat.id;
              const count = cat.id === "all"
                ? CALCULATORS.length
                : cat.id === "popular"
                ? CALCULATORS.filter(c => c.popular).length
                : CALCULATORS.filter(c => c.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-150 ${
                    isSelected
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20 font-semibold"
                      : "bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-white" : "text-slate-500"}`} />
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}

            {/* Bookmarked/Favorites tab */}
            {mounted && favorites.length > 0 && (
              <button
                onClick={() => setSelectedCategory("favorites")}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-150 ${
                  selectedCategory === "favorites"
                    ? "bg-amber-500 text-white shadow-md shadow-amber-500/20 font-semibold"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                <Star className={`w-3.5 h-3.5 ${selectedCategory === "favorites" ? "fill-white text-white" : "fill-amber-400 text-amber-400"}`} />
                <span>My Saved</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedCategory === "favorites" ? "bg-white/20 text-white" : "bg-amber-100 text-amber-800"
                }`}>
                  {favorites.length}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Results Grid */}
        {filteredCalculators.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">No calculators found</h3>
            <p className="text-xs text-slate-500 mt-1">
              We couldn't find any tools matching "{searchQuery}". Try a broader term or reset filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-500 transition"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCalculators.map((calc) => {
              const Icon = categoryIconMap[calc.category] || Scale;
              const isFav = favorites.includes(calc.id);

              const badgeStyles = {
                emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
                blue: "bg-blue-50 text-blue-700 border-blue-200",
                amber: "bg-amber-50 text-amber-700 border-amber-200",
                rose: "bg-rose-50 text-rose-700 border-rose-200",
                purple: "bg-purple-50 text-purple-700 border-purple-200",
                red: "bg-red-50 text-red-700 border-red-200",
              }[calc.badgeColor || "emerald"];

              return (
                <Link
                  key={calc.id}
                  href={calc.href}
                  className="group relative bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-emerald-300 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    {/* Card Top Row: Badge, Standard & Star */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${badgeStyles}`}>
                          {calc.badge}
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium bg-slate-50 px-2 py-0.5 rounded border border-slate-100 truncate max-w-[170px]">
                          {calc.standard}
                        </span>
                      </div>

                      <button
                        onClick={(e) => toggleFavorite(calc.id, e)}
                        className={`p-1.5 rounded-lg text-slate-300 hover:text-amber-400 hover:bg-slate-100 transition shrink-0 ${
                          isFav ? "text-amber-400 fill-amber-400" : ""
                        }`}
                        title={isFav ? "Remove from saved" : "Save calculator"}
                        aria-label="Save calculator"
                      >
                        <Star className={`w-4 h-4 ${isFav ? "fill-amber-400 text-amber-400" : ""}`} />
                      </button>
                    </div>

                    {/* Icon & Title */}
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 text-slate-700 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition leading-snug">
                          {calc.title}
                        </h3>
                        <span className="text-[11px] text-slate-400 font-medium">
                          {calc.categoryName}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mt-1">
                      {calc.desc}
                    </p>
                  </div>

                  {/* Card Bottom Row */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="inline-flex items-center gap-1 text-slate-400 text-[11px]">
                      <Clock className="w-3 h-3" />
                      {calc.time}
                    </span>
                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 group-hover:text-emerald-700">
                      Calculate
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* Clinical Reference Standards Banner */}
      <section className="bg-slate-50 border border-slate-200/90 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/60 px-2.5 py-1 rounded-md mb-2">
            <Award className="w-3.5 h-3.5" />
            Medical Grade Methodologies
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            How Our Health Algorithms Are Formulated
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
            Every calculator on HealthCalculators is implemented from published, peer-reviewed clinical research and institutional consensus statements.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Metabolic & Caloric Calculations
            </h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Mifflin-St Jeor and Katch-McArdle equations validated by the Academy of Nutrition and Dietetics to possess a ±5% accuracy band against indirect calorimetry.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Cardiovascular Staging
            </h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              American Heart Association (AHA) and American College of Cardiology (ACC) 2017 clinical practice guidelines for blood pressure and ASCVD risk stratification.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Renal & Laboratory Formulas
            </h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              CKD-EPI 2021 race-free eGFR equation recommended by the National Kidney Foundation and American Society of Nephrology, plus standard Cockcroft-Gault CrCl.
            </p>
          </div>
        </div>
      </section>

      {/* Educational Guides Section */}
      <section className="bg-gradient-to-tr from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Evidence-Based Library
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Deepen Your Health Literacy
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Read comprehensive clinical breakdowns on how to interpret body composition, optimize macronutrient ratios, and identify cardiovascular risk markers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              href="/blog"
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold text-center transition flex items-center justify-center gap-2 shadow-sm"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore Health Articles</span>
            </Link>
            <Link
              href="/about"
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-medium text-center border border-slate-700 transition"
            >
              Our Mission & Authors
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
