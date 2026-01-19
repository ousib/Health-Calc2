"use client";

import { useState, useEffect } from 'react';

export default function CaloriesPage() {
  const [currentUnit, setCurrentUnit] = useState('metric');
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activity, setActivity] = useState('1.55');
  const [goal, setGoal] = useState('maintain');
  const [results, setResults] = useState(null);
  const [macros, setMacros] = useState(null);
  const [showMealExamples, setShowMealExamples] = useState(false);

  // Sample data for demo
  useEffect(() => {
    setAge('30');
    setWeight('70');
    setHeight('175');
    // Default to moderately active
    setActivity('1.55');
  }, []);

  const toggleUnits = (unit) => {
    setCurrentUnit(unit);
    setResults(null);
    setMacros(null);
    setShowMealExamples(false);
  };

  const selectActivity = (multiplier) => {
    setActivity(multiplier);
  };

  const selectGoal = (goalType) => {
    setGoal(goalType);
  };

  const calculateCalories = () => {
    const ageVal = parseFloat(age);
    let weightVal = parseFloat(weight);
    let heightVal = parseFloat(height);
    
    // Validate inputs
    if (!ageVal || !weightVal || !heightVal || ageVal <= 0 || weightVal <= 0 || heightVal <= 0) {
      alert('Please fill in all fields with valid numbers.');
      return;
    }
    
    // Convert imperial to metric if needed
    if (currentUnit === 'imperial') {
      weightVal = weightVal * 0.453592;
      heightVal = heightVal * 2.54;
    }
    
    // Calculate BMR using Mifflin-St Jeor Formula
    let bmr;
    if (gender === 'male') {
      bmr = (10 * weightVal) + (6.25 * heightVal) - (5 * ageVal) + 5;
    } else {
      bmr = (10 * weightVal) + (6.25 * heightVal) - (5 * ageVal) - 161;
    }
    
    // Calculate TDEE (maintenance calories)
    const activityMultiplier = parseFloat(activity);
    const maintain = Math.round(bmr * activityMultiplier);
    const lose = Math.max(maintain - 500, Math.round(bmr * 1.2)); // Don't go below sedentary BMR
    const gain = maintain + 500;
    
    // Calculate macros based on selected goal
    let targetCalories;
    switch(goal) {
      case 'loss':
        targetCalories = lose;
        break;
      case 'gain':
        targetCalories = gain;
        break;
      default:
        targetCalories = maintain;
    }
    
    // Calculate macros (30% protein, 40% carbs, 30% fat)
    const proteinGrams = Math.round((targetCalories * 0.30) / 4); // 4 kcal per gram
    const carbsGrams = Math.round((targetCalories * 0.40) / 4);  // 4 kcal per gram
    const fatGrams = Math.round((targetCalories * 0.30) / 9);    // 9 kcal per gram
    
    setResults({ maintain, lose, gain });
    setMacros({ protein: proteinGrams, carbs: carbsGrams, fat: fatGrams, targetCalories });
    setShowMealExamples(true);
  };

  const activityLevels = [
    { multiplier: '1.2', name: 'Sedentary', desc: 'Little or no exercise' },
    { multiplier: '1.375', name: 'Lightly Active', desc: 'Light exercise 1-3 days/week' },
    { multiplier: '1.55', name: 'Moderately Active', desc: 'Moderate exercise 3-5 days/week' },
    { multiplier: '1.725', name: 'Very Active', desc: 'Hard exercise 6-7 days/week' },
    { multiplier: '1.9', name: 'Extra Active', desc: 'Very hard exercise & physical job' }
  ];

  const goals = [
    { type: 'maintain', name: 'Maintain Weight' },
    { type: 'loss', name: 'Lose Weight' },
    { type: 'gain', name: 'Gain Weight' }
  ];

  // Handle Enter key press
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        calculateCalories();
      }
    };

    document.addEventListener('keypress', handleKeyPress);
    return () => document.removeEventListener('keypress', handleKeyPress);
  }, [age, weight, height, gender, activity, goal, currentUnit]);

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
        .measurement-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 15px;
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
          border-color: #f39c12; 
          box-shadow: 0 0 0 3px rgba(243, 156, 18, 0.1);
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
          background: #f39c12;
          color: white;
          border-color: #f39c12;
        }

        /* Activity Level Cards */
        .activity-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          margin: 20px 0;
        }

        .activity-card {
          padding: 20px;
          background: #f8f9fa;
          border: 2px solid #e9ecef;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .activity-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

        .activity-card.selected {
          background: #fff8e1;
          border-color: #f39c12;
          box-shadow: 0 5px 15px rgba(243, 156, 18, 0.1);
        }

        .activity-multiplier {
          font-size: 1.1rem;
          font-weight: bold;
          color: #f39c12;
          margin-top: 5px;
        }

        /* Goal Selection */
        .goal-selection {
          margin: 20px 0;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 10px;
        }

        .goal-buttons {
          display: flex;
          gap: 10px;
          margin-top: 15px;
          flex-wrap: wrap;
        }

        .goal-btn {
          padding: 10px 20px;
          background: #e9ecef;
          border: 2px solid #dee2e6;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s;
        }

        .goal-btn.selected {
          background: #f39c12;
          color: white;
          border-color: #f39c12;
        }

        .calc-btn { 
          width: 100%; 
          padding: 16px; 
          background: #f39c12; 
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
          background: #e67e22; 
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(243, 156, 18, 0.2);
        }

        /* Results Section */
        .results-box { 
          margin: 30px 0; 
          padding: 25px; 
          background: linear-gradient(135deg, #fffcf5 0%, #fff8e1 100%);
          border-radius: 12px; 
          border-left: 5px solid #f39c12;
          display: ${results ? 'block' : 'none'}; 
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        
        .calorie-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 15px;
          margin-top: 20px;
        }

        .calorie-card {
          padding: 20px;
          background: white;
          border-radius: 10px;
          border: 1px solid #eee;
          transition: all 0.3s;
          opacity: ${results ? (goal === 'maintain' ? '1' : '0.8') : '1'};
        }

        .calorie-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

        .calorie-card.maintenance {
          border-left: 5px solid #3498db;
          box-shadow: ${results && goal === 'maintain' ? '0 5px 15px rgba(52, 152, 219, 0.2)' : 'none'};
        }

        .calorie-card.loss {
          border-left: 5px solid #27ae60;
          box-shadow: ${results && goal === 'loss' ? '0 5px 15px rgba(39, 174, 96, 0.2)' : 'none'};
        }

        .calorie-card.gain {
          border-left: 5px solid #e74c3c;
          box-shadow: ${results && goal === 'gain' ? '0 5px 15px rgba(231, 76, 60, 0.2)' : 'none'};
        }

        .calorie-card strong { 
          font-size: clamp(1.5rem, 4vw, 2rem); 
          color: #2c3e50; 
          display: block;
          margin: 10px 0;
        }
        
        .calorie-card span { 
          font-size: 0.9rem; 
          color: #7f8c8d; 
        }

        /* Macro Breakdown */
        .macro-breakdown {
          margin: 30px 0;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 10px;
          display: ${macros ? 'block' : 'none'};
        }

        .macro-bars {
          margin: 20px 0;
        }

        .macro-bar {
          height: 30px;
          background: #e9ecef;
          border-radius: 15px;
          margin: 10px 0;
          overflow: hidden;
          position: relative;
        }

        .macro-fill {
          height: 100%;
          border-radius: 15px;
          transition: width 1s ease;
        }

        .protein-fill { background: #3498db; }
        .carbs-fill { background: #2ecc71; }
        .fat-fill { background: #f39c12; }

        .macro-label {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: white;
          font-weight: 600;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
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
          border-left: 4px solid #f39c12;
          overflow-x: auto;
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

        /* Meal Planning */
        .meal-examples {
          display: ${showMealExamples ? 'grid' : 'none'};
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          margin: 25px 0;
        }

        .meal-card {
          padding: 15px;
          background: white;
          border-radius: 8px;
          border: 1px solid #eee;
        }

        .meal-card h4 {
          color: #2c3e50;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* Responsive Styles */
        @media (min-width: 768px) {
          .container {
            grid-template-columns: 1fr 300px;
            padding: 30px;
          }

          .measurement-grid {
            grid-template-columns: repeat(3, 1fr);
          }

          .calc-btn {
            max-width: 300px;
          }
          
          .sidebar {
            display: block;
          }
        }

        @media (max-width: 768px) {
          .container {
            padding: 15px;
          }
          
          .calculator-box {
            padding: 20px;
          }
          
          .activity-cards {
            grid-template-columns: 1fr;
          }
          
          .calorie-cards {
            grid-template-columns: 1fr;
          }
          
          .meal-examples {
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
          
          .goal-buttons {
            flex-direction: column;
          }
        }

        /* Print Styles */
        @media print {
          .ad-slot, .sidebar, .calc-btn, .goal-buttons {
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
          <h1 className="calc-title"><i className="fas fa-fire"></i> Calorie Calculator - Daily Calorie Needs Estimation & Weight Management Tool</h1>
          <p className="calc-desc">Calculate your <strong>personalized daily calorie requirements</strong> for <strong>weight maintenance, fat loss, or muscle gain</strong> based on your <strong>individual metabolic rate, activity levels, and fitness goals</strong> using evidence-based formulas.</p>
          
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
            <label><i className="fas fa-venus-mars"></i> Biological Sex</label>
            <select 
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="measurement-grid">
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
              <label><i className="fas fa-ruler-vertical"></i> {currentUnit === 'metric' ? 'Height (cm)' : 'Height (inches)'}</label>
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

          {/* Activity Level Cards */}
          <div className="input-group">
            <label><i className="fas fa-running"></i> Physical Activity Level - Daily Energy Expenditure Multiplier</label>
            <div className="activity-cards" id="activityCards">
              {activityLevels.map((level) => (
                <div 
                  key={level.multiplier}
                  className={`activity-card ${activity === level.multiplier ? 'selected' : ''}`}
                  onClick={() => selectActivity(level.multiplier)}
                >
                  <h4>{level.name}</h4>
                  <p style={{ fontSize: '0.85rem', color: '#666', margin: '5px 0' }}>{level.desc}</p>
                  <p className="activity-multiplier">× {level.multiplier}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Goal Selection */}
          <div className="goal-selection">
            <label><i className="fas fa-bullseye"></i> Weight Management Goal - Caloric Adjustment Strategy</label>
            <div className="goal-buttons">
              {goals.map((goalItem) => (
                <button 
                  key={goalItem.type}
                  className={`goal-btn ${goal === goalItem.type ? 'selected' : ''}`}
                  onClick={() => selectGoal(goalItem.type)}
                >
                  {goalItem.name}
                </button>
              ))}
            </div>
          </div>

          <button className="calc-btn" onClick={calculateCalories}>
            <i className="fas fa-calculator"></i> Calculate Daily Calorie Needs
          </button>

          {/* Results Section */}
          <div className="results-box" style={{ display: results ? 'block' : 'none' }}>
            <h3 style={{ marginBottom: '20px', color: '#2c3e50' }}><i className="fas fa-chart-line"></i> Personalized Daily Calorie Recommendations</h3>
            
            <div className="calorie-cards">
              <div className="calorie-card maintenance">
                <span><i className="fas fa-balance-scale"></i> Weight Maintenance</span>
                <strong>{results?.maintain.toLocaleString() || '--'}</strong>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>Calories/day to maintain current body weight</p>
              </div>

              <div className="calorie-card loss">
                <span><i className="fas fa-arrow-down"></i> Moderate Weight Loss</span>
                <strong>{results?.lose.toLocaleString() || '--'}</strong>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>Calories/day for sustainable 0.5kg loss per week</p>
              </div>

              <div className="calorie-card gain">
                <span><i className="fas fa-arrow-up"></i> Lean Mass Gain</span>
                <strong>{results?.gain.toLocaleString() || '--'}</strong>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>Calories/day for controlled 0.5kg gain per week</p>
              </div>
            </div>
            
            {/* Macro Breakdown */}
            <div className="macro-breakdown" style={{ display: macros ? 'block' : 'none' }}>
              <h4 style={{ marginBottom: '15px', color: '#2c3e50' }}><i className="fas fa-chart-pie"></i> Recommended Macronutrient Distribution - Balanced Nutrition Planning</h4>
              
              <div className="macro-bars">
                <div className="macro-bar">
                  <div 
                    className="macro-fill protein-fill" 
                    style={{ width: '30%' }}
                  ></div>
                  <div className="macro-label">Protein: {macros?.protein || '--'}g</div>
                </div>
                <div className="macro-bar">
                  <div 
                    className="macro-fill carbs-fill" 
                    style={{ width: '40%' }}
                  ></div>
                  <div className="macro-label">Carbohydrates: {macros?.carbs || '--'}g</div>
                </div>
                <div className="macro-bar">
                  <div 
                    className="macro-fill fat-fill" 
                    style={{ width: '30%' }}
                  ></div>
                  <div className="macro-label">Dietary Fat: {macros?.fat || '--'}g</div>
                </div>
              </div>
              
              <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '15px' }}>
                Based on evidence-based balanced ratio: <strong>30% protein, 40% carbohydrates, 30% fat</strong> for optimal body composition and metabolic health
              </p>
            </div>
          </div>

          {/* Meal Planning Examples */}
          <div className="meal-examples" style={{ display: showMealExamples ? 'grid' : 'none' }}>
            <div className="meal-card">
              <h4><i className="fas fa-sun"></i> Breakfast Ideas</h4>
              <p style={{ fontSize: '0.85rem', color: '#666' }}>Protein oatmeal with berries, Greek yogurt parfait with almonds, or veggie egg scramble with whole-grain toast (~400-500 kcal)</p>
            </div>
            <div className="meal-card">
              <h4><i className="fas fa-apple-alt"></i> Lunch Options</h4>
              <p style={{ fontSize: '0.85rem', color: '#666' }}>Grilled chicken quinoa salad with avocado, turkey and hummus wrap with vegetable soup, or lentil and vegetable stew (~500-600 kcal)</p>
            </div>
            <div className="meal-card">
              <h4><i className="fas fa-utensils"></i> Dinner Recipes</h4>
              <p style={{ fontSize: '0.85rem', color: '#666' }}>Baked salmon with roasted sweet potatoes and broccoli, lean beef stir-fry with brown rice, or tofu and vegetable curry (~600-700 kcal)</p>
            </div>
            <div className="meal-card">
              <h4><i className="fas fa-seedling"></i> Smart Snacking</h4>
              <p style={{ fontSize: '0.85rem', color: '#666' }}>Apple with almond butter, Greek yogurt with honey, protein shake with banana, or mixed nuts and dried fruit (~200-300 kcal)</p>
            </div>
          </div>

          <div className="ad-slot">
            <p><i className="fas fa-ad"></i> Advertisement</p>
            <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Your ad could be here</p>
          </div>

          {/* Enhanced SEO Content with High-Value Long-Tail Keywords */}
          <div className="info-section">
            <h3><i className="fas fa-brain"></i> Understanding Daily Caloric Requirements - Metabolic Rate Analysis & Energy Balance Principles</h3>
            <p>Your <strong>daily calorie intake requirements</strong> are determined by your <strong>Basal Metabolic Rate (BMR) calculation</strong> and <strong>Physical Activity Level (PAL) assessment</strong>. This <strong>comprehensive calorie calculator</strong> accounts for <strong>age-related metabolic changes, gender-specific energy needs, and individual activity patterns</strong> to provide <strong>personalized nutritional guidance</strong> for <strong>weight management success</strong>.</p>
            
            <h3><i className="fas fa-calculator"></i> Calorie Calculation Methodology - Mifflin-St Jeor Formula & Total Daily Energy Expenditure (TDEE)</h3>
            <p>This tool utilizes the <strong>Mifflin-St Jeor Equation</strong>, validated through <strong>peer-reviewed clinical research</strong> as the <strong>most accurate BMR prediction formula</strong> for modern populations. The calculation follows this <strong>evidence-based metabolic assessment protocol</strong>:</p>
            
            <div className="formula-box">
              <strong>Mifflin-St Jeor BMR Formula:</strong><br/>
              <strong>For Men:</strong> BMR = 10 × weight (kg) + 6.25 × height (cm) - 5 × age (y) + 5<br/>
              <strong>For Women:</strong> BMR = 10 × weight (kg) + 6.25 × height (cm) - 5 × age (y) - 161<br/><br/>
              <strong>Total Daily Energy Expenditure (TDEE):</strong> TDEE = BMR × Physical Activity Multiplier<br/><br/>
              <strong>Formula Accuracy:</strong> ±10% of measured metabolic rate in controlled studies
            </div>

            <h3><i className="fas fa-balance-scale"></i> Weight Management Strategies - Calorie Deficit vs. Surplus Calculations</h3>
            <p>Effective <strong>body weight manipulation</strong> relies on precise <strong>calorie adjustment calculations</strong>:</p>
            <ul>
              <li><strong>Weight Maintenance (Isocaloric Diet):</strong> Consume calories equal to your <strong>Total Daily Energy Expenditure (TDEE)</strong></li>
              <li><strong>Fat Loss Protocol (Hypocaloric Diet):</strong> Create a <strong>500-calorie daily deficit</strong> for <strong>sustainable 0.5kg weekly weight loss</strong> without metabolic adaptation</li>
              <li><strong>Muscle Gain Strategy (Hypercaloric Diet):</strong> Implement a <strong>250-500 calorie daily surplus</strong> for <strong>lean mass accumulation</strong> with minimal fat gain</li>
              <li><strong>Body Recomposition Approach:</strong> Alternate between <strong>calorie deficit and surplus periods</strong> for <strong>simultaneous fat loss and muscle gain</strong></li>
              <li><strong>Reverse Dieting Method:</strong> Gradually increase calories from deficit to maintenance for <strong>metabolic restoration</strong></li>
            </ul>
            
            <h3><i className="fas fa-utensils"></i> Macronutrient Optimization - Protein, Carbohydrate & Fat Distribution Strategies</h3>
            <p>Beyond total calories, <strong>macronutrient partitioning</strong> significantly impacts <strong>body composition outcomes</strong>:</p>
            <ul>
              <li><strong>Protein Requirements (30%):</strong> Essential for <strong>muscle protein synthesis, satiety regulation, and thermic effect optimization</strong> (4 kcal/g)</li>
              <li><strong>Carbohydrate Needs (40%):</strong> Primary energy source for <strong>high-intensity exercise performance and glycogen replenishment</strong> (4 kcal/g)</li>
              <li><strong>Dietary Fat Allocation (30%):</strong> Crucial for <strong>hormone production, vitamin absorption, and cellular function</strong> (9 kcal/g)</li>
              <li><strong>Fiber Considerations:</strong> Target <strong>25-35g daily</strong> for <strong>digestive health and blood sugar regulation</strong></li>
              <li><strong>Micronutrient Density:</strong> Prioritize <strong>nutrient-dense whole foods</strong> over <strong>empty-calorie processed options</strong></li>
            </ul>
            
            <h3><i className="fas fa-chart-line"></i> Individual Variability Factors - Personalizing Calorie Calculations Beyond Formulas</h3>
            <p>Several factors influence <strong>individual metabolic responses</strong> to calorie intake:</p>
            <ul>
              <li><strong>Genetic Metabolic Rate Variations:</strong> Up to <strong>15-20% inter-individual differences</strong> in energy expenditure</li>
              <li><strong>Body Composition Impact:</strong> Muscle tissue burns <strong>3x more calories at rest</strong> than fat tissue</li>
              <li><strong>Non-Exercise Activity Thermogenesis (NEAT):</strong> Accounts for <strong>15-50% of daily calorie burn</strong> variation</li>
              <li><strong>Adaptive Thermogenesis:</strong> Metabolic slowdown during <strong>prolonged calorie restriction</strong></li>
              <li><strong>Hormonal Influences:</strong> Thyroid function, cortisol levels, and sex hormones affect <strong>metabolic rate regulation</strong></li>
            </ul>

            <h3><i className="fas fa-exclamation-triangle"></i> Safety Considerations & Professional Guidance - Responsible Calorie Management</h3>
            <p>While this calculator provides <strong>evidence-based estimates</strong>, consider these <strong>important safety guidelines</strong>:</p>
            <ul>
              <li><strong>Minimum Calorie Threshold:</strong> Never consume fewer calories than your <strong>Basal Metabolic Rate (BMR)</strong> without medical supervision</li>
              <li><strong>Medical Conditions:</strong> Consult healthcare providers if you have <strong>diabetes, thyroid disorders, eating disorders, or cardiovascular conditions</strong></li>
              <li><strong>Pregnancy & Lactation:</strong> Requires <strong>specialized nutritional planning</strong> beyond standard calorie calculations</li>
              <li><strong>Athletic Populations:</strong> Endurance athletes and bodybuilders need <strong>sport-specific nutrition protocols</strong></li>
              <li><strong>Age Considerations:</strong> Children, adolescents, and elderly require <strong>age-appropriate nutritional approaches</strong></li>
            </ul>

            <h3><i className="fas fa-history"></i> Tracking & Adjustment Protocol - Dynamic Calorie Management for Long-Term Success</h3>
            <p>Implement a <strong>systematic approach</strong> to <strong>calorie management optimization</strong>:</p>
            <ul>
              <li><strong>Weekly Progress Monitoring:</strong> Track <strong>body weight, measurements, and performance metrics</strong> under consistent conditions</li>
              <li><strong>Calorie Adjustment Guidelines:</strong> Modify intake by <strong>±100-200 calories</strong> based on <strong>weekly progress assessment</strong></li>
              <li><strong>Diet Breaks & Refueling:</strong> Implement <strong>periodic maintenance phases</strong> to prevent <strong>metabolic adaptation and psychological burnout</strong></li>
              <li><strong>Hydration & Sleep Optimization:</strong> Ensure adequate <strong>water intake (2-3L daily)</strong> and <strong>7-9 hours sleep</strong> for optimal metabolic function</li>
              <li><strong>Professional Consultation:</strong> Seek guidance from <strong>registered dietitians or sports nutritionists</strong> for complex cases</li>
            </ul>

            <h3><i className="fas fa-book-medical"></i> Evidence-Based Recommendations - Scientific Foundation of Calorie Calculation Methods</h3>
            <p>This calculator's methodology aligns with <strong>current scientific consensus</strong> from:</p>
            <ul>
              <li><strong>American College of Sports Medicine (ACSM):</strong> Guidelines for <strong>exercise nutrition and weight management</strong></li>
              <li><strong>Academy of Nutrition and Dietetics:</strong> Evidence-based <strong>nutritional assessment protocols</strong></li>
              <li><strong>International Society of Sports Nutrition (ISSN):</strong> Position stands on <strong>body composition manipulation</strong></li>
              <li><strong>World Health Organization (WHO):</strong> Recommendations for <strong>healthy weight management</strong></li>
              <li><strong>National Institutes of Health (NIH):</strong> Clinical guidelines for <strong>obesity treatment and prevention</strong></li>
            </ul>
          </div>
        </section>

        <aside className="sidebar" style={{ display: 'none' }}>
          <div className="sidebar-widget">
            <h4 style={{ marginBottom: '15px', color: '#2c3e50' }}><i className="fas fa-bullhorn"></i> Advertisement</h4>
            <div style={{ height: '600px', background: '#f8f9fa', border: '2px dashed #ddd', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#7f8c8d' }}>
              <i className="fas fa-ad" style={{ fontSize: '2rem', marginBottom: '10px' }}></i>
              <p>Advertisement Space</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>300x600px</p>
            </div>
          </div>
          
          <div style={{ marginTop: '30px', padding: '20px', background: '#fff8e1', borderRadius: '10px' }}>
            <h4 style={{ marginBottom: '10px', color: '#e67e22' }}><i className="fas fa-lightbulb"></i> Weight Management Optimization Tips</h4>
            <ul style={{ fontSize: '0.9rem', paddingLeft: '20px' }}>
              <li style={{ marginBottom: '8px' }}>Use <strong>food tracking apps</strong> for 1-2 weeks to establish <strong>baseline calorie consumption patterns</strong></li>
              <li style={{ marginBottom: '8px' }}>Measure <strong>weekly body weight averages</strong> rather than daily fluctuations for <strong>accurate progress assessment</strong></li>
              <li style={{ marginBottom: '8px' }}>Implement <strong>100-200 calorie adjustments</strong> every 2-4 weeks based on <strong>progress plateau analysis</strong></li>
              <li>Prioritize <strong>nutrient-dense whole foods</strong> to optimize <strong>satiety signals and metabolic health</strong> within calorie targets</li>
            </ul>
          </div>
        </aside>
      </main>
    </>
  );
}