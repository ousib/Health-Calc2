"use client";

import { useState, useEffect } from 'react';

export default function GFRPage() {
  const [currentFormula, setCurrentFormula] = useState('ckd-epi');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [creatinine, setCreatinine] = useState('');
  const [race, setRace] = useState('non-black');
  const [gfrResult, setGfrResult] = useState(null);
  const [ckdStage, setCkdStage] = useState('');
  const [stageColor, setStageColor] = useState('');
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
    setGfrResult(null);
  };

  const calculateGFR = () => {
    // Validate inputs
    if (!age || !creatinine || !weight || !height) {
      alert('Please fill in all required fields.');
      return;
    }

    const ageVal = parseFloat(age);
    const creatinineVal = parseFloat(creatinine);
    const weightVal = parseFloat(weight);
    const heightVal = parseFloat(height);

    if (ageVal <= 0 || creatinineVal <= 0 || weightVal <= 0 || heightVal <= 0) {
      alert('Please enter valid positive numbers.');
      return;
    }

    let gfr = 0;
    let formulaName = '';

    switch(currentFormula) {
      case 'ckd-epi':
        gfr = calculateCKDEPI(ageVal, gender, creatinineVal, race);
        formulaName = 'CKD-EPI Formula';
        break;
      case 'mdrd':
        gfr = calculateMDRD(ageVal, gender, creatinineVal, race);
        formulaName = 'MDRD Formula';
        break;
      case 'cockcroft':
        gfr = calculateCockcroftGault(ageVal, gender, weightVal, creatinineVal);
        formulaName = 'Cockcroft-Gault Formula';
        break;
      case 'schwartz':
        gfr = calculateSchwartz(heightVal, creatinineVal);
        formulaName = 'Schwartz Formula (Pediatric)';
        break;
    }

    // Round to 1 decimal place
    gfr = Math.round(gfr * 10) / 10;
    
    // Determine CKD stage
    const { stage, color, implications } = determineCKDStage(gfr);
    
    setGfrResult({
      value: gfr,
      formula: formulaName,
      stage: stage,
      color: color,
      implications: implications
    });
    setCkdStage(stage);
    setStageColor(color);
    setClinicalImplications(implications);
  };

  const calculateCKDEPI = (age, gender, creatinine, race) => {
    // Simplified CKD-EPI calculation
    let k = gender === 'male' ? 0.9 : 0.7;
    let a = gender === 'male' ? -0.411 : -0.329;
    
    let gfr = 141 * Math.min(creatinine/k, 1) ** a * 
              Math.max(creatinine/k, 1) ** -1.209 * 
              0.993 ** age;
    
    if (gender === 'female') gfr *= 1.018;
    if (race === 'black') gfr *= 1.159;
    
    return gfr;
  };

  const calculateMDRD = (age, gender, creatinine, race) => {
    // Simplified MDRD calculation
    let gfr = 175 * creatinine ** -1.154 * age ** -0.203;
    
    if (gender === 'female') gfr *= 0.742;
    if (race === 'black') gfr *= 1.212;
    
    return gfr;
  };

  const calculateCockcroftGault = (age, gender, weight, creatinine) => {
    // Cockcroft-Gault formula
    let gfr = ((140 - age) * weight) / (creatinine * 72);
    
    if (gender === 'female') gfr *= 0.85;
    
    return gfr;
  };

  const calculateSchwartz = (height, creatinine) => {
    // Schwartz formula for children
    const k = 0.413; // Constant for children 1-12 years
    return (k * height) / creatinine;
  };

  const determineCKDStage = (gfr) => {
    if (gfr >= 90) {
      return {
        stage: 'Stage 1',
        color: '#27ae60',
        implications: 'Normal or high GFR with kidney damage markers'
      };
    } else if (gfr >= 60) {
      return {
        stage: 'Stage 2',
        color: '#2ecc71',
        implications: 'Mildly decreased GFR with kidney damage'
      };
    } else if (gfr >= 45) {
      return {
        stage: 'Stage 3a',
        color: '#f39c12',
        implications: 'Mildly to moderately decreased GFR'
      };
    } else if (gfr >= 30) {
      return {
        stage: 'Stage 3b',
        color: '#e67e22',
        implications: 'Moderately to severely decreased GFR'
      };
    } else if (gfr >= 15) {
      return {
        stage: 'Stage 4',
        color: '#e74c3c',
        implications: 'Severely decreased GFR'
      };
    } else {
      return {
        stage: 'Stage 5',
        color: '#c0392b',
        implications: 'Kidney failure (dialysis or transplant needed)'
      };
    }
  };

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "What's the difference between CKD-EPI and MDRD formulas?",
      answer: "The CKD-EPI formula is more accurate at higher GFR levels (>60 mL/min/1.73m²) and is now the recommended standard for adults. MDRD is older but still used in some settings. CKD-EPI produces less false-positive CKD diagnoses and better correlates with clinical outcomes."
    },
    {
      question: "Why is race a factor in GFR calculations?",
      answer: "Race coefficients (particularly for Black individuals) were included in older formulas based on studies showing higher muscle mass and creatinine production. However, this practice is increasingly controversial, and many institutions are moving toward race-free equations. Always follow current clinical guidelines and institutional policies."
    },
    {
      question: "How accurate are estimated GFR calculations?",
      answer: "eGFR calculations provide estimates within approximately 30% of measured GFR in 90% of patients. Accuracy decreases with extremes of age, muscle mass, diet, and certain medical conditions. For critical decisions, measured GFR using clearance methods provides more accurate assessment."
    },
    {
      question: "When should I use Cockcroft-Gault vs. CKD-EPI?",
      answer: "CKD-EPI is preferred for most clinical situations, especially diagnosis and staging of CKD. Cockcroft-Gault is still used for medication dosing adjustments (particularly chemotherapy and antibiotics) as many dosing guidelines were developed using this formula."
    },
    {
      question: "How often should GFR be monitored?",
      answer: "Monitoring frequency depends on CKD stage: Stage 1-2: annually; Stage 3: every 6-12 months; Stage 4: every 3-6 months; Stage 5: every 1-3 months. More frequent monitoring may be needed with rapid decline, proteinuria, or when adjusting nephrotoxic medications."
    }
  ];

  const healthCalculators = [
    { name: "Creatinine Clearance", link: "/creatinine-clearance" },
    { name: "Body Surface Area", link: "/bsa-calculator" },
    { name: "Ideal Weight Calculator", link: "/ideal-weight-calculator" },
    { name: "BMI Calculator", link: "/bmi-calculator" },
    { name: "Fluid Requirements", link: "/fluid-calculator" },
    { name: "Electrolyte Correction", link: "/electrolyte-calculator" },
    { name: "Medication Dosage", link: "/medication-calculator" },
    { name: "Nutritional Needs", link: "/nutrition-calculator" }
  ];

  // Handle Enter key press
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        calculateGFR();
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
          border: 2px solid #27ae60;
          box-shadow: 0 4px 12px rgba(39, 174, 96, 0.15);
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
          background: #3498db;
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(52, 152, 219, 0.2);
          border-color: #3498db;
        }

        /* GFR Specific Styles */
        .gfr-scale {
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
            #27ae60 25%, 
            #2ecc71 25%, 
            #2ecc71 40%, 
            #f39c12 40%, 
            #f39c12 55%, 
            #e67e22 55%, 
            #e67e22 70%, 
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

        .ckd-stages {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 15px;
          margin: 25px 0;
        }

        .stage-card {
          padding: 20px;
          background: white;
          border-radius: 10px;
          text-align: center;
          border: 3px solid;
          box-shadow: 0 3px 10px rgba(0,0,0,0.05);
        }

        .stage-1 { border-color: #27ae60; color: #27ae60; }
        .stage-2 { border-color: #2ecc71; color: #2ecc71; }
        .stage-3a { border-color: #f39c12; color: #f39c12; }
        .stage-3b { border-color: #e67e22; color: #e67e22; }
        .stage-4 { border-color: #e74c3c; color: #e74c3c; }
        .stage-5 { border-color: #c0392b; color: #c0392b; }

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
          background: #3498db;
          color: white;
        }

        .formula-display {
          padding: 20px;
          background: white;
          border-radius: 8px;
          font-family: 'Courier New', monospace;
          text-align: center;
          font-size: 0.95rem;
          border-left: 4px solid #3498db;
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
          border-color: #3498db; 
          box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
        }

        .calc-btn { 
          width: 100%; 
          padding: 16px; 
          background: #3498db; 
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
          background: #2980b9; 
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(52, 152, 219, 0.2);
        }

        /* Results Section */
        .results-box { 
          margin: 30px 0; 
          padding: 25px; 
          background: linear-gradient(135deg, #f8f9fa 0%, #e8f4f8 100%);
          border-radius: 12px; 
          border-left: 5px solid #3498db;
          text-align: center;
          display: ${gfrResult ? 'block' : 'none'}; 
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        
        .gfr-val { 
          font-size: clamp(2.5rem, 8vw, 3.5rem); 
          font-weight: 800; 
          display: block; 
          margin: 10px 0; 
          color: ${gfrResult?.color || '#3498db'}; 
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
          border-left: 4px solid #3498db;
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
          border-left: 4px solid #3498db;
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
          
          .ckd-stages {
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
          
          .ckd-stages {
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
          <h1 className="calc-title"><i className="fas fa-kidneys"></i> Glomerular Filtration Rate (GFR) Calculator - Kidney Function Assessment Tool</h1>
          <p className="calc-desc">Calculate your <strong>estimated glomerular filtration rate (eGFR)</strong> using validated clinical formulas. Essential for <strong>chronic kidney disease staging, medication dosing adjustments, and renal function monitoring</strong> in clinical practice.</p>
          
          {/* Formula Selection */}
          <div className="formula-comparison">
            <h4><i className="fas fa-calculator"></i> GFR Formula Selection - Choose Appropriate Calculation Method</h4>
            <p style={{ fontSize: '0.95rem', color: '#666', marginBottom: '15px' }}>
              Different formulas are appropriate for different populations. <strong>CKD-EPI</strong> is recommended for adults, while <strong>Schwartz</strong> is used for children.
            </p>
            
            <div className="formula-tabs">
              <button 
                className={`formula-tab ${currentFormula === 'ckd-epi' ? 'active' : ''}`} 
                onClick={() => selectFormula('ckd-epi')}
              >
                CKD-EPI
              </button>
              <button 
                className={`formula-tab ${currentFormula === 'mdrd' ? 'active' : ''}`} 
                onClick={() => selectFormula('mdrd')}
              >
                MDRD
              </button>
              <button 
                className={`formula-tab ${currentFormula === 'cockcroft' ? 'active' : ''}`} 
                onClick={() => selectFormula('cockcroft')}
              >
                Cockcroft-Gault
              </button>
              <button 
                className={`formula-tab ${currentFormula === 'schwartz' ? 'active' : ''}`} 
                onClick={() => selectFormula('schwartz')}
              >
                Schwartz (Pediatric)
              </button>
            </div>
            
            <div className="formula-display">
              {currentFormula === 'ckd-epi' && 'eGFR = 141 × min(Scr/κ, 1)^α × max(Scr/κ, 1)^-1.209 × 0.993^Age × 1.018[if female] × 1.159[if black]'}
              {currentFormula === 'mdrd' && 'eGFR = 175 × Scr^-1.154 × Age^-0.203 × 0.742[if female] × 1.212[if black]'}
              {currentFormula === 'cockcroft' && 'CrCl = [(140 - Age) × Weight] / (Scr × 72) × 0.85[if female]'}
              {currentFormula === 'schwartz' && 'eGFR = k × Height / Scr (k = 0.413 for children 1-12 years)'}
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

          <button className="calc-btn" onClick={calculateGFR}>
            <i className="fas fa-calculator"></i> Calculate GFR
          </button>

          {/* Results Section */}
          <div className="results-box" style={{ display: gfrResult ? 'block' : 'none' }}>
            <h3 style={{marginBottom: '20px', color: '#2c3e50'}}>
              <i className="fas fa-chart-line"></i> Estimated Glomerular Filtration Rate
            </h3>
            
            <div style={{marginBottom: '25px'}}>
              <span className="gfr-val">{gfrResult?.value || '--'}</span>
              <p className="unit">mL/min/1.73m²</p>
            </div>

            <div style={{
              padding: '15px',
              background: `${gfrResult?.color}20`,
              borderRadius: '8px',
              marginBottom: '15px',
              border: `2px solid ${gfrResult?.color}`
            }}>
              <h4 style={{color: gfrResult?.color, marginBottom: '10px'}}>
                <i className="fas fa-stethoscope"></i> {gfrResult?.stage} - Chronic Kidney Disease
              </h4>
              <p style={{fontSize: '0.95rem', color: '#666'}}>
                {gfrResult?.implications}
              </p>
            </div>
            
            <p style={{marginTop: '15px', fontSize: '0.9rem', color: '#666'}}>
              <i className="fas fa-info-circle"></i> Calculated using <span>{gfrResult?.formula}</span>
            </p>
          </div>

          {/* GFR Scale Visualization */}
          <div className="gfr-scale">
            <h4><i className="fas fa-chart-bar"></i> CKD Stages Based on GFR - Kidney Disease Progression Scale</h4>
            <p style={{ fontSize: '0.95rem', color: '#666', marginBottom: '15px' }}>
              Visual representation of chronic kidney disease stages according to National Kidney Foundation guidelines:
            </p>
            
            <div className="scale-container">
              {gfrResult && (
                <div 
                  className="scale-marker" 
                  style={{ 
                    left: `${Math.min(Math.max((120 - gfrResult.value) / 120 * 100, 0), 100)}%` 
                  }}
                />
              )}
            </div>
            <div className="scale-labels">
              <span>≥90 (Stage 1)</span>
              <span>60-89 (Stage 2)</span>
              <span>45-59 (3a)</span>
              <span>30-44 (3b)</span>
              <span>15-29 (Stage 4)</span>
              <span>&lt;15 (Stage 5)</span>
            </div>
          </div>

          {/* CKD Stages Grid */}
          <div className="ckd-stages">
            <div className="stage-card stage-1">
              <h4>Stage 1</h4>
              <div style={{fontSize: '1.3rem', fontWeight: 'bold', margin: '10px 0'}}>≥90</div>
              <p style={{fontSize: '0.85rem'}}>Normal or high GFR</p>
            </div>
            <div className="stage-card stage-2">
              <h4>Stage 2</h4>
              <div style={{fontSize: '1.3rem', fontWeight: 'bold', margin: '10px 0'}}>60-89</div>
              <p style={{fontSize: '0.85rem'}}>Mild reduction</p>
            </div>
            <div className="stage-card stage-3a">
              <h4>Stage 3a</h4>
              <div style={{fontSize: '1.3rem', fontWeight: 'bold', margin: '10px 0'}}>45-59</div>
              <p style={{fontSize: '0.85rem'}}>Mild-moderate</p>
            </div>
            <div className="stage-card stage-3b">
              <h4>Stage 3b</h4>
              <div style={{fontSize: '1.3rem', fontWeight: 'bold', margin: '10px 0'}}>30-44</div>
              <p style={{fontSize: '0.85rem'}}>Moderate-severe</p>
            </div>
            <div className="stage-card stage-4">
              <h4>Stage 4</h4>
              <div style={{fontSize: '1.3rem', fontWeight: 'bold', margin: '10px 0'}}>15-29</div>
              <p style={{fontSize: '0.85rem'}}>Severe reduction</p>
            </div>
            <div className="stage-card stage-5">
              <h4>Stage 5</h4>
              <div style={{fontSize: '1.3rem', fontWeight: 'bold', margin: '10px 0'}}>&lt;15</div>
              <p style={{fontSize: '0.85rem'}}>Kidney failure</p>
            </div>
          </div>

          <div className="ad-slot">
            <p><i className="fas fa-ad"></i> Advertisement</p>
            <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Your ad could be here</p>
          </div>

          {/* Clinical Applications */}
          <div className="clinical-apps">
            <div className="clinical-card">
              <h4><i className="fas fa-pills"></i> Medication Dosing</h4>
              <p style={{ fontSize: '0.9rem' }}>Adjust doses for <strong>renally excreted drugs</strong> including antibiotics, chemotherapy, and antihypertensives based on GFR.</p>
            </div>
            <div className="clinical-card">
              <h4><i className="fas fa-heartbeat"></i> CKD Diagnosis</h4>
              <p style={{ fontSize: '0.9rem' }}>Essential for <strong>chronic kidney disease staging</strong> and <strong>progression monitoring</strong> over time.</p>
            </div>
            <div className="clinical-card">
              <h4><i className="fas fa-user-md"></i> Surgical Risk</h4>
              <p style={{ fontSize: '0.9rem' }}>Assess <strong>perioperative risk</strong> and guide <strong>anesthetic management</strong> for patients with kidney impairment.</p>
            </div>
            <div className="clinical-card">
              <h4><i className="fas fa-vial"></i> Contrast Safety</h4>
              <p style={{ fontSize: '0.9rem' }}>Determine <strong>contrast-induced nephropathy risk</strong> and guide <strong>preventive measures</strong> for imaging studies.</p>
            </div>
          </div>

          <h3><i className="fas fa-list-alt"></i> CKD Stage Classification - National Kidney Foundation Guidelines</h3>
          <table className="category-table">
            <thead>
              <tr>
                <th>CKD Stage</th>
                <th>GFR Range (mL/min/1.73m²)</th>
                <th>Description</th>
                <th>Clinical Action</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Stage 1</td><td>≥90</td><td>Kidney damage with normal GFR</td><td>Diagnose and treat cause, reduce risk factors</td></tr>
              <tr><td>Stage 2</td><td>60-89</td><td>Kidney damage with mild GFR reduction</td><td>Estimate progression, manage comorbidities</td></tr>
              <tr><td>Stage 3a</td><td>45-59</td><td>Moderate GFR reduction</td><td>Evaluate complications, consider referral</td></tr>
              <tr><td>Stage 3b</td><td>30-44</td><td>Moderate to severe GFR reduction</td><td>Manage complications, prepare for renal replacement</td></tr>
              <tr><td>Stage 4</td><td>15-29</td><td>Severe GFR reduction</td><td>Prepare for dialysis/transplant, manage symptoms</td></tr>
              <tr><td>Stage 5</td><td>&lt;15</td><td>Kidney failure</td><td>Dialysis or transplantation needed</td></tr>
            </tbody>
          </table>

          {/* Replace the existing info-section div with this enhanced content */}

            <div className="info-section">
            <h3><i className="fas fa-question-circle"></i> What is Glomerular Filtration Rate (GFR)? Comprehensive Renal Function Assessment Methodology Explained</h3>
            <p><strong>Glomerular Filtration Rate (GFR) calculation</strong> represents the <strong>clinical gold standard measurement</strong> for <strong>precise kidney function assessment</strong> and <strong>accurate renal filtration capacity determination</strong>. This <strong>essential nephrology parameter</strong> quantitatively measures the <strong>volume of blood plasma filtered by renal glomeruli per minute</strong>, providing critical data for <strong>chronic kidney disease diagnosis protocol implementation</strong>, <strong>medication dosing adjustment calculations</strong>, and <strong>long-term renal prognosis evaluation methodologies</strong> across diverse clinical practice settings and patient populations.</p>
            
            <h3><i className="fas fa-calculator"></i> GFR Estimation Formulas Comparative Analysis - Advanced Renal Function Calculation Methodologies</h3>
            <p>Multiple <strong>validated GFR estimation equations</strong> exist for <strong>comprehensive clinical kidney function assessment protocols</strong>, each demonstrating specific <strong>population-specific applications and variable accuracy profiles</strong> that influence <strong>chronic kidney disease management decisions</strong>:</p>
            
            <div className="formula-box">
                <strong>CKD-EPI Formula (Chronic Kidney Disease Epidemiology Collaboration 2009):</strong> Current international standard for adult patients, demonstrates improved accuracy at higher GFR levels<br/>
                <strong>MDRD Formula (Modification of Diet in Renal Disease Study 1999):</strong> Previously established clinical standard, maintains utility in specific patient populations<br/>
                <strong>Cockcroft-Gault Formula (1976):</strong> Traditional methodology for medication dose adjustment calculations in clinical pharmacology<br/>
                <strong>Schwartz Formula (1976):</strong> Pediatric GFR estimation utilizing patient height and serum creatinine measurements<br/>
                <strong>Clinical Formula Selection Protocol:</strong> CKD-EPI recommended for <strong>adult CKD diagnosis accuracy</strong>, Cockcroft-Gault for <strong>precise drug dosing adjustments</strong>
            </div>

            <h3><i className="fas fa-stethoscope"></i> Clinical Applications of GFR Estimation - Comprehensive Medical Management Guidelines and Protocols</h3>
            <p>Accurate <strong>GFR calculation methodology implementation</strong> serves critical functions across multiple <strong>medical specialties and comprehensive therapeutic management areas</strong> requiring <strong>precise renal function assessment</strong>:</p>
            <ul>
                <li><strong>Chronic Kidney Disease Comprehensive Management:</strong> Essential for <strong>CKD staging classification system implementation</strong> and <strong>disease progression monitoring protocols</strong> according to <strong>National Kidney Foundation clinical practice guidelines</strong></li>
                <li><strong>Medication Safety Optimization Protocol:</strong> Guides <strong>precise drug dosage adjustment calculations</strong> for <strong>renally excreted pharmaceutical agents</strong> with <strong>narrow therapeutic index considerations</strong> and <strong>potential nephrotoxicity profiles</strong></li>
                <li><strong>Surgical Risk Stratification Methodology:</strong> Assesses <strong>perioperative complication probability assessment</strong> and informs <strong>anesthetic management decision protocols</strong> for patients with <strong>compromised renal function parameters</strong></li>
                <li><strong>Contrast Agent Administration Safety Protocol:</strong> Determines <strong>contrast-induced nephropathy risk stratification</strong> and guides <strong>preventive hydration protocol implementation</strong> for radiographic imaging procedures</li>
                <li><strong>Hypertension Management Algorithm:</strong> Informs <strong>antihypertensive medication selection methodology</strong> and <strong>individualized blood pressure target determination</strong> based on <strong>renal function preservation principles</strong></li>
                <li><strong>Diabetes Care Comprehensive Protocol:</strong> Monitors <strong>diabetic nephropathy progression patterns</strong> and guides <strong>renoprotective intervention implementation</strong> through <strong>regular GFR monitoring schedules</strong></li>
                <li><strong>Geriatric Patient Assessment Protocol:</strong> Evaluates <strong>age-related renal function decline patterns</strong> for <strong>appropriate medication prescribing practices</strong> in elderly populations</li>
            </ul>
            
            <h3><i className="fas fa-balance-scale"></i> Factors Affecting GFR Accuracy and Clinical Interpretation - Comprehensive Diagnostic Considerations</h3>
            <p>Multiple <strong>significant physiological factors</strong> influence <strong>GFR estimation accuracy parameters</strong> and require consideration for appropriate clinical interpretation methodologies:</p>
            <ul>
                <li><strong>Creatinine Production Metabolic Variability:</strong> Affected by <strong>individual muscle mass differences, dietary protein intake variations, exercise pattern influences, and nutritional status assessments</strong></li>
                <li><strong>Age-Related Physiological Decline Patterns:</strong> GFR naturally declines approximately <strong>0.8-1.0 mL/min/1.73m² per year after age 40</strong> requiring <strong>age-adjusted interpretation methodologies</strong></li>
                <li><strong>Ethnic and Genetic Determinant Factors:</strong> Muscle mass distribution patterns and creatinine metabolism genetic variations across diverse population subgroups</li>
                <li><strong>Comorbid Medical Condition Impacts:</strong> Liver disease manifestations, malnutrition syndromes, and amputation considerations affecting creatinine-based estimation reliability</li>
                <li><strong>Laboratory Methodology Standardization Issues:</strong> Analytical variation between <strong>Jaffe reaction assays and enzymatic creatinine measurement techniques</strong> requiring standardization protocols</li>
                <li><strong>Fluid Status Dynamic Variations:</strong> Clinical dehydration states and volume overload conditions temporarily altering measured GFR parameters</li>
                <li><strong>Pregnancy Physiological Adaptations:</strong> Gestational renal plasma flow increases affecting standard formula application accuracy</li>
            </ul>

            <h3><i className="fas fa-exclamation-triangle"></i> Limitations of Estimated GFR Calculations - Advanced Alternative Assessment Methodologies</h3>
            <p>While <strong>eGFR calculation methodologies</strong> provide valuable <strong>clinical screening tools</strong>, specific clinical situations necessitate <strong>advanced alternative assessment approaches</strong> and <strong>supplementary diagnostic testing protocols</strong>:</p>
            <ul>
                <li><strong>Extreme Body Composition Scenarios:</strong> Significant muscle wasting conditions or severe obesity classifications affecting creatinine production reliability</li>
                <li><strong>Rapid Kidney Function Dynamic Changes:</strong> Acute kidney injury presentations requiring frequent assessment protocols and trending analysis methodologies</li>
                <li><strong>Pregnancy-Specific Considerations:</strong> Physiological adaptation processes affecting standard formula application and interpretation accuracy</li>
                <li><strong>Vegetarian and Vegan Dietary Patterns:</strong> Significantly lower creatinine production rates affecting estimation formula reliability parameters</li>
                <li><strong>Critical Clinical Decision Requirements:</strong> Transplant candidate evaluation protocols or precise chemotherapy dosing calculations requiring measured GFR determination</li>
                <li><strong>Advanced Alternative Assessment Methodologies:</strong> <strong>Serum cystatin C measurement techniques, iohexol clearance protocols, inulin clearance gold standards, and chromium-51 EDTA clearance methods</strong> for improved diagnostic accuracy</li>
            </ul>

            <h3><i className="fas fa-history"></i> Historical Development of GFR Formulas - Evolution of Renal Function Assessment Science</h3>
            <p>The progressive evolution of <strong>GFR estimation methodologies</strong> reflects <strong>decades of nephrology research advancement</strong> and <strong>diagnostic technology improvement trajectories</strong>:</p>
            <ul>
                <li><strong>1976 Historical Milestone:</strong> Cockcroft-Gault formula establishes <strong>creatinine-based estimation paradigm</strong> for clinical pharmacology applications</li>
                <li><strong>1999 Diagnostic Advancement:</strong> MDRD study develops <strong>four-variable equation methodology</strong> improving accuracy in established CKD patient populations</li>
                <li><strong>2009 Standardization Achievement:</strong> CKD-EPI equation provides <strong>significantly improved accuracy at higher GFR levels</strong> and becomes international standard</li>
                <li><strong>2010s Innovation Period:</strong> Development of <strong>cystatin C-based estimation equations</strong> and <strong>combined creatinine-cystatin C formula methodologies</strong> for enhanced accuracy</li>
                <li><strong>2020s Contemporary Developments:</strong> Movement toward <strong>race-free equation development</strong> and <strong>population-specific adjustment factor implementation</strong> in modern clinical practice</li>
            </ul>

            <h3><i className="fas fa-user-md"></i> Practical Clinical Implementation Recommendations - Comprehensive GFR Application Guidelines</h3>
            <p>For optimal <strong>GFR calculation implementation</strong> in contemporary clinical practice environments and <strong>evidence-based patient management protocols</strong>:</p>
            <ul>
                <li><strong>Consistent Formula Application Protocol:</strong> Utilize <strong>identical estimation methodology</strong> for serial patient monitoring consistency and trend analysis reliability</li>
                <li><strong>Comprehensive Clinical Context Integration:</strong> Consider <strong>patient-specific demographic factors, dietary patterns, medication profiles, and comorbid conditions</strong> beyond numerical GFR values alone</li>
                <li><strong>Standardized Documentation Methodology:</strong> Systematically record <strong>GFR numerical value, specific formula utilized, calculation date, and relevant clinical context factors</strong> in electronic health records</li>
                <li><strong>Temporal Trend Analysis Emphasis:</strong> Prioritize <strong>GFR change patterns over extended time periods</strong> rather than isolated measurement interpretation</li>
                <li><strong>Multidisciplinary Collaboration Enhancement:</strong> Coordinate assessment protocols with <strong>clinical pharmacy specialists, laboratory medicine professionals, and nephrology consultation services</strong> for comprehensive care</li>
                <li><strong>Patient Education Protocol Implementation:</strong> Develop <strong>individualized educational materials</strong> explaining <strong>GFR significance, monitoring importance, and lifestyle modification strategies</strong></li>
            </ul>

            <h3><i className="fas fa-chart-line"></i> Future Directions in GFR Assessment Technology - Emerging Diagnostic Methodologies</h3>
            <p>Ongoing <strong>renal research initiatives</strong> continue refining <strong>GFR assessment approaches</strong> with promising technological developments and <strong>innovative diagnostic methodologies</strong>:</p>
            <ul>
                <li><strong>Novel Biomarker Discovery Research:</strong> Identification of <strong>new filtration marker candidates</strong> with improved diagnostic accuracy profiles and reduced confounding factors</li>
                <li><strong>Artificial Intelligence Clinical Applications:</strong> Machine learning algorithm development for <strong>personalized GFR prediction models</strong> incorporating multiple clinical variables</li>
                <li><strong>Point-of-Care Testing Advancements:</strong> Development of <strong>rapid, accurate bedside GFR assessment devices</strong> with immediate result availability for clinical decision support</li>
                <li><strong>Genetic Factor Integration Methodology:</strong> Incorporation of <strong>genetic polymorphism analysis</strong> affecting creatinine metabolism pathways into estimation algorithms</li>
                <li><strong>International Standardization Initiatives:</strong> Global collaborative efforts for <strong>consistent laboratory measurement technique implementation</strong> and <strong>harmonized reporting standards</strong></li>
                <li><strong>Wearable Technology Integration:</strong> Development of <strong>continuous renal monitoring devices</strong> providing real-time GFR trend data for chronic disease management</li>
            </ul>

            <h3><i className="fas fa-graduation-cap"></i> Educational Requirements and Professional Training Standards Implementation</h3>
            <p>Proper <strong>GFR calculation methodology education</strong> represents an <strong>essential clinical competency requirement</strong> for <strong>healthcare professionals</strong> across multiple medical disciplines. Comprehensive training curricula should systematically include <strong>formula selection principles, interpretation guideline protocols, clinical application strategies, and limitation recognition methodologies</strong>. Continuing medical education programs must consistently address <strong>evolving research findings, changing clinical practice standards, and emerging technological developments</strong> to ensure optimal patient care outcomes and evidence-based practice implementation. Professional certification organizations should develop <strong>standardized assessment tools and competency verification processes</strong> to guarantee consistent clinical application quality across diverse healthcare delivery settings and specialty practice areas.</p>

            <h3><i className="fas fa-clipboard-check"></i> Quality Assurance and Laboratory Standardization Protocols</h3>
            <p>Implementation of <strong>rigorous quality assurance protocols</strong> ensures <strong>reliable GFR calculation results</strong> across diverse clinical laboratory settings. These protocols encompass <strong>creatinine assay standardization methodologies, calibration verification procedures, and proficiency testing requirements</strong> that directly impact <strong>estimation formula accuracy parameters</strong>. International organizations including the <strong>National Institute of Standards and Technology (NIST)</strong> and <strong>International Federation of Clinical Chemistry (IFCC)</strong> have developed <strong>standard reference materials and harmonization initiatives</strong> to minimize inter-laboratory variability and ensure consistent result reporting. Healthcare institutions should implement <strong>regular audit processes and quality improvement initiatives</strong> to monitor <strong>GFR calculation accuracy</strong> and identify opportunities for <strong>diagnostic process optimization</strong>.</p>

            <h3><i className="fas fa-database"></i> Population-Specific Considerations and Demographic Adjustment Factors</h3>
            <p>Accurate <strong>GFR interpretation</strong> requires consideration of <strong>population-specific physiological variations</strong> and <strong>demographic adjustment factors</strong> that influence estimation formula performance. These considerations include <strong>ethnicity-specific muscle mass distributions, age-related physiological decline patterns, gender-based body composition differences, and geographic dietary pattern influences</strong>. Contemporary research emphasizes the importance of <strong>individualized assessment approaches</strong> rather than categorical assumptions, with particular attention to <strong>transitioning from race-based to race-conscious clinical algorithms</strong>. Healthcare providers should maintain awareness of <strong>evolving demographic adjustment methodologies</strong> and implement <strong>patient-centered interpretation strategies</strong> that consider the complete clinical context rather than formulaic calculations alone.</p>

            <h3><i className="fas fa-hand-holding-medical"></i> Patient-Centered Care and Shared Decision Making Approaches</h3>
            <p>Effective <strong>GFR result communication</strong> represents a critical component of <strong>patient-centered renal care delivery</strong>. Healthcare providers should develop <strong>individualized communication strategies</strong> that translate <strong>complex numerical results</strong> into <strong>understandable health information</strong> supporting <strong>informed decision making processes</strong>. These approaches include <strong>visual aid utilization, progressive disclosure methodologies, and culturally appropriate educational materials</strong> that empower patients to participate actively in their <strong>chronic kidney disease management plans</strong>. Regular <strong>shared decision making conversations</strong> should address <strong>treatment option considerations, lifestyle modification strategies, and monitoring schedule determinations</strong> based on comprehensive GFR assessment results and individualized patient preferences and values.</p>
            </div>
          {/* Q&A Dropdown Section */}
          <div className="faq-section">
            <h2 className="faq-title"><i className="fas fa-question-circle"></i> Frequently Asked Questions About GFR Calculation</h2>
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
            <h3><i className="fas fa-calculator"></i> Related Medical & Renal Function Calculators</h3>
            <p>Explore our comprehensive collection of <strong>medical calculation tools and renal assessment calculators</strong> for clinical applications and patient management:</p>
            <div className="calculators-grid">
              {healthCalculators.map((calculator, index) => (
                <a key={index} href={calculator.link} className="calculator-card">
                  <i className="fas fa-calculator"></i> {calculator.name}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Sidebar with 3 Ads (3rd one sticky) */}
        <aside className="sidebar">
          <div className="sidebar-content">
            <div className="ad-slot sidebar-ad">
              <p><i className="fas fa-ad"></i> Advertisement 1</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Sponsored Content</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Renal health supplement formula</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>300px height ad slot</p>
            </div>
            
            <div className="ad-slot sidebar-ad">
              <p><i className="fas fa-ad"></i> Advertisement 2</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Featured Product</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Home kidney function test kit</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>300px height ad slot</p>
            </div>
            
            <div className="ad-slot sticky-ad">
              <p><i className="fas fa-thumbtack"></i> Sticky Advertisement</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Premium Content - Stays visible</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Nephrology specialist consultation</p>
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