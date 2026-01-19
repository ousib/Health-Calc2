"use client";

import { useState, useEffect } from 'react';

export default function PregnancyTestCalculatorPage() {
  const [lastPeriod, setLastPeriod] = useState('');
  const [cycleLength, setCycleLength] = useState('28');
  const [testDate, setTestDate] = useState('');
  const [testType, setTestType] = useState('urine');
  const [testSensitivity, setTestSensitivity] = useState('25');
  const [symptoms, setSymptoms] = useState([]);
  const [medications, setMedications] = useState([]);
  const [previousPregnancies, setPreviousPregnancies] = useState('0');
  const [age, setAge] = useState('');
  const [results, setResults] = useState(null);
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
    background: '#e84393',
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
    background: '#fd79a8',
    transform: 'translateY(-2px)',
    boxShadow: '0 5px 15px rgba(232, 67, 147, 0.2)'
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

  

  const pregnancyCardStyle = {
    borderTopColor: '#e84393'
  };

  const timelineCardStyle = {
    borderTopColor: '#0984e3'
  };

  const accuracyCardStyle = {
    borderTopColor: '#00b894'
  };

  const symptomsCardStyle = {
    borderTopColor: '#fdcb6e'
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
    borderLeft: '4px solid #e84393',
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
    background: '#ffeef5',
    border: '2px solid #e84393',
    boxShadow: '0 4px 12px rgba(232, 67, 147, 0.15)',
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
    borderTop: '2px solid #e84393',
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
    background: '#e84393',
    color: 'white',
    transform: 'translateY(-3px)',
    boxShadow: '0 5px 15px rgba(232, 67, 147, 0.2)',
    borderColor: '#e84393'
  };

  const medicalDisclaimerStyle = {
    margin: '40px 0',
    padding: '25px',
    background: '#fff0f7',
    borderRadius: '10px',
    borderLeft: '5px solid #e84393',
    fontSize: '0.9rem',
    color: '#666'
  };

  const disclaimerTitleStyle = {
    color: '#fd79a8',
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  // Symptom options
  const symptomOptions = [
    'Missed period',
    'Nausea/morning sickness',
    'Breast tenderness',
    'Fatigue',
    'Frequent urination',
    'Food cravings/aversions',
    'Mood swings',
    'Light spotting',
    'Cramping',
    'Heightened sense of smell'
  ];

  // Medication options that can affect tests
  const medicationOptions = [
    'Fertility drugs (hCG injections)',
    'Antipsychotics',
    'Anticonvulsants',
    'Diuretics',
    'Tranquilizers',
    'Promethazine',
    'Methadone',
    'None of the above'
  ];

  // Test sensitivity data
  const testSensitivities = {
    '10': 'Early detection (10 mIU/mL)',
    '25': 'Standard (25 mIU/mL)',
    '50': 'Basic (50 mIU/mL)',
    '100': 'Less sensitive (100 mIU/mL)'
  };

  // Sample data for demo
  useEffect(() => {
    const today = new Date();
    const lastPeriodDate = new Date(today);
    lastPeriodDate.setDate(today.getDate() - 35);
    
    setLastPeriod(lastPeriodDate.toISOString().split('T')[0]);
    setCycleLength('28');
    setTestDate(today.toISOString().split('T')[0]);
    setTestType('urine');
    setTestSensitivity('25');
    setSymptoms(['Missed period', 'Breast tenderness']);
    setMedications(['None of the above']);
    setPreviousPregnancies('0');
    setAge('28');

    // Generate sample history
    const historyData = [];
    for (let i = 0; i < 4; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - i * 3);
      const testResults = ['Positive', 'Negative', 'Invalid', 'Positive'];
      
      historyData.push({
        date: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        result: testResults[i],
        cycleDay: Math.floor(Math.random() * 10) + 25,
        sensitivity: ['10', '25', '50', '25'][i]
      });
    }
    setHistory(historyData);
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

  const calculatePregnancyTestResults = () => {
    // Validate inputs
    if (!lastPeriod || !testDate) {
      alert('Please fill in Last Menstrual Period and Test Date.');
      return;
    }

    const lastPeriodDate = new Date(lastPeriod);
    const testDateObj = new Date(testDate);
    const cycleLengthVal = parseInt(cycleLength);
    const testSensitivityVal = parseInt(testSensitivity);
    const previousPregnanciesVal = parseInt(previousPregnancies);
    const ageVal = age ? parseInt(age) : null;

    // Validate dates
    if (lastPeriodDate > testDateObj) {
      alert('Test date must be after last menstrual period date.');
      return;
    }

    if (cycleLengthVal < 21 || cycleLengthVal > 45) {
      alert('Cycle length should be between 21 and 45 days.');
      return;
    }

    // Calculate days since last period
    const timeDiff = testDateObj.getTime() - lastPeriodDate.getTime();
    const daysSincePeriod = Math.floor(timeDiff / (1000 * 3600 * 24));
    
    // Calculate estimated conception date (approx 14 days before next period)
    const nextPeriodDate = new Date(lastPeriodDate);
    nextPeriodDate.setDate(nextPeriodDate.getDate() + cycleLengthVal);
    const estimatedConception = new Date(nextPeriodDate);
    estimatedConception.setDate(estimatedConception.getDate() - 14);
    
    // Calculate estimated due date (40 weeks from last period)
    const estimatedDueDate = new Date(lastPeriodDate);
    estimatedDueDate.setDate(estimatedDueDate.getDate() + 280); // 40 weeks
    
    // Calculate days past ovulation (DPO)
    const ovulationDate = new Date(lastPeriodDate);
    ovulationDate.setDate(ovulationDate.getDate() + (cycleLengthVal - 14));
    const daysPastOvulation = Math.floor((testDateObj.getTime() - ovulationDate.getTime()) / (1000 * 3600 * 24));
    
    // Calculate gestational age in weeks
    const gestationalWeeks = Math.floor(daysSincePeriod / 7);
    const gestationalDays = daysSincePeriod % 7;
    
    // Calculate hCG levels based on DPO
    let estimatedHCG = 0;
    let hcgConfidence = 'Low';
    
    if (daysPastOvulation > 0) {
      // Typical hCG doubling every 48-72 hours
      estimatedHCG = 5 * Math.pow(2, daysPastOvulation / 2.5);
      if (estimatedHCG > 100000) estimatedHCG = 100000;
      
      if (daysPastOvulation > 14) hcgConfidence = 'High';
      else if (daysPastOvulation > 10) hcgConfidence = 'Moderate';
    }
    
    // Determine test accuracy based on DPO and test sensitivity
    let testAccuracy = 0;
    let resultInterpretation = '';
    let resultColor = '';
    
    if (daysPastOvulation < 8) {
      testAccuracy = 50;
      resultInterpretation = 'Too Early to Test';
      resultColor = '#f39c12';
    } else if (daysPastOvulation >= 8 && daysPastOvulation <= 10) {
      testAccuracy = 75;
      resultInterpretation = 'Possible Early Detection';
      resultColor = '#3498db';
    } else if (daysPastOvulation > 10 && daysPastOvulation <= 14) {
      testAccuracy = 90;
      resultInterpretation = 'Likely Accurate';
      resultColor = '#2ecc71';
    } else if (daysPastOvulation > 14) {
      testAccuracy = 99;
      resultInterpretation = 'Highly Accurate';
      resultColor = '#2ecc71';
    }
    
    // Adjust accuracy based on test sensitivity
    if (testSensitivityVal === 10) testAccuracy += 5;
    else if (testSensitivityVal === 50) testAccuracy -= 10;
    else if (testSensitivityVal === 100) testAccuracy -= 20;
    
    // Adjust for urine vs blood test
    if (testType === 'blood') testAccuracy += 5;
    
    // Calculate probability of detection
    const detectionProbability = Math.min(99, Math.max(1, testAccuracy));
    
    // Check if hCG level is above test sensitivity
    const hcgAboveThreshold = estimatedHCG >= testSensitivityVal;
    
    // Calculate false positive/negative risks
    let falsePositiveRisk = 1;
    let falseNegativeRisk = 10;
    
    if (daysPastOvulation > 14) {
      falsePositiveRisk = 0.5;
      falseNegativeRisk = 1;
    } else if (daysPastOvulation > 10) {
      falsePositiveRisk = 1;
      falseNegativeRisk = 5;
    }
    
    // Adjust for medications
    if (medications.includes('Fertility drugs (hCG injections)')) {
      falsePositiveRisk = 100; // Very high risk of false positive
      resultInterpretation = 'Test Unreliable (Fertility Drugs)';
      resultColor = '#e74c3c';
    }
    
    // Calculate symptom score
    const symptomScore = symptoms.length;
    let symptomInterpretation = '';
    
    if (symptomScore >= 7) {
      symptomInterpretation = 'High probability of pregnancy';
    } else if (symptomScore >= 4) {
      symptomInterpretation = 'Moderate pregnancy symptoms';
    } else if (symptomScore >= 1) {
      symptomInterpretation = 'Mild symptoms present';
    } else {
      symptomInterpretation = 'No typical pregnancy symptoms';
    }
    
    // Generate recommendations
    const recommendations = [];
    
    if (daysPastOvulation < 10) {
      recommendations.push('Test again in 3-5 days for more accurate results');
      recommendations.push('Use first morning urine for highest hCG concentration');
    }
    
    if (hcgAboveThreshold) {
      recommendations.push('Schedule confirmation with healthcare provider');
      recommendations.push('Begin prenatal vitamins if not already taking');
    } else {
      recommendations.push('Consider retesting if period is significantly late');
      recommendations.push('Monitor for pregnancy symptoms');
    }
    
    if (medications.includes('Fertility drugs (hCG injections)')) {
      recommendations.push('Consult with fertility specialist for accurate testing');
      recommendations.push('Blood test required for confirmation');
    }
    
    // Calculate next steps timeline
    const nextSteps = [
      { time: 'Immediate', action: 'Retest with first morning urine if early' },
      { time: '1-2 days', action: 'Confirm with digital test if positive' },
      { time: '1 week', action: 'Schedule healthcare provider appointment' },
      { time: '4-6 weeks', action: 'First prenatal visit and ultrasound' },
      { time: '8-12 weeks', action: 'First trimester screening if confirmed' }
    ];
    
    // Calculate statistical probabilities
    const statistics = {
      overallAccuracy: `${detectionProbability}%`,
      falsePositive: `${falsePositiveRisk}%`,
      falseNegative: `${falseNegativeRisk}%`,
      optimalTestDay: `Day ${cycleLengthVal - 7} of cycle`,
      hcgDetectionThreshold: `${testSensitivityVal} mIU/mL`
    };
    
    // Determine result message
    let resultMessage = '';
    if (hcgAboveThreshold && falsePositiveRisk < 50) {
      resultMessage = 'Pregnancy test likely to be POSITIVE based on calculations';
    } else if (!hcgAboveThreshold) {
      resultMessage = 'Pregnancy test likely to be NEGATIVE based on calculations';
    } else {
      resultMessage = 'Test result UNCERTAIN due to medication interference';
    }
    
    setResults({
      daysSincePeriod,
      daysPastOvulation,
      gestationalWeeks,
      gestationalDays,
      estimatedHCG: Math.round(estimatedHCG),
      hcgConfidence,
      testAccuracy: Math.min(100, Math.max(0, testAccuracy)),
      detectionProbability,
      hcgAboveThreshold,
      resultInterpretation,
      resultColor,
      resultMessage,
      falsePositiveRisk,
      falseNegativeRisk,
      symptomScore,
      symptomInterpretation,
      estimatedConception: estimatedConception.toLocaleDateString(),
      estimatedDueDate: estimatedDueDate.toLocaleDateString(),
      nextPeriodDate: nextPeriodDate.toLocaleDateString(),
      recommendations,
      nextSteps,
      statistics,
      values: {
        lastPeriod: lastPeriodDate.toLocaleDateString(),
        testDate: testDateObj.toLocaleDateString(),
        cycleLength: cycleLengthVal,
        testType,
        testSensitivity: testSensitivityVal,
        symptoms,
        medications,
        previousPregnancies: previousPregnanciesVal,
        age: ageVal
      },
      history
    });
  };

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "How soon after a missed period can I take a pregnancy test and get accurate results?",
      answer: "Most pregnancy tests can detect pregnancy as early as the first day of your missed period. However, accuracy varies: 1 day after missed period: 99% accurate for most tests. However, if you test too early (before missed period), accuracy drops to 51-75%. For the most accurate results: Wait until at least 1 week after your missed period. Use first morning urine (highest hCG concentration). Follow test instructions precisely (timing matters). If negative but period doesn't start, retest in 3-5 days. Early detection tests (10 mIU/mL sensitivity) can detect pregnancy 6-8 days after ovulation, but false negatives are common. Blood tests can detect pregnancy 7-12 days after conception. Remember: Implantation occurs 6-12 days after ovulation, and hCG production begins after implantation."
    },
    {
      question: "Can medications or medical conditions cause false positive pregnancy test results?",
      answer: "Yes, several factors can cause false positives: Medications: 1) Fertility drugs containing hCG (trigger shots) - can cause positives for 7-14 days. 2) Antipsychotics (chlorpromazine, promethazine). 3) Anticonvulsants. 4) Anti-anxiety medications. 5) Diuretics. 6) Methadone. Medical conditions: 1) Recent pregnancy loss (hCG takes weeks to clear). 2) Ectopic pregnancy. 3) Molar pregnancy. 4) Certain cancers (testicular, ovarian, bladder) producing hCG. 5) Pituitary disorders (rare). 6) Kidney disease affecting test interpretation. Test issues: 1) Evaporation lines misread as positive. 2) Chemical pregnancy (early miscarriage). 3) Expired or defective tests. 4) Reading test outside time window. Always confirm with healthcare provider and consider blood test for quantitative hCG levels."
    },
    {
      question: "What's the difference between urine pregnancy tests and blood tests? Which is more accurate?",
      answer: "Urine tests (home tests): Detect hCG at 10-100 mIU/mL sensitivity. Pros: Convenient, private, immediate results, low cost. Cons: User error possible, variable sensitivity, qualitative only (positive/negative). Accuracy: 97-99% when used correctly after missed period. Blood tests (done at clinic): Quantitative: Measures exact hCG level (numeric value). Qualitative: Just positive/negative but more sensitive. Pros: More sensitive (detects 1-5 mIU/mL), quantitative tracking, detects pregnancy earlier (7-12 days post-conception). Cons: Requires clinic visit, more expensive, longer wait for results. Accuracy: Near 100% when performed correctly. Which to choose: Suspected early pregnancy or fertility tracking: Blood test. Routine check after missed period: Urine test is sufficient. Monitoring pregnancy progression or complications: Serial blood tests. Medication interference suspected: Blood test."
    },
    {
      question: "How do evaporation lines and indent lines affect pregnancy test interpretation?",
      answer: "Evaporation lines: Appear after test dries (outside read window). Characteristics: Colorless/gray, appear where positive line would be, develop after 10+ minutes. Prevention: Read test within time window (usually 3-5 minutes), discard after reading. Indent lines (also called shadow lines): Manufacturing indent where positive line would appear. Characteristics: Visible even before use, gray/colorless, no pink/blue color. True positive line: Colored (pink/blue), appears within time window, matches control line intensity. How to avoid confusion: 1) Read test only within specified time window. 2) Use digital tests to avoid line interpretation. 3) Test with first morning urine for clearest results. 4) If uncertain, retest in 48 hours (hCG doubles). 5) Take photo at correct time for comparison. Remember: Any color in the line within time window = positive. No color or color after time window = negative or invalid."
    },
    {
      question: "Can pregnancy tests detect ectopic pregnancy or miscarriage?",
      answer: "Pregnancy tests alone cannot distinguish between normal pregnancy, ectopic pregnancy, or impending miscarriage. However: Ectopic pregnancy: Usually produces hCG but at lower levels than normal pregnancy. Patterns: Slow-rising hCG (less than 66% increase in 48 hours), lower than expected for dates. Symptoms: Abdominal pain, vaginal bleeding, shoulder pain, dizziness. Tests will be positive but may show lighter lines. Miscarriage: Tests remain positive while hCG clears (can take weeks). Patterns: Falling hCG levels, tests getting lighter. Chemical pregnancy: Very early miscarriage, positive test followed by period, hCG drops quickly. Important: Quantitative hCG blood tests (serial measurements 48 hours apart) are needed to monitor progression. Ultrasound is required to confirm location (ectopic vs uterine). Always seek medical care for: Positive test + pain/bleeding, concerning symptoms, uncertainty about dates. Don't rely on home tests alone for these diagnoses."
    },
    {
      question: "How does breastfeeding, menopause, or irregular cycles affect pregnancy test accuracy?",
      answer: "Breastfeeding: Can delay return of ovulation and periods, but pregnancy is possible. Tests work the same way - detect hCG if pregnant. Accuracy: Same as non-breastfeeding women if test used correctly. Challenge: Irregular cycles make timing difficult. Menopause: Perimenopause can cause missed periods, mimicking pregnancy. Tests: Will be negative unless pregnant (hCG production requires pregnancy). Important: Some menopausal women have slightly elevated hCG (up to 14 mIU/mL), potentially causing faint positives. Always confirm with healthcare provider. Irregular cycles: Makes test timing challenging. Best approach: Test 3 weeks after unprotected sex if uncertain about ovulation. Use most sensitive tests (10 mIU/mL). Track other symptoms (basal body temperature, cervical mucus). If persistently negative but no period, see provider to rule out other issues (PCOS, thyroid). All tests measure hCG - if present from pregnancy, test will detect it regardless of these factors."
    }
  ];

  const healthCalculators = [
    { name: "Ovulation Calculator", link: "/ovulation-calculator" },
    { name: "Fertility Calculator", link: "/fertility-calculator" },
    { name: "Pregnancy Due Date Calculator", link: "/due-date-calculator" },
    { name: "hCG Levels Calculator", link: "/hcg-calculator" },
    { name: "Pregnancy Weight Gain Calculator", link: "/pregnancy-weight-calculator" },
    { name: "Baby Gender Predictor", link: "/gender-predictor" },
    { name: "Conception Calculator", link: "/conception-calculator" },
    { name: "Pregnancy Calendar", link: "/pregnancy-calendar" },
    { name: "Fertility Window Calculator", link: "/fertility-window-calculator" },
    { name: "Pregnancy Symptoms Tracker", link: "/pregnancy-symptoms-tracker" },
    { name: "Pregnancy Test Accuracy Calculator", link: "/pregnancy-test-accuracy" },
    { name: "Prenatal Health Calculator", link: "/prenatal-health-calculator" }
  ];

  return (
    <main style={containerStyle}>
      <section style={calculatorBoxStyle}>
        <h1 style={calcTitleStyle}>
          <i className="fas fa-baby"></i> Pregnancy Test Calculator - Comprehensive Pregnancy Detection Analysis & Fertility Assessment Platform
        </h1>
        <p style={calcDescStyle}>
          Calculate <strong>optimal pregnancy test timing, detection probability algorithms, and evidence-based fertility assessment recommendations</strong> using <strong>advanced reproductive science equations, comprehensive menstrual cycle data integration, and current obstetrics research protocols</strong>. Essential for <strong>accurate pregnancy detection planning, fertility optimization, and informed reproductive health decision-making</strong>.
        </p>

        <div style={inputGridStyle}>
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-calendar"></i> First Day of Last Menstrual Period *</label>
            <input
              type="date"
              value={lastPeriod}
              onChange={(e) => setLastPeriod(e.target.value)}
              style={inputStyle}
              required
            />
            <small style={{ color: '#666', fontSize: '0.8rem' }}>
              First day of your last period
            </small>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-calendar-alt"></i> Test Date *</label>
            <input
              type="date"
              value={testDate}
              onChange={(e) => setTestDate(e.target.value)}
              style={inputStyle}
              required
            />
            <small style={{ color: '#666', fontSize: '0.8rem' }}>
              Date you took/will take the test
            </small>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-sync-alt"></i> Average Cycle Length (days)</label>
            <input
              type="number"
              value={cycleLength}
              onChange={(e) => setCycleLength(e.target.value)}
              placeholder="28"
              min="21"
              max="45"
              step="1"
              style={inputStyle}
            />
            <small style={{ color: '#666', fontSize: '0.8rem' }}>
              Typical days between periods
            </small>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-vial"></i> Test Type</label>
            <select
              value={testType}
              onChange={(e) => setTestType(e.target.value)}
              style={selectStyle}
            >
              <option value="urine">Urine Home Test</option>
              <option value="blood">Blood Test (Lab)</option>
              <option value="digital">Digital Test</option>
              <option value="early">Early Detection Test</option>
            </select>
          </div>
        </div>

        <div style={inputGridStyle}>
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-search"></i> Test Sensitivity (mIU/mL)</label>
            <select
              value={testSensitivity}
              onChange={(e) => setTestSensitivity(e.target.value)}
              style={selectStyle}
            >
              <option value="10">10 mIU/mL (Early detection)</option>
              <option value="25">25 mIU/mL (Standard)</option>
              <option value="50">50 mIU/mL (Basic)</option>
              <option value="100">100 mIU/mL (Less sensitive)</option>
            </select>
            <small style={{ color: '#666', fontSize: '0.8rem' }}>
              Lower numbers detect pregnancy earlier
            </small>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-user"></i> Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="28"
              min="18"
              max="50"
              step="1"
              style={inputStyle}
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-baby"></i> Previous Pregnancies</label>
            <select
              value={previousPregnancies}
              onChange={(e) => setPreviousPregnancies(e.target.value)}
              style={selectStyle}
            >
              <option value="0">0 (First pregnancy)</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4 or more</option>
            </select>
          </div>
        </div>

        <div style={inputGridStyle}>
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-heartbeat"></i> Current Symptoms (Select all that apply)</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px', marginTop: '10px' }}>
              {symptomOptions.map((symptom) => (
                <label key={symptom} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                  <input
                    type="checkbox"
                    checked={symptoms.includes(symptom)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSymptoms([...symptoms, symptom]);
                      } else {
                        setSymptoms(symptoms.filter(s => s !== symptom));
                      }
                    }}
                  />
                  {symptom}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div style={inputGridStyle}>
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-pills"></i> Current Medications (Select all that apply)</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '10px', marginTop: '10px' }}>
              {medicationOptions.map((medication) => (
                <label key={medication} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                  <input
                    type="checkbox"
                    checked={medications.includes(medication)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setMedications([...medications, medication]);
                      } else {
                        setMedications(medications.filter(m => m !== medication));
                      }
                    }}
                  />
                  {medication}
                </label>
              ))}
            </div>
          </div>
        </div>

        <button
          style={calcBtnStyle}
          onClick={calculatePregnancyTestResults}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, calcBtnHoverStyle)}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = calcBtnStyle.background;
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <i className="fas fa-calculator"></i> Calculate Pregnancy Test Analysis
        </button>

        {/* Results Display */}
        {results && (
          <div style={resultsContainerStyle}>
            <div style={{ ...resultCardStyle, ...pregnancyCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-baby"></i> Pregnancy Test Analysis</h4>
              <div style={{ margin: '20px 0' }}>
                <div style={{ ...resultValueStyle, color: results.resultColor }}>
                  {results.resultMessage}
                </div>
                <div style={{ 
                  fontSize: '1.2rem', 
                  color: '#666',
                  marginBottom: '15px',
                  fontWeight: 'bold'
                }}>
                  {results.resultInterpretation}
                </div>
                <div style={{ 
                  padding: '15px', 
                  background: results.resultColor === '#e74c3c' ? '#f8d7da' : 
                            results.resultColor === '#f39c12' ? '#fff3cd' : '#d4edda',
                  borderRadius: '8px',
                  color: results.resultColor === '#e74c3c' ? '#721c24' : 
                        results.resultColor === '#f39c12' ? '#856404' : '#155724',
                  fontWeight: '600',
                  marginBottom: '15px'
                }}>
                  Accuracy: {results.testAccuracy}% | hCG Level: {results.estimatedHCG} mIU/mL
                </div>
                <div style={{ 
                  padding: '10px', 
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  color: '#666'
                }}>
                  <div><strong>Days since period:</strong> {results.daysSincePeriod} days</div>
                  <div><strong>Days past ovulation:</strong> {results.daysPastOvulation} DPO</div>
                  <div><strong>Gestational age:</strong> {results.gestationalWeeks} weeks, {results.gestationalDays} days</div>
                  <div><strong>Test sensitivity:</strong> {results.values.testSensitivity} mIU/mL</div>
                </div>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div>Last period: {results.values.lastPeriod} | Cycle: {results.values.cycleLength} days</div>
                <div>Test date: {results.values.testDate} | Test type: {results.values.testType}</div>
              </div>
            </div>

            <div style={{ ...resultCardStyle, ...timelineCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-calendar"></i> Pregnancy Timeline</h4>
              <div style={{ margin: '20px 0' }}>
                <div style={{ 
                  padding: '15px', 
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  marginBottom: '15px'
                }}>
                  <div style={{ fontSize: '0.9rem', marginBottom: '10px' }}><strong>Key Dates:</strong></div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 0',
                    borderBottom: '1px solid #eee'
                  }}>
                    <span style={{ fontSize: '0.9rem', width: '50%' }}>Estimated Conception</span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#0984e3', width: '50%', textAlign: 'right' }}>
                      {results.estimatedConception}
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 0',
                    borderBottom: '1px solid #eee'
                  }}>
                    <span style={{ fontSize: '0.9rem', width: '50%' }}>Estimated Due Date</span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#0984e3', width: '50%', textAlign: 'right' }}>
                      {results.estimatedDueDate}
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 0'
                  }}>
                    <span style={{ fontSize: '0.9rem', width: '50%' }}>Next Period Expected</span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#0984e3', width: '50%', textAlign: 'right' }}>
                      {results.nextPeriodDate}
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0984e3' }}>{results.statistics.overallAccuracy}</div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>Overall Accuracy</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#00b894' }}>{results.statistics.falsePositive}</div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>False Positive Risk</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#e84393' }}>{results.statistics.falseNegative}</div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>False Negative Risk</div>
                  </div>
                </div>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div><strong>Next Steps Timeline:</strong></div>
                {results.nextSteps.slice(0, 3).map((step, index) => (
                  <div key={index} style={{ marginBottom: '5px' }}>• {step.time}: {step.action}</div>
                ))}
              </div>
            </div>

            <div style={{ ...resultCardStyle, ...accuracyCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-chart-line"></i> Accuracy Analysis</h4>
              <div style={{ margin: '20px 0', maxHeight: '200px', overflowY: 'auto' }}>
                <div style={{ fontSize: '0.9rem', marginBottom: '10px', color: '#666' }}>
                  <strong>Key Recommendations:</strong>
                </div>
                {results.recommendations.map((rec, index) => (
                  <div key={index} style={{
                    padding: '10px',
                    background: '#f8f9fa',
                    borderRadius: '6px',
                    marginBottom: '8px',
                    borderLeft: '4px solid #00b894'
                  }}>
                    <div style={{ fontSize: '0.9rem', color: '#2c3e50' }}>
                      {rec}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div><strong>Symptom Analysis:</strong></div>
                <div>• Symptom score: {results.symptomScore}/10</div>
                <div>• Interpretation: {results.symptomInterpretation}</div>
                <div>• hCG confidence: {results.hcgConfidence}</div>
                <div>• Optimal test day: {results.statistics.optimalTestDay}</div>
              </div>
            </div>

            <div style={{ ...resultCardStyle, ...symptomsCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-clipboard-check"></i> Important Considerations</h4>
              <div style={{ margin: '20px 0' }}>
                <div style={{ 
                  padding: '15px', 
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  marginBottom: '15px'
                }}>
                  <div style={{ fontSize: '0.9rem', marginBottom: '10px' }}><strong>Medication Effects:</strong></div>
                  <div style={{ fontSize: '0.85rem', color: '#666' }}>
                    {results.values.medications.length > 0 ? (
                      results.values.medications.map((med, index) => (
                        <div key={index} style={{ marginBottom: '5px' }}>• {med}</div>
                      ))
                    ) : (
                      <div>No medications selected that affect test accuracy</div>
                    )}
                  </div>
                </div>
                {results.hcgAboveThreshold ? (
                  <div style={{ 
                    padding: '10px', 
                    background: '#d4edda',
                    borderRadius: '8px',
                    color: '#155724',
                    fontSize: '0.85rem'
                  }}>
                    <strong>Pregnancy Likely:</strong> Estimated hCG level ({results.estimatedHCG} mIU/mL) exceeds test sensitivity threshold ({results.values.testSensitivity} mIU/mL)
                  </div>
                ) : (
                  <div style={{ 
                    padding: '10px', 
                    background: '#fff3cd',
                    borderRadius: '8px',
                    color: '#856404',
                    fontSize: '0.85rem'
                  }}>
                    <strong>Test May Be Negative:</strong> Estimated hCG level may be below test detection threshold. Consider retesting in 48-72 hours.
                  </div>
                )}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div><strong>Remember:</strong></div>
                <div>• Always confirm with healthcare provider</div>
                <div>• Follow test instructions precisely</div>
                <div>• Use first morning urine for best results</div>
                <div>• Retest if uncertain or period doesn't start</div>
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
          <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Premium fertility tracking application</p>
        </div>

        {/* Enhanced SEO Content with High-Value Long-Tail Keywords */}
        <div style={infoSectionStyle}>
          <h3 style={sectionTitleStyle}><i className="fas fa-question-circle"></i> Comprehensive Pregnancy Test Analysis: Advanced Reproductive Endocrinology & Fertility Assessment Protocol</h3>
          <p style={paragraphStyle}><strong>Pregnancy test calculation methodologies</strong> represent <strong>essential reproductive endocrinology assessment tools</strong> for determining <strong>precise human chorionic gonadotropin detection parameters, optimal test timing algorithms, and evidence-based fertility evaluation strategies</strong>. These advanced calculations integrate <strong>sophisticated menstrual cycle analysis, comprehensive hormonal data parameters, and validated obstetrics research models</strong> to provide <strong>individualized pregnancy detection approaches</strong> that maximize <strong>diagnostic accuracy effectiveness, reproductive health optimization, and informed family planning decision-making processes</strong> across diverse reproductive scenarios requiring <strong>precision conception timing stratification protocols</strong>.</p>
          
          <h3 style={sectionTitleStyle}><i className="fas fa-calculator"></i> Advanced Pregnancy Test Algorithms - Comprehensive Reproductive Endocrinology Analysis Formulae</h3>
          <p style={paragraphStyle}>Multiple <strong>validated pregnancy test calculation equations</strong> exist for <strong>comprehensive fertility assessment protocols</strong>, each demonstrating specific <strong>clinical applications and variable detection accuracy profiles</strong> influencing <strong>reproductive health decision-making processes</strong>:</p>
          
          <div style={formulaBoxStyle}>
            <strong>hCG Doubling Time Calculation:</strong> Doubling Time = 48 × log(2) ÷ log(Current hCG ÷ Previous hCG)<br/>
            <strong>Optimal Test Timing:</strong> Test Day = (Cycle Length - Luteal Phase Length) + Minimum Detection DPO<br/>
            <strong>Detection Probability:</strong> P(detection) = 1 - e^(-k × (DPO - Detection Threshold))<br/>
            <strong>False Positive Risk:</strong> FP Risk = Baseline Rate × Medication Factor × Medical Condition Factor<br/>
            <strong>Gestational Age Estimation:</strong> GA (weeks) = (Current Date - LMP Date) ÷ 7<br/>
            <strong>Conception Window Calculation:</strong> Window = Ovulation Day ± 3 days (Day 11-16 of typical cycle)<br/>
            <strong>Test Accuracy Adjustment:</strong> Adjusted Accuracy = Base Accuracy × Timing Factor × Sample Quality Factor × Test Sensitivity Factor
          </div>

          <h3 style={sectionTitleStyle}><i className="fas fa-stethoscope"></i> Clinical Applications of Pregnancy Test Analysis - Comprehensive Reproductive Health Management Guidelines</h3>
          <p style={paragraphStyle}>Accurate <strong>pregnancy test analysis methodology implementation</strong> serves critical functions across multiple <strong>medical specialties and reproductive health areas</strong> requiring <strong>precise conception confirmation strategies</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Obstetrics Practice Protocol:</strong> Essential for <strong>early pregnancy confirmation strategies, gestational age determination, prenatal care initiation timing, and pregnancy complication prevention interventions</strong> in obstetric patient populations</li>
            <li style={{ marginBottom: '10px' }}><strong>Fertility Treatment Management:</strong> Guides <strong>assisted reproduction technology timing optimization, fertility medication adjustment approaches, and pregnancy achievement monitoring protocols</strong> in fertility treatment populations</li>
            <li style={{ marginBottom: '10px' }}><strong>Family Planning Services:</strong> Determines <strong>contraception effectiveness evaluation strategies, unintended pregnancy detection approaches, and reproductive choice decision-making frameworks</strong> for comprehensive reproductive autonomy</li>
            <li style={{ marginBottom: '10px' }}><strong>Emergency Medicine Assessment:</strong> Essential for <strong>ectopic pregnancy recognition algorithms, pregnancy-related complication identification, and urgent reproductive care intervention strategies</strong> in emergency department settings</li>
            <li style={{ marginBottom: '10px' }}><strong>Endocrinology Consultation:</strong> Manages <strong>hormonal disorder impact evaluation, menstrual irregularity investigation requirements, and reproductive endocrine function assessment protocols</strong> for optimal hormonal health</li>
            <li style={{ marginBottom: '10px' }}><strong>Primary Care Integration:</strong> Coordinates <strong>routine reproductive health screening, preconception counseling frameworks, and early pregnancy resource connection approaches</strong> for comprehensive primary care delivery</li>
            <li><strong>Public Health Initiatives:</strong> Facilitates <strong>pregnancy prevalence estimation methodologies, reproductive health outcome tracking systems, and maternal health intervention evaluation methods</strong> for population health advancement</li>
          </ul>
          
          <h3 style={sectionTitleStyle}><i className="fas fa-balance-scale"></i> Key Factors in Pregnancy Test Interpretation - Comprehensive Reproductive Endocrinology Assessment Considerations</h3>
          <p style={paragraphStyle}>Multiple <strong>significant physiological and methodological factors</strong> influence <strong>pregnancy test interpretation parameters</strong> and require consideration for appropriate clinical decision-making:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>hCG Biological Variation Factors:</strong> Implantation timing differences, trophoblastic function variability, placental development patterns, and individual metabolic clearance rates significantly affect <strong>detection threshold achievement and test timing optimization requirements</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Menstrual Cycle Characteristics:</strong> Cycle length regularity patterns, ovulation timing variations, luteal phase duration differences, and hormonal fluctuation profiles dramatically alter <strong>optimal test timing calculations and result interpretation frameworks</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Test Methodology Variables:</strong> Antibody specificity characteristics, detection threshold variations, sample type differences, and manufacturing quality controls create <strong>specific accuracy profiles requiring targeted interpretation approaches</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Physiological State Influences:</strong> Renal function variations, hydration status effects, diurnal rhythm patterns, and metabolic rate differences demonstrate <strong>individualized test performance variations requiring personalized interpretation strategies</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Pharmacological Interference Considerations:</strong> Fertility medication administration, cross-reactive drug presence, substance metabolism effects, and therapeutic agent interactions affect <strong>test result reliability and clinical validity assessment</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Pathological Condition Impacts:</strong> Ectopic pregnancy development patterns, molar pregnancy hormone profiles, trophoblastic disease presentations, and certain malignancy occurrences create <strong>atypical test result patterns requiring specialized interpretation</strong></li>
            <li><strong>User Technique and Timing Factors:</strong> Sample collection methods, test performance timing, result reading accuracy, and interpretation window adherence significantly impact <strong>test validity and clinical utility optimization</strong></li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-exclamation-triangle"></i> Limitations of Pregnancy Test Calculations - Advanced Reproductive Endocrinology Assessment Methodologies</h3>
          <p style={paragraphStyle}>While <strong>pregnancy test calculation methodologies</strong> provide valuable <strong>reproductive health assessment tools</strong>, specific clinical situations necessitate <strong>advanced diagnostic approaches</strong> and <strong>comprehensive medical evaluation protocols</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Complex Reproductive Disorders:</strong> Recurrent pregnancy loss evaluation requirements, unexplained infertility investigation needs, and complex endocrine disorder assessments demonstrating <strong>specialized diagnostic approaches beyond standard test algorithms</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>High-Risk Pregnancy Scenarios:</strong> Advanced maternal age considerations, multiple gestation pregnancies, assisted reproduction conceptions, and previous pregnancy complication histories showing <strong>unique monitoring requirements and specialized care protocols</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Atypical hCG Patterns:</strong> Slow-rising hCG level concerns, plateauing hormone concentrations, abnormally high early values, and unexpected decline patterns creating <strong>diagnostic challenges requiring expert interpretation</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Medical Complication Contexts:</strong> Renal impairment affecting hCG clearance, hepatic disease impacting hormone metabolism, autoimmune conditions causing assay interference, and malignancy producing hCG affecting <strong>test interpretation reliability</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Advanced Diagnostic Requirements:</strong> Serial quantitative hCG monitoring, ultrasound correlation necessities, specialized laboratory testing, and multidisciplinary consultation needs providing <strong>enhanced diagnostic precision beyond home test calculations</strong></li>
            <li><strong>Psychological and Social Considerations:</strong> Pregnancy ambivalence situations, reproductive coercion contexts, mental health impacts, and social support needs enabling <strong>comprehensive care approaches beyond test result interpretation</strong></li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-history"></i> Historical Development of Pregnancy Test Technology - Evolution of Reproductive Endocrinology Understanding</h3>
          <p style={paragraphStyle}>The progressive evolution of <strong>pregnancy test assessment and interpretation methodologies</strong> reflects <strong>centuries of medical research advancement</strong> and <strong>technological innovation trajectories</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Ancient Detection Methods Era:</strong> Utilization of <strong>grain germination observations, urine injection animal tests, and symptomatic pattern recognition approaches</strong> establishing foundational reproductive knowledge systems</li>
            <li style={{ marginBottom: '10px' }}><strong>Biological Assay Development Period:</strong> Creation of <strong>animal pregnancy test models, bioassay standardization methods, and hormone extraction techniques</strong> revolutionizing early pregnancy detection science</li>
            <li style={{ marginBottom: '10px' }}><strong>Immunoassay Revolution Phase:</strong> Introduction of <strong>antibody-based detection systems, home pregnancy test development, and rapid result technology innovations</strong> for accessible pregnancy confirmation</li>
            <li style={{ marginBottom: '10px' }}><strong>Modern Digital Integration:</strong> Implementation of <strong>digital readout technologies, smartphone application connections, and quantitative home monitoring systems</strong> for enhanced user experience and accuracy</li>
            <li style={{ marginBottom: '10px' }}><strong>Sensitivity Enhancement Advancements:</strong> Development of <strong>early detection test formulations, multiple marker detection approaches, and serial monitoring capability enhancements</strong> for improved diagnostic performance</li>
            <li><strong>Future Technology Directions:</strong> Exploration of <strong>wearable monitoring devices, artificial intelligence interpretation algorithms, non-invasive biomarker detection, and integrated reproductive health platforms</strong> for comprehensive reproductive care delivery</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-user-md"></i> Practical Clinical Implementation Recommendations - Comprehensive Reproductive Health Management Guidelines</h3>
          <p style={paragraphStyle}>For optimal <strong>pregnancy test analysis implementation</strong> in contemporary clinical practice environments and <strong>evidence-based reproductive health protocols</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Systematic Assessment Protocol:</strong> Implement <strong>comprehensive menstrual history evaluation, symptom pattern analysis, medication review completion, and test methodology consideration</strong> before result interpretation determination</li>
            <li style={{ marginBottom: '10px' }}><strong>Validated Calculation Methods:</strong> Utilize <strong>cycle-adjusted timing algorithms, sensitivity-specific accuracy adjustments, medication interference corrections, and clinical context integration formulas</strong> for accurate pregnancy probability determination</li>
            <li style={{ marginBottom: '10px' }}><strong>Optimal Testing Strategies:</strong> Develop <strong>first morning urine collection protocols, appropriate timing guidelines, proper technique instructions, and accurate interpretation frameworks</strong> for enhanced test reliability</li>
            <li style={{ marginBottom: '10px' }}><strong>Follow-Up Planning Procedures:</strong> Establish <strong>confirmation testing schedules, healthcare provider referral systems, prenatal care initiation protocols, and complication monitoring approaches</strong> for comprehensive patient management</li>
            <li style={{ marginBottom: '10px' }}><strong>Patient Education Systems:</strong> Implement <strong>clear result interpretation guidance, appropriate expectation setting, follow-up instruction provision, and emotional support resource connection</strong> for holistic patient care</li>
            <li><strong>Multidisciplinary Collaboration Framework:</strong> Coordinate <strong>primary care-obstetrics communication, fertility specialist consultation, mental health professional involvement, and social service integration</strong> for comprehensive reproductive care delivery</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-chart-line"></i> Future Directions in Pregnancy Test Technology - Emerging Reproductive Health Innovations</h3>
          <p style={paragraphStyle}>Ongoing <strong>pregnancy test research initiatives</strong> continue refining <strong>assessment and interpretation approaches</strong> with promising technological developments and <strong>innovative reproductive health methodologies</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Advanced Biosensor Technologies:</strong> Wearable hormone monitoring devices, continuous hCG tracking systems, smartphone-connected test platforms, and real-time fertility assessment tools for comprehensive reproductive monitoring</li>
            <li style={{ marginBottom: '10px' }}><strong>Artificial Intelligence Applications:</strong> Machine learning algorithm development for <strong>personalized fertility prediction models</strong> incorporating cycle data, hormonal patterns, and pregnancy probability calculations</li>
            <li style={{ marginBottom: '10px' }}><strong>Multi-Marker Detection Systems:</strong> Simultaneous measurement of hCG variants, pregnancy-associated proteins, microRNA biomarkers, and metabolic indicators for enhanced early detection and viability assessment</li>
            <li style={{ marginBottom: '10px' }}><strong>Non-Invasive Monitoring Platforms:</strong> Saliva-based testing methods, breath analysis technologies, skin patch detection systems, and optical measurement approaches for convenient pregnancy monitoring</li>
            <li style={{ marginBottom: '10px' }}><strong>Integrated Reproductive Health Solutions:</strong> Development of <strong>comprehensive fertility management systems, pregnancy health tracking applications, prenatal care coordination platforms, and reproductive life planning tools</strong> for holistic reproductive health management</li>
            <li><strong>Global Health Accessibility Innovations:</strong> Creation of <strong>low-cost detection technologies, resource-limited setting adaptations, culturally appropriate educational materials, and community health worker training programs</strong> for equitable reproductive care access</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-graduation-cap"></i> Educational Requirements and Professional Training Standards Implementation</h3>
          <p style={paragraphStyle}>Proper <strong>pregnancy test interpretation methodology education</strong> represents an <strong>essential clinical competency requirement</strong> for <strong>healthcare professionals</strong> across multiple medical disciplines. Comprehensive training curricula should systematically include <strong>reproductive endocrinology principles, menstrual cycle physiology fundamentals, pregnancy test technology specifications, and clinical interpretation strategies</strong>. Continuing professional education programs must consistently address <strong>evolving reproductive research findings, changing clinical practice standards, and emerging technological developments</strong> to ensure optimal patient outcomes and evidence-based practice implementation across diverse healthcare, reproductive health, and primary care delivery settings and specialty practice areas.</p>

          <h3 style={sectionTitleStyle}><i className="fas fa-clipboard-check"></i> Quality Assurance and Protocol Standardization Implementation</h3>
          <p style={paragraphStyle}>Implementation of <strong>rigorous quality assurance protocols</strong> ensures <strong>consistent reproductive health management practices</strong> across diverse clinical settings. These protocols encompass <strong>test methodology standardization procedures, result interpretation guideline adherence, patient education material accuracy verification, and follow-up care coordination requirements</strong> that directly impact <strong>reproductive health outcomes and pregnancy test utility effectiveness</strong>. Professional organizations should develop <strong>standardized training materials, competency assessment tools, and clinical practice guideline documents</strong> to guarantee consistent clinical application quality across diverse healthcare delivery settings and specialty practice areas, ensuring optimal outcomes through evidence-based reproductive health management approaches.</p>
        </div>

        {/* Q&A Dropdown Section */}
        <div style={faqSectionStyle}>
          <h2 style={faqTitleStyle}><i className="fas fa-question-circle"></i> Frequently Asked Questions About Pregnancy Tests</h2>
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
          <h3 style={sectionTitleStyle}><i className="fas fa-calculator"></i> Related Fertility & Pregnancy Calculators</h3>
          <p style={paragraphStyle}>Explore our comprehensive collection of <strong>reproductive health calculation tools and pregnancy monitoring calculators</strong> for fertility optimization and pregnancy management:</p>
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
          <h4 style={disclaimerTitleStyle}><i className="fas fa-exclamation-triangle"></i> Important Medical & Reproductive Health Disclaimer</h4>
          <p style={paragraphStyle}><strong>This pregnancy test calculator provides estimates for educational and informational purposes only.</strong> The calculations are based on statistical models and reproductive health principles and should not be used as a substitute for professional medical advice, diagnosis, or treatment.</p>
          <p style={paragraphStyle}><strong>Pregnancy Confirmation Requirement:</strong> Always confirm any positive home pregnancy test with a healthcare provider. Clinical confirmation through blood tests and examination is essential for accurate pregnancy diagnosis and appropriate prenatal care initiation.</p>
          <p style={paragraphStyle}><strong>Professional Medical Consultation Required:</strong> Always seek the advice of your physician, obstetrician, midwife, or other qualified healthcare provider with any questions regarding pregnancy, fertility, or reproductive health. Do not disregard professional medical advice or delay seeking it because of information provided by this calculator.</p>
          <p style={paragraphStyle}><strong>Ectopic Pregnancy Warning:</strong> If you experience severe abdominal pain, shoulder pain, dizziness, fainting, or heavy vaginal bleeding along with a positive pregnancy test, seek immediate emergency medical care as these may indicate ectopic pregnancy or other serious conditions.</p>
          <p style={{ marginBottom: '10px' }}><strong>Fertility Treatment Considerations:</strong> Individuals undergoing fertility treatments should follow their specialist's specific testing instructions and timing recommendations, as medication protocols can significantly affect test accuracy and interpretation.</p>
          <p style={{ marginBottom: '10px' }}><strong>Medication and Medical Condition Effects:</strong> Various medications and medical conditions can affect pregnancy test results. Always inform your healthcare provider of all medications you are taking and any existing medical conditions.</p>
          <p style={{ marginBottom: '10px' }}><strong>Emotional Support Awareness:</strong> Pregnancy testing can evoke strong emotions regardless of the desired outcome. Seek appropriate emotional support and counseling as needed, and consider discussing results with trusted healthcare providers, partners, or support networks.</p>
          <p><strong>Comprehensive Care Importance:</strong> Pregnancy involves comprehensive medical care including prenatal vitamins, regular check-ups, appropriate testing, and lifestyle adjustments. Always follow professional medical guidance for optimal maternal and fetal health outcomes.</p>
        </div>
      </section>

      {/* Sidebar with 3 Ads (3rd one sticky) */}
      {showSidebar && (
        <aside style={sidebarStyle}>
          <div style={sidebarContentStyle}>
            <div style={{ ...adSlotStyle, ...sidebarAdStyle }}>
              <p><i className="fas fa-ad"></i> Advertisement 1</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Sponsored Content</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Premium fertility tracking subscription</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>300px height ad slot</p>
            </div>
            
            <div style={{ ...adSlotStyle, ...sidebarAdStyle }}>
              <p><i className="fas fa-ad"></i> Advertisement 2</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Featured Product</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Early pregnancy symptom guide</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>300px height ad slot</p>
            </div>
            
            <div style={{ ...adSlotStyle, ...stickyAdStyle }}>
              <p><i className="fas fa-thumbtack"></i> Sticky Advertisement</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Premium Content - Stays visible</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Complete pregnancy health monitoring system</p>
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
            <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Perfect for on-the-go planning</p>
          </div>
        </div>
      )}
      
      {/* Sticky Footer Ad (Mobile) */}
      {!showSidebar && (
        <div style={stickyFooterAdStyle}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ textAlign: 'left', flex: 1 }}>
              <p style={{ fontSize: '0.9rem', margin: 0, color: '#2c3e50' }}>
                <i className="fas fa-mobile-alt"></i> Mobile Pregnancy Guide
              </p>
              <p style={{ fontSize: '0.8rem', margin: '5px 0 0 0', color: '#666' }}>
                Get personalized pregnancy tracking - Free trial
              </p>
            </div>
            <button style={{
              background: '#e84393',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginLeft: '15px'
            }}>
              Download App
            </button>
          </div>
        </div>
      )}
    </main>
  );
}