// src/app/ibw-calculator/page.js
"use client";

import { useState, useEffect } from 'react';

export default function IBWCalculatorPage() {
  const [currentUnit, setCurrentUnit] = useState('metric');
  const [frameSize, setFrameSize] = useState('medium');
  const [showWristGuide, setShowWristGuide] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');
  const [results, setResults] = useState({
    ibw: '--',
    underweight: '--',
    overweight: '--',
    frameAdjustment: '',
    formulaUsed: 'medium frame',
    ibwValue: 0,
    unit: 'kg'
  });
  const [formulaComparison, setFormulaComparison] = useState([]);
  const [gender, setGender] = useState('male');
  const [height, setHeight] = useState(175);
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [shareResultsData, setShareResultsData] = useState(null);

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

  const unitToggleStyle = {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    flexWrap: 'wrap'
  };

  const unitButtonStyle = {
    padding: '12px 20px',
    background: '#f1f3f5',
    border: '2px solid #dfe6e9',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.3s'
  };

  const activeUnitButtonStyle = {
    background: '#27ae60',
    color: 'white',
    borderColor: '#27ae60'
  };

  const methodSelectionStyle = {
    margin: '20px 0',
    padding: '20px',
    background: '#f8f9fa',
    borderRadius: '10px'
  };

  const frameButtonsStyle = {
    display: 'flex',
    gap: '10px',
    marginTop: '15px',
    flexWrap: 'wrap'
  };

  const frameButtonStyle = {
    padding: '12px 20px',
    background: '#e9ecef',
    border: '2px solid #dee2e6',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.3s',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const activeFrameButtonStyle = {
    background: '#27ae60',
    color: 'white',
    borderColor: '#27ae60'
  };

  const calcBtnStyle = {
    width: '100%',
    padding: '16px',
    background: '#27ae60',
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
    background: '#219150',
    transform: 'translateY(-2px)',
    boxShadow: '0 5px 15px rgba(39, 174, 96, 0.2)'
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

  const healthyCardStyle = {
    borderTopColor: '#27ae60'
  };

  const underweightCardStyle = {
    borderTopColor: '#f39c12'
  };

  const overweightCardStyle = {
    borderTopColor: '#e67e22'
  };

  const resultValueStyle = {
    fontSize: '2.5rem',
    fontWeight: '800',
    margin: '10px 0'
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
    borderLeft: '4px solid #27ae60',
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
    background: '#e8f5e9',
    border: '2px solid #27ae60',
    boxShadow: '0 4px 12px rgba(39, 174, 96, 0.15)',
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
    borderTop: '2px solid #27ae60',
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
    background: '#27ae60',
    color: 'white',
    transform: 'translateY(-2px)',
    boxShadow: '0 3px 10px rgba(39, 174, 96, 0.2)',
    borderColor: '#27ae60'
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

  const wristGuideStyle = {
    margin: '20px 0',
    padding: '20px',
    background: '#f8f9fa',
    borderRadius: '10px',
    borderLeft: '4px solid #3498db'
  };

  const guideStepsStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px',
    marginTop: '15px'
  };

  const guideStepStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px'
  };

  const stepNumberStyle = {
    background: '#3498db',
    color: 'white',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    flexShrink: '0'
  };

  const comparisonGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginTop: '15px'
  };

  const methodCardStyle = {
    padding: '20px',
    background: '#f8f9fa',
    borderRadius: '8px',
    borderLeft: '4px solid #27ae60'
  };

  // New styles for share and download buttons
  const actionButtonsStyle = {
    display: 'flex',
    gap: '10px',
    marginTop: '20px',
    flexWrap: 'wrap'
  };

  const shareButtonStyle = {
    padding: '12px 20px',
    background: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: '0.3s',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const downloadButtonStyle = {
    padding: '12px 20px',
    background: '#27ae60',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: '0.3s',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const shareMenuStyle = {
    position: 'absolute',
    top: '100%',
    left: 0,
    background: 'white',
    borderRadius: '10px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.15)',
    padding: '15px',
    zIndex: 1000,
    minWidth: '200px',
    marginTop: '10px'
  };

  const sharePlatformButtonStyle = {
    width: '100%',
    padding: '10px 15px',
    marginBottom: '8px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    transition: '0.2s'
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
      question: "What's the precise difference between Ideal Body Weight (IBW) calculations and Body Mass Index (BMI) determinations for clinical weight assessment protocols?",
      answer: "Ideal Body Weight (IBW) represents a specific numerical weight target derived from height and gender formulas, primarily utilized for medication dosing accuracy and clinical treatment protocols. Body Mass Index (BMI) calculates weight-to-height ratios categorized into ranges (underweight, normal, overweight, obese). IBW provides precise values for pharmaceutical calculations, while BMI offers population screening categories. The Devine formula (50kg + 2.3kg per inch over 5 feet for men, 45.5kg + 2.3kg per inch for women) delivers exact medication dosing weights, whereas BMI classification (weight in kg divided by height in meters squared) identifies health risk categories. Clinical applications differ significantly: IBW determines chemotherapy dosages and ventilator settings; BMI assesses population health risks and epidemiological patterns."
    },
    {
      question: "How does wrist circumference measurement accuracy impact frame size determination in IBW calculations, and what are validated measurement protocols?",
      answer: "Wrist circumference measurement represents the most accessible anthropometric method for frame size estimation, correlating approximately 85-90% with skeletal dimensions when performed correctly. Validated protocols require: 1) Measurement at the narrowest point between the styloid processes and hand, 2) Use of flexible, non-stretch tape measure parallel to wrist creases, 3) Moderate tension (neither compressing tissue nor loose), 4) Two measurements averaged for accuracy. Gender-specific thresholds: Men - Small frame <16.5cm (6.5\"), Medium 16.5-18.5cm, Large >18.5cm (7.25\"); Women - Small <15.2cm (6.0\"), Medium 15.2-16.5cm, Large >16.5cm (6.5\"). Research indicates ±0.5cm measurement error impacts IBW calculations by approximately ±2-3%. For clinical precision, consider elbow breadth measurement or radiographic assessment when frame size critically influences treatment decisions."
    },
    {
      question: "What specific adjustments should strength-trained athletes and bodybuilders make to standard IBW calculations accounting for increased lean muscle mass?",
      answer: "Strength-trained athletes require significant IBW calculation adjustments due to increased muscle mass. Standard formulas underestimate appropriate weights by 15-25% for athletic populations. Recommended approaches: 1) Add 10-15% to calculated IBW for recreational strength training (3-5 sessions weekly), 2) Add 15-25% for competitive athletes with visible muscular development, 3) Use body composition targets: 8-15% body fat for men, 18-25% for women, regardless of absolute weight, 4) Prioritize performance metrics over weight targets: strength gains, endurance improvements, recovery rates. Alternative methods: 1) Fat-free mass index calculations, 2) Sport-specific weight ranges, 3) Longitudinal tracking of muscle gain vs. fat loss. Remember: IBW formulas were developed for general populations, not athletic cohorts with hypertrophy adaptations. Always combine weight assessment with body composition analysis for athletic populations."
    },
    {
      question: "How do different ethnic populations require adjusted IBW calculations, and what are evidence-based correction factors?",
      answer: "Ethnic variations necessitate IBW calculation adjustments due to differing body composition patterns: 1) Asian populations - typically smaller frames, recommend 10-15% reduction from standard formulas, with BMI healthy range 18.5-23 (vs. 18.5-25 for Caucasians), 2) African descent populations - often greater bone density and muscle mass, may require 5-10% upward adjustment, 3) Pacific Islander populations - different fat distribution patterns, consider 5-15% adjustments, 4) Hispanic populations - varied by region, generally intermediate between Caucasian and Asian formulas. Evidence-based approaches: 1) Use population-specific BMI cutoffs, 2) Apply ethnic adjustment factors (0.9 for Asians, 1.05 for African descent), 3) Consider waist-to-height ratio (<0.5) as complementary metric, 4) Utilize WHO recommendations for specific ethnic groups. Always individualize based on patient characteristics rather than applying blanket adjustments."
    },
    {
      question: "What are the specific pharmaceutical applications of IBW calculations in medication dosing protocols across different drug classes?",
      answer: "IBW calculations critically influence medication dosing across multiple pharmaceutical categories: 1) Chemotherapy agents (doxorubicin, cisplatin) - dosed by body surface area derived from IBW, 2) Antibiotics (vancomycin, aminoglycosides) - loading and maintenance doses based on IBW, 3) Anticoagulants (heparin, enoxaparin) - weight-based protocols prevent under/over-dosing, 4) Anesthetic agents (propofol, neuromuscular blockers) - induction and maintenance doses calculated from IBW, 5) Psychiatric medications (lithium) - narrow therapeutic window requires precise weight-based dosing. Clinical protocols: Use actual body weight if ≤ IBW, use adjusted body weight if > IBW (especially for lipophilic drugs). The Cockcroft-Gault equation for renal function utilizes IBW for creatinine clearance estimation. Always consult specific drug monographs and institutional protocols, as dosing strategies vary by medication characteristics and patient populations."
    },
    {
      question: "How does age affect ideal body weight calculations, and what adjustments are needed for pediatric and geriatric populations?",
      answer: "Age significantly impacts ideal weight parameters: 1) Pediatric populations - use age-specific growth charts (CDC, WHO) rather than adult IBW formulas, consider percentile rankings and growth velocity, 2) Adolescent transition - gradual shift from pediatric to adult formulas around age 18, monitor pubertal development stages, 3) Adult maintenance - relatively stable IBW ranges through early adulthood, 4) Geriatric adjustments - consider 5-10% higher weight allowances due to age-related body composition changes, sarcopenia, and osteoporosis. For elderly patients: 1) Focus on maintaining functional ability rather than achieving specific weights, 2) Consider adjusted BMI ranges (22-27 as healthy), 3) Monitor unintentional weight loss as critical health indicator. Age-specific considerations ensure appropriate weight assessment across the lifespan while accounting for developmental and aging-related physiological changes."
    }
  ];

  // Initialize with sample data
  useEffect(() => {
    setHeight(175);
    setFeet('5');    // Add this
    setInches('9');  // Add this
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

  // Handle click outside share menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showShareMenu && !event.target.closest('.share-button-container')) {
        setShowShareMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showShareMenu]);

  const toggleUnits = (unit) => {
    setCurrentUnit(unit);
    setShowResults(false);
    setShareResultsData(null);
    // Clear height inputs when switching units
    if (unit === 'metric') {
      setHeight(175);
      setFeet('');
      setInches('');
    } else {
      setHeight('');
      setFeet('5');
      setInches('9');
    }
  };

  const selectFrame = (size) => {
    setFrameSize(size);
    setShowWristGuide(size !== 'medium');
    setShowResults(false);
    setShareResultsData(null);
  };

  const applyFrameAdjustment = (weight, frame) => {
    switch(frame) {
      case 'small': return weight * 0.9;
      case 'large': return weight * 1.1;
      default: return weight;
    }
  };

  const calculateIBW = () => {
    // Validate input
    let heightInCm;
  
  // Calculate height based on unit system
  if (currentUnit === 'metric') {
    // Validate metric input
    if (!height || height <= 0) {
      alert('Please enter a valid height in cm.');
      return;
    }
    heightInCm = height;
  } else {
    // For imperial: convert feet and inches to total inches, then to cm
    const feetVal = parseFloat(feet) || 0;
    const inchesVal = parseFloat(inches) || 0;
    const totalInches = (feetVal * 12) + inchesVal;
    
    // Validate imperial input
    if (!feetVal || !inchesVal || totalInches <= 0) {
      alert('Please enter a valid height in feet and inches.');
      return;
    }
    
    if (totalInches < 60) {
      alert("Height must be at least 5 feet (60 inches) for accurate IBW calculation.");
      return;
    }
    
    heightInCm = totalInches * 2.54;
  }
    
    // Calculate base IBW using Devine formula
    if (heightInCm < 152.4) {
      alert("Height must be at least 152.4 cm (5 feet) for accurate IBW calculation.");
      return;
    }
    
    const inchesOver5ft = (heightInCm - 152.4) / 2.54;
    let baseIBW = (gender === 'male') ? 50 + (2.3 * inchesOver5ft) : 45.5 + (2.3 * inchesOver5ft);
    
    // Apply frame size adjustment
    let frameAdjustment = 0;
    let frameText = 'medium frame';
    
    if (frameSize === 'small') {
      baseIBW = baseIBW * 0.9;
      frameAdjustment = -10;
      frameText = 'small frame (-10%)';
    } else if (frameSize === 'large') {
      baseIBW = baseIBW * 1.1;
      frameAdjustment = +10;
      frameText = 'large frame (+10%)';
    }
    
    // Round to 1 decimal place
    baseIBW = Math.round(baseIBW * 10) / 10;
    
    // Calculate weight ranges
    const underweightMax = Math.round(baseIBW * 0.85 * 10) / 10;
    const overweightMin = Math.round(baseIBW * 1.15 * 10) / 10;
    
    // Convert to pounds if using imperial
    let displayIBW = baseIBW;
    let displayUnder = underweightMax;
    let displayOver = overweightMin;
    let unit = 'kg';
    
    if (currentUnit === 'imperial') {
      displayIBW = Math.round(baseIBW * 2.20462);
      displayUnder = Math.round(underweightMax * 2.20462);
      displayOver = Math.round(overweightMin * 2.20462);
      unit = 'lbs';
    }
    
    // Set results
    const resultsData = {
      ibw: `${displayIBW.toLocaleString()} ${unit}`,
      ibwValue: displayIBW,
      unit: unit,
      underweight: `≤ ${displayUnder.toLocaleString()} ${unit}`,
      overweight: `≥ ${displayOver.toLocaleString()} ${unit}`,
      frameAdjustment: frameAdjustment !== 0 ? `Adjusted for ${frameText}` : 'Medium frame (no adjustment)',
      formulaUsed: frameText,
      height: currentUnit === 'metric' ? height : (parseFloat(feet) * 12 + parseFloat(inches)),
      heightUnit: currentUnit === 'metric' ? 'cm' : 'in',
      heightDisplay: currentUnit === 'metric' 
        ? `${height} cm`
        : `${Math.floor((parseFloat(feet) * 12 + parseFloat(inches)) / 12)}'${Math.round((parseFloat(feet) * 12 + parseFloat(inches)) % 12)}"`,
      gender: gender,
      frameSize: frameSize
    };
    
    setResults(resultsData);
    setShareResultsData(resultsData);
    
    // Show results
    setShowResults(true);
    setShowShareMenu(false);
    
    // Calculate and display formula comparison
    calculateFormulaComparison(gender, heightInCm, frameSize);
  };

  const calculateFormulaComparison = (gender, heightInCm, frameSize) => {
    const inchesOver5ft = (heightInCm - 152.4) / 2.54;
    
    // Different IBW formulas
    const formulas = [
      {
        name: 'Devine (1974)',
        calculate: () => {
          let weight = (gender === 'male') ? 50 + (2.3 * inchesOver5ft) : 45.5 + (2.3 * inchesOver5ft);
          return applyFrameAdjustment(weight, frameSize);
        },
        description: 'Most widely used in clinical settings'
      },
      {
        name: 'Hamwi (1964)',
        calculate: () => {
          let weight = (gender === 'male') ? 48 + (2.7 * inchesOver5ft) : 45.5 + (2.2 * inchesOver5ft);
          return applyFrameAdjustment(weight, frameSize);
        },
        description: 'Similar to Devine with different coefficients'
      },
      {
        name: 'Robinson (1983)',
        calculate: () => {
          let weight = (gender === 'male') ? 52 + (1.9 * inchesOver5ft) : 49 + (1.7 * inchesOver5ft);
          return applyFrameAdjustment(weight, frameSize);
        },
        description: 'Based on NHANES data'
      },
      {
        name: 'Miller (1983)',
        calculate: () => {
          let weight = (gender === 'male') ? 56.2 + (1.41 * inchesOver5ft) : 53.1 + (1.36 * inchesOver5ft);
          return applyFrameAdjustment(weight, frameSize);
        },
        description: 'Uses different calculation method'
      },
      {
        name: 'BMI-Based',
        calculate: () => {
          const targetBMI = (gender === 'male') ? 23 : 21.75;
          const heightInM = heightInCm / 100;
          return Math.round(targetBMI * (heightInM * heightInM) * 10) / 10;
        },
        description: 'Targets specific BMI values'
      }
    ];
    
    const comparison = formulas.map(formula => {
      const weight = formula.calculate();
      let displayWeight = weight;
      let unit = 'kg';
      
      if (currentUnit === 'imperial') {
        displayWeight = Math.round(weight * 2.20462);
        unit = 'lbs';
      }
      
      return {
        name: formula.name,
        weight: `${displayWeight.toLocaleString()} ${unit}`,
        description: formula.description
      };
    });
    
    setFormulaComparison(comparison);
  };

  // Share function
  const shareResults = (platform) => {
    if (!shareResultsData) {
      alert('Please calculate ideal body weight first before sharing.');
      return;
    }

    const shareText = `My ideal body weight is ${shareResultsData.ibw} (${shareResultsData.frameSize} frame) - Check yours using this calculator!`;
    const shareUrl = window.location.href;
    const hashtags = 'IdealWeight,Health,Fitness,Wellness';

    let shareUrlFull = '';
    
    switch(platform) {
      case 'facebook':
        shareUrlFull = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
        break;
      case 'twitter':
        shareUrlFull = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}&hashtags=${hashtags}`;
        break;
      case 'linkedin':
        shareUrlFull = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'whatsapp':
        shareUrlFull = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
        break;
      case 'telegram':
        shareUrlFull = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
        break;
      case 'reddit':
        shareUrlFull = `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`;
        break;
      case 'pinterest':
        shareUrlFull = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&description=${encodeURIComponent(shareText)}`;
        break;
      case 'email':
        shareUrlFull = `mailto:?subject=My Ideal Body Weight Results&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`;
        break;
      default:
        // Web Share API for modern browsers
        if (navigator.share) {
          navigator.share({
            title: 'My Ideal Body Weight Results',
            text: shareText,
            url: shareUrl,
          });
          return;
        } else {
          // Fallback: copy to clipboard
          navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
          alert('Results copied to clipboard!');
          return;
        }
    }

    window.open(shareUrlFull, '_blank', 'noopener,noreferrer');
    setShowShareMenu(false);
  };

  // Download as HTML file
  const downloadHTML = () => {
    if (!shareResultsData) {
      alert('Please calculate ideal body weight first before downloading.');
      return;
    }

    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ideal Body Weight Calculator Results</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background: #f8f9fa;
            color: #333;
            line-height: 1.6;
            padding: 20px;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .report-header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 3px solid #27ae60;
        }
        
        .report-header h1 {
            color: #2c3e50;
            font-size: 2.5rem;
            margin-bottom: 10px;
        }
        
        .report-header p {
            color: #666;
            font-size: 1.1rem;
        }
        
        .results-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .result-card {
            background: white;
            border-radius: 12px;
            padding: 25px;
            box-shadow: 0 3px 15px rgba(0,0,0,0.08);
            border-top: 5px solid;
        }
        
        .card-title {
            color: #2c3e50;
            margin-bottom: 20px;
            font-size: 1.3rem;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .card-title i {
            font-size: 1.2rem;
        }
        
        .ibw-value {
            font-size: 3rem;
            font-weight: 800;
            margin: 15px 0;
            text-align: center;
            color: #27ae60;
        }
        
        .info-box {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            margin: 15px 0;
        }
        
        .comparison-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 15px;
            margin: 20px 0;
        }
        
        .comparison-card {
            padding: 15px;
            background: #f8f9fa;
            border-radius: 8px;
            border-left: 4px solid #27ae60;
        }
        
        .method-value {
            font-size: 1.5rem;
            font-weight: bold;
            color: #27ae60;
        }
        
        .method-label {
            font-size: 0.9rem;
            color: #666;
            margin-top: 5px;
        }
        
        .disclaimer {
            background: #f8d7da;
            padding: 20px;
            border-radius: 10px;
            border-left: 5px solid #721c24;
            margin-top: 30px;
        }
        
        .disclaimer h4 {
            color: #721c24;
            margin-bottom: 15px;
        }
        
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            color: #666;
            font-size: 0.9rem;
        }
        
        @media print {
            body {
                background: white;
                padding: 10px;
            }
            
            .result-card {
                box-shadow: none;
                border: 1px solid #ddd;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="report-header">
            <h1><i class="fas fa-balance-scale"></i> Ideal Body Weight Calculator Results</h1>
            <p>Generated on ${date} at ${time}</p>
        </div>
        
        <div class="results-grid">
            <!-- Main Results Card -->
            <div class="result-card" style="border-top-color: #27ae60;">
                <h3 class="card-title"><i class="fas fa-balance-scale" style="color: #27ae60;"></i> Ideal Body Weight Analysis</h3>
                <div class="ibw-value">${shareResultsData.ibw}</div>
                <div class="info-box">
                    <p><strong>Formula Used:</strong> Devine Formula with ${shareResultsData.frameSize} frame adjustment</p>
                    <p><strong>Height:</strong> ${shareResultsData.heightDisplay || `${shareResultsData.height} ${shareResultsData.heightUnit}`}</p>
                    <p><strong>Gender:</strong> ${shareResultsData.gender === 'male' ? 'Male' : 'Female'}</p>
                    <p><strong>Frame Size:</strong> ${shareResultsData.frameSize.charAt(0).toUpperCase() + shareResultsData.frameSize.slice(1)}</p>
                </div>
            </div>
            
            <!-- Weight Ranges Card -->
            <div class="result-card" style="border-top-color: #f39c12;">
                <h3 class="card-title"><i class="fas fa-chart-line" style="color: #f39c12;"></i> Health Weight Ranges</h3>
                <div class="info-box">
                    <div style="margin-bottom: 15px;">
                        <div style="font-size: 1.2rem; font-weight: bold; color: #27ae60; margin-bottom: 5px;">Ideal Range</div>
                        <div style="font-size: 1.5rem; font-weight: bold; color: #27ae60;">${shareResultsData.ibw}</div>
                        <div style="font-size: 0.9rem; color: #666; margin-top: 5px;">Optimal health weight</div>
                    </div>
                    
                    <div style="margin-bottom: 15px;">
                        <div style="font-size: 1.2rem; font-weight: bold; color: #f39c12; margin-bottom: 5px;">Underweight Range</div>
                        <div style="font-size: 1.2rem; font-weight: bold; color: #f39c12;">${shareResultsData.underweight}</div>
                        <div style="font-size: 0.9rem; color: #666; margin-top: 5px;">15% below ideal (increased risk)</div>
                    </div>
                    
                    <div>
                        <div style="font-size: 1.2rem; font-weight: bold; color: #e67e22; margin-bottom: 5px;">Overweight Range</div>
                        <div style="font-size: 1.2rem; font-weight: bold; color: #e67e22;">${shareResultsData.overweight}</div>
                        <div style="font-size: 0.9rem; color: #666; margin-top: 5px;">15% above ideal (elevated risk)</div>
                    </div>
                </div>
            </div>
            
            <!-- Formula Comparison Card -->
            <div class="result-card" style="border-top-color: #3498db;">
                <h3 class="card-title"><i class="fas fa-calculator" style="color: #3498db;"></i> Formula Comparison</h3>
                <div class="comparison-grid">
                    ${formulaComparison.map(formula => `
                    <div class="comparison-card">
                        <div class="method-value">${formula.weight}</div>
                        <div class="method-label">${formula.name}</div>
                        <div style="font-size: 0.8rem; color: #888; margin-top: 8px;">${formula.description}</div>
                    </div>
                    `).join('')}
                </div>
            </div>
        </div>
        
        <div class="disclaimer">
            <h4><i class="fas fa-exclamation-circle"></i> Important Medical Disclaimer</h4>
            <p>This ideal body weight calculation is for informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. These calculations do not account for individual variations in muscle mass, bone density, body composition, age-related changes, ethnic differences, or athletic training status.</p>
        </div>
        
        <div class="footer">
            <p>Generated by Ideal Body Weight Calculator • ${window.location.href}</p>
            <p style="margin-top: 10px; font-size: 0.8rem;">This report was generated on ${date} at ${time}</p>
        </div>
    </div>
</body>
</html>`;

    // Create blob and download
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ideal-weight-results-${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  // Download as text file
  const downloadText = () => {
    if (!shareResultsData) {
      alert('Please calculate ideal body weight first before downloading.');
      return;
    }

    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    
    let content = `╔══════════════════════════════════════════════════════════════════════════════╗\n`;
    content += `║                     IDEAL BODY WEIGHT CALCULATOR RESULTS                      ║\n`;
    content += `║                    Generated: ${date} at ${time}                   ║\n`;
    content += `╚══════════════════════════════════════════════════════════════════════════════╝\n\n`;
    
    // Personal Information
    content += `PERSONAL INFORMATION:\n`;
    content += `══════════════════════════════════════════════════════════════════════════════\n`;
    content += `  Height: ${shareResultsData.height} ${shareResultsData.heightUnit}\n`;
    content += `  Gender: ${shareResultsData.gender === 'male' ? 'Male' : 'Female'}\n`;
    content += `  Frame Size: ${shareResultsData.frameSize.charAt(0).toUpperCase() + shareResultsData.frameSize.slice(1)}\n`;
    content += `  Unit System: ${currentUnit === 'metric' ? 'Metric (cm/kg)' : 'Imperial (in/lbs)'}\n\n`;
    
    // Results
    content += `IDEAL BODY WEIGHT RESULTS:\n`;
    content += `══════════════════════════════════════════════════════════════════════════════\n`;
    content += `  Ideal Body Weight: ${shareResultsData.ibw}\n`;
    content += `  Formula Used: Devine Formula with ${shareResultsData.frameSize} frame adjustment\n`;
    content += `  Underweight Range: ${shareResultsData.underweight} (15% below ideal)\n`;
    content += `  Overweight Range: ${shareResultsData.overweight} (15% above ideal)\n\n`;
    
    // Formula Comparison
    content += `FORMULA COMPARISON:\n`;
    content += `══════════════════════════════════════════════════════════════════════════════\n`;
    formulaComparison.forEach((formula, index) => {
      content += `  ${index + 1}. ${formula.name}: ${formula.weight}\n`;
      content += `     ${formula.description}\n`;
    });
    content += `\n`;
    
    // Health Recommendations
    content += `HEALTH RECOMMENDATIONS:\n`;
    content += `══════════════════════════════════════════════════════════════════════════════\n`;
    content += `1. Ideal Range: ${shareResultsData.ibw} - Optimal for health and wellness\n`;
    content += `2. Underweight Range: Below ${shareResultsData.underweight} - May indicate\n`;
    content += `   nutritional deficiencies or underlying health concerns\n`;
    content += `3. Overweight Range: Above ${shareResultsData.overweight} - May increase\n`;
    content += `   risk of chronic diseases like diabetes and heart disease\n\n`;
    
    // Clinical Applications
    content += `CLINICAL APPLICATIONS:\n`;
    content += `══════════════════════════════════════════════════════════════════════════════\n`;
    content += `• Ideal Body Weight calculations are used in clinical settings for:\n`;
    content += `  - Medication dosing (chemotherapy, antibiotics, etc.)\n`;
    content += `  - Nutritional planning and dietary recommendations\n`;
    content += `  - Surgical risk assessment and anesthesia planning\n`;
    content += `  - Renal function estimation (creatinine clearance)\n\n`;
    
    // Disclaimer
    content += `IMPORTANT MEDICAL DISCLAIMER:\n`;
    content += `══════════════════════════════════════════════════════════════════════════════\n`;
    content += `This ideal body weight calculation is for informational purposes only.\n`;
    content += `It is not a substitute for professional medical advice, diagnosis, or\n`;
    content += `treatment. Always consult with healthcare professionals for personalized\n`;
    content += `health advice. These calculations do not account for individual variations\n`;
    content += `in muscle mass, bone density, body composition, age-related changes,\n`;
    content += `ethnic differences, or athletic training status.\n\n`;
    content += `Generated by Ideal Body Weight Calculator\n`;
    content += `URL: ${window.location.href}\n`;
    content += `Date: ${date} | Time: ${time}\n`;
    content += `\n╔══════════════════════════════════════════════════════════════════════════════╗\n`;
    content += `║                            END OF REPORT                              ║\n`;
    content += `╚══════════════════════════════════════════════════════════════════════════════╝\n`;
    
    // Create blob and download
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ideal-weight-results-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  // Handle Enter key press for calculation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        calculateIBW();
      }
    };

    document.addEventListener('keypress', handleKeyPress);
    return () => document.removeEventListener('keypress', handleKeyPress);
  }, [height, gender, frameSize, currentUnit]);

  return (
    <main style={containerStyle}>
      <section style={calculatorBoxStyle}>
        <h1 style={calcTitleStyle}>
          <i className="fas fa-balance-scale"></i> Comprehensive Ideal Body Weight Calculator - Advanced Medical Weight Assessment & Clinical Dosing Calculation Platform
        </h1>
        <p style={calcDescStyle}>
          Calculate your <strong>precise Ideal Body Weight, analyze healthy weight ranges, and optimize medication dosing protocols</strong> using <strong>validated clinical formulas, comprehensive frame size adjustments, and evidence-based pharmaceutical calculation methods</strong>. Essential for <strong>clinical treatment planning, medication dosage determination, surgical risk assessment, and informed health optimization decision-making</strong>.
        </p>
        
        <div style={unitToggleStyle}>
          <button 
            style={{
              ...unitButtonStyle,
              ...(currentUnit === 'imperial' ? activeUnitButtonStyle : {})
            }}
            onClick={() => toggleUnits('imperial')}
          >
            Imperial (ft-in/lbs)
          </button>
          <button 
            style={{
              ...unitButtonStyle,
              ...(currentUnit === 'imperial' ? activeUnitButtonStyle : {})
            }}
            onClick={() => toggleUnits('imperial')}
          >
            Imperial (ft-in/lbs)
          </button>
        </div>

        <div style={inputGridStyle}>
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}>
              <i className="fas fa-ruler-vertical"></i> Height *
            </label>
            {currentUnit === 'metric' ? (
              <>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(parseFloat(e.target.value) || 0)}
                  placeholder="175"
                  min="100"
                  max="250"
                  step="0.1"
                  style={inputStyle}
                  required
                />
                <small style={{ color: '#666', fontSize: '0.8rem' }}>
                  Centimeters (cm)
                </small>
              </>
            ) : (
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1 }}>
                  <input
                    type="number"
                    value={feet}
                    onChange={(e) => setFeet(e.target.value)}
                    placeholder="5"
                    min="3"
                    max="8"
                    step="1"
                    style={inputStyle}
                    required
                  />
                  <small style={{ color: '#666', fontSize: '0.8rem', display: 'block', marginTop: '5px' }}>
                    Feet (ft)
                  </small>
                </div>
                <div style={{ flex: 1 }}>
                  <input
                    type="number"
                    value={inches}
                    onChange={(e) => setInches(e.target.value)}
                    placeholder="9"
                    min="0"
                    max="11"
                    step="0.1"
                    style={inputStyle}
                    required
                  />
                  <small style={{ color: '#666', fontSize: '0.8rem', display: 'block', marginTop: '5px' }}>
                    Inches (in)
                  </small>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Frame Size Selection */}
        <div style={methodSelectionStyle}>
          <label style={inputGroupLabelStyle}><i className="fas fa-user"></i> Body Frame Size (Optional)</label>
          <p style={{ fontSize: '0.9rem', color: '#666', margin: '10px 0' }}>
            Adjust for small, medium, or large bone structure based on wrist circumference
          </p>
          
          <div style={frameButtonsStyle}>
            <button 
              style={{
                ...frameButtonStyle,
                ...(frameSize === 'small' ? activeFrameButtonStyle : {})
              }}
              onClick={() => selectFrame('small')}
            >
              <i className="fas fa-user-minus"></i> Small Frame
            </button>
            <button 
              style={{
                ...frameButtonStyle,
                ...(frameSize === 'medium' ? activeFrameButtonStyle : {})
              }}
              onClick={() => selectFrame('medium')}
            >
              <i className="fas fa-user"></i> Medium Frame
            </button>
            <button 
              style={{
                ...frameButtonStyle,
                ...(frameSize === 'large' ? activeFrameButtonStyle : {})
              }}
              onClick={() => selectFrame('large')}
            >
              <i className="fas fa-user-plus"></i> Large Frame
            </button>
          </div>
        </div>

        {/* Wrist Measurement Guide */}
        {showWristGuide && (
          <div style={wristGuideStyle}>
            <h4 style={sectionTitleStyle}><i className="fas fa-ruler"></i> How to Determine Frame Size</h4>
            <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '15px' }}>
              Measure your wrist circumference and compare to these values:
            </p>
            
            <div style={guideStepsStyle}>
              <div style={guideStepStyle}>
                <div style={stepNumberStyle}>1</div>
                <div>
                  <strong>Small Frame:</strong><br />
                  Men: &lt; 16.5 cm (6.5&quot;)<br />
                  Women: &lt; 15.2 cm (6.0&quot;)
                </div>
              </div>
              <div style={guideStepStyle}>
                <div style={stepNumberStyle}>2</div>
                <div>
                  <strong>Medium Frame:</strong><br />
                  Men: 16.5–18.5 cm<br />
                  Women: 15.2–16.5 cm
                </div>
              </div>
              <div style={guideStepStyle}>
                <div style={stepNumberStyle}>3</div>
                <div>
                  <strong>Large Frame:</strong><br />
                  Men: &gt; 18.5 cm (7.25&quot;)<br />
                  Women: &gt; 16.5 cm (6.5&quot;)
                </div>
              </div>
            </div>
          </div>
        )}

        <button
          style={calcBtnStyle}
          onClick={calculateIBW}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, calcBtnHoverStyle)}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = calcBtnStyle.background;
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <i className="fas fa-calculator"></i> Calculate Ideal Body Weight & Health Ranges
        </button>

        {/* Results Display */}
        {showResults && (
          <>
            <div style={resultsContainerStyle}>
              <div style={{ ...resultCardStyle, ...healthyCardStyle }}>
                <h4 style={sectionTitleStyle}><i className="fas fa-check-circle"></i> Ideal Weight Range</h4>
                <div style={{ margin: '20px 0' }}>
                  <div style={{ ...resultValueStyle, color: '#27ae60' }}>
                    {results.ibw}
                  </div>
                  <div style={{ 
                    fontSize: '1.2rem', 
                    color: '#666',
                    marginBottom: '15px',
                    fontWeight: 'bold'
                  }}>
                    Optimal Health Weight
                  </div>
                  <div style={{ 
                    padding: '15px', 
                    background: '#e8f5e9',
                    borderRadius: '8px',
                    color: '#27ae60',
                    fontWeight: '600',
                    marginBottom: '15px'
                  }}>
                    Based on Devine Formula
                  </div>
                  <div style={{ 
                    padding: '10px', 
                    background: '#f8f9fa',
                    borderRadius: '8px',
                    color: '#666'
                  }}>
                    <div><strong>Frame Adjustment:</strong> {results.frameAdjustment}</div>
                    <div><strong>Clinical Use:</strong> Medication dosing, nutritional planning</div>
                    <div><strong>Health Status:</strong> Optimal metabolic function</div>
                  </div>
                </div>
              </div>

              <div style={{ ...resultCardStyle, ...underweightCardStyle }}>
                <h4 style={sectionTitleStyle}><i className="fas fa-arrow-down"></i> Underweight Range</h4>
                <div style={{ margin: '20px 0' }}>
                  <div style={{ ...resultValueStyle, color: '#f39c12' }}>
                    {results.underweight}
                  </div>
                  <div style={{ 
                    fontSize: '1.2rem', 
                    color: '#666',
                    marginBottom: '15px',
                    fontWeight: 'bold'
                  }}>
                    Increased Health Risks
                  </div>
                  <div style={{ 
                    padding: '15px', 
                    background: '#fef9e7',
                    borderRadius: '8px',
                    color: '#f39c12',
                    fontWeight: '600',
                    marginBottom: '15px'
                  }}>
                    15% Below Ideal Weight
                  </div>
                  <div style={{ 
                    padding: '10px', 
                    background: '#f8f9fa',
                    borderRadius: '8px',
                    color: '#666'
                  }}>
                    <div><strong>Health Risks:</strong> Nutritional deficiencies, osteoporosis</div>
                    <div><strong>Considerations:</strong> Medical evaluation recommended</div>
                    <div><strong>Action:</strong> Gradual weight gain with supervision</div>
                  </div>
                </div>
              </div>

              <div style={{ ...resultCardStyle, ...overweightCardStyle }}>
                <h4 style={sectionTitleStyle}><i className="fas fa-arrow-up"></i> Overweight Range</h4>
                <div style={{ margin: '20px 0' }}>
                  <div style={{ ...resultValueStyle, color: '#e67e22' }}>
                    {results.overweight}
                  </div>
                  <div style={{ 
                    fontSize: '1.2rem', 
                    color: '#666',
                    marginBottom: '15px',
                    fontWeight: 'bold'
                  }}>
                    Elevated Health Risks
                  </div>
                  <div style={{ 
                    padding: '15px', 
                    background: '#fdf2e9',
                    borderRadius: '8px',
                    color: '#e67e22',
                    fontWeight: '600',
                    marginBottom: '15px'
                  }}>
                    15% Above Ideal Weight
                  </div>
                  <div style={{ 
                    padding: '10px', 
                    background: '#f8f9fa',
                    borderRadius: '8px',
                    color: '#666'
                  }}>
                    <div><strong>Health Risks:</strong> Cardiovascular disease, diabetes</div>
                    <div><strong>Considerations:</strong> Lifestyle modification needed</div>
                    <div><strong>Action:</strong> Weight loss with medical guidance</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Share and Download Buttons */}
            <div style={actionButtonsStyle}>
              <div style={{ position: 'relative' }} className="share-button-container">
                <button
                  style={shareButtonStyle}
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#2980b9'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#3498db'}
                >
                  <i className="fas fa-share-alt"></i> Share Results
                </button>
                
                {showShareMenu && (
                  <div style={shareMenuStyle}>
                    <button
                      style={{ ...sharePlatformButtonStyle, background: '#4267B2', color: 'white' }}
                      onClick={() => shareResults('facebook')}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                    >
                      <i className="fab fa-facebook-f"></i> Facebook
                    </button>
                    
                    <button
                      style={{ ...sharePlatformButtonStyle, background: '#1DA1F2', color: 'white' }}
                      onClick={() => shareResults('twitter')}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                    >
                      <i className="fab fa-twitter"></i> Twitter
                    </button>
                    
                    <button
                      style={{ ...sharePlatformButtonStyle, background: '#0077B5', color: 'white' }}
                      onClick={() => shareResults('linkedin')}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                    >
                      <i className="fab fa-linkedin-in"></i> LinkedIn
                    </button>
                    
                    <button
                      style={{ ...sharePlatformButtonStyle, background: '#25D366', color: 'white' }}
                      onClick={() => shareResults('whatsapp')}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                    >
                      <i className="fab fa-whatsapp"></i> WhatsApp
                    </button>
                    
                    <button
                      style={{ ...sharePlatformButtonStyle, background: '#0088CC', color: 'white' }}
                      onClick={() => shareResults('telegram')}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                    >
                      <i className="fab fa-telegram"></i> Telegram
                    </button>
                    
                    <button
                      style={{ ...sharePlatformButtonStyle, background: '#FF4500', color: 'white' }}
                      onClick={() => shareResults('reddit')}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                    >
                      <i className="fab fa-reddit-alien"></i> Reddit
                    </button>
                    
                    <button
                      style={{ ...sharePlatformButtonStyle, background: '#E60023', color: 'white' }}
                      onClick={() => shareResults('pinterest')}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                    >
                      <i className="fab fa-pinterest-p"></i> Pinterest
                    </button>
                    
                    <button
                      style={{ ...sharePlatformButtonStyle, background: '#666', color: 'white' }}
                      onClick={() => shareResults('email')}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                    >
                      <i className="fas fa-envelope"></i> Email
                    </button>
                    
                    <button
                      style={{ ...sharePlatformButtonStyle, background: '#f8f9fa', color: '#333', border: '1px solid #ddd' }}
                      onClick={() => shareResults('copy')}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#e9ecef'}
                      onMouseLeave={(e) => e.currentTarget.style.background = '#f8f9fa'}
                    >
                      <i className="fas fa-copy"></i> Copy to Clipboard
                    </button>
                  </div>
                )}
              </div>
              
              <button
                style={downloadButtonStyle}
                onClick={downloadHTML}
                onMouseEnter={(e) => e.currentTarget.style.background = '#219150'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#27ae60'}
              >
                <i className="fas fa-file-code"></i> Download HTML Report
              </button>
              
              <button
                style={{
                  ...downloadButtonStyle,
                  background: '#9b59b6'
                }}
                onClick={downloadText}
                onMouseEnter={(e) => e.currentTarget.style.background = '#8e44ad'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#9b59b6'}
              >
                <i className="fas fa-file-alt"></i> Download Text Report
              </button>
            </div>
          </>
        )}

        {/* Comparison Section */}
        {showResults && (
          <div style={methodSelectionStyle}>
            <h4 style={sectionTitleStyle}><i className="fas fa-balance-scale-left"></i> Comparison of IBW Formulas</h4>
            <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '15px' }}>
              Different medical formulas yield slightly different results. Here's how they compare for your height:
            </p>
            
            <div style={comparisonGridStyle}>
              {formulaComparison.map((formula, index) => (
                <div style={methodCardStyle} key={index}>
                  <h4 style={{ marginBottom: '10px', color: '#2c3e50' }}>{formula.name}</h4>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#27ae60', margin: '10px 0' }}>
                    {formula.weight}
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#666' }}>{formula.description}</p>
                </div>
              ))}
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
          <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Clinical weight management consultation</p>
        </div>

        {/* Enhanced SEO Content */}
        <div style={infoSectionStyle}>
          <h3 style={sectionTitleStyle}><i className="fas fa-question-circle"></i> Comprehensive Ideal Body Weight Analysis: Advanced Medical Weight Assessment & Clinical Treatment Optimization Protocol</h3>
          <p style={paragraphStyle}>
            <strong>Ideal Body Weight calculation methodologies</strong> represent <strong>essential clinical anthropometric assessment tools</strong> for determining <strong>precise weight targets, pharmaceutical dosing parameters, and evidence-based treatment intervention strategies</strong>. These advanced calculations integrate <strong>validated medical formulas, comprehensive frame size adjustment algorithms, and current clinical research protocols</strong> to provide <strong>individualized weight assessment approaches</strong> that maximize <strong>medication safety effectiveness, surgical outcome optimization, and informed clinical decision-making processes</strong> across diverse medical specialties requiring <strong>precision weight-based treatment protocols</strong>.
          </p>
          
          <h3 style={sectionTitleStyle}><i className="fas fa-calculator"></i> Advanced IBW Algorithms - Clinical Weight Assessment Formulae</h3>
          <p style={paragraphStyle}>Multiple <strong>validated Ideal Body Weight calculation equations</strong> exist for <strong>comprehensive medical assessment protocols</strong>, each demonstrating specific <strong>clinical applications and pharmaceutical accuracy profiles</strong> influencing <strong>treatment decision-making processes</strong>:</p>
          
          <div style={formulaBoxStyle}>
            <strong>Devine Formula (Clinical Gold Standard):</strong><br/>
            Male: IBW = 50.0 kg + 2.3 kg × (inches over 5 feet)<br/>
            Female: IBW = 45.5 kg + 2.3 kg × (inches over 5 feet)<br/><br/>
            
            <strong>Hamwi Formula (Alternative Standard):</strong><br/>
            Male: IBW = 48.0 kg + 2.7 kg × (inches over 5 feet)<br/>
            Female: IBW = 45.5 kg + 2.2 kg × (inches over 5 feet)<br/><br/>
            
            <strong>Robinson Formula (NHANES Data):</strong><br/>
            Male: IBW = 52.0 kg + 1.9 kg × (inches over 5 feet)<br/>
            Female: IBW = 49.0 kg + 1.7 kg × (inches over 5 feet)<br/><br/>
            
            <strong>Miller Formula (Updated Coefficients):</strong><br/>
            Male: IBW = 56.2 kg + 1.41 kg × (inches over 5 feet)<br/>
            Female: IBW = 53.1 kg + 1.36 kg × (inches over 5 feet)<br/><br/>
            
            <strong>Frame Size Adjustment Protocol:</strong><br/>
            Small Frame Determination: IBW × 0.9 (10% reduction)<br/>
            Medium Frame Standard: IBW × 1.0 (no adjustment)<br/>
            Large Frame Consideration: IBW × 1.1 (10% increase)<br/><br/>
            
            <strong>Body Surface Area Calculation:</strong><br/>
            BSA (m²) = √[Height (cm) × Weight (kg) / 3600]<br/>
            Adjusted Weight = IBW × (1 + [Actual Weight - IBW] × 0.4)
          </div>

          <h3 style={sectionTitleStyle}><i className="fas fa-prescription-bottle"></i> Clinical Applications of IBW Analysis - Comprehensive Medical Treatment Guidelines</h3>
          <p style={paragraphStyle}>Accurate <strong>Ideal Body Weight assessment methodology implementation</strong> serves critical functions across multiple <strong>medical specialties and treatment domains</strong> requiring <strong>precise weight-based calculation strategies</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Oncology Treatment Protocols:</strong> Essential for <strong>chemotherapy dose calculation systems, radiation therapy planning algorithms, and immunosuppressant medication protocols</strong> in cancer treatment clinical pathways</li>
            <li style={{ marginBottom: '10px' }}><strong>Critical Care Management:</strong> Guides <strong>mechanical ventilation settings, vasopressor infusion rates, and nutritional support calculations</strong> for intensive care unit patient optimization</li>
            <li style={{ marginBottom: '10px' }}><strong>Surgical Risk Assessment:</strong> Determines <strong>anesthetic agent dosing protocols, surgical complication prediction models, and postoperative recovery planning frameworks</strong> for operative patient safety</li>
            <li style={{ marginBottom: '10px' }}><strong>Renal Function Evaluation:</strong> Essential for <strong>creatinine clearance estimation algorithms, dialysis prescription calculations, and nephrotoxic medication adjustment protocols</strong> in kidney disease management</li>
            <li style={{ marginBottom: '10px' }}><strong>Nutritional Therapy Planning:</strong> Manages <strong>enteral feeding formulations, parenteral nutrition compositions, and caloric requirement determinations</strong> for clinical nutrition support systems</li>
            <li style={{ marginBottom: '10px' }}><strong>Pediatric Growth Monitoring:</strong> Coordinates <strong>age-adjusted weight percentiles, growth velocity calculations, and developmental assessment protocols</strong> for comprehensive pediatric health advancement</li>
            <li><strong>Geriatric Health Optimization:</strong> Facilitates <strong>age-related weight adjustment frameworks, sarcopenia assessment methodologies, and functional capacity evaluation approaches</strong> for elderly patient care enhancement</li>
          </ul>
          
          <h3 style={sectionTitleStyle}><i className="fas fa-dna"></i> Genetic and Epigenetic Factors Influencing Ideal Body Weight Determination and Weight Set Point Theory</h3>
          <p style={paragraphStyle}>
            Emerging research in <strong>genetic epidemiology and epigenetic regulation</strong> reveals that <strong>individual weight set points</strong> are influenced by <strong>complex genetic polymorphisms, epigenetic modifications, and gene-environment interactions</strong>. Studies identify over <strong>400 genetic loci associated with body weight regulation</strong>, including genes affecting <strong>leptin signaling pathways, melanocortin receptors, and adipokine production</strong>. The <strong>weight set point theory</strong> suggests each individual possesses a <strong>biologically determined weight range</strong> that the body defends through <strong>metabolic adaptation mechanisms</strong>. Understanding these <strong>genetic predispositions</strong> helps explain why <strong>identical caloric intake produces different weight outcomes</strong> and why <strong>long-term weight maintenance proves challenging</strong> for many individuals despite adherence to <strong>standard dietary and exercise protocols</strong>.
          </p>

          <h3 style={sectionTitleStyle}><i className="fas fa-microscope"></i> Advanced Anthropometric Assessment Technologies Beyond Standard IBW Calculations</h3>
          <p style={paragraphStyle}>
            Modern <strong>body composition assessment technologies</strong> provide <strong>enhanced precision beyond traditional IBW formulas</strong>. These include: 1) <strong>Dual-energy X-ray absorptiometry (DEXA)</strong> - measures bone mineral density, fat mass, and lean mass with <strong>±1-2% accuracy</strong>, 2) <strong>Bioelectrical impedance analysis (BIA)</strong> - estimates body water and fat-free mass through <strong>electrical conductivity measurements</strong>, 3) <strong>Air displacement plethysmography (Bod Pod)</strong> - determines body volume and density via <strong>air displacement principles</strong>, 4) <strong>3D body scanning</strong> - creates digital anthropometric models for <strong>precise circumference and volume measurements</strong>, 5) <strong>Magnetic resonance imaging (MRI)</strong> - quantifies <strong>visceral and subcutaneous adipose tissue distribution</strong>. These <strong>advanced assessment modalities</strong> enable <strong>individualized weight management strategies</strong> accounting for <strong>body composition rather than total weight alone</strong>.
          </p>

          <h3 style={sectionTitleStyle}><i className="fas fa-chart-network"></i> Integration of IBW Calculations into Comprehensive Health Risk Assessment Algorithms</h3>
          <p style={paragraphStyle}>
            Contemporary <strong>clinical risk assessment protocols</strong> integrate <strong>IBW calculations with multiple health parameters</strong> to create <strong>comprehensive risk stratification models</strong>. These integrated assessments consider: 1) <strong>Metabolic syndrome criteria</strong> including waist circumference, blood pressure, lipid profile, and fasting glucose, 2) <strong>Cardiovascular risk scores</strong> (Framingham, ASCVD) incorporating age, gender, cholesterol levels, smoking status, and blood pressure, 3) <strong>Nutritional risk screening tools</strong> (MUST, NRS-2002) evaluating weight loss, food intake, and disease severity, 4) <strong>Surgical risk calculators</strong> considering BMI, comorbidities, and procedure complexity, 5) <strong>Geriatric assessment frameworks</strong> evaluating frailty, cognition, and functional status. This <strong>multidimensional approach</strong> recognizes that <strong>weight represents one component of health</strong> within a <strong>complex interplay of physiological systems and lifestyle factors</strong>.
          </p>

          <h3 style={sectionTitleStyle}><i className="fas fa-clock"></i> Temporal Considerations: Weight Fluctuations, Seasonal Variations, and Longitudinal Monitoring Strategies</h3>
          <p style={paragraphStyle}>
            Effective <strong>weight management requires understanding natural weight fluctuations</strong> occurring due to: 1) <strong>Circadian rhythms</strong> - 0.5-1kg daily variation, 2) <strong>Menstrual cycle influences</strong> - 1-2kg premenstrual weight gain, 3) <strong>Seasonal patterns</strong> - average 0.5kg winter weight gain in temperate climates, 4) <strong>Hydration status changes</strong> - 1-3kg variation with fluid balance, 5) <strong>Dietary sodium intake effects</strong> - 0.5-2kg with high sodium consumption. Recommended <strong>longitudinal monitoring protocols</strong>: 1) Weigh at consistent times (morning, after voiding, before eating), 2) Track weekly averages rather than daily values, 3) Consider menstrual cycle phase for premenopausal women, 4) Account for seasonal patterns in weight trends, 5) Use 4-6 week intervals for assessing meaningful changes. This <strong>temporal understanding</strong> prevents <strong>overreaction to normal weight variations</strong> while enabling <strong>accurate trend identification</strong>.
          </p>

          <h3 style={sectionTitleStyle}><i className="fas fa-globe"></i> Global Health Perspectives: Cultural Variations in Weight Perception and Health Optimization Approaches</h3>
          <p style={paragraphStyle}>
            Cultural perspectives on <strong>ideal body weight vary significantly worldwide</strong>, influencing <strong>health behaviors and clinical approaches</strong>: 1) <strong>Western cultures</strong> often emphasize <strong>slender body ideals</strong> with potential for <strong>unrealistic weight expectations</strong>, 2) <strong>Some African and Pacific cultures</strong> traditionally value <strong>larger body sizes</strong> as indicators of <strong>health, prosperity, and fertility</strong>, 3) <strong>Asian perspectives</strong> frequently emphasize <strong>balance and harmony</strong> with nature over specific weight targets, 4) <strong>Indigenous knowledge systems</strong> often integrate <strong>weight within holistic health frameworks</strong> considering <strong>spiritual, community, and environmental dimensions</strong>. Effective <strong>global health strategies</strong> must respect <strong>cultural diversity while promoting evidence-based health practices</strong>. This requires <strong>culturally sensitive communication approaches</strong> that bridge <strong>scientific evidence with local health beliefs and practices</strong>.
          </p>

          <h3 style={sectionTitleStyle}><i className="fas fa-exclamation-triangle"></i> Key Factors in IBW Interpretation - Comprehensive Medical Assessment Considerations</h3>
          <p style={paragraphStyle}>Multiple <strong>significant physiological and demographic factors</strong> influence <strong>Ideal Body Weight interpretation parameters</strong> and require consideration for appropriate clinical decision-making:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Ethnic-Specific Variations:</strong> Asian population smaller frame adjustments, African descent population different bone density patterns, and indigenous population unique metabolic profiles significantly affect <strong>IBW calculation accuracy and medication dosing validity</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Age-Related Changes:</strong> Pediatric growth curve considerations, adult metabolic rate variations, and elderly sarcopenia development patterns dramatically alter <strong>IBW interpretation frameworks and treatment correlation validities</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Muscle Mass Considerations:</strong> Athletic training physiological effects, occupational physical demands, and genetic muscle potential variations create <strong>specific IBW limitation scenarios requiring complementary body composition assessment approaches</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Body Composition Variables:</strong> Visceral fat accumulation patterns, subcutaneous fat distribution differences, and lean tissue mass variations demonstrate <strong>individualized health risk variations beyond simple weight classification metrics</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Measurement Accuracy Factors:</strong> Height measurement precision requirements, weight fluctuation temporal impacts, and anthropometric variation patterns affect <strong>IBW calculation reliability and longitudinal health tracking validity</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Health Status Interactions:</strong> Pregnancy weight physiological changes, edema pathological conditions, amputation surgical situations, and chronic disease metabolic states create <strong>specialized interpretation challenges requiring expert clinical assessment expertise</strong></li>
            <li><strong>Psychological Considerations:</strong> Body image perception influences, eating disorder risk factors, and weight stigma psychological impacts significantly influence <strong>IBW discussion approaches and treatment intervention acceptance likelihoods</strong></li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-user-md"></i> Practical Clinical Implementation Recommendations - Comprehensive Weight Management Guidelines</h3>
          <p style={paragraphStyle}>For optimal <strong>Ideal Body Weight assessment implementation</strong> in contemporary clinical practice environments and <strong>evidence-based weight management protocols</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Standardized Measurement Protocol:</strong> Implement <strong>accurate height measurement techniques, precise weight assessment methods, consistent measurement condition controls, and proper equipment calibration procedures</strong> before clinical interpretation determination</li>
            <li style={{ marginBottom: '10px' }}><strong>Validated Classification Strategies:</strong> Utilize <strong>age-specific percentile charts for pediatric assessment, ethnic-adjusted cut-off values where applicable, and clinical context integration frameworks</strong> for accurate health risk categorization</li>
            <li style={{ marginBottom: '10px' }}><strong>Comprehensive Risk Assessment:</strong> Develop <strong>waist circumference measurement integration, blood pressure correlation analysis, laboratory parameter consideration, and family history evaluation approaches</strong> for holistic patient risk profiling</li>
            <li style={{ marginBottom: '10px' }}><strong>Individualized Intervention Planning:</strong> Establish <strong>personalized weight management targets, appropriate referral pathway algorithms, multidisciplinary team coordination frameworks, and longitudinal monitoring schedule optimization</strong> for optimal treatment outcomes</li>
            <li style={{ marginBottom: '10px' }}><strong>Patient Education Systems:</strong> Implement <strong>clear result interpretation guidance, realistic expectation setting protocols, sustainable lifestyle modification education, and behavioral change support provision</strong> for empowered patient participation</li>
            <li><strong>Multidisciplinary Collaboration Framework:</strong> Coordinate <strong>primary care physician-specialist communication, dietitian consultation integration, exercise physiologist involvement, and mental health professional support</strong> for comprehensive weight management care delivery</li>
          </ul>
        </div>

        {/* Q&A Dropdown Section */}
        <div style={faqSectionStyle}>
          <h2 style={faqTitleStyle}><i className="fas fa-question-circle"></i> Frequently Asked Questions About Ideal Body Weight</h2>
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
          <p style={paragraphStyle}><strong>This Ideal Body Weight calculator provides estimates for educational and informational purposes only.</strong> The calculations are based on standard medical formulas and should not be used as a substitute for professional medical advice, diagnosis, or treatment.</p>
          <p style={paragraphStyle}><strong>IBW Limitations Warning:</strong> These formulas do not account for individual variations in muscle mass, bone density, body composition, age-related changes, ethnic differences, or athletic training status. The results may not be appropriate for athletes, pregnant women, children, elderly individuals, or those with medical conditions affecting body composition.</p>
          <p style={paragraphStyle}><strong>Clinical Application Caution:</strong> While IBW calculations are used in clinical settings for medication dosing, healthcare professionals consider multiple factors including renal function, liver function, comorbidities, and specific drug characteristics. Never adjust medication doses based solely on IBW calculations without consulting healthcare providers.</p>
          <p style={paragraphStyle}><strong>Professional Consultation Required:</strong> Always seek the advice of your physician, registered dietitian, or other qualified healthcare provider with any questions regarding weight management, nutrition, medication dosing, or health conditions. Do not make significant changes to your diet, exercise regimen, or medications based solely on IBW calculations.</p>
          <p style={{ marginBottom: '10px' }}><strong>Comprehensive Health Assessment:</strong> IBW is just one component of health assessment. Comprehensive evaluation should include body composition analysis, metabolic testing, fitness assessment, and medical screening when appropriate. Weight represents only one aspect of overall health and wellbeing.</p>
          <p><strong>Individual Variation:</strong> Healthy weight ranges vary significantly based on genetics, lifestyle, medical history, and personal circumstances. These calculations provide general guidelines that should be interpreted in the context of your overall health profile and in consultation with healthcare professionals.</p>
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
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Medical-grade weight management program</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>250px height ad slot</p>
            </div>
            
            {/* Advertisement 2 */}
            <div style={sidebarAdStyle}>
              <p><i className="fas fa-ad"></i> Advertisement 2</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Featured Product</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Professional body composition scale</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>250px height ad slot</p>
            </div>
            
            {/* Sticky Advertisement 3 */}
            <div style={stickyAdStyle}>
              <p><i className="fas fa-thumbtack"></i> Sticky Advertisement</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Premium Content - Stays visible</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Clinical nutrition consultation service</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>250px sticky ad</p>
            </div>
            
            {/* Advertisement 4 */}
            <div style={sidebarAdStyle}>
              <p><i className="fas fa-ad"></i> Advertisement 4</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>New Product</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Advanced fitness tracking devices</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>250px height ad slot</p>
            </div>
            
            {/* Advertisement 5 */}
            <div style={sidebarAdStyle}>
              <p><i className="fas fa-ad"></i> Advertisement 5</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Training Equipment</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Home gym strength equipment</p>
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
            <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Perfect for on-the-go tracking</p>
          </div>
        </div>
      )}
      
      {/* Sticky Footer Ad (Mobile) */}
      {!showSidebar && (
        <div style={stickyFooterAdStyle}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ textAlign: 'left', flex: 1 }}>
              <p style={{ fontSize: '0.9rem', margin: 0, color: '#2c3e50' }}>
                <i className="fas fa-mobile-alt"></i> Weight Tracker Pro
              </p>
              <p style={{ fontSize: '0.8rem', margin: '5px 0 0 0', color: '#666' }}>
                Track your ideal weight progress - Free download
              </p>
            </div>
            <button style={{
              background: '#27ae60',
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