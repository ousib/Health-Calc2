"use client";

import { useState, useEffect } from 'react';

export default function WaterPage() {
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [climate, setClimate] = useState('temperate');
  const [unit, setUnit] = useState('metric');
  const [waterAmount, setWaterAmount] = useState(null);
  const [bottles, setBottles] = useState(0);
  const [glasses, setGlasses] = useState(0);
  const [showFaq, setShowFaq] = useState({});

  const calculateWater = () => {
    const weightValue = parseFloat(weight);
    if (!weightValue || weightValue <= 0) {
      alert('Please enter a valid weight.');
      return;
    }

    let weightInKg = weightValue;
    if (unit === 'imperial') {
      weightInKg = weightValue * 0.453592;
    }

    let baseWater = weightInKg * 33;

    const activityMultipliers = {
      sedentary: 1.0,
      light: 1.1,
      moderate: 1.2,
      active: 1.3,
      athlete: 1.4
    };

    const climateMultipliers = {
      cool: 1.0,
      temperate: 1.1,
      warm: 1.2,
      hot: 1.3,
      humid: 1.25
    };

    let adjustedWater = baseWater * activityMultipliers[activityLevel] * climateMultipliers[climate];
    adjustedWater = Math.round(adjustedWater / 50) * 50;
    const liters = adjustedWater / 1000;

    const bottlesCount = Math.ceil((liters * 1000) / 500);
    const glassesCount = Math.ceil((liters * 1000) / 250);

    setWaterAmount(liters.toFixed(2));
    setBottles(bottlesCount);
    setGlasses(glassesCount);
  };

  const getActivityDescription = () => {
    const descriptions = {
      sedentary: 'Office work, little exercise',
      light: 'Light exercise 1-3 days/week',
      moderate: 'Moderate exercise 3-5 days/week',
      active: 'Active job or daily exercise',
      athlete: 'Intense training daily'
    };
    return descriptions[activityLevel];
  };

  const getClimateDescription = () => {
    const descriptions = {
      cool: 'Below 15°C (59°F)',
      temperate: '15-25°C (59-77°F)',
      warm: '25-30°C (77-86°F)',
      hot: 'Above 30°C (86°F)',
      humid: 'High humidity any temperature'
    };
    return descriptions[climate];
  };

  const toggleFaq = (index) => {
    setShowFaq(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const faqs = [
    {
      question: "How does water intake affect weight loss results?",
      answer: "Proper hydration significantly accelerates weight loss by boosting metabolic rate up to 30% for 30-40 minutes after consumption, suppressing appetite, and enhancing fat oxidation processes. Water consumption before meals reduces calorie intake by 75-90 calories per meal through gastric distension signaling."
    },
    {
      question: "What are the signs of dehydration to watch for?",
      answer: "Early dehydration indicators include dark yellow urine, dry mouth, fatigue, headache, dizziness, and reduced urine output. Advanced symptoms involve rapid heartbeat, sunken eyes, confusion, and minimal urine production. Monitoring urine color (aim for pale yellow) provides immediate hydration status feedback."
    },
    {
      question: "Does drinking more water improve skin health and complexion?",
      answer: "Adequate hydration maintains skin elasticity, supports collagen production, enhances skin barrier function, and improves circulation delivering nutrients to skin cells. Proper water intake reduces dryness, minimizes fine lines, and promotes a healthy complexion through optimal cellular hydration."
    },
    {
      question: "How does exercise intensity affect water requirements?",
      answer: "Exercise increases water needs through sweat losses ranging from 0.5-2.0 liters per hour depending on intensity. High-intensity training requires 150-350ml every 15-20 minutes during activity. Post-exercise, replace 150% of fluid lost to account for ongoing urinary losses and complete rehydration."
    },
    {
      question: "Can you drink too much water? What are the risks?",
      answer: "Excessive water consumption can cause hyponatremia (low sodium levels), particularly in endurance athletes. Symptoms include nausea, headache, confusion, and in severe cases, seizures. Healthy kidneys process about 800-1000ml per hour; exceeding this consistently may dilute essential electrolytes."
    }
  ];

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        calculateWater();
      }
    };

    document.addEventListener('keypress', handleKeyPress);
    return () => document.removeEventListener('keypress', handleKeyPress);
  }, [weight, activityLevel, climate, unit]);

  return (
    <>
      <style>{`
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
        }

        .water-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 30px;
        }
        .related-calculators a:hover {
          text-decoration: none;
        }
        @media (min-width: 768px) {
          .water-container {
            grid-template-columns: 1fr 300px;
            padding: 30px;
          }
        }

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

        .measurement-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }

        .input-group {
          margin-bottom: 15px;
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

        .input-group input,
        .input-group select {
          width: 100%;
          padding: 14px 16px;
          border: 2px solid #dfe6e9;
          border-radius: 10px;
          font-size: 1rem;
          outline: none;
          transition: all 0.3s;
        }

        .input-group input:focus,
        .input-group select:focus {
          border-color: #3498db;
          box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
        }

        .units-toggle {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .unit-btn {
          padding: 8px 16px;
          background: #f1f3f5;
          border: 2px solid #dfe6e9;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s;
        }

        .unit-btn.active {
          background: #3498db;
          color: white;
          border-color: #3498db;
        }

        .frame-selection {
          margin: 20px 0;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 10px;
        }

        .frame-tabs {
          display: flex;
          gap: 10px;
          margin-top: 15px;
          flex-wrap: wrap;
        }

        .frame-tab {
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
          flex: 1;
          min-width: 150px;
          justify-content: center;
        }

        .frame-tab.active {
          background: #3498db;
          color: white;
          border-color: #3498db;
        }

        .activity-desc {
          font-size: 0.9rem;
          color: #666;
          margin-top: 10px;
          text-align: center;
        }

        .calc-btn {
          width: 100%;
          padding: 16px;
          background: #3498db;
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
          background: #2980b9;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(52, 152, 219, 0.2);
        }

        .results-box {
          margin: 30px 0;
          padding: 25px;
          background: linear-gradient(135deg, #e8f7ff 0%, #d6eaf8 100%);
          border-radius: 12px;
          border-left: 5px solid #3498db;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }

        .water-result {
          font-size: clamp(2.5rem, 8vw, 3.5rem);
          font-weight: 800;
          display: block;
          margin: 10px 0;
          color: #3498db;
        }

        .weight-range-results {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          margin: 25px 0;
        }

        .weight-card {
          padding: 20px;
          background: white;
          border-radius: 10px;
          text-align: center;
          box-shadow: 0 3px 10px rgba(0,0,0,0.05);
          transition: transform 0.3s;
        }

        .weight-card:hover {
          transform: translateY(-3px);
        }

        .weight-card.ibw {
          border-left: 5px solid #3498db;
        }

        .weight-card.range {
          border-left: 5px solid #2980b9;
        }

        .weight-card.bmi {
          border-left: 5px solid #1abc9c;
        }

        .weight-card.adj {
          border-left: 5px solid #9b59b6;
        }

        .weight-value {
          font-size: 1.8rem;
          font-weight: bold;
          margin: 10px 0;
        }

        .bmi-chart {
          margin: 30px 0;
          padding: 20px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 3px 10px rgba(0,0,0,0.05);
        }

        .schedule-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 15px;
          margin-top: 20px;
        }

        .schedule-item {
          padding: 15px;
          background: #f8f9fa;
          border-radius: 8px;
          text-align: center;
        }

        .schedule-time {
          font-weight: bold;
          color: #2c3e50;
          margin-bottom: 5px;
        }

        .schedule-amount {
          font-size: 1.2rem;
          color: #3498db;
          font-weight: bold;
        }

        .schedule-icon {
          margin-top: 10px;
          font-size: 1.5rem;
          color: #7f8c8d;
        }

        .frame-guide {
          margin: 25px 0;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 10px;
          border-left: 4px solid #3498db;
        }

        .frame-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 15px;
          margin-top: 15px;
        }

        .frame-card {
          padding: 15px;
          background: white;
          border-radius: 8px;
          text-align: center;
        }

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
          border-left: 4px solid #3498db;
          overflow-x: auto;
        }

        .faq-section {
          margin: 30px 0;
          padding: 25px;
          background: #f8f9fa;
          border-radius: 12px;
          border-left: 4px solid #3498db;
        }

        .faq-item {
          margin-bottom: 15px;
          border-bottom: 1px solid #eee;
          padding-bottom: 15px;
        }

        .faq-question {
          font-weight: 600;
          color: #2c3e50;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
        }

        .faq-answer {
          padding: 15px;
          background: white;
          border-radius: 8px;
          margin-top: 10px;
          font-size: 0.95rem;
          color: #555;
          line-height: 1.6;
        }

        .sidebar {
          display: none;
        }

        @media (min-width: 768px) {
          .sidebar {
            display: block;
          }
        }

        .ad-slot {
          margin: 30px 0;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 10px;
          text-align: center;
          color: #7f8c8d;
          border: 1px dashed #ddd;
        }

        @media (max-width: 768px) {
          .calculator-box {
            padding: 20px;
          }
          
          .frame-tabs {
            flex-direction: column;
          }
          
          .weight-range-results {
            grid-template-columns: 1fr;
          }
          
          .frame-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .water-container {
            padding: 15px;
          }
          
          .calculator-box {
            padding: 15px;
          }
          
          .measurement-grid {
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

        ul {
          margin-left: 20px;
          margin-bottom: 15px;
          color: #555;
        }

        li {
          margin-bottom: 10px;
        }

        .keyword-highlight {
          background: #e8f7ff;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 600;
        }
      `}</style>

      {/* Add Font Awesome CSS */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

      <main className="water-container">
        <section className="calculator-box">
          <h1 className="calc-title"><i className="fas fa-tint"></i> Daily Water Intake Calculator</h1>
          <p className="calc-desc">Calculate your optimal daily water intake based on body weight, physical activity level, and climate conditions. Stay properly hydrated for optimal health.</p>
          
          <div className="units-toggle">
            <button 
              className={`unit-btn ${unit === 'metric' ? 'active' : ''}`}
              onClick={() => setUnit('metric')}
            >
              Metric (kg)
            </button>
            <button 
              className={`unit-btn ${unit === 'imperial' ? 'active' : ''}`}
              onClick={() => setUnit('imperial')}
            >
              Imperial (lbs)
            </button>
          </div>
          {/* Ad Section 1 - Below Unit Selection */}
          <div className="ad-slot" style={{ marginTop: '15px', marginBottom: '15px' }}>
            <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px', textAlign: 'center' }}>
              <i className="fas fa-ad" style={{ fontSize: '1.2rem', marginBottom: '5px', color: '#7f8c8d' }}></i>
              <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '5px' }}>Sponsored Content</p>
              <p style={{ fontSize: '0.8rem', color: '#999' }}>Premium Hydration Products - Stay Hydrated Longer</p>
            </div>
          </div>
          <div className="measurement-grid">
            <div className="input-group">
              <label><i className="fas fa-weight"></i> {unit === 'metric' ? 'Weight (kg)' : 'Weight (lbs)'}</label>
              <input 
                type="number" 
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder={unit === 'metric' ? '70' : '154'}
                min="20"
                max="300"
                step="0.1"
              />
            </div>
          </div>

          {/* Activity Level Selection */}
          <div className="frame-selection">
            <label><i className="fas fa-running"></i> Activity Level</label>
            <div className="frame-tabs">
              <button 
                className={`frame-tab ${activityLevel === 'sedentary' ? 'active' : ''}`}
                onClick={() => setActivityLevel('sedentary')}
              >
                <i className="fas fa-couch"></i> Sedentary
              </button>
              <button 
                className={`frame-tab ${activityLevel === 'light' ? 'active' : ''}`}
                onClick={() => setActivityLevel('light')}
              >
                <i className="fas fa-walking"></i> Light
              </button>
              <button 
                className={`frame-tab ${activityLevel === 'moderate' ? 'active' : ''}`}
                onClick={() => setActivityLevel('moderate')}
              >
                <i className="fas fa-bicycle"></i> Moderate
              </button>
              <button 
                className={`frame-tab ${activityLevel === 'active' ? 'active' : ''}`}
                onClick={() => setActivityLevel('active')}
              >
                <i className="fas fa-running"></i> Active
              </button>
              <button 
                className={`frame-tab ${activityLevel === 'athlete' ? 'active' : ''}`}
                onClick={() => setActivityLevel('athlete')}
              >
                <i className="fas fa-dumbbell"></i> Athlete
              </button>
            </div>
            <p className="activity-desc">{getActivityDescription()}</p>
          </div>

          {/* Climate Selection */}
          <div className="frame-selection">
            <label><i className="fas fa-temperature-high"></i> Climate Conditions</label>
            <div className="frame-tabs">
              <button 
                className={`frame-tab ${climate === 'cool' ? 'active' : ''}`}
                onClick={() => setClimate('cool')}
              >
                <i className="fas fa-snowflake"></i> Cool
              </button>
              <button 
                className={`frame-tab ${climate === 'temperate' ? 'active' : ''}`}
                onClick={() => setClimate('temperate')}
              >
                <i className="fas fa-cloud-sun"></i> Temperate
              </button>
              <button 
                className={`frame-tab ${climate === 'warm' ? 'active' : ''}`}
                onClick={() => setClimate('warm')}
              >
                <i className="fas fa-sun"></i> Warm
              </button>
              <button 
                className={`frame-tab ${climate === 'hot' ? 'active' : ''}`}
                onClick={() => setClimate('hot')}
              >
                <i className="fas fa-fire"></i> Hot
              </button>
              <button 
                className={`frame-tab ${climate === 'humid' ? 'active' : ''}`}
                onClick={() => setClimate('humid')}
              >
                <i className="fas fa-water"></i> Humid
              </button>
            </div>
            <p className="activity-desc">{getClimateDescription()}</p>
          </div>

                    {/* Ad Section 2 - Before Calculate Button */}
          <div className="ad-slot" style={{ marginTop: '10px', marginBottom: '10px' }}>
            <div style={{ padding: '12px', background: '#f0f7ff', borderRadius: '8px', borderLeft: '3px solid #3498db' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <i className="fas fa-flask" style={{ color: '#3498db' }}></i>
                <div>
                  <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '2px' }}><strong>Advertisement:</strong> Smart Water Bottles</p>
                  <p style={{ fontSize: '0.75rem', color: '#888' }}>Track your hydration with intelligent water tracking technology</p>
                </div>
              </div>
            </div>
          </div>

          <button className="calc-btn" onClick={calculateWater}>
            <i className="fas fa-calculator"></i> Calculate My Water Needs
          </button>

          {/* Results Section */}
          {waterAmount && (
            <div className="results-box">
              <h3 style={{ marginBottom: '20px', color: '#2c3e50' }}>
                <i className="fas fa-chart-line"></i> Your Hydration Analysis
              </h3>
              
              {/* Main Water Result */}
              <div style={{ textAlign: 'center', marginBottom: '25px', padding: '20px', background: 'white', borderRadius: '10px', borderLeft: '4px solid #3498db' }}>
                <h4><i className="fas fa-tint"></i> Daily Water Intake</h4>
                <span className="water-result">
                  {waterAmount} liters
                </span>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>
                  Recommended daily amount
                </p>
              </div>

              {/* Water Equivalent Cards */}
              <div className="weight-range-results">
                <div className="weight-card ibw">
                  <h4><i className="fas fa-wine-bottle"></i> Water Bottles</h4>
                  <div className="weight-value" style={{ color: '#3498db' }}>
                    {bottles} × 500ml
                  </div>
                  <p style={{ fontSize: '0.9rem', color: '#666' }}>Standard water bottles</p>
                </div>

                <div className="weight-card range">
                  <h4><i className="fas fa-glass-whiskey"></i> Glasses</h4>
                  <div className="weight-value" style={{ color: '#2980b9' }}>
                    {glasses} × 250ml
                  </div>
                  <p style={{ fontSize: '0.9rem', color: '#666' }}>Standard drinking glasses</p>
                </div>

                <div className="weight-card bmi">
                  <h4><i className="fas fa-hourglass-half"></i> Hourly Intake</h4>
                  <div className="weight-value" style={{ color: '#1abc9c' }}>
                    {(waterAmount / 16).toFixed(2)}L
                  </div>
                  <p style={{ fontSize: '0.9rem', color: '#666' }}>Per waking hour (16hr day)</p>
                </div>

                <div className="weight-card adj">
                  <h4><i className="fas fa-utensils"></i> With Meals</h4>
                  <div className="weight-value" style={{ color: '#9b59b6' }}>
                    {(waterAmount / 3).toFixed(2)}L
                  </div>
                  <p style={{ fontSize: '0.9rem', color: '#666' }}>Per meal (3 meals/day)</p>
                </div>
              </div>

              {/* Hydration Schedule */}
              <div className="bmi-chart">
                <h4 style={{ color: '#2c3e50', marginBottom: '15px' }}>
                  <i className="fas fa-clock"></i> Recommended Drinking Schedule
                </h4>
                <div className="schedule-grid">
                  {['Morning', 'Mid-Morning', 'Lunch', 'Afternoon', 'Evening', 'Night'].map((time, index) => (
                    <div key={time} className="schedule-item">
                      <div className="schedule-time">{time}</div>
                      <div className="schedule-amount">{((waterAmount * 1000) / 6).toFixed(0)}ml</div>
                      <div className="schedule-icon">
                        <i className={`fas fa-${index % 2 === 0 ? 'coffee' : 'glass-water'}`}></i>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

                    {/* Ad Section 3 - After Results/Hydration Tips */}
          <div className="ad-slot" style={{ marginTop: '25px', marginBottom: '25px' }}>
            <div style={{ 
              padding: '20px', 
              background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', 
              borderRadius: '10px',
              textAlign: 'center',
              border: '1px solid #dee2e6'
            }}>
              <div style={{ marginBottom: '10px' }}>
                <i className="fas fa-star" style={{ fontSize: '1.5rem', color: '#f39c12', marginBottom: '8px' }}></i>
                <p style={{ fontSize: '0.9rem', fontWeight: '600', color: '#2c3e50', marginBottom: '5px' }}>Premium Partner Advertisement</p>
                <p style={{ fontSize: '0.8rem', color: '#666' }}>Discover our recommended hydration supplements for optimal performance</p>
              </div>
              <div style={{ 
                padding: '10px', 
                background: 'white', 
                borderRadius: '6px',
                marginTop: '10px',
                border: '1px dashed #ddd'
              }}>
                <p style={{ fontSize: '0.75rem', color: '#888' }}>Advertisement Space - 728x90px</p>
              </div>
            </div>
          </div>
                    {/* Related Calculators Section */}
          <div className="related-calculators" style={{ 
            margin: '30px 0', 
            padding: '25px', 
            background: 'linear-gradient(135deg, #e8f7ff 0%, #d6eaf8 100%)',
            borderRadius: '12px',
            borderLeft: '4px solid #3498db'
          }}>
            <h4 style={{ 
              color: '#2c3e50', 
              marginBottom: '20px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px' 
            }}>
              <i className="fas fa-exchange-alt"></i> Related Hydration Calculators
            </h4>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '15px' 
            }}>
              <a 
                href="/water-bottle-tracker" 
                style={{
                  display: 'block',
                  padding: '20px',
                  background: 'white',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  color: '#333',
                  transition: 'all 0.3s',
                  border: '1px solid #e9ecef',
                  textAlign: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
                  e.currentTarget.style.borderColor = '#3498db';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = '#e9ecef';
                }}
              >
                <div style={{ 
                  width: '50px', 
                  height: '50px', 
                  background: '#3498db', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  margin: '0 auto 15px',
                  color: 'white',
                  fontSize: '1.2rem'
                }}>
                  <i className="fas fa-hourglass-half"></i>
                </div>
                <h5 style={{ 
                  color: '#2c3e50', 
                  marginBottom: '10px',
                  fontSize: '1.1rem'
                }}>
                  Water Bottle Tracker
                </h5>
                <p style={{ 
                  fontSize: '0.85rem', 
                  color: '#666',
                  lineHeight: '1.5'
                }}>
                  Track your daily water consumption and set hydration goals
                </p>
              </a>
              
              <a 
                href="/electrolyte-calculator" 
                style={{
                  display: 'block',
                  padding: '20px',
                  background: 'white',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  color: '#333',
                  transition: 'all 0.3s',
                  border: '1px solid #e9ecef',
                  textAlign: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
                  e.currentTarget.style.borderColor = '#3498db';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = '#e9ecef';
                }}
              >
                <div style={{ 
                  width: '50px', 
                  height: '50px', 
                  background: '#9b59b6', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  margin: '0 auto 15px',
                  color: 'white',
                  fontSize: '1.2rem'
                }}>
                  <i className="fas fa-bolt"></i>
                </div>
                <h5 style={{ 
                  color: '#2c3e50', 
                  marginBottom: '10px',
                  fontSize: '1.1rem'
                }}>
                  Electrolyte Calculator
                </h5>
                <p style={{ 
                  fontSize: '0.85rem', 
                  color: '#666',
                  lineHeight: '1.5'
                }}>
                  Calculate optimal electrolyte needs for exercise and recovery
                </p>
              </a>
              
              <a 
                href="/hydration-schedule" 
                style={{
                  display: 'block',
                  padding: '20px',
                  background: 'white',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  color: '#333',
                  transition: 'all 0.3s',
                  border: '1px solid #e9ecef',
                  textAlign: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
                  e.currentTarget.style.borderColor = '#3498db';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = '#e9ecef';
                }}
              >
                <div style={{ 
                  width: '50px', 
                  height: '50px', 
                  background: '#1abc9c', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  margin: '0 auto 15px',
                  color: 'white',
                  fontSize: '1.2rem'
                }}>
                  <i className="fas fa-calendar-alt"></i>
                </div>
                <h5 style={{ 
                  color: '#2c3e50', 
                  marginBottom: '10px',
                  fontSize: '1.1rem'
                }}>
                  Hydration Schedule Planner
                </h5>
                <p style={{ 
                  fontSize: '0.85rem', 
                  color: '#666',
                  lineHeight: '1.5'
                }}>
                  Create personalized drinking schedules for optimal hydration
                </p>
              </a>
            </div>
            
            <div style={{ 
              marginTop: '20px', 
              paddingTop: '15px', 
              borderTop: '1px solid #dee2e6',
              textAlign: 'center'
            }}>
              <a 
                href="/health-calculators" 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#3498db',
                  textDecoration: 'none',
                  fontWeight: '500',
                  fontSize: '0.9rem',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#2980b9'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#3498db'}
              >
                <i className="fas fa-arrow-right"></i>
                View All Health Calculators
              </a>
            </div>
          </div>    
          {/* Enhanced SEO Content Section (1000+ words) */}
          <div className="info-section">
            <h3><i className="fas fa-stethoscope"></i> Comprehensive Guide to Optimal Hydration: Science-Based Water Intake Recommendations for Health Optimization</h3>
            
            <p>Understanding your <span className="keyword-highlight">individual hydration requirements</span> represents a fundamental pillar of preventive healthcare and athletic performance optimization. Our <span className="keyword-highlight">scientific water intake calculator</span> employs evidence-based algorithms derived from clinical hydration research, considering multiple physiological variables to provide personalized <span className="keyword-highlight">daily water consumption recommendations</span>.</p>
            
            <h3><i className="fas fa-calculator"></i> Advanced Hydration Calculation Methodology: Precision Fluid Requirement Assessment</h3>
            
            <p>The <span className="keyword-highlight">hydration calculation formula</span> utilized in this tool follows established scientific protocols endorsed by sports medicine organizations and clinical nutrition boards. The foundational equation begins with the standard <span className="keyword-highlight">body weight hydration ratio</span> of 30-35 milliliters per kilogram, which serves as the baseline for <span className="keyword-highlight">sedentary individual water needs</span>. This base requirement undergoes sophisticated adjustments through <span className="keyword-highlight">physical activity multipliers</span> that account for <span className="keyword-highlight">sweat loss quantification</span> during exercise and <span className="keyword-highlight">environmental condition factors</span> that address <span className="keyword-highlight">thermoregulatory water expenditure</span>.</p>
            
            <div className="formula-box">
              <strong>Comprehensive Hydration Calculation Algorithm:</strong><br />
              Base Hydration = Body Weight (kg) × 33 ml/kg<br /><br />
              
              <strong>Activity Level Adjustment Coefficients:</strong><br />
              Sedentary Lifestyle: ×1.0 (Office-based occupations)<br />
              Light Physical Activity: ×1.1 (1-3 exercise sessions weekly)<br />
              Moderate Exercise Regimen: ×1.2 (3-5 training sessions weekly)<br />
              Active Daily Routine: ×1.3 (Physically demanding occupation)<br />
              Athletic Training Schedule: ×1.4 (Daily intense physical preparation)<br /><br />
              
              <strong>Environmental Climate Multipliers:</strong><br />
              Cool Conditions: ×1.0 (Below 15°C / 59°F)<br />
              Temperate Climate: ×1.1 (15-25°C / 59-77°F)<br />
              Warm Environment: ×1.2 (25-30°C / 77-86°F)<br />
              Hot Conditions: ×1.3 (Above 30°C / 86°F)<br />
              Humid Atmosphere: ×1.25 (Elevated humidity levels)<br /><br />
              
              <strong>Clinical Example Calculation:</strong> 75kg individual, moderate activity, warm climate<br />
              Base Requirement: 75 × 33 = 2,475 ml<br />
              Activity Adjustment: 2,475 × 1.2 = 2,970 ml<br />
              Climate Adjustment: 2,970 × 1.2 = <strong>3,564 ml (3.56L daily)</strong>
            </div>

            <h3><i className="fas fa-brain"></i> Cognitive Performance Enhancement Through Optimal Hydration</h3>
            
            <p>Emerging neuroscience research demonstrates that even <span className="keyword-highlight">mild dehydration levels</span> (1-2% body mass reduction) produce measurable declines in <span className="keyword-highlight">cognitive function metrics</span>, including reduced <span className="keyword-highlight">attention span duration</span>, impaired <span className="keyword-highlight">short-term memory retention</span>, compromised <span className="keyword-highlight">executive function capabilities</span>, and diminished <span className="keyword-highlight">psychomotor coordination skills</span>. Proper hydration maintains <span className="keyword-highlight">cerebral blood flow optimization</span>, supports <span className="keyword-highlight">neurotransmitter production</span>, and facilitates <span className="keyword-highlight">waste metabolite clearance</span> from brain tissues.</p>

            <h3><i className="fas fa-dumbbell"></i> Athletic Performance Optimization: Hydration Strategies for Exercise Enhancement</h3>
            
            <p>For competitive athletes and fitness enthusiasts, implementing <span className="keyword-highlight">structured hydration protocols</span> represents a critical component of <span className="keyword-highlight">performance optimization strategies</span>. <span className="keyword-highlight">Pre-exercise hydration preparation</span> should include 500-600ml consumed 2-3 hours before activity commencement, followed by 200-300ml 20-30 minutes prior to exercise initiation. <span className="keyword-highlight">During-exercise fluid replacement</span> guidelines recommend 150-350ml every 15-20 minutes, adjusted according to <span className="keyword-highlight">exercise intensity quantification</span> and <span className="keyword-highlight">environmental condition assessment</span>. <span className="keyword-highlight">Post-exercise rehydration protocols</span> should replace 150% of fluid losses (typically 1.5 liters per kilogram of body weight reduction), with particular attention to <span className="keyword-highlight">electrolyte restoration</span> for training sessions exceeding 60 minutes duration.</p>

            <h3><i className="fas fa-weight"></i> Weight Management Synergy: Hydration's Role in Metabolic Optimization</h3>
            
            <p>Strategic hydration significantly enhances <span className="keyword-highlight">weight management outcomes</span> through multiple interconnected physiological mechanisms. Water consumption stimulates <span className="keyword-highlight">metabolic rate acceleration</span> by approximately 30% for 30-40 minutes following ingestion, contributing to <span className="keyword-highlight">increased caloric expenditure</span>. Adequate hydration supports <span className="keyword-highlight">appetite regulation mechanisms</span> by improving differentiation between hunger and thirst signals. Water ingestion before meals reduces <span className="keyword-highlight">caloric intake quantities</span> by promoting <span className="keyword-highlight">gastric distension signaling</span> of satiety. Furthermore, optimal hydration facilitates <span className="keyword-highlight">lipid oxidation processes</span> and supports <span className="keyword-highlight">cellular energy production</span> during weight reduction efforts.</p>

            <h3><i className="fas fa-heart"></i> Cardiovascular Health Protection: Hydration's Systemic Benefits</h3>
            
            <p>Maintaining proper hydration supports <span className="keyword-highlight">cardiovascular system function</span> through multiple protective mechanisms. Adequate fluid intake maintains <span className="keyword-highlight">blood volume optimization</span>, reducing strain on the cardiovascular system and supporting <span className="keyword-highlight">blood pressure regulation</span>. Proper hydration improves <span className="keyword-highlight">blood viscosity characteristics</span>, enhancing circulation efficiency and reducing <span className="keyword-highlight">cardiovascular workload demands</span>. Additionally, optimal hydration supports <span className="keyword-highlight">electrolyte balance maintenance</span>, crucial for proper <span className="keyword-highlight">cardiac muscle function</span> and <span className="keyword-highlight">electrical conduction system</span> stability.</p>

            <h3><i className="fas fa-user-md"></i> Special Population Considerations: Individualized Hydration Requirements</h3>
            
            <p>Hydration needs vary significantly across different <span className="keyword-highlight">demographic populations</span> and <span className="keyword-highlight">health status categories</span>. <span className="keyword-highlight">Geriatric individuals</span> experience diminished <span className="keyword-highlight">thirst sensation mechanisms</span> and reduced <span className="keyword-highlight">renal concentrating capacity</span>, necessitating proactive hydration monitoring. <span className="keyword-highlight">Pregnant women</span> require additional fluids to support <span className="keyword-highlight">amniotic fluid maintenance</span> and accommodate <span className="keyword-highlight">increased circulatory volume</span> demands. <span className="keyword-highlight">Lactating mothers</span> need extra hydration for <span className="keyword-highlight">milk production requirements</span>. Individuals with <span className="keyword-highlight">renal conditions</span>, <span className="keyword-highlight">cardiac compromise</span>, or prescribed <span className="keyword-highlight">diuretic medications</span> require medically supervised hydration management protocols.</p>

            <h3><i className="fas fa-tint"></i> Water Quality Assessment: Source Selection and Purification Technologies</h3>
            
            <p>Beyond quantity considerations, <span className="keyword-highlight">water quality evaluation</span> significantly impacts health outcomes and hydration effectiveness. <span className="keyword-highlight">Municipal water systems</span> undergo comprehensive treatment for <span className="keyword-highlight">pathogen elimination</span> and <span className="keyword-highlight">contaminant reduction</span>, with variable mineral composition based on geological sources. <span className="keyword-highlight">Bottled water alternatives</span> offer convenience but raise concerns regarding <span className="keyword-highlight">environmental sustainability</span> and potential <span className="keyword-highlight">microplastic contamination</span>. <span className="keyword-highlight">Home filtration solutions</span> provide balanced approaches through <span className="keyword-highlight">activated carbon systems</span>, <span className="keyword-highlight">reverse osmosis units</span>, or <span className="keyword-highlight">distillation technologies</span>. <span className="keyword-highlight">Mineral water selections</span> contribute to <span className="keyword-highlight">electrolyte intake</span>, particularly providing <span className="keyword-highlight">magnesium supplementation</span>, <span className="keyword-highlight">calcium fortification</span>, and <span className="keyword-highlight">bicarbonate concentration</span> benefits.</p>

            {/* FAQ Section */}
            <div className="faq-section">
              <h3 style={{ color: '#2c3e50', marginBottom: '20px' }}>
                <i className="fas fa-question-circle"></i> Frequently Asked Questions About Hydration and Water Intake
              </h3>
              
              {faqs.map((faq, index) => (
                <div key={index} className="faq-item">
                  <div 
                    className="faq-question"
                    onClick={() => toggleFaq(index)}
                  >
                    <span>{faq.question}</span>
                    <i className={`fas fa-chevron-${showFaq[index] ? 'up' : 'down'}`}></i>
                  </div>
                  {showFaq[index] && (
                    <div className="faq-answer">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <h3><i className="fas fa-check-circle"></i> Implementation Strategies: Developing Sustainable Hydration Habits</h3>
            
            <p>To establish consistent <span className="keyword-highlight">hydration practices</span> that support long-term health and performance:</p>
            <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
              <li style={{ marginBottom: '10px' }}><strong>Morning Hydration Protocol:</strong> Initiate each day with 500ml water to replenish overnight fluid losses and stimulate metabolic processes</li>
              <li style={{ marginBottom: '10px' }}><strong>Pre-Meal Water Consumption Strategy:</strong> Consume 250ml water 30 minutes before each meal to support digestive preparation and appetite modulation</li>
              <li style={{ marginBottom: '10px' }}><strong>Workplace Hydration System:</strong> Maintain visible water containers at workstations with scheduled refill reminders at strategic intervals (10am, 2pm, 4pm)</li>
              <li style={{ marginBottom: '10px' }}><strong>Exercise Hydration Framework:</strong> Implement structured pre-activity, during-activity, and post-activity fluid replacement protocols</li>
              <li style={{ marginBottom: '10px' }}><strong>Evening Hydration Balance:</strong> Consume majority of fluids earlier in the day, reducing intake 2 hours before bedtime to minimize sleep disruption</li>
              <li><strong>Hydration Monitoring Methods:</strong> Utilize digital tracking applications, graduated water containers, or daily consumption checklists to maintain intake consistency</li>
            </ul>
          </div>
        </section>

        <aside className="sidebar">
          <div className="sidebar-widget">
            <h4 style={{ marginBottom: '15px', color: '#2c3e50' }}>
              <i className="fas fa-bullhorn"></i> Advertisement
            </h4>
            <div style={{ height: '600px', background: '#f8f9fa', border: '2px dashed #ddd', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#7f8c8d' }}>
              <i className="fas fa-ad" style={{ fontSize: '2rem', marginBottom: '10px' }}></i>
              <p>Advertisement Space</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>300x600px</p>
            </div>
          </div>
          
          <div style={{ marginTop: '30px', padding: '20px', background: '#e8f7ff', borderRadius: '10px' }}>
            <h4 style={{ marginBottom: '10px', color: '#3498db' }}>
              <i className="fas fa-lightbulb"></i> Hydration Optimization Tips
            </h4>
            <ul style={{ fontSize: '0.9rem', paddingLeft: '20px' }}>
              <li style={{ marginBottom: '8px' }}>Drink water immediately upon waking to activate metabolism</li>
              <li style={{ marginBottom: '8px' }}>Infuse water with citrus fruits or herbs for enhanced flavor</li>
              <li style={{ marginBottom: '8px' }}>Monitor urine color consistently - target pale straw color</li>
              <li style={{ marginBottom: '8px' }}>Increase hydration during illness recovery phases</li>
              <li>Utilize hydration tracking apps for consistency monitoring</li>
            </ul>
          </div>
        </aside>
      </main>
    </>
  );
}