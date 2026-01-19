// src/app/tdee/page.js
"use client"; // This is required for interactivity

import { useState, useEffect } from 'react';

export default function TDEEPage() {
  const [currentUnit, setCurrentUnit] = useState('metric');
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('30');
  const [weight, setWeight] = useState('75');
  const [height, setHeight] = useState('180');
  const [activity, setActivity] = useState('1.55');
  const [fitnessGoal, setFitnessGoal] = useState('loss');
  const [results, setResults] = useState(null);

  // Handle Enter key press
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        calculateTDEE();
      }
    };

    document.addEventListener('keypress', handleKeyPress);
    return () => document.removeEventListener('keypress', handleKeyPress);
  });

  const toggleUnits = (unit) => {
    setCurrentUnit(unit);
    setResults(null);
  };

  const selectGoal = (goal) => {
    setFitnessGoal(goal);
    setResults(null);
  };

  const calculateTDEE = () => {
    const ageValue = parseFloat(age);
    let weightValue = parseFloat(weight);
    let heightValue = parseFloat(height);
    const activityValue = parseFloat(activity);

    // Validate inputs
    if (!ageValue || !weightValue || !heightValue || ageValue <= 0 || weightValue <= 0 || heightValue <= 0) {
      alert('Please enter valid age, height, and weight values.');
      return;
    }

    // Convert imperial to metric if needed
    if (currentUnit === 'imperial') {
      weightValue = weightValue * 0.453592;
      heightValue = heightValue * 2.54;
    }

    // Calculate BMR using Mifflin-St Jeor
    let bmr;
    if (gender === 'male') {
      bmr = (10 * weightValue) + (6.25 * heightValue) - (5 * ageValue) + 5;
    } else {
      bmr = (10 * weightValue) + (6.25 * heightValue) - (5 * ageValue) - 161;
    }

    // Calculate TDEE
    const tdee = Math.round(bmr * activityValue);

    // Calculate goal-specific calories
    let lossCalories = tdee - 500;
    let maintenanceCalories = tdee;
    let gainCalories = tdee + 300;

    // Calculate macros based on goal
    let proteinPercent, carbsPercent, fatPercent;
    let goalName;

    switch (fitnessGoal) {
      case 'loss':
        proteinPercent = 0.35;
        carbsPercent = 0.40;
        fatPercent = 0.25;
        goalName = 'Weight Loss';
        break;
      case 'maintenance':
        proteinPercent = 0.30;
        carbsPercent = 0.45;
        fatPercent = 0.25;
        goalName = 'Maintenance';
        break;
      case 'gain':
        proteinPercent = 0.30;
        carbsPercent = 0.50;
        fatPercent = 0.20;
        goalName = 'Muscle Gain';
        break;
    }

    // Calculate goal-specific calories for macros
    const goalCalories = fitnessGoal === 'loss' ? lossCalories :
      fitnessGoal === 'maintenance' ? maintenanceCalories : gainCalories;

    // Calculate macronutrient grams
    const proteinGrams = Math.round((goalCalories * proteinPercent) / 4);
    const carbsGrams = Math.round((goalCalories * carbsPercent) / 4);
    const fatGrams = Math.round((goalCalories * fatPercent) / 9);

    setResults({
      tdee: tdee,
      lossCalories: lossCalories,
      maintenanceCalories: maintenanceCalories,
      gainCalories: gainCalories,
      proteinGrams: proteinGrams,
      carbsGrams: carbsGrams,
      fatGrams: fatGrams,
      proteinPercent: Math.round(proteinPercent * 100),
      carbsPercent: Math.round(carbsPercent * 100),
      fatPercent: Math.round(fatPercent * 100),
      goalName: goalName
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
          border-color: #27ae60; 
          box-shadow: 0 0 0 3px rgba(39, 174, 96, 0.1);
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
          background: #27ae60;
          color: white;
          border-color: #27ae60;
        }

        /* Goal Selection */
        .goal-selection {
          margin: 20px 0;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 10px;
        }

        .goal-tabs {
          display: flex;
          gap: 10px;
          margin-top: 15px;
          flex-wrap: wrap;
        }

        .goal-tab {
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

        .goal-tab.active {
          background: #27ae60;
          color: white;
          border-color: #27ae60;
        }

        .calc-btn { 
          width: 100%; 
          padding: 16px; 
          background: #27ae60; 
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
          background: #219150; 
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(39, 174, 96, 0.2);
        }

        /* Results Section */
        .results-box { 
          margin: 30px 0; 
          padding: 25px; 
          background: linear-gradient(135deg, #f0f9f4 0%, #e6f7ed 100%);
          border-radius: 12px; 
          border-left: 5px solid #27ae60;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          display: ${results ? 'block' : 'none'};
        }
        
        .tdee-result { 
          font-size: clamp(2.5rem, 8vw, 3.5rem); 
          font-weight: 800; 
          display: block; 
          margin: 10px 0; 
          color: #27ae60; 
        }

        /* Calorie Goals */
        .calorie-goals {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          margin: 25px 0;
        }

        .calorie-card {
          padding: 20px;
          background: white;
          border-radius: 10px;
          text-align: center;
          box-shadow: 0 3px 10px rgba(0,0,0,0.05);
          transition: transform 0.3s;
          border-left: 4px solid #27ae60;
        }

        .calorie-card.loss {
          border-left: 4px solid #e74c3c;
        }

        .calorie-card.maintenance {
          border-left: 4px solid #3498db;
        }

        .calorie-card.gain {
          border-left: 4px solid #f39c12;
        }

        .calorie-card:hover {
          transform: translateY(-3px);
        }

        .calorie-value {
          font-size: 1.8rem;
          font-weight: bold;
          margin: 10px 0;
        }

        .loss-value { color: #e74c3c; }
        .maintenance-value { color: #27ae60; }
        .gain-value { color: #f39c12; }

        /* Macro Breakdown */
        .macro-breakdown {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 15px;
          margin-top: 25px;
        }

        .macro-card {
          padding: 20px;
          background: white;
          border-radius: 10px;
          text-align: center;
          box-shadow: 0 3px 10px rgba(0,0,0,0.05);
          transition: transform 0.3s;
        }

        .macro-card:hover {
          transform: translateY(-3px);
        }

        .macro-card.protein {
          border-left: 5px solid #3498db;
        }

        .macro-card.carbs {
          border-left: 5px solid #e74c3c;
        }

        .macro-card.fat {
          border-left: 5px solid #f39c12;
        }

        .macro-value {
          font-size: 1.8rem;
          font-weight: bold;
          margin: 10px 0;
        }

        .protein-value { color: #3498db; }
        .carbs-value { color: #e74c3c; }
        .fat-value { color: #f39c12; }

        /* Macro Visualization */
        .macro-viz {
          margin: 30px 0;
          padding: 20px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 3px 10px rgba(0,0,0,0.05);
        }

        .macro-bars {
          height: 30px;
          border-radius: 15px;
          margin: 20px 0;
          position: relative;
          overflow: hidden;
        }

        .macro-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          color: #7f8c8d;
          margin-top: 5px;
        }

        .macro-percentages {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          transform: translateY(-50%);
          display: flex;
          justify-content: space-between;
          padding: 0 20px;
          color: white;
          font-weight: bold;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
        }

        /* Activity Level Info */
        .activity-info {
          margin: 25px 0;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 10px;
          border-left: 4px solid #27ae60;
        }

        .activity-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 15px;
          font-size: 0.9rem;
        }

        .activity-table th, .activity-table td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #dee2e6;
        }

        .activity-table th {
          background-color: #e9ecef;
          color: #2c3e50;
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
          border-left: 4px solid #27ae60;
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

          .measurement-grid {
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
          
          .goal-tabs {
            flex-direction: column;
          }
          
          .calorie-goals {
            grid-template-columns: 1fr;
          }
          
          .macro-breakdown {
            grid-template-columns: 1fr;
          }
          
          .activity-table {
            font-size: 0.8rem;
          }
        }

        @media (max-width: 480px) {
          .container {
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

        /* Print Styles */
        @media print {
          .calc-btn, .goal-tabs, .sidebar {
            display: none;
          }
          
          .results-box {
            border: 2px solid #333;
          }
        }
      `}</style>

      <main className="container">
        <section className="calculator-box">
          <h1 className="calc-title"><i className="fas fa-fire"></i> TDEE & Macro Calculator</h1>
          <p className="calc-desc">Calculate your Total Daily Energy Expenditure (TDEE) using the Mifflin-St Jeor formula. Discover your maintenance calories for weight loss, muscle gain, or weight maintenance with personalized macronutrient ratios.</p>
          
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

          <div className="measurement-grid">
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
            <div className="input-group">
              <label><i className="fas fa-user"></i> Age (years)</label>
              <input 
                type="number" 
                id="age" 
                placeholder="30" 
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min="15" 
                max="80" 
                step="1"
              />
            </div>
            <div className="input-group">
              <label><i className="fas fa-weight"></i> 
                {currentUnit === 'metric' ? 'Weight (kg)' : 'Weight (lbs)'}
              </label>
              <input 
                type="number" 
                id="weight" 
                placeholder={currentUnit === 'metric' ? '75' : '165'}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                min="30" 
                max="300" 
                step="0.1"
              />
            </div>
            <div className="input-group">
              <label><i className="fas fa-ruler-vertical"></i> 
                {currentUnit === 'metric' ? 'Height (cm)' : 'Height (inches)'}
              </label>
              <input 
                type="number" 
                id="height" 
                placeholder={currentUnit === 'metric' ? '180' : '71'}
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                min="100" 
                max="250" 
                step="0.1"
              />
            </div>
          </div>

          <div className="input-group">
            <label><i className="fas fa-running"></i> Activity Level</label>
            <select 
              id="activity" 
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
            >
              <option value="1.2">Sedentary (Office job, little exercise)</option>
              <option value="1.375">Lightly Active (1-3 days/week)</option>
              <option value="1.55">Moderately Active (3-5 days/week)</option>
              <option value="1.725">Very Active (6-7 days/week)</option>
              <option value="1.9">Extra Active (Athlete/Physical Job)</option>
            </select>
          </div>

          <div className="goal-selection">
            <label><i className="fas fa-bullseye"></i> Select Your Goal</label>
            <div className="goal-tabs">
              <button 
                className={`goal-tab ${fitnessGoal === 'loss' ? 'active' : ''}`} 
                onClick={() => selectGoal('loss')}
              >
                <i className="fas fa-weight-loss"></i> Weight Loss
              </button>
              <button 
                className={`goal-tab ${fitnessGoal === 'maintenance' ? 'active' : ''}`} 
                onClick={() => selectGoal('maintenance')}
              >
                <i className="fas fa-balance-scale"></i> Maintenance
              </button>
              <button 
                className={`goal-tab ${fitnessGoal === 'gain' ? 'active' : ''}`} 
                onClick={() => selectGoal('gain')}
              >
                <i className="fas fa-dumbbell"></i> Muscle Gain
              </button>
            </div>
          </div>

          <button className="calc-btn" onClick={calculateTDEE}>
            <i className="fas fa-calculator"></i> Calculate My TDEE & Macros
          </button>

          <div className="results-box">
            <h3 style={{marginBottom: '20px', color: '#2c3e50'}}>
              <i className="fas fa-chart-pie"></i> Your Calorie & Macro Analysis
            </h3>
            
            {results && (
              <>
                <div style={{textAlign: 'center', marginBottom: '25px', padding: '20px', background: 'white', borderRadius: '10px', borderLeft: '4px solid #27ae60'}}>
                  <h4><i className="fas fa-fire"></i> Total Daily Energy Expenditure (TDEE)</h4>
                  <span id="tdee-val" className="tdee-result">{results.tdee.toLocaleString()} kcal</span>
                  <p style={{fontSize: '0.9rem', color: '#666'}}>Daily maintenance calories</p>
                </div>

                <div className="calorie-goals">
                  <div className="calorie-card loss">
                    <h4><i className="fas fa-weight-loss"></i> Weight Loss</h4>
                    <div className="calorie-value loss-value">{results.lossCalories.toLocaleString()} kcal</div>
                    <p style={{fontSize: '0.9rem', color: '#666'}}>0.5kg/week deficit</p>
                  </div>

                  <div className="calorie-card maintenance">
                    <h4><i className="fas fa-balance-scale"></i> Maintenance</h4>
                    <div className="calorie-value maintenance-value">{results.maintenanceCalories.toLocaleString()} kcal</div>
                    <p style={{fontSize: '0.9rem', color: '#666'}}>Current weight maintenance</p>
                  </div>

                  <div className="calorie-card gain">
                    <h4><i className="fas fa-dumbbell"></i> Muscle Gain</h4>
                    <div className="calorie-value gain-value">{results.gainCalories.toLocaleString()} kcal</div>
                    <p style={{fontSize: '0.9rem', color: '#666'}}>Lean muscle building</p>
                  </div>
                </div>

                <div style={{marginTop: '30px'}}>
                  <h4 style={{marginBottom: '15px', color: '#2c3e50'}}>
                    <i className="fas fa-utensils"></i> Recommended Macronutrient Split
                  </h4>
                  
                  <div className="macro-breakdown">
                    <div className="macro-card protein">
                      <h4><i className="fas fa-drumstick-bite"></i> Protein</h4>
                      <div className="macro-value protein-value">{results.proteinGrams.toLocaleString()}g</div>
                      <p style={{fontSize: '0.9rem', color: '#666'}}>Muscle repair & growth</p>
                    </div>

                    <div className="macro-card carbs">
                      <h4><i className="fas fa-bread-slice"></i> Carbohydrates</h4>
                      <div className="macro-value carbs-value">{results.carbsGrams.toLocaleString()}g</div>
                      <p style={{fontSize: '0.9rem', color: '#666'}}>Energy & performance</p>
                    </div>

                    <div className="macro-card fat">
                      <h4><i className="fas fa-seedling"></i> Healthy Fats</h4>
                      <div className="macro-value fat-value">{results.fatGrams.toLocaleString()}g</div>
                      <p style={{fontSize: '0.9rem', color: '#666'}}>Hormones & absorption</p>
                    </div>
                  </div>

                  <div className="macro-viz">
                    <h4><i className="fas fa-chart-bar"></i> Macro Distribution</h4>
                    <div 
                      className="macro-bars" 
                      style={{
                        background: `linear-gradient(90deg, #3498db ${results.proteinPercent}%, #e74c3c ${results.proteinPercent + results.carbsPercent}%, #f39c12 ${results.proteinPercent + results.carbsPercent + results.fatPercent}%)`
                      }}
                    >
                      <div className="macro-percentages">
                        <span id="proteinPercent">{results.proteinPercent}%</span>
                        <span id="carbsPercent">{results.carbsPercent}%</span>
                        <span id="fatPercent">{results.fatPercent}%</span>
                      </div>
                    </div>
                    <div className="macro-labels">
                      <span><i className="fas fa-drumstick-bite"></i> Protein</span>
                      <span><i className="fas fa-bread-slice"></i> Carbs</span>
                      <span><i className="fas fa-seedling"></i> Fats</span>
                    </div>
                  </div>
                </div>
                
                <p style={{marginTop: '20px', fontSize: '0.9rem', color: '#666'}}>
                  <i className="fas fa-info-circle"></i> Calculated using Mifflin-St Jeor Formula for {results.goalName}
                </p>
              </>
            )}
          </div>

          <div className="activity-info">
            <h4><i className="fas fa-running"></i> Understanding Activity Levels</h4>
            <p style={{fontSize: '0.9rem', color: '#666', marginBottom: '15px'}}>
              Your activity multiplier affects TDEE calculation accuracy. Choose the level that best matches your weekly routine:
            </p>
            
            <table className="activity-table">
              <thead>
                <tr>
                  <th>Activity Level</th>
                  <th>Description</th>
                  <th>Multiplier</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Sedentary</td><td>Little/no exercise, desk job</td><td>1.2</td></tr>
                <tr><td>Lightly Active</td><td>Light exercise 1-3 days/week</td><td>1.375</td></tr>
                <tr><td>Moderately Active</td><td>Moderate exercise 3-5 days/week</td><td>1.55</td></tr>
                <tr><td>Very Active</td><td>Hard exercise 6-7 days/week</td><td>1.725</td></tr>
                <tr><td>Extra Active</td><td>Very hard exercise or physical job</td><td>1.9</td></tr>
              </tbody>
            </table>
          </div>

          <div className="ad-slot">
            <p><i className="fas fa-ad"></i> Advertisement</p>
            <p style={{fontSize: '0.8rem', marginTop: '5px'}}>Your ad could be here</p>
          </div>

          <div className="info-section">
            <h3><i className="fas fa-question-circle"></i> Comprehensive Guide to Total Daily Energy Expenditure and Macronutrient Optimization</h3>
            <p><strong>Total Daily Energy Expenditure (TDEE)</strong> represents your complete daily calorie burn, encompassing basal metabolic rate, physical activity thermogenesis, and the thermic effect of food. Mastering TDEE calculation forms the foundation of <strong>evidence-based weight management strategies</strong>, <strong>sports nutrition optimization</strong>, and <strong>body recomposition planning</strong>. Our advanced calculator provides personalized <strong>calorie intake targets</strong> and <strong>macronutrient distribution recommendations</strong> based on validated scientific formulas.</p>
            
            <h3><i className="fas fa-calculator"></i> Scientific Methodology: Mifflin-St Jeor Equation for Accurate BMR Calculation</h3>
            <p>This calculator employs the <strong>Mifflin-St Jeor Equation</strong>, recognized by the American Dietetic Association as the most precise method for Basal Metabolic Rate (BMR) estimation. Developed in 1990 through comprehensive metabolic research, this formula outperforms older equations like Harris-Benedict by accounting for contemporary body compositions and activity patterns. The Mifflin-St Jeor equation provides <strong>reliable metabolic rate estimates</strong> with minimal standard deviation across diverse populations.</p>
            
            <div className="formula-box">
              <strong>Mifflin-St Jeor BMR Formula (Validated Research):</strong><br />
              For Men: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5<br /><br />
              For Women: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161<br /><br />
              <strong>TDEE Calculation:</strong> TDEE = BMR × Activity Multiplier (PAL)<br /><br />
              <strong>Statistical Validation:</strong> ±10% accuracy for 95% of adult population<br />
              <strong>Research Basis:</strong> Validated against indirect calorimetry measurements
            </div>

            <h3><i className="fas fa-chart-line"></i> Strategic Application of TDEE Results for Different Fitness Objectives</h3>
            <p>Your personalized TDEE calculation enables targeted nutritional interventions for specific body composition goals. For <strong>sustainable fat loss protocols</strong>, implement a 300-500 calorie deficit from maintenance. For <strong>lean muscle acquisition phases</strong>, establish a 200-300 calorie surplus with progressive resistance training. These evidence-based ranges support <strong>optimal body recomposition</strong> while minimizing metabolic adaptation and preserving metabolic health.</p>

            <h3><i className="fas fa-utensils"></i> Macronutrient Optimization Strategies Based on Physiological Goals</h3>
            <p>Beyond total energy intake, macronutrient distribution significantly impacts metabolic outcomes, hormonal responses, and body composition changes. Our calculator provides <strong>goal-specific macronutrient ratios</strong>: weight loss emphasizes higher protein for satiety and muscle preservation (1.6-2.2g/kg), muscle building increases carbohydrates for glycogen replenishment (4-7g/kg), and maintenance optimizes all three macronutrients for metabolic flexibility. Each gram provides specific caloric density: <strong>4 kcal/g</strong> for protein/carbohydrates and <strong>9 kcal/g</strong> for dietary fats.</p>

            <h3><i className="fas fa-running"></i> Periodized Nutrition: Adjusting TDEE for Training Cycles and Metabolic Adaptation</h3>
            <p>Effective nutrition requires dynamic adjustments based on training periodization. During <strong>intense training blocks</strong>, increase carbohydrate intake to support glycogen stores and recovery. For <strong>weight loss plateaus</strong>, implement metabolic assessments and TDEE recalculation based on current weight. During <strong>competition preparation phases</strong>, employ strategic calorie cycling around training stimulus. Regular TDEE reassessment (every 4-6 weeks) prevents metabolic adaptation and maintains progress toward fitness objectives.</p>

            <h3><i className="fas fa-user-md"></i> Clinical Applications: TDEE in Medical Nutrition Therapy and Metabolic Health</h3>
            <p>In clinical settings, accurate TDEE estimation is essential for developing <strong>therapeutic nutrition interventions</strong>. Healthcare practitioners utilize TDEE calculations to establish appropriate calorie levels for patients with obesity management needs, type 2 diabetes metabolic control, cardiovascular disease risk reduction, and metabolic syndrome treatment. Personalized TDEE estimates improve <strong>clinical outcomes</strong> by preventing iatrogenic malnutrition while supporting medical treatment protocols.</p>

            <h3><i className="fas fa-exclamation-triangle"></i> Critical Considerations and Limitations in TDEE Estimation</h3>
            <p>While TDEE calculators provide valuable starting points, several factors influence individual energy expenditure: <strong>genetic metabolic variations</strong> (±15%), <strong>hormonal fluctuations</strong> across menstrual cycles, <strong>sleep quality and duration</strong>, <strong>chronic stress levels</strong> affecting cortisol, <strong>medication side effects</strong>, and <strong>adaptive thermogenesis</strong> during prolonged calorie restriction. These formulas serve as initial estimates - monitor actual progress through <strong>weekly weight trends</strong>, <strong>body measurements</strong>, and <strong>performance metrics</strong>.</p>

            <h3><i className="fas fa-rocket"></i> Implementation Protocol: Actionable Steps for TDEE-Based Nutrition Success</h3>
            <p>To effectively implement your TDEE calculation results:</p>
            <ul>
              <li><strong>Establish Baseline Adherence:</strong> Utilize food scales and digital tracking for 1-2 weeks to verify nutritional accuracy</li>
              <li><strong>Implement Gradual Adjustments:</strong> Modify calorie intake by 100-200 calories weekly based on progress metrics</li>
              <li><strong>Prioritize Protein Adequacy:</strong> Consume 1.6-2.2g/kg protein daily to preserve lean mass during calorie deficits</li>
              <li><strong>Monitor Performance Metrics:</strong> Adjust carbohydrate intake based on training performance and recovery indicators</li>
              <li><strong>Schedule Periodic Reassessment:</strong> Recalculate TDEE every 4-6 weeks or following 5kg weight change</li>
              <li><strong>Consider Professional Consultation:</strong> Engage registered dietitians for personalized medical nutrition therapy</li>
              <li><strong>Track Multiple Metrics:</strong> Combine scale weight with circumference measurements and progress photographs</li>
              <li><strong>Implement Nutritional Periodization:</strong> Adjust macronutrients based on training intensity and volume fluctuations</li>
            </ul>
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
            background: '#e8f7ed', 
            borderRadius: '10px'
          }}>
            <h4 style={{marginBottom: '10px', color: '#27ae60'}}>
              <i className="fas fa-lightbulb"></i> Nutrition Optimization Tips
            </h4>
            <ul style={{fontSize: '0.9rem', paddingLeft: '20px'}}>
              <li style={{marginBottom: '8px'}}>For weight loss, target 0.5-1kg per week (500-1000 calorie deficit)</li>
              <li style={{marginBottom: '8px'}}>Re-calculate TDEE every 5kg of body weight change</li>
              <li style={{marginBottom: '8px'}}>Optimal protein intake: 1.6-2.2g per kg for muscle preservation</li>
              <li style={{marginBottom: '8px'}}>Track multiple metrics: scale weight, measurements, progress photos</li>
              <li>Adjust based on weekly averages, not daily weight fluctuations</li>
            </ul>
          </div>
        </aside>
      </main>
    </>
  );
}