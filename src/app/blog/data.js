export const blogPosts = [
  {
    id: 1,
    slug: "complete-guide-to-bmi",
    title: "Complete Guide to BMI: Understanding Your Body Mass Index Score",
    excerpt:
      "Learn how BMI is calculated, its clinical applications, limitations regarding muscular athletes, and how to combine it with waist-to-hip ratio.",
    category: "Body Composition",
    date: "March 15, 2026",
    readTime: "7 min read",
    tags: ["BMI", "Weight Management", "WHO Standards", "Health Screening"],
    relatedCalculators: [
      { name: "BMI Calculator", href: "/bmi-calculator" },
      { name: "Body Fat Percentage", href: "/body-fat-calculator" },
      { name: "Waist-to-Hip Ratio", href: "/waist-hip-ratio" },
    ],
    sections: [
      {
        id: "what-is-bmi",
        heading: "What Is Body Mass Index (BMI)?",
        body: `Body Mass Index (BMI) is a standardized anthropometric screening ratio that compares body weight to height squared. Originally formulated by Belgian statistician Adolphe Quetelet in the 1830s and adopted globally by the World Health Organization (WHO) and Centers for Disease Control and Prevention (CDC), BMI provides a rapid, non-invasive way to screen populations for underweight, overweight, and obesity-related metabolic risks.

In metric units, BMI equals weight in kilograms divided by height in meters squared (kg/m²). In imperial units, it is calculated as weight in pounds divided by height in inches squared, multiplied by 703.`,
      },
      {
        id: "bmi-categories",
        heading: "WHO & CDC BMI Classification Ranges",
        body: `For adults aged 20 years and older, the WHO and CDC interpret BMI using uniform threshold bands regardless of sex:

• Underweight (Below 18.5 kg/m²): May indicate inadequate caloric intake, nutrient malabsorption, hyperthyroidism, or low lean mass.
• Normal / Healthy Weight (18.5 – 24.9 kg/m²): Statistically associated with the lowest all-cause mortality and cardiometabolic risk in general populations.
• Overweight (25.0 – 29.9 kg/m²): Linked to moderately elevated risk for hypertension, dyslipidemia, and insulin resistance—especially when accompanied by elevated waist circumference.
• Obesity Class I (30.0 – 34.9 kg/m²), Class II (35.0 – 39.9 kg/m²), and Class III (40.0+ kg/m²): Progressively higher risk for type 2 diabetes, sleep apnea, osteoarthritis, and cardiovascular events.

Note that WHO Asia-Pacific guidelines often use lower thresholds (23.0 kg/m² for overweight and 25.0 kg/m² for obesity) because visceral fat and insulin resistance can occur at lower BMI values in Asian populations.`,
      },
      {
        id: "limitations",
        heading: "Clinical Limitations of BMI",
        body: `BMI measures total excess weight relative to height—not body composition. Because skeletal muscle is significantly denser than adipose tissue, BMI has well-documented blind spots:

• Muscular Athletes: Strength athletes and bodybuilders frequently score above 25 or even 30 kg/m² despite having low body fat percentages.
• Sarcopenic Obesity ("Normal-Weight Obesity"): Older adults or sedentary individuals with low muscle mass and high visceral fat can score inside the 18.5–24.9 range while still carrying elevated metabolic risk.
• Fat Distribution Blindness: BMI cannot tell whether fat is stored subcutaneously in the hips/thighs or viscerally around the liver and pancreas.`,
      },
      {
        id: "complementary-metrics",
        heading: "Better Together: Combining BMI with Other Metrics",
        body: `Clinicians rarely rely on BMI in isolation. Pairing your BMI with waist-to-hip ratio (WHR), waist circumference, or a U.S. Navy body fat estimate clarifies whether elevated weight stems from muscle or visceral fat. Tracking trends monthly alongside fasting glucose, HbA1c, lipid panels, and resting blood pressure provides a reliable picture of long-term cardiometabolic health.`,
      },
    ],
    references: [
      "World Health Organization (WHO) — Obesity and Overweight Fact Sheet",
      "CDC — Defining Adult Overweight & Obesity",
    ],
  },
  {
    id: 2,
    slug: "body-fat-percentage-guide",
    title: "Body Fat Percentage: Why It Matters More Than Your Weight",
    excerpt:
      "Why the scale does not tell the whole story. Explore fat distribution, essential fat ranges, and how the U.S. Navy method compares with DEXA scans.",
    category: "Body Composition",
    date: "March 12, 2026",
    readTime: "8 min read",
    tags: ["Body Fat", "Body Composition", "U.S. Navy Method", "DEXA"],
    relatedCalculators: [
      { name: "Body Fat Percentage", href: "/body-fat-calculator" },
      { name: "Lean Body Mass", href: "/lbm-calculator" },
      { name: "BMI Calculator", href: "/bmi-calculator" },
    ],
    sections: [
      {
        id: "why-body-fat-matters",
        heading: "Why Body Composition Outperforms Scale Weight",
        body: `Two individuals can share the exact same height and scale weight yet have completely different metabolic profiles. Body fat percentage separates total body mass into adipose tissue (fat mass) and fat-free mass (skeletal muscle, bone mineral, organs, and water). Retaining lean muscle mass supports resting metabolic rate, insulin sensitivity, and bone density as you age.`,
      },
      {
        id: "ace-ranges",
        heading: "Healthy Body Fat Ranges (ACE Guidelines)",
        body: `The American Council on Exercise (ACE) categorizes adult body fat ranges differently for men and women because women carry higher essential fat for reproductive and endocrine function:

• Essential Fat: 2–5% (Men) | 10–13% (Women) — Minimum physiological fat needed to protect organs and hormone synthesis.
• Athletes: 6–13% (Men) | 14–20% (Women)
• Fitness: 14–17% (Men) | 21–24% (Women)
• Acceptable / Average: 18–24% (Men) | 25–31% (Women)
• Obesity Threshold: 25%+ (Men) | 32%+ (Women)`,
      },
      {
        id: "measurement-methods",
        heading: "Comparing Body Fat Measurement Methods",
        body: `• U.S. Navy Circumference Method (Hodgdon & Beckett): Uses neck, waist, and hip (for women) measurements alongside height. Accuracy is typically within ±3–4% when measured consistently in the morning.
• DEXA Scan: Dual-energy X-ray absorptiometry measures bone, lean tissue, and fat with ±1–2% precision, though hydration shifts still influence lean-mass readings.
• Bioelectrical Impedance (BIA Smart Scales): Estimates total body water to infer fat mass (±3–5%). Results fluctuate significantly after workouts, salty meals, or dehydration.`,
      },
      {
        id: "improving-composition",
        heading: "Evidence-Based Ways to Improve Body Composition",
        body: `To lower fat mass while preserving lean muscle, pair progressive resistance training (2–4 sessions weekly) with a moderate energy deficit (300–500 kcal below TDEE) and sufficient daily protein (1.6–2.2 g per kg of body weight). Chronic crash dieting without strength training causes rapid lean mass loss and slows metabolic expenditure.`,
      },
    ],
    references: [
      "American Council on Exercise (ACE) — Percent Body Fat Norms",
      "Hodgdon JA, Beckett MB — Naval Health Research Center Equations",
    ],
  },
  {
    id: 3,
    slug: "basal-metabolic-rate-guide",
    title: "Basal Metabolic Rate: How Many Calories Do You Really Need?",
    excerpt:
      "Deep dive into the Mifflin-St Jeor formula vs. Harris-Benedict, how lean body mass drives cellular energy, and how to calculate your true BMR.",
    category: "Nutrition & Metabolism",
    date: "March 10, 2026",
    readTime: "6 min read",
    tags: ["BMR", "Mifflin-St Jeor", "Metabolism", "Calories"],
    relatedCalculators: [
      { name: "BMR Calculator", href: "/bmr-calculator" },
      { name: "TDEE Calculator", href: "/tdee-calculator" },
      { name: "Daily Calorie Calculator", href: "/calorie-calculator" },
    ],
    sections: [
      {
        id: "what-is-bmr",
        heading: "What Is Basal Metabolic Rate (BMR)?",
        body: `Basal Metabolic Rate (BMR) represents the minimum energy—measured in kilocalories per 24 hours—required to keep vital physiological processes running at complete physical and digestive rest. Even if you stayed in bed all day, your brain, liver, heart, kidneys, and cellular ion pumps consume roughly 60% to 75% of your total daily calories.`,
      },
      {
        id: "mifflin-vs-harris",
        heading: "Mifflin-St Jeor vs. Harris-Benedict Equations",
        body: `Two equations dominate clinical nutrition:

• Mifflin-St Jeor (1990): Validated by the Academy of Nutrition and Dietetics as the most accurate predictive equation for modern populations (within ±10% of indirect calorimetry for most adults).
  - Men: (10 × weight_kg) + (6.25 × height_cm) − (5 × age) + 5
  - Women: (10 × weight_kg) + (6.25 × height_cm) − (5 × age) − 161
• Revised Harris-Benedict (1984): An update to the classic 1919 formula; tends to overestimate resting energy expenditure slightly in overweight individuals.
• Katch-McArdle Formula: Uses Lean Body Mass (370 + 21.6 × LBM_kg), making it ideal for lean athletes who know their body fat percentage.`,
      },
      {
        id: "never-eat-below-bmr",
        heading: "Why BMR Is Not Your Weight-Loss Calorie Target",
        body: `A common dieting mistake is setting daily calorie intake equal to or below BMR. Your body also burns energy through walking, digestion, posture, and structured workouts (captured in your TDEE). Consuming far below BMR accelerates muscle loss, increases fatigue, and triggers adaptive thermogenesis, making long-term maintenance harder.`,
      },
    ],
    references: [
      "Mifflin MD et al. — Am J Clin Nutr (1990)",
      "Academy of Nutrition and Dietetics — Evidence Analysis Library",
    ],
  },
  {
    id: 4,
    slug: "ideal-weight-calculator-guide",
    title: "Ideal Weight Calculator: Beyond the Height-Weight Tables",
    excerpt:
      "Compare Devine, Robinson, and Miller equations and learn what clinical pharmacology considers the optimal baseline weight for dosing and health.",
    category: "Body Composition",
    date: "March 8, 2026",
    readTime: "6 min read",
    tags: ["Ideal Body Weight", "Devine Formula", "Clinical Dosing"],
    relatedCalculators: [
      { name: "Ideal Body Weight (IBW)", href: "/ibw-calculator" },
      { name: "BMI Calculator", href: "/bmi-calculator" },
      { name: "Medication Dosage", href: "/medication-dosage-calculator" },
    ],
    sections: [
      {
        id: "origin-of-ibw",
        heading: "Why Were Ideal Body Weight Formulas Invented?",
        body: `Unlike BMI, which grew out of population epidemiology, classic Ideal Body Weight (IBW) formulas were created primarily for clinical pharmacology and anesthesia. Physicians needed a reliable estimate of lean organ mass relative to height so hydrophilic medications (like aminoglycosides or tidal volume ventilator settings) would not overdose patients with excess adipose tissue.`,
      },
      {
        id: "comparing-equations",
        heading: "Devine, Robinson, Miller, and Hamwi Compared",
        body: `All four major IBW formulas start from a baseline weight at 5 feet (60 inches) and add an increment per additional inch:

• Devine (1974): Men: 50.0 kg + 2.3 kg/in over 5 ft | Women: 45.5 kg + 2.3 kg/in over 5 ft. Still the standard in renal clearance and ICU ventilation.
• Robinson (1983): Men: 52.0 kg + 1.9 kg/in | Women: 49.0 kg + 1.7 kg/in. Slightly narrower slope across extreme heights.
• Miller (1983): Men: 56.2 kg + 1.41 kg/in | Women: 53.1 kg + 1.36 kg/in. Tends to estimate higher targets for shorter adults.
• Hamwi (1964): Men: 48.0 kg + 2.7 kg/in | Women: 45.5 kg + 2.2 kg/in.`,
      },
      {
        id: "healthy-range-vs-single-number",
        heading: "Treat IBW as a Reference Range, Not a Rigid Rule",
        body: `No single formula accounts for bone frame size, athletic muscle hypertrophy, or healthy genetic variation. Rather than chasing one exact kilogram from Devine's equation, use the healthy BMI range (18.5–24.9 kg/m²) alongside waist circumference and functional fitness markers.`,
      },
    ],
    references: [
      "Devine BJ — Drug Intell Clin Pharm (1974)",
      "Pai MP, Paloucek FP — Ann Pharmacother (2000)",
    ],
  },
  {
    id: 5,
    slug: "waist-to-hip-ratio-guide",
    title: "Waist-to-Hip Ratio: The Hidden Indicator of Metabolic Health",
    excerpt:
      "Why visceral abdominal fat poses a greater cardiovascular risk than subcutaneous fat, and how WHO Waist-to-Hip Ratio cutoffs assess risk.",
    category: "Cardiovascular",
    date: "March 5, 2026",
    readTime: "6 min read",
    tags: ["Waist-to-Hip Ratio", "Visceral Fat", "Metabolic Syndrome"],
    relatedCalculators: [
      { name: "Waist-to-Hip Ratio", href: "/waist-hip-ratio" },
      { name: "Heart Disease Risk", href: "/heart-disease-risk-calculator" },
      { name: "Diabetes Risk Score", href: "/diabetes-risk-calculator" },
    ],
    sections: [
      {
        id: "visceral-vs-subcutaneous",
        heading: "Apple vs. Pear Shape: Visceral vs. Subcutaneous Fat",
        body: `Where your body stores adipose tissue strongly shapes your cardiometabolic risk. Subcutaneous fat stored around the hips and thighs (gynoid distribution) is relatively inert metabolically. By contrast, visceral fat packed deep inside the abdominal cavity around the liver, pancreas, and intestines releases inflammatory cytokines and free fatty acids directly into the portal vein, driving insulin resistance and hypertension.`,
      },
      {
        id: "how-to-measure",
        heading: "How to Measure Waist and Hip Circumference Accurately",
        body: `Follow the WHO measurement protocol with a non-stretch flexible tape measure while standing relaxed:

• Waist Circumference: Measure midway between the lowest palpable rib and the top of the iliac crest (hip bone), at the end of a normal exhalation—do not suck in your stomach.
• Hip Circumference: Measure around the widest portion of the buttocks with feet together and the tape parallel to the floor.
• Formula: WHR = Waist Circumference ÷ Hip Circumference.`,
      },
      {
        id: "who-cutoffs",
        heading: "WHO Cardiovascular Risk Thresholds",
        body: `The World Health Organization defines abdominal obesity (substantially increased metabolic risk) as:

• Men: WHR ≥ 0.90 (Low risk < 0.90; Moderate 0.90–0.99; High ≥ 1.00)
• Women: WHR ≥ 0.85 (Low risk < 0.80; Moderate 0.80–0.84; High ≥ 0.85)

Even if your BMI falls within the normal range, an elevated WHR signals the need for targeted aerobic exercise, strength training, and metabolic screening.`,
      },
    ],
    references: [
      "World Health Organization (WHO) — Waist Circumference and Waist-Hip Ratio Expert Consultation",
    ],
  },
  {
    id: 6,
    slug: "heart-rate-zones-guide",
    title: "Understanding Your Heart Rate Zones for Optimal Training",
    excerpt:
      "Master the Karvonen formula to calculate Zone 2 aerobic base training, lactate threshold, and peak VO2 max intervals for cardiovascular fitness.",
    category: "Cardiovascular",
    date: "March 3, 2026",
    readTime: "7 min read",
    tags: ["Heart Rate Zones", "Karvonen Formula", "Zone 2", "Cardio"],
    relatedCalculators: [
      { name: "Heart Rate Zones", href: "/heart-rate-calculator" },
      { name: "Blood Pressure Staging", href: "/blood-pressure-category-calculator" },
      { name: "Calorie Calculator", href: "/calorie-calculator" },
    ],
    sections: [
      {
        id: "max-hr-and-karvonen",
        heading: "Why Heart Rate Reserve (Karvonen) Beats Simple % Max HR",
        body: `Basic formulas take a percentage of estimated Max Heart Rate (such as 220 − age or Tanaka's 208 − 0.7 × age), ignoring fitness level. The Karvonen method incorporates your Resting Heart Rate (RHR) to compute Heart Rate Reserve (HRR = HRmax − RHR):

Target HR = (HRR × Intensity %) + RHR

Because endurance-trained individuals often have lower resting heart rates (45–55 bpm vs. 70–80 bpm), Karvonen zones personalize effort much more accurately.`,
      },
      {
        id: "five-zones-explained",
        heading: "The 5 Heart Rate Training Zones Explained",
        body: `• Zone 1 (50–60% HRR — Active Recovery): Gentle walking or cooldowns; promotes circulation without fatigue.
• Zone 2 (60–70% HRR — Aerobic Base): Conversational pace ("talk test"). Maximizes mitochondrial density, fat oxidation, and stroke volume.
• Zone 3 (70–80% HRR — Tempo / Aerobic Power): Sustainable rhythmic effort; improves capillary networks and glycogen efficiency.
• Zone 4 (80–90% HRR — Lactate Threshold): Challenging pace where lactate accumulation accelerates; raises sustainable speed.
• Zone 5 (90–100% HRR — VO2 Max Intervals): Short maximal repeats (1–4 minutes) that push peak oxygen uptake.`,
      },
      {
        id: "safety-considerations",
        heading: "Medication & Sensor Caveats",
        body: `Beta-blockers, certain calcium-channel blockers, and stimulants alter heart rate independently of exertion. If you take rate-controlling cardiovascular medication, use the Rating of Perceived Exertion (RPE 1–10) or physician-prescribed targets instead of age-predicted formulas.`,
      },
    ],
    references: [
      "American College of Sports Medicine (ACSM) — Guidelines for Exercise Testing and Prescription",
      "Tanaka H et al. — J Am Coll Cardiol (2001)",
    ],
  },
  {
    id: 7,
    slug: "water-intake-calculator-guide",
    title: "Water Intake Calculator: How Much Water Should You Really Drink?",
    excerpt:
      "Demystifying the '8 glasses a day' myth. How body weight, sweat rate, climate, and dietary moisture determine your true daily hydration target.",
    category: "Nutrition & Metabolism",
    date: "March 1, 2026",
    readTime: "5 min read",
    tags: ["Hydration", "Water Intake", "Fluid Balance", "Electrolytes"],
    relatedCalculators: [
      { name: "Water Intake Calculator", href: "/water-intake-calculator" },
      { name: "Clinical Fluid Requirement", href: "/fluid-requirement" },
      { name: "Electrolyte Correction", href: "/electrolyte-correction" },
    ],
    sections: [
      {
        id: "beyond-eight-glasses",
        heading: "Why '8 Glasses a Day' Is Only a Rough Starting Point",
        body: `The common 8×8 rule (eight 8-oz glasses, ~1.9 liters) ignores body mass, environmental heat, and physical exertion. The National Academies of Sciences, Engineering, and Medicine (NASEM) recommends an average total daily water intake of about 3.7 liters (125 oz) for men and 2.7 liters (91 oz) for women—which includes moisture from fruits, vegetables, soups, coffee, and tea (roughly 20% of total intake).`,
      },
      {
        id: "weight-and-activity-math",
        heading: "Weight-Based & Exercise Adjustments",
        body: `A practical clinical baseline is 30–35 mL of fluid per kilogram of body weight (~0.5 oz per pound). From there:

• Exercise Sweat Loss: Add roughly 400–800 mL per hour of moderate-to-vigorous exercise depending on humidity and sweat rate.
• Hot/Dry Climates & Altitude: Respiratory and insensible skin water losses increase noticeably at high altitude (>2,500 m) or temperatures above 30°C (86°F).
• Pregnancy & Lactation: Fluid needs rise by ~300 mL/day during pregnancy and ~700 mL/day while breastfeeding.`,
      },
      {
        id: "electrolyte-balance",
        heading: "Monitoring Hydration Without Overhydrating",
        body: `Pale straw-colored urine is the simplest bedside hydration check. Drinking excessive plain water during multi-hour endurance events without sodium replacement can dilute blood sodium (exercise-associated hyponatremia). Patients with heart failure, advanced chronic kidney disease, or SIADH should always follow physician-prescribed fluid restrictions.`,
      },
    ],
    references: [
      "National Academies of Sciences, Engineering, and Medicine — Dietary Reference Intakes for Water",
    ],
  },
  {
    id: 8,
    slug: "tdee-complete-guide",
    title: "TDEE Explained: Your Complete Guide to Total Daily Energy Expenditure",
    excerpt:
      "Breakdown of BMR, TEF, NEAT, and Exercise Activity—and how to set a realistic caloric deficit or surplus without metabolic burnout.",
    category: "Nutrition & Metabolism",
    date: "February 28, 2026",
    readTime: "7 min read",
    tags: ["TDEE", "NEAT", "Fat Loss", "Calorie Balance"],
    relatedCalculators: [
      { name: "TDEE Calculator", href: "/tdee-calculator" },
      { name: "BMR Calculator", href: "/bmr-calculator" },
      { name: "Daily Calorie Calculator", href: "/calorie-calculator" },
    ],
    sections: [
      {
        id: "four-components",
        heading: "The Four Components of Total Daily Energy Expenditure",
        body: `Your Total Daily Energy Expenditure (TDEE) is the sum of every calorie your body burns in 24 hours across four distinct components:

1. Basal Metabolic Rate (BMR, ~60–70%): Vital organ maintenance at rest.
2. Non-Exercise Activity Thermogenesis (NEAT, ~15–20%): Daily steps, fidgeting, standing, chores, and occupational movement. NEAT explains why two people of identical weight can differ by 400+ calories per day.
3. Thermic Effect of Food (TEF, ~10%): Energy spent digesting and absorbing nutrients (highest for protein at 20–30%, lowest for fats at 0–3%).
4. Exercise Activity Thermogenesis (EAT, ~5–15%): Intentional gym workouts, running, cycling, or sports.`,
      },
      {
        id: "activity-multipliers",
        heading: "Choosing the Right Activity Multiplier",
        body: `Overestimating activity is the #1 reason calorie plans stall:

• Sedentary (1.2× BMR): Desk job, <4,000 steps/day, little formal exercise.
• Lightly Active (1.375× BMR): Light exercise 1–3 days/week or 5,000–7,000 daily steps.
• Moderately Active (1.55× BMR): Moderate workouts 3–5 days/week or 7,500–10,000 steps.
• Very Active (1.725× BMR): Hard training 6–7 days/week or physically demanding labor.`,
      },
      {
        id: "applying-tdee",
        heading: "Applying TDEE to Fat Loss or Muscle Gain",
        body: `• Sustainable Fat Loss: Subtract 300–500 kcal/day from TDEE (~0.3–0.5 kg / 0.5–1 lb per week) while keeping protein high.
• Lean Muscle Gain: Add a conservative 200–300 kcal/day surplus paired with progressive strength training to minimize unwanted fat accumulation.
• Calibration Rule: Track your rolling 14-day weight average; if weight doesn't move after 2–3 weeks, adjust intake by 150–200 kcal.`,
      },
    ],
    references: [
      "Levine JA — Non-Exercise Activity Thermogenesis (NEAT), Best Pract Res Clin Endocrinol Metab",
    ],
  },
  {
    id: 9,
    slug: "diabetes-risk-assessment",
    title: "Diabetes Risk Assessment: Understanding Your Numbers",
    excerpt:
      "Evidence-based risk factors for insulin resistance, prediabetes screening thresholds, HbA1c ranges, and preventive lifestyle protocols.",
    category: "Risk Assessment",
    date: "February 25, 2026",
    readTime: "6 min read",
    tags: ["Diabetes Risk", "Prediabetes", "HbA1c", "Metabolic Health"],
    relatedCalculators: [
      { name: "Diabetes Risk Score", href: "/diabetes-risk-calculator" },
      { name: "Waist-to-Hip Ratio", href: "/waist-hip-ratio" },
      { name: "BMI Calculator", href: "/bmi-calculator" },
    ],
    sections: [
      {
        id: "non-invasive-screening",
        heading: "How Diabetes Risk Scores Identify Early Prediabetes",
        body: `More than one in three adults with prediabetes are unaware of it because early insulin resistance rarely causes overt symptoms. Validated risk tools (modeled on ADA and FINDRISC questionnaires) combine age, BMI, waist circumference, family history, physical inactivity, hypertension, and prior gestational diabetes to identify who benefits most from laboratory blood glucose testing.`,
      },
      {
        id: "diagnostic-lab-thresholds",
        heading: "ADA Diagnostic Laboratory Thresholds",
        body: `While online questionnaires estimate risk, only lab blood tests diagnose prediabetes or diabetes:

• Normal: HbA1c < 5.7% | Fasting Plasma Glucose < 100 mg/dL
• Prediabetes: HbA1c 5.7% – 6.4% | Fasting Plasma Glucose 100 – 125 mg/dL
• Diabetes: HbA1c ≥ 6.5% | Fasting Plasma Glucose ≥ 126 mg/dL (confirmed on repeat testing)`,
      },
      {
        id: "prevention-evidence",
        heading: "Reversing Progression Through Lifestyle",
        body: `Landmark Diabetes Prevention Program (DPP) clinical trials demonstrated that losing 5% to 7% of starting body weight and accumulating 150 minutes/week of moderate physical activity reduced progression from prediabetes to type 2 diabetes by 58%. Resistance training directly increases GLUT4 glucose transporters in skeletal muscle, improving insulin sensitivity even before major scale changes occur.`,
      },
    ],
    references: [
      "American Diabetes Association (ADA) — Standards of Care in Diabetes",
      "CDC — National Diabetes Prevention Program",
    ],
  },
  {
    id: 10,
    slug: "macro-calculator-guide",
    title: "Macro Calculator: Perfecting Your Protein, Carb, and Fat Balance",
    excerpt:
      "How to customize protein, carbohydrate, and dietary fat targets based on hypertrophy, endurance pacing, or balanced metabolic health.",
    category: "Nutrition & Metabolism",
    date: "February 22, 2026",
    readTime: "7 min read",
    tags: ["Macronutrients", "Protein", "Carbohydrates", "Dietary Fat"],
    relatedCalculators: [
      { name: "Protein Intake Calculator", href: "/protein-intake-calculator" },
      { name: "Carbohydrate Intake", href: "/carbohydrate-intake-calculator" },
      { name: "Fat Intake Calculator", href: "/fat-intake-calculator" },
    ],
    sections: [
      {
        id: "calories-per-gram",
        heading: "The Caloric Math Behind Macronutrients",
        body: `Every calorie you eat comes from macronutrients (plus alcohol if consumed):

• Protein: 4 kcal per gram — Essential amino acids for muscle synthesis, enzymes, immune function, and high satiety.
• Carbohydrates: 4 kcal per gram — Primary rapid fuel for high-intensity exercise, brain function, and thyroid conversion; fiber supports gut microbiome health.
• Dietary Fats: 9 kcal per gram — Crucial for cell membranes, fat-soluble vitamins (A, D, E, K), and steroid hormone production.`,
      },
      {
        id: "setting-macro-targets",
        heading: "A Step-by-Step Framework for Setting Your Macros",
        body: `Rather than relying on arbitrary percentages (which break down at very low or very high calorie intakes), sports dietitians prioritize targets by body weight:

1. Anchor Protein First: 1.2–1.6 g/kg for general active health; 1.6–2.2 g/kg for resistance training or fat-loss phases to protect lean tissue.
2. Set Minimum Healthy Fats: At least 0.6–0.9 g/kg (roughly 20–35% of calories), prioritizing monounsaturated and omega-3 sources while keeping saturated fat modest.
3. Fill Remaining Calories with Carbohydrates: High-volume endurance athletes need 5–8 g/kg; recreational lifters typically thrive on 2.5–4.5 g/kg.`,
      },
      {
        id: "food-quality-still-matters",
        heading: "Macronutrients vs. Micronutrients",
        body: `Hitting exact macro grams with ultra-processed foods leaves gaps in potassium, magnesium, fiber, and polyphenols. Aim for 80–90% whole, minimally processed foods (lean proteins, legumes, vegetables, whole grains, nuts, and olive oil) within your macro budget.`,
      },
    ],
    references: [
      "International Society of Sports Nutrition (ISSN) — Position Stand on Diets and Body Composition",
      "USDA Dietary Guidelines for Americans",
    ],
  },
  {
    id: 11,
    slug: "pregnancy-weight-gain-guide",
    title: "Pregnancy Weight Gain: Healthy Guidelines by Trimester",
    excerpt:
      "Institute of Medicine (IOM) gestational weight milestones for singleton and twin pregnancies based on pre-pregnancy BMI.",
    category: "Women's Health",
    date: "February 20, 2026",
    readTime: "6 min read",
    tags: ["Pregnancy", "IOM Guidelines", "Maternal Health", "Due Date"],
    relatedCalculators: [
      { name: "Pregnancy Weight Gain", href: "/pregnancy-weight-gain-calculator" },
      { name: "Pregnancy Due Date", href: "/pregnancy-due-date-calculator" },
      { name: "BMI Calculator", href: "/bmi-calculator" },
    ],
    sections: [
      {
        id: "iom-targets",
        heading: "IOM Recommended Total Weight Gain by Pre-Pregnancy BMI",
        body: `The Institute of Medicine (IOM) and American College of Obstetricians and Gynecologists (ACOG) tailor gestational weight targets to your starting BMI before conception:

• Underweight (BMI < 18.5): 28 – 40 lbs (12.5 – 18 kg)
• Normal Weight (BMI 18.5 – 24.9): 25 – 35 lbs (11.5 – 16 kg)
• Overweight (BMI 25.0 – 29.9): 15 – 25 lbs (7 – 11.5 kg)
• Obese (BMI ≥ 30.0): 11 – 20 lbs (5 – 9 kg)

For twin pregnancies, recommendations increase (e.g., 37–54 lbs for normal pre-pregnancy BMI).`,
      },
      {
        id: "trimester-pacing",
        heading: "How Weight Distributes Across Trimesters",
        body: `• First Trimester (Weeks 1–12): Minimal gain of 1–4.5 lbs (0.5–2 kg) total; no extra calories are typically needed yet.
• Second & Third Trimesters: Steady gain of roughly 0.8–1.0 lb/week for normal BMI (~0.5 lb/week for overweight/obese BMI). Caloric needs increase modestly by ~340 kcal/day in the second trimester and ~450 kcal/day in the third trimester.

Remember that healthy pregnancy weight includes the baby (~7.5 lbs), placenta (~1.5 lbs), amniotic fluid (~2 lbs), uterine growth, expanded blood volume (~4 lbs), and maternal nutrient stores—not just body fat.`,
      },
      {
        id: "when-to-contact-ob",
        heading: "When to Consult Your Obstetric Provider",
        body: `Sudden rapid weight jumps accompanied by facial/hand swelling, severe headaches, or vision changes should be evaluated promptly by an obstetric clinician to rule out preeclampsia. Always coordinate individualized nutrition goals with your prenatal care team.`,
      },
    ],
    references: [
      "Institute of Medicine (IOM) — Weight Gain During Pregnancy: Reexamining the Guidelines",
      "ACOG Committee Opinion — Weight Gain During Pregnancy",
    ],
  },
  {
    id: 12,
    slug: "childrens-bmi-guide",
    title: "Children's BMI: Understanding Percentiles and Growth Patterns",
    excerpt:
      "Why pediatric growth cannot be evaluated with adult BMI cutoffs, and how CDC age-and-sex percentiles track healthy development.",
    category: "Pediatrics",
    date: "February 18, 2026",
    readTime: "5 min read",
    tags: ["Pediatrics", "BMI Percentiles", "CDC Growth Charts"],
    relatedCalculators: [
      { name: "BMI Calculator", href: "/bmi-calculator" },
      { name: "Nutritional Needs", href: "/Nutritional-needs" },
      { name: "Medication Dosage", href: "/medication-dosage-calculator" },
    ],
    sections: [
      {
        id: "why-percentiles",
        heading: "Why Children and Teens Use Percentiles Instead of Fixed Cutoffs",
        body: `While BMI uses the same weight ÷ height² arithmetic for children and teens aged 2 to 19, body fat changes dramatically as kids grow and enter puberty. A BMI of 18 kg/m² means something completely different for a 6-year-old boy versus a 16-year-old girl. Therefore, pediatricians plot BMI on CDC BMI-for-age growth charts specific to biological sex and age in months.`,
      },
      {
        id: "cdc-percentile-bands",
        heading: "CDC Pediatric BMI-for-Age Categories",
        body: `• Underweight: Below the 5th percentile
• Healthy Weight: 5th percentile to less than the 85th percentile
• Overweight: 85th percentile to less than the 95th percentile
• Obesity: 95th percentile or greater

A percentile shows how a child's BMI compares to historical CDC reference peers—for example, the 60th percentile means the child's BMI is equal to or higher than 60% of peers of the same age and sex.`,
      },
      {
        id: "tracking-the-curve",
        heading: "Why Trajectory Matters More Than One Measurement",
        body: `Pediatricians focus on steady growth along a consistent percentile curve over years rather than isolated numbers. Rapid upward or downward crossing of two or more major percentile lines warrants a routine pediatric review. Never place a growing child on a restrictive diet without direct guidance from a pediatrician or pediatric dietitian.`,
      },
    ],
    references: [
      "CDC — About Child & Teen BMI Growth Charts",
      "American Academy of Pediatrics (AAP) — Clinical Practice Guideline for Childhood Obesity",
    ],
  },
  {
    id: 13,
    slug: "heart-disease-risk-guide",
    title: "Heart Disease Risk Calculator: What Your Score Means",
    excerpt:
      "A comprehensive walk-through of Framingham and ACC/AHA ASCVD cardiovascular risk estimation, lipid markers, and modifiable lifestyle factors.",
    category: "Cardiovascular",
    date: "February 15, 2026",
    readTime: "7 min read",
    tags: ["ASCVD", "Cardiovascular Risk", "Cholesterol", "Blood Pressure"],
    relatedCalculators: [
      { name: "Heart Disease Risk", href: "/heart-disease-risk-calculator" },
      { name: "Blood Pressure Staging", href: "/blood-pressure-category-calculator" },
      { name: "Blood Pressure Tracker", href: "/blood-pressure-tracker" },
    ],
    sections: [
      {
        id: "understanding-10-year-risk",
        heading: "What Does a 10-Year Cardiovascular Risk Score Measure?",
        body: `Cardiovascular risk calculators (rooted in the Framingham Heart Study and the ACC/AHA Pooled Cohort Equations) estimate the statistical probability that an adult without pre-existing heart disease will experience a major atherosclerotic cardiovascular event (ASCVD)—such as a heart attack or stroke—over the next 10 years.`,
      },
      {
        id: "key-inputs",
        heading: "The Core Inputs Driving Your Score",
        body: `• Non-Modifiable Factors: Chronological age (strongest statistical predictor) and biological sex.
• Blood Pressure: Systolic pressure and whether you require antihypertensive medication. Keeping BP below 120/80 mmHg markedly lowers risk.
• Lipid Profile: Total cholesterol, protective HDL cholesterol, and atherogenic LDL / non-HDL cholesterol.
• Metabolic & Lifestyle Factors: Smoking status and diabetes diagnosis, both of which sharply accelerate arterial plaque progression.`,
      },
      {
        id: "risk-categories-and-action",
        heading: "Interpreting Risk Categories (ACC/AHA)",
        body: `• Low Risk (<5%): Focus on heart-healthy nutrition, 150+ min/week aerobic activity, and avoiding tobacco.
• Borderline (5% – 7.4%) & Intermediate (7.5% – 19.9%): Warrants detailed clinician discussion of risk-enhancing factors (family history, Lp(a), hs-CRP, or coronary calcium scoring) and potential preventive therapy.
• High Risk (≥20%): Requires structured medical management of blood pressure, lipids, and glycemic control.`,
      },
    ],
    references: [
      "ACC/AHA Guideline on the Primary Prevention of Cardiovascular Disease",
      "Framingham Heart Study — General Cardiovascular Risk Profile",
    ],
  },
  {
    id: 14,
    slug: "body-type-calculator-guide",
    title: "Body Type Calculator: Ectomorph, Mesomorph, or Endomorph?",
    excerpt:
      "Scientific perspective on somatotypes, skeletal frame proportions, metabolic tendencies, and how to tailor training around your physiology.",
    category: "Body Composition",
    date: "February 12, 2026",
    readTime: "5 min read",
    tags: ["Somatotypes", "Frame Size", "Fitness", "Strength Training"],
    relatedCalculators: [
      { name: "Ideal Body Weight (IBW)", href: "/ibw-calculator" },
      { name: "Lean Body Mass", href: "/lbm-calculator" },
      { name: "TDEE Calculator", href: "/tdee-calculator" },
    ],
    sections: [
      {
        id: "what-are-somatotypes",
        heading: "The Science and Limits of Somatotypes",
        body: `Developed by psychologist William Sheldon in the 1940s and later refined by Heath-Carter anthropometric ratings in sports science, somatotyping describes three general structural tendencies:

• Ectomorph: Narrower clavicles and hips, longer limbs, lighter skeletal frame; often experiences higher NEAT and difficulty gaining weight.
• Mesomorph: Broader shoulders relative to waist, denser musculoskeletal frame; responds rapidly to resistance training.
• Endomorph: Wider hip/rib structure and greater natural energy-storage tendency; benefits strongly from consistent step counts and higher-protein satiety strategies.`,
      },
      {
        id: "blended-traits",
        heading: "Most People Are a Combination—And Traits Can Change",
        body: `Almost nobody is 100% one pure somatotype. In Heath-Carter scoring, every person has a three-number rating (e.g., 3-5-2). Crucially, while skeletal bone widths do not change, muscle hypertrophy and body-fat reduction shift your functional somatotype substantially over time.`,
      },
      {
        id: "practical-takeaways",
        heading: "Practical Training & Nutrition Takeaways",
        body: `Rather than letting a label limit your expectations, focus on objective measurements: track your TDEE, adjust calorie surplus or deficit based on 2-week weight trends, prioritize progressive overload in strength training, and use Lean Body Mass (LBM) and Waist-to-Hip Ratio to measure progress.`,
      },
    ],
    references: [
      "Carter JEL, Heath BH — Somatotyping: Development and Applications",
    ],
  },
  {
    id: 15,
    slug: "calorie-calculator-guide",
    title: "Calorie Calculator: Beyond the 2000-Calorie Standard",
    excerpt:
      "Why static nutrition-label percentages fail individual biology, and how dynamic energy calculation transforms sustainable weight management.",
    category: "Nutrition & Metabolism",
    date: "February 10, 2026",
    readTime: "6 min read",
    tags: ["Calorie Calculator", "Weight Loss", "Energy Balance", "Nutrition"],
    relatedCalculators: [
      { name: "Daily Calorie Calculator", href: "/calorie-calculator" },
      { name: "TDEE Calculator", href: "/tdee-calculator" },
      { name: "Protein Intake Calculator", href: "/protein-intake-calculator" },
    ],
    sections: [
      {
        id: "why-2000-fails",
        heading: "Why the 2,000-Calorie Label Is Misleading",
        body: `The "2,000 calories a day" reference on packaged food labels was created by the FDA in the 1990s as a uniform rounding benchmark—not a personal prescription. A 5'2" sedentary office worker may maintain weight on 1,550 kcal/day, whereas a 6'1" active construction worker or endurance athlete may lose weight eating 3,100 kcal/day.`,
      },
      {
        id: "personalized-calorie-targets",
        heading: "How Personalized Calorie Calculators Work",
        body: `An accurate calorie target combines two steps:

1. Estimate Resting Energy (BMR): Using Mifflin-St Jeor based on age, sex, height, and weight.
2. Apply Activity & Goal Adjustments: Multiply BMR by your lifestyle activity factor to get maintenance TDEE, then subtract 300–500 kcal for gradual fat loss or add 200–350 kcal for muscle hypertrophy.`,
      },
      {
        id: "avoiding-extreme-deficits",
        heading: "Avoiding Metabolic Adaptation and Rebound",
        body: `Aggressive 1,000+ calorie deficits trigger intense hunger hormones (ghrelin spikes), suppress NEAT movement subconsciously, and compromise micronutrient intake. Aiming for 0.5% to 1.0% of body weight change per week preserves energy, workout performance, and long-term adherence.`,
      },
    ],
    references: [
      "NIH — National Heart, Lung, and Blood Institute Aim for a Healthy Weight Guidelines",
      "Hall KD et al. — Quantification of the Effect of Energy Imbalance on Bodyweight",
    ],
  },
];

export function getPostBySlug(slug) {
  return blogPosts.find((p) => p.slug === slug) || null;
}