// src/app/ovulation/page.js
"use client"; // This is required for interactivity

import { useState, useEffect } from 'react';

export default function OvulationPage() {
  const [cycleRegularity, setCycleRegularity] = useState('regular');
  const [lastPeriod, setLastPeriod] = useState('');
  const [cycleLength, setCycleLength] = useState('28');
  const [shortestCycle, setShortestCycle] = useState('');
  const [longestCycle, setLongestCycle] = useState('');
  const [results, setResults] = useState(null);
  const [probabilityData, setProbabilityData] = useState([]);
  const [timelineMarkers, setTimelineMarkers] = useState([]);

  // Set default date on component mount
  useEffect(() => {
    const sampleDate = new Date();
    sampleDate.setDate(sampleDate.getDate() - 28);
    setLastPeriod(sampleDate.toISOString().split('T')[0]);
  }, []);

  // Handle Enter key press
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        calculateOvulation();
      }
    };

    document.addEventListener('keypress', handleKeyPress);
    return () => document.removeEventListener('keypress', handleKeyPress);
  });

  const selectRegularity = (regularity) => {
    setCycleRegularity(regularity);
    setResults(null);
  };

  const calculateOvulation = () => {
    // Validate last period date
    if (!lastPeriod) {
      alert("Please select the first day of your last period.");
      return;
    }

    const lastDate = new Date(lastPeriod);
    const today = new Date();

    // Ensure selected date is not in the future
    if (lastDate > today) {
      alert("Last period date cannot be in the future. Please select a valid date.");
      return;
    }

    let ovulationDay, fertileStart, fertileEnd, nextPeriod;

    if (cycleRegularity === 'regular') {
      // Validate cycle length
      const cycleLengthNum = parseInt(cycleLength);
      if (isNaN(cycleLengthNum) || cycleLengthNum < 21 || cycleLengthNum > 45) {
        alert("Please enter a valid cycle length between 21-45 days.");
        return;
      }

      // Standard calculation for regular cycles
      nextPeriod = new Date(lastDate);
      nextPeriod.setDate(lastDate.getDate() + cycleLengthNum);
      
      ovulationDay = new Date(nextPeriod);
      ovulationDay.setDate(nextPeriod.getDate() - 14);
      
      fertileStart = new Date(ovulationDay);
      fertileStart.setDate(ovulationDay.getDate() - 5);
      
      fertileEnd = new Date(ovulationDay);
      fertileEnd.setDate(ovulationDay.getDate() + 1);
    } else {
      // Validate irregular cycle inputs
      const shortestCycleNum = parseInt(shortestCycle);
      const longestCycleNum = parseInt(longestCycle);
      
      if (!shortestCycle || !longestCycle || shortestCycleNum >= longestCycleNum) {
        alert("Please enter valid cycle range (shortest < longest).");
        return;
      }

      // Earliest possible ovulation
      const earliestOvulation = new Date(lastDate);
      earliestOvulation.setDate(lastDate.getDate() + (shortestCycleNum - 18));
      
      // Latest possible ovulation
      const latestOvulation = new Date(lastDate);
      latestOvulation.setDate(lastDate.getDate() + (longestCycleNum - 11));
      
      // Fertile window spans from earliest fertile day to latest fertile day
      fertileStart = new Date(earliestOvulation);
      fertileStart.setDate(earliestOvulation.getDate() - 5);
      
      fertileEnd = new Date(latestOvulation);
      fertileEnd.setDate(latestOvulation.getDate() + 1);
      
      // Use average for single ovulation day display
      const avgCycle = Math.round((shortestCycleNum + longestCycleNum) / 2);
      nextPeriod = new Date(lastDate);
      nextPeriod.setDate(lastDate.getDate() + avgCycle);
      
      ovulationDay = new Date(nextPeriod);
      ovulationDay.setDate(nextPeriod.getDate() - 14);
    }

    // Formatting options
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    const shortOptions = { month: 'short', day: 'numeric' };
    
    // Calculate timeline markers
    const cycleLengthDays = Math.round((nextPeriod - lastDate) / (1000 * 60 * 60 * 24));
    const fertileStartDay = Math.round((fertileStart - lastDate) / (1000 * 60 * 60 * 24));
    const fertileEndDay = Math.round((fertileEnd - lastDate) / (1000 * 60 * 60 * 24));
    const ovulationDayPos = Math.round((ovulationDay - lastDate) / (1000 * 60 * 60 * 24));
    
    const markers = [
      { day: fertileStartDay, label: 'Fertile Start', position: fertileStartDay >= 0 && fertileStartDay <= cycleLengthDays ? (fertileStartDay / cycleLengthDays) * 100 : 0 },
      { day: ovulationDayPos, label: 'Ovulation', position: ovulationDayPos >= 0 && ovulationDayPos <= cycleLengthDays ? (ovulationDayPos / cycleLengthDays) * 100 : 0 },
      { day: fertileEndDay, label: 'Fertile End', position: fertileEndDay >= 0 && fertileEndDay <= cycleLengthDays ? (fertileEndDay / cycleLengthDays) * 100 : 0 }
    ];
    
    // Calculate probability data
    const fertileDays = Math.round((fertileEnd - fertileStart) / (1000 * 60 * 60 * 24)) + 1;
    const probabilities = [10, 15, 25, 30, 27, 20, 15];
    const probabilityDataArray = [];
    
    for (let i = 0; i < fertileDays; i++) {
      const currentDay = new Date(fertileStart);
      currentDay.setDate(fertileStart.getDate() + i);
      
      const isOvulationDay = currentDay.toDateString() === ovulationDay.toDateString();
      const dayLabel = currentDay.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
      const probability = probabilities[i] || 10;
      
      probabilityDataArray.push({
        day: dayLabel,
        probability,
        isOvulationDay
      });
    }

    setResults({
      ovulationDate: ovulationDay.toLocaleDateString(undefined, options),
      fertileRange: fertileStart.toLocaleDateString(undefined, shortOptions) + " to " + fertileEnd.toLocaleDateString(undefined, shortOptions),
      nextPeriod: nextPeriod.toLocaleDateString(undefined, options)
    });

    setTimelineMarkers(markers);
    setProbabilityData(probabilityDataArray);
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
        }
        
        /* Input Groups */
        .cycle-inputs {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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
          border-color: #e91e63; 
          box-shadow: 0 0 0 3px rgba(233, 30, 99, 0.1);
        }

        /* Cycle Length Tips */
        .cycle-tips {
          margin: 20px 0;
          padding: 20px;
          background: #fff5f8;
          border-radius: 10px;
          border-left: 4px solid #e91e63;
        }

        .cycle-tips h4 {
          margin-bottom: 10px;
          color: #2c3e50;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* Cycle Regularity Option */
        .regularity-option {
          margin: 20px 0;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 10px;
        }

        .regularity-buttons {
          display: flex;
          gap: 10px;
          margin-top: 15px;
          flex-wrap: wrap;
        }

        .regularity-btn {
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

        .regularity-btn.selected {
          background: #e91e63;
          color: white;
          border-color: #e91e63;
        }

        .calc-btn { 
          width: 100%; 
          padding: 16px; 
          background: #e91e63; 
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
          background: #c2185b; 
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(233, 30, 99, 0.2);
        }

        /* Results Section */
        .results-box { 
          margin: 30px 0; 
          padding: 25px; 
          background: linear-gradient(135deg, #fff5f8 0%, #ffebee 100%);
          border-radius: 12px; 
          border-left: 5px solid #e91e63;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          display: ${results ? 'block' : 'none'};
        }
        
        .date-highlight { 
          font-size: clamp(1.8rem, 6vw, 2.5rem); 
          font-weight: 800; 
          display: block; 
          margin: 15px 0; 
          color: #e91e63; 
        }

        /* Fertility Timeline */
        .fertility-timeline {
          margin: 25px 0;
          padding: 20px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 3px 10px rgba(0,0,0,0.05);
        }

        .timeline-bar {
          height: 40px;
          background: linear-gradient(90deg, 
            #e0e0e0 0%, 
            #e0e0e0 30%, 
            #e91e63 30%, 
            #e91e63 45%, 
            #ff4081 45%, 
            #ff4081 60%, 
            #e0e0e0 60%, 
            #e0e0e0 100%);
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

        /* Fertile Window Cards */
        .fertility-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 15px;
          margin-top: 25px;
        }

        .fertility-card {
          padding: 20px;
          background: white;
          border-radius: 10px;
          text-align: center;
          box-shadow: 0 3px 10px rgba(0,0,0,0.05);
          transition: transform 0.3s;
        }

        .fertility-card:hover {
          transform: translateY(-3px);
        }

        .fertility-card.ovulation {
          border-left: 5px solid #e91e63;
        }

        .fertility-card.fertile {
          border-left: 5px solid #ff4081;
        }

        .fertility-card.period {
          border-left: 5px solid #9c27b0;
        }

        .fertility-date {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 10px 0;
          display: block;
        }

        .ovulation-date { color: #e91e63; }
        .fertile-date { color: #ff4081; }
        .period-date { color: #9c27b0; }

        /* Pregnancy Probability */
        .pregnancy-probability {
          margin: 30px 0;
          padding: 20px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 3px 10px rgba(0,0,0,0.05);
        }

        .probability-bars {
          margin: 20px 0;
        }

        .probability-bar {
          height: 30px;
          background: #e0e0e0;
          border-radius: 15px;
          margin: 10px 0;
          overflow: hidden;
          position: relative;
        }

        .probability-fill {
          height: 100%;
          background: linear-gradient(90deg, #e91e63, #ff4081);
          border-radius: 15px;
          transition: width 1s ease;
        }

        .probability-label {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: white;
          font-weight: 600;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
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
          text-align: left; 
          margin: 20px 0; 
          font-size: 0.95rem;
          border-left: 4px solid #e91e63;
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

        /* Fertility Tips */
        .fertility-tips {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          margin: 25px 0;
        }

        .tip-card {
          padding: 20px;
          background: #fff5f8;
          border-radius: 10px;
          border-left: 4px solid #e91e63;
          transition: all 0.3s;
        }

        .tip-card:hover {
          background: #ffebee;
          transform: translateY(-3px);
        }

        .tip-card h4 {
          margin-bottom: 10px;
          color: #2c3e50;
          display: flex;
          align-items: center;
          gap: 8px;
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

          .cycle-inputs {
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
          
          .regularity-buttons {
            flex-direction: column;
          }
          
          .fertility-cards {
            grid-template-columns: 1fr;
          }
          
          .fertility-tips {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 15px;
          }
          
          .calculator-box {
            padding: 15px;
          }
          
          .cycle-inputs {
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
            font-size: 0.9rem;
            padding: 15px;
          }
        }

        /* Print Styles */
        @media print {
          .calc-btn, .regularity-buttons, .sidebar {
            display: none;
          }
          
          .results-box {
            border: 2px solid #333;
          }
        }
      `}</style>

      <main className="container">
        <section className="calculator-box">
          <h1 className="calc-title"><i className="fas fa-calendar-alt"></i> Ovulation & Fertility Calculator</h1>
          <p className="calc-desc">Track your menstrual cycle, predict ovulation day, and identify your most fertile window for conception planning.</p>

          <div className="regularity-option">
            <label><i className="fas fa-heartbeat"></i> Cycle Regularity</label>
            <div className="regularity-buttons">
              <button 
                className={`regularity-btn ${cycleRegularity === 'regular' ? 'selected' : ''}`} 
                onClick={() => selectRegularity('regular')}
              >
                <i className="fas fa-check-circle"></i> Regular Cycles
              </button>
              <button 
                className={`regularity-btn ${cycleRegularity === 'irregular' ? 'selected' : ''}`} 
                onClick={() => selectRegularity('irregular')}
              >
                <i className="fas fa-exclamation-triangle"></i> Irregular Cycles
              </button>
            </div>
          </div>

          <div className="cycle-inputs">
            <div className="input-group">
              <label><i className="fas fa-calendar-day"></i> First Day of Last Period</label>
              <input 
                type="date" 
                id="last-period" 
                value={lastPeriod}
                onChange={(e) => setLastPeriod(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="input-group">
              <label><i className="fas fa-history"></i> Average Cycle Length</label>
              <input 
                type="number" 
                id="cycle-length" 
                placeholder="28" 
                value={cycleLength}
                onChange={(e) => setCycleLength(e.target.value)}
                min="21" 
                max="45"
              />
              <p style={{fontSize: '0.8rem', color: '#666', marginTop: '5px'}}>Days from day 1 of one period to day 1 of the next</p>
            </div>
          </div>

          {cycleRegularity === 'irregular' && (
            <div className="input-group">
              <label><i className="fas fa-sliders-h"></i> Cycle Length Range</label>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
                <input 
                  type="number" 
                  id="shortest-cycle" 
                  placeholder="Shortest (e.g., 26)" 
                  value={shortestCycle}
                  onChange={(e) => setShortestCycle(e.target.value)}
                  min="21" 
                  max="45"
                />
                <input 
                  type="number" 
                  id="longest-cycle" 
                  placeholder="Longest (e.g., 32)" 
                  value={longestCycle}
                  onChange={(e) => setLongestCycle(e.target.value)}
                  min="21" 
                  max="45"
                />
              </div>
            </div>
          )}

          <div className="cycle-tips">
            <h4><i className="fas fa-lightbulb"></i> How to Determine Your Cycle Length</h4>
            <p style={{fontSize: '0.9rem', color: '#666'}}>Track the number of days from the first day of your period to the day before your next period starts. Do this for 3-6 months and calculate the average for best accuracy.</p>
          </div>

          <button className="calc-btn" onClick={calculateOvulation}>
            <i className="fas fa-calculator"></i> Calculate Fertility Window
          </button>

          <div className="results-box">
            <h3 style={{marginBottom: '20px', color: '#2c3e50'}}>
              <i className="fas fa-chart-line"></i> Your Fertility Analysis
            </h3>
            
            {results && (
              <>
                <div className="fertility-cards">
                  <div className="fertility-card ovulation">
                    <h4><i className="fas fa-egg"></i> Ovulation Day</h4>
                    <span className="fertility-date ovulation-date">{results.ovulationDate}</span>
                    <p style={{fontSize: '0.9rem', color: '#666'}}>Peak fertility - egg release</p>
                  </div>

                  <div className="fertility-card fertile">
                    <h4><i className="fas fa-heart"></i> Fertile Window</h4>
                    <span className="fertility-date fertile-date">{results.fertileRange}</span>
                    <p style={{fontSize: '0.9rem', color: '#666'}}>Best time for conception</p>
                  </div>

                  <div className="fertility-card period">
                    <h4><i className="fas fa-calendar"></i> Next Period</h4>
                    <span className="fertility-date period-date">{results.nextPeriod}</span>
                    <p style={{fontSize: '0.9rem', color: '#666'}}>Expected start date</p>
                  </div>
                </div>

                <div className="fertility-timeline">
                  <h4><i className="fas fa-chart-bar"></i> Menstrual Cycle Timeline</h4>
                  <div className="timeline-bar">
                    {timelineMarkers.map((marker, index) => (
                      marker.position > 0 && (
                        <div 
                          key={index}
                          className="timeline-marker" 
                          style={{left: `${marker.position}%`}}
                          title={marker.label}
                        />
                      )
                    ))}
                  </div>
                  <div className="timeline-labels">
                    <span>Period</span>
                    <span>Fertile Window</span>
                    <span>Ovulation</span>
                    <span>Luteal Phase</span>
                  </div>
                </div>

                <div className="pregnancy-probability">
                  <h4><i className="fas fa-chart-pie"></i> Conception Probability by Day</h4>
                  <p style={{fontSize: '0.9rem', color: '#666', marginBottom: '15px'}}>
                    Chance of conception if you have intercourse on each day:
                  </p>
                  
                  <div className="probability-bars">
                    {probabilityData.map((item, index) => (
                      <div key={index} style={{display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px'}}>
                        <div style={{width: '100px', fontSize: '0.9rem', color: '#666'}}>{item.day}</div>
                        <div style={{flex: '1'}}>
                          <div className="probability-bar">
                            <div className="probability-fill" style={{width: `${item.probability}%`}}></div>
                            <div className="probability-label">{item.probability}% chance</div>
                          </div>
                        </div>
                        {item.isOvulationDay && <div style={{color: '#e91e63', fontWeight: 'bold'}}>Peak</div>}
                      </div>
                    ))}
                  </div>
                  
                  <p style={{fontSize: '0.85rem', color: '#999', marginTop: '15px'}}>
                    <i className="fas fa-info-circle"></i> Based on research: 27-33% chance during fertile window
                  </p>
                </div>
                
                <p style={{marginTop: '20px', fontSize: '0.9rem', color: '#666'}}>
                  <i className="fas fa-exclamation-triangle"></i> These are estimates. Track basal body temperature and cervical mucus for higher accuracy.
                </p>
              </>
            )}
          </div>

          <div className="fertility-tips">
            <div className="tip-card">
              <h4><i className="fas fa-temperature-high"></i> Basal Body Temperature</h4>
              <p style={{fontSize: '0.85rem', color: '#666'}}>Track your morning temperature to confirm ovulation (0.4-1°F rise after ovulation).</p>
            </div>
            <div className="tip-card">
              <h4><i className="fas fa-tint"></i> Cervical Mucus</h4>
              <p style={{fontSize: '0.85rem', color: '#666'}}>Fertile mucus resembles raw egg whites - clear, stretchy, and slippery.</p>
            </div>
            <div className="tip-card">
              <h4><i className="fas fa-vial"></i> Ovulation Predictor Kits</h4>
              <p style={{fontSize: '0.85rem', color: '#666'}}>Use OPKs to detect LH surge 24-36 hours before ovulation.</p>
            </div>
            <div className="tip-card">
              <h4><i className="fas fa-clock"></i> Timing Intercourse</h4>
              <p style={{fontSize: '0.85rem', color: '#666'}}>Have sex every other day during fertile window to maximize conception chances.</p>
            </div>
          </div>

          <div className="ad-slot">
            <p><i className="fas fa-ad"></i> Advertisement</p>
            <p style={{fontSize: '0.8rem', marginTop: '5px'}}>Your ad could be here</p>
          </div>

          <div className="info-section">
            <h3><i className="fas fa-question-circle"></i> How Our Ovulation Calculator Predicts Your Fertile Window Accurately</h3>
            <p>Our advanced ovulation calculator uses the <strong>standard day method</strong> combined with <strong>menstrual cycle tracking algorithms</strong> to estimate your most fertile days. By analyzing your cycle length and last period date, we calculate when ovulation is likely to occur based on the typical 14-day luteal phase that remains relatively constant for most women. This method provides a reliable <strong>fertility window prediction</strong> for <strong>conception planning</strong> and <strong>pregnancy timing optimization</strong>.</p>
            
            <h3><i className="fas fa-calculator"></i> The Science Behind Ovulation Day Calculation and Fertile Window Prediction</h3>
            <p>Ovulation typically occurs 14 days before your next period starts, regardless of total cycle length. This <strong>luteal phase consistency</strong> allows for accurate predictions even with irregular cycles. The fertile window spans 6 days total: the 5 days before ovulation plus the day of ovulation itself. This timing accounts for sperm survival (up to 5 days) and egg viability (12-24 hours), creating optimal conditions for <strong>natural conception timing</strong> and <strong>family planning strategies</strong>.</p>
            
            <div className="formula-box">
              <strong>Standard Calculation Method:</strong><br />
              Next Period Date = Last Period Date + Cycle Length<br />
              Ovulation Day = Next Period Date - 14 days<br />
              Fertile Window Start = Ovulation Day - 5 days<br />
              Fertile Window End = Ovulation Day + 1 day<br /><br />
              
              <strong>For Irregular Cycles (Range Method):</strong><br />
              Earliest Ovulation = Last Period + (Shortest Cycle - 18 days)<br />
              Latest Ovulation = Last Period + (Longest Cycle - 11 days)<br />
              Fertile Window = Earliest Fertile Day to Latest Fertile Day
            </div>

            <h3><i className="fas fa-chart-line"></i> Understanding Your Menstrual Cycle Phases for Optimal Fertility Tracking</h3>
            <p>A typical menstrual cycle consists of four phases, each crucial for understanding fertility patterns:</p>
            <ul>
              <li><strong>Menstrual Phase (Days 1-5):</strong> Period occurs; uterus sheds lining. Lowest fertility.</li>
              <li><strong>Follicular Phase (Days 1-13):</strong> Follicles develop in ovaries; estrogen rises. Fertility increases toward the end.</li>
              <li><strong>Ovulation Phase (Day 14 in 28-day cycle):</strong> Egg releases from ovary. Peak fertility - highest chance of conception.</li>
              <li><strong>Luteal Phase (Days 15-28):</strong> Corpus luteum forms; progesterone rises. If no pregnancy, cycle restarts.</li>
            </ul>

            <h3><i className="fas fa-baby"></i> Maximizing Conception Success: Timing Intercourse During Your Fertile Days</h3>
            <p>For the highest probability of pregnancy, time intercourse during your fertile window with these evidence-based strategies:</p>
            <ul>
              <li><strong>Optimal Timing:</strong> Have sex every other day during your fertile window to maintain healthy sperm count while maximizing chances</li>
              <li><strong>Peak Fertility Days:</strong> The three days leading up to and including ovulation day offer the highest conception probability (27-33% per cycle)</li>
              <li><strong>Sperm Longevity:</strong> Sperm can survive up to 5 days in fertile cervical mucus, making pre-ovulation days particularly important</li>
              <li><strong>Post-Ovulation:</strong> Conception is unlikely more than 24 hours after ovulation, as the egg deteriorates rapidly</li>
            </ul>

            <h3><i className="fas fa-clipboard-check"></i> Tracking Additional Fertility Signs for Enhanced Accuracy in Ovulation Prediction</h3>
            <p>While calendar-based calculations provide a good estimate, combining methods increases accuracy significantly. Track these additional <strong>fertility biomarkers</strong> for more precise ovulation detection:</p>
            <ul>
              <li><strong>Basal Body Temperature (BBT):</strong> Track your waking temperature daily; a sustained rise of 0.4-1°F confirms ovulation has occurred</li>
              <li><strong>Cervical Mucus Changes:</strong> Monitor consistency and appearance; fertile mucus is clear, stretchy, and resembles raw egg whites</li>
              <li><strong>Cervical Position Changes:</strong> During fertility, the cervix becomes soft, high, open, and wet compared to its usual firm, low, closed state</li>
              <li><strong>Ovulation Predictor Kits (OPKs):</strong> Detect the luteinizing hormone (LH) surge that occurs 24-36 hours before ovulation</li>
            </ul>

            <h3><i className="fas fa-exclamation-triangle"></i> Important Considerations for Irregular Cycles and Medical Conditions</h3>
            <p>While this calculator provides valuable estimates, several factors can affect cycle regularity and ovulation timing:</p>
            <ul>
              <li><strong>Irregular Cycles:</strong> If your cycle varies by more than 7-9 days, use the range method and consider tracking additional fertility signs</li>
              <li><strong>Medical Conditions:</strong> PCOS, thyroid disorders, endometriosis, and other conditions can affect ovulation patterns</li>
              <li><strong>Lifestyle Factors:</strong> Stress, significant weight changes, excessive exercise, and travel can temporarily disrupt cycles</li>
              <li><strong>Age Considerations:</strong> Cycle regularity and ovulation frequency can change as you approach perimenopause</li>
              <li><strong>Medications:</strong> Certain medications, including hormonal contraceptives and fertility drugs, will affect cycle calculations</li>
            </ul>

            <h3><i className="fas fa-user-md"></i> When to Consult a Healthcare Provider for Fertility Concerns</h3>
            <p>Consider seeking medical advice if you experience any of the following situations:</p>
            <ul>
              <li>No pregnancy after 12 months of regular, unprotected intercourse (6 months if over 35)</li>
              <li>Irregular cycles with variations greater than 7-9 days between shortest and longest cycles</li>
              <li>Consistently short (&lt;21 days) or long (&gt;35 days) menstrual cycles</li>
              <li>Severe menstrual pain, unusually heavy bleeding, or other concerning symptoms</li>
              <li>Known medical conditions that may affect fertility (PCOS, endometriosis, thyroid disorders)</li>
            </ul>
            <p><em><strong>Important Disclaimer:</strong> This ovulation calculator provides estimates based on average cycle patterns and should not be used as a form of birth control or for medical diagnosis. Always consult with a healthcare provider for personalized medical advice, especially if you have irregular cycles or underlying health conditions.</em></p>
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
            background: '#fff5f8', 
            borderRadius: '10px'
          }}>
            <h4 style={{marginBottom: '10px', color: '#c2185b'}}>
              <i className="fas fa-lightbulb"></i> Fertility Facts
            </h4>
            <ul style={{fontSize: '0.9rem', paddingLeft: '20px'}}>
              <li style={{marginBottom: '8px'}}>Sperm can live up to 5 days in fertile cervical mucus</li>
              <li style={{marginBottom: '8px'}}>The egg is viable for only 12-24 hours after ovulation</li>
              <li style={{marginBottom: '8px'}}>Regular cycles are 21-35 days with &lt;7 day variation</li>
              <li>About 20% of couples conceive in the first cycle of trying</li>
            </ul>
          </div>
        </aside>
      </main>
    </>
  );
}