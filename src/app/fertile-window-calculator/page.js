"use client";

import { useState, useEffect } from 'react';

export default function FertileWindowCalculatorPage() {
  const [cycleLength, setCycleLength] = useState('');
  const [lastPeriodDate, setLastPeriodDate] = useState('');
  const [averageLutealPhase, setAverageLutealPhase] = useState('14');
  const [trackingMethod, setTrackingMethod] = useState('standard');
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

  const fertileWindowCardStyle = {
    borderTopColor: '#e74c3c'
  };

  const ovulationCardStyle = {
    borderTopColor: '#3498db'
  };

  const probabilityCardStyle = {
    borderTopColor: '#2ecc71'
  };

  const resultValueStyle = {
    fontSize: '2.5rem',
    fontWeight: '800',
    color: '#e74c3c',
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

  // Tracking methods
  const trackingMethods = [
    { id: 'standard', name: 'Standard Calendar', description: 'Based on cycle length and luteal phase' },
    { id: 'basal', name: 'Basal Body Temperature', description: 'Temperature shift detection method' },
    { id: 'cervical', name: 'Cervical Mucus', description: 'Fertility awareness method' },
    { id: 'opk', name: 'Ovulation Predictor Kits', description: 'LH surge detection' },
    { id: 'symptothermal', name: 'Symptothermal', description: 'Combined methods for highest accuracy' }
  ];

  // Sample data for demo
  useEffect(() => {
    const today = new Date();
    const lastPeriod = new Date(today);
    lastPeriod.setDate(today.getDate() - 28);
    setLastPeriodDate(lastPeriod.toISOString().split('T')[0]);
    setCycleLength('28');
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

  const calculateFertileWindow = () => {
    // Validate inputs
    if (!cycleLength || !lastPeriodDate) {
      alert('Please fill in cycle length and last period date.');
      return;
    }

    const cycleLengthVal = parseInt(cycleLength);
    const lutealPhaseVal = parseInt(averageLutealPhase) || 14;
    const lastPeriod = new Date(lastPeriodDate);

    if (cycleLengthVal < 21 || cycleLengthVal > 45) {
      alert('Cycle length should be between 21 and 45 days. Please consult a healthcare provider if your cycles are outside this range.');
      return;
    }

    if (lutealPhaseVal < 10 || lutealPhaseVal > 16) {
      alert('Luteal phase length should be between 10 and 16 days. Please consult a healthcare provider if your luteal phase is outside this range.');
      return;
    }

    // Calculate ovulation day (Cycle length - Luteal phase)
    const ovulationDay = cycleLengthVal - lutealPhaseVal;

    // Calculate fertile window (5 days before ovulation + ovulation day)
    const fertileStartDay = ovulationDay - 5;
    const fertileEndDay = ovulationDay;

    // Calculate dates
    const ovulationDate = new Date(lastPeriod);
    ovulationDate.setDate(lastPeriod.getDate() + ovulationDay);

    const fertileStartDate = new Date(lastPeriod);
    fertileStartDate.setDate(lastPeriod.getDate() + fertileStartDay);

    const fertileEndDate = new Date(lastPeriod);
    fertileEndDate.setDate(lastPeriod.getDate() + fertileEndDay);

    // Calculate next period date
    const nextPeriodDate = new Date(lastPeriod);
    nextPeriodDate.setDate(lastPeriod.getDate() + cycleLengthVal);

    // Calculate conception probability by day
    const conceptionProbabilities = [
      { day: ovulationDay - 5, probability: 10, description: 'Low probability' },
      { day: ovulationDay - 4, probability: 16, description: 'Moderate probability' },
      { day: ovulationDay - 3, probability: 27, description: 'High probability' },
      { day: ovulationDay - 2, probability: 33, description: 'Peak probability' },
      { day: ovulationDay - 1, probability: 42, description: 'Peak probability' },
      { day: ovulationDay, probability: 20, description: 'High probability' }
    ];

    // Determine fertility status
    const today = new Date();
    const cycleDay = Math.floor((today - lastPeriod) / (1000 * 60 * 60 * 24));
    
    let fertilityStatus = 'Low';
    let currentStatus = '';
    let recommendations = [];

    if (cycleDay >= fertileStartDay && cycleDay <= fertileEndDay) {
      fertilityStatus = 'High';
      currentStatus = 'You are currently in your fertile window';
      recommendations.push('Consider timing intercourse for optimal conception chances');
      recommendations.push('Use ovulation prediction kits to confirm ovulation timing');
      recommendations.push('Monitor cervical mucus changes for additional confirmation');
    } else if (cycleDay < fertileStartDay) {
      fertilityStatus = 'Low';
      currentStatus = 'You are currently in the follicular phase';
      recommendations.push('Continue regular intercourse 2-3 times per week');
      recommendations.push('Begin tracking basal body temperature if desired');
      recommendations.push('Maintain healthy lifestyle habits');
    } else {
      fertilityStatus = 'Low';
      currentStatus = 'You are currently in the luteal phase';
      recommendations.push('Avoid alcohol and limit caffeine intake');
      recommendations.push('Continue prenatal vitamins if trying to conceive');
      recommendations.push('Wait for next cycle to try again if not pregnant');
    }

    // Format dates for display
    const formatDate = (date) => {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      });
    };

    setResults({
      cycleLength: cycleLengthVal,
      lutealPhase: lutealPhaseVal,
      ovulationDay: ovulationDay,
      fertileStartDay: fertileStartDay,
      fertileEndDay: fertileEndDay,
      ovulationDate: formatDate(ovulationDate),
      fertileStartDate: formatDate(fertileStartDate),
      fertileEndDate: formatDate(fertileEndDate),
      nextPeriodDate: formatDate(nextPeriodDate),
      conceptionProbabilities: conceptionProbabilities,
      fertilityStatus: fertilityStatus,
      currentStatus: currentStatus,
      recommendations: recommendations,
      cycleDay: cycleDay,
      formula: `Ovulation Day = Cycle Length (${cycleLengthVal}) - Luteal Phase (${lutealPhaseVal}) = Day ${ovulationDay}`,
      trackingMethod: trackingMethods.find(m => m.id === trackingMethod)?.name || 'Standard Calendar'
    });
  };

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "What is the most accurate method to determine ovulation?",
      answer: "The most accurate methods combine multiple approaches: 1) Ovulation Predictor Kits (OPKs) detect LH surge 24-36 hours before ovulation, 2) Basal Body Temperature (BBT) tracking confirms ovulation after it occurs via temperature rise, 3) Cervical mucus monitoring identifies fertile-quality mucus, 4) Cervical position changes, and 5) Fertility tracking apps. Combining methods (symptothermal method) provides the highest accuracy. Ultrasound monitoring by a healthcare provider is the medical gold standard."
    },
    {
      question: "How long does sperm survive in the female reproductive tract?",
      answer: "Healthy sperm can survive up to 5 days in fertile cervical mucus, but typically survive 2-3 days. Survival depends on: 1) Quality of cervical mucus (most favorable around ovulation), 2) Sperm health and motility, 3) Vaginal environment pH. The egg survives only 12-24 hours after ovulation. Therefore, intercourse in the 5 days BEFORE ovulation provides the highest conception chances, with peak probability 1-2 days before ovulation."
    },
    {
      question: "What are common signs of ovulation?",
      answer: "Common ovulation signs include: 1) Changes in cervical mucus (clear, stretchy, egg-white consistency), 2) Mild pelvic pain or twinge (mittelschmerz), 3) Slight rise in basal body temperature (0.5-1°F) after ovulation, 4) Increased sex drive, 5) Breast tenderness, 6) Light spotting, 7) Abdominal bloating, 8) Heightened senses. Not all women experience all symptoms. Tracking multiple signs increases detection accuracy."
    },
    {
      question: "How do irregular cycles affect fertile window calculation?",
      answer: "Irregular cycles (variation >7-9 days between cycles) make prediction challenging. Methods for irregular cycles: 1) Track for 3-6 months to identify patterns, 2) Use OPKs starting earlier in cycle, 3) Monitor cervical mucus daily, 4) Consider longer fertile window (up to 10 days), 5) Consult fertility specialist if cycles consistently irregular. Common causes of irregularity include PCOS, thyroid disorders, stress, and perimenopause. Medical evaluation may be needed."
    },
    {
      question: "What lifestyle factors affect fertility and ovulation?",
      answer: "Key factors: 1) Weight (both underweight and overweight disrupt ovulation), 2) Stress (elevated cortisol affects hormone balance), 3) Exercise (excessive intense exercise can suppress ovulation), 4) Nutrition (adequate folate, iron, omega-3s), 5) Sleep (poor sleep affects reproductive hormones), 6) Alcohol and smoking (reduce fertility), 7) Caffeine (moderate intake is okay), 8) Environmental toxins. Optimizing these factors for 3-6 months before conception improves outcomes."
    }
  ];

  const healthCalculators = [
    { name: "Pregnancy Weight Gain", link: "/pregnancy-weight-gain" },
    { name: "Due Date Calculator", link: "/due-date-calculator" },
    { name: "BMI Calculator", link: "/bmi-calculator" },
    { name: "Nutritional Needs", link: "/nutritional-needs" },
    { name: "Body Surface Area", link: "/bsa-calculator" },
    { name: "Medication Dosage", link: "/medication-dosage" },
    { name: "Fluid Requirements", link: "/fluid-requirements" },
    { name: "Pregnancy Tests", link: "/pregnancy-test-calculator" }
  ];

  return (
    <main style={containerStyle}>
      <section style={calculatorBoxStyle}>
        <h1 style={calcTitleStyle}>
          <i className="fas fa-egg"></i> Fertile Window Calculator - Comprehensive Ovulation Prediction & Conception Optimization Protocol
        </h1>
        <p style={calcDescStyle}>
          Calculate <strong>precise fertile window predictions, ovulation timing, and optimal conception planning strategies</strong> based on <strong>menstrual cycle patterns, physiological indicators, and reproductive health parameters</strong>. Essential for <strong>fertility awareness, family planning optimization, and reproductive health management</strong>.
        </p>

        <div style={methodTabsStyle}>
          {trackingMethods.map(method => (
            <button
              key={method.id}
              style={{
                ...methodTabStyle,
                ...(trackingMethod === method.id ? activeMethodTabStyle : {})
              }}
              onClick={() => setTrackingMethod(method.id)}
            >
              {method.name}
            </button>
          ))}
        </div>

        <div style={inputGridStyle}>
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-calendar-alt"></i> Cycle Length (days)</label>
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
              Typical range: 21-45 days
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
            <label style={inputGroupLabelStyle}><i className="fas fa-clock"></i> Average Luteal Phase (days)</label>
            <input
              type="number"
              value={averageLutealPhase}
              onChange={(e) => setAverageLutealPhase(e.target.value)}
              placeholder="14"
              min="10"
              max="16"
              step="1"
              style={inputStyle}
            />
            <small style={{ color: '#666', fontSize: '0.8rem' }}>
              Typically 10-16 days (average 14)
            </small>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-chart-line"></i> Tracking Method</label>
            <select
              value={trackingMethod}
              onChange={(e) => setTrackingMethod(e.target.value)}
              style={selectStyle}
            >
              {trackingMethods.map(method => (
                <option key={method.id} value={method.id}>{method.name} - {method.description}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          style={calcBtnStyle}
          onClick={calculateFertileWindow}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, calcBtnHoverStyle)}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = calcBtnStyle.background;
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <i className="fas fa-calculator"></i> Calculate Fertile Window
        </button>

        {/* Results Display */}
        {results && (
          <div style={resultsContainerStyle}>
            <div style={{ ...resultCardStyle, ...fertileWindowCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-calendar-check"></i> Fertile Window</h4>
              <div style={{ margin: '20px 0' }}>
                <div style={resultValueStyle}>
                  {results.fertileStartDate} - {results.fertileEndDate}
                </div>
                <div style={{ fontSize: '1.2rem', color: '#666', marginBottom: '15px' }}>
                  6-Day Fertile Window
                </div>
                <div style={{ 
                  padding: '10px', 
                  background: results.fertilityStatus === 'High' ? '#d4edda' : '#fff3cd',
                  borderRadius: '8px',
                  color: results.fertilityStatus === 'High' ? '#155724' : '#856404',
                  fontWeight: '600'
                }}>
                  Current Status: {results.currentStatus}
                </div>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div>Cycle Day: {results.cycleDay} of {results.cycleLength}</div>
                <div>Fertile Days: Day {results.fertileStartDay} to Day {results.fertileEndDay}</div>
                <div>Tracking Method: {results.trackingMethod}</div>
              </div>
            </div>

            <div style={{ ...resultCardStyle, ...ovulationCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-bullseye"></i> Ovulation Details</h4>
              <div style={{ margin: '20px 0' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3498db', marginBottom: '10px' }}>
                  {results.ovulationDate}
                </div>
                <div style={{ fontSize: '1rem', color: '#666', marginBottom: '15px' }}>
                  Expected Ovulation Day
                </div>
                <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.9rem', marginBottom: '5px' }}><strong>Cycle Timeline:</strong></div>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>
                    • Follicular Phase: Day 1 - {results.ovulationDay - 1}<br/>
                    • Ovulation: Day {results.ovulationDay}<br/>
                    • Luteal Phase: Day {results.ovulationDay + 1} - {results.cycleLength}<br/>
                    • Next Period: {results.nextPeriodDate}
                  </div>
                </div>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div>Formula: {results.formula}</div>
                <div>Luteal Phase: {results.lutealPhase} days</div>
              </div>
            </div>

            <div style={{ ...resultCardStyle, ...probabilityCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-chart-bar"></i> Conception Probability</h4>
              <div style={{ margin: '20px 0' }}>
                <div style={{ marginBottom: '15px' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#2ecc71' }}>
                    Peak Probability: 42%
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>1-2 days before ovulation</div>
                </div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                  {results.conceptionProbabilities.map((prob, idx) => (
                    <div key={idx} style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      marginBottom: '8px',
                      padding: '8px',
                      background: idx >= 3 ? '#e8f5e9' : '#f8f9fa',
                      borderRadius: '4px'
                    }}>
                      <span>Day {prob.day}:</span>
                      <span><strong>{prob.probability}%</strong> ({prob.description})</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                {results.recommendations.map((rec, idx) => (
                  <div key={idx} style={{ marginBottom: '5px' }}>• {rec}</div>
                ))}
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
          <h3 style={sectionTitleStyle}><i className="fas fa-question-circle"></i> What is Fertile Window Calculation? Comprehensive Ovulation Prediction Methodology</h3>
          <p style={paragraphStyle}><strong>Fertile window calculation methodologies</strong> represent <strong>essential reproductive health protocols</strong> for determining <strong>optimal conception timing, precise ovulation prediction, and comprehensive fertility awareness strategies</strong>. These calculations integrate <strong>menstrual cycle patterns, physiological biomarkers, and reproductive endocrinology principles</strong> to provide <strong>personalized fertility management approaches</strong> that maximize <strong>conception success rates while supporting informed family planning decisions</strong> across diverse reproductive scenarios requiring <strong>precision ovulation monitoring protocols</strong>.</p>
          
          <h3 style={sectionTitleStyle}><i className="fas fa-calculator"></i> Fertile Window Calculation Methods - Comprehensive Ovulation Prediction Formulae</h3>
          <p style={paragraphStyle}>Multiple <strong>validated fertile window determination equations</strong> exist for <strong>comprehensive reproductive health management protocols</strong>, each demonstrating specific <strong>clinical applications and variable accuracy profiles</strong> influencing <strong>family planning optimization processes</strong>:</p>
          
          <div style={formulaBoxStyle}>
            <strong>Calendar/Rhythm Method Protocol:</strong> Basic calculation: Ovulation Day = Cycle Length - Luteal Phase Length<br/>
            <strong>Basal Body Temperature Methodology:</strong> Detection of post-ovulatory temperature rise (0.5-1°F increase)<br/>
            <strong>Cervical Mucus Monitoring:</strong> Identification of fertile-quality cervical mucus changes<br/>
            <strong>Ovulation Predictor Kit Algorithms:</strong> Detection of luteinizing hormone surge 24-36 hours pre-ovulation<br/>
            <strong>Symptothermal Combination Method:</strong> Integration of multiple fertility indicators for highest accuracy<br/>
            <strong>Clinical Method Selection Protocol:</strong> Calendar method recommended for <strong>regular cycle baseline assessment</strong>, symptothermal method for <strong>precision fertility awareness</strong>
          </div>

          <h3 style={sectionTitleStyle}><i className="fas fa-stethoscope"></i> Clinical Applications of Fertile Window Calculation - Comprehensive Reproductive Health Management Guidelines</h3>
          <p style={paragraphStyle}>Accurate <strong>fertile window calculation methodology implementation</strong> serves critical functions across multiple <strong>reproductive specialties and family planning management areas</strong> requiring <strong>precise ovulation timing</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Natural Family Planning Optimization:</strong> Essential for <strong>fertility awareness method implementation, contraception timing strategies, and reproductive autonomy enhancement</strong> optimizing <strong>informed family planning outcomes</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Fertility Treatment Coordination:</strong> Guides <strong>timed intercourse protocols, intrauterine insemination scheduling, and in vitro fertilization cycle synchronization</strong> in assisted reproduction</li>
            <li style={{ marginBottom: '10px' }}><strong>Polycystic Ovary Syndrome Management:</strong> Determines <strong>ovulation induction timing, menstrual cycle regulation, and metabolic parameter optimization</strong> in PCOS populations</li>
            <li style={{ marginBottom: '10px' }}><strong>Premenstrual Disorder Mitigation:</strong> Essential for <strong>symptom tracking correlation, hormonal intervention timing, and lifestyle modification planning</strong> in PMS/PMDD management</li>
            <li style={{ marginBottom: '10px' }}><strong>Perimenopausal Transition Monitoring:</strong> Accounts for <strong>cycle variability patterns, fertility preservation considerations, and hormonal change tracking</strong> in perimenopause</li>
            <li style={{ marginBottom: '10px' }}><strong>Postpartum Fertility Return Assessment:</strong> Manages <strong>lactational amenorrhea evaluation, menstrual cycle re-establishment, and postpartum contraception planning</strong> following childbirth</li>
            <li><strong>Endometriosis Fertility Optimization:</strong> Coordinates <strong>pain cycle correlation, surgical timing considerations, and fertility preservation strategies</strong> in endometriosis management</li>
          </ul>
          
          <h3 style={sectionTitleStyle}><i className="fas fa-balance-scale"></i> Factors Affecting Fertile Window Accuracy - Comprehensive Reproductive Assessment Considerations</h3>
          <p style={paragraphStyle}>Multiple <strong>significant physiological and pathological factors</strong> influence <strong>fertile window calculation accuracy parameters</strong> and require consideration for appropriate clinical interpretation:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Menstrual Cycle Regularity Variables:</strong> Cycle length variation, anovulatory cycles, and luteal phase defects significantly affect <strong>prediction algorithm reliability and timing accuracy</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Hormonal Fluctuation Impacts:</strong> Stress-induced cortisol elevation, thyroid dysfunction, and hyperprolactinemia dramatically alter <strong>ovulation timing and fertility biomarker patterns</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Age-Related Reproductive Changes:</strong> Declining ovarian reserve, reduced cycle regularity, and shortened luteal phase progressively affect <strong>fertile window predictability and conception probability</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Medication Effect Considerations:</strong> Hormonal contraceptives, fertility medications, and psychotropic drugs significantly influence <strong>cycle patterns and ovulation indicators</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Lifestyle Factor Modifications:</strong> Extreme exercise, significant weight changes, and sleep disruption patterns alter <strong>hormonal balance and reproductive function</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Underlying Medical Conditions:</strong> Polycystic ovary syndrome, endometriosis, and thyroid disorders create <strong>unique cycle patterns requiring specialized interpretation approaches</strong></li>
            <li><strong>Environmental Toxin Exposures:</strong> Endocrine disrupting chemicals, occupational hazards, and pollution exposure affect <strong>reproductive hormone function and cycle regularity</strong></li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-exclamation-triangle"></i> Limitations of Fertile Window Calculations - Advanced Reproductive Assessment Methodologies</h3>
          <p style={paragraphStyle}>While <strong>fertile window calculation methodologies</strong> provide valuable <strong>clinical starting points</strong>, specific clinical situations necessitate <strong>advanced assessment approaches</strong> and <strong>dynamic monitoring protocols</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Extreme Cycle Irregularity Scenarios:</strong> Polycystic ovary syndrome with prolonged amenorrhea, hypothalamic amenorrhea, and perimenopausal transition require <strong>individualized assessment beyond standard algorithms</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Assisted Reproduction Technology Contexts:</strong> Ovulation induction cycles, frozen embryo transfers, and donor egg cycles demonstrate <strong>medically controlled timing requiring specialized protocols</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Complex Medical Comorbidities:</strong> Combined endocrine-metabolic-reproductive disorders requiring <strong>integrated multidisciplinary management approaches</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Unexplained Infertility Situations:</strong> Normal parameters with conception failure requiring <strong>advanced diagnostic testing and intervention strategies</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Advanced Monitoring Requirement Situations:</strong> Recurrent pregnancy loss, advanced maternal age, and male factor infertility requiring <strong>comprehensive reproductive evaluation</strong></li>
            <li><strong>Alternative Assessment Methodologies:</strong> <strong>Transvaginal ultrasound monitoring, serial hormone testing, and endometrial receptivity analysis</strong> for advanced fertility assessment</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-history"></i> Historical Development of Fertility Awareness - Evolution of Reproductive Science</h3>
          <p style={paragraphStyle}>The progressive evolution of <strong>fertile window calculation methodologies</strong> reflects <strong>centuries of reproductive research advancement</strong> and <strong>clinical practice refinement trajectories</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Ancient Cultural Practices:</strong> Early recognition of <strong>menstrual cycle patterns and fertility indicators</strong> in traditional medicine systems worldwide</li>
            <li style={{ marginBottom: '10px' }}><strong>Early 20th Century Foundations:</strong> Development of <strong>basal body temperature tracking, cervical mucus observation, and calendar rhythm methods</strong> establishing modern fertility awareness principles</li>
            <li style={{ marginBottom: '10px' }}><strong>Mid-20th Century Standardization:</strong> Introduction of <strong>standardized charting systems, hormonal assay development, and reproductive endocrinology specialization</strong> revolutionizing fertility assessment</li>
            <li style={{ marginBottom: '10px' }}><strong>Late 20th Century Advances:</strong> Creation of <strong>ovulation predictor kits, ultrasound monitoring techniques, and assisted reproduction technologies</strong></li>
            <li><strong>21st Century Digital Revolution:</strong> Integration of <strong>fertility tracking apps, wearable monitoring devices, and artificial intelligence algorithms</strong> for optimal reproductive health management</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-user-md"></i> Practical Clinical Implementation Recommendations - Comprehensive Reproductive Health Management Guidelines</h3>
          <p style={paragraphStyle}>For optimal <strong>fertile window calculation implementation</strong> in contemporary clinical practice environments and <strong>evidence-based reproductive health protocols</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Comprehensive Cycle Assessment Protocol:</strong> Systematically evaluate <strong>menstrual history patterns, cycle regularity parameters, and fertility biomarker observations</strong> before calculation initiation</li>
            <li style={{ marginBottom: '10px' }}><strong>Multi-Method Validation Implementation:</strong> Utilize <strong>combined symptom tracking, serial hormone testing, and ultrasound confirmation</strong> rather than single method reliance</li>
            <li style={{ marginBottom: '10px' }}><strong>Individualized Education Procedures:</strong> Systematically provide <strong>method-specific training, charting technique instruction, and interpretation skill development</strong> for accurate self-monitoring</li>
            <li style={{ marginBottom: '10px' }}><strong>Clinical Context Integration Protocol:</strong> Develop <strong>personalized fertility management frameworks</strong> considering <strong>reproductive goals, medical history factors, and lifestyle considerations</strong> beyond numerical calculations alone</li>
            <li style={{ marginBottom: '10px' }}><strong>Multidisciplinary Care Enhancement:</strong> Coordinate fertility management with <strong>reproductive endocrinologists, fertility specialists, mental health professionals, and nutrition consultants</strong> for comprehensive reproductive care</li>
            <li><strong>Quality Improvement Integration:</strong> Implement <strong>fertility outcome tracking systems, patient education effectiveness measurement, and evidence-based protocol implementation</strong> for continuous optimization</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-chart-line"></i> Future Directions in Fertility Monitoring - Emerging Reproductive Technologies</h3>
          <p style={paragraphStyle}>Ongoing <strong>fertility monitoring research initiatives</strong> continue refining <strong>assessment approaches</strong> with promising technological developments and <strong>innovative monitoring methodologies</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Wearable Fertility Technologies:</strong> Smart basal thermometers, hormone tracking wearables, and continuous monitoring sensors for real-time fertility assessment</li>
            <li style={{ marginBottom: '10px' }}><strong>Artificial Intelligence Applications:</strong> Machine learning algorithm development for <strong>personalized ovulation prediction models</strong> incorporating multiple physiological variables</li>
            <li style={{ marginBottom: '10px' }}><strong>Mobile Health Integration:</strong> Advanced fertility tracking apps, telemedicine consultations, and digital reproductive health platforms for comprehensive management</li>
            <li style={{ marginBottom: '10px' }}><strong>Biomarker Discovery Advancements:</strong> Identification of <strong>novel fertility biomarkers, metabolic indicators, and genetic predictors</strong> for enhanced prediction accuracy</li>
            <li style={{ marginBottom: '10px' }}><strong>Home Testing Innovations:</strong> Advanced home hormone test kits, saliva-based ovulation predictors, and smartphone-connected fertility monitors</li>
            <li><strong>Personalized Medicine Approaches:</strong> Genomic profiling for <strong>individualized fertility optimization, pharmacogenetic testing, and personalized intervention timing</strong></li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-graduation-cap"></i> Educational Requirements and Professional Training Standards Implementation</h3>
          <p style={paragraphStyle}>Proper <strong>fertile window calculation methodology education</strong> represents an <strong>essential clinical competency requirement</strong> for <strong>healthcare professionals</strong> across multiple reproductive health disciplines. Comprehensive training curricula should systematically include <strong>reproductive physiology principles, calculation methodologies, fertility assessment techniques, and patient counseling strategies</strong>. Continuing medical education programs must consistently address <strong>evolving reproductive research findings, changing clinical practice standards, and emerging technological developments</strong> to ensure optimal patient care outcomes and evidence-based practice implementation.</p>

          <h3 style={sectionTitleStyle}><i className="fas fa-clipboard-check"></i> Quality Assurance and Protocol Standardization Implementation</h3>
          <p style={paragraphStyle}>Implementation of <strong>rigorous quality assurance protocols</strong> ensures <strong>consistent fertility monitoring practices</strong> across diverse healthcare settings. These protocols encompass <strong>calculation standardization methodologies, monitoring technique verification procedures, and clinical outcome measurement requirements</strong> that directly impact <strong>reproductive health outcomes</strong>. Professional organizations should develop <strong>standardized training materials, competency assessment tools, and practice guideline documents</strong> to guarantee consistent clinical application quality across diverse healthcare delivery settings and specialty practice areas.</p>
        </div>

        {/* Q&A Dropdown Section */}
        <div style={faqSectionStyle}>
          <h2 style={faqTitleStyle}><i className="fas fa-question-circle"></i> Frequently Asked Questions About Fertile Window Calculation</h2>
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
          <p style={paragraphStyle}><strong>This fertile window calculator provides estimates for educational and informational purposes only.</strong> The calculations are based on standard algorithms and should not be used as a substitute for professional medical advice, diagnosis, or treatment.</p>
          <p style={paragraphStyle}><strong>Family Planning Limitations:</strong> Fertile window calculations have inherent limitations and may not accurately reflect individual ovulation timing. Calendar methods are only 75-85% accurate for women with regular cycles and should not be relied upon for contraception without additional confirmation methods.</p>
          <p style={paragraphStyle}><strong>Medical Condition Considerations:</strong> Women with irregular cycles, polycystic ovary syndrome (PCOS), thyroid disorders, or other medical conditions affecting ovulation require specialized fertility assessment by qualified healthcare providers. Standard calculations may not be appropriate for these situations.</p>
          <p style={paragraphStyle}><strong>Professional Consultation Required:</strong> Always seek the advice of your obstetrician-gynecologist, reproductive endocrinologist, or other qualified healthcare provider with any questions regarding fertility, conception planning, or reproductive health. Do not disregard professional medical advice or delay seeking it because of information provided by this calculator.</p>
          <p style={paragraphStyle}><strong>Contraception Caution:</strong> This calculator should NOT be used as a primary method of contraception. The calendar/rhythm method has a typical use failure rate of 24% per year. If avoiding pregnancy, use medically approved contraceptive methods and consult with a healthcare provider about appropriate options.</p>
          <p style={paragraphStyle}><strong>Fertility Evaluation Timing:</strong> If under 35 and trying to conceive for 12+ months, or over 35 and trying for 6+ months without success, consult a fertility specialist regardless of calculated fertile windows. Early evaluation is important for identifying potential issues.</p>
          <p style={paragraphStyle}><strong>Holistic Reproductive Health:</strong> While timing is important for conception, overall reproductive health including nutrition, stress management, lifestyle factors, and medical conditions significantly impact fertility outcomes. Focus on comprehensive reproductive wellness rather than timing alone.</p>
        </div>
      </section>

      {/* Sidebar with 3 Ads (3rd one sticky) */}
      {showSidebar && (
        <aside style={sidebarStyle}>
          <div style={sidebarContentStyle}>
            <div style={{ ...adSlotStyle, ...sidebarAdStyle }}>
              <p><i className="fas fa-ad"></i> Advertisement 1</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Sponsored Content</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Fertility awareness education program</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>300px height ad slot</p>
            </div>
            
            <div style={{ ...adSlotStyle, ...sidebarAdStyle }}>
              <p><i className="fas fa-ad"></i> Advertisement 2</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Featured Product</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Advanced ovulation prediction kit</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>300px height ad slot</p>
            </div>
            
            <div style={{ ...adSlotStyle, ...stickyAdStyle }}>
              <p><i className="fas fa-thumbtack"></i> Sticky Advertisement</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Premium Content - Stays visible</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Comprehensive fertility optimization guide</p>
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