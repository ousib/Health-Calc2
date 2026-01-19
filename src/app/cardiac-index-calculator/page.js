"use client";

import { useState, useEffect } from 'react';

export default function CardiacIndexPage() {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [strokeVolume, setStrokeVolume] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [cardiacOutput, setCardiacOutput] = useState('');
  const [calculationMethod, setCalculationMethod] = useState('bsa');
  const [results, setResults] = useState(null);
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

  const cardiacIndexCardStyle = {
    borderTopColor: '#e74c3c'
  };

  const hemodynamicsCardStyle = {
    borderTopColor: '#3498db'
  };

  const clinicalCardStyle = {
    borderTopColor: '#2ecc71'
  };

  const resultValueStyle = {
    fontSize: '2.5rem',
    fontWeight: '800',
    color: '#e74c3c',
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

  // Calculation methods
  const calculationMethods = [
    { id: 'bsa', name: 'BSA-Based', description: 'Cardiac Index = Cardiac Output / BSA' },
    { id: 'direct', name: 'Direct Input', description: 'Enter measured Cardiac Output' },
    { id: 'fick', name: 'Fick Principle', description: 'Cardiac Output = VO₂ / (CaO₂ - CvO₂)' },
    { id: 'thermodilution', name: 'Thermodilution', description: 'Based on temperature curves' }
  ];

  // Sample data for demo
  useEffect(() => {
    setAge('55');
    setWeight('75');
    setHeight('175');
    setHeartRate('72');
    setStrokeVolume('70');
    setBloodPressure('120/80');
    setCardiacOutput('5.0');
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

  const calculateCardiacIndex = () => {
    // Validate inputs
    if (!age || !weight || !height) {
      alert('Please fill in age, weight, and height fields.');
      return;
    }

    const ageVal = parseFloat(age);
    const weightVal = parseFloat(weight);
    const heightVal = parseFloat(height);
    const heartRateVal = parseFloat(heartRate) || 72;
    const strokeVolumeVal = parseFloat(strokeVolume) || 70;
    const cardiacOutputVal = parseFloat(cardiacOutput) || 0;

    if (ageVal <= 0 || weightVal <= 0 || heightVal <= 0) {
      alert('Please enter valid positive numbers.');
      return;
    }

    // Calculate Body Surface Area (BSA) using Mosteller formula
    const bsa = Math.sqrt((heightVal * weightVal) / 3600);

    // Calculate Cardiac Output if not directly provided
    let calculatedCardiacOutput = cardiacOutputVal;
    if (cardiacOutputVal === 0 && heartRateVal && strokeVolumeVal) {
      calculatedCardiacOutput = (heartRateVal * strokeVolumeVal) / 1000; // Convert to L/min
    }

    // Calculate Cardiac Index
    const cardiacIndex = calculatedCardiacOutput / bsa;

    // Parse blood pressure
    let systolic = 120;
    let diastolic = 80;
    if (bloodPressure) {
      const bpParts = bloodPressure.split('/');
      systolic = parseFloat(bpParts[0]) || 120;
      diastolic = parseFloat(bpParts[1]) || 80;
    }

    // Calculate Mean Arterial Pressure (MAP)
    const map = diastolic + (1/3) * (systolic - diastolic);

    // Calculate Systemic Vascular Resistance (SVR)
    const centralVenousPressure = 8; // Estimated CVP in mmHg
    const svr = ((map - centralVenousPressure) * 80) / calculatedCardiacOutput;

    // Determine clinical status
    let cardiacIndexStatus = 'Normal';
    let interpretation = '';
    let recommendations = [];

    if (cardiacIndex < 2.2) {
      cardiacIndexStatus = 'Low';
      interpretation = 'Possible cardiogenic shock, heart failure, or hypovolemia';
      recommendations.push('Consider fluid resuscitation if hypovolemic');
      recommendations.push('Evaluate for inotropic support if cardiogenic');
      recommendations.push('Monitor closely for signs of inadequate perfusion');
    } else if (cardiacIndex > 4.0) {
      cardiacIndexStatus = 'High';
      interpretation = 'Possible hyperdynamic state, sepsis, anemia, or thyrotoxicosis';
      recommendations.push('Evaluate for underlying cause of hyperdynamic state');
      recommendations.push('Consider volume status assessment');
      recommendations.push('Monitor for high-output heart failure');
    } else {
      cardiacIndexStatus = 'Normal';
      interpretation = 'Adequate cardiac performance for body size';
      recommendations.push('Continue current management if clinically stable');
      recommendations.push('Monitor for changes in clinical status');
    }

    // Calculate stroke volume index
    const strokeVolumeIndex = strokeVolumeVal / bsa;

    // Calculate cardiac power output (CPO)
    const cpo = (calculatedCardiacOutput * map) / 451;

    setResults({
      bsa: bsa.toFixed(2),
      cardiacOutput: calculatedCardiacOutput.toFixed(2),
      cardiacIndex: cardiacIndex.toFixed(2),
      cardiacIndexStatus: cardiacIndexStatus,
      interpretation: interpretation,
      map: map.toFixed(0),
      svr: svr.toFixed(0),
      strokeVolumeIndex: strokeVolumeIndex.toFixed(1),
      cardiacPowerOutput: cpo.toFixed(3),
      recommendations: recommendations,
      formula: `Cardiac Index = ${calculatedCardiacOutput.toFixed(2)} L/min / ${bsa.toFixed(2)} m²`,
      ageAdjustedNormal: getAgeAdjustedNormal(ageVal)
    });
  };

  const getAgeAdjustedNormal = (age) => {
    // Age-adjusted normal cardiac index ranges
    if (age < 30) return '2.8-4.2 L/min/m²';
    if (age < 50) return '2.5-3.8 L/min/m²';
    if (age < 70) return '2.2-3.5 L/min/m²';
    return '2.0-3.2 L/min/m²';
  };

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "What is the clinical significance of Cardiac Index?",
      answer: "Cardiac Index (CI) normalizes cardiac output to body size, providing more accurate assessment of cardiac function than cardiac output alone. Normal range: 2.5-4.0 L/min/m². Low CI (&lt;2.2) suggests cardiogenic shock, heart failure, or hypovolemia. High CI (&gt;4.0) indicates hyperdynamic states like sepsis, anemia, or thyrotoxicosis. CI is essential for guiding fluid resuscitation, inotropic support, and vasopressor therapy in critical care."
    },
    {
      question: "How do I interpret Cardiac Index in different clinical scenarios?",
      answer: "In septic shock: Target CI &gt;2.5 L/min/m² with adequate MAP. In cardiogenic shock: CI often &lt;2.2 despite adequate filling pressures. In heart failure: Reduced CI with elevated filling pressures. For fluid responsiveness: CI increase &gt;10-15% after fluid challenge. Post-cardiac surgery: CI &lt;2.0 often requires inotropic support. Always interpret CI in context of MAP, SVR, clinical signs, and underlying etiology."
    },
    {
      question: "What are the different methods to measure Cardiac Output/Index?",
      answer: "1) Thermodilution (PAC gold standard): Uses temperature curves. 2) Fick Method: Based on oxygen consumption. 3) Pulse Contour Analysis (e.g., PiCCO): Arterial waveform analysis. 4) Echocardiography: Doppler measurements of LVOT VTI. 5) Bioimpedance/Bioreactance: Non-invasive electrical measurements. 6) Lithium Dilution: Indicator dilution technique. Method choice depends on availability, accuracy needs, and patient condition."
    },
    {
      question: "How does Cardiac Index change with age and body size?",
      answer: "Cardiac Index decreases with age: Young adults (2.8-4.2), Middle-aged (2.5-3.8), Elderly (2.0-3.2 L/min/m²). It's higher in children and decreases to adult levels by adolescence. Obesity: CI may be normal or elevated due to increased metabolic demands. Athletes: May have higher CI due to training adaptation. Critical illness: Target CI based on age-adjusted norms and metabolic demands."
    },
    {
      question: "What are common errors in Cardiac Index interpretation?",
      answer: "Common errors include: 1) Not using age-adjusted norms, 2) Ignoring preload/afterload conditions, 3) Over-reliance on single measurements, 4) Not correlating with clinical signs, 5) Incorrect BSA calculation, 6) Assuming normal CI excludes cardiac dysfunction, 7) Not considering medication effects (β-blockers, inotropes), 8) Technical errors in measurement method. Always use trend analysis and clinical correlation."
    }
  ];

  const healthCalculators = [
    { name: "Fluid Requirements", link: "/fluid-requirements" },
    { name: "Medication Dosage", link: "/medication-dosage" },
    { name: "Nutritional Needs", link: "/nutritional-needs" },
    { name: "Electrolyte Correction", link: "/electrolyte-correction" },
    { name: "Anion Gap Calculator", link: "/anion-gap-calculator" },
    { name: "Mean Arterial Pressure", link: "/map-calculator" },
    { name: "Stroke Volume Calculator", link: "/stroke-volume-calculator" },
    { name: "Body Surface Area", link: "/bsa-calculator" }
  ];

  return (
    <main style={containerStyle}>
      <section style={calculatorBoxStyle}>
        <h1 style={calcTitleStyle}>
          <i className="fas fa-heartbeat"></i> Cardiac Index Calculator - Advanced Hemodynamic Parameter Assessment Protocol
        </h1>
        <p style={calcDescStyle}>
          Calculate <strong>precise cardiac index values, systemic vascular resistance, and comprehensive hemodynamic parameters</strong> using validated clinical formulas. Essential for <strong>critical care management, shock resuscitation protocols, and advanced cardiac function assessment</strong> in clinical practice.
        </p>

        <div style={methodTabsStyle}>
          {calculationMethods.map(method => (
            <button
              key={method.id}
              style={{
                ...methodTabStyle,
                ...(calculationMethod === method.id ? activeMethodTabStyle : {})
              }}
              onClick={() => setCalculationMethod(method.id)}
            >
              {method.name}
            </button>
          ))}
        </div>

        <div style={inputGridStyle}>
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-user"></i> Age (years)</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="55"
              min="1"
              max="120"
              step="1"
              style={inputStyle}
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-venus-mars"></i> Gender</label>
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
            <label style={inputGroupLabelStyle}><i className="fas fa-weight"></i> Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="75"
              min="20"
              max="300"
              step="0.1"
              style={inputStyle}
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-ruler-vertical"></i> Height (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="175"
              min="100"
              max="250"
              step="0.1"
              style={inputStyle}
            />
          </div>
        </div>

        <div style={inputGridStyle}>
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-heart"></i> Heart Rate (bpm)</label>
            <input
              type="number"
              value={heartRate}
              onChange={(e) => setHeartRate(e.target.value)}
              placeholder="72"
              min="30"
              max="200"
              step="1"
              style={inputStyle}
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-tint"></i> Stroke Volume (mL)</label>
            <input
              type="number"
              value={strokeVolume}
              onChange={(e) => setStrokeVolume(e.target.value)}
              placeholder="70"
              min="20"
              max="200"
              step="1"
              style={inputStyle}
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-stethoscope"></i> Blood Pressure (mmHg)</label>
            <input
              type="text"
              value={bloodPressure}
              onChange={(e) => setBloodPressure(e.target.value)}
              placeholder="120/80"
              style={inputStyle}
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-wave-square"></i> Cardiac Output (L/min)</label>
            <input
              type="number"
              value={cardiacOutput}
              onChange={(e) => setCardiacOutput(e.target.value)}
              placeholder="5.0"
              min="1"
              max="20"
              step="0.1"
              style={inputStyle}
            />
            <small style={{ color: '#666', fontSize: '0.8rem' }}>
              Leave blank to calculate from HR × SV
            </small>
          </div>
        </div>

        <button
          style={calcBtnStyle}
          onClick={calculateCardiacIndex}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, calcBtnHoverStyle)}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = calcBtnStyle.background;
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <i className="fas fa-calculator"></i> Calculate Cardiac Index
        </button>

        {/* Results Display */}
        {results && (
          <div style={resultsContainerStyle}>
            <div style={{ ...resultCardStyle, ...cardiacIndexCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-heartbeat"></i> Cardiac Index Results</h4>
              <div style={{ margin: '20px 0' }}>
                <div style={resultValueStyle}>{results.cardiacIndex} L/min/m²</div>
                <div style={{ fontSize: '1.2rem', color: '#666', marginBottom: '15px' }}>
                  {results.cardiacIndexStatus} Cardiac Index
                </div>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div>Cardiac Output: {results.cardiacOutput} L/min</div>
                <div>Body Surface Area: {results.bsa} m²</div>
                <div>Age-Adjusted Normal: {results.ageAdjustedNormal}</div>
                <div>Interpretation: {results.interpretation}</div>
              </div>
            </div>

            <div style={{ ...resultCardStyle, ...hemodynamicsCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-chart-line"></i> Hemodynamic Parameters</h4>
              <div style={{ margin: '20px 0' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
                  <div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#3498db' }}>{results.map} mmHg</div>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>Mean Arterial Pressure</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#9b59b6' }}>{results.svr} dyn·s·cm⁻⁵</div>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>Systemic Vascular Resistance</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#2ecc71' }}>{results.strokeVolumeIndex} mL/m²</div>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>Stroke Volume Index</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#e74c3c' }}>{results.cardiacPowerOutput} W</div>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>Cardiac Power Output</div>
                  </div>
                </div>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div>Formula: {results.formula}</div>
                <div>Calculation Method: {calculationMethods.find(m => m.id === calculationMethod)?.name}</div>
              </div>
            </div>

            <div style={{ ...resultCardStyle, ...clinicalCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-clipboard-check"></i> Clinical Recommendations</h4>
              <div style={{ margin: '20px 0' }}>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                  {results.recommendations.length > 0 ? (
                    <ul style={{ margin: 0, paddingLeft: '20px' }}>
                      {results.recommendations.map((rec, idx) => (
                        <li key={idx} style={{ marginBottom: '8px' }}>{rec}</li>
                      ))}
                    </ul>
                  ) : 'No specific interventions recommended based on calculated parameters.'}
                </div>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div>Critical Values:</div>
                <div>• CI &lt;2.2: Consider inotropic support</div>
                <div>• CI &gt;4.0: Evaluate for hyperdynamic state</div>
                <div>• MAP &lt;65: Consider vasopressor support</div>
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
          <h3 style={sectionTitleStyle}><i className="fas fa-question-circle"></i> What is Cardiac Index Calculation? Advanced Hemodynamic Assessment Methodology</h3>
          <p style={paragraphStyle}><strong>Cardiac index calculation methodologies</strong> represent <strong>essential clinical protocols</strong> for determining <strong>precise cardiac performance metrics, normalized hemodynamic parameters, and comprehensive circulatory function assessments</strong>. These calculations integrate <strong>patient-specific physiological measurements, body surface area normalization, and advanced cardiovascular formulas</strong> to provide <strong>personalized hemodynamic management strategies</strong> that optimize <strong>shock resuscitation outcomes while guiding targeted therapeutic interventions</strong> across diverse critical care scenarios requiring <strong>precision cardiovascular monitoring protocols</strong>.</p>
          
          <h3 style={sectionTitleStyle}><i className="fas fa-calculator"></i> Cardiac Index Calculation Methods - Comprehensive Hemodynamic Assessment Formulae</h3>
          <p style={paragraphStyle}>Multiple <strong>validated cardiac index determination equations</strong> exist for <strong>comprehensive hemodynamic management protocols</strong>, each demonstrating specific <strong>clinical applications and variable accuracy profiles</strong> influencing <strong>critical care decision-making processes</strong>:</p>
          
          <div style={formulaBoxStyle}>
            <strong>BSA-Based Cardiac Index Protocol:</strong> Gold standard calculation: CI = Cardiac Output / Body Surface Area<br/>
            <strong>Fick Principle Methodology:</strong> Physiological gold standard based on oxygen consumption differences<br/>
            <strong>Thermodilution Technique:</strong> Clinical gold standard using pulmonary artery catheter temperature curves<br/>
            <strong>Pulse Contour Analysis:</strong> Continuous cardiac index monitoring via arterial waveform analysis<br/>
            <strong>Doppler Echocardiography:</strong> Non-invasive calculation using left ventricular outflow tract velocity-time integral<br/>
            <strong>Clinical Method Selection Protocol:</strong> BSA-based calculation recommended for <strong>routine clinical assessment</strong>, thermodilution for <strong>critical care precision monitoring</strong>
          </div>

          <h3 style={sectionTitleStyle}><i className="fas fa-stethoscope"></i> Clinical Applications of Cardiac Index - Comprehensive Critical Care Management Guidelines</h3>
          <p style={paragraphStyle}>Accurate <strong>cardiac index calculation methodology implementation</strong> serves critical functions across multiple <strong>medical specialties and critical care management areas</strong> requiring <strong>precise hemodynamic assessment</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Shock Resuscitation Protocols:</strong> Essential for <strong>cardiogenic shock inotropic titration, septic shock fluid management, and hypovolemic shock volume resuscitation strategies</strong> optimizing <strong>hemodynamic stabilization outcomes</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Heart Failure Management Algorithms:</strong> Guides <strong>acute decompensation treatment, advanced therapy selection, and transplant evaluation parameters</strong> in advanced cardiac disease</li>
            <li style={{ marginBottom: '10px' }}><strong>Cardiac Surgery Optimization:</strong> Determines <strong>post-operative inotropic requirements, weaning from cardiopulmonary bypass, and early complication detection parameters</strong> in surgical critical care</li>
            <li style={{ marginBottom: '10px' }}><strong>Sepsis Bundle Implementation:</strong> Essential for <strong>early goal-directed therapy protocols, lactate clearance monitoring, and vasopressor titration strategies</strong> in severe sepsis management</li>
            <li style={{ marginBottom: '10px' }}><strong>Pulmonary Hypertension Assessment:</strong> Accounts for <strong>right ventricular-pulmonary arterial coupling, treatment response evaluation, and prognosis determination parameters</strong> in pulmonary vascular disease</li>
            <li style={{ marginBottom: '10px' }}><strong>Advanced Heart Failure Therapies:</strong> Manages <strong>mechanical circulatory support optimization, transplant candidate selection, and palliative care decision-making</strong> in end-stage cardiac disease</li>
            <li><strong>Trauma Resuscitation Protocols:</strong> Coordinates <strong>hemorrhagic shock management, damage control resuscitation, and massive transfusion protocol implementation</strong> in critical trauma care</li>
          </ul>
          
          <h3 style={sectionTitleStyle}><i className="fas fa-balance-scale"></i> Factors Affecting Cardiac Index Interpretation - Comprehensive Hemodynamic Assessment Considerations</h3>
          <p style={paragraphStyle}>Multiple <strong>significant physiological and pathological factors</strong> influence <strong>cardiac index calculation accuracy parameters</strong> and require consideration for appropriate clinical interpretation:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Body Surface Area Calculation Variables:</strong> Different BSA formulas (Mosteller, DuBois, Haycock) yield <strong>varying normalization results</strong> requiring consistent methodology application</li>
            <li style={{ marginBottom: '10px' }}><strong>Age-Related Physiological Changes:</strong> Progressive <strong>decrease in maximal cardiac index</strong> with aging (approximately 1% per year after age 30) requiring age-adjusted interpretation</li>
            <li style={{ marginBottom: '10px' }}><strong>Measurement Technique Influences:</strong> Thermodilution, pulse contour, and echocardiographic methods demonstrate <strong>significant inter-method variability</strong> requiring technique-specific reference ranges</li>
            <li style={{ marginBottom: '10px' }}><strong>Metabolic Demand Considerations:</strong> Fever, pain, agitation, and critical illness significantly increase <strong>cardiac index requirements</strong> beyond standard resting values</li>
            <li style={{ marginBottom: '10px' }}><strong>Medication Effect Variables:</strong> Inotropes, vasopressors, β-blockers, and anesthetic agents dramatically alter <strong>cardiac index measurements and interpretations</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Respiratory Cycle Impacts:</strong> Mechanical ventilation, positive end-expiratory pressure, and spontaneous breathing efforts cause <strong>significant cardiac index fluctuations</strong> requiring appropriate measurement timing</li>
            <li><strong>Technical Measurement Artifacts:</strong> Catheter position, injectate temperature, and signal quality create <strong>measurement errors requiring quality assurance protocols</strong></li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-exclamation-triangle"></i> Limitations of Cardiac Index Formulas - Advanced Hemodynamic Assessment Methodologies</h3>
          <p style={paragraphStyle}>While <strong>cardiac index calculation methodologies</strong> provide valuable <strong>clinical starting points</strong>, specific clinical situations necessitate <strong>advanced assessment approaches</strong> and <strong>dynamic monitoring protocols</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Extreme Physiological State Scenarios:</strong> Severe valvular regurgitation, intracardiac shunts, and arrhythmias create <strong>measurement artifacts and interpretation challenges</strong> requiring specialized approaches</li>
            <li style={{ marginBottom: '10px' }}><strong>Complex Comorbidity Considerations:</strong> Combined cardiac-pulmonary-renal dysfunction presentations requiring <strong>nuanced hemodynamic interpretation approaches</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Unusual Body Habitus Patterns:</strong> Extreme obesity, cachexia, and skeletal abnormalities affecting <strong>BSA calculation accuracy and measurement technique applicability</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Advanced Monitoring Requirement Situations:</strong> Mixed shock states, right ventricular dysfunction, and pulmonary hypertension requiring <strong>comprehensive hemodynamic profiling</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Dynamic Parameter Assessment Needs:</strong> Fluid responsiveness evaluation, recruitability assessment, and therapy titration requiring <strong>serial measurements and trend analysis</strong></li>
            <li><strong>Alternative Assessment Methodologies:</strong> <strong>Right heart catheterization, echocardiographic strain analysis, and metabolic cart measurements</strong> for advanced hemodynamic assessment</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-history"></i> Historical Development of Cardiac Index Formulas - Evolution of Hemodynamic Monitoring Science</h3>
          <p style={paragraphStyle}>The progressive evolution of <strong>cardiac index calculation methodologies</strong> reflects <strong>centuries of cardiovascular research advancement</strong> and <strong>clinical practice refinement trajectories</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>19th Century Foundations:</strong> Adolph Fick develops <strong>Fick principle of cardiac output measurement</strong> establishing fundamental physiological calculation principles</li>
            <li style={{ marginBottom: '10px' }}><strong>Early 20th Century Standardization:</strong> Development of <strong>dye dilution techniques, BSA normalization concepts, and standardized measurement protocols</strong> revolutionizing hemodynamic assessment</li>
            <li style={{ marginBottom: '10px' }}><strong>Mid-20th Century Advances:</strong> Introduction of <strong>pulmonary artery catheterization, thermodilution methodology, and computerized monitoring systems</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Late 20th Century Refinement:</strong> Development of <strong>pulse contour analysis, minimally invasive monitoring, and goal-directed therapy protocols</strong></li>
            <li><strong>21st Century Precision Monitoring:</strong> Integration of <strong>advanced echocardiography, wearable monitoring technologies, and artificial intelligence applications</strong> for optimal hemodynamic management</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-user-md"></i> Practical Clinical Implementation Recommendations - Comprehensive Hemodynamic Management Guidelines</h3>
          <p style={paragraphStyle}>For optimal <strong>cardiac index calculation implementation</strong> in contemporary clinical practice environments and <strong>evidence-based critical care management protocols</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Comprehensive Assessment Protocol:</strong> Systematically evaluate <strong>all hemodynamic parameters, clinical examination findings, and laboratory markers</strong> before calculation interpretation</li>
            <li style={{ marginBottom: '10px' }}><strong>Dynamic Monitoring Implementation:</strong> Utilize <strong>trend analysis rather than single measurements, response to therapeutic interventions, and integration with clinical context</strong> rather than isolated formula application</li>
            <li style={{ marginBottom: '10px' }}><strong>Methodology-Specific Interpretation Procedures:</strong> Systematically apply <strong>technique-specific reference ranges, quality assurance checks, and artifact recognition protocols</strong> for accurate interpretation</li>
            <li style={{ marginBottom: '10px' }}><strong>Clinical Context Integration Protocol:</strong> Develop <strong>individualized interpretation frameworks</strong> considering <strong>patient-specific comorbidities, medication profiles, and therapeutic goals</strong> beyond numerical calculations alone</li>
            <li style={{ marginBottom: '10px' }}><strong>Multidisciplinary Collaboration Enhancement:</strong> Coordinate hemodynamic management with <strong>critical care teams, cardiology consultants, perfusion specialists, and advanced practice providers</strong> for comprehensive care</li>
            <li><strong>Quality Improvement Integration:</strong> Implement <strong>hemodynamic protocol standardization, outcome measurement systems, and complication surveillance programs</strong> for continuous optimization</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-chart-line"></i> Future Directions in Hemodynamic Monitoring - Emerging Cardiovascular Technologies</h3>
          <p style={paragraphStyle}>Ongoing <strong>hemodynamic monitoring research initiatives</strong> continue refining <strong>assessment approaches</strong> with promising technological developments and <strong>innovative monitoring methodologies</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Non-Invasive Advanced Monitoring:</strong> Thoracic bioimpedance, bioreactance technology, and wearable Doppler devices for continuous hemodynamic assessment</li>
            <li style={{ marginBottom: '10px' }}><strong>Artificial Intelligence Clinical Applications:</strong> Machine learning algorithm development for <strong>predictive hemodynamic modeling, early deterioration detection, and personalized therapy optimization</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Advanced Echocardiography Technologies:</strong> Three-dimensional volumetric analysis, speckle tracking strain imaging, and contrast-enhanced studies for comprehensive assessment</li>
            <li style={{ marginBottom: '10px' }}><strong>Point-of-Care Ultrasound Integration:</strong> Rapid hemodynamic assessment protocols, goal-directed examination frameworks, and serial monitoring applications</li>
            <li style={{ marginBottom: '10px' }}><strong>Implantable Monitoring Devices:</strong> Wireless pulmonary artery pressure sensors, intracardiac hemodynamic monitors, and remote patient management systems</li>
            <li><strong>Telemedicine Integration Strategies:</strong> Remote hemodynamic monitoring, virtual critical care consultations, and digital decision support platforms for comprehensive care</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-graduation-cap"></i> Educational Requirements and Professional Training Standards Implementation</h3>
          <p style={paragraphStyle}>Proper <strong>cardiac index calculation methodology education</strong> represents an <strong>essential clinical competency requirement</strong> for <strong>healthcare professionals</strong> across multiple critical care disciplines. Comprehensive training curricula should systematically include <strong>hemodynamic physiology principles, calculation methodologies, monitoring techniques, and therapeutic decision-making protocols</strong>. Continuing medical education programs must consistently address <strong>evolving cardiovascular research findings, changing clinical practice standards, and emerging technological developments</strong> to ensure optimal patient care outcomes and evidence-based practice implementation.</p>

          <h3 style={sectionTitleStyle}><i className="fas fa-clipboard-check"></i> Quality Assurance and Protocol Standardization Implementation</h3>
          <p style={paragraphStyle}>Implementation of <strong>rigorous quality assurance protocols</strong> ensures <strong>consistent hemodynamic monitoring practices</strong> across diverse healthcare settings. These protocols encompass <strong>calculation standardization methodologies, measurement technique verification procedures, and clinical outcome measurement requirements</strong> that directly impact <strong>patient safety parameters</strong>. Professional organizations should develop <strong>standardized training materials, competency assessment tools, and practice guideline documents</strong> to guarantee consistent clinical application quality across diverse healthcare delivery settings and specialty practice areas.</p>
        </div>

        {/* Q&A Dropdown Section */}
        <div style={faqSectionStyle}>
          <h2 style={faqTitleStyle}><i className="fas fa-question-circle"></i> Frequently Asked Questions About Cardiac Index Calculation</h2>
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
          <h3 style={sectionTitleStyle}><i className="fas fa-calculator"></i> Related Medical & Critical Care Calculators</h3>
          <p style={paragraphStyle}>Explore our comprehensive collection of <strong>medical calculation tools and critical care monitoring calculators</strong> for healthcare applications and patient management:</p>
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
          <p style={paragraphStyle}><strong>This cardiac index calculator provides estimates for educational and informational purposes only.</strong> The calculations are based on standard formulas and should not be used as a substitute for professional medical advice, diagnosis, or treatment.</p>
          <p style={paragraphStyle}><strong>Clinical Decision Limitations:</strong> Cardiac index calculations have inherent limitations and may not accurately reflect individual patient hemodynamic status. Actual hemodynamic management requires comprehensive clinical assessment including invasive monitoring when indicated, physical examination, and appropriate diagnostic testing.</p>
          <p style={paragraphStyle}><strong>Critical Care Applications:</strong> Cardiac index is primarily used in critical care settings for guiding therapy in shock states, heart failure, and perioperative management. These calculations should only be interpreted by qualified healthcare professionals with training in hemodynamic monitoring.</p>
          <p style={paragraphStyle}><strong>Invasive Monitoring Requirements:</strong> Accurate cardiac index determination in critical illness often requires invasive monitoring techniques (pulmonary artery catheter, arterial line). Non-calculated values should be verified with appropriate monitoring when clinical decisions depend on precise measurements.</p>
          <p style={paragraphStyle}><strong>Professional Consultation Required:</strong> Always seek the advice of your physician, intensivist, cardiologist, or other qualified healthcare provider with any questions regarding hemodynamic assessment or treatment decisions. Do not disregard professional medical advice or delay seeking it because of information provided by this calculator.</p>
          <p style={paragraphStyle}><strong>Emergency Situations:</strong> If you believe you may have a medical emergency, call your doctor or emergency services immediately. This calculator is not designed for emergency medical situations requiring immediate intervention.</p>
          <p style={paragraphStyle}><strong>Technical Measurement Considerations:</strong> Different measurement techniques (thermodilution, pulse contour, echocardiography) yield varying results. Always consider the measurement method and potential sources of error when interpreting cardiac index values.</p>
        </div>
      </section>

      {/* Sidebar with 3 Ads (3rd one sticky) */}
      {showSidebar && (
        <aside style={sidebarStyle}>
          <div style={sidebarContentStyle}>
            <div style={{ ...adSlotStyle, ...sidebarAdStyle }}>
              <p><i className="fas fa-ad"></i> Advertisement 1</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Sponsored Content</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Hemodynamic monitoring training course</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>300px height ad slot</p>
            </div>
            
            <div style={{ ...adSlotStyle, ...sidebarAdStyle }}>
              <p><i className="fas fa-ad"></i> Advertisement 2</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Featured Product</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Advanced cardiac monitoring system</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>300px height ad slot</p>
            </div>
            
            <div style={{ ...adSlotStyle, ...stickyAdStyle }}>
              <p><i className="fas fa-thumbtack"></i> Sticky Advertisement</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Premium Content - Stays visible</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Critical care hemodynamics guide</p>
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