"use client";

import { useState, useEffect } from 'react';

export default function SafePeriodCalculatorPage() {
  const [cycleLength, setCycleLength] = useState('');
  const [cycleVariation, setCycleVariation] = useState('');
  const [lastPeriodDate, setLastPeriodDate] = useState('');
  const [method, setMethod] = useState('standardDays');
  const [temperatureShift, setTemperatureShift] = useState('no');
  const [cervicalMucus, setCervicalMucus] = useState('dry');
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

  const methodTabsStyle = {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    flexWrap: 'wrap'
  };

  const methodTabStyle = {
    padding: '12px 24px',
    background: '#e9ecef',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.3s',
    fontSize: '0.95rem'
  };

  const activeMethodTabStyle = {
    background: '#3498db',
    color: 'white',
    boxShadow: '0 3px 10px rgba(52, 152, 219, 0.3)'
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

  const safePeriodCardStyle = {
    borderTopColor: '#2ecc71'
  };

  const fertileWindowCardStyle = {
    borderTopColor: '#e74c3c'
  };

  const effectivenessCardStyle = {
    borderTopColor: '#3498db'
  };

  const resultValueStyle = {
    fontSize: '2.5rem',
    fontWeight: '800',
    color: '#2ecc71',
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

  // Calculation methods
  const calculationMethods = [
    { id: 'standardDays', name: 'Standard Days Method', description: 'Days 1-7 and 19+ are safe (28-day cycle)', typicalUseEffectiveness: '95%', perfectUseEffectiveness: '99%' },
    { id: 'calendarRhythm', name: 'Calendar/Rhythm Method', description: 'Based on cycle length calculation', typicalUseEffectiveness: '76%', perfectUseEffectiveness: '91%' },
    { id: 'symptothermal', name: 'Symptothermal Method', description: 'Combines temperature and mucus observations', typicalUseEffectiveness: '98%', perfectUseEffectiveness: '99.6%' },
    { id: 'twoDay', name: 'TwoDay Method', description: 'Based on cervical mucus observations', typicalUseEffectiveness: '96%', perfectUseEffectiveness: '97%' },
    { id: 'marquette', name: 'Marquette Method', description: 'Uses fertility monitor with urine tests', typicalUseEffectiveness: '98%', perfectUseEffectiveness: '99%' }
  ];

  // Sample data for demo
  useEffect(() => {
    const today = new Date();
    const lastPeriod = new Date(today);
    lastPeriod.setDate(today.getDate() - 28);
    setLastPeriodDate(lastPeriod.toISOString().split('T')[0]);
    setCycleLength('28');
    setCycleVariation('2');
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

  const calculateSafePeriod = () => {
    // Validate inputs
    if (!cycleLength || !lastPeriodDate) {
      alert('Please fill in cycle length and last period date.');
      return;
    }

    const cycleLengthVal = parseInt(cycleLength);
    const cycleVariationVal = parseInt(cycleVariation) || 2;
    const lastPeriod = new Date(lastPeriodDate);

    if (cycleLengthVal < 21 || cycleLengthVal > 45) {
      alert('Cycle length should be between 21 and 45 days. Please consult a healthcare provider if your cycles are outside this range.');
      return;
    }

    if (cycleVariationVal < 0 || cycleVariationVal > 7) {
      alert('Cycle variation should be between 0 and 7 days.');
      return;
    }

    // Get selected method
    const selectedMethod = calculationMethods.find(m => m.id === method);
    
    // Calculate based on method
    let safePeriodStartDay = 1;
    let safePeriodEndDay = cycleLengthVal;
    let fertileWindowStart = 8;
    let fertileWindowEnd = 19;
    let effectiveness = '';

    switch(method) {
      case 'standardDays':
        // Standard Days Method: Days 1-7 and 19+ are safe for 26-32 day cycles
        safePeriodStartDay = 1;
        safePeriodEndDay = 7;
        fertileWindowStart = 8;
        fertileWindowEnd = 19;
        // Adjust for cycle length
        if (cycleLengthVal < 26) {
          fertileWindowEnd = 17;
        } else if (cycleLengthVal > 32) {
          fertileWindowStart = 10;
          fertileWindowEnd = 21;
        }
        effectiveness = 'Typical use: 95% effective | Perfect use: 99% effective';
        break;

      case 'calendarRhythm':
        // Calendar/Rhythm Method: Ovulation day = cycle length - 14, fertile window = ±5 days
        const ovulationDay = cycleLengthVal - 14;
        fertileWindowStart = ovulationDay - 5 - cycleVariationVal;
        fertileWindowEnd = ovulationDay + 1 + cycleVariationVal;
        safePeriodStartDay = 1;
        safePeriodEndDay = fertileWindowStart - 1;
        effectiveness = 'Typical use: 76% effective | Perfect use: 91% effective';
        break;

      case 'symptothermal':
        // Symptothermal Method: Based on BBT and cervical mucus
        fertileWindowStart = 6;
        fertileWindowEnd = 19;
        safePeriodStartDay = 1;
        safePeriodEndDay = fertileWindowStart - 1;
        if (temperatureShift === 'yes') {
          // If temperature shift detected, ovulation has occurred
          fertileWindowEnd = cycleLengthVal - 7; // Post-ovulatory safe period
          safePeriodStartDay = fertileWindowEnd + 1;
          safePeriodEndDay = cycleLengthVal;
        }
        effectiveness = 'Typical use: 98% effective | Perfect use: 99.6% effective';
        break;

      default:
        // Default to Standard Days Method
        safePeriodStartDay = 1;
        safePeriodEndDay = 7;
        fertileWindowStart = 8;
        fertileWindowEnd = 19;
        effectiveness = 'Typical use: 95% effective | Perfect use: 99% effective';
    }

    // Ensure valid ranges
    safePeriodStartDay = Math.max(1, safePeriodStartDay);
    safePeriodEndDay = Math.min(cycleLengthVal, safePeriodEndDay);
    fertileWindowStart = Math.max(1, fertileWindowStart);
    fertileWindowEnd = Math.min(cycleLengthVal, fertileWindowEnd);

    // Calculate dates
    const safePeriodStartDate = new Date(lastPeriod);
    safePeriodStartDate.setDate(lastPeriod.getDate() + safePeriodStartDay - 1);

    const safePeriodEndDate = new Date(lastPeriod);
    safePeriodEndDate.setDate(lastPeriod.getDate() + safePeriodEndDay - 1);

    const fertileWindowStartDate = new Date(lastPeriod);
    fertileWindowStartDate.setDate(lastPeriod.getDate() + fertileWindowStart - 1);

    const fertileWindowEndDate = new Date(lastPeriod);
    fertileWindowEndDate.setDate(lastPeriod.getDate() + fertileWindowEnd - 1);

    const nextPeriodDate = new Date(lastPeriod);
    nextPeriodDate.setDate(lastPeriod.getDate() + cycleLengthVal);

    // Determine current day status
    const today = new Date();
    const cycleDay = Math.floor((today - lastPeriod) / (1000 * 60 * 60 * 24)) + 1;
    
    let currentStatus = '';
    let currentSafety = 'UNKNOWN';
    let recommendations = [];

    if (cycleDay >= safePeriodStartDay && cycleDay <= safePeriodEndDay) {
      currentStatus = 'Currently in SAFE period';
      currentSafety = 'SAFE';
      recommendations.push('Unprotected intercourse has lowest pregnancy risk during this period');
      recommendations.push('Continue tracking cycle signs for confirmation');
      recommendations.push('Consider barrier methods for STI prevention if needed');
    } else if (cycleDay >= fertileWindowStart && cycleDay <= fertileWindowEnd) {
      currentStatus = 'Currently in FERTILE window - HIGH RISK';
      currentSafety = 'HIGH RISK';
      recommendations.push('Use reliable contraception if avoiding pregnancy');
      recommendations.push('Consider abstinence or barrier methods');
      recommendations.push('Track fertility signs closely if using natural methods');
    } else if (cycleDay > safePeriodEndDay && cycleDay < fertileWindowStart) {
      currentStatus = 'Transition period - CAUTION ADVISED';
      currentSafety = 'CAUTION';
      recommendations.push('Use contraception as cycle approaches fertile window');
      recommendations.push('Monitor cervical mucus changes closely');
      recommendations.push('Consider backup method if uncertain');
    } else {
      currentStatus = 'Post-ovulatory safe period';
      currentSafety = 'SAFE';
      recommendations.push('Unprotected intercourse has lower pregnancy risk');
      recommendations.push('Confirm ovulation through temperature or mucus changes');
      recommendations.push('Track for next cycle preparation');
    }

    // Calculate safety by cycle day
    const safetyByDay = [];
    for (let day = 1; day <= cycleLengthVal; day++) {
      let safety = 'Fertile';
      let color = '#e74c3c';
      
      if (day >= safePeriodStartDay && day <= safePeriodEndDay) {
        safety = 'Safe';
        color = '#2ecc71';
      } else if (day < fertileWindowStart || day > fertileWindowEnd) {
        safety = 'Transition';
        color = '#f39c12';
      }
      
      safetyByDay.push({ day, safety, color });
    }

    // Format dates for display
    const formatDate = (date) => {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      });
    };

    setResults({
      cycleLength: cycleLengthVal,
      cycleVariation: cycleVariationVal,
      method: selectedMethod?.name || 'Standard Days Method',
      safePeriodStartDay: safePeriodStartDay,
      safePeriodEndDay: safePeriodEndDay,
      fertileWindowStart: fertileWindowStart,
      fertileWindowEnd: fertileWindowEnd,
      safePeriodStartDate: formatDate(safePeriodStartDate),
      safePeriodEndDate: formatDate(safePeriodEndDate),
      fertileWindowStartDate: formatDate(fertileWindowStartDate),
      fertileWindowEndDate: formatDate(fertileWindowEndDate),
      nextPeriodDate: formatDate(nextPeriodDate),
      effectiveness: effectiveness,
      currentStatus: currentStatus,
      currentSafety: currentSafety,
      recommendations: recommendations,
      cycleDay: cycleDay,
      safetyByDay: safetyByDay,
      methodDescription: selectedMethod?.description || ''
    });
  };

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "What is the difference between typical use and perfect use effectiveness rates?",
      answer: "Typical use effectiveness includes real-world usage with occasional errors or inconsistencies (e.g., 76-95% for calendar methods). Perfect use effectiveness assumes flawless method adherence every cycle (e.g., 91-99.6%). The gap represents human error. For example, Standard Days Method: typical use 95%, perfect use 99%. Symptothermal Method: typical use 98%, perfect use 99.6%. Effectiveness varies by method complexity and user consistency."
    },
    {
      question: "Which fertility awareness method is most effective for avoiding pregnancy?",
      answer: "The Symptothermal Method is most effective (99.6% perfect use) as it combines basal body temperature (detects ovulation after it occurs) with cervical mucus observation (predicts ovulation). Marquette Method (98-99% effective) uses fertility monitors. Standard Days Method (95-99% effective) works best for regular 26-32 day cycles. Calendar/Rhythm Method is least reliable (76-91% effective). Effectiveness depends on cycle regularity, method training, and consistent tracking."
    },
    {
      question: "How do irregular cycles affect safe period calculation?",
      answer: "Irregular cycles make calendar methods unreliable. With cycle variation >7-9 days: 1) Calendar method effectiveness drops significantly, 2) Standard Days Method not recommended, 3) Symptothermal method remains effective but requires more careful tracking, 4) Consider longer abstinence or barrier methods during uncertain periods, 5) Track for 6-12 months to understand pattern. Medical causes of irregularity (PCOS, thyroid issues) should be evaluated. Postpartum, perimenopause, and breastfeeding also affect regularity."
    },
    {
      question: "What are the main advantages and disadvantages of fertility awareness methods?",
      answer: "Advantages: No hormones/side effects, inexpensive, enhances body awareness, acceptable to many religions, woman-controlled. Disadvantages: Requires daily tracking, learning curve, less effective than hormonal methods, doesn't protect against STIs, requires partner cooperation, ineffective with irregular cycles. Best for: Committed couples, regular cycles, good tracking skills, religious/moral preferences. Not recommended for: Irregular cycles, postpartum, perimenopause, or if pregnancy would be catastrophic."
    },
    {
      question: "How should fertility awareness methods be taught and learned properly?",
      answer: "Proper training includes: 1) Certified instructor (NFPTA, Billings, etc.), 2) 3-6 month learning period with backup contraception, 3) Daily charting practice, 4) Regular instructor review, 5) Understanding all fertility signs, 6) Knowing rules for each phase, 7) Handling special situations (illness, travel, stress). Self-teaching from apps/books has lower effectiveness. Many methods require 85+ days of tracking before relying on them. Continuing education and support groups improve success rates."
    }
  ];

  const healthCalculators = [
    { name: "Fertile Window Calculator", link: "/fertile-window-calculator" },
    { name: "Due Date Calculator", link: "/due-date-calculator" },
    { name: "Pregnancy Weight Gain", link: "/pregnancy-weight-gain" },
    { name: "BMI Calculator", link: "/bmi-calculator" },
    { name: "Ovulation Calculator", link: "/ovulation-calculator" },
    { name: "Menstrual Cycle Tracker", link: "/cycle-tracker" },
    { name: "Contraception Effectiveness", link: "/contraception-calculator" },
    { name: "Reproductive Health Assessment", link: "/reproductive-health" }
  ];

  return (
    <main style={containerStyle}>
      <section style={calculatorBoxStyle}>
        <h1 style={calcTitleStyle}>
          <i className="fas fa-shield-alt"></i> Safe Period Calculator - Comprehensive Fertility Awareness & Natural Family Planning Protocol
        </h1>
        <p style={calcDescStyle}>
          Calculate <strong>precise safe period predictions, fertility window identification, and natural family planning strategies</strong> based on <strong>menstrual cycle analysis, physiological biomarkers, and evidence-based fertility awareness methods</strong>. Essential for <strong>informed contraception decisions, reproductive health management, and body literacy enhancement</strong>.
        </p>

        <div style={methodTabsStyle}>
          {calculationMethods.map(method => (
            <button
              key={method.id}
              style={{
                ...methodTabStyle,
                ...(method === method.id ? activeMethodTabStyle : {})
              }}
              onClick={() => setMethod(method.id)}
            >
              {method.name}
            </button>
          ))}
        </div>

        <div style={inputGridStyle}>
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-calendar-alt"></i> Average Cycle Length (days)</label>
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
              Based on last 6-12 cycles
            </small>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-chart-line"></i> Cycle Variation (days)</label>
            <input
              type="number"
              value={cycleVariation}
              onChange={(e) => setCycleVariation(e.target.value)}
              placeholder="2"
              min="0"
              max="7"
              step="1"
              style={inputStyle}
            />
            <small style={{ color: '#666', fontSize: '0.8rem' }}>
              Difference between shortest & longest cycles
            </small>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-calendar-day"></i> Last Period Start Date</label>
            <input
              type="date"
              value={lastPeriodDate}
              onChange={(e) => setLastPeriodDate(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-chart-line"></i> Temperature Shift Detected?</label>
            <select
              value={temperatureShift}
              onChange={(e) => setTemperatureShift(e.target.value)}
              style={selectStyle}
            >
              <option value="no">No - Pre-ovulatory phase</option>
              <option value="yes">Yes - Post-ovulatory phase</option>
              <option value="unknown">Unknown/Not tracking</option>
            </select>
          </div>
        </div>

        <div style={inputGridStyle}>
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-tint"></i> Cervical Mucus Today</label>
            <select
              value={cervicalMucus}
              onChange={(e) => setCervicalMucus(e.target.value)}
              style={selectStyle}
            >
              <option value="dry">Dry/None - Infertile</option>
              <option value="sticky">Sticky/Tacky - Possibly fertile</option>
              <option value="creamy">Creamy/Lotion-like - Fertile</option>
              <option value="eggwhite">Egg-white/Stretchy - Peak fertility</option>
              <option value="wet">Wet/Slippery - Very fertile</option>
            </select>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-clipboard-check"></i> Calculation Method</label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              style={selectStyle}
            >
              {calculationMethods.map(method => (
                <option key={method.id} value={method.id}>
                  {method.name} ({method.typicalUseEffectiveness} typical use)
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          style={calcBtnStyle}
          onClick={calculateSafePeriod}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, calcBtnHoverStyle)}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = calcBtnStyle.background;
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <i className="fas fa-calculator"></i> Calculate Safe Period
        </button>

        {/* Results Display */}
        {results && (
          <div style={resultsContainerStyle}>
            <div style={{ ...resultCardStyle, ...safePeriodCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-shield-alt"></i> Safe Period Results</h4>
              <div style={{ margin: '20px 0' }}>
                <div style={resultValueStyle}>
                  {results.safePeriodStartDate} - {results.safePeriodEndDate}
                </div>
                <div style={{ fontSize: '1.2rem', color: '#666', marginBottom: '15px' }}>
                  Pre-ovulatory Safe Period
                </div>
                <div style={{ 
                  padding: '10px', 
                  background: results.currentSafety === 'SAFE' ? '#d4edda' : 
                            results.currentSafety === 'CAUTION' ? '#fff3cd' : '#f8d7da',
                  borderRadius: '8px',
                  color: results.currentSafety === 'SAFE' ? '#155724' : 
                        results.currentSafety === 'CAUTION' ? '#856404' : '#721c24',
                  fontWeight: '600'
                }}>
                  {results.currentStatus}
                </div>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div>Cycle Day: {results.cycleDay} of {results.cycleLength}</div>
                <div>Safe Days: Day {results.safePeriodStartDay} to Day {results.safePeriodEndDay}</div>
                <div>Method: {results.method}</div>
                <div>Next Period: {results.nextPeriodDate}</div>
              </div>
            </div>

            <div style={{ ...resultCardStyle, ...fertileWindowCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-exclamation-triangle"></i> Fertile Window</h4>
              <div style={{ margin: '20px 0' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#e74c3c', marginBottom: '10px' }}>
                  {results.fertileWindowStartDate} - {results.fertileWindowEndDate}
                </div>
                <div style={{ fontSize: '1rem', color: '#666', marginBottom: '15px' }}>
                  High Fertility Period - Use Contraception
                </div>
                <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.9rem', marginBottom: '5px' }}><strong>Cycle Safety Map:</strong></div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '10px' }}>
                    {results.safetyByDay.slice(0, 15).map((day, idx) => (
                      <div key={idx} style={{
                        width: '30px',
                        height: '30px',
                        background: day.color,
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '0.8rem',
                        fontWeight: 'bold'
                      }}>
                        {day.day}
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '10px' }}>
                    <span style={{ color: '#2ecc71' }}>■ Safe</span> | 
                    <span style={{ color: '#f39c12', marginLeft: '10px' }}>■ Transition</span> | 
                    <span style={{ color: '#e74c3c', marginLeft: '10px' }}>■ Fertile</span>
                  </div>
                </div>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div>Fertile Days: Day {results.fertileWindowStart} to Day {results.fertileWindowEnd}</div>
                <div>Cycle Variation: ±{results.cycleVariation} days</div>
              </div>
            </div>

            <div style={{ ...resultCardStyle, ...effectivenessCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-chart-bar"></i> Effectiveness & Recommendations</h4>
              <div style={{ margin: '20px 0' }}>
                <div style={{ marginBottom: '15px' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#3498db' }}>
                    {results.method}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>{results.effectiveness}</div>
                </div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                  {results.recommendations.map((rec, idx) => (
                    <div key={idx} style={{ 
                      marginBottom: '10px',
                      padding: '10px',
                      background: '#f8f9fa',
                      borderRadius: '6px'
                    }}>
                      {rec}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div><strong>Key Points:</strong></div>
                <div>• Method works best with regular cycles (21-35 days)</div>
                <div>• Requires consistent daily tracking</div>
                <div>• Does not protect against STIs</div>
                <div>• Consider backup method during learning phase</div>
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
          <h3 style={sectionTitleStyle}><i className="fas fa-question-circle"></i> What is Safe Period Calculation? Comprehensive Fertility Awareness Methodology</h3>
          <p style={paragraphStyle}><strong>Safe period calculation methodologies</strong> represent <strong>essential reproductive health protocols</strong> for determining <strong>optimal contraception timing, precise fertility window identification, and evidence-based natural family planning strategies</strong>. These calculations integrate <strong>menstrual cycle analysis, physiological biomarker tracking, and statistical probability modeling</strong> to provide <strong>personalized fertility management approaches</strong> that maximize <strong>contraception effectiveness while supporting informed reproductive autonomy decisions</strong> across diverse family planning scenarios requiring <strong>precision fertility awareness protocols</strong>.</p>
          
          <h3 style={sectionTitleStyle}><i className="fas fa-calculator"></i> Safe Period Calculation Methods - Comprehensive Fertility Awareness Formulae</h3>
          <p style={paragraphStyle}>Multiple <strong>validated safe period determination equations</strong> exist for <strong>comprehensive natural family planning protocols</strong>, each demonstrating specific <strong>clinical applications and variable effectiveness profiles</strong> influencing <strong>contraception decision-making processes</strong>:</p>
          
          <div style={formulaBoxStyle}>
            <strong>Standard Days Method Protocol:</strong> Fixed algorithm: Days 1-7 and 19+ safe for 26-32 day cycles<br/>
            <strong>Calendar/Rhythm Method Methodology:</strong> Historical calculation: Ovulation Day = Cycle Length - 14, Fertile Window = ±5 days<br/>
            <strong>Symptothermal Combination Method:</strong> Integration of basal body temperature and cervical mucus observations<br/>
            <strong>TwoDay Method Algorithm:</strong> Cervical mucus-based: Safe if no mucus today or yesterday<br/>
            <strong>Marquette Method System:</strong> Fertility monitor utilization with urine hormone testing<br/>
            <strong>Clinical Method Selection Protocol:</strong> Standard Days Method recommended for <strong>regular cycle populations</strong>, Symptothermal method for <strong>maximum effectiveness requirements</strong>
          </div>

          <h3 style={sectionTitleStyle}><i className="fas fa-stethoscope"></i> Clinical Applications of Safe Period Calculation - Comprehensive Reproductive Health Management Guidelines</h3>
          <p style={paragraphStyle}>Accurate <strong>safe period calculation methodology implementation</strong> serves critical functions across multiple <strong>reproductive specialties and family planning management areas</strong> requiring <strong>precise fertility timing</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Natural Family Planning Implementation:</strong> Essential for <strong>hormone-free contraception strategies, religious accommodation requirements, and personal preference considerations</strong> optimizing <strong>informed reproductive choice outcomes</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Postpartum Contraception Planning:</strong> Guides <strong>lactational amenorrhea method supplementation, fertility return timing, and spacing pregnancy considerations</strong> following childbirth</li>
            <li style={{ marginBottom: '10px' }}><strong>Perimenopausal Transition Management:</strong> Determines <strong>cycle variability accommodation, contraception continuation decisions, and menopausal transition timing</strong> in perimenopause</li>
            <li style={{ marginBottom: '10px' }}><strong>Medical Contraindication Scenarios:</strong> Essential for <strong>hormonal method avoidance situations, medication interaction considerations, and health condition accommodations</strong> requiring non-hormonal options</li>
            <li style={{ marginBottom: '10px' }}><strong>Fertility Awareness Education:</strong> Accounts for <strong>body literacy enhancement, reproductive health education, and menstrual cycle understanding development</strong> across lifespan</li>
            <li style={{ marginBottom: '10px' }}><strong>Cultural and Religious Accommodation:</strong> Manages <strong>faith-based requirement fulfillment, cultural preference consideration, and ethical belief system respect</strong> in diverse populations</li>
            <li><strong>Transition Period Management:</strong> Coordinates <strong>contraception method switching, hormonal method discontinuation, and natural method initiation protocols</strong> during reproductive transitions</li>
          </ul>
          
          <h3 style={sectionTitleStyle}><i className="fas fa-balance-scale"></i> Factors Affecting Safe Period Accuracy - Comprehensive Reproductive Assessment Considerations</h3>
          <p style={paragraphStyle}>Multiple <strong>significant physiological and pathological factors</strong> influence <strong>safe period calculation accuracy parameters</strong> and require consideration for appropriate clinical interpretation:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Menstrual Cycle Regularity Variables:</strong> Cycle length variation, anovulatory episodes, and luteal phase defects significantly affect <strong>prediction algorithm reliability and timing accuracy</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Hormonal Fluctuation Impacts:</strong> Stress-induced cortisol elevation, thyroid dysfunction patterns, and hyperprolactinemia presence dramatically alter <strong>ovulation timing and fertility biomarker reliability</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Life Stage Transition Considerations:</strong> Postpartum lactational amenorrhea, perimenopausal variability, and adolescent maturation patterns create <strong>unique cycle characteristics requiring specialized approaches</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Medication Effect Variables:</strong> Hormonal contraceptive discontinuation, fertility medication influence, and psychotropic drug impacts significantly affect <strong>cycle normalization timing and ovulation resumption patterns</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Lifestyle Factor Modifications:</strong> Extreme weight changes, intensive exercise regimens, and significant travel/time zone changes alter <strong>hormonal balance and cycle regularity</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Underlying Medical Conditions:</strong> Polycystic ovary syndrome, hypothalamic amenorrhea, and premature ovarian insufficiency create <strong>unique cycle patterns requiring specialized management</strong></li>
            <li><strong>Environmental and Behavioral Influences:</strong> Shift work patterns, substance use impacts, and chronic stress exposure affect <strong>reproductive hormone function and cycle predictability</strong></li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-exclamation-triangle"></i> Limitations of Safe Period Calculations - Advanced Reproductive Assessment Methodologies</h3>
          <p style={paragraphStyle}>While <strong>safe period calculation methodologies</strong> provide valuable <strong>clinical starting points</strong>, specific clinical situations necessitate <strong>advanced assessment approaches</strong> and <strong>dynamic monitoring protocols</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Extreme Cycle Irregularity Scenarios:</strong> Polycystic ovary syndrome with prolonged amenorrhea, hypothalamic dysfunction, and perimenopausal transition require <strong>individualized assessment beyond standard algorithms</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>High-Risk Medical Contexts:</strong> Conditions where pregnancy would be medically dangerous or contraindicated requiring <strong>highly reliable contraception methods</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Learning Phase Considerations:</strong> Initial 3-6 month training period requiring <strong>backup contraception and instructor supervision</strong> for method effectiveness</li>
            <li style={{ marginBottom: '10px' }}><strong>Special Life Circumstances:</strong> Postpartum periods, breastfeeding contexts, and perimenopausal transitions demonstrating <strong>atypical cycle patterns</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Advanced Monitoring Requirement Situations:</strong> History of method failure, irregular bleeding patterns, and fertility treatment contexts requiring <strong>comprehensive reproductive evaluation</strong></li>
            <li><strong>Alternative Assessment Methodologies:</strong> <strong>Transvaginal ultrasound monitoring, serial hormone testing, and electronic fertility tracking systems</strong> for advanced fertility awareness</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-history"></i> Historical Development of Fertility Awareness Methods - Evolution of Natural Family Planning Science</h3>
          <p style={paragraphStyle}>The progressive evolution of <strong>safe period calculation methodologies</strong> reflects <strong>centuries of reproductive research advancement</strong> and <strong>clinical practice refinement trajectories</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Ancient Cultural Practices:</strong> Early recognition of <strong>menstrual cycle patterns and fertility timing</strong> in traditional medicine systems worldwide</li>
            <li style={{ marginBottom: '10px' }}><strong>Early 20th Century Foundations:</strong> Development of <strong>calendar rhythm method, basal body temperature tracking, and cervical mucus observation techniques</strong> establishing modern fertility awareness principles</li>
            <li style={{ marginBottom: '10px' }}><strong>Mid-20th Century Standardization:</strong> Introduction of <strong>standardized charting systems, method effectiveness studies, and organized teaching protocols</strong> revolutionizing natural family planning</li>
            <li style={{ marginBottom: '10px' }}><strong>Late 20th Century Advances:</strong> Creation of <strong>symptothermal method integration, electronic fertility monitors, and evidence-based effectiveness research</strong></li>
            <li><strong>21st Century Digital Revolution:</strong> Integration of <strong>fertility tracking applications, wearable monitoring devices, and artificial intelligence algorithms</strong> for optimal natural family planning management</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-user-md"></i> Practical Clinical Implementation Recommendations - Comprehensive Reproductive Health Management Guidelines</h3>
          <p style={paragraphStyle}>For optimal <strong>safe period calculation implementation</strong> in contemporary clinical practice environments and <strong>evidence-based reproductive health protocols</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Comprehensive Method Selection Protocol:</strong> Systematically evaluate <strong>cycle regularity patterns, lifestyle factors, learning capabilities, and pregnancy intention status</strong> before method recommendation</li>
            <li style={{ marginBottom: '10px' }}><strong>Structured Education Implementation:</strong> Utilize <strong>certified instructor guidance, standardized teaching materials, and supervised practice periods</strong> rather than self-directed learning approaches</li>
            <li style={{ marginBottom: '10px' }}><strong>Multi-Method Validation Procedures:</strong> Systematically incorporate <strong>cross-verification techniques, backup method availability, and periodic effectiveness assessment</strong> into fertility awareness practice</li>
            <li style={{ marginBottom: '10px' }}><strong>Clinical Context Integration Protocol:</strong> Develop <strong>personalized fertility management frameworks</strong> considering <strong>medical history factors, reproductive goals, and lifestyle considerations</strong> beyond numerical calculations alone</li>
            <li style={{ marginBottom: '10px' }}><strong>Multidisciplinary Care Enhancement:</strong> Coordinate fertility awareness management with <strong>reproductive health educators, medical providers, mental health professionals, and partner education</strong> for comprehensive reproductive care</li>
            <li><strong>Quality Improvement Integration:</strong> Implement <strong>method effectiveness tracking systems, patient education outcome measurement, and evidence-based protocol implementation</strong> for continuous optimization</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-chart-line"></i> Future Directions in Fertility Awareness - Emerging Reproductive Technologies</h3>
          <p style={paragraphStyle}>Ongoing <strong>fertility awareness research initiatives</strong> continue refining <strong>assessment approaches</strong> with promising technological developments and <strong>innovative monitoring methodologies</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Advanced Wearable Technologies:</strong> Smart basal thermometers, continuous hormone monitors, and integrated fertility tracking systems for real-time assessment</li>
            <li style={{ marginBottom: '10px' }}><strong>Artificial Intelligence Applications:</strong> Machine learning algorithm development for <strong>personalized fertility prediction models</strong> incorporating multiple physiological and lifestyle variables</li>
            <li style={{ marginBottom: '10px' }}><strong>Mobile Health Integration:</strong> Advanced fertility tracking applications, telemedicine consultations, and digital reproductive health education platforms for comprehensive management</li>
            <li style={{ marginBottom: '10px' }}><strong>Biomarker Discovery Advancements:</strong> Identification of <strong>novel fertility indicators, metabolic predictors, and genetic markers</strong> for enhanced prediction accuracy</li>
            <li style={{ marginBottom: '10px' }}><strong>Home Testing Innovations:</strong> Advanced home hormone monitoring systems, saliva-based fertility predictors, and smartphone-connected reproductive health devices</li>
            <li><strong>Personalized Medicine Approaches:</strong> Genomic profiling for <strong>individualized fertility pattern prediction, pharmacogenetic testing, and personalized method selection guidance</strong></li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-graduation-cap"></i> Educational Requirements and Professional Training Standards Implementation</h3>
          <p style={paragraphStyle}>Proper <strong>safe period calculation methodology education</strong> represents an <strong>essential clinical competency requirement</strong> for <strong>healthcare professionals</strong> across multiple reproductive health disciplines. Comprehensive training curricula should systematically include <strong>reproductive physiology principles, calculation methodologies, fertility assessment techniques, and patient counseling strategies</strong>. Continuing medical education programs must consistently address <strong>evolving reproductive research findings, changing clinical practice standards, and emerging technological developments</strong> to ensure optimal patient care outcomes and evidence-based practice implementation.</p>

          <h3 style={sectionTitleStyle}><i className="fas fa-clipboard-check"></i> Quality Assurance and Protocol Standardization Implementation</h3>
          <p style={paragraphStyle}>Implementation of <strong>rigorous quality assurance protocols</strong> ensures <strong>consistent fertility awareness practices</strong> across diverse healthcare settings. These protocols encompass <strong>calculation standardization methodologies, monitoring technique verification procedures, and clinical outcome measurement requirements</strong> that directly impact <strong>reproductive health outcomes and contraceptive effectiveness</strong>. Professional organizations should develop <strong>standardized training materials, competency assessment tools, and practice guideline documents</strong> to guarantee consistent clinical application quality across diverse healthcare delivery settings and specialty practice areas.</p>
        </div>

        {/* Q&A Dropdown Section */}
        <div style={faqSectionStyle}>
          <h2 style={faqTitleStyle}><i className="fas fa-question-circle"></i> Frequently Asked Questions About Safe Period Calculation</h2>
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
          <h3 style={sectionTitleStyle}><i className="fas fa-calculator"></i> Related Reproductive & Health Calculators</h3>
          <p style={paragraphStyle}>Explore our comprehensive collection of <strong>reproductive health calculation tools and wellness monitoring calculators</strong> for family planning and health management:</p>
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
          <p style={paragraphStyle}><strong>This safe period calculator provides estimates for educational and informational purposes only.</strong> The calculations are based on statistical averages and should not be used as a substitute for professional medical advice, diagnosis, or treatment.</p>
          <p style={paragraphStyle}><strong>Contraception Limitations:</strong> Fertility awareness methods have varying effectiveness rates (76-99.6% depending on method and perfect/typical use). Calendar methods are significantly less effective than hormonal or barrier methods. This calculator should NOT be used as a primary method of contraception without proper training and medical guidance.</p>
          <p style={paragraphStyle}><strong>STI Protection Warning:</strong> Fertility awareness methods provide ZERO protection against sexually transmitted infections (STIs). If at risk for STIs, use barrier methods (condoms) consistently and correctly regardless of cycle timing.</p>
          <p style={paragraphStyle}><strong>Professional Consultation Required:</strong> Always seek the advice of your obstetrician-gynecologist, family planning specialist, or other qualified healthcare provider with any questions regarding contraception, fertility awareness, or reproductive health. Do not disregard professional medical advice or delay seeking it because of information provided by this calculator.</p>
          <p style={paragraphStyle}><strong>Learning Phase Requirements:</strong> Fertility awareness methods require 3-6 months of training with a certified instructor before reliable use. During learning phase, use backup contraception. Self-taught methods have significantly lower effectiveness rates.</p>
          <p style={paragraphStyle}><strong>Medical Condition Considerations:</strong> Women with irregular cycles, polycystic ovary syndrome (PCOS), thyroid disorders, or other medical conditions affecting ovulation should NOT rely on calendar-based methods. These conditions require specialized fertility awareness approaches or alternative contraception.</p>
          <p style={paragraphStyle}><strong>Emergency Contraception Awareness:</strong> If unprotected intercourse occurs during fertile window or if method failure is suspected, emergency contraception options are available. Consult a healthcare provider promptly for appropriate emergency contraception guidance.</p>
        </div>
      </section>

      {/* Sidebar with 3 Ads (3rd one sticky) */}
      {showSidebar && (
        <aside style={sidebarStyle}>
          <div style={sidebarContentStyle}>
            <div style={{ ...adSlotStyle, ...sidebarAdStyle }}>
              <p><i className="fas fa-ad"></i> Advertisement 1</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Sponsored Content</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Fertility awareness certification program</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>300px height ad slot</p>
            </div>
            
            <div style={{ ...adSlotStyle, ...sidebarAdStyle }}>
              <p><i className="fas fa-ad"></i> Advertisement 2</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Featured Product</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Advanced fertility tracking thermometer</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>300px height ad slot</p>
            </div>
            
            <div style={{ ...adSlotStyle, ...stickyAdStyle }}>
              <p><i className="fas fa-thumbtack"></i> Sticky Advertisement</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Premium Content - Stays visible</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Natural family planning comprehensive guide</p>
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