"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Scale,
  Apple,
  HeartPulse,
  Stethoscope,
  Flower2,
  ShieldAlert,
  Search,
  X,
  Menu,
  ChevronDown,
  ChevronRight,
  Sparkles,
  BookOpen,
  Info,
  Flame,
  ArrowRight
} from "lucide-react";
import { CALCULATORS, CALCULATOR_CATEGORIES } from "../data/calculatorsData";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [calcDropdownOpen, setCalcDropdownOpen] = useState(false);
  const [mobileActiveCategory, setMobileActiveCategory] = useState(null);
  
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setCalcDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard shortcut (Cmd+K / Ctrl+K) to open search
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchModalOpen(prev => !prev);
      } else if (e.key === "Escape") {
        setSearchModalOpen(false);
        setCalcDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus search input when modal opens
  useEffect(() => {
    if (searchModalOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    } else {
      setSearchQuery("");
    }
  }, [searchModalOpen]);

  // Prevent background scroll when modal or mobile menu is open
  useEffect(() => {
    if (searchModalOpen || mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [searchModalOpen, mobileMenuOpen]);

  // Filtered calculators for search modal
  const filteredCalculators = searchQuery.trim() === ""
    ? CALCULATORS.filter(c => c.popular).slice(0, 8)
    : CALCULATORS.filter(c =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.standard && c.standard.toLowerCase().includes(searchQuery.toLowerCase()))
      );

  const categoryIconMap = {
    body: Scale,
    nutrition: Apple,
    cardio: HeartPulse,
    clinical: Stethoscope,
    women: Flower2,
    risk: ShieldAlert,
  };

  const navCategories = [
    { id: "body", title: "Body & Weight", icon: Scale, count: CALCULATORS.filter(c => c.category === "body").length },
    { id: "nutrition", title: "Nutrition & Energy", icon: Apple, count: CALCULATORS.filter(c => c.category === "nutrition").length },
    { id: "cardio", title: "Cardiovascular", icon: HeartPulse, count: CALCULATORS.filter(c => c.category === "cardio").length },
    { id: "clinical", title: "Clinical & Labs", icon: Stethoscope, count: CALCULATORS.filter(c => c.category === "clinical").length },
    { id: "women", title: "Women's Health", icon: Flower2, count: CALCULATORS.filter(c => c.category === "women").length },
    { id: "risk", title: "Risk Prediction", icon: ShieldAlert, count: CALCULATORS.filter(c => c.category === "risk").length },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-all">
        {/* Top announcement / accuracy ribbon */}
        <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 hidden sm:block border-b border-slate-800">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                CLINICAL REFERENCE
              </span>
              <span>All 33+ calculators cross-referenced against WHO, CDC, AHA, and NIH standards</span>
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <span className="flex items-center gap-1 text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                100% Client-Side Privacy
              </span>
              <span className="text-slate-600">|</span>
              <Link href="/about" className="text-slate-300 hover:text-white transition">
                Methodology
              </Link>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center gap-3 group focus:outline-hidden"
              onClick={() => { setMobileMenuOpen(false); setCalcDropdownOpen(false); }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200">
                <Activity className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-emerald-700 transition">
                    Health<span className="text-emerald-600">Calculators</span>
                  </span>
                  <span className="hidden md:inline-block text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Pro
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 -mt-0.5 hidden sm:inline">
                  Evidence-Based Clinical Suite
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link
                href="/"
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition ${
                  pathname === "/"
                    ? "text-emerald-700 bg-emerald-50/80 font-semibold"
                    : "text-slate-700 hover:text-slate-950 hover:bg-slate-100/70"
                }`}
              >
                All Tools
              </Link>

              {/* Calculators Mega / Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setCalcDropdownOpen(prev => !prev)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium inline-flex items-center gap-1.5 transition ${
                    calcDropdownOpen
                      ? "text-emerald-700 bg-emerald-50"
                      : "text-slate-700 hover:text-slate-950 hover:bg-slate-100/70"
                  }`}
                  aria-expanded={calcDropdownOpen}
                >
                  <span>Categories</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${calcDropdownOpen ? "rotate-180 text-emerald-600" : "text-slate-400"}`} />
                </button>

                {calcDropdownOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[620px] bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                        Calculator Categories (33 Total)
                      </div>
                      <Link
                        href="/"
                        onClick={() => setCalcDropdownOpen(false)}
                        className="text-xs text-emerald-600 hover:text-emerald-700 font-medium inline-flex items-center gap-1"
                      >
                        Browse all directory <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      {navCategories.map((cat) => {
                        const Icon = cat.icon;
                        const sampleCalcs = CALCULATORS.filter(c => c.category === cat.id).slice(0, 2);
                        return (
                          <div
                            key={cat.id}
                            className="p-3 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/40 transition group cursor-pointer"
                            onClick={() => {
                              setCalcDropdownOpen(false);
                              window.location.href = `/#${cat.id}`;
                            }}
                          >
                            <div className="flex items-center gap-2.5 mb-1.5">
                              <div className="w-8 h-8 rounded-lg bg-emerald-100/60 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                <Icon className="w-4 h-4" />
                              </div>
                              <div>
                                <h4 className="text-sm font-semibold text-slate-900 group-hover:text-emerald-800 transition">
                                  {cat.title}
                                </h4>
                                <span className="text-[11px] text-slate-500">
                                  {cat.count} tools available
                                </span>
                              </div>
                            </div>
                            <div className="text-[11px] text-slate-500 pl-10 space-y-0.5">
                              {sampleCalcs.map(sc => (
                                <div key={sc.id} className="truncate text-slate-600">
                                  • {sc.title}
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span>Popular right now:</span>
                      <div className="flex items-center gap-2">
                        <Link
                          href="/bmi-calculator"
                          onClick={() => setCalcDropdownOpen(false)}
                          className="px-2 py-0.5 rounded-full bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 transition"
                        >
                          BMI
                        </Link>
                        <Link
                          href="/tdee-calculator"
                          onClick={() => setCalcDropdownOpen(false)}
                          className="px-2 py-0.5 rounded-full bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 transition"
                        >
                          TDEE
                        </Link>
                        <Link
                          href="/blood-pressure-category-calculator"
                          onClick={() => setCalcDropdownOpen(false)}
                          className="px-2 py-0.5 rounded-full bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 transition"
                        >
                          Blood Pressure
                        </Link>
                        <Link
                          href="/diabetes-risk-calculator"
                          onClick={() => setCalcDropdownOpen(false)}
                          className="px-2 py-0.5 rounded-full bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 transition"
                        >
                          Diabetes Risk
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Links */}
              <Link
                href="/bmi-calculator"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                  pathname === "/bmi-calculator"
                    ? "text-emerald-700 bg-emerald-50"
                    : "text-slate-700 hover:text-slate-950 hover:bg-slate-100/70"
                }`}
              >
                BMI
              </Link>

              <Link
                href="/tdee-calculator"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                  pathname === "/tdee-calculator"
                    ? "text-emerald-700 bg-emerald-50"
                    : "text-slate-700 hover:text-slate-950 hover:bg-slate-100/70"
                }`}
              >
                TDEE & Calorie
              </Link>

              <Link
                href="/blood-pressure-category-calculator"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                  pathname === "/blood-pressure-category-calculator"
                    ? "text-emerald-700 bg-emerald-50"
                    : "text-slate-700 hover:text-slate-950 hover:bg-slate-100/70"
                }`}
              >
                Blood Pressure
              </Link>

              <Link
                href="/blog"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition inline-flex items-center gap-1.5 ${
                  pathname.startsWith("/blog")
                    ? "text-emerald-700 bg-emerald-50 font-semibold"
                    : "text-slate-700 hover:text-slate-950 hover:bg-slate-100/70"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                <span>Health Guides</span>
              </Link>

              <Link
                href="/about"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition inline-flex items-center gap-1.5 ${
                  pathname === "/about"
                    ? "text-emerald-700 bg-emerald-50 font-semibold"
                    : "text-slate-700 hover:text-slate-950 hover:bg-slate-100/70"
                }`}
              >
                <Info className="w-3.5 h-3.5 text-slate-400" />
                <span>About</span>
              </Link>
            </nav>

            {/* Right side: Search trigger & Mobile toggle */}
            <div className="flex items-center gap-2.5">
              {/* Search button trigger */}
              <button
                onClick={() => setSearchModalOpen(true)}
                className="flex items-center gap-2.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-sm font-medium text-slate-500 bg-slate-100 hover:bg-slate-200/80 hover:text-slate-900 rounded-xl border border-slate-200 transition focus:outline-hidden focus:ring-2 focus:ring-emerald-500/40"
                aria-label="Search calculators"
              >
                <Search className="w-4 h-4 text-slate-400" />
                <span className="hidden sm:inline">Search 33+ calculators...</span>
                <span className="sm:hidden">Search</span>
                <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 bg-white border border-slate-200 rounded shadow-2xs">
                  ⌘K
                </kbd>
              </button>

              {/* Mobile hamburger button */}
              <button
                onClick={() => setMobileMenuOpen(prev => !prev)}
                className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-100 focus:outline-hidden"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-[65px] bottom-0 bg-white z-40 overflow-y-auto border-t border-slate-200 animate-in fade-in duration-150">
            <div className="p-4 space-y-4 max-w-lg mx-auto">
              {/* Mobile Search Button */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSearchModalOpen(true);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-500 bg-slate-100 rounded-xl border border-slate-200"
              >
                <Search className="w-5 h-5 text-slate-400" />
                <span>Search all 33 calculators...</span>
              </button>

              {/* Primary Mobile Links */}
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 text-center rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-800 font-semibold text-sm"
                >
                  All Calculators
                </Link>
                <Link
                  href="/blog"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 text-center rounded-xl bg-slate-50 border border-slate-100 text-slate-700 font-medium text-sm hover:bg-slate-100"
                >
                  Health Guides
                </Link>
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 text-center rounded-xl bg-slate-50 border border-slate-100 text-slate-700 font-medium text-sm hover:bg-slate-100"
                >
                  About & Validation
                </Link>
                <Link
                  href="/bmi-calculator"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 text-center rounded-xl bg-slate-50 border border-slate-100 text-slate-700 font-medium text-sm hover:bg-slate-100"
                >
                  Quick BMI Check
                </Link>
              </div>

              {/* Category Accordions */}
              <div className="pt-2 border-t border-slate-100">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 px-1">
                  Explore by Category
                </div>
                <div className="space-y-1.5">
                  {navCategories.map((cat) => {
                    const Icon = cat.icon;
                    const isExpanded = mobileActiveCategory === cat.id;
                    const catCalcs = CALCULATORS.filter(c => c.category === cat.id);

                    return (
                      <div key={cat.id} className="border border-slate-100 rounded-xl overflow-hidden">
                        <button
                          onClick={() => setMobileActiveCategory(isExpanded ? null : cat.id)}
                          className="w-full flex items-center justify-between p-3 text-left font-medium text-slate-800 hover:bg-slate-50 transition"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-emerald-100/70 text-emerald-700 flex items-center justify-center">
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-sm font-semibold">{cat.title}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-slate-400">
                            <span>{cat.count}</span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                          </div>
                        </button>

                        {isExpanded && (
                          <div className="bg-slate-50/70 px-3 py-2 border-t border-slate-100 space-y-1">
                            {catCalcs.map(calc => (
                              <Link
                                key={calc.id}
                                href={calc.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center justify-between py-2 px-2 text-xs font-medium text-slate-700 hover:text-emerald-700 hover:bg-white rounded-lg transition"
                              >
                                <span>{calc.title}</span>
                                <span className="text-[10px] text-slate-400">{calc.time}</span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Interactive Search Modal (⌘K) */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div 
            className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150"
            onClick={e => e.stopPropagation()}
          >
            {/* Input Header */}
            <div className="relative flex items-center px-4 py-3.5 border-b border-slate-100">
              <Search className="w-5 h-5 text-emerald-600 mr-3 shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search calculators (e.g., BMI, calories, water, GFR, diabetes, blood pressure)..."
                className="w-full text-base bg-transparent border-0 text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-0"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-600 mr-2"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setSearchModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 text-xs font-semibold px-2"
              >
                ESC
              </button>
            </div>

            {/* Results container */}
            <div className="max-h-[60vh] overflow-y-auto p-2">
              <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                {searchQuery ? `Matching Results (${filteredCalculators.length})` : "Popular Health Calculators"}
              </div>

              {filteredCalculators.length === 0 ? (
                <div className="py-12 text-center text-slate-500">
                  <p className="text-sm">No calculators matching "{searchQuery}"</p>
                  <p className="text-xs text-slate-400 mt-1">Try searching for "BMI", "energy", "creatinine", or "pregnancy"</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredCalculators.map(calc => {
                    const CatIcon = categoryIconMap[calc.category] || Activity;
                    return (
                      <Link
                        key={calc.id}
                        href={calc.href}
                        onClick={() => setSearchModalOpen(false)}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-emerald-50/70 hover:border-emerald-200 border border-transparent transition group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-9 h-9 rounded-lg bg-emerald-100/70 text-emerald-700 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                            <CatIcon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-semibold text-slate-900 group-hover:text-emerald-900 truncate">
                                {calc.title}
                              </h4>
                              <span className="text-[10px] font-medium px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-600">
                                {calc.categoryName}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 truncate mt-0.5">
                              {calc.desc}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-slate-400 shrink-0 ml-2">
                          <span className="hidden sm:inline text-[11px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                            {calc.standard}
                          </span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 text-slate-300 group-hover:text-emerald-600 transition" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Press <kbd className="px-1 py-0.5 bg-white border border-slate-200 rounded text-[10px]">ESC</kbd> to close
              </span>
              <span className="text-slate-400">
                33+ Clinical Calculators Indexed
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
