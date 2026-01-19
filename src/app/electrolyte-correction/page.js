"use client";

import { useState, useEffect } from 'react';

export default function ElectrolyteCorrectionPage() {
  const [sodium, setSodium] = useState('');
  const [glucose, setGlucose] = useState('');
  const [bun, setBun] = useState('');
  const [albumin, setAlbumin] = useState('');
  const [calcium, setCalcium] = useState('');
  const [magnesium, setMagnesium] = useState('');
  const [phosphate, setPhosphate] = useState('');
  const [weight, setWeight] = useState('');
  const [correctionType, setCorrectionType] = useState('sodium');
  const [result, setResult] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeFAQ, setActiveFAQ] = useState(null);

  // Styles
  const containerStyle = {
    width: '100%',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '20px',
    display: 'grid',
    gridTemplateColumns: showSidebar ? '1fr 300px' : '1fr',
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
    color: '#666'
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

  const methodTabsStyle = {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    flexWrap: 'wrap'
  };

  const methodTabStyle = {
    padding: '12px 24px',
    background: '#e9ecef',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.3s',
    fontSize: '0.95rem'
  };

  const activeMethodTabStyle = {
    background: '#3498db',
    color: 'white',
    boxShadow: '0 3px 10px rgba(52, 152, 219, 0.3)'
  };

  const calcBtnStyle = {
    width: '100%',
    padding: '16px',
    background: '#3498db',
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
    background: '#2980b9',
    transform: 'translateY(-2px)',
    boxShadow: '0 5px 15px rgba(52, 152, 219, 0.2)'
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

  const correctionCardStyle = {
    borderTopColor: '#3498db'
  };

  const formulaCardStyle = {
    borderTopColor: '#9b59b6'
  };

  const managementCardStyle = {
    borderTopColor: '#2ecc71'
  };

  const resultValueStyle = {
    fontSize: '2.5rem',
    fontWeight: '800',
    color: '#3498db',
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
    borderLeft: '4px solid #3498db',
    overflowX: 'auto'
  };

  const adSlotStyle = {
    margin: '30px 0',
    padding: '20px',
    background: '#f8f9fa',
    borderRadius: '10px',
    textAlign: 'center',
    color: '#7f8c8d',
    border: '1px dashed #ddd',
    transition: 'all 0.3s ease'
  };

  const hoverAdSlotStyle = {
    background: '#f0f2f5',
    transform: 'translateY(-2px)',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
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
    height: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const stickyAdStyle = {
    position: 'sticky',
    top: '20px',
    background: '#e8f5e9',
    border: '2px solid #3498db',
    boxShadow: '0 4px 12px rgba(52, 152, 219, 0.15)',
    height: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
    height: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
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
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '15px',
    marginTop: '20px'
  };

  const calculatorCardStyle = {
    padding: '15px',
    background: '#f8f9fa',
    borderRadius: '10px',
    textAlign: 'center',
    textDecoration: 'none',
    color: '#2c3e50',
    transition: 'all 0.3s',
    border: '2px solid transparent'
  };

  const hoverCalculatorCardStyle = {
    background: '#3498db',
    color: 'white',
    transform: 'translateY(-3px)',
    boxShadow: '0 5px 15px rgba(52, 152, 219, 0.2)',
    borderColor: '#3498db'
  };

  const medicalDisclaimerStyle = {
    margin: '40px 0',
    padding: '25px',
    background: '#fff8e1',
    borderRadius: '10px',
    borderLeft: '5px solid #f39c12',
    fontSize: '0.9rem',
    color: '#666'
  };

  const disclaimerTitleStyle = {
    color: '#e67e22',
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  // Sample data for demo
  useEffect(() => {
    setSodium('125');
    setGlucose('200');
    setBun('30');
    setAlbumin('3.5');
    setCalcium('8.5');
    setMagnesium('1.8');
    setPhosphate('2.5');
    setWeight('70');
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

  const calculateCorrection = () => {
    // Validate inputs
    if (!sodium || !glucose || !weight) {
      alert('Please fill in sodium, glucose, and weight fields.');
      return;
    }

    const sodiumVal = parseFloat(sodium);
    const glucoseVal = parseFloat(glucose);
    const bunVal = parseFloat(bun) || 0;
    const albuminVal = parseFloat(albumin) || 4.0;
    const calciumVal = parseFloat(calcium) || 0;
    const magnesiumVal = parseFloat(magnesium) || 0;
    const phosphateVal = parseFloat(phosphate) || 0;
    const weightVal = parseFloat(weight);

    if (sodiumVal <= 0 || glucoseVal <= 0 || weightVal <= 0) {
      alert('Please enter valid positive numbers.');
      return;
    }

    let correctedSodium = 0;
    let correctionFormula = '';
    let freeWaterDeficit = 0;
    let sodiumDeficit = 0;
    let correctedCalcium = 0;
    let calciumFormula = '';
    let management = [];

    // Calculate corrected sodium for hyperglycemia
    if (glucoseVal > 100) {
      correctedSodium = sodiumVal + (0.024 * (glucoseVal - 100));
      correctionFormula = 'Corrected Na = Measured Na + 0.024 × (Glucose - 100)';
      
      if (sodiumVal < 135) {
        management.push('Hyponatremia present - requires evaluation');
      }
      if (glucoseVal > 200) {
        management.push('Significant hyperglycemia - consider insulin therapy');
      }
    } else {
      correctedSodium = sodiumVal;
      correctionFormula = 'No correction needed (glucose ≤ 100 mg/dL)';
    }

    // Calculate free water deficit for hypernatremia
    if (correctedSodium > 145) {
      freeWaterDeficit = weightVal * 0.6 * ((correctedSodium / 140) - 1);
    }

    // Calculate sodium deficit for hyponatremia
    if (correctedSodium < 135) {
      sodiumDeficit = (135 - correctedSodium) * weightVal * 0.6;
    }

    // Calculate corrected calcium for hypoalbuminemia
    if (calciumVal > 0 && albuminVal !== 4.0) {
      correctedCalcium = calciumVal + 0.8 * (4.0 - albuminVal);
      calciumFormula = `Corrected Ca = ${calciumVal} + 0.8 × (4.0 - ${albuminVal})`;
      
      if (correctedCalcium < 8.5) {
        management.push('Hypocalcemia present - consider calcium supplementation');
      }
    } else if (calciumVal > 0) {
      correctedCalcium = calciumVal;
      calciumFormula = 'No albumin correction needed (normal albumin)';
    }

    // Calculate anion gap
    const anionGap = (sodiumVal + 140) - (100 + 24); // Simplified calculation

    // Determine clinical status
    let sodiumStatus = 'Normal';
    if (correctedSodium < 135) sodiumStatus = 'Hyponatremia';
    if (correctedSodium > 145) sodiumStatus = 'Hypernatremia';

    let calciumStatus = 'Normal';
    if (correctedCalcium > 0 && correctedCalcium < 8.5) calciumStatus = 'Hypocalcemia';
    if (correctedCalcium > 10.5) calciumStatus = 'Hypercalcemia';

    setResult({
      correctedSodium: correctedSodium.toFixed(1),
      correctionFormula: correctionFormula,
      sodiumStatus: sodiumStatus,
      freeWaterDeficit: freeWaterDeficit > 0 ? freeWaterDeficit.toFixed(0) : 0,
      sodiumDeficit: sodiumDeficit > 0 ? sodiumDeficit.toFixed(0) : 0,
      correctedCalcium: correctedCalcium > 0 ? correctedCalcium.toFixed(1) : 'N/A',
      calciumFormula: calciumFormula,
      calciumStatus: calciumStatus,
      anionGap: anionGap.toFixed(1),
      bunCreatinineRatio: bunVal > 0 ? (bunVal / 1.0).toFixed(1) : 'N/A', // Assuming creatinine of 1.0
      management: management,
      osmolarity: calculateOsmolarity(sodiumVal, glucoseVal, bunVal)
    });
  };

  const calculateOsmolarity = (sodium, glucose, bun) => {
    return (2 * sodium + (glucose / 18) + (bun / 2.8)).toFixed(0);
  };

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I correct sodium for hyperglycemia?",
      answer: "Use the formula: Corrected Na = Measured Na + 0.024 × (Glucose - 100). For each 100 mg/dL glucose above normal, sodium decreases by approximately 2.4 mEq/L. This correction is essential in diabetic ketoacidosis and hyperosmolar hyperglycemic state to avoid inappropriate treatment of pseudohyponatremia."
    },
    {
      question: "What's the difference between measured and corrected calcium?",
      answer: "Corrected calcium accounts for albumin levels using the formula: Corrected Ca = Measured Ca + 0.8 × (4.0 - Albumin). For each 1 g/dL decrease in albumin below 4.0 g/dL, add 0.8 mg/dL to measured calcium. This is crucial because approximately 50% of calcium is protein-bound, mainly to albumin."
    },
    {
      question: "How do I calculate free water deficit for hypernatremia?",
      answer: "Free water deficit (L) = Weight (kg) × 0.6 × [(Current Na / 140) - 1]. This formula estimates the volume of free water needed to correct hypernatremia to a sodium of 140 mEq/L. Correction should be gradual (0.5 mEq/L/h maximum) to avoid cerebral edema."
    },
    {
      question: "When should I use the sodium deficit formula for hyponatremia?",
      answer: "Sodium deficit (mEq) = (Desired Na - Current Na) × Weight (kg) × 0.6. Use this for symptomatic hyponatremia requiring active correction. For chronic asymptomatic hyponatremia, fluid restriction is usually sufficient. Never correct faster than 8-10 mEq/L in 24 hours to avoid osmotic demyelination syndrome."
    },
    {
      question: "What are the common pitfalls in electrolyte correction?",
      answer: "Common errors include: 1) Not correcting sodium for glucose levels, 2) Overcorrecting hyponatremia too quickly, 3) Not accounting for albumin in calcium interpretation, 4) Ignoring acid-base status in potassium management, 5) Failing to monitor magnesium and phosphate during refeeding syndrome, 6) Not considering renal function in all electrolyte calculations."
    }
  ];

  const healthCalculators = [
    { name: "Fluid Requirements", link: "/fluid-requirements" },
    { name: "Medication Dosage", link: "/medication-dosage" },
    { name: "Creatinine Clearance", link: "/creatinine-clearance" },
    { name: "Anion Gap Calculator", link: "/anion-gap-calculator" },
    { name: "Acid-Base Calculator", link: "/acid-base-calculator" },
    { name: "GFR Calculator", link: "/gfr-calculator" },
    { name: "Body Surface Area", link: "/bsa-calculator" },
    { name: "Nutritional Needs", link: "/nutrition-calculator" }
  ];

  return (
    <main style={containerStyle}>
      <section style={calculatorBoxStyle}>
        <h1 style={calcTitleStyle}>
          <i className="fas fa-vial"></i> Electrolyte Correction Calculator - Comprehensive Serum Parameter Adjustment Protocols
        </h1>
        <p style={calcDescStyle}>
          Calculate <strong>corrected sodium levels for hyperglycemia, adjusted calcium for hypoalbuminemia, and comprehensive electrolyte parameter adjustments</strong> using validated clinical formulas. Essential for <strong>accurate laboratory interpretation, precise treatment planning, and critical care management protocols</strong> in clinical practice.
        </p>

        <div style={methodTabsStyle}>
          <button 
            style={{
              ...methodTabStyle,
              ...(correctionType === 'sodium' ? activeMethodTabStyle : {})
            }}
            onClick={() => setCorrectionType('sodium')}
          >
            Sodium Correction
          </button>
          <button 
            style={{
              ...methodTabStyle,
              ...(correctionType === 'calcium' ? activeMethodTabStyle : {})
            }}
            onClick={() => setCorrectionType('calcium')}
          >
            Calcium Correction
          </button>
          <button 
            style={{
              ...methodTabStyle,
              ...(correctionType === 'comprehensive' ? activeMethodTabStyle : {})
            }}
            onClick={() => setCorrectionType('comprehensive')}
          >
            Comprehensive Panel
          </button>
        </div>

        <div style={inputGridStyle}>
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-tint"></i> Serum Sodium (mEq/L)</label>
            <input 
              type="number" 
              value={sodium}
              onChange={(e) => setSodium(e.target.value)}
              placeholder="140"
              min="100" 
              max="200" 
              step="0.1"
              style={inputStyle}
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-syringe"></i> Serum Glucose (mg/dL)</label>
            <input 
              type="number" 
              value={glucose}
              onChange={(e) => setGlucose(e.target.value)}
              placeholder="100"
              min="20" 
              max="1000" 
              step="1"
              style={inputStyle}
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-weight"></i> Weight (kg)</label>
            <input 
              type="number" 
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="70"
              min="2" 
              max="300" 
              step="0.1"
              style={inputStyle}
            />
          </div>

          {(correctionType === 'calcium' || correctionType === 'comprehensive') && (
            <div style={inputGroupStyle}>
              <label style={inputGroupLabelStyle}><i className="fas fa-bone"></i> Serum Calcium (mg/dL)</label>
              <input 
                type="number" 
                value={calcium}
                onChange={(e) => setCalcium(e.target.value)}
                placeholder="9.5"
                min="5" 
                max="15" 
                step="0.1"
                style={inputStyle}
              />
            </div>
          )}
        </div>

        {(correctionType === 'calcium' || correctionType === 'comprehensive') && (
          <div style={inputGridStyle}>
            <div style={inputGroupStyle}>
              <label style={inputGroupLabelStyle}><i className="fas fa-layer-group"></i> Serum Albumin (g/dL)</label>
              <input 
                type="number" 
                value={albumin}
                onChange={(e) => setAlbumin(e.target.value)}
                placeholder="4.0"
                min="1" 
                max="6" 
                step="0.1"
                style={inputStyle}
              />
            </div>

            <div style={inputGroupStyle}>
              <label style={inputGroupLabelStyle}><i className="fas fa-magnet"></i> Serum Magnesium (mg/dL)</label>
              <input 
                type="number" 
                value={magnesium}
                onChange={(e) => setMagnesium(e.target.value)}
                placeholder="2.0"
                min="0.5" 
                max="5" 
                step="0.1"
                style={inputStyle}
              />
            </div>

            <div style={inputGroupStyle}>
              <label style={inputGroupLabelStyle}><i className="fas fa-atom"></i> Serum Phosphate (mg/dL)</label>
              <input 
                type="number" 
                value={phosphate}
                onChange={(e) => setPhosphate(e.target.value)}
                placeholder="3.5"
                min="0.5" 
                max="10" 
                step="0.1"
                style={inputStyle}
              />
            </div>

            <div style={inputGroupStyle}>
              <label style={inputGroupLabelStyle}><i className="fas fa-flask"></i> BUN (mg/dL)</label>
              <input 
                type="number" 
                value={bun}
                onChange={(e) => setBun(e.target.value)}
                placeholder="15"
                min="5" 
                max="100" 
                step="1"
                style={inputStyle}
              />
            </div>
          </div>
        )}

        <button 
          style={calcBtnStyle}
          onClick={calculateCorrection}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, calcBtnHoverStyle)}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = calcBtnStyle.background;
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <i className="fas fa-calculator"></i> Calculate Electrolyte Corrections
        </button>

        {/* Results Display */}
        {result && (
          <div style={resultsContainerStyle}>
            <div style={{ ...resultCardStyle, ...correctionCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-adjust"></i> Corrected Values</h4>
              <div style={{ margin: '20px 0' }}>
                <div style={resultValueStyle}>{result.correctedSodium} mEq/L</div>
                <div style={{ fontSize: '1.2rem', color: '#666', marginBottom: '15px' }}>
                  Corrected Sodium
                </div>
                {result.correctedCalcium !== 'N/A' && (
                  <>
                    <div style={{ ...resultValueStyle, color: '#9b59b6' }}>{result.correctedCalcium} mg/dL</div>
                    <div style={{ fontSize: '1.2rem', color: '#666' }}>
                      Corrected Calcium
                    </div>
                  </>
                )}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div>Sodium Status: <strong>{result.sodiumStatus}</strong></div>
                {result.calciumStatus !== 'Normal' && (
                  <div>Calcium Status: <strong>{result.calciumStatus}</strong></div>
                )}
              </div>
            </div>

            <div style={{ ...resultCardStyle, ...formulaCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-calculator"></i> Calculations & Formulas</h4>
              <div style={{ margin: '20px 0' }}>
                <div style={{ fontSize: '0.9rem', fontFamily: "'Courier New', monospace", marginBottom: '10px' }}>
                  {result.correctionFormula}
                </div>
                {result.calciumFormula && result.calciumFormula !== 'N/A' && (
                  <div style={{ fontSize: '0.9rem', fontFamily: "'Courier New', monospace", marginBottom: '10px' }}>
                    {result.calciumFormula}
                  </div>
                )}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div>Free Water Deficit: {result.freeWaterDeficit} L</div>
                <div>Sodium Deficit: {result.sodiumDeficit} mEq</div>
                <div>Anion Gap: {result.anionGap} mEq/L</div>
              </div>
            </div>

            <div style={{ ...resultCardStyle, ...managementCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-clipboard-check"></i> Clinical Management</h4>
              <div style={{ margin: '20px 0' }}>
                <div style={{ fontSize: '1.2rem', color: '#2ecc71', marginBottom: '10px' }}>
                  Osmolarity: {result.osmolarity} mOsm/kg
                </div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                  {result.management.length > 0 ? (
                    <ul style={{ margin: 0, paddingLeft: '20px' }}>
                      {result.management.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  ) : 'No immediate intervention required'}
                </div>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div>BUN/Creatinine Ratio: {result.bunCreatinineRatio}</div>
                <div>Serum Osmolarity: {result.osmolarity} mOsm/kg</div>
              </div>
            </div>
          </div>
        )}

        <div 
          style={adSlotStyle}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverAdSlotStyle)}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = adSlotStyle.background;
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <p><i className="fas fa-ad"></i> Advertisement</p>
          <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Your ad could be here</p>
        </div>

        {/* Enhanced SEO Content with High-Value Long-Tail Keywords */}
        <div style={infoSectionStyle}>
          <h3 style={sectionTitleStyle}><i className="fas fa-question-circle"></i> What is Electrolyte Correction Calculation? Comprehensive Laboratory Parameter Adjustment Methodology</h3>
          <p style={paragraphStyle}><strong>Electrolyte correction calculation methodologies</strong> represent <strong>essential clinical protocols</strong> for determining <strong>accurate serum electrolyte interpretations, laboratory parameter adjustments, and precise treatment planning protocols</strong>. These calculations integrate <strong>patient-specific laboratory values, physiological correction factors, and clinical context considerations</strong> to provide <strong>personalized electrolyte management strategies</strong> that maximize <strong>diagnostic accuracy while minimizing inappropriate treatment interventions</strong> across diverse clinical scenarios requiring <strong>precision laboratory interpretation protocols</strong>.</p>
          
          <h3 style={sectionTitleStyle}><i className="fas fa-calculator"></i> Electrolyte Correction Methods - Comprehensive Laboratory Adjustment Formulae</h3>
          <p style={paragraphStyle}>Multiple <strong>validated electrolyte correction equations</strong> exist for <strong>comprehensive laboratory parameter management protocols</strong>, each demonstrating specific <strong>clinical applications and variable accuracy profiles</strong> influencing <strong>diagnostic precision optimization processes</strong>:</p>
          
          <div style={formulaBoxStyle}>
            <strong>Sodium Correction for Hyperglycemia Protocol:</strong> Essential adjustment for accurate hyponatremia/hypernatremia assessment in hyperglycemic states<br/>
            <strong>Calcium Correction for Hypoalbuminemia Methodology:</strong> Critical calculation for accurate calcium status determination in protein-deficient states<br/>
            <strong>Anion Gap Calculation Algorithms:</strong> Fundamental metabolic acidosis assessment tool for acid-base disorder evaluation<br/>
            <strong>Serum Osmolarity Determination Formulas:</strong> Essential for hyponatremia differentiation and hyperosmolar state assessment<br/>
            <strong>Corrected Sodium Determination Protocols:</strong> 0.024 multiplication factor application for each 100 mg/dL glucose elevation above normal<br/>
            <strong>Clinical Method Selection Protocol:</strong> Sodium correction recommended for <strong>diabetic emergency assessments</strong>, calcium correction for <strong>critical illness and malnutrition evaluations</strong>
          </div>

          <h3 style={sectionTitleStyle}><i className="fas fa-stethoscope"></i> Clinical Applications of Electrolyte Correction - Comprehensive Diagnostic Management Guidelines</h3>
          <p style={paragraphStyle}>Accurate <strong>electrolyte correction calculation methodology implementation</strong> serves critical functions across multiple <strong>medical specialties and diagnostic management areas</strong> requiring <strong>precise laboratory interpretation</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Diabetic Emergency Management Protocols:</strong> Essential for <strong>accurate sodium interpretation in DKA/HHS, appropriate fluid resuscitation planning, and neurological complication prevention strategies</strong> optimizing <strong>metabolic emergency outcomes</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Critical Care Laboratory Interpretation:</strong> Guides <strong>accurate electrolyte status assessment, appropriate replacement therapy planning, and organ dysfunction monitoring strategies</strong> in intensive care settings</li>
            <li style={{ marginBottom: '10px' }}><strong>Renal Disease Management Algorithms:</strong> Determines <strong>true electrolyte abnormalities versus artifact, appropriate dialysis prescription parameters, and medication adjustment requirements</strong> for renal impairment patients</li>
            <li style={{ marginBottom: '10px' }}><strong>Nutritional Deficiency Assessment Protocols:</strong> Essential for <strong>accurate calcium status determination in malnutrition, appropriate supplementation planning, and refeeding syndrome prevention strategies</strong> in cachectic populations</li>
            <li style={{ marginBottom: '10px' }}><strong>Hepatic Dysfunction Evaluation:</strong> Accounts for <strong>albumin production alterations, electrolyte distribution changes, and ascites management considerations</strong> in liver disease patients</li>
            <li style={{ marginBottom: '10px' }}><strong>Oncological Supportive Care:</strong> Manages <strong>paraneoplastic electrolyte disturbances, chemotherapy-induced abnormalities, and tumor lysis syndrome monitoring requirements</strong> in cancer patients</li>
            <li><strong>Geriatric Laboratory Interpretation:</strong> Coordinates <strong>age-related physiological changes, medication effect considerations, and comorbid condition influences</strong> for comprehensive elderly care</li>
          </ul>
          
          <h3 style={sectionTitleStyle}><i className="fas fa-balance-scale"></i> Factors Affecting Electrolyte Interpretation - Comprehensive Laboratory Assessment Considerations</h3>
          <p style={paragraphStyle}>Multiple <strong>significant physiological and pathological factors</strong> influence <strong>electrolyte correction calculation accuracy parameters</strong> and require consideration for appropriate clinical interpretation:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Glucose Concentration Influences:</strong> Hyperglycemia significantly lowers <strong>measured sodium concentrations through osmotic fluid shifts</strong> requiring precise correction factor application</li>
            <li style={{ marginBottom: '10px' }}><strong>Protein Binding Characteristics:</strong> Albumin and globulin levels significantly affect <strong>calcium measurement interpretation, medication binding capacity, and electrolyte distribution patterns</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Lipid Interference Factors:</strong> Hypertriglyceridemia and hyperproteinemia create <strong>pseudohyponatremia artifacts</strong> requiring specialized correction methodologies</li>
            <li style={{ marginBottom: '10px' }}><strong>Acid-Base Status Impacts:</strong> Metabolic acidosis/alkalosis significantly alters <strong>potassium distribution, calcium ionization, and magnesium binding characteristics</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Medication Effect Considerations:</strong> Diuretics, angiotensin-converting enzyme inhibitors, and proton pump inhibitors significantly alter <strong>electrolyte homeostasis and laboratory measurement interpretation</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Sample Processing Variables:</strong> Hemolysis, delayed processing, and improper storage significantly affect <strong>potassium, magnesium, and phosphate measurement accuracy</strong></li>
            <li><strong>Laboratory Methodology Differences:</strong> Direct versus indirect ion-selective electrode methods create <strong>measurement variation requiring methodology-specific interpretation</strong></li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-exclamation-triangle"></i> Limitations of Correction Formulas - Advanced Clinical Assessment Methodologies</h3>
          <p style={paragraphStyle}>While <strong>electrolyte correction methodologies</strong> provide valuable <strong>clinical starting points</strong>, specific clinical situations necessitate <strong>advanced assessment approaches</strong> and <strong>dynamic monitoring protocols</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Extreme Metabolic State Scenarios:</strong> Severe hyperglycemia (&gt;600 mg/dL), profound hypoalbuminemia (&lt;2.0 g/dL), and critical illness with multiple organ dysfunction require individualized approaches</li>
            <li style={{ marginBottom: '10px' }}><strong>Complex Comorbidity Considerations:</strong> Combined diabetic-renal-hepatic dysfunction presentations requiring nuanced electrolyte interpretation approaches</li>
            <li style={{ marginBottom: '10px' }}><strong>Unusual Laboratory Patterns:</strong> Pseudohyponatremia, factitious hyperkalemia, and laboratory artifact situations affecting standard formula accuracy</li>
            <li style={{ marginBottom: '10px' }}><strong>Medication Interaction Complexities:</strong> Multiple interacting medications with competing electrolyte effects and metabolic influences</li>
            <li style={{ marginBottom: '10px' }}><strong>Advanced Monitoring Requirement Situations:</strong> Ionized calcium measurement, blood gas analysis, and continuous electrolyte monitoring for precision management</li>
            <li><strong>Alternative Assessment Methodologies:</strong> <strong>Direct ion-selective electrode measurement, calculated osmolality determination, and urine electrolyte analysis applications</strong> for advanced electrolyte assessment</li>
         </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-history"></i> Historical Development of Correction Formulas - Evolution of Laboratory Medicine Science</h3>
          <p style={paragraphStyle}>The progressive evolution of <strong>electrolyte correction calculation methodologies</strong> reflects <strong>centuries of laboratory research advancement</strong> and <strong>clinical practice refinement trajectories</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Early 20th Century Foundations:</strong> Initial recognition of <strong>glucose-sodium relationship patterns and protein-calcium binding characteristics</strong> establishing basic correction principles</li>
            <li style={{ marginBottom: '10px' }}><strong>Mid-20th Century Standardization:</strong> Development of <strong>standardized correction formulas, automated laboratory methodologies, and quality control protocols</strong> revolutionizing laboratory interpretation</li>
            <li style={{ marginBottom: '10px' }}><strong>Late 20th Century Advances:</strong> Introduction of <strong>ion-selective electrode technology, advanced protein binding studies, and computerized correction algorithms</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Early 21st Century Refinement:</strong> Development of <strong>evidence-based correction factors, clinical outcome validation studies, and standardized reporting protocols</strong></li>
            <li><strong>Contemporary Precision Medicine:</strong> Integration of <strong>point-of-care testing technologies, electronic health record decision support, and artificial intelligence applications</strong> for optimal electrolyte management</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-user-md"></i> Practical Clinical Implementation Recommendations - Comprehensive Laboratory Management Guidelines</h3>
          <p style={paragraphStyle}>For optimal <strong>electrolyte correction calculation implementation</strong> in contemporary clinical practice environments and <strong>evidence-based diagnostic management protocols</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Comprehensive Laboratory Assessment Protocol:</strong> Systematically evaluate <strong>complete electrolyte panels, glucose concentrations, albumin levels, and renal function parameters</strong> before correction initiation</li>
            <li style={{ marginBottom: '10px' }}><strong>Dynamic Monitoring Implementation:</strong> Utilize <strong>serial laboratory measurements, clinical response assessment, and treatment adjustment protocols</strong> rather than static formula application</li>
            <li style={{ marginBottom: '10px' }}><strong>Methodology-Specific Interpretation Procedures:</strong> Systematically review <strong>laboratory measurement techniques, potential interference sources, and quality assurance indicators</strong> for accurate interpretation</li>
            <li style={{ marginBottom: '10px' }}><strong>Clinical Context Integration Protocol:</strong> Develop <strong>individualized interpretation frameworks</strong> considering <strong>patient-specific clinical conditions, medication profiles, and physiological states</strong> beyond numerical calculations alone</li>
            <li style={{ marginBottom: '10px' }}><strong>Multidisciplinary Collaboration Enhancement:</strong> Coordinate electrolyte management with <strong>clinical laboratory specialists, nephrology consultants, endocrinology services, and critical care teams</strong> for comprehensive care</li>
            <li><strong>Quality Improvement Integration:</strong> Implement <strong>laboratory error reduction programs, interpretation standardization protocols, and outcome measurement systems</strong> for continuous optimization</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-chart-line"></i> Future Directions in Electrolyte Assessment - Emerging Laboratory Technologies</h3>
          <p style={paragraphStyle}>Ongoing <strong>electrolyte assessment research initiatives</strong> continue refining <strong>measurement approaches</strong> with promising technological developments and <strong>innovative monitoring methodologies</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Point-of-Care Testing Advancements:</strong> Rapid electrolyte measurement devices, continuous monitoring sensors, and non-invasive assessment technologies for real-time management</li>
            <li style={{ marginBottom: '10px' }}><strong>Artificial Intelligence Clinical Applications:</strong> Machine learning algorithm development for <strong>personalized correction prediction models</strong> incorporating multiple clinical and laboratory variables</li>
            <li style={{ marginBottom: '10px' }}><strong>Advanced Analytical Methodologies:</strong> Development of <strong>ionized electrolyte measurement techniques, free hormone concentration calculations, and metabolite profiling applications</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Wearable Monitoring Technologies:</strong> Continuous electrolyte sensors, sweat analysis devices, and interstitial fluid measurement systems for ambulatory monitoring</li>
            <li style={{ marginBottom: '10px' }}><strong>Nanotechnology Applications:</strong> Molecular recognition sensors, lab-on-a-chip devices, and microfluidic analysis platforms for precision measurement</li>
            <li><strong>Telemedicine Integration Strategies:</strong> Remote laboratory monitoring, virtual interpretation consultations, and digital decision support platforms for comprehensive care</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-graduation-cap"></i> Educational Requirements and Professional Training Standards Implementation</h3>
          <p style={paragraphStyle}>Proper <strong>electrolyte correction calculation methodology education</strong> represents an <strong>essential clinical competency requirement</strong> for <strong>healthcare professionals</strong> across multiple medical disciplines. Comprehensive training curricula should systematically include <strong>laboratory measurement principles, correction methodologies, clinical interpretation techniques, and treatment planning protocols</strong>. Continuing medical education programs must consistently address <strong>evolving laboratory research findings, changing clinical practice standards, and emerging technological developments</strong> to ensure optimal patient care outcomes and evidence-based practice implementation.</p>

          <h3 style={sectionTitleStyle}><i className="fas fa-clipboard-check"></i> Quality Assurance and Protocol Standardization Implementation</h3>
          <p style={paragraphStyle}>Implementation of <strong>rigorous quality assurance protocols</strong> ensures <strong>consistent electrolyte interpretation practices</strong> across diverse healthcare settings. These protocols encompass <strong>correction standardization methodologies, interpretation verification procedures, and clinical outcome measurement requirements</strong> that directly impact <strong>patient safety parameters</strong>. Professional organizations should develop <strong>standardized training materials, competency assessment tools, and practice guideline documents</strong> to guarantee consistent clinical application quality across diverse healthcare delivery settings and specialty practice areas.</p>
        </div>

        {/* Q&A Dropdown Section */}
        <div style={faqSectionStyle}>
          <h2 style={faqTitleStyle}><i className="fas fa-question-circle"></i> Frequently Asked Questions About Electrolyte Correction</h2>
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

        {/* Health Calculators Section */}
        <div style={infoSectionStyle}>
          <h3 style={sectionTitleStyle}><i className="fas fa-calculator"></i> Related Medical & Laboratory Calculators</h3>
          <p style={paragraphStyle}>Explore our comprehensive collection of <strong>medical calculation tools and laboratory monitoring calculators</strong> for healthcare applications and patient management:</p>
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
                <i className="fas fa-calculator"></i> {calculator.name}
              </a>
            ))}
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div style={medicalDisclaimerStyle}>
          <h4 style={disclaimerTitleStyle}><i className="fas fa-exclamation-triangle"></i> Important Medical Disclaimer</h4>
          <p style={paragraphStyle}><strong>This electrolyte correction calculator provides estimates for educational and informational purposes only.</strong> The calculations are based on standard formulas and should not be used as a substitute for professional medical advice, diagnosis, or treatment.</p>
          <p style={paragraphStyle}><strong>Clinical Decision Limitations:</strong> Electrolyte correction calculations have inherent limitations and may not accurately reflect individual patient needs. Actual electrolyte management requires comprehensive clinical assessment including complete laboratory panels, clinical context, and appropriate diagnostic testing.</p>
          <p style={paragraphStyle}><strong>Laboratory Interpretation Requirements:</strong> Electrolyte correction should always be accompanied by careful clinical correlation including patient symptoms, medication history, and underlying medical conditions. Adjustments should be made based on comprehensive assessment rather than formula calculations alone.</p>
          <p style={paragraphStyle}><strong>Critical Value Considerations:</strong> Severe electrolyte abnormalities require immediate medical attention and appropriate emergency interventions. Standard formulas may not be appropriate for life-threatening electrolyte disturbances requiring urgent management.</p>
          <p style={paragraphStyle}><strong>Professional Consultation Required:</strong> Always seek the advice of your physician, clinical pathologist, or other qualified healthcare provider with any questions regarding electrolyte interpretation or treatment decisions. Do not disregard professional medical advice or delay seeking it because of information provided by this calculator.</p>
          <p style={paragraphStyle}><strong>Emergency Situations:</strong> If you believe you may have a medical emergency, call your doctor or emergency services immediately. This calculator is not designed for emergency medical situations requiring immediate intervention.</p>
          <p style={paragraphStyle}><strong>Laboratory Methodology Awareness:</strong> Different laboratory measurement techniques may yield varying results. Always verify the specific methodology used and consult with laboratory professionals when interpreting borderline or unexpected results.</p>
        </div>
      </section>

      {/* Sidebar with 3 Ads (3rd one sticky) */}
      {showSidebar && (
        <aside style={sidebarStyle}>
          <div style={sidebarContentStyle}>
            <div style={{ ...adSlotStyle, ...sidebarAdStyle }}>
              <p><i className="fas fa-ad"></i> Advertisement 1</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Sponsored Content</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Electrolyte management training course</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>300px height ad slot</p>
            </div>
            
            <div style={{ ...adSlotStyle, ...sidebarAdStyle }}>
              <p><i className="fas fa-ad"></i> Advertisement 2</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Featured Product</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Point-of-care electrolyte analyzer</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>300px height ad slot</p>
            </div>
            
            <div style={{ ...adSlotStyle, ...stickyAdStyle }}>
              <p><i className="fas fa-thumbtack"></i> Sticky Advertisement</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Premium Content - Stays visible</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Advanced laboratory interpretation guide</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>300px sticky ad</p>
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
            <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Perfect for smaller screens</p>
          </div>
        </div>
      )}
    </main>
  );
}