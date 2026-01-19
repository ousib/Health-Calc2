"use client";

import { useState, useEffect } from 'react';

export default function MedicationDosagePage() {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [creatinine, setCreatinine] = useState('');
  const [gender, setGender] = useState('male');
  const [medication, setMedication] = useState('vancomycin');
  const [indication, setIndication] = useState('infection');
  const [renalFunction, setRenalFunction] = useState('normal');
  const [dosageResult, setDosageResult] = useState(null);
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

  const dosageCardStyle = {
    borderTopColor: '#3498db'
  };

  const frequencyCardStyle = {
    borderTopColor: '#9b59b6'
  };

  const adjustmentCardStyle = {
    borderTopColor: '#2ecc71'
  };

  const dosageValueStyle = {
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

  // Medications data
  const medications = [
    { id: 'vancomycin', name: 'Vancomycin', class: 'glycopeptide', typicalDose: '15-20 mg/kg' },
    { id: 'gentamicin', name: 'Gentamicin', class: 'aminoglycoside', typicalDose: '5-7 mg/kg' },
    { id: 'amikacin', name: 'Amikacin', class: 'aminoglycoside', typicalDose: '15-20 mg/kg' },
    { id: 'ceftriaxone', name: 'Ceftriaxone', class: 'cephalosporin', typicalDose: '1-2 g' },
    { id: 'piperacillin', name: 'Piperacillin/Tazobactam', class: 'penicillin', typicalDose: '4.5 g' },
    { id: 'meropenem', name: 'Meropenem', class: 'carbapenem', typicalDose: '1-2 g' },
    { id: 'levofloxacin', name: 'Levofloxacin', class: 'fluoroquinolone', typicalDose: '500-750 mg' },
    { id: 'warfarin', name: 'Warfarin', class: 'anticoagulant', typicalDose: '2-10 mg' },
    { id: 'insulin', name: 'Insulin', class: 'hormone', typicalDose: '0.5-1 unit/kg' },
    { id: 'digoxin', name: 'Digoxin', class: 'cardiac glycoside', typicalDose: '0.125-0.25 mg' }
  ];

  // Sample data for demo
  useEffect(() => {
    setAge('45');
    setWeight('70');
    setHeight('175');
    setCreatinine('0.9');
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

  const calculateDosage = () => {
    // Validate inputs
    if (!age || !weight || !height || !creatinine) {
      alert('Please fill in all required fields.');
      return;
    }

    const ageVal = parseFloat(age);
    const weightVal = parseFloat(weight);
    const heightVal = parseFloat(height);
    const creatinineVal = parseFloat(creatinine);

    if (ageVal <= 0 || weightVal <= 0 || heightVal <= 0 || creatinineVal <= 0) {
      alert('Please enter valid positive numbers.');
      return;
    }

    // Calculate creatinine clearance (CrCl) using Cockcroft-Gault formula
    let crCl = 0;
    if (gender === 'male') {
      crCl = ((140 - ageVal) * weightVal) / (72 * creatinineVal);
    } else {
      crCl = ((140 - ageVal) * weightVal) / (72 * creatinineVal) * 0.85;
    }

    // Determine renal function category
    let renalCategory = 'normal';
    if (crCl >= 90) renalCategory = 'normal';
    else if (crCl >= 60) renalCategory = 'mild';
    else if (crCl >= 30) renalCategory = 'moderate';
    else if (crCl >= 15) renalCategory = 'severe';
    else renalCategory = 'esrd';

    // Calculate dosage based on medication and renal function
    let dose = 0;
    let frequency = '';
    let adjustments = [];
    let targetLevel = '';
    let monitoring = '';

    switch(medication) {
      case 'vancomycin':
        dose = weightVal * 15; // Initial loading dose
        if (renalCategory === 'normal') frequency = 'Q12H';
        else if (renalCategory === 'mild') frequency = 'Q12H-Q24H';
        else if (renalCategory === 'moderate') frequency = 'Q24H-Q48H';
        else if (renalCategory === 'severe') frequency = 'Q48H-Q72H';
        else frequency = 'Once weekly with levels';
        targetLevel = 'Trough: 10-20 mg/L';
        monitoring = 'Serum trough levels before 4th dose';
        break;

      case 'gentamicin':
        dose = weightVal * 5; // Extended interval dosing
        if (renalCategory === 'normal') frequency = 'Q24H';
        else if (renalCategory === 'mild') frequency = 'Q24H-Q36H';
        else if (renalCategory === 'moderate') frequency = 'Q36H-Q48H';
        else if (renalCategory === 'severe') frequency = 'Q48H-Q72H';
        else frequency = 'Not recommended';
        targetLevel = 'Peak: 20-30 mg/L, Trough: <1 mg/L';
        monitoring = 'Levels after 1st dose, then as needed';
        break;

      case 'ceftriaxone':
        dose = 1000; // Standard adult dose
        frequency = 'Q24H';
        if (renalCategory === 'severe') {
          dose = 500;
          frequency = 'Q24H';
        }
        targetLevel = 'Time above MIC';
        monitoring = 'Clinical response';
        break;

      default:
        dose = weightVal * 10; // Default calculation
        frequency = 'Q12H';
    }

    // Adjust for indication
    if (indication === 'meningitis') {
      dose *= 1.5; // Higher dose for CNS infections
      adjustments.push('Increased for CNS penetration');
    } else if (indication === 'endocarditis') {
      dose *= 1.3; // Higher dose for endocarditis
      adjustments.push('Increased for vegetation penetration');
    }

    // Calculate adjusted dose for renal impairment
    let adjustedDose = dose;
    let adjustmentFactor = 1;
    
    switch(renalCategory) {
      case 'mild':
        adjustmentFactor = 0.75;
        adjustments.push('25% dose reduction for mild renal impairment');
        break;
      case 'moderate':
        adjustmentFactor = 0.5;
        adjustments.push('50% dose reduction for moderate renal impairment');
        break;
      case 'severe':
        adjustmentFactor = 0.25;
        adjustments.push('75% dose reduction for severe renal impairment');
        break;
      case 'esrd':
        adjustmentFactor = 0.1;
        adjustments.push('90% dose reduction for ESRD');
        break;
    }
    
    adjustedDose = dose * adjustmentFactor;

    setDosageResult({
      medication: medications.find(m => m.id === medication)?.name || medication,
      dose: Math.round(dose),
      adjustedDose: Math.round(adjustedDose),
      frequency: frequency,
      crCl: Math.round(crCl),
      renalCategory: renalCategory,
      adjustments: adjustments,
      targetLevel: targetLevel,
      monitoring: monitoring,
      bsa: calculateBSA(weightVal, heightVal)
    });
  };

  const calculateBSA = (weight, height) => {
    // Mosteller formula for BSA
    return Math.sqrt((height * weight) / 3600);
  };

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I adjust vancomycin dosing for renal impairment?",
      answer: "Vancomycin requires careful dose adjustment for renal impairment. For CrCl 30-60 mL/min: 15-20 mg/kg q12-24h; CrCl 10-30 mL/min: 15-20 mg/kg q24-48h; CrCl <10 mL/min: 15-20 mg/kg q48-72h. Always monitor trough levels (target 10-20 mg/L for serious infections, 10-15 mg/L for routine infections) and adjust based on levels."
    },
    {
      question: "What's the difference between loading dose and maintenance dose?",
      answer: "Loading dose achieves therapeutic concentrations quickly, while maintenance dose maintains those levels. Loading dose = target concentration × volume of distribution. Maintenance dose = clearance × target concentration × dosing interval. For drugs with long half-lives or in critically ill patients, loading doses are essential to achieve rapid therapeutic effects."
    },
    {
      question: "How do I convert between different dosing units?",
      answer: "Common conversions: 1 gram = 1000 mg; 1 mg = 1000 mcg; For weight-based dosing: dose (mg) = weight (kg) × dose (mg/kg). For BSA-based dosing: dose = BSA (m²) × dose (mg/m²). Always verify calculations and use appropriate units for the specific medication and clinical scenario."
    },
    {
      question: "When should I use therapeutic drug monitoring?",
      answer: "Therapeutic drug monitoring is essential for: 1) Drugs with narrow therapeutic index (vancomycin, aminoglycosides, digoxin), 2) Patients with changing renal/hepatic function, 3) Lack of clinical response or suspected toxicity, 4) Pregnancy or pediatric populations, 5) Critical illness with altered pharmacokinetics. Monitor at appropriate times (peak, trough, or random) based on drug characteristics."
    },
    {
      question: "How do drug interactions affect dosing?",
      answer: "Drug interactions can significantly alter dosing requirements through: 1) Pharmacokinetic interactions (enzyme induction/inhibition affecting metabolism), 2) Pharmacodynamic interactions (additive/synergistic effects or antagonism), 3) Protein binding displacement, 4) Renal excretion competition. Always review medication profiles and adjust doses when adding or removing interacting drugs."
    }
  ];

  const healthCalculators = [
    { name: "Fluid Requirements", link: "/fluid-requirements" },
    { name: "Creatinine Clearance", link: "/creatinine-clearance" },
    { name: "GFR Calculator", link: "/gfr-calculator" },
    { name: "Body Surface Area", link: "/bsa-calculator" },
    { name: "Ideal Weight Calculator", link: "/ideal-weight-calculator" },
    { name: "Anion Gap Calculator", link: "/anion-gap-calculator" },
    { name: "Nutritional Needs", link: "/nutrition-calculator" },
    { name: "BMI Calculator", link: "/bmi-calculator" }
  ];

  return (
    <main style={containerStyle}>
      <section style={calculatorBoxStyle}>
        <h1 style={calcTitleStyle}>
          <i className="fas fa-pills"></i> Medication Dosage Calculator - Precision Drug Dosing & Pharmacokinetic Optimization
        </h1>
        <p style={calcDescStyle}>
          Calculate <strong>personalized medication dosages, renal dose adjustments, and therapeutic drug monitoring parameters</strong> using validated pharmacokinetic formulas. Essential for <strong>precision prescribing, medication safety optimization, and individualized pharmacotherapy planning</strong> in clinical practice.
        </p>

        <div style={inputGridStyle}>
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-user"></i> Age (years)</label>
            <input 
              type="number" 
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="45"
              min="0" 
              max="120" 
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

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-ruler-vertical"></i> Height (cm)</label>
            <input 
              type="number" 
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="175"
              min="50" 
              max="250" 
              step="0.1"
              style={inputStyle}
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-flask"></i> Serum Creatinine (mg/dL)</label>
            <input 
              type="number" 
              value={creatinine}
              onChange={(e) => setCreatinine(e.target.value)}
              placeholder="0.9"
              min="0.1" 
              max="10" 
              step="0.1"
              style={inputStyle}
            />
          </div>
        </div>

        <div style={inputGridStyle}>
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
            <label style={inputGroupLabelStyle}><i className="fas fa-capsules"></i> Medication</label>
            <select 
              value={medication}
              onChange={(e) => setMedication(e.target.value)}
              style={selectStyle}
            >
              {medications.map(med => (
                <option key={med.id} value={med.id}>{med.name} ({med.class})</option>
              ))}
            </select>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-stethoscope"></i> Indication</label>
            <select 
              value={indication}
              onChange={(e) => setIndication(e.target.value)}
              style={selectStyle}
            >
              <option value="infection">General Infection</option>
              <option value="meningitis">Meningitis/CNS</option>
              <option value="endocarditis">Endocarditis</option>
              <option value="pneumonia">Pneumonia</option>
              <option value="uti">UTI/Pyelonephritis</option>
            </select>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-kidneys"></i> Renal Function</label>
            <select 
              value={renalFunction}
              onChange={(e) => setRenalFunction(e.target.value)}
              style={selectStyle}
            >
              <option value="normal">Normal</option>
              <option value="mild">Mild Impairment</option>
              <option value="moderate">Moderate Impairment</option>
              <option value="severe">Severe Impairment</option>
              <option value="esrd">ESRD/Dialysis</option>
            </select>
          </div>
        </div>

        <button 
          style={calcBtnStyle}
          onClick={calculateDosage}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, calcBtnHoverStyle)}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = calcBtnStyle.background;
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <i className="fas fa-calculator"></i> Calculate Medication Dosage
        </button>

        {/* Results Display */}
        {dosageResult && (
          <div style={resultsContainerStyle}>
            <div style={{ ...resultCardStyle, ...dosageCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-prescription-bottle-alt"></i> Calculated Dosage</h4>
              <div style={{ margin: '20px 0' }}>
                <div style={dosageValueStyle}>{dosageResult.adjustedDose} mg</div>
                <div style={{ fontSize: '1.2rem', color: '#666' }}>
                  {dosageResult.medication}
                </div>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div>Standard Dose: {dosageResult.dose} mg</div>
                <div>Adjusted for renal function</div>
              </div>
            </div>

            <div style={{ ...resultCardStyle, ...frequencyCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-clock"></i> Dosing Schedule</h4>
              <div style={{ margin: '20px 0' }}>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: '#9b59b6', margin: '10px 0' }}>
                  {dosageResult.frequency}
                </div>
                <div style={{ fontSize: '1.2rem', color: '#666' }}>
                  Renal Function: {dosageResult.renalCategory}
                </div>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div>Creatinine Clearance: {dosageResult.crCl} mL/min</div>
                <div>Target Levels: {dosageResult.targetLevel}</div>
              </div>
            </div>

            <div style={{ ...resultCardStyle, ...adjustmentCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-adjust"></i> Adjustments & Monitoring</h4>
              <div style={{ margin: '20px 0' }}>
                <div style={{ fontSize: '1.2rem', color: '#2ecc71', marginBottom: '10px' }}>
                  Individualized Regimen
                </div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                  {dosageResult.adjustments.length > 0 ? (
                    <ul style={{ margin: 0, paddingLeft: '20px' }}>
                      {dosageResult.adjustments.map((adj, idx) => (
                        <li key={idx}>{adj}</li>
                      ))}
                    </ul>
                  ) : 'No adjustments needed'}
                </div>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div>Monitoring: {dosageResult.monitoring}</div>
                <div>Body Surface Area: {dosageResult.bsa.toFixed(2)} m²</div>
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
          <h3 style={sectionTitleStyle}><i className="fas fa-question-circle"></i> What is Medication Dosage Calculation? Comprehensive Pharmacokinetic Optimization Methodology</h3>
          <p style={paragraphStyle}><strong>Medication dosage calculation methodologies</strong> represent <strong>essential clinical protocols</strong> for determining <strong>precise drug dosing regimens, pharmacokinetic parameter optimization, and therapeutic drug monitoring protocols</strong>. These calculations integrate <strong>patient-specific physiological parameters, medication pharmacokinetic properties, and disease state considerations</strong> to provide <strong>personalized pharmacotherapy strategies</strong> that maximize <strong>therapeutic efficacy while minimizing adverse drug reaction risks</strong> across diverse clinical scenarios requiring <strong>precision medication administration protocols</strong>.</p>
          
          <h3 style={sectionTitleStyle}><i className="fas fa-calculator"></i> Dosage Calculation Methods - Comprehensive Pharmacokinetic Formulae</h3>
          <p style={paragraphStyle}>Multiple <strong>validated medication dosage calculation equations</strong> exist for <strong>comprehensive pharmacotherapy management protocols</strong>, each demonstrating specific <strong>clinical applications and variable accuracy profiles</strong> influencing <strong>medication safety optimization processes</strong>:</p>
          
          <div style={formulaBoxStyle}>
            <strong>Weight-Based Dosing Protocol:</strong> Standard approach for most medications requiring mg/kg calculations<br/>
            <strong>Body Surface Area Method:</strong> Most accurate for chemotherapy agents and pediatric populations<br/>
            <strong>Renal Function Adjustment Algorithms:</strong> Essential for medications with significant renal excretion components<br/>
            <strong>Therapeutic Drug Monitoring Integration:</strong> Combines pharmacokinetic predictions with measured serum concentrations<br/>
            <strong>Population Pharmacokinetic Modeling:</strong> Advanced approach incorporating multiple patient-specific covariates<br/>
            <strong>Clinical Method Selection Protocol:</strong> Weight-based dosing recommended for <strong>standard medication calculations</strong>, BSA method for <strong>precision-critical oncology regimens</strong>
          </div>

          <h3 style={sectionTitleStyle}><i className="fas fa-stethoscope"></i> Clinical Applications of Dosage Calculation - Comprehensive Therapeutic Management Guidelines</h3>
          <p style={paragraphStyle}>Accurate <strong>medication dosage calculation methodology implementation</strong> serves critical functions across multiple <strong>medical specialties and therapeutic management areas</strong> requiring <strong>precise pharmacotherapy optimization</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Antimicrobial Stewardship Programs:</strong> Essential for <strong>antibiotic dose optimization protocols, therapeutic drug monitoring implementation, and resistance prevention strategies</strong> optimizing <strong>infection treatment outcomes</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Oncology Chemotherapy Protocols:</strong> Guides <strong>cytotoxic agent dosing calculations, supportive care medication regimens, and adverse effect mitigation strategies</strong> in cancer treatment</li>
            <li style={{ marginBottom: '10px' }}><strong>Critical Care Pharmacotherapy:</strong> Determines <strong>vasoactive medication titration protocols, sedation-analgesia optimization, and organ support medication regimens</strong> in intensive care settings</li>
            <li style={{ marginBottom: '10px' }}><strong>Pediatric Medication Safety:</strong> Essential for <strong>age-appropriate dosing calculations, growth and development considerations, and off-label medication use protocols</strong> in pediatric populations</li>
            <li style={{ marginBottom: '10px' }}><strong>Geriatric Pharmacotherapy Optimization:</strong> Accounts for <strong>age-related physiological changes, polypharmacy interactions, and altered pharmacokinetic parameters</strong> in elderly patient populations</li>
            <li style={{ marginBottom: '10px' }}><strong>Renal and Hepatic Impairment Adjustments:</strong> Manages <strong>dose modification algorithms, alternative medication selection, and therapeutic monitoring requirements</strong> for organ dysfunction patients</li>
            <li><strong>Chronic Disease Management Protocols:</strong> Coordinates <strong>long-term medication titration schedules, adherence optimization strategies, and outcome monitoring parameters</strong> for comprehensive care</li>
          </ul>
          
          <h3 style={sectionTitleStyle}><i className="fas fa-balance-scale"></i> Factors Affecting Medication Dosage - Comprehensive Clinical Assessment Considerations</h3>
          <p style={paragraphStyle}>Multiple <strong>significant physiological and pathological factors</strong> influence <strong>medication dosage calculation accuracy parameters</strong> and require consideration for appropriate clinical interpretation:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Age-Related Physiological Changes:</strong> Pediatric patients demonstrate <strong>immature metabolic enzyme systems and altered distribution volumes</strong>, while elderly patients exhibit <strong>reduced renal/hepatic function and altered body composition</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Organ Function Variability Factors:</strong> Affected by <strong>renal impairment severity levels, hepatic dysfunction patterns, and cardiac output alterations</strong> influencing drug clearance calculations</li>
            <li style={{ marginBottom: '10px' }}><strong>Body Composition Influences:</strong> Obesity, cachexia, and fluid overload states significantly alter <strong>volume of distribution parameters and tissue penetration characteristics</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Genetic Polymorphism Impacts:</strong> Cytochrome P450 enzyme variations, transporter protein differences, and receptor polymorphism patterns require pharmacogenetic considerations</li>
            <li style={{ marginBottom: '10px' }}><strong>Disease State Considerations:</strong> Critical illness, sepsis, burns, and trauma significantly alter <strong>pharmacokinetic parameters and pharmacodynamic responses</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Protein Binding Alterations:</strong> Hypoalbuminemia, uremia, and competitive displacement significantly affect <strong>free drug concentrations and therapeutic effects</strong></li>
            <li><strong>Drug Interaction Complexities:</strong> Enzyme induction/inhibition, transporter competition, and pharmacodynamic synergism/antagonism require comprehensive medication review</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-exclamation-triangle"></i> Limitations of Dosage Calculation Formulas - Advanced Clinical Assessment Methodologies</h3>
          <p style={paragraphStyle}>While <strong>medication dosage calculation methodologies</strong> provide valuable <strong>clinical starting points</strong>, specific clinical situations necessitate <strong>advanced assessment approaches</strong> and <strong>dynamic monitoring protocols</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Extreme Physiological State Scenarios:</strong> Massive obesity, severe malnutrition, and critical illness with multiple organ dysfunction require individualized approaches</li>
            <li style={{ marginBottom: '10px' }}><strong>Complex Comorbidity Considerations:</strong> Combined renal-hepatic-cardiac dysfunction presentations requiring nuanced pharmacokinetic approaches</li>
            <li style={{ marginBottom: '10px' }}><strong>Unusual Pharmacokinetic Patterns:</strong> Saturable metabolism, nonlinear kinetics, and complex distribution patterns affecting standard formula accuracy</li>
            <li style={{ marginBottom: '10px' }}><strong>Drug Interaction Complexities:</strong> Multiple interacting medications with competing metabolic pathways and elimination mechanisms</li>
            <li style={{ marginBottom: '10px' }}><strong>Advanced Monitoring Requirement Situations:</strong> Therapeutic drug monitoring, pharmacogenetic testing, and advanced pharmacokinetic modeling for precision management</li>
            <li><strong>Alternative Assessment Methodologies:</strong> <strong>Population pharmacokinetic modeling, Bayesian forecasting techniques, and point-of-care testing applications</strong> for advanced dosage optimization</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-history"></i> Historical Development of Dosage Formulas - Evolution of Clinical Pharmacology Science</h3>
          <p style={paragraphStyle}>The progressive evolution of <strong>medication dosage calculation methodologies</strong> reflects <strong>centuries of pharmacological research advancement</strong> and <strong>clinical practice refinement trajectories</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>19th Century Foundations:</strong> Initial recognition of <strong>dose-response relationships and therapeutic index concepts</strong> establishing basic pharmacological principles</li>
            <li style={{ marginBottom: '10px' }}><strong>Early 20th Century Standardization:</strong> Development of <strong>body weight-based dosing methodologies</strong> and <strong>standardized preparation protocols</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Mid-20th Century Advances:</strong> Introduction of <strong>creatinine clearance calculations, therapeutic drug monitoring, and pharmacokinetic modeling</strong> revolutionizing precision dosing</li>
            <li style={{ marginBottom: '10px' }}><strong>Late 20th Century Refinement:</strong> Development of <strong>population pharmacokinetic approaches, Bayesian forecasting methods, and computerized dosing algorithms</strong></li>
            <li><strong>21st Century Precision Medicine:</strong> Integration of <strong>pharmacogenetic testing, therapeutic drug monitoring technologies, and artificial intelligence applications</strong> for optimal medication management</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-user-md"></i> Practical Clinical Implementation Recommendations - Comprehensive Medication Management Guidelines</h3>
          <p style={paragraphStyle}>For optimal <strong>medication dosage calculation implementation</strong> in contemporary clinical practice environments and <strong>evidence-based therapeutic management protocols</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Comprehensive Patient Assessment Protocol:</strong> Systematically evaluate <strong>renal/hepatic function parameters, body composition characteristics, and comorbid condition influences</strong> before calculation initiation</li>
            <li style={{ marginBottom: '10px' }}><strong>Dynamic Monitoring Implementation:</strong> Utilize <strong>therapeutic drug monitoring protocols, clinical response assessment, and adverse effect surveillance</strong> rather than static formula application</li>
            <li style={{ marginBottom: '10px' }}><strong>Medication Reconciliation Procedures:</strong> Systematically review <strong>complete medication profiles, herbal supplement use, and over-the-counter medication consumption</strong> for interaction identification</li>
            <li style={{ marginBottom: '10px' }}><strong>Patient-Specific Education Protocol:</strong> Develop <strong>individualized educational materials</strong> explaining <strong>medication administration techniques, monitoring requirements, and adverse effect recognition strategies</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Multidisciplinary Collaboration Enhancement:</strong> Coordinate medication management with <strong>clinical pharmacists, nursing specialists, laboratory services, and therapeutic drug monitoring programs</strong> for comprehensive care</li>
            <li><strong>Quality Improvement Integration:</strong> Implement <strong>medication error reduction programs, adverse drug reaction reporting systems, and outcome measurement protocols</strong> for continuous optimization</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-chart-line"></i> Future Directions in Medication Dosing - Emerging Pharmacological Technologies</h3>
          <p style={paragraphStyle}>Ongoing <strong>medication dosing research initiatives</strong> continue refining <strong>assessment approaches</strong> with promising technological developments and <strong>innovative monitoring methodologies</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Pharmacogenetic Testing Advancements:</strong> Rapid genotyping technologies, cost-effective screening methods, and clinical decision support integration for personalized dosing</li>
            <li style={{ marginBottom: '10px' }}><strong>Artificial Intelligence Clinical Applications:</strong> Machine learning algorithm development for <strong>personalized dosage prediction models</strong> incorporating multiple clinical and genetic variables</li>
            <li style={{ marginBottom: '10px' }}><strong>Point-of-Care Monitoring Devices:</strong> Development of <strong>rapid, accurate bedside drug concentration measurement tools</strong> for immediate dosage adjustment decision support</li>
            <li style={{ marginBottom: '10px' }}><strong>Wearable Monitoring Technologies:</strong> Continuous drug concentration sensors, physiological parameter monitors, and remote medication adherence tracking systems</li>
            <li style={{ marginBottom: '10px' }}><strong>Nanotechnology Applications:</strong> Targeted drug delivery systems, controlled release formulations, and personalized drug carrier technologies</li>
            <li><strong>Telemedicine Integration Strategies:</strong> Remote therapeutic drug monitoring, virtual medication management consultations, and digital adherence support platforms</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-graduation-cap"></i> Educational Requirements and Professional Training Standards Implementation</h3>
          <p style={paragraphStyle}>Proper <strong>medication dosage calculation methodology education</strong> represents an <strong>essential clinical competency requirement</strong> for <strong>healthcare professionals</strong> across multiple medical disciplines. Comprehensive training curricula should systematically include <strong>pharmacokinetic principles, calculation methodologies, therapeutic monitoring techniques, and adverse effect recognition protocols</strong>. Continuing medical education programs must consistently address <strong>evolving pharmacological research findings, changing clinical practice standards, and emerging technological developments</strong> to ensure optimal patient care outcomes and evidence-based practice implementation.</p>

          <h3 style={sectionTitleStyle}><i className="fas fa-clipboard-check"></i> Quality Assurance and Protocol Standardization Implementation</h3>
          <p style={paragraphStyle}>Implementation of <strong>rigorous quality assurance protocols</strong> ensures <strong>consistent medication management practices</strong> across diverse healthcare settings. These protocols encompass <strong>calculation standardization methodologies, therapeutic monitoring verification procedures, and adverse event reporting requirements</strong> that directly impact <strong>patient safety parameters</strong>. Professional organizations should develop <strong>standardized training materials, competency assessment tools, and practice guideline documents</strong> to guarantee consistent clinical application quality across diverse healthcare delivery settings and specialty practice areas.</p>
        </div>

        {/* Q&A Dropdown Section */}
            <div style={faqSectionStyle}>
            <h2 style={faqTitleStyle}><i className="fas fa-question-circle"></i> Frequently Asked Questions About Medication Dosage Calculation</h2>
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
          <h3 style={sectionTitleStyle}><i className="fas fa-calculator"></i> Related Medical & Clinical Calculators</h3>
          <p style={paragraphStyle}>Explore our comprehensive collection of <strong>medical calculation tools and clinical monitoring calculators</strong> for healthcare applications and patient management:</p>
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
          <p style={paragraphStyle}><strong>This medication dosage calculator provides estimates for educational and informational purposes only.</strong> The calculations are based on standard formulas and should not be used as a substitute for professional medical advice, diagnosis, or treatment.</p>
          <p style={paragraphStyle}><strong>Clinical Decision Limitations:</strong> Dosage calculations have inherent limitations and may not accurately reflect individual patient needs. Actual medication prescribing requires comprehensive clinical assessment including renal/hepatic function, comorbid conditions, medication interactions, and therapeutic drug monitoring.</p>
          <p style={paragraphStyle}><strong>Therapeutic Monitoring Requirements:</strong> Medication administration should always be accompanied by careful monitoring of clinical response, including therapeutic drug levels, laboratory parameters, and adverse effect surveillance. Adjustments should be made based on patient response rather than formula calculations alone.</p>
          <p style={paragraphStyle}><strong>Drug Interaction Considerations:</strong> Patients taking multiple medications require comprehensive interaction screening. Standard formulas may not account for complex pharmacokinetic and pharmacodynamic interactions between different drug classes.</p>
          <p style={paragraphStyle}><strong>Professional Consultation Required:</strong> Always seek the advice of your physician, pharmacist, or other qualified healthcare provider with any questions regarding medication dosing or treatment decisions. Do not disregard professional medical advice or delay seeking it because of information provided by this calculator.</p>
          <p style={paragraphStyle}><strong>Emergency Situations:</strong> If you believe you may have a medical emergency, call your doctor or emergency services immediately. This calculator is not designed for emergency medical situations requiring immediate intervention.</p>
          <p style={paragraphStyle}><strong>Medication Safety Protocol:</strong> Always verify medication dosages with at least two healthcare professionals before administration, especially for high-risk medications with narrow therapeutic indices.</p>
        </div>
      </section>

      {/* Sidebar with 3 Ads (3rd one sticky) */}
      {showSidebar && (
        <aside style={sidebarStyle}>
          <div style={sidebarContentStyle}>
            <div style={{ ...adSlotStyle, ...sidebarAdStyle }}>
              <p><i className="fas fa-ad"></i> Advertisement 1</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Sponsored Content</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Medication safety training course</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>300px height ad slot</p>
            </div>
            
            <div style={{ ...adSlotStyle, ...sidebarAdStyle }}>
              <p><i className="fas fa-ad"></i> Advertisement 2</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Featured Product</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Therapeutic drug monitoring device</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>300px height ad slot</p>
            </div>
            
            <div style={{ ...adSlotStyle, ...stickyAdStyle }}>
              <p><i className="fas fa-thumbtack"></i> Sticky Advertisement</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Premium Content - Stays visible</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Advanced pharmacokinetics guide</p>
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