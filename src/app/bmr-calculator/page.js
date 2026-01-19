"use client";

import { useState, useEffect } from 'react';

export default function BMRPage() {
  const [currentUnit, setCurrentUnit] = useState('metric');
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmrResult, setBmrResult] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [tdeeResult, setTdeeResult] = useState(null);

  // Sample data for demo
  useEffect(() => {
    setAge('30');
    setWeight('70');
    setHeight('175');
  }, []);

  const toggleUnits = (unit) => {
    setCurrentUnit(unit);
    setBmrResult(null);
    setSelectedActivity(null);
    setTdeeResult(null);
  };

  const calculateBMR = () => {
    const ageVal = parseFloat(age);
    let weightVal = parseFloat(weight);
    let heightVal = parseFloat(height);
    
    if (!ageVal || !weightVal || !heightVal || ageVal <= 0 || weightVal <= 0 || heightVal <= 0) {
      alert('Please fill in all fields with valid numbers.');
      return;
    }
    
    // Convert imperial to metric if needed
    if (currentUnit === 'imperial') {
      weightVal = weightVal * 0.453592;
      heightVal = heightVal * 2.54;
    }
    
    let bmr;
    
    if (gender === 'male') {
      bmr = (10 * weightVal) + (6.25 * heightVal) - (5 * ageVal) + 5;
    } else {
      bmr = (10 * weightVal) + (6.25 * heightVal) - (5 * ageVal) - 161;
    }
    
    const roundedBMR = Math.round(bmr);
    setBmrResult(roundedBMR);
    setSelectedActivity(null);
    setTdeeResult(null);
  };
  
  const selectActivity = (multiplier, name) => {
    setSelectedActivity({ multiplier, name });
    const tdee = Math.round(bmrResult * multiplier);
    setTdeeResult(tdee);
  };

  const activityLevels = [
    { multiplier: 1.2, name: 'Sedentary', desc: 'Little or no exercise' },
    { multiplier: 1.375, name: 'Lightly Active', desc: 'Light exercise 1-3 days/week' },
    { multiplier: 1.55, name: 'Moderately Active', desc: 'Moderate exercise 3-5 days/week' },
    { multiplier: 1.725, name: 'Very Active', desc: 'Hard exercise 6-7 days/week' },
    { multiplier: 1.9, name: 'Extra Active', desc: 'Very hard exercise & physical job' }
  ];

  // Handle Enter key press
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        calculateBMR();
      }
    };

    document.addEventListener('keypress', handleKeyPress);
    return () => document.removeEventListener('keypress', handleKeyPress);
  }, [age, weight, height, gender, currentUnit]);

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
        .input-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 15px;
          margin-bottom: 20px;
        }

        .input-group { 
          margin-bottom: 15px; 
        }
        
        .input-group label { 
          display: block; 
          font-weight: 600; 
          margin-bottom: 8px; 
          color: #34495e; 
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        
        .input-group input, .input-group select { 
          width: 100%; 
          padding: 14px 16px; 
          border: 2px solid #dfe6e9; 
          border-radius: 10px; 
          font-size: 1rem; 
          outline: none; 
          transition: all 0.3s;
        }
        
        .input-group input:focus, .input-group select:focus { 
          border-color: #9b59b6; 
          box-shadow: 0 0 0 3px rgba(155, 89, 182, 0.1);
        }

        /* Units Toggle */
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
          margin: 10px 0 20px;
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
          background: linear-gradient(135deg, #fdfaff 0%, #f5f0ff 100%);
          border-radius: 12px; 
          border-left: 5px solid #9b59b6;
          text-align: center;
          display: ${bmrResult ? 'block' : 'none'}; 
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        
        .bmr-val { 
          font-size: clamp(2.5rem, 8vw, 3.5rem); 
          font-weight: 800; 
          display: block; 
          margin: 10px 0; 
          color: #9b59b6; 
        }

        /* Activity Multiplier Section */
        .activity-section {
          margin: 30px 0;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 10px;
          display: ${bmrResult ? 'block' : 'none'};
        }

        .activity-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          margin-top: 15px;
        }

        .activity-card {
          background: white;
          padding: 15px;
          border-radius: 8px;
          border: 2px solid #e0e0e0;
          cursor: pointer;
          transition: all 0.3s;
        }

        .activity-card:hover {
          border-color: #9b59b6;
          transform: translateY(-3px);
        }

        .activity-card.selected {
          border-color: #9b59b6;
          background: #fdfaff;
        }

        /* SEO Content Styles */
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
          border-left: 4px solid #9b59b6;
          overflow-x: auto;
        }

        .formula-box strong {
          color: #9b59b6;
        }

        /* Sidebar */
        .sidebar {
          display: none; /* Hidden by default on mobile */
        }

        /* Ad Slots */
        .ad-slot {
          margin: 30px 0;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 10px;
          text-align: center;
          color: #7f8c8d;
          border: 1px dashed #ddd;
        }

        /* Energy Expenditure Comparison */
        .comparison-chart {
          margin: 30px 0;
          padding: 20px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 3px 10px rgba(0,0,0,0.05);
        }

        .chart-bar {
          height: 30px;
          background: #ecf0f1;
          border-radius: 15px;
          margin: 10px 0;
          position: relative;
          overflow: hidden;
        }

        .chart-fill {
          height: 100%;
          background: linear-gradient(90deg, #9b59b6, #8e44ad);
          border-radius: 15px;
          transition: width 1s ease;
        }

        /* Responsive Styles */
        @media (min-width: 768px) {
          .container {
            grid-template-columns: 1fr;
            padding: 30px;
          }

          .sidebar {
            display: none;
          }

          .input-grid {
            grid-template-columns: repeat(3, 1fr);
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
          
          .input-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .activity-grid {
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
          
          .input-grid {
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
          .ad-slot, .sidebar, .calc-btn {
            display: none;
          }
          
          .results-box {
            border: 2px solid #333;
          }
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
      `}</style>

      <main className="container">
        <section className="calculator-box">
          <h1 className="calc-title"><i className="fas fa-bed"></i> Basal Metabolic Rate (BMR) Calculator - Free Metabolic Calculator Tool</h1>
          <p className="calc-desc">Calculate your Basal Metabolic Rate (BMR) - the number of calories your body burns at complete rest. Essential for <strong>weight loss planning, calorie deficit calculation, and metabolic rate analysis</strong>.</p>
          
          <div className="units-toggle">
            <button 
              className={`unit-btn ${currentUnit === 'metric' ? 'active' : ''}`} 
              onClick={() => toggleUnits('metric')}
            >
              Metric (kg/cm)
            </button>
            <button 
              className={`unit-btn ${currentUnit === 'imperial' ? 'active' : ''}`} 
              onClick={() => toggleUnits('imperial')}
            >
              Imperial (lbs/in)
            </button>
          </div>
          
          <div className="input-group">
            <label><i className="fas fa-venus-mars"></i> Gender</label>
            <select 
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="input-grid">
            <div className="input-group">
              <label><i className="fas fa-birthday-cake"></i> Age</label>
              <input 
                type="number" 
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="25" 
                min="15" 
                max="100"
              />
            </div>
            <div className="input-group">
              <label><i className="fas fa-weight"></i> {currentUnit === 'metric' ? 'Weight (kg)' : 'Weight (lbs)'}</label>
              <input 
                type="number" 
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder={currentUnit === 'metric' ? '70' : '154'}
                min="30" 
                max="300" 
                step="0.1"
              />
            </div>
            <div className="input-group">
              <label><i className="fas fa-ruler-vertical"></i> {currentUnit === 'metric' ? 'Height (cm)' : 'Height (in)'}</label>
              <input 
                type="number" 
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder={currentUnit === 'metric' ? '175' : '69'}
                min="100" 
                max="250" 
                step="0.1"
              />
            </div>
          </div>

          <button className="calc-btn" onClick={calculateBMR}>
            <i className="fas fa-calculator"></i> Calculate Basal Metabolic Rate
          </button>

          <div className="results-box" style={{ display: bmrResult ? 'block' : 'none' }}>
            <h3>Your Resting Metabolic Rate Calculation</h3>
            <span className="bmr-val">{bmrResult?.toLocaleString() || '--'}</span>
            <p>Calories per day at complete rest</p>
            <p style={{ fontSize: '0.9rem', color: '#7f8c8d', marginTop: '10px' }}>
              <i className="fas fa-info-circle"></i> This is your <strong>minimum daily calorie requirement</strong> for basic physiological functions
            </p>
          </div>

          <div className="activity-section" style={{ display: bmrResult ? 'block' : 'none' }}>
            <h3><i className="fas fa-running"></i> Activity Level Adjustment - Calculate Your TDEE (Total Daily Energy Expenditure)</h3>
            <p style={{ fontSize: '0.95rem', marginBottom: '15px', color: '#666' }}>
              Select your activity level to estimate your <strong>Total Daily Energy Expenditure (TDEE)</strong> for <strong>weight maintenance calorie calculation</strong>:
            </p>
            
            <div className="activity-grid">
              {activityLevels.map((activity) => (
                <div 
                  key={activity.multiplier}
                  className={`activity-card ${selectedActivity?.multiplier === activity.multiplier ? 'selected' : ''}`}
                  onClick={() => selectActivity(activity.multiplier, activity.name)}
                >
                  <h4>{activity.name}</h4>
                  <p style={{ fontSize: '0.85rem', color: '#666' }}>{activity.desc}</p>
                  <p style={{ fontWeight: 'bold', color: '#9b59b6', marginTop: '5px' }}>× {activity.multiplier}</p>
                </div>
              ))}
            </div>
            
            <div id="tdeeResult" style={{ marginTop: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '8px', display: tdeeResult ? 'block' : 'none' }}>
              <h4>Daily Calorie Needs for Weight Maintenance</h4>
              <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#9b59b6' }}>{tdeeResult?.toLocaleString() || '--'} calories/day</p>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>Total Daily Energy Expenditure (TDEE) - <strong>Your weight maintenance calories</strong></p>
            </div>
          </div>

          <div className="ad-slot">
            <p><i className="fas fa-ad"></i> Advertisement</p>
            <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Your ad could be here</p>
          </div>

          {/* Energy Expenditure Comparison */}
          <div className="comparison-chart">
            <h3><i className="fas fa-chart-bar"></i> Daily Energy Expenditure Breakdown - How Your Body Burns Calories</h3>
            <p style={{ fontSize: '0.95rem', color: '#666', marginBottom: '15px' }}>
              Understanding your <strong>calorie expenditure distribution</strong> is crucial for <strong>effective weight management strategies</strong>:
            </p>
            
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span>Basal Metabolic Rate (BMR) - Resting Energy Expenditure</span>
                <span>60-75%</span>
              </div>
              <div className="chart-bar">
                <div className="chart-fill" style={{ width: '70%' }}></div>
              </div>
            </div>
            
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span>Physical Activity - Exercise & Non-Exercise Activity Thermogenesis</span>
                <span>15-30%</span>
              </div>
              <div className="chart-bar">
                <div className="chart-fill" style={{ width: '25%' }}></div>
              </div>
            </div>
            
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span>Thermic Effect of Food - Diet-Induced Thermogenesis</span>
                <span>10%</span>
              </div>
              <div className="chart-bar">
                <div className="chart-fill" style={{ width: '10%' }}></div>
              </div>
            </div>
          </div>

          {/* Enhanced SEO Content with High-Value Long-Tail Keywords */}
          <div className="info-section">
            <h3><i className="fas fa-question-circle"></i> What is Basal Metabolic Rate (BMR)? - Essential Guide to Resting Metabolic Rate Calculation</h3>
            <p><strong>Basal Metabolic Rate (BMR)</strong>, also known as <strong>resting metabolic rate calculation</strong>, represents the <strong>minimum number of calories required for vital body functions</strong> while at complete rest. This <strong>essential metabolic calculation</strong> accounts for approximately <strong>60-75% of total daily energy expenditure</strong>, making it the foundation for <strong>personalized weight management planning</strong> and <strong>precision nutrition strategies</strong>.</p>

            <h3><i className="fas fa-calculator"></i> BMR Formula Explained: Mifflin-St Jeor Equation for Accurate Metabolic Rate Prediction</h3>
            <p>Our <strong>advanced metabolic calculator</strong> utilizes the <strong>Mifflin-St Jeor Equation</strong>, recognized by the <strong>American Dietetic Association</strong> as the <strong>most accurate BMR prediction formula</strong> for modern populations. This <strong>evidence-based metabolic calculation method</strong> provides <strong>precise resting energy expenditure estimates</strong> for both men and women.</p>
            
            <div className="formula-box">
              <strong>Mifflin-St Jeor Formula for Men:</strong> BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5<br/><br/>
              <strong>Mifflin-St Jeor Formula for Women:</strong> BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161<br/><br/>
              <strong>Formula Accuracy:</strong> ±10% of measured metabolic rate in clinical studies
            </div>

            <h3><i className="fas fa-heartbeat"></i> Why Calculate Your BMR? - Key to Effective Weight Loss and Maintenance Strategies</h3>
            <p>Understanding your <strong>personal basal metabolic rate</strong> is crucial for several <strong>health and fitness applications</strong>:</p>
            <ul>
              <li><strong>Weight Loss Planning:</strong> Create <strong>safe calorie deficit calculations</strong> that promote <strong>sustainable fat loss</strong> without <strong>metabolic adaptation issues</strong></li>
              <li><strong>Muscle Gain Optimization:</strong> Determine <strong>calorie surplus requirements</strong> for <strong>lean muscle mass development</strong></li>
              <li><strong>Metabolic Health Assessment:</strong> Identify potential <strong>metabolic slowdown indicators</strong> or <strong>thyroid function concerns</strong></li>
              <li><strong>Personalized Nutrition Planning:</strong> Establish <strong>accurate daily calorie targets</strong> for <strong>individualized diet plans</strong></li>
              <li><strong>Medical Weight Management:</strong> Support <strong>clinical weight loss programs</strong> and <strong>bariatric surgery preparations</strong></li>
            </ul>
            
            <h3><i className="fas fa-balance-scale"></i> BMR vs. TDEE: Understanding Total Daily Energy Expenditure for Weight Management</h3>
            <p>While <strong>BMR represents resting energy needs</strong>, <strong>Total Daily Energy Expenditure (TDEE)</strong> includes <strong>all daily calorie burn components</strong>:</p>
            <ul>
              <li><strong>Basal Metabolic Rate (BMR):</strong> Calories burned for <strong>basic physiological functions</strong> at complete rest</li>
              <li><strong>Non-Exercise Activity Thermogenesis (NEAT):</strong> Calories from <strong>daily non-exercise movements</strong></li>
              <li><strong>Exercise Activity Thermogenesis (EAT):</strong> Calories burned during <strong>structured workout sessions</strong></li>
              <li><strong>Thermic Effect of Food (TEF):</strong> Calories used for <strong>food digestion and nutrient processing</strong></li>
            </ul>
            
            <h3><i className="fas fa-chart-line"></i> Factors Influencing Your Metabolic Rate - Comprehensive Metabolic Determinants Analysis</h3>
            <p>Your <strong>individual metabolic rate calculation</strong> depends on multiple <strong>physiological and lifestyle factors</strong>:</p>
            <ul>
              <li><strong>Body Composition Impact:</strong> Muscle mass increases <strong>resting metabolic rate</strong> while fat tissue has <strong>lower metabolic activity</strong></li>
              <li><strong>Age-Related Metabolic Changes:</strong> Metabolic rate typically decreases <strong>2-3% per decade</strong> after age 20</li>
              <li><strong>Genetic Metabolic Variations:</strong> Inherited factors can influence <strong>individual metabolic efficiency</strong></li>
              <li><strong>Hormonal Regulation:</strong> Thyroid hormones, cortisol, and sex hormones significantly affect <strong>metabolic rate calculations</strong></li>
              <li><strong>Environmental Factors:</strong> Temperature extremes and altitude can temporarily alter <strong>energy expenditure patterns</strong></li>
            </ul>

            <h3><i className="fas fa-utensils"></i> Practical Applications: Using Your BMR for Effective Diet and Exercise Planning</h3>
            <p>Apply your <strong>BMR calculation results</strong> to create <strong>evidence-based health strategies</strong>:</p>
            <ul>
              <li><strong>Weight Loss Calculation:</strong> Subtract 500 calories from your TDEE for <strong>safe 1-pound per week weight loss</strong></li>
              <li><strong>Muscle Building Protocol:</strong> Add 250-500 calories to your TDEE for <strong>lean mass gain optimization</strong></li>
              <li><strong>Metabolic Reset Strategies:</strong> Temporarily eat at BMR level for <strong>metabolic adaptation correction</strong></li>
              <li><strong>Macronutrient Distribution:</strong> Allocate protein, carbs, and fats based on <strong>total energy requirements</strong></li>
              <li><strong>Reverse Dieting Approach:</strong> Gradually increase calories from BMR to <strong>metabolic damage repair</strong></li>
            </ul>

            <h3><i className="fas fa-exclamation-triangle"></i> Metabolic Adaptation and Plateaus: Understanding Why Weight Loss Slows Over Time</h3>
            <p>As you lose weight, your <strong>metabolic rate naturally decreases</strong> due to several <strong>physiological adaptations</strong>:</p>
            <ul>
              <li><strong>Reduced Body Mass:</strong> Smaller bodies require <strong>fewer maintenance calories</strong></li>
              <li><strong>Metabolic Efficiency:</strong> The body becomes <strong>more efficient at energy utilization</strong></li>
              <li><strong>Hormonal Changes:</strong> Leptin decreases while ghrelin increases, <strong>promoting hunger and reducing expenditure</strong></li>
              <li><strong>Adaptive Thermogenesis:</strong> The body <strong>reduces non-essential energy expenditure</strong> during calorie restriction</li>
            </ul>
            <p>To combat <strong>weight loss plateaus</strong>, regularly <strong>recalculate your BMR</strong> and adjust your <strong>calorie intake accordingly</strong>.</p>
          </div>
        </section>

        <aside className="sidebar">
          <div className="sidebar-widget">
            <h4 style={{ marginBottom: '15px', color: '#2c3e50' }}><i className="fas fa-bullhorn"></i> Advertisement</h4>
            <div style={{ height: '600px', background: '#f8f9fa', border: '2px dashed #ddd', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#7f8c8d' }}>
              <i className="fas fa-ad" style={{ fontSize: '2rem', marginBottom: '10px' }}></i>
              <p>Advertisement Space</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>300x600px</p>
            </div>
          </div>
          
          <div style={{ marginTop: '30px', padding: '20px', background: '#f5f0ff', borderRadius: '10px' }}>
            <h4 style={{ marginBottom: '10px', color: '#8e44ad' }}><i className="fas fa-lightbulb"></i> Metabolic Rate Optimization Tip</h4>
            <p style={{ fontSize: '0.9rem' }}><strong>Building lean muscle mass</strong> through <strong>resistance training</strong> can increase your <strong>basal metabolic rate</strong> by up to <strong>7-10%</strong>, supporting <strong>long-term weight management</strong> and <strong>metabolic health</strong>.</p>
          </div>
        </aside>
      </main>
    </>
  );
}