// src/app/heart-rate-calculator/page.js
"use client";

import { useState, useEffect } from 'react';

export default function HeartRateCalculatorPage() {
  const [currentMethod, setCurrentMethod] = useState('karvonen');
  const [age, setAge] = useState('');
  const [restingHR, setRestingHR] = useState('');
  const [results, setResults] = useState(null);
  const [zones, setZones] = useState([]);
  const [maxHR, setMaxHR] = useState(0);
  const [hrr, setHrr] = useState(0);
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [currentZone, setCurrentZone] = useState(null);
  const [fitnessLevel, setFitnessLevel] = useState('beginner');

  // Styles
  const containerStyle = {
    width: '100%',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '20px',
    display: 'grid',
    gridTemplateColumns: showSidebar ? '1fr 320px' : '1fr',
    gap: '30px'
  };

  const calculatorBoxStyle = {
    background: 'white',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
    width: '100%'
  };

  const calcTitleStyle = {
    marginBottom: '10px',
    color: '#2c3e50',
    fontSize: 'clamp(1.8rem, 4vw, 2.2rem)',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  const calcDescStyle = {
    marginBottom: '25px',
    fontSize: 'clamp(0.95rem, 2vw, 1rem)',
    color: '#666',
    lineHeight: '1.6'
  };

  const inputGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '20px'
  };

  const inputGroupStyle = {
    marginBottom: '20px'
  };

  const inputGroupLabelStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: '600',
    marginBottom: '8px',
    color: '#34495e',
    fontSize: '0.95rem'
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    border: '2px solid #dfe6e9',
    borderRadius: '10px',
    fontSize: '1rem',
    outline: 'none',
    transition: 'all 0.3s'
  };

  const selectStyle = {
    width: '100%',
    padding: '14px 16px',
    border: '2px solid #dfe6e9',
    borderRadius: '10px',
    fontSize: '1rem',
    backgroundColor: 'white',
    cursor: 'pointer',
    outline: 'none',
    transition: 'all 0.3s'
  };

  const methodToggleStyle = {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    flexWrap: 'wrap'
  };

  const methodButtonStyle = {
    padding: '12px 20px',
    background: '#f1f3f5',
    border: '2px solid #dfe6e9',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.3s',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const activeMethodButtonStyle = {
    background: '#e74c3c',
    color: 'white',
    borderColor: '#e74c3c'
  };

  const calcBtnStyle = {
    width: '100%',
    padding: '16px',
    background: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: '0.3s',
    margin: '15px 0 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px'
  };

  const calcBtnHoverStyle = {
    background: '#c0392b',
    transform: 'translateY(-2px)',
    boxShadow: '0 5px 15px rgba(231, 76, 60, 0.2)'
  };

  const resultsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    margin: '30px 0'
  };

  const resultCardStyle = {
    padding: '25px',
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 3px 15px rgba(0,0,0,0.08)',
    borderTop: '5px solid'
  };

  const maxHRCardStyle = {
    borderTopColor: '#e74c3c'
  };

  const restingHRCardStyle = {
    borderTopColor: '#3498db'
  };

  const hrrCardStyle = {
    borderTopColor: '#27ae60'
  };

  const resultValueStyle = {
    fontSize: '2.5rem',
    fontWeight: '800',
    margin: '10px 0'
  };

  const hrVisualizationStyle = {
    margin: '30px 0',
    padding: '20px',
    background: 'white',
    borderRadius: '10px',
    boxShadow: '0 3px 10px rgba(0,0,0,0.05)'
  };

  const hrScaleStyle = {
    height: '40px',
    background: 'linear-gradient(90deg, #bdc3c7 0%, #bdc3c7 20%, #3498db 20%, #3498db 40%, #27ae60 40%, #27ae60 60%, #f39c12 60%, #f39c12 80%, #e74c3c 80%, #e74c3c 100%)',
    borderRadius: '20px',
    margin: '20px 0',
    position: 'relative'
  };

  const scaleLabelsStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.8rem',
    color: '#7f8c8d',
    marginTop: '5px'
  };

  const zoneMarkerStyle = {
    position: 'absolute',
    top: '-10px',
    width: '3px',
    height: '60px',
    background: '#2c3e50',
    borderRadius: '2px',
    transform: 'translateX(-1.5px)'
  };

  const zoneCardsStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '15px',
    marginTop: '20px'
  };

  const zoneCardStyle = {
    padding: '20px',
    borderRadius: '10px',
    color: 'white',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s',
    cursor: 'pointer'
  };

  const zoneCardHoverStyle = {
    transform: 'translateY(-5px)'
  };

  const zoneTableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    fontSize: '0.95rem',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 3px 10px rgba(0,0,0,0.05)'
  };

  const infoSectionStyle = {
    marginTop: '40px',
    borderTop: '1px solid #eee',
    paddingTop: '30px'
  };

  const sectionTitleStyle = {
    color: '#2c3e50',
    marginBottom: '15px',
    fontSize: '1.3rem',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  const paragraphStyle = {
    fontSize: '0.95rem',
    color: '#555',
    marginBottom: '15px',
    lineHeight: '1.7'
  };

  const formulaBoxStyle = {
    background: '#f1f3f5',
    padding: '20px',
    borderRadius: '10px',
    fontFamily: "'Courier New', monospace",
    textAlign: 'left',
    margin: '20px 0',
    fontSize: '0.95rem',
    borderLeft: '4px solid #e74c3c',
    overflowX: 'auto'
  };

  const sidebarStyle = {
    display: 'block',
    height: 'fit-content'
  };

  const sidebarContentStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    position: 'relative',
    height: '100%'
  };

  const sidebarAdStyle = {
    height: '250px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f8f9fa',
    border: '2px dashed #ddd',
    borderRadius: '10px',
    color: '#7f8c8d',
    padding: '15px'
  };

  const stickyAdStyle = {
    position: 'sticky',
    top: '20px',
    background: '#ffeaea',
    border: '2px solid #e74c3c',
    boxShadow: '0 4px 12px rgba(231, 76, 60, 0.15)',
    height: '250px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '15px',
    zIndex: '10'
  };

  const mobileAdsStyle = {
    display: 'none',
    margin: '30px 0',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px'
  };

  const mobileAdStyle = {
    padding: '20px',
    background: '#f8f9fa',
    borderRadius: '10px',
    textAlign: 'center',
    color: '#7f8c8d',
    border: '1px dashed #ddd',
    height: '250px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const stickyFooterAdStyle = {
    display: 'none',
    position: 'fixed',
    bottom: '0',
    left: '0',
    right: '0',
    background: '#f8f9fa',
    padding: '15px',
    borderTop: '2px solid #e74c3c',
    textAlign: 'center',
    zIndex: '1000',
    boxShadow: '0 -2px 10px rgba(0,0,0,0.1)'
  };

  const faqSectionStyle = {
    margin: '40px 0',
    padding: '30px',
    background: 'white',
    borderRadius: '15px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.05)'
  };

  const faqTitleStyle = {
    color: '#2c3e50',
    marginBottom: '25px',
    fontSize: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  const faqItemStyle = {
    marginBottom: '15px',
    border: '1px solid #dfe6e9',
    borderRadius: '10px',
    overflow: 'hidden'
  };

  const faqQuestionStyle = {
    padding: '20px',
    background: '#f8f9fa',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: '600',
    color: '#2c3e50',
    transition: 'background 0.3s'
  };

  const hoverFaqQuestionStyle = {
    background: '#e9ecef'
  };

  const faqAnswerStyle = {
    padding: '0 20px',
    maxHeight: '0',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    background: 'white'
  };

  const activeFaqAnswerStyle = {
    padding: '20px',
    maxHeight: '500px'
  };

  const calculatorsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: '12px',
    marginTop: '20px'
  };

  const calculatorCardStyle = {
    padding: '12px',
    background: '#f8f9fa',
    borderRadius: '8px',
    textAlign: 'center',
    textDecoration: 'none',
    color: '#2c3e50',
    fontSize: '0.85rem',
    transition: 'all 0.3s',
    border: '2px solid transparent'
  };

  const hoverCalculatorCardStyle = {
    background: '#e74c3c',
    color: 'white',
    transform: 'translateY(-2px)',
    boxShadow: '0 3px 10px rgba(231, 76, 60, 0.2)',
    borderColor: '#e74c3c'
  };

  const medicalDisclaimerStyle = {
    margin: '40px 0',
    padding: '25px',
    background: '#e8f5e9',
    borderRadius: '10px',
    borderLeft: '5px solid #27ae60',
    fontSize: '0.9rem',
    color: '#666'
  };

  const disclaimerTitleStyle = {
    color: '#2e7d32',
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  const trainingTipsStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px',
    margin: '25px 0'
  };

  const tipCardStyle = {
    padding: '20px',
    background: 'white',
    borderRadius: '10px',
    borderLeft: '4px solid #3498db',
    boxShadow: '0 3px 10px rgba(0,0,0,0.05)'
  };

  // ALL calculators from your list
  const healthCalculators = [
    { name: "BMI Calculator", link: "/bmi-calculator" },
    { name: "Body Fat Calculator", link: "/body-fat-calculator" },
    { name: "Ideal Weight Calculator", link: "/ibw-calculator" },
    { name: "Waist-Hip Ratio", link: "/waist-hip-ratio" },
    { name: "BSA Calculator", link: "/bsa-calculator" },
    { name: "Calorie Calculator", link: "/calorie-calculator" },
    { name: "TDEE Calculator", link: "/tdee-calculator" },
    { name: "BMR Calculator", link: "/bmr-calculator" },
    { name: "Lean Body Mass Calculator", link: "/lbm-calculator" },
    { name: "Heart Rate Calculator", link: "/heart-rate-calculator" },
    { name: "Water Intake Calculator", link: "/water-intake-calculator" },
    { name: "Ovulation Tracker", link: "/ovulation-tracker" },
    { name: "Pregnancy Due Date", link: "/pregnancy-due-date-calculator" },
    { name: "GFR Calculator", link: "/gfr-calculator" },
    { name: "Creatinine Clearance", link: "/creatinine-clearance" },
    { name: "Fluid Requirement", link: "/fluid-requirement" },
    { name: "Medication Dosage", link: "/medication-dosage" },
    { name: "Electrolyte Correction", link: "/electrolyte-correction" },
    { name: "Nutritional Needs", link: "/nutritional-needs" },
    { name: "Cardiac Index Calculator", link: "/cardiac-index-calculator" },
    { name: "Pregnancy Weight Gain", link: "/pregnancy-weight-gain-calculator" },
    { name: "Fertile Window", link: "/fertile-window-calculator" },
    { name: "Safe Period Calculator", link: "/safe-period-calculator" },
    { name: "Period Cycle Calculator", link: "/period-cycle-calculator" },
    { name: "Blood Pressure Category", link: "/blood-pressure-category-calculator" },
    { name: "Diabetes Risk Calculator", link: "/diabetes-risk-calculator" },
    { name: "Heart Disease Risk", link: "/heart-disease-risk-calculator" },
    { name: "Carbohydrate Intake", link: "/carbohydrate-intake-calculator" },
    { name: "Fat Intake Calculator", link: "/fat-intake-calculator" },
    { name: "Anion Gap Calculator", link: "/anion-gap-calculator" },
    { name: "Pregnancy Test", link: "/pregnancy-test" },
    { name: "Blood Pressure Tracker", link: "/blood-pressure-tracker" }
  ];

  const faqs = [
    {
      question: "What's the scientific difference between Karvonen Formula and simple percentage-based heart rate zone calculations, and which method provides superior accuracy for athletic performance optimization?",
      answer: "The Karvonen Formula incorporates individual resting heart rate (RHR) into heart rate reserve (HRR) calculations: HRR = Maximum HR - Resting HR. Training zones are then calculated as: Target HR = (HRR × Intensity %) + RHR. This method provides 15-20% greater accuracy than simple percentage methods because it accounts for individual autonomic nervous system function and cardiovascular efficiency. Simple methods (like 220-age) assume uniform physiological responses across populations, ignoring individual variations in vagal tone, training status, and genetic predisposition. For athletic populations, Karvonen's method delivers superior precision because it personalizes intensity prescription based on actual physiological capacity rather than population averages. Research demonstrates Karvonen-based training produces 12-18% better performance outcomes in endurance athletes compared to simple percentage methods."
    },
    {
      question: "How do beta-blockers and other cardiovascular medications affect heart rate zone calculations, and what adjustments should medically managed patients make for accurate exercise prescription?",
      answer: "Cardiovascular medications significantly alter heart rate responses: 1) Beta-blockers (metoprolol, atenolol) reduce maximum HR by 20-30%, resting HR by 15-25%, and blunt exercise HR response. 2) Calcium channel blockers (amlodipine, diltiazem) may reduce HR by 10-15% with less predictable effects. 3) Digoxin can unpredictably affect HR response through vagal stimulation. 4) Antiarrhythmics create complex, individualized HR effects. For medically managed patients: 1) Use perceived exertion (Borg Scale 6-20) as primary intensity guide, 2) Consider blood pressure response and symptoms over HR targets, 3) Consult prescribing physician for medication-specific exercise guidance, 4) Use talk test (able to speak in short sentences) as intensity indicator, 5) Progress conservatively with physician monitoring. Never adjust medication doses to achieve HR targets without medical supervision."
    },
    {
      question: "What are the optimal weekly training zone distributions for different fitness goals: fat loss, endurance improvement, cardiovascular health, and athletic performance enhancement?",
      answer: "Optimal training zone distributions vary by goal: 1) Fat Loss: 70% Zone 2 (maximal fat oxidation at 60-70% VO2max), 20% Zone 3, 10% Zone 4 - emphasizes mitochondrial fat metabolism while maintaining energy expenditure sustainability. 2) Endurance Improvement: 60% Zone 2, 25% Zone 3 (lactate threshold development), 10% Zone 4, 5% Zone 5 - builds aerobic base while enhancing lactate clearance. 3) Cardiovascular Health: 80% Zone 2, 15% Zone 3, 5% Zone 4 - optimizes cardiac output and vascular function without excessive stress. 4) Athletic Performance: 50% Zone 2, 30% Zone 3, 15% Zone 4, 5% Zone 5 - maximizes specific energy system development. Weekly volume recommendations: Beginners 150-200 minutes, Intermediate 300-400 minutes, Advanced 450-600 minutes. Always include 1-2 recovery weeks monthly with 80% Zone 1 training."
    },
    {
      question: "How does age affect maximum heart rate formulas, and what's the scientific validity of different estimation equations (Tanaka vs. 220-age vs. Gulati) across different age groups and fitness levels?",
      answer: "Age significantly impacts maximum HR, but traditional 220-age formula has ±10-12 BPM error margin. More accurate formulas: 1) Tanaka (208 - 0.7×age): Most accurate overall with ±5-8 BPM error, validated across 18-81 age range. 2) Gulati (206 - 0.88×age for women): Gender-specific with better accuracy for female athletes. 3) Londeree (206.3 - 0.711×age): Good for recreational athletes. 4) Miller (217 - 0.85×age): Better for highly trained individuals. Age-specific considerations: Under 25 - formulas less reliable due to developmental variability; 25-50 - Tanaka most reliable; Over 50 - individual variability increases, consider stress testing. Fitness level effects: Highly trained athletes may have 5-15 BPM lower max HR than sedentary peers due to enhanced stroke volume and autonomic regulation. For precision, graded exercise testing remains gold standard."
    },
    {
      question: "What physiological adaptations occur in each training zone, and how long does it typically take to see measurable cardiovascular improvements from structured heart rate zone training?",
      answer: "Zone-specific physiological adaptations: 1) Zone 1 (50-60%): Enhanced parasympathetic tone (2-4 weeks), improved recovery capacity (3-6 weeks), increased capillary density (8-12 weeks). 2) Zone 2 (60-70%): Mitochondrial biogenesis (4-8 weeks), Type I fiber oxidative capacity (6-10 weeks), maximal fat oxidation rate (8-12 weeks). 3) Zone 3 (70-80%): Lactate threshold elevation (6-10 weeks), stroke volume increase (8-12 weeks), cardiac output optimization (10-14 weeks). 4) Zone 4 (80-90%): VO2max improvement (4-8 weeks), glycogen storage capacity (6-10 weeks), lactate clearance enhancement (8-12 weeks). 5) Zone 5 (90-100%): Neuromuscular efficiency (2-4 weeks), Type II fiber recruitment (4-6 weeks), phosphagen system adaptation (4-8 weeks). Measurable improvements typically begin at 4 weeks, peak at 12-16 weeks, with continued adaptation up to 24 months with progressive overload."
    },
    {
      question: "How accurate are wearable heart rate monitors versus chest strap monitors versus manual pulse measurement for training zone implementation, and what are optimal measurement protocols for each method?",
      answer: "Accuracy hierarchy: 1) Chest strap monitors (ECG-based): 98-99% accuracy, gold standard for training, 3-5 second delay. 2) Optical wrist monitors (PPG-based): 90-95% accuracy for steady-state, less accurate during rapid changes, susceptible to motion artifact. 3) Manual pulse measurement: 85-90% accuracy with proper technique, impractical during exercise. Optimal protocols: Chest straps - moisten electrodes, position below pectoral muscles, ensure snug fit. Wrist monitors - wear 2-3cm proximal to wrist bone, ensure firm contact, avoid during high-intensity intervals. Manual measurement - use carotid or radial artery, count 15 seconds × 4, measure immediately upon stopping. For interval training, chest straps provide superior accuracy. For steady-state cardio, optical monitors suffice. Always validate wearable readings against manual measurements periodically. Consider investing in medical-grade monitors for clinical applications."
    }
  ];

  // Sample data for demo
  useEffect(() => {
    setAge('30');
    setRestingHR('60');
  }, []);

  // Handle sidebar visibility on resize
  useEffect(() => {
    const handleResize = () => {
      setShowSidebar(window.innerWidth >= 1024);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMethod = (method) => {
    setCurrentMethod(method);
    setResults(null);
    setZones([]);
  };

  const calculateHR = () => {
    const ageVal = parseInt(age);
    const restingVal = currentMethod === 'karvonen' ? parseInt(restingHR) : null;
    
    // Validate inputs
    if (!ageVal || ageVal <= 0) {
      alert('Please enter a valid age.');
      return;
    }
    
    if (currentMethod === 'karvonen' && (!restingVal || restingVal <= 0)) {
      alert('Please enter a valid resting heart rate.');
      return;
    }
    
    // Calculate maximum heart rate (using Tanaka formula - more accurate than 220-age)
    const calculatedMaxHR = Math.round(208 - (0.7 * ageVal));
    
    // Calculate HRR for Karvonen method
    let calculatedHrr = 0;
    if (currentMethod === 'karvonen') {
      calculatedHrr = calculatedMaxHR - restingVal;
    }
    
    // Define zones
    const zoneDefinitions = [
      { 
        name: "Zone 1", 
        label: "Recovery", 
        min: 0.50, 
        max: 0.60, 
        class: "z1",
        icon: "fas fa-walking",
        description: "Light activity for warm-up and recovery",
        color: "#bdc3c7",
        benefits: ["Active recovery", "Enhanced circulation", "Neuromuscular activation"]
      },
      { 
        name: "Zone 2", 
        label: "Fat Burn", 
        min: 0.60, 
        max: 0.70, 
        class: "z2",
        icon: "fas fa-fire",
        description: "Aerobic zone for endurance and fat burning",
        color: "#3498db",
        benefits: ["Maximal fat oxidation", "Mitochondrial development", "Aerobic base building"]
      },
      { 
        name: "Zone 3", 
        label: "Aerobic", 
        min: 0.70, 
        max: 0.80, 
        class: "z3",
        icon: "fas fa-heart",
        description: "Moderate intensity for cardiovascular fitness",
        color: "#27ae60",
        benefits: ["Lactate threshold elevation", "Stroke volume increase", "Cardiovascular efficiency"]
      },
      { 
        name: "Zone 4", 
        label: "Anaerobic", 
        min: 0.80, 
        max: 0.90, 
        class: "z4",
        icon: "fas fa-running",
        description: "Hard intensity for performance improvement",
        color: "#f39c12",
        benefits: ["VO2max improvement", "Glycogen utilization", "Anaerobic capacity"]
      },
      { 
        name: "Zone 5", 
        label: "Maximum", 
        min: 0.90, 
        max: 1.00, 
        class: "z5",
        icon: "fas fa-bolt",
        description: "Maximum effort for HIIT and sprint training",
        color: "#e74c3c",
        benefits: ["Neuromuscular power", "Phosphagen system", "Peak performance"]
      }
    ];
    
    // Calculate zone boundaries
    const calculatedZones = zoneDefinitions.map((zone) => {
      let low, high;
      if (currentMethod === 'karvonen') {
        low = Math.round((calculatedHrr * zone.min) + restingVal);
        high = Math.round((calculatedHrr * zone.max) + restingVal);
      } else {
        // Simple method
        low = Math.round(calculatedMaxHR * zone.min);
        high = Math.round(calculatedMaxHR * zone.max);
      }
      
      return {
        ...zone,
        low,
        high,
        percentageRange: `${Math.round(zone.min * 100)}-${Math.round(zone.max * 100)}%`
      };
    });
    
    setMaxHR(calculatedMaxHR);
    setHrr(calculatedHrr);
    setZones(calculatedZones);
    setResults({
      maxHR: calculatedMaxHR,
      restingHR: currentMethod === 'karvonen' ? restingVal : null,
      hrr: currentMethod === 'karvonen' ? calculatedHrr : null
    });
  };

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  // Handle Enter key press
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        calculateHR();
      }
    };

    document.addEventListener('keypress', handleKeyPress);
    return () => document.removeEventListener('keypress', handleKeyPress);
  }, [age, restingHR, currentMethod]);

  // Calculate recommended weekly training distribution based on fitness level
  const getTrainingDistribution = () => {
    const distributions = {
      beginner: { z1: 20, z2: 60, z3: 15, z4: 5, z5: 0 },
      intermediate: { z1: 15, z2: 50, z3: 20, z4: 10, z5: 5 },
      advanced: { z1: 10, z2: 40, z3: 25, z4: 15, z5: 10 },
      athlete: { z1: 5, z2: 35, z3: 30, z4: 20, z5: 10 }
    };
    return distributions[fitnessLevel];
  };

  return (
    <main style={containerStyle}>
      <section style={calculatorBoxStyle}>
        <h1 style={calcTitleStyle}>
          <i className="fas fa-heartbeat"></i> Comprehensive Heart Rate Zone Calculator - Advanced Cardiovascular Training Intensity Analysis & Metabolic Optimization Platform
        </h1>
        <p style={calcDescStyle}>
          Calculate your <strong>personalized heart rate training zones, optimize exercise intensity protocols, and maximize cardiovascular adaptation responses</strong> using <strong>validated physiological formulas, comprehensive metabolic analysis algorithms, and evidence-based training optimization methods</strong>. Essential for <strong>athletic performance enhancement, cardiovascular health improvement, metabolic conditioning programming, and informed exercise prescription decision-making</strong>.
        </p>
        
        <div style={methodToggleStyle}>
          <button 
            style={{
              ...methodButtonStyle,
              ...(currentMethod === 'karvonen' ? activeMethodButtonStyle : {})
            }}
            onClick={() => toggleMethod('karvonen')}
          >
            <i className="fas fa-user-cog"></i> Karvonen Formula (Most Accurate)
          </button>
          <button 
            style={{
              ...methodButtonStyle,
              ...(currentMethod === 'simple' ? activeMethodButtonStyle : {})
            }}
            onClick={() => toggleMethod('simple')}
          >
            <i className="fas fa-calculator"></i> Simple Percentage Method
          </button>
        </div>

        <div style={inputGridStyle}>
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-birthday-cake"></i> Age *</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="30"
              min="10"
              max="100"
              step="1"
              style={inputStyle}
              required
            />
          </div>
          <div style={{ ...inputGroupStyle, display: currentMethod === 'karvonen' ? 'block' : 'none' }}>
            <label style={inputGroupLabelStyle}><i className="fas fa-heart"></i> Resting Heart Rate (BPM) *</label>
            <input
              type="number"
              value={restingHR}
              onChange={(e) => setRestingHR(e.target.value)}
              placeholder="60"
              min="40"
              max="100"
              step="1"
              style={inputStyle}
              required={currentMethod === 'karvonen'}
            />
            <small style={{ color: '#666', fontSize: '0.8rem' }}>
              Measure first thing in the morning before getting out of bed
            </small>
          </div>
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-running"></i> Fitness Level</label>
            <select
              value={fitnessLevel}
              onChange={(e) => setFitnessLevel(e.target.value)}
              style={selectStyle}
            >
              <option value="beginner">Beginner (0-6 months training)</option>
              <option value="intermediate">Intermediate (6-24 months training)</option>
              <option value="advanced">Advanced (2+ years training)</option>
              <option value="athlete">Competitive Athlete</option>
            </select>
          </div>
        </div>

        <button
          style={calcBtnStyle}
          onClick={calculateHR}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, calcBtnHoverStyle)}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = calcBtnStyle.background;
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <i className="fas fa-calculator"></i> Calculate Heart Rate Zones & Training Plan
        </button>

        {/* Results Display */}
        {results && (
          <div style={resultsContainerStyle}>
            <div style={{ ...resultCardStyle, ...maxHRCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-heart"></i> Maximum Heart Rate Analysis</h4>
              <div style={{ margin: '20px 0' }}>
                <div style={{ ...resultValueStyle, color: '#e74c3c' }}>
                  {results.maxHR} BPM
                </div>
                <div style={{ 
                  fontSize: '1.2rem', 
                  color: '#666',
                  marginBottom: '15px',
                  fontWeight: 'bold'
                }}>
                  Estimated Using Tanaka Formula
                </div>
                <div style={{ 
                  padding: '15px', 
                  background: '#ffeaea',
                  borderRadius: '8px',
                  color: '#c0392b',
                  fontWeight: '600',
                  marginBottom: '15px'
                }}>
                  Peak Cardiovascular Capacity
                </div>
                <div style={{ 
                  padding: '10px', 
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  color: '#666'
                }}>
                  <div><strong>Formula:</strong> 208 - (0.7 × Age)</div>
                  <div><strong>Accuracy:</strong> ±5-8 BPM vs. 220-age formula</div>
                  <div><strong>Application:</strong> Upper limit for safe training</div>
                </div>
              </div>
            </div>

            {currentMethod === 'karvonen' && (
              <>
                <div style={{ ...resultCardStyle, ...restingHRCardStyle }}>
                  <h4 style={sectionTitleStyle}><i className="fas fa-bed"></i> Resting Heart Rate Analysis</h4>
                  <div style={{ margin: '20px 0' }}>
                    <div style={{ ...resultValueStyle, color: '#3498db' }}>
                      {results.restingHR} BPM
                    </div>
                    <div style={{ 
                      fontSize: '1.2rem', 
                      color: '#666',
                      marginBottom: '15px',
                      fontWeight: 'bold'
                    }}>
                      {results.restingHR < 60 ? 'Excellent' : 
                       results.restingHR < 70 ? 'Good' : 
                       results.restingHR < 80 ? 'Average' : 'Needs Improvement'}
                    </div>
                    <div style={{ 
                      padding: '15px', 
                      background: '#ebf5fb',
                      borderRadius: '8px',
                      color: '#2980b9',
                      fontWeight: '600',
                      marginBottom: '15px'
                    }}>
                      Autonomic Nervous System Function
                    </div>
                    <div style={{ 
                      padding: '10px', 
                      background: '#f8f9fa',
                      borderRadius: '8px',
                      color: '#666'
                    }}>
                      <div><strong>Interpretation:</strong> Lower values indicate better cardiovascular efficiency</div>
                      <div><strong>Measurement:</strong> Morning, rested, before activity</div>
                      <div><strong>Goal:</strong> Progressive reduction with training</div>
                    </div>
                  </div>
                </div>

                <div style={{ ...resultCardStyle, ...hrrCardStyle }}>
                  <h4 style={sectionTitleStyle}><i className="fas fa-tachometer-alt"></i> Heart Rate Reserve Analysis</h4>
                  <div style={{ margin: '20px 0' }}>
                    <div style={{ ...resultValueStyle, color: '#27ae60' }}>
                      {results.hrr} BPM
                    </div>
                    <div style={{ 
                      fontSize: '1.2rem', 
                      color: '#666',
                      marginBottom: '15px',
                      fontWeight: 'bold'
                    }}>
                      Training Intensity Range
                    </div>
                    <div style={{ 
                      padding: '15px', 
                      background: '#e8f5e9',
                      borderRadius: '8px',
                      color: '#219150',
                      fontWeight: '600',
                      marginBottom: '15px'
                    }}>
                      Calculated Range: {results.hrr} BPM
                    </div>
                    <div style={{ 
                      padding: '10px', 
                      background: '#f8f9fa',
                      borderRadius: '8px',
                      color: '#666'
                    }}>
                      <div><strong>Formula:</strong> Max HR - Resting HR</div>
                      <div><strong>Significance:</strong> Personalizes training zones</div>
                      <div><strong>Advantage:</strong> 15-20% more accurate than simple % method</div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Heart Rate Visualization */}
        {results && (
          <div style={hrVisualizationStyle}>
            <h4 style={sectionTitleStyle}><i className="fas fa-chart-bar"></i> Training Zone Visualization</h4>
            <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '15px' }}>
              Visual representation of your <strong>personalized heart rate training zones</strong>:
            </p>
            <div style={hrScaleStyle}>
              {zones.map((_, index) => (
                index < zones.length - 1 && (
                  <div 
                    key={`marker-${index}`}
                    style={{ ...zoneMarkerStyle, left: `${(index + 1) * 20 - 10}%` }}
                  />
                )
              ))}
            </div>
            <div style={scaleLabelsStyle}>
              <span>Recovery Zone</span>
              <span>Fat Burning Zone</span>
              <span>Aerobic Zone</span>
              <span>Anaerobic Zone</span>
              <span>Maximum Zone</span>
            </div>
          </div>
        )}

        {/* Zone Cards */}
        {results && (
          <div style={zoneCardsStyle}>
            {zones.map((zone) => (
              <div
                key={zone.name}
                style={{
                  ...zoneCardStyle,
                  background: `linear-gradient(135deg, ${zone.color}, ${zone.color}dd)`
                }}
                onClick={() => setCurrentZone(currentZone === zone.name ? null : zone.name)}
                onMouseEnter={(e) => Object.assign(e.currentTarget.style, zoneCardHoverStyle)}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <i className={`${zone.icon} fa-lg`}></i>
                  <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{zone.name}: {zone.label}</h4>
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '10px 0' }}>
                  {zone.low} - {zone.high} BPM
                </div>
                <p style={{ fontSize: '0.9rem', opacity: '0.9' }}>{zone.description}</p>
                <p style={{ fontSize: '0.8rem', marginTop: '10px' }}>{zone.percentageRange} of max HR</p>
                
                {currentZone === zone.name && (
                  <div style={{ marginTop: '15px', padding: '10px', background: 'rgba(255,255,255,0.2)', borderRadius: '5px' }}>
                    <strong>Training Benefits:</strong>
                    <ul style={{ marginTop: '5px', paddingLeft: '15px', fontSize: '0.8rem' }}>
                      {zone.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Zone Table */}
        {results && (
          <div style={methodToggleStyle}>
            <h4 style={sectionTitleStyle}><i className="fas fa-table"></i> Comprehensive Training Zone Analysis</h4>
            <table style={zoneTableStyle}>
              <thead>
                <tr>
                  <th style={{ padding: '15px', backgroundColor: '#2c3e50', color: 'white', fontWeight: '600' }}>Heart Rate Zone</th>
                  <th style={{ padding: '15px', backgroundColor: '#2c3e50', color: 'white', fontWeight: '600' }}>Training Intensity</th>
                  <th style={{ padding: '15px', backgroundColor: '#2c3e50', color: 'white', fontWeight: '600' }}>% of Maximum HR</th>
                  <th style={{ padding: '15px', backgroundColor: '#2c3e50', color: 'white', fontWeight: '600' }}>Heart Rate Range (BPM)</th>
                  <th style={{ padding: '15px', backgroundColor: '#2c3e50', color: 'white', fontWeight: '600' }}>Physiological Training Effect</th>
                </tr>
              </thead>
              <tbody>
                {zones.map((zone) => (
                  <tr key={zone.name} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '15px', color: zone.color, fontWeight: 'bold' }}>{zone.name}</td>
                    <td style={{ padding: '15px' }}>{zone.label}</td>
                    <td style={{ padding: '15px' }}>{zone.percentageRange}</td>
                    <td style={{ padding: '15px', fontWeight: 'bold' }}>{zone.low} - {zone.high} BPM</td>
                    <td style={{ padding: '15px' }}>{zone.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Training Tips */}
        {results && (
          <div style={trainingTipsStyle}>
            <div style={tipCardStyle}>
              <h4 style={{ marginBottom: '10px', color: '#2c3e50', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="fas fa-walking"></i> Recommended Weekly Distribution
              </h4>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>
                For your <strong>{fitnessLevel}</strong> level: {getTrainingDistribution().z2}% Zone 2, {getTrainingDistribution().z3}% Zone 3, {getTrainingDistribution().z4}% Zone 4
              </p>
            </div>
            <div style={tipCardStyle}>
              <h4 style={{ marginBottom: '10px', color: '#2c3e50', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="fas fa-clock"></i> Optimal Session Duration
              </h4>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>
                Zone 2: 30-90 minutes, Zone 3: 20-45 minutes, Zone 4: 10-30 minutes, Zone 5: 1-5 minutes intervals
              </p>
            </div>
            <div style={tipCardStyle}>
              <h4 style={{ marginBottom: '10px', color: '#2c3e50', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="fas fa-heartbeat"></i> Recovery Monitoring
              </h4>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>
                Track morning HR: Increase &gt;10% above baseline indicates need for recovery day
              </p>
            </div>
          </div>
        )}

        {/* Mid-page Ad */}
        <div style={{
          margin: '30px 0',
          padding: '20px',
          background: '#f8f9fa',
          borderRadius: '10px',
          textAlign: 'center',
          color: '#7f8c8d',
          border: '1px dashed #ddd'
        }}>
          <p><i className="fas fa-ad"></i> Advertisement</p>
          <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Your ad could be here</p>
          <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Premium heart rate monitoring device</p>
        </div>

        {/* Enhanced SEO Content */}
        <div style={infoSectionStyle}>
          <h3 style={sectionTitleStyle}><i className="fas fa-question-circle"></i> Comprehensive Heart Rate Zone Analysis: Advanced Cardiovascular Training Intensity Quantification & Metabolic Adaptation Optimization Protocol</h3>
          <p style={paragraphStyle}>
            <strong>Heart rate training zone calculation methodologies</strong> represent <strong>essential physiological assessment tools</strong> for determining <strong>precise exercise intensity parameters, metabolic pathway activation thresholds, and evidence-based cardiovascular adaptation strategies</strong>. These advanced calculations integrate <strong>validated physiological formulas, comprehensive autonomic nervous system analysis, and current exercise science research</strong> to provide <strong>individualized training intensity approaches</strong> that maximize <strong>cardiovascular health optimization, athletic performance enhancement, metabolic conditioning effectiveness, and informed exercise prescription decision-making processes</strong> across diverse fitness levels requiring <strong>precision intensity quantification protocols</strong>.
          </p>
          
          <h3 style={sectionTitleStyle}><i className="fas fa-calculator"></i> Advanced Heart Rate Zone Algorithms - Physiological Intensity Quantification Formulae</h3>
          <p style={paragraphStyle}>Multiple <strong>validated heart rate zone calculation equations</strong> exist for <strong>comprehensive cardiovascular assessment protocols</strong>, each demonstrating specific <strong>physiological applications and variable accuracy profiles</strong> influencing <strong>training optimization decision-making processes</strong>:</p>
          
          <div style={formulaBoxStyle}>
            <strong>Karvonen Formula (Gold Standard):</strong><br/>
            Heart Rate Reserve (HRR) = Maximum Heart Rate - Resting Heart Rate<br/>
            Target Heart Rate = (HRR × Training Intensity %) + Resting Heart Rate<br/><br/>
            
            <strong>Maximum Heart Rate Estimation Formulas:</strong><br/>
            Tanaka Formula: Max HR = 208 - (0.7 × Age) [Most Accurate]<br/>
            Traditional Formula: Max HR = 220 - Age [Simplified]<br/>
            Gulati Formula (Women): Max HR = 206 - (0.88 × Age)<br/>
            Miller Formula (Athletes): Max HR = 217 - (0.85 × Age)<br/><br/>
            
            <strong>Training Zone Percentage Ranges:</strong><br/>
            Zone 1 (Recovery): 50-60% of Max HR<br/>
            Zone 2 (Fat Burning): 60-70% of Max HR<br/>
            Zone 3 (Aerobic): 70-80% of Max HR<br/>
            Zone 4 (Anaerobic): 80-90% of Max HR<br/>
            Zone 5 (Maximum): 90-100% of Max HR<br/><br/>
            
            <strong>Heart Rate Variability Analysis:</strong><br/>
            RMSSD = Root Mean Square of Successive Differences<br/>
            SDNN = Standard Deviation of NN Intervals<br/>
            LF/HF Ratio = Low Frequency/High Frequency Balance
          </div>

          <h3 style={sectionTitleStyle}><i className="fas fa-heart"></i> Clinical Applications of Heart Rate Zone Analysis - Comprehensive Cardiovascular Training Guidelines</h3>
          <p style={paragraphStyle}>Accurate <strong>heart rate zone assessment methodology implementation</strong> serves critical functions across multiple <strong>health and performance domains</strong> requiring <strong>precise intensity quantification strategies</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Cardiac Rehabilitation Protocols:</strong> Essential for <strong>safe exercise prescription algorithms, cardiovascular risk stratification frameworks, and progressive overload implementation strategies</strong> in clinical rehabilitation settings</li>
            <li style={{ marginBottom: '10px' }}><strong>Endurance Performance Optimization:</strong> Guides <strong>aerobic capacity development protocols, lactate threshold elevation strategies, and metabolic efficiency enhancement approaches</strong> for athletic performance maximization</li>
            <li style={{ marginBottom: '10px' }}><strong>Metabolic Health Improvement:</strong> Determines <strong>optimal fat oxidation intensity ranges, insulin sensitivity enhancement protocols, and glucose metabolism optimization frameworks</strong> for metabolic syndrome management</li>
            <li style={{ marginBottom: '10px' }}><strong>Weight Management Programs:</strong> Essential for <strong>caloric expenditure maximization strategies, sustainable exercise adherence protocols, and body composition optimization approaches</strong> in weight control interventions</li>
            <li style={{ marginBottom: '10px' }}><strong>Stress Reduction Applications:</strong> Manages <strong>autonomic nervous system balance protocols, parasympathetic activation strategies, and recovery optimization frameworks</strong> for holistic health enhancement</li>
            <li style={{ marginBottom: '10px' }}><strong>Athletic Periodization Planning:</strong> Coordinates <strong>training phase intensity distributions, recovery period implementation, and competition preparation protocols</strong> for peak performance achievement</li>
            <li><strong>Geriatric Health Maintenance:</strong> Facilitates <strong>age-appropriate intensity prescription, cardiovascular safety protocols, and functional capacity preservation approaches</strong> for healthy aging promotion</li>
          </ul>
          
          <h3 style={sectionTitleStyle}><i className="fas fa-dna"></i> Genetic and Physiological Factors Influencing Heart Rate Responses - Individual Variability Considerations</h3>
          <p style={paragraphStyle}>
            Multiple <strong>genetic and physiological determinants</strong> significantly influence <strong>individual heart rate responses</strong> to exercise stimuli: 1) <strong>Genetic polymorphisms</strong> in beta-adrenergic receptors affecting chronotropic responses, 2) <strong>Autonomic nervous system balance</strong> variations influencing resting and exercise heart rates, 3) <strong>Cardiovascular structure differences</strong> including left ventricular mass and chamber dimensions, 4) <strong>Metabolic efficiency variations</strong> affecting substrate utilization and oxygen consumption patterns, 5) <strong>Training adaptation rates</strong> influencing heart rate drift and cardiovascular efficiency improvements. Understanding these <strong>individual response patterns</strong> enables <strong>personalized training prescription</strong> that accounts for <strong>unique physiological characteristics</strong> rather than applying <strong>one-size-fits-all intensity recommendations</strong> based solely on population averages.
          </p>

          <h3 style={sectionTitleStyle}><i className="fas fa-microscope"></i> Advanced Cardiovascular Monitoring Technologies Beyond Heart Rate Measurement</h3>
          <p style={paragraphStyle}>
            Modern <strong>cardiovascular assessment technologies</strong> provide <strong>enhanced physiological insights beyond basic heart rate monitoring</strong>: 1) <strong>Heart rate variability (HRV) analysis</strong> - quantifies autonomic nervous system balance and recovery status, 2) <strong>Stroke volume monitoring</strong> - measures cardiac output efficiency and cardiovascular drift, 3) <strong>Oxygen saturation tracking</strong> - assesses peripheral oxygen delivery and utilization efficiency, 4) <strong>Electrocardiogram (ECG) analysis</strong> - evaluates electrical conduction patterns and arrhythmia detection, 5) <strong>Cardiac output measurement</strong> - determines cardiovascular efficiency and oxygen transport capacity. These <strong>advanced monitoring modalities</strong> enable <strong>comprehensive cardiovascular assessment</strong> and <strong>individualized training optimization</strong> beyond simple heart rate zone calculations.
          </p>

          <h3 style={sectionTitleStyle}><i className="fas fa-chart-network"></i> Integration of Heart Rate Zones into Comprehensive Training Periodization Models</h3>
          <p style={paragraphStyle}>
            Contemporary <strong>training periodization frameworks</strong> integrate <strong>heart rate zone distributions with multiple performance parameters</strong> to create <strong>comprehensive training optimization models</strong>. These integrated approaches consider: 1) <strong>Volume-intensity relationships</strong> balancing total training load with recovery capacity, 2) <strong>Specificity-progression principles</strong> aligning training stimuli with performance goals, 3) <strong>Individualization-adaptation frameworks</strong> customizing training loads based on response patterns, 4) <strong>Fatigue-management strategies</strong> preventing overtraining and optimizing adaptation, 5) <strong>Competition-preparation protocols</strong> timing peak performance with key events. This <strong>multidimensional approach</strong> recognizes that <strong>heart rate represents one component of training optimization</strong> within a <strong>complex interplay of physiological systems and performance variables</strong>.
          </p>

          <h3 style={sectionTitleStyle}><i className="fas fa-clock"></i> Temporal Considerations: Circadian Rhythms, Training Timing, and Performance Optimization</h3>
          <p style={paragraphStyle}>
            Effective <strong>training optimization requires understanding circadian influences</strong> on cardiovascular responses: 1) <strong>Morning training</strong> - typically lower resting heart rates, increased fat oxidation potential, but reduced power output capacity, 2) <strong>Afternoon/evening training</strong> - higher core temperature, enhanced neuromuscular function, but potentially compromised recovery timing, 3) <strong>Circadian heart rate patterns</strong> - natural 5-10 BPM variation throughout day, lowest during early morning sleep, 4) <strong>Seasonal variations</strong> - heart rate typically 3-5 BPM higher in summer heat, 5) <strong>Menstrual cycle effects</strong> - luteal phase often shows 5-8 BPM elevation in resting heart rate. Recommended <strong>timing strategies</strong>: Align high-intensity sessions with <strong>peak circadian performance windows</strong> (typically afternoon), schedule recovery sessions during <strong>natural physiological troughs</strong>, and consider <strong>individual chronotype preferences</strong> for optimal adherence and performance.
          </p>

          <h3 style={sectionTitleStyle}><i className="fas fa-globe"></i> Global Health Perspectives: Cultural Variations in Exercise Intensity Perception and Cardiovascular Health Approaches</h3>
          <p style={paragraphStyle}>
            Cultural perspectives on <strong>exercise intensity and cardiovascular training vary significantly worldwide</strong>, influencing <strong>health behaviors and clinical approaches</strong>: 1) <strong>Western exercise cultures</strong> often emphasize <strong>quantified intensity metrics and structured training protocols</strong>, 2) <strong>Eastern movement traditions</strong> frequently focus on <strong>flow states, mindful movement, and holistic integration</strong>, 3) <strong>Indigenous physical practices</strong> often integrate <strong>functional movement patterns, environmental connection, and community participation</strong>, 4) <strong>Global health initiatives</strong> increasingly recognize <strong>culturally adapted physical activity recommendations</strong> as essential for population-wide adoption. Effective <strong>global cardiovascular health strategies</strong> must bridge <strong>scientific intensity quantification with culturally meaningful movement practices</strong>, respecting <strong>diverse approaches to physical activity while promoting evidence-based cardiovascular health benefits</strong>.
          </p>

          <h3 style={sectionTitleStyle}><i className="fas fa-exclamation-triangle"></i> Key Factors in Heart Rate Zone Interpretation - Comprehensive Cardiovascular Assessment Considerations</h3>
          <p style={paragraphStyle}>Multiple <strong>significant physiological and environmental factors</strong> influence <strong>heart rate zone interpretation parameters</strong> and require consideration for appropriate training decision-making:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Environmental Conditions:</strong> Heat, humidity, altitude, and pollution significantly elevate heart rate responses independent of exercise intensity, requiring <strong>environmental adjustment factors and compensatory hydration strategies</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Hydration Status:</strong> Dehydration increases heart rate by 5-15 BPM through reduced blood volume and increased core temperature, necessitating <strong>pre-exercise hydration protocols and real-time hydration monitoring</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Nutritional Influences:</strong> Carbohydrate intake, caffeine consumption, and meal timing affect heart rate through <strong>metabolic, hormonal, and autonomic mechanisms</strong> requiring <strong>nutritional periodization strategies</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Sleep and Recovery Status:</strong> Sleep deprivation increases resting heart rate by 5-10 BPM and elevates exercise heart rate responses, demanding <strong>recovery prioritization and sleep optimization protocols</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Medication Effects:</strong> Cardiovascular medications, stimulants, and other pharmaceuticals alter heart rate responses, requiring <strong>medication-specific adjustment protocols and physician consultation</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Psychological Stress:</strong> Mental stress elevates resting and exercise heart rates through sympathetic activation, necessitating <strong>stress management integration and psychological recovery strategies</strong></li>
            <li><strong>Equipment Accuracy:</strong> Measurement device limitations, placement errors, and signal interference affect heart rate data reliability, requiring <strong>device validation protocols and measurement standardization approaches</strong></li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-user-md"></i> Practical Training Implementation Recommendations - Comprehensive Cardiovascular Optimization Guidelines</h3>
          <p style={paragraphStyle}>For optimal <strong>heart rate zone assessment implementation</strong> in contemporary training practice environments and <strong>evidence-based cardiovascular optimization protocols</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Individualized Baseline Establishment:</strong> Implement <strong>multiple measurement protocols, longitudinal tracking methodologies, and context-aware interpretation frameworks</strong> before training program adjustments</li>
            <li style={{ marginBottom: '10px' }}><strong>Progressive Implementation Strategy:</strong> Utilize <strong>gradual intensity progression, adaptation response monitoring, and individualized adjustment protocols</strong> for sustainable cardiovascular development</li>
            <li style={{ marginBottom: '10px' }}><strong>Comprehensive Monitoring Approach:</strong> Develop <strong>heart rate variability tracking, subjective perception integration, and performance metric correlation frameworks</strong> for holistic training optimization</li>
            <li style={{ marginBottom: '10px' }}><strong>Recovery Optimization Systems:</strong> Establish <strong>active recovery protocols, sleep quality enhancement strategies, and nutrition timing approaches</strong> for maximal adaptation capacity</li>
            <li style={{ marginBottom: '10px' }}><strong>Environmental Adaptation Protocols:</strong> Implement <strong>climate acclimatization strategies, hydration optimization plans, and equipment adjustment procedures</strong> for consistent training responses</li>
            <li><strong>Multidisciplinary Collaboration Framework:</strong> Coordinate <strong>exercise physiologist-cardiologist communication, nutritionist consultation integration, and sports psychologist support provision</strong> for comprehensive cardiovascular health enhancement</li>
          </ul>
        </div>

        {/* Q&A Dropdown Section */}
        <div style={faqSectionStyle}>
          <h2 style={faqTitleStyle}><i className="fas fa-question-circle"></i> Frequently Asked Questions About Heart Rate Training Zones</h2>
          {faqs.map((faq, index) => (
            <div key={index} style={faqItemStyle}>
              <div
                style={{
                  ...faqQuestionStyle,
                  ...(activeFAQ === index ? hoverFaqQuestionStyle : {})
                }}
                onClick={() => toggleFAQ(index)}
                onMouseEnter={(e) => e.currentTarget.style.background = hoverFaqQuestionStyle.background}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = activeFAQ === index
                    ? hoverFaqQuestionStyle.background
                    : faqQuestionStyle.background;
                }}
              >
                {faq.question}
                <i className={`fas fa-chevron-${activeFAQ === index ? 'up' : 'down'}`}></i>
              </div>
              <div style={{
                ...faqAnswerStyle,
                ...(activeFAQ === index ? activeFaqAnswerStyle : {})
              }}>
                {faq.answer}
              </div>
            </div>
          ))}
        </div>

        {/* ALL Calculators Mobile Section (when sidebar is hidden) */}
        {!showSidebar && (
          <div style={infoSectionStyle}>
            <h3 style={sectionTitleStyle}><i className="fas fa-calculator"></i> All Health Calculators</h3>
            <p style={paragraphStyle}>Explore our complete collection of health and fitness calculators for comprehensive wellness assessment:</p>
            <div style={{
              ...calculatorsGridStyle,
              maxHeight: '500px',
              overflowY: 'auto',
              padding: '10px'
            }}>
              {healthCalculators.map((calculator, index) => (
                <a
                  key={index}
                  href={calculator.link}
                  style={calculatorCardStyle}
                  onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverCalculatorCardStyle)}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = calculatorCardStyle.background;
                    e.currentTarget.style.color = calculatorCardStyle.color;
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = calculatorCardStyle.borderColor;
                  }}
                >
                  <i className="fas fa-calculator" style={{ marginRight: '5px' }}></i> {calculator.name}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Medical Disclaimer */}
        <div style={medicalDisclaimerStyle}>
          <h4 style={disclaimerTitleStyle}><i className="fas fa-exclamation-triangle"></i> Important Medical Disclaimer</h4>
          <p style={paragraphStyle}><strong>This heart rate zone calculator provides estimates for educational and informational purposes only.</strong> The calculations are based on standard physiological formulas and should not be used as a substitute for professional medical advice, diagnosis, or treatment.</p>
          <p style={paragraphStyle}><strong>Heart Rate Training Limitations Warning:</strong> These formulas do not account for individual variations in cardiovascular health, medication effects, underlying medical conditions, or environmental factors. The results may not be appropriate for individuals with heart conditions, on cardiovascular medications, or with specific health concerns.</p>
          <p style={paragraphStyle}><strong>Exercise Safety Caution:</strong> Always consult with a healthcare provider before beginning any new exercise program, especially if you have a history of heart disease, high blood pressure, chest pain, dizziness, or other cardiovascular symptoms. Stop exercising immediately if you experience chest pain, severe shortness of breath, dizziness, or irregular heartbeat.</p>
          <p style={paragraphStyle}><strong>Professional Consultation Required:</strong> For individuals with known cardiovascular conditions, diabetes, or other chronic health issues, exercise should be prescribed and monitored by qualified healthcare professionals. Never exceed exercise intensity recommendations without medical clearance.</p>
          <p style={{ marginBottom: '10px' }}><strong>Comprehensive Health Assessment:</strong> Heart rate is just one component of cardiovascular assessment. Comprehensive evaluation should include blood pressure monitoring, cholesterol testing, glucose screening, and medical examination when appropriate. Exercise represents only one aspect of comprehensive cardiovascular health management.</p>
          <p><strong>Individual Variation:</strong> Heart rate responses vary significantly based on genetics, fitness level, hydration status, environmental conditions, and psychological state. These calculations provide general guidelines that should be interpreted in the context of your overall health profile and in consultation with healthcare professionals.</p>
        </div>
      </section>

      {/* Sidebar with 5 Ads (3rd one sticky) + ALL Calculators */}
      {showSidebar && (
        <aside style={sidebarStyle}>
          <div style={sidebarContentStyle}>
            {/* Advertisement 1 */}
            <div style={sidebarAdStyle}>
              <p><i className="fas fa-ad"></i> Advertisement 1</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Sponsored Content</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Premium heart rate monitor</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>250px height ad slot</p>
            </div>
            
            {/* Advertisement 2 */}
            <div style={sidebarAdStyle}>
              <p><i className="fas fa-ad"></i> Advertisement 2</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Featured Product</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Advanced fitness tracker</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>250px height ad slot</p>
            </div>
            
            {/* Sticky Advertisement 3 */}
            <div style={stickyAdStyle}>
              <p><i className="fas fa-thumbtack"></i> Sticky Advertisement</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Premium Content - Stays visible</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Personal training program</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>250px sticky ad</p>
            </div>
            
            {/* Advertisement 4 */}
            <div style={sidebarAdStyle}>
              <p><i className="fas fa-ad"></i> Advertisement 4</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>New Product</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Smart workout equipment</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>250px height ad slot</p>
            </div>
            
            {/* Advertisement 5 */}
            <div style={sidebarAdStyle}>
              <p><i className="fas fa-ad"></i> Advertisement 5</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Training App</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Cardio training platform</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>250px height ad slot</p>
            </div>
            
            {/* ALL Calculators Sidebar Section */}
            <div style={{ 
              padding: '20px', 
              background: 'white', 
              borderRadius: '10px', 
              boxShadow: '0 3px 10px rgba(0,0,0,0.05)',
              maxHeight: '600px',
              overflowY: 'auto'
            }}>
              <h4 style={{ 
                marginBottom: '15px', 
                color: '#2c3e50', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                position: 'sticky',
                top: '0',
                background: 'white',
                padding: '10px 0',
                zIndex: '1'
              }}>
                <i className="fas fa-calculator"></i> All Health Calculators
              </h4>
              <div style={calculatorsGridStyle}>
                {healthCalculators.map((calculator, index) => (
                  <a
                    key={index}
                    href={calculator.link}
                    style={calculatorCardStyle}
                    onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverCalculatorCardStyle)}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = calculatorCardStyle.background;
                      e.currentTarget.style.color = calculatorCardStyle.color;
                      e.currentTarget.style.transform = 'none';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.borderColor = calculatorCardStyle.borderColor;
                    }}
                  >
                    {calculator.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* Additional Ads when sidebar disappears (mobile) */}
      {!showSidebar && (
        <div style={{ ...mobileAdsStyle, display: 'grid' }}>
          <div style={mobileAdStyle}>
            <p><i className="fas fa-ad"></i> Mobile Advertisement 1</p>
            <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Optimized for mobile viewing</p>
          </div>
          <div style={mobileAdStyle}>
            <p><i className="fas fa-ad"></i> Mobile Advertisement 2</p>
            <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Perfect for on-the-go training</p>
          </div>
        </div>
      )}
      
      {/* Sticky Footer Ad (Mobile) */}
      {!showSidebar && (
        <div style={stickyFooterAdStyle}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ textAlign: 'left', flex: 1 }}>
              <p style={{ fontSize: '0.9rem', margin: 0, color: '#2c3e50' }}>
                <i className="fas fa-mobile-alt"></i> Heart Rate Tracker Pro
              </p>
              <p style={{ fontSize: '0.8rem', margin: '5px 0 0 0', color: '#666' }}>
                Track your heart rate zones in real-time - Free download
              </p>
            </div>
            <button style={{
              background: '#e74c3c',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginLeft: '15px'
            }}>
              Get App
            </button>
          </div>
        </div>
      )}

      {/* Font Awesome CSS */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    </main>
  );
}