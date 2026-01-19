"use client";

import { useState, useEffect } from 'react';

export default function PregnancyWeightGainPage() {
  const [prePregnancyWeight, setPrePregnancyWeight] = useState('');
  const [height, setHeight] = useState('');
  const [weeksPregnant, setWeeksPregnant] = useState('');
  const [currentWeight, setCurrentWeight] = useState('');
  const [age, setAge] = useState('');
  const [parity, setParity] = useState('0');
  const [multiplePregnancy, setMultiplePregnancy] = useState('single');
  const [bmiCategory, setBmiCategory] = useState('normal');
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

  const weightGainCardStyle = {
    borderTopColor: '#9b59b6'
  };

  const recommendationsCardStyle = {
    borderTopColor: '#3498db'
  };

  const weeklyCardStyle = {
    borderTopColor: '#2ecc71'
  };

  const resultValueStyle = {
    fontSize: '2.5rem',
    fontWeight: '800',
    color: '#9b59b6',
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
    borderRadius: '10px', // ← Fixed
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

  // BMI categories with weight gain recommendations (IOM 2009 guidelines)
  const bmiCategories = [
    { id: 'underweight', name: 'Underweight', bmiRange: '<18.5', totalGain: '12.5-18 kg', weeklyGain: '0.51 kg/week' },
    { id: 'normal', name: 'Normal Weight', bmiRange: '18.5-24.9', totalGain: '11.5-16 kg', weeklyGain: '0.42 kg/week' },
    { id: 'overweight', name: 'Overweight', bmiRange: '25.0-29.9', totalGain: '7-11.5 kg', weeklyGain: '0.28 kg/week' },
    { id: 'obese', name: 'Obese', bmiRange: '≥30.0', totalGain: '5-9 kg', weeklyGain: '0.22 kg/week' }
  ];

  // Multiple pregnancy guidelines
  const multiplePregnancyOptions = [
    { id: 'single', name: 'Single', totalGain: 'Standard BMI-based' },
    { id: 'twins', name: 'Twins', totalGain: '17-25 kg for normal BMI' },
    { id: 'triplets', name: 'Triplets+', totalGain: 'Individualized recommendations' }
  ];

  // Sample data for demo
  useEffect(() => {
    setPrePregnancyWeight('65');
    setHeight('165');
    setWeeksPregnant('20');
    setCurrentWeight('70');
    setAge('30');
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

  const calculatePregnancyWeightGain = () => {
    // Validate inputs
    if (!prePregnancyWeight || !height || !weeksPregnant) {
      alert('Please fill in pre-pregnancy weight, height, and weeks pregnant.');
      return;
    }

    const preWeightVal = parseFloat(prePregnancyWeight);
    const heightVal = parseFloat(height);
    const weeksVal = parseFloat(weeksPregnant);
    const currentWeightVal = parseFloat(currentWeight) || preWeightVal;
    const ageVal = parseFloat(age) || 30;
    const parityVal = parseInt(parity) || 0;

    if (preWeightVal <= 0 || heightVal <= 0 || weeksVal <= 0) {
      alert('Please enter valid positive numbers.');
      return;
    }

    // Calculate pre-pregnancy BMI
    const heightInMeters = heightVal / 100;
    const prePregnancyBMI = preWeightVal / (heightInMeters * heightInMeters);

    // Determine BMI category
    let calculatedBmiCategory = 'normal';
    if (prePregnancyBMI < 18.5) calculatedBmiCategory = 'underweight';
    else if (prePregnancyBMI < 25) calculatedBmiCategory = 'normal';
    else if (prePregnancyBMI < 30) calculatedBmiCategory = 'overweight';
    else calculatedBmiCategory = 'obese';

    // Use selected category or calculated one
    const finalBmiCategory = bmiCategory !== 'normal' ? bmiCategory : calculatedBmiCategory;
    const bmiData = bmiCategories.find(cat => cat.id === finalBmiCategory);

    // Calculate weight gain so far
    const currentGain = currentWeightVal - preWeightVal;

    // Calculate expected total gain based on BMI category
    let expectedTotalGainMin = 11.5;
    let expectedTotalGainMax = 16;
    let weeklyRate = 0.42;

    switch(finalBmiCategory) {
      case 'underweight':
        expectedTotalGainMin = 12.5;
        expectedTotalGainMax = 18;
        weeklyRate = 0.51;
        break;
      case 'overweight':
        expectedTotalGainMin = 7;
        expectedTotalGainMax = 11.5;
        weeklyRate = 0.28;
        break;
      case 'obese':
        expectedTotalGainMin = 5;
        expectedTotalGainMax = 9;
        weeklyRate = 0.22;
        break;
    }

    // Adjust for multiple pregnancy
    if (multiplePregnancy === 'twins') {
      expectedTotalGainMin = 17;
      expectedTotalGainMax = 25;
      weeklyRate = 0.68;
    } else if (multiplePregnancy === 'triplets') {
      expectedTotalGainMin = 20;
      expectedTotalGainMax = 30;
      weeklyRate = 0.80;
    }

    // Calculate expected gain at current week
    const weeksRemaining = 40 - weeksVal;
    const expectedGainAtCurrentWeek = weeklyRate * weeksVal;
    const expectedTotalGainAtTerm = weeklyRate * 40;

    // Determine if current gain is appropriate
    let gainStatus = 'Appropriate';
    let gainAssessment = '';
    let recommendations = [];

    if (currentGain < expectedGainAtCurrentWeek * 0.7) {
      gainStatus = 'Below Recommended';
      gainAssessment = 'Weight gain may be insufficient for optimal fetal growth';
      recommendations.push('Consult with healthcare provider about nutrition');
      recommendations.push('Consider meeting with a registered dietitian');
      recommendations.push('Ensure adequate calorie and nutrient intake');
    } else if (currentGain > expectedGainAtCurrentWeek * 1.3) {
      gainStatus = 'Above Recommended';
      gainAssessment = 'Weight gain may be excessive, increasing pregnancy risks';
      recommendations.push('Focus on nutrient-dense, lower-calorie foods');
      recommendations.push('Continue moderate physical activity if approved by provider');
      recommendations.push('Monitor for signs of gestational diabetes');
    } else {
      gainStatus = 'Within Recommended Range';
      gainAssessment = 'Weight gain appears appropriate for your stage of pregnancy';
      recommendations.push('Continue balanced nutrition and regular prenatal care');
      recommendations.push('Maintain moderate physical activity as tolerated');
      recommendations.push('Attend all scheduled prenatal appointments');
    }

    // Calculate weekly rate needed to reach target
    const remainingGainNeeded = expectedTotalGainAtTerm - currentGain;
    const weeklyRateNeeded = weeksRemaining > 0 ? remainingGainNeeded / weeksRemaining : 0;

    // Calculate trimester-specific recommendations
    const trimester = weeksVal <= 13 ? 1 : (weeksVal <= 26 ? 2 : 3);
    let trimesterGain = '';
    
    if (trimester === 1) {
      trimesterGain = '0.5-2 kg total (minimal gain expected)';
    } else if (trimester === 2) {
      trimesterGain = `~${weeklyRate.toFixed(2)} kg per week`;
    } else {
      trimesterGain = `~${weeklyRate.toFixed(2)} kg per week until delivery`;
    }

    setResults({
      prePregnancyBMI: prePregnancyBMI.toFixed(1),
      bmiCategory: bmiData?.name || 'Normal Weight',
      currentGain: currentGain.toFixed(1),
      gainStatus: gainStatus,
      gainAssessment: gainAssessment,
      expectedTotalGain: `${expectedTotalGainMin}-${expectedTotalGainMax} kg`,
      weeklyRate: weeklyRate.toFixed(2),
      weeklyRateNeeded: weeklyRateNeeded.toFixed(2),
      expectedGainAtCurrentWeek: expectedGainAtCurrentWeek.toFixed(1),
      remainingGainNeeded: remainingGainNeeded.toFixed(1),
      recommendations: recommendations,
      trimester: trimester,
      trimesterGain: trimesterGain,
      parity: parityVal,
      multiplePregnancy: multiplePregnancyOptions.find(m => m.id === multiplePregnancy)?.name || 'Single',
      age: ageVal
    });
  };

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "What are the Institute of Medicine (IOM) guidelines for pregnancy weight gain?",
      answer: "The 2009 IOM guidelines recommend: Underweight (BMI <18.5): 12.5-18 kg; Normal weight (BMI 18.5-24.9): 11.5-16 kg; Overweight (BMI 25-29.9): 7-11.5 kg; Obese (BMI ≥30): 5-9 kg. For twin pregnancies: Normal weight: 17-25 kg; Overweight: 14-23 kg; Obese: 11-19 kg. These ranges optimize outcomes for both mother and baby."
    },
    {
      question: "How does pregnancy weight gain distribute in the body?",
      answer: "Typical distribution at term: Baby: 3.4 kg; Placenta: 0.7 kg; Amniotic fluid: 0.8 kg; Uterus: 0.9 kg; Breast tissue: 0.9 kg; Blood volume: 1.8 kg; Fluid volume: 1.8 kg; Maternal fat stores: 3.2 kg. Total: ~12.5 kg. Underweight women may need more fat stores, while obese women need less. This distribution supports fetal growth, breastfeeding, and maternal health."
    },
    {
      question: "What are the risks of insufficient or excessive weight gain?",
      answer: "Insufficient gain risks: Preterm birth, low birth weight, fetal growth restriction, developmental issues. Excessive gain risks: Gestational diabetes, preeclampsia, cesarean delivery, macrosomia (large baby), childhood obesity, maternal postpartum weight retention. Both extremes increase risk of pregnancy complications and long-term health issues for mother and child."
    },
    {
      question: "How does weight gain differ by trimester?",
      answer: "First trimester: 0.5-2 kg total (often minimal due to nausea). Second trimester: 0.35-0.5 kg/week for normal BMI. Third trimester: 0.35-0.5 kg/week until delivery. Underweight women may need slightly more per week, obese women slightly less. Weight gain pattern matters more than total - steady, consistent gain is ideal rather than rapid gains."
    },
    {
      question: "How should weight gain be managed with morning sickness or other complications?",
      answer: "Morning sickness: Focus on staying hydrated, small frequent meals, bland foods. Weight loss or minimal gain in first trimester is usually acceptable if catching up occurs later. Gestational diabetes: Follow medical nutrition therapy, monitor blood glucose, control carbohydrate intake. Preeclampsia: Follow medical advice, may have fluid retention affecting weight. Always consult healthcare provider for personalized guidance."
    }
  ];

  const healthCalculators = [
    { name: "BMI Calculator", link: "/bmi-calculator" },
    { name: "Due Date Calculator", link: "/due-date-calculator" },
    { name: "Nutritional Needs", link: "/nutritional-needs" },
    { name: "Fluid Requirements", link: "/fluid-requirements" },
    { name: "Medication Dosage", link: "/medication-dosage" },
    { name: "Body Surface Area", link: "/bsa-calculator" },
    { name: "Calorie Calculator", link: "/calorie-calculator" },
    { name: "Postpartum Weight Loss", link: "/postpartum-calculator" }
  ];

  return (
    <main style={containerStyle}>
      <section style={calculatorBoxStyle}>
        <h1 style={calcTitleStyle}>
          <i className="fas fa-baby"></i> Pregnancy Weight Gain Calculator - Comprehensive Gestational Weight Management Protocol
        </h1>
        <p style={calcDescStyle}>
          Calculate <strong>personalized pregnancy weight gain recommendations, trimester-specific targets, and optimal gestational weight management strategies</strong> based on <strong>pre-pregnancy BMI, multiple gestation status, and individual health factors</strong>. Essential for <strong>healthy pregnancy outcomes, fetal development optimization, and maternal health preservation</strong>.
        </p>

        <div style={inputGridStyle}>
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-weight"></i> Pre-Pregnancy Weight (kg)</label>
            <input
              type="number"
              value={prePregnancyWeight}
              onChange={(e) => setPrePregnancyWeight(e.target.value)}
              placeholder="65"
              min="30"
              max="200"
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
              placeholder="165"
              min="100"
              max="250"
              step="0.1"
              style={inputStyle}
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-calendar"></i> Weeks Pregnant</label>
            <input
              type="number"
              value={weeksPregnant}
              onChange={(e) => setWeeksPregnant(e.target.value)}
              placeholder="20"
              min="1"
              max="42"
              step="1"
              style={inputStyle}
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-weight-scale"></i> Current Weight (kg)</label>
            <input
              type="number"
              value={currentWeight}
              onChange={(e) => setCurrentWeight(e.target.value)}
              placeholder="70"
              min="30"
              max="250"
              step="0.1"
              style={inputStyle}
            />
            <small style={{ color: '#666', fontSize: '0.8rem' }}>
              Leave blank if same as pre-pregnancy
            </small>
          </div>
        </div>

        <div style={inputGridStyle}>
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-user"></i> Age (years)</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="30"
              min="18"
              max="50"
              step="1"
              style={inputStyle}
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-baby"></i> Previous Pregnancies</label>
            <select
              value={parity}
              onChange={(e) => setParity(e.target.value)}
              style={selectStyle}
            >
              <option value="0">0 (First pregnancy)</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3+</option>
            </select>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-babies"></i> Multiple Pregnancy</label>
            <select
              value={multiplePregnancy}
              onChange={(e) => setMultiplePregnancy(e.target.value)}
              style={selectStyle}
            >
              {multiplePregnancyOptions.map(option => (
                <option key={option.id} value={option.id}>{option.name} ({option.totalGain})</option>
              ))}
            </select>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-chart-line"></i> BMI Category</label>
            <select
              value={bmiCategory}
              onChange={(e) => setBmiCategory(e.target.value)}
              style={selectStyle}
            >
              {bmiCategories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name} (BMI {category.bmiRange})
                </option>
              ))}
            </select>
            <small style={{ color: '#666', fontSize: '0.8rem' }}>
              Auto-calculated if left as "Normal"
            </small>
          </div>
        </div>

        <button
          style={calcBtnStyle}
          onClick={calculatePregnancyWeightGain}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, calcBtnHoverStyle)}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = calcBtnStyle.background;
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <i className="fas fa-calculator"></i> Calculate Pregnancy Weight Gain
        </button>

        {/* Results Display */}
        {results && (
          <div style={resultsContainerStyle}>
            <div style={{ ...resultCardStyle, ...weightGainCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-chart-bar"></i> Weight Gain Analysis</h4>
              <div style={{ margin: '20px 0' }}>
                <div style={resultValueStyle}>{results.currentGain} kg</div>
                <div style={{ fontSize: '1.2rem', color: '#666', marginBottom: '15px' }}>
                  Current Weight Gain
                </div>
                <div style={{ 
                  padding: '10px', 
                  background: results.gainStatus === 'Within Recommended Range' ? '#d4edda' : 
                            results.gainStatus === 'Below Recommended' ? '#fff3cd' : '#f8d7da',
                  borderRadius: '8px',
                  color: results.gainStatus === 'Within Recommended Range' ? '#155724' : 
                        results.gainStatus === 'Below Recommended' ? '#856404' : '#721c24',
                  fontWeight: '600'
                }}>
                  {results.gainStatus}
                </div>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div>Pre-pregnancy BMI: {results.prePregnancyBMI} ({results.bmiCategory})</div>
                <div>Assessment: {results.gainAssessment}</div>
                <div>Expected at {results.weeksPregnant} weeks: {results.expectedGainAtCurrentWeek} kg</div>
              </div>
            </div>

            <div style={{ ...resultCardStyle, ...recommendationsCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-bullseye"></i> Recommendations & Targets</h4>
              <div style={{ margin: '20px 0' }}>
                <div style={{ marginBottom: '15px' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#3498db' }}>
                    {results.expectedTotalGain} kg
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>Total Recommended Gain</div>
                </div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                  {results.recommendations.length > 0 ? (
                    <ul style={{ margin: 0, paddingLeft: '20px' }}>
                      {results.recommendations.map((rec, idx) => (
                        <li key={idx} style={{ marginBottom: '8px' }}>{rec}</li>
                      ))}
                    </ul>
                  ) : 'Continue current healthy practices'}
                </div>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div>Trimester {results.trimester}: {results.trimesterGain}</div>
                <div>Multiple Pregnancy: {results.multiplePregnancy}</div>
                <div>Parity: {results.parity} previous pregnancies</div>
              </div>
            </div>

            <div style={{ ...resultCardStyle, ...weeklyCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-calendar-week"></i> Weekly Planning</h4>
              <div style={{ margin: '20px 0' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
                  <div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#2ecc71' }}>{results.weeklyRate} kg/week</div>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>Recommended Weekly Rate</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#e74c3c' }}>{results.weeklyRateNeeded} kg/week</div>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>Rate Needed to Reach Target</div>
                  </div>
                </div>
                <div style={{ marginTop: '15px', padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '5px' }}>Remaining Pregnancy:</div>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>
                    {results.remainingGainNeeded} kg needed over {40 - results.weeksPregnant} weeks
                  </div>
                </div>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div>Based on Institute of Medicine 2009 Guidelines</div>
                <div>Individual needs may vary - consult healthcare provider</div>
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
          <h3 style={sectionTitleStyle}><i className="fas fa-question-circle"></i> What is Pregnancy Weight Gain Calculation? Comprehensive Gestational Weight Management Methodology</h3>
          <p style={paragraphStyle}><strong>Pregnancy weight gain calculation methodologies</strong> represent <strong>essential clinical protocols</strong> for determining <strong>optimal gestational weight parameters, trimester-specific growth targets, and individualized maternal-fetal health optimization strategies</strong>. These calculations integrate <strong>pre-pregnancy anthropometric measurements, maternal health factors, and evidence-based gestational guidelines</strong> to provide <strong>personalized pregnancy management approaches</strong> that maximize <strong>fetal development outcomes while minimizing pregnancy-related complications</strong> across diverse obstetric scenarios requiring <strong>precision prenatal care protocols</strong>.</p>
          
          <h3 style={sectionTitleStyle}><i className="fas fa-calculator"></i> Pregnancy Weight Gain Calculation Methods - Comprehensive Gestational Management Formulae</h3>
          <p style={paragraphStyle}>Multiple <strong>validated pregnancy weight gain determination equations</strong> exist for <strong>comprehensive gestational weight management protocols</strong>, each demonstrating specific <strong>clinical applications and evidence-based accuracy profiles</strong> influencing <strong>prenatal care decision-making processes</strong>:</p>
          
          <div style={formulaBoxStyle}>
            <strong>Institute of Medicine (IOM) 2009 Protocol:</strong> Gold standard guidelines based on pre-pregnancy BMI categories<br/>
            <strong>BMI-Specific Weight Gain Algorithms:</strong> Differentiated recommendations for underweight, normal weight, overweight, and obese categories<br/>
            <strong>Trimester-Specific Distribution Models:</strong> Weekly gain patterns adjusted for gestational age progression<br/>
            <strong>Multiple Gestation Calculations:</strong> Specialized algorithms for twin, triplet, and higher-order pregnancies<br/>
            <strong>Individualized Risk Assessment Models:</strong> Personalized calculations incorporating maternal age, parity, and medical conditions<br/>
            <strong>Clinical Method Selection Protocol:</strong> IOM 2009 guidelines recommended for <strong>routine prenatal care</strong>, specialized models for <strong>high-risk pregnancy management</strong>
          </div>

          <h3 style={sectionTitleStyle}><i className="fas fa-stethoscope"></i> Clinical Applications of Pregnancy Weight Gain Calculation - Comprehensive Prenatal Management Guidelines</h3>
          <p style={paragraphStyle}>Accurate <strong>pregnancy weight gain calculation methodology implementation</strong> serves critical functions across multiple <strong>obstetric specialties and prenatal management areas</strong> requiring <strong>precise gestational monitoring</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Optimal Fetal Growth Monitoring:</strong> Essential for <strong>appropriate weight gain targeting, fetal growth restriction prevention, and macrosomia risk reduction strategies</strong> optimizing <strong>birth weight outcomes</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Gestational Diabetes Prevention Protocols:</strong> Guides <strong>carbohydrate intake optimization, glucose metabolism management, and insulin resistance mitigation strategies</strong> in diabetic pregnancy management</li>
            <li style={{ marginBottom: '10px' }}><strong>Hypertensive Disorder Management:</strong> Determines <strong>appropriate weight gain parameters, fluid balance monitoring, and preeclampsia prevention approaches</strong> in hypertensive pregnancies</li>
            <li style={{ marginBottom: '10px' }}><strong>Multiple Gestation Care:</strong> Essential for <strong>adequate nutritional support determination, preterm birth prevention, and optimal twin growth strategies</strong> in multifetal pregnancies</li>
            <li style={{ marginBottom: '10px' }}><strong>Adolescent Pregnancy Management:</strong> Accounts for <strong>maternal growth continuation requirements, nutritional competition considerations, and developmental stage adaptations</strong> in teenage pregnancies</li>
            <li style={{ marginBottom: '10px' }}><strong>Advanced Maternal Age Pregnancy:</strong> Manages <strong>metabolic adaptation challenges, chronic condition considerations, and age-related risk factor modifications</strong> in pregnancies over age 35</li>
            <li><strong>Post-Bariatric Surgery Pregnancy:</strong> Coordinates <strong>nutrient absorption optimization, weight gain adjustment protocols, and surgical complication monitoring</strong> following weight loss surgery</li>
          </ul>
          
          <h3 style={sectionTitleStyle}><i className="fas fa-balance-scale"></i> Factors Affecting Pregnancy Weight Gain - Comprehensive Gestational Assessment Considerations</h3>
          <p style={paragraphStyle}>Multiple <strong>significant physiological and pathological factors</strong> influence <strong>pregnancy weight gain calculation accuracy parameters</strong> and require consideration for appropriate clinical interpretation:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Pre-Pregnancy Nutritional Status:</strong> Baseline body composition, chronic disease nutrition, and micronutrient stores significantly affect <strong>gestational weight gain patterns and nutritional requirements</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Hyperemesis Gravidarum Impacts:</strong> Severe nausea and vomiting dramatically alter <strong>early pregnancy weight trajectories and nutritional absorption capabilities</strong> requiring specialized management</li>
            <li style={{ marginBottom: '10px' }}><strong>Gestational Age Considerations:</strong> Different trimesters demonstrate <strong>distinct metabolic demands and weight distribution patterns</strong> requiring stage-appropriate monitoring</li>
            <li style={{ marginBottom: '10px' }}><strong>Multiple Gestation Physiology:</strong> Twin and higher-order pregnancies exhibit <strong>accelerated weight gain requirements, increased metabolic demands, and modified distribution patterns</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Maternal Metabolic Conditions:</strong> Pre-existing diabetes, thyroid disorders, and polycystic ovary syndrome significantly influence <strong>weight gain efficiency and metabolic adaptation</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Medication Effect Variables:</strong> Anti-emetics, insulin, and thyroid medications dramatically alter <strong>appetite regulation, metabolic rate, and nutrient utilization patterns</strong></li>
            <li><strong>Psychosocial Determinants:</strong> Food insecurity, eating disorders, and mental health conditions profoundly impact <strong>nutritional intake patterns and weight management capabilities</strong></li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-exclamation-triangle"></i> Limitations of Pregnancy Weight Gain Formulas - Advanced Gestational Assessment Methodologies</h3>
          <p style={paragraphStyle}>While <strong>pregnancy weight gain calculation methodologies</strong> provide valuable <strong>clinical starting points</strong>, specific clinical situations necessitate <strong>advanced assessment approaches</strong> and <strong>dynamic monitoring protocols</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Extreme Body Composition Scenarios:</strong> Professional athletes, severe obesity, and eating disorder recovery require <strong>individualized weight gain approaches beyond standard formulas</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Complex Medical Comorbidities:</strong> Combined renal-cardiac-metabolic dysfunction presentations requiring <strong>nuanced nutritional management approaches</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Cultural and Ethnic Variations:</strong> Different populations demonstrate <strong>varying optimal weight gain ranges and body composition patterns</strong> requiring population-specific guidelines</li>
            <li style={{ marginBottom: '10px' }}><strong>Assisted Reproductive Technology Pregnancies:</strong> IVF, donor egg, and surrogate pregnancies may exhibit <strong>different weight gain patterns and complication risks</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Advanced Monitoring Requirement Situations:</strong> Fetal growth restriction, placental insufficiency, and maternal malnutrition requiring <strong>intensive nutritional surveillance</strong></li>
            <li><strong>Alternative Assessment Methodologies:</strong> <strong>Body composition analysis, nutritional biomarker monitoring, and advanced ultrasound assessments</strong> for comprehensive gestational assessment</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-history"></i> Historical Development of Pregnancy Weight Gain Guidelines - Evolution of Obstetric Nutrition Science</h3>
          <p style={paragraphStyle}>The progressive evolution of <strong>pregnancy weight gain calculation methodologies</strong> reflects <strong>decades of obstetric research advancement</strong> and <strong>clinical practice refinement trajectories</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Early 20th Century Foundations:</strong> Initial recognition of <strong>maternal weight impact on pregnancy outcomes</strong> establishing basic weight monitoring principles</li>
            <li style={{ marginBottom: '10px' }}><strong>Mid-20th Century Standardization:</strong> Development of <strong>standardized weight gain charts, prenatal nutrition guidelines, and population-based recommendations</strong> revolutionizing obstetric care</li>
            <li style={{ marginBottom: '10px' }}><strong>Late 20th Century Advances:</strong> Introduction of <strong>BMI-based classifications, trimester-specific recommendations, and evidence-based guideline development</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>2009 IOM Guideline Publication:</strong> Comprehensive evidence review establishing <strong>current gold standard recommendations based on pre-pregnancy BMI categories</strong></li>
            <li><strong>Contemporary Precision Obstetrics:</strong> Integration of <strong>individualized risk assessment, advanced monitoring technologies, and personalized nutrition approaches</strong> for optimal pregnancy management</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-user-md"></i> Practical Clinical Implementation Recommendations - Comprehensive Prenatal Management Guidelines</h3>
          <p style={paragraphStyle}>For optimal <strong>pregnancy weight gain calculation implementation</strong> in contemporary clinical practice environments and <strong>evidence-based prenatal care protocols</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Comprehensive Baseline Assessment Protocol:</strong> Systematically evaluate <strong>pre-pregnancy weight history, accurate height measurement, and complete medical/nutritional assessment</strong> before calculation initiation</li>
            <li style={{ marginBottom: '10px' }}><strong>Dynamic Monitoring Implementation:</strong> Utilize <strong>serial weight measurements, nutritional intake tracking, and fetal growth assessment</strong> rather than static formula application</li>
            <li style={{ marginBottom: '10px' }}><strong>Individualized Risk Stratification Procedures:</strong> Systematically incorporate <strong>medical comorbidities, obstetric history, lifestyle factors, and psychosocial determinants</strong> into weight gain planning</li>
            <li style={{ marginBottom: '10px' }}><strong>Multidisciplinary Care Integration Protocol:</strong> Develop <strong>comprehensive management frameworks</strong> involving <strong>obstetricians, registered dietitians, mental health professionals, and social services</strong> beyond numerical calculations alone</li>
            <li style={{ marginBottom: '10px' }}><strong>Patient-Centered Education Enhancement:</strong> Coordinate weight management with <strong>nutritional counseling, physical activity guidance, and behavioral support services</strong> for comprehensive prenatal care</li>
            <li><strong>Quality Improvement Integration:</strong> Implement <strong>pregnancy outcome tracking systems, patient satisfaction measurement, and evidence-based protocol implementation</strong> for continuous optimization</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-chart-line"></i> Future Directions in Pregnancy Weight Management - Emerging Obstetric Technologies</h3>
          <p style={paragraphStyle}>Ongoing <strong>pregnancy weight management research initiatives</strong> continue refining <strong>assessment approaches</strong> with promising technological developments and <strong>innovative monitoring methodologies</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Advanced Body Composition Monitoring:</strong> Bioelectrical impedance analysis, air displacement plethysmography, and three-dimensional photonic scanning for precise body composition tracking</li>
            <li style={{ marginBottom: '10px' }}><strong>Artificial Intelligence Clinical Applications:</strong> Machine learning algorithm development for <strong>personalized weight gain prediction models</strong> incorporating multiple clinical and lifestyle variables</li>
            <li style={{ marginBottom: '10px' }}><strong>Wearable Monitoring Technologies:</strong> Smart scales, nutritional intake trackers, and activity monitors integrated with electronic health records for real-time management</li>
            <li style={{ marginBottom: '10px' }}><strong>Nutrigenomic Testing Advancements:</strong> Genetic profiling for <strong>personalized nutritional requirements, metabolic pathway optimization, and complication risk prediction</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Telemedicine Integration Strategies:</strong> Remote weight monitoring, virtual nutritional counseling, and digital behavior change platforms for comprehensive prenatal care</li>
            <li><strong>Mobile Health Applications:</strong> Pregnancy-specific tracking apps, educational platforms, and support networks for continuous engagement and monitoring</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-graduation-cap"></i> Educational Requirements and Professional Training Standards Implementation</h3>
          <p style={paragraphStyle}>Proper <strong>pregnancy weight gain calculation methodology education</strong> represents an <strong>essential clinical competency requirement</strong> for <strong>healthcare professionals</strong> across multiple obstetric disciplines. Comprehensive training curricula should systematically include <strong>gestational physiology principles, calculation methodologies, nutritional assessment techniques, and behavioral counseling strategies</strong>. Continuing medical education programs must consistently address <strong>evolving obstetric research findings, changing clinical practice standards, and emerging technological developments</strong> to ensure optimal maternal-fetal outcomes and evidence-based practice implementation.</p>

          <h3 style={sectionTitleStyle}><i className="fas fa-clipboard-check"></i> Quality Assurance and Protocol Standardization Implementation</h3>
          <p style={paragraphStyle}>Implementation of <strong>rigorous quality assurance protocols</strong> ensures <strong>consistent pregnancy weight management practices</strong> across diverse healthcare settings. These protocols encompass <strong>calculation standardization methodologies, measurement technique verification procedures, and clinical outcome measurement requirements</strong> that directly impact <strong>maternal and fetal health parameters</strong>. Professional organizations should develop <strong>standardized training materials, competency assessment tools, and practice guideline documents</strong> to guarantee consistent clinical application quality across diverse healthcare delivery settings and specialty practice areas.</p>        
        </div>

        {/* Q&A Dropdown Section */}
        <div style={faqSectionStyle}>
          <h2 style={faqTitleStyle}><i className="fas fa-question-circle"></i> Frequently Asked Questions About Pregnancy Weight Gain</h2>
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
          <h3 style={sectionTitleStyle}><i className="fas fa-calculator"></i> Related Pregnancy & Health Calculators</h3>
          <p style={paragraphStyle}>Explore our comprehensive collection of <strong>pregnancy calculation tools and health monitoring calculators</strong> for prenatal care and wellness management:</p>
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
          <p style={paragraphStyle}><strong>This pregnancy weight gain calculator provides estimates for educational and informational purposes only.</strong> The calculations are based on standard guidelines and should not be used as a substitute for professional medical advice, diagnosis, or treatment.</p>
          <p style={paragraphStyle}><strong>Clinical Decision Limitations:</strong> Pregnancy weight gain calculations have inherent limitations and may not accurately reflect individual nutritional needs. Actual pregnancy weight management requires comprehensive clinical assessment by qualified healthcare providers including obstetricians, midwives, and registered dietitians.</p>
          <p style={paragraphStyle}><strong>Individual Variation Awareness:</strong> Every pregnancy is unique. Weight gain patterns vary based on multiple factors including genetics, metabolism, activity level, and overall health. These calculations provide general guidelines that should be personalized by your healthcare team.</p>
          <p style={paragraphStyle}><strong>Medical Condition Considerations:</strong> Women with pre-existing medical conditions (diabetes, thyroid disorders, eating disorders, etc.) or pregnancy complications (gestational diabetes, preeclampsia, hyperemesis) require specialized nutritional guidance beyond standard calculations.</p>
          <p style={paragraphStyle}><strong>Professional Consultation Required:</strong> Always seek the advice of your obstetrician, midwife, or other qualified healthcare provider with any questions regarding pregnancy weight gain or nutritional planning. Do not disregard professional medical advice or delay seeking it because of information provided by this calculator.</p>
          <p style={paragraphStyle}><strong>Eating Disorder Precautions:</strong> Individuals with a history of eating disorders should use weight gain calculators only under professional supervision. These tools may trigger unhealthy behaviors or excessive anxiety about weight in susceptible individuals.</p>
          <p style={paragraphStyle}><strong>Holistic Health Perspective:</strong> While weight gain is one aspect of pregnancy health, it should be considered alongside other important factors including nutritional quality, physical activity, mental health, and overall wellbeing. Focus on comprehensive prenatal care rather than weight metrics alone.</p>
        </div>
      </section>

      {/* Sidebar with 3 Ads (3rd one sticky) */}
      {showSidebar && (
        <aside style={sidebarStyle}>
          <div style={sidebarContentStyle}>
            <div style={{ ...adSlotStyle, ...sidebarAdStyle }}>
              <p><i className="fas fa-ad"></i> Advertisement 1</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Sponsored Content</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Prenatal nutrition coaching program</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>300px height ad slot</p>
            </div>
            
            <div style={{ ...adSlotStyle, ...sidebarAdStyle }}>
              <p><i className="fas fa-ad"></i> Advertisement 2</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Featured Product</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Smart pregnancy scale with app</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>300px height ad slot</p>
            </div>
            
            <div style={{ ...adSlotStyle, ...stickyAdStyle }}>
              <p><i className="fas fa-thumbtack"></i> Sticky Advertisement</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Premium Content - Stays visible</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Complete prenatal health guide</p>
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