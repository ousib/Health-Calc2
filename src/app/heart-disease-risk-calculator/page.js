"use client";

import { useState, useEffect } from 'react';

export default function HeartDiseaseRiskCalculatorPage() {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [totalCholesterol, setTotalCholesterol] = useState('');
  const [hdlCholesterol, setHdlCholesterol] = useState('');
  const [systolicBP, setSystolicBP] = useState('');
  const [smoking, setSmoking] = useState('no');
  const [diabetes, setDiabetes] = useState('no');
  const [hypertension, setHypertension] = useState('no');
  const [familyHistory, setFamilyHistory] = useState('no');
  const [activity, setActivity] = useState('moderate');
  const [bmi, setBmi] = useState('');
  const [results, setResults] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [riskHistory, setRiskHistory] = useState([]);

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

  const riskScoreCardStyle = {
    borderTopColor: '#e74c3c'
  };

  const categoryCardStyle = {
    borderTopColor: '#f39c12'
  };

  const recommendationsCardStyle = {
    borderTopColor: '#3498db'
  };

  const preventionCardStyle = {
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

  // Heart disease risk categories
  const riskCategories = [
    { 
      name: 'Low Risk', 
      score: { min: 0, max: 5 },
      color: '#2ecc71',
      description: 'Below average 10-year cardiovascular risk',
      screening: 'Every 4-6 years',
      action: 'Maintain heart-healthy lifestyle'
    },
    { 
      name: 'Borderline Risk', 
      score: { min: 6, max: 7.5 },
      color: '#f1c40f',
      description: 'Slightly elevated risk',
      screening: 'Every 2-3 years',
      action: 'Lifestyle modifications recommended'
    },
    { 
      name: 'Intermediate Risk', 
      score: { min: 7.6, max: 20 },
      color: '#e67e22',
      description: 'Moderate cardiovascular risk',
      screening: 'Every 1-2 years',
      action: 'Consider medication if lifestyle insufficient'
    },
    { 
      name: 'High Risk', 
      score: { min: 20.1, max: 30 },
      color: '#e74c3c',
      description: 'Significantly elevated risk',
      screening: 'Annual assessment',
      action: 'Medication therapy recommended'
    },
    { 
      name: 'Very High Risk', 
      score: { min: 30.1, max: 100 },
      color: '#c0392b',
      description: 'Immediate intervention required',
      screening: 'Quarterly monitoring',
      action: 'Intensive medical management needed'
    }
  ];

  // Sample data for demo
  useEffect(() => {
    setAge('55');
    setTotalCholesterol('200');
    setHdlCholesterol('50');
    setSystolicBP('130');
    setBmi('26');
    setSmoking('no');
    setDiabetes('no');
    setHypertension('no');
    setFamilyHistory('no');
    setActivity('moderate');
    setGender('male');

    // Generate sample risk history
    const historyData = [];
    for (let i = 0; i < 6; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const riskScore = (Math.random() * 25) + 5;
      const category = riskCategories.find(cat => 
        riskScore >= cat.score.min && riskScore <= cat.score.max
      ) || riskCategories[2];
      
      historyData.push({
        date: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        score: riskScore.toFixed(1),
        category: category.name,
        color: category.color
      });
    }
    setRiskHistory(historyData);
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

  const calculateHeartDiseaseRisk = () => {
    // Validate inputs
    if (!age || !totalCholesterol || !hdlCholesterol || !systolicBP) {
      alert('Please fill in all required fields.');
      return;
    }

    const ageVal = parseInt(age);
    const totalCholVal = parseInt(totalCholesterol);
    const hdlCholVal = parseInt(hdlCholesterol);
    const systolicBPVal = parseInt(systolicBP);
    const bmiVal = bmi ? parseFloat(bmi) : 25;

    if (ageVal < 20 || ageVal > 79) {
      alert('Age should be between 20 and 79 years for accurate risk assessment.');
      return;
    }

    if (totalCholVal < 100 || totalCholVal > 400) {
      alert('Total cholesterol should be between 100 and 400 mg/dL.');
      return;
    }

    if (hdlCholVal < 20 || hdlCholVal > 100) {
      alert('HDL cholesterol should be between 20 and 100 mg/dL.');
      return;
    }

    if (systolicBPVal < 90 || systolicBPVal > 200) {
      alert('Systolic blood pressure should be between 90 and 200 mmHg.');
      return;
    }

    // Calculate Framingham Risk Score (simplified version)
    let riskScore = 0;
    
    // Age points
    if (gender === 'male') {
      if (ageVal >= 20 && ageVal <= 34) riskScore += 0;
      else if (ageVal <= 39) riskScore += 2;
      else if (ageVal <= 44) riskScore += 5;
      else if (ageVal <= 49) riskScore += 6;
      else if (ageVal <= 54) riskScore += 8;
      else if (ageVal <= 59) riskScore += 10;
      else if (ageVal <= 64) riskScore += 11;
      else if (ageVal <= 69) riskScore += 12;
      else if (ageVal <= 74) riskScore += 13;
      else riskScore += 14;
    } else {
      if (ageVal >= 20 && ageVal <= 34) riskScore += 0;
      else if (ageVal <= 39) riskScore += 2;
      else if (ageVal <= 44) riskScore += 4;
      else if (ageVal <= 49) riskScore += 5;
      else if (ageVal <= 54) riskScore += 7;
      else if (ageVal <= 59) riskScore += 8;
      else if (ageVal <= 64) riskScore += 9;
      else if (ageVal <= 69) riskScore += 10;
      else if (ageVal <= 74) riskScore += 11;
      else riskScore += 12;
    }

    // Total cholesterol points
    if (gender === 'male') {
      if (totalCholVal < 160) riskScore += 0;
      else if (totalCholVal < 200) riskScore += 1;
      else if (totalCholVal < 240) riskScore += 2;
      else if (totalCholVal < 280) riskScore += 3;
      else riskScore += 4;
    } else {
      if (totalCholVal < 160) riskScore += 0;
      else if (totalCholVal < 200) riskScore += 1;
      else if (totalCholVal < 240) riskScore += 3;
      else if (totalCholVal < 280) riskScore += 4;
      else riskScore += 5;
    }

    // HDL cholesterol points
    if (gender === 'male') {
      if (hdlCholVal >= 60) riskScore -= 1;
      else if (hdlCholVal >= 50) riskScore += 0;
      else if (hdlCholVal >= 40) riskScore += 1;
      else riskScore += 2;
    } else {
      if (hdlCholVal >= 60) riskScore -= 1;
      else if (hdlCholVal >= 50) riskScore += 0;
      else if (hdlCholVal >= 40) riskScore += 1;
      else riskScore += 2;
    }

    // Blood pressure points
    if (systolicBPVal < 120) {
      riskScore += 0;
    } else if (systolicBPVal < 130) {
      riskScore += (gender === 'male' ? 0 : 1);
    } else if (systolicBPVal < 140) {
      riskScore += (gender === 'male' ? 1 : 2);
    } else if (systolicBPVal < 160) {
      riskScore += (gender === 'male' ? 2 : 3);
    } else {
      riskScore += (gender === 'male' ? 3 : 4);
    }

    // Smoking points
    if (smoking === 'yes') {
      riskScore += (gender === 'male' ? 4 : 3);
    }

    // Additional risk factors
    if (diabetes === 'yes') riskScore += (gender === 'male' ? 3 : 4);
    if (hypertension === 'yes') riskScore += 2;
    if (familyHistory === 'yes') riskScore += 2;
    
    // Physical activity adjustment
    if (activity === 'sedentary') riskScore += 2;
    else if (activity === 'very_active') riskScore -= 1;
    
    // BMI adjustment
    if (bmiVal >= 30) riskScore += 2;
    else if (bmiVal >= 25) riskScore += 1;

    // Convert points to 10-year risk percentage (simplified)
    let tenYearRisk = 0;
    
    if (gender === 'male') {
      if (riskScore <= 0) tenYearRisk = 1;
      else if (riskScore <= 4) tenYearRisk = 2;
      else if (riskScore <= 6) tenYearRisk = 3;
      else if (riskScore <= 7) tenYearRisk = 4;
      else if (riskScore <= 8) tenYearRisk = 5;
      else if (riskScore <= 9) tenYearRisk = 6;
      else if (riskScore <= 10) tenYearRisk = 8;
      else if (riskScore <= 11) tenYearRisk = 10;
      else if (riskScore <= 12) tenYearRisk = 12;
      else if (riskScore <= 13) tenYearRisk = 16;
      else if (riskScore <= 14) tenYearRisk = 20;
      else if (riskScore <= 15) tenYearRisk = 25;
      else tenYearRisk = 30 + (riskScore - 15) * 3;
    } else {
      if (riskScore <= 9) tenYearRisk = 1;
      else if (riskScore <= 12) tenYearRisk = 2;
      else if (riskScore <= 14) tenYearRisk = 3;
      else if (riskScore <= 15) tenYearRisk = 4;
      else if (riskScore <= 16) tenYearRisk = 5;
      else if (riskScore <= 17) tenYearRisk = 6;
      else if (riskScore <= 18) tenYearRisk = 8;
      else if (riskScore <= 19) tenYearRisk = 11;
      else if (riskScore <= 20) tenYearRisk = 14;
      else if (riskScore <= 21) tenYearRisk = 17;
      else if (riskScore <= 22) tenYearRisk = 22;
      else if (riskScore <= 23) tenYearRisk = 27;
      else tenYearRisk = 30 + (riskScore - 23) * 3;
    }

    // Cap at 100%
    tenYearRisk = Math.min(Math.round(tenYearRisk), 100);

    // Determine risk category
    let category = riskCategories[0];
    for (const cat of riskCategories) {
      if (tenYearRisk >= cat.score.min && tenYearRisk <= cat.score.max) {
        category = cat;
        break;
      }
    }

    // Calculate cholesterol ratios
    const totalHdlRatio = totalCholVal / hdlCholVal;
    const ldlEstimate = totalCholVal - hdlCholVal - (totalCholVal * 0.2); // Simplified LDL estimate
    
    // Generate personalized recommendations
    const recommendations = [];
    const preventionStrategies = [];

    if (tenYearRisk <= 5) {
      recommendations.push('Maintain current heart-healthy lifestyle');
      recommendations.push('Continue regular physical activity (150+ minutes/week)');
      recommendations.push('Annual cardiovascular health check-up');
      recommendations.push('Monitor cholesterol and blood pressure');
      
      preventionStrategies.push('Maintain BMI &lt;25');
      preventionStrategies.push('Eat Mediterranean-style diet');
      preventionStrategies.push('Manage stress effectively');
      preventionStrategies.push('Get adequate sleep (7-9 hours/night)');
    } else if (tenYearRisk <= 10) {
      recommendations.push('Implement lifestyle modifications');
      recommendations.push('Focus on cholesterol management');
      recommendations.push('Consider dietary changes to reduce saturated fats');
      recommendations.push('Increase physical activity intensity');
      recommendations.push('Biannual cardiovascular assessment');
      
      preventionStrategies.push('Reduce LDL cholesterol to &lt;100 mg/dL');
      preventionStrategies.push('Increase aerobic exercise');
      preventionStrategies.push('Limit alcohol consumption');
      preventionStrategies.push('Consider aspirin therapy (consult doctor)');
    } else if (tenYearRisk <= 20) {
      recommendations.push('Medical evaluation for statin therapy consideration');
      recommendations.push('Intensive lifestyle intervention program');
      recommendations.push('Regular blood pressure monitoring');
      recommendations.push('Quarterly follow-up with healthcare provider');
      recommendations.push('Consider cardiac stress testing');
      
      preventionStrategies.push('Statin therapy if lifestyle insufficient');
      preventionStrategies.push('Blood pressure control &lt;130/80 mmHg');
      preventionStrategies.push('Diabetes screening if not done');
      preventionStrategies.push('Weight management program');
    } else {
      recommendations.push('URGENT: Schedule cardiology consultation');
      recommendations.push('Immediate initiation of medical therapy');
      recommendations.push('Comprehensive cardiovascular workup');
      recommendations.push('Close monitoring of all risk factors');
      recommendations.push('Consider referral to preventive cardiology');
      
      preventionStrategies.push('Immediate medical management');
      preventionStrategies.push('LDL cholesterol target &lt;70 mg/dL');
      preventionStrategies.push('Regular cardiac monitoring');
      preventionStrategies.push('Cardiac rehabilitation program');
    }

    // Identify key risk factors
    const riskFactors = [];
    
    if (ageVal >= 45 && gender === 'male') riskFactors.push(`Age ${ageVal} (men ≥45 higher risk)`);
    if (ageVal >= 55 && gender === 'female') riskFactors.push(`Age ${ageVal} (women ≥55 higher risk)`);
    
    if (totalCholVal >= 200) riskFactors.push(`Elevated total cholesterol (${totalCholVal} mg/dL)`);
    if (hdlCholVal < 40) riskFactors.push(`Low HDL cholesterol (${hdlCholVal} mg/dL)`);
    
    if (totalHdlRatio > 5) riskFactors.push(`High total/HDL ratio (${totalHdlRatio.toFixed(1)})`);
    
    if (systolicBPVal >= 130) riskFactors.push(`Elevated blood pressure (${systolicBPVal} mmHg)`);
    if (smoking === 'yes') riskFactors.push('Current tobacco use');
    if (diabetes === 'yes') riskFactors.push('Diabetes mellitus');
    if (hypertension === 'yes') riskFactors.push('Diagnosed hypertension');
    if (familyHistory === 'yes') riskFactors.push('Family history of early heart disease');
    
    if (activity === 'sedentary') riskFactors.push('Sedentary lifestyle');
    if (bmiVal >= 25) riskFactors.push(`Overweight (BMI: ${bmiVal.toFixed(1)})`);

    // Calculate modifiable vs non-modifiable risk
    const modifiableFactors = riskFactors.filter(factor => 
      !factor.includes('Age') && 
      !factor.includes('Family history')
    ).length;
    
    const nonModifiableFactors = riskFactors.length - modifiableFactors;

    // Calculate estimated LDL
    const estimatedLDL = Math.max(0, ldlEstimate);

    setResults({
      tenYearRisk: tenYearRisk,
      riskScore: riskScore,
      category: category.name,
      color: category.color,
      description: category.description,
      totalCholesterol: totalCholVal,
      hdlCholesterol: hdlCholVal,
      estimatedLDL: estimatedLDL.toFixed(0),
      totalHdlRatio: totalHdlRatio.toFixed(1),
      systolicBP: systolicBPVal,
      recommendations: recommendations,
      preventionStrategies: preventionStrategies,
      screeningRecommendation: category.screening,
      riskFactors: riskFactors,
      modifiableFactors: modifiableFactors,
      nonModifiableFactors: nonModifiableFactors,
      age: ageVal,
      gender: gender,
      smoking: smoking,
      diabetes: diabetes,
      hypertension: hypertension,
      familyHistory: familyHistory,
      activityLevel: activity,
      bmi: bmiVal.toFixed(1),
      riskHistory: riskHistory
    });
  };

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "What's the difference between the Framingham Risk Score and ASCVD Risk Calculator?",
      answer: "Framingham Risk Score estimates 10-year risk of coronary heart disease (heart attack, angina, coronary death). ASCVD Risk Calculator estimates 10-year risk of atherosclerotic cardiovascular disease (heart attack, stroke, death from either). ASCVD includes stroke risk, uses updated coefficients, and incorporates race (African American vs non-African American). Framingham: Based on original Framingham Heart Study, tends to overestimate risk in modern populations. ASCVD: Based on pooled cohort equations from multiple studies, better for contemporary diverse populations. Clinical preference: ASCVD preferred in US guidelines, Framingham still used internationally. Both tools have limitations and should guide, not dictate, treatment decisions."
    },
    {
      question: "How accurate are online heart disease risk calculators?",
      answer: "Validated risk calculators have moderate accuracy: C-statistics (discrimination) 0.70-0.80 in validation studies. Framingham: 0.70-0.75. ASCVD: 0.70-0.78. QRISK3 (UK): 0.80-0.85. Limitations: 1) Accuracy varies by ethnicity (better in White populations), 2) May overestimate risk in low-risk populations, 3) Don't include all risk factors (diet, stress, sleep), 4) Require recent lab values, 5) Not validated for age &lt;20 or &gt;79. Most accurate when: Using appropriate calculator for population, inputting accurate current values, interpreting as probability not certainty. Least accurate for: Extreme values, acute illness, pregnant women, chronic inflammatory conditions. Always confirm with clinical assessment."
    },
    {
      question: "Can lifestyle changes really reverse heart disease risk?",
      answer: "YES - Major studies prove effectiveness: INTERHEART study: 90% of heart attacks attributable to modifiable risk factors. Lyon Diet Heart Study: Mediterranean diet reduced recurrent heart attacks by 70%. Lifestyle Heart Trial: Intensive lifestyle changes reversed coronary atherosclerosis. Key interventions: 1) Diet: Mediterranean diet reduces risk 30%, DASH diet lowers BP 8-14 mmHg, 2) Exercise: 150 min/week reduces risk 20-30%, 3) Smoking cessation: Risk halves within 1 year, approaches never-smoker by 15 years, 4) Weight loss: 5-10% reduction improves all risk factors, 5) Stress management: Reduces inflammation and BP. Timeframe: Benefits begin immediately, maximum effect at 1-3 years. Medications still needed for high-risk individuals despite lifestyle changes."
    },
    {
      question: "At what cholesterol level should I start taking statins?",
      answer: "Statins initiation based on risk, not cholesterol level alone. ACC/AHA guidelines: 1) Clinical ASCVD: High-intensity statin regardless of LDL level. 2) LDL ≥190 mg/dL: High-intensity statin. 3) Diabetes age 40-75: Moderate-intensity statin. 4) 10-year ASCVD risk ≥7.5%: Consider moderate-high intensity statin. 5) 10-year risk 5-7.5%: Consider moderate-intensity if risk enhancers present. Risk enhancers: Family history early ASCVD, metabolic syndrome, CKD, inflammatory conditions, premature menopause, ethnicity (South Asian), lipid/biomarker abnormalities. Shared decision-making: Discuss benefits (1% absolute risk reduction/year) vs risks (muscle symptoms 5-10%, diabetes risk increase 0.1%/year). Lifestyle foundation always required alongside medication."
    },
    {
      question: "What are the silent signs of heart disease that people often miss?",
      answer: "Subtle early warning signs: 1) Fatigue disproportionate to activity level, 2) Shortness of breath with minimal exertion, 3) Sleep disturbances (waking gasping for air), 4) Erectile dysfunction (can precede heart attack by 2-5 years), 5) Swelling in feet/ankles, 6) Irregular heartbeat sensations, 7) Chest discomfort not just pain (pressure, tightness, burning), 8) Jaw/neck/back pain without chest symptoms, 9) Indigestion/nausea with exertion, 10) Decreased exercise tolerance. Women-specific symptoms: More likely fatigue, nausea, back/jaw pain, less typical chest pain. Silent ischemia: 50-80% of heart attacks have minimal or no symptoms. That's why screening crucial: EKG abnormalities found in 20-30% of asymptomatic high-risk individuals."
    },
    {
      question: "How does family history affect heart disease risk and what should I do about it?",
      answer: "Family history impact: First-degree relative with early heart disease (men &lt;55, women &lt;65) increases risk 2-3x. Genetic factors contribute 40-60% of heart disease risk. Specific concerns: Familial hypercholesterolemia (FH): LDL 190-400+, tendon xanthomas, early heart attacks. Inherited cardiomyopathies, arrhythmia syndromes. Action steps: 1) Document detailed family history (age at diagnosis, type of event), 2) Earlier screening (start 20-30 years before relative's age at event), 3) More aggressive targets (LDL &lt;70 mg/dL if strong family history), 4) Consider genetic testing if FH suspected, 5) Screen children if parent has FH, 6) Lifestyle interventions crucial despite genetic risk. Remember: Family history not destiny - 70-90% of heart disease preventable even with genetic predisposition through optimal lifestyle and medical management."
    }
  ];

  const healthCalculators = [
    { name: "Blood Pressure Calculator", link: "/blood-pressure-calculator" },
    { name: "Cholesterol Calculator", link: "/cholesterol-calculator" },
    { name: "Diabetes Risk Calculator", link: "/diabetes-risk-calculator" },
    { name: "BMI Calculator", link: "/bmi-calculator" },
    { name: "Stroke Risk Calculator", link: "/stroke-risk-calculator" },
    { name: "Metabolic Syndrome Calculator", link: "/metabolic-syndrome-calculator" },
    { name: "Heart Age Calculator", link: "/heart-age-calculator" },
    { name: "AFib Stroke Risk Calculator", link: "/afib-risk-calculator" },
    { name: "Calorie Needs Calculator", link: "/calorie-calculator" },
    { name: "Exercise Intensity Calculator", link: "/exercise-intensity" },
    { name: "Stress Test Calculator", link: "/stress-test-calculator" },
    { name: "Cardiac Rehabilitation Planner", link: "/cardiac-rehab" }
  ];

  return (
    <main style={containerStyle}>
      <section style={calculatorBoxStyle}>
        <h1 style={calcTitleStyle}>
          <i className="fas fa-heart"></i> Heart Disease Risk Calculator - Comprehensive Cardiovascular Risk Assessment & Prevention Platform
        </h1>
        <p style={calcDescStyle}>
          Calculate <strong>precise 10-year cardiovascular risk scores, personalized prevention strategies, and evidence-based heart health recommendations</strong> using <strong>advanced algorithmic analysis, comprehensive health data integration, and current clinical practice guidelines</strong>. Essential for <strong>early cardiovascular risk detection, preventive intervention planning, and informed heart health decision-making</strong>.
        </p>

        <div style={inputGridStyle}>
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-user"></i> Age (years) *</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="55"
              min="20"
              max="79"
              step="1"
              style={inputStyle}
              required
            />
            <small style={{ color: '#666', fontSize: '0.8rem' }}>
              20-79 years for accurate risk assessment
            </small>
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
            <label style={inputGroupLabelStyle}><i className="fas fa-tint"></i> Total Cholesterol (mg/dL) *</label>
            <input
              type="number"
              value={totalCholesterol}
              onChange={(e) => setTotalCholesterol(e.target.value)}
              placeholder="200"
              min="100"
              max="400"
              step="1"
              style={inputStyle}
              required
            />
            <small style={{ color: '#666', fontSize: '0.8rem' }}>
              Recent fasting cholesterol level
            </small>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-tint"></i> HDL Cholesterol (mg/dL) *</label>
            <input
              type="number"
              value={hdlCholesterol}
              onChange={(e) => setHdlCholesterol(e.target.value)}
              placeholder="50"
              min="20"
              max="100"
              step="1"
              style={inputStyle}
              required
            />
            <small style={{ color: '#666', fontSize: '0.8rem' }}>
              "Good" cholesterol - higher is better
            </small>
          </div>
        </div>

        <div style={inputGridStyle}>
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-tachometer-alt"></i> Systolic BP (mmHg) *</label>
            <input
              type="number"
              value={systolicBP}
              onChange={(e) => setSystolicBP(e.target.value)}
              placeholder="130"
              min="90"
              max="200"
              step="1"
              style={inputStyle}
              required
            />
            <small style={{ color: '#666', fontSize: '0.8rem' }}>
              Top number - recent average
            </small>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-smoking"></i> Current Smoker</label>
            <select
              value={smoking}
              onChange={(e) => setSmoking(e.target.value)}
              style={selectStyle}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
            <small style={{ color: '#666', fontSize: '0.8rem' }}>
              Any tobacco use in past month
            </small>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-syringe"></i> Diabetes</label>
            <select
              value={diabetes}
              onChange={(e) => setDiabetes(e.target.value)}
              style={selectStyle}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-stethoscope"></i> Hypertension Treatment</label>
            <select
              value={hypertension}
              onChange={(e) => setHypertension(e.target.value)}
              style={selectStyle}
            >
              <option value="no">No</option>
              <option value="yes">Yes (on medication)</option>
            </select>
          </div>
        </div>

        <div style={inputGridStyle}>
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-history"></i> Family History</label>
            <select
              value={familyHistory}
              onChange={(e) => setFamilyHistory(e.target.value)}
              style={selectStyle}
            >
              <option value="no">No early heart disease</option>
              <option value="yes">Yes (parent/sibling before age 55/65)</option>
            </select>
            <small style={{ color: '#666', fontSize: '0.8rem' }}>
              Heart attack in close relative at young age
            </small>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-running"></i> Physical Activity</label>
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              style={selectStyle}
            >
              <option value="sedentary">Sedentary (&lt;30 min/week)</option>
              <option value="lightly_active">Lightly Active (30-90 min/week)</option>
              <option value="moderate">Moderate (90-150 min/week)</option>
              <option value="active">Active (150-300 min/week)</option>
              <option value="very_active">Very Active (&gt;300 min/week)</option>
            </select>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-weight"></i> BMI</label>
            <input
              type="number"
              value={bmi}
              onChange={(e) => setBmi(e.target.value)}
              placeholder="26"
              min="15"
              max="50"
              step="0.1"
              style={inputStyle}
            />
            <small style={{ color: '#666', fontSize: '0.8rem' }}>
              Optional - weight(kg) / height(m)²
            </small>
          </div>
        </div>

        <button
          style={calcBtnStyle}
          onClick={calculateHeartDiseaseRisk}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, calcBtnHoverStyle)}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = calcBtnStyle.background;
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <i className="fas fa-calculator"></i> Calculate 10-Year Heart Disease Risk
        </button>

        {/* Results Display */}
        {results && (
          <div style={resultsContainerStyle}>
            <div style={{ ...resultCardStyle, ...riskScoreCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-chart-line"></i> 10-Year Risk Assessment</h4>
              <div style={{ margin: '20px 0' }}>
                <div style={{ ...resultValueStyle, color: results.color }}>
                  {results.tenYearRisk}%
                </div>
                <div style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 'bold', 
                  color: results.color,
                  marginBottom: '10px'
                }}>
                  {results.category}
                </div>
                <div style={{ 
                  padding: '15px', 
                  background: results.tenYearRisk >= 20 ? '#f8d7da' : 
                            results.tenYearRisk >= 7.6 ? '#fff3cd' : '#d4edda',
                  borderRadius: '8px',
                  color: results.tenYearRisk >= 20 ? '#721c24' : 
                        results.tenYearRisk >= 7.6 ? '#856404' : '#155724',
                  fontWeight: '600',
                  marginBottom: '15px'
                }}>
                  {results.description}
                </div>
                <div style={{ 
                  padding: '10px', 
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  color: '#666'
                }}>
                  <div><strong>Risk Score:</strong> {results.riskScore} points</div>
                  <div><strong>Screening:</strong> {results.screeningRecommendation}</div>
                  <div><strong>Cholesterol Ratio:</strong> {results.totalHdlRatio} (optimal &lt;3.5)</div>
                  <div><strong>Estimated LDL:</strong> {results.estimatedLDL} mg/dL</div>
                </div>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div>Age: {results.age} years | Gender: {results.gender}</div>
                <div>Smoking: {results.smoking} | Diabetes: {results.diabetes}</div>
                <div>Hypertension: {results.hypertension} | Family History: {results.familyHistory}</div>
              </div>
            </div>

            <div style={{ ...resultCardStyle, ...categoryCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-exclamation-triangle"></i> Risk Factors Analysis</h4>
              <div style={{ margin: '20px 0' }}>
                <div style={{ 
                  padding: '15px', 
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  marginBottom: '15px'
                }}>
                  <div style={{ fontSize: '0.9rem', marginBottom: '10px' }}><strong>Identified Risk Factors ({results.riskFactors.length}):</strong></div>
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
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#3498db' }}>{results.modifiableFactors}</div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>Modifiable Factors</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#e74c3c' }}>{results.nonModifiableFactors}</div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>Non-Modifiable</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: results.tenYearRisk >= 7.6 ? '#e74c3c' : '#27ae60' }}>
                      {results.tenYearRisk >= 20 ? 'High' : results.tenYearRisk >= 7.6 ? 'Mod' : 'Low'}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>Intervention Urgency</div>
                  </div>
                </div>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div><strong>Modifiable factors</strong> can be changed through lifestyle/medication</div>
                <div><strong>Non-modifiable factors</strong> require monitoring and aggressive management</div>
                <div>ASCVD risk &ge;7.5% typically indicates need for statin therapy</div>
              </div>
            </div>

            <div style={{ ...resultCardStyle, ...recommendationsCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-clipboard-list"></i> Personalized Recommendations</h4>
              <div style={{ margin: '20px 0', maxHeight: '200px', overflowY: 'auto' }}>
                {results.recommendations.map((rec, index) => (
                  <div key={index} style={{
                    padding: '10px',
                    background: index === 0 && results.tenYearRisk >= 20 ? '#f8d7da' : '#f8f9fa',
                    borderRadius: '6px',
                    marginBottom: '8px',
                    borderLeft: index === 0 ? '4px solid #3498db' : 'none'
                  }}>
                    <div style={{ fontWeight: index === 0 && results.tenYearRisk >= 20 ? 'bold' : 'normal', color: '#2c3e50' }}>
                      {index + 1}. {rec}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div><strong>Next Steps:</strong></div>
                <div>• Schedule appointment with healthcare provider</div>
                <div>• Consider lipid panel and glucose testing</div>
                <div>• Begin lifestyle modifications immediately</div>
                <div>• Discuss medication options if risk &ge;7.5%</div>
              </div>
            </div>

            <div style={{ ...resultCardStyle, ...preventionCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-shield-alt"></i> Prevention Strategies</h4>
              <div style={{ margin: '20px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2ecc71' }}>&lt;100</div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>LDL Target (mg/dL)</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3498db' }}>150+</div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>Exercise Minutes/Week</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#9b59b6' }}>&lt;130/80</div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>BP Target (mmHg)</div>
                  </div>
                </div>
                <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.9rem', marginBottom: '10px' }}><strong>Evidence-Based Strategies:</strong></div>
                  {results.preventionStrategies.slice(0, 4).map((strategy, index) => (
                    <div key={index} style={{
                      padding: '5px 0',
                      borderBottom: index < 3 ? '1px solid #eee' : 'none'
                    }}>
                      <span style={{ fontSize: '0.85rem' }}>• {strategy}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div><strong>Based on major cardiovascular trials:</strong></div>
                <div>• Mediterranean diet reduces events by 30%</div>
                <div>• Statins reduce events by 25-45%</div>
                <div>• BP control reduces stroke by 40%</div>
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
          <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Cardiac health monitoring device</p>
        </div>

        {/* Enhanced SEO Content with High-Value Long-Tail Keywords */}
        <div style={infoSectionStyle}>
          <h3 style={sectionTitleStyle}><i className="fas fa-question-circle"></i> Comprehensive Heart Disease Risk Assessment: Advanced Cardiovascular Health Evaluation Protocol</h3>
          <p style={paragraphStyle}><strong>Heart disease risk calculation methodologies</strong> represent <strong>essential cardiovascular health assessment tools</strong> for determining <strong>precise 10-year atherosclerotic cardiovascular disease probability, optimal preventive intervention timing, and evidence-based cardiovascular risk reduction strategies</strong>. These advanced calculations integrate <strong>sophisticated algorithmic analysis, comprehensive health data parameters, and validated clinical prediction models</strong> to provide <strong>individualized cardiovascular health management approaches</strong> that maximize <strong>heart disease prevention effectiveness while supporting informed health decision-making processes</strong> across diverse clinical scenarios requiring <strong>precision cardiovascular risk stratification protocols</strong>.</p>
          
          <h3 style={sectionTitleStyle}><i className="fas fa-calculator"></i> Advanced Cardiovascular Risk Prediction Algorithms - Comprehensive Heart Health Analysis Formulae</h3>
          <p style={paragraphStyle}>Multiple <strong>validated heart disease risk prediction equations</strong> exist for <strong>comprehensive cardiovascular health management protocols</strong>, each demonstrating specific <strong>clinical applications and variable prediction accuracy profiles</strong> influencing <strong>preventive intervention decision-making processes</strong>:</p>
          
          <div style={formulaBoxStyle}>
            <strong>Framingham Risk Score Algorithm:</strong> Based on age, gender, cholesterol, BP, smoking, diabetes<br/>
            <strong>ASCVD Risk Calculator Protocol:</strong> Pooled cohort equations including race, estimates stroke risk<br/>
            <strong>QRISK3 Calculation Engine:</strong> UK algorithm incorporating additional risk factors and ethnicity<br/>
            <strong>Reynolds Risk Score Formula:</strong> Includes hs-CRP and family history for enhanced prediction<br/>
            <strong>Cholesterol Ratio Calculation:</strong> Total/HDL ratio (optimal &lt;3.5, high risk &gt;5.0)<br/>
            <strong>Clinical Risk Stratification:</strong> Low risk (&lt;5% 10-year), Borderline (5-7.5%), Intermediate (7.5-20%), High (&gt;20%) requiring immediate intervention
          </div>

          <h3 style={sectionTitleStyle}><i className="fas fa-stethoscope"></i> Clinical Applications of Cardiovascular Risk Assessment - Comprehensive Heart Health Management Guidelines</h3>
          <p style={paragraphStyle}>Accurate <strong>heart disease risk assessment methodology implementation</strong> serves critical functions across multiple <strong>cardiovascular specialties and preventive cardiology areas</strong> requiring <strong>precise risk stratification</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Primary Prevention Protocol:</strong> Essential for <strong>statin therapy initiation decisions, aspirin recommendation timing, and lifestyle intervention intensity determination</strong> optimizing <strong>cardiovascular outcomes</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Patient Education Framework:</strong> Guides <strong>personalized risk communication strategies, motivational counseling approaches, and behavioral change support requirements</strong> for improved patient engagement</li>
            <li style={{ marginBottom: '10px' }}><strong>Resource Allocation Optimization:</strong> Determines <strong>cardiovascular screening frequency, preventive medication coverage decisions, and healthcare budget justification</strong> in value-based care models</li>
            <li style={{ marginBottom: '10px' }}><strong>Clinical Trial Recruitment:</strong> Manages <strong>research participant identification, eligibility criteria application, and intervention group stratification</strong> for cardiovascular prevention research</li>
            <li style={{ marginBottom: '10px' }}><strong>Public Health Surveillance:</strong> Coordinates <strong>population cardiovascular risk monitoring, prevention program effectiveness evaluation, and health policy development</strong> for community heart health improvement</li>
            <li style={{ marginBottom: '10px' }}><strong>Workplace Wellness Programs:</strong> Facilitates <strong>employee cardiovascular risk assessment, corporate wellness intervention design, and occupational health outcome measurement</strong> for workforce heart health optimization</li>
            <li><strong>Insurance Underwriting Applications:</strong> Supports <strong>life insurance risk assessment, health insurance premium determination, and disability insurance evaluation</strong> based on cardiovascular risk profiles</li>
          </ul>
          
          <h3 style={sectionTitleStyle}><i className="fas fa-balance-scale"></i> Key Risk Factors in Heart Disease Development - Comprehensive Cardiovascular Assessment Considerations</h3>
          <p style={paragraphStyle}>Multiple <strong>significant modifiable and non-modifiable factors</strong> influence <strong>heart disease risk probability parameters</strong> and require consideration for appropriate clinical interpretation:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Non-Modifiable Determinants:</strong> Age progression patterns, genetic predisposition factors, family history clustering, and gender-specific risk trajectories significantly affect <strong>baseline cardiovascular susceptibility and disease progression pathways</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Lipid Profile Components:</strong> Low-density lipoprotein particle concentration, high-density lipoprotein functionality, triglyceride-rich remnant particles, and lipoprotein(a) levels dramatically alter <strong>atherosclerotic plaque formation and progression rates</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Blood Pressure Dynamics:</strong> Systolic hypertension patterns, diastolic dysfunction presence, pulse pressure elevation, and nocturnal blood pressure dipping abnormalities create <strong>specific cardiovascular strain profiles requiring targeted management</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Metabolic Syndrome Elements:</strong> Insulin resistance severity, visceral adipose tissue distribution, inflammatory marker elevation, and endothelial dysfunction demonstrate <strong>integrated cardiovascular risk amplification patterns</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Lifestyle Behavior Factors:</strong> Tobacco exposure duration and intensity, physical activity patterns and intensity, dietary quality and composition, and sleep duration and architecture affect <strong>cardiovascular health maintenance capabilities</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Socioeconomic Influences:</strong> Educational attainment impact, income status considerations, healthcare access limitations, and neighborhood environment characteristics create <strong>cardiovascular risk disparities requiring public health approaches</strong></li>
            <li><strong>Psychosocial Stressors:</strong> Chronic stress exposure, depression prevalence, social isolation patterns, and work-related strain significantly impact <strong>autonomic nervous system regulation and cardiovascular disease development</strong></li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-exclamation-triangle"></i> Limitations of Heart Disease Risk Prediction - Advanced Cardiovascular Assessment Methodologies</h3>
          <p style={paragraphStyle}>While <strong>heart disease risk prediction methodologies</strong> provide valuable <strong>clinical screening tools</strong>, specific clinical situations necessitate <strong>advanced assessment approaches</strong> and <strong>comprehensive diagnostic protocols</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Extreme Risk Factor Scenarios:</strong> Familial hypercholesterolemia with very high LDL levels, severe hypertension with end-organ damage, and premature cardiovascular disease with genetic syndromes require <strong>specialized evaluation beyond standard algorithms</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Population-Specific Limitations:</strong> Ethnic group prediction accuracy variations, age group applicability constraints, and gender-specific risk pattern differences demonstrate <strong>algorithm performance variations requiring validation</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Novel Risk Marker Integration:</strong> Coronary artery calcium scoring results, carotid intima-media thickness measurements, high-sensitivity C-reactive protein levels, and genetic risk score applications showing <strong>enhanced prediction beyond traditional factors</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Dynamic Risk Trajectories:</strong> Recent smoking cessation, substantial weight loss achievement, medication initiation contexts, and acute illness periods showing <strong>temporary cardiovascular alterations affecting risk accuracy</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Advanced Imaging Requirements:</strong> Stress testing indications, coronary computed tomography angiography applications, cardiac magnetic resonance imaging needs, and echocardiographic evaluation requirements for <strong>definitive cardiovascular assessment</strong></li>
            <li><strong>Precision Medicine Applications:</strong> Polygenic risk score integration, pharmacogenetic testing implementation, and personalized treatment algorithm development for <strong>enhanced individualized cardiovascular management</strong></li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-history"></i> Historical Development of Cardiovascular Prevention Science - Evolution of Heart Health Understanding</h3>
          <p style={paragraphStyle}>The progressive evolution of <strong>heart disease risk assessment and prevention methodologies</strong> reflects <strong>decades of cardiovascular research advancement</strong> and <strong>clinical practice refinement trajectories</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Early Epidemiology Era:</strong> Recognition of <strong>risk factor-disease relationships, population health patterns, and geographic prevalence variations</strong> establishing foundational cardiovascular knowledge</li>
            <li style={{ marginBottom: '10px' }}><strong>Framingham Heart Study Period:</strong> Development of <strong>first cardiovascular risk equations, longitudinal cohort methodology, and multifactorial disease understanding</strong> revolutionizing cardiovascular epidemiology</li>
            <li style={{ marginBottom: '10px' }}><strong>Clinical Trial Revolution:</strong> Introduction of <strong>randomized controlled trial methodology, evidence-based treatment guidelines, and preventive medication effectiveness studies</strong> for enhanced cardiovascular management</li>
            <li style={{ marginBottom: '10px' }}><strong>Risk Score Standardization Phase:</strong> Creation of <strong>Framingham Risk Score, European SCORE system, and UK QRISK algorithms</strong> demonstrating standardized cardiovascular risk assessment approaches</li>
            <li style={{ marginBottom: '10px' }}><strong>Precision Medicine Advancements:</strong> Identification of <strong>novel biomarkers, genetic risk factors, imaging modalities, and personalized treatment approaches</strong> for individualized cardiovascular prevention</li>
            <li><strong>Digital Health Integration:</strong> Implementation of <strong>mobile health applications, wearable monitoring devices, artificial intelligence algorithms, and telehealth platforms</strong> for scalable cardiovascular prevention</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-user-md"></i> Practical Clinical Implementation Recommendations - Comprehensive Cardiovascular Health Management Guidelines</h3>
          <p style={paragraphStyle}>For optimal <strong>heart disease risk assessment implementation</strong> in contemporary clinical practice environments and <strong>evidence-based cardiovascular health protocols</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Systematic Screening Protocol:</strong> Implement <strong>standardized risk assessment for all adults ≥20 years, regular reassessment intervals, and age-specific screening initiation</strong> based on cardiovascular risk profiles</li>
            <li style={{ marginBottom: '10px' }}><strong>Validated Tool Selection:</strong> Utilize <strong>population-appropriate risk calculators, ethnicity-adjusted algorithms, and clinically validated prediction models</strong> for accurate cardiovascular risk stratification</li>
            <li style={{ marginBottom: '10px' }}><strong>Comprehensive Risk Communication:</strong> Develop <strong>patient-centered explanation approaches, visual risk representation methods, and actionable recommendation frameworks</strong> for enhanced patient understanding</li>
            <li style={{ marginBottom: '10px' }}><strong>Structured Prevention Programs:</strong> Implement <strong>evidence-based lifestyle interventions, medication management protocols, and behavioral support systems</strong> for effective cardiovascular prevention</li>
            <li style={{ marginBottom: '10px' }}><strong>Multidisciplinary Care Coordination:</strong> Establish <strong>primary care-cardiology collaboration, nutritionist involvement, exercise specialist consultation, and mental health support integration</strong> for comprehensive management</li>
            <li><strong>Outcome Measurement Systems:</strong> Implement <strong>prevention program effectiveness tracking, cardiovascular event reduction monitoring, and quality improvement protocols</strong> for continuous cardiovascular care optimization</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-chart-line"></i> Future Directions in Cardiovascular Prevention - Emerging Heart Health Technologies</h3>
          <p style={paragraphStyle}>Ongoing <strong>heart disease prevention research initiatives</strong> continue refining <strong>risk assessment and intervention approaches</strong> with promising technological developments and <strong>innovative prevention methodologies</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Advanced Wearable Technologies:</strong> Continuous cardiovascular monitoring devices, smart blood pressure systems, and integrated activity assessment tools for real-time heart health management</li>
            <li style={{ marginBottom: '10px' }}><strong>Artificial Intelligence Applications:</strong> Machine learning algorithm development for <strong>personalized cardiovascular prediction models</strong> incorporating imaging data, genetic information, and behavioral patterns</li>
            <li style={{ marginBottom: '10px' }}><strong>Digital Therapeutics Platforms:</strong> FDA-approved digital cardiovascular prevention programs, mobile cognitive behavioral therapy applications, and gamified lifestyle intervention systems for scalable prevention</li>
            <li style={{ marginBottom: '10px' }}><strong>Novel Pharmacological Interventions:</strong> Next-generation lipid-lowering medications, anti-inflammatory cardiovascular drugs, and targeted metabolic pathway modulators for enhanced prevention efficacy</li>
            <li style={{ marginBottom: '10px' }}><strong>Genetic Profiling Innovations:</strong> Polygenic risk score development, pharmacogenetic testing implementation, and personalized treatment algorithm creation based on <strong>individual genetic profiles</strong></li>
            <li><strong>Integrated Health Systems:</strong> Development of <strong>comprehensive cardiovascular health platforms, population health management approaches, and value-based care models</strong> for optimal heart disease prevention outcomes</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-graduation-cap"></i> Educational Requirements and Professional Training Standards Implementation</h3>
          <p style={paragraphStyle}>Proper <strong>heart disease risk assessment methodology education</strong> represents an <strong>essential clinical competency requirement</strong> for <strong>healthcare professionals</strong> across multiple cardiovascular health disciplines. Comprehensive training curricula should systematically include <strong>cardiovascular physiology principles, risk assessment algorithm application, prevention strategy implementation, and patient counseling techniques</strong>. Continuing medical education programs must consistently address <strong>evolving cardiovascular research findings, changing clinical practice standards, and emerging technological developments</strong> to ensure optimal patient care outcomes and evidence-based practice implementation across diverse healthcare delivery settings and specialty practice areas.</p>

          <h3 style={sectionTitleStyle}><i className="fas fa-clipboard-check"></i> Quality Assurance and Protocol Standardization Implementation</h3>
          <p style={paragraphStyle}>Implementation of <strong>rigorous quality assurance protocols</strong> ensures <strong>consistent cardiovascular health management practices</strong> across diverse healthcare settings. These protocols encompass <strong>risk assessment standardization methodologies, prevention program fidelity monitoring, outcome measurement systems, and clinical guideline implementation requirements</strong> that directly impact <strong>cardiovascular health outcomes and heart disease prevention effectiveness</strong>. Professional organizations should develop <strong>standardized training materials, competency assessment tools, and practice guideline documents</strong> to guarantee consistent clinical application quality across diverse healthcare delivery settings and specialty practice areas, ensuring optimal patient outcomes through evidence-based cardiovascular health management approaches.</p>
        </div>

        {/* Q&A Dropdown Section */}
        <div style={faqSectionStyle}>
          <h2 style={faqTitleStyle}><i className="fas fa-question-circle"></i> Frequently Asked Questions About Heart Disease Risk Assessment</h2>
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
          <p style={paragraphStyle}>Explore our comprehensive collection of <strong>cardiovascular health calculation tools and wellness monitoring calculators</strong> for heart disease prevention and overall health management:</p>
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
          <p style={paragraphStyle}><strong>This heart disease risk calculator provides estimates for educational and informational purposes only.</strong> The calculations are based on statistical models and clinical guidelines and should not be used as a substitute for professional medical advice, diagnosis, or treatment.</p>
          <p style={paragraphStyle}><strong>Medical Emergency Warning:</strong> Chest pain, pressure, tightness, or discomfort; sudden shortness of breath; pain radiating to arm, neck, jaw, or back; nausea, dizziness, or cold sweats constitute possible HEART ATTACK symptoms requiring IMMEDIATE emergency medical attention (call 911). Do not delay seeking emergency care.</p>
          <p style={paragraphStyle}><strong>Risk Assessment Limitations:</strong> Proper cardiovascular risk assessment requires consideration of additional factors not included in this calculator: family history details, inflammatory markers (hs-CRP), chronic kidney disease, sleep apnea, mental health conditions, and social determinants of health. Imaging tests (coronary calcium scoring) may provide additional risk information.</p>
          <p style={paragraphStyle}><strong>Professional Consultation Required:</strong> Always seek the advice of your primary care physician, cardiologist, or other qualified healthcare provider with any questions regarding heart disease risk, cholesterol management, or cardiovascular health. Do not disregard professional medical advice or delay seeking it because of information provided by this calculator.</p>
          <p style={paragraphStyle}><strong>Medication Decisions:</strong> Statin therapy decisions should be made in consultation with a healthcare provider considering individual factors including medication interactions, potential side effects, patient preferences, and comprehensive risk-benefit analysis. Do not start, stop, or change any medication based on calculator results alone.</p>
          <p style={paragraphStyle}><strong>Prevention Program Considerations:</strong> Cardiovascular prevention programs should be evidence-based and preferably include medical supervision, especially for individuals with existing heart conditions or multiple risk factors. Consult with healthcare professionals before starting any intensive exercise program.</p>
          <p style={paragraphStyle}><strong>Regular Monitoring:</strong> Cardiovascular risk changes over time. Regular reassessment (every 4-6 years for low risk, more frequently for higher risk) and appropriate screening tests are necessary for accurate cardiovascular health monitoring.</p>
        </div>
      </section>

      {/* Sidebar with 3 Ads (3rd one sticky) */}
      {showSidebar && (
        <aside style={sidebarStyle}>
          <div style={sidebarContentStyle}>
            <div style={{ ...adSlotStyle, ...sidebarAdStyle }}>
              <p><i className="fas fa-ad"></i> Advertisement 1</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Sponsored Content</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Heart health monitoring system</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>300px height ad slot</p>
            </div>
            
            <div style={{ ...adSlotStyle, ...sidebarAdStyle }}>
              <p><i className="fas fa-ad"></i> Advertisement 2</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Featured Product</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Cardiac rehabilitation program guide</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>300px height ad slot</p>
            </div>
            
            <div style={{ ...adSlotStyle, ...stickyAdStyle }}>
              <p><i className="fas fa-thumbtack"></i> Sticky Advertisement</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Premium Content - Stays visible</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Complete heart health prevention program</p>
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
                <i className="fas fa-mobile-alt"></i> Mobile Heart Health
              </p>
              <p style={{ fontSize: '0.8rem', margin: '5px 0 0 0', color: '#666' }}>
                Get 30% off on premium cardiac monitoring devices
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