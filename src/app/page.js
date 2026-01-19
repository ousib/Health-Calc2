"use client";
import Link from 'next/link';

export default function Home() {
  // We list your calculators here to keep the HTML clean and easy to edit
  const calculators = [
    // Body & Weight Calculators
    { 
      href: "/bmi-calculator", 
      title: "BMI Calculator", 
      tag: "Body", 
      tagClass: "tag-fit",
      icon: "fa-chart-line", 
      desc: "Calculate your Body Mass Index and see where you fall on the health scale." 
    },
    { 
      href: "/body-fat-calculator", 
      title: "Body Fat %", 
      tag: "Body", 
      tagClass: "tag-fit",
      icon: "fa-percentage", 
      desc: "Estimate your body fat percentage using the Navy Tape Measure method." 
    },
    { 
      href: "/ibw-calculator", 
      title: "Ideal Weight (IBW)", 
      tag: "Body", 
      tagClass: "tag-med",
      icon: "fa-balance-scale", 
      desc: "Determine your healthy weight goal using medically recognized formulas." 
    },
    { 
      href: "/lbm-calculator", 
      title: "Lean Body Mass", 
      tag: "Body", 
      tagClass: "tag-fit",
      icon: "fa-dumbbell", 
      desc: "Calculate your lean body mass for better fitness tracking." 
    },
    { 
      href: "/waist-hip-ratio", 
      title: "Waist-to-Hip Ratio", 
      tag: "Body", 
      tagClass: "tag-med",
      icon: "fa-ruler-combined", 
      desc: "Assess body fat distribution and health risks." 
    },
    { 
      href: "/bsa-calculator", 
      title: "Body Surface Area", 
      tag: "Medical", 
      tagClass: "tag-med",
      icon: "fa-square", 
      desc: "Calculate body surface area for medical dosage calculations." 
    },
    { 
      href: "/pregnancy-weight-gain-calculator", 
      title: "Pregnancy Weight Gain", 
      tag: "Pregnancy", 
      tagClass: "tag-preg",
      icon: "fa-baby-carriage", 
      desc: "Healthy weight gain recommendations during pregnancy." 
    },

    // Nutrition & Energy Calculators
    { 
      href: "/calorie-calculator", 
      title: "Calorie Calculator", 
      tag: "Nutrition", 
      tagClass: "tag-fit",
      icon: "fa-fire", 
      desc: "Determine daily calories needed for weight loss, maintenance, or gain." 
    },
    { 
      href: "/tdee-calculator", 
      title: "TDEE & Macros", 
      tag: "Nutrition", 
      tagClass: "tag-fit",
      icon: "fa-chart-pie", 
      desc: "Get your Total Daily Energy Expenditure and ideal protein/carb/fat split." 
    },
    { 
      href: "/bmr-calculator", 
      title: "BMR Calculator", 
      tag: "Energy", 
      tagClass: "tag-med",
      icon: "fa-bed", 
      desc: "Find your Basal Metabolic Rate—the calories you burn at total rest." 
    },
    { 
      href: "/nutritional-needs", 
      title: "Nutritional Needs", 
      tag: "Nutrition", 
      tagClass: "tag-med",
      icon: "fa-apple-alt", 
      desc: "Comprehensive nutritional assessment for optimal health." 
    },
    { 
      href: "/carbohydrate-intake-calculator", 
      title: "Carbohydrate Intake", 
      tag: "Nutrition", 
      tagClass: "tag-fit",
      icon: "fa-bread-slice", 
      desc: "Calculate optimal daily carbohydrate intake for your goals." 
    },
    { 
      href: "/fat-intake-calculator", 
      title: "Fat Intake", 
      tag: "Nutrition", 
      tagClass: "tag-fit",
      icon: "fa-oil-can", 
      desc: "Determine healthy fat intake for balanced nutrition." 
    },
    { 
      href: "/water-intake-calculator", 
      title: "Water Intake", 
      tag: "Health", 
      tagClass: "tag-med",
      icon: "fa-tint", 
      desc: "Calculate daily water requirements for optimal hydration." 
    },

    // Medical & Clinical Calculators
    { 
      href: "/gfr-calculator", 
      title: "GFR Calculator", 
      tag: "Medical", 
      tagClass: "tag-med",
      icon: "fa-kidneys", 
      desc: "Estimate Glomerular Filtration Rate for kidney function assessment." 
    },
    { 
      href: "/creatinine-clearance", 
      title: "Creatinine Clearance", 
      tag: "Medical", 
      tagClass: "tag-med",
      icon: "fa-vial", 
      desc: "Calculate creatinine clearance rate for renal function evaluation." 
    },
    { 
      href: "/medication-dosage", 
      title: "Medication Dosage", 
      tag: "Medical", 
      tagClass: "tag-med",
      icon: "fa-pills", 
      desc: "Calculate proper medication dosages based on patient factors." 
    },
    { 
      href: "/electrolyte-correction", 
      title: "Electrolyte Correction", 
      tag: "Medical", 
      tagClass: "tag-med",
      icon: "fa-atom", 
      desc: "Calculate electrolyte replacement for imbalances." 
    },
    { 
      href: "/anion-gap-calculator", 
      title: "Anion Gap", 
      tag: "Medical", 
      tagClass: "tag-med",
      icon: "fa-calculator", 
      desc: "Calculate anion gap for metabolic acidosis assessment." 
    },
    { 
      href: "/fluid-requirement", 
      title: "Fluid Requirement", 
      tag: "Medical", 
      tagClass: "tag-med",
      icon: "fa-flask", 
      desc: "Calculate daily fluid requirements for patients." 
    },

    // Cardiovascular Calculators
    { 
      href: "/heart-rate-calculator", 
      title: "Heart Rate Zones", 
      tag: "Cardio", 
      tagClass: "tag-fit",
      icon: "fa-heart", 
      desc: "Calculate your target heart rate zones for optimal exercise." 
    },
    { 
      href: "/cardiac-index-calculator", 
      title: "Cardiac Index", 
      tag: "Medical", 
      tagClass: "tag-med",
      icon: "fa-heartbeat", 
      desc: "Calculate cardiac index for cardiovascular assessment." 
    },
    { 
      href: "/blood-pressure-category-calculator", 
      title: "BP Category", 
      tag: "Cardio", 
      tagClass: "tag-med",
      icon: "fa-tachometer-alt", 
      desc: "Determine your blood pressure category and health risks." 
    },
    { 
      href: "/blood-pressure-tracker", 
      title: "Blood Pressure Tracker", 
      tag: "Cardio", 
      tagClass: "tag-med",
      icon: "fa-chart-line", 
      desc: "Track and monitor your blood pressure readings over time." 
    },

    // Women's Health Calculators
    { 
      href: "/ovulation-tracker", 
      title: "Ovulation Tracker", 
      tag: "Women", 
      tagClass: "tag-preg",
      icon: "fa-calendar-alt", 
      desc: "Track ovulation cycles and fertile days." 
    },
    { 
      href: "/pregnancy-due-date-calculator", 
      title: "Due Date Calculator", 
      tag: "Pregnancy", 
      tagClass: "tag-preg",
      icon: "fa-baby", 
      desc: "Calculate your estimated due date for pregnancy." 
    },
    { 
      href: "/pregnancy-test", 
      title: "Pregnancy Test", 
      tag: "Pregnancy", 
      tagClass: "tag-preg",
      icon: "fa-clipboard-check", 
      desc: "Tools and information for pregnancy testing." 
    },
    { 
      href: "/fertile-window-calculator", 
      title: "Fertile Window", 
      tag: "Women", 
      tagClass: "tag-preg",
      icon: "fa-calendar-check", 
      desc: "Calculate your most fertile days for conception planning." 
    },
    { 
      href: "/safe-period-calculator", 
      title: "Safe Period", 
      tag: "Women", 
      tagClass: "tag-preg",
      icon: "fa-shield-alt", 
      desc: "Calculate safe period for natural family planning." 
    },
    { 
      href: "/period-cycle-calculator", 
      title: "Period Cycle", 
      tag: "Women", 
      tagClass: "tag-preg",
      icon: "fa-history", 
      desc: "Track and predict your menstrual cycle." 
    },

    // Risk Assessment Calculators
    { 
      href: "/diabetes-risk-calculator", 
      title: "Diabetes Risk", 
      tag: "Risk", 
      tagClass: "tag-med",
      icon: "fa-syringe", 
      desc: "Assess your risk for developing type 2 diabetes." 
    },
    { 
      href: "/heart-disease-risk-calculator", 
      title: "Heart Disease Risk", 
      tag: "Risk", 
      tagClass: "tag-med",
      icon: "fa-heartbeat", 
      desc: "Evaluate your risk factors for cardiovascular disease." 
    }
  ];

  return (
    <>
      <section className="hero">
        <h1>Scientific Health Tools</h1>
        <p>Accurate, research-backed calculators to help you track fitness, monitor health risks, and plan your wellness journey.</p>
        <div className="hero-features">
          <div className="feature">
            <i className="fas fa-mobile-alt"></i>
            <span>Fully Responsive Design</span>
          </div>
          <div className="feature">
            <i className="fas fa-heartbeat"></i>
            <span>Medical Grade Accuracy</span>
          </div>
          <div className="feature">
            <i className="fas fa-user-md"></i>
            <span>Clinically Validated</span>
          </div>
        </div>
      </section>

      <div className="category-section">
        <h2><i className="fas fa-weight"></i> Body & Weight</h2>
        <div className="calc-grid">
          {calculators.filter(calc => ['Body', 'Medical'].includes(calc.tag)).map((calc, index) => (
            <Link href={calc.href} key={index} className="calc-card">
              <span className={`tag ${calc.tagClass}`}>{calc.tag}</span>
              <h3><i className={`fas ${calc.icon}`}></i> {calc.title}</h3>
              <p>{calc.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="category-section">
        <h2><i className="fas fa-apple-alt"></i> Nutrition & Energy</h2>
        <div className="calc-grid">
          {calculators.filter(calc => ['Nutrition', 'Energy', 'Health'].includes(calc.tag)).map((calc, index) => (
            <Link href={calc.href} key={index} className="calc-card">
              <span className={`tag ${calc.tagClass}`}>{calc.tag}</span>
              <h3><i className={`fas ${calc.icon}`}></i> {calc.title}</h3>
              <p>{calc.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="category-section">
        <h2><i className="fas fa-stethoscope"></i> Medical & Clinical</h2>
        <div className="calc-grid">
          {calculators.filter(calc => calc.tag === 'Medical').map((calc, index) => (
            <Link href={calc.href} key={index} className="calc-card">
              <span className={`tag ${calc.tagClass}`}>{calc.tag}</span>
              <h3><i className={`fas ${calc.icon}`}></i> {calc.title}</h3>
              <p>{calc.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="category-section">
        <h2><i className="fas fa-heartbeat"></i> Cardiovascular</h2>
        <div className="calc-grid">
          {calculators.filter(calc => calc.tag === 'Cardio').map((calc, index) => (
            <Link href={calc.href} key={index} className="calc-card">
              <span className={`tag ${calc.tagClass}`}>{calc.tag}</span>
              <h3><i className={`fas ${calc.icon}`}></i> {calc.title}</h3>
              <p>{calc.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="category-section">
        <h2><i className="fas fa-female"></i> Women's Health</h2>
        <div className="calc-grid">
          {calculators.filter(calc => ['Women', 'Pregnancy'].includes(calc.tag)).map((calc, index) => (
            <Link href={calc.href} key={index} className="calc-card">
              <span className={`tag ${calc.tagClass}`}>{calc.tag}</span>
              <h3><i className={`fas ${calc.icon}`}></i> {calc.title}</h3>
              <p>{calc.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="category-section">
        <h2><i className="fas fa-clipboard-check"></i> Risk Assessment</h2>
        <div className="calc-grid">
          {calculators.filter(calc => calc.tag === 'Risk').map((calc, index) => (
            <Link href={calc.href} key={index} className="calc-card">
              <span className={`tag ${calc.tagClass}`}>{calc.tag}</span>
              <h3><i className={`fas ${calc.icon}`}></i> {calc.title}</h3>
              <p>{calc.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}