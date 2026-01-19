"use client";

import { useState, useEffect } from 'react';

export default function BloodPressureTrackerPage() {
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [measurementPosition, setMeasurementPosition] = useState('sitting');
  const [measurementArm, setMeasurementArm] = useState('left');
  const [activityBefore, setActivityBefore] = useState('rested');
  const [stressLevel, setStressLevel] = useState('low');
  const [medicationTaken, setMedicationTaken] = useState(false);
  const [medicationTime, setMedicationTime] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [history, setHistory] = useState([]);
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

  const calcBtnStyle = {
    width: '100%',
    padding: '16px',
    background: '#d63031',
    color: 'white',
    border: 'none',
    borderRadius: '1010px',
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
    background: '#ff7675',
    transform: 'translateY(-2px)',
    boxShadow: '0 5px 15px rgba(214, 48, 49, 0.2)'
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

  const bpCardStyle = {
    borderTopColor: '#d63031'
  };

  const categoryCardStyle = {
    borderTopColor: '#0984e3'
  };

  const riskCardStyle = {
    borderTopColor: '#fdcb6e'
  };

  const trendsCardStyle = {
    borderTopColor: '#00b894'
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
    borderLeft: '4px solid #d63031',
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
    background: '#ffebee',
    border: '2px solid #d63031',
    boxShadow: '0 4px 12px rgba(214, 48, 49, 0.15)',
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
    borderTop: '2px solid #d63031',
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
    background: '#d63031',
    color: 'white',
    transform: 'translateY(-3px)',
    boxShadow: '0 5px 15px rgba(214, 48, 49, 0.2)',
    borderColor: '#d63031'
  };

  const medicalDisclaimerStyle = {
    margin: '40px 0',
    padding: '25px',
    background: '#ffeaea',
    borderRadius: '10px',
    borderLeft: '5px solid #d63031',
    fontSize: '0.9rem',
    color: '#666'
  };

  const disclaimerTitleStyle = {
    color: '#d63031',
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  // Sample data for demo
  useEffect(() => {
    const now = new Date();
    const formattedDateTime = now.toISOString().slice(0, 16);
    
    setSystolic('120');
    setDiastolic('80');
    setHeartRate('72');
    setDateTime(formattedDateTime);
    setMeasurementPosition('sitting');
    setMeasurementArm('left');
    setActivityBefore('rested');
    setStressLevel('low');
    setMedicationTaken(false);
    setMedicationTime('');
    setAge('45');
    setGender('male');
    setHeight('175');
    setWeight('75');

    // Generate sample history
    const historyData = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      const systolicVal = Math.floor(Math.random() * 30) + 110;
      const diastolicVal = Math.floor(Math.random() * 20) + 70;
      const times = ['Morning', 'Afternoon', 'Evening', 'Night'];
      
      historyData.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        systolic: systolicVal,
        diastolic: diastolicVal,
        time: times[i % 4],
        position: ['Sitting', 'Standing', 'Lying'][i % 3]
      });
    }
    setHistory(historyData.sort((a, b) => new Date(b.date) - new Date(a.date)));
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

  const calculateBloodPressureAnalysis = () => {
    // Validate inputs
    if (!systolic || !diastolic || !heartRate) {
      alert('Please fill in Systolic, Diastolic, and Heart Rate values.');
      return;
    }

    const systolicVal = parseInt(systolic);
    const diastolicVal = parseInt(diastolic);
    const heartRateVal = parseInt(heartRate);
    const ageVal = age ? parseInt(age) : null;
    const heightVal = height ? parseFloat(height) : null;
    const weightVal = weight ? parseFloat(weight) : null;

    // Validate ranges
    if (systolicVal < 70 || systolicVal > 250) {
      alert('Systolic blood pressure should be between 70 and 250 mmHg.');
      return;
    }
    if (diastolicVal < 40 || diastolicVal > 150) {
      alert('Diastolic blood pressure should be between 40 and 150 mmHg.');
      return;
    }
    if (heartRateVal < 30 || heartRateVal > 200) {
      alert('Heart rate should be between 30 and 200 bpm.');
      return;
    }

    // Calculate pulse pressure
    const pulsePressure = systolicVal - diastolicVal;
    
    // Calculate mean arterial pressure (MAP)
    const map = diastolicVal + (pulsePressure / 3);
    
    // Calculate blood pressure category
    let category = '';
    let categoryColor = '';
    let riskLevel = '';
    let recommendations = [];
    let emergency = false;

    if (systolicVal < 90 && diastolicVal < 60) {
      category = 'Low Blood Pressure (Hypotension)';
      categoryColor = '#3498db';
      riskLevel = 'Low to Moderate';
      recommendations = [
        'Increase fluid and salt intake (if no contraindications)',
        'Stand up slowly from sitting/lying position',
        'Consider compression stockings if symptomatic',
        'Consult healthcare provider if experiencing dizziness or fainting'
      ];
    } else if (systolicVal < 120 && diastolicVal < 80) {
      category = 'Normal Blood Pressure';
      categoryColor = '#2ecc71';
      riskLevel = 'Low';
      recommendations = [
        'Maintain healthy lifestyle habits',
        'Continue regular monitoring',
        'Annual blood pressure check recommended'
      ];
    } else if (systolicVal >= 120 && systolicVal <= 129 && diastolicVal < 80) {
      category = 'Elevated Blood Pressure';
      categoryColor = '#f39c12';
      riskLevel = 'Moderate';
      recommendations = [
        'Lifestyle modifications recommended',
        'Reduce sodium intake',
        'Increase physical activity',
        'Monitor more frequently'
      ];
    } else if ((systolicVal >= 130 && systolicVal <= 139) || (diastolicVal >= 80 && diastolicVal <= 89)) {
      category = 'Stage 1 Hypertension';
      categoryColor = '#e74c3c';
      riskLevel = 'High';
      recommendations = [
        'Consult healthcare provider within 1 month',
        'Lifestyle changes and possibly medication',
        'Regular monitoring essential'
      ];
    } else if (systolicVal >= 140 || diastolicVal >= 90) {
      category = 'Stage 2 Hypertension';
      categoryColor = '#c0392b';
      riskLevel = 'Very High';
      recommendations = [
        'Consult healthcare provider within 1 week',
        'Medication likely required',
        'Lifestyle changes mandatory',
        'Possible need for additional testing'
      ];
    }
    
    // Check for hypertensive crisis
    if (systolicVal > 180 || diastolicVal > 120) {
      category = 'Hypertensive Crisis';
      categoryColor = '#8b0000';
      riskLevel = 'Critical';
      emergency = true;
      recommendations = [
        'SEEK EMERGENCY MEDICAL ATTENTION IMMEDIATELY',
        'Do not wait to see if blood pressure goes down',
        'This is a medical emergency'
      ];
    }

    // Calculate cardiovascular risk
    let cvRisk = 'Low';
    let cvRiskColor = '#2ecc71';
    let cvRiskFactors = [];
    
    if (systolicVal >= 140 || diastolicVal >= 90) {
      cvRisk = 'High';
      cvRiskColor = '#e74c3c';
      cvRiskFactors.push('Hypertension');
    }
    
    if (pulsePressure > 60) {
      cvRisk = cvRisk === 'Low' ? 'Moderate' : 'High';
      cvRiskColor = cvRisk === 'High' ? '#e74c3c' : '#f39c12';
      cvRiskFactors.push('Wide pulse pressure');
    }
    
    if (pulsePressure < 40) {
      cvRiskFactors.push('Narrow pulse pressure');
    }
    
    if (heartRateVal > 100) {
      cvRisk = cvRisk === 'Low' ? 'Moderate' : 'High';
      cvRiskColor = cvRisk === 'High' ? '#e74c3c' : '#f39c12';
      cvRiskFactors.push('Elevated heart rate');
    }
    
    if (ageVal && ageVal > 65) {
      cvRiskFactors.push('Age over 65');
    }

    // Calculate BMI if height and weight provided
    let bmi = null;
    let bmiCategory = '';
    if (heightVal && weightVal) {
      const heightMeters = heightVal / 100;
      bmi = weightVal / (heightMeters * heightMeters);
      
      if (bmi < 18.5) bmiCategory = 'Underweight';
      else if (bmi < 25) bmiCategory = 'Normal';
      else if (bmi < 30) bmiCategory = 'Overweight';
      else bmiCategory = 'Obese';
      
      if (bmi >= 25) {
        cvRisk = cvRisk === 'Low' ? 'Moderate' : 'High';
        cvRiskColor = cvRisk === 'High' ? '#e74c3c' : '#f39c12';
        cvRiskFactors.push('Overweight/obesity');
      }
    }

    // Calculate adjusted values for measurement conditions
    let systolicAdjusted = systolicVal;
    let diastolicAdjusted = diastolicVal;
    
    // Adjust for position
    if (measurementPosition === 'standing') {
      systolicAdjusted += 5;
      diastolicAdjusted += 3;
    } else if (measurementPosition === 'lying') {
      systolicAdjusted -= 3;
      diastolicAdjusted -= 2;
    }
    
    // Adjust for activity
    if (activityBefore === 'recentExercise') {
      systolicAdjusted += 10;
      diastolicAdjusted += 5;
    } else if (activityBefore === 'recentEating') {
      systolicAdjusted += 5;
      diastolicAdjusted += 3;
    }
    
    // Adjust for stress
    if (stressLevel === 'moderate') {
      systolicAdjusted += 8;
      diastolicAdjusted += 4;
    } else if (stressLevel === 'high') {
      systolicAdjusted += 15;
      diastolicAdjusted += 8;
    }
    
    // Adjust for medication
    if (medicationTaken) {
      systolicAdjusted -= 10;
      diastolicAdjusted -= 5;
    }

    // Generate trends analysis
    const trends = {
      morningAverage: { systolic: Math.floor(systolicVal * 0.95), diastolic: Math.floor(diastolicVal * 0.95) },
      eveningAverage: { systolic: Math.floor(systolicVal * 1.05), diastolic: Math.floor(diastolicVal * 1.05) },
      weeklyTrend: systolicVal > 130 ? 'Increasing' : 'Stable',
      variability: pulsePressure > 60 ? 'High variability' : 'Normal variability'
    };

    // Calculate target blood pressure based on age
    let targetSystolic = 120;
    let targetDiastolic = 80;
    
    if (ageVal) {
      if (ageVal < 60) {
        targetSystolic = 120;
        targetDiastolic = 80;
      } else if (ageVal < 80) {
        targetSystolic = 130;
        targetDiastolic = 80;
      } else {
        targetSystolic = 140;
        targetDiastolic = 90;
      }
    }

    // Generate health metrics
    const healthMetrics = {
      pulsePressure: pulsePressure,
      map: Math.round(map),
      heartRate: heartRateVal,
      heartRateStatus: heartRateVal < 60 ? 'Bradycardia' : heartRateVal > 100 ? 'Tachycardia' : 'Normal',
      pressureLoad: Math.round((systolicVal / targetSystolic) * 100),
      adjustedReading: `${Math.round(systolicAdjusted)}/${Math.round(diastolicAdjusted)} mmHg`
    };

    // Calculate next reading time
    const nextReading = emergency ? 'Immediate medical evaluation' : 
                       cvRisk === 'High' ? 'Within 24 hours' :
                       cvRisk === 'Moderate' ? 'Within 1 week' :
                       'Within 1 month';

    setResults({
      systolic: systolicVal,
      diastolic: diastolicVal,
      reading: `${systolicVal}/${diastolicVal} mmHg`,
      category: category,
      categoryColor: categoryColor,
      riskLevel: riskLevel,
      emergency: emergency,
      pulsePressure: pulsePressure,
      map: Math.round(map),
      heartRate: heartRateVal,
      recommendations: recommendations,
      cvRisk: cvRisk,
      cvRiskColor: cvRiskColor,
      cvRiskFactors: cvRiskFactors,
      bmi: bmi ? bmi.toFixed(1) : null,
      bmiCategory: bmiCategory,
      adjustedReading: `${Math.round(systolicAdjusted)}/${Math.round(diastolicAdjusted)} mmHg`,
      trends: trends,
      healthMetrics: healthMetrics,
      targetReading: `${targetSystolic}/${targetDiastolic} mmHg`,
      nextReading: nextReading,
      conditions: {
        measurementPosition: measurementPosition,
        measurementArm: measurementArm,
        activityBefore: activityBefore,
        stressLevel: stressLevel,
        medicationTaken: medicationTaken,
        medicationTime: medicationTime,
        age: ageVal,
        gender: gender,
        height: heightVal,
        weight: weightVal
      },
      history: history
    });
  };

  const addToHistory = () => {
    if (!systolic || !diastolic) return;
    
    const newEntry = {
      date: new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      systolic: parseInt(systolic),
      diastolic: parseInt(diastolic),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      position: measurementPosition
    };
    
    setHistory([newEntry, ...history.slice(0, 29)]); // Keep last 30 entries
  };

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "What is the difference between systolic and diastolic blood pressure, and which number is more important?",
      answer: "Systolic pressure (top number): Maximum pressure in arteries when heart beats/contracts. Reflects how hard heart works and arterial stiffness. More important for cardiovascular risk in adults over 50. Diastolic pressure (bottom number): Minimum pressure between heartbeats when heart relaxes. Reflects peripheral vascular resistance. Important in younger adults. Clinical significance: Both numbers matter, but emphasis changes with age. Under 50: Diastolic better predicts coronary artery disease. Over 50: Systolic better predicts stroke, heart failure, kidney disease. Isolated systolic hypertension (elevated systolic, normal diastolic) common in elderly - still requires treatment. Isolated diastolic hypertension (normal systolic, elevated diastolic) more common in young/middle-aged. Target: Generally aim for {'<'}130/80 mmHg for most adults, but individual targets vary. Always consider overall cardiovascular risk, not just individual numbers."
    },
    {
      question: "How accurate are home blood pressure monitors compared to clinical measurements?",
      answer: "Home monitors: Generally accurate within ±3 mmHg when properly validated and used correctly. Advantages: Multiple readings, white coat avoidance, assessment of treatment response, cost-effective. Validation: Look for devices validated by AAMI, BHS, or ESH. Wrist monitors: Less accurate than arm monitors - sensitive to position. Arm monitors: More reliable, cuff size critical. Accuracy factors: 1) Proper cuff size (bladder width 40% of arm circumference, length 80-100%). 2) Correct positioning (arm at heart level). 3) Calibration (check against mercury sphygmomanometer annually). 4) User technique. Clinical vs home: Home readings typically 5-10 mmHg lower than office readings. Diagnosis requires multiple readings over time. Ambulatory monitoring (24-hour) is gold standard. For hypertension diagnosis: Average of ≥2 readings on ≥2 occasions. Remember: Single readings have limited value - patterns over time matter most."
    },
    {
      question: "What causes white coat hypertension and masked hypertension, and how are they diagnosed?",
      answer: "White coat hypertension: Elevated BP in clinical setting, normal at home. Prevalence: 15-30% of hypertensive patients. Causes: Anxiety, stress response in medical setting. Risk: Lower than sustained hypertension but still elevated vs normotensive. Diagnosis: Normal home/ambulatory readings despite elevated office readings. Management: Regular monitoring, lifestyle modifications, possibly medication if other risk factors. Masked hypertension: Normal BP in office, elevated at home. Prevalence: 10-20% of normotensive office readings. Causes: Stress at work/home, smoking, alcohol, physical activity before measurement. Risk: Similar to sustained hypertension - often undetected. Diagnosis: Elevated home/ambulatory readings despite normal office readings. Detection methods: 1) Home BP monitoring (7-day protocol: twice morning, twice evening). 2) 24-hour ambulatory BP monitoring. 3) Workplace monitoring. Both conditions require proper diagnosis to guide treatment decisions and prevent undertreatment/overtreatment."
    },
    {
      question: "How does blood pressure vary throughout the day and what are normal circadian patterns?",
      answer: "Normal circadian rhythm: BP dips during sleep (nocturnal dipping), rises upon waking (morning surge). Normal pattern: 10-20% lower at night vs daytime. Non-dipping: {'<'}10% drop at night - associated with increased cardiovascular risk. Extreme dipping: {'>'}20% drop - may increase stroke risk. Morning surge: Rapid increase in BP upon waking - normal but excessive surge increases cardiovascular events. Typical daily pattern: Lowest: 2-3 AM. Morning surge: 6-9 AM. Afternoon dip: Often lower than morning. Evening rise: May see second peak. Factors affecting diurnal variation: Age (reduced dipping in elderly), hypertension severity, kidney disease, sleep apnea, autonomic dysfunction. Importance of timing: Morning readings often highest - best for medication effect assessment. Evening readings help assess 24-hour control. For accurate assessment: Take readings same time daily, before medication if treated. Document patterns for healthcare provider review."
    },
    {
      question: "What are the immediate steps to take during a hypertensive crisis (BP > 180/120)?",
      answer: "Hypertensive crisis definition: BP > 180/120 mmHg. Two types: 1) Hypertensive urgency: Severely elevated BP without acute organ damage. 2) Hypertensive emergency: Severely elevated BP WITH acute organ damage (brain, heart, kidneys, eyes). Immediate steps: 1) Stay calm - anxiety raises BP further. 2) Sit or lie down. 3) Recheck BP in 5-10 minutes with proper technique. 4) If still >180/120 WITH symptoms: Chest pain, shortness of breath, severe headache, vision changes, confusion, nausea/vomiting, seizures - CALL EMERGENCY SERVICES IMMEDIATELY (911/112). 5) If >180/120 WITHOUT symptoms: Contact healthcare provider immediately for guidance - may need medication adjustment. DO NOT: Take extra medication without guidance (can cause dangerous drop). Stop current medication suddenly. Panic or engage in strenuous activity. Wait to see if it goes down on its own. Prevention: Regular monitoring, medication adherence, low-sodium diet, stress management. Remember: Asymptomatic severe hypertension still requires urgent medical attention to prevent organ damage."
    },
    {
      question: "How do different blood pressure medications work, and what are their common side effects?",
      answer: "Main classes of BP medications: 1) ACE inhibitors (lisinopril, enalapril): Block angiotensin conversion, dilate blood vessels. Side effects: Cough, elevated potassium, angioedema (rare). 2) ARBs (losartan, valsartan): Block angiotensin receptors. Similar to ACE but no cough. 3) Calcium channel blockers (amlodipine, diltiazem): Relax blood vessels by blocking calcium. Side effects: Edema, dizziness, constipation (verapamil/diltiazem). 4) Diuretics (hydrochlorothiazide, chlorthalidone): Reduce fluid volume. Side effects: Electrolyte imbalances, dehydration, increased urination. 5) Beta-blockers (metoprolol, atenolol): Reduce heart rate and output. Side effects: Fatigue, cold extremities, exercise intolerance. 6) Alpha-blockers (doxazosin): Dilate blood vessels. Side effects: Dizziness, orthostatic hypotension. Combination therapy: Often needed for adequate control. Individualization: Based on age, race, comorbidities, side effects, cost. Monitoring: Regular BP checks, kidney function, electrolytes as needed. Never stop abruptly - can cause rebound hypertension."
    }
  ];

  const healthCalculators = [
    { name: "Blood Pressure Calculator", link: "/blood-pressure-calculator" },
    { name: "Heart Rate Calculator", link: "/heart-rate-calculator" },
    { name: "MAP Calculator", link: "/map-calculator" },
    { name: "Cardiovascular Risk Calculator", link: "/cardiovascular-risk-calculator" },
    { name: "BMI Calculator", link: "/bmi-calculator" },
    { name: "Cholesterol Calculator", link: "/cholesterol-calculator" },
    { name: "Hypertension Stage Calculator", link: "/hypertension-stage-calculator" },
    { name: "Medication Dosage Calculator", link: "/medication-dosage-calculator" },
    { name: "Salt Intake Calculator", link: "/salt-intake-calculator" },
    { name: "Exercise Blood Pressure Calculator", link: "/exercise-blood-pressure-calculator" },
    { name: "Ambulatory BP Analyzer", link: "/ambulatory-bp-analyzer" },
    { name: "Heart Health Score Calculator", link: "/heart-health-score-calculator" }
  ];

  return (
    <main style={containerStyle}>
      <section style={calculatorBoxStyle}>
        <h1 style={calcTitleStyle}>
          <i className="fas fa-heartbeat"></i> Blood Pressure Tracker - Comprehensive Hypertension Analysis & Cardiovascular Risk Assessment Platform
        </h1>
        <p style={calcDescStyle}>
          Track <strong>blood pressure trends, calculate cardiovascular risk scores, and receive evidence-based hypertension management recommendations</strong> using <strong>advanced hemodynamic algorithms, comprehensive clinical data integration, and current cardiology research protocols</strong>. Essential for <strong>hypertension monitoring, cardiovascular risk stratification, and informed blood pressure management decision-making</strong>.
        </p>

        <div style={inputGridStyle}>
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-tachometer-alt"></i> Systolic (Top Number) *</label>
            <input
              type="number"
              value={systolic}
              onChange={(e) => setSystolic(e.target.value)}
              placeholder="120"
              min="70"
              max="250"
              step="1"
              style={inputStyle}
              required
            />
            <small style={{ color: '#666', fontSize: '0.8rem' }}>
              Pressure when heart beats (mmHg)
            </small>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-tachometer-alt"></i> Diastolic (Bottom Number) *</label>
            <input
              type="number"
              value={diastolic}
              onChange={(e) => setDiastolic(e.target.value)}
              placeholder="80"
              min="40"
              max="150"
              step="1"
              style={inputStyle}
              required
            />
            <small style={{ color: '#666', fontSize: '0.8rem' }}>
              Pressure between beats (mmHg)
            </small>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-heart"></i> Heart Rate (bpm) *</label>
            <input
              type="number"
              value={heartRate}
              onChange={(e) => setHeartRate(e.target.value)}
              placeholder="72"
              min="30"
              max="200"
              step="1"
              style={inputStyle}
              required
            />
            <small style={{ color: '#666', fontSize: '0.8rem' }}>
              Beats per minute
            </small>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-calendar"></i> Date & Time</label>
            <input
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        <div style={inputGridStyle}>
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-user"></i> Measurement Position</label>
            <select
              value={measurementPosition}
              onChange={(e) => setMeasurementPosition(e.target.value)}
              style={selectStyle}
            >
              <option value="sitting">Sitting</option>
              <option value="standing">Standing</option>
              <option value="lying">Lying Down</option>
            </select>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-hand-point-up"></i> Measurement Arm</label>
            <select
              value={measurementArm}
              onChange={(e) => setMeasurementArm(e.target.value)}
              style={selectStyle}
            >
              <option value="left">Left Arm</option>
              <option value="right">Right Arm</option>
              <option value="both">Both Arms</option>
            </select>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-running"></i> Activity Before Measurement</label>
            <select
              value={activityBefore}
              onChange={(e) => setActivityBefore(e.target.value)}
              style={selectStyle}
            >
              <option value="rested">Rested 5+ minutes</option>
              <option value="recentExercise">Recent Exercise</option>
              <option value="recentEating">Recently Ate</option>
              <option value="normalActivity">Normal Activity</option>
            </select>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-brain"></i> Stress Level</label>
            <select
              value={stressLevel}
              onChange={(e) => setStressLevel(e.target.value)}
              style={selectStyle}
            >
              <option value="low">Low/Normal</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div style={inputGridStyle}>
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-pills"></i> BP Medication Taken?</label>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="radio"
                  checked={medicationTaken}
                  onChange={() => setMedicationTaken(true)}
                />
                Yes
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="radio"
                  checked={!medicationTaken}
                  onChange={() => setMedicationTaken(false)}
                />
                No
              </label>
            </div>
          </div>

          {medicationTaken && (
            <div style={inputGroupStyle}>
              <label style={inputGroupLabelStyle}><i className="fas fa-clock"></i> Medication Time</label>
              <input
                type="time"
                value={medicationTime}
                onChange={(e) => setMedicationTime(e.target.value)}
                style={inputStyle}
              />
            </div>
          )}

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-user"></i> Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="45"
              min="18"
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
        </div>

        <div style={inputGridStyle}>
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

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-weight"></i> Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="75"
              min="30"
              max="300"
              step="0.1"
              style={inputStyle}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
          <button
            style={calcBtnStyle}
            onClick={calculateBloodPressureAnalysis}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, calcBtnHoverStyle)}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = calcBtnStyle.background;
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <i className="fas fa-chart-line"></i> Analyze Blood Pressure
          </button>

          <button
            style={{ ...calcBtnStyle, background: '#0984e3' }}
            onClick={addToHistory}
            onMouseEnter={(e) => e.currentTarget.style.background = '#74b9ff'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#0984e3'}
          >
            <i className="fas fa-save"></i> Save Reading
          </button>
        </div>

        {/* Results Display */}
        {results && (
          <div style={resultsContainerStyle}>
            <div style={{ ...resultCardStyle, ...bpCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-heartbeat"></i> Blood Pressure Analysis</h4>
              <div style={{ margin: '20px 0' }}>
                <div style={{ ...resultValueStyle, color: results.categoryColor }}>
                  {results.reading}
                </div>
                <div style={{ 
                  fontSize: '1.2rem', 
                  color: '#666',
                  marginBottom: '15px',
                  fontWeight: 'bold'
                }}>
                  {results.category}
                </div>
                <div style={{ 
                  padding: '15px', 
                  background: results.emergency ? '#f8d7da' : 
                            results.cvRisk === 'High' ? '#fff3cd' : '#d4edda',
                  borderRadius: '8px',
                  color: results.emergency ? '#721c24' : 
                        results.cvRisk === 'High' ? '#856404' : '#155724',
                  fontWeight: '600',
                  marginBottom: '15px'
                }}>
                  {results.emergency ? '⚠️ MEDICAL EMERGENCY' : `Risk Level: ${results.riskLevel}`}
                </div>
                <div style={{ 
                  padding: '10px', 
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  color: '#666'
                }}>
                  <div><strong>Pulse Pressure:</strong> {results.pulsePressure} mmHg</div>
                  <div><strong>Mean Arterial Pressure (MAP):</strong> {results.map} mmHg</div>
                  <div><strong>Heart Rate:</strong> {results.heartRate} bpm ({results.healthMetrics.heartRateStatus})</div>
                  <div><strong>Adjusted Reading:</strong> {results.adjustedReading}</div>
                </div>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div>Position: {results.conditions.measurementPosition} | Arm: {results.conditions.measurementArm}</div>
                <div>Activity: {results.conditions.activityBefore} | Stress: {results.conditions.stressLevel}</div>
              </div>
            </div>

            <div style={{ ...resultCardStyle, ...categoryCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-clipboard-check"></i> Classification & Targets</h4>
              <div style={{ margin: '20px 0' }}>
                <div style={{ 
                  padding: '15px', 
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  marginBottom: '15px'
                }}>
                  <div style={{ fontSize: '0.9rem', marginBottom: '10px' }}><strong>Blood Pressure Categories:</strong></div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 0',
                    borderBottom: '1px solid #eee'
                  }}>
                    <span style={{ fontSize: '0.9rem', width: '50%' }}>Normal</span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#2ecc71', width: '25%', textAlign: 'center' }}>
                      {'<'}120/80
                    </span>
                    <span style={{ fontSize: '0.85rem', color: '#666', width: '25%', textAlign: 'right' }}>
                      Optimal
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 0',
                    borderBottom: '1px solid #eee'
                  }}>
                    <span style={{ fontSize: '0.9rem', width: '50%' }}>Elevated</span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#f39c12', width: '25%', textAlign: 'center' }}>
                      120-129/{'<'}80
                    </span>
                    <span style={{ fontSize: '0.85rem', color: '#666', width: '25%', textAlign: 'right' }}>
                      Lifestyle changes
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 0'
                  }}>
                    <span style={{ fontSize: '0.9rem', width: '50%' }}>Hypertension Stage 1</span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#e74c3c', width: '25%', textAlign: 'center' }}>
                      130-139/80-89
                    </span>
                    <span style={{ fontSize: '0.85rem', color: '#666', width: '25%', textAlign: 'right' }}>
                      May need medication
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0984e3' }}>{results.targetReading}</div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>Target BP</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#00b894' }}>{results.healthMetrics.pressureLoad}%</div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>Pressure Load</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#d63031' }}>{results.nextReading}</div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>Next Reading</div>
                  </div>
                </div>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div><strong>Your Targets:</strong></div>
                <div>• Based on age: {results.conditions.age || 'Not specified'} years</div>
                <div>• Current reading: {results.reading}</div>
                <div>• Goal: Achieve and maintain target range</div>
              </div>
            </div>

            <div style={{ ...resultCardStyle, ...riskCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-exclamation-triangle"></i> Risk Assessment</h4>
              <div style={{ margin: '20px 0', maxHeight: '200px', overflowY: 'auto' }}>
                <div style={{ fontSize: '0.9rem', marginBottom: '10px', color: '#666' }}>
                  <strong>Cardiovascular Risk: <span style={{ color: results.cvRiskColor, fontWeight: 'bold' }}>{results.cvRisk}</span></strong>
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <div style={{ fontSize: '0.85rem', marginBottom: '5px' }}><strong>Identified Risk Factors:</strong></div>
                  {results.cvRiskFactors.length > 0 ? (
                    results.cvRiskFactors.map((factor, index) => (
                      <div key={index} style={{
                        padding: '8px',
                        background: '#f8f9fa',
                        borderRadius: '6px',
                        marginBottom: '6px',
                        borderLeft: '4px solid #fdcb6e'
                      }}>
                        <div style={{ fontSize: '0.85rem', color: '#2c3e50' }}>
                          • {factor}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={{ padding: '10px', background: '#f8f9fa', borderRadius: '6px', fontSize: '0.85rem' }}>
                      No significant risk factors identified from current reading
                    </div>
                  )}
                </div>
                {results.bmi && (
                  <div style={{ 
                    padding: '10px', 
                    background: '#e8f6f3',
                    borderRadius: '8px',
                    fontSize: '0.85rem'
                  }}>
                    <strong>BMI:</strong> {results.bmi} ({results.bmiCategory})
                  </div>
                )}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div><strong>Key Recommendations:</strong></div>
                {results.recommendations.slice(0, 3).map((rec, index) => (
                  <div key={index} style={{ marginBottom: '5px' }}>• {rec}</div>
                ))}
              </div>
            </div>

            <div style={{ ...resultCardStyle, ...trendsCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-chart-line"></i> Trends & History</h4>
              <div style={{ margin: '20px 0', maxHeight: '200px', overflowY: 'auto' }}>
                <div style={{ fontSize: '0.9rem', marginBottom: '10px', color: '#666' }}>
                  <strong>Recent Readings:</strong>
                </div>
                {history.slice(0, 5).map((entry, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px',
                    background: '#f8f9fa',
                    borderRadius: '6px',
                    marginBottom: '6px'
                  }}>
                    <div style={{ fontSize: '0.85rem', width: '30%' }}>{entry.date}</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 'bold', width: '30%', textAlign: 'center' }}>
                      {entry.systolic}/{entry.diastolic}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#666', width: '40%', textAlign: 'right' }}>
                      {entry.time} ({entry.position})
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div><strong>Pattern Analysis:</strong></div>
                <div>• Weekly trend: {results.trends.weeklyTrend}</div>
                <div>• Variability: {results.trends.variability}</div>
                <div>• Morning avg: {results.trends.morningAverage.systolic}/{results.trends.morningAverage.diastolic}</div>
                <div>• Evening avg: {results.trends.eveningAverage.systolic}/{results.trends.eveningAverage.diastolic}</div>
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
          <h3 style={sectionTitleStyle}><i className="fas fa-question-circle"></i> Comprehensive Blood Pressure Analysis: Advanced Hemodynamic Monitoring & Cardiovascular Risk Stratification Protocol</h3>
          <p style={paragraphStyle}><strong>Blood pressure tracking methodologies</strong> represent <strong>essential cardiovascular hemodynamic assessment tools</strong> for determining <strong>precise arterial pressure parameters, optimal hypertension classification algorithms, and evidence-based cardiovascular risk management strategies</strong>. These advanced monitoring systems integrate <strong>sophisticated hemodynamic analysis, comprehensive clinical data parameters, and validated cardiology research models</strong> to provide <strong>individualized blood pressure management approaches</strong> that maximize <strong>cardiovascular risk reduction effectiveness, hypertension control optimization, and informed treatment decision-making processes</strong> across diverse clinical scenarios requiring <strong>precision blood pressure stratification protocols</strong>.</p>
          
          <h3 style={sectionTitleStyle}><i className="fas fa-calculator"></i> Advanced Blood Pressure Algorithms - Comprehensive Hemodynamic Analysis Formulae</h3>
          <p style={paragraphStyle}>Multiple <strong>validated blood pressure calculation equations</strong> exist for <strong>comprehensive cardiovascular risk assessment protocols</strong>, each demonstrating specific <strong>clinical applications and variable prognostic accuracy profiles</strong> influencing <strong>therapeutic decision-making processes</strong>:</p>
          
          <div style={formulaBoxStyle}>
            <strong>Mean Arterial Pressure (MAP):</strong> MAP = Diastolic + (Systolic - Diastolic) ÷ 3<br/>
            <strong>Pulse Pressure Calculation:</strong> PP = Systolic - Diastolic<br/>
            <strong>Pulse Pressure Index:</strong> PPI = (Systolic - Diastolic) ÷ Systolic × 100%<br/>
            <strong>Rate Pressure Product:</strong> RPP = Systolic × Heart Rate ÷ 1000<br/>
            <strong>Double Product:</strong> DP = Systolic × Heart Rate<br/>
            <strong>Augmentation Index:</strong> AIx = (Augmentation Pressure) ÷ Pulse Pressure × 100%<br/>
            <strong>Central Aortic Pressure:</strong> CAP = 0.4 × (Systolic - Diastolic) + Diastolic<br/>
            <strong>Blood Pressure Variability:</strong> BPV = Standard Deviation of multiple readings
          </div>

          <h3 style={sectionTitleStyle}><i className="fas fa-stethoscope"></i> Clinical Applications of Blood Pressure Tracking - Comprehensive Cardiovascular Management Guidelines</h3>
          <p style={paragraphStyle}>Accurate <strong>blood pressure tracking methodology implementation</strong> serves critical functions across multiple <strong>medical specialties and cardiovascular health areas</strong> requiring <strong>precise hemodynamic monitoring strategies</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Hypertension Management Protocol:</strong> Essential for <strong>blood pressure classification strategies, treatment efficacy monitoring approaches, and complication prevention interventions</strong> in hypertensive patient populations</li>
            <li style={{ marginBottom: '10px' }}><strong>Cardiovascular Risk Stratification:</strong> Guides <strong>atherosclerotic cardiovascular disease risk scoring, stroke prevention algorithms, and heart failure prediction models</strong> for comprehensive cardiac risk assessment</li>
            <li style={{ marginBottom: '10px' }}><strong>Chronic Kidney Disease Monitoring:</strong> Determines <strong>renoprotective treatment targets, progression risk assessment methods, and dialysis requirement prediction strategies</strong> for renal disease management</li>
            <li style={{ marginBottom: '10px' }}><strong>Geriatric Health Assessment:</strong> Essential for <strong>orthostatic hypotension detection, frailty syndrome evaluation, and cognitive decline correlation analysis</strong> in elderly patient care</li>
            <li style={{ marginBottom: '10px' }}><strong>Pregnancy Hypertension Management:</strong> Manages <strong>gestational hypertension recognition, preeclampsia screening protocols, and fetal wellbeing assessment requirements</strong> for optimal maternal-fetal outcomes</li>
            <li style={{ marginBottom: '10px' }}><strong>Critical Care Hemodynamic Monitoring:</strong> Coordinates <strong>shock state recognition, fluid resuscitation guidance, vasopressor titration algorithms, and organ perfusion optimization approaches</strong> for intensive care management</li>
            <li><strong>Preventive Cardiology Applications:</strong> Facilitates <strong>primary prevention strategies, lifestyle intervention effectiveness evaluation, and population health screening methodologies</strong> for cardiovascular disease prevention</li>
          </ul>
          
          <h3 style={sectionTitleStyle}><i className="fas fa-balance-scale"></i> Key Factors in Blood Pressure Interpretation - Comprehensive Hemodynamic Assessment Considerations</h3>
          <p style={paragraphStyle}>Multiple <strong>significant physiological and methodological factors</strong> influence <strong>blood pressure interpretation parameters</strong> and require consideration for appropriate clinical decision-making:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Circadian Rhythm Variations:</strong> Nocturnal dipping patterns, morning surge magnitude, diurnal variation amplitude, and non-dipping phenomenon significantly affect <strong>cardiovascular risk assessment and treatment timing optimization</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Measurement Technique Variables:</strong> Cuff size appropriateness, arm position accuracy, measurement timing consistency, and device calibration status dramatically alter <strong>reading validity and clinical interpretation reliability</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>White Coat Phenomenon Impact:</strong> Clinical setting anxiety responses, healthcare provider interaction effects, and environmental stress influences create <strong>diagnostic accuracy challenges requiring ambulatory monitoring confirmation</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Masked Hypertension Considerations:</strong> Normal clinic readings with elevated home measurements, occupational stress contributions, and lifestyle factor influences demonstrate <strong>underdiagnosis risks requiring comprehensive assessment approaches</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Physiological State Effects:</strong> Postprandial changes, physical activity impacts, temperature variations, and hydration status influences affect <strong>blood pressure variability and single reading interpretation</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Medication Timing Factors:</strong> Peak-trough concentration variations, adherence pattern effects, combination therapy interactions, and rebound phenomenon occurrences create <strong>monitoring schedule requirements and dose adjustment needs</strong></li>
            <li><strong>Age and Comorbidity Interactions:</strong> Arterial stiffness progression, autonomic dysfunction development, medication sensitivity changes, and target organ damage accumulation significantly impact <strong>blood pressure targets and treatment intensity decisions</strong></li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-exclamation-triangle"></i> Limitations of Blood Pressure Tracking - Advanced Hemodynamic Assessment Methodologies</h3>
          <p style={paragraphStyle}>While <strong>blood pressure tracking methodologies</strong> provide valuable <strong>cardiovascular assessment tools</strong>, specific clinical situations necessitate <strong>advanced monitoring approaches</strong> and <strong>comprehensive hemodynamic evaluation protocols</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Complex Hypertension Scenarios:</strong> Resistant hypertension evaluation requirements, secondary hypertension investigation needs, and hypertensive emergency management demonstrating <strong>specialized diagnostic approaches beyond routine tracking</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Advanced Cardiovascular Disease:</strong> Heart failure with preserved ejection fraction assessment, aortic dissection monitoring requirements, and malignant hypertension management showing <strong>unique hemodynamic patterns requiring specialized protocols</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Critical Illness Monitoring:</strong> Septic shock hemodynamic assessment, postoperative hypertension management, and traumatic brain injury monitoring creating <strong>invasive monitoring necessities beyond non-invasive measurements</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Autonomic Dysfunction Contexts:</strong> Orthostatic hypotension syndrome evaluation, neurogenic hypertension assessment, and baroreflex failure management affecting <strong>blood pressure regulation requiring specialized testing</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Advanced Monitoring Requirements:</strong> Central aortic pressure measurement, arterial stiffness assessment, endothelial function testing, and cardiac output monitoring providing <strong>enhanced hemodynamic precision beyond peripheral measurements</strong></li>
            <li><strong>Population-Specific Considerations:</strong> Pediatric hypertension evaluation, pregnancy-related hypertensive disorders, elderly frailty syndrome, and athletic heart syndrome enabling <strong>enhanced individualized assessment approaches</strong></li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-history"></i> Historical Development of Blood Pressure Science - Evolution of Hemodynamic Understanding</h3>
          <p style={paragraphStyle}>The progressive evolution of <strong>blood pressure assessment and monitoring methodologies</strong> reflects <strong>centuries of medical research advancement</strong> and <strong>technological innovation trajectories</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Early Hemodynamic Discovery Era:</strong> Recognition of <strong>arterial pulsation principles, blood circulation concepts, and pressure measurement foundations</strong> establishing foundational cardiovascular physiology knowledge</li>
            <li style={{ marginBottom: '10px' }}><strong>Mercury Sphygmomanometer Development:</strong> Creation of <strong>auscultatory measurement techniques, Korotkoff sound identification, and standard cuff methodology establishment</strong> revolutionizing clinical blood pressure assessment</li>
            <li style={{ marginBottom: '10px' }}><strong>Electronic Monitoring Revolution:</strong> Introduction of <strong>oscillometric detection algorithms, digital display technologies, and automated measurement systems</strong> for accessible blood pressure monitoring</li>
            <li style={{ marginBottom: '10px' }}><strong>Ambulatory Monitoring Advancement:</strong> Development of <strong>24-hour tracking devices, circadian rhythm analysis capabilities, and masked hypertension detection methods</strong> for comprehensive blood pressure assessment</li>
            <li style={{ marginBottom: '10px' }}><strong>Central Hemodynamics Research:</strong> Identification of <strong>aortic pressure measurement importance, arterial stiffness assessment significance, and wave reflection analysis value</strong> for enhanced cardiovascular risk prediction</li>
            <li><strong>Digital Health Integration:</strong> Implementation of <strong>smartphone-connected devices, cloud-based tracking platforms, artificial intelligence interpretation algorithms, and telehealth monitoring applications</strong> for scalable cardiovascular care delivery</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-user-md"></i> Practical Clinical Implementation Recommendations - Comprehensive Cardiovascular Management Guidelines</h3>
          <p style={paragraphStyle}>For optimal <strong>blood pressure tracking implementation</strong> in contemporary clinical practice environments and <strong>evidence-based cardiovascular protocols</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Standardized Measurement Protocol:</strong> Implement <strong>proper cuff size selection, correct arm positioning, adequate rest period provision, and consistent timing establishment</strong> before clinical interpretation determination</li>
            <li style={{ marginBottom: '10px' }}><strong>Validated Monitoring Strategies:</strong> Utilize <strong>home blood pressure monitoring protocols, ambulatory assessment indications, clinical measurement standards, and combination approach applications</strong> for accurate hypertension diagnosis</li>
            <li style={{ marginBottom: '10px' }}><strong>Comprehensive Risk Assessment:</strong> Develop <strong>cardiovascular risk scoring integration, target organ damage evaluation, secondary cause screening, and comorbidity consideration frameworks</strong> for holistic patient management</li>
            <li style={{ marginBottom: '10px' }}><strong>Individualized Treatment Planning:</strong> Establish <strong>personalized blood pressure targets, appropriate medication selection algorithms, lifestyle intervention customization, and monitoring schedule optimization</strong> for optimal treatment outcomes</li>
            <li style={{ marginBottom: '10px' }}><strong>Patient Education Systems:</strong> Implement <strong>self-monitoring technique instruction, medication adherence support, lifestyle modification guidance, and emergency recognition education</strong> for empowered patient participation</li>
            <li><strong>Multidisciplinary Collaboration Framework:</strong> Coordinate <strong>primary care-cardiologist communication, pharmacy consultation, nutritionist involvement, and nursing support integration</strong> for comprehensive cardiovascular care delivery</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-chart-line"></i> Future Directions in Blood Pressure Monitoring - Emerging Cardiovascular Technologies</h3>
          <p style={paragraphStyle}>Ongoing <strong>blood pressure research initiatives</strong> continue refining <strong>monitoring and interpretation approaches</strong> with promising technological developments and <strong>innovative cardiovascular methodologies</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Wearable Continuous Monitoring:</strong> Smartwatch-based blood pressure tracking, cuffless measurement technologies, and real-time hemodynamic assessment devices for comprehensive cardiovascular monitoring</li>
            <li style={{ marginBottom: '10px' }}><strong>Artificial Intelligence Applications:</strong> Machine learning algorithm development for <strong>predictive hypertension models</strong> incorporating multi-parameter data, treatment response prediction, and complication risk assessment</li>
            <li style={{ marginBottom: '10px' }}><strong>Advanced Hemodynamic Profiling:</strong> Central aortic pressure measurement devices, arterial stiffness assessment technologies, endothelial function testing systems, and cardiac output monitoring platforms for enhanced cardiovascular characterization</li>
            <li style={{ marginBottom: '10px' }}><strong>Integrated Digital Health Platforms:</strong> Development of <strong>comprehensive cardiovascular management systems, remote patient monitoring applications, telehealth consultation platforms, and population health tracking solutions</strong> for scalable care delivery</li>
            <li style={{ marginBottom: '10px' }}><strong>Personalized Medicine Integration:</strong> Genetic predisposition testing for hypertension, pharmacogenetic treatment response prediction, individualized target setting algorithms, and precision therapy approaches based on <strong>patient-specific characteristics</strong></li>
            <li><strong>Global Health Innovations:</strong> Creation of <strong>low-cost monitoring technologies, resource-limited setting adaptations, community-based screening programs, and task-shifting implementation strategies</strong> for equitable cardiovascular care access</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-graduation-cap"></i> Educational Requirements and Professional Training Standards Implementation</h3>
          <p style={paragraphStyle}>Proper <strong>blood pressure measurement and interpretation methodology education</strong> represents an <strong>essential clinical competency requirement</strong> for <strong>healthcare professionals</strong> across multiple medical disciplines. Comprehensive training curricula should systematically include <strong>hemodynamic physiology principles, measurement technique fundamentals, hypertension classification strategies, and cardiovascular risk assessment methods</strong>. Continuing professional education programs must consistently address <strong>evolving cardiovascular research findings, changing clinical practice standards, and emerging technological developments</strong> to ensure optimal patient outcomes and evidence-based practice implementation across diverse healthcare, cardiovascular, and primary care delivery settings and specialty practice areas.</p>

          <h3 style={sectionTitleStyle}><i className="fas fa-clipboard-check"></i> Quality Assurance and Protocol Standardization Implementation</h3>
          <p style={paragraphStyle}>Implementation of <strong>rigorous quality assurance protocols</strong> ensures <strong>consistent cardiovascular management practices</strong> across diverse clinical settings. These protocols encompass <strong>measurement standardization methodologies, device calibration requirements, interpretation guideline adherence, and treatment protocol implementation standards</strong> that directly impact <strong>cardiovascular outcomes and hypertension management effectiveness</strong>. Professional organizations should develop <strong>standardized training materials, competency assessment tools, and clinical practice guideline documents</strong> to guarantee consistent clinical application quality across diverse healthcare delivery settings and specialty practice areas, ensuring optimal outcomes through evidence-based cardiovascular management approaches.</p>
        </div>

        {/* Q&A Dropdown Section */}
        <div style={faqSectionStyle}>
          <h2 style={faqTitleStyle}><i className="fas fa-question-circle"></i> Frequently Asked Questions About Blood Pressure</h2>
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
          <h3 style={sectionTitleStyle}><i className="fas fa-calculator"></i> Related Cardiovascular & Health Calculators</h3>
          <p style={paragraphStyle}>Explore our comprehensive collection of <strong>cardiovascular calculation tools and health monitoring calculators</strong> for blood pressure management and overall cardiovascular health:</p>
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
          <h4 style={disclaimerTitleStyle}><i className="fas fa-exclamation-triangle"></i> Important Medical & Cardiovascular Disclaimer</h4>
          <p style={paragraphStyle}><strong>This blood pressure tracker provides educational and informational analysis only.</strong> The calculations and classifications are based on standard medical guidelines and should not be used as a substitute for professional medical advice, diagnosis, or treatment.</p>
          <p style={paragraphStyle}><strong>Hypertensive Crisis Warning:</strong> Blood pressure readings {'>'}180/120 mmHg constitute a medical emergency. If you have symptoms such as chest pain, shortness of breath, severe headache, vision changes, difficulty speaking, or confusion along with high blood pressure, SEEK EMERGENCY MEDICAL ATTENTION IMMEDIATELY.</p>
          <p style={paragraphStyle}><strong>Professional Medical Consultation Required:</strong> Always seek the advice of your physician, cardiologist, or other qualified healthcare provider with any questions regarding blood pressure, hypertension, or cardiovascular health. Do not disregard professional medical advice or delay seeking it because of information provided by this tracker.</p>
          <p style={paragraphStyle}><strong>Medication Management Caution:</strong> Do not start, stop, or change blood pressure medications without consulting your healthcare provider. Medication adjustments require professional medical supervision and monitoring.</p>
          <p style={{ marginBottom: '10px' }}><strong>Individual Variation Considerations:</strong> Blood pressure targets and treatment approaches vary based on age, comorbidities, medication history, and individual risk factors. These calculations provide general guidelines that should be adjusted based on professional medical guidance.</p>
          <p style={{ marginBottom: '10px' }}><strong>Measurement Accuracy Limitations:</strong> Home blood pressure monitoring requires proper technique, appropriate equipment, and consistent conditions. Single readings have limited value - patterns over time are more significant for clinical decision-making.</p>
          <p style={{ marginBottom: '10px' }}><strong>Lifestyle and Medical Integration:</strong> Blood pressure management involves comprehensive approaches including medication, diet, exercise, stress management, and regular monitoring. All components should be addressed under professional guidance for optimal cardiovascular health.</p>
          <p><strong>Emergency Preparedness:</strong> Know the signs of hypertensive emergency and stroke (FAST: Face drooping, Arm weakness, Speech difficulty, Time to call emergency services). Have a plan for seeking urgent medical care if needed.</p>
        </div>
      </section>

      {/* Sidebar with 3 Ads (3rd one sticky) */}
      {showSidebar && (
        <aside style={sidebarStyle}>
          <div style={sidebarContentStyle}>
            <div style={{ ...adSlotStyle, ...sidebarAdStyle }}>
              <p><i className="fas fa-ad"></i> Advertisement 1</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Sponsored Content</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Premium blood pressure monitoring kit</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>300px height ad slot</p>
            </div>
            
            <div style={{ ...adSlotStyle, ...sidebarAdStyle }}>
              <p><i className="fas fa-ad"></i> Advertisement 2</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Featured Product</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>24-hour ambulatory BP monitor</p>
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
                <i className="fas fa-mobile-alt"></i> Mobile Health Tracker
              </p>
              <p style={{ fontSize: '0.8rem', margin: '5px 0 0 0', color: '#666' }}>
                Track blood pressure anytime, anywhere - Free download
              </p>
            </div>
            <button style={{
              background: '#d63031',
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