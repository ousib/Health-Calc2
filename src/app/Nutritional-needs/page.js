"use client";

import { useState, useEffect } from 'react';

export default function NutritionalNeedsPage() {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('sedentary');
  const [goal, setGoal] = useState('maintenance');
  const [medicalCondition, setMedicalCondition] = useState('none');
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

  const caloriesCardStyle = {
    borderTopColor: '#e74c3c'
  };

  const macrosCardStyle = {
    borderTopColor: '#3498db'
  };

  const micronutrientsCardStyle = {
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

  // Activity levels with multipliers
  const activityLevels = [
    { id: 'sedentary', name: 'Sedentary', multiplier: 1.2, description: 'Little or no exercise' },
    { id: 'light', name: 'Lightly Active', multiplier: 1.375, description: 'Light exercise 1-3 days/week' },
    { id: 'moderate', name: 'Moderately Active', multiplier: 1.55, description: 'Moderate exercise 3-5 days/week' },
    { id: 'very', name: 'Very Active', multiplier: 1.725, description: 'Hard exercise 6-7 days/week' },
    { id: 'extreme', name: 'Extremely Active', multiplier: 1.9, description: 'Very hard exercise & physical job' }
  ];

  // Goals with adjustments
  const goals = [
    { id: 'loss', name: 'Weight Loss', adjustment: -500, description: 'Lose 0.5-1 kg per week' },
    { id: 'maintenance', name: 'Maintenance', adjustment: 0, description: 'Maintain current weight' },
    { id: 'gain', name: 'Weight Gain', adjustment: 500, description: 'Gain 0.5-1 kg per week' },
    { id: 'muscle', name: 'Muscle Building', adjustment: 300, description: 'Build muscle mass' }
  ];

  // Medical conditions with adjustments
  const medicalConditions = [
    { id: 'none', name: 'None', adjustment: 0 },
    { id: 'diabetes', name: 'Diabetes', adjustment: -0.1, description: 'Reduced carbohydrate tolerance' },
    { id: 'renal', name: 'Renal Disease', adjustment: -0.2, description: 'Reduced protein intake' },
    { id: 'cardiac', name: 'Heart Disease', adjustment: -0.15, description: 'Reduced fat intake' },
    { id: 'cancer', name: 'Cancer/Cachexia', adjustment: 0.2, description: 'Increased protein & calories' },
    { id: 'pregnancy', name: 'Pregnancy', adjustment: 0.3, description: 'Increased nutrient needs' },
    { id: 'burn', name: 'Burn/Injury', adjustment: 0.4, description: 'Significantly increased needs' }
  ];

  // Sample data for demo
  useEffect(() => {
    setAge('35');
    setWeight('70');
    setHeight('175');
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

  const calculateNutritionalNeeds = () => {
    // Validate inputs
    if (!age || !weight || !height) {
      alert('Please fill in all required fields.');
      return;
    }

    const ageVal = parseFloat(age);
    const weightVal = parseFloat(weight);
    const heightVal = parseFloat(height);

    if (ageVal <= 0 || weightVal <= 0 || heightVal <= 0) {
      alert('Please enter valid positive numbers.');
      return;
    }

    // Calculate Basal Metabolic Rate (BMR) using Mifflin-St Jeor Equation
    let bmr = 0;
    if (gender === 'male') {
      bmr = 10 * weightVal + 6.25 * heightVal - 5 * ageVal + 5;
    } else {
      bmr = 10 * weightVal + 6.25 * heightVal - 5 * ageVal - 161;
    }

    // Apply activity multiplier
    const activity = activityLevels.find(a => a.id === activityLevel);
    const activityMultiplier = activity ? activity.multiplier : 1.2;

    // Calculate Total Daily Energy Expenditure (TDEE)
    let tdee = bmr * activityMultiplier;

    // Apply goal adjustment
    const selectedGoal = goals.find(g => g.id === goal);
    const goalAdjustment = selectedGoal ? selectedGoal.adjustment : 0;

    // Apply medical condition adjustment
    const condition = medicalConditions.find(m => m.id === medicalCondition);
    const conditionMultiplier = condition ? (1 + condition.adjustment) : 1;

    // Calculate final calorie needs
    const finalCalories = (tdee + goalAdjustment) * conditionMultiplier;

    // Calculate macronutrient distribution
    const proteinPerKg = getProteinRequirement(medicalCondition, goal);
    const proteinGrams = weightVal * proteinPerKg;
    const proteinCalories = proteinGrams * 4;

    const fatPercentage = getFatPercentage(medicalCondition, goal);
    const fatCalories = finalCalories * fatPercentage;
    const fatGrams = fatCalories / 9;

    const remainingCalories = finalCalories - proteinCalories - fatCalories;
    const carbGrams = remainingCalories / 4;

    // Calculate micronutrient recommendations
    const micronutrients = calculateMicronutrients(ageVal, gender, medicalCondition);

    setResults({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      finalCalories: Math.round(finalCalories),
      protein: {
        grams: Math.round(proteinGrams),
        percentage: Math.round((proteinCalories / finalCalories) * 100)
      },
      carbs: {
        grams: Math.round(carbGrams),
        percentage: Math.round((remainingCalories / finalCalories) * 100)
      },
      fat: {
        grams: Math.round(fatGrams),
        percentage: Math.round(fatPercentage * 100)
      },
      micronutrients: micronutrients,
      formula: gender === 'male' 
        ? `BMR = (10 × ${weightVal}) + (6.25 × ${heightVal}) - (5 × ${ageVal}) + 5`
        : `BMR = (10 × ${weightVal}) + (6.25 × ${heightVal}) - (5 × ${ageVal}) - 161`,
      activityLevel: activity?.name || 'Sedentary',
      goal: selectedGoal?.name || 'Maintenance',
      condition: condition?.name || 'None'
    });
  };

  const getProteinRequirement = (condition, goal) => {
    // Protein requirements in grams per kg body weight
    switch(condition) {
      case 'renal':
        return 0.8; // Reduced for renal disease
      case 'cancer':
      case 'burn':
        return 1.5; // Increased for hypercatabolic states
      case 'pregnancy':
        return 1.1; // Increased for pregnancy
      default:
        if (goal === 'muscle') return 1.6; // Higher for muscle building
        if (goal === 'loss') return 1.2; // Higher for weight loss
        return 0.8; // Standard maintenance
    }
  };

  const getFatPercentage = (condition, goal) => {
    // Fat as percentage of total calories
    switch(condition) {
      case 'cardiac':
        return 0.25; // Lower fat for heart disease
      case 'diabetes':
        return 0.30; // Moderate fat for diabetes
      default:
        if (goal === 'loss') return 0.25; // Lower fat for weight loss
        return 0.30; // Standard 30% of calories
    }
  };

  const calculateMicronutrients = (age, gender, condition) => {
    // Basic micronutrient recommendations
    const base = {
      vitaminC: gender === 'male' ? 90 : 75,
      vitaminD: 600,
      calcium: age > 50 ? 1200 : 1000,
      iron: gender === 'female' ? 18 : 8,
      magnesium: gender === 'male' ? 420 : 320,
      zinc: gender === 'male' ? 11 : 8
    };

    // Adjust for medical conditions
    const adjustments = {
      pregnancy: { iron: 27, calcium: 1000, vitaminC: 85 },
      renal: { potassium: 2000, phosphorus: 800 },
      cardiac: { potassium: 4700, magnesium: 420 }
    };

    return {
      ...base,
      ...(adjustments[condition] || {})
    };
  };

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "How accurate is the Mifflin-St Jeor equation for calculating BMR?",
      answer: "The Mifflin-St Jeor equation is currently the most accurate BMR formula for the general population, with about 90% accuracy for non-obese individuals. For obese individuals (BMI &gt;30), it may underestimate needs by 5-10%. Always consider individual variations in muscle mass, metabolic health, and lifestyle factors when using these calculations."
    },
    {
      question: "What's the difference between BMR and TDEE?",
      answer: "Basal Metabolic Rate (BMR) represents calories burned at complete rest for basic bodily functions. Total Daily Energy Expenditure (TDEE) includes BMR plus calories burned through daily activities and exercise. TDEE = BMR × Activity Multiplier. For weight management, TDEE is the more relevant number as it represents total daily energy needs."
    },
    {
      question: "How do I adjust protein intake for different goals?",
      answer: "Standard protein intake: 0.8g/kg for maintenance. Weight loss: 1.2-1.6g/kg to preserve muscle. Muscle building: 1.6-2.2g/kg. Elderly: 1.0-1.2g/kg to prevent sarcopenia. Critical illness/burns: 1.5-2.0g/kg. Renal disease: 0.6-0.8g/kg (adjust based on kidney function). Always consult with a dietitian for specific medical conditions."
    },
    {
      question: "Should I count calories or macros for weight management?",
      answer: "For weight loss, calorie deficit is primary - focus on total calories. For body composition changes (muscle gain/fat loss), macronutrient distribution becomes important - adequate protein to preserve muscle, appropriate carbs for energy, and healthy fats for hormone function. Track both calories and macros for optimal results, but prioritize food quality over strict counting."
    },
    {
      question: "How do medical conditions affect nutritional requirements?",
      answer: "Diabetes: Lower carb, higher healthy fat intake. Renal disease: Restrict protein, potassium, phosphorus. Heart disease: Reduce saturated fats, increase fiber. Cancer/cachexia: Increase protein and calorie density. Burns/trauma: Significantly increase protein (up to 2g/kg) and total calories. Pregnancy: Increase calories (300-500 extra), protein, and micronutrients. Always work with a healthcare team for medical nutrition therapy."
    }
  ];

  const healthCalculators = [
    { name: "Fluid Requirements", link: "/fluid-requirements" },
    { name: "Medication Dosage", link: "/medication-dosage" },
    { name: "Electrolyte Correction", link: "/electrolyte-correction" },
    { name: "BMI Calculator", link: "/bmi-calculator" },
    { name: "Body Surface Area", link: "/bsa-calculator" },
    { name: "Ideal Weight Calculator", link: "/ideal-weight-calculator" },
    { name: "Calorie Burn Calculator", link: "/calorie-burn-calculator" },
    { name: "Meal Planning Tool", link: "/meal-planner" }
  ];

  return (
    <main style={containerStyle}>
      <section style={calculatorBoxStyle}>
        <h1 style={calcTitleStyle}>
          <i className="fas fa-apple-alt"></i> Nutritional Needs Calculator - Comprehensive Dietary Requirement Analysis
        </h1>
        <p style={calcDescStyle}>
          Calculate <strong>daily calorie requirements, macronutrient distribution, and micronutrient recommendations</strong> based on your <strong>individual metabolic profile, activity levels, and health goals</strong>. Essential for <strong>personalized nutrition planning, weight management strategies, and medical nutrition therapy protocols</strong>.
        </p>

        <div style={inputGridStyle}>
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-user"></i> Age (years)</label>
            <input 
              type="number" 
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="35"
              min="18" 
              max="120" 
              step="1"
              style={inputStyle}
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-venus-mars"></i> Gender</label>
            <select 
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              style={selectStyle}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-weight"></i> Weight (kg)</label>
            <input 
              type="number" 
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="70"
              min="30" 
              max="300" 
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
              placeholder="175"
              min="100" 
              max="250" 
              step="0.1"
              style={inputStyle}
            />
          </div>
        </div>

        <div style={inputGridStyle}>
          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-running"></i> Activity Level</label>
            <select 
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
              style={selectStyle}
            >
              {activityLevels.map(level => (
                <option key={level.id} value={level.id}>{level.name} ({level.description})</option>
              ))}
            </select>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-bullseye"></i> Goal</label>
            <select 
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              style={selectStyle}
            >
              {goals.map(g => (
                <option key={g.id} value={g.id}>{g.name} ({g.description})</option>
              ))}
            </select>
          </div>

          <div style={inputGroupStyle}>
            <label style={inputGroupLabelStyle}><i className="fas fa-heartbeat"></i> Medical Condition</label>
            <select 
              value={medicalCondition}
              onChange={(e) => setMedicalCondition(e.target.value)}
              style={selectStyle}
            >
              {medicalConditions.map(condition => (
                <option key={condition.id} value={condition.id}>
                  {condition.name} {condition.description ? `(${condition.description})` : ''}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button 
          style={calcBtnStyle}
          onClick={calculateNutritionalNeeds}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, calcBtnHoverStyle)}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = calcBtnStyle.background;
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <i className="fas fa-calculator"></i> Calculate Nutritional Needs
        </button>

        {/* Results Display */}
        {results && (
          <div style={resultsContainerStyle}>
            <div style={{ ...resultCardStyle, ...caloriesCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-fire"></i> Calorie Requirements</h4>
              <div style={{ margin: '20px 0' }}>
                <div style={resultValueStyle}>{results.finalCalories} kcal</div>
                <div style={{ fontSize: '1.2rem', color: '#666', marginBottom: '15px' }}>
                  Daily Calorie Target
                </div>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div>BMR: {results.bmr} kcal (Basal Metabolic Rate)</div>
                <div>TDEE: {results.tdee} kcal (Total Daily Energy Expenditure)</div>
                <div>Activity Level: {results.activityLevel}</div>
                <div>Goal: {results.goal}</div>
              </div>
            </div>

            <div style={{ ...resultCardStyle, ...macrosCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-chart-pie"></i> Macronutrient Distribution</h4>
              <div style={{ margin: '20px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3498db' }}>{results.protein.grams}g</div>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>Protein ({results.protein.percentage}%)</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2ecc71' }}>{results.carbs.grams}g</div>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>Carbs ({results.carbs.percentage}%)</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#e74c3c' }}>{results.fat.grams}g</div>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>Fat ({results.fat.percentage}%)</div>
                  </div>
                </div>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div>Protein: {results.protein.grams}g ({results.protein.grams/weight} g/kg)</div>
                <div>Medical Condition: {results.condition}</div>
              </div>
            </div>

            <div style={{ ...resultCardStyle, ...micronutrientsCardStyle }}>
              <h4 style={sectionTitleStyle}><i className="fas fa-capsules"></i> Key Micronutrients</h4>
              <div style={{ margin: '20px 0' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                  <div>
                    <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>Vitamin D</div>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>{results.micronutrients.vitaminD} IU</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>Calcium</div>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>{results.micronutrients.calcium} mg</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>Iron</div>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>{results.micronutrients.iron} mg</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>Magnesium</div>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>{results.micronutrients.magnesium} mg</div>
                  </div>
                </div>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <div>Formula: {results.formula}</div>
                <div>Based on Mifflin-St Jeor Equation</div>
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
          <h3 style={sectionTitleStyle}><i className="fas fa-question-circle"></i> What is Nutritional Needs Calculation? Comprehensive Dietary Requirement Analysis Methodology</h3>
          <p style={paragraphStyle}><strong>Nutritional needs calculation methodologies</strong> represent <strong>essential clinical protocols</strong> for determining <strong>individualized calorie requirements, precise macronutrient distribution, and targeted micronutrient recommendations</strong>. These calculations integrate <strong>physiological parameters, metabolic characteristics, activity patterns, and health status considerations</strong> to provide <strong>personalized nutrition strategies</strong> that optimize <strong>health outcomes while addressing specific medical conditions and fitness goals</strong> across diverse clinical scenarios requiring <strong>precision nutrition planning protocols</strong>.</p>
          
          <h3 style={sectionTitleStyle}><i className="fas fa-calculator"></i> Nutritional Calculation Methods - Comprehensive Dietary Requirement Formulae</h3>
          <p style={paragraphStyle}>Multiple <strong>validated nutritional calculation equations</strong> exist for <strong>comprehensive dietary requirement management protocols</strong>, each demonstrating specific <strong>clinical applications and variable accuracy profiles</strong> influencing <strong>nutritional optimization processes</strong>:</p>
          
          <div style={formulaBoxStyle}>
            <strong>Mifflin-St Jeor Equation Protocol:</strong> Gold standard for basal metabolic rate calculation in general adult populations<br/>
            <strong>Harris-Benedict Equation Methodology:</strong> Historical standard with gender-specific formulas for BMR estimation<br/>
            <strong>WHO/FAO/UNU Equations:</strong> Age and gender-specific formulas for international standardization<br/>
            <strong>Katch-McArdle Formula:</strong> Most accurate for individuals with known body composition measurements<br/>
            <strong>Cunningham Equation:</strong> Preferred for athletic populations with high lean body mass<br/>
            <strong>Clinical Method Selection Protocol:</strong> Mifflin-St Jeor recommended for <strong>general clinical practice</strong>, Katch-McArdle for <strong>body composition-based precision calculations</strong>
          </div>

          <h3 style={sectionTitleStyle}><i className="fas fa-stethoscope"></i> Clinical Applications of Nutritional Calculation - Comprehensive Medical Nutrition Therapy Guidelines</h3>
          <p style={paragraphStyle}>Accurate <strong>nutritional needs calculation methodology implementation</strong> serves critical functions across multiple <strong>medical specialties and therapeutic management areas</strong> requiring <strong>precise dietary intervention</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Weight Management Programs:</strong> Essential for <strong>calorie deficit determination in obesity treatment, macronutrient optimization for body composition changes, and metabolic adaptation management strategies</strong> optimizing <strong>long-term weight maintenance outcomes</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Sports Nutrition Optimization:</strong> Guides <strong>performance enhancement protocols, recovery nutrition timing, and competition fueling strategies</strong> for athletic populations</li>
            <li style={{ marginBottom: '10px' }}><strong>Critical Care Nutrition Support:</strong> Determines <strong>energy expenditure in mechanical ventilation, protein requirements for wound healing, and micronutrient needs for immune function</strong> in intensive care settings</li>
            <li style={{ marginBottom: '10px' }}><strong>Chronic Disease Management Protocols:</strong> Essential for <strong>diabetes carbohydrate counting, renal disease protein restriction, and cardiac condition fat modification strategies</strong> in chronic illness populations</li>
            <li style={{ marginBottom: '10px' }}><strong>Geriatric Nutrition Assessment:</strong> Accounts for <strong>age-related metabolic changes, sarcopenia prevention requirements, and medication-nutrient interaction considerations</strong> in elderly patients</li>
            <li style={{ marginBottom: '10px' }}><strong>Pediatric Growth Monitoring:</strong> Manages <strong>developmental nutrition requirements, growth chart tracking parameters, and childhood obesity prevention strategies</strong> in pediatric populations</li>
            <li><strong>Oncological Supportive Care:</strong> Coordinates <strong>cancer cachexia management, treatment side effect mitigation, and quality of life enhancement protocols</strong> for cancer patients</li>
          </ul>
          
          <h3 style={sectionTitleStyle}><i className="fas fa-balance-scale"></i> Factors Affecting Nutritional Requirements - Comprehensive Metabolic Assessment Considerations</h3>
          <p style={paragraphStyle}>Multiple <strong>significant physiological and pathological factors</strong> influence <strong>nutritional requirement calculation accuracy parameters</strong> and require consideration for appropriate clinical interpretation:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Metabolic Rate Variability Factors:</strong> Affected by <strong>genetic predisposition patterns, thyroid function status, and sympathetic nervous system activity levels</strong> influencing energy expenditure calculations</li>
            <li style={{ marginBottom: '10px' }}><strong>Body Composition Influences:</strong> Muscle mass percentage, fat distribution patterns, and hydration status significantly alter <strong>metabolic efficiency and nutrient partitioning characteristics</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Age-Related Physiological Changes:</strong> Children demonstrate <strong>higher metabolic rates for growth and development</strong>, while elderly patients exhibit <strong>reduced lean mass and altered nutrient absorption</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Hormonal Regulation Impacts:</strong> Insulin sensitivity, cortisol patterns, and sex hormone fluctuations significantly affect <strong>macronutrient metabolism and appetite regulation mechanisms</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Gut Microbiome Considerations:</strong> Microbial composition, fermentation capacity, and short-chain fatty acid production influence <strong>energy extraction efficiency and metabolic health parameters</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Medication Effect Variables:</strong> Psychotropic medications, beta-blockers, and corticosteroids significantly alter <strong>appetite regulation, metabolic rate, and nutrient absorption patterns</strong></li>
            <li><strong>Environmental Exposure Factors:</strong> Altitude adaptation, temperature extremes, and pollution exposure affect <strong>energy expenditure requirements and antioxidant needs</strong></li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-exclamation-triangle"></i> Limitations of Nutritional Formulas - Advanced Metabolic Assessment Methodologies</h3>
          <p style={paragraphStyle}>While <strong>nutritional calculation methodologies</strong> provide valuable <strong>clinical starting points</strong>, specific clinical situations necessitate <strong>advanced assessment approaches</strong> and <strong>dynamic monitoring protocols</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Extreme Metabolic State Scenarios:</strong> Critical illness with hypermetabolism, severe malnutrition with refeeding risk, and massive obesity with metabolic adaptation require individualized approaches</li>
            <li style={{ marginBottom: '10px' }}><strong>Complex Comorbidity Considerations:</strong> Combined diabetic-renal-cardiac dysfunction presentations requiring nuanced nutrition therapy approaches</li>
            <li style={{ marginBottom: '10px' }}><strong>Unusual Body Composition Patterns:</strong> Extreme athletic populations, genetic metabolic disorders, and postoperative states affecting standard formula accuracy</li>
            <li style={{ marginBottom: '10px' }}><strong>Medication Interaction Complexities:</strong> Multiple interacting medications with competing metabolic effects and nutrient depletion patterns</li>
            <li style={{ marginBottom: '10px' }}><strong>Advanced Monitoring Requirement Situations:</strong> Indirect calorimetry measurement, doubly labeled water studies, and continuous glucose monitoring for precision management</li>
            <li><strong>Alternative Assessment Methodologies:</strong> <strong>Bioelectrical impedance analysis, deuterium dilution techniques, and metabolic cart measurements</strong> for advanced nutritional assessment</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-history"></i> Historical Development of Nutritional Formulas - Evolution of Nutritional Science</h3>
          <p style={paragraphStyle}>The progressive evolution of <strong>nutritional calculation methodologies</strong> reflects <strong>centuries of metabolic research advancement</strong> and <strong>clinical practice refinement trajectories</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Early 20th Century Foundations:</strong> Harris and Benedict develop <strong>first predictive equations</strong> establishing basic metabolic calculation principles</li>
            <li style={{ marginBottom: '10px' }}><strong>Mid-20th Century Standardization:</strong> Development of <strong>recommended dietary allowances, food composition databases, and standardized assessment protocols</strong> revolutionizing nutrition science</li>
            <li style={{ marginBottom: '10px' }}><strong>Late 20th Century Advances:</strong> Introduction of <strong>Mifflin-St Jeor equations, body composition methodologies, and computerized dietary analysis</strong></li>
            <li style={{ marginBottom: '10px' }}><strong>Early 21st Century Refinement:</strong> Development of <strong>evidence-based dietary guidelines, personalized nutrition approaches, and genetic testing applications</strong></li>
            <li><strong>Contemporary Precision Nutrition:</strong> Integration of <strong>metabolomic profiling, microbiome analysis, and artificial intelligence applications</strong> for optimal nutritional management</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-user-md"></i> Practical Clinical Implementation Recommendations - Comprehensive Nutrition Management Guidelines</h3>
          <p style={paragraphStyle}>For optimal <strong>nutritional calculation implementation</strong> in contemporary clinical practice environments and <strong>evidence-based therapeutic management protocols</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Comprehensive Assessment Protocol:</strong> Systematically evaluate <strong>anthropometric measurements, biochemical parameters, clinical indicators, and dietary intake patterns</strong> before calculation initiation</li>
            <li style={{ marginBottom: '10px' }}><strong>Dynamic Monitoring Implementation:</strong> Utilize <strong>serial weight tracking, body composition assessment, and metabolic parameter measurement</strong> rather than static formula application</li>
            <li style={{ marginBottom: '10px' }}><strong>Patient-Centered Approach Procedures:</strong> Systematically incorporate <strong>cultural food preferences, socioeconomic considerations, and behavioral readiness factors</strong> into nutrition planning</li>
            <li style={{ marginBottom: '10px' }}><strong>Clinical Context Integration Protocol:</strong> Develop <strong>individualized nutrition frameworks</strong> considering <strong>patient-specific medical conditions, medication profiles, and lifestyle factors</strong> beyond numerical calculations alone</li>
            <li style={{ marginBottom: '10px' }}><strong>Multidisciplinary Collaboration Enhancement:</strong> Coordinate nutrition management with <strong>registered dietitians, exercise physiologists, behavioral psychologists, and medical specialists</strong> for comprehensive care</li>
            <li><strong>Quality Improvement Integration:</strong> Implement <strong>nutrition outcome tracking systems, patient satisfaction measurement, and evidence-based protocol implementation</strong> for continuous optimization</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-chart-line"></i> Future Directions in Nutritional Assessment - Emerging Metabolic Technologies</h3>
          <p style={paragraphStyle}>Ongoing <strong>nutritional assessment research initiatives</strong> continue refining <strong>measurement approaches</strong> with promising technological developments and <strong>innovative monitoring methodologies</strong>:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#555' }}>
            <li style={{ marginBottom: '10px' }}><strong>Wearable Monitoring Technologies:</strong> Continuous glucose monitors, metabolic rate sensors, and nutrient intake trackers for real-time management</li>
            <li style={{ marginBottom: '10px' }}><strong>Artificial Intelligence Clinical Applications:</strong> Machine learning algorithm development for <strong>personalized nutrition prediction models</strong> incorporating multiple clinical and lifestyle variables</li>
            <li style={{ marginBottom: '10px' }}><strong>Genetic Testing Advancements:</strong> Nutrigenomic profiling, metabolic pathway analysis, and personalized supplement recommendation systems</li>
            <li style={{ marginBottom: '10px' }}><strong>Microbiome Analysis Technologies:</strong> Gut microbiota sequencing, fermentation capacity assessment, and personalized probiotic recommendations</li>
            <li style={{ marginBottom: '10px' }}><strong>Metabolomic Profiling Applications:</strong> Comprehensive metabolite analysis, nutrient status biomarkers, and metabolic pathway optimization</li>
            <li><strong>Telemedicine Integration Strategies:</strong> Remote dietary counseling, virtual cooking demonstrations, and digital behavior change platforms for comprehensive care</li>
          </ul>

          <h3 style={sectionTitleStyle}><i className="fas fa-graduation-cap"></i> Educational Requirements and Professional Training Standards Implementation</h3>
          <p style={paragraphStyle}>Proper <strong>nutritional calculation methodology education</strong> represents an <strong>essential clinical competency requirement</strong> for <strong>healthcare professionals</strong> across multiple medical disciplines. Comprehensive training curricula should systematically include <strong>metabolic physiology principles, calculation methodologies, dietary assessment techniques, and behavior change strategies</strong>. Continuing medical education programs must consistently address <strong>evolving nutritional research findings, changing clinical practice standards, and emerging technological developments</strong> to ensure optimal patient care outcomes and evidence-based practice implementation.</p>

          <h3 style={sectionTitleStyle}><i className="fas fa-clipboard-check"></i> Quality Assurance and Protocol Standardization Implementation</h3>
          <p style={paragraphStyle}>Implementation of <strong>rigorous quality assurance protocols</strong> ensures <strong>consistent nutrition management practices</strong> across diverse healthcare settings. These protocols encompass <strong>calculation standardization methodologies, assessment technique verification procedures, and outcome measurement requirements</strong> that directly impact <strong>patient health parameters</strong>. Professional organizations should develop <strong>standardized training materials, competency assessment tools, and practice guideline documents</strong> to guarantee consistent clinical application quality across diverse healthcare delivery settings and specialty practice areas.</p>
        </div>

        {/* Q&A Dropdown Section */}
        <div style={faqSectionStyle}>
          <h2 style={faqTitleStyle}><i className="fas fa-question-circle"></i> Frequently Asked Questions About Nutritional Needs Calculation</h2>
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
          <h3 style={sectionTitleStyle}><i className="fas fa-calculator"></i> Related Medical & Health Calculators</h3>
          <p style={paragraphStyle}>Explore our comprehensive collection of <strong>medical calculation tools and health monitoring calculators</strong> for healthcare applications and wellness management:</p>
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
          <p style={paragraphStyle}><strong>This nutritional needs calculator provides estimates for educational and informational purposes only.</strong> The calculations are based on standard formulas and should not be used as a substitute for professional medical advice, diagnosis, or treatment.</p>
          <p style={paragraphStyle}><strong>Clinical Decision Limitations:</strong> Nutritional calculations have inherent limitations and may not accurately reflect individual metabolic needs. Actual nutrition planning requires comprehensive clinical assessment including medical history, physical examination, and appropriate laboratory testing.</p>
          <p style={paragraphStyle}><strong>Medical Condition Considerations:</strong> Patients with diabetes, renal disease, heart conditions, cancer, or other medical disorders require specialized nutritional assessment by qualified healthcare professionals. Standard formulas may not be appropriate for these patients.</p>
          <p style={paragraphStyle}><strong>Professional Consultation Required:</strong> Always seek the advice of your physician, registered dietitian, or other qualified healthcare provider with any questions regarding nutrition planning or dietary changes. Do not disregard professional medical advice or delay seeking it because of information provided by this calculator.</p>
          <p style={paragraphStyle}><strong>Individual Variability Awareness:</strong> Metabolic rates vary significantly between individuals due to genetics, muscle mass, hormone levels, and other factors. These calculations provide estimates that should be adjusted based on individual response and monitoring.</p>
          <p style={paragraphStyle}><strong>Eating Disorder Precautions:</strong> Individuals with a history of eating disorders should use calorie and macronutrient calculators only under professional supervision. These tools may trigger unhealthy behaviors in susceptible individuals.</p>
          <p style={paragraphStyle}><strong>Quality Over Quantity:</strong> While calorie and macronutrient calculations are useful, food quality, nutrient density, and eating patterns are equally important for long-term health. Focus on whole foods, balanced meals, and sustainable eating habits rather than strict numerical targets.</p>
        </div>
      </section>

      {/* Sidebar with 3 Ads (3rd one sticky) */}
      {showSidebar && (
        <aside style={sidebarStyle}>
          <div style={sidebarContentStyle}>
            <div style={{ ...adSlotStyle, ...sidebarAdStyle }}>
              <p><i className="fas fa-ad"></i> Advertisement 1</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Sponsored Content</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Nutrition coaching certification program</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>300px height ad slot</p>
            </div>
            
            <div style={{ ...adSlotStyle, ...sidebarAdStyle }}>
              <p><i className="fas fa-ad"></i> Advertisement 2</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Featured Product</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Portable body composition analyzer</p>
              <div style={{ flexGrow: 1 }}></div>
              <p style={{ fontSize: '0.7rem', marginTop: 'auto' }}>300px height ad slot</p>
            </div>
            
            <div style={{ ...adSlotStyle, ...stickyAdStyle }}>
              <p><i className="fas fa-thumbtack"></i> Sticky Advertisement</p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Premium Content - Stays visible</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Clinical nutrition therapy guide</p>
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