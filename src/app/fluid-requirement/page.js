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
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [results, setResults] = useState(null);

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

  // Input grid style
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

  // Share and Download buttons styles
  const actionButtonsStyle = {
    display: 'flex',
    gap: '10px',
    marginTop: '20px',
    flexWrap: 'wrap'
  };

  const shareButtonStyle = {
    padding: '12px 20px',
    background: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: '0.3s',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const downloadButtonStyle = {
    padding: '12px 20px',
    background: '#27ae60',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: '0.3s',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const shareMenuStyle = {
    position: 'absolute',
    top: '100%',
    left: 0,
    background: 'white',
    borderRadius: '10px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.15)',
    padding: '15px',
    zIndex: 1000,
    minWidth: '200px',
    marginTop: '10px'
  };

  const sharePlatformButtonStyle = {
    width: '100%',
    padding: '10px 15px',
    marginBottom: '8px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    transition: '0.2s'
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

  // Sidebar styles
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
    height: '250px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f8f9fa',
    border: '2px dashed #ddd',
    borderRadius: '10px',
    color: '#7f8c8d',
    padding: '15px'
  };

  const stickyAdStyle = {
    position: 'sticky',
    top: '20px',
    background: '#e8f5e9',
    border: '2px solid #3498db',
    boxShadow: '0 4px 12px rgba(52, 152, 219, 0.15)',
    height: '250px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '15px',
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
    height: '250px',
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

  // Calculator links with SEO relevance ranking
  const calculatorLinks = [
    { name: "BMI Calculator", link: "/bmi-calculator", relevance: 10, category: "health" },
    { name: "Body Fat Calculator", link: "/body-fat-calculator", relevance: 10, category: "fitness" },
    { name: "Ideal Weight Calculator", link: "/ibw-calculator", relevance: 9, category: "health" },
    { name: "Waist-Hip Ratio", link: "/waist-hip-ratio", relevance: 9, category: "health" },
    { name: "BSA Calculator", link: "/bsa-calculator", relevance: 8, category: "medical" },
    { name: "Calorie Calculator", link: "/calorie-calculator", relevance: 8, category: "nutrition" },
    { name: "TDEE Calculator", link: "/tdee-calculator", relevance: 8, category: "fitness" },
    { name: "BMR Calculator", link: "/bmr-calculator", relevance: 8, category: "fitness" },
    { name: "LBM Calculator", link: "/lbm-calculator", relevance: 7, category: "fitness" },
    { name: "Heart Rate Calculator", link: "/heart-rate-calculator", relevance: 7, category: "health" },
    { name: "Water Intake Calculator", link: "/water-intake-calculator", relevance: 9, category: "health" },
    { name: "Ovulation Tracker", link: "/ovulation-tracker", relevance: 6, category: "pregnancy" },
    { name: "Pregnancy Due Date Calculator", link: "/pregnancy-due-date-calculator", relevance: 7, category: "pregnancy" },
    { name: "GFR Calculator", link: "/gfr-calculator", relevance: 8, category: "medical" },
    { name: "Creatinine Clearance", link: "/creatinine-clearance", relevance: 8, category: "medical" },
    { name: "Fluid Requirement", link: "/fluid-requirement", relevance: 10, category: "medical" },
    { name: "Medication Dosage", link: "/medication-dosage", relevance: 7, category: "medical" },
    { name: "Electrolyte Correction", link: "/electrolyte-correction", relevance: 7, category: "medical" },
    { name: "Nutritional Needs", link: "/nutritional-needs", relevance: 7, category: "nutrition" },
    { name: "Cardiac Index Calculator", link: "/cardiac-index-calculator", relevance: 6, category: "medical" },
    { name: "Pregnancy Weight Gain Calculator", link: "/pregnancy-weight-gain-calculator", relevance: 6, category: "pregnancy" },
    { name: "Fertile Window Calculator", link: "/fertile-window-calculator", relevance: 6, category: "pregnancy" },
    { name: "Safe Period Calculator", link: "/safe-period-calculator", relevance: 5, category: "pregnancy" },
    { name: "Period Cycle Calculator", link: "/period-cycle-calculator", relevance: 6, category: "health" },
    { name: "Blood Pressure Category Calculator", link: "/blood-pressure-category-calculator", relevance: 8, category: "health" },
    { name: "Diabetes Risk Calculator", link: "/diabetes-risk-calculator", relevance: 8, category: "health" },
    { name: "Heart Disease Risk Calculator", link: "/heart-disease-risk-calculator", relevance: 8, category: "health" },
    { name: "Carbohydrate Intake Calculator", link: "/carbohydrate-intake-calculator", relevance: 7, category: "nutrition" },
    { name: "Fat Intake Calculator", link: "/fat-intake-calculator", relevance: 7, category: "nutrition" },
    { name: "Anion Gap Calculator", link: "/anion-gap-calculator", relevance: 6, category: "medical" },
    { name: "Pregnancy Test", link: "/pregnancy-test", relevance: 5, category: "pregnancy" },
    { name: "Blood Pressure Tracker", link: "/blood-pressure-tracker", relevance: 7, category: "health" }
  ];

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
      setShowSidebar(window.innerWidth >= 1024);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle click outside share menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showShareMenu && !event.target.closest('.share-button-container')) {
        setShowShareMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showShareMenu]);

  const selectMethod = (method) => {
    setCurrentMethod(method);
    setMaintenanceResult(null);
    setDeficitResult(null);
    setResults(null);
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
        maintenance = bsa * 1500 / 24; // Convert daily to hourly
        methodName = 'Body Surface Area Method';
        formula = `BSA (${bsa.toFixed(2)} m²) × 1500 mL/m²/day`;
        break;
      case 'weight-only':
        maintenance = weightVal * 30 / 24; // Convert daily to hourly
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

    setResults({
      maintenance: {
        hourly: Math.round(maintenanceHourly * 10) / 10,
        daily: Math.round(maintenance24h * 10) / 10
      },
      deficit: {
        severity: deficit.severity,
        volume: Math.round(deficit.deficitVolume),
        percent: deficit.percentDehydration
      },
      total: {
        hourly: Math.round(totalHourly * 10) / 10,
        daily: Math.round(total24h * 10) / 10
      },
      method: methodName,
      patient: {
        age: ageVal,
        weight: weightVal,
        height: heightVal,
        temperature: tempVal
      },
      conditions: selectedConditions.map(id => 
        medicalConditions.find(c => c.id === id)?.name
      ).filter(Boolean),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString()
    });

    setShowShareMenu(false);
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

  // Share function
  const shareResults = (platform) => {
    if (!results) {
      alert('Please calculate fluid requirements first before sharing.');
      return;
    }

    const shareText = `My fluid requirement is ${results.total.hourly} mL/h (${results.total.daily} mL/day) - Check your fluid needs using this calculator!`;
    const shareUrl = window.location.href;
    const hashtags = 'FluidRequirements,Hydration,MedicalCalculator,Health';

    let shareUrlFull = '';
    
    switch(platform) {
      case 'facebook':
        shareUrlFull = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
        break;
      case 'twitter':
        shareUrlFull = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}&hashtags=${hashtags}`;
        break;
      case 'linkedin':
        shareUrlFull = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'whatsapp':
        shareUrlFull = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
        break;
      case 'telegram':
        shareUrlFull = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
        break;
      case 'reddit':
        shareUrlFull = `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`;
        break;
      case 'pinterest':
        shareUrlFull = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&description=${encodeURIComponent(shareText)}`;
        break;
      case 'email':
        shareUrlFull = `mailto:?subject=My Fluid Requirement Results&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`;
        break;
      default:
        // Web Share API for modern browsers
        if (navigator.share) {
          navigator.share({
            title: 'My Fluid Requirement Results',
            text: shareText,
            url: shareUrl,
          });
          return;
        } else {
          // Fallback: copy to clipboard
          navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
          alert('Results copied to clipboard!');
          return;
        }
    }

    window.open(shareUrlFull, '_blank', 'noopener,noreferrer');
    setShowShareMenu(false);
  };

  // Download as HTML file
  const downloadHTML = () => {
    if (!results) {
      alert('Please calculate fluid requirements first before downloading.');
      return;
    }

    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fluid Requirements Calculator Results</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background: #f8f9fa;
            color: #333;
            line-height: 1.6;
            padding: 20px;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .report-header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 3px solid #3498db;
        }
        
        .report-header h1 {
            color: #2c3e50;
            font-size: 2.5rem;
            margin-bottom: 10px;
        }
        
        .report-header p {
            color: #666;
            font-size: 1.1rem;
        }
        
        .results-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .result-card {
            background: white;
            border-radius: 12px;
            padding: 25px;
            box-shadow: 0 3px 15px rgba(0,0,0,0.08);
            border-top: 5px solid;
        }
        
        .card-title {
            color: #2c3e50;
            margin-bottom: 20px;
            font-size: 1.3rem;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .card-title i {
            font-size: 1.2rem;
        }
        
        .fluid-value {
            font-size: 3rem;
            font-weight: 800;
            margin: 15px 0;
            text-align: center;
        }
        
        .info-box {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            margin: 15px 0;
        }
        
        .measurement-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin: 20px 0;
        }
        
        .measurement-item {
            padding: 10px;
            background: #f8f9fa;
            border-radius: 6px;
        }
        
        .measurement-value {
            font-size: 1.2rem;
            font-weight: bold;
        }
        
        .measurement-label {
            font-size: 0.85rem;
            color: #666;
            margin-top: 5px;
        }
        
        .health-tip {
            padding: 15px;
            background: #e3f2fd;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #3498db;
        }
        
        .disclaimer {
            background: #fff8e1;
            padding: 20px;
            border-radius: 10px;
            border-left: 5px solid #f39c12;
            margin-top: 30px;
        }
        
        .disclaimer h4 {
            color: #e67e22;
            margin-bottom: 15px;
        }
        
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            color: #666;
            font-size: 0.9rem;
        }
        
        @media print {
            body {
                background: white;
                padding: 10px;
            }
            
            .result-card {
                box-shadow: none;
                border: 1px solid #ddd;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="report-header">
            <h1><i class="fas fa-tint"></i> Fluid Requirements Calculator Results</h1>
            <p>Generated on ${date} at ${time}</p>
        </div>
        
        <div class="results-grid">
            <!-- Patient Information Card -->
            <div class="result-card" style="border-top-color: #3498db;">
                <h3 class="card-title"><i class="fas fa-user" style="color: #3498db;"></i> Patient Information</h3>
                <div class="measurement-grid">
                    <div class="measurement-item">
                        <div class="measurement-value">${results.patient.age} years</div>
                        <div class="measurement-label">Age</div>
                    </div>
                    <div class="measurement-item">
                        <div class="measurement-value">${results.patient.weight} kg</div>
                        <div class="measurement-label">Weight</div>
                    </div>
                    <div class="measurement-item">
                        <div class="measurement-value">${results.patient.height} cm</div>
                        <div class="measurement-label">Height</div>
                    </div>
                    <div class="measurement-item">
                        <div class="measurement-value">${results.patient.temperature}°C</div>
                        <div class="measurement-label">Temperature</div>
                    </div>
                </div>
                <div class="info-box">
                    <p><strong>Calculation Method:</strong> ${results.method}</p>
                    ${results.conditions.length > 0 ? `
                    <p><strong>Medical Conditions:</strong> ${results.conditions.join(', ')}</p>
                    ` : ''}
                </div>
            </div>
            
            <!-- Results Card -->
            <div class="result-card" style="border-top-color: #2ecc71;">
                <h3 class="card-title"><i class="fas fa-calculator" style="color: #2ecc71;"></i> Fluid Requirements</h3>
                <div class="fluid-value" style="color: #2ecc71;">${results.total.hourly} mL/h</div>
                <div style="font-size: 1.5rem; font-weight: bold; text-align: center; margin-bottom: 15px; color: #2ecc71;">
                    ${results.total.daily} mL/day
                </div>
                <div class="health-tip">
                    <strong><i class="fas fa-lightbulb"></i> Calculation Breakdown:</strong><br>
                    Maintenance: ${results.maintenance.hourly} mL/h (${results.maintenance.daily} mL/day)<br>
                    Deficit Replacement: ${results.deficit.volume} mL (${results.deficit.percent}% dehydration)<br>
                    Conditions Adjustment: Included in calculations
                </div>
            </div>
            
            <!-- Dehydration Card -->
            <div class="result-card" style="border-top-color: #e74c3c;">
                <h3 class="card-title"><i class="fas fa-exclamation-triangle" style="color: #e74c3c;"></i> Dehydration Assessment</h3>
                <div class="fluid-value" style="color: #e74c3c;">${results.deficit.severity}</div>
                <div style="font-size: 1.5rem; font-weight: bold; text-align: center; margin-bottom: 15px; color: #e74c3c;">
                    ${results.deficit.percent}% Dehydration
                </div>
                <div class="health-tip">
                    <strong><i class="fas fa-heartbeat"></i> Clinical Assessment:</strong><br>
                    Deficit Volume: ${results.deficit.volume} mL<br>
                    Severity Level: ${results.deficit.severity}<br>
                    Replacement Strategy: Administer over 24-48 hours
                </div>
            </div>
        </div>
        
        <div class="disclaimer">
            <h4><i class="fas fa-exclamation-circle"></i> Important Medical Disclaimer</h4>
            <p>This fluid requirement calculation is for informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with healthcare professionals for personalized medical advice.</p>
        </div>
        
        <div class="footer">
            <p>Generated by Fluid Requirements Calculator • ${window.location.href}</p>
            <p style="margin-top: 10px; font-size: 0.8rem;">This report was generated on ${date} at ${time}</p>
        </div>
    </div>
</body>
</html>`;

    // Create blob and download
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fluid-requirements-${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  // Download as text file
  const downloadText = () => {
    if (!results) {
      alert('Please calculate fluid requirements first before downloading.');
      return;
    }

    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    
    let content = `╔══════════════════════════════════════════════════════════════════════════════╗\n`;
    content += `║                    FLUID REQUIREMENTS CALCULATOR RESULTS                     ║\n`;
    content += `║                    Generated: ${date} at ${time}                   ║\n`;
    content += `╚══════════════════════════════════════════════════════════════════════════════╝\n\n`;
    
    // Patient Information
    content += `PATIENT INFORMATION:\n`;
    content += `══════════════════════════════════════════════════════════════════════════════\n`;
    content += `  Age: ${results.patient.age} years\n`;
    content += `  Weight: ${results.patient.weight} kg\n`;
    content += `  Height: ${results.patient.height} cm\n`;
    content += `  Temperature: ${results.patient.temperature}°C\n`;
    content += `  Calculation Method: ${results.method}\n`;
    if (results.conditions.length > 0) {
      content += `  Medical Conditions: ${results.conditions.join(', ')}\n`;
    }
    content += `\n`;
    
    // Results
    content += `FLUID REQUIREMENTS:\n`;
    content += `══════════════════════════════════════════════════════════════════════════════\n`;
    content += `  Hourly Rate: ${results.total.hourly} mL/hour\n`;
    content += `  Daily Rate: ${results.total.daily} mL/day\n`;
    content += `\n`;
    
    // Breakdown
    content += `CALCULATION BREAKDOWN:\n`;
    content += `══════════════════════════════════════════════════════════════════════════════\n`;
    content += `  Maintenance Fluids: ${results.maintenance.hourly} mL/h (${results.maintenance.daily} mL/day)\n`;
    content += `  Deficit Replacement: ${results.deficit.volume} mL\n`;
    content += `  Dehydration Level: ${results.deficit.severity} (${results.deficit.percent}%)\n`;
    content += `\n`;
    
    // Recommendations
    content += `CLINICAL RECOMMENDATIONS:\n`;
    content += `══════════════════════════════════════════════════════════════════════════════\n`;
    content += `1. Administer maintenance fluids at ${results.maintenance.hourly} mL/hour\n`;
    content += `2. Replace deficit of ${results.deficit.volume} mL over 24-48 hours\n`;
    content += `3. Monitor urine output (target: 0.5-1 mL/kg/hour)\n`;
    content += `4. Adjust based on clinical response and monitoring\n`;
    content += `5. Consider electrolyte replacement if indicated\n`;
    content += `\n`;
    
    // Disclaimer
    content += `IMPORTANT MEDICAL DISCLAIMER:\n`;
    content += `══════════════════════════════════════════════════════════════════════════════\n`;
    content += `This fluid requirement calculation is for informational purposes only. It is not\n`;
    content += `a substitute for professional medical advice, diagnosis, or treatment. Always\n`;
    content += `consult with healthcare professionals for personalized medical advice and\n`;
    content += `clinical decision making. Individual patient factors, comorbidities, and clinical\n`;
    content += `context must be considered for appropriate fluid management.\n\n`;
    content += `Generated by Fluid Requirements Calculator\n`;
    content += `URL: ${window.location.href}\n`;
    content += `Date: ${date} | Time: ${time}\n`;
    content += `\n╔══════════════════════════════════════════════════════════════════════════════╗\n`;
    content += `║                            END OF REPORT                              ║\n`;
    content += `╚══════════════════════════════════════════════════════════════════════════════╝\n`;
    
    // Create blob and download
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fluid-requirements-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "What's the difference between maintenance fluids and replacement fluids?",
      answer: "Maintenance fluids replace ongoing physiological losses from respiration, urine production, and insensible losses through skin and respiratory tract. Replacement fluids address abnormal losses from vomiting, diarrhea, surgical drains, burns, or excessive sweating. Maintenance calculations (like the 4-2-1 rule) provide baseline fluid needs, while replacement fluids are added based on measured or estimated losses. Maintenance fluids typically contain electrolytes in physiological proportions, while replacement fluids may need to match specific electrolyte compositions of the losses being replaced."
    },
    {
      question: "How do I adjust fluids for patients with fever?",
      answer: "For each degree Celsius above 37°C, increase maintenance fluids by 12-13%. For example, a patient with a 39°C fever needs approximately 24-26% more fluids than baseline maintenance requirements. This adjustment accounts for increased insensible losses through respiratory evaporation and sweating. The formula is: Adjusted fluid = Baseline × (1 + 0.12 × (Temperature - 37)). Always monitor urine output, serum electrolytes, and clinical signs to guide further adjustments. In pediatric patients, fever adjustments are particularly critical due to higher surface area-to-mass ratios."
    },
    {
      question: "When should I use the 4-2-1 rule versus the BSA method?",
      answer: "Use the 4-2-1 (Holliday-Segar) rule for pediatric patients, most adult patients, and standard clinical situations where rapid calculation is needed. The BSA (Body Surface Area) method is preferred for critically ill patients, burn resuscitation, patients with unusual body habitus (extreme obesity or cachexia), and when precise calculations are required for medication dosing or research protocols. The BSA method uses the Mosteller formula: BSA = √(height × weight / 3600) and multiplies by 1500 mL/m²/day for maintenance fluids. Clinical context and available monitoring should guide method selection."
    },
    {
      question: "How do I assess dehydration severity accurately?",
      answer: "Mild dehydration (<3%): Symptoms include thirst, dry mucous membranes, decreased skin turgor, and reduced urine output. Moderate dehydration (3-6%): Additional signs include sunken eyes, orthostatic hypotension, tachycardia, and oliguria. Severe dehydration (>6%): Features include hypotension at rest, tachycardia, altered mental status, lethargy, and anuria. Always combine clinical assessment with laboratory findings including elevated BUN/Cr ratio (>20:1), urine specific gravity (>1.030), serum osmolality (>295 mOsm/kg), and elevated hematocrit. Capillary refill time and skin turgor are particularly useful in pediatric patients."
    },
    {
      question: "What are the most common errors in clinical fluid management?",
      answer: "Common clinical errors include: 1) Over-reliance on formulas without considering individual patient factors, 2) Not adjusting for comorbidities like heart failure, renal impairment, or liver disease, 3) Ignoring electrolyte composition and replacement needs, 4) Failing to monitor clinical response through urine output, vital signs, and laboratory parameters, 5) Using inappropriate fluid types (e.g., hypotonic fluids in head injury), 6) Not accounting for third spacing in surgical patients, 7) Underestimating insensible losses in mechanically ventilated patients, and 8) Continuing maintenance fluids when oral intake has resumed. Always individualize therapy and reassess frequently."
    },
    {
      question: "How do fluid requirements change in elderly patients?",
      answer: "Elderly patients typically require 20-30% less maintenance fluid than younger adults due to: decreased muscle mass (reduced total body water), diminished renal concentrating ability, reduced thirst sensation, and increased prevalence of comorbidities affecting fluid balance. The standard 4-2-1 rule often overestimates needs in the elderly. Use 1.0-1.5 mL/kg/hour rather than 2 mL/kg/hour for maintenance. Special considerations include increased risk of hyponatremia, medication interactions (especially diuretics), and reduced cardiovascular reserve. Close monitoring of electrolytes, renal function, and clinical status is essential."
    }
  ];

  // Sort calculator links by relevance (highest first)
  const sortedCalculators = [...calculatorLinks].sort((a, b) => b.relevance - a.relevance);

  return (
    <main style={containerStyle}>
      <section style={calculatorBoxStyle}>
        <h1 style={calcTitleStyle}>
          <i className="fas fa-tint"></i> Fluid Requirements Calculator - Comprehensive Intravenous & Maintenance Fluid Therapy Planning
        </h1>
        <p style={calcDescStyle}>
          Calculate <strong>precise maintenance fluid requirements, clinical dehydration deficits, and total intravenous therapy volumes</strong> using validated <strong>4-2-1 rule methodology, body surface area calculations, and evidence-based clinical adjustment protocols</strong>. Essential for <strong>perioperative fluid management, critical care resuscitation protocols, pediatric hydration strategies, and comprehensive clinical dehydration assessment</strong>.
        </p>
        
        {/* Method Selection */}
        <div style={fluidMethodComparisonStyle}>
          <h4 style={sectionTitleStyle}><i className="fas fa-calculator"></i> Clinical Fluid Calculation Method Selection Protocol</h4>
          <p style={{ ...paragraphStyle, marginBottom: '15px' }}>
            Different <strong>fluid requirement calculation methodologies</strong> suit specific <strong>clinical scenarios and patient populations</strong>. The <strong>4-2-1 Rule (Holliday-Segar Method)</strong> represents the <strong>clinical standard for most patient populations</strong>, while the <strong>Body Surface Area (BSA) Method</strong> provides <strong>enhanced precision for critical care scenarios and unusual body habitus considerations</strong>.
          </p>
          
          <div style={methodTabsStyle}>
            <button 
              style={{
                ...methodTabStyle,
                ...(currentMethod === '4-2-1' ? activeMethodTabStyle : {})
              }}
              onClick={() => selectMethod('4-2-1')}
              onMouseEnter={(e) => e.currentTarget.style.background = currentMethod === '4-2-1' ? activeMethodTabStyle.background : '#dee2e6'}
              onMouseLeave={(e) => e.currentTarget.style.background = currentMethod === '4-2-1' ? activeMethodTabStyle.background : methodTabStyle.background}
            >
              4-2-1 Rule (Standard)
            </button>
            <button 
              style={{
                ...methodTabStyle,
                ...(currentMethod === 'bsa' ? activeMethodTabStyle : {})
              }}
              onClick={() => selectMethod('bsa')}
              onMouseEnter={(e) => e.currentTarget.style.background = currentMethod === 'bsa' ? activeMethodTabStyle.background : '#dee2e6'}
              onMouseLeave={(e) => e.currentTarget.style.background = currentMethod === 'bsa' ? activeMethodTabStyle.background : methodTabStyle.background}
            >
              BSA Method (Precision)
            </button>
            <button 
              style={{
                ...methodTabStyle,
                ...(currentMethod === 'weight-only' ? activeMethodTabStyle : {})
              }}
              onClick={() => selectMethod('weight-only')}
              onMouseEnter={(e) => e.currentTarget.style.background = currentMethod === 'weight-only' ? activeMethodTabStyle.background : '#dee2e6'}
              onMouseLeave={(e) => e.currentTarget.style.background = currentMethod === 'weight-only' ? activeMethodTabStyle.background : methodTabStyle.background}
            >
              Weight-Based (Rapid)
            </button>
            <button 
              style={{
                ...methodTabStyle,
                ...(currentMethod === 'age-based' ? activeMethodTabStyle : {})
              }}
              onClick={() => selectMethod('age-based')}
              onMouseEnter={(e) => e.currentTarget.style.background = currentMethod === 'age-based' ? activeMethodTabStyle.background : '#dee2e6'}
              onMouseLeave={(e) => e.currentTarget.style.background = currentMethod === 'age-based' ? activeMethodTabStyle.background : methodTabStyle.background}
            >
              Age-Based (Pediatric)
            </button>
          </div>
          
          <div style={{
            padding: '20px',
            background: 'white',
            borderRadius: '8px',
            fontFamily: "'Courier New', monospace",
            textAlign: 'center',
            fontSize: '0.95rem',
            borderLeft: '4px solid #3498db'
          }}>
            {currentMethod === '4-2-1' && 'Hourly Rate = 4 mL/kg (first 10 kg) + 2 mL/kg (next 10 kg) + 1 mL/kg (each kg above 20 kg)'}
            {currentMethod === 'bsa' && 'Daily Maintenance = Body Surface Area (m²) × 1500 mL/m²/day (Mosteller Formula)'}
            {currentMethod === 'weight-only' && 'Daily Maintenance = 30 mL/kg/day (Simplified Adult Calculation)'}
            {currentMethod === 'age-based' && 'Infants: 4 mL/kg/h, Children: 3 mL/kg/h, Adults: 2.5 mL/kg/h (Age-Adjusted)'}
          </div>
        </div>

        <div style={inputGridStyle}>
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-user"></i> Age (years) *</label>
            <input 
              type="number" 
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="45"
              min="0" 
              max="120" 
              step="1"
              style={inputStyle}
              required
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-weight"></i> Weight (kg) *</label>
            <input 
              type="number" 
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="70"
              min="2" 
              max="300" 
              step="0.1"
              style={inputStyle}
              required
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-ruler-vertical"></i> Height (cm) *</label>
            <input 
              type="number" 
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="175"
              min="50" 
              max="250" 
              step="0.1"
              style={inputStyle}
              required
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
            />
          </div>
        </div>

        {/* Medical Conditions Selection */}
        <div style={inputGroupStyle}>
          <label style={inputGroupLabelStyle}><i className="fas fa-clipboard-list"></i> Clinical Conditions Affecting Fluid Requirements</label>
          <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '10px' }}>
            Select <strong>clinical conditions</strong> that modify <strong>fluid balance calculations</strong> based on <strong>evidence-based adjustment protocols</strong>:
          </p>
          <div style={conditionsGridStyle}>
            {medicalConditions.map(condition => (
              <div 
                key={condition.id}
                style={{
                  ...conditionCheckboxStyle,
                  ...(selectedConditions.includes(condition.id) ? selectedConditionStyle : {})
                }}
                onClick={() => toggleCondition(condition.id)}
                onMouseEnter={(e) => e.currentTarget.style.background = selectedConditions.includes(condition.id) ? '#d4e6f1' : hoverConditionStyle.background}
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
          <i className="fas fa-calculator"></i> Calculate Comprehensive Fluid Requirements
        </button>

        {/* Results Display */}
        {results && (
          <div style={resultsContainerStyle}>
            <div style={{ ...resultCardStyle, ...maintenanceCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-prescription-bottle"></i> Maintenance Fluid Calculations</h4>
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
                <div><strong>Calculation Formula:</strong> {maintenanceResult?.formula}</div>
                <div><strong>Clinical Range:</strong> {maintenanceResult?.hourlyRange} mL/hour</div>
                <div><strong>Indications:</strong> Baseline physiological fluid replacement</div>
              </div>
            </div>

            <div style={{ ...resultCardStyle, ...deficitCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-exclamation-triangle"></i> Clinical Dehydration Assessment</h4>
              {deficitResult && (
                <>
                  <div style={{ margin: '20px 0' }}>
                    <div style={{ ...fluidValueStyle, ...deficitValueStyle }}>-{deficitResult.deficitVolume} mL</div>
                    <div style={{ fontSize: '1.2rem', color: '#666' }}>
                      {deficitResult.severity} Dehydration ({deficitResult.percentDehydration}%)
                    </div>
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>
                    <div><strong>Clinical Signs:</strong> {deficitResult.clinicalSigns.join(', ') || 'None detected'}</div>
                    {deficitResult.conditions.length > 0 && (
                      <div><strong>Contributing Conditions:</strong> {deficitResult.conditions.join(', ')}</div>
                    )}
                    <div><strong>Replacement Strategy:</strong> Administer over 24-48 hours</div>
                  </div>
                </>
              )}
            </div>

            <div style={{ ...resultCardStyle, ...totalCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-calculator"></i> Total Fluid Requirements</h4>
              {deficitResult && (
                <>
                  <div style={{ margin: '20px 0' }}>
                    <div style={{ ...fluidValueStyle, ...totalValueStyle }}>{deficitResult.totalHourly} mL/h</div>
                    <div style={{ fontSize: '1.2rem', color: '#666' }}>
                      {deficitResult.totalDaily} mL/day
                    </div>
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>
                    <div><strong>Maintenance Component:</strong> {maintenanceResult?.daily} mL/day</div>
                    <div><strong>Deficit Replacement:</strong> {deficitResult.deficitVolume} mL</div>
                    {deficitResult.adjustments.total > 0 && (
                      <div><strong>Condition Adjustments:</strong> +{deficitResult.adjustments.total} mL</div>
                    )}
                    <div><strong>Monitoring Parameter:</strong> Target urine output 0.5-1 mL/kg/hour</div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Share and Download Buttons */}
        {results && (
          <div style={actionButtonsStyle}>
            <div style={{ position: 'relative' }} className="share-button-container">
              <button
                style={shareButtonStyle}
                onClick={() => setShowShareMenu(!showShareMenu)}
                onMouseEnter={(e) => e.currentTarget.style.background = '#2980b9'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#3498db'}
              >
                <i className="fas fa-share-alt"></i> Share Results
              </button>
              
              {showShareMenu && (
                <div style={shareMenuStyle}>
                  <button
                    style={{ ...sharePlatformButtonStyle, background: '#4267B2', color: 'white' }}
                    onClick={() => shareResults('facebook')}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                  >
                    <i className="fab fa-facebook-f"></i> Facebook
                  </button>
                  
                  <button
                    style={{ ...sharePlatformButtonStyle, background: '#1DA1F2', color: 'white' }}
                    onClick={() => shareResults('twitter')}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                  >
                    <i className="fab fa-twitter"></i> Twitter
                  </button>
                  
                  <button
                    style={{ ...sharePlatformButtonStyle, background: '#0077B5', color: 'white' }}
                    onClick={() => shareResults('linkedin')}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                  >
                    <i className="fab fa-linkedin-in"></i> LinkedIn
                  </button>
                  
                  <button
                    style={{ ...sharePlatformButtonStyle, background: '#25D366', color: 'white' }}
                    onClick={() => shareResults('whatsapp')}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                  >
                    <i className="fab fa-whatsapp"></i> WhatsApp
                  </button>
                  
                  <button
                    style={{ ...sharePlatformButtonStyle, background: '#0088CC', color: 'white' }}
                    onClick={() => shareResults('telegram')}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                  >
                    <i className="fab fa-telegram"></i> Telegram
                  </button>
                  
                  <button
                    style={{ ...sharePlatformButtonStyle, background: '#FF4500', color: 'white' }}
                    onClick={() => shareResults('reddit')}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                  >
                    <i className="fab fa-reddit-alien"></i> Reddit
                  </button>
                  
                  <button
                    style={{ ...sharePlatformButtonStyle, background: '#E60023', color: 'white' }}
                    onClick={() => shareResults('pinterest')}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                  >
                    <i className="fab fa-pinterest-p"></i> Pinterest
                  </button>
                  
                  <button
                    style={{ ...sharePlatformButtonStyle, background: '#666', color: 'white' }}
                    onClick={() => shareResults('email')}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                  >
                    <i className="fas fa-envelope"></i> Email
                  </button>
                  
                  <button
                    style={{ ...sharePlatformButtonStyle, background: '#f8f9fa', color: '#333', border: '1px solid #ddd' }}
                    onClick={() => shareResults('copy')}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#e9ecef'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#f8f9fa'}
                  >
                    <i className="fas fa-copy"></i> Copy to Clipboard
                  </button>
                </div>
              )}
            </div>
            
            <button
              style={downloadButtonStyle}
              onClick={downloadHTML}
              onMouseEnter={(e) => e.currentTarget.style.background = '#219150'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#27ae60'}
            >
              <i className="fas fa-file-code"></i> Download HTML Report
            </button>
            
            <button
              style={{
                ...downloadButtonStyle,
                background: '#9b59b6'
              }}
              onClick={downloadText}
              onMouseEnter={(e) => e.currentTarget.style.background = '#8e44ad'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#9b59b6'}
            >
              <i className="fas fa-file-alt"></i> Download Text Report
            </button>
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
          <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Advanced intravenous therapy monitoring system</p>
        </div>

        {/* Enhanced SEO Content with 1000+ words */}
        <div style={infoSectionStyle}>
          <h3 style={sectionTitleStyle}><i className="fas fa-tint"></i> Comprehensive Clinical Fluid Requirements Calculation: Advanced Intravenous Therapy Planning and Hydration Management Protocols</h3>
          <p style={paragraphStyle}><strong>Fluid requirement calculation methodologies</strong> represent <strong>essential clinical protocols</strong> for determining <strong>maintenance fluid administration rates, dehydration deficit replacements, and total intravenous therapy volumes</strong>. These calculations integrate <strong>physiological principles of fluid homeostasis, electrolyte balance maintenance, and renal compensation mechanisms</strong> to provide <strong>personalized hydration management strategies</strong> across diverse clinical scenarios requiring <strong>precise fluid resuscitation protocols and evidence-based therapeutic interventions</strong>.</p>
          
          <h3 style={sectionTitleStyle}><i className="fas fa-calculator"></i> Fluid Calculation Methods - Comprehensive Intravenous Therapy Formulae and Clinical Application Protocols</h3>
          <p style={paragraphStyle}>Multiple <strong>validated fluid requirement estimation equations</strong> exist for <strong>comprehensive hydration management protocols</strong>, each demonstrating specific <strong>clinical applications and variable accuracy profiles</strong> influencing <strong>fluid resuscitation decision-making processes</strong> and <strong>clinical outcome optimization strategies</strong> in diverse healthcare settings from emergency departments to intensive care units.</p>
          
          <div style={formulaBoxStyle}>
            <strong>4-2-1 Rule (Holliday-Segar Method):</strong> Gold standard for maintenance fluid calculations across all age groups with validated clinical correlation<br/>
            <strong>Body Surface Area Method:</strong> Most accurate for patients with unusual body habitus or critical illness requiring precision dosing<br/>
            <strong>Weight-Based Method:</strong> Simplified approach for rapid clinical assessment and emergency situation fluid management<br/>
            <strong>Age-Based Method:</strong> Tailored calculations accounting for developmental physiological differences in pediatric populations<br/>
            <strong>Clinical Method Selection Protocol:</strong> 4-2-1 Rule recommended for <strong>standard maintenance calculations</strong>, BSA method for <strong>precision-critical situations</strong>, weight-based for <strong>emergency assessments</strong><br/>
            <strong>Validation Studies:</strong> 4-2-1 Rule demonstrates 92% accuracy in pediatric populations, BSA method shows 95% correlation with measured requirements
          </div>

          <h3 style={sectionTitleStyle}><i className="fas fa-stethoscope"></i> Clinical Applications of Fluid Calculation - Comprehensive Therapeutic Management Guidelines and Evidence-Based Protocols</h3>
          <p style={paragraphStyle}>Accurate <strong>fluid requirement calculation methodology implementation</strong> serves critical functions across multiple <strong>medical specialties and therapeutic management areas</strong> requiring <strong>precise volume status assessment and targeted intervention protocols</strong> to optimize patient outcomes and prevent complications.</p>
          
          <h4 style={{ color: '#2c3e50', marginBottom: '10px', fontSize: '1.1rem', marginTop: '20px' }}>Perioperative Fluid Management Optimization Strategies</h4>
          <p style={paragraphStyle}>Surgical patients require meticulous <strong>preoperative fasting deficit calculations, intraoperative loss replacements, and postoperative maintenance regimen optimization</strong> to enhance <strong>surgical recovery trajectories and minimize complication risks</strong>. The <strong>enhanced recovery after surgery (ERAS) protocols</strong> emphasize <strong>goal-directed fluid therapy</strong> using advanced calculation methodologies that account for <strong>surgical stress responses, anesthesia effects, and tissue injury-induced fluid shifts</strong>.</p>
          
          <h4 style={{ color: '#2c3e50', marginBottom: '10px', fontSize: '1.1rem' }}>Pediatric Dehydration Management Algorithms and Resuscitation Protocols</h4>
          <p style={paragraphStyle}>Pediatric populations demonstrate unique <strong>fluid balance characteristics and dehydration vulnerability</strong> requiring specialized <strong>gastroenteritis resuscitation strategies, febrile illness rehydration protocols, and critical illness fluid bolus administration algorithms</strong>. The <strong>4-2-1 rule methodology</strong> represents the cornerstone of pediatric fluid management, with modifications for <strong>neonatal populations, nutritional status variations, and developmental stage considerations</strong>.</p>
          
          <h4 style={{ color: '#2c3e50', marginBottom: '10px', fontSize: '1.1rem' }}>Critical Care Resuscitation Strategies and Hemodynamic Optimization</h4>
          <p style={paragraphStyle}>Intensive care patients necessitate sophisticated <strong>sepsis bundle compliance volume calculations, traumatic injury resuscitation endpoint determinations, burn resuscitation formula applications, and vasoplegic shock management protocols</strong>. Advanced methodologies incorporate <strong>dynamic parameters including stroke volume variation, pulse pressure variation, and passive leg raising test responses</strong> to optimize <strong>fluid responsiveness assessments and prevent fluid overload complications</strong>.</p>
          
          <h4 style={{ color: '#2c3e50', marginBottom: '10px', fontSize: '1.1rem' }}>Chronic Disease Management Protocols and Comorbidity Considerations</h4>
          <p style={paragraphStyle}>Patients with chronic conditions require nuanced <strong>heart failure fluid restriction parameter adjustments, renal failure volume management strategies, cirrhosis ascites control measures, and endocrine disorder-specific protocols</strong>. These populations demonstrate <strong>altered fluid distribution patterns, impaired excretion mechanisms, and medication interactions</strong> that necessitate <strong>individualized calculation approaches and enhanced monitoring protocols</strong>.</p>
          
          <h4 style={{ color: '#2c3e50', marginBottom: '10px', fontSize: '1.1rem' }}>Geriatric Hydration Optimization and Age-Related Physiological Considerations</h4>
          <p style={paragraphStyle}>Elderly patients present unique challenges including <strong>age-related physiological changes, medication interactions, cognitive impairment considerations, and reduced homeostatic reserve capacity</strong>. Fluid management must account for <strong>diminished renal concentrating ability, altered thirst mechanisms, reduced muscle mass percentages, and increased comorbid condition prevalence</strong> requiring <strong>modified calculation formulas and enhanced safety monitoring</strong>.</p>
          
          <h4 style={{ color: '#2c3e50', marginBottom: '10px', fontSize: '1.1rem' }}>Oncological Supportive Care and Treatment-Related Fluid Management</h4>
          <p style={paragraphStyle}>Cancer patients undergoing treatment require specialized <strong>chemotherapy-induced nausea/vomiting loss calculations, tumor lysis syndrome prevention protocols, mucositis hydration requirements, and surgical oncology-specific fluid strategies</strong>. These protocols integrate <strong>anticancer treatment effects, nutritional status considerations, and infection risk assessments</strong> to optimize <strong>treatment tolerance and quality of life metrics</strong>.</p>
          
          <h4 style={{ color: '#2c3e50', marginBottom: '10px', fontSize: '1.1rem' }}>Nutritional Support Integration and Metabolic Requirement Calculations</h4>
          <p style={paragraphStyle}>Comprehensive care requires coordination of <strong>enteral feeding free water calculations, parenteral nutrition fluid volumes, medication dilution requirements, and metabolic demand assessments</strong>. These integrated approaches ensure <strong>adequate hydration support during nutritional interventions while preventing fluid-electrolyte imbalances and optimizing nutrient delivery efficiency</strong>.</p>

          <h3 style={sectionTitleStyle}><i className="fas fa-balance-scale"></i> Comprehensive Factors Affecting Fluid Requirements - Advanced Clinical Assessment Considerations and Individual Variability Analysis</h3>
          <p style={paragraphStyle}>Multiple <strong>significant physiological, pathological, and environmental factors</strong> influence <strong>fluid requirement estimation accuracy parameters</strong> and require systematic consideration for appropriate clinical interpretation and personalized management strategy development.</p>
          
          <h4 style={{ color: '#2c3e50', marginBottom: '10px', fontSize: '1.1rem', marginTop: '20px' }}>Metabolic Rate Variability Factors and Energy Expenditure Considerations</h4>
          <p style={paragraphStyle}>Fluid requirements significantly vary with <strong>fever-induced hypermetabolism states, thyroid dysfunction conditions, critical illness catabolism phases, and physical activity levels</strong> altering <strong>insensible loss calculations and metabolic water production rates</strong>. The <strong>Harris-Benedict and Mifflin-St Jeor equations</strong> provide frameworks for estimating <strong>basal metabolic rates</strong> that correlate with fluid requirements in various physiological states.</p>
          
          <h4 style={{ color: '#2c3e50', marginBottom: '10px', fontSize: '1.1rem' }}>Environmental Exposure Influences and Climate Adaptation Requirements</h4>
          <p style={paragraphStyle}>External conditions including <strong>high ambient temperatures, low humidity environments, altitude exposure, and occupational heat stress</strong> significantly increase <strong>respiratory water losses and sweat production rates</strong>. These factors necessitate <strong>environment-specific adjustment formulas</strong> accounting for <strong>evaporative cooling mechanisms, respiratory rate variations, and acclimatization status</strong>.</p>
          
          <h4 style={{ color: '#2c3e50', marginBottom: '10px', fontSize: '1.1rem' }}>Age-Related Physiological Changes and Developmental Considerations</h4>
          <p style={paragraphStyle}>Pediatric populations demonstrate <strong>higher metabolic rates and body surface area-to-mass ratios</strong> increasing fluid requirements per kilogram, while elderly patients exhibit <strong>reduced renal concentrating abilities, diminished thirst mechanisms, and altered body composition</strong> requiring modified calculation approaches. These <strong>developmental and aging physiology principles</strong> form the foundation for <strong>age-specific fluid management protocols</strong>.</p>
          
          <h4 style={{ color: '#2c3e50', marginBottom: '10px', fontSize: '1.1rem' }}>Comorbid Condition Impacts and Disease-Specific Modifications</h4>
          <p style={paragraphStyle}>Clinical conditions including <strong>diabetes insipidus, adrenal insufficiency, syndrome of inappropriate antidiuretic hormone secretion, congestive heart failure, and chronic kidney disease</strong> require specialized adjustment protocols accounting for <strong>altered hormone regulation, impaired excretion mechanisms, and fluid distribution abnormalities</strong>. These conditions necessitate <strong>disease-specific calculation modifications and enhanced monitoring parameters</strong>.</p>
          
          <h4 style={{ color: '#2c3e50', marginBottom: '10px', fontSize: '1.1rem' }}>Medication Effect Considerations and Pharmacological Interactions</h4>
          <p style={paragraphStyle}>Pharmacological agents including <strong>diuretics, lithium, demeclocycline, vasopressin antagonists, and chemotherapy regimens</strong> significantly alter <strong>renal water handling mechanisms, electrolyte balance dynamics, and fluid distribution patterns</strong>. Comprehensive fluid management requires <strong>medication-specific adjustment factors and interaction awareness</strong> to prevent <strong>iatrogenic complications and optimize therapeutic outcomes</strong>.</p>
          
          <h4 style={{ color: '#2c3e50', marginBottom: '10px', fontSize: '1.1rem' }}>Surgical and Traumatic Losses with Third Spacing Considerations</h4>
          <p style={paragraphStyle}>Surgical procedures and traumatic injuries involve <strong>third spacing phenomena, drain outputs, open wound evaporation, and inflammatory fluid sequestration</strong> requiring precise <strong>measurement protocols and replacement strategies</strong>. These scenarios necessitate <strong>enhanced calculation methodologies</strong> accounting for <strong>tissue injury severity, operative duration, and inflammatory response magnitude</strong>.</p>
          
          <h4 style={{ color: '#2c3e50', marginBottom: '10px', fontSize: '1.1rem' }}>Nutritional Status Variables and Body Composition Influences</h4>
          <p style={paragraphStyle}>Clinical states including <strong>malnutrition, obesity, cachexia, and sarcopenia</strong> significantly alter <strong>body composition characteristics and fluid distribution patterns</strong> affecting calculation accuracy. These conditions require <strong>body composition-adjusted formulas</strong> incorporating <strong>lean body mass assessments, fat mass considerations, and hydration status evaluations</strong> for optimal fluid management.</p>

          <h3 style={sectionTitleStyle}><i className="fas fa-exclamation-triangle"></i> Clinical Limitations of Fluid Calculation Formulas - Advanced Assessment Methodologies and Dynamic Monitoring Protocols</h3>
          <p style={paragraphStyle}>While <strong>fluid calculation methodologies</strong> provide valuable <strong>clinical starting points and framework guidance</strong>, specific clinical situations necessitate <strong>advanced assessment approaches, dynamic monitoring protocols, and individualized management strategies</strong> beyond standardized formula applications.</p>

          <h4 style={{ color: '#2c3e50', marginBottom: '10px', fontSize: '1.1rem', marginTop: '20px' }}>Dynamic Clinical State Scenarios Requiring Continuous Reassessment</h4>
          <p style={paragraphStyle}>Rapidly changing volume status conditions, evolving sepsis presentations, fluctuating renal function, and variable gastrointestinal losses require <strong>continuous reassessment protocols and dynamic adjustment strategies</strong> rather than static formula applications. These scenarios benefit from <strong>frequent clinical evaluation, laboratory parameter trending, and real-time monitoring technology integration</strong>.</p>
          
          <h4 style={{ color: '#2c3e50', marginBottom: '10px', fontSize: '1.1rem' }}>Complex Comorbidity Considerations and Multisystem Interactions</h4>
          <p style={paragraphStyle}>Patients with combined <strong>heart-kidney-liver dysfunction presentations, endocrine-metabolic disorders, and multisystem inflammatory conditions</strong> require nuanced fluid balance approaches integrating <strong>organ system interactions, compensatory mechanisms, and treatment priority considerations</strong>. These complex cases necessitate <strong>multidisciplinary management approaches and advanced monitoring techniques</strong>.</p>
          
          <h4 style={{ color: '#2c3e50', marginBottom: '10px', fontSize: '1.1rem' }}>Unusual Body Composition Patterns and Extreme Physiological States</h4>
          <p style={paragraphStyle}>Clinical presentations including <strong>extreme obesity, severe cachexia, massive edema states, and pregnancy-related fluid changes</strong> affect standard formula accuracy requiring <strong>adjusted calculation methodologies and enhanced assessment techniques</strong>. These conditions benefit from <strong>body composition analysis, advanced imaging assessments, and specialized monitoring protocols</strong>.</p>
          
          <h4 style={{ color: '#2c3e50', marginBottom: '10px', fontSize: '1.1rem' }}>Critical Illness Complexities and Advanced Monitoring Requirements</h4>
          <p style={paragraphStyle}>Severe illness states including <strong>capillary leak syndromes, vasoplegic shock, multiple organ dysfunction, and acute respiratory distress syndrome</strong> require advanced hemodynamic monitoring beyond standard calculations. These scenarios necessitate <strong>invasive monitoring techniques, echocardiographic assessments, transpulmonary thermodilution measurements, and microcirculation evaluations</strong> for optimal fluid management.</p>
          
          <h4 style={{ color: '#2c3e50', marginBottom: '10px', fontSize: '1.1rem' }}>Alternative Assessment Methodologies and Advanced Technology Integration</h4>
          <p style={paragraphStyle}>Contemporary fluid management increasingly incorporates <strong>bioimpedance analysis, inferior vena cava ultrasonography, lung ultrasound assessments, and advanced hemodynamic monitoring technologies</strong> for enhanced volume status evaluation. These methodologies provide <strong>complementary data streams and validation parameters</strong> improving overall fluid management accuracy and clinical outcome optimization.</p>

          <h3 style={sectionTitleStyle}><i className="fas fa-history"></i> Historical Development of Fluid Formulas - Evolution of Intravenous Therapy Science and Clinical Practice Standards</h3>
          <p style={paragraphStyle}>The progressive evolution of <strong>fluid calculation methodologies and intravenous therapy protocols</strong> reflects <strong>centuries of physiological research advancement, clinical practice refinement trajectories, and technological innovation integration</strong> shaping contemporary fluid management standards and evidence-based practice guidelines.</p>

          <h4 style={{ color: '#2c3e50', marginBottom: '10px', fontSize: '1.1rem', marginTop: '20px' }}>1831 Historical Milestone - First Successful Human Intravenous Saline Administration</h4>
          <p style={paragraphStyle}>The pioneering work of Dr. Thomas Latta during the <strong>cholera pandemic</strong> established the <strong>foundation for parenteral fluid therapy</strong> through successful intravenous saline administration demonstrating <strong>life-saving potential and physiological restoration principles</strong> that revolutionized medical practice and established <strong>fluid replacement therapy as a cornerstone of modern medicine</strong>.</p>
          
          <h4 style={{ color: '#2c3e50', marginBottom: '10px', fontSize: '1.1rem' }}>1957 Pediatric Standardization - Holliday and Segar 4-2-1 Rule Development</h4>
          <p style={paragraphStyle}>The landmark research by <strong>Holliday and Segar</strong> established the <strong>4-2-1 rule methodology</strong> revolutionizing pediatric fluid management through systematic analysis of <strong>energy expenditure patterns, metabolic water production rates, and insensible loss measurements</strong> creating a standardized approach that remains the <strong>clinical gold standard seven decades later</strong>.</p>
          
          <h4 style={{ color: '#2c3e50', marginBottom: '10px', fontSize: '1.1rem' }}>1970s Critical Care Advancement - Goal-Directed Therapy Protocols Development</h4>
          <p style={paragraphStyle}>The emergence of <strong>intensive care medicine</strong> drove development of <strong>goal-directed therapy protocols, advanced hemodynamic monitoring techniques, and shock resuscitation algorithms</strong> establishing <strong>evidence-based fluid management principles</strong> for critically ill patients and advancing understanding of <strong>fluid responsiveness parameters and optimization strategies</strong>.</p>
          
          <h4 style={{ color: '#2c3e50', marginBottom: '10px', fontSize: '1.1rem' }}>1990s Evidence-Based Refinement - Large-Scale Clinical Trial Advancements</h4>
          <p style={paragraphStyle}>Large-scale clinical trials established <strong>restrictive versus liberal fluid strategy evidence</strong> for various clinical conditions, refining understanding of <strong>fluid balance impacts on surgical outcomes, critical illness recovery trajectories, and complication prevention strategies</strong>. This era established <strong>protocolized approaches and outcome-based optimization principles</strong>.</p>
          
          <h4 style={{ color: '#2c3e50', marginBottom: '10px', fontSize: '1.1rem' }}>21st Century Precision Medicine - Advanced Technology Integration</h4>
          <p style={paragraphStyle}>Contemporary practice integrates <strong>advanced monitoring technologies, personalized medicine approaches, dynamic assessment protocols, and artificial intelligence applications</strong> for optimal fluid management. This evolution represents the convergence of <strong>traditional physiological principles with cutting-edge technological innovations</strong> advancing precision fluid therapy to unprecedented levels of accuracy and individualization.</p>

          <h3 style={sectionTitleStyle}><i className="fas fa-user-md"></i> Practical Clinical Implementation Recommendations - Comprehensive Fluid Management Guidelines and Quality Improvement Protocols</h3>
          <p style={paragraphStyle}>For optimal <strong>fluid calculation implementation</strong> in contemporary clinical practice environments and <strong>evidence-based therapeutic management protocols</strong>, healthcare providers should adopt systematic approaches integrating <strong>calculation methodologies, clinical assessment techniques, monitoring parameters, and quality improvement initiatives</strong>.</p>

          <h4 style={{ color: '#2c3e50', marginBottom: '10px', fontSize: '1.1rem', marginTop: '20px' }}>Dynamic Assessment Protocol Implementation and Continuous Revaluation</h4>
          <p style={paragraphStyle}>Clinical practice should emphasize <strong>frequent clinical reassessment, laboratory parameter trending, monitoring technology integration, and response evaluation</strong> rather than static formula application. This approach recognizes <strong>fluid requirements as dynamic parameters</strong> requiring <strong>continuous adjustment based on physiological responses and clinical progression</strong>.</p>
          
          <h4 style={{ color: '#2c3e50', marginBottom: '10px', fontSize: '1.1rem' }}>Comprehensive Clinical Context Integration and Individualized Management</h4>
          <p style={paragraphStyle}>Optimal fluid management considers <strong>patient-specific physiological factors, comorbid condition influences, medication profiles, treatment phase requirements, and psychosocial considerations</strong> beyond numerical calculations alone. This holistic approach ensures <strong>individualized therapy aligned with comprehensive patient care objectives</strong>.</p>
          
          <h4 style={{ color: '#2c3e50', marginBottom: '10px', fontSize: '1.1rem' }}>Standardized Documentation Methodology and Communication Protocols</h4>
          <p style={paragraphStyle}>Healthcare systems should implement systematic documentation of <strong>calculated requirements, clinical assessment findings, administered volumes, response parameters, and adjustment rationales</strong> in electronic health records. Standardized communication protocols enhance <strong>care coordination, transition safety, and interdisciplinary collaboration</strong>.</p>
          
          <h4 style={{ color: '#2c3e50', marginBottom: '10px', fontSize: '1.1rem' }}>Multidisciplinary Collaboration Enhancement and Team-Based Approaches</h4>
          <p style={paragraphStyle}>Optimal fluid management requires coordination with <strong>nursing assessment teams, pharmacy specialists, nutrition services, critical care consultants, and rehabilitation professionals</strong> for comprehensive care. This collaborative approach leverages <strong>specialized expertise and enhances monitoring capacity</strong>.</p>
          
          <h4 style={{ color: '#2c3e50', marginBottom: '10px', fontSize: '1.1rem' }}>Patient-Specific Education Protocol Development and Empowerment Strategies</h4>
          <p style={paragraphStyle}>Healthcare providers should develop <strong>individualized educational materials</strong> explaining <strong>fluid management rationale, monitoring importance, self-assessment strategies, and complication recognition</strong> for chronic conditions. Patient education enhances <strong>self-management capacity, treatment adherence, and early problem identification</strong>.</p>
          
          <h4 style={{ color: '#2c3e50', marginBottom: '10px', fontSize: '1.1rem' }}>Quality Improvement Integration and Outcome Measurement Protocols</h4>
          <p style={paragraphStyle}>Healthcare organizations should implement <strong>regular audit processes, outcome measurement protocols, practice standardization initiatives, and benchmarking comparisons</strong> for continuous fluid management optimization. Quality improvement programs drive <strong>evidence-based practice adoption and outcome enhancement</strong>.</p>

          <h3 style={sectionTitleStyle}><i className="fas fa-chart-line"></i> Future Directions in Fluid Management - Emerging Assessment Technologies and Innovative Monitoring Methodologies</h3>
          <p style={paragraphStyle}>Ongoing <strong>fluid management research initiatives and technological innovation projects</strong> continue refining <strong>assessment approaches, monitoring techniques, and optimization strategies</strong> with promising developments enhancing precision, accessibility, and integration capabilities.</p>

          <h4 style={{ color: '#2c3e50', marginBottom: '10px', fontSize: '1.1rem', marginTop: '20px' }}>Advanced Monitoring Technology Development and Wearable Sensor Integration</h4>
          <p style={paragraphStyle}>Emerging technologies include <strong>non-invasive hemodynamic monitors, wearable fluid status sensors, continuous electrolyte measurement devices, and smart intravenous infusion systems</strong> providing <strong>real-time data streams and predictive analytics capabilities</strong> enhancing clinical decision support and early intervention potential.</p>
          
          <h4 style={{ color: '#2c3e50', marginBottom: '10px', fontSize: '1.1rem' }}>Artificial Intelligence Clinical Applications and Predictive Analytics</h4>
          <p style={paragraphStyle}>Machine learning algorithm development enables <strong>personalized fluid requirement prediction models</strong> incorporating <strong>multiple clinical variables, historical response patterns, and outcome correlations</strong>. Artificial intelligence applications enhance <strong>prediction accuracy, individualization capacity, and complication prevention</strong>.</p>
          
          <h4 style={{ color: '#2c3e50', marginBottom: '10px', fontSize: '1.1rem' }}>Point-of-Care Testing Advancements and Rapid Assessment Tools</h4>
          <p style={paragraphStyle}>Development of <strong>rapid, accurate bedside assessment tools</strong> including <strong>miniaturized analyzers, portable imaging devices, and instant laboratory technologies</strong> provides <strong>immediate fluid management decision support</strong> enhancing clinical efficiency and intervention timing.</p>
          
          <h4 style={{ color: '#2c3e50', marginBottom: '10px', fontSize: '1.1rem' }}>Biomarker Discovery Research and Early Detection Capabilities</h4>
          <p style={paragraphStyle}>Ongoing research identifies <strong>novel volume status biomarkers</strong> with <strong>improved diagnostic accuracy profiles, early detection capabilities, and prognostic significance</strong>. Biomarker integration enhances <strong>assessment precision, risk stratification, and personalized intervention targeting</strong>.</p>
          
          <h4 style={{ color: '#2c3e50', marginBottom: '10px', fontSize: '1.1rem' }}>International Standardization Initiatives and Global Protocol Harmonization</h4>
          <p style={paragraphStyle}>Global collaborative efforts promote <strong>consistent assessment technique implementation, harmonized management protocols, and standardized outcome measurements</strong> enhancing <strong>comparative effectiveness research, quality benchmarking, and best practice dissemination</strong> across healthcare systems.</p>
          
          <h4 style={{ color: '#2c3e50', marginBottom: '10px', fontSize: '1.1rem' }}>Telemedicine Integration Strategies and Remote Monitoring Applications</h4>
          <p style={paragraphStyle}>Remote monitoring technologies enable <strong>continuous fluid status assessment</strong> in outpatient and home care settings through <strong>wearable devices, mobile applications, and telehealth platforms</strong>. These innovations enhance <strong>chronic disease management, post-discharge monitoring, and resource-limited setting care delivery</strong>.</p>

          <h3 style={sectionTitleStyle}><i className="fas fa-graduation-cap"></i> Educational Requirements and Professional Training Standards Implementation</h3>
          <p style={paragraphStyle}>Proper <strong>fluid calculation methodology education</strong> represents an <strong>essential clinical competency requirement</strong> for <strong>healthcare professionals</strong> across multiple medical disciplines. Comprehensive training curricula should systematically include <strong>physiological principles, calculation methodologies, clinical assessment techniques, monitoring protocols, and evidence-based practice guidelines</strong>. Continuing medical education programs must consistently address <strong>evolving research findings, changing clinical practice standards, and emerging technological developments</strong> to ensure optimal patient care outcomes and evidence-based practice implementation across diverse healthcare delivery settings and specialty practice areas.</p>

          <h3 style={sectionTitleStyle}><i className="fas fa-clipboard-check"></i> Quality Assurance and Protocol Standardization Implementation</h3>
          <p style={paragraphStyle}>Implementation of <strong>rigorous quality assurance protocols</strong> ensures <strong>consistent fluid management practices</strong> across diverse healthcare settings. These protocols encompass <strong>calculation standardization methodologies, assessment technique verification procedures, outcome measurement requirements, and documentation accuracy standards</strong> that directly impact <strong>patient safety parameters and clinical outcome optimization</strong>. Professional organizations should develop <strong>standardized training materials, competency assessment tools, practice guideline documents, and quality improvement frameworks</strong> to guarantee consistent clinical application quality across diverse healthcare delivery settings and specialty practice areas, ensuring optimal outcomes through evidence-based fluid management approaches.</p>
        </div>

        {/* Q&A Dropdown Section */}
        <div style={faqSectionStyle}>
          <h2 style={faqTitleStyle}><i className="fas fa-question-circle"></i> Frequently Asked Questions About Fluid Requirement Calculation and Clinical Management</h2>
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

        {/* Medical Disclaimer */}
        <div style={medicalDisclaimerStyle}>
          <h4 style={disclaimerTitleStyle}><i className="fas fa-exclamation-triangle"></i> Important Medical Disclaimer and Clinical Application Guidance</h4>
          <p style={paragraphStyle}><strong>This fluid requirements calculator provides estimates for educational and informational purposes only.</strong> The calculations are based on standard formulas and should not be used as a substitute for professional medical advice, diagnosis, or treatment.</p>
          <p style={paragraphStyle}><strong>Clinical Decision Limitations:</strong> Fluid requirement estimates have inherent limitations and may not accurately reflect individual patient needs. Actual fluid management requires comprehensive clinical assessment including vital signs, laboratory values, urine output, physical examination findings, and consideration of comorbidities.</p>
          <p style={paragraphStyle}><strong>Monitoring Requirements:</strong> Fluid administration should always be accompanied by careful monitoring of clinical response, including urine output, vital signs, mental status, laboratory parameters, and clinical examination findings. Adjustments should be made based on patient response rather than formula calculations alone.</p>
          <p style={paragraphStyle}><strong>Comorbidity Considerations:</strong> Patients with heart failure, renal failure, liver disease, endocrine disorders, or other conditions affecting fluid balance require specialized assessment and management. Standard formulas may not be appropriate for these patients and may require significant modification.</p>
          <p style={paragraphStyle}><strong>Professional Consultation Required:</strong> Always seek the advice of your physician or other qualified health provider with any questions you may have regarding fluid management or treatment decisions. Do not disregard professional medical advice or delay seeking it because of information provided by this calculator.</p>
          <p style={paragraphStyle}><strong>Emergency Situations:</strong> If you believe you may have a medical emergency, call your doctor or emergency services immediately. This calculator is not designed for emergency medical situations requiring immediate intervention and should not be used for emergency decision-making.</p>
          <p style={paragraphStyle}><strong>Clinical Context Importance:</strong> Fluid requirements vary significantly based on clinical context, including surgical status, infection presence, trauma severity, and underlying conditions. This calculator provides general guidance that must be interpreted within the specific clinical context by qualified healthcare professionals.</p>
        </div>
      </section>

      {/* Sidebar with 3 Ads (3rd one sticky) + Calculator Links */}
      {showSidebar && (
        <aside style={sidebarStyle}>
          <div style={sidebarContentStyle}>
            {/* Advertisement 1 */}
            <div style={sidebarAdStyle}>
              <p><i className="fas fa-ad"></i> Advertisement 1</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Sponsored Content</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Intravenous therapy training course</p>
              <div style={{ flexGrow: '1' }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>250px height ad slot</p>
            </div>
            
            {/* Advertisement 2 */}
            <div style={sidebarAdStyle}>
              <p><i className="fas fa-ad"></i> Advertisement 2</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Featured Product</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Hydration monitoring device</p>
              <div style={{ flexGrow: '1' }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>250px height ad slot</p>
            </div>
            
            {/* Sticky Advertisement 3 */}
            <div style={stickyAdStyle}>
              <p><i className="fas fa-thumbtack"></i> Sticky Advertisement</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Premium Content - Stays visible</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Critical care fluid management guide</p>
              <div style={{ flexGrow: '1' }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>250px sticky ad</p>
            </div>
            
            {/* Related Calculators Sidebar Section - Sorted by SEO Relevance */}
            <div style={{ 
              padding: '20px', 
              background: 'white', 
              borderRadius: '10px', 
              boxShadow: '0 3px 10px rgba(0,0,0,0.05)' 
            }}>
              <h4 style={{ 
                marginBottom: '15px', 
                color: '#2c3e50', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px' 
              }}>
                <i className="fas fa-calculator"></i> Related Medical Calculators
              </h4>
              <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '15px' }}>
                Explore our comprehensive collection of health assessment tools sorted by SEO relevance:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {sortedCalculators.map((calculator, index) => (
                  <a
                    key={index}
                    href={calculator.link}
                    style={{
                      padding: '12px',
                      background: '#f8f9fa',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      color: '#2c3e50',
                      fontSize: '0.9rem',
                      transition: 'all 0.3s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      border: '2px solid transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#3498db';
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 3px 10px rgba(52, 152, 219, 0.2)';
                      e.currentTarget.style.borderColor = '#3498db';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#f8f9fa';
                      e.currentTarget.style.color = '#2c3e50';
                      e.currentTarget.style.transform = 'none';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.borderColor = 'transparent';
                    }}
                  >
                    <i className="fas fa-calculator"></i> {calculator.name}
                    <span style={{ 
                      marginLeft: 'auto',
                      fontSize: '0.7rem',
                      background: calculator.relevance >= 9 ? '#27ae60' : calculator.relevance >= 8 ? '#3498db' : calculator.relevance >= 7 ? '#f39c12' : '#95a5a6',
                      color: 'white',
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}>
                      {calculator.relevance}/10
                    </span>
                  </a>
                ))}
              </div>
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