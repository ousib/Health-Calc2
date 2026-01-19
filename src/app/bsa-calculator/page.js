"use client";

import { useState, useEffect } from 'react';

export default function BSAPage() {
  const [currentUnit, setCurrentUnit] = useState('metric');
  const [currentFormula, setCurrentFormula] = useState('mosteller');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bsaResult, setBsaResult] = useState(null);
  const [formulaName, setFormulaName] = useState('Mosteller Formula');
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeFAQ, setActiveFAQ] = useState(null);

  // Sample data for demo
  useEffect(() => {
    setWeight('70');
    setHeight('175');
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

  const toggleUnits = (unit) => {
    setCurrentUnit(unit);
    setBsaResult(null);
  };

  const selectFormula = (formula) => {
    setCurrentFormula(formula);
    setBsaResult(null);
    
    // Update formula name
    switch(formula) {
      case 'mosteller':
        setFormulaName('Mosteller Formula');
        break;
      case 'dubois':
        setFormulaName('Du Bois Formula');
        break;
      case 'haycock':
        setFormulaName('Haycock Formula');
        break;
      case 'gehan':
        setFormulaName('Gehan & George Formula');
        break;
    }
  };

  const calculateBSA = () => {
    let weightVal = parseFloat(weight);
    let heightVal = parseFloat(height);
    
    // Validate inputs
    if (!weightVal || !heightVal || weightVal <= 0 || heightVal <= 0) {
      alert('Please enter valid height and weight values.');
      return;
    }
    
    // Convert imperial to metric if needed (all formulas use metric)
    if (currentUnit === 'imperial') {
      // Convert lbs to kg
      weightVal = weightVal * 0.453592;
      // Convert inches to cm
      heightVal = heightVal * 2.54;
    }
    
    let bsa = 0;
    
    // Calculate based on selected formula
    switch(currentFormula) {
      case 'mosteller':
        bsa = Math.sqrt((heightVal * weightVal) / 3600);
        break;
      case 'dubois':
        bsa = 0.007184 * Math.pow(heightVal, 0.725) * Math.pow(weightVal, 0.425);
        break;
      case 'haycock':
        bsa = 0.024265 * Math.pow(heightVal, 0.3964) * Math.pow(weightVal, 0.5378);
        break;
      case 'gehan':
        bsa = 0.0235 * Math.pow(heightVal, 0.42246) * Math.pow(weightVal, 0.51456);
        break;
    }
    
    // Round to 2 decimal places
    setBsaResult(bsa.toFixed(2));
  };

  const getFormulaDisplay = () => {
    switch(currentFormula) {
      case 'mosteller':
        return 'BSA = √([Height(cm) × Weight(kg)] ÷ 3600)';
      case 'dubois':
        return 'BSA = 0.007184 × Height(cm)<sup>0.725</sup> × Weight(kg)<sup>0.425</sup>';
      case 'haycock':
        return 'BSA = 0.024265 × Height(cm)<sup>0.3964</sup> × Weight(kg)<sup>0.5378</sup>';
      case 'gehan':
        return 'BSA = 0.0235 × Height(cm)<sup>0.42246</sup> × Weight(kg)<sup>0.51456</sup>';
      default:
        return 'BSA = √([Height(cm) × Weight(kg)] ÷ 3600)';
    }
  };

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "Why is BSA used for chemotherapy dosing instead of body weight?",
      answer: "Body Surface Area (BSA) correlates better with metabolic rate, organ function, and drug clearance than body weight alone. For cytotoxic drugs with narrow therapeutic windows, BSA-based dosing reduces toxicity while maintaining efficacy, particularly important for chemotherapy agents that affect rapidly dividing cells throughout the body."
    },
    {
      question: "Which BSA formula is most accurate?",
      answer: "The Mosteller formula is most widely used in clinical practice due to its simplicity and validation across diverse populations. However, the Du Bois formula has the longest validation history. Accuracy varies by population - Haycock is optimized for pediatric patients, while Gehan & George may be preferable for certain demographic groups. Consistency matters more than absolute accuracy in clinical practice."
    },
    {
      question: "Should BSA be capped for medication dosing?",
      answer: "Yes, many institutions cap BSA at 2.0 m² for chemotherapy dosing to prevent excessive drug exposure in larger patients. This practice acknowledges that BSA may overestimate metabolic requirements in obesity and helps standardize dosing across patient populations while maintaining treatment efficacy and reducing toxicity risks."
    },
    {
      question: "How does BSA change with age and growth?",
      answer: "BSA increases rapidly during childhood growth, plateaus in adulthood, and may decrease slightly in advanced age due to height loss and muscle mass reduction. In children, BSA is crucial for age-appropriate dosing. Pediatric formulas account for developmental changes in body proportions not captured by simple weight-based calculations."
    },
    {
      question: "Can BSA be used for nutritional requirements calculation?",
      answer: "While historically used for estimating basal metabolic rate, BSA has been largely replaced by more accurate methods for nutritional planning. Current guidelines prefer equations considering age, sex, weight, height, and activity level. However, BSA remains useful for estimating energy requirements in hospitalized patients when precise measurements aren't available."
    }
  ];

  const healthCalculators = [
    { name: "Body Fat Calculator", link: "/body-fat-calculator" },
    { name: "Ideal Weight Calculator", link: "/ideal-weight-calculator" },
    { name: "BMI Calculator", link: "/bmi-calculator" },
    { name: "BMR Calculator", link: "/bmr-calculator" },
    { name: "TDEE Calculator", link: "/tdee-calculator" },
    { name: "Creatinine Clearance", link: "/creatinine-clearance" },
    { name: "GFR Calculator", link: "/gfr-calculator" },
    { name: "Cardiac Index Calculator", link: "/cardiac-index-calculator" }
  ];

  // Handle Enter key press
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        calculateBSA();
      }
    };

    document.addEventListener('keypress', handleKeyPress);
    return () => document.removeEventListener('keypress', handleKeyPress);
  }, [weight, height, currentUnit, currentFormula]);

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
          background: #27ae60;
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(39, 174, 96, 0.2);
          border-color: #27ae60;
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
        
        .input-group input { 
          width: 100%; 
          padding: 14px 16px; 
          border: 2px solid #dfe6e9; 
          border-radius: 10px; 
          font-size: 1rem; 
          outline: none; 
          transition: all 0.3s;
        }
        
        .input-group input:focus { 
          border-color: #27ae60; 
          box-shadow: 0 0 0 3px rgba(39, 174, 96, 0.1);
        }

        /* Units Toggle */
        .units-toggle {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .unit-btn {
          padding: 8px 16px;
          background: #f1f3f5;
          border: 2px solid #dfe6e9;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s;
        }

        .unit-btn.active {
          background: #27ae60;
          color: white;
          border-color: #27ae60;
        }

        .calc-btn { 
          width: 100%; 
          padding: 16px; 
          background: #27ae60; 
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
          background: #219150; 
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(39, 174, 96, 0.2);
        }

        /* Results Section */
        .results-box { 
          margin: 30px 0; 
          padding: 25px; 
          background: linear-gradient(135deg, #f8f9fa 0%, #e8f5e9 100%);
          border-radius: 12px; 
          border-left: 5px solid #27ae60;
          text-align: center;
          display: ${bsaResult ? 'block' : 'none'}; 
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        
        .bsa-val { 
          font-size: clamp(2.5rem, 8vw, 3.5rem); 
          font-weight: 800; 
          display: block; 
          margin: 10px 0; 
          color: #27ae60; 
        }

        .unit { 
          font-size: 1.2rem; 
          color: #666; 
        }

        /* Formula Comparison */
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
          background: #27ae60;
          color: white;
        }

        .formula-display {
          padding: 20px;
          background: white;
          border-radius: 8px;
          font-family: 'Courier New', monospace;
          text-align: center;
          font-size: 1rem;
          border-left: 4px solid #27ae60;
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

        /* BSA Visualization */
        .bsa-visualization {
          margin: 30px 0;
          padding: 20px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 3px 10px rgba(0,0,0,0.05);
        }

        .bsa-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 15px;
          margin-top: 15px;
        }

        .bsa-item {
          text-align: center;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 8px;
          border: 2px solid #e9ecef;
          transition: all 0.3s;
        }

        .bsa-item:hover {
          border-color: #27ae60;
          transform: translateY(-3px);
        }

        .bsa-value {
          font-size: 1.5rem;
          font-weight: bold;
          color: #27ae60;
          margin: 5px 0;
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
          text-align: center; 
          margin: 20px 0; 
          font-size: 1.1rem;
          border-left: 4px solid #27ae60;
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
          
          .bsa-grid {
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
            font-size: 1rem;
            padding: 15px;
          }
          
          .bsa-grid {
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
          <h1 className="calc-title"><i className="fas fa-square"></i> Body Surface Area (BSA) Calculator - Medical Anthropometric Measurement Tool</h1>
          <p className="calc-desc">Calculate your <strong>body surface area estimation</strong> using multiple validated clinical formulas. Essential for <strong>precise drug dosage calculation, chemotherapy dosing, cardiac output normalization, and medical treatment planning</strong>.</p>
          
          <div className="units-toggle">
            <button 
              className={`unit-btn ${currentUnit === 'metric' ? 'active' : ''}`} 
              onClick={() => toggleUnits('metric')}
            >
              Metric (kg/cm)
            </button>
            <button 
              className={`unit-btn ${currentUnit === 'imperial' ? 'active' : ''}`} 
              onClick={() => toggleUnits('imperial')}
            >
              Imperial (lbs/in)
            </button>
          </div>

          <div className="measurement-grid">
            <div className="input-group">
              <label><i className="fas fa-weight"></i> {currentUnit === 'metric' ? 'Weight (kg)' : 'Weight (lbs)'}</label>
              <input 
                type="number" 
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder={currentUnit === 'metric' ? '70' : '154'}
                min="2" 
                max="300" 
                step="0.1"
              />
            </div>

            <div className="input-group">
              <label><i className="fas fa-ruler-vertical"></i> {currentUnit === 'metric' ? 'Height (cm)' : 'Height (inches)'}</label>
              <input 
                type="number" 
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder={currentUnit === 'metric' ? '175' : '69'}
                min="50" 
                max="250" 
                step="0.1"
              />
            </div>
          </div>

          {/* Formula Selection */}
          <div className="formula-comparison">
            <h4><i className="fas fa-calculator"></i> BSA Formula Selection - Compare Different Anthropometric Calculation Methods</h4>
            <p style={{ fontSize: '0.95rem', color: '#666', marginBottom: '15px' }}>
              Different formulas yield slightly different BSA estimates. The <strong>Mosteller formula</strong> is most common in clinical settings due to its simplicity and validation.
            </p>
            
            <div className="formula-tabs">
              <button 
                className={`formula-tab ${currentFormula === 'mosteller' ? 'active' : ''}`} 
                onClick={() => selectFormula('mosteller')}
              >
                Mosteller
              </button>
              <button 
                className={`formula-tab ${currentFormula === 'dubois' ? 'active' : ''}`} 
                onClick={() => selectFormula('dubois')}
              >
                Du Bois
              </button>
              <button 
                className={`formula-tab ${currentFormula === 'haycock' ? 'active' : ''}`} 
                onClick={() => selectFormula('haycock')}
              >
                Haycock
              </button>
              <button 
                className={`formula-tab ${currentFormula === 'gehan' ? 'active' : ''}`} 
                onClick={() => selectFormula('gehan')}
              >
                Gehan & George
              </button>
            </div>
            
            <div className="formula-display" dangerouslySetInnerHTML={{ __html: getFormulaDisplay() }} />
          </div>

          <button className="calc-btn" onClick={calculateBSA}>
            <i className="fas fa-calculator"></i> Calculate Body Surface Area
          </button>

          <div className="results-box" style={{ display: bsaResult ? 'block' : 'none' }}>
            <h3>Estimated Body Surface Area Result</h3>
            <span className="bsa-val">{bsaResult || '--'}</span>
            <p className="unit">square meters (m²)</p>
            <p style={{ marginTop: '10px', fontSize: '0.9rem', color: '#666' }}>
              <span>{formulaName}</span>
            </p>
          </div>

          {/* BSA Visualization */}
          <div className="bsa-visualization">
            <h4><i className="fas fa-chart-bar"></i> BSA Reference Values - Population-Based Anthropometric Data</h4>
            <p style={{ fontSize: '0.95rem', color: '#666', marginBottom: '15px' }}>
              Average BSA values for different demographic groups based on <strong>epidemiological studies</strong>:
            </p>
            
            <div className="bsa-grid">
              <div className="bsa-item">
                <div><i className="fas fa-baby" style={{ color: '#3498db' }}></i></div>
                <div className="bsa-value">0.25 m²</div>
                <div>Newborn Infant</div>
              </div>
              <div className="bsa-item">
                <div><i className="fas fa-child" style={{ color: '#2ecc71' }}></i></div>
                <div className="bsa-value">1.07 m²</div>
                <div>9-Year-Old Child</div>
              </div>
              <div className="bsa-item">
                <div><i className="fas fa-female" style={{ color: '#9b59b6' }}></i></div>
                <div className="bsa-value">1.60 m²</div>
                <div>Average Adult Woman</div>
              </div>
              <div className="bsa-item">
                <div><i className="fas fa-male" style={{ color: '#3498db' }}></i></div>
                <div className="bsa-value">1.90 m²</div>
                <div>Average Adult Man</div>
              </div>
            </div>
          </div>

          <div className="ad-slot">
            <p><i className="fas fa-ad"></i> Advertisement</p>
            <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Your ad could be here</p>
          </div>

          {/* Clinical Applications */}
          <div className="clinical-apps">
            <div className="clinical-card">
              <h4><i className="fas fa-prescription-bottle-alt"></i> Chemotherapy Dosing</h4>
              <p style={{ fontSize: '0.9rem' }}>Critical for <strong>precise cytotoxic drug administration</strong>, reducing toxicity while maintaining efficacy in <strong>oncology treatment protocols</strong>.</p>
            </div>
            <div className="clinical-card">
              <h4><i className="fas fa-heartbeat"></i> Cardiac Output Normalization</h4>
              <p style={{ fontSize: '0.9rem' }}>Calculates <strong>cardiac index (CI = CO/BSA)</strong> for <strong>hemodynamic monitoring</strong> in critical care and cardiology settings.</p>
            </div>
            <div className="clinical-card">
              <h4><i className="fas fa-flask"></i> Renal Function Assessment</h4>
              <p style={{ fontSize: '0.9rem' }}>Used in <strong>glomerular filtration rate (GFR) calculation</strong> and <strong>creatinine clearance estimation</strong> for kidney function evaluation.</p>
            </div>
            <div className="clinical-card">
              <h4><i className="fas fa-burn"></i> Burn Surface Area</h4>
              <p style={{ fontSize: '0.9rem' }}>Essential for <strong>Rule of Nines calculation</strong> in <strong>burn resuscitation fluid requirements</strong> and <strong>wound management planning</strong>.</p>
            </div>
          </div>

          <h3><i className="fas fa-list-alt"></i> Average BSA Reference Values - Anthropometric Standards Database</h3>
          <table className="category-table">
            <thead>
              <tr>
                <th>Population Group</th>
                <th>Average BSA (m²)</th>
                <th>Typical Range</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Neonate (Newborn)</td><td>0.25 m²</td><td>0.2–0.3 m²</td></tr>
              <tr><td>Toddler (2 years)</td><td>0.5 m²</td><td>0.4–0.6 m²</td></tr>
              <tr><td>Child (9 years)</td><td>1.07 m²</td><td>0.9–1.2 m²</td></tr>
              <tr><td>Adult Woman</td><td>1.60 m²</td><td>1.4–1.8 m²</td></tr>
              <tr><td>Adult Man</td><td>1.90 m²</td><td>1.7–2.1 m²</td></tr>
            </tbody>
          </table>

          {/* Enhanced SEO Content with High-Value Long-Tail Keywords */}
          <div className="info-section">
            <h3><i className="fas fa-question-circle"></i> What is Body Surface Area (BSA)? - Medical Anthropometric Measurement Explained</h3>
            <p><strong>Body Surface Area (BSA) calculation</strong> represents the <strong>total external surface area estimation</strong> of the human body, expressed in <strong>square meters (m²) measurement</strong>. This <strong>essential clinical anthropometric parameter</strong> serves as a more accurate indicator of <strong>metabolic mass determination</strong> and <strong>physiological process normalization</strong> than <strong>body weight alone</strong>, particularly for <strong>precise medication dosing protocols</strong>, <strong>fluid resuscitation calculations</strong>, and <strong>physiological parameter standardization</strong> in modern medical practice.</p>
            
            <h3><i className="fas fa-calculator"></i> BSA Calculation Formulas - Comprehensive Comparative Analysis of Anthropometric Methods</h3>
            <p>Multiple <strong>validated body surface area formulas</strong> exist for <strong>clinical BSA estimation</strong>, each with specific <strong>medical applications and accuracy validation profiles</strong>:</p>
            
            <div className="formula-box">
              <strong>Mosteller Formula (1987):</strong> √([Height(cm) × Weight(kg)] ÷ 3600)<br/>
              <strong>Du Bois & Du Bois Formula (1916):</strong> 0.007184 × Height(cm)<sup>0.725</sup> × Weight(kg)<sup>0.425</sup><br/>
              <strong>Haycock Formula (1978):</strong> 0.024265 × Height(cm)<sup>0.3964</sup> × Weight(kg)<sup>0.5378</sup><br/>
              <strong>Gehan & George Formula (1970):</strong> 0.0235 × Height(cm)<sup>0.42246</sup> × Weight(kg)<sup>0.51456</sup><br/>
              <strong>Clinical Formula Selection Guidance:</strong> Mosteller recommended for <strong>general clinical practice applications</strong>, Du Bois for <strong>historical data comparisons</strong>, Haycock for <strong>pediatric population accuracy</strong>
            </div>

            <h3><i className="fas fa-stethoscope"></i> Clinical Applications of Body Surface Area - Comprehensive Medical Treatment Parameter Normalization</h3>
            <p>BSA serves as a <strong>critical normalization factor</strong> in numerous <strong>medical applications and therapeutic interventions</strong>:</p>
            <ul>
              <li><strong>Oncology Drug Dosing Protocols:</strong> Calculates <strong>precise chemotherapy regimens</strong>, <strong>targeted cancer therapies</strong>, and <strong>immunomodulator dosages</strong> with <strong>narrow therapeutic index considerations</strong></li>
              <li><strong>Cardiovascular Medicine Applications:</strong> Derives <strong>cardiac index calculations</strong>, <strong>stroke volume index determinations</strong>, and <strong>systemic vascular resistance index assessments</strong> from <strong>hemodynamic monitoring data</strong></li>
              <li><strong>Nephrology Practice Requirements:</strong> Normalizes <strong>glomerular filtration rate (GFR) estimations</strong> and <strong>creatinine clearance calculations</strong> for accurate <strong>kidney function assessment protocols</strong></li>
              <li><strong>Burn Management Strategies:</strong> Calculates <strong>total burn surface area (TBSA) percentages</strong> using the <strong>Rule of Nines methodology</strong> for <strong>fluid resuscitation protocols</strong> and <strong>wound care planning</strong></li>
              <li><strong>Pediatric Medicine Considerations:</strong> Determines <strong>age-appropriate drug dosages</strong> and <strong>nutritional requirement calculations</strong> for <strong>growing child populations</strong></li>
              <li><strong>Critical Care Interventions:</strong> Guides <strong>vasopressor dosing algorithms</strong>, <strong>ventilator setting adjustments</strong>, and <strong>intravenous fluid administration rates</strong> in <strong>ICU patient management</strong></li>
            </ul>
            
            <h3><i className="fas fa-balance-scale"></i> BSA vs. Body Weight for Drug Dosing - Comprehensive Pharmacokinetic Considerations</h3>
            <p>While <strong>body weight-based dosing methodologies</strong> suffice for many medications, BSA offers <strong>significant advantages</strong> for specific drug classes and clinical scenarios:</p>
            <ul>
              <li><strong>Cytotoxic Chemotherapy Administration:</strong> Correlates better with <strong>drug clearance rate predictions</strong> and <strong>toxicity profile assessments</strong> than weight-based approaches</li>
              <li><strong>Therapeutic Monoclonal Antibody Dosing:</strong> Often dosed by BSA for <strong>improved pharmacokinetic predictability</strong> and <strong>reduced inter-patient variability</strong></li>
              <li><strong>Narrow Therapeutic Index Drug Management:</strong> Reduces <strong>significant inter-patient variability in drug exposure</strong> and <strong>adverse reaction risks</strong></li>
              <li><strong>Pediatric Medication Administration:</strong> Accounts for <strong>developmental changes in body composition</strong> and <strong>metabolic maturation processes</strong></li>
              <li><strong>Obese Patient Dosing Considerations:</strong> Prevents <strong>systemic overdosing in patients with high adiposity</strong> but <strong>normal body surface area measurements</strong></li>
            </ul>
            
            <h3><i className="fas fa-chart-line"></i> Factors Influencing BSA Accuracy and Clinical Interpretation Parameters</h3>
            <p>Several <strong>critical factors</strong> affect BSA calculation accuracy and appropriate clinical interpretation:</p>
            <ul>
              <li><strong>Body Composition Variability Factors:</strong> Different <strong>muscle-to-fat ratio distributions</strong> impact <strong>surface area estimation accuracy</strong> across populations</li>
              <li><strong>Age-Related Physiological Changes:</strong> Children and elderly populations demonstrate <strong>different body proportion characteristics</strong> affecting <strong>formula accuracy validations</strong></li>
              <li><strong>Ethnic Anthropometric Differences:</strong> Population-specific <strong>anthropometric variation patterns</strong> may influence <strong>BSA estimation precision</strong></li>
              <li><strong>Edema and Ascites Considerations:</strong> Fluid accumulation conditions can <strong>artificially increase body weight measurements</strong> without <strong>proportionally increasing surface area dimensions</strong></li>
              <li><strong>Amputations and Physical Deformities:</strong> Require <strong>adjusted BSA calculation methodologies</strong> for accurate <strong>medical dosing determinations</strong></li>
            </ul>

            <h3><i className="fas fa-exclamation-triangle"></i> Limitations and Controversies in BSA Usage - Evidence-Based Medical Practice Guidelines</h3>
            <p>Despite <strong>widespread clinical utilization</strong>, BSA has <strong>important limitations</strong> requiring <strong>informed clinical judgment applications</strong>:</p>
            <ul>
              <li><strong>Obese Patient Clinical Considerations:</strong> BSA may <strong>overestimate metabolic requirements</strong> in <strong>severe obesity classifications</strong> requiring <strong>adjusted calculation approaches</strong></li>
              <li><strong>Formula Discrepancy Challenges:</strong> Different formulas yield <strong>clinically significant calculation variations</strong> in <strong>certain population subgroups</strong></li>
              <li><strong>Individual Physiological Variability:</strong> Genetic and constitutional factors create <strong>substantial inter-individual differences</strong> in <strong>surface area to mass relationships</strong></li>
              <li><strong>Alternative Anthropometric Metrics:</strong> <strong>Lean body mass determinations</strong> and <strong>ideal body weight calculations</strong> may be superior for <strong>specific drug class administrations</strong></li>
              <li><strong>Modern Dosing Trend Developments:</strong> <strong>Fixed dosing strategies</strong> and <strong>therapeutic drug monitoring approaches</strong> are replacing <strong>BSA-based dosing protocols</strong> for some medication categories</li>
            </ul>

            <h3><i className="fas fa-history"></i> Historical Development of BSA Formulas - Evolution of Anthropometric Science Research</h3>
            <p>The development of <strong>BSA calculation methodologies</strong> reflects <strong>centuries of anthropometric research evolution</strong> and <strong>medical measurement advancements</strong>:</p>
            <ul>
              <li><strong>1916 Historical Milestone:</strong> Du Bois brothers develop <strong>first validated BSA formula</strong> using <strong>plaster mold measurement techniques</strong> and <strong>mathematical modeling approaches</strong></li>
              <li><strong>1970 Clinical Advancement:</strong> Gehan & George formula improves accuracy for <strong>chemotherapy dosing applications</strong> and <strong>oncological treatment protocols</strong></li>
              <li><strong>1978 Pediatric Optimization:</strong> Haycock formula optimized for <strong>pediatric population accuracy</strong> and <strong>developmental consideration incorporation</strong></li>
              <li><strong>1987 Practical Innovation:</strong> Mosteller introduces <strong>simplified "easy-to-remember" formula</strong> gaining <strong>widespread clinical adoption</strong> and <strong>international recognition</strong></li>
              <li><strong>21st Century Technological Progress:</strong> Development of <strong>population-specific formulas</strong> and <strong>3D scanning validation methods</strong> for <strong>enhanced measurement precision</strong></li>
            </ul>

            <h3><i className="fas fa-user-md"></i> Practical Recommendations for Healthcare Professionals - Clinical Implementation Guidelines</h3>
            <p>For optimal <strong>BSA utilization</strong> in contemporary clinical practice environments:</p>
            <ul>
              <li><strong>Consistent Formula Application:</strong> Always use the <strong>same BSA calculation method</strong> for <strong>serial patient assessment comparisons</strong> and <strong>treatment monitoring protocols</strong></li>
              <li><strong>Clinical Judgment Integration:</strong> Adjust doses based on <strong>comprehensive organ function evaluations</strong>, <strong>age considerations</strong>, and <strong>comorbidity assessments</strong> beyond <strong>BSA calculations alone</strong></li>
              <li><strong>Documentation Standardization:</strong> Record both <strong>BSA numerical value</strong> and <strong>specific calculation method utilized</strong> in <strong>comprehensive medical records</strong></li>
              <li><strong>Patient Education Strategies:</strong> Explain the <strong>purpose of BSA calculation</strong> and its role in <strong>personalized treatment planning approaches</strong> and <strong>medication safety protocols</strong></li>
              <li><strong>Interdisciplinary Collaboration Enhancement:</strong> Coordinate BSA usage across <strong>pharmacy departments</strong>, <strong>nursing teams</strong>, and <strong>medical specialists</strong> for <strong>treatment consistency optimization</strong></li>
            </ul>

            <h3><i className="fas fa-database"></i> Research and Evidence Base - Contemporary BSA Validation Studies</h3>
            <p>Recent <strong>clinical research investigations</strong> continue to validate and refine <strong>BSA application methodologies</strong> across diverse medical specialties. <strong>Large-scale population studies</strong> have established <strong>reference value databases</strong> for different <strong>demographic groups and clinical conditions</strong>. Ongoing <strong>pharmacokinetic research</strong> explores the relationship between <strong>BSA measurements</strong> and <strong>drug disposition characteristics</strong> for <strong>improved therapeutic outcomes</strong>. The integration of <strong>advanced imaging technologies</strong> and <strong>computational modeling approaches</strong> promises further refinements in <strong>surface area estimation accuracy</strong> and <strong>clinical application precision</strong>.</p>

            <h3><i className="fas fa-graduation-cap"></i> Educational Resources and Training Requirements</h3>
            <p>Proper <strong>BSA calculation education</strong> represents an <strong>essential component</strong> of <strong>healthcare professional training programs</strong>. Medical schools, nursing programs, and pharmacy curricula should include comprehensive instruction on <strong>BSA calculation methodologies</strong>, <strong>clinical application principles</strong>, and <strong>interpretation guidelines</strong>. Continuing education programs should address <strong>emerging research findings</strong> and <strong>evolving clinical practices</strong> related to <strong>BSA utilization</strong>. Professional organizations should develop <strong>standardized training materials</strong> and <strong>competency assessment tools</strong> to ensure <strong>consistent application standards</strong> across healthcare settings and specialties.</p>
          </div>

          {/* Q&A Dropdown Section */}
          <div className="faq-section">
            <h2 className="faq-title"><i className="fas fa-question-circle"></i> Frequently Asked Questions About Body Surface Area Calculation</h2>
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
            <h3><i className="fas fa-calculator"></i> Related Medical & Health Calculators</h3>
            <p>Explore our comprehensive collection of <strong>medical calculation tools and health assessment calculators</strong> for clinical applications and personal health monitoring:</p>
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
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Medical calculation software suite</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>300px height ad slot</p>
            </div>
            
            <div className="ad-slot sidebar-ad">
              <p><i className="fas fa-ad"></i> Advertisement 2</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Featured Product</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Clinical reference handbook</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>300px height ad slot</p>
            </div>
            
            <div className="ad-slot sticky-ad">
              <p><i className="fas fa-thumbtack"></i> Sticky Advertisement</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Premium Content - Stays visible</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Healthcare professional certification</p>
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