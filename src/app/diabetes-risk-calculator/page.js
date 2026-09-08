"use client";

import { useState, useEffect } from 'react';

export default function DiabetesRiskCalculatorPage() {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [waist, setWaist] = useState('');
  const [activity, setActivity] = useState('moderate');
  const [diet, setDiet] = useState('average');
  const [familyHistory, setFamilyHistory] = useState('none');
  const [ethnicity, setEthnicity] = useState('white');
  const [history, setHistory] = useState('none');
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
    background: '#219653',
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

  const riskScoreCardStyle = {
    borderTopColor: '#27ae60'
  };

  const categoryCardStyle = {
    borderTopColor: '#f39c12'
  };

  const recommendationsCardStyle = {
    borderTopColor: '#3498db'
  };

  const preventionCardStyle = {
    borderTopColor: '#9b59b6'
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
    border: '2px solid #27ae60',
    boxShadow: '0 4px 12px rgba(39, 174, 96, 0.15)',
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
    background: '#27ae60',
    color: 'white',
    transform: 'translateY(-3px)',
    boxShadow: '0 5px 15px rgba(39, 174, 96, 0.2)',
    borderColor: '#27ae60'
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

  // Diabetes risk categories
  const riskCategories = [
    { 
      name: 'Very Low Risk', 
      score: { min: 0, max: 10 },
      color: '#2ecc71',
      description: 'Low probability of developing diabetes',
      screening: 'Every 3 years',
      action: 'Maintain healthy lifestyle'
    },
    { 
      name: 'Low Risk', 
      score: { min: 11, max: 20 },
      color: '#3498db',
      description: 'Below average risk',
      screening: 'Every 2 years',
      action: 'Continue preventive measures'
    },
    { 
      name: 'Moderate Risk', 
      score: { min: 21, max: 40 },
      color: '#f1c40f',
      description: 'Average to above average risk',
      screening: 'Annual screening',
      action: 'Lifestyle modifications needed'
    },
    { 
      name: 'High Risk', 
      score: { min: 41, max: 60 },
      color: '#e67e22',
      description: 'Significantly elevated risk',
      screening: 'Every 6-12 months',
      action: 'Consider medical evaluation'
    },
    { 
      name: 'Very High Risk', 
      score: { min: 61, max: 85 },
      color: '#e74c3c',
      description: 'Immediate attention required',
      screening: 'Immediate testing',
      action: 'Seek medical assessment'
    },
    { 
      name: 'Extreme Risk', 
      score: { min: 86, max: 100 },
      color: '#c0392b',
      description: 'Probable prediabetes/diabetes',
      screening: 'Urgent medical attention',
      action: 'Immediate healthcare consultation'
    }
  ];

  // Ethnicity risk multipliers
  const ethnicityMultipliers = {
    'white': 1.0,
    'black': 1.7,
    'hispanic': 1.8,
    'asian': 2.0,
    'native': 2.2,
    'pacific': 2.4
  };

  // Sample data for demo
  useEffect(() => {
    setAge('45');
    setWeight('75');
    setHeight('170');
    setWaist('90');
    setActivity('moderate');
    setDiet('average');
    setFamilyHistory('none');
    setEthnicity('white');
    setHistory('none');

    // Generate sample risk history
    const historyData = [];
    for (let i = 0; i < 6; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const riskScore = Math.floor(Math.random() * 40) + 10;
      const category = riskCategories.find(cat => 
        riskScore >= cat.score.min && riskScore <= cat.score.max
      ) || riskCategories[2];
      
      historyData.push({
        date: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        score: riskScore,
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

  const calculateDiabetesRisk = () => {
    // Validate inputs
    if (!age || !weight || !height || !waist) {
      alert('Please fill in all required fields.');
      return;
    }

    const ageVal = parseInt(age);
    const weightVal = parseFloat(weight);
    const heightVal = parseFloat(height);
    const waistVal = parseFloat(waist);

    if (ageVal < 18 || ageVal > 120) {
      alert('Age should be between 18 and 120 years.');
      return;
    }

    if (weightVal < 30 || weightVal > 300) {
      alert('Weight should be between 30 and 300 kg.');
      return;
    }

    if (heightVal < 100 || heightVal > 250) {
      alert('Height should be between 100 and 250 cm.');
      return;
    }

    if (waistVal < 50 || waistVal > 200) {
      alert('Waist circumference should be between 50 and 200 cm.');
      return;
    }

    // Calculate BMI
    const heightM = heightVal / 100;
    const bmi = weightVal / (heightM * heightM);

    // Calculate base risk score (0-60)
    let riskScore = 0;

    // Age points (0-20)
    if (ageVal < 30) riskScore += 0;
    else if (ageVal < 40) riskScore += 5;
    else if (ageVal < 50) riskScore += 10;
    else if (ageVal < 60) riskScore += 15;
    else riskScore += 20;

    // BMI points (0-15)
    if (bmi < 25) riskScore += 0;
    else if (bmi < 30) riskScore += 5;
    else if (bmi < 35) riskScore += 10;
    else riskScore += 15;

    // Waist circumference points (0-10)
    const genderWaistLimit = gender === 'male' ? 94 : 80;
    if (waistVal < genderWaistLimit) riskScore += 0;
    else if (waistVal < (genderWaistLimit + 10)) riskScore += 5;
    else riskScore += 10;

    // Physical activity points (0-10)
    if (activity === 'very_active') riskScore += 0;
    else if (activity === 'active') riskScore += 2;
    else if (activity === 'moderate') riskScore += 5;
    else if (activity === 'sedentary') riskScore += 8;
    else riskScore += 10;

    // Diet points (0-10)
    if (diet === 'excellent') riskScore += 0;
    else if (diet === 'good') riskScore += 3;
    else if (diet === 'average') riskScore += 6;
    else riskScore += 10;

    // Family history points (0-15)
    if (familyHistory === 'none') riskScore += 0;
    else if (familyHistory === 'grandparent') riskScore += 5;
    else if (familyHistory === 'parent') riskScore += 10;
    else riskScore += 15;

    // Medical history points (0-20)
    if (history === 'none') riskScore += 0;
    else if (history === 'gestational') riskScore += 10;
    else if (history === 'prediabetes') riskScore += 15;
    else riskScore += 20;

    // Apply ethnicity multiplier
    const ethnicityFactor = ethnicityMultipliers[ethnicity] || 1.0;
    riskScore *= ethnicityFactor;

    // Apply gender adjustment
    if (gender === 'female') {
      riskScore *= 0.9; // Slightly lower baseline risk for females
    }

    // Cap score at 100
    riskScore = Math.min(Math.round(riskScore), 100);

    // Determine risk category
    let category = riskCategories[0];
    for (const cat of riskCategories) {
      if (riskScore >= cat.score.min && riskScore <= cat.score.max) {
        category = cat;
        break;
      }
    }

    // Generate personalized recommendations
    const recommendations = [];
    const preventionStrategies = [];

    if (riskScore <= 20) {
      recommendations.push('Maintain current healthy lifestyle habits');
      recommendations.push('Continue regular physical activity');
      recommendations.push('Annual health check-ups');
      recommendations.push('Monitor weight and waist circumference');
      
      preventionStrategies.push('Maintain BMI <25');
      preventionStrategies.push('150 minutes moderate exercise weekly');
      preventionStrategies.push('Balanced diet with fiber');
      preventionStrategies.push('Regular sleep schedule');
    } else if (riskScore <= 40) {
      recommendations.push('Implement lifestyle modifications');
      recommendations.push('Increase physical activity to 150+ minutes/week');
      recommendations.push('Improve diet quality - reduce processed foods');
      recommendations.push('Consider weight loss if BMI ≥25');
      recommendations.push('Annual diabetes screening');
      
      preventionStrategies.push('Weight loss of 5-7% if overweight');
      preventionStrategies.push('Increase fiber intake to 30g/day');
      preventionStrategies.push('Limit added sugars');
      preventionStrategies.push('Strength training 2x/week');
    } else if (riskScore <= 60) {
      recommendations.push('Seek medical evaluation for prediabetes testing');
      recommendations.push('Consider metformin if prediabetes confirmed');
      recommendations.push('Structured lifestyle intervention program');
      recommendations.push('Quarterly follow-up with healthcare provider');
      recommendations.push('Monitor blood glucose levels');
      
      preventionStrategies.push('Intensive lifestyle intervention');
      preventionStrategies.push('Medication consideration under medical guidance');
      preventionStrategies.push('Regular glucose monitoring');
      preventionStrategies.push('Stress management techniques');
    } else {
      recommendations.push('URGENT: Schedule medical appointment immediately');
      recommendations.push('Fasting blood glucose and HbA1c testing required');
      recommendations.push('Possible need for medication intervention');
      recommendations.push('Close monitoring of cardiovascular risk factors');
      recommendations.push('Consider referral to endocrinologist');
      
      preventionStrategies.push('Immediate medical assessment');
      preventionStrategies.push('Comprehensive diabetes screening');
      preventionStrategies.push('Cardiovascular risk assessment');
      preventionStrategies.push('Medication initiation if indicated');
    }

    // Calculate 10-year risk probability
    let tenYearRisk = 0;
    if (riskScore <= 10) tenYearRisk = 1;
    else if (riskScore <= 20) tenYearRisk = 3;
    else if (riskScore <= 30) tenYearRisk = 7;
    else if (riskScore <= 40) tenYearRisk = 15;
    else if (riskScore <= 50) tenYearRisk = 25;
    else if (riskScore <= 60) tenYearRisk = 40;
    else if (riskScore <= 70) tenYearRisk = 60;
    else if (riskScore <= 80) tenYearRisk = 75;
    else tenYearRisk = 85;

    // Identify key risk factors
    const riskFactors = [];
    
    if (ageVal >= 45) riskFactors.push('Age ≥45 years');
    if (bmi >= 25) riskFactors.push(`Overweight (BMI: ${bmi.toFixed(1)})`);
    
    const waistRisk = gender === 'male' ? waistVal >= 94 : waistVal >= 80;
    if (waistRisk) riskFactors.push(`Elevated waist circumference (${waistVal} cm)`);
    
    if (activity === 'sedentary' || activity === 'lightly_active') riskFactors.push('Insufficient physical activity');
    if (diet === 'poor') riskFactors.push('Poor diet quality');
    if (familyHistory !== 'none') riskFactors.push('Family history of diabetes');
    if (history !== 'none') riskFactors.push('Previous gestational diabetes or prediabetes');
    
    const ethnicityText = {
      'white': 'White',
      'black': 'African American',
      'hispanic': 'Hispanic/Latino',
      'asian': 'Asian',
      'native': 'Native American',
      'pacific': 'Pacific Islander'
    };
    
    if (ethnicity !== 'white') {
      riskFactors.push(`${ethnicityText[ethnicity]} ethnicity (increased risk)`);
    }

    // Calculate modifiable vs non-modifiable risk
    const modifiableFactors = riskFactors.filter(factor => 
      !factor.includes('Age') && 
      !factor.includes('Family history') && 
      !factor.includes('ethnicity')
    ).length;
    
    const nonModifiableFactors = riskFactors.length - modifiableFactors;

    setResults({
      riskScore: riskScore,
      category: category.name,
      color: category.color,
      description: category.description,
      tenYearRisk: tenYearRisk,
      bmi: bmi.toFixed(1),
      waistCircumference: waistVal,
      recommendations: recommendations,
      preventionStrategies: preventionStrategies,
      screeningRecommendation: category.screening,
      riskFactors: riskFactors,
      modifiableFactors: modifiableFactors,
      nonModifiableFactors: nonModifiableFactors,
      age: ageVal,
      gender: gender,
      ethnicity: ethnicityText[ethnicity],
      medicalHistory: history,
      familyHistory: familyHistory,
      activityLevel: activity,
      dietQuality: diet,
      riskHistory: riskHistory
    });
  };

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "What's the difference between prediabetes and diabetes risk assessment?",
      answer: "Prediabetes diagnosis requires specific blood tests: fasting glucose 100-125 mg/dL, HbA1c 5.7-6.4%, or OGTT 140-199 mg/dL. Diabetes risk assessment estimates FUTURE probability of developing diabetes based on modifiable/non-modifiable factors. Key differences: 1) Prediabetes = current metabolic state, risk assessment = future probability, 2) Prediabetes requires lab confirmation, risk assessment uses clinical factors, 3) Prediabetes indicates immediate intervention needed, high risk suggests preventive measures. Risk calculators (like FINDRISC, ADA risk test) help identify who needs prediabetes testing. All adults ≥35 should be screened; those with high risk scores need earlier/more frequent testing."
    },
    {
      question: "How accurate are online diabetes risk calculators?",
      answer: "Validated risk calculators (FINDRISC, ADA risk test, QDiabetes) have moderate-high accuracy: Area under curve (AUC) 0.70-0.85 in validation studies. Limitations: 1) Population-specific accuracy varies by ethnicity, 2) May underestimate risk in young adults, 3) Don't replace clinical assessment, 4) Sensitivity 70-80%, specificity 65-75% for detecting prediabetes/diabetes. Most accurate when: Using validated tools, incorporating waist circumference and family history, applying appropriate ethnicity adjustments. Least accurate for: Type 1 diabetes prediction, medication-induced diabetes, monogenic diabetes forms. Always confirm with blood tests (fasting glucose, HbA1c) regardless of risk score."
    },
    {
      question: "Can lifestyle changes really prevent type 2 diabetes?",
      answer: "YES - Major prevention trials prove effectiveness: Diabetes Prevention Program (DPP): 58% reduction with intensive lifestyle (7% weight loss + 150 min/week exercise). Finnish Diabetes Prevention Study: 58% reduction. Da Qing Study: 42-46% reduction. Key elements: 1) Weight loss 5-7% of body weight, 2) Moderate exercise 150 min/week, 3) Dietary changes (reduce fat <30% calories, increase fiber >15g/1000 kcal), 4) Behavioral support. Timeframe: Benefits begin within weeks, maximum at 2-3 years. Maintenance: Requires ongoing lifestyle adherence. Medications: Metformin reduces risk by 31% in high-risk individuals. Combined approach (lifestyle + metformin) most effective for highest risk groups."
    },
    {
      question: "What are the early warning signs of developing diabetes?",
      answer: "Early signs often subtle: 1) Increased thirst/frequent urination, 2) Fatigue/lethargy, 3) Blurred vision, 4) Slow wound healing, 5) Frequent infections, 6) Tingling/numbness hands/feet, 7) Unexplained weight loss (Type 1), 8) Increased hunger. However, 90% of prediabetes and 25% of diabetes cases are ASYMPTOMATIC. That's why screening crucial. Risk-based screening detects earlier than symptom-based approach. High-risk individuals should test regardless of symptoms. American Diabetes Association screening criteria: All adults ≥35, plus younger with risk factors (BMI ≥25, family history, high-risk ethnicity, history gestational diabetes, PCOS, hypertension, dyslipidemia)."
    },
    {
      question: "How does ethnicity affect diabetes risk?",
      answer: "Substantial ethnic disparities exist: Adjusted relative risks vs White population: Pacific Islanders 2-3x, Native Americans 2.2x, Hispanic/Latino 1.8x, African Americans 1.7x, Asian Americans 1.5-2.0x. Key factors: 1) Genetic predisposition (thrifty gene hypothesis), 2) Higher rates of insulin resistance at lower BMI (especially Asians), 3) Cultural dietary patterns, 4) Healthcare access disparities, 5) Socioeconomic factors. Ethnic-specific considerations: Asians develop diabetes at lower BMI thresholds (screen at BMI ≥23), African Americans have higher rates of diabetes complications, Native Americans have highest prevalence rates. Screening guidelines adjusted: Earlier screening (age 25-30) recommended for high-risk ethnic groups."
    },
    {
      question: "What's the connection between belly fat and diabetes risk?",
      answer: "Visceral (belly) fat is metabolically active tissue producing inflammatory cytokines and free fatty acids that cause: 1) Insulin resistance in liver/muscle, 2) Increased hepatic glucose production, 3) Reduced insulin secretion capacity, 4) Chronic inflammation. Waist circumference thresholds: Men ≥94 cm (37 in) increased risk, ≥102 cm (40 in) high risk. Women ≥80 cm (31.5 in) increased risk, ≥88 cm (35 in) high risk. Asians: Lower thresholds (men ≥90 cm, women ≥80 cm). Mechanism: Visceral fat releases adipokines (TNF-α, IL-6) interfering with insulin signaling. Reduction strategy: Even 5-10% weight loss reduces visceral fat 15-30%. Targeted abdominal exercises less effective than overall weight loss for reducing diabetes risk."
    }
  ];

  const healthCalculators = [
    { name: "BMI Calculator", link: "/bmi-calculator" },
    { name: "Blood Pressure Calculator", link: "/blood-pressure-calculator" },
    { name: "Cholesterol Risk Calculator", link: "/cholesterol-calculator" },
    { name: "Metabolic Syndrome Calculator", link: "/metabolic-syndrome-calculator" },
    { name: "Weight Loss Calculator", link: "/weight-loss-calculator" },
    { name: "Calorie Needs Calculator", link: "/calorie-calculator" },
    { name: "Heart Disease Risk Assessment", link: "/heart-risk-calculator" },
    { name: "Kidney Function Calculator", link: "/kidney-function-calculator" },
    { name: "Insulin Resistance Calculator", link: "/insulin-resistance-calculator" },
    { name: "Nutrition & Diet Planner", link: "/nutrition-planner" },
    { name: "Exercise Intensity Calculator", link: "/exercise-intensity" },
    { name: "Health Age Calculator", link: "/health-age-calculator" }
  ];

  return (
    <main style={containerStyle}>
      <section style={calculatorBoxStyle}>
        <h1 style={calcTitleStyle}>
          <i className="fas fa-syringe"></i> Diabetes Risk Calculator - Comprehensive Type 2 Diabetes Prediction & Prevention Assessment Platform
        </h1>
        <p style={calcDescStyle}>
          Calculate <strong>precise diabetes risk scores, personalized prevention strategies, and evidence-based metabolic health recommendations</strong> using <strong>advanced algorithmic analysis, comprehensive health data integration, and current clinical practice guidelines</strong>. Essential for <strong>early diabetes detection, preventive intervention planning, and informed metabolic health decision-making</strong>.
        </p>

        <div style={inputGridStyle}>
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
            <small style={{ color: '#666', fontSize: '0.8rem' }}>
              Risk increases significantly after age 45
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
              <option value="other">Other/Prefer not to say</option>
            </select>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-weight"></i> Weight (kg) *</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="75"
              min="30"
              max="300"
              step="0.1"
              style={inputStyle}
              required
            />
            <small style={{ color: '#666', fontSize: '0.8rem' }}>
              Enter current weight in kilograms
            </small>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-ruler-vertical"></i> Height (cm) *</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="170"
              min="100"
              max="250"
              step="0.1"
              style={inputStyle}
              required
            />
          </div>
        </div>

        <div style={inputGridStyle}>
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-ruler"></i> Waist Circumference (cm) *</label>
            <input
              type="number"
              value={waist}
              onChange={(e) => setWaist(e.target.value)}
              placeholder="90"
              min="50"
              max="200"
              step="0.1"
              style={inputStyle}
              required
            />
            <small style={{ color: '#666', fontSize: '0.8rem' }}>
              Measure at navel level - key indicator of visceral fat
            </small>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-running"></i> Physical Activity Level</label>
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              style={selectStyle}
            >
              <option value="very_active">Very Active (6+ hrs/week)</option>
              <option value="active">Active (3-5 hrs/week)</option>
              <option value="moderate">Moderate (1-2 hrs/week)</option>
              <option value="lightly_active">Lightly Active (&lt;1 hr/week)</option>
              <option value="sedentary">Sedentary (minimal exercise)</option>
            </select>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-utensils"></i> Diet Quality</label>
            <select
              value={diet}
              onChange={(e) => setDiet(e.target.value)}
              style={selectStyle}
            >
              <option value="excellent">Excellent (mostly whole foods)</option>
              <option value="good">Good (balanced diet)</option>
              <option value="average">Average (mixed quality)</option>
              <option value="poor">Poor (high processed foods)</option>
            </select>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-history"></i> Family History</label>
            <select
              value={familyHistory}
              onChange={(e) => setFamilyHistory(e.target.value)}
              style={selectStyle}
            >
              <option value="none">No family history</option>
              <option value="grandparent">Grandparent with diabetes</option>
              <option value="parent">Parent with diabetes</option>
              <option value="both">Both parents with diabetes</option>
              <option value="sibling">Sibling with diabetes</option>
            </select>
          </div>
        </div>

        <div style={inputGridStyle}>
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-globe-americas"></i> Ethnicity</label>
            <select
              value={ethnicity}
              onChange={(e) => setEthnicity(e.target.value)}
              style={selectStyle}
            >
              <option value="white">White/Caucasian</option>
              <option value="black">Black/African American</option>
              <option value="hispanic">Hispanic/Latino</option>
              <option value="asian">Asian</option>
              <option value="native">Native American</option>
              <option value="pacific">Pacific Islander</option>
            </select>
            <small style={{ color: '#666', fontSize: '0.8rem' }}>
              Some ethnic groups have higher diabetes risk
            </small>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-file-medical"></i> Medical History</label>
            <select
              value={history}
              onChange={(e) => setHistory(e.target.value)}
              style={selectStyle}
            >
              <option value="none">None significant</option>
              <option value="gestational">Previous gestational diabetes</option>
              <option value="prediabetes">Diagnosed prediabetes</option>
              <option value="pcos">Polycystic ovary syndrome (PCOS)</option>
              <option value="hypertension">High blood pressure</option>
              <option value="cholesterol">High cholesterol</option>
            </select>
          </div>
        </div>

        <button
          style={calcBtnStyle}
          onClick={calculateDiabetesRisk}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, calcBtnHoverStyle)}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = calcBtnStyle.background;
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <i className="fas fa-calculator"></i> Calculate Diabetes Risk Score
        </button>

        {/* Results Display */}
        {results && (
          <div style={resultsContainerStyle}>
            <div style={{ ...resultCardStyle, ...riskScoreCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-chart-line"></i> Diabetes Risk Assessment</h4>
              <div style={{ margin: '20px 0' }}>
                <div style={{ ...resultValueStyle, color: results.color }}>
                  {results.riskScore}/100
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
                  background: results.riskScore >= 60 ? '#f8d7da' : 
                            results.riskScore >= 40 ? '#fff3cd' : '#d4edda',
                  borderRadius: '8px',
                  color: results.riskScore >= 60 ? '#721c24' : 
                        results.riskScore >= 40 ? '#856404' : '#155724',
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
                  <div><strong>10-Year Risk:</strong> {results.tenYearRisk}% probability</div>
                  <div><strong>Screening:</strong> {results.screeningRecommendation}</div>
                  <div><strong>BMI:</strong> {results.bmi} ({results.bmi >= 25 ? 'Overweight' : 'Normal'})</div>
                  <div><strong>Waist:</strong> {results.waistCircumference} cm</div>
                </div>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div>Age: {results.age} years | Gender: {results.gender}</div>
                <div>Ethnicity: {results.ethnicity}</div>
                <div>Family History: {results.familyHistory}</div>
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
                    <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#27ae60' }}>{results.riskScore >= 40 ? 'High' : 'Low'}</div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>Intervention Urgency</div>
                  </div>
                </div>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div><strong>Modifiable factors</strong> can be changed through lifestyle</div>
                <div><strong>Non-modifiable factors</strong> require monitoring and management</div>
                <div>Focus on changing modifiable factors first</div>
              </div>
            </div>

            <div style={{ ...resultCardStyle, ...recommendationsCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-clipboard-list"></i> Personalized Recommendations</h4>
              <div style={{ margin: '20px 0', maxHeight: '200px', overflowY: 'auto' }}>
                {results.recommendations.map((rec, index) => (
                  <div key={index} style={{
                    padding: '10px',
                    background: index === 0 && results.riskScore >= 60 ? '#f8d7da' : '#f8f9fa',
                    borderRadius: '6px',
                    marginBottom: '8px',
                    borderLeft: index === 0 ? '4px solid #3498db' : 'none'
                  }}>
                    <div style={{ fontWeight: index === 0 && results.riskScore >= 60 ? 'bold' : 'normal', color: '#2c3e50' }}>
                      {index + 1}. {rec}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div><strong>Next Steps:</strong></div>
                <div>• Schedule appointment with healthcare provider</div>
                <div>• Consider fasting blood glucose test</div>
                <div>• Begin lifestyle modifications immediately</div>
                <div>• Join diabetes prevention program if available</div>
              </div>
            </div>

            <div style={{ ...resultCardStyle, ...preventionCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-shield-alt"></i> Prevention Strategies</h4>
              <div style={{ margin: '20px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2ecc71' }}>5-7%</div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>Weight Loss Target</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3498db' }}>150+</div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>Minutes Exercise/Week</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#9b59b6' }}>58%</div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>Risk Reduction</div>
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
                <div><strong>Based on Diabetes Prevention Program research:</strong></div>
                <div>• Intensive lifestyle reduces risk by 58%</div>
                <div>• Metformin reduces risk by 31%</div>
                <div>• Effects maintained for at least 10 years</div>
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
          <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Diabetes prevention program enrollment</p>
        </div>

        {/* Enhanced SEO Content with High-Value Long-Tail Keywords */}
        <div style={infoSectionStyle}>
          <h3 style={sectionTitleStyle}><i className="fas fa-question-circle"></i> Comprehensive Diabetes Risk Assessment: Advanced Metabolic Health Evaluation Protocol</h3>
          <p style={paragraphStyle}><strong>Diabetes risk calculation methodologies</strong> represent <strong>essential metabolic health assessment tools</strong> for determining <strong>precise prediabetes probability, optimal preventive intervention timing, and evidence-based diabetes prevention strategies</strong>. These advanced calculations integrate <strong>sophisticated algorithmic analysis, comprehensive health data parameters, and validated clinical prediction models</strong> to provide <strong>individualized metabolic health management approaches</strong> that maximize <strong>diabetes prevention effectiveness while supporting informed health decision-making processes</strong> across diverse clinical scenarios requiring <strong>precision metabolic risk stratification protocols</strong>.</p>
          
          <h3 style={sectionTitleStyle}><i className="fas fa-calculator"></i> Advanced Diabetes Risk Prediction Algorithms - Comprehensive Metabolic Health Analysis Formulae</h3>
          <p style={paragraphStyle}>Multiple <strong>validated diabetes risk prediction equations</strong> exist for <strong>comprehensive metabolic health management protocols</strong>, each demonstrating specific <strong>clinical applications and variable prediction accuracy profiles</strong> influencing <strong>preventive intervention decision-making processes</strong>:</p>
          
          <div style={formulaBoxStyle}>
            <strong>FINDRISC Algorithm Protocol:</strong> Score = Age + BMI + Waist + Activity + Diet + Family History<br/>
            <strong>ADA Risk Test Formula:</strong> Based on age, gender, family history, hypertension, activity, BMI<br/>
            <strong>QDiabetes Risk Engine:</strong> Incorporates ethnicity, smoking status, cardiovascular disease, steroids<br/>
            <strong>Metabolic Syndrome Criteria:</strong> &ge;3 of: waist circumference, triglycerides, HDL, blood pressure, fasting glucose<br/>
            <strong>Insulin Resistance Calculation:</strong> HOMA-IR = (Fasting insulin × Fasting glucose) / 405<br/>
            <strong>Clinical Risk Stratification:</strong> Low risk (&lt;5% 10-year), Intermediate (5-20%), High (&gt;20%) requiring immediate intervention
          </div>

          <h3 style={sectionTitleStyle}><i className="fas fa-stethoscope"></i> Clinical Applications of Diabetes Risk Assessment - Comprehensive Metabolic Health Management Guidelines</h3>
          <p style={paragraphStyle}>Accurate <strong>diabetes risk assessment methodology implementation</strong> serves critical functions across multiple <strong>metabolic health specialties and preventive medicine areas</strong> requiring <strong>precise risk stratification</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Population Screening Protocol:</strong> Essential for <strong>identifying high-risk individuals, optimizing screening resource allocation, and implementing targeted prevention programs</strong> within healthcare systems</li>
            <li style={{ marginBottom: '10px' }}><strong>Preventive Intervention Planning:</strong> Guides <strong>lifestyle modification intensity determination, medication consideration timing, and follow-up monitoring frequency</strong> for enhanced diabetes prevention</li>
            <li style={{ marginBottom: '10px' }}><strong>Patient Education Framework:</strong> Determines <strong>personalized risk communication strategies, motivational counseling approaches, and behavioral change support requirements</strong> for improved patient engagement</li>
            <li style={{ marginBottom: '10px' }}><strong>Resource Allocation Optimization:</strong> Essential for <strong>diabetes prevention program enrollment prioritization, healthcare budget justification, and preventive service coverage decisions</strong> in value-based care models</li>
            <li style={{ marginBottom: '10px' }}><strong>Clinical Trial Recruitment:</strong> Manages <strong>research participant identification, eligibility criteria application, and intervention group stratification</strong> for diabetes prevention research studies</li>
            <li style={{ marginBottom: '10px' }}><strong>Public Health Surveillance:</strong> Coordinates <strong>population diabetes risk monitoring, prevention program effectiveness evaluation, and health policy development</strong> for community metabolic health improvement</li>
            <li><strong>Workplace Wellness Programs:</strong> Facilitates <strong>employee health risk assessment, corporate wellness intervention design, and occupational health outcome measurement</strong> for workforce metabolic health optimization</li>
          </ul>
          
          <h3 style={sectionTitleStyle}><i className="fas fa-balance-scale"></i> Key Risk Factors in Diabetes Development - Comprehensive Metabolic Assessment Considerations</h3>
          <p style={paragraphStyle}>Multiple <strong>significant modifiable and non-modifiable factors</strong> influence <strong>diabetes risk probability parameters</strong> and require consideration for appropriate clinical interpretation:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Non-Modifiable Determinants:</strong> Genetic predisposition (thrifty gene hypothesis), ethnic background variations, family history patterns, and age-related metabolic changes significantly affect <strong>baseline diabetes susceptibility and progression trajectories</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Metabolic Syndrome Components:</strong> Central obesity measurements, dyslipidemia patterns, hypertension presence, and fasting glucose elevations dramatically alter <strong>insulin resistance development and beta-cell function deterioration</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Lifestyle Behavior Factors:</strong> Physical inactivity levels, dietary quality patterns, sleep duration adequacy, and stress management effectiveness create <strong>specific metabolic impact profiles requiring targeted interventions</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Medical History Elements:</strong> Previous gestational diabetes episodes, polycystic ovary syndrome diagnosis, cardiovascular disease history, and medication exposure demonstrate <strong>unique risk amplification patterns</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Socioeconomic Influences:</strong> Educational attainment levels, income status considerations, healthcare access limitations, and food environment characteristics affect <strong>preventive behavior adoption and disease management capabilities</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Environmental Exposures:</strong> Endocrine disrupting chemicals, air pollution levels, circadian rhythm disruptions, and microbiome alterations create <strong>novel diabetes risk pathways requiring contemporary assessment</strong></li>
            <li><strong>Psychological Factors:</strong> Depression prevalence, anxiety disorder presence, psychological stress loads, and eating behavior patterns significantly impact <strong>metabolic regulation and diabetes development risk</strong></li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-exclamation-triangle"></i> Limitations of Diabetes Risk Prediction - Advanced Metabolic Assessment Methodologies</h3>
          <p style={paragraphStyle}>While <strong>diabetes risk prediction methodologies</strong> provide valuable <strong>clinical screening tools</strong>, specific clinical situations necessitate <strong>advanced assessment approaches</strong> and <strong>comprehensive diagnostic protocols</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Atypical Diabetes Presentations:</strong> Latent autoimmune diabetes in adults (LADA), monogenic diabetes forms (MODY), and secondary diabetes causes require <strong>specialized diagnostic evaluation beyond risk prediction</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Population-Specific Limitations:</strong> Ethnic group prediction accuracy variations, age group applicability constraints, and gender-specific risk pattern differences demonstrate <strong>algorithm performance variations requiring validation</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Dynamic Risk Trajectories:</strong> Rapid weight change scenarios, medication initiation contexts, and acute illness periods showing <strong>temporary metabolic alterations affecting risk accuracy</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Laboratory Confirmation Requirements:</strong> Fasting glucose testing necessity, oral glucose tolerance test indications, and hemoglobin A1c measurement requirements for <strong>definitive prediabetes/diabetes diagnosis</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Comorbidity Integration Challenges:</strong> Chronic kidney disease presence, liver dysfunction contexts, and inflammatory condition impacts demonstrating <strong>complex metabolic interactions</strong></li>
            <li><strong>Precision Medicine Applications:</strong> Genetic testing integration, biomarker panel utilization, and machine learning algorithm development for <strong>enhanced individualized risk prediction</strong></li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-history"></i> Historical Development of Diabetes Prevention Science - Evolution of Metabolic Health Understanding</h3>
          <p style={paragraphStyle}>The progressive evolution of <strong>diabetes risk assessment and prevention methodologies</strong> reflects <strong>decades of metabolic research advancement</strong> and <strong>clinical practice refinement trajectories</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Early Epidemiology Era:</strong> Recognition of <strong>obesity-diabetes connection, family clustering patterns, and geographic prevalence variations</strong> establishing foundational diabetes knowledge</li>
            <li style={{ marginBottom: '10px' }}><strong>Insulin Discovery Period:</strong> Development of <strong>diabetes treatment approaches, metabolic pathway understanding, and hormonal regulation concepts</strong> revolutionizing diabetes management</li>
            <li style={{ marginBottom: '10px' }}><strong>Risk Factor Identification Phase:</strong> Introduction of <strong>standardized diagnostic criteria, metabolic syndrome definition, and cardiovascular risk integration</strong> for comprehensive assessment</li>
            <li style={{ marginBottom: '10px' }}><strong>Prevention Trial Revolution:</strong> Creation of <strong>Diabetes Prevention Program, Finnish Diabetes Prevention Study, and Da Qing Diabetes Prevention Study</strong> demonstrating lifestyle intervention effectiveness</li>
            <li style={{ marginBottom: '10px' }}><strong>Genetic Research Advancements:</strong> Identification of <strong>diabetes susceptibility genes, polygenic risk score development, and precision medicine applications</strong> for personalized prevention</li>
            <li><strong>Digital Health Integration:</strong> Implementation of <strong>mobile health applications, continuous glucose monitoring systems, artificial intelligence algorithms, and telehealth platforms</strong> for scalable diabetes prevention</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-user-md"></i> Practical Clinical Implementation Recommendations - Comprehensive Metabolic Health Management Guidelines</h3>
          <p style={paragraphStyle}>For optimal <strong>diabetes risk assessment implementation</strong> in contemporary clinical practice environments and <strong>evidence-based metabolic health protocols</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Systematic Screening Protocol:</strong> Implement <strong>standardized risk assessment for all adults ≥35 years, earlier screening for high-risk groups, and regular reassessment intervals</strong> based on initial risk category</li>
            <li style={{ marginBottom: '10px' }}><strong>Validated Tool Selection:</strong> Utilize <strong>population-appropriate risk calculators, ethnicity-adjusted algorithms, and clinically validated prediction models</strong> for accurate risk stratification</li>
            <li style={{ marginBottom: '10px' }}><strong>Comprehensive Risk Communication:</strong> Develop <strong>patient-centered explanation approaches, visual risk representation methods, and actionable recommendation frameworks</strong> for enhanced patient understanding</li>
            <li style={{ marginBottom: '10px' }}><strong>Structured Prevention Programs:</strong> Implement <strong>evidence-based lifestyle interventions, medication consideration protocols, and behavioral support systems</strong> for effective diabetes prevention</li>
            <li style={{ marginBottom: '10px' }}><strong>Multidisciplinary Care Coordination:</strong> Establish <strong>primary care-endocrinology collaboration, nutritionist involvement, exercise specialist consultation, and mental health support integration</strong> for comprehensive management</li>
            <li><strong>Outcome Measurement Systems:</strong> Implement <strong>prevention program effectiveness tracking, cardiovascular risk reduction monitoring, and quality improvement protocols</strong> for continuous metabolic care optimization</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-chart-line"></i> Future Directions in Diabetes Prevention - Emerging Metabolic Health Technologies</h3>
          <p style={paragraphStyle}>Ongoing <strong>diabetes prevention research initiatives</strong> continue refining <strong>risk assessment and intervention approaches</strong> with promising technological developments and <strong>innovative prevention methodologies</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Advanced Wearable Technologies:</strong> Continuous metabolic monitoring devices, smart nutrition tracking systems, and integrated activity assessment tools for real-time metabolic health management</li>
            <li style={{ marginBottom: '10px' }}><strong>Artificial Intelligence Applications:</strong> Machine learning algorithm development for <strong>personalized diabetes prediction models</strong> incorporating multi-omics data, environmental exposures, and behavioral patterns</li>
            <li style={{ marginBottom: '10px' }}><strong>Digital Therapeutics Platforms:</strong> FDA-approved digital diabetes prevention programs, mobile cognitive behavioral therapy applications, and gamified lifestyle intervention systems for scalable prevention</li>
            <li style={{ marginBottom: '10px' }}><strong>Precision Nutrition Approaches:</strong> Individualized dietary recommendation algorithms, microbiome-based nutrition guidance, and genetic eating pattern optimization for personalized metabolic health</li>
            <li style={{ marginBottom: '10px' }}><strong>Novel Pharmacological Interventions:</strong> Next-generation diabetes prevention medications, combination therapy approaches, and targeted metabolic pathway modulators for enhanced prevention efficacy</li>
            <li><strong>Integrated Health Systems:</strong> Development of <strong>comprehensive metabolic health platforms, population health management approaches, and value-based care models</strong> for optimal diabetes prevention outcomes</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-graduation-cap"></i> Educational Requirements and Professional Training Standards Implementation</h3>
          <p style={paragraphStyle}>Proper <strong>diabetes risk assessment methodology education</strong> represents an <strong>essential clinical competency requirement</strong> for <strong>healthcare professionals</strong> across multiple metabolic health disciplines. Comprehensive training curricula should systematically include <strong>metabolic physiology principles, risk assessment algorithm application, prevention strategy implementation, and patient counseling techniques</strong>. Continuing medical education programs must consistently address <strong>evolving metabolic research findings, changing clinical practice standards, and emerging technological developments</strong> to ensure optimal patient care outcomes and evidence-based practice implementation across diverse healthcare delivery settings and specialty practice areas.</p>

          <h3 style={sectionTitleStyle}><i className="fas fa-clipboard-check"></i> Quality Assurance and Protocol Standardization Implementation</h3>
          <p style={paragraphStyle}>Implementation of <strong>rigorous quality assurance protocols</strong> ensures <strong>consistent metabolic health management practices</strong> across diverse healthcare settings. These protocols encompass <strong>risk assessment standardization methodologies, prevention program fidelity monitoring, outcome measurement systems, and clinical guideline implementation requirements</strong> that directly impact <strong>metabolic health outcomes and diabetes prevention effectiveness</strong>. Professional organizations should develop <strong>standardized training materials, competency assessment tools, and practice guideline documents</strong> to guarantee consistent clinical application quality across diverse healthcare delivery settings and specialty practice areas, ensuring optimal patient outcomes through evidence-based metabolic health management approaches.</p>
        </div>

        {/* Q&A Dropdown Section */}
        <div style={faqSectionStyle}>
          <h2 style={faqTitleStyle}><i className="fas fa-question-circle"></i> Frequently Asked Questions About Diabetes Risk Assessment</h2>
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
          <h3 style={sectionTitleStyle}><i className="fas fa-calculator"></i> Related Health & Metabolic Calculators</h3>
          <p style={paragraphStyle}>Explore our comprehensive collection of <strong>metabolic health calculation tools and wellness monitoring calculators</strong> for diabetes prevention and overall health management:</p>
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
          <p style={paragraphStyle}><strong>This diabetes risk calculator provides estimates for educational and informational purposes only.</strong> The calculations are based on statistical models and clinical guidelines and should not be used as a substitute for professional medical advice, diagnosis, or treatment.</p>
          <p style={paragraphStyle}><strong>Screening and Diagnosis Limitations:</strong> Proper diabetes diagnosis requires laboratory testing (fasting blood glucose, oral glucose tolerance test, or hemoglobin A1c). Risk calculators identify individuals who should undergo testing but cannot diagnose diabetes or prediabetes.</p>
          <p style={paragraphStyle}><strong>Professional Consultation Required:</strong> Always seek the advice of your primary care physician, endocrinologist, or other qualified healthcare provider with any questions regarding diabetes risk, prediabetes, or metabolic health. Do not disregard professional medical advice or delay seeking it because of information provided by this calculator.</p>
          <p style={paragraphStyle}><strong>Prevention Program Considerations:</strong> Diabetes prevention programs should be evidence-based and preferably modeled after the Diabetes Prevention Program (DPP). Consult with healthcare professionals before starting any intensive lifestyle intervention program, especially if you have existing medical conditions.</p>
          <p style={paragraphStyle}><strong>Medication Decisions:</strong> Medication considerations for diabetes prevention (such as metformin) should be made in consultation with a healthcare provider considering individual factors including kidney function, potential side effects, and personal health goals.</p>
          <p style={paragraphStyle}><strong>Emergency Situations:</strong> If you experience symptoms of very high blood sugar (extreme thirst, frequent urination, fatigue, blurred vision, unexplained weight loss), seek medical attention immediately regardless of risk calculator results.</p>
          <p style={paragraphStyle}><strong>Regular Monitoring:</strong> Diabetes risk changes over time. Regular reassessment (annually for average risk, more frequently for high risk) and appropriate screening tests are necessary for accurate metabolic health monitoring.</p>
        </div>
      </section>

      {/* Sidebar with 3 Ads (3rd one sticky) */}
      {showSidebar && (
        <aside style={sidebarStyle}>
          <div style={sidebarContentStyle}>
            <div style={{ ...adSlotStyle, ...sidebarAdStyle }}>
              <p><i className="fas fa-ad"></i> Advertisement 1</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Sponsored Content</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Diabetes prevention nutrition guide</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>300px height ad slot</p>
            </div>
            
            <div style={{ ...adSlotStyle, ...sidebarAdStyle }}>
              <p><i className="fas fa-ad"></i> Advertisement 2</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Featured Product</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Continuous glucose monitor system</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>300px height ad slot</p>
            </div>
            
            <div style={{ ...adSlotStyle, ...stickyAdStyle }}>
              <p><i className="fas fa-thumbtack"></i> Sticky Advertisement</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Premium Content - Stays visible</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Complete diabetes prevention program</p>
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
                Join diabetes prevention program - First month free
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
              Learn More
            </button>
          </div>
        </div>
      )}
    </main>
  );
}