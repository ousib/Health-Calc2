"use client";

import { useState, useEffect } from 'react';

export default function FluidRequirementsPage() {
  const [currentMethod, setCurrentMethod] = useState('4-2-1');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [temperature, setTemperature] = useState('37');
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [maintenanceResult, setMaintenanceResult] = useState(null);
  const [deficitResult, setDeficitResult] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeFAQ, setActiveFAQ] = useState(null);

  // Styles
  const containerStyle = {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    display: 'grid',
    gridTemplateColumns: showSidebar ? '1fr 300px' : '1fr', // ← Add this condition

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

  const measurementGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
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

  const focusInputStyle = {
    borderColor: '#3498db',
    boxShadow: '0 0 0 3px rgba(52, 152, 219, 0.1)'
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

  const fluidMethodComparisonStyle = {
    margin: '30px 0',
    padding: '20px',
    background: '#f8f9fa',
    borderRadius: '10px'
  };

  const methodTabsStyle = {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    flexWrap: 'wrap'
  };

  const methodTabStyle = {
    padding: '10px 20px',
    background: '#e9ecef',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.3s'
  };

  const activeMethodTabStyle = {
    background: '#3498db',
    color: 'white'
  };

  const methodDisplayStyle = {
    padding: '20px',
    background: 'white',
    borderRadius: '8px',
    fontFamily: "'Courier New', monospace",
    textAlign: 'center',
    fontSize: '0.95rem',
    borderLeft: '4px solid #3498db'
  };

  const conditionsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '10px',
    margin: '20px 0'
  };

  const conditionCheckboxStyle = {
    padding: '12px',
    background: 'white',
    border: '2px solid #dfe6e9',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  const selectedConditionStyle = {
    background: '#e3f2fd',
    borderColor: '#3498db',
    color: '#3498db'
  };

  const hoverConditionStyle = {
    borderColor: '#3498db',
    background: '#f0f8ff'
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

  const maintenanceCardStyle = {
    borderTopColor: '#3498db'
  };

  const deficitCardStyle = {
    borderTopColor: '#e74c3c'
  };

  const totalCardStyle = {
    borderTopColor: '#2ecc71'
  };

  const fluidValueStyle = {
    fontSize: '2.5rem',
    fontWeight: '800',
    color: '#3498db',
    margin: '10px 0'
  };

  const deficitValueStyle = {
    color: '#e74c3c'
  };

  const totalValueStyle = {
    color: '#2ecc71'
  };

  const clinicalAppsStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px',
    margin: '25px 0'
  };

  const clinicalCardStyle = {
    padding: '20px',
    background: 'white',
    borderRadius: '10px',
    borderLeft: '4px solid #3498db',
    boxShadow: '0 3px 10px rgba(0,0,0,0.05)'
  };

  const categoryTableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    fontSize: '0.95rem',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 3px 10px rgba(0,0,0,0.05)'
  };

  const tableHeaderStyle = {
    backgroundColor: '#2c3e50',
    color: 'white',
    fontWeight: '600',
    padding: '15px',
    textAlign: 'left',
    borderBottom: '1px solid #eee'
  };

  const tableCellStyle = {
    padding: '15px',
    textAlign: 'left',
    borderBottom: '1px solid #eee'
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
    display: 'none',
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

  // Medical conditions that affect fluid requirements
  const medicalConditions = [
    { id: 'fever', name: 'Fever', adjustment: '+12% per °C above 37°C' },
    { id: 'burns', name: 'Burns', adjustment: '+2-4 mL/kg/% burn' },
    { id: 'diarrhea', name: 'Diarrhea', adjustment: '+10-20 mL/kg/day' },
    { id: 'vomiting', name: 'Vomiting', adjustment: '+5-10 mL/kg/day' },
    { id: 'sweating', name: 'Excessive Sweating', adjustment: '+5-15 mL/kg/day' },
    { id: 'sepsis', name: 'Sepsis/Infection', adjustment: '+20-30% baseline' },
    { id: 'renal', name: 'Renal Failure', adjustment: 'Restrict fluid' },
    { id: 'heart', name: 'Heart Failure', adjustment: 'Restrict fluid' },
    { id: 'siadh', name: 'SIADH', adjustment: 'Restrict fluid' },
    { id: 'diabetes', name: 'Diabetes Insipidus', adjustment: '+50-100% baseline' },
    { id: 'bowel', name: 'Bowel Obstruction', adjustment: 'Replace NG losses' },
    { id: 'trauma', name: 'Major Trauma', adjustment: '+20-40% baseline' }
  ];

  // Sample data for demo
  useEffect(() => {
    setAge('45');
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

  const selectMethod = (method) => {
    setCurrentMethod(method);
    setMaintenanceResult(null);
    setDeficitResult(null);
  };

  const toggleCondition = (conditionId) => {
    setSelectedConditions(prev => 
      prev.includes(conditionId) 
        ? prev.filter(id => id !== conditionId)
        : [...prev, conditionId]
    );
  };

  const calculateFluidRequirements = () => {
    // Validate inputs
    if (!age || !weight || !height || !temperature) {
      alert('Please fill in all required fields.');
      return;
    }

    const ageVal = parseFloat(age);
    const weightVal = parseFloat(weight);
    const heightVal = parseFloat(height);
    const tempVal = parseFloat(temperature);

    if (ageVal <= 0 || weightVal <= 0 || heightVal <= 0) {
      alert('Please enter valid positive numbers.');
      return;
    }

    let maintenance = 0;
    let methodName = '';
    let formula = '';

    // Calculate maintenance fluids
    switch(currentMethod) {
      case '4-2-1':
        maintenance = calculate421Rule(weightVal);
        methodName = '4-2-1 Rule (Holliday-Segar)';
        formula = 'First 10 kg: 4 mL/kg/h, Next 10 kg: 2 mL/kg/h, Each kg above 20: 1 mL/kg/h';
        break;
      case 'bsa':
        const bsa = calculateBSA(weightVal, heightVal);
        maintenance = bsa * 1500;
        methodName = 'Body Surface Area Method';
        formula = `BSA (${bsa.toFixed(2)} m²) × 1500 mL/m²/day`;
        break;
      case 'weight-only':
        maintenance = weightVal * 30;
        methodName = 'Weight-Based Method';
        formula = '30 mL/kg/day';
        break;
      case 'age-based':
        maintenance = calculateAgeBased(ageVal, weightVal);
        methodName = 'Age-Based Method';
        formula = 'Age-specific calculations';
        break;
    }

    // Calculate 24-hour maintenance
    const maintenance24h = maintenance * 24;
    
    // Calculate deficit based on clinical signs
    const deficit = calculateDeficit(weightVal, selectedConditions, tempVal);
    
    // Calculate total requirements
    const total24h = maintenance24h + deficit.deficitVolume;
    
    // Apply condition adjustments
    const adjustments = calculateConditionAdjustments(maintenance24h, selectedConditions, tempVal);
    
    // Calculate hourly rates
    const maintenanceHourly = maintenance;
    const totalHourly = total24h / 24;
    const deficitHourly = deficit.deficitVolume / 24;

    setMaintenanceResult({
      method: methodName,
      formula: formula,
      hourly: Math.round(maintenanceHourly * 10) / 10,
      daily: Math.round(maintenance24h * 10) / 10,
      hourlyRange: `${Math.round(maintenanceHourly * 0.8)}-${Math.round(maintenanceHourly * 1.2)}`,
      dailyRange: `${Math.round(maintenance24h * 0.8)}-${Math.round(maintenance24h * 1.2)}`
    });

    setDeficitResult({
      severity: deficit.severity,
      deficitVolume: Math.round(deficit.deficitVolume),
      percentDehydration: deficit.percentDehydration,
      clinicalSigns: deficit.clinicalSigns,
      adjustments: adjustments,
      conditions: selectedConditions.map(id => 
        medicalConditions.find(c => c.id === id)?.name
      ).filter(Boolean),
      totalHourly: Math.round(totalHourly * 10) / 10,
      totalDaily: Math.round(total24h * 10) / 10
    });
  };

  const calculate421Rule = (weight) => {
    // 4-2-1 rule: 4 mL/kg/h for first 10 kg, 2 mL/kg/h for next 10 kg, 1 mL/kg/h for each kg above 20
    let hourlyRate = 0;
    if (weight <= 10) {
      hourlyRate = weight * 4;
    } else if (weight <= 20) {
      hourlyRate = (10 * 4) + ((weight - 10) * 2);
    } else {
      hourlyRate = (10 * 4) + (10 * 2) + ((weight - 20) * 1);
    }
    return hourlyRate;
  };

  const calculateBSA = (weight, height) => {
    // Mosteller formula for BSA
    return Math.sqrt((height * weight) / 3600);
  };

  const calculateAgeBased = (age, weight) => {
    // Age-based maintenance fluid calculations
    if (age < 1) return weight * 4; // Infants
    if (age <= 10) return weight * 3; // Children
    return weight * 2.5; // Adults
  };

  const calculateDeficit = (weight, conditions, temperature) => {
    let percentDehydration = 0;
    let clinicalSigns = [];
    let severity = 'None';
    
    // Assess dehydration based on selected conditions
    if (conditions.includes('diarrhea')) {
      percentDehydration += 3;
      clinicalSigns.push('Increased stool output');
    }
    if (conditions.includes('vomiting')) {
      percentDehydration += 2;
      clinicalSigns.push('Nausea/Vomiting');
    }
    if (conditions.includes('sweating')) {
      percentDehydration += 2;
      clinicalSigns.push('Excessive sweating');
    }
    if (conditions.includes('fever')) {
      const feverAdjustment = Math.max(0, temperature - 37) * 0.5;
      percentDehydration += feverAdjustment;
      clinicalSigns.push(`Fever ${temperature}°C`);
    }
    
    // Determine severity
    if (percentDehydration < 3) {
      severity = 'Mild';
    } else if (percentDehydration < 6) {
      severity = 'Moderate';
    } else {
      severity = 'Severe';
    }
    
    // Calculate deficit volume (mL) = % dehydration × weight (kg) × 10
    const deficitVolume = percentDehydration * weight * 10;
    
    return {
      severity,
      percentDehydration: Math.round(percentDehydration * 10) / 10,
      deficitVolume: Math.round(deficitVolume),
      clinicalSigns
    };
  };

  const calculateConditionAdjustments = (maintenance, conditions, temperature) => {
    let adjustments = [];
    let totalAdjustment = 0;
    
    // Fever adjustment
    if (conditions.includes('fever')) {
      const tempDiff = Math.max(0, temperature - 37);
      const adjustment = maintenance * (tempDiff * 0.12);
      totalAdjustment += adjustment;
      adjustments.push({
        condition: 'Fever',
        adjustment: `+${Math.round(adjustment)} mL/day (${Math.round(tempDiff * 12)}%)`
      });
    }
    
    // Other condition adjustments
    conditions.forEach(conditionId => {
      if (conditionId !== 'fever') {
        const condition = medicalConditions.find(c => c.id === conditionId);
        if (condition) {
          let adjustment = 0;
          switch(conditionId) {
            case 'burns':
              adjustment = maintenance * 0.3; // Estimate 30% increase
              break;
            case 'sepsis':
              adjustment = maintenance * 0.25; // 25% increase
              break;
            case 'trauma':
              adjustment = maintenance * 0.3; // 30% increase
              break;
            case 'diabetes':
              adjustment = maintenance * 0.75; // 75% increase
              break;
            default:
              adjustment = maintenance * 0.1; // 10% increase for others
          }
          totalAdjustment += adjustment;
          adjustments.push({
            condition: condition.name,
            adjustment: `+${Math.round(adjustment)} mL/day`
          });
        }
      }
    });
    
    return {
      total: Math.round(totalAdjustment),
      details: adjustments
    };
  };

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "What's the difference between maintenance fluids and replacement fluids?",
      answer: "Maintenance fluids replace ongoing losses from respiration, urine, and insensible losses. Replacement fluids replace abnormal losses from vomiting, diarrhea, drains, or burns. Maintenance calculations (like 4-2-1 rule) provide baseline needs, while replacement fluids are added based on measured or estimated losses."
    },
    {
      question: "How do I adjust fluids for fever?",
      answer: "For each degree Celsius above 37°C, increase maintenance fluids by 12-13%. For example, a patient with 39°C fever needs approximately 24-26% more fluids than baseline. This accounts for increased insensible losses through respiration and sweating. Always monitor urine output and clinical signs to guide adjustments."
    },
    {
      question: "When should I use the 4-2-1 rule vs other methods?",
      answer: "Use the 4-2-1 (Holliday-Segar) rule for pediatric patients and most adults. Use BSA method for critically ill patients, burns, or when precise calculations are needed. Use weight-only method for quick estimates in stable patients. Always consider clinical context and adjust based on monitoring parameters."
    },
    {
      question: "How do I assess dehydration severity?",
      answer: "Mild dehydration (<3%): thirst, dry mucous membranes. Moderate (3-6%): decreased skin turgor, sunken eyes, oliguria. Severe (>6%): hypotension, tachycardia, lethargy, anuria. Always combine clinical assessment with laboratory findings (BUN/Cr ratio, urine specific gravity) for accurate assessment."
    },
    {
      question: "What are common mistakes in fluid management?",
      answer: "Common errors include: 1) Over-reliance on formulas without clinical assessment, 2) Not adjusting for comorbidities (heart/kidney failure), 3) Ignoring electrolyte composition, 4) Failing to monitor response, 5) Using inappropriate fluid types. Always individualize therapy and monitor closely."
    }
  ];

  const healthCalculators = [
    { name: "Electrolyte Calculator", link: "/electrolyte-calculator" },
    { name: "Creatinine Clearance", link: "/creatinine-clearance" },
    { name: "GFR Calculator", link: "/gfr-calculator" },
    { name: "Body Surface Area", link: "/bsa-calculator" },
    { name: "Ideal Weight Calculator", link: "/ideal-weight-calculator" },
    { name: "Anion Gap Calculator", link: "/anion-gap-calculator" },
    { name: "Nutritional Needs", link: "/nutrition-calculator" },
    { name: "Medication Dosage", link: "/medication-calculator" }
  ];

  // Handle Enter key press
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        calculateFluidRequirements();
      }
    };

    document.addEventListener('keypress', handleKeyPress);
    return () => document.removeEventListener('keypress', handleKeyPress);
  }, [age, weight, height, temperature, selectedConditions, currentMethod]);

  // Get active styles
  const getMethodTabStyle = (method) => ({
    ...methodTabStyle,
    ...(currentMethod === method ? activeMethodTabStyle : {})
  });

  const getConditionCheckboxStyle = (conditionId) => ({
    ...conditionCheckboxStyle,
    ...(selectedConditions.includes(conditionId) ? selectedConditionStyle : {}),
    ':hover': hoverConditionStyle
  });

  const getFaqAnswerStyle = (index) => ({
    ...faqAnswerStyle,
    ...(activeFAQ === index ? activeFaqAnswerStyle : {})
  });

  return (
    <main style={containerStyle}>
      <section style={calculatorBoxStyle}>
        <h1 style={calcTitleStyle}>
          <i className="fas fa-tint"></i> Fluid Requirements Calculator - Intravenous & Maintenance Fluid Therapy
        </h1>
        <p style={calcDescStyle}>
          Calculate <strong>maintenance fluid requirements, dehydration deficits, and total fluid needs</strong> using validated clinical formulas. Essential for <strong>intravenous therapy planning, hydration management, and perioperative fluid administration</strong> in clinical practice.
        </p>
        
        {/* Method Selection */}
        <div style={fluidMethodComparisonStyle}>
          <h4 style={sectionTitleStyle}><i className="fas fa-calculator"></i> Fluid Calculation Method Selection</h4>
          <p style={{ ...paragraphStyle, marginBottom: '15px' }}>
            Different methods suit different patient populations. <strong>4-2-1 Rule</strong> is standard for most patients, while <strong>BSA method</strong> provides precise calculations.
          </p>
          
          <div style={methodTabsStyle}>
            <button 
              style={getMethodTabStyle('4-2-1')}
              onClick={() => selectMethod('4-2-1')}
            >
              4-2-1 Rule
            </button>
            <button 
              style={getMethodTabStyle('bsa')}
              onClick={() => selectMethod('bsa')}
            >
              BSA Method
            </button>
            <button 
              style={getMethodTabStyle('weight-only')}
              onClick={() => selectMethod('weight-only')}
            >
              Weight-Based
            </button>
            <button 
              style={getMethodTabStyle('age-based')}
              onClick={() => selectMethod('age-based')}
            >
              Age-Based
            </button>
          </div>
          
          <div style={methodDisplayStyle}>
            {currentMethod === '4-2-1' && 'Hourly Rate = 4 mL/kg (first 10 kg) + 2 mL/kg (next 10 kg) + 1 mL/kg (each kg above 20)'}
            {currentMethod === 'bsa' && 'Daily Maintenance = BSA (m²) × 1500 mL/m²/day'}
            {currentMethod === 'weight-only' && 'Daily Maintenance = 30 mL/kg/day'}
            {currentMethod === 'age-based' && 'Infants: 4 mL/kg/h, Children: 3 mL/kg/h, Adults: 2.5 mL/kg/h'}
          </div>
        </div>

        <div style={measurementGridStyle}>
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
              onFocus={(e) => e.target.style = { ...inputStyle, ...focusInputStyle }}
              onBlur={(e) => e.target.style = inputStyle}
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
              onFocus={(e) => e.target.style = { ...inputStyle, ...focusInputStyle }}
              onBlur={(e) => e.target.style = inputStyle}
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
              onFocus={(e) => e.target.style = { ...inputStyle, ...focusInputStyle }}
              onBlur={(e) => e.target.style = inputStyle}
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-thermometer"></i> Temperature (°C)</label>
            <input 
              type="number" 
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              placeholder="37.0"
              min="35" 
              max="42" 
              step="0.1"
              style={inputStyle}
              onFocus={(e) => e.target.style = { ...inputStyle, ...focusInputStyle }}
              onBlur={(e) => e.target.style = inputStyle}
            />
          </div>
        </div>

        {/* Medical Conditions Selection */}
        <div style={inputGroupStyle}>
          <label style={inputGroupLabelStyle}><i className="fas fa-clipboard-list"></i> Medical Conditions Affecting Fluid Needs</label>
          <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '10px' }}>
            Select conditions that increase or decrease fluid requirements:
          </p>
          <div style={conditionsGridStyle}>
            {medicalConditions.map(condition => (
              <div 
                key={condition.id}
                style={getConditionCheckboxStyle(condition.id)}
                onClick={() => toggleCondition(condition.id)}
                onMouseEnter={(e) => e.currentTarget.style.background = hoverConditionStyle.background}
                onMouseLeave={(e) => e.currentTarget.style.background = selectedConditions.includes(condition.id) ? selectedConditionStyle.background : 'white'}
              >
                <input 
                  type="checkbox" 
                  checked={selectedConditions.includes(condition.id)}
                  onChange={() => {}}
                  style={{ cursor: 'pointer' }}
                />
                <div>
                  <div style={{ fontWeight: '600' }}>{condition.name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>{condition.adjustment}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button 
          style={calcBtnStyle}
          onClick={calculateFluidRequirements}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, calcBtnHoverStyle)}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = calcBtnStyle.background;
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <i className="fas fa-calculator"></i> Calculate Fluid Requirements
        </button>

        {/* Results Display */}
        {(maintenanceResult || deficitResult) && (
          <div style={resultsContainerStyle}>
            <div style={{ ...resultCardStyle, ...maintenanceCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-prescription-bottle"></i> Maintenance Fluids</h4>
              <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '10px' }}>
                {maintenanceResult?.method}
              </p>
              <div style={{ margin: '20px 0' }}>
                <div style={fluidValueStyle}>{maintenanceResult?.hourly} mL/h</div>
                <div style={{ fontSize: '1.2rem', color: '#666' }}>
                  {maintenanceResult?.daily} mL/day
                </div>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div>Formula: {maintenanceResult?.formula}</div>
                <div>Range: {maintenanceResult?.hourlyRange} mL/h</div>
              </div>
            </div>

            <div style={{ ...resultCardStyle, ...deficitCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-exclamation-triangle"></i> Dehydration Assessment</h4>
              {deficitResult && (
                <>
                  <div style={{ margin: '20px 0' }}>
                    <div style={{ ...fluidValueStyle, ...deficitValueStyle }}>-{deficitResult.deficitVolume} mL</div>
                    <div style={{ fontSize: '1.2rem', color: '#666' }}>
                      {deficitResult.severity} Dehydration ({deficitResult.percentDehydration}%)
                    </div>
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>
                    <div>Clinical Signs: {deficitResult.clinicalSigns.join(', ') || 'None'}</div>
                    {deficitResult.conditions.length > 0 && (
                      <div>Conditions: {deficitResult.conditions.join(', ')}</div>
                    )}
                  </div>
                </>
              )}
            </div>

            <div style={{ ...resultCardStyle, ...totalCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-calculator"></i> Total Requirements</h4>
              {deficitResult && (
                <>
                  <div style={{ margin: '20px 0' }}>
                    <div style={{ ...fluidValueStyle, ...totalValueStyle }}>{deficitResult.totalHourly} mL/h</div>
                    <div style={{ fontSize: '1.2rem', color: '#666' }}>
                      {deficitResult.totalDaily} mL/day
                    </div>
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>
                    <div>Maintenance: {maintenanceResult?.daily} mL/day</div>
                    <div>Deficit Replacement: {deficitResult.deficitVolume} mL</div>
                    {deficitResult.adjustments.total > 0 && (
                      <div>Condition Adjustments: +{deficitResult.adjustments.total} mL</div>
                    )}
                  </div>
                </>
              )}
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

        {/* Clinical Applications */}
        <div style={clinicalAppsStyle}>
          <div style={clinicalCardStyle}>
            <h4 style={sectionTitleStyle}><i className="fas fa-hospital"></i> Perioperative Care</h4>
            <p style={{ fontSize: '0.9rem' }}>Calculate <strong>preoperative fasting deficits, intraoperative losses, and postoperative maintenance</strong> for optimal surgical outcomes.</p>
          </div>
          <div style={clinicalCardStyle}>
            <h4 style={sectionTitleStyle}><i className="fas fa-baby"></i> Pediatric Hydration</h4>
            <p style={{ fontSize: '0.9rem' }}>Essential for <strong>gastroenteritis management, fever treatment, and critical illness resuscitation</strong> in children.</p>
          </div>
          <div style={clinicalCardStyle}>
            <h4 style={sectionTitleStyle}><i className="fas fa-user-injured"></i> Critical Care</h4>
            <p style={{ fontSize: '0.9rem' }}>Manage <strong>sepsis resuscitation, burn resuscitation, and traumatic injury fluid replacement</strong> protocols.</p>
          </div>
          <div style={clinicalCardStyle}>
            <h4 style={sectionTitleStyle}><i className="fas fa-thermometer-full"></i> Fever Management</h4>
            <p style={{ fontSize: '0.9rem' }}>Adjust for <strong>increased insensible losses</strong> during febrile illnesses and hypermetabolic states.</p>
          </div>
        </div>

        <h3 style={sectionTitleStyle}><i className="fas fa-list-alt"></i> Standard Maintenance Fluid Rates by Age and Weight</h3>
        <table style={categoryTableStyle}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Patient Type</th>
              <th style={tableHeaderStyle}>Hourly Rate</th>
              <th style={tableHeaderStyle}>Daily Rate</th>
              <th style={tableHeaderStyle}>Calculation Method</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={tableCellStyle}>Infants (0-1 year)</td><td style={tableCellStyle}>4 mL/kg/h</td><td style={tableCellStyle}>100 mL/kg/day</td><td style={tableCellStyle}>4-2-1 Rule</td></tr>
            <tr><td style={tableCellStyle}>Children (1-10 years)</td><td style={tableCellStyle}>3 mL/kg/h</td><td style={tableCellStyle}>75 mL/kg/day</td><td style={tableCellStyle}>4-2-1 Rule</td></tr>
            <tr><td style={tableCellStyle}>Adolescents (11-18)</td><td style={tableCellStyle}>2.5 mL/kg/h</td><td style={tableCellStyle}>60 mL/kg/day</td><td style={tableCellStyle}>4-2-1 Rule</td></tr>
            <tr><td style={tableCellStyle}>Adults (19-55)</td><td style={tableCellStyle}>2 mL/kg/h</td><td style={tableCellStyle}>50 mL/kg/day</td><td style={tableCellStyle}>4-2-1 Rule</td></tr>
            <tr><td style={tableCellStyle}>Elderly (&gt;55)</td><td style={tableCellStyle}>1.5 mL/kg/h</td><td style={tableCellStyle}>40 mL/kg/day</td><td style={tableCellStyle}>Reduced due to decreased muscle mass</td></tr>
            <tr><td style={tableCellStyle}>BSA Method</td><td style={tableCellStyle}>BSA × 62.5 mL/h</td><td style={tableCellStyle}>BSA × 1500 mL/day</td><td style={tableCellStyle}>Most accurate for unusual body habitus</td></tr>
          </tbody>
        </table>

        {/* Enhanced SEO Content with High-Value Long-Tail Keywords */}
        <div style={infoSectionStyle}>
          <h3 style={sectionTitleStyle}><i className="fas fa-question-circle"></i> What is Fluid Requirement Calculation? Comprehensive Intravenous Therapy Planning</h3>
          <p style={paragraphStyle}><strong>Fluid requirement calculation methodologies</strong> represent <strong>essential clinical protocols</strong> for determining <strong>maintenance fluid administration rates, dehydration deficit replacements, and total intravenous therapy volumes</strong>. These calculations integrate <strong>physiological principles of fluid homeostasis, electrolyte balance maintenance, and renal compensation mechanisms</strong> to provide <strong>personalized hydration management strategies</strong> across diverse clinical scenarios requiring <strong>precise fluid resuscitation protocols</strong>.</p>
          
          <h3 style={sectionTitleStyle}><i className="fas fa-calculator"></i> Fluid Calculation Methods - Comprehensive Intravenous Therapy Formulae</h3>
          <p style={paragraphStyle}>Multiple <strong>validated fluid requirement estimation equations</strong> exist for <strong>comprehensive hydration management protocols</strong>, each demonstrating specific <strong>clinical applications and variable accuracy profiles</strong> influencing <strong>fluid resuscitation decision-making processes</strong>:</p>
          
          <div style={formulaBoxStyle}>
            <strong>4-2-1 Rule (Holliday-Segar Method):</strong> Gold standard for maintenance fluid calculations across all age groups<br/>
            <strong>Body Surface Area Method:</strong> Most accurate for patients with unusual body habitus or critical illness<br/>
            <strong>Weight-Based Method:</strong> Simplified approach for rapid clinical assessment and emergency situations<br/>
            <strong>Age-Based Method:</strong> Tailored calculations accounting for developmental physiological differences<br/>
            <strong>Clinical Method Selection Protocol:</strong> 4-2-1 Rule recommended for <strong>standard maintenance calculations</strong>, BSA method for <strong>precision-critical situations</strong>
          </div>

          <h3 style={sectionTitleStyle}><i className="fas fa-stethoscope"></i> Clinical Applications of Fluid Calculation - Comprehensive Therapeutic Management Guidelines</h3>
          <p style={paragraphStyle}>Accurate <strong>fluid requirement calculation methodology implementation</strong> serves critical functions across multiple <strong>medical specialties and therapeutic management areas</strong> requiring <strong>precise volume status assessment</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Perioperative Fluid Management Protocols:</strong> Essential for <strong>preoperative fasting deficit calculations, intraoperative loss replacements, and postoperative maintenance regimens</strong> optimizing <strong>surgical recovery trajectories</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Pediatric Dehydration Management Algorithms:</strong> Guides <strong>gastroenteritis resuscitation strategies, febrile illness rehydration protocols, and critical illness fluid bolus administrations</strong> in pediatric populations</li>
            <li style={{ marginBottom: '10px' }}><strong>Critical Care Resuscitation Strategies:</strong> Determines <strong>sepsis bundle compliance volumes, traumatic injury resuscitation endpoints, and burn resuscitation formula applications</strong> in intensive care settings</li>
            <li style={{ marginBottom: '10px' }}><strong>Chronic Disease Management Protocols:</strong> Adjusts <strong>heart failure fluid restriction parameters, renal failure volume management strategies, and cirrhosis ascites control measures</strong> for complex comorbidities</li>
            <li style={{ marginBottom: '10px' }}><strong>Geriatric Hydration Optimization:</strong> Accounts for <strong>age-related physiological changes, medication interactions, and cognitive impairment considerations</strong> in elderly patient populations</li>
            <li style={{ marginBottom: '10px' }}><strong>Oncological Supportive Care:</strong> Manages <strong>chemotherapy-induced nausea/vomiting losses, tumor lysis syndrome prevention, and mucositis hydration requirements</strong> in cancer patients</li>
            <li><strong>Nutritional Support Integration:</strong> Coordinates <strong>enteral feeding free water calculations, parenteral nutrition fluid volumes, and medication dilution requirements</strong> for comprehensive care</li>
          </ul>
          
          <h3 style={sectionTitleStyle}><i className="fas fa-balance-scale"></i> Factors Affecting Fluid Requirements - Comprehensive Clinical Assessment Considerations</h3>
          <p style={paragraphStyle}>Multiple <strong>significant physiological and pathological factors</strong> influence <strong>fluid requirement estimation accuracy parameters</strong> and require consideration for appropriate clinical interpretation:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Metabolic Rate Variability Factors:</strong> Affected by <strong>fever-induced hypermetabolism, thyroid dysfunction states, and critical illness catabolism</strong> altering insensible loss calculations</li>
            <li style={{ marginBottom: '10px' }}><strong>Environmental Exposure Influences:</strong> High ambient temperatures, low humidity conditions, and altitude exposure significantly increase respiratory water losses</li>
            <li style={{ marginBottom: '10px' }}><strong>Age-Related Physiological Changes:</strong> Pediatric patients demonstrate <strong>higher metabolic rates and body surface area ratios</strong>, while elderly patients exhibit <strong>reduced renal concentrating abilities and thirst mechanisms</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Comorbid Condition Impacts:</strong> Diabetes insipidus, adrenal insufficiency, and syndrome of inappropriate antidiuretic hormone secretion require specialized adjustment protocols</li>
            <li style={{ marginBottom: '10px' }}><strong>Medication Effect Considerations:</strong> Diuretics, lithium, and demeclocycline significantly alter renal water handling and electrolyte balance</li>
            <li style={{ marginBottom: '10px' }}><strong>Surgical and Traumatic Losses:</strong> Third spacing phenomena, drain outputs, and open wound evaporation require precise measurement and replacement strategies</li>
            <li><strong>Nutritional Status Variables:</strong> Malnutrition, obesity, and cachexia significantly alter body composition and fluid distribution patterns</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-exclamation-triangle"></i> Limitations of Fluid Calculation Formulas - Advanced Clinical Assessment Methodologies</h3>
          <p style={paragraphStyle}>While <strong>fluid calculation methodologies</strong> provide valuable <strong>clinical starting points</strong>, specific clinical situations necessitate <strong>advanced assessment approaches</strong> and <strong>dynamic monitoring protocols</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Dynamic Clinical State Scenarios:</strong> Rapidly changing volume status, evolving sepsis presentations, and fluctuating renal function require continuous reassessment</li>
            <li style={{ marginBottom: '10px' }}><strong>Complex Comorbidity Considerations:</strong> Combined heart-kidney-liver dysfunction presentations requiring nuanced fluid balance approaches</li>
            <li style={{ marginBottom: '10px' }}><strong>Unusual Body Composition Patterns:</strong> Extreme obesity, severe cachexia, and massive edema states affecting standard formula accuracy</li>
            <li style={{ marginBottom: '10px' }}><strong>Critical Illness Complexities:</strong> Capillary leak syndromes, vasoplegic shock, and multiple organ dysfunction requiring advanced hemodynamic monitoring</li>
            <li style={{ marginBottom: '10px' }}><strong>Advanced Monitoring Requirement Situations:</strong> Invasive hemodynamic monitoring, echocardiographic assessment, and passive leg raising test applications for precision management</li>
            <li><strong>Alternative Assessment Methodologies:</strong> <strong>Bioimpedance analysis, inferior vena cava ultrasonography, and transpulmonary thermodilution techniques</strong> for advanced volume status assessment</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-history"></i> Historical Development of Fluid Formulas - Evolution of Intravenous Therapy Science</h3>
          <p style={paragraphStyle}>The progressive evolution of <strong>fluid calculation methodologies</strong> reflects <strong>centuries of physiological research advancement</strong> and <strong>clinical practice refinement trajectories</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>1831 Historical Milestone:</strong> First successful human intravenous saline administration establishing <strong>parenteral fluid therapy foundation</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>1957 Pediatric Standardization:</strong> Holliday and Segar develop <strong>4-2-1 rule methodology</strong> revolutionizing pediatric fluid management</li>
            <li style={{ marginBottom: '10px' }}><strong>1970s Critical Care Advancement:</strong> Development of <strong>goal-directed therapy protocols</strong> and <strong>hemodynamic monitoring techniques</strong> for shock resuscitation</li>
            <li style={{ marginBottom: '10px' }}><strong>1990s Evidence-Based Refinement:</strong> Large clinical trials establish <strong>restrictive vs liberal fluid strategy evidence</strong> for various clinical conditions</li>
            <li><strong>21st Century Precision Medicine:</strong> Integration of <strong>advanced monitoring technologies, personalized medicine approaches, and dynamic assessment protocols</strong> for optimal fluid management</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-user-md"></i> Practical Clinical Implementation Recommendations - Comprehensive Fluid Management Guidelines</h3>
          <p style={paragraphStyle}>For optimal <strong>fluid calculation implementation</strong> in contemporary clinical practice environments and <strong>evidence-based therapeutic management protocols</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Dynamic Assessment Protocol Implementation:</strong> Utilize <strong>frequent clinical reassessment, laboratory parameter trending, and monitoring technology integration</strong> rather than static formula application</li>
            <li style={{ marginBottom: '10px' }}><strong>Comprehensive Clinical Context Integration:</strong> Consider <strong>patient-specific physiological factors, comorbid condition influences, medication profiles, and treatment phase requirements</strong> beyond numerical calculations alone</li>
            <li style={{ marginBottom: '10px' }}><strong>Standardized Documentation Methodology:</strong> Systematically record <strong>calculated requirements, clinical assessment findings, administered volumes, and response parameters</strong> in electronic health records</li>
            <li style={{ marginBottom: '10px' }}><strong>Multidisciplinary Collaboration Enhancement:</strong> Coordinate fluid management with <strong>nursing assessment teams, pharmacy specialists, nutrition services, and critical care consultants</strong> for comprehensive care</li>
            <li style={{ marginBottom: '10px' }}><strong>Patient-Specific Education Protocol:</strong> Develop <strong>individualized educational materials</strong> explaining <strong>fluid management rationale, monitoring importance, and self-assessment strategies</strong> for chronic conditions</li>
            <li><strong>Quality Improvement Integration:</strong> Implement <strong>regular audit processes, outcome measurement protocols, and practice standardization initiatives</strong> for continuous fluid management optimization</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-chart-line"></i> Future Directions in Fluid Management - Emerging Assessment Technologies</h3>
          <p style={paragraphStyle}>Ongoing <strong>fluid management research initiatives</strong> continue refining <strong>assessment approaches</strong> with promising technological developments and <strong>innovative monitoring methodologies</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Advanced Monitoring Technology Development:</strong> Non-invasive hemodynamic monitors, wearable fluid status sensors, and continuous electrolyte measurement devices</li>
            <li style={{ marginBottom: '10px' }}><strong>Artificial Intelligence Clinical Applications:</strong> Machine learning algorithm development for <strong>personalized fluid requirement prediction models</strong> incorporating multiple clinical variables</li>
            <li style={{ marginBottom: '10px' }}><strong>Point-of-Care Testing Advancements:</strong> Development of <strong>rapid, accurate bedside assessment tools</strong> for immediate fluid management decision support</li>
            <li style={{ marginBottom: '10px' }}><strong>Biomarker Discovery Research:</strong> Identification of <strong>novel volume status biomarkers</strong> with improved diagnostic accuracy profiles and early detection capabilities</li>
            <li style={{ marginBottom: '10px' }}><strong>International Standardization Initiatives:</strong> Global collaborative efforts for <strong>consistent assessment technique implementation</strong> and <strong>harmonized management protocols</strong></li>
            <li><strong>Telemedicine Integration Strategies:</strong> Remote monitoring technologies enabling <strong>continuous fluid status assessment</strong> in outpatient and home care settings</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-graduation-cap"></i> Educational Requirements and Professional Training Standards Implementation</h3>
          <p style={paragraphStyle}>Proper <strong>fluid calculation methodology education</strong> represents an <strong>essential clinical competency requirement</strong> for <strong>healthcare professionals</strong> across multiple medical disciplines. Comprehensive training curricula should systematically include <strong>physiological principles, calculation methodologies, clinical assessment techniques, and monitoring protocols</strong>. Continuing medical education programs must consistently address <strong>evolving research findings, changing clinical practice standards, and emerging technological developments</strong> to ensure optimal patient care outcomes and evidence-based practice implementation.</p>

          <h3 style={sectionTitleStyle}><i className="fas fa-clipboard-check"></i> Quality Assurance and Protocol Standardization Implementation</h3>
          <p style={paragraphStyle}>Implementation of <strong>rigorous quality assurance protocols</strong> ensures <strong>consistent fluid management practices</strong> across diverse healthcare settings. These protocols encompass <strong>calculation standardization methodologies, assessment technique verification procedures, and outcome measurement requirements</strong> that directly impact <strong>patient safety parameters</strong>. Professional organizations should develop <strong>standardized training materials, competency assessment tools, and practice guideline documents</strong> to guarantee consistent clinical application quality across diverse healthcare delivery settings and specialty practice areas.</p>
        </div>

        {/* Q&A Dropdown Section */}
        <div style={faqSectionStyle}>
          <h2 style={faqTitleStyle}><i className="fas fa-question-circle"></i> Frequently Asked Questions About Fluid Requirement Calculation</h2>
          {faqs.map((faq, index) => (
            <div key={index} style={faqItemStyle}>
              <div 
                style={faqQuestionStyle}
                onClick={() => toggleFAQ(index)}
                onMouseEnter={(e) => e.currentTarget.style.background = hoverFaqQuestionStyle.background}
                onMouseLeave={(e) => e.currentTarget.style.background = faqQuestionStyle.background}
              >
                {faq.question}
                <i className={`fas fa-chevron-${activeFAQ === index ? 'up' : 'down'}`}></i>
              </div>
              <div style={getFaqAnswerStyle(index)}>
                {faq.answer}
              </div>
            </div>
          ))}
        </div>

        {/* Health Calculators Section */}
        <div style={infoSectionStyle}>
          <h3 style={sectionTitleStyle}><i className="fas fa-calculator"></i> Related Medical & Critical Care Calculators</h3>
          <p style={paragraphStyle}>Explore our comprehensive collection of <strong>medical calculation tools and critical care monitoring calculators</strong> for clinical applications and patient management:</p>
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
          <p style={paragraphStyle}><strong>This fluid requirements calculator provides estimates for educational and informational purposes only.</strong> The calculations are based on standard formulas and should not be used as a substitute for professional medical advice, diagnosis, or treatment.</p>
          <p style={paragraphStyle}><strong>Clinical Decision Limitations:</strong> Fluid requirement estimates have inherent limitations and may not accurately reflect individual patient needs. Actual fluid management requires comprehensive clinical assessment including vital signs, laboratory values, urine output, and physical examination findings.</p>
          <p style={paragraphStyle}><strong>Monitoring Requirements:</strong> Fluid administration should always be accompanied by careful monitoring of clinical response, including urine output, vital signs, mental status, and laboratory parameters. Adjustments should be made based on patient response rather than formula calculations alone.</p>
          <p style={paragraphStyle}><strong>Comorbidity Considerations:</strong> Patients with heart failure, renal failure, liver disease, or other conditions affecting fluid balance require specialized assessment and management. Standard formulas may not be appropriate for these patients.</p>
          <p style={paragraphStyle}><strong>Professional Consultation Required:</strong> Always seek the advice of your physician or other qualified health provider with any questions you may have regarding fluid management or treatment decisions. Do not disregard professional medical advice or delay seeking it because of information provided by this calculator.</p>
          <p style={paragraphStyle}><strong>Emergency Situations:</strong> If you believe you may have a medical emergency, call your doctor or emergency services immediately. This calculator is not designed for emergency medical situations requiring immediate intervention.</p>
        </div>
      </section>

      {/* Sidebar with 3 Ads (3rd one sticky) */}
      <aside style={{ ...sidebarStyle, display: showSidebar ? 'block' : 'none' }}>
        <div style={sidebarContentStyle}>
          <div style={{ ...adSlotStyle, ...sidebarAdStyle }}>
            <p><i className="fas fa-ad"></i> Advertisement 1</p>
            <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Sponsored Content</p>
            <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Intravenous therapy training course</p>
            <div style={{ flexGrow: 1 }}></div>
            <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>300px height ad slot</p>
          </div>
          
          <div style={{ ...adSlotStyle, ...sidebarAdStyle }}>
            <p><i className="fas fa-ad"></i> Advertisement 2</p>
            <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Featured Product</p>
            <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Hydration monitoring device</p>
            <div style={{ flexGrow: 1 }}></div>
            <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>300px height ad slot</p>
          </div>
          
          <div style={{ ...adSlotStyle, ...stickyAdStyle }}>
            <p><i className="fas fa-thumbtack"></i> Sticky Advertisement</p>
            <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Premium Content - Stays visible</p>
            <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Critical care fluid management guide</p>
            <div style={{ flexGrow: 1 }}></div>
            <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>300px sticky ad</p>
          </div>
        </div>
      </aside>

      {/* Additional Ads when sidebar disappears (mobile) */}
      <div style={{ ...mobileAdsStyle, display: !showSidebar ? 'grid' : 'none' }}>
        <div style={mobileAdStyle}>
          <p><i className="fas fa-ad"></i> Mobile Advertisement 1</p>
          <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Optimized for mobile viewing</p>
        </div>
        <div style={mobileAdStyle}>
          <p><i className="fas fa-ad"></i> Mobile Advertisement 2</p>
          <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Perfect for smaller screens</p>
        </div>
      </div>
    </main>
  );
}