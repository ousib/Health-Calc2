"use client";

import { useState, useEffect } from 'react';

export default function CreatinineClearancePage() {
  const [currentFormula, setCurrentFormula] = useState('cockcroft-gault');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [creatinine, setCreatinine] = useState('');
  const [race, setRace] = useState('non-black');
  const [result, setResult] = useState(null);
  const [renalFunction, setRenalFunction] = useState('');
  const [functionColor, setFunctionColor] = useState('');
  const [clinicalImplications, setClinicalImplications] = useState('');
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeFAQ, setActiveFAQ] = useState(null);

  // Sample data for demo
  useEffect(() => {
    setAge('45');
    setWeight('70');
    setHeight('175');
    setCreatinine('1.0');
  }, []);

  // Handle sidebar visibility on resize
  useEffect(() => {
    const handleResize = () => {
      setShowSidebar(window.innerWidth >= 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const selectFormula = (formula) => {
    setCurrentFormula(formula);
    setResult(null);
  };

  const calculateClearance = () => {
    // Validate inputs
    if (!age || !creatinine || !weight) {
      alert('Please fill in all required fields.');
      return;
    }

    const ageVal = parseFloat(age);
    const creatinineVal = parseFloat(creatinine);
    const weightVal = parseFloat(weight);
    const heightVal = parseFloat(height);

    if (ageVal <= 0 || creatinineVal <= 0 || weightVal <= 0) {
      alert('Please enter valid positive numbers.');
      return;
    }

    let clearance = 0;
    let formulaName = '';

    switch(currentFormula) {
      case 'cockcroft-gault':
        clearance = calculateCockcroftGault(ageVal, gender, weightVal, creatinineVal);
        formulaName = 'Cockcroft-Gault Formula';
        break;
      case 'mdrd':
        clearance = calculateMDRD(ageVal, gender, creatinineVal, race);
        formulaName = 'MDRD Formula';
        break;
      case 'ckd-epi':
        clearance = calculateCKDEPI(ageVal, gender, creatinineVal, race);
        formulaName = 'CKD-EPI Formula';
        break;
      case 'jelliffe':
        clearance = calculateJelliffe(ageVal, gender, weightVal, creatinineVal);
        formulaName = 'Jelliffe Formula';
        break;
    }

    // Round to 1 decimal place
    clearance = Math.round(clearance * 10) / 10;
    
    // Determine renal function category
    const { function: renalFunc, color, implications } = determineRenalFunction(clearance);
    
    setResult({
      value: clearance,
      formula: formulaName,
      renalFunction: renalFunc,
      color: color,
      implications: implications
    });
    setRenalFunction(renalFunc);
    setFunctionColor(color);
    setClinicalImplications(implications);
  };

  const calculateCockcroftGault = (age, gender, weight, creatinine) => {
    // Cockcroft-Gault formula
    let clearance = ((140 - age) * weight) / (creatinine * 72);
    
    if (gender === 'female') clearance *= 0.85;
    
    return clearance;
  };

  const calculateMDRD = (age, gender, creatinine, race) => {
    // MDRD formula
    let clearance = 175 * creatinine ** -1.154 * age ** -0.203;
    
    if (gender === 'female') clearance *= 0.742;
    if (race === 'black') clearance *= 1.212;
    
    return clearance;
  };

  const calculateCKDEPI = (age, gender, creatinine, race) => {
    // CKD-EPI formula
    let k = gender === 'male' ? 0.9 : 0.7;
    let a = gender === 'male' ? -0.411 : -0.329;
    
    let clearance = 141 * Math.min(creatinine/k, 1) ** a * 
                    Math.max(creatinine/k, 1) ** -1.209 * 
                    0.993 ** age;
    
    if (gender === 'female') clearance *= 1.018;
    if (race === 'black') clearance *= 1.159;
    
    return clearance;
  };

  const calculateJelliffe = (age, gender, weight, creatinine) => {
    // Jelliffe formula (for unstable renal function)
    let clearance;
    if (gender === 'male') {
      clearance = (98 - 0.8 * (age - 20)) / creatinine;
    } else {
      clearance = (98 - 0.8 * (age - 20)) / creatinine * 0.9;
    }
    return clearance;
  };

  const determineRenalFunction = (clearance) => {
    if (clearance >= 90) {
      return {
        function: 'Normal Renal Function',
        color: '#27ae60',
        implications: 'No dosage adjustment needed for most medications'
      };
    } else if (clearance >= 60) {
      return {
        function: 'Mild Renal Impairment',
        color: '#2ecc71',
        implications: 'Monitor medications; consider dose adjustments for nephrotoxic drugs'
      };
    } else if (clearance >= 30) {
      return {
        function: 'Moderate Renal Impairment',
        color: '#f39c12',
        implications: 'Adjust doses for renally excreted drugs; monitor renal function'
      };
    } else if (clearance >= 15) {
      return {
        function: 'Severe Renal Impairment',
        color: '#e74c3c',
        implications: 'Significant dose reductions needed; avoid nephrotoxic agents'
      };
    } else {
      return {
        function: 'Kidney Failure',
        color: '#c0392b',
        implications: 'Dialysis or transplant needed; specialized dosing required'
      };
    }
  };

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "What's the difference between creatinine clearance and GFR?",
      answer: "Creatinine clearance measures the volume of blood cleared of creatinine per minute, while GFR estimates glomerular filtration rate. Creatinine clearance is measured (using 24-hour urine collection) or estimated (using formulas), whereas GFR is typically estimated from serum creatinine. Creatinine clearance often overestimates true GFR due to tubular creatinine secretion."
    },
    {
      question: "When should I use Cockcroft-Gault vs measured creatinine clearance?",
      answer: "Use measured creatinine clearance (24-hour urine collection) when precise dosing is critical (chemotherapy, aminoglycosides) or when patients have unusual body composition. Use Cockcroft-Gault for routine clinical practice, medication adjustments, and screening. Measured clearance is more accurate but requires proper urine collection, which is often incomplete."
    },
    {
      question: "How does age affect creatinine clearance calculations?",
      answer: "Creatinine clearance decreases by approximately 0.8-1.0 mL/min per year after age 40 due to reduced muscle mass and declining kidney function. Formulas account for age through mathematical coefficients. Elderly patients may have normal serum creatinine despite reduced clearance due to decreased muscle mass."
    },
    {
      question: "Why is creatinine clearance important for medication dosing?",
      answer: "Many drugs are eliminated through the kidneys. Reduced clearance leads to drug accumulation, increased toxicity, and adverse effects. Creatinine clearance guides dose adjustments for antibiotics, chemotherapy, antivirals, anticoagulants, and other renally excreted medications to maintain efficacy while minimizing toxicity."
    },
    {
      question: "How accurate are creatinine clearance estimation formulas?",
      answer: "Estimation formulas are accurate within 20-30% of measured clearance in most patients. Accuracy decreases with extremes of age, body composition, muscle mass, and diet. For critical medications or unusual patients, measured clearance provides better accuracy. Formulas assume steady-state creatinine production."
    }
  ];

  const healthCalculators = [
    { name: "GFR Calculator", link: "/gfr-calculator" },
    { name: "Body Surface Area", link: "/bsa-calculator" },
    { name: "Ideal Weight Calculator", link: "/ideal-weight-calculator" },
    { name: "Medication Dosage", link: "/medication-calculator" },
    { name: "Anion Gap Calculator", link: "/anion-gap-calculator" },
    { name: "Electrolyte Correction", link: "/electrolyte-calculator" },
    { name: "Fluid Requirements", link: "/fluid-calculator" },
    { name: "Nutritional Needs", link: "/nutrition-calculator" }
  ];

  // Handle Enter key press
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        calculateClearance();
      }
    };

    document.addEventListener('keypress', handleKeyPress);
    return () => document.removeEventListener('keypress', handleKeyPress);
  }, [age, gender, weight, height, creatinine, race, currentFormula]);

  return (
    <>
      <style jsx>{`
        /* Add new CSS classes */
        .sidebar-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
          position: relative;
          height: 100%;
        }

        .sidebar-ad {
          height: 300px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .sticky-ad {
          position: sticky;
          top: 20px;
          background: #e8f5e9;
          border: 2px solid #8e44ad;
          box-shadow: 0 4px 12px rgba(142, 68, 173, 0.15);
          height: 300px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 10;
        }

        .mobile-ads {
          display: none;
          margin: 30px 0;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }

        .mobile-ad {
          padding: 20px;
          background: #f8f9fa;
          border-radius: 10px;
          text-align: center;
          color: #7f8c8d;
          border: 1px dashed #ddd;
          height: 300px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        /* FAQ Section */
        .faq-section {
          margin: 40px 0;
          padding: 30px;
          background: white;
          border-radius: 15px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.05);
        }

        .faq-title {
          color: #2c3e50;
          margin-bottom: 25px;
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .faq-item {
          margin-bottom: 15px;
          border: 1px solid #dfe6e9;
          border-radius: 10px;
          overflow: hidden;
        }

        .faq-question {
          padding: 20px;
          background: #f8f9fa;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 600;
          color: #2c3e50;
          transition: background 0.3s;
        }

        .faq-question:hover {
          background: #e9ecef;
        }

        .faq-answer {
          padding: 0 20px;
          max-height: 0;
          overflow: hidden;
          transition: all 0.3s ease;
          background: white;
        }

        .faq-answer.active {
          padding: 20px;
          max-height: 500px;
        }

        /* Health Calculators Grid */
        .calculators-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 15px;
          margin-top: 20px;
        }

        .calculator-card {
          padding: 15px;
          background: #f8f9fa;
          border-radius: 10px;
          text-align: center;
          text-decoration: none;
          color: #2c3e50;
          transition: all 0.3s;
          border: 2px solid transparent;
        }

        .calculator-card:hover {
          background: #8e44ad;
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(142, 68, 173, 0.2);
          border-color: #8e44ad;
        }

        /* Clearance Specific Styles */
        .clearance-scale {
          margin: 30px 0;
          padding: 20px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 3px 10px rgba(0,0,0,0.05);
        }

        .scale-container {
          position: relative;
          height: 40px;
          background: linear-gradient(90deg, 
            #27ae60 0%, 
            #27ae60 30%, 
            #2ecc71 30%, 
            #2ecc71 50%, 
            #f39c12 50%, 
            #f39c12 70%, 
            #e74c3c 70%, 
            #e74c3c 85%,
            #c0392b 85%, 
            #c0392b 100%);
          border-radius: 20px;
          margin: 20px 0;
        }

        .scale-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          color: #7f8c8d;
          margin-top: 5px;
        }

        .scale-marker {
          position: absolute;
          top: -10px;
          width: 4px;
          height: 60px;
          background: #2c3e50;
          border-radius: 2px;
          transform: translateX(-2px);
        }

        .function-categories {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 15px;
          margin: 25px 0;
        }

        .function-card {
          padding: 20px;
          background: white;
          border-radius: 10px;
          text-align: center;
          border: 3px solid;
          box-shadow: 0 3px 10px rgba(0,0,0,0.05);
        }

        .function-normal { border-color: #27ae60; color: #27ae60; }
        .function-mild { border-color: #2ecc71; color: #2ecc71; }
        .function-moderate { border-color: #f39c12; color: #f39c12; }
        .function-severe { border-color: #e74c3c; color: #e74c3c; }
        .function-failure { border-color: #c0392b; color: #c0392b; }

        .formula-comparison {
          margin: 30px 0;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 10px;
        }

        .formula-tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .formula-tab {
          padding: 10px 20px;
          background: #e9ecef;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s;
        }

        .formula-tab.active {
          background: #8e44ad;
          color: white;
        }

        .formula-display {
          padding: 20px;
          background: white;
          border-radius: 8px;
          font-family: 'Courier New', monospace;
          text-align: center;
          font-size: 0.95rem;
          border-left: 4px solid #8e44ad;
        }

        /* Medical Disclaimer */
        .medical-disclaimer {
          margin: 40px 0;
          padding: 25px;
          background: #fff8e1;
          border-radius: 10px;
          border-left: 5px solid #f39c12;
          font-size: 0.9rem;
          color: #666;
        }

        .disclaimer-title {
          color: #e67e22;
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        /* Base & Reset */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f8f9fa;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 30px;
        }

        /* Calculator Box */
        .calculator-box {
          background: white;
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.05);
          width: 100%;
        }

        .calc-title { 
          margin-bottom: 10px; 
          color: #2c3e50; 
          font-size: clamp(1.8rem, 4vw, 2.2rem);
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .calc-desc { 
          margin-bottom: 25px; 
          font-size: clamp(0.95rem, 2vw, 1rem); 
          color: #666; 
        }
        
        /* Input Groups */
        .measurement-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }

        .input-group { 
          margin-bottom: 20px; 
        }
        
        .input-group label { 
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600; 
          margin-bottom: 8px; 
          color: #34495e; 
          font-size: 0.95rem;
        }
        
        .input-group input, .input-group select { 
          width: 100%; 
          padding: 14px 16px; 
          border: 2px solid #dfe6e9; 
          border-radius: 10px; 
          font-size: 1rem; 
          outline: none; 
          transition: all 0.3s;
        }
        
        .input-group input:focus, .input-group select:focus { 
          border-color: #8e44ad; 
          box-shadow: 0 0 0 3px rgba(142, 68, 173, 0.1);
        }

        .calc-btn { 
          width: 100%; 
          padding: 16px; 
          background: #8e44ad; 
          color: white; 
          border: none; 
          border-radius: 10px; 
          font-size: 1.1rem; 
          font-weight: bold; 
          cursor: pointer; 
          transition: 0.3s; 
          margin: 15px 0 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        
        .calc-btn:hover { 
          background: #7d3c98; 
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(142, 68, 173, 0.2);
        }

        /* Results Section */
        .results-box { 
          margin: 30px 0; 
          padding: 25px; 
          background: linear-gradient(135deg, #f8f9fa 0%, #f5eef8 100%);
          border-radius: 12px; 
          border-left: 5px solid #8e44ad;
          text-align: center;
          display: ${result ? 'block' : 'none'}; 
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        
        .clearance-val { 
          font-size: clamp(2.5rem, 8vw, 3.5rem); 
          font-weight: 800; 
          display: block; 
          margin: 10px 0; 
          color: ${result?.color || '#8e44ad'}; 
        }

        .unit { 
          font-size: 1.2rem; 
          color: #666; 
        }

        /* Clinical Applications */
        .clinical-apps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          margin: 25px 0;
        }

        .clinical-card {
          padding: 20px;
          background: white;
          border-radius: 10px;
          border-left: 4px solid #8e44ad;
          box-shadow: 0 3px 10px rgba(0,0,0,0.05);
        }

        .clinical-card h4 {
          color: #2c3e50;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* Tables & Content */
        .category-table {
          width: 100%; 
          border-collapse: collapse; 
          margin-top: 20px; 
          font-size: 0.95rem;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 3px 10px rgba(0,0,0,0.05);
        }
        
        .category-table th, .category-table td {
          padding: 15px; 
          text-align: left; 
          border-bottom: 1px solid #eee;
        }
        
        .category-table th { 
          background-color: #2c3e50; 
          color: white; 
          font-weight: 600;
        }

        .category-table tr:hover {
          background-color: #f8f9fa;
        }

        /* SEO Content Styles */
        .info-section { 
          margin-top: 40px; 
          border-top: 1px solid #eee; 
          padding-top: 30px; 
        }
        
        .info-section h3 { 
          color: #2c3e50; 
          margin-bottom: 15px; 
          font-size: 1.3rem;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .info-section p { 
          font-size: 0.95rem; 
          color: #555; 
          margin-bottom: 15px; 
          line-height: 1.7;
        }
        
        .formula-box { 
          background: #f1f3f5; 
          padding: 20px; 
          border-radius: 10px; 
          font-family: 'Courier New', monospace; 
          text-align: left; 
          margin: 20px 0; 
          font-size: 0.95rem;
          border-left: 4px solid #8e44ad;
          overflow-x: auto;
        }

        /* Ad Slots */
        .ad-slot {
          margin: 30px 0;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 10px;
          text-align: center;
          color: #7f8c8d;
          border: 1px dashed #ddd;
          transition: all 0.3s ease;
        }

        .ad-slot:hover {
          background: #f0f2f5;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

        /* Sidebar */
        .sidebar {
          display: none;
          height: fit-content;
        }

        /* Responsive Styles */
        @media (min-width: 768px) {
          .container {
            grid-template-columns: 85% 300px;
            padding: 30px;
          }

          .sidebar {
            display: block;
          }

          .measurement-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .calc-btn {
            max-width: 300px;
          }
        }

        @media (max-width: 768px) {
          .container {
            padding: 15px;
          }
          
          .calculator-box {
            padding: 20px;
          }
          
          .function-categories {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .clinical-apps {
            grid-template-columns: 1fr;
          }
          
          .sidebar {
            display: none;
          }
          
          .mobile-ads {
            display: grid;
          }
          
          .calculators-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .faq-section {
            padding: 20px;
          }
          
          .medical-disclaimer {
            padding: 20px;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 15px;
          }
          
          .calculator-box {
            padding: 15px;
          }
          
          .measurement-grid {
            grid-template-columns: 1fr;
          }
          
          .results-box {
            padding: 20px;
          }
          
          .info-section {
            margin-top: 30px;
            padding-top: 20px;
          }
          
          .formula-box {
            font-size: 0.9rem;
            padding: 15px;
          }
          
          .function-categories {
            grid-template-columns: 1fr;
          }
          
          .category-table {
            display: block;
            overflow-x: auto;
          }
          
          .category-table th, .category-table td {
            padding: 12px 10px;
          }
          
          .calculators-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Print Styles */
        @media print {
          .ad-slot, .sidebar, .calc-btn, .formula-tabs, .mobile-ads, .faq-section {
            display: none;
          }
          
          .results-box {
            border: 2px solid #333;
          }
          
          .medical-disclaimer {
            page-break-inside: avoid;
          }
        }

        /* List Styles */
        ul {
          margin-left: 20px;
          margin-bottom: 15px;
          color: #555;
        }

        li {
          margin-bottom: 10px;
        }
      `}</style>

      <main className="container">
        <section className="calculator-box">
          <h1 className="calc-title"><i className="fas fa-vial"></i> Creatinine Clearance Calculator - Renal Function Assessment Tool</h1>
          <p className="calc-desc">Calculate your <strong>estimated creatinine clearance (CrCl)</strong> using validated clinical formulas. Essential for <strong>medication dosing adjustments, renal function assessment, and pharmacokinetic calculations</strong> in clinical practice.</p>
          
          {/* Formula Selection */}
          <div className="formula-comparison">
            <h4><i className="fas fa-calculator"></i> Creatinine Clearance Formula Selection</h4>
            <p style={{ fontSize: '0.95rem', color: '#666', marginBottom: '15px' }}>
              Different formulas serve different purposes. <strong>Cockcroft-Gault</strong> is most common for drug dosing, while <strong>CKD-EPI</strong> provides GFR estimation.
            </p>
            
            <div className="formula-tabs">
              <button 
                className={`formula-tab ${currentFormula === 'cockcroft-gault' ? 'active' : ''}`} 
                onClick={() => selectFormula('cockcroft-gault')}
              >
                Cockcroft-Gault
              </button>
              <button 
                className={`formula-tab ${currentFormula === 'mdrd' ? 'active' : ''}`} 
                onClick={() => selectFormula('mdrd')}
              >
                MDRD
              </button>
              <button 
                className={`formula-tab ${currentFormula === 'ckd-epi' ? 'active' : ''}`} 
                onClick={() => selectFormula('ckd-epi')}
              >
                CKD-EPI
              </button>
              <button 
                className={`formula-tab ${currentFormula === 'jelliffe' ? 'active' : ''}`} 
                onClick={() => selectFormula('jelliffe')}
              >
                Jelliffe
              </button>
            </div>
            
            <div className="formula-display">
              {currentFormula === 'cockcroft-gault' && 'CrCl = [(140 - Age) × Weight] / (Scr × 72) × 0.85[if female]'}
              {currentFormula === 'mdrd' && 'eGFR = 175 × Scr^-1.154 × Age^-0.203 × 0.742[if female] × 1.212[if black]'}
              {currentFormula === 'ckd-epi' && 'eGFR = 141 × min(Scr/κ, 1)^α × max(Scr/κ, 1)^-1.209 × 0.993^Age × 1.018[if female] × 1.159[if black]'}
              {currentFormula === 'jelliffe' && 'CrCl = [98 - 0.8 × (Age - 20)] / Scr × 0.9[if female]'}
            </div>
          </div>

          <div className="measurement-grid">
            <div className="input-group">
              <label><i className="fas fa-user"></i> Age (years)</label>
              <input 
                type="number" 
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="45"
                min="1" 
                max="120" 
                step="1"
              />
            </div>

            <div className="input-group">
              <label><i className="fas fa-venus-mars"></i> Gender</label>
              <select 
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="input-group">
              <label><i className="fas fa-weight"></i> Weight (kg)</label>
              <input 
                type="number" 
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="70"
                min="2" 
                max="300" 
                step="0.1"
              />
            </div>

            <div className="input-group">
              <label><i className="fas fa-ruler-vertical"></i> Height (cm)</label>
              <input 
                type="number" 
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="175"
                min="50" 
                max="250" 
                step="0.1"
              />
            </div>

            <div className="input-group">
              <label><i className="fas fa-flask"></i> Serum Creatinine (mg/dL)</label>
              <input 
                type="number" 
                value={creatinine}
                onChange={(e) => setCreatinine(e.target.value)}
                placeholder="1.0"
                min="0.1" 
                max="15" 
                step="0.01"
              />
            </div>

            <div className="input-group">
              <label><i className="fas fa-globe-americas"></i> Race/Ethnicity</label>
              <select 
                value={race}
                onChange={(e) => setRace(e.target.value)}
              >
                <option value="non-black">Non-Black</option>
                <option value="black">Black</option>
              </select>
            </div>
          </div>

          <button className="calc-btn" onClick={calculateClearance}>
            <i className="fas fa-calculator"></i> Calculate Creatinine Clearance
          </button>

          {/* Results Section */}
          <div className="results-box" style={{ display: result ? 'block' : 'none' }}>
            <h3 style={{marginBottom: '20px', color: '#2c3e50'}}>
              <i className="fas fa-chart-line"></i> Estimated Creatinine Clearance
            </h3>
            
            <div style={{marginBottom: '25px'}}>
              <span className="clearance-val">{result?.value || '--'}</span>
              <p className="unit">mL/min</p>
            </div>

            <div style={{
              padding: '15px',
              background: `${result?.color}20`,
              borderRadius: '8px',
              marginBottom: '15px',
              border: `2px solid ${result?.color}`
            }}>
              <h4 style={{color: result?.color, marginBottom: '10px'}}>
                <i className="fas fa-stethoscope"></i> {result?.renalFunction}
              </h4>
              <p style={{fontSize: '0.95rem', color: '#666'}}>
                {result?.implications}
              </p>
            </div>
            
            <p style={{marginTop: '15px', fontSize: '0.9rem', color: '#666'}}>
              <i className="fas fa-info-circle"></i> Calculated using <span>{result?.formula}</span>
            </p>
          </div>

          {/* Clearance Scale Visualization */}
          <div className="clearance-scale">
            <h4><i className="fas fa-chart-bar"></i> Renal Function Categories Based on Creatinine Clearance</h4>
            <p style={{ fontSize: '0.95rem', color: '#666', marginBottom: '15px' }}>
              Visual representation of renal function categories used for medication dosing adjustments:
            </p>
            
            <div className="scale-container">
              {result && (
                <div 
                  className="scale-marker" 
                  style={{ 
                    left: `${Math.min(Math.max((120 - result.value) / 120 * 100, 0), 100)}%` 
                  }}
                />
              )}
            </div>
            <div className="scale-labels">
              <span>≥90 (Normal)</span>
              <span>60-89 (Mild)</span>
              <span>30-59 (Moderate)</span>
              <span>15-29 (Severe)</span>
              <span>&lt;15 (Failure)</span>
            </div>
          </div>

          {/* Renal Function Categories Grid */}
          <div className="function-categories">
            <div className="function-card function-normal">
              <h4>Normal</h4>
              <div style={{fontSize: '1.3rem', fontWeight: 'bold', margin: '10px 0'}}>≥90</div>
              <p style={{fontSize: '0.85rem'}}>No dose adjustment</p>
            </div>
            <div className="function-card function-mild">
              <h4>Mild Impairment</h4>
              <div style={{fontSize: '1.3rem', fontWeight: 'bold', margin: '10px 0'}}>60-89</div>
              <p style={{fontSize: '0.85rem'}}>Monitor medications</p>
            </div>
            <div className="function-card function-moderate">
              <h4>Moderate Impairment</h4>
              <div style={{fontSize: '1.3rem', fontWeight: 'bold', margin: '10px 0'}}>30-59</div>
              <p style={{fontSize: '0.85rem'}}>Adjust doses</p>
            </div>
            <div className="function-card function-severe">
              <h4>Severe Impairment</h4>
              <div style={{fontSize: '1.3rem', fontWeight: 'bold', margin: '10px 0'}}>15-29</div>
              <p style={{fontSize: '0.85rem'}}>Reduce doses</p>
            </div>
            <div className="function-card function-failure">
              <h4>Kidney Failure</h4>
              <div style={{fontSize: '1.3rem', fontWeight: 'bold', margin: '10px 0'}}>&lt;15</div>
              <p style={{fontSize: '0.85rem'}}>Specialized dosing</p>
            </div>
          </div>

          <div className="ad-slot">
            <p><i className="fas fa-ad"></i> Advertisement</p>
            <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Your ad could be here</p>
          </div>

          {/* Clinical Applications */}
          <div className="clinical-apps">
            <div className="clinical-card">
              <h4><i className="fas fa-pills"></i> Antibiotic Dosing</h4>
              <p style={{ fontSize: '0.9rem' }}>Critical for <strong>aminoglycosides, vancomycin, and cephalosporins</strong> to prevent toxicity and ensure efficacy.</p>
            </div>
            <div className="clinical-card">
              <h4><i className="fas fa-syringe"></i> Chemotherapy</h4>
              <p style={{ fontSize: '0.9rem' }}>Essential for <strong>cisplatin, carboplatin, and methotrexate</strong> dosing to balance efficacy and toxicity.</p>
            </div>
            <div className="clinical-card">
              <h4><i className="fas fa-heart"></i> Anticoagulants</h4>
              <p style={{ fontSize: '0.9rem' }}>Guides <strong>enoxaparin and direct oral anticoagulant</strong> dosing in renal impairment.</p>
            </div>
            <div className="clinical-card">
              <h4><i className="fas fa-brain"></i> Neurological Drugs</h4>
              <p style={{ fontSize: '0.9rem' }}>Adjusts <strong>gabapentin, pregabalin, and lithium</strong> dosing to prevent toxicity.</p>
            </div>
          </div>

          <h3><i className="fas fa-list-alt"></i> Medication Dosing Guidelines Based on Creatinine Clearance</h3>
          <table className="category-table">
            <thead>
              <tr>
                <th>CrCl Range (mL/min)</th>
                <th>Renal Function</th>
                <th>Typical Dose Adjustment</th>
                <th>Example Medications</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>≥90</td><td>Normal</td><td>100% of normal dose</td><td>Most antibiotics, analgesics</td></tr>
              <tr><td>60-89</td><td>Mild impairment</td><td>75-100% of normal dose</td><td>Vancomycin, some antivirals</td></tr>
              <tr><td>30-59</td><td>Moderate impairment</td><td>50-75% of normal dose</td><td>Aminoglycosides, gabapentin</td></tr>
              <tr><td>15-29</td><td>Severe impairment</td><td>25-50% of normal dose</td><td>Lithium, metformin, digoxin</td></tr>
              <tr><td>&lt;15</td><td>Kidney failure</td><td>Individualized dosing</td><td>Many drugs require dialysis adjustment</td></tr>
            </tbody>
          </table>

          {/* Enhanced SEO Content with High-Value Long-Tail Keywords */}
          <div className="info-section">
            <h3><i className="fas fa-question-circle"></i> What is Creatinine Clearance? Comprehensive Renal Function Assessment Methodology</h3>
            <p><strong>Creatinine clearance (CrCl) calculation</strong> represents a <strong>critical pharmacokinetic parameter</strong> that measures the <strong>volume of blood plasma cleared of creatinine per minute</strong>, providing essential data for <strong>precise medication dosing adjustments</strong>, <strong>renal function assessment protocols</strong>, and <strong>drug elimination rate determinations</strong> in diverse clinical settings requiring <strong>personalized therapeutic interventions</strong>.</p>
            
            <h3><i className="fas fa-calculator"></i> Creatinine Clearance Estimation Formulas - Advanced Pharmacokinetic Calculation Methodologies</h3>
            <p>Multiple <strong>validated creatinine clearance estimation equations</strong> exist for <strong>comprehensive renal function assessment protocols</strong>, each demonstrating specific <strong>clinical applications and variable accuracy profiles</strong> influencing <strong>medication safety optimization decisions</strong>:</p>
            
            <div className="formula-box">
              <strong>Cockcroft-Gault Formula (1976):</strong> Gold standard for medication dose adjustments, utilizes age, weight, gender, and serum creatinine<br/>
              <strong>MDRD Formula (Modification of Diet in Renal Disease 1999):</strong> Estimates glomerular filtration rate for chronic kidney disease staging<br/>
              <strong>CKD-EPI Formula (Chronic Kidney Disease Epidemiology Collaboration 2009):</strong> Improved accuracy at higher renal function levels<br/>
              <strong>Jelliffe Formula (1973):</strong> Alternative method for patients with unstable renal function or rapidly changing creatinine<br/>
              <strong>Clinical Formula Selection Protocol:</strong> Cockcroft-Gault recommended for <strong>medication dosing precision</strong>, CKD-EPI for <strong>renal disease staging accuracy</strong>
            </div>

            <h3><i className="fas fa-stethoscope"></i> Clinical Applications of Creatinine Clearance - Comprehensive Therapeutic Management Guidelines</h3>
            <p>Accurate <strong>creatinine clearance calculation methodology implementation</strong> serves critical functions across multiple <strong>medical specialties and pharmaceutical management areas</strong> requiring <strong>precise renal elimination assessment</strong>:</p>
            <ul>
              <li><strong>Antibiotic Pharmacokinetic Optimization:</strong> Essential for <strong>aminoglycoside dosing regimens, vancomycin trough level targeting, and cephalosporin administration schedules</strong> to prevent <strong>nephrotoxicity development</strong></li>
              <li><strong>Chemotherapy Safety Protocols:</strong> Guides <strong>cisplatin administration schedules, carboplatin dose calculations, and methotrexate clearance monitoring</strong> to balance <strong>oncological efficacy and renal toxicity risks</strong></li>
              <li><strong>Anticoagulant Management Algorithms:</strong> Determines <strong>enoxaparin dosing intervals, direct oral anticoagulant adjustments, and heparin infusion rates</strong> based on <strong>renal elimination characteristics</strong></li>
              <li><strong>Neurological Medication Safety:</strong> Adjusts <strong>gabapentin titration schedules, pregabalin administration protocols, and lithium maintenance doses</strong> to prevent <strong>central nervous system toxicity</strong></li>
              <li><strong>Diabetes Medication Management:</strong> Guides <strong>metformin continuation decisions, SGLT2 inhibitor administration, and insulin dose adjustments</strong> in <strong>chronic kidney disease populations</strong></li>
              <li><strong>Geriatric Pharmacotherapy Optimization:</strong> Informs <strong>age-appropriate medication selection, dose reduction calculations, and monitoring schedule determinations</strong> for elderly patients</li>
              <li><strong>Critical Care Medication Protocols:</strong> Determines <strong>vasopressor dosing adjustments, sedative infusion rates, and analgesic administration schedules</strong> in intensive care settings</li>
            </ul>
            
            <h3><i className="fas fa-balance-scale"></i> Factors Affecting Creatinine Clearance Accuracy - Comprehensive Clinical Interpretation Considerations</h3>
            <p>Multiple <strong>significant physiological and methodological factors</strong> influence <strong>creatinine clearance estimation accuracy parameters</strong> and require consideration for appropriate clinical interpretation:</p>
            <ul>
              <li><strong>Muscle Mass Metabolic Variability:</strong> Affected by <strong>age-related sarcopenia development, gender-specific body composition differences, athletic training status, and nutritional protein intake variations</strong></li>
              <li><strong>Dietary Creatinine Intake Influences:</strong> Cooked meat consumption significantly increases serum creatinine levels independently of renal function changes</li>
              <li><strong>Age-Related Physiological Decline Patterns:</strong> Creatinine clearance naturally decreases approximately <strong>0.8-1.0 mL/min per year after age 40</strong> requiring <strong>age-adjusted interpretation methodologies</strong></li>
              <li><strong>Ethnic and Genetic Determinant Factors:</strong> Population-specific differences in muscle mass distribution and creatinine metabolism pathways</li>
              <li><strong>Laboratory Methodology Standardization Issues:</strong> Analytical variation between <strong>Jaffe reaction assays and enzymatic creatinine measurement techniques</strong> requiring standardization protocols</li>
              <li><strong>Fluid Status Dynamic Variations:</strong> Clinical dehydration states and volume overload conditions temporarily alter measured clearance parameters</li>
              <li><strong>Medication Interference Considerations:</strong> Certain drugs including <strong>trimethoprim, cimetidine, and salicylates</strong> interfere with tubular creatinine secretion</li>
            </ul>

            <h3><i className="fas fa-exclamation-triangle"></i> Limitations of Estimated Creatinine Clearance - Advanced Alternative Assessment Methodologies</h3>
            <p>While <strong>estimated CrCl calculation methodologies</strong> provide valuable <strong>clinical screening tools</strong>, specific clinical situations necessitate <strong>advanced alternative assessment approaches</strong> and <strong>supplementary diagnostic testing protocols</strong>:</p>
            <ul>
              <li><strong>Extreme Body Composition Scenarios:</strong> Significant muscle wasting conditions or severe obesity classifications affecting creatinine production reliability</li>
              <li><strong>Rapid Renal Function Dynamic Changes:</strong> Acute kidney injury presentations requiring frequent assessment protocols and trending analysis methodologies</li>
              <li><strong>Pregnancy-Specific Considerations:</strong> Physiological adaptation processes affecting standard formula application and interpretation accuracy</li>
              <li><strong>Vegetarian and Vegan Dietary Patterns:</strong> Significantly lower creatinine production rates affecting estimation formula reliability parameters</li>
              <li><strong>Critical Clinical Decision Requirements:</strong> Chemotherapy dosing calculations or narrow therapeutic index drug administration requiring measured clearance determination</li>
              <li><strong>Advanced Alternative Assessment Methodologies:</strong> <strong>24-hour urine collection protocols, cystatin C measurement techniques, and measured GFR methodologies</strong> for improved diagnostic accuracy</li>
            </ul>

            <h3><i className="fas fa-history"></i> Historical Development of Clearance Formulas - Evolution of Renal Pharmacokinetic Assessment</h3>
            <p>The progressive evolution of <strong>creatinine clearance estimation methodologies</strong> reflects <strong>decades of pharmacokinetic research advancement</strong> and <strong>therapeutic drug monitoring development trajectories</strong>:</p>
            <ul>
              <li><strong>1973 Historical Milestone:</strong> Jelliffe formula establishes early <strong>creatinine-based estimation paradigm</strong> for clinical pharmacology applications</li>
              <li><strong>1976 Diagnostic Standardization:</strong> Cockcroft-Gault formula becomes <strong>clinical gold standard</strong> for medication dose adjustment protocols</li>
              <li><strong>1999 Renal Disease Advancement:</strong> MDRD study develops <strong>population-specific equation methodology</strong> improving accuracy in established CKD patients</li>
              <li><strong>2009 International Standardization:</strong> CKD-EPI equation provides <strong>improved accuracy across GFR spectrum</strong> and becomes international diagnostic standard</li>
              <li><strong>2020s Contemporary Developments:</strong> Movement toward <strong>race-free equation implementation</strong> and <strong>personalized adjustment factor methodologies</strong></li>
            </ul>

            <h3><i className="fas fa-user-md"></i> Practical Clinical Implementation Recommendations - Comprehensive Clearance Application Guidelines</h3>
            <p>For optimal <strong>creatinine clearance calculation implementation</strong> in contemporary clinical practice environments and <strong>evidence-based therapeutic management protocols</strong>:</p>
            <ul>
              <li><strong>Consistent Formula Application Protocol:</strong> Utilize <strong>identical estimation methodology</strong> for serial patient monitoring consistency and therapeutic trend analysis reliability</li>
              <li><strong>Comprehensive Clinical Context Integration:</strong> Consider <strong>patient-specific demographic factors, dietary patterns, medication profiles, and comorbid conditions</strong> beyond numerical clearance values alone</li>
              <li><strong>Standardized Documentation Methodology:</strong> Systematically record <strong>clearance numerical value, specific formula utilized, calculation date, and clinical decision implications</strong> in electronic health records</li>
              <li><strong>Temporal Trend Analysis Emphasis:</strong> Prioritize <strong>clearance change patterns over extended time periods</strong> rather than isolated measurement interpretation</li>
              <li><strong>Multidisciplinary Collaboration Enhancement:</strong> Coordinate assessment protocols with <strong>clinical pharmacy specialists, laboratory medicine professionals, and nephrology consultation services</strong></li>
              <li><strong>Patient Education Protocol Implementation:</strong> Develop <strong>individualized educational materials</strong> explaining <strong>clearance significance, medication adjustment rationale, and monitoring importance</strong></li>
            </ul>

            <h3><i className="fas fa-chart-line"></i> Future Directions in Clearance Assessment - Emerging Pharmacokinetic Technologies</h3>
            <p>Ongoing <strong>pharmacokinetic research initiatives</strong> continue refining <strong>clearance assessment approaches</strong> with promising technological developments and <strong>innovative therapeutic monitoring methodologies</strong>:</p>
            <ul>
              <li><strong>Novel Biomarker Discovery Research:</strong> Identification of <strong>alternative renal filtration markers</strong> with improved diagnostic accuracy profiles and reduced confounding factors</li>
              <li><strong>Artificial Intelligence Clinical Applications:</strong> Machine learning algorithm development for <strong>personalized clearance prediction models</strong> incorporating multiple clinical variables</li>
              <li><strong>Point-of-Care Testing Advancements:</strong> Development of <strong>rapid, accurate bedside clearance assessment devices</strong> with immediate therapeutic decision support</li>
              <li><strong>Genetic Factor Integration Methodology:</strong> Incorporation of <strong>pharmacogenetic polymorphism analysis</strong> affecting drug metabolism and elimination pathways</li>
              <li><strong>International Standardization Initiatives:</strong> Global collaborative efforts for <strong>consistent laboratory measurement technique implementation</strong> and <strong>harmonized reporting standards</strong></li>
              <li><strong>Continuous Monitoring Technologies:</strong> Development of <strong>wearable renal function monitoring devices</strong> providing real-time clearance trend data</li>
            </ul>

            <h3><i className="fas fa-graduation-cap"></i> Educational Requirements and Professional Training Standards Implementation</h3>
            <p>Proper <strong>creatinine clearance calculation methodology education</strong> represents an <strong>essential clinical competency requirement</strong> for <strong>healthcare professionals</strong> across multiple medical disciplines. Comprehensive training curricula should systematically include <strong>formula selection principles, interpretation guideline protocols, therapeutic application strategies, and limitation recognition methodologies</strong>. Continuing medical education programs must consistently address <strong>evolving research findings, changing clinical practice standards, and emerging technological developments</strong> to ensure optimal patient care outcomes and evidence-based practice implementation.</p>

            <h3><i className="fas fa-clipboard-check"></i> Quality Assurance and Laboratory Standardization Protocols</h3>
            <p>Implementation of <strong>rigorous quality assurance protocols</strong> ensures <strong>reliable creatinine clearance calculation results</strong> across diverse clinical laboratory settings. These protocols encompass <strong>creatinine assay standardization methodologies, calibration verification procedures, and proficiency testing requirements</strong> that directly impact <strong>estimation formula accuracy parameters</strong>. International organizations have developed <strong>standard reference materials and harmonization initiatives</strong> to minimize inter-laboratory variability and ensure consistent result reporting for <strong>critical therapeutic decision support</strong>.</p>

            <h3><i className="fas fa-database"></i> Population-Specific Considerations and Demographic Adjustment Factors</h3>
            <p>Accurate <strong>creatinine clearance interpretation</strong> requires consideration of <strong>population-specific physiological variations</strong> and <strong>demographic adjustment factors</strong> that influence estimation formula performance. These considerations include <strong>ethnicity-specific muscle mass distributions, age-related physiological decline patterns, gender-based body composition differences, and geographic dietary pattern influences</strong>. Contemporary research emphasizes the importance of <strong>individualized assessment approaches</strong> rather than categorical assumptions, with particular attention to <strong>transitioning from population-based to personalized clinical algorithms</strong> for optimal therapeutic outcomes.</p>
          </div>

          {/* Q&A Dropdown Section */}
          <div className="faq-section">
            <h2 className="faq-title"><i className="fas fa-question-circle"></i> Frequently Asked Questions About Creatinine Clearance Calculation</h2>
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <div className="faq-question" onClick={() => toggleFAQ(index)}>
                  {faq.question}
                  <i className={`fas fa-chevron-${activeFAQ === index ? 'up' : 'down'}`}></i>
                </div>
                <div className={`faq-answer ${activeFAQ === index ? 'active' : ''}`}>
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>

          {/* Health Calculators Section */}
          <div className="info-section">
            <h3><i className="fas fa-calculator"></i> Related Medical & Pharmacokinetic Calculators</h3>
            <p>Explore our comprehensive collection of <strong>medical calculation tools and therapeutic monitoring calculators</strong> for clinical applications and patient management:</p>
            <div className="calculators-grid">
              {healthCalculators.map((calculator, index) => (
                <a key={index} href={calculator.link} className="calculator-card">
                  <i className="fas fa-calculator"></i> {calculator.name}
                </a>
              ))}
            </div>
          </div>

          {/* Medical Disclaimer */}
          <div className="medical-disclaimer">
            <h4 className="disclaimer-title"><i className="fas fa-exclamation-triangle"></i> Important Medical Disclaimer</h4>
            <p><strong>This creatinine clearance calculator provides estimates for educational and informational purposes only.</strong> The calculations are based on standard formulas and should not be used as a substitute for professional medical advice, diagnosis, or treatment.</p>
            <p><strong>Clinical Decision Limitations:</strong> Estimated creatinine clearance values have inherent limitations and may not accurately reflect true renal function in all patients, particularly those with unusual body composition, rapidly changing renal function, or specific medical conditions.</p>
            <p><strong>Medication Dosing Caution:</strong> Never adjust medication doses based solely on calculator results without consulting a qualified healthcare professional. Actual medication dosing decisions require comprehensive clinical assessment including measured renal function when appropriate.</p>
            <p><strong>Professional Consultation Required:</strong> Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition or treatment decisions. Do not disregard professional medical advice or delay seeking it because of information provided by this calculator.</p>
            <p><strong>Accuracy Disclaimer:</strong> While we strive to provide accurate calculations, we cannot guarantee the completeness or accuracy of the results. Different laboratories may use different creatinine assay methods that can affect calculated results.</p>
            <p><strong>Emergency Situations:</strong> If you believe you may have a medical emergency, call your doctor or emergency services immediately. This calculator is not designed for emergency medical situations.</p>
          </div>
        </section>

        {/* Sidebar with 3 Ads (3rd one sticky) */}
        <aside className="sidebar">
          <div className="sidebar-content">
            <div className="ad-slot sidebar-ad">
              <p><i className="fas fa-ad"></i> Advertisement 1</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Sponsored Content</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Renal health monitoring device</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>300px height ad slot</p>
            </div>
            
            <div className="ad-slot sidebar-ad">
              <p><i className="fas fa-ad"></i> Advertisement 2</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Featured Product</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Medication dosing reference guide</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>300px height ad slot</p>
            </div>
            
            <div className="ad-slot sticky-ad">
              <p><i className="fas fa-thumbtack"></i> Sticky Advertisement</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Premium Content - Stays visible</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Clinical pharmacology consultation</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>300px sticky ad</p>
            </div>
          </div>
        </aside>

        {/* Additional Ads when sidebar disappears (mobile) */}
        <div className="mobile-ads">
          <div className="mobile-ad">
            <p><i className="fas fa-ad"></i> Mobile Advertisement 1</p>
            <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Optimized for mobile viewing</p>
          </div>
          <div className="mobile-ad">
            <p><i className="fas fa-ad"></i> Mobile Advertisement 2</p>
            <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Perfect for smaller screens</p>
          </div>
        </div>
      </main>
    </>
  );
}