"use client";

import { useState, useEffect } from 'react';

export default function AnionGapCalculatorPage() {
  const [sodium, setSodium] = useState('');
  const [chloride, setChloride] = useState('');
  const [bicarbonate, setBicarbonate] = useState('');
  const [potassium, setPotassium] = useState('');
  const [albumin, setAlbumin] = useState('');
  const [phosphate, setPhosphate] = useState('');
  const [lactate, setLactate] = useState('');
  const [glucose, setGlucose] = useState('');
  const [bun, setBun] = useState('');
  const [creatinine, setCreatinine] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientGender, setPatientGender] = useState('male');
  const [clinicalScenario, setClinicalScenario] = useState('routine');
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
    background: '#9b59b6',
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
    background: '#8e44ad',
    transform: 'translateY(-2px)',
    boxShadow: '0 5px 15px rgba(155, 89, 182, 0.2)'
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

  const gapCardStyle = {
    borderTopColor: '#9b59b6'
  };

  const interpretationCardStyle = {
    borderTopColor: '#3498db'
  };

  const correctionCardStyle = {
    borderTopColor: '#e74c3c'
  };

  const differentialCardStyle = {
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
    borderLeft: '4px solid #9b59b6',
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
    background: '#f5eef8',
    border: '2px solid #9b59b6',
    boxShadow: '0 4px 12px rgba(155, 89, 182, 0.15)',
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
    borderTop: '2px solid #9b59b6',
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
    background: '#9b59b6',
    color: 'white',
    transform: 'translateY(-3px)',
    boxShadow: '0 5px 15px rgba(155, 89, 182, 0.2)',
    borderColor: '#9b59b6'
  };

  const medicalDisclaimerStyle = {
    margin: '40px 0',
    padding: '25px',
    background: '#f9f0fc',
    borderRadius: '10px',
    borderLeft: '5px solid #9b59b6',
    fontSize: '0.9rem',
    color: '#666'
  };

  const disclaimerTitleStyle = {
    color: '#8e44ad',
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  // Normal ranges
  const normalRanges = {
    sodium: { min: 135, max: 145, unit: 'mmol/L' },
    chloride: { min: 98, max: 107, unit: 'mmol/L' },
    bicarbonate: { min: 22, max: 28, unit: 'mmol/L' },
    potassium: { min: 3.5, max: 5.0, unit: 'mmol/L' },
    albumin: { min: 3.5, max: 5.0, unit: 'g/dL' },
    phosphate: { min: 2.5, max: 4.5, unit: 'mg/dL' },
    lactate: { min: 0.5, max: 2.2, unit: 'mmol/L' },
    glucose: { min: 70, max: 100, unit: 'mg/dL' },
    bun: { min: 7, max: 20, unit: 'mg/dL' },
    creatinine: { min: 0.6, max: 1.2, unit: 'mg/dL' }
  };

  // Sample data for demo
  useEffect(() => {
    setSodium('140');
    setChloride('102');
    setBicarbonate('24');
    setPotassium('4.0');
    setAlbumin('4.2');
    setPhosphate('3.5');
    setLactate('1.5');
    setGlucose('95');
    setBun('15');
    setCreatinine('1.0');
    setPatientAge('45');
    setPatientGender('male');
    setClinicalScenario('routine');

    // Generate sample history
    const historyData = [];
    for (let i = 0; i < 5; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const anionGap = Math.floor(Math.random() * 8) + 8;
      const scenarios = ['Routine', 'DKA', 'Renal Failure', 'Intoxication'];
      const scenarioType = scenarios[Math.floor(Math.random() * scenarios.length)];
      
      historyData.push({
        date: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        gap: anionGap,
        scenario: scenarioType,
        sodium: Math.floor(Math.random() * 10) + 135,
        chloride: Math.floor(Math.random() * 10) + 98
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

  const calculateAnionGap = () => {
    // Validate required inputs
    if (!sodium || !chloride || !bicarbonate) {
      alert('Please fill in Sodium, Chloride, and Bicarbonate values.');
      return;
    }

    const sodiumVal = parseFloat(sodium);
    const chlorideVal = parseFloat(chloride);
    const bicarbonateVal = parseFloat(bicarbonate);
    const potassiumVal = potassium ? parseFloat(potassium) : 0;
    const albuminVal = albumin ? parseFloat(albumin) : 4.2;
    const phosphateVal = phosphate ? parseFloat(phosphate) : 3.5;
    const lactateVal = lactate ? parseFloat(lactate) : null;
    const glucoseVal = glucose ? parseFloat(glucose) : null;
    const bunVal = bun ? parseFloat(bun) : null;
    const creatinineVal = creatinine ? parseFloat(creatinine) : null;
    const ageVal = patientAge ? parseInt(patientAge) : null;

    // Validate ranges
    if (sodiumVal < 100 || sodiumVal > 200) {
      alert('Sodium value appears out of range (normal: 135-145 mmol/L). Please verify.');
    }
    if (chlorideVal < 80 || chlorideVal > 130) {
      alert('Chloride value appears out of range (normal: 98-107 mmol/L). Please verify.');
    }
    if (bicarbonateVal < 5 || bicarbonateVal > 40) {
      alert('Bicarbonate value appears out of range (normal: 22-28 mmol/L). Please verify.');
    }

    // Calculate traditional anion gap
    const traditionalGap = sodiumVal - (chlorideVal + bicarbonateVal);
    
    // Calculate anion gap with potassium (less common)
    const gapWithK = (sodiumVal + potassiumVal) - (chlorideVal + bicarbonateVal);
    
    // Calculate delta ratio
    const deltaGap = traditionalGap - 12; // Using 12 as normal gap
    const deltaBicarb = 24 - bicarbonateVal; // Using 24 as normal bicarb
    const deltaRatio = deltaBicarb > 0 ? (deltaGap / deltaBicarb).toFixed(2) : 'N/A';

    // Calculate albumin-corrected anion gap
    const albuminCorrection = 2.5 * (4.5 - albuminVal); // Assuming normal albumin 4.5 g/dL
    const correctedGap = traditionalGap + albuminCorrection;

    // Calculate phosphate-corrected gap (for renal failure)
    const phosphateCorrection = 1.6 * (4.0 - phosphateVal); // Assuming normal phosphate 4.0 mg/dL
    const phosphateCorrectedGap = traditionalGap + phosphateCorrection;

    // Calculate osmolal gap
    const calculatedOsmolality = 2 * sodiumVal + (glucoseVal ? glucoseVal/18 : 0) + (bunVal ? bunVal/2.8 : 0);
    const measuredOsmolality = calculatedOsmolality + 10; // Simulated measured osmolality
    const osmolalGap = measuredOsmolality - calculatedOsmolality;

    // Determine gap interpretation
    let interpretation = '';
    let interpretationColor = '';
    let clinicalSignificance = '';

    if (traditionalGap < 3) {
      interpretation = 'Low Anion Gap';
      interpretationColor = '#3498db';
      clinicalSignificance = 'Possible hypoalbuminemia, multiple myeloma, lithium toxicity, bromide intoxication, or laboratory error';
    } else if (traditionalGap >= 3 && traditionalGap <= 11) {
      interpretation = 'Normal Anion Gap';
      interpretationColor = '#2ecc71';
      clinicalSignificance = 'Normal acid-base status or hyperchloremic metabolic acidosis';
    } else if (traditionalGap > 11 && traditionalGap <= 20) {
      interpretation = 'High Anion Gap Metabolic Acidosis';
      interpretationColor = '#f39c12';
      clinicalSignificance = 'Possible ketoacidosis, lactic acidosis, renal failure, or toxin ingestion';
    } else {
      interpretation = 'Severely Elevated Anion Gap';
      interpretationColor = '#e74c3c';
      clinicalSignificance = 'Strongly suggests toxic alcohol ingestion, severe lactic acidosis, or advanced renal failure. Requires urgent evaluation.';
    }

    // Calculate delta-delta interpretation
    let deltaInterpretation = '';
    if (deltaRatio !== 'N/A') {
      const ratio = parseFloat(deltaRatio);
      if (ratio < 0.4) deltaInterpretation = 'Normal anion gap metabolic acidosis';
      else if (ratio >= 0.4 && ratio <= 0.8) deltaInterpretation = 'Mixed high and normal anion gap metabolic acidosis';
      else if (ratio > 0.8 && ratio < 1.2) deltaInterpretation = 'Pure high anion gap metabolic acidosis';
      else if (ratio >= 1.2 && ratio <= 2.0) deltaInterpretation = 'High anion gap metabolic acidosis + metabolic alkalosis';
      else deltaInterpretation = 'Possible laboratory error or mixed disorder';
    }

    // Generate differential diagnosis
    const differentialDiagnosis = [];
    
    if (traditionalGap > 11) {
      differentialDiagnosis.push(
        { condition: 'Diabetic Ketoacidosis (DKA)', keyFeatures: 'Elevated glucose, ketonuria, Kussmaul respirations' },
        { condition: 'Lactic Acidosis', keyFeatures: 'Elevated lactate, tissue hypoperfusion, sepsis' },
        { condition: 'Renal Failure', keyFeatures: 'Elevated BUN/Cr, oliguria, uremic symptoms' },
        { condition: 'Toxic Alcohol Ingestion', keyFeatures: 'Osmolal gap >10, visual changes, abdominal pain' },
        { condition: 'Salicylate Poisoning', keyFeatures: 'Tinnitus, hyperventilation, mixed respiratory alkalosis' },
        { condition: 'Starvation Ketosis', keyFeatures: 'Mild ketosis, recent fasting, normal glucose' }
      );
    } else if (traditionalGap < 3) {
      differentialDiagnosis.push(
        { condition: 'Hypoalbuminemia', keyFeatures: 'Low albumin, chronic illness, liver disease' },
        { condition: 'Multiple Myeloma', keyFeatures: 'Monoclonal gammopathy, bone pain, anemia' },
        { condition: 'Bromide Intoxication', keyFeatures: 'Neurological symptoms, skin lesions, halide interference' },
        { condition: 'Lithium Therapy', keyFeatures: 'Therapeutic lithium levels, psychiatric history' },
        { condition: 'Hypercalcemia', keyFeatures: 'Elevated calcium, malignancy, hyperparathyroidism' }
      );
    }

    // Calculate risk assessment
    let riskLevel = 'Low';
    let riskColor = '#2ecc71';
    let urgentRecommendations = [];

    if (traditionalGap > 25) {
      riskLevel = 'Critical';
      riskColor = '#e74c3c';
      urgentRecommendations.push('Immediate medical evaluation required');
      urgentRecommendations.push('Consider toxic alcohol ingestion until proven otherwise');
      urgentRecommendations.push('Check serum osmolality, lactate, ketones, toxicology screen');
    } else if (traditionalGap > 20) {
      riskLevel = 'High';
      riskColor = '#e74c3c';
      urgentRecommendations.push('Urgent medical evaluation recommended');
      urgentRecommendations.push('Assess for DKA, lactic acidosis, renal failure');
      urgentRecommendations.push('Check glucose, renal function, lactate levels');
    } else if (traditionalGap > 11) {
      riskLevel = 'Moderate';
      riskColor = '#f39c12';
      urgentRecommendations.push('Medical evaluation recommended');
      urgentRecommendations.push('Assess underlying cause of acidosis');
      urgentRecommendations.push('Monitor for progression');
    }

    // Generate management recommendations
    const managementRecommendations = [
      'Evaluate clinical context and patient symptoms',
      'Check additional labs: lactate, ketones, renal function, toxicology if indicated',
      'Assess volume status and tissue perfusion',
      'Consider arterial blood gas for pH and pCO2 confirmation',
      'Treat underlying cause rather than just correcting numbers'
    ];

    // Calculate GFR if creatinine available
    let gfr = null;
    if (creatinineVal && ageVal) {
      const raceFactor = patientGender === 'male' ? 1 : 0.85;
      gfr = Math.round((140 - ageVal) * (patientGender === 'male' ? 1 : 0.85) / creatinineVal);
    }

    // Calculate expected compensation
    let expectedCompensation = '';
    const pCO2Expected = 1.5 * bicarbonateVal + 8;
    expectedCompensation = `Expected pCO2: ${pCO2Expected.toFixed(1)} mmHg ± 2`;

    setResults({
      traditionalGap: traditionalGap.toFixed(1),
      gapWithK: gapWithK.toFixed(1),
      correctedGap: correctedGap.toFixed(1),
      phosphateCorrectedGap: phosphateCorrectedGap.toFixed(1),
      deltaRatio: deltaRatio,
      osmolalGap: osmolalGap.toFixed(1),
      interpretation: interpretation,
      interpretationColor: interpretationColor,
      clinicalSignificance: clinicalSignificance,
      deltaInterpretation: deltaInterpretation,
      differentialDiagnosis: differentialDiagnosis,
      riskLevel: riskLevel,
      riskColor: riskColor,
      urgentRecommendations: urgentRecommendations,
      managementRecommendations: managementRecommendations,
      expectedCompensation: expectedCompensation,
      gfr: gfr,
      albuminCorrection: albuminCorrection.toFixed(1),
      phosphateCorrection: phosphateCorrection.toFixed(1),
      values: {
        sodium: sodiumVal,
        chloride: chlorideVal,
        bicarbonate: bicarbonateVal,
        potassium: potassiumVal,
        albumin: albuminVal,
        phosphate: phosphateVal,
        lactate: lactateVal,
        glucose: glucoseVal,
        bun: bunVal,
        creatinine: creatinineVal
      },
      normalRanges: normalRanges,
      history: history
    });
  };

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "What is the clinical significance of a low anion gap (<3 mmol/L)? What conditions cause it?",
      answer: "Low anion gap (<3 mmol/L) is less common but clinically significant. Causes include: 1) Hypoalbuminemia (most common): Albumin is negatively charged. Each 1 g/dL decrease lowers gap by ~2.5 mmol/L. Seen in liver disease, nephrotic syndrome, malnutrition. 2) Monoclonal gammopathies: Multiple myeloma produces cationic IgG paraproteins that increase unmeasured cations. 3) Hypercalcemia/Hypermagnesemia: Increased unmeasured cations. 4) Lithium therapy: Lithium is unmeasured cation. 5) Bromide intoxication: Bromide measured as chloride, falsely lowering gap. 6) Severe hyperviscosity: Lab error from decreased sample mixing. 7) Hyperphosphatemia: Rare, phosphate is measured anion. Clinical approach: Check albumin first, then consider paraprotein screen if albumin normal. Low gap with normal albumin suggests myeloma or laboratory error. Always correlate with clinical context."
    },
    {
      question: "How do you distinguish between the causes of high anion gap metabolic acidosis (MUDPILES vs GOLDMARK)?",
      answer: "Traditional MUDPILES: Methanol, Uremia, DKA, Paraldehyde, Iron/Isoniazid, Lactic acidosis, Ethanol/Ethylene glycol, Salicylates. Modern GOLDMARK: Glycols (ethylene, propylene), Oxoproline (pyroglutamic acid from acetaminophen/antibiotics), L-lactate (tissue hypoxia, sepsis), D-lactate (short bowel syndrome), Methanol, Aspirin (salicylates), Renal failure (uremia), Ketoacidosis (diabetic, alcoholic, starvation). Diagnostic approach: 1) Check glucose (DKA), creatinine/BUN (uremia), lactate (tissue hypoxia). 2) Calculate osmolal gap: >10 suggests toxic alcohols. 3) Check ketones: Serum beta-hydroxybutyrate for DKA/starvation. 4) Urinalysis: Oxalate crystals (ethylene glycol), hippurate crystals (toluene). 5) Drug history: Salicylates, metformin, INH. 6) Special tests: Ethylene glycol level, methanol level, serum osmolality. Delta ratio helps identify mixed disorders."
    },
    {
      question: "What is the delta-delta ratio and how is it used clinically in acid-base interpretation?",
      answer: "Delta-delta ratio = (Anion gap - 12) ÷ (24 - HCO3). Interpretation: <0.4: Hyperchloremic metabolic acidosis alone (normal AG acidosis). 0.4-0.8: Mixed high AG and normal AG metabolic acidosis. 0.8-1.2: Pure high AG metabolic acidosis. 1.2-2.0: High AG metabolic acidosis + metabolic alkalosis. >2.0: Consider laboratory error or chronic respiratory alkalosis with metabolic acidosis. Clinical utility: 1) Identifies mixed acid-base disorders. 2) Helps determine if bicarbonate change is appropriate for gap increase. 3) Guides diagnostic workup. Limitations: Assumes normal AG=12, normal HCO3=24, which varies. Albumin correction improves accuracy. Not reliable with extreme values or rapid changes. Use with clinical correlation. Example: Gap=20, HCO3=16. Delta gap=8, delta HCO3=8, ratio=1.0 = pure high AG acidosis."
    },
    {
      question: "How does albumin affect anion gap calculation and why is correction necessary?",
      answer: "Albumin is the major unmeasured anion, contributing ~75% of normal anion gap. Each 1 g/dL decrease in albumin lowers anion gap by approximately 2.5 mmol/L (range 2.2-2.8). Correction formula: Corrected AG = Measured AG + 2.5 × (4.5 - Albumin). Why correct? 1) Avoids missing high AG acidosis in hypoalbuminemic patients (critically ill, liver disease, nephrotic syndrome). 2) Prevents overdiagnosis of low AG. 3) Improves delta-delta ratio accuracy. Clinical scenarios requiring correction: Critically ill patients (common albumin <3.0), chronic liver disease, nephrotic syndrome, malnutrition, burns. Example: Patient with albumin 2.0 g/dL, measured AG=8. Without correction: 'normal AG'. Corrected AG = 8 + 2.5×(4.5-2.0) = 8 + 6.25 = 14.25 → High AG acidosis. Always consider correction when albumin <4.0 g/dL."
    },
    {
      question: "What is the osmolal gap and how is it used in toxic alcohol ingestion?",
      answer: "Osmolal gap = Measured osmolality - Calculated osmolality. Calculated Osm = 2×Na + Glucose/18 + BUN/2.8 (all mmol/L). Normal osmolal gap: <10 mOsm/kg. Elevated osmolal gap (>10) suggests presence of unmeasured osmoles: 1) Toxic alcohols: Methanol, ethylene glycol, isopropanol. 2) Ethanol. 3) Mannitol, glycerol. 4) Severe lactic acidosis, ketoacidosis. 5) Renal failure. In toxic alcohol ingestion: Gap >25 strongly suggestive, >50 diagnostic. Important considerations: 1) Early presentation may have normal gap if not yet metabolized. 2) Late presentation may have normal gap as alcohols metabolize to acids. 3) Always calculate with and without ethanol. 4) Correlation with AG: Initial: High osmolal gap, normal AG. Later: Normal osmolal gap, high AG (as metabolized to acids). Treatment implications: Fomepizole for gap >10 with suspicion, dialysis for severe cases."
    },
    {
      question: "Can you have a normal anion gap with metabolic acidosis? What are the causes?",
      answer: "Yes, normal anion gap (hyperchloremic) metabolic acidosis occurs when HCO3 loss is balanced by Cl retention, keeping gap normal. Causes: 1) Gastrointestinal HCO3 loss: Diarrhea, pancreatic fistula, ureteral diversions. 2) Renal tubular acidosis: Type 1 (distal), Type 2 (proximal), Type 4 (hypoaldosteronism). 3) Early renal failure. 4) Acid infusion: HCl, NH4Cl, hyperalimentation. 5) Carbonic anhydrase inhibitors. 6) Recovery phase of DKA. 7) Toluene inhalation. Diagnosis: Urine anion gap (UAG) helps distinguish: Negative UAG (<0): GI loss. Positive UAG (>0): Renal loss (RTA). Further differentiation: Type 1 RTA: Urine pH >5.5 despite acidemia, low citrate. Type 2 RTA: Fanconi syndrome, glycosuria, aminoaciduria. Type 4 RTA: Hyperkalemia. Treatment: Address underlying cause, bicarbonate replacement for RTA, manage complications."
    }
  ];

  const healthCalculators = [
    { name: "Acid-Base Calculator", link: "/acid-base-calculator" },
    { name: "Anion Gap Calculator", link: "/anion-gap-calculator" },
    { name: "Osmolal Gap Calculator", link: "/osmolal-gap-calculator" },
    { name: "Delta Ratio Calculator", link: "/delta-ratio-calculator" },
    { name: "Winter's Formula Calculator", link: "/winters-formula-calculator" },
    { name: "Renal Function Calculator", link: "/renal-function-calculator" },
    { name: "GFR Calculator", link: "/gfr-calculator" },
    { name: "Electrolyte Calculator", link: "/electrolyte-calculator" },
    { name: "Acidosis Severity Score", link: "/acidosis-severity-score" },
    { name: "Toxicology Risk Calculator", link: "/toxicology-risk-calculator" },
    { name: "Metabolic Panel Analyzer", link: "/metabolic-panel-analyzer" },
    { name: "Clinical Decision Support", link: "/clinical-decision-support" }
  ];

  return (
    <main style={containerStyle}>
      <section style={calculatorBoxStyle}>
        <h1 style={calcTitleStyle}>
          <i className="fas fa-flask"></i> Anion Gap Calculator - Comprehensive Metabolic Acidosis Analysis & Clinical Decision Support Platform
        </h1>
        <p style={calcDescStyle}>
          Calculate <strong>precise anion gap values, differential diagnosis algorithms, and evidence-based clinical management recommendations</strong> using <strong>advanced biochemical equations, comprehensive electrolyte data integration, and current critical care medicine protocols</strong>. Essential for <strong>metabolic acidosis evaluation, toxicology assessment, and informed clinical decision-making</strong> in emergency and critical care settings.
        </p>

        <div style={inputGridStyle}>
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-tint"></i> Sodium (Na+) *</label>
            <input
              type="number"
              value={sodium}
              onChange={(e) => setSodium(e.target.value)}
              placeholder="140"
              min="100"
              max="200"
              step="0.1"
              style={inputStyle}
              required
            />
            <small style={{ color: '#666', fontSize: '0.8rem' }}>
              Normal: 135-145 mmol/L
            </small>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-tint"></i> Chloride (Cl-) *</label>
            <input
              type="number"
              value={chloride}
              onChange={(e) => setChloride(e.target.value)}
              placeholder="102"
              min="80"
              max="130"
              step="0.1"
              style={inputStyle}
              required
            />
            <small style={{ color: '#666', fontSize: '0.8rem' }}>
              Normal: 98-107 mmol/L
            </small>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-tint"></i> Bicarbonate (HCO3-) *</label>
            <input
              type="number"
              value={bicarbonate}
              onChange={(e) => setBicarbonate(e.target.value)}
              placeholder="24"
              min="5"
              max="40"
              step="0.1"
              style={inputStyle}
              required
            />
            <small style={{ color: '#666', fontSize: '0.8rem' }}>
              Normal: 22-28 mmol/L
            </small>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-tint"></i> Potassium (K+)</label>
            <input
              type="number"
              value={potassium}
              onChange={(e) => setPotassium(e.target.value)}
              placeholder="4.0"
              min="2.0"
              max="8.0"
              step="0.1"
              style={inputStyle}
            />
            <small style={{ color: '#666', fontSize: '0.8rem' }}>
              Optional - for gap with K+
            </small>
          </div>
        </div>

        <div style={inputGridStyle}>
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-vial"></i> Albumin (g/dL)</label>
            <input
              type="number"
              value={albumin}
              onChange={(e) => setAlbumin(e.target.value)}
              placeholder="4.2"
              min="1.0"
              max="6.0"
              step="0.1"
              style={inputStyle}
            />
            <small style={{ color: '#666', fontSize: '0.8rem' }}>
              For albumin correction
            </small>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-vial"></i> Phosphate (mg/dL)</label>
            <input
              type="number"
              value={phosphate}
              onChange={(e) => setPhosphate(e.target.value)}
              placeholder="3.5"
              min="0.5"
              max="15.0"
              step="0.1"
              style={inputStyle}
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-heartbeat"></i> Lactate (mmol/L)</label>
            <input
              type="number"
              value={lactate}
              onChange={(e) => setLactate(e.target.value)}
              placeholder="1.5"
              min="0.1"
              max="30.0"
              step="0.1"
              style={inputStyle}
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-syringe"></i> Glucose (mg/dL)</label>
            <input
              type="number"
              value={glucose}
              onChange={(e) => setGlucose(e.target.value)}
              placeholder="95"
              min="20"
              max="1000"
              step="1"
              style={inputStyle}
            />
          </div>
        </div>

        <div style={inputGridStyle}>
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-kidneys"></i> BUN (mg/dL)</label>
            <input
              type="number"
              value={bun}
              onChange={(e) => setBun(e.target.value)}
              placeholder="15"
              min="2"
              max="150"
              step="0.1"
              style={inputStyle}
            />
            <small style={{ color: '#666', fontSize: '0.8rem' }}>
              Blood Urea Nitrogen
            </small>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-kidneys"></i> Creatinine (mg/dL)</label>
            <input
              type="number"
              value={creatinine}
              onChange={(e) => setCreatinine(e.target.value)}
              placeholder="1.0"
              min="0.2"
              max="20.0"
              step="0.1"
              style={inputStyle}
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-user"></i> Patient Age</label>
            <input
              type="number"
              value={patientAge}
              onChange={(e) => setPatientAge(e.target.value)}
              placeholder="45"
              min="0"
              max="120"
              step="1"
              style={inputStyle}
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-venus-mars"></i> Gender</label>
            <select
              value={patientGender}
              onChange={(e) => setPatientGender(e.target.value)}
              style={selectStyle}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        <div style={inputGridStyle}>
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-stethoscope"></i> Clinical Scenario</label>
            <select
              value={clinicalScenario}
              onChange={(e) => setClinicalScenario(e.target.value)}
              style={selectStyle}
            >
              <option value="routine">Routine Evaluation</option>
              <option value="dka">Suspected DKA</option>
              <option value="renal">Renal Failure</option>
              <option value="toxicology">Toxic Ingestion</option>
              <option value="critical">Critical Care</option>
              <option value="metabolic">Metabolic Disorder</option>
            </select>
          </div>
        </div>

        <button
          style={calcBtnStyle}
          onClick={calculateAnionGap}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, calcBtnHoverStyle)}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = calcBtnStyle.background;
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <i className="fas fa-calculator"></i> Calculate Anion Gap & Analyze
        </button>

        {/* Results Display */}
        {results && (
          <div style={resultsContainerStyle}>
            <div style={{ ...resultCardStyle, ...gapCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-calculator"></i> Anion Gap Results</h4>
              <div style={{ margin: '20px 0' }}>
                <div style={{ ...resultValueStyle, color: results.interpretationColor }}>
                  {results.traditionalGap} mmol/L
                </div>
                <div style={{ 
                  fontSize: '1.2rem', 
                  color: '#666',
                  marginBottom: '15px',
                  fontWeight: 'bold'
                }}>
                  {results.interpretation}
                </div>
                <div style={{ 
                  padding: '15px', 
                  background: results.riskColor === '#e74c3c' ? '#f8d7da' : 
                            results.riskColor === '#f39c12' ? '#fff3cd' : '#d4edda',
                  borderRadius: '8px',
                  color: results.riskColor === '#e74c3c' ? '#721c24' : 
                        results.riskColor === '#f39c12' ? '#856404' : '#155724',
                  fontWeight: '600',
                  marginBottom: '15px'
                }}>
                  {results.riskLevel} Risk Level | {results.clinicalSignificance}
                </div>
                <div style={{ 
                  padding: '10px', 
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  color: '#666'
                }}>
                  <div><strong>With K+:</strong> {results.gapWithK} mmol/L</div>
                  <div><strong>Albumin-corrected:</strong> {results.correctedGap} mmol/L (correction: +{results.albuminCorrection})</div>
                  <div><strong>Delta ratio:</strong> {results.deltaRatio} ({results.deltaInterpretation})</div>
                  <div><strong>Osmolal gap:</strong> {results.osmolalGap} mOsm/kg</div>
                </div>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div>Na: {results.values.sodium} | Cl: {results.values.chloride} | HCO3: {results.values.bicarbonate}</div>
                <div>Formula: AG = Na - (Cl + HCO3) = {results.values.sodium} - ({results.values.chloride} + {results.values.bicarbonate})</div>
              </div>
            </div>

            <div style={{ ...resultCardStyle, ...interpretationCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-diagnoses"></i> Clinical Interpretation</h4>
              <div style={{ margin: '20px 0' }}>
                <div style={{ 
                  padding: '15px', 
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  marginBottom: '15px'
                }}>
                  <div style={{ fontSize: '0.9rem', marginBottom: '10px' }}><strong>Differential Diagnosis:</strong></div>
                  {results.differentialDiagnosis.slice(0, 3).map((dx, index) => (
                    <div key={index} style={{
                      padding: '8px 0',
                      borderBottom: index < Math.min(3, results.differentialDiagnosis.length - 1) ? '1px solid #eee' : 'none'
                    }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#3498db' }}>
                        {dx.condition}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#666' }}>
                        {dx.keyFeatures}
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ 
                  padding: '10px', 
                  background: '#ebf5fb',
                  borderRadius: '8px',
                  marginBottom: '10px'
                }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#2980b9' }}>
                    Expected Compensation
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#666' }}>
                    {results.expectedCompensation}
                  </div>
                </div>
                {results.gfr && (
                  <div style={{ 
                    padding: '10px', 
                    background: '#e8f6f3',
                    borderRadius: '8px',
                    fontSize: '0.85rem'
                  }}>
                    <strong>Estimated GFR:</strong> {results.gfr} mL/min/1.73m²
                  </div>
                )}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div><strong>Key Principles:</strong></div>
                <div>• Normal range: 3-11 mmol/L (lab dependent)</div>
                <div>• Always correct for albumin if available</div>
                <div>• Consider clinical context and patient symptoms</div>
              </div>
            </div>

            <div style={{ ...resultCardStyle, ...correctionCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-exclamation-triangle"></i> Urgent Recommendations</h4>
              <div style={{ margin: '20px 0', maxHeight: '200px', overflowY: 'auto' }}>
                <div style={{ fontSize: '0.9rem', marginBottom: '10px', color: '#666' }}>
                  <strong>Critical Actions:</strong>
                </div>
                {results.urgentRecommendations.map((rec, index) => (
                  <div key={index} style={{
                    padding: '10px',
                    background: '#f8f9fa',
                    borderRadius: '6px',
                    marginBottom: '8px',
                    borderLeft: '4px solid #e74c3c'
                  }}>
                    <div style={{ fontSize: '0.9rem', color: '#2c3e50' }}>
                      {rec}
                    </div>
                  </div>
                ))}
                {results.urgentRecommendations.length === 0 && (
                  <div style={{
                    padding: '10px',
                    background: '#f8f9fa',
                    borderRadius: '6px',
                    borderLeft: '4px solid #2ecc71'
                  }}>
                    <div style={{ fontSize: '0.9rem', color: '#2c3e50' }}>
                      No urgent actions required based on anion gap alone. Continue clinical evaluation.
                    </div>
                  </div>
                )}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div><strong>Management Priorities:</strong></div>
                {results.managementRecommendations.slice(0, 3).map((rec, index) => (
                  <div key={index} style={{ marginBottom: '5px' }}>• {rec}</div>
                ))}
              </div>
            </div>

            <div style={{ ...resultCardStyle, ...differentialCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-clipboard-list"></i> Extended Differential</h4>
              <div style={{ margin: '20px 0', maxHeight: '200px', overflowY: 'auto' }}>
                <div style={{ fontSize: '0.9rem', marginBottom: '10px', color: '#666' }}>
                  <strong>Additional Considerations:</strong>
                </div>
                {results.differentialDiagnosis.length > 3 ? (
                  results.differentialDiagnosis.slice(3).map((dx, index) => (
                    <div key={index} style={{
                      padding: '8px',
                      background: '#f8f9fa',
                      borderRadius: '6px',
                      marginBottom: '6px'
                    }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>
                        {dx.condition}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#666' }}>
                        {dx.keyFeatures}
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ padding: '10px', color: '#666', fontSize: '0.85rem' }}>
                    No additional differentials based on current anion gap.
                  </div>
                )}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div><strong>Remember:</strong></div>
                <div>• Check ketones if gap &gt; 15</div>
                <div>• Calculate osmolal gap if toxic ingestion suspected</div>
                <div>• Consider arterial blood gas for definitive diagnosis</div>
                <div>• Treat underlying cause, not just the numbers</div>
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
          <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Advanced metabolic panel interpretation tool</p>
        </div>

        {/* Enhanced SEO Content with High-Value Long-Tail Keywords */}
        <div style={infoSectionStyle}>
          <h3 style={sectionTitleStyle}><i className="fas fa-question-circle"></i> Comprehensive Anion Gap Analysis: Advanced Acid-Base Physiology & Critical Care Decision Support Protocol</h3>
          <p style={paragraphStyle}><strong>Anion gap calculation methodologies</strong> represent <strong>essential acid-base physiology assessment tools</strong> for determining <strong>precise metabolic acidosis characterization, differential diagnosis stratification, and evidence-based clinical management strategies</strong>. These advanced calculations integrate <strong>sophisticated biochemical analysis, comprehensive electrolyte data parameters, and validated critical care medicine research models</strong> to provide <strong>individualized diagnostic approaches</strong> that maximize <strong>clinical decision-making effectiveness, patient safety enhancement, and informed therapeutic intervention processes</strong> across diverse clinical scenarios requiring <strong>precision acid-base disorder stratification protocols</strong>.</p>
          
          <h3 style={sectionTitleStyle}><i className="fas fa-calculator"></i> Advanced Anion Gap Algorithms - Comprehensive Acid-Base Physiology Analysis Formulae</h3>
          <p style={paragraphStyle}>Multiple <strong>validated anion gap calculation equations</strong> exist for <strong>comprehensive metabolic acidosis evaluation protocols</strong>, each demonstrating specific <strong>clinical applications and variable diagnostic accuracy profiles</strong> influencing <strong>therapeutic decision-making processes</strong>:</p>
          
          <div style={formulaBoxStyle}>
            <strong>Traditional Anion Gap:</strong> AG = Na - (Cl + HCO3) [Normal: 3-11 mmol/L]<br/>
            <strong>Albumin-Corrected Gap:</strong> Corrected AG = Measured AG + 2.5 × (4.5 - Albumin)<br/>
            <strong>Delta-Delta Ratio:</strong> ΔΔ = (AG - 12) ÷ (24 - HCO3)<br/>
            <strong>Osmolal Gap Calculation:</strong> OG = Measured Osm - [2×Na + (Glucose/18) + (BUN/2.8)]<br/>
            <strong>Winter's Formula (Compensation):</strong> Expected pCO2 = 1.5 × HCO3 + 8 ± 2<br/>
            <strong>Urine Anion Gap:</strong> UAG = (Na + K) - Cl [Negative: GI loss, Positive: RTA]<br/>
            <strong>Phosphate-Corrected Gap:</strong> AGcorr = AG + 1.6 × (4.0 - Phosphate)<br/>
            <strong>Potassium-Included Gap:</strong> AGK = (Na + K) - (Cl + HCO3) [Normal: 10-20 mmol/L]
          </div>

          <h3 style={sectionTitleStyle}><i className="fas fa-stethoscope"></i> Clinical Applications of Anion Gap Analysis - Comprehensive Critical Care Management Guidelines</h3>
          <p style={paragraphStyle}>Accurate <strong>anion gap analysis methodology implementation</strong> serves critical functions across multiple <strong>medical specialties and critical care areas</strong> requiring <strong>precise acid-base disorder characterization</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Emergency Medicine Protocol:</strong> Essential for <strong>rapid metabolic acidosis classification, toxic ingestion identification, and life-threatening condition detection strategies</strong> in emergency department settings</li>
            <li style={{ marginBottom: '10px' }}><strong>Critical Care Management:</strong> Guides <strong>sepsis recognition optimization strategies, tissue perfusion assessment approaches, and multiorgan failure prevention protocols</strong> in intensive care unit populations</li>
            <li style={{ marginBottom: '10px' }}><strong>Nephrology Evaluation:</strong> Determines <strong>renal tubular acidosis classification, chronic kidney disease progression assessment, and dialysis requirement stratification strategies</strong> for renal disease management</li>
            <li style={{ marginBottom: '10px' }}><strong>Endocrinology Consultation:</strong> Essential for <strong>diabetic ketoacidosis severity grading, treatment response monitoring, and complication prevention interventions</strong> in diabetes management programs</li>
            <li style={{ marginBottom: '10px' }}><strong>Toxicology Assessment:</strong> Manages <strong>toxic alcohol ingestion recognition, salicylate poisoning identification, and antidote administration timing requirements</strong> for optimal poison control</li>
            <li style={{ marginBottom: '10px' }}><strong>Metabolic Disorder Diagnosis:</strong> Coordinates <strong>inborn error of metabolism detection, lactate acidosis pattern recognition, and specialized testing indication approaches</strong> for genetic metabolic diseases</li>
            <li><strong>Clinical Research Applications:</strong> Facilitates <strong>outcome prediction model development, therapeutic intervention evaluation, and epidemiological study standardization methods</strong> for medical research advancement</li>
          </ul>
          
          <h3 style={sectionTitleStyle}><i className="fas fa-balance-scale"></i> Key Factors in Anion Gap Interpretation - Comprehensive Acid-Base Physiology Assessment Considerations</h3>
          <p style={paragraphStyle}>Multiple <strong>significant physiological and laboratory factors</strong> influence <strong>anion gap interpretation parameters</strong> and require consideration for appropriate clinical decision-making:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Albumin Concentration Effects:</strong> Serum albumin levels, hypoalbuminemia severity, correction formula selection, and laboratory measurement accuracy significantly affect <strong>anion gap calculation validity and clinical interpretation reliability</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Electrolyte Measurement Variables:</strong> Sodium assay methodology, chloride measurement techniques, bicarbonate calculation methods, and laboratory reference ranges dramatically alter <strong>gap calculation results and normal range applicability</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Mixed Acid-Base Disorders:</strong> Concurrent metabolic alkalosis presence, respiratory compensation adequacy, multiple acidosis etiologies, and treatment phase timing create <strong>complex interpretation challenges requiring systematic approaches</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Clinical Context Integration:</strong> Patient symptoms correlation, medication history consideration, chronic disease presence, and acute illness severity demonstrate <strong>essential contextual interpretation requirements beyond numerical calculations</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Laboratory Methodological Factors:</strong> Ion-selective electrode differences, venous versus arterial sample variations, point-of-care testing limitations, and hemolysis interference considerations affect <strong>result accuracy and clinical application confidence</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Temporal Dynamics Considerations:</strong> Treatment response monitoring, disease progression tracking, resolution phase recognition, and chronicity assessment patterns create <strong>evolving interpretation requirements during clinical course</strong></li>
            <li><strong>Population-Specific Variations:</strong> Age-dependent reference ranges, gender-based differences, ethnic population norms, and pregnancy-related adaptations significantly impact <strong>anion gap interpretation and normal value application</strong></li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-exclamation-triangle"></i> Limitations of Anion Gap Calculations - Advanced Acid-Base Physiology Assessment Methodologies</h3>
          <p style={paragraphStyle}>While <strong>anion gap calculation methodologies</strong> provide valuable <strong>clinical diagnostic tools</strong>, specific medical situations necessitate <strong>advanced assessment approaches</strong> and <strong>comprehensive laboratory evaluation protocols</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Complex Mixed Disorders:</strong> Triple acid-base disturbances, combined metabolic-respiratory imbalances, and treatment-induced alterations demonstrating <strong>specialized interpretation needs beyond standard algorithms</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Severe Critical Illness:</strong> Septic shock with multiple organ dysfunction, trauma with massive transfusion requirements, and burns with extensive fluid shifts showing <strong>unique acid-base patterns requiring specialized approaches</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Rare Metabolic Conditions:</strong> Pyroglutamic acidosis (acetaminophen toxicity), D-lactic acidosis (short bowel syndrome), and 5-oxoprolinuria (glutathione synthetase deficiency) creating <strong>atypical anion gap presentations</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Medication-Induced Scenarios:</strong> Topiramate therapy causing hyperchloremic acidosis, spironolactone creating type 4 RTA, and chemotherapy agents producing lactic acidosis affecting <strong>anion gap interpretation reliability</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Advanced Monitoring Requirements:</strong> Arterial blood gas correlation, venous lactate measurement, serum ketone quantification, and toxicology screening providing <strong>enhanced diagnostic precision beyond gap calculations</strong></li>
            <li><strong>Genetic Disorder Contexts:</strong> Mitochondrial disorders with complex metabolic derangements, glycogen storage diseases with specific acid-base patterns, and urea cycle defects with unique laboratory findings enabling <strong>enhanced individualized diagnostic approaches</strong></li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-history"></i> Historical Development of Anion Gap Science - Evolution of Acid-Base Physiology Understanding</h3>
          <p style={paragraphStyle}>The progressive evolution of <strong>anion gap assessment and interpretation methodologies</strong> reflects <strong>decades of medical research advancement</strong> and <strong>clinical practice refinement trajectories</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Early Acid-Base Discovery Era:</strong> Recognition of <strong>electrolyte charge balance principles, anion-cation equilibrium concepts, and metabolic acidosis classification systems</strong> establishing foundational acid-base physiology knowledge</li>
            <li style={{ marginBottom: '10px' }}><strong>Traditional Gap Development Period:</strong> Development of <strong>Na-Cl-HCO3 calculation frameworks, normal range establishment studies, and clinical correlation validation approaches</strong> revolutionizing metabolic acidosis diagnosis</li>
            <li style={{ marginBottom: '10px' }}><strong>Delta-Delta Ratio Introduction:</strong> Creation of <strong>mixed disorder identification algorithms, compensation pattern analysis methods, and gap-bicarbonate relationship quantification systems</strong> for enhanced diagnostic accuracy</li>
            <li style={{ marginBottom: '10px' }}><strong>Albumin Correction Revolution:</strong> Identification of <strong>hypoalbuminemia impact recognition, correction formula derivation, and critical care application validation</strong> for accurate ICU patient assessment</li>
            <li style={{ marginBottom: '10px' }}><strong>Modern Integration Phase:</strong> Implementation of <strong>electronic medical record algorithms, point-of-care testing integration, and clinical decision support systems</strong> for comprehensive patient management</li>
            <li><strong>Precision Medicine Advancement:</strong> Development of <strong>individualized reference ranges, genetic predisposition testing, artificial intelligence interpretation models, and real-time monitoring applications</strong> for scalable clinical optimization</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-user-md"></i> Practical Clinical Implementation Recommendations - Comprehensive Critical Care Management Guidelines</h3>
          <p style={paragraphStyle}>For optimal <strong>anion gap analysis implementation</strong> in contemporary clinical practice environments and <strong>evidence-based critical care protocols</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Systematic Assessment Protocol:</strong> Implement <strong>comprehensive electrolyte panel evaluation, albumin measurement correlation, clinical context integration, and serial monitoring establishment</strong> before diagnostic conclusion determination</li>
            <li style={{ marginBottom: '10px' }}><strong>Validated Calculation Methods:</strong> Utilize <strong>laboratory-specific reference ranges, albumin-correction algorithms, delta-ratio applications, and osmolal gap calculations</strong> for accurate acid-base disorder characterization</li>
            <li style={{ marginBottom: '10px' }}><strong>Differential Diagnosis Development:</strong> Develop <strong>MUDPILES/GOLDMARK mnemonic application, osmolal gap integration strategies, ketone measurement protocols, and toxicology screening indications</strong> for comprehensive etiology identification</li>
            <li style={{ marginBottom: '10px' }}><strong>Treatment Response Monitoring:</strong> Establish <strong>serial gap tracking systems, bicarbonate trend analysis approaches, therapeutic intervention correlation methods, and resolution phase recognition protocols</strong> for optimal patient management</li>
            <li style={{ marginBottom: '10px' }}><strong>Quality Assurance Procedures:</strong> Implement <strong>laboratory correlation verification, measurement error assessment, inter-method comparison validation, and clinical outcome correlation analysis</strong> for reliable result interpretation</li>
            <li><strong>Multidisciplinary Collaboration Framework:</strong> Coordinate <strong>emergency physician-intensivist communication, nephrology consultation, toxicology specialist involvement, and clinical pharmacist integration</strong> for comprehensive patient care delivery</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-chart-line"></i> Future Directions in Anion Gap Analysis - Emerging Critical Care Technologies</h3>
          <p style={paragraphStyle}>Ongoing <strong>anion gap research initiatives</strong> continue refining <strong>assessment and interpretation approaches</strong> with promising technological developments and <strong>innovative clinical methodologies</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Advanced Point-of-Care Testing:</strong> Bedside electrolyte analyzers, continuous intravascular monitoring systems, and real-time acid-base assessment devices for immediate clinical decision support</li>
            <li style={{ marginBottom: '10px' }}><strong>Artificial Intelligence Applications:</strong> Machine learning algorithm development for <strong>automated gap interpretation models</strong> incorporating clinical data, laboratory trends, and outcome predictions</li>
            <li style={{ marginBottom: '10px' }}><strong>Precision Medicine Integration:</strong> Individualized reference range calculation, genetic predisposition assessment, pharmacogenetic response prediction, and personalized treatment algorithms based on <strong>patient-specific characteristics</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Advanced Biomarker Discovery:</strong> Novel acidosis severity markers, tissue perfusion indicators, mitochondrial function assessments, and cellular injury markers for enhanced diagnostic precision</li>
            <li style={{ marginBottom: '10px' }}><strong>Telemedicine Applications:</strong> Remote monitoring integration, algorithmic decision support, expert consultation facilitation, and outcome tracking systems for <strong>comprehensive care delivery</strong></li>
            <li><strong>Integrated Critical Care Platforms:</strong> Development of <strong>comprehensive acid-base management systems, real-time clinical decision support applications, and predictive analytics delivery models</strong> for optimal patient outcomes</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-graduation-cap"></i> Educational Requirements and Professional Training Standards Implementation</h3>
          <p style={paragraphStyle}>Proper <strong>anion gap interpretation methodology education</strong> represents an <strong>essential clinical competency requirement</strong> for <strong>healthcare professionals</strong> across multiple medical disciplines. Comprehensive training curricula should systematically include <strong>acid-base physiology principles, electrolyte balance fundamentals, metabolic acidosis classification strategies, and critical care decision-making techniques</strong>. Continuing professional education programs must consistently address <strong>evolving medical research findings, changing clinical practice standards, and emerging technological developments</strong> to ensure optimal patient outcomes and evidence-based practice implementation across diverse healthcare, emergency medicine, and critical care delivery settings and specialty practice areas.</p>

          <h3 style={sectionTitleStyle}><i className="fas fa-clipboard-check"></i> Quality Assurance and Protocol Standardization Implementation</h3>
          <p style={paragraphStyle}>Implementation of <strong>rigorous quality assurance protocols</strong> ensures <strong>consistent acid-base disorder management practices</strong> across diverse clinical settings. These protocols encompass <strong>calculation standardization methodologies, interpretation guideline adherence, diagnostic algorithm implementation, and treatment protocol fidelity requirements</strong> that directly impact <strong>patient safety outcomes and clinical decision-making effectiveness</strong>. Professional organizations should develop <strong>standardized training materials, competency assessment tools, and clinical practice guideline documents</strong> to guarantee consistent clinical application quality across diverse healthcare delivery settings and specialty practice areas, ensuring optimal outcomes through evidence-based acid-base physiology management approaches.</p>
        </div>

        {/* Q&A Dropdown Section */}
        <div style={faqSectionStyle}>
          <h2 style={faqTitleStyle}><i className="fas fa-question-circle"></i> Frequently Asked Questions About Anion Gap Analysis</h2>
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
          <p style={paragraphStyle}>Explore our comprehensive collection of <strong>acid-base physiology calculation tools and clinical decision support calculators</strong> for metabolic disorder evaluation and critical care management:</p>
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
          <h4 style={disclaimerTitleStyle}><i className="fas fa-exclamation-triangle"></i> Important Medical & Clinical Disclaimer</h4>
          <p style={paragraphStyle}><strong>This anion gap calculator provides estimates for educational and informational purposes only.</strong> The calculations are based on standard medical formulas and laboratory principles and should not be used as a substitute for professional medical advice, diagnosis, or treatment.</p>
          <p style={paragraphStyle}><strong>Critical Medical Conditions Warning:</strong> Elevated anion gap metabolic acidosis (&gt20 mmol/L) may indicate life-threatening conditions including diabetic ketoacidosis, toxic alcohol ingestion, severe sepsis, or renal failure. These require immediate medical evaluation and treatment.</p>
          <p style={paragraphStyle}><strong>Professional Medical Consultation Required:</strong> Always seek the advice of your physician, emergency medical professional, or other qualified healthcare provider with any questions regarding laboratory results, acid-base disorders, or medical conditions. Do not disregard professional medical advice or delay seeking it because of information provided by this calculator.</p>
          <p style={paragraphStyle}><strong>Laboratory Variation Considerations:</strong> Normal anion gap ranges vary between laboratories (typically 3-11 mmol/L but can be 8-16 mmol/L in some labs). Always use your laboratory's reference range for interpretation.</p>
          <p style={{ marginBottom: '10px' }}><strong>Clinical Context Essential:</strong> Anion gap interpretation requires integration with patient symptoms, physical examination findings, medication history, and other laboratory results. Never interpret anion gap in isolation.</p>
          <p style={{ marginBottom: '10px' }}><strong>Toxic Ingestion Emergencies:</strong> If toxic alcohol ingestion (methanol, ethylene glycol) is suspected based on clinical presentation and anion gap/osmolal gap findings, seek immediate emergency medical care. Specific antidotes (fomepizole, ethanol) and dialysis may be required.</p>
          <p style={{ marginBottom: '10px' }}><strong>Treatment Decisions:</strong> Management of metabolic acidosis depends on the underlying cause. Treatment may include intravenous fluids, insulin, bicarbonate therapy, dialysis, or specific antidotes. These decisions require professional medical judgment.</p>
          <p><strong>Serial Monitoring:</strong> In acute illness, anion gap should be monitored serially to assess treatment response and disease progression. Single measurements have limited value in dynamic clinical situations.</p>
        </div>
      </section>

      {/* Sidebar with 3 Ads (3rd one sticky) */}
      {showSidebar && (
        <aside style={sidebarStyle}>
          <div style={sidebarContentStyle}>
            <div style={{ ...adSlotStyle, ...sidebarAdStyle }}>
              <p><i className="fas fa-ad"></i> Advertisement 1</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Sponsored Content</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Advanced acid-base interpretation course</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>300px height ad slot</p>
            </div>
            
            <div style={{ ...adSlotStyle, ...sidebarAdStyle }}>
              <p><i className="fas fa-ad"></i> Advertisement 2</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Featured Product</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Point-of-care lactate testing device</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>300px height ad slot</p>
            </div>
            
            <div style={{ ...adSlotStyle, ...stickyAdStyle }}>
              <p><i className="fas fa-thumbtack"></i> Sticky Advertisement</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Premium Content - Stays visible</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Complete critical care decision support system</p>
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
            <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Perfect for clinical settings</p>
          </div>
        </div>
      )}
      
      {/* Sticky Footer Ad (Mobile) */}
      {!showSidebar && (
        <div style={stickyFooterAdStyle}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ textAlign: 'left', flex: 1 }}>
              <p style={{ fontSize: '0.9rem', margin: 0, color: '#2c3e50' }}>
                <i className="fas fa-mobile-alt"></i> Mobile Medical Reference
              </p>
              <p style={{ fontSize: '0.8rem', margin: '5px 0 0 0', color: '#666' }}>
                Get instant access to clinical decision algorithms
              </p>
            </div>
            <button style={{
              background: '#9b59b6',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginLeft: '15px'
            }}>
              Access Now
            </button>
          </div>
        </div>
      )}
    </main>
  );
}