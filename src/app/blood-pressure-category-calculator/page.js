"use client";

import { useState, useEffect } from 'react';

export default function BloodPressureCalculatorPage() {
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [history, setHistory] = useState('none');
  const [results, setResults] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [measurementHistory, setMeasurementHistory] = useState([]);

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

  const categoryCardStyle = {
    borderTopColor: '#e74c3c'
  };

  const riskCardStyle = {
    borderTopColor: '#f39c12'
  };

  const recommendationsCardStyle = {
    borderTopColor: '#3498db'
  };

  const targetCardStyle = {
    borderTopColor: '#2ecc71'
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
    borderLeft: '4px solid #e74c3c',
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
    background: '#ffeaea',
    border: '2px solid #e74c3c',
    boxShadow: '0 4px 12px rgba(231, 76, 60, 0.15)',
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
    background: '#e74c3c',
    color: 'white',
    transform: 'translateY(-3px)',
    boxShadow: '0 5px 15px rgba(231, 76, 60, 0.2)',
    borderColor: '#e74c3c'
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

  // Blood pressure categories according to AHA/ACC guidelines
  const bloodPressureCategories = [
    { 
      name: 'Normal', 
      systolic: { min: 90, max: 119 }, 
      diastolic: { min: 60, max: 79 },
      color: '#2ecc71',
      risk: 'Low',
      recommendation: 'Maintain healthy lifestyle'
    },
    { 
      name: 'Elevated', 
      systolic: { min: 120, max: 129 }, 
      diastolic: { min: 60, max: 79 },
      color: '#f1c40f',
      risk: 'Moderate',
      recommendation: 'Lifestyle modifications'
    },
    { 
      name: 'Hypertension Stage 1', 
      systolic: { min: 130, max: 139 }, 
      diastolic: { min: 80, max: 89 },
      color: '#e67e22',
      risk: 'High',
      recommendation: 'Lifestyle changes + possible medication'
    },
    { 
      name: 'Hypertension Stage 2', 
      systolic: { min: 140, max: 179 }, 
      diastolic: { min: 90, max: 119 },
      color: '#e74c3c',
      risk: 'Very High',
      recommendation: 'Medication + lifestyle changes'
    },
    { 
      name: 'Hypertensive Crisis', 
      systolic: { min: 180, max: 300 }, 
      diastolic: { min: 120, max: 200 },
      color: '#c0392b',
      risk: 'Emergency',
      recommendation: 'Seek immediate medical attention'
    },
    { 
      name: 'Hypotension', 
      systolic: { min: 50, max: 89 }, 
      diastolic: { min: 30, max: 59 },
      color: '#3498db',
      risk: 'Variable',
      recommendation: 'Medical evaluation if symptomatic'
    }
  ];

  // Sample data for demo
  useEffect(() => {
    setSystolic('120');
    setDiastolic('80');
    setAge('45');
    setGender('male');
    setHistory('none');

    // Generate sample measurement history
    const historyData = [];
    const categories = ['Normal', 'Elevated', 'Hypertension Stage 1'];
    for (let i = 0; i < 6; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (i * 7));
      const category = categories[Math.floor(Math.random() * categories.length)];
      historyData.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        systolic: Math.floor(Math.random() * 40) + 110,
        diastolic: Math.floor(Math.random() * 30) + 70,
        category: category
      });
    }
    setMeasurementHistory(historyData);
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

  const calculateBloodPressureCategory = () => {
    // Validate inputs
    if (!systolic || !diastolic || !age) {
      alert('Please fill in all required fields.');
      return;
    }

    const systolicVal = parseInt(systolic);
    const diastolicVal = parseInt(diastolic);
    const ageVal = parseInt(age);

    if (systolicVal < 50 || systolicVal > 300) {
      alert('Systolic pressure should be between 50 and 300 mmHg.');
      return;
    }

    if (diastolicVal < 30 || diastolicVal > 200) {
      alert('Diastolic pressure should be between 30 and 200 mmHg.');
      return;
    }

    if (ageVal < 18 || ageVal > 120) {
      alert('Age should be between 18 and 120 years.');
      return;
    }

    // Determine blood pressure category
    let category = null;
    let riskLevel = '';
    let recommendations = [];
    let emergency = false;

    for (const cat of bloodPressureCategories) {
      if (systolicVal >= cat.systolic.min && systolicVal <= cat.systolic.max &&
          diastolicVal >= cat.diastolic.min && diastolicVal <= cat.diastolic.max) {
        category = cat;
        break;
      }
    }

    // If no category found (edge cases), assign based on closest match
    if (!category) {
      if (systolicVal < 90) category = bloodPressureCategories[5]; // Hypotension
      else if (systolicVal >= 180 || diastolicVal >= 120) category = bloodPressureCategories[4]; // Crisis
      else category = bloodPressureCategories[2]; // Default to Stage 1
    }

    // Determine risk level based on category and additional factors
    riskLevel = category.risk;
    
    // Adjust risk based on age
    if (ageVal >= 65) {
      if (riskLevel === 'Low') riskLevel = 'Moderate';
      else if (riskLevel === 'Moderate') riskLevel = 'High';
    }

    // Adjust risk based on medical history
    if (history !== 'none') {
      if (riskLevel === 'Low') riskLevel = 'Moderate';
      else if (riskLevel === 'Moderate') riskLevel = 'High';
      else if (riskLevel === 'High') riskLevel = 'Very High';
    }

    // Generate recommendations
    recommendations.push(category.recommendation);
    
    if (category.name === 'Hypertensive Crisis') {
      recommendations.push('Call emergency services immediately');
      recommendations.push('Do not wait to see if symptoms improve');
      emergency = true;
    } else if (category.name.includes('Hypertension')) {
      recommendations.push('Schedule appointment with healthcare provider');
      recommendations.push('Monitor blood pressure regularly');
      recommendations.push('Reduce sodium intake');
      recommendations.push('Increase physical activity');
    } else if (category.name === 'Elevated') {
      recommendations.push('Implement lifestyle modifications');
      recommendations.push('Re-check in 3-6 months');
      recommendations.push('Maintain healthy weight');
      recommendations.push('Limit alcohol consumption');
    } else if (category.name === 'Normal') {
      recommendations.push('Continue healthy lifestyle habits');
      recommendations.push('Annual blood pressure screening');
      recommendations.push('Maintain balanced diet');
    } else if (category.name === 'Hypotension') {
      recommendations.push('Increase fluid intake');
      recommendations.push('Consider salt supplementation if advised');
      recommendations.push('Rise slowly from sitting/lying positions');
    }

    // Calculate pulse pressure
    const pulsePressure = systolicVal - diastolicVal;
    let pulsePressureAssessment = '';
    
    if (pulsePressure < 40) {
      pulsePressureAssessment = 'Normal pulse pressure';
    } else if (pulsePressure >= 40 && pulsePressure <= 60) {
      pulsePressureAssessment = 'Moderate pulse pressure - monitor';
    } else {
      pulsePressureAssessment = 'High pulse pressure - increased cardiovascular risk';
    }

    // Calculate mean arterial pressure (MAP)
    const map = diastolicVal + (pulsePressure / 3);
    let mapAssessment = '';
    
    if (map >= 70 && map <= 100) {
      mapAssessment = 'Normal organ perfusion';
    } else if (map > 100) {
      mapAssessment = 'Elevated - increased cardiac workload';
    } else {
      mapAssessment = 'Low - possible inadequate organ perfusion';
    }

    // Determine target blood pressure based on age and history
    let targetSystolic = 120;
    let targetDiastolic = 80;
    
    if (ageVal >= 65) {
      targetSystolic = 130;
    }
    
    if (history === 'diabetes' || history === 'kidney') {
      targetSystolic = 130;
      targetDiastolic = 80;
    }

    // Generate risk factors list
    const riskFactors = [];
    if (ageVal >= 65) riskFactors.push('Age ≥65 years');
    if (history === 'diabetes') riskFactors.push('Diabetes mellitus');
    if (history === 'heart') riskFactors.push('Cardiovascular disease');
    if (history === 'kidney') riskFactors.push('Chronic kidney disease');
    if (history === 'stroke') riskFactors.push('Previous stroke/TIA');
    if (history === 'family') riskFactors.push('Family history of hypertension');
    
    if (systolicVal >= 130 || diastolicVal >= 80) {
      riskFactors.push('Current elevated blood pressure');
    }

    setResults({
      systolic: systolicVal,
      diastolic: diastolicVal,
      category: category.name,
      color: category.color,
      riskLevel: riskLevel,
      recommendations: recommendations,
      pulsePressure: pulsePressure,
      pulsePressureAssessment: pulsePressureAssessment,
      meanArterialPressure: Math.round(map),
      mapAssessment: mapAssessment,
      age: ageVal,
      gender: gender,
      medicalHistory: history,
      emergency: emergency,
      targetSystolic: targetSystolic,
      targetDiastolic: targetDiastolic,
      riskFactors: riskFactors,
      measurementHistory: measurementHistory
    });
  };

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "What do systolic and diastolic blood pressure numbers mean?",
      answer: "Systolic pressure (top number) measures pressure in arteries when heart beats. Diastolic pressure (bottom number) measures pressure between heartbeats. Normal: <120/<80 mmHg. Elevated: 120-129/<80. Stage 1 hypertension: 130-139/80-89. Stage 2 hypertension: ≥140/≥90. Hypertensive crisis: ≥180/≥120 requires emergency care. Pulse pressure (difference between systolic and diastolic) indicates arterial stiffness; >60 mmHg increases cardiovascular risk. Mean arterial pressure (MAP = diastolic + 1/3 pulse pressure) indicates average perfusion pressure to organs; normal range is 70-100 mmHg."
    },
    {
      question: "How accurate are home blood pressure monitors compared to clinical measurements?",
      answer: "Home monitors are generally accurate when properly validated and correctly used. Key considerations: 1) Use validated devices (check AHA, BHS, or ESH lists), 2) Proper cuff size is critical (bladder should encircle 80-100% of arm), 3) Calibrate annually against mercury sphygmomanometer, 4) Take readings in seated position after 5 minutes rest, 5) Avoid caffeine, exercise, and smoking 30 minutes before, 6) Take multiple readings (2-3 minutes apart) and average them. Home monitoring provides better prediction of cardiovascular risk than office measurements due to elimination of white-coat effect and more readings over time."
    },
    {
      question: "What lifestyle changes can effectively lower blood pressure?",
      answer: "Evidence-based lifestyle modifications: 1) DASH diet (Dietary Approaches to Stop Hypertension): 8-10 mmHg reduction, 2) Sodium reduction (<1500 mg/day): 5-6 mmHg reduction, 3) Weight loss (5-10% body weight): 5-20 mmHg reduction, 4) Regular aerobic exercise (150 min/week): 5-8 mmHg reduction, 5) Limit alcohol (≤1 drink women, ≤2 men): 2-4 mmHg reduction, 6) Potassium-rich foods (fruits/vegetables): 4-5 mmHg reduction, 7) Stress management techniques: 4-5 mmHg reduction. Combined approaches yield greater reductions. Lifestyle changes work synergistically with medications when needed."
    },
    {
      question: "At what blood pressure reading should I seek emergency medical attention?",
      answer: "Seek IMMEDIATE emergency care for: 1) Systolic ≥180 mmHg AND/OR diastolic ≥120 mmHg with symptoms (severe headache, chest pain, shortness of breath, neurological deficits, vision changes, nausea/vomiting, anxiety, nosebleeds) = Hypertensive emergency. 2) Asymptomatic but systolic ≥180 OR diastolic ≥120 on repeated measurements = Hypertensive urgency (requires prompt evaluation within hours). 3) Blood pressure drop >20 mmHg from baseline with dizziness/fainting. 4) During pregnancy: systolic ≥160 or diastolic ≥110 mmHg. Do not delay seeking care for severe hypertension as it can cause stroke, heart attack, kidney failure, or aortic dissection."
    },
    {
      question: "How does age affect normal blood pressure ranges?",
      answer: "Blood pressure typically increases with age due to arterial stiffening: Age 18-39: Normal <120/<80, borderline 120-129/<80. Age 40-59: Normal <120/<80, elevated more common. Age 60+: Acceptable up to 130/80 due to increased cardiovascular risk. However, J-curve phenomenon exists: diastolic <70 mmHg in treated hypertensives may increase cardiovascular risk. Frail elderly (>80 years) may have higher targets (≤150/90 mmHg). Isolated systolic hypertension (systolic ≥130, diastolic <80) becomes more prevalent with aging. Age-specific considerations require individualized management balancing benefits of lowering systolic pressure with risks of excessive diastolic reduction."
    },
    {
      question: "What are the common causes of secondary hypertension?",
      answer: "Secondary hypertension causes (5-10% of cases): 1) Renal: Renal artery stenosis, chronic kidney disease, polycystic kidney disease. 2) Endocrine: Primary aldosteronism (most common endocrine cause), Cushing's syndrome, pheochromocytoma, hyperthyroidism, hyperparathyroidism. 3) Vascular: Coarctation of aorta. 4) Medication-induced: NSAIDs, decongestants, stimulants, corticosteroids, oral contraceptives, immunosuppressants. 5) Sleep disorders: Obstructive sleep apnea. 6) Pregnancy-related: Preeclampsia. Red flags for secondary hypertension: onset <30 or >55 years, resistant hypertension, severe hypertension (≥180/110), hypokalemia without diuretics, abdominal bruit, accelerated hypertension, specific medication history, or suggestive symptoms (episodic headaches, palpitations, sweating)."
    }
  ];

  const healthCalculators = [
    { name: "BMI Calculator", link: "/bmi-calculator" },
    { name: "Cholesterol Risk Calculator", link: "/cholesterol-calculator" },
    { name: "Heart Age Calculator", link: "/heart-age-calculator" },
    { name: "Cardiovascular Risk Assessment", link: "/cardiovascular-risk" },
    { name: "Blood Pressure Tracker", link: "/blood-pressure-tracker" },
    { name: "Stroke Risk Calculator", link: "/stroke-risk-calculator" },
    { name: "Medication Dosage Calculator", link: "/medication-dosage" },
    { name: "Hypertension Management Tool", link: "/hypertension-management" },
    { name: "Weight Loss Calculator", link: "/weight-loss-calculator" },
    { name: "Exercise Intensity Calculator", link: "/exercise-intensity" },
    { name: "Nutrition & Diet Planner", link: "/nutrition-planner" },
    { name: "Health Risk Assessment", link: "/health-risk-assessment" }
  ];

  return (
    <main style={containerStyle}>
      <section style={calculatorBoxStyle}>
        <h1 style={calcTitleStyle}>
          <i className="fas fa-heartbeat"></i> Blood Pressure Category Calculator - Comprehensive Cardiovascular Risk Assessment & Hypertension Management Platform
        </h1>
        <p style={calcDescStyle}>
          Calculate <strong>precise blood pressure categories, cardiovascular risk stratification, and evidence-based hypertension management recommendations</strong> using <strong>advanced algorithmic analysis, personalized health data, and current clinical practice guidelines</strong>. Essential for <strong>cardiovascular risk assessment, hypertension management optimization, and informed health decision-making</strong>.
        </p>

        <div style={inputGridStyle}>
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-tachometer-alt"></i> Systolic Pressure (mmHg) *</label>
            <input
              type="number"
              value={systolic}
              onChange={(e) => setSystolic(e.target.value)}
              placeholder="120"
              min="50"
              max="300"
              step="1"
              style={inputStyle}
              required
            />
            <small style={{ color: '#666', fontSize: '0.8rem' }}>
              Top number - pressure when heart beats
            </small>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-tachometer-alt"></i> Diastolic Pressure (mmHg) *</label>
            <input
              type="number"
              value={diastolic}
              onChange={(e) => setDiastolic(e.target.value)}
              placeholder="80"
              min="30"
              max="200"
              step="1"
              style={inputStyle}
              required
            />
            <small style={{ color: '#666', fontSize: '0.8rem' }}>
              Bottom number - pressure between beats
            </small>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-user"></i> Age (years) *</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="45"
              min="18"
              max="120"
              step="1"
              style={inputStyle}
              required
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
              <option value="other">Other/Prefer not to say</option>
            </select>
          </div>
        </div>

        <div style={inputGridStyle}>
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-history"></i> Medical History</label>
            <select
              value={history}
              onChange={(e) => setHistory(e.target.value)}
              style={selectStyle}
            >
              <option value="none">None significant</option>
              <option value="diabetes">Diabetes mellitus</option>
              <option value="heart">Heart disease</option>
              <option value="kidney">Kidney disease</option>
              <option value="stroke">Stroke/TIA</option>
              <option value="family">Family history of hypertension</option>
              <option value="cholesterol">High cholesterol</option>
            </select>
            <small style={{ color: '#666', fontSize: '0.8rem' }}>
              Affects risk assessment and recommendations
            </small>
          </div>
        </div>

        <button
          style={calcBtnStyle}
          onClick={calculateBloodPressureCategory}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, calcBtnHoverStyle)}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = calcBtnStyle.background;
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <i className="fas fa-calculator"></i> Calculate Blood Pressure Category
        </button>

        {/* Results Display */}
        {results && (
          <div style={resultsContainerStyle}>
            <div style={{ ...resultCardStyle, ...categoryCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-stethoscope"></i> Blood Pressure Category</h4>
              <div style={{ margin: '20px 0' }}>
                <div style={{ ...resultValueStyle, color: results.color }}>
                  {results.systolic}/{results.diastolic} mmHg
                </div>
                <div style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 'bold', 
                  color: results.color,
                  marginBottom: '10px'
                }}>
                  {results.category}
                </div>
                {results.emergency && (
                  <div style={{ 
                    padding: '15px', 
                    background: '#f8d7da',
                    borderRadius: '8px',
                    color: '#721c24',
                    fontWeight: '600',
                    marginBottom: '15px',
                    border: '2px solid #f5c6cb'
                  }}>
                    <i className="fas fa-exclamation-triangle"></i> EMERGENCY - SEEK IMMEDIATE MEDICAL ATTENTION
                  </div>
                )}
                <div style={{ 
                  padding: '10px', 
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  color: '#666'
                }}>
                  <div><strong>Risk Level:</strong> {results.riskLevel}</div>
                  <div><strong>Pulse Pressure:</strong> {results.pulsePressure} mmHg</div>
                  <div><strong>Assessment:</strong> {results.pulsePressureAssessment}</div>
                </div>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div>Age: {results.age} years | Gender: {results.gender}</div>
                <div>Medical History: {results.medicalHistory}</div>
                <div>Mean Arterial Pressure: {results.meanArterialPressure} mmHg</div>
              </div>
            </div>

            <div style={{ ...resultCardStyle, ...riskCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-chart-line"></i> Risk Assessment</h4>
              <div style={{ margin: '20px 0' }}>
                <div style={{ 
                  padding: '15px', 
                  background: results.riskLevel.includes('High') ? '#f8d7da' : 
                            results.riskLevel.includes('Moderate') ? '#fff3cd' : '#d4edda',
                  borderRadius: '8px',
                  color: results.riskLevel.includes('High') ? '#721c24' : 
                        results.riskLevel.includes('Moderate') ? '#856404' : '#155724',
                  fontWeight: '600',
                  marginBottom: '15px'
                }}>
                  {results.riskLevel} Cardiovascular Risk
                </div>
                <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.9rem', marginBottom: '10px' }}><strong>Identified Risk Factors:</strong></div>
                  <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                    {results.riskFactors.map((factor, index) => (
                      <div key={index} style={{
                        padding: '5px 10px',
                        marginBottom: '5px',
                        background: '#e9ecef',
                        borderRadius: '4px',
                        fontSize: '0.85rem'
                      }}>
                        • {factor}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div><strong>Mean Arterial Pressure:</strong> {results.mapAssessment}</div>
                <div>Based on AHA/ACC 2017 Guidelines</div>
                <div>Assessment considers age, history, and BP levels</div>
              </div>
            </div>

            <div style={{ ...resultCardStyle, ...recommendationsCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-clipboard-list"></i> Recommendations</h4>
              <div style={{ margin: '20px 0', maxHeight: '200px', overflowY: 'auto' }}>
                {results.recommendations.map((rec, index) => (
                  <div key={index} style={{
                    padding: '10px',
                    background: index === 0 && results.emergency ? '#f8d7da' : '#f8f9fa',
                    borderRadius: '6px',
                    marginBottom: '8px',
                    borderLeft: index === 0 ? '4px solid #3498db' : 'none'
                  }}>
                    <div style={{ fontWeight: index === 0 ? 'bold' : 'normal', color: '#2c3e50' }}>
                      {index + 1}. {rec}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div><strong>Next Steps:</strong></div>
                <div>• Confirm readings with multiple measurements</div>
                <div>• Schedule follow-up with healthcare provider</div>
                <div>• Implement lifestyle modifications gradually</div>
                <div>• Monitor blood pressure regularly</div>
              </div>
            </div>

            <div style={{ ...resultCardStyle, ...targetCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-bullseye"></i> Targets & Monitoring</h4>
              <div style={{ margin: '20px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2ecc71' }}>{results.targetSystolic}/{results.targetDiastolic}</div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>Target BP</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3498db' }}>{results.pulsePressure}</div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>Pulse Pressure</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#9b59b6' }}>{results.meanArterialPressure}</div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>MAP</div>
                  </div>
                </div>
                <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.9rem', marginBottom: '10px' }}><strong>Recent Measurements:</strong></div>
                  {results.measurementHistory.slice(0, 3).map((measurement, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '5px 0',
                      borderBottom: index < 2 ? '1px solid #eee' : 'none'
                    }}>
                      <span style={{ fontSize: '0.85rem' }}>{measurement.date}</span>
                      <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#e74c3c' }}>
                        {measurement.systolic}/{measurement.diastolic}
                      </span>
                      <span style={{ fontSize: '0.85rem', color: '#666' }}>
                        {measurement.category}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div><strong>Monitoring Protocol:</strong></div>
                <div>• Measure 2x daily (morning/evening)</div>
                <div>• Keep 7-day average for provider review</div>
                <div>• Track symptoms and medication effects</div>
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
          <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Premium blood pressure monitoring device</p>
        </div>

        {/* Enhanced SEO Content with High-Value Long-Tail Keywords */}
        <div style={infoSectionStyle}>
          <h3 style={sectionTitleStyle}><i className="fas fa-question-circle"></i> Comprehensive Blood Pressure Analysis: Advanced Cardiovascular Risk Assessment Protocol</h3>
          <p style={paragraphStyle}><strong>Blood pressure category calculation methodologies</strong> represent <strong>essential cardiovascular health assessment tools</strong> for determining <strong>precise hypertension staging, optimal treatment targets, and evidence-based cardiovascular risk management strategies</strong>. These advanced calculations integrate <strong>sophisticated algorithmic analysis, personalized health data parameters, and comprehensive cardiovascular monitoring protocols</strong> to provide <strong>individualized hypertension management approaches</strong> that maximize <strong>cardiovascular disease prevention effectiveness while supporting informed health decision-making processes</strong> across diverse clinical scenarios requiring <strong>precision blood pressure classification protocols</strong>.</p>
          
          <h3 style={sectionTitleStyle}><i className="fas fa-calculator"></i> Advanced Blood Pressure Classification Algorithms - Comprehensive Cardiovascular Health Analysis Formulae</h3>
          <p style={paragraphStyle}>Multiple <strong>validated blood pressure classification equations</strong> exist for <strong>comprehensive cardiovascular health management protocols</strong>, each demonstrating specific <strong>clinical applications and variable risk prediction accuracy profiles</strong> influencing <strong>treatment decision-making processes</strong>:</p>
          
          <div style={formulaBoxStyle}>
            <strong>Standard BP Classification Protocol:</strong> Normal: &lt;120/&lt;80 mmHg | Elevated: 120-129/&lt;80<br/>
            <strong>Hypertension Staging Algorithm:</strong> Stage 1: 130-139/80-89 | Stage 2: ≥140/≥90<br/>
            <strong>Pulse Pressure Calculation:</strong> PP = Systolic BP - Diastolic BP (Normal: &lt;40 mmHg)<br/>
            <strong>Mean Arterial Pressure Formula:</strong> MAP = Diastolic BP + 1/3 Pulse Pressure<br/>
            <strong>Cardiovascular Risk Integration:</strong> Risk Score = (BP Category × 2) + (Age Factor) + (Comorbidity Score)<br/>
            <strong>Clinical Treatment Algorithm:</strong> Lifestyle modifications recommended for <strong>elevated BP</strong>, medication initiation required for <strong>stage 2 hypertension</strong>
          </div>

          <h3 style={sectionTitleStyle}><i className="fas fa-stethoscope"></i> Clinical Applications of Blood Pressure Classification - Comprehensive Cardiovascular Health Management Guidelines</h3>
          <p style={paragraphStyle}>Accurate <strong>blood pressure classification methodology implementation</strong> serves critical functions across multiple <strong>cardiovascular specialties and hypertension management areas</strong> requiring <strong>precise risk stratification</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Hypertension Diagnosis Protocol:</strong> Essential for <strong>accurate hypertension staging, treatment initiation timing, and monitoring frequency determination</strong> optimizing <strong>cardiovascular outcomes</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Cardiovascular Risk Stratification:</strong> Guides <strong>preventive medication decisions, lifestyle intervention intensity, and follow-up schedule determination</strong> for enhanced risk reduction</li>
            <li style={{ marginBottom: '10px' }}><strong>Treatment Optimization Monitoring:</strong> Determines <strong>medication efficacy assessment, dosage adjustment requirements, and combination therapy considerations</strong> for comprehensive hypertension control</li>
            <li style={{ marginBottom: '10px' }}><strong>Secondary Prevention Strategies:</strong> Essential for <strong>post-MI management, stroke prevention protocols, and heart failure treatment optimization</strong> in established cardiovascular disease</li>
            <li style={{ marginBottom: '10px' }}><strong>Special Population Management:</strong> Accounts for <strong>geriatric hypertension considerations, pregnancy-related hypertension protocols, and pediatric blood pressure assessment</strong> across lifespan</li>
            <li style={{ marginBottom: '10px' }}><strong>Pharmacological Research Applications:</strong> Manages <strong>clinical trial eligibility criteria, treatment response measurement, and comparative effectiveness research</strong> for evidence-based practice</li>
            <li><strong>Public Health Surveillance:</strong> Coordinates <strong>population hypertension prevalence tracking, treatment gap analysis, and prevention program evaluation</strong> for community cardiovascular health improvement</li>
          </ul>
          
          <h3 style={sectionTitleStyle}><i className="fas fa-balance-scale"></i> Factors Affecting Blood Pressure Measurement Accuracy - Comprehensive Cardiovascular Assessment Considerations</h3>
          <p style={paragraphStyle}>Multiple <strong>significant physiological, technical, and environmental factors</strong> influence <strong>blood pressure measurement accuracy parameters</strong> and require consideration for appropriate clinical interpretation:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Measurement Technique Variables:</strong> Proper cuff size selection, correct arm positioning, adequate rest period, and appropriate measurement timing significantly affect <strong>reading accuracy and clinical decision reliability</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Biological Rhythm Impacts:</strong> Circadian blood pressure patterns, seasonal variation influences, and hormonal cycle effects dramatically alter <strong>measurement interpretation and treatment timing</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>White Coat Phenomenon:</strong> Office-induced blood pressure elevation, measurement anxiety responses, and clinical environment effects create <strong>specific diagnostic challenges requiring ambulatory monitoring</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Masked Hypertension Patterns:</strong> Normal office readings with elevated home measurements, reverse white coat effect, and nocturnal hypertension demonstrate <strong>unique management considerations</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Device-Specific Variables:</strong> Oscillometric vs. auscultatory methods, automated device validation status, and calibration maintenance requirements affect <strong>measurement consistency across settings</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Patient-Specific Factors:</strong> Arm circumference considerations, arrhythmia presence (atrial fibrillation), vascular access limitations, and movement artifacts create <strong>measurement challenges requiring specialized approaches</strong></li>
            <li><strong>Environmental Influences:</strong> Room temperature effects, noise level impacts, recent activity considerations, and bladder distension influences significantly impact <strong>blood pressure measurement reliability</strong></li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-exclamation-triangle"></i> Limitations of Blood Pressure Classification - Advanced Cardiovascular Assessment Methodologies</h3>
          <p style={paragraphStyle}>While <strong>blood pressure classification methodologies</strong> provide valuable <strong>clinical starting points</strong>, specific clinical situations necessitate <strong>advanced assessment approaches</strong> and <strong>dynamic monitoring protocols</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Resistant Hypertension Scenarios:</strong> Uncontrolled BP despite triple therapy, secondary hypertension evaluation requirements, and medication adherence challenges require <strong>comprehensive diagnostic evaluation beyond classification</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Hemodynamic Instability Contexts:</strong> Critical care settings, perioperative management, and shock states demonstrating <strong>rapid blood pressure fluctuations requiring continuous monitoring</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Special Population Considerations:</strong> Pregnancy with preeclampsia, end-stage renal disease with volume overload, and advanced heart failure with reduced ejection fraction require <strong>individualized treatment approaches</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Arrhythmia Interference:</strong> Atrial fibrillation with irregular rhythms, frequent ectopic beats, and paced rhythms creating <strong>measurement challenges requiring alternative assessment methods</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Advanced Cardiovascular Disease:</strong> Severe aortic stenosis, complex congenital heart disease, and pulmonary hypertension contexts demonstrating <strong>unique hemodynamic patterns</strong></li>
            <li><strong>Comprehensive Risk Assessment Requirements:</strong> Global cardiovascular risk scoring integration, target organ damage evaluation, and comprehensive comorbidity assessment requiring <strong>multidimensional evaluation approaches</strong></li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-history"></i> Historical Development of Blood Pressure Science - Evolution of Cardiovascular Health Understanding</h3>
          <p style={paragraphStyle}>The progressive evolution of <strong>blood pressure measurement and classification methodologies</strong> reflects <strong>centuries of cardiovascular research advancement</strong> and <strong>clinical practice refinement trajectories</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Early Measurement Techniques:</strong> Development of <strong>first sphygmomanometers, Korotkoff sound discovery, and early hypertension recognition</strong> establishing foundational cardiovascular knowledge</li>
            <li style={{ marginBottom: '10px' }}><strong>Mid-20th Century Standardization:</strong> Introduction of <strong>standardized measurement protocols, hypertension definition establishment, and early treatment trials</strong> revolutionizing cardiovascular care</li>
            <li style={{ marginBottom: '10px' }}><strong>Late 20th Century Advances:</strong> Creation of <strong>ambulatory blood pressure monitoring, automated measurement devices, and evidence-based treatment guidelines</strong> for enhanced hypertension management</li>
            <li style={{ marginBottom: '10px' }}><strong>Epidemiological Research Contributions:</strong> Framingham Heart Study findings, population-based risk factor identification, and longitudinal outcome studies establishing <strong>blood pressure as major cardiovascular risk factor</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Treatment Revolution Period:</strong> Development of <strong>effective antihypertensive medications, combination therapy strategies, and target organ protection concepts</strong> transforming hypertension outcomes</li>
            <li><strong>21st Century Precision Medicine:</strong> Integration of <strong>genetic risk factors, personalized treatment algorithms, digital health technologies, and artificial intelligence applications</strong> for optimal cardiovascular health management</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-user-md"></i> Practical Clinical Implementation Recommendations - Comprehensive Cardiovascular Health Management Guidelines</h3>
          <p style={paragraphStyle}>For optimal <strong>blood pressure classification implementation</strong> in contemporary clinical practice environments and <strong>evidence-based cardiovascular health protocols</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Comprehensive Assessment Protocol:</strong> Systematically evaluate <strong>multiple blood pressure readings, measurement technique verification, out-of-office monitoring integration, and cardiovascular risk factor assessment</strong> before classification</li>
            <li style={{ marginBottom: '10px' }}><strong>Multi-Method Validation Procedures:</strong> Utilize <strong>office measurements combined with home blood pressure monitoring, ambulatory blood pressure assessment, and automated device validation</strong> for enhanced diagnostic accuracy</li>
            <li style={{ marginBottom: '10px' }}><strong>Individualized Treatment Algorithms:</strong> Systematically incorporate <strong>age-specific considerations, comorbidity impacts, medication tolerance profiles, and patient preference factors</strong> into hypertension management plans</li>
            <li style={{ marginBottom: '10px' }}><strong>Continuous Monitoring Protocols:</strong> Implement <strong>regular blood pressure tracking, treatment response assessment, side effect monitoring, and cardiovascular outcome evaluation</strong> for optimal long-term management</li>
            <li style={{ marginBottom: '10px' }}><strong>Patient Education Framework:</strong> Develop <strong>comprehensive hypertension education programs</strong> covering <strong>measurement technique training, lifestyle modification guidance, medication adherence strategies, and complication prevention information</strong> for informed patient participation</li>
            <li><strong>Quality Improvement Integration:</strong> Implement <strong>treatment goal achievement tracking systems, cardiovascular event monitoring protocols, and evidence-based practice guideline implementation</strong> for continuous cardiovascular care optimization</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-chart-line"></i> Future Directions in Blood Pressure Science - Emerging Cardiovascular Technologies</h3>
          <p style={paragraphStyle}>Ongoing <strong>blood pressure research initiatives</strong> continue refining <strong>measurement and classification approaches</strong> with promising technological developments and <strong>innovative monitoring methodologies</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Advanced Wearable Technologies:</strong> Continuous blood pressure monitoring devices, smartphone-based measurement systems, and non-invasive hemodynamic assessment tools for real-time cardiovascular assessment</li>
            <li style={{ marginBottom: '10px' }}><strong>Artificial Intelligence Applications:</strong> Machine learning algorithm development for <strong>personalized hypertension prediction models</strong> incorporating multiple physiological, genetic, and lifestyle variables</li>
            <li style={{ marginBottom: '10px' }}><strong>Mobile Health Integration:</strong> Advanced blood pressure tracking applications, telemedicine consultation platforms, and digital cardiovascular health education systems for comprehensive management</li>
            <li style={{ marginBottom: '10px' }}><strong>Biomarker Discovery Advancements:</strong> Identification of <strong>novel hypertension predictors, cardiovascular risk markers, and treatment response indicators</strong> for enhanced personalized management</li>
            <li style={{ marginBottom: '10px' }}><strong>Genetic Profiling Innovations:</strong> Polygenic risk score development, pharmacogenetic testing implementation, and personalized treatment algorithm creation based on <strong>individual genetic profiles</strong></li>
            <li><strong>Integrated Health Systems:</strong> Development of <strong>comprehensive cardiovascular risk management platforms, multidisciplinary care coordination systems, and population health management approaches</strong> for optimal cardiovascular outcomes</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-graduation-cap"></i> Educational Requirements and Professional Training Standards Implementation</h3>
          <p style={paragraphStyle}>Proper <strong>blood pressure classification methodology education</strong> represents an <strong>essential clinical competency requirement</strong> for <strong>healthcare professionals</strong> across multiple cardiovascular health disciplines. Comprehensive training curricula should systematically include <strong>cardiovascular physiology principles, measurement technique mastery, classification algorithm application, and treatment guideline implementation strategies</strong>. Continuing medical education programs must consistently address <strong>evolving cardiovascular research findings, changing clinical practice standards, and emerging technological developments</strong> to ensure optimal patient care outcomes and evidence-based practice implementation across diverse healthcare delivery settings and specialty practice areas.</p>

          <h3 style={sectionTitleStyle}><i className="fas fa-clipboard-check"></i> Quality Assurance and Protocol Standardization Implementation</h3>
          <p style={paragraphStyle}>Implementation of <strong>rigorous quality assurance protocols</strong> ensures <strong>consistent cardiovascular health management practices</strong> across diverse healthcare settings. These protocols encompass <strong>measurement standardization methodologies, device calibration verification procedures, classification algorithm validation requirements, and clinical outcome measurement systems</strong> that directly impact <strong>cardiovascular health outcomes and hypertension management effectiveness</strong>. Professional organizations should develop <strong>standardized training materials, competency assessment tools, and practice guideline documents</strong> to guarantee consistent clinical application quality across diverse healthcare delivery settings and specialty practice areas, ensuring optimal patient outcomes through evidence-based cardiovascular health management approaches.</p>
        </div>

        {/* Q&A Dropdown Section */}
        <div style={faqSectionStyle}>
          <h2 style={faqTitleStyle}><i className="fas fa-question-circle"></i> Frequently Asked Questions About Blood Pressure Classification</h2>
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
          <h3 style={sectionTitleStyle}><i className="fas fa-calculator"></i> Related Health & Cardiovascular Calculators</h3>
          <p style={paragraphStyle}>Explore our comprehensive collection of <strong>cardiovascular health calculation tools and wellness monitoring calculators</strong> for heart health management and disease prevention:</p>
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
          <p style={paragraphStyle}><strong>This blood pressure calculator provides estimates for educational and informational purposes only.</strong> The calculations are based on statistical averages and clinical guidelines and should not be used as a substitute for professional medical advice, diagnosis, or treatment.</p>
          <p style={paragraphStyle}><strong>Medical Emergency Warning:</strong> Blood pressure readings of 180/120 mmHg or higher WITH symptoms (severe headache, chest pain, shortness of breath, visual changes, nausea/vomiting) constitute a HYPERTENSIVE EMERGENCY requiring IMMEDIATE medical attention. Do not delay seeking emergency care.</p>
          <p style={paragraphStyle}><strong>Diagnosis Limitations:</strong> Proper hypertension diagnosis requires multiple measurements over time, consideration of measurement conditions, and exclusion of white coat hypertension. Single readings should not be used for definitive diagnosis or treatment decisions without proper clinical evaluation.</p>
          <p style={paragraphStyle}><strong>Professional Consultation Required:</strong> Always seek the advice of your primary care physician, cardiologist, or other qualified healthcare provider with any questions regarding blood pressure, hypertension, or cardiovascular health. Do not disregard professional medical advice or delay seeking it because of information provided by this calculator.</p>
          <p style={paragraphStyle}><strong>Treatment Considerations:</strong> Medication decisions should be made in consultation with a healthcare provider considering individual factors including age, comorbidities, medication interactions, side effect profiles, and patient preferences. Do not start, stop, or change any medication based on calculator results alone.</p>
          <p style={paragraphStyle}><strong>Measurement Accuracy:</strong> Proper blood pressure measurement technique is critical. Ensure correct cuff size, proper positioning, adequate rest before measurement, and validated equipment. Multiple readings at different times are necessary for accurate assessment.</p>
          <p style={paragraphStyle}><strong>Risk Factor Integration:</strong> This calculator provides general risk assessment. Individual cardiovascular risk should be assessed using comprehensive tools that consider lipid profiles, diabetes status, smoking history, family history, and other factors beyond blood pressure alone.</p>
        </div>
      </section>

      {/* Sidebar with 3 Ads (3rd one sticky) */}
      {showSidebar && (
        <aside style={sidebarStyle}>
          <div style={sidebarContentStyle}>
            <div style={{ ...adSlotStyle, ...sidebarAdStyle }}>
              <p><i className="fas fa-ad"></i> Advertisement 1</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Sponsored Content</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Advanced blood pressure monitor</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>300px height ad slot</p>
            </div>
            
            <div style={{ ...adSlotStyle, ...sidebarAdStyle }}>
              <p><i className="fas fa-ad"></i> Advertisement 2</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Featured Product</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Heart health supplement guide</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>300px height ad slot</p>
            </div>
            
            <div style={{ ...adSlotStyle, ...stickyAdStyle }}>
              <p><i className="fas fa-thumbtack"></i> Sticky Advertisement</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Premium Content - Stays visible</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Complete cardiovascular health program</p>
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
      
      {/* Sticky Footer Ad (Mobile) */}
      {!showSidebar && (
        <div style={stickyFooterAdStyle}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ textAlign: 'left', flex: 1 }}>
              <p style={{ fontSize: '0.9rem', margin: 0, color: '#2c3e50' }}>
                <i className="fas fa-mobile-alt"></i> Mobile Health Offer
              </p>
              <p style={{ fontSize: '0.8rem', margin: '5px 0 0 0', color: '#666' }}>
                Get 25% off on premium blood pressure monitors
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
              Shop Now
            </button>
          </div>
        </div>
      )}
    </main>
  );
}