"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Search,
  Clock,
  ArrowRight,
  Sparkles,
  Calendar,
  ChevronRight,
  TrendingUp,
  Tag,
  CheckCircle2,
  X
} from 'lucide-react';

const BLOG_POSTS = [
  {
    id: 1,
    title: "Complete Guide to BMI: Understanding Your Body Mass Index Score",
    date: "March 15, 2024",
    readTime: "5 min read",
    category: "Body Composition",
    slug: "complete-guide-to-bmi",
    excerpt: "Learn how BMI is calculated, its clinical applications, limitations regarding muscular athletes, and how to use it alongside waist-to-hip ratio."
  },
  {
    id: 2,
    title: "Body Fat Percentage: Why It Matters More Than Your Weight",
    date: "March 12, 2024",
    readTime: "6 min read",
    category: "Body Composition",
    slug: "body-fat-percentage-guide",
    excerpt: "Why the scale doesn't tell the whole story. Explore fat distribution, essential fat ranges, and how the U.S. Navy circumference method compares with DEXA scans."
  },
  {
    id: 3,
    title: "Basal Metabolic Rate: How Many Calories Do You Really Need?",
    date: "March 10, 2024",
    readTime: "4 min read",
    category: "Nutrition & Metabolism",
    slug: "basal-metabolic-rate-guide",
    excerpt: "Deep dive into the Mifflin-St Jeor formula vs. Harris-Benedict, how lean body mass influences cellular energy, and how to calculate your true BMR."
  },
  {
    id: 4,
    title: "Ideal Weight Calculator: Beyond the Height-Weight Tables",
    date: "March 8, 2024",
    readTime: "5 min read",
    category: "Body Composition",
    slug: "ideal-weight-calculator-guide",
    excerpt: "Compare Devine, Robinson, and Miller equations and learn what clinical pharmacology considers the optimal baseline weight for dosing and longevity."
  },
  {
    id: 5,
    title: "Waist-to-Hip Ratio: The Hidden Indicator of Metabolic Health",
    date: "March 5, 2024",
    readTime: "4 min read",
    category: "Cardiovascular",
    slug: "waist-to-hip-ratio-guide",
    excerpt: "Why visceral android fat around internal organs poses a greater cardiovascular risk than subcutaneous fat, and WHO threshold cutoffs for men and women."
  },
  {
    id: 6,
    title: "Understanding Your Heart Rate Zones for Optimal Training",
    date: "March 3, 2024",
    readTime: "7 min read",
    category: "Cardiovascular",
    slug: "heart-rate-zones-guide",
    excerpt: "Master the Karvonen formula to calculate Zone 2 aerobic base training, anaerobic threshold, and peak VO2 max intervals for cardiovascular fitness."
  },
  {
    id: 7,
    title: "Water Intake Calculator: How Much Water Should You Really Drink?",
    date: "March 1, 2024",
    readTime: "4 min read",
    category: "Nutrition & Metabolism",
    slug: "water-intake-calculator-guide",
    excerpt: "Demystifying the '8 glasses a day' myth. How metabolic water production, activity sweating rates, and electrolyte balances dictate fluid intake."
  },
  {
    id: 8,
    title: "TDEE Explained: Your Complete Guide to Total Daily Energy Expenditure",
    date: "February 28, 2024",
    readTime: "6 min read",
    category: "Nutrition & Metabolism",
    slug: "tdee-complete-guide",
    excerpt: "Breakdown of BMR, TEF (Thermic Effect of Food), NEAT, and exercise activity. How to set a realistic caloric deficit without crashing thyroid output."
  },
  {
    id: 9,
    title: "Diabetes Risk Assessment: Understanding Your Numbers",
    date: "February 25, 2024",
    readTime: "5 min read",
    category: "Risk Assessment",
    slug: "diabetes-risk-assessment",
    excerpt: "Evidence-based risk factors for insulin resistance, prediabetes screening thresholds, HbA1c ranges, and preventive lifestyle protocols."
  },
  {
    id: 10,
    title: "Macro Calculator: Perfecting Your Protein, Carb, and Fat Balance",
    date: "February 22, 2024",
    readTime: "6 min read",
    category: "Nutrition & Metabolism",
    slug: "macro-calculator-guide",
    excerpt: "How to customize your macronutrient split based on physical goals: endurance pacing, hypertrophy, ketogenic adaptation, or balanced wellness."
  },
  {
    id: 11,
    title: "Pregnancy Weight Gain: Healthy Guidelines by Trimester",
    date: "February 20, 2024",
    readTime: "5 min read",
    category: "Women's Health",
    slug: "pregnancy-weight-gain-guide",
    excerpt: "Institute of Medicine (IOM) milestones for singleton and twin pregnancies, tracking fetal development, and maternal nutrition advice."
  },
  {
    id: 12,
    title: "Children's BMI: Understanding Percentiles and Growth Patterns",
    date: "February 18, 2024",
    readTime: "5 min read",
    category: "Pediatrics",
    slug: "childrens-bmi-guide",
    excerpt: "Why child growth cannot be evaluated with adult BMI charts. Understanding CDC age-and-gender percentiles and pediatric trajectory curves."
  },
  {
    id: 13,
    title: "Heart Disease Risk Calculator: What Your Score Means",
    date: "February 15, 2024",
    readTime: "6 min read",
    category: "Cardiovascular",
    slug: "heart-disease-risk-guide",
    excerpt: "A comprehensive walk-through of the Framingham and ACC/AHA ASCVD risk scores, lipid panel markers, systolic thresholds, and lifestyle risk factors."
  },
  {
    id: 14,
    title: "Body Type Calculator: Ectomorph, Mesomorph, or Endomorph?",
    date: "February 12, 2024",
    readTime: "4 min read",
    category: "Body Composition",
    slug: "body-type-calculator-guide",
    excerpt: "Scientific perspective on somatotypes, bone framing, metabolic tendencies, and how to structure training around your biological structure."
  },
  {
    id: 15,
    title: "Calorie Calculator: Beyond the 2000-Calorie Standard",
    date: "February 10, 2024",
    readTime: "5 min read",
    category: "Nutrition & Metabolism",
    slug: "calorie-calculator-guide",
    excerpt: "Why static nutritional label percentages fail individual biology, and how dynamic energy calculation transforms health outcomes."
  }
];

const CATEGORIES = ["all", "Body Composition", "Nutrition & Metabolism", "Cardiovascular", "Risk Assessment", "Women's Health"];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter(post => {
      const matchesCategory = selectedTag === "all" || post.category === selectedTag;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch = query === "" ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedTag]);

  return (
    <div className="space-y-10 pb-12">
      {/* Blog Hero Header */}
      <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8 sm:p-10 shadow-lg border border-slate-700/60 overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Health & Clinical Education Library</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Evidence-Based Health Guides
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Clinically referenced explanations of metabolic calculations, cardiovascular indicators, anthropometrics, and nutritional physiology.
          </p>

          {/* Search bar inside header */}
          <div className="pt-2">
            <div className="relative flex items-center bg-white rounded-xl shadow-md p-1 max-w-lg">
              <Search className="w-4 h-4 text-slate-400 ml-3 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search articles by title or keyword..."
                className="w-full text-xs sm:text-sm px-3 py-2 text-slate-900 placeholder-slate-400 bg-transparent border-0 focus:outline-hidden focus:ring-0"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-1 text-slate-400 hover:text-slate-600 mr-2"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedTag(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition ${
              selectedTag === cat
                ? "bg-emerald-600 text-white font-semibold shadow-xs"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {cat === "all" ? "All Topics (15)" : cat}
          </button>
        ))}
      </div>

      {/* Main Grid: Articles + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Article Cards (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 pb-1 border-b border-slate-200">
            <span>Showing {filteredPosts.length} articles</span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-emerald-600 hover:underline"
              >
                Clear filter
              </button>
            )}
          </div>

          {filteredPosts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center">
              <BookOpen className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <h3 className="text-base font-bold text-slate-800">No articles matched</h3>
              <p className="text-xs text-slate-500 mt-1">Try adjusting your search terms or selecting another category.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group block bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-lg hover:border-emerald-300 transition-all duration-150"
                >
                  <div className="flex items-center gap-2 mb-2 text-xs">
                    <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/70 text-[11px]">
                      {post.category}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500 inline-flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500 inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-600 group-hover:text-emerald-700">
                    <span>Read full article</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Quick Calculators Widget */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              Related Calculators
            </h4>
            <p className="text-xs text-slate-500">
              Apply the concepts from these articles with our interactive tools:
            </p>
            <div className="space-y-2 pt-1">
              {[
                { title: "BMI Calculator", href: "/bmi-calculator", sub: "WHO classification" },
                { title: "TDEE & Calorie Needs", href: "/tdee-calculator", sub: "Daily energy output" },
                { title: "Body Fat % (Navy)", href: "/body-fat-calculator", sub: "Circumference method" },
                { title: "Blood Pressure Category", href: "/blood-pressure-category-calculator", sub: "AHA/ACC 2017" },
                { title: "Type 2 Diabetes Risk", href: "/diabetes-risk-calculator", sub: "10-year score" }
              ].map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50 text-xs text-slate-800 hover:text-emerald-800 border border-slate-100 transition group"
                >
                  <div>
                    <div className="font-semibold">{c.title}</div>
                    <div className="text-[10px] text-slate-400">{c.sub}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition" />
                </Link>
              ))}
            </div>
          </div>

          {/* Verification Box */}
          <div className="bg-slate-900 text-slate-300 rounded-2xl p-5 space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Editorial Standard
            </div>
            <p className="text-xs leading-relaxed text-slate-300">
              Our articles are written and reviewed with clinical diligence, citing peer-reviewed literature, clinical guidelines from the WHO, CDC, AHA, and NIH.
            </p>
          </div>
        </aside>

      </div>
    </div>
  );
}
