// src/app/pregnancy/page.js
"use client"; // This is required for interactivity

import { useState, useEffect } from 'react';

export default function PregnancyPage() {
  const [calculationMethod, setCalculationMethod] = useState('lmp');
  const [lastPeriod, setLastPeriod] = useState('');
  const [conceptionDate, setConceptionDate] = useState('');
  const [crlMeasurement, setCrlMeasurement] = useState('');
  const [cycleLength, setCycleLength] = useState('28');
  const [results, setResults] = useState(null);
  const [timelinePosition, setTimelinePosition] = useState(0);

  // Set default date on component mount
  useEffect(() => {
    const sampleDate = new Date();
    sampleDate.setDate(sampleDate.getDate() - 56);
    setLastPeriod(sampleDate.toISOString().split('T')[0]);
  }, []);

  // Handle Enter key press
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        calculateDueDate();
      }
    };

    document.addEventListener('keypress', handleKeyPress);
    return () => document.removeEventListener('keypress', handleKeyPress);
  });

  const selectMethod = (method) => {
    setCalculationMethod(method);
    setResults(null);
  };

  const calculateDueDate = () => {
    const today = new Date();
    const cycleLengthNum = parseInt(cycleLength) || 28;
    
    let lmpDate, dueDate, conceptionDateCalc;

    // Validate inputs based on selected method
    switch(calculationMethod) {
      case 'lmp':
        if (!lastPeriod) {
          alert("Please select the date of your last menstrual period.");
          return;
        }
        lmpDate = new Date(lastPeriod);
        if (lmpDate > today) {
          alert("Last period date cannot be in the future.");
          return;
        }
        
        // Calculate due date using Naegele's Rule with adjustable cycle length
        dueDate = new Date(lmpDate);
        dueDate.setDate(lmpDate.getDate() + 280 + (cycleLengthNum - 28));
        
        // Estimate conception date (ovulation typically around day 14 of cycle)
        conceptionDateCalc = new Date(lmpDate);
        conceptionDateCalc.setDate(lmpDate.getDate() + 14);
        break;
        
      case 'conception':
        if (!conceptionDate) {
          alert("Please select the estimated conception date.");
          return;
        }
        const conceptionInput = new Date(conceptionDate);
        if (conceptionInput > today) {
          alert("Conception date cannot be in the future.");
          return;
        }
        
        // Due date = conception date + 266 days
        dueDate = new Date(conceptionInput);
        dueDate.setDate(conceptionInput.getDate() + 266);
        
        // Estimate LMP (conception - 14 days)
        lmpDate = new Date(conceptionInput);
        lmpDate.setDate(conceptionInput.getDate() - 14);
        conceptionDateCalc = new Date(conceptionInput);
        break;
        
      case 'ultrasound':
        const crl = parseFloat(crlMeasurement);
        if (!crl || crl <= 0) {
          alert("Please enter a valid CRL measurement in millimeters.");
          return;
        }
        
        // Estimate gestational age from CRL (simplified formula)
        const gestationalDays = crl * 0.65 + 42;
        
        // Ultrasound date is assumed to be today for this calculation
        const ultrasoundDate = new Date();
        
        // Due date = ultrasound date + (280 - gestational age in days)
        dueDate = new Date(ultrasoundDate);
        dueDate.setDate(ultrasoundDate.getDate() + (280 - gestationalDays));
        
        // Estimate LMP (due date - 280 days)
        lmpDate = new Date(dueDate);
        lmpDate.setDate(dueDate.getDate() - 280);
        
        // Estimate conception (LMP + 14 days)
        conceptionDateCalc = new Date(lmpDate);
        conceptionDateCalc.setDate(lmpDate.getDate() + 14);
        break;
        
      default:
        alert("Please select a calculation method.");
        return;
    }

    // Calculate weeks pregnant
    const diffTime = Math.abs(today - lmpDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffDays / 7);
    const daysRemaining = Math.max(0, Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24)));
    
    // Determine trimester
    let trimester = "";
    if (weeks <= 12) trimester = "First Trimester";
    else if (weeks <= 26) trimester = "Second Trimester";
    else trimester = "Third Trimester";
    
    // Estimate conception week
    const conceptionWeek = Math.floor((conceptionDateCalc - lmpDate) / (1000 * 60 * 60 * 24 * 7)) + 1;
    
    // Calculate timeline position
    let position = 0;
    if (weeks <= 12) {
      position = (weeks / 12) * 25;
    } else if (weeks <= 26) {
      position = 25 + ((weeks - 12) / 14) * 37.5;
    } else if (weeks <= 40) {
      position = 62.5 + ((weeks - 26) / 14) * 37.5;
    } else {
      position = 100;
    }
    
    setTimelinePosition(position);

    const longOptions = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    const methodNames = {
      'lmp': 'last menstrual period',
      'conception': 'conception date',
      'ultrasound': 'ultrasound dating'
    };

    const nextAppointmentWeek = weeks + 4 > 40 ? 40 : weeks + 4;

    setResults({
      dueDate: dueDate.toLocaleDateString(undefined, longOptions),
      methodUsed: methodNames[calculationMethod],
      weeks: weeks,
      trimester: trimester,
      daysLeft: daysRemaining,
      conceptionWeek: `Week ${conceptionWeek}`,
      nextAppointmentWeek: nextAppointmentWeek
    });
  };

  return (
    <>
      <style jsx>{`
        /* Base & Reset */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f8f9fa;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 30px;
        }

        /* Calculator Box */
        .calculator-box {
          background: white;
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.05);
          width: 100%;
        }

        .calc-title { 
          margin-bottom: 10px; 
          color: #2c3e50; 
          font-size: clamp(1.8rem, 4vw, 2.2rem);
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .calc-desc { 
          margin-bottom: 25px; 
          font-size: clamp(0.95rem, 2vw, 1rem); 
          color: #666; 
          line-height: 1.6;
        }
        
        /* Input Groups */
        .pregnancy-inputs {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }

        .input-group { 
          margin-bottom: 20px; 
        }
        
        .input-group label { 
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600; 
          margin-bottom: 8px; 
          color: #34495e; 
          font-size: 0.95rem;
        }
        
        .input-group input { 
          width: 100%; 
          padding: 14px 16px; 
          border: 2px solid #dfe6e9; 
          border-radius: 10px; 
          font-size: 1rem; 
          outline: none; 
          transition: all 0.3s;
        }
        
        .input-group input:focus { 
          border-color: #9b59b6; 
          box-shadow: 0 0 0 3px rgba(155, 89, 182, 0.1);
        }

        /* Method Selection */
        .method-options {
          margin: 20px 0;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 10px;
        }

        .method-tabs {
          display: flex;
          gap: 10px;
          margin-top: 15px;
          flex-wrap: wrap;
        }

        .method-tab {
          padding: 10px 20px;
          background: #e9ecef;
          border: 2px solid #dee2e6;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .method-tab.selected {
          background: #9b59b6;
          color: white;
          border-color: #9b59b6;
        }

        .calc-btn { 
          width: 100%; 
          padding: 16px; 
          background: #9b59b6; 
          color: white; 
          border: none; 
          border-radius: 10px; 
          font-size: 1.1rem; 
          font-weight: bold; 
          cursor: pointer; 
          transition: 0.3s; 
          margin: 15px 0 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        
        .calc-btn:hover { 
          background: #8e44ad; 
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(155, 89, 182, 0.2);
        }

        /* Results Section */
        .results-box { 
          margin: 30px 0; 
          padding: 25px; 
          background: linear-gradient(135deg, #f4eef8 0%, #f0e6f6 100%);
          border-radius: 12px; 
          border-left: 5px solid #9b59b6;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          display: ${results ? 'block' : 'none'};
        }
        
        .due-date-display { 
          font-size: clamp(2rem, 6vw, 2.8rem); 
          font-weight: 800; 
          display: block; 
          margin: 15px 0; 
          color: #8e44ad; 
        }

        /* Progress Cards */
        .progress-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          margin: 25px 0;
        }

        .progress-card {
          padding: 20px;
          background: white;
          border-radius: 10px;
          text-align: center;
          box-shadow: 0 3px 10px rgba(0,0,0,0.05);
          transition: transform 0.3s;
        }

        .progress-card:hover {
          transform: translateY(-3px);
        }

        .progress-card.weeks {
          border-left: 5px solid #9b59b6;
        }

        .progress-card.trimester {
          border-left: 5px solid #3498db;
        }

        .progress-card.days {
          border-left: 5px solid #2ecc71;
        }

        .progress-card.conception {
          border-left: 5px solid #e74c3c;
        }

        .progress-value {
          font-size: 2rem;
          font-weight: bold;
          margin: 10px 0;
          display: block;
        }

        .weeks-value { color: #9b59b6; }
        .trimester-value { color: #3498db; }
        .days-value { color: #2ecc71; }
        .conception-value { color: #e74c3c; }

        /* Pregnancy Timeline */
        .pregnancy-timeline {
          margin: 30px 0;
          padding: 20px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 3px 10px rgba(0,0,0,0.05);
        }

        .timeline-container {
          height: 40px;
          background: linear-gradient(90deg, 
            #9b59b6 0%, 
            #9b59b6 25%, 
            #3498db 25%, 
            #3498db 62.5%, 
            #2ecc71 62.5%, 
            #2ecc71 100%);
          border-radius: 20px;
          margin: 20px 0;
          position: relative;
        }

        .timeline-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          color: #7f8c8d;
          margin-top: 5px;
        }

        .timeline-marker {
          position: absolute;
          top: -10px;
          width: 3px;
          height: 60px;
          background: #2c3e50;
          border-radius: 2px;
          transform: translateX(-1.5px);
        }

        /* Milestone Cards */
        .milestone-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 15px;
          margin: 25px 0;
        }

        .milestone-card {
          padding: 20px;
          background: #f8f9fa;
          border-radius: 10px;
          border-left: 4px solid #9b59b6;
          transition: all 0.3s;
        }

        .milestone-card:hover {
          background: #f4eef8;
          transform: translateY(-3px);
        }

        .milestone-card h4 {
          margin-bottom: 10px;
          color: #2c3e50;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* Info Section */
        .info-section { 
          margin-top: 40px; 
          border-top: 1px solid #eee; 
          padding-top: 30px; 
        }
        
        .info-section h3 { 
          color: #2c3e50; 
          margin-bottom: 15px; 
          font-size: 1.3rem;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .info-section p { 
          font-size: 0.95rem; 
          color: #555; 
          margin-bottom: 15px; 
          line-height: 1.7;
        }
        
        .formula-box { 
          background: #f1f3f5; 
          padding: 20px; 
          border-radius: 10px; 
          font-family: 'Courier New', monospace; 
          text-align: center; 
          margin: 20px 0; 
          font-size: 1rem;
          border-left: 4px solid #9b59b6;
          overflow-x: auto;
        }

        /* Sidebar */
        .sidebar {
          display: none;
        }

        /* Ad Slot */
        .ad-slot {
          margin: 30px 0;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 10px;
          text-align: center;
          color: #7f8c8d;
          border: 1px dashed #ddd;
        }

        /* Pregnancy Tips */
        .pregnancy-tips {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          margin: 25px 0;
        }

        .tip-card {
          padding: 20px;
          background: #f4eef8;
          border-radius: 10px;
          border-left: 4px solid #9b59b6;
          transition: all 0.3s;
        }

        .tip-card:hover {
          background: #f0e6f6;
          transform: translateY(-3px);
        }

        .tip-card h4 {
          margin-bottom: 10px;
          color: #2c3e50;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* Ultrasound Section */
        .ultrasound-info {
          margin: 30px 0;
          padding: 20px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 3px 10px rgba(0,0,0,0.05);
        }

        .ultrasound-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          margin-top: 15px;
        }

        .ultrasound-card {
          padding: 15px;
          background: #f8f9fa;
          border-radius: 8px;
          text-align: center;
        }

        .ultrasound-value {
          font-size: 1.5rem;
          font-weight: bold;
          color: #9b59b6;
          margin: 5px 0;
        }

        /* List Styles */
        ul {
          margin-left: 20px;
          margin-bottom: 15px;
          color: #555;
        }

        li {
          margin-bottom: 10px;
        }

        /* Responsive Styles */
        @media (min-width: 768px) {
          .container {
            grid-template-columns: 1fr 300px;
            padding: 30px;
          }

          .sidebar {
            display: block;
          }

          .pregnancy-inputs {
            grid-template-columns: repeat(2, 1fr);
          }

          .calc-btn {
            max-width: 300px;
          }
        }

        @media (max-width: 768px) {
          .container {
            padding: 15px;
          }
          
          .calculator-box {
            padding: 20px;
          }
          
          .method-tabs {
            flex-direction: column;
          }
          
          .progress-cards {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .milestone-cards {
            grid-template-columns: 1fr;
          }
          
          .pregnancy-tips {
            grid-template-columns: 1fr;
          }
          
          .ultrasound-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 15px;
          }
          
          .calculator-box {
            padding: 15px;
          }
          
          .pregnancy-inputs {
            grid-template-columns: 1fr;
          }
          
          .results-box {
            padding: 20px;
          }
          
          .info-section {
            margin-top: 30px;
            padding-top: 20px;
          }
          
          .formula-box {
            font-size: 0.95rem;
            padding: 15px;
          }
          
          .progress-cards {
            grid-template-columns: 1fr;
          }
          
          .ultrasound-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Print Styles */
        @media print {
          .calc-btn, .method-tabs, .sidebar {
            display: none;
          }
          
          .results-box {
            border: 2px solid #333;
          }
        }
      `}</style>

      <main className="container">
        <section className="calculator-box">
          <h1 className="calc-title"><i className="fas fa-baby"></i> Pregnancy Due Date Calculator & EDD Estimator</h1>
          <p className="calc-desc">Calculate your estimated due date (EDD) using multiple methods, track pregnancy progress by week, and get personalized trimester information for comprehensive prenatal planning.</p>

          <div className="method-options">
            <label><i className="fas fa-calculator"></i> Calculation Method</label>
            <div className="method-tabs">
              <button 
                className={`method-tab ${calculationMethod === 'lmp' ? 'selected' : ''}`} 
                onClick={() => selectMethod('lmp')}
              >
                <i className="fas fa-calendar-day"></i> Last Period (LMP)
              </button>
              <button 
                className={`method-tab ${calculationMethod === 'conception' ? 'selected' : ''}`} 
                onClick={() => selectMethod('conception')}
              >
                <i className="fas fa-heart"></i> Conception Date
              </button>
              <button 
                className={`method-tab ${calculationMethod === 'ultrasound' ? 'selected' : ''}`} 
                onClick={() => selectMethod('ultrasound')}
              >
                <i className="fas fa-wave-square"></i> Ultrasound Dating
              </button>
            </div>
          </div>

          <div className="pregnancy-inputs">
            {calculationMethod === 'lmp' && (
              <div className="input-group">
                <label><i className="fas fa-calendar-day"></i> First Day of Last Period</label>
                <input 
                  type="date" 
                  id="last-period" 
                  value={lastPeriod}
                  onChange={(e) => setLastPeriod(e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                />
                <p style={{fontSize: '0.8rem', color: '#666', marginTop: '5px'}}>Day 1 of your menstrual cycle</p>
              </div>
            )}
            
            {calculationMethod === 'conception' && (
              <div className="input-group">
                <label><i className="fas fa-heart"></i> Conception Date</label>
                <input 
                  type="date" 
                  id="conception-date" 
                  value={conceptionDate}
                  onChange={(e) => setConceptionDate(e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                />
                <p style={{fontSize: '0.8rem', color: '#666', marginTop: '5px'}}>Estimated date of conception</p>
              </div>
            )}
            
            {calculationMethod === 'ultrasound' && (
              <div className="input-group">
                <label><i className="fas fa-wave-square"></i> Ultrasound CRL (mm)</label>
                <input 
                  type="number" 
                  id="crl-measurement" 
                  placeholder="e.g., 45" 
                  value={crlMeasurement}
                  onChange={(e) => setCrlMeasurement(e.target.value)}
                  min="1" 
                  max="100"
                />
                <p style={{fontSize: '0.8rem', color: '#666', marginTop: '5px'}}>Crown-rump length measurement</p>
              </div>
            )}
            
            <div className="input-group">
              <label><i className="fas fa-history"></i> Cycle Length (Optional)</label>
              <input 
                type="number" 
                id="cycle-length" 
                placeholder="28" 
                value={cycleLength}
                onChange={(e) => setCycleLength(e.target.value)}
                min="21" 
                max="45"
              />
              <p style={{fontSize: '0.8rem', color: '#666', marginTop: '5px'}}>Days between periods (default 28)</p>
            </div>
          </div>

          <button className="calc-btn" onClick={calculateDueDate}>
            <i className="fas fa-calculator"></i> Calculate Due Date
          </button>

          <div className="results-box">
            <h3 style={{marginBottom: '20px', color: '#2c3e50'}}>
              <i className="fas fa-chart-line"></i> Your Pregnancy Timeline & Due Date Estimation
            </h3>
            
            {results && (
              <>
                <div style={{marginBottom: '30px'}}>
                  <h4>Estimated Due Date (EDD)</h4>
                  <span id="due-date" className="due-date-display">{results.dueDate}</span>
                  <p style={{fontSize: '0.9rem', color: '#666'}}>Based on <span id="method-used">{results.methodUsed}</span></p>
                </div>

                <div className="progress-cards">
                  <div className="progress-card weeks">
                    <h4><i className="fas fa-calendar-week"></i> Weeks Pregnant</h4>
                    <span className="progress-value weeks-value">{results.weeks}</span>
                    <p style={{fontSize: '0.9rem', color: '#666'}}>Gestational age</p>
                  </div>

                  <div className="progress-card trimester">
                    <h4><i className="fas fa-layer-group"></i> Trimester</h4>
                    <span className="progress-value trimester-value">{results.trimester}</span>
                    <p style={{fontSize: '0.9rem', color: '#666'}}>Current pregnancy stage</p>
                  </div>

                  <div className="progress-card days">
                    <h4><i className="fas fa-hourglass-half"></i> Days to Go</h4>
                    <span className="progress-value days-value">{results.daysLeft}</span>
                    <p style={{fontSize: '0.9rem', color: '#666'}}>Until due date</p>
                  </div>

                  <div className="progress-card conception">
                    <h4><i className="fas fa-heart"></i> Conception Week</h4>
                    <span className="progress-value conception-value">{results.conceptionWeek}</span>
                    <p style={{fontSize: '0.9rem', color: '#666'}}>Estimated conception period</p>
                  </div>
                </div>

                <div className="pregnancy-timeline">
                  <h4><i className="fas fa-chart-bar"></i> Pregnancy Progress Timeline</h4>
                  <div className="timeline-container">
                    <div 
                      className="timeline-marker" 
                      style={{left: `${timelinePosition}%`}}
                      title={`Week ${results.weeks}`}
                    />
                  </div>
                  <div className="timeline-labels">
                    <span>1st Trimester<br/>(Weeks 1-12)</span>
                    <span>2nd Trimester<br/>(Weeks 13-26)</span>
                    <span>3rd Trimester<br/>(Weeks 27-40)</span>
                  </div>
                </div>
                
                <p style={{marginTop: '20px', fontSize: '0.9rem', color: '#666'}}>
                  <i className="fas fa-info-circle"></i> Only 4% of babies are born exactly on their due date. Most arrive within 2 weeks before or after.
                </p>
              </>
            )}
          </div>

          {results && (
            <div className="milestone-cards">
              <div className="milestone-card">
                <h4><i className="fas fa-stethoscope"></i> Next Prenatal Visit</h4>
                <p style={{fontSize: '0.9rem', color: '#666'}}>Based on your progress, schedule your next appointment around week {results.nextAppointmentWeek}.</p>
              </div>
              <div className="milestone-card">
                <h4><i className="fas fa-dna"></i> Genetic Screening</h4>
                <p style={{fontSize: '0.9rem', color: '#666'}}>First trimester screening typically occurs between weeks 11-13.</p>
              </div>
              <div className="milestone-card">
                <h4><i className="fas fa-utensils"></i> Nutrition Focus</h4>
                <p style={{fontSize: '0.9rem', color: '#666'}}>Increase folate, iron, and calcium intake as recommended by your healthcare provider.</p>
              </div>
            </div>
          )}

          {calculationMethod === 'ultrasound' && (
            <div className="ultrasound-info">
              <h4><i className="fas fa-wave-square"></i> Ultrasound Dating Accuracy</h4>
              <p style={{fontSize: '0.9rem', color: '#666', marginBottom: '15px'}}>
                Ultrasound measurements provide the most accurate dating, especially in early pregnancy:
              </p>
              
              <div className="ultrasound-grid">
                <div className="ultrasound-card">
                  <div>First Trimester</div>
                  <div className="ultrasound-value">± 5-7 days</div>
                  <div style={{fontSize: '0.8rem', color: '#666'}}>Weeks 6-13</div>
                </div>
                <div className="ultrasound-card">
                  <div>Second Trimester</div>
                  <div className="ultrasound-value">± 7-14 days</div>
                  <div style={{fontSize: '0.8rem', color: '#666'}}>Weeks 14-27</div>
                </div>
                <div className="ultrasound-card">
                  <div>Third Trimester</div>
                  <div className="ultrasound-value">± 21-30 days</div>
                  <div style={{fontSize: '0.8rem', color: '#666'}}>Weeks 28-40</div>
                </div>
              </div>
            </div>
          )}

          <div className="pregnancy-tips">
            <div className="tip-card">
              <h4><i className="fas fa-pills"></i> Prenatal Vitamins</h4>
              <p style={{fontSize: '0.85rem', color: '#666'}}>Start or continue taking prenatal vitamins with folic acid (400-800 mcg daily).</p>
            </div>
            <div className="tip-card">
              <h4><i className="fas fa-procedures"></i> Rest & Hydration</h4>
              <p style={{fontSize: '0.85rem', color: '#666'}}>Increase water intake and prioritize rest, especially during the first trimester.</p>
            </div>
            <div className="tip-card">
              <h4><i className="fas fa-ban"></i> Avoidances</h4>
              <p style={{fontSize: '0.85rem', color: '#666'}}>Avoid alcohol, tobacco, certain medications, and high-mercury fish.</p>
            </div>
            <div className="tip-card">
              <h4><i className="fas fa-user-md"></i> Healthcare Provider</h4>
              <p style={{fontSize: '0.85rem', color: '#666'}}>Schedule your first prenatal appointment around week 8-10 of pregnancy.</p>
            </div>
          </div>

          <div className="ad-slot">
            <p><i className="fas fa-ad"></i> Advertisement</p>
            <p style={{fontSize: '0.8rem', marginTop: '5px'}}>Your ad could be here</p>
          </div>

          <div className="info-section">
            <h3><i className="fas fa-question-circle"></i> Comprehensive Guide to Pregnancy Due Date Calculation Using Medical Methods</h3>
            <p>Accurate pregnancy due date calculation is essential for <strong>prenatal care planning</strong>, <strong>fetal development monitoring</strong>, and <strong>birth preparation</strong>. Our calculator implements three medically-recognized methods: <strong>Last Menstrual Period (LMP) dating</strong> using Naegele's Rule, <strong>conception date calculation</strong> for known conception timing, and <strong>ultrasound-based estimation</strong> using crown-rump length measurements. Each method offers different accuracy levels for <strong>pregnancy timeline creation</strong> and <strong>estimated delivery date (EDD) prediction</strong>.</p>
            
            <h3><i className="fas fa-calculator"></i> Medical Standards for Due Date Estimation: Naegele's Rule and Beyond</h3>
            <p>Healthcare providers primarily use these validated methods for due date estimation:</p>
            
            <div className="formula-box">
              <strong>Naegele's Rule (LMP Method - Standard):</strong><br />
              Due Date = First Day of LMP + 7 Days - 3 Months + 1 Year<br /><br />
              
              <strong>Conception Date Method (IVF/Known Timing):</strong><br />
              Due Date = Conception Date + 266 Days (38 Weeks)<br /><br />
              
              <strong>Ultrasound Dating (Gold Standard Accuracy):</strong><br />
              Based on fetal biometric measurements (CRL in first trimester)<br />
              Due Date = Ultrasound Date + (280 - Ultrasound Gestational Age in Days)
            </div>

            <h3><i className="fas fa-baby"></i> Understanding Gestational Age vs. Fetal Age: Key Concepts for Accurate Pregnancy Tracking</h3>
            <p>Distinguishing between these two age measurements is crucial for <strong>pregnancy milestone tracking</strong>:</p>
            <ul>
              <li><strong>Gestational Age:</strong> Measured from the first day of your last menstrual period (LMP), this is the standard medical measurement used for <strong>prenatal care scheduling</strong> and <strong>fetal development assessment</strong>, approximately 2 weeks longer than fetal age.</li>
              <li><strong>Fetal Age (Conceptional Age):</strong> Measured from actual conception date, representing true embryonic/fetal development time. Since ovulation typically occurs about 14 days after LMP, fetal age is approximately 2 weeks less than gestational age.</li>
            </ul>
            <p>When your provider states "8 weeks pregnant," they're referring to gestational age, meaning fertilization occurred approximately 6 weeks prior.</p>

            <h3><i className="fas fa-calendar-alt"></i> The Three Trimesters of Pregnancy: Developmental Milestones and Maternal Changes</h3>
            <p>Pregnancy progresses through three distinct trimesters, each with specific <strong>fetal development milestones</strong> and <strong>maternal physiological changes</strong>:</p>
            <ul>
              <li><strong>First Trimester (Weeks 1-12):</strong> Critical organogenesis occurs with all major organ systems forming. Common symptoms include <strong>morning sickness management</strong>, <strong>pregnancy fatigue</strong>, and <strong>early pregnancy symptoms</strong>.</li>
              <li><strong>Second Trimester (Weeks 13-26):</strong> Often called the "honeymoon period" as nausea typically subsides. Features <strong>fetal movement recognition</strong>, <strong>anatomy scan completion</strong>, and <strong>maternity clothing transition</strong>.</li>
              <li><strong>Third Trimester (Weeks 27-40):</strong> Final growth phase with <strong>fetal weight gain</strong>, <strong>lung maturation</strong>, and <strong>birth positioning</strong>. Common concerns include <strong>third trimester discomfort</strong> and <strong>labor preparation</strong>.</li>
            </ul>

            <h3><i className="fas fa-hospital"></i> Ultrasound Dating: The Gold Standard for Accurate Pregnancy Due Date Estimation</h3>
            <p>While LMP dating provides a clinical standard, <strong>first-trimester ultrasound examination</strong> offers superior accuracy for due date estimation. Early pregnancy ultrasounds measure <strong>crown-rump length (CRL)</strong> - the longest straight-line measurement of the fetus from head to buttocks - which correlates strongly with gestational age. Ultrasound dating accuracy diminishes as pregnancy advances:</p>
            <ul>
              <li><strong>Weeks 6-13:</strong> Accuracy within ±5-7 days (95% confidence interval) - optimal for <strong>early pregnancy confirmation</strong></li>
              <li><strong>Weeks 14-27:</strong> Accuracy within ±7-14 days - standard for <strong>anatomy scan timing</strong></li>
              <li><strong>Weeks 28-40:</strong> Accuracy within ±21-30 days - primarily for <strong>fetal growth assessment</strong></li>
            </ul>
            <p>For this reason, obstetric providers typically use the earliest reliable ultrasound for definitive dating and generally won't adjust the due date after the first trimester unless significant discrepancies exist.</p>

            <h3><i className="fas fa-exclamation-triangle"></i> Critical Factors Affecting Due Date Accuracy and Pregnancy Duration</h3>
            <p>Several biological and clinical factors influence due date calculation accuracy and actual pregnancy length:</p>
            <ul>
              <li><strong>Menstrual Cycle Irregularities:</strong> Women with irregular menstrual cycles or <strong>polycystic ovary syndrome (PCOS)</strong> may experience variable ovulation timing</li>
              <li><strong>Cycle Length Variations:</strong> The standard 28-day cycle assumption doesn't apply to women with consistently shorter or longer cycles</li>
              <li><strong>Ovulation Timing Variations:</strong> Ovulation occurring significantly earlier or later than day 14 affects conception dating accuracy</li>
              <li><strong>Ethnic and Genetic Factors:</strong> Some population studies suggest slight variations in pregnancy length among different ethnic groups</li>
              <li><strong>Previous Pregnancy History:</strong> Women tend to exhibit similar pregnancy lengths across multiple gestations</li>
              <li><strong>Maternal Age and Health:</strong> Advanced maternal age and certain medical conditions can affect pregnancy duration</li>
            </ul>

            <h3><i className="fas fa-clipboard-check"></i> Post-Due Date Calculation: Essential Steps for Comprehensive Prenatal Care Planning</h3>
            <p>After calculating your estimated due date, implement these evidence-based <strong>prenatal care strategies</strong>:</p>
            <ul>
              <li><strong>Schedule Comprehensive Prenatal Care:</strong> Contact an obstetric provider for initial prenatal visit scheduling (typically weeks 8-10)</li>
              <li><strong>Initiate Prenatal Supplementation:</strong> Begin daily prenatal vitamins containing at least 400-800 mcg of folic acid</li>
              <li><strong>Medication Safety Review:</strong> Consult healthcare providers about all prescription and over-the-counter medications</li>
              <li><strong>Implement Healthy Pregnancy Habits:</strong> Adopt balanced nutrition, adequate hydration, and appropriate exercise routines</li>
              <li><strong>Establish Pregnancy Tracking System:</strong> Begin pregnancy journal or digital tracking for symptoms, questions, and milestones</li>
              <li><strong>Educate on Warning Signs:</strong> Learn concerning symptoms requiring immediate medical attention</li>
            </ul>

            <h3><i className="fas fa-user-md"></i> Due Date Adjustments: Understanding When and Why Providers Modify Estimated Delivery Dates</h3>
            <p>Healthcare providers may adjust your due date based on these clinical scenarios:</p>
            <ul>
              <li><strong>Early Ultrasound Discrepancy:</strong> When first-trimester ultrasound dating differs from LMP dating by &gt;5-7 days</li>
              <li><strong>Uncertain Last Menstrual Period:</strong> For patients with irregular cycles or unknown LMP dates</li>
              <li><strong>Assisted Reproductive Technology:</strong> With precisely known conception dates from IVF or fertility treatments</li>
              <li><strong>Significant Fetal Growth Variations:</strong> When serial ultrasounds show consistent divergence from expected growth patterns</li>
              <li><strong>Multiple Gestation Pregnancies:</strong> Twins and higher-order multiples often require adjusted dating</li>
            </ul>
            <p><em><strong>Important Medical Disclaimer:</strong> This pregnancy due date calculator provides estimates based on standard obstetric calculations for educational purposes. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare providers regarding pregnancy-related questions. Statistical data shows only 4% of babies are born on their exact due date, with most deliveries occurring within two weeks before or after the estimated date. Individual pregnancy experiences vary based on numerous biological and clinical factors.</em></p>
          </div>
        </section>

        <aside className="sidebar">
          <div className="sidebar-widget">
            <h4 style={{marginBottom: '15px', color: '#2c3e50'}}>
              <i className="fas fa-bullhorn"></i> Advertisement
            </h4>
            <div style={{
              height: '600px', 
              background: '#f8f9fa', 
              border: '2px dashed #ddd', 
              borderRadius: '10px', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              color: '#7f8c8d'
            }}>
              <i className="fas fa-ad" style={{fontSize: '2rem', marginBottom: '10px'}}></i>
              <p>Advertisement Space</p>
              <p style={{fontSize: '0.8rem', marginTop: '5px'}}>300x600px</p>
            </div>
          </div>
          
          <div style={{
            marginTop: '30px', 
            padding: '20px', 
            background: '#f4eef8', 
            borderRadius: '10px'
          }}>
            <h4 style={{marginBottom: '10px', color: '#8e44ad'}}>
              <i className="fas fa-lightbulb"></i> Pregnancy Statistics
            </h4>
            <ul style={{fontSize: '0.9rem', paddingLeft: '20px'}}>
              <li style={{marginBottom: '8px'}}>Only 4% of babies are born on their exact due date</li>
              <li style={{marginBottom: '8px'}}>First-time mothers often deliver later than subsequent pregnancies</li>
              <li style={{marginBottom: '8px'}}>The most common birth week is week 39 of pregnancy</li>
              <li>Twins and multiples typically arrive earlier than singleton pregnancies</li>
            </ul>
          </div>
        </aside>
      </main>
    </>
  );
}