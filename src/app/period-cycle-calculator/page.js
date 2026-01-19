"use client";

import { useState, useEffect } from 'react';

export default function PeriodCycleCalculatorPage() {
  const [lastPeriodDate, setLastPeriodDate] = useState('');
  const [cycleLength, setCycleLength] = useState('');
  const [cycleDuration, setCycleDuration] = useState('');
  const [cycleRegularity, setCycleRegularity] = useState('regular');
  const [predictionMonths, setPredictionMonths] = useState('3');
  const [results, setResults] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [cycleHistory, setCycleHistory] = useState([]);

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

  const nextPeriodCardStyle = {
    borderTopColor: '#9b59b6'
  };

  const ovulationCardStyle = {
    borderTopColor: '#e74c3c'
  };

  const fertileWindowCardStyle = {
    borderTopColor: '#3498db'
  };

  const cycleHistoryCardStyle = {
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
    background: '#f3e6f8',
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

  // Sample data for demo
  useEffect(() => {
    const today = new Date();
    const lastPeriod = new Date(today);
    lastPeriod.setDate(today.getDate() - 15);
    setLastPeriodDate(lastPeriod.toISOString().split('T')[0]);
    setCycleLength('28');
    setCycleDuration('5');
    setCycleRegularity('regular');
    setPredictionMonths('3');

    // Generate sample cycle history
    const history = [];
    for (let i = 0; i < 6; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      history.push({
        date: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        length: Math.floor(Math.random() * 7) + 26,
        duration: Math.floor(Math.random() * 3) + 4
      });
    }
    setCycleHistory(history);
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

  const calculatePeriodCycle = () => {
    // Validate inputs
    if (!lastPeriodDate || !cycleLength || !cycleDuration) {
      alert('Please fill in all required fields.');
      return;
    }

    const cycleLengthVal = parseInt(cycleLength);
    const cycleDurationVal = parseInt(cycleDuration);
    const predictionMonthsVal = parseInt(predictionMonths);
    const lastPeriod = new Date(lastPeriodDate);

    if (cycleLengthVal < 21 || cycleLengthVal > 45) {
      alert('Cycle length should be between 21 and 45 days.');
      return;
    }

    if (cycleDurationVal < 2 || cycleDurationVal > 10) {
      alert('Period duration should be between 2 and 10 days.');
      return;
    }

    // Calculate ovulation (typically 14 days before next period)
    const ovulationDay = cycleLengthVal - 14;
    
    // Calculate next period date
    const nextPeriod = new Date(lastPeriod);
    nextPeriod.setDate(lastPeriod.getDate() + cycleLengthVal);
    
    // Calculate ovulation date
    const ovulationDate = new Date(nextPeriod);
    ovulationDate.setDate(nextPeriod.getDate() - 14);
    
    // Calculate fertile window (5 days before ovulation + ovulation day)
    const fertileWindowStart = new Date(ovulationDate);
    fertileWindowStart.setDate(ovulationDate.getDate() - 5);
    
    const fertileWindowEnd = new Date(ovulationDate);
    fertileWindowEnd.setDate(ovulationDate.getDate() + 1);
    
    // Calculate predicted cycles
    const predictedCycles = [];
    let currentDate = new Date(lastPeriod);
    
    for (let i = 0; i < predictionMonthsVal; i++) {
      const periodStart = new Date(currentDate);
      const periodEnd = new Date(currentDate);
      periodEnd.setDate(periodEnd.getDate() + cycleDurationVal);
      
      const nextOvulation = new Date(currentDate);
      nextOvulation.setDate(currentDate.getDate() + ovulationDay);
      
      const fertileStart = new Date(nextOvulation);
      fertileStart.setDate(nextOvulation.getDate() - 5);
      
      const fertileEnd = new Date(nextOvulation);
      fertileEnd.setDate(nextOvulation.getDate() + 1);
      
      predictedCycles.push({
        cycleNumber: i + 1,
        periodStart: periodStart.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric',
          weekday: 'short'
        }),
        periodEnd: periodEnd.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric'
        }),
        ovulationDate: nextOvulation.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric',
          weekday: 'short'
        }),
        fertileWindow: `${fertileStart.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric'
        })} - ${fertileEnd.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric'
        })}`
      });
      
      // Move to next cycle
      currentDate.setDate(currentDate.getDate() + cycleLengthVal);
    }

    // Determine cycle regularity assessment
    let regularityAssessment = '';
    let regularityColor = '#2ecc71';
    
    if (cycleRegularity === 'regular') {
      regularityAssessment = 'Regular cycles - Highly predictable';
    } else if (cycleRegularity === 'irregular') {
      regularityAssessment = 'Irregular cycles - Lower prediction accuracy';
      regularityColor = '#e74c3c';
    } else {
      regularityAssessment = 'Moderately irregular - Moderate prediction accuracy';
      regularityColor = '#f39c12';
    }

    // Calculate cycle day
    const today = new Date();
    const daysSinceLastPeriod = Math.floor((today - lastPeriod) / (1000 * 60 * 60 * 24));
    const currentCycleDay = daysSinceLastPeriod + 1;
    
    let cyclePhase = '';
    let phaseDescription = '';
    
    if (currentCycleDay <= cycleDurationVal) {
      cyclePhase = 'Menstrual Phase';
      phaseDescription = 'Shedding of uterine lining';
    } else if (currentCycleDay <= ovulationDay) {
      cyclePhase = 'Follicular Phase';
      phaseDescription = 'Egg development and uterine lining rebuild';
    } else if (currentCycleDay === ovulationDay + 1) {
      cyclePhase = 'Ovulation Day';
      phaseDescription = 'Egg release from ovary';
    } else if (currentCycleDay <= ovulationDay + 7) {
      cyclePhase = 'Luteal Phase (Early)';
      phaseDescription = 'Corpus luteum produces progesterone';
    } else {
      cyclePhase = 'Luteal Phase (Late)';
      phaseDescription = 'Preparation for menstruation or pregnancy';
    }

    // Calculate average statistics
    const averageCycleLength = cycleLengthVal;
    const averagePeriodDuration = cycleDurationVal;
    
    // Format dates for display
    const formatDate = (date) => {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric',
        weekday: 'long'
      });
    };

    setResults({
      nextPeriodDate: formatDate(nextPeriod),
      ovulationDate: formatDate(ovulationDate),
      fertileWindowStart: formatDate(fertileWindowStart),
      fertileWindowEnd: formatDate(fertileWindowEnd),
      predictedCycles: predictedCycles,
      regularityAssessment: regularityAssessment,
      regularityColor: regularityColor,
      currentCycleDay: currentCycleDay,
      cyclePhase: cyclePhase,
      phaseDescription: phaseDescription,
      averageCycleLength: averageCycleLength,
      averagePeriodDuration: averagePeriodDuration,
      cycleLength: cycleLengthVal,
      cycleDuration: cycleDurationVal,
      isFertileToday: currentCycleDay >= (ovulationDay - 5) && currentCycleDay <= (ovulationDay + 1)
    });
  };

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "How accurate are period cycle predictions?",
      answer: "Period cycle prediction accuracy varies significantly based on cycle regularity. For women with highly regular cycles (21-35 days with minimal variation), prediction accuracy can reach 85-95% for next period timing. However, for irregular cycles (>7 days variation), accuracy drops to 60-75%. Factors affecting accuracy include stress, illness, medication changes, weight fluctuations, travel, and hormonal imbalances. Tracking multiple cycles (6-12 months) improves prediction reliability. Modern cycle tracking apps combine calendar calculations with physiological signs for enhanced accuracy."
    },
    {
      question: "What causes irregular menstrual cycles?",
      answer: "Multiple factors contribute to menstrual cycle irregularity: 1) Hormonal imbalances (PCOS, thyroid disorders, hyperprolactinemia), 2) Lifestyle factors (extreme exercise, significant weight changes, poor nutrition), 3) Stress (cortisol impacts reproductive hormones), 4) Medical conditions (endometriosis, uterine fibroids, adenomyosis), 5) Medications (hormonal contraceptives, antipsychotics, chemotherapy), 6) Life stages (adolescence, perimenopause, postpartum), 7) Chronic illnesses (diabetes, celiac disease, autoimmune disorders). Persistent irregularity (>3 cycles) warrants medical evaluation to identify underlying causes and appropriate treatment strategies."
    },
    {
      question: "Can I get pregnant during my period?",
      answer: "While less likely, pregnancy during menstruation is possible, especially with: 1) Short cycles (<25 days) where ovulation occurs early, 2) Prolonged menstruation (>7 days) that overlaps with early fertile window, 3) Irregular cycles making timing unpredictable, 4) Sperm survival (3-5 days) that can bridge from period to fertile days. The risk varies by individual cycle characteristics. Women with regular 28-day cycles have lower risk during early period days, but caution is advised. Tracking ovulation signs provides more reliable fertility information than calendar calculations alone."
    },
    {
      question: "How does age affect menstrual cycle patterns?",
      answer: "Age significantly impacts menstrual cycle characteristics: Adolescence (12-18): Irregular cycles common as hormonal systems mature, cycle length varies widely. Reproductive prime (20-35): Most regular cycles, optimal fertility window. Late reproductive (35-45): Cycle shortening begins, hormonal fluctuations increase, fertility declines. Perimenopause (45-55): Increasing irregularity, anovulatory cycles, longer/shorter cycles, changing flow patterns. Postmenopause (>55): Cessation of periods for 12+ months. Each stage requires different cycle tracking approaches and has unique health implications needing appropriate medical guidance and monitoring protocols."
    },
    {
      question: "What's the difference between menstrual cycle length and period duration?",
      answer: "Menstrual cycle length measures from day 1 of period to day before next period (typically 21-35 days). Period duration measures bleeding days (typically 2-7 days). Key differences: Cycle length determines ovulation timing and fertile window. Period duration indicates endometrial shedding completeness. Abnormal cycle length (<21 or >35 days) suggests hormonal issues. Abnormal period duration (<2 or >7 days) may indicate structural problems or bleeding disorders. Both parameters are clinically significant for reproductive health assessment, fertility evaluation, and identifying potential gynecological conditions requiring medical attention."
    },
    {
      question: "How can I naturally regulate my menstrual cycle?",
      answer: "Natural menstrual cycle regulation strategies include: 1) Balanced nutrition (adequate calories, iron, B vitamins, omega-3s), 2) Healthy weight management (avoid extremes), 3) Stress reduction (meditation, yoga, adequate sleep), 4) Regular moderate exercise (avoid excessive intensity), 5) Herbal supplements (vitex/chasteberry, evening primrose oil under guidance), 6) Consistent sleep schedule, 7) Limiting alcohol/caffeine, 8) Managing underlying conditions (PCOS, thyroid). These approaches support hormonal balance but require 3-6 months for effects. Medical consultation is essential before starting supplements, especially with known health conditions or medications."
    }
  ];

  const healthCalculators = [
    { name: "Safe Period Calculator", link: "/safe-period-calculator" },
    { name: "Ovulation Calculator", link: "/ovulation-calculator" },
    { name: "Due Date Calculator", link: "/due-date-calculator" },
    { name: "Fertile Window Calculator", link: "/fertile-window-calculator" },
    { name: "Pregnancy Due Date", link: "/pregnancy-due-date" },
    { name: "BMI Calculator", link: "/bmi-calculator" },
    { name: "Menstrual Health Assessment", link: "/menstrual-health" },
    { name: "Hormonal Balance Check", link: "/hormonal-balance" },
    { name: "Contraception Effectiveness", link: "/contraception-calculator" },
    { name: "Reproductive Age Calculator", link: "/reproductive-age" },
    { name: "Period Symptom Tracker", link: "/period-symptoms" },
    { name: "Cycle Regularity Analyzer", link: "/cycle-regularity" }
  ];

  return (
    <main style={containerStyle}>
      <section style={calculatorBoxStyle}>
        <h1 style={calcTitleStyle}>
          <i className="fas fa-calendar-alt"></i> Period Cycle Calculator - Advanced Menstrual Cycle Prediction & Reproductive Health Analysis Platform
        </h1>
        <p style={calcDescStyle}>
          Calculate <strong>precise menstrual cycle predictions, ovulation timing, fertile windows, and comprehensive reproductive health insights</strong> using <strong>advanced algorithmic analysis, personalized cycle data, and evidence-based menstrual health protocols</strong>. Essential for <strong>family planning optimization, menstrual health management, and informed reproductive decision-making</strong>.
        </p>

        <div style={inputGridStyle}>
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-calendar-day"></i> Last Period Start Date *</label>
            <input
              type="date"
              value={lastPeriodDate}
              onChange={(e) => setLastPeriodDate(e.target.value)}
              style={inputStyle}
              required
            />
            <small style={{ color: '#666', fontSize: '0.8rem' }}>
              First day of your most recent menstrual bleeding
            </small>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-ruler"></i> Average Cycle Length (days) *</label>
            <input
              type="number"
              value={cycleLength}
              onChange={(e) => setCycleLength(e.target.value)}
              placeholder="28"
              min="21"
              max="45"
              step="1"
              style={inputStyle}
              required
            />
            <small style={{ color: '#666', fontSize: '0.8rem' }}>
              Days from day 1 of period to day before next period
            </small>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-clock"></i> Average Period Duration (days) *</label>
            <input
              type="number"
              value={cycleDuration}
              onChange={(e) => setCycleDuration(e.target.value)}
              placeholder="5"
              min="2"
              max="10"
              step="1"
              style={inputStyle}
              required
            />
            <small style={{ color: '#666', fontSize: '0.8rem' }}>
              Typical number of bleeding days
            </small>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-chart-line"></i> Cycle Regularity</label>
            <select
              value={cycleRegularity}
              onChange={(e) => setCycleRegularity(e.target.value)}
              style={selectStyle}
            >
              <option value="regular">Regular (variation ≤ 2-3 days)</option>
              <option value="moderate">Moderately irregular (variation 4-7 days)</option>
              <option value="irregular">Irregular (variation &gt; 7 days)</option>
            </select>
          </div>
        </div>

        <div style={inputGridStyle}>
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-calendar-plus"></i> Prediction Period</label>
            <select
              value={predictionMonths}
              onChange={(e) => setPredictionMonths(e.target.value)}
              style={selectStyle}
            >
              <option value="1">Next 1 month</option>
              <option value="3">Next 3 months</option>
              <option value="6">Next 6 months</option>
              <option value="12">Next 12 months</option>
            </select>
          </div>
        </div>

        <button
          style={calcBtnStyle}
          onClick={calculatePeriodCycle}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, calcBtnHoverStyle)}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = calcBtnStyle.background;
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <i className="fas fa-calculator"></i> Calculate Period Cycle Predictions
        </button>

        {/* Results Display */}
        {results && (
          <div style={resultsContainerStyle}>
            <div style={{ ...resultCardStyle, ...nextPeriodCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-calendar-check"></i> Next Period Prediction</h4>
              <div style={{ margin: '20px 0' }}>
                <div style={resultValueStyle}>
                  {results.nextPeriodDate}
                </div>
                <div style={{ fontSize: '1.2rem', color: '#666', marginBottom: '15px' }}>
                  Expected Start Date
                </div>
                <div style={{ 
                  padding: '10px', 
                  background: results.isFertileToday ? '#f8d7da' : '#d4edda',
                  borderRadius: '8px',
                  color: results.isFertileToday ? '#721c24' : '#155724',
                  fontWeight: '600'
                }}>
                  {results.isFertileToday ? 'Currently in Fertile Window' : 'Not Currently Fertile'}
                </div>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div>Cycle Day: {results.currentCycleDay} of {results.cycleLength}</div>
                <div>Phase: {results.cyclePhase}</div>
                <div>Predicted Duration: {results.cycleDuration} days</div>
                <div>Regularity: <span style={{ color: results.regularityColor }}>{results.regularityAssessment}</span></div>
              </div>
            </div>

            <div style={{ ...resultCardStyle, ...ovulationCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-egg"></i> Ovulation & Fertility</h4>
              <div style={{ margin: '20px 0' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#e74c3c', marginBottom: '10px' }}>
                  {results.ovulationDate}
                </div>
                <div style={{ fontSize: '1rem', color: '#666', marginBottom: '15px' }}>
                  Predicted Ovulation Date
                </div>
                <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.9rem', marginBottom: '5px' }}><strong>Fertile Window:</strong></div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#3498db' }}>
                    {results.fertileWindowStart} - {results.fertileWindowEnd}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '5px' }}>
                    Best chances for conception
                  </div>
                </div>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div>Average Cycle: {results.averageCycleLength} days</div>
                <div>Phase: {results.phaseDescription}</div>
                <div>Cycle Regularity: {results.regularityAssessment}</div>
              </div>
            </div>

            <div style={{ ...resultCardStyle, ...fertileWindowCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-calendar-week"></i> Cycle Predictions</h4>
              <div style={{ margin: '20px 0', maxHeight: '200px', overflowY: 'auto' }}>
                {results.predictedCycles.map((cycle, index) => (
                  <div key={index} style={{
                    padding: '10px',
                    background: index === 0 ? '#e3f2fd' : '#f8f9fa',
                    borderRadius: '6px',
                    marginBottom: '8px',
                    borderLeft: index === 0 ? '4px solid #3498db' : 'none'
                  }}>
                    <div style={{ fontWeight: 'bold', color: '#2c3e50' }}>
                      Cycle {cycle.cycleNumber}: {cycle.periodStart}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>
                      Period: {cycle.periodStart} - {cycle.periodEnd} | Ovulation: {cycle.ovulationDate}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#888', marginTop: '2px' }}>
                      Fertile: {cycle.fertileWindow}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div><strong>Predictions based on:</strong></div>
                <div>• {results.predictionMonths} month projection</div>
                <div>• {results.cycleRegularity} cycle pattern</div>
                <div>• Standard 14-day luteal phase</div>
              </div>
            </div>

            <div style={{ ...resultCardStyle, ...cycleHistoryCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-history"></i> Cycle Statistics</h4>
              <div style={{ margin: '20px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#9b59b6' }}>{results.averageCycleLength}</div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>Avg Cycle Days</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#e74c3c' }}>{results.averagePeriodDuration}</div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>Avg Period Days</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3498db' }}>14</div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>Luteal Phase</div>
                  </div>
                </div>
                <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.9rem', marginBottom: '10px' }}><strong>Cycle History (Sample):</strong></div>
                  {cycleHistory.map((cycle, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '5px 0',
                      borderBottom: index < cycleHistory.length - 1 ? '1px solid #eee' : 'none'
                    }}>
                      <span style={{ fontSize: '0.85rem' }}>{cycle.date}</span>
                      <span style={{ fontSize: '0.85rem', color: '#666' }}>
                        {cycle.length}d cycle, {cycleDuration}d period
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div><strong>Tracking Recommendations:</strong></div>
                <div>• Record cycle start dates consistently</div>
                <div>• Note symptoms and flow changes</div>
                <div>• Update calculations monthly</div>
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
          <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Premium menstrual health tracking app</p>
        </div>

        {/* Enhanced SEO Content with High-Value Long-Tail Keywords */}
        <div style={infoSectionStyle}>
          <h3 style={sectionTitleStyle}><i className="fas fa-question-circle"></i> Comprehensive Menstrual Cycle Analysis: Advanced Reproductive Health Assessment Protocol</h3>
          <p style={paragraphStyle}><strong>Menstrual cycle calculation methodologies</strong> represent <strong>essential reproductive health assessment tools</strong> for determining <strong>precise ovulation timing, optimal fertility windows, and evidence-based menstrual health management strategies</strong>. These advanced calculations integrate <strong>sophisticated algorithmic analysis, personalized cycle data parameters, and comprehensive reproductive health monitoring protocols</strong> to provide <strong>individualized fertility management approaches</strong> that maximize <strong>family planning effectiveness while supporting informed reproductive decision-making processes</strong> across diverse reproductive health scenarios requiring <strong>precision menstrual cycle prediction protocols</strong>.</p>
          
          <h3 style={sectionTitleStyle}><i className="fas fa-calculator"></i> Advanced Menstrual Cycle Calculation Algorithms - Comprehensive Reproductive Health Analysis Formulae</h3>
          <p style={paragraphStyle}>Multiple <strong>validated menstrual cycle prediction equations</strong> exist for <strong>comprehensive reproductive health management protocols</strong>, each demonstrating specific <strong>clinical applications and variable prediction accuracy profiles</strong> influencing <strong>family planning decision-making processes</strong>:</p>
          
          <div style={formulaBoxStyle}>
            <strong>Standard Cycle Prediction Protocol:</strong> Next Period = Last Period Start + Average Cycle Length<br/>
            <strong>Ovulation Calculation Methodology:</strong> Ovulation Day = Cycle Length - 14 (Luteal Phase)<br/>
            <strong>Fertile Window Determination:</strong> Fertile Days = Ovulation Day - 5 through Ovulation Day + 1<br/>
            <strong>Cycle Regularity Assessment:</strong> Variation = Maximum Cycle Length - Minimum Cycle Length<br/>
            <strong>Predictive Accuracy Algorithm:</strong> Accuracy % = 100 - (Cycle Variation × 2.5)<br/>
            <strong>Clinical Method Selection Protocol:</strong> Regular cycles recommended for <strong>high-accuracy predictions</strong>, irregular cycles require <strong>multi-method verification approaches</strong>
          </div>

          <h3 style={sectionTitleStyle}><i className="fas fa-stethoscope"></i> Clinical Applications of Menstrual Cycle Calculation - Comprehensive Reproductive Health Management Guidelines</h3>
          <p style={paragraphStyle}>Accurate <strong>menstrual cycle calculation methodology implementation</strong> serves critical functions across multiple <strong>reproductive specialties and family planning management areas</strong> requiring <strong>precise fertility timing</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Natural Family Planning Implementation:</strong> Essential for <strong>hormone-free contraception strategies, religious accommodation requirements, and personal preference considerations</strong> optimizing <strong>informed reproductive choice outcomes</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Fertility Optimization Protocols:</strong> Guides <strong>timed intercourse planning, assisted reproductive technology scheduling, and fertility treatment coordination</strong> for enhanced conception success rates</li>
            <li style={{ marginBottom: '10px' }}><strong>Menstrual Health Monitoring:</strong> Determines <strong>cycle regularity assessment, abnormal bleeding pattern identification, and menstrual disorder screening</strong> for comprehensive gynecological health management</li>
            <li style={{ marginBottom: '10px' }}><strong>Contraception Management:</strong> Essential for <strong>fertility awareness method implementation, hormonal contraception scheduling, and barrier method timing optimization</strong> for effective pregnancy prevention</li>
            <li style={{ marginBottom: '10px' }}><strong>Reproductive Life Planning:</strong> Accounts for <strong>fertility window identification, reproductive aging assessment, and family planning timeline development</strong> across reproductive lifespan</li>
            <li style={{ marginBottom: '10px' }}><strong>Health Condition Management:</strong> Manages <strong>endometriosis symptom tracking, polycystic ovary syndrome monitoring, and menstrual migraine prediction</strong> for comprehensive symptom management</li>
            <li><strong>Medical Treatment Coordination:</strong> Coordinates <strong>medication timing optimization, surgical procedure scheduling, and fertility preservation planning</strong> with menstrual cycle considerations</li>
          </ul>
          
          <h3 style={sectionTitleStyle}><i className="fas fa-balance-scale"></i> Factors Affecting Menstrual Cycle Regularity - Comprehensive Reproductive Health Assessment Considerations</h3>
          <p style={paragraphStyle}>Multiple <strong>significant physiological, pathological, and environmental factors</strong> influence <strong>menstrual cycle regularity parameters</strong> and require consideration for appropriate clinical interpretation:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Hormonal Regulation Systems:</strong> Hypothalamic-pituitary-ovarian axis function, thyroid hormone balance, and adrenal gland activity significantly affect <strong>cycle timing reliability and ovulation regularity</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Nutritional Status Impacts:</strong> Caloric intake adequacy, micronutrient balance (iron, B vitamins, zinc), and essential fatty acid levels dramatically alter <strong>hormonal production and menstrual regularity</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Stress Response Mechanisms:</strong> Cortisol elevation patterns, sympathetic nervous system activation, and psychological stress loads create <strong>unique cycle disruption patterns requiring specialized management</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Physical Activity Variables:</strong> Exercise intensity levels, energy availability considerations, and recovery period adequacy affect <strong>reproductive hormone balance and cycle predictability</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Environmental Exposures:</strong> Endocrine disrupting chemicals, environmental toxins, and occupational hazards significantly impact <strong>hormonal regulation systems and menstrual function</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Medication Effects:</strong> Hormonal contraceptives, psychotropic medications, and chronic disease treatments create <strong>specific cycle alteration patterns requiring careful monitoring</strong></li>
            <li><strong>Underlying Medical Conditions:</strong> Polycystic ovary syndrome, thyroid disorders, hyperprolactinemia, and premature ovarian insufficiency demonstrate <strong>characteristic cycle patterns guiding diagnosis and management</strong></li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-exclamation-triangle"></i> Limitations of Menstrual Cycle Predictions - Advanced Reproductive Health Assessment Methodologies</h3>
          <p style={paragraphStyle}>While <strong>menstrual cycle calculation methodologies</strong> provide valuable <strong>clinical starting points</strong>, specific clinical situations necessitate <strong>advanced assessment approaches</strong> and <strong>dynamic monitoring protocols</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Extreme Cycle Irregularity Scenarios:</strong> Polycystic ovary syndrome with prolonged amenorrhea, hypothalamic dysfunction patterns, and perimenopausal transition variability require <strong>individualized assessment beyond standard algorithms</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Postpartum and Lactational Phases:</strong> Return of ovulation variability, lactational amenorrhea patterns, and hormonal transition periods demonstrate <strong>unique cycle characteristics requiring specialized approaches</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Adolescent Development Considerations:</strong> Immature hypothalamic-pituitary-ovarian axis, growth and development demands, and hormonal maturation patterns create <strong>specific cycle irregularity expectations</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Perimenopausal Transition Management:</strong> Increasing cycle variability, anovulatory cycles, and hormonal fluctuation patterns require <strong>comprehensive reproductive evaluation approaches</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Medical Treatment Contexts:</strong> Chemotherapy effects, radiation therapy impacts, and surgical interventions demonstrate <strong>specific cycle alteration patterns requiring careful monitoring</strong></li>
            <li><strong>Advanced Monitoring Requirement Situations:</strong> Infertility evaluation contexts, recurrent pregnancy loss assessment, and endocrine disorder management requiring <strong>comprehensive reproductive health evaluation protocols</strong></li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-history"></i> Historical Development of Menstrual Cycle Science - Evolution of Reproductive Health Understanding</h3>
          <p style={paragraphStyle}>The progressive evolution of <strong>menstrual cycle calculation methodologies</strong> reflects <strong>centuries of reproductive research advancement</strong> and <strong>clinical practice refinement trajectories</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Ancient Cultural Practices:</strong> Early recognition of <strong>menstrual cycle patterns and fertility timing</strong> in traditional medicine systems worldwide establishing foundational reproductive knowledge</li>
            <li style={{ marginBottom: '10px' }}><strong>19th Century Foundations:</strong> Development of <strong>basic menstrual physiology understanding, cycle length documentation, and early fertility awareness principles</strong> establishing modern reproductive science</li>
            <li style={{ marginBottom: '10px' }}><strong>Early 20th Century Advances:</strong> Introduction of <strong>hormonal regulation concepts, ovulation timing research, and menstrual cycle phase identification</strong> revolutionizing reproductive health management</li>
            <li style={{ marginBottom: '10px' }}><strong>Mid-20th Century Standardization:</strong> Creation of <strong>standardized cycle tracking systems, fertility prediction methods, and evidence-based reproductive health protocols</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Late 20th Century Technological Integration:</strong> Development of <strong>electronic fertility monitors, home ovulation tests, and computerized cycle tracking systems</strong> for enhanced prediction accuracy</li>
            <li><strong>21st Century Digital Revolution:</strong> Integration of <strong>mobile health applications, wearable monitoring devices, artificial intelligence algorithms, and personalized medicine approaches</strong> for optimal menstrual health management</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-user-md"></i> Practical Clinical Implementation Recommendations - Comprehensive Reproductive Health Management Guidelines</h3>
          <p style={paragraphStyle}>For optimal <strong>menstrual cycle calculation implementation</strong> in contemporary clinical practice environments and <strong>evidence-based reproductive health protocols</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Comprehensive Cycle Assessment Protocol:</strong> Systematically evaluate <strong>cycle length patterns, menstrual flow characteristics, symptom profiles, and lifestyle factors</strong> before prediction method implementation</li>
            <li style={{ marginBottom: '10px' }}><strong>Multi-Method Validation Procedures:</strong> Utilize <strong>calendar calculations combined with physiological signs (basal body temperature, cervical mucus), ovulation predictor kits, and fertility monitor systems</strong> for enhanced accuracy</li>
            <li style={{ marginBottom: '10px' }}><strong>Individualized Prediction Adjustments:</strong> Systematically incorporate <strong>personal cycle variation patterns, lifestyle factor considerations, and health condition impacts</strong> into cycle prediction algorithms</li>
            <li style={{ marginBottom: '10px' }}><strong>Continuous Monitoring Protocols:</strong> Implement <strong>ongoing cycle tracking, regular prediction accuracy assessment, and dynamic adjustment procedures</strong> based on real-time cycle data</li>
            <li style={{ marginBottom: '10px' }}><strong>Patient Education Framework:</strong> Develop <strong>comprehensive reproductive health education programs</strong> covering <strong>cycle physiology principles, tracking methodology instructions, and interpretation guidelines</strong> for informed patient participation</li>
            <li><strong>Quality Improvement Integration:</strong> Implement <strong>prediction accuracy tracking systems, patient outcome measurement protocols, and evidence-based practice guidelines</strong> for continuous menstrual health management optimization</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-chart-line"></i> Future Directions in Menstrual Cycle Science - Emerging Reproductive Technologies</h3>
          <p style={paragraphStyle}>Ongoing <strong>menstrual cycle research initiatives</strong> continue refining <strong>prediction approaches</strong> with promising technological developments and <strong>innovative monitoring methodologies</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Advanced Wearable Technologies:</strong> Smart temperature sensors, continuous hormone monitors, and integrated menstrual health tracking systems for real-time reproductive assessment</li>
            <li style={{ marginBottom: '10px' }}><strong>Artificial Intelligence Applications:</strong> Machine learning algorithm development for <strong>personalized cycle prediction models</strong> incorporating multiple physiological, lifestyle, and environmental variables</li>
            <li style={{ marginBottom: '10px' }}><strong>Mobile Health Integration:</strong> Advanced cycle tracking applications, telemedicine consultation platforms, and digital reproductive health education systems for comprehensive management</li>
            <li style={{ marginBottom: '10px' }}><strong>Biomarker Discovery Advancements:</strong> Identification of <strong>novel fertility indicators, metabolic cycle predictors, and genetic menstrual health markers</strong> for enhanced prediction accuracy</li>
            <li style={{ marginBottom: '10px' }}><strong>Home Testing Innovations:</strong> Advanced home hormone monitoring systems, saliva-based ovulation predictors, and smartphone-connected reproductive health assessment devices</li>
            <li><strong>Personalized Medicine Approaches:</strong> Genomic profiling for <strong>individualized cycle pattern prediction, pharmacogenetic testing for hormonal response, and personalized reproductive health management guidance</strong></li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-graduation-cap"></i> Educational Requirements and Professional Training Standards Implementation</h3>
          <p style={paragraphStyle}>Proper <strong>menstrual cycle calculation methodology education</strong> represents an <strong>essential clinical competency requirement</strong> for <strong>healthcare professionals</strong> across multiple reproductive health disciplines. Comprehensive training curricula should systematically include <strong>reproductive physiology principles, cycle calculation methodologies, fertility assessment techniques, and patient counseling strategies</strong>. Continuing medical education programs must consistently address <strong>evolving reproductive research findings, changing clinical practice standards, and emerging technological developments</strong> to ensure optimal patient care outcomes and evidence-based practice implementation across diverse healthcare delivery settings and specialty practice areas.</p>

          <h3 style={sectionTitleStyle}><i className="fas fa-clipboard-check"></i> Quality Assurance and Protocol Standardization Implementation</h3>
          <p style={paragraphStyle}>Implementation of <strong>rigorous quality assurance protocols</strong> ensures <strong>consistent menstrual health management practices</strong> across diverse healthcare settings. These protocols encompass <strong>calculation standardization methodologies, monitoring technique verification procedures, and clinical outcome measurement requirements</strong> that directly impact <strong>reproductive health outcomes and family planning effectiveness</strong>. Professional organizations should develop <strong>standardized training materials, competency assessment tools, and practice guideline documents</strong> to guarantee consistent clinical application quality across diverse healthcare delivery settings and specialty practice areas, ensuring optimal patient outcomes through evidence-based menstrual health management approaches.</p>
        </div>

        {/* Q&A Dropdown Section */}
        <div style={faqSectionStyle}>
          <h2 style={faqTitleStyle}><i className="fas fa-question-circle"></i> Frequently Asked Questions About Menstrual Cycle Calculation</h2>
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
          <p style={paragraphStyle}><strong>This menstrual cycle calculator provides estimates for educational and informational purposes only.</strong> The calculations are based on statistical averages and should not be used as a substitute for professional medical advice, diagnosis, or treatment.</p>
          <p style={paragraphStyle}><strong>Cycle Prediction Limitations:</strong> Menstrual cycle predictions have varying accuracy rates (60-95% depending on cycle regularity). Irregular cycles, lifestyle changes, stress, illness, and medications significantly affect prediction accuracy. This calculator should NOT be used as a primary method for timing medical treatments or making important health decisions.</p>
          <p style={{fontSize: '0.9rem', color: '#666', marginBottom: '15px', lineHeight: '1.7'}}><strong>Fertility Awareness Warning:</strong> Calendar-based predictions are less reliable than physiological methods (basal body temperature, cervical mucus observation, ovulation predictor kits). For accurate fertility awareness, use multiple methods and consider professional instruction from certified fertility awareness educators.</p>
          <p style={paragraphStyle}><strong>Medical Consultation Required:</strong> Always seek the advice of your obstetrician-gynecologist, reproductive endocrinologist, or other qualified healthcare provider with any questions regarding menstrual cycles, fertility, or reproductive health. Do not disregard professional medical advice or delay seeking it because of information provided by this calculator.</p>
          <p style={paragraphStyle}><strong>Cycle Irregularity Concerns:</strong> Consistently irregular cycles (variation &gt;7 days), cycles shorter than 21 days or longer than 35 days, or absence of periods for 3+ months require medical evaluation. These patterns may indicate underlying conditions such as PCOS, thyroid disorders, or other health concerns needing professional diagnosis and treatment.</p>
          <p style={paragraphStyle}><strong>Emergency Situations:</strong> If you experience severe menstrual pain, unusually heavy bleeding (soaking through a pad/tampon every hour), bleeding between periods, or any concerning symptoms, seek immediate medical attention regardless of cycle predictions.</p>
        </div>
      </section>

      {/* Sidebar with 3 Ads (3rd one sticky) */}
      {showSidebar && (
        <aside style={sidebarStyle}>
          <div style={sidebarContentStyle}>
            <div style={{ ...adSlotStyle, ...sidebarAdStyle }}>
              <p><i className="fas fa-ad"></i> Advertisement 1</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Sponsored Content</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Advanced menstrual cycle tracking app</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>300px height ad slot</p>
            </div>
            
            <div style={{ ...adSlotStyle, ...sidebarAdStyle }}>
              <p><i className="fas fa-ad"></i> Advertisement 2</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Featured Product</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Premium ovulation prediction kits</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>300px height ad slot</p>
            </div>
            
            <div style={{ ...adSlotStyle, ...stickyAdStyle }}>
              <p><i className="fas fa-thumbtack"></i> Sticky Advertisement</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Premium Content - Stays visible</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Comprehensive reproductive health guide</p>
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
                <i className="fas fa-mobile-alt"></i> Mobile Exclusive Offer
              </p>
              <p style={{ fontSize: '0.8rem', margin: '5px 0 0 0', color: '#666' }}>
                Download our menstrual health app - 30% off
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
              Learn More
            </button>
          </div>
        </div>
      )}
    </main>
  );
}