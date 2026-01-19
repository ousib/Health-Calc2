// src/app/lbm-calculator/page.js
"use client";

import { useState, useEffect } from 'react';

export default function LBMCalculatorPage() {
  const [currentUnit, setCurrentUnit] = useState('metric');
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState('80');
  const [height, setHeight] = useState('180');
  const [calculationMethod, setCalculationMethod] = useState('boer');
  const [results, setResults] = useState(null);
  const [vizPercentage, setVizPercentage] = useState(50);
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [history, setHistory] = useState([]);

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
    padding: '10px 20px',
    background: '#f1f3f5',
    border: '2px solid #dfe6e9',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.3s'
  };

  const activeUnitButtonStyle = {
    background: '#2980b9',
    color: 'white',
    borderColor: '#2980b9'
  };

  const methodSelectionStyle = {
    margin: '20px 0',
    padding: '20px',
    background: '#f8f9fa',
    borderRadius: '10px'
  };

  const methodTabsStyle = {
    display: 'flex',
    gap: '10px',
    marginTop: '15px',
    flexWrap: 'wrap'
  };

  const methodTabStyle = {
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

  const activeMethodTabStyle = {
    background: '#2980b9',
    color: 'white',
    borderColor: '#2980b9'
  };

  const calcBtnStyle = {
    width: '100%',
    padding: '16px',
    background: '#2980b9',
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
    background: '#2471a3',
    transform: 'translateY(-2px)',
    boxShadow: '0 5px 15px rgba(41, 128, 185, 0.2)'
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

  const lbmCardStyle = {
    borderTopColor: '#2980b9'
  };

  const fatCardStyle = {
    borderTopColor: '#e74c3c'
  };

  const compositionCardStyle = {
    borderTopColor: '#27ae60'
  };

  const metabolicCardStyle = {
    borderTopColor: '#9b59b6'
  };

  const resultValueStyle = {
    fontSize: '2.5rem',
    fontWeight: '800',
    margin: '10px 0'
  };

  const muscleFatVizStyle = {
    margin: '30px 0',
    padding: '20px',
    background: 'white',
    borderRadius: '10px',
    boxShadow: '0 3px 10px rgba(0,0,0,0.05)'
  };

  const vizBarStyle = {
    height: '40px',
    background: `linear-gradient(90deg, #2980b9 ${vizPercentage}%, #e74c3c ${vizPercentage}%)`,
    borderRadius: '20px',
    margin: '20px 0',
    position: 'relative',
    overflow: 'hidden'
  };

  const vizPercentagesStyle = {
    position: 'absolute',
    top: '50%',
    left: '0',
    right: '0',
    transform: 'translateY(-50%)',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 20px',
    color: 'white',
    fontWeight: 'bold',
    textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
  };

  const vizLabelsStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.9rem',
    color: '#7f8c8d',
    marginTop: '5px'
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
    borderLeft: '4px solid #2980b9',
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
    background: '#e3f2fd',
    border: '2px solid #2980b9',
    boxShadow: '0 4px 12px rgba(41, 128, 185, 0.15)',
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
    borderTop: '2px solid #2980b9',
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
    background: '#2980b9',
    color: 'white',
    transform: 'translateY(-2px)',
    boxShadow: '0 3px 10px rgba(41, 128, 185, 0.2)',
    borderColor: '#2980b9'
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

  const fitnessGoalsStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px',
    margin: '25px 0'
  };

  const goalCardStyle = {
    padding: '20px',
    background: '#f8f9fa',
    borderRadius: '10px',
    borderLeft: '4px solid #2980b9',
    transition: 'all 0.3s'
  };

  const goalCardHoverStyle = {
    background: '#e8f4fd',
    transform: 'translateY(-3px)'
  };

  const athleteComparisonsStyle = {
    margin: '30px 0',
    padding: '20px',
    background: 'white',
    borderRadius: '10px',
    boxShadow: '0 3px 10px rgba(0,0,0,0.05)'
  };

  const athleteGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px',
    marginTop: '15px'
  };

  const athleteCardStyle = {
    padding: '15px',
    background: '#f8f9fa',
    borderRadius: '8px',
    textAlign: 'center'
  };

  const athleteValueStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#2980b9',
    margin: '5px 0'
  };

  // Related calculators
  // Related calculators - ALL calculators from your list
const relatedCalculators = [
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

  // FAQs
  const faqs = [
    {
      question: "What's the difference between Lean Body Mass and Body Fat Percentage? Which is more important for athletes?",
      answer: "Lean Body Mass (LBM) represents all non-fat tissue including muscles, bones, organs, and body water, while Body Fat Percentage specifically measures fat tissue. For athletes, both metrics are crucial but serve different purposes. LBM directly correlates with strength potential and metabolic rate, making it essential for performance athletes. Body fat percentage indicates energy reserves and can affect endurance. Most athletes benefit from tracking both: optimizing LBM for strength/power sports and managing body fat for weight-class or aesthetic sports. The ideal balance depends on sport-specific requirements, with strength athletes typically aiming for higher LBM percentages (75-85%) and endurance athletes often maintaining lower levels (65-75%)."
    },
    {
      question: "How accurate are LBM formulas compared to DEXA scans or hydrostatic weighing?",
      answer: "LBM formulas provide reasonable estimates but cannot match the precision of direct measurement methods. Mathematical formulas like Boer, James, and Hume typically have accuracy within ±5-10% compared to DEXA scans, which are considered the gold standard with ±1-2% accuracy. Hydrostatic weighing offers ±2-3% accuracy. The main limitations of formulas include: 1) Not accounting for individual variations in bone density, 2) Limited accuracy for extreme body types, 3) Not detecting fluid retention changes, 4) Gender-specific assumptions that may not apply to all individuals. For clinical purposes or elite athletic monitoring, DEXA is recommended. For general tracking and fitness purposes, formulas provide sufficient guidance when used consistently with the same method."
    },
    {
      question: "Can I gain lean body mass while losing fat? What's the optimal approach?",
      answer: "Yes, simultaneous muscle gain and fat loss (body recomposition) is possible, particularly for beginners, those returning to training, or individuals with higher body fat percentages. The optimal approach involves: 1) Modest calorie deficit (200-500 calories below maintenance), 2) High protein intake (2.2-2.6g per kg of target body weight), 3) Progressive resistance training 3-5 times weekly, 4) Strategic carbohydrate timing around workouts, 5) Adequate sleep and recovery. Advanced athletes find body recomposition more challenging due to diminishing returns. Success rates vary: Beginners may gain 0.5-1kg LBM monthly while losing fat; intermediate lifters typically manage 0.25-0.5kg monthly; advanced athletes often need separate bulk/cut phases. Regular tracking with measurements and photos helps monitor progress."
    },
    {
      question: "How does age affect lean body mass? What are effective strategies for maintaining LBM as we age?",
      answer: "Age significantly impacts lean body mass through sarcopenia (age-related muscle loss), typically beginning around age 30 with 3-8% loss per decade accelerating after 60. Contributing factors include: hormonal changes, decreased protein synthesis, reduced physical activity, and neurological changes. Effective strategies to preserve LBM include: 1) Resistance training 2-3 times weekly with progressive overload, 2) Increased protein intake (1.2-1.6g/kg for healthy older adults, 1.6-2.0g/kg for those with sarcopenia), 3) Leucine-rich protein sources (whey, eggs, lean meats) to stimulate muscle protein synthesis, 4) Vitamin D and omega-3 supplementation, 5) Adequate sleep and stress management. Research shows older adults can still gain significant muscle mass (20-30% increases) with proper training and nutrition, though at slower rates than younger individuals."
    },
    {
      question: "What's the relationship between LBM and metabolism? How much does muscle mass actually increase calorie burn?",
      answer: "Lean body mass is the primary determinant of resting metabolic rate (RMR), with each kilogram of muscle burning approximately 13 calories daily at rest versus 4.5 calories per kilogram of fat. However, popular claims that 'muscle burns 50-100 calories per pound' are exaggerated. The metabolic impact includes: 1) Direct energy expenditure (13 cal/kg/day), 2) Energy cost of muscle repair and turnover, 3) Increased energy expenditure during physical activity. While adding 5kg of muscle might only increase RMR by 65 calories daily, the cumulative effects are significant: increased workout capacity, higher non-exercise activity thermogenesis, and better nutrient partitioning. More importantly, higher LBM improves insulin sensitivity, supports hormone balance, and enhances long-term metabolic health beyond simple calorie calculations."
    },
    {
      question: "How should protein intake be calculated based on lean body mass versus total body weight?",
      answer: "Protein requirements based on lean body mass provide more personalized recommendations than total body weight calculations, especially for overweight individuals. The optimal approach: 1) Calculate current LBM using validated formulas, 2) Determine protein needs based on LBM and activity level: Sedentary: 1.2-1.4g/kg LBM, Recreational training: 1.6-2.0g/kg LBM, Strength athletes: 2.2-2.6g/kg LBM, During calorie deficit: 2.3-3.1g/kg LBM to preserve muscle, 3) Distribute protein evenly across 3-5 meals (20-40g per meal), 4) Prioritize complete proteins and leucine-rich sources. For a 100kg person with 30% body fat (70kg LBM), protein needs would be 112-182g daily for strength training versus 160-200g if calculated on total weight. LBM-based calculations prevent overconsumption while ensuring adequate muscle support."
    }
  ];

  // Sample data for demo
  useEffect(() => {
    // Generate sample history
    const historyData = [];
    for (let i = 0; i < 5; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const lbm = 60 + Math.floor(Math.random() * 5);
      
      historyData.push({
        date: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        lbm: lbm.toFixed(1),
        weight: Math.floor(Math.random() * 5) + 80,
        height: 180
      });
    }
    setHistory(historyData);

    // Calculate initial results
    calculateLBM();
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

  const toggleUnits = (unit) => {
    setCurrentUnit(unit);
    setResults(null);
  };

  const selectMethod = (method) => {
    setCalculationMethod(method);
    setResults(null);
  };

  const calculateLBM = () => {
    const weightValue = parseFloat(weight);
    const heightValue = parseFloat(height);
    
    if (!weightValue || !heightValue || weightValue <= 0 || heightValue <= 0) {
      alert('Please enter valid height and weight values.');
      return;
    }
    
    let weightKg = weightValue;
    let heightCm = heightValue;
    
    if (currentUnit === 'imperial') {
      weightKg = weightValue * 0.453592;
      heightCm = heightValue * 2.54;
    }
    
    let lbm = 0;
    let methodName = '';
    
    switch(calculationMethod) {
      case 'boer':
        if (gender === 'male') {
          lbm = (0.407 * weightKg) + (0.267 * heightCm) - 19.2;
        } else {
          lbm = (0.252 * weightKg) + (0.473 * heightCm) - 48.3;
        }
        methodName = 'Boer Formula';
        break;
        
      case 'james':
        if (gender === 'male') {
          lbm = (1.10 * weightKg) - (128 * (weightKg * weightKg) / (heightCm * heightCm));
        } else {
          lbm = (1.07 * weightKg) - (148 * (weightKg * weightKg) / (heightCm * heightCm));
        }
        methodName = 'James Formula';
        break;
        
      case 'hume':
        if (gender === 'male') {
          lbm = (0.32810 * weightKg) + (0.33929 * heightCm) - 29.5336;
        } else {
          lbm = (0.29569 * weightKg) + (0.41813 * heightCm) - 43.2933;
        }
        methodName = 'Hume Formula';
        break;
    }
    
    if (lbm <= 0 || lbm > weightKg) {
      alert('Calculation resulted in an unrealistic value. Please check your inputs and try a different method.');
      return;
    }
    
    const fatMass = weightKg - lbm;
    const fatPercentage = (fatMass / weightKg) * 100;
    const lbmPercentage = (lbm / weightKg) * 100;
    
    // Calculate Basal Metabolic Rate (BMR) based on LBM
    const bmr = 370 + (21.6 * lbm);
    
    // Calculate TDEE based on activity level (estimated)
    const tdee = bmr * 1.55; // Moderate activity
    
    let displayLBM = lbm;
    let displayFatMass = fatMass;
    let unit = 'kg';
    
    if (currentUnit === 'imperial') {
      displayLBM = Math.round(lbm * 2.20462 * 10) / 10;
      displayFatMass = Math.round(fatMass * 2.20462 * 10) / 10;
      unit = 'lbs';
    } else {
      displayLBM = Math.round(lbm * 10) / 10;
      displayFatMass = Math.round(fatMass * 10) / 10;
    }
    
    setVizPercentage(lbmPercentage);
    setResults({
      lbm: displayLBM,
      fatMass: displayFatMass,
      fatPercentage: Math.round(fatPercentage * 10) / 10,
      lbmPercentage: Math.round(lbmPercentage * 10) / 10,
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      unit,
      methodName,
      values: {
        weight: weightValue,
        height: heightValue,
        gender: gender,
        unitSystem: currentUnit
      }
    });
  };

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  // Calculate ideal protein intake based on LBM
  const calculateProteinNeeds = () => {
    if (!results) return 'N/A';
    const proteinPerKg = 1.6; // Moderate activity level
    const proteinNeeds = (results.lbm * proteinPerKg).toFixed(1);
    return `${proteinNeeds}g per day`;
  };

  return (
    <main style={containerStyle}>
      <section style={calculatorBoxStyle}>
        <h1 style={calcTitleStyle}>
          <i className="fas fa-dumbbell"></i> Comprehensive Lean Body Mass Calculator - Advanced Muscle Mass Analysis & Metabolic Assessment Platform
        </h1>
        <p style={calcDescStyle}>
          Calculate your <strong>precise Lean Body Mass, analyze muscle-fat composition ratios, and optimize protein intake strategies</strong> using <strong>validated scientific formulas, comprehensive anthropometric algorithms, and evidence-based metabolic analysis protocols</strong>. Essential for <strong>strength training optimization, body recomposition planning, metabolic rate calculation accuracy, and informed fitness program design</strong>.
        </p>

        <div style={unitToggleStyle}>
          <button 
            style={{
              ...unitButtonStyle,
              ...(currentUnit === 'metric' ? activeUnitButtonStyle : {})
            }}
            onClick={() => toggleUnits('metric')}
          >
            Metric (kg/cm)
          </button>
          <button 
            style={{
              ...unitButtonStyle,
              ...(currentUnit === 'imperial' ? activeUnitButtonStyle : {})
            }}
            onClick={() => toggleUnits('imperial')}
          >
            Imperial (lbs/in)
          </button>
        </div>

        <div style={inputGridStyle}>
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-venus-mars"></i> Gender *</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              style={selectStyle}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}>
              <i className="fas fa-weight"></i> Weight *
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder={currentUnit === 'metric' ? '80' : '176'}
              min={currentUnit === 'metric' ? '30' : '66'}
              max={currentUnit === 'metric' ? '300' : '661'}
              step="0.1"
              style={inputStyle}
              required
            />
            <small style={{ color: '#666', fontSize: '0.8rem' }}>
              {currentUnit === 'metric' ? 'Kilograms (kg)' : 'Pounds (lbs)'}
            </small>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}>
              <i className="fas fa-ruler-vertical"></i> Height *
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder={currentUnit === 'metric' ? '180' : '71'}
              min={currentUnit === 'metric' ? '100' : '39'}
              max={currentUnit === 'metric' ? '250' : '98'}
              step="0.1"
              style={inputStyle}
              required
            />
            <small style={{ color: '#666', fontSize: '0.8rem' }}>
              {currentUnit === 'metric' ? 'Centimeters (cm)' : 'Inches (in)'}
            </small>
          </div>
        </div>

        <div style={methodSelectionStyle}>
          <label style={inputGroupLabelStyle}><i className="fas fa-calculator"></i> Calculation Method</label>
          <div style={methodTabsStyle}>
            <button
              style={{
                ...methodTabStyle,
                ...(calculationMethod === 'boer' ? activeMethodTabStyle : {})
              }}
              onClick={() => selectMethod('boer')}
            >
              <i className="fas fa-brain"></i> Boer Formula (Most Accurate)
            </button>
            <button
              style={{
                ...methodTabStyle,
                ...(calculationMethod === 'james' ? activeMethodTabStyle : {})
              }}
              onClick={() => selectMethod('james')}
            >
              <i className="fas fa-user-md"></i> James Formula (Alternative)
            </button>
            <button
              style={{
                ...methodTabStyle,
                ...(calculationMethod === 'hume' ? activeMethodTabStyle : {})
              }}
              onClick={() => selectMethod('hume')}
            >
              <i className="fas fa-flask"></i> Hume Formula (Research-Backed)
            </button>
          </div>
        </div>

        <button
          style={calcBtnStyle}
          onClick={calculateLBM}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, calcBtnHoverStyle)}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = calcBtnStyle.background;
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <i className="fas fa-calculator"></i> Calculate Lean Body Mass & Metabolic Metrics
        </button>

        {/* Results Display */}
        {results && (
          <div style={resultsContainerStyle}>
            <div style={{ ...resultCardStyle, ...lbmCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-dumbbell"></i> Lean Body Mass Analysis</h4>
              <div style={{ margin: '20px 0' }}>
                <div style={{ ...resultValueStyle, color: '#2980b9' }}>
                  {results.lbm.toLocaleString()} {results.unit}
                </div>
                <div style={{ 
                  fontSize: '1.2rem', 
                  color: '#666',
                  marginBottom: '15px',
                  fontWeight: 'bold'
                }}>
                  {results.lmPercentage}% of Total Body Weight
                </div>
                <div style={{ 
                  padding: '15px', 
                  background: '#e8f4fd',
                  borderRadius: '8px',
                  color: '#2471a3',
                  fontWeight: '600',
                  marginBottom: '15px'
                }}>
                  Metabolic Engine: {results.bmr.toLocaleString()} cal/day (BMR)
                </div>
                <div style={{ 
                  padding: '10px', 
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  color: '#666'
                }}>
                  <div><strong>Method:</strong> {results.methodName}</div>
                  <div><strong>Fat-Free Mass:</strong> Includes muscles, bones, organs, water</div>
                  <div><strong>Metabolic Rate:</strong> Primary determinant of calorie needs</div>
                </div>
              </div>
            </div>

            <div style={{ ...resultCardStyle, ...fatCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-fire"></i> Body Fat Analysis</h4>
              <div style={{ margin: '20px 0' }}>
                <div style={{ ...resultValueStyle, color: '#e74c3c' }}>
                  {results.fatMass.toLocaleString()} {results.unit}
                </div>
                <div style={{ 
                  fontSize: '1.2rem', 
                  color: '#666',
                  marginBottom: '15px',
                  fontWeight: 'bold'
                }}>
                  {results.fatPercentage}% Body Fat
                </div>
                <div style={{ 
                  padding: '15px', 
                  background: '#fdeaea',
                  borderRadius: '8px',
                  color: '#c0392b',
                  fontWeight: '600',
                  marginBottom: '15px'
                }}>
                  Classification: {results.fatPercentage < 15 ? 'Athletic' : 
                                 results.fatPercentage < 20 ? 'Fit' : 
                                 results.fatPercentage < 25 ? 'Average' : 
                                 results.fatPercentage < 30 ? 'Above Average' : 'High'}
                </div>
                <div style={{ 
                  padding: '10px', 
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  color: '#666'
                }}>
                  <div><strong>Energy Reserve:</strong> {Math.round(results.fatMass * 7700)} stored calories</div>
                  <div><strong>Health Impact:</strong> Affects hormone balance and inflammation</div>
                  <div><strong>Distribution:</strong> Consider waist measurement for health risk</div>
                </div>
              </div>
            </div>

            <div style={{ ...resultCardStyle, ...compositionCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-chart-pie"></i> Composition Breakdown</h4>
              <div style={{ margin: '20px 0' }}>
                <div style={muscleFatVizStyle}>
                  <div style={vizBarStyle}>
                    <div style={vizPercentagesStyle}>
                      <span>{Math.round(results.lbmPercentage)}%</span>
                      <span>{Math.round(results.fatPercentage)}%</span>
                    </div>
                  </div>
                  <div style={vizLabelsStyle}>
                    <span><i className="fas fa-dumbbell"></i> Lean Mass</span>
                    <span><i className="fas fa-fire"></i> Fat Mass</span>
                  </div>
                </div>
                <div style={{ 
                  padding: '10px', 
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  color: '#666',
                  marginTop: '15px'
                }}>
                  <div><strong>Muscle Quality:</strong> Higher LBM indicates better metabolic health</div>
                  <div><strong>Optimal Ratio:</strong> Varies by gender, age, and fitness goals</div>
                  <div><strong>Tracking Value:</strong> More meaningful than scale weight alone</div>
                </div>
              </div>
            </div>

            <div style={{ ...resultCardStyle, ...metabolicCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-bolt"></i> Metabolic Insights</h4>
              <div style={{ margin: '20px 0' }}>
                <div style={{ 
                  padding: '15px', 
                  background: '#f5eef8',
                  borderRadius: '8px',
                  marginBottom: '15px'
                }}>
                  <div style={{ fontSize: '0.9rem', marginBottom: '10px' }}><strong>Energy Expenditure:</strong></div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 0',
                    borderBottom: '1px solid #eee'
                  }}>
                    <span style={{ fontSize: '0.9rem', width: '60%' }}>Basal Metabolic Rate (BMR)</span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#9b59b6', width: '40%', textAlign: 'right' }}>
                      {results.bmr.toLocaleString()} cal/day
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 0',
                    borderBottom: '1px solid #eee'
                  }}>
                    <span style={{ fontSize: '0.9rem', width: '60%' }}>Total Daily Energy Expenditure (TDEE)</span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#9b59b6', width: '40%', textAlign: 'right' }}>
                      {results.tdee.toLocaleString()} cal/day
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 0'
                  }}>
                    <span style={{ fontSize: '0.9rem', width: '60%' }}>Protein Requirement</span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#9b59b6', width: '40%', textAlign: 'right' }}>
                      {calculateProteinNeeds()}
                    </span>
                  </div>
                </div>
                <div style={{ 
                  padding: '10px', 
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  color: '#666'
                }}>
                  <strong>Muscle Metabolism:</strong> Each kg of muscle burns ~13 calories daily at rest<br/>
                  <strong>Metabolic Advantage:</strong> Higher LBM improves insulin sensitivity<br/>
                  <strong>Practical Application:</strong> Use LBM for accurate calorie calculations
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Fitness Goals */}
        {results && (
          <div style={fitnessGoalsStyle}>
            <div 
              style={goalCardStyle}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, goalCardHoverStyle)}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = goalCardStyle.background;
                e.currentTarget.style.transform = 'none';
              }}
            >
              <h4 style={{marginBottom: '10px', color: '#2c3e50', display: 'flex', alignItems: 'center', gap: '8px'}}>
                <i className="fas fa-bullseye"></i> Strength Training Goal
              </h4>
              <p style={{fontSize: '0.85rem', color: '#666'}}>Aim to increase LBM by 0.25-0.5 kg per month through progressive overload and adequate protein intake (1.6-2.2g per kg of body weight daily).</p>
            </div>
            <div 
              style={goalCardStyle}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, goalCardHoverStyle)}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = goalCardStyle.background;
                e.currentTarget.style.transform = 'none';
              }}
            >
              <h4 style={{marginBottom: '10px', color: '#2c3e50', display: 'flex', alignItems: 'center', gap: '8px'}}>
                <i className="fas fa-weight-loss"></i> Fat Loss Strategy
              </h4>
              <p style={{fontSize: '0.85rem', color: '#666'}}>Preserve LBM during calorie deficit by maintaining protein intake at 2.3-3.1g per kg of LBM and continuing resistance training 2-3 times weekly.</p>
            </div>
            <div 
              style={goalCardStyle}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, goalCardHoverStyle)}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = goalCardStyle.background;
                e.currentTarget.style.transform = 'none';
              }}
            >
              <h4 style={{marginBottom: '10px', color: '#2c3e50', display: 'flex', alignItems: 'center', gap: '8px'}}>
                <i className="fas fa-heartbeat"></i> Metabolic Health
              </h4>
              <p style={{fontSize: '0.85rem', color: '#666'}}>Higher LBM improves insulin sensitivity (up to 30% better) and increases resting metabolic rate by approximately 65 calories per 5kg of muscle mass.</p>
            </div>
            <div 
              style={goalCardStyle}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, goalCardHoverStyle)}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = goalCardStyle.background;
                e.currentTarget.style.transform = 'none';
              }}
            >
              <h4 style={{marginBottom: '10px', color: '#2c3e50', display: 'flex', alignItems: 'center', gap: '8px'}}>
                <i className="fas fa-utensils"></i> Protein Needs
              </h4>
              <p style={{fontSize: '0.85rem', color: '#666'}}>Based on your LBM of {results.lbm} {results.unit}, aim for {calculateProteinNeeds()} to support muscle maintenance and growth.</p>
            </div>
          </div>
        )}

        {/* Athlete Comparisons */}
        {results && (
          <div style={athleteComparisonsStyle}>
            <h4 style={{marginBottom: '15px', color: '#2c3e50', display: 'flex', alignItems: 'center', gap: '8px'}}>
              <i className="fas fa-trophy"></i> LBM Benchmarks by Fitness Level
            </h4>
            <p style={{fontSize: '0.9rem', color: '#666', marginBottom: '15px'}}>
              Compare your Lean Body Mass percentage with different fitness levels (typical ranges):
            </p>
            
            <div style={athleteGridStyle}>
              <div style={athleteCardStyle}>
                <div><i className="fas fa-user" style={{color: '#7f8c8d', fontSize: '1.2rem'}}></i></div>
                <div style={athleteValueStyle}>65-75%</div>
                <div style={{fontSize: '0.85rem', color: '#666'}}>Average Adult</div>
                <div style={{fontSize: '0.75rem', color: '#999', marginTop: '5px'}}>Minimal exercise</div>
              </div>
              <div style={athleteCardStyle}>
                <div><i className="fas fa-running" style={{color: '#27ae60', fontSize: '1.2rem'}}></i></div>
                <div style={athleteValueStyle}>75-85%</div>
                <div style={{fontSize: '0.85rem', color: '#666'}}>Recreational Athlete</div>
                <div style={{fontSize: '0.75rem', color: '#999', marginTop: '5px'}}>3-5 workouts/week</div>
              </div>
              <div style={athleteCardStyle}>
                <div><i className="fas fa-medal" style={{color: '#f39c12', fontSize: '1.2rem'}}></i></div>
                <div style={athleteValueStyle}>80-90%</div>
                <div style={{fontSize: '0.85rem', color: '#666'}}>Competitive Athlete</div>
                <div style={{fontSize: '0.75rem', color: '#999', marginTop: '5px'}}>Sport-specific training</div>
              </div>
              <div style={athleteCardStyle}>
                <div><i className="fas fa-weight" style={{color: '#e74c3c', fontSize: '1.2rem'}}></i></div>
                <div style={athleteValueStyle}>85-95%</div>
                <div style={{fontSize: '0.85rem', color: '#666'}}>Elite Bodybuilder</div>
                <div style={{fontSize: '0.75rem', color: '#999', marginTop: '5px'}}>Peak competition</div>
              </div>
            </div>
            
            <div style={{
              marginTop: '20px',
              padding: '10px',
              background: '#e8f4fd',
              borderRadius: '8px',
              fontSize: '0.85rem',
              color: '#2471a3'
            }}>
              <i className="fas fa-info-circle" style={{marginRight: '8px'}}></i>
              Your LBM percentage: <strong>{results.lbmPercentage}%</strong> ({results.fatPercentage}% body fat)
            </div>
          </div>
        )}

        {/* Enhanced SEO Content */}
        <div style={infoSectionStyle}>
          <h3 style={sectionTitleStyle}><i className="fas fa-question-circle"></i> Comprehensive Lean Body Mass Analysis: Advanced Muscle Mass Assessment & Metabolic Health Optimization Protocol</h3>
          <p style={paragraphStyle}><strong>Lean Body Mass calculation methodologies</strong> represent <strong>critical physiological assessment tools</strong> for determining <strong>precise body composition parameters, metabolic rate estimation algorithms, and evidence-based fitness optimization strategies</strong>. These advanced calculations integrate <strong>validated scientific formulas, comprehensive anthropometric data analysis, and current exercise physiology research</strong> to provide <strong>individualized muscle mass assessment approaches</strong> that maximize <strong>strength training effectiveness, metabolic health optimization, and informed nutritional intervention decision-making processes</strong> across diverse fitness levels requiring <strong>precision body composition tracking protocols</strong>.</p>
          
          <h3 style={sectionTitleStyle}><i className="fas fa-calculator"></i> Advanced LBM Algorithms - Scientific Muscle Mass Assessment Formulae</h3>
          <p style={paragraphStyle}>Multiple <strong>validated Lean Body Mass calculation equations</strong> exist for <strong>comprehensive body composition assessment protocols</strong>, each demonstrating specific <strong>clinical applications and variable accuracy profiles</strong> influencing <strong>fitness intervention decision-making processes</strong>:</p>
          
          <div style={formulaBoxStyle}>
            <strong>Boer Formula (Most Accurate):</strong><br/>
            Men: LBM = 0.407 × weight (kg) + 0.267 × height (cm) - 19.2<br/>
            Women: LBM = 0.252 × weight (kg) + 0.473 × height (cm) - 48.3<br/><br/>
            
            <strong>James Formula (Alternative):</strong><br/>
            Men: LBM = 1.10 × weight (kg) - 128 × (weight²/height²)<br/>
            Women: LBM = 1.07 × weight (kg) - 148 × (weight²/height²)<br/><br/>
            
            <strong>Hume Formula (Research-Backed):</strong><br/>
            Men: LBM = 0.32810 × weight (kg) + 0.33929 × height (cm) - 29.5336<br/>
            Women: LBM = 0.29569 × weight (kg) + 0.41813 × height (cm) - 43.2933<br/><br/>
            
            <strong>BMR Calculation from LBM:</strong><br/>
            BMR = 370 + (21.6 × LBM in kg) (Katch-McArdle equation)<br/><br/>
            
            <strong>Protein Requirement Calculation:</strong><br/>
            Protein (g/day) = LBM (kg) × 1.6-2.2 (activity level dependent)<br/><br/>
            
            <strong>Metabolic Equivalent from LBM:</strong><br/>
            Daily Caloric Expenditure = BMR × Activity Multiplier (1.2-1.9)
          </div>

          <h3 style={sectionTitleStyle}><i className="fas fa-dumbbell"></i> Clinical Applications of LBM Analysis - Comprehensive Fitness Optimization Guidelines</h3>
          <p style={paragraphStyle}>Accurate <strong>Lean Body Mass assessment methodology implementation</strong> serves critical functions across multiple <strong>health and fitness domains</strong> requiring <strong>precise muscle mass tracking strategies</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Strength Training Optimization:</strong> Essential for <strong>progressive overload programming, muscle hypertrophy tracking, and performance plateau identification approaches</strong> in athletic development protocols</li>
            <li style={{ marginBottom: '10px' }}><strong>Nutritional Planning Precision:</strong> Guides <strong>protein requirement calculations, calorie target determinations, and nutrient timing strategies</strong> for optimal muscle protein synthesis activation</li>
            <li style={{ marginBottom: '10px' }}><strong>Metabolic Health Assessment:</strong> Determines <strong>insulin sensitivity prediction models, metabolic syndrome risk stratification, and cardiovascular health correlation frameworks</strong> for comprehensive metabolic profiling</li>
            <li style={{ marginBottom: '10px' }}><strong>Age-Related Health Monitoring:</strong> Essential for <strong>sarcopenia progression tracking, frailty risk assessment, and geriatric health optimization protocols</strong> in aging population management</li>
            <li style={{ marginBottom: '10px' }}><strong>Medical Treatment Personalization:</strong> Manages <strong>medication dosage calculations, anesthetic requirement determinations, and chemotherapy dosing protocols</strong> for personalized medical interventions</li>
            <li style={{ marginBottom: '10px' }}><strong>Weight Management Science:</strong> Coordinates <strong>body recomposition tracking, fat loss optimization, and muscle preservation strategies</strong> during calorie restriction phases</li>
            <li><strong>Sports Performance Analysis:</strong> Facilitates <strong>athlete classification systems, position-specific optimization, and competition weight management approaches</strong> for elite sports performance enhancement</li>
          </ul>
          
          <h3 style={sectionTitleStyle}><i className="fas fa-chart-line"></i> Key Factors in LBM Interpretation - Comprehensive Muscle Mass Assessment Considerations</h3>
          <p style={paragraphStyle}>Multiple <strong>significant physiological and demographic factors</strong> influence <strong>Lean Body Mass interpretation parameters</strong> and require consideration for appropriate fitness decision-making:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Gender-Specific Variations:</strong> Male higher muscle mass potential, female different fat distribution patterns, and hormonal influence variations significantly affect <strong>LBM interpretation accuracy and fitness goal setting validity</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Age-Related Changes:</strong> Peak muscle mass development timing, age-related sarcopenia progression rates, and hormonal decline patterns dramatically alter <strong>LBM expectation frameworks and training response predictions</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Training Status Considerations:</strong> Beginner rapid adaptation phases, intermediate slower progress rates, and advanced diminishing returns scenarios create <strong>specific LBM gain expectation adjustments requiring realistic timeline understanding</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Genetic Potential Variables:</strong> Muscle fiber type distribution differences, bone structure variations, and metabolic predisposition patterns demonstrate <strong>individualized response variations beyond standardized prediction models</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Measurement Accuracy Factors:</strong> Hydration status impacts, glycogen storage variations, and gastrointestinal content differences affect <strong>LBM calculation reliability and longitudinal tracking validity</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Health Status Interactions:</strong> Chronic disease metabolic effects, medication side impacts, recovery state variations, and injury rehabilitation phases create <strong>specialized interpretation challenges requiring contextual understanding</strong></li>
            <li><strong>Nutritional Status Influences:</strong> Protein intake adequacy, calorie balance status, micronutrient availability, and hydration levels significantly influence <strong>LBM maintenance capacity and muscle protein synthesis optimization</strong></li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-exclamation-triangle"></i> Limitations of LBM Calculations - Advanced Body Composition Assessment Methodologies</h3>
          <p style={paragraphStyle}>While <strong>Lean Body Mass calculation methodologies</strong> provide valuable <strong>muscle mass estimation tools</strong>, specific physiological situations necessitate <strong>advanced assessment approaches</strong> and <strong>comprehensive evaluation protocols</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Extreme Body Composition Cases:</strong> Professional bodybuilder muscle mass assessment, severe obesity evaluation, and cachexia patient monitoring demonstrating <strong>specialized assessment needs beyond standard LBM formula accuracy ranges</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Fluid Balance Disturbances:</strong> Edema condition assessments, dehydration states, diuretic medication effects, and renal disease fluid management showing <strong>unique measurement challenges requiring clinical interpretation expertise</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Bone Density Variations:</strong> Osteoporosis patient monitoring, adolescent bone development tracking, and athletic bone adaptation assessment creating <strong>specialized interpretation protocols beyond standard LBM applications</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Advanced Athletic Populations:</strong> Elite endurance athlete assessment, strength sport specialist evaluation, and gymnast body composition analysis affecting <strong>formula accuracy reliability and sport-specific application validity</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Precision Measurement Requirements:</strong> Dual-energy X-ray absorptiometry (DEXA) scanning technologies, magnetic resonance imaging (MRI) methodologies, and computed tomography (CT) techniques providing <strong>enhanced precision beyond mathematical LBM calculations</strong></li>
            <li><strong>Research and Clinical Applications:</strong> Pharmacological study requirements, surgical planning precision, critical care nutrition management, and longitudinal study accuracy enabling <strong>enhanced measurement approaches beyond population estimation tools</strong></li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-history"></i> Historical Development of LBM Science - Evolution of Body Composition Understanding</h3>
          <p style={paragraphStyle}>The progressive evolution of <strong>Lean Body Mass assessment and interpretation methodologies</strong> reflects <strong>decades of exercise physiology research advancement</strong> and <strong>scientific practice refinement trajectories</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Early Anthropometric Discovery Era:</strong> Recognition of <strong>muscle mass importance principles, body composition concepts, and athletic performance foundations</strong> establishing foundational exercise science knowledge systems</li>
            <li style={{ marginBottom: '10px' }}><strong>Mathematical Formula Development Period:</strong> Creation of <strong>height-weight regression frameworks, gender-specific coefficient determinations, and validation study standardization methods</strong> revolutionizing body composition estimation science</li>
            <li style={{ marginBottom: '10px' }}><strong>Modern LBM Standardization:</strong> Introduction of <strong>Boer, James, and Hume formula systems, clinical application guideline implementations, and fitness industry adoption protocols</strong> for consistent body composition assessment</li>
            <li style={{ marginBottom: '10px' }}><strong>Metabolic Correlation Recognition Phase:</strong> Identification of <strong>LBM-BMR relationship quantification, insulin sensitivity correlation coefficients, and health outcome prediction models</strong> for enhanced clinical application utility</li>
            <li style={{ marginBottom: '10px' }}><strong>Technological Advancement Integration:</strong> Implementation of <strong>bioelectrical impedance analysis (BIA) devices, air displacement plethysmography systems, and DEXA scanning technologies</strong> for comprehensive body composition evaluation</li>
            <li><strong>Digital Fitness Integration:</strong> Development of <strong>smart scale algorithms, mobile health application implementations, wearable sensor technologies, and artificial intelligence prediction models</strong> for accessible body composition monitoring</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-user-md"></i> Practical Fitness Implementation Recommendations - Comprehensive Muscle Mass Optimization Guidelines</h3>
          <p style={paragraphStyle}>For optimal <strong>Lean Body Mass assessment implementation</strong> in contemporary fitness practice environments and <strong>evidence-based muscle development protocols</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Standardized Measurement Protocol:</strong> Implement <strong>consistent time-of-day measurements, pre-measurement condition controls, equipment calibration procedures, and longitudinal tracking methodologies</strong> before fitness program adjustments</li>
            <li style={{ marginBottom: '10px' }}><strong>Validated Progress Tracking Strategies:</strong> Utilize <strong>multiple assessment method correlations, trend analysis approaches, rate-of-change calculations, and goal attainment percentage determinations</strong> for accurate progress monitoring</li>
            <li style={{ marginBottom: '10px' }}><strong>Comprehensive Program Design:</strong> Develop <strong>periodized training structures, nutritional periodization frameworks, recovery optimization protocols, and deloading strategy implementations</strong> for sustainable muscle development</li>
            <li style={{ marginBottom: '10px' }}><strong>Individualized Nutrition Planning:</strong> Establish <strong>protein intake timing strategies, calorie cycling approaches, nutrient density prioritization, and supplementation evidence-based protocols</strong> for optimal muscle protein synthesis</li>
            <li style={{ marginBottom: '10px' }}><strong>Recovery Optimization Systems:</strong> Implement <strong>sleep quality enhancement strategies, stress management techniques, active recovery protocols, and inflammation reduction approaches</strong> for maximal adaptation capacity</li>
            <li><strong>Multidisciplinary Collaboration Framework:</strong> Coordinate <strong>strength coach-exercise physiologist communication, sports dietitian consultation integration, physical therapist involvement, and sports psychologist support</strong> for comprehensive athletic development</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-rocket"></i> Future Directions in LBM Assessment - Emerging Body Composition Technologies</h3>
          <p style={paragraphStyle}>Ongoing <strong>Lean Body Mass research initiatives</strong> continue refining <strong>assessment and interpretation approaches</strong> with promising technological developments and <strong>innovative fitness monitoring methodologies</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Advanced Imaging Technologies:</strong> Portable DEXA systems, 3D body scanning applications, smartphone camera assessment algorithms, and wearable sensor networks for comprehensive muscle mass profiling</li>
            <li style={{ marginBottom: '10px' }}><strong>Artificial Intelligence Applications:</strong> Machine learning algorithm development for <strong>personalized muscle gain prediction models</strong> incorporating genetic data, training history, nutritional patterns, and recovery metrics</li>
            <li style={{ marginBottom: '10px' }}><strong>Molecular Level Monitoring:</strong> Muscle protein synthesis rate measurements, satellite cell activity tracking, myokine profile analysis, and genetic expression profiling for enhanced muscle adaptation understanding</li>
            <li style={{ marginBottom: '10px' }}><strong>Digital Fitness Platforms:</strong> Development of <strong>integrated training-nutrition-recovery systems, real-time adaptation monitoring applications, virtual coaching platforms, and community support solutions</strong> for scalable fitness optimization</li>
            <li style={{ marginBottom: '10px' }}><strong>Precision Nutrition Approaches:</strong> Genetic predisposition testing for muscle response, microbiome-based nutrient absorption optimization, metabolomic profiling for supplement personalization, and chrononutrition timing strategies</li>
            <li><strong>Global Health Innovations:</strong> Creation of <strong>low-cost assessment technologies, remote monitoring adaptations, community-based fitness programs, and telecoaching implementation strategies</strong> for equitable fitness access</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-graduation-cap"></i> Educational Requirements and Professional Training Standards Implementation</h3>
          <p style={paragraphStyle}>Proper <strong>Lean Body Mass interpretation methodology education</strong> represents an <strong>essential fitness professional competency requirement</strong> for <strong>health and exercise specialists</strong> across multiple disciplines. Comprehensive training curricula should systematically include <strong>body composition assessment principles, muscle physiology fundamentals, metabolic calculation strategies, and nutritional requirement determination methods</strong>. Continuing professional education programs must consistently address <strong>evolving research findings, changing best practice standards, and emerging technological developments</strong> to ensure optimal client outcomes and evidence-based practice implementation across diverse fitness, clinical, and athletic performance settings and specialty practice areas.</p>

          <h3 style={sectionTitleStyle}><i className="fas fa-clipboard-check"></i> Quality Assurance and Protocol Standardization Implementation</h3>
          <p style={paragraphStyle}>Implementation of <strong>rigorous quality assurance protocols</strong> ensures <strong>consistent body composition assessment practices</strong> across diverse fitness settings. These protocols encompass <strong>measurement standardization methodologies, equipment calibration requirements, interpretation guideline adherence, and program design implementation standards</strong> that directly impact <strong>client fitness outcomes and muscle development effectiveness</strong>. Professional organizations should develop <strong>standardized training materials, competency assessment tools, and best practice guideline documents</strong> to guarantee consistent application quality across diverse fitness delivery settings and specialty practice areas, ensuring optimal outcomes through evidence-based muscle development approaches.</p>
        </div>

        {/* Q&A Dropdown Section */}
        <div style={faqSectionStyle}>
          <h2 style={faqTitleStyle}><i className="fas fa-question-circle"></i> Frequently Asked Questions About Lean Body Mass</h2>
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

        {/* Related Calculators Mobile Section (when sidebar is hidden) - ALL Calculators */}
        {!showSidebar && (
          <div style={infoSectionStyle}>
            <h3 style={sectionTitleStyle}><i className="fas fa-calculator"></i> All Health Calculators</h3>
            <p style={paragraphStyle}>Explore our complete collection of health and fitness calculators for comprehensive wellness assessment:</p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '15px',
              marginTop: '20px',
              maxHeight: '500px',
              overflowY: 'auto',
              padding: '10px'
            }}>
              {relatedCalculators.map((calculator, index) => (
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
          <p style={paragraphStyle}><strong>This Lean Body Mass calculator provides estimates for educational and informational purposes only.</strong> The calculations are based on standard scientific formulas and should not be used as a substitute for professional medical advice, diagnosis, or treatment.</p>
          <p style={paragraphStyle}><strong>LBM Limitations Warning:</strong> These formulas provide estimates and may not account for individual variations in <strong>bone density, hydration status, muscle distribution, or ethnic differences</strong>. Athletes, elderly individuals, pregnant women, and those with medical conditions may get misleading results.</p>
          <p style={paragraphStyle}><strong>Professional Consultation Required:</strong> Always seek the advice of your physician, registered dietitian, or certified exercise professional with any questions regarding muscle development, nutrition, or health conditions. Do not make significant changes to your training or diet based solely on LBM calculations.</p>
          <p style={{ marginBottom: '10px' }}><strong>Comprehensive Fitness Assessment:</strong> LBM is just one component of fitness assessment. Comprehensive evaluation should include <strong>strength measurements, mobility assessments, cardiovascular fitness testing, and medical screening</strong> when appropriate.</p>
          <p style={{ marginBottom: '10px' }}><strong>Realistic Expectations:</strong> Muscle gain rates vary significantly based on <strong>training experience, genetics, age, gender, nutrition, and recovery</strong>. These calculations provide general guidelines that should be interpreted in the context of your individual circumstances and goals.</p>
          <p><strong>Safety First:</strong> Progress gradually with any new exercise program. Consult healthcare providers before beginning intensive training, especially if you have pre-existing health conditions, injuries, or concerns about your physical readiness for exercise.</p>
        </div>
      </section>

      {/* Sidebar with 5 Ads (3rd one sticky) + Calculator Links */}
      {showSidebar && (
        <aside style={sidebarStyle}>
          <div style={sidebarContentStyle}>
            {/* Advertisement 1 */}
            <div style={sidebarAdStyle}>
              <p><i className="fas fa-ad"></i> Advertisement 1</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Sponsored Content</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Premium fitness tracking app</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>250px height ad slot</p>
            </div>
            
            {/* Advertisement 2 */}
            <div style={sidebarAdStyle}>
              <p><i className="fas fa-ad"></i> Advertisement 2</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Featured Product</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Smart body composition scale</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>250px height ad slot</p>
            </div>
            
            {/* Sticky Advertisement 3 */}
            <div style={stickyAdStyle}>
              <p><i className="fas fa-thumbtack"></i> Sticky Advertisement</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Premium Content - Stays visible</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Complete muscle building program</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>250px sticky ad</p>
            </div>
            
            {/* Advertisement 4 */}
            <div style={sidebarAdStyle}>
              <p><i className="fas fa-ad"></i> Advertisement 4</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>New Product</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Advanced protein supplements</p>
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
            
            {/* Related Calculators Sidebar Section - ALL Calculators */}
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
                {relatedCalculators.map((calculator, index) => (
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
                <i className="fas fa-mobile-alt"></i> Muscle Gain Tracker Pro
              </p>
              <p style={{ fontSize: '0.8rem', margin: '5px 0 0 0', color: '#666' }}>
                Track your LBM and strength progress - Free download
              </p>
            </div>
            <button style={{
              background: '#2980b9',
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
    </main>
  );
}